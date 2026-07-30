import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { Star } from 'lucide-react'
import { DEMO_URL } from '../constants.js'
import { REVIEWS } from '../data/reviews.js'
import GoogleLogo from './GoogleLogo.jsx'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920&auto=format&fit=crop'

export default function Hero() {
  const rootRef = useRef(null)

  const averageRating = useMemo(() => {
    if (!REVIEWS.length) return null
    return REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length
  }, [])

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

          <div className="hero-line flex flex-wrap items-center gap-4">
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

            <a href="#reviews" className="btn-magnetic group relative inline-flex items-center gap-3 rounded-full border border-platinum/30 bg-carbon/70 py-3 pl-4 pr-5 backdrop-blur-sm transition-colors duration-300 hover:border-ion/60 hover:shadow-ion-glow md:py-3.5 md:pl-5 md:pr-6">
              <GoogleLogo className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <span className="flex flex-col items-start leading-none">
                <span className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 md:h-3.5 md:w-3.5 ${
                        averageRating !== null && i < Math.round(averageRating)
                          ? 'fill-ion text-ion'
                          : 'fill-transparent text-platinum/25'
                      }`}
                      strokeWidth={1.5}
                    />
                  ))}
                </span>
                <span className="mt-1.5 font-sora text-[13px] font-semibold text-ice whitespace-nowrap md:text-[14px]">
                  {averageRating !== null ? `${averageRating.toFixed(1)} · Zie reviews` : 'Zie klantervaringen'}
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
