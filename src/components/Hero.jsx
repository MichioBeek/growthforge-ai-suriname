import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { DEMO_URL } from '../constants.js'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920&auto=format&fit=crop'

export default function Hero() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-line',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.2,
        }
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative min-h-[100dvh] w-full overflow-hidden flex items-end"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        aria-hidden="true"
      />

      {/* Heavy gradient overlay so all text stays legible against the image */}
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/90 to-black/60" aria-hidden="true" />
      <div className="absolute inset-0 bg-void/40" aria-hidden="true" />

      {/* Optional faint circuit texture */}
      <div className="circuit-grid absolute inset-0 opacity-20" aria-hidden="true" />

      {/* Content — bottom-left third of viewport */}
      <div className="relative z-10 w-full px-6 pb-16 sm:px-10 sm:pb-20 md:px-16 md:pb-24 lg:px-24">
        <div className="max-w-2xl">
          <div className="hero-line mb-6 flex items-center gap-3.5">
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ion opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ion sm:h-3 sm:w-3" />
            </span>
            <span className="mono-label text-ion text-[15px] sm:text-[17px] md:text-[19px] uppercase">
              AI-automatisering &middot; Suriname
            </span>
          </div>

          <p className="hero-line font-sora font-bold text-ice text-2xl sm:text-3xl md:text-3xl leading-tight tracking-[-0.02em]">
            Nooit meer een
          </p>

          <p className="hero-line font-serif italic text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.95] tracking-[-0.02em] mt-1 mb-6 md:mb-8">
            <span className="text-platinum">gemiste </span>
            <span className="text-ion">klant.</span>
          </p>

          <p className="hero-line text-ice opacity-90 text-[15px] sm:text-base md:text-lg leading-relaxed max-w-xl mb-8 md:mb-10">
            GrowthForge AI installeert slimme assistenten die uw telefoon opnemen, reviews
            binnenhalen en oude klanten terugbrengen — dag en nacht, volautomatisch.
          </p>

          <div className="hero-line">
            <a href={DEMO_URL} className="inline-block">
              <button
                type="button"
                className="btn-magnetic relative glow-ion bg-ion text-void rounded-full px-7 py-4 md:px-8 md:py-4"
              >
                <span className="btn-wipe" />
                <span className="btn-label font-sora font-semibold text-[15px] md:text-base whitespace-nowrap">
                  Plan een gratis demo
                </span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
