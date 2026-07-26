import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'
import { REVIEWS } from '../data/reviews.js'

gsap.registerPlugin(ScrollTrigger)

// Official Google "G" mark — used purely as attribution, identifying the
// review source, not as a functional Google-provided widget.
function GoogleLogo({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18A13.98 13.98 0 0 1 10.96 24c0-1.45.25-2.86.73-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  )
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} van 5 sterren`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-ion text-ion' : 'fill-transparent text-platinum/25'}`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <div className="review-card flex h-full flex-col rounded-[2rem] border border-platinum/15 bg-carbon p-6 transition-shadow duration-500 hover:shadow-ion-glow md:p-7">
      <div className="flex items-center justify-between gap-3">
        <StarRating rating={review.rating} />
        <GoogleLogo className="h-5 w-5 shrink-0" />
      </div>
      <p className="mt-5 flex-1 text-[15px] leading-relaxed text-ice opacity-95">
        “{review.quote}”
      </p>
      <div className="mt-6 border-t border-platinum/10 pt-4">
        <p className="font-sora text-[15px] font-semibold text-ice">{review.name}</p>
        <p className="mono-label text-[12px] text-platinum opacity-90">{review.business}</p>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="review-card mx-auto max-w-xl rounded-[2rem] border border-platinum/15 bg-carbon px-8 py-14 text-center md:px-14 md:py-16">
      <GoogleLogo className="mx-auto h-8 w-8" />
      <p className="mono-label mt-5 text-[12px] uppercase text-ion md:text-[13px]">
        Google Reviews
      </p>
      <p className="mt-4 text-lg leading-relaxed text-ice md:text-xl">
        We zijn net gestart — onze eerste Google reviews verschijnen hier zodra klanten ze
        achterlaten.
      </p>
      <p className="mt-3 text-[14px] leading-relaxed text-platinum opacity-90">
        Elke review die u hier ziet, is 100% echt en ongefilterd.
      </p>
    </div>
  )
}

export default function Reviews() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  const averageRating = useMemo(() => {
    if (!REVIEWS.length) return null
    return REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.review-card')
      if (!cards?.length) return
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 82%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-void px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <span className="mono-label text-[12px] uppercase text-ion md:text-[13px]">
            Klantervaringen
          </span>
          <h2 className="mt-4 font-sora text-3xl font-bold text-ice md:text-4xl">
            Wat klanten <span className="font-serif italic font-normal text-platinum">over ons zeggen.</span>
          </h2>

          {averageRating !== null && (
            <div className="mt-6 flex items-center justify-center gap-2.5">
              <StarRating rating={Math.round(averageRating)} />
              <span className="font-sora text-[15px] font-semibold text-ice">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-[14px] text-platinum opacity-90">
                · {REVIEWS.length} {REVIEWS.length === 1 ? 'Google review' : 'Google reviews'}
              </span>
            </div>
          )}
        </div>

        <div
          ref={gridRef}
          className={REVIEWS.length === 0 ? '' : 'grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8'}
        >
          {REVIEWS.length === 0 ? (
            <EmptyState />
          ) : (
            REVIEWS.map((review) => <ReviewCard key={`${review.name}-${review.date}`} review={review} />)
          )}
        </div>
      </div>
    </section>
  )
}
