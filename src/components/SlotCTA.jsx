import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DEMO_URL } from '../constants.js'

gsap.registerPlugin(ScrollTrigger)

export default function SlotCTA() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        y: 26,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-void px-4 py-24 md:px-8 md:py-32">
      <div className="glow-ion-lg relative mx-auto max-w-5xl overflow-hidden rounded-[3rem] bg-carbon/40 px-6 py-20 ring-1 ring-ion/30 md:px-16 md:py-28">
        {/* Ambient texture + glow backdrop — decorative only, never behind readable text at low contrast */}
        <div
          className="circuit-grid pointer-events-none absolute inset-0 opacity-[0.06]"
          aria-hidden="true"
        />

        <div
          ref={contentRef}
          className="relative mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <span className="mono-label text-[13px] text-ion md:text-[13px]">
            KLAAR OM TE STARTEN?
          </span>

          <h2 className="mt-6 text-4xl italic leading-[1.1] text-ice font-serif md:text-6xl lg:text-7xl">
            Laat uw AI het werk doen.
          </h2>

          <p className="mt-6 text-base leading-relaxed text-ice opacity-90 md:text-lg">
            In een gratis demo van 15 minuten laten we live zien wat de AI voor úw bedrijf kan
            doen. Geen verplichtingen.
          </p>

          <a
            href={DEMO_URL}
            className="btn-magnetic relative glow-ion mt-10 inline-flex items-center justify-center rounded-full bg-ion px-8 py-4 text-ice"
          >
            <span className="btn-wipe" />
            <span className="btn-label font-sora text-[15px] font-semibold md:text-base">
              Plan een gratis demo
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
