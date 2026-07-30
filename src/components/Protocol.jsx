import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    number: '01',
    title: 'Analyse',
    description:
      'We bekijken uw bedrijf: gemiste oproepen, aantal reviews en terugkerende klanten. U ziet precies waar u omzet laat liggen.',
  },
  {
    number: '02',
    title: 'Installatie',
    description:
      'We installeren en trainen uw AI-assistenten op úw bedrijf. Live binnen enkele dagen, zonder gedoe.',
  },
  {
    number: '03',
    title: 'Groei',
    description:
      'De AI draait dag en nacht. U ziet meer boekingen, meer reviews en meer herhaalklanten — automatisch.',
  },
]

// Motif 1 — slowly rotating concentric circles (Ion / Plasma line-art).
function AnalyseMotif() {
  return (
    <svg viewBox="0 0 300 300" className="h-56 w-56 md:h-72 md:w-72" fill="none" aria-hidden="true">
      <circle
        cx="150"
        cy="150"
        r="130"
        stroke="#3DE7DE"
        strokeOpacity="0.35"
        strokeWidth="1"
        className="gf-spin-slow"
        style={{ transformOrigin: '150px 150px' }}
      />
      <circle
        cx="150"
        cy="150"
        r="95"
        stroke="#7C6BFF"
        strokeOpacity="0.5"
        strokeWidth="1"
        strokeDasharray="3 9"
        className="gf-spin-reverse"
        style={{ transformOrigin: '150px 150px' }}
      />
      <circle
        cx="150"
        cy="150"
        r="58"
        stroke="#3DE7DE"
        strokeOpacity="0.75"
        strokeWidth="1.5"
        className="gf-spin-fast"
        style={{ transformOrigin: '150px 150px' }}
      />
    </svg>
  )
}

// Motif 2 — scanning laser line sweeping over a dot grid.
function InstallatieMotif() {
  const cols = 8
  const rows = 8
  const spacing = 28
  const offset = 14
  const dots = []
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      dots.push({ x: offset + col * spacing, y: offset + row * spacing })
    }
  }

  return (
    <div className="relative h-56 w-56 overflow-hidden rounded-[1.5rem] border border-platinum/10 bg-void/40 md:h-72 md:w-72">
      <svg viewBox="0 0 224 224" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {dots.map((d) => (
          <circle key={`${d.x}-${d.y}`} cx={d.x} cy={d.y} r="1.6" fill="#CBD5E1" fillOpacity="0.35" />
        ))}
      </svg>
      <div className="gf-scan absolute inset-x-0 h-[2px] bg-ion shadow-[0_0_14px_4px_rgba(61,231,222,0.55)]" />
    </div>
  )
}

// Motif 3 — pulsing EKG / heartbeat waveform.
function GroeiMotif() {
  return (
    <svg
      viewBox="0 0 400 120"
      className="h-32 w-64 md:h-40 md:w-80"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 60 H60 L80 60 L95 15 L112 105 L128 60 L150 60 L165 40 L182 80 L198 60 H400"
        stroke="#3DE7DE"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="gf-ekg-path"
      />
    </svg>
  )
}

const MOTIFS = [AnalyseMotif, InstallatieMotif, GroeiMotif]

export default function Protocol() {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current
      const steps = cards.length

      // Cards after the first start staged just below the viewport, ready to
      // slide up over the one before them.
      cards.forEach((card, i) => {
        if (i > 0) gsap.set(card, { yPercent: 100 })
      })

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${(steps - 1) * window.innerHeight}`,
        pin: true,
        scrub: 0.3,
        onUpdate: (self) => {
          const progress = self.progress * (steps - 1)

          // Slide each card (after the first) up into place as its turn comes.
          cards.forEach((card, i) => {
            if (i === 0) return
            const local = gsap.utils.clamp(0, 1, progress - (i - 1))
            gsap.set(card, { yPercent: 100 - 100 * local })
          })

          // Bury each card (except the last) as the next one arrives on top.
          cards.forEach((card, i) => {
            if (i === steps - 1) return
            const localNext = gsap.utils.clamp(0, 1, progress - i)
            gsap.set(card, {
              scale: 1 - 0.1 * localNext,
              opacity: 1 - 0.5 * localNext,
            })
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="werkwijze" ref={sectionRef} className="relative bg-void">
      <style>{`
        @keyframes gfSpinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes gfSpinReverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes gfSpinFast { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .gf-spin-slow { animation: gfSpinSlow 30s linear infinite; }
        .gf-spin-reverse { animation: gfSpinReverse 22s linear infinite; }
        .gf-spin-fast { animation: gfSpinFast 16s linear infinite; }

        @keyframes gfScan {
          0% { top: -2px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .gf-scan { animation: gfScan 3.2s ease-in-out infinite; }

        .gf-ekg-path {
          stroke-dasharray: 260 1200;
          animation: gfDash 2.4s linear infinite;
        }
        @keyframes gfDash {
          from { stroke-dashoffset: 1460; }
          to { stroke-dashoffset: -1460; }
        }
      `}</style>

      <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
        {STEPS.map((step, i) => {
          const Motif = MOTIFS[i]
          return (
            <div
              key={step.number}
              ref={(el) => (cardRefs.current[i] = el)}
              className="absolute inset-3 flex items-center overflow-hidden rounded-[3rem] border border-platinum/10 bg-carbon md:inset-8"
              style={{ zIndex: 10 + i * 10, willChange: 'transform, opacity' }}
            >
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-plasma/10 blur-[110px]" />

              <div className="relative flex w-full flex-col-reverse items-center justify-between gap-10 px-6 py-12 md:flex-row md:gap-16 md:px-16">
                <div className="max-w-lg text-center md:text-left">
                  <div className="flex items-baseline justify-center gap-3 md:justify-start">
                    <span className="mono-label text-[13px] text-ion md:text-sm">
                      {step.number}
                    </span>
                    <span className="mono-label text-[13px] text-platinum opacity-90 md:text-sm">
                      ·
                    </span>
                    <h3 className="font-sora text-3xl font-semibold tracking-tight text-ice md:text-5xl">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-6 text-base leading-relaxed text-platinum opacity-90 md:text-lg">
                    {step.description}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <Motif />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
