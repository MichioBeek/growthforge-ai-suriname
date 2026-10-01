import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'
import { REVIEWS } from '../data/reviews.js'
import {
  WEBSITE_TIERS,
  WEBSITE_HOSTING_MONTHLY,
  WEBSITE_OFFER_WHATSAPP_LINK,
} from '../constants.js'

gsap.registerPlugin(ScrollTrigger)

// Q4 2026: de oude $50 launch-actie (spots-teller + doorgestreepte prijs) is
// vervangen door de drie vaste website-tiers uit SOP - Prijskaart Q4 2026 —
// dezelfde prijzen die de lead bot en de /pakket quiz noemen. Geen "vanaf",
// geen scarcity: gewoon de echte totalen, hosting er meteen bij.
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
              WEBSITES OP MAAT &middot; VASTE PRIJZEN
            </span>

            <h2 className="mt-6 font-sora text-3xl font-bold tracking-[-0.02em] text-ice md:text-4xl">
              Kies de website die bij uw bedrijf past
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-platinum opacity-90 md:text-base">
              Drie vaste prijzen, geen verrassingen. Elke website draait op hosting van{' '}
              {WEBSITE_HOSTING_MONTHLY} en staat live binnen enkele dagen na betaling.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {WEBSITE_TIERS.map((tier) => (
              <div
                key={tier.name}
                className="flex flex-col rounded-2xl border border-platinum/15 bg-carbon px-5 py-6"
              >
                <span className="mono-label text-[11px] text-ion md:text-[12px]">
                  {tier.name.toUpperCase()}
                </span>
                <div className="mt-3 flex flex-wrap items-end gap-2">
                  <span className="font-sora text-3xl font-bold text-ice md:text-4xl">
                    {tier.price}
                  </span>
                  <span className="mb-1 text-[12.5px] text-platinum opacity-90 md:text-[13px]">
                    eenmalig + {WEBSITE_HOSTING_MONTHLY}
                  </span>
                </div>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-ion" strokeWidth={2.5} aria-hidden="true" />
                      <span className="text-[13.5px] leading-snug text-ice opacity-90 md:text-[14px]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

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
                App Michio over uw website
              </span>
            </a>
            <p className="mono-label mt-4 text-[11px] text-platinum opacity-90 md:text-[12px]">
              75% AANBETALING OM TE STARTEN &mdash; 25% BIJ OPLEVERING
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
