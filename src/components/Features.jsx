import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone } from 'lucide-react'

// Defensive registration — App.jsx already registers this globally, but this
// component must stand on its own if ever rendered/tested in isolation.
gsap.registerPlugin(ScrollTrigger)

/**
 * Observes a root element and reports whether it is currently on screen.
 * Each card's internal micro-animation loop is gated on this so idle,
 * scrolled-away cards don't burn CPU/battery.
 */
function useInView(threshold = 0.3) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}

/* ------------------------------------------------------------------ */
/* Card 1 — Diagnostic Shuffler → Reactivatie AI                       */
/* ------------------------------------------------------------------ */

const SHUFFLE_RECORDS = [
  'Laatste bezoek · 3 mnd geleden',
  'Aanbod verstuurd · 10% korting',
  'Nieuwe afspraak · geboekt ✓',
]

function DiagnosticShuffler() {
  const [rootRef, inView] = useInView(0.3)
  const [records, setRecords] = useState(SHUFFLE_RECORDS)

  useEffect(() => {
    if (!inView) return undefined
    const id = setInterval(() => {
      setRecords((prev) => {
        const next = [...prev]
        const last = next.pop()
        next.unshift(last)
        return next
      })
    }, 3000)
    return () => clearInterval(id)
  }, [inView])

  return (
    <div ref={rootRef} className="relative mt-5 h-36 md:h-40">
      {records.map((label, i) => (
        <div
          key={label}
          className="absolute inset-x-0 flex h-11 items-center rounded-2xl border px-4 font-mono text-[13px] text-ice"
          style={{
            // 36px stagger keeps each row's centered text clear of the row
            // in front of it (row height is 44px) — a smaller stagger makes
            // the stacked labels visually collide/overlap into each other.
            top: `${i * 36}px`,
            zIndex: 10 - i,
            transform: `scale(${1 - i * 0.05})`,
            opacity: i === 0 ? 1 : i === 1 ? 0.92 : 0.85,
            background: i === 0 ? 'rgba(61,231,222,0.1)' : 'rgba(10,10,10,0.04)',
            borderColor: i === 0 ? 'rgba(61,231,222,0.4)' : 'rgba(10,10,10,0.12)',
            transitionProperty: 'top, transform, opacity, background, border-color',
            transitionDuration: '0.7s, 0.7s, 0.5s, 0.5s, 0.5s',
            transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          {label}
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Card 2 — Telemetry Typewriter → Google Review AI                     */
/* ------------------------------------------------------------------ */

const TELEMETRY_LINES = [
  { text: '→ Bedankt voor uw bezoek! Was u tevreden met het resultaat?', side: 'out' },
  { text: '← Ja, super!', side: 'in' },
  { text: '→ Wat fijn! Wilt u ons helpen met een korte review? ⭐', side: 'out' },
  { text: '→ [Google review link verstuurd]', side: 'out' },
]

function TelemetryTypewriter() {
  const [rootRef, inView] = useInView(0.3)
  const [typed, setTyped] = useState([])

  useEffect(() => {
    if (!inView) return undefined
    let cancelled = false
    const timeouts = []
    const after = (fn, ms) => timeouts.push(setTimeout(() => !cancelled && fn(), ms))

    const typeLine = (lineIndex, charIndex) => {
      if (cancelled) return
      if (lineIndex >= TELEMETRY_LINES.length) {
        after(() => {
          setTyped([])
          typeLine(0, 0)
        }, 2400)
        return
      }
      const full = TELEMETRY_LINES[lineIndex].text
      if (charIndex <= full.length) {
        setTyped((prev) => {
          const next = [...prev]
          next[lineIndex] = full.slice(0, charIndex)
          return next
        })
        after(() => typeLine(lineIndex, charIndex + 1), 24)
      } else {
        after(() => typeLine(lineIndex + 1, 0), 550)
      }
    }

    setTyped([])
    typeLine(0, 0)

    return () => {
      cancelled = true
      timeouts.forEach(clearTimeout)
    }
  }, [inView])

  return (
    <div
      ref={rootRef}
      className="mt-5 h-48 overflow-hidden rounded-2xl border border-platinum/15 bg-carbon p-4 md:h-52"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-ion animate-pulse" />
        <span className="mono-label text-[12px] uppercase text-ion md:text-[13px]">Live</span>
      </div>
      <div className="space-y-2 font-mono text-[13px] leading-snug">
        {TELEMETRY_LINES.map((line, i) => {
          const content = typed[i]
          if (content === undefined) return null
          const isCurrentLine = i === typed.length - 1 && content.length < line.text.length
          return (
            <p
              key={line.text}
              className={line.side === 'in' ? 'pl-4 text-platinum opacity-90' : 'text-ice'}
            >
              {content}
              {isCurrentLine && (
                <span className="ml-0.5 inline-block h-3.5 w-[7px] align-middle bg-ion animate-pulse" />
              )}
            </p>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Card 3 — Incoming Call Transcript → AI Telefoniste                   */
/* ------------------------------------------------------------------ */

const CALL_NUMBER = '+597 8 12 34 56'

const CALL_LINES = [
  { speaker: 'agent', text: 'Goedemiddag, met GrowthForge AI. Waarmee kan ik u helpen?' },
  { speaker: 'caller', text: 'Kan ik morgen een afspraak inplannen?' },
  { speaker: 'agent', text: 'Zeker, ik heb morgen 14:00 nog vrij. Zal ik dat voor u boeken?' },
]

function CallTranscript() {
  const [rootRef, inView] = useInView(0.3)
  // idle -> ringing -> answered (transcript typing) -> booked, then loops
  const [phase, setPhase] = useState('idle')
  const [typed, setTyped] = useState([])

  useEffect(() => {
    if (!inView) {
      setPhase('idle')
      setTyped([])
      return undefined
    }

    let cancelled = false
    const timeouts = []
    const after = (fn, ms) => timeouts.push(setTimeout(() => !cancelled && fn(), ms))

    const typeLine = (lineIndex, charIndex) => {
      if (cancelled) return
      if (lineIndex >= CALL_LINES.length) {
        after(() => setPhase('booked'), 500)
        after(runLoop, 3600)
        return
      }
      const full = CALL_LINES[lineIndex].text
      if (charIndex <= full.length) {
        setTyped((prev) => {
          const next = [...prev]
          next[lineIndex] = full.slice(0, charIndex)
          return next
        })
        after(() => typeLine(lineIndex, charIndex + 1), 22)
      } else {
        after(() => typeLine(lineIndex + 1, 0), 450)
      }
    }

    const runLoop = () => {
      if (cancelled) return
      setPhase('ringing')
      setTyped([])
      after(() => {
        setPhase('answered')
        typeLine(0, 0)
      }, 1200)
    }

    runLoop()

    return () => {
      cancelled = true
      timeouts.forEach(clearTimeout)
    }
  }, [inView])

  return (
    <div
      ref={rootRef}
      className="mt-5 flex h-48 flex-col overflow-hidden rounded-2xl border border-platinum/15 bg-carbon p-4 md:h-52"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Phone
            className={`h-3.5 w-3.5 text-ion ${phase === 'ringing' ? 'animate-bounce' : ''}`}
            strokeWidth={2.5}
            aria-hidden="true"
          />
          <span className="mono-label text-[12px] uppercase text-ion md:text-[13px]">
            {phase === 'idle' || phase === 'ringing' ? 'Inkomend gesprek' : 'Opgenomen — 1.4s'}
          </span>
        </div>
        <span className="mono-label text-[11px] text-platinum opacity-70 md:text-[12px]">
          {CALL_NUMBER}
        </span>
      </div>

      <div className="mt-3 flex-1 space-y-2 overflow-hidden font-mono text-[13px] leading-snug">
        {CALL_LINES.map((line, i) => {
          const content = typed[i]
          if (content === undefined) return null
          const isCurrentLine = i === typed.length - 1 && content.length < line.text.length
          return (
            <p
              key={line.text}
              className={line.speaker === 'caller' ? 'pl-4 text-platinum opacity-90' : 'text-ice'}
            >
              {content}
              {isCurrentLine && (
                <span className="ml-0.5 inline-block h-3.5 w-[7px] align-middle bg-ion animate-pulse" />
              )}
            </p>
          )
        })}
      </div>

      <div
        className={`mt-2 flex items-center gap-2 rounded-lg bg-ion/10 px-3 py-2 transition-opacity duration-300 ${
          phase === 'booked' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-ion" aria-hidden="true" />
        <span className="mono-label text-[11px] text-ion md:text-[12px]">
          GEBOEKT &middot; MORGEN 14:00
        </span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Card 4 — Conversational Bubble Stream → AI Chatbot                   */
/* ------------------------------------------------------------------ */

const VISITOR_MESSAGE = 'Zijn jullie zaterdag open?'
const BOT_MESSAGE = 'Ja! Zaterdag van 9:00 tot 15:00. Wilt u een afspraak maken?'

function ChatBubbleStream() {
  const [rootRef, inView] = useInView(0.3)
  const [phase, setPhase] = useState('idle') // idle -> visitor -> typing -> bot -> chips
  const [botTyped, setBotTyped] = useState('')

  useEffect(() => {
    if (!inView) {
      setPhase('idle')
      setBotTyped('')
      return undefined
    }

    let cancelled = false
    const timeouts = []
    const after = (fn, ms) => timeouts.push(setTimeout(() => !cancelled && fn(), ms))

    const runLoop = () => {
      setPhase('idle')
      setBotTyped('')

      after(() => setPhase('visitor'), 500)
      after(() => setPhase('typing'), 1400)
      after(() => {
        setPhase('bot')
        let i = 0
        const typeChar = () => {
          if (cancelled) return
          i += 1
          setBotTyped(BOT_MESSAGE.slice(0, i))
          if (i < BOT_MESSAGE.length) {
            timeouts.push(setTimeout(typeChar, 22))
          } else {
            after(() => setPhase('chips'), 450)
            after(runLoop, 4400)
          }
        }
        typeChar()
      }, 2400)
    }

    runLoop()

    return () => {
      cancelled = true
      timeouts.forEach(clearTimeout)
    }
  }, [inView])

  const showVisitor = phase !== 'idle'
  const showBotBubble = phase === 'bot' || phase === 'chips'

  return (
    <div
      ref={rootRef}
      className="mt-5 flex h-52 flex-col justify-end gap-2 overflow-hidden rounded-2xl border border-platinum/15 bg-carbon p-4 md:h-56"
    >
      <div
        className={`ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-platinum/10 px-3 py-2 text-[13px] text-ice transition-all duration-500 ${
          showVisitor ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
        }`}
      >
        {VISITOR_MESSAGE}
      </div>

      <div
        className={`flex w-fit items-center gap-1 rounded-2xl bg-platinum/10 px-3 py-2.5 transition-opacity duration-300 ${
          phase === 'typing' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-platinum/80" style={{ animationDelay: '0ms' }} />
        <span
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-platinum/80"
          style={{ animationDelay: '150ms' }}
        />
        <span
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-platinum/80"
          style={{ animationDelay: '300ms' }}
        />
      </div>

      {showBotBubble && (
        <div className="mr-auto max-w-[85%] rounded-2xl rounded-bl-sm border border-platinum/15 bg-carbon px-3 py-2 text-[13px] text-ice">
          {botTyped}
        </div>
      )}

      <div
        className={`flex gap-2 transition-opacity duration-400 ${
          phase === 'chips' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="rounded-full border border-ion/60 px-3 py-1 text-[12px] text-ion md:text-[13px]">
          Ja, graag
        </span>
        <span className="rounded-full border border-ion/60 px-3 py-1 text-[12px] text-ion md:text-[13px]">
          Meer info
        </span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Card 5 — Wireframe Assembler → Website op Maat                       */
/* ------------------------------------------------------------------ */

const SITE_BLOCKS = [
  { label: 'Navigatie', width: '40%' },
  { label: 'Hero-sectie', width: '85%' },
  { label: 'Diensten', width: '70%' },
  { label: 'Call-to-action', width: '55%' },
]

function WireframeAssembler() {
  const [rootRef, inView] = useInView(0.3)
  const [builtCount, setBuiltCount] = useState(0)

  useEffect(() => {
    if (!inView) {
      setBuiltCount(0)
      return undefined
    }
    let cancelled = false
    const timeouts = []
    const after = (fn, ms) => timeouts.push(setTimeout(() => !cancelled && fn(), ms))

    const runLoop = (i) => {
      if (cancelled) return
      if (i > SITE_BLOCKS.length) {
        after(() => runLoop(0), 1800)
        return
      }
      setBuiltCount(i)
      after(() => runLoop(i + 1), 550)
    }

    runLoop(0)

    return () => {
      cancelled = true
      timeouts.forEach(clearTimeout)
    }
  }, [inView])

  return (
    <div
      ref={rootRef}
      className="overflow-hidden rounded-2xl border border-platinum/15 bg-carbon"
    >
      <div className="flex items-center gap-1.5 border-b border-platinum/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-platinum/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-platinum/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-platinum/25" />
        <span className="mono-label ml-3 truncate text-[11px] text-platinum opacity-70">
          uwbedrijf.sr
        </span>
      </div>
      <div className="space-y-3 p-4 md:p-5">
        {SITE_BLOCKS.map((block, i) => (
          <div
            key={block.label}
            className="h-3 rounded-full transition-all duration-500 ease-out"
            style={{
              width: i < builtCount ? block.width : '0%',
              background:
                i === builtCount - 1 ? 'rgba(61,231,222,0.55)' : 'rgba(10,10,10,0.15)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Shared card shell                                                    */
/* ------------------------------------------------------------------ */

function FeatureCard({ title, descriptor, children }) {
  return (
    <div className="feature-card rounded-[2rem] border border-platinum/15 bg-carbon p-6 transition-shadow duration-500 hover:shadow-ion-glow md:p-8">
      <h3 className="font-sora text-xl font-bold text-ice md:text-2xl">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-platinum opacity-90 md:text-base">{descriptor}</p>
      {children}
    </div>
  )
}

// Wide, visually distinct card for the non-AI add-on service — spans both
// grid columns and uses the Plasma accent instead of Ion Cyan to read as a
// complementary offering sitting beneath the four core AI systems.
function WebsiteFeatureCard() {
  return (
    <div className="feature-card rounded-[2rem] border border-plasma/25 bg-carbon p-6 transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(124,107,255,0.25)] md:col-span-2 md:p-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
        <div className="md:max-w-xs md:flex-shrink-0">
          <span className="mono-label text-[12px] uppercase text-plasma">Ook Mogelijk</span>
          <h3 className="mt-3 font-sora text-xl font-bold text-ice md:text-2xl">
            Website op Maat
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-platinum opacity-90 md:text-base">
            Nog geen website, of aan vervanging toe? Wij bouwen een snelle, professionele site die
            bezoekers omzet in klanten — naadloos gekoppeld aan uw AI-assistenten.
          </p>
        </div>
        <div className="w-full md:flex-1">
          <WireframeAssembler />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Section                                                              */
/* ------------------------------------------------------------------ */

export default function Features() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.feature-card')
      if (!cards || !cards.length) return

      gsap.from(cards, {
        opacity: 0,
        y: 48,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="diensten" ref={sectionRef} className="circuit-grid relative bg-void px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <span className="mono-label text-[12px] uppercase text-ion md:text-[13px]">Onze Diensten</span>
          <h2 className="mt-4 font-sora text-3xl font-bold text-ice md:text-4xl">
            AI-systemen voor uw bedrijf. <span className="font-serif italic font-normal text-platinum">Eén onzichtbare crew.</span>
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <FeatureCard
            title="Reactivatie AI"
            descriptor="Brengt oude klanten automatisch terug met een persoonlijk aanbod."
          >
            <DiagnosticShuffler />
          </FeatureCard>

          <FeatureCard
            title="Google Review AI"
            descriptor="Stuurt na elke afspraak automatisch een bericht en haalt zo meer 5-sterren reviews binnen."
          >
            <TelemetryTypewriter />
          </FeatureCard>

          <FeatureCard
            title="AI Telefoniste"
            descriptor="Neemt gemiste en na-uur oproepen aan en boekt de beller direct in."
          >
            <CallTranscript />
          </FeatureCard>

          <FeatureCard
            title="AI Chatbot"
            descriptor="Beantwoordt vragen op uw website of WhatsApp — dag en nacht — en boekt bezoekers direct in."
          >
            <ChatBubbleStream />
          </FeatureCard>

          <WebsiteFeatureCard />
        </div>
      </div>
    </section>
  )
}
