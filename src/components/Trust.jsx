import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Lock, MapPin, Quote, RotateCcw, ShieldCheck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: '14 dagen gratis proberen',
    description:
      'Geen risico. Bevalt het niet binnen de proefperiode? Volledige terugbetaling, geen gedoe.',
  },
  {
    icon: RotateCcw,
    title: 'Op elk moment opzegbaar',
    description: 'Geen lange contracten of kleine lettertjes. U zit nergens aan vast.',
  },
  {
    icon: Lock,
    title: 'Uw data blijft van u',
    description: 'Wij gebruiken uw gegevens nooit om AI-modellen te trainen. Punt.',
  },
  {
    icon: MapPin,
    title: 'Gebouwd in Suriname',
    description: 'Door en voor Surinaamse ondernemers. Wij kennen uw markt en uw klanten.',
  },
]

export default function Trust() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const quoteRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.trust-card')
      if (cards?.length) {
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            once: true,
          },
        })
      }

      gsap.from(quoteRef.current, {
        opacity: 0,
        y: 32,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 85%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-void px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <span className="mono-label text-[12px] uppercase text-ion md:text-[13px]">
            Waarom Ons Vertrouwen
          </span>
          <h2 className="mt-4 font-sora text-3xl font-bold text-ice md:text-4xl">
            Wij zijn nieuw. <span className="font-serif italic font-normal text-platinum">Onze garanties zijn dat niet.</span>
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          {TRUST_POINTS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="trust-card rounded-[2rem] border border-platinum/15 bg-carbon p-6 transition-shadow duration-500 hover:shadow-ion-glow md:p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ion/10 ring-1 ring-ion/30">
                <Icon className="h-5 w-5 text-ion" strokeWidth={2} aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-sora text-lg font-semibold text-ice">{title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-platinum opacity-90 md:text-[15px]">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div
          ref={quoteRef}
          className="relative mx-auto mt-14 max-w-3xl overflow-hidden rounded-[2rem] border border-platinum/15 bg-carbon p-8 md:mt-20 md:p-12"
        >
          <div
            className="circuit-grid pointer-events-none absolute inset-0 opacity-[0.05]"
            aria-hidden="true"
          />
          <Quote
            className="relative h-9 w-9 text-ion opacity-80"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className="relative mt-4 font-poppins text-xl font-semibold leading-relaxed text-ice md:text-2xl">
            Ik zag het van dichtbij: hardwerkende ondernemers die omzet verliezen aan één gemiste
            oproep of een klant die nooit meer iets hoorde. Daarvoor heb ik GrowthForge AI gebouwd.
            En omdat ik weet dat het werkt, start elke installatie met een gratis proefperiode — u
            betaalt pas als het resultaat oplevert.
          </p>

          <div className="relative mt-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ion/10 font-sora text-sm font-semibold text-ion ring-1 ring-ion/30">
              MB
            </div>
            <div>
              <p className="font-sora text-[15px] font-semibold text-ice">Michio Beek</p>
              <p className="mono-label text-[12px] text-platinum opacity-90">
                Oprichter, GrowthForge AI
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
