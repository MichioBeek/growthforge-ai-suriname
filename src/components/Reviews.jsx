import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'
import { REVIEWS } from '../data/reviews.js'
import GoogleLogo from './GoogleLogo.jsx'

gsap.registerPlugin(ScrollTrigger)

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

  // Highest-rated reviews lead, newest breaks ties — keeps the strongest
  // social proof up front regardless of the order reviews are added in reviews.js.
  const sortedReviews = useMemo(
    () =>
      [...REVIEWS].sort((a, b) => b.rating - a.rating || new Date(b.date) - new Date(a.date)),
    [],
  )

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
    <section id="reviews" ref={sectionRef} className="relative bg-void px-6 py-24 md:py-32">
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
            sortedReviews.map((review) => <ReviewCard key={`${review.name}-${review.date}`} review={review} />)
          )}
        </div>
      </div>
    </section>
  )
}
