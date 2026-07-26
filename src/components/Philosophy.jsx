import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Philosophy() {
  const sectionRef = useRef(null)
  const textureRef = useRef(null)
  const lineRefs = useRef([])
  lineRefs.current = []

  const addLineRef = (el) => {
    if (el && !lineRefs.current.includes(el)) lineRefs.current.push(el)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line-by-line fade-up reveal as the manifesto enters view.
      gsap.from(lineRefs.current, {
        y: 28,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
      })

      // Background circuit texture drifts slower than scroll (parallax).
      gsap.to(textureRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-void px-6 py-32 md:py-48">
      <div
        ref={textureRef}
        className="circuit-grid pointer-events-none absolute inset-x-0 -top-1/4 h-[150%] opacity-[0.08]"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        <p
          ref={addLineRef}
          className="max-w-2xl text-base leading-relaxed text-platinum opacity-90 md:text-lg"
        >
          De meeste bedrijven verliezen klanten aan drie dingen: gemiste telefoontjes, vergeten
          reviews, en stilte na het eerste bezoek.
        </p>

        <p
          ref={addLineRef}
          className="font-sora text-4xl font-bold leading-[1.15] tracking-tight text-ice md:text-6xl lg:text-7xl"
        >
          Wij vangen ze <span className="text-ion">allemaal</span> op — met AI die nooit slaapt.
        </p>
      </div>
    </section>
  )
}
