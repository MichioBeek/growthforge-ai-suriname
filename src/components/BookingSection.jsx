import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MessageCircle } from 'lucide-react'
import { WHATSAPP_LINK } from '../constants.js'

gsap.registerPlugin(ScrollTrigger)

export default function BookingSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.booking-intro > *', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="boeken"
      ref={sectionRef}
      className="relative overflow-hidden bg-void px-4 py-24 md:px-8 md:py-32"
    >
      <div
        className="circuit-grid pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center">
        <div className="booking-intro flex flex-col items-center">
          <span className="mono-label text-[13px] text-ion md:text-sm">NEEM CONTACT OP</span>

          <h2 className="mt-6 text-center text-4xl leading-[1.1] text-ice font-sora font-bold md:text-6xl">
            Laten we praten.{' '}
            <span className="font-serif italic font-normal text-ice">Wij nemen het over.</span>
          </h2>

          <p className="mt-6 max-w-xl text-center text-base leading-relaxed text-ice opacity-90 md:text-lg">
            Stuur ons een bericht op WhatsApp — we reageren snel en plannen samen een moment dat u
            uitkomt, ook persoonlijk.
          </p>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="btn-magnetic relative glow-ion mt-10 inline-flex items-center justify-center gap-3 rounded-full bg-ion px-8 py-4 text-ice"
          >
            <span className="btn-wipe" />
            <span className="btn-label inline-flex items-center gap-2 font-sora text-[15px] font-semibold md:text-base">
              <MessageCircle className="h-5 w-5" strokeWidth={2} />
              Stuur een bericht op WhatsApp
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
