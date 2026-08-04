import { DEMO_URL } from '../constants.js'
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

          <a href={DEMO_URL} className="hero3-btn-book">
            <span className="hero3-btn-book-avatar">GF</span>
            <span className="hero3-btn-book-text">
              <span className="hero3-btn-book-primary">Plan een gratis demo</span>
              <span className="hero3-btn-book-secondary">
                <span className="hero3-btn-book-dot" />
                Kies een moment
              </span>
            </span>
          </a>
        </div>
      </div>

      <div className="hero3-fade" aria-hidden="true" />
    </section>
  )
}
