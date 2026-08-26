import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, ChevronDown, Star } from 'lucide-react'
import { REVIEWS } from '../data/reviews.js'
import GoogleLogo from './GoogleLogo.jsx'

gsap.registerPlugin(ScrollTrigger)

// Past this length a quote gets clamped with a "Lees meer" toggle instead of
// stretching its card (and every card in its grid row) to match.
const QUOTE_CLAMP_THRESHOLD = 260

// Two full rows on desktop — beyond this, reviews hide behind "Bekijk meer"
// so the section stays clean as more reviews come in over time.
const INITIAL_VISIBLE_COUNT = 6

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
  const [expanded, setExpanded] = useState(false)
  const isLong = review.quote.length > QUOTE_CLAMP_THRESHOLD

  return (
    <div className="review-card flex flex-col rounded-[2rem] border border-platinum/15 bg-carbon p-6 transition-shadow duration-500 hover:shadow-ion-glow md:p-7">
      <div className="flex items-center justify-between gap-3">
        <StarRating rating={review.rating} />
        <GoogleLogo className="h-5 w-5 shrink-0" />
      </div>
      <p
        className={`mt-5 text-[15px] leading-relaxed text-ice opacity-95 ${
          isLong && !expanded ? 'line-clamp-5' : ''
        }`}
      >
        “{review.quote}”
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mono-label mt-2 self-start text-[11px] uppercase text-ion transition-colors duration-300 hover:text-ice"
        >
          {expanded ? 'Lees minder' : 'Lees meer'}
        </button>
      )}
      <div className="mt-6 flex items-end justify-between gap-3 border-t border-platinum/10 pt-4">
        <div>
          <p className="font-sora text-[15px] font-semibold text-ice">{review.name}</p>
          <p className="mono-label text-[12px] text-platinum opacity-90">{review.business}</p>
        </div>
        {review.url && (
          <a
            href={review.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link mono-label flex shrink-0 items-center gap-1 text-[11px] uppercase text-ion transition-colors duration-300 hover:text-ice"
          >
            Bekijk site
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        )}
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
  const [showAll, setShowAll] = useState(false)

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

  const hasOverflow = sortedReviews.length > INITIAL_VISIBLE_COUNT
  const visibleReviews = showAll ? sortedReviews : sortedReviews.slice(0, INITIAL_VISIBLE_COUNT)

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

  // Reveal only the newly-added cards when "Bekijk meer" expands the grid —
  // the first batch already had its scroll-triggered entrance above.
  useEffect(() => {
    if (!showAll) return
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.review-card')
      const newCards = Array.from(cards ?? []).slice(INITIAL_VISIBLE_COUNT)
      if (!newCards.length) return
      gsap.from(newCards, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [showAll])

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
          className={
            REVIEWS.length === 0 ? '' : 'grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start md:gap-8'
          }
        >
          {REVIEWS.length === 0 ? (
            <EmptyState />
          ) : (
            visibleReviews.map((review) => <ReviewCard key={`${review.name}-${review.date}`} review={review} />)
          )}
        </div>

        {hasOverflow && (
          <div className="mt-10 flex justify-center md:mt-14">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="group inline-flex items-center gap-2 rounded-full bg-ice px-6 py-3 font-sora text-[14px] font-semibold text-void transition-transform duration-300 hover:-translate-y-0.5"
            >
              {showAll ? 'Toon minder' : `Bekijk alle ${sortedReviews.length} reviews`}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
