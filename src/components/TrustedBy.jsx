import { REVIEWS } from '../data/reviews.js'
import './TrustedBy.css'

// Real client names first, then the industries GrowthForge AI actually
// serves — never fabricated company logos or claimed partnerships.
const LOGO_ITEMS = [
  ...REVIEWS.map((r) => ({ label: r.business, font: "'Source Serif 4', serif" })),
  { label: 'Kappers & Barbershops', font: "Georgia, serif" },
  { label: 'Klinieken', font: "'Inter', sans-serif" },
  { label: 'Fotografen', font: "system-ui, sans-serif" },
  { label: 'Autobedrijven', font: "'Inter', sans-serif" },
  { label: 'Restaurants', font: "Georgia, serif" },
]

export default function TrustedBy() {
  return (
    <section className="tb-section">
      <div className="tb-inner">
        <p className="tb-label">Vertrouwd door ondernemers in heel Suriname</p>

        <div className="tb-marquee">
          <div className="tb-marquee-track">
            {Array.from({ length: 4 }).map((_, row) =>
              LOGO_ITEMS.map((item) => (
                <span
                  key={`${row}-${item.label}`}
                  className="tb-logo"
                  style={{ fontFamily: item.font }}
                >
                  {item.label}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
