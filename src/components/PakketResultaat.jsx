import { useState } from 'react'
import { Check, Rocket, TrendingUp, Crown, Phone } from 'lucide-react'
import { PACKAGE_TIERS_BY_CATEGORY } from '../data/packages.js'
import { buildPakketWhatsAppLink } from '../constants.js'

const TIER_ICONS = {
  starter: Rocket,
  groei: TrendingUp,
  premium: Crown,
}

// Three-tier color language, reusing the site's existing Ion/Plasma accent
// pair (see Protocol.jsx, Features.jsx's WebsiteFeatureCard) rather than
// inventing new colors: Starter is a plain one-time website (neutral, no
// accent), Groei is the pushed "most chosen" AI tier (Ion Cyan), Premium is
// the aspirational tier (Plasma Violet + a dark CTA, not a repeat of Groei's
// cyan button — the 3 tiers used to all look identical).
const TIER_ACCENT = {
  starter: {
    icon: 'bg-ice/5 text-ice',
    check: 'text-ice/60',
    card: 'border-platinum/15',
    // Plain outline, no .btn-wipe — that shared effect is hardcoded to Ion
    // Cyan, which would look broken sliding across a tier that isn't Ion.
    button:
      'border border-platinum/25 bg-transparent text-ice transition-all duration-300 hover:-translate-y-0.5 hover:border-ice hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]',
    wipe: false,
  },
  groei: {
    icon: 'bg-ion/10 text-ion',
    check: 'text-ion',
    card: 'border-ion ring-2 ring-ion shadow-ion-glow md:-translate-y-3',
    button: 'btn-magnetic relative glow-ion bg-ion text-ice',
    wipe: true,
  },
  premium: {
    icon: 'bg-plasma/10 text-plasma',
    check: 'text-plasma',
    card: 'border-plasma/30 hover:shadow-[0_0_40px_rgba(124,107,255,0.25)]',
    button:
      'bg-ice text-void transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(124,107,255,0.45)]',
    wipe: false,
  },
}

export default function PakketResultaat({ businessName, categoryLabel, category, onTierCtaClick, onPhoneSubmit }) {
  const tiers = PACKAGE_TIERS_BY_CATEGORY[category]
  const [phone, setPhone] = useState('')
  const [phoneSent, setPhoneSent] = useState(false)

  const submitPhone = (e) => {
    e.preventDefault()
    const trimmedPhone = phone.trim()
    if (!trimmedPhone) return
    onPhoneSubmit(trimmedPhone)
    setPhoneSent(true)
  }

  return (
    <div>
      <div className="text-center">
        <span className="mono-label text-[12px] text-ion md:text-[13px]">UW PAKKETTEN</span>
        <h1 className="mt-4 font-sora text-3xl font-bold tracking-[-0.02em] text-ice md:text-4xl">
          Pakketten voor <span className="pakket-accent">{businessName}</span>
        </h1>
        <p className="mt-3 text-[15px] text-platinum opacity-90 md:text-base">
          Samengesteld voor: {categoryLabel}.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start">
        {tiers.map((tier, i) => {
          const Icon = TIER_ICONS[tier.id]
          const accent = TIER_ACCENT[tier.id]
          return (
          <div
            key={tier.id}
            style={{ animationDelay: `${i * 0.12}s` }}
            className={[
              'fade-in flex flex-col rounded-[2rem] border bg-carbon p-6 transition-shadow duration-500 md:p-7',
              accent.card,
            ].join(' ')}
          >
            <div className="flex items-center justify-between">
              <span className={['flex h-11 w-11 items-center justify-center rounded-full', accent.icon].join(' ')}>
                <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              </span>
              {tier.highlight && (
                <span className="mono-label inline-block w-fit rounded-full bg-ion/10 px-3 py-1 text-[11px] text-ion">
                  MEEST GEKOZEN
                </span>
              )}
            </div>

            <h3 className="mt-5 font-sora text-xl font-bold text-ice md:text-2xl">{tier.name}</h3>
            <p className="mt-1 text-[13.5px] leading-snug text-platinum opacity-90 md:text-[14px]">
              {tier.tagline}
            </p>

            <div className="mt-5 flex flex-wrap items-end gap-2">
              <span className="font-sora text-3xl font-bold text-ice md:text-4xl">
                {tier.setupPrice}
              </span>
              {tier.monthlyPrice && (
                <span className="mb-1 text-[13.5px] text-platinum opacity-90 md:text-[14px]">
                  + {tier.monthlyPrice}
                </span>
              )}
            </div>

            <ul className="mt-6 flex-1 space-y-2.5">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Check className={['mt-0.5 h-4 w-4 shrink-0', accent.check].join(' ')} strokeWidth={2.5} aria-hidden="true" />
                  <span className="text-[13.5px] leading-snug text-ice opacity-90 md:text-[14px]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href={buildPakketWhatsAppLink({ businessName, industryLabel: categoryLabel, tierName: tier.name })}
              target="_blank"
              rel="noreferrer"
              onClick={() => onTierCtaClick(tier)}
              className={['mt-8 inline-flex items-center justify-center rounded-full px-6 py-3.5', accent.button].join(' ')}
            >
              {accent.wipe && <span className="btn-wipe" />}
              <span className={accent.wipe ? 'btn-label font-sora text-[14px] font-semibold md:text-[15px]' : 'font-sora text-[14px] font-semibold md:text-[15px]'}>
                Vraag het {tier.name} pakket aan
              </span>
            </a>
          </div>
          )
        })}
      </div>

      <div className="mx-auto mt-10 max-w-lg rounded-[2rem] border border-platinum/15 bg-carbon/60 px-6 py-7 text-center md:px-10">
        {phoneSent ? (
          <p className="flex items-center justify-center gap-2 font-sora text-[15px] font-semibold text-ice">
            <Check className="h-4 w-4 text-ion" strokeWidth={2.5} aria-hidden="true" />
            Bedankt — Michio neemt persoonlijk contact met u op.
          </p>
        ) : (
          <>
            <p className="text-[14px] leading-snug text-platinum opacity-90 md:text-[15px]">
              Nog niet zeker welk pakket? Laat uw WhatsApp-nummer achter en Michio neemt persoonlijk
              contact op — geen verplichtingen.
            </p>
            <form onSubmit={submitPhone} className="mt-5 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Phone
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-platinum/50"
                  aria-hidden="true"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Bijv. 597 71234567"
                  className="w-full rounded-2xl border border-platinum/20 bg-void py-3.5 pl-11 pr-4 font-sora text-[14px] text-ice placeholder:text-platinum/60 focus:border-ion focus:shadow-ion-glow focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={!phone.trim()}
                className="shrink-0 rounded-full border border-platinum/25 bg-transparent px-6 py-3.5 font-sora text-[14px] font-semibold text-ice transition-all duration-300 hover:-translate-y-0.5 hover:border-ice disabled:cursor-not-allowed disabled:opacity-40"
              >
                Verstuur
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
