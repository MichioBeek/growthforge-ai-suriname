import { useEffect, useState } from 'react'
import { ArrowLeft, Building2, Rocket, Eye } from 'lucide-react'
import Logo from '../components/Logo.jsx'
import KortingForm from '../components/KortingForm.jsx'
import NieuwsbriefForm from '../components/NieuwsbriefForm.jsx'
import { REVIEWS } from '../data/reviews.js'

// Standalone "$25 korting" sign-up page — the link for the Instagram/TikTok bio,
// flyers and the website-ads test. Starts with "wie ben jij?": owners and starters
// get the $25 code form (by WhatsApp), people who are just looking get the monthly
// e-mail newsletter. Each choice fires a pixel event, so retargeting can be split.

const ROLES = [
  { id: 'ondernemer', label: 'Ik heb een bedrijf', icon: Building2 },
  { id: 'starter', label: 'Ik start binnenkort een bedrijf', icon: Rocket },
  { id: 'kijker', label: 'Ik kijk gewoon rond', icon: Eye },
]

function pickRole(role) {
  if (typeof window.fbq === 'function') window.fbq('trackCustom', 'Qualify', { role })
}

const PUNTEN = [
  'Websites, WhatsApp-bots, boekings- en bestelsystemen',
  'Live binnen dagen, niet maanden',
  'Al gebouwd voor 10+ bedrijven in Suriname',
]

export default function Korting() {
  useEffect(() => {
    document.title = '$25 korting op je eerste systeem — Omzetto'
  }, [])

  const names = REVIEWS.map((r) => r.business).slice(0, 4)
  const [role, setRole] = useState(null)
  const choose = (id) => { pickRole(id); setRole(id) }

  return (
    <div className="min-h-screen bg-void">
      <header className="mx-auto flex max-w-5xl items-center px-6 pt-7">
        <a href="/" className="flex items-center gap-2.5">
          <Logo className="h-9 w-9" />
          <span className="font-sora text-[22px] font-bold tracking-[-0.03em] text-ice">omzetto</span>
        </a>
      </header>

      {/* Mobile: intro -> form -> details, so the form is near the top.
          Desktop: intro + details on the left, form on the right. */}
      <main className="mx-auto grid max-w-5xl gap-10 px-6 pb-24 pt-12 md:grid-cols-[1.1fr_1fr] md:gap-x-12 md:gap-y-7 md:pt-24">
        <div className="hero-enter min-w-0 md:self-end" style={{ '--d': '0.05s' }}>
          <p className="font-sora text-[14px] font-semibold uppercase tracking-[0.18em] text-ion">
            Welkomstkorting
          </p>
          <h1 className="mt-4 font-sora text-[40px] font-bold leading-[1.04] tracking-[-0.04em] text-ice sm:text-[60px]">
            $25 korting op je eerste systeem.
          </h1>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-platinum md:text-[18px]">
            Verlies geen klant meer. Vertel kort wie je bent. Heb je een bedrijf? Dan krijg
            je je code meteen via WhatsApp, 7 dagen geldig.
          </p>
        </div>

        <div
          className="hero-enter min-w-0 rounded-[2rem] bg-forest p-6 sm:p-9 md:col-start-2 md:row-span-2 md:row-start-1 md:self-center"
          style={{ '--d': '0.2s' }}
        >
          {!role && (
            <>
              <h2 className="font-sora text-[22px] font-bold tracking-[-0.02em] text-void">Wie ben jij?</h2>
              <p className="mt-1.5 text-[14px] text-[#9db8ac]">Kies wat bij je past.</p>
              <div className="mt-6 space-y-3">
                {ROLES.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => choose(id)}
                    className="flex w-full items-center gap-3.5 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-left text-[16px] font-semibold text-void transition-colors hover:border-plasma"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-plasma" aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </div>
            </>
          )}

          {role && (
            <button
              type="button"
              onClick={() => setRole(null)}
              className="mb-4 flex items-center gap-1.5 text-[13px] text-[#9db8ac] hover:text-void"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Terug
            </button>
          )}

          {(role === 'ondernemer' || role === 'starter') && (
            <>
              <h2 className="font-sora text-[22px] font-bold tracking-[-0.02em] text-void">Krijg je code</h2>
              <p className="mt-1.5 text-[14px] text-[#9db8ac]">Duurt 20 seconden.</p>
              <div className="mt-6">
                <KortingForm
                  source={`page-${role}`}
                  dark
                  businessPlaceholder={role === 'starter' ? 'Naam van je (nieuwe) bedrijf' : 'Naam van je bedrijf'}
                />
              </div>
            </>
          )}

          {role === 'kijker' && (
            <>
              <h2 className="font-sora text-[22px] font-bold tracking-[-0.02em] text-void">Gratis tips in je mail</h2>
              <p className="mt-1.5 text-[14px] text-[#9db8ac]">
                1x per maand. Over klanten vasthouden, WhatsApp en je website.
              </p>
              <div className="mt-6">
                <NieuwsbriefForm role="kijker" dark />
              </div>
            </>
          )}
        </div>

        <div className="hero-enter min-w-0 md:self-start" style={{ '--d': '0.3s' }}>
          <ul className="space-y-2.5">
            {PUNTEN.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[16px] text-ice">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-ion" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          {names.length > 0 && (
            <p className="mt-7 text-[14px] text-platinum">Onder andere voor {names.join(', ')}.</p>
          )}
        </div>
      </main>
    </div>
  )
}
