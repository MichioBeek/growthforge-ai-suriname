import { useEffect, useMemo, useState } from 'react'
import {
  AtSign,
  Building2,
  MessageCircle,
  Scissors,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Users,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react'
import Logo from '../components/Logo.jsx'
import NoiseOverlay from '../components/NoiseOverlay.jsx'
import { REVIEWS } from '../data/reviews.js'
import { buildWhatsAppLink } from '../constants.js'
import './Start.css'

// Same categories/spirit as the /pakket quiz, broadened slightly since this
// page has to cover any Meta ad visitor, not just the 4 booking-heavy
// niches Pakket targets — grounded in the same SOP - AI Automation Menu by
// Niche logic, just one level less granular (this page's only job is to
// carry context into WhatsApp, not price a package).
const BUSINESS_TYPES = [
  { id: 'horeca', label: 'Restaurant / Horeca', icon: UtensilsCrossed },
  { id: 'praktijk', label: 'Kliniek / Praktijk', icon: Stethoscope },
  { id: 'winkel', label: 'Winkel / Webshop', icon: ShoppingBag },
  { id: 'salon', label: 'Salon / Beauty', icon: Scissors },
  { id: 'dienst', label: 'Dienstverlener', icon: Wrench },
  { id: 'anders', label: 'Anders', icon: Building2 },
]

// Team size — a rough proxy for budget/seriousness the bot can use to
// prioritize, without asking anything as sensitive/slow as an actual number.
const TEAM_SIZES = [
  { id: 'solo', label: 'Alleen ik' },
  { id: '2-5', label: '2–5' },
  { id: '6-15', label: '6–15' },
  { id: '15+', label: '15+' },
]

// Verbatim from the language-bank mining in Creative Angle Roadmap.md
// (2026-09-28) — these are the actual recurring pains/asks leads type into
// the bot, not invented copy, so the chip a visitor taps should read back
// as something the bot already knows how to talk about.
const CHALLENGES = [
  { id: 'geen-website', label: 'Ik heb nog geen website' },
  { id: 'traag-antwoord', label: 'Klanten wachten te lang op antwoord' },
  { id: 'boekingssysteem', label: 'Ik wil een boekings- of bestelsysteem' },
  { id: 'chatbot', label: 'Ik wil een chatbot/systeem zoals ik online zag' },
  { id: 'anders', label: 'Iets anders' },
]

function trackEvent(name, params) {
  if (typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}

export default function Start() {
  const [businessName, setBusinessName] = useState('')
  const [businessType, setBusinessType] = useState(null)
  const [teamSize, setTeamSize] = useState(null)
  const [challenge, setChallenge] = useState(null)
  const [social, setSocial] = useState('')
  const [noSocial, setNoSocial] = useState(false)
  const [extra, setExtra] = useState('')
  const [showExtra, setShowExtra] = useState(false)

  useEffect(() => {
    document.title = 'Welk systeem past bij uw bedrijf? — Omzetto'
  }, [])

  // Same reasoning as Pakket.jsx: keep the buildmyagent.io chat bubble off
  // this single-CTA page so it never competes with the one button that
  // matters here.
  useEffect(() => {
    document.documentElement.classList.add('hide-chat-widget')
    return () => document.documentElement.classList.remove('hide-chat-widget')
  }, [])

  const trimmedName = businessName.trim()
  const trimmedExtra = extra.trim()
  const trimmedSocial = social.trim()
  const isAndersType = businessType === 'anders'
  const isAndersChallenge = challenge === 'anders'

  const isValid = Boolean(
    trimmedName &&
      businessType &&
      teamSize &&
      challenge &&
      (!isAndersChallenge || trimmedExtra) &&
      (noSocial || trimmedSocial)
  )

  const whatsappLink = useMemo(() => {
    if (!isValid) return null
    const typeLabel = BUSINESS_TYPES.find((t) => t.id === businessType)?.label
    const teamSizeLabel = TEAM_SIZES.find((t) => t.id === teamSize)?.label
    const challengeLabel = CHALLENGES.find((c) => c.id === challenge)?.label

    const lines = [
      'Hoi Michio, ik heb de check op de website ingevuld.',
      `Bedrijf: ${trimmedName}${!isAndersType ? ` (${typeLabel})` : ''}`,
      `Aantal medewerkers: ${teamSizeLabel}`,
      `Grootste uitdaging: ${isAndersChallenge ? trimmedExtra : challengeLabel}`,
      `Facebook/TikTok: ${noSocial ? 'geen' : trimmedSocial}`,
    ]
    if (!isAndersChallenge && trimmedExtra) lines.push(`Extra: ${trimmedExtra}`)

    return buildWhatsAppLink(lines.join('\n'))
  }, [
    isValid,
    businessType,
    teamSize,
    challenge,
    trimmedName,
    trimmedExtra,
    trimmedSocial,
    noSocial,
    isAndersType,
    isAndersChallenge,
  ])

  const clientNames = useMemo(() => REVIEWS.map((r) => r.business), [])

  const handleSubmitClick = () => {
    if (!isValid) return
    trackEvent('start_whatsapp_click', {
      business_type: businessType,
      team_size: teamSize,
      challenge,
      has_social: !noSocial,
    })
  }

  return (
    <div className="start-bg relative min-h-screen">
      <NoiseOverlay />
      <div
        className="circuit-grid pointer-events-none absolute inset-0 opacity-[0.05]"
        aria-hidden="true"
      />

      {/* No nav, no home link, no way out of the funnel except the CTA —
          this page exists for exactly one action. */}
      <header className="relative px-6 py-6 md:px-12 md:py-8">
        <div className="mx-auto flex max-w-3xl items-center gap-2.5">
          <Logo className="h-8 w-8 rounded-[10px] shadow-ion-glow" />
          <span className="start-logo">Omzetto</span>
        </div>
      </header>

      <main className="relative flex flex-col items-center px-6 pb-20 pt-2 md:px-12 md:pb-28">
        <div className="fade-in-up mx-auto w-full max-w-3xl">
          <div className="glow-ion-lg relative overflow-hidden rounded-[3rem] bg-carbon/40 px-6 py-12 ring-1 ring-ion/20 md:px-14 md:py-16">
            <div
              className="circuit-grid pointer-events-none absolute inset-0 opacity-[0.06]"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="text-center">
                <span className="mono-label inline-flex items-center gap-2 rounded-full border border-ion/25 bg-ion/10 px-4 py-1.5 text-[11px] text-ion">
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                  GRATIS SYSTEEMCHECK &middot; 60 SECONDEN
                </span>

                <h1 className="mt-5 font-sora text-3xl font-bold tracking-[-0.02em] text-ice md:text-4xl">
                  Welk <span className="start-accent">systeem</span> past bij uw bedrijf?
                </h1>
                <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-platinum opacity-90 md:text-base">
                  Beantwoord enkele korte vragen. Wij openen direct WhatsApp met uw antwoorden
                  erin, zodat we meteen ter zake komen — geen standaard "kan ik u helpen?".
                </p>
              </div>

              <div className="mx-auto mt-10 max-w-lg space-y-8">
                {/* 1. Bedrijfsnaam */}
                <div>
                  <label htmlFor="start-name" className="mono-label block text-[11px] text-platinum opacity-90">
                    1. NAAM VAN UW BEDRIJF
                  </label>
                  <div className="relative mt-2.5">
                    <Building2
                      className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-platinum/50"
                      aria-hidden="true"
                    />
                    <input
                      id="start-name"
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Bijv. Kappersalon Paramaribo"
                      className="w-full rounded-2xl border border-platinum/20 bg-void py-4 pl-12 pr-5 font-sora text-[15px] text-ice placeholder:text-platinum/60 focus:border-ion focus:shadow-ion-glow focus:outline-none"
                    />
                  </div>
                </div>

                {/* 2. Type bedrijf */}
                <div>
                  <span className="mono-label block text-[11px] text-platinum opacity-90">
                    2. TYPE BEDRIJF
                  </span>
                  <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {BUSINESS_TYPES.map((item) => {
                      const Icon = item.icon
                      const selected = businessType === item.id
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setBusinessType(item.id)}
                          className={[
                            'start-chip flex items-center gap-2 rounded-2xl border border-platinum/20 bg-void px-3.5 py-3 text-left',
                            selected ? 'is-selected' : '',
                          ].join(' ')}
                        >
                          <Icon className="h-4 w-4 shrink-0 text-platinum/70" strokeWidth={2} aria-hidden="true" />
                          <span className="text-[13px] font-medium leading-snug text-ice">
                            {item.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* 3. Aantal medewerkers */}
                <div>
                  <span className="mono-label flex items-center gap-1.5 text-[11px] text-platinum opacity-90">
                    <Users className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                    3. AANTAL MEDEWERKERS
                  </span>
                  <div className="mt-2.5 grid grid-cols-4 gap-2.5">
                    {TEAM_SIZES.map((item) => {
                      const selected = teamSize === item.id
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setTeamSize(item.id)}
                          className={[
                            'start-chip rounded-2xl border border-platinum/20 bg-void px-2 py-3 text-center text-[13px] font-medium text-ice',
                            selected ? 'is-selected' : '',
                          ].join(' ')}
                        >
                          {item.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* 4. Grootste uitdaging */}
                <div>
                  <span className="mono-label block text-[11px] text-platinum opacity-90">
                    4. GROOTSTE UITDAGING NU
                  </span>
                  <div className="mt-2.5 flex flex-col gap-2.5">
                    {CHALLENGES.map((item) => {
                      const selected = challenge === item.id
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setChallenge(item.id)}
                          className={[
                            'start-chip rounded-2xl border border-platinum/20 bg-void px-4 py-3 text-left text-[13.5px] font-medium text-ice',
                            selected ? 'is-selected' : '',
                          ].join(' ')}
                        >
                          {item.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* 5. Facebook/TikTok — lets us look up the business before the
                    conversation starts, so the bot/Michio arrives already
                    knowing roughly what the business looks like. */}
                <div>
                  <label htmlFor="start-social" className="mono-label flex items-center gap-1.5 text-[11px] text-platinum opacity-90">
                    <AtSign className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                    5. FACEBOOK OF TIKTOK VAN UW BEDRIJF
                  </label>
                  <div className="relative mt-2.5">
                    <AtSign
                      className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-platinum/50"
                      aria-hidden="true"
                    />
                    <input
                      id="start-social"
                      type="text"
                      value={social}
                      disabled={noSocial}
                      onChange={(e) => setSocial(e.target.value)}
                      placeholder="@uwbedrijf of een link"
                      className="w-full rounded-2xl border border-platinum/20 bg-void py-4 pl-12 pr-5 font-sora text-[15px] text-ice placeholder:text-platinum/60 focus:border-ion focus:shadow-ion-glow focus:outline-none disabled:opacity-40"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setNoSocial((prev) => !prev)
                      setSocial('')
                    }}
                    className={[
                      'link-lift mt-2 text-[13px] font-medium opacity-90',
                      noSocial ? 'text-ion' : 'text-platinum',
                    ].join(' ')}
                  >
                    {noSocial ? '✓ Geen Facebook/TikTok' : 'Ik heb geen Facebook/TikTok'}
                  </button>
                </div>

                {/* 6. Optionele toelichting — required only when "Iets anders" is picked */}
                {(isAndersChallenge || showExtra) && (
                  <div className="fade-in">
                    <label htmlFor="start-extra" className="mono-label block text-[11px] text-platinum opacity-90">
                      6. {isAndersChallenge ? 'VERTEL KORT WAT U ZOEKT' : 'NOG IETS TOEVOEGEN? (OPTIONEEL)'}
                    </label>
                    <textarea
                      id="start-extra"
                      value={extra}
                      onChange={(e) => setExtra(e.target.value)}
                      rows={2}
                      autoFocus
                      placeholder="Bijv. Ik wil dat klanten zelf een afspraak kunnen boeken"
                      className="mt-2.5 w-full resize-none rounded-2xl border border-platinum/20 bg-void px-5 py-3.5 font-sora text-[15px] text-ice placeholder:text-platinum/60 focus:border-ion focus:shadow-ion-glow focus:outline-none"
                    />
                  </div>
                )}
                {!isAndersChallenge && !showExtra && challenge && (
                  <button
                    type="button"
                    onClick={() => setShowExtra(true)}
                    className="link-lift -mt-4 text-[13px] font-medium text-platinum opacity-90"
                  >
                    + Nog iets toevoegen (optioneel)
                  </button>
                )}

                <a
                  href={whatsappLink ?? undefined}
                  onClick={handleSubmitClick}
                  aria-disabled={!isValid}
                  className={[
                    'btn-magnetic relative glow-ion flex w-full items-center justify-center gap-2.5 rounded-full bg-ion px-6 py-4 text-ice',
                    isValid ? '' : 'pointer-events-none cursor-not-allowed opacity-40',
                  ].join(' ')}
                >
                  <span className="btn-wipe" />
                  <MessageCircle className="btn-label h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                  <span className="btn-label font-sora text-[15px] font-semibold">
                    Start gesprek op WhatsApp
                  </span>
                </a>
                <p className="mono-label -mt-4 text-center text-[10.5px] text-platinum opacity-70">
                  OPENT WHATSAPP MET UW ANTWOORDEN AL INGEVULD
                </p>
              </div>

              {clientNames.length > 0 && (
                <p className="mt-10 text-center text-[13px] leading-relaxed text-platinum opacity-80">
                  Al gebouwd voor {clientNames.slice(0, -1).join(', ')}
                  {clientNames.length > 1 ? ' en ' : ''}
                  {clientNames.at(-1)}.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
