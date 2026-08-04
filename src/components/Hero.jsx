import { useMemo } from 'react'
import { Star } from 'lucide-react'
import GoogleLogo from './GoogleLogo.jsx'
import { REVIEWS } from '../data/reviews.js'
import './Hero.css'

const TICKER_ITEMS = [
  'Voice AI Agents',
  'Review Automatisering',
  'Klant Reactivatie',
  'AI Chatbots',
  'Boekingssystemen',
]

const LINE_COUNT = 20
const LINE_WIDTHS = Array.from({ length: LINE_COUNT }, (_, i) => 60 + i * 10)

export default function Hero() {
  const averageRating = useMemo(() => {
    if (!REVIEWS.length) return null
    return REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length
  }, [])

  return (
    <section id="hero" className="hero3-section">
      <div className="hero3-lines-side is-left" aria-hidden="true">
        {LINE_WIDTHS.map((width, i) => (
          <div
            key={i}
            className="hero3-line-side"
            style={{ width: `${width}px`, animationDelay: `${i * 0.25}s` }}
          />
        ))}
      </div>

      <div className="hero3-lines-side is-right" aria-hidden="true">
        {LINE_WIDTHS.map((width, i) => (
          <div
            key={i}
            className="hero3-line-side"
            style={{ width: `${width}px`, animationDelay: `${i * 0.25}s` }}
          />
        ))}
      </div>

      <div className="hero3-lines-top" aria-hidden="true">
        {LINE_WIDTHS.map((height, i) => (
          <div
            key={i}
            className="hero3-line-top"
            style={{ height: `${height}px`, animationDelay: `${i * 0.25}s` }}
          />
        ))}
      </div>

      <div className="hero3-content">
        <div className="hero3-ticker">
          <div className="hero3-ticker-track">
            {Array.from({ length: 4 }).map((_, row) =>
              TICKER_ITEMS.map((item) => (
                <span key={`${row}-${item}`} className="hero3-ticker-item">
                  {item}
                </span>
              ))
            )}
          </div>
        </div>

        <h1 className="hero3-title">
          Nooit meer een
          <br />
          <span className="serif-italic">gemiste klant.</span>
        </h1>

        <p className="hero3-subtitle">
          Een flexibel AI-partnerschap voor ondernemers in Suriname die willen groeien zonder
          gedoe — volledig op uw tempo.
        </p>

        <div className="hero3-cta-row">
          <a href="#diensten" className="hero3-btn-primary">
            Bekijk diensten
          </a>

          <a href="#reviews" className="hero3-btn-review">
            <GoogleLogo className="hero3-btn-review-logo" />
            <span className="hero3-btn-book-text">
              <span className="hero3-btn-review-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    strokeWidth={1.5}
                    className={
                      averageRating !== null && i < Math.round(averageRating)
                        ? 'is-filled'
                        : ''
                    }
                  />
                ))}
              </span>
              <span className="hero3-btn-book-primary">
                {averageRating !== null ? `${averageRating.toFixed(1)} · Zie reviews` : 'Zie klantervaringen'}
              </span>
            </span>
          </a>
        </div>
      </div>

      <div className="hero3-fade" aria-hidden="true" />
    </section>
  )
}
