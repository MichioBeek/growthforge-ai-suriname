import { useState } from 'react'
import { Mail, MessageCircle, Check, User, Building2, AtSign } from 'lucide-react'
import { buildWhatsAppLink, SIGNUP_API, KORTING_STORAGE_KEY } from '../constants.js'

// The "$25 korting" sign-up form — used in the homepage popup and on /korting.
// Posts to /api/signup (proxied to the lead bot, see netlify.toml), which mails
// the code from korting@omzetto.com and starts the follow-up mails. On success the
// visitor also gets a one-tap WhatsApp button with the code in it: tapping it opens
// the chat and the bot recognises the code.

const ERRORS = {
  email: 'Dit e-mailadres klopt niet. Check het nog even.',
  fields: 'Vul je naam en de naam van je bedrijf in.',
  consent: 'Vink het vakje aan, anders mogen we je de code niet mailen.',
  busy: 'Het is even heel druk. Probeer het over een paar minuten opnieuw.',
}

function track(event, params) {
  if (typeof window.fbq === 'function') window.fbq('track', event, params)
  if (typeof window.gtag === 'function') window.gtag('event', 'korting_signup', params)
}

export default function KortingForm({ source = 'popup', dark = false, businessPlaceholder = 'Naam van je bedrijf' }) {
  const [name, setName] = useState('')
  const [business, setBusiness] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [hp, setHp] = useState('')
  const [state, setState] = useState('idle') // idle | sending | done | error
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const text = dark ? 'text-void' : 'text-ice'
  const muted = dark ? 'text-[#9db8ac]' : 'text-platinum'
  const fieldBase = [
    'rounded-2xl border px-4 py-3.5 text-[16px] focus:outline-none [@media(max-height:760px)]:py-2.5',
    dark
      ? 'border-white/15 bg-white/5 text-void placeholder:text-[#9db8ac]/70 focus:border-plasma'
      : 'border-ice/15 bg-white text-ice placeholder:text-platinum/60 focus:border-ion',
  ].join(' ')
  const field = `w-full ${fieldBase} pl-11`
  const icon = `pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 ${dark ? 'text-[#9db8ac]' : 'text-platinum/70'}`

  async function submit(e) {
    e.preventDefault()
    if (!consent) { setError(ERRORS.consent); setState('error'); return }
    setState('sending')
    setError('')
    try {
      const r = await fetch(SIGNUP_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, business, email, consent, hp,
          page: `${window.location.pathname}${window.location.search} (${source})`,
        }),
      })
      const j = await r.json().catch(() => ({}))
      if (!r.ok || !j.ok) {
        setError(ERRORS[j.error] || 'Er ging iets mis. Probeer het nog een keer.')
        setState('error')
        return
      }
      try { localStorage.setItem(KORTING_STORAGE_KEY, 'signed-up') } catch { /* private mode */ }
      if (!j.already) track('Lead', { content_name: 'korting-25', source })
      setResult(j)
      setState('done')
    } catch {
      setError('Geen verbinding. Check je internet en probeer het opnieuw.')
      setState('error')
    }
  }

  if (state === 'done' && result) {
    const waLink = buildWhatsAppLink(
      `Hoi! Ik heb mijn $25 korting (code ${result.code}). Ik wil graag weten wat bij mijn bedrijf past.`
    )
    return (
      <div className="text-center">
        <span className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${dark ? 'bg-plasma text-forest' : 'bg-ion text-white'}`}>
          <Check className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className={`mt-4 font-sora text-[24px] font-bold tracking-[-0.02em] ${text}`}>
          {result.already ? 'Je had al een code' : 'Check je mail'}
        </h3>
        <p className={`mt-2 text-[15px] leading-relaxed ${muted}`}>
          {result.expired
            ? `Je code ${result.code} was geldig tot en met ${result.expiresLabel}. App ons gerust, dan kijken we wat er nog kan.`
            : result.already
              ? `Je code is ${result.code} — geldig tot en met ${result.expiresLabel}.`
              : `We hebben je code gemaild naar ${result.email || 'je e-mailadres'}. Niks gezien? Kijk ook even in je spam of promoties.`}
        </p>
        <p className={`mx-auto mt-4 inline-block rounded-2xl border border-dashed px-5 py-2 font-mono text-[20px] font-bold tracking-[0.12em] ${dark ? 'border-plasma/50 text-plasma' : 'border-ion/50 text-ion'}`}>
          {result.code}
        </p>
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className={`mt-6 flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-4 text-[16px] font-semibold transition-transform hover:scale-[1.02] ${dark ? 'bg-plasma text-forest' : 'bg-ion text-white'}`}
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          Vraag direct wat bij jou past
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="relative space-y-3">
      <label className="sr-only" htmlFor={`k-name-${source}`}>Je naam</label>
      <div className="relative">
        <User className={icon} aria-hidden="true" />
        <input
          id={`k-name-${source}`}
          className={field}
          placeholder="Je naam"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <label className="sr-only" htmlFor={`k-biz-${source}`}>Naam van je bedrijf</label>
      <div className="relative">
        <Building2 className={icon} aria-hidden="true" />
        <input
          id={`k-biz-${source}`}
          className={field}
          placeholder={businessPlaceholder}
          autoComplete="organization"
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
          required
        />
      </div>
      <label className="sr-only" htmlFor={`k-email-${source}`}>E-mailadres</label>
      <div className="relative">
        <AtSign className={icon} aria-hidden="true" />
        <input
          id={`k-email-${source}`}
          className={field}
          placeholder="Je e-mailadres"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {/* Honeypot — hidden from people, bots fill it */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-px w-px opacity-0"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
      />
      <label className={`flex cursor-pointer items-start gap-3 pt-1 text-left text-[13px] leading-snug ${muted}`}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? 'accent-plasma' : 'accent-ion'}`}
        />
        <span>Ja, Omzetto mag mij per e-mail berichten sturen over mijn korting, tips en aanbiedingen. Afmelden kan altijd.</span>
      </label>
      {state === 'error' && error && (
        <p role="alert" className={`text-[14px] font-medium ${dark ? 'text-plasma' : 'text-[#b4432e]'}`}>{error}</p>
      )}
      <button
        type="submit"
        disabled={state === 'sending'}
        className={`flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-4 text-[16px] font-semibold transition-transform hover:scale-[1.02] disabled:opacity-60 [@media(max-height:760px)]:py-3 ${dark ? 'bg-plasma text-forest' : 'bg-ion text-white'}`}
      >
        <Mail className="h-5 w-5" aria-hidden="true" />
        {state === 'sending' ? 'Even geduld...' : 'Mail mij mijn code'}
      </button>
    </form>
  )
}
