import { useState } from 'react'
import { Mail, Check } from 'lucide-react'
import { NEWSLETTER_API } from '../constants.js'

// Newsletter sign-up for /korting visitors who are "just looking" — e-mail only,
// 1x per month. Posts to /api/newsletter (proxied to the lead bot), which stores
// it and tags the contact "nieuwsbrief" in GHL. Owners get KortingForm instead.

const ERRORS = {
  email: 'Dit e-mailadres klopt niet. Check het even.',
  consent: 'Vink het vakje aan, anders mogen we je niet mailen.',
  busy: 'Het is even heel druk. Probeer het over een paar minuten opnieuw.',
}

export default function NieuwsbriefForm({ role = 'kijker', dark = false }) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [hp, setHp] = useState('')
  const [state, setState] = useState('idle') // idle | sending | done | error
  const [error, setError] = useState('')

  const text = dark ? 'text-void' : 'text-ice'
  const muted = dark ? 'text-[#9db8ac]' : 'text-platinum'
  const field = [
    'w-full rounded-2xl border px-4 py-3.5 text-[16px] focus:outline-none',
    dark
      ? 'border-white/15 bg-white/5 text-void placeholder:text-[#9db8ac]/70 focus:border-plasma'
      : 'border-ice/15 bg-white text-ice placeholder:text-platinum/60 focus:border-ion',
  ].join(' ')

  async function submit(e) {
    e.preventDefault()
    if (!consent) { setError(ERRORS.consent); setState('error'); return }
    setState('sending')
    setError('')
    try {
      const r = await fetch(NEWSLETTER_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role, consent, hp, page: `${window.location.pathname}${window.location.search}` }),
      })
      const j = await r.json().catch(() => ({}))
      if (!r.ok || !j.ok) {
        setError(ERRORS[j.error] || 'Er ging iets mis. Probeer het nog een keer.')
        setState('error')
        return
      }
      if (!j.already && typeof window.fbq === 'function') {
        window.fbq('track', 'CompleteRegistration', { content_name: 'nieuwsbrief', role })
      }
      setState('done')
    } catch {
      setError('Geen verbinding. Check je internet en probeer het opnieuw.')
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div className="text-center">
        <span className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${dark ? 'bg-plasma text-forest' : 'bg-ion text-white'}`}>
          <Check className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className={`mt-4 font-sora text-[24px] font-bold tracking-[-0.02em] ${text}`}>Je staat erop!</h3>
        <p className={`mt-2 text-[15px] leading-relaxed ${muted}`}>
          Je krijgt 1x per maand een mail met tips. Start je later toch een bedrijf? Dan weet je ons te vinden.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="relative space-y-3">
      <label className="sr-only" htmlFor="nl-email">E-mailadres</label>
      <input
        id="nl-email"
        className={field}
        placeholder="Je e-mailadres"
        type="email"
        inputMode="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
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
        <span>Ja, Omzetto mag mij 1x per maand een e-mail sturen met tips en aanbiedingen. Afmelden kan altijd.</span>
      </label>
      {state === 'error' && error && (
        <p role="alert" className={`text-[14px] font-medium ${dark ? 'text-plasma' : 'text-[#b4432e]'}`}>{error}</p>
      )}
      <button
        type="submit"
        disabled={state === 'sending'}
        className={`flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-4 text-[16px] font-semibold transition-transform hover:scale-[1.02] disabled:opacity-60 ${dark ? 'bg-plasma text-forest' : 'bg-ion text-white'}`}
      >
        <Mail className="h-5 w-5" aria-hidden="true" />
        {state === 'sending' ? 'Even geduld...' : 'Zet me op de lijst'}
      </button>
    </form>
  )
}
