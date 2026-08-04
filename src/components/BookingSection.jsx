import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CalendarClock, MessageCircle } from 'lucide-react'
import { GHL_CALENDAR_URL, WHATSAPP_LINK, WHATSAPP_NUMBER } from '../constants.js'

gsap.registerPlugin(ScrollTrigger)

export default function BookingSection() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only the text above is animated. The calendar card itself is left
      // completely static — no transform, no GSAP — so there's nothing for
      // it to glitch. Its box is sized to the iframe with nothing extra.
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

  const hasCalendar = Boolean(GHL_CALENDAR_URL)

  useEffect(() => {
    if (!hasCalendar) return undefined
    // GoHighLevel's own embed script — listens for postMessage events from
    // the booking iframe so it can auto-resize to fit the calendar content.
    const SRC = 'https://link.msgsndr.com/js/form_embed.js'
    if (document.querySelector(`script[src="${SRC}"]`)) return undefined
    const script = document.createElement('script')
    script.src = SRC
    script.async = true
    document.body.appendChild(script)
  }, [hasCalendar])

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

      <div ref={contentRef} className="relative mx-auto flex max-w-4xl flex-col items-center">
        {/* Header — this is the only part that animates in on scroll. */}
        <div className="booking-intro flex flex-col items-center">
          <span className="mono-label text-[13px] text-ion md:text-sm">PLAN UW AFSPRAAK</span>

          <h2 className="mt-6 text-center text-4xl leading-[1.1] text-ice font-sora font-bold md:text-6xl">
            Kies een moment.{' '}
            <span className="font-serif italic font-normal text-ice">Wij nemen het over.</span>
          </h2>

          <p className="mt-6 max-w-xl text-center text-base leading-relaxed text-ice opacity-90 md:text-lg">
            Boek direct hieronder een afspraak — geen telefoontje nodig, geen heen-en-weer gemail.
          </p>
        </div>

        {/* The calendar card itself is static — no animation, no transform —
            so the box is exactly whatever size its content (the iframe)
            is. One rounded overflow-hidden container, nothing nested. */}
        {hasCalendar ? (
          <div className="glow-ion relative mt-12 w-full overflow-hidden rounded-[2rem] bg-carbon ring-1 ring-platinum/10 md:rounded-[3rem]">
            {/* GoHighLevel's own embed script (form_embed.js) temporarily
                hides the iframe (opacity:0, visibility:hidden, position:
                absolute, left:-9999px) while it measures content height,
                then is supposed to reveal it again. In production builds
                that reveal step can get stuck, leaving the calendar
                permanently invisible. Since it sets these via inline style
                (highest specificity short of !important), the only way to
                force it back is an !important rule scoped to this iframe. */}
            <style>{`
              #6Tu3uqXDk1SvHNoekGSp_booking {
                opacity: 1 !important;
                visibility: visible !important;
                pointer-events: auto !important;
                position: static !important;
                left: auto !important;
              }
            `}</style>
            <iframe
              src={GHL_CALENDAR_URL}
              title="Boek een afspraak"
              id="6Tu3uqXDk1SvHNoekGSp_booking"
              scrolling="no"
              // GoHighLevel's own page renders a ~24-28px white strip at
              // both its top AND bottom specifically when embedded (neither
              // is there visiting the same URL directly — confirmed by
              // loading it standalone). That's on their page, not fixable
              // from our side, so clip-path crops exactly those slivers off
              // the iframe's rendering. clip-path only affects paint, not
              // the box's layout height, so nothing shifts — the card's own
              // dark background shows through both cropped strips instead
              // of GHL's white ones.
              style={{
                border: 'none',
                display: 'block',
                width: '100%',
                height: 720,
                backgroundColor: '#F4F4F5',
                clipPath: 'inset(28px 0 28px 0)',
              }}
            />
          </div>
        ) : (
          <div className="glow-ion relative mt-12 w-full overflow-hidden rounded-[2rem] bg-carbon ring-1 ring-platinum/10 md:rounded-[3rem]">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ion/10 blur-[110px]"
              aria-hidden="true"
            />

            <div className="relative flex flex-col items-center gap-6 px-6 py-16 text-center md:px-12 md:py-24">
              <div className="glow-ion flex h-16 w-16 items-center justify-center rounded-full bg-void ring-1 ring-ion/40 md:h-20 md:w-20">
                <CalendarClock className="h-8 w-8 text-ion md:h-9 md:w-9" strokeWidth={1.75} />
              </div>

              <p className="max-w-md text-[15px] leading-relaxed text-ice opacity-90 md:text-lg">
                Onze online kalender wordt binnenkort hier geactiveerd. Tot die tijd plant u uw
                afspraak direct via WhatsApp.
              </p>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="btn-magnetic relative glow-ion mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-ion px-8 py-4 text-ice"
              >
                <span className="btn-wipe" />
                <span className="btn-label inline-flex items-center gap-2 font-sora text-[15px] font-semibold md:text-base">
                  <MessageCircle className="h-5 w-5" strokeWidth={2} />
                  Boek via WhatsApp
                </span>
              </a>

              <span className="mono-label text-[13px] text-platinum opacity-90">
                {WHATSAPP_NUMBER}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
