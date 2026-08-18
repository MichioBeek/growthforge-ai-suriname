import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'
import { REVIEWS } from '../data/reviews.js'
import {
  WEBSITE_OFFER_NEXT_PRICE,
  WEBSITE_OFFER_SPOTS_REMAINING,
  WEBSITE_OFFER_TOTAL_SPOTS,
  WEBSITE_OFFER_WHATSAPP_LINK,
} from '../constants.js'

gsap.registerPlugin(ScrollTrigger)

const INCLUDED = [
  'Complete website met uw eigen info, foto’s en contactgegevens',
  'Live binnen enkele dagen na betaling',
  'Eenmalig $50 voor de website zelf — geen verplichting',
]

const SPOTS_FILLED = WEBSITE_OFFER_TOTAL_SPOTS - WEBSITE_OFFER_SPOTS_REMAINING

export default function WebsiteOffer() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  const clientNames = useMemo(() => REVIEWS.map((r) => r.business), [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        y: 26,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="aanbod" ref={sectionRef} className="relative scroll-mt-16 bg-void px-4 py-24 md:px-8 md:py-32">
      <div className="glow-ion-lg relative mx-auto max-w-5xl overflow-hidden rounded-[3rem] bg-carbon/40 px-6 py-16 ring-1 ring-ion/30 md:px-16 md:py-20">
        <div
          className="circuit-grid pointer-events-none absolute inset-0 opacity-[0.06]"
          aria-hidden="true"
        />

        <div ref={contentRef} className="relative mx-auto max-w-3xl">
          <div className="text-center">
            <span className="mono-label text-[12px] text-ion md:text-[13px]">
              INTRODUCTIEPRIJS &middot; BEPERKTE PLEKKEN
            </span>

            <div className="mt-6 flex flex-wrap items-end justify-center gap-4">
              <span className="glow-ion font-sora text-6xl font-bold text-ion md:text-7xl">
                $50
              </span>
              <span className="mb-1 flex flex-col items-start text-left">
                <span className="text-lg text-platinum/60 line-through md:text-xl">
                  {WEBSITE_OFFER_NEXT_PRICE}
                </span>
                <span className="mono-label text-[11px] text-platinum opacity-90 md:text-[12px]">
                  daarna deze prijs
                </span>
              </span>
            </div>

            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-platinum opacity-90 md:text-base">
              Een complete website voor uw bedrijf, eenmalig $50 &mdash; mijn introductieprijs
              voor de eerste {WEBSITE_OFFER_TOTAL_SPOTS} klanten.
            </p>
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between">
              <span className="mono-label text-[11px] text-ice opacity-90 md:text-[12px]">
                {SPOTS_FILLED} VAN {WEBSITE_OFFER_TOTAL_SPOTS} PLEKKEN GEBRUIKT
              </span>
              <span className="mono-label text-[11px] text-ion md:text-[12px]">
                NOG {WEBSITE_OFFER_SPOTS_REMAINING} OVER
              </span>
            </div>
            <div className="mt-3 grid grid-cols-10 gap-1.5 md:gap-2">
              {Array.from({ length: WEBSITE_OFFER_TOTAL_SPOTS }).map((_, i) => (
                <span
                  key={i}
                  className={[
                    'h-2.5 rounded-full md:h-3',
                    i < SPOTS_FILLED ? 'bg-ion shadow-ion-glow' : 'bg-void/40 ring-1 ring-platinum/20',
                  ].join(' ')}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            {INCLUDED.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-2xl border border-platinum/15 bg-carbon px-4 py-3.5"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-ion" strokeWidth={2.5} aria-hidden="true" />
                <span className="text-[13.5px] leading-snug text-ice opacity-90 md:text-[14px]">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {clientNames.length > 0 && (
            <p className="mt-8 text-center text-[13px] leading-relaxed text-platinum opacity-80 md:text-[14px]">
              Al gebouwd voor {clientNames.slice(0, -1).join(', ')}
              {clientNames.length > 1 ? ' en ' : ''}
              {clientNames.at(-1)}.
            </p>
          )}

          <div className="mt-10 flex flex-col items-center">
            <a
              href={WEBSITE_OFFER_WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="btn-magnetic relative glow-ion inline-flex items-center justify-center rounded-full bg-ion px-9 py-4 text-ice"
            >
              <span className="btn-wipe" />
              <span className="btn-label font-sora text-[15px] font-semibold md:text-base">
                Claim uw plek
              </span>
            </a>
            <p className="mono-label mt-4 text-[11px] text-platinum opacity-90 md:text-[12px]">
              NOG {WEBSITE_OFFER_SPOTS_REMAINING} PLEKKEN TEGEN DEZE PRIJS &mdash; DAARNA{' '}
              {WEBSITE_OFFER_NEXT_PRICE}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
