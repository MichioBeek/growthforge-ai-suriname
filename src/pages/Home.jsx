import { Link } from 'react-router-dom'
import { MessageCircle, ArrowRight, Star } from 'lucide-react'
import Logo from '../components/Logo.jsx'
import Footer from '../components/Footer.jsx'
import { REVIEWS } from '../data/reviews.js'
import { PAKKET_ROUTE, buildWhatsAppLink } from '../constants.js'

// Omzetto homepage (rebrand Okt 2026). Deliberately minimal: one scroll,
// five beats — wie we zijn, wat we bouwen, hoe het werkt, bewijs, actie.
// The old 12-section GrowthForge page lives on in git history; heavy
// components (Features/Protocol/Philosophy/...) are intentionally unused here.

const WA_LINK = buildWhatsAppLink(
  'Hoi! Ik wil meer klanten binnenhalen met een website of systeem — kunnen we praten?'
)

// Inline ring-arrow that replaces the "o" of "omzet" in the hero headline.
// Sized/offset to sit on the text baseline like a letter.
function RingO({ className }) {
  return (
    <svg
      viewBox="0 0 72 70"
      className={className}
      aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: 'baseline', marginBottom: '-0.02em' }}
    >
      <g transform="translate(5,8)">
        <path
          d="M 30 2 A 27 27 0 1 0 56.5 33"
          fill="none"
          stroke="#0e7a55"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M 45 8 L 61 2 L 58 19"
          fill="none"
          stroke="#0e7a55"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

function Nav() {
  return (
    <header className="mx-auto flex max-w-5xl items-center justify-between px-6 pt-7">
      <a href="/" className="flex items-center gap-2.5">
        <Logo className="h-9 w-9" />
        <span className="font-sora text-[22px] font-bold tracking-[-0.03em] text-ice">
          omzetto
        </span>
      </a>
      <nav className="flex items-center gap-6">
        <Link
          to={PAKKET_ROUTE}
          className="hidden text-[15px] font-medium text-platinum transition-colors hover:text-ice sm:block"
        >
          Prijzen
        </Link>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-ice px-5 py-2.5 text-[15px] font-semibold text-void transition-transform hover:scale-[1.03]"
        >
          App ons
        </a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
      <p className="font-sora text-[14px] font-semibold uppercase tracking-[0.18em] text-ion">
        Websites · WhatsApp-bots · Boekingen
      </p>
      <h1 className="mt-5 font-sora text-[52px] font-bold leading-[1.02] tracking-[-0.04em] text-ice sm:text-[72px] md:text-[92px]">
        Meer klanten.
        <br />
        <span className="whitespace-nowrap">
          Meer <RingO className="h-[0.74em] w-auto" />
          mzet.
        </span>
      </h1>
      <p className="mt-7 max-w-xl text-[18px] leading-relaxed text-platinum md:text-[20px]">
        Wij bouwen websites, WhatsApp-bots en boekingssystemen die klanten voor je
        binnenhalen — terwijl jij gewoon doorwerkt. Voor ondernemers in Suriname.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-5">
        <a
          href={WA_LINK}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2.5 rounded-full bg-ion px-7 py-4 text-[16px] font-semibold text-white transition-transform hover:scale-[1.03]"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          App ons op WhatsApp
        </a>
        <Link
          to={PAKKET_ROUTE}
          className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-ice transition-colors hover:text-ion"
        >
          Bekijk prijzen
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <p className="mt-10 text-[14px] text-platinum">
        Gebouwd voor 10+ bedrijven in Suriname — van barbershops tot catering.
      </p>
    </section>
  )
}

const DIENSTEN = [
  {
    title: 'Websites',
    text: 'Een strakke site die vertrouwen wekt en klanten overtuigt. Live binnen dagen, niet maanden.',
  },
  {
    title: 'WhatsApp-bots',
    text: 'Beantwoordt vragen en neemt bestellingen aan, 24/7 — ook als jij slaapt of staat te werken.',
  },
  {
    title: 'Boekingssystemen',
    text: 'Klanten kiezen zelf een tijd en boeken direct. Jouw agenda vult zichzelf, zonder heen-en-weer appen.',
  },
  {
    title: 'Bestelsystemen',
    text: 'Online bestellen met je eigen beheerpaneel. Jij houdt de controle, zonder commissies aan platforms.',
  },
]

function Diensten() {
  return (
    <section id="diensten" className="mx-auto max-w-5xl px-6 pb-24 md:pb-32">
      <h2 className="font-sora text-[32px] font-bold tracking-[-0.03em] text-ice md:text-[40px]">
        Wat we bouwen
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {DIENSTEN.map((d) => (
          <div key={d.title} className="rounded-3xl bg-carbon p-8">
            <h3 className="font-sora text-[20px] font-bold text-ice">{d.title}</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-platinum">{d.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const STAPPEN = [
  {
    nr: '1',
    title: 'App ons',
    text: 'Vertel in een paar berichten wat je doet en wat je mist.',
  },
  {
    nr: '2',
    title: 'Wij bouwen',
    text: 'Binnen dagen staat je systeem er. Je kijkt live mee en stuurt bij.',
  },
  {
    nr: '3',
    title: 'Jij groeit',
    text: 'Klanten vinden, boeken en bestellen vanzelf. Wij onderhouden alles.',
  },
]

function Werkwijze() {
  return (
    <section id="werkwijze" className="mx-auto max-w-5xl px-6 pb-24 md:pb-32">
      <h2 className="font-sora text-[32px] font-bold tracking-[-0.03em] text-ice md:text-[40px]">
        Zo werkt het
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
        {STAPPEN.map((s) => (
          <div key={s.nr}>
            <span className="font-sora text-[15px] font-bold text-ion">{s.nr}</span>
            <h3 className="mt-2 font-sora text-[20px] font-bold text-ice">{s.title}</h3>
            <p className="mt-2 text-[16px] leading-relaxed text-platinum">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Reviews() {
  const shown = REVIEWS.slice(0, 3)
  if (shown.length === 0) return null
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 md:pb-32">
      <h2 className="font-sora text-[32px] font-bold tracking-[-0.03em] text-ice md:text-[40px]">
        Wat klanten zeggen
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        {shown.map((r) => (
          <figure key={r.name} className="flex flex-col rounded-3xl border border-ice/10 p-8">
            <div className="flex gap-1" aria-label={`${r.rating} van 5 sterren`}>
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-ion text-ion" aria-hidden="true" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ice/80">
              “{r.quote}”
            </blockquote>
            <figcaption className="mt-5 text-[14px] text-platinum">
              <span className="font-semibold text-ice">{r.name}</span> · {r.business}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function CTABand() {
  return (
    <section className="px-6 pb-24 md:pb-32">
      <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-forest px-8 py-16 text-center md:py-20">
        <h2 className="font-sora text-[34px] font-bold tracking-[-0.03em] text-void md:text-[48px]">
          Klaar voor meer omzet?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[17px] leading-relaxed text-[#9db8ac]">
          Stuur een appje en vertel wat je doet. Binnen een dag weet je wat mogelijk is
          en wat het kost.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-plasma px-7 py-4 text-[16px] font-semibold text-forest transition-transform hover:scale-[1.03]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            App ons op WhatsApp
          </a>
          <Link
            to={PAKKET_ROUTE}
            className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-void transition-colors hover:text-plasma"
          >
            Bekijk prijzen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="relative bg-void">
      <Nav />
      <Hero />
      <Diensten />
      <Werkwijze />
      <Reviews />
      <CTABand />
      <Footer />
    </div>
  )
}
