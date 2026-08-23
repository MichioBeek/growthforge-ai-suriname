import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Building2,
  CalendarCheck,
  Camera,
  ChevronRight,
  Home as HomeIcon,
  UtensilsCrossed,
  HelpCircle,
} from 'lucide-react'
import Logo from '../components/Logo.jsx'
import Footer from '../components/Footer.jsx'
import NoiseOverlay from '../components/NoiseOverlay.jsx'
import PakketResultaat from '../components/PakketResultaat.jsx'
import PakketStepper from '../components/PakketStepper.jsx'
import { QUIZ_CATEGORIES } from '../data/packages.js'
import { HOME_ROUTE, PAKKET_OTHER_BUSINESS_WHATSAPP_LINK, capturePakketLead } from '../constants.js'
import './Pakket.css'

const CATEGORY_ICONS = {
  booking: CalendarCheck,
  creative: Camera,
  makelaar: HomeIcon,
  restaurant: UtensilsCrossed,
}

function trackEvent(name, params) {
  if (typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}

export default function Pakket() {
  const [step, setStep] = useState('category')
  const [category, setCategory] = useState(null)
  const [businessName, setBusinessName] = useState('')

  useEffect(() => {
    document.title = 'Vind uw pakket — GrowthForge AI'
  }, [])

  // The buildmyagent.io support-chat bubble (injected sitewide in
  // index.html, outside React) shouldn't cover this flow's own CTAs —
  // hidden here via a CSS rule keyed off this class (see index.css) rather
  // than reaching into the widget's DOM directly, since it loads
  // asynchronously and may not exist yet when this effect runs.
  useEffect(() => {
    document.documentElement.classList.add('hide-chat-widget')
    return () => document.documentElement.classList.remove('hide-chat-widget')
  }, [])

  const selectCategory = (item) => {
    setCategory(item)
    trackEvent('pakket_category_selected', { category: item.id })
    setStep('name')
  }

  const submitName = (e) => {
    e.preventDefault()
    const name = businessName.trim()
    if (!name) return
    trackEvent('pakket_results_viewed', { category: category.id })
    capturePakketLead({ businessName: name, category: category.label, stage: 'Bekeken' })
    setStep('results')
  }

  const trimmedName = businessName.trim()

  return (
    <div className="pakket-bg relative min-h-screen">
      <NoiseOverlay />
      <div
        className="circuit-grid pointer-events-none absolute inset-0 opacity-[0.05]"
        aria-hidden="true"
      />

      {/* Not the full animated marketing Navbar, but matches its real brand
          language (serif-italic wordmark, solid pill button) instead of the
          generic Sora label + bare text link the legal pages use. */}
      <header className="sticky top-0 z-20 border-b border-platinum/10 bg-void/75 px-6 py-5 backdrop-blur-md md:px-12">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <Link to={HOME_ROUTE} className="pakket-logo flex items-center gap-2.5">
            <Logo className="h-8 w-8 rounded-[10px] shadow-ion-glow" />
            GrowthForge AI
          </Link>

          <Link to={HOME_ROUTE} className="pakket-home-btn">
            <HomeIcon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            Home
          </Link>
        </div>
      </header>

      <main
        className={[
          'relative flex flex-col items-center px-6 py-16 md:px-12 md:py-24',
          step === 'results' ? '' : 'min-h-[calc(100vh-88px)] justify-center',
        ].join(' ')}
      >
        <PakketStepper current={step} />

        <div
          key={step}
          className={[
            'fade-in-up mx-auto mt-10 w-full md:mt-12',
            step === 'results' ? 'max-w-5xl' : 'max-w-3xl',
          ].join(' ')}
        >
          {step === 'category' && (
            <div className="glow-ion-lg relative overflow-hidden rounded-[3rem] bg-carbon/40 px-6 py-14 ring-1 ring-ion/20 md:px-14 md:py-16">
              <div className="circuit-grid pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />

              <div className="relative">
                <div className="text-center">
                  <h1 className="font-sora text-3xl font-bold tracking-[-0.02em] text-ice md:text-4xl">
                    Wat voor soort <span className="pakket-accent">bedrijf</span> heeft u?
                  </h1>
                  <p className="mt-3 text-[15px] text-platinum opacity-90 md:text-base">
                    We laten u direct zien welk pakket bij u past.
                  </p>
                </div>

                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
                  {QUIZ_CATEGORIES.map((item) => {
                    const Icon = CATEGORY_ICONS[item.id]
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => selectCategory(item)}
                        className="group flex w-full items-start gap-4 rounded-[2rem] border border-platinum/15 bg-carbon px-6 py-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-ion/50 hover:shadow-ion-glow"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ion/10 text-ion transition-colors duration-300 group-hover:bg-ion/20">
                          <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                        </span>
                        <span className="flex-1">
                          <span className="block font-sora text-lg font-bold text-ice">
                            {item.label}
                          </span>
                          <span className="mt-1 block text-[13.5px] leading-snug text-platinum opacity-90">
                            {item.description}
                          </span>
                        </span>
                        <ChevronRight
                          className="mt-1 h-4 w-4 shrink-0 text-platinum/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ion"
                          aria-hidden="true"
                        />
                      </button>
                    )
                  })}

                  <a
                    href={PAKKET_OTHER_BUSINESS_WHATSAPP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('pakket_other_business_click')}
                    className="group flex w-full items-start gap-4 rounded-[2rem] border border-dashed border-platinum/25 px-6 py-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-ion/50 sm:col-span-2"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-platinum/10 text-platinum">
                      <HelpCircle className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-sora text-lg font-bold text-ice">
                        Ander soort bedrijf?
                      </span>
                      <span className="mt-1 block text-[13.5px] leading-snug text-platinum opacity-90">
                        Staat uw type bedrijf er niet bij? Stuur ons een bericht op WhatsApp.
                      </span>
                    </span>
                    <ChevronRight
                      className="mt-1 h-4 w-4 shrink-0 text-platinum/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ion"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          )}

          {step === 'name' && (
            <div className="glow-ion-lg relative overflow-hidden rounded-[3rem] bg-carbon/40 px-6 py-14 ring-1 ring-ion/20 md:px-14 md:py-16">
              <div className="circuit-grid pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setStep('category')}
                  className="link-lift inline-flex items-center gap-1.5 text-[14px] font-medium text-platinum opacity-95"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Vorige
                </button>

                <div className="mt-8 text-center">
                  {category && (
                    <span className="mono-label inline-flex items-center gap-2 rounded-full border border-ion/25 bg-ion/10 px-4 py-1.5 text-[11px] text-ion">
                      {(() => {
                        const CatIcon = CATEGORY_ICONS[category.id]
                        return <CatIcon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                      })()}
                      {category.label}
                    </span>
                  )}
                  <h1 className="mt-5 font-sora text-3xl font-bold tracking-[-0.02em] text-ice md:text-4xl">
                    Wat is de naam van uw <span className="pakket-accent">bedrijf</span>?
                  </h1>
                </div>

                <form onSubmit={submitName} className="mx-auto mt-10 max-w-md">
                  <div className="relative">
                    <Building2
                      className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-platinum/50"
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Bijv. Kappersalon Paramaribo"
                      autoFocus
                      className="w-full rounded-2xl border border-platinum/20 bg-void py-4 pl-12 pr-5 font-sora text-[15px] text-ice placeholder:text-platinum/60 focus:border-ion focus:shadow-ion-glow focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!trimmedName}
                    className="btn-magnetic relative glow-ion mt-6 flex w-full items-center justify-center rounded-full bg-ion px-6 py-4 text-ice disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span className="btn-wipe" />
                    <span className="btn-label font-sora text-[15px] font-semibold">
                      {trimmedName ? `Bekijk pakketten voor ${trimmedName}` : 'Vul uw bedrijfsnaam in'}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {step === 'results' && (
            <div>
              <button
                type="button"
                onClick={() => setStep('name')}
                className="link-lift inline-flex items-center gap-1.5 text-[14px] font-medium text-platinum opacity-95"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Vorige
              </button>

              <div className="mt-8">
                <PakketResultaat
                  businessName={trimmedName}
                  categoryLabel={category.label}
                  category={category.id}
                  onTierCtaClick={(tier) => {
                    trackEvent('pakket_tier_cta_click', { category: category.id, tier: tier.id })
                    capturePakketLead({
                      businessName: trimmedName,
                      category: category.label,
                      stage: 'Aangevraagd',
                      tier: tier.name,
                    })
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
