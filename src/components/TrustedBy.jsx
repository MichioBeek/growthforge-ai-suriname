import { REVIEWS } from '../data/reviews.js'
import './TrustedBy.css'

// Only add an entry here once a real logo file has been pulled from that
// client's own site/brand assets — never a placeholder or invented mark.
// Clients without an entry here simply don't appear in the strip yet —
// logos only, no text-name fallback.
const CLIENT_LOGOS = {
  'R Flow Plumbing Solutions': '/logos/r-flow-plumbing.png',
  'Sen Studios': '/logos/sen-creative-studios.png',
  'Quite Confidence': '/logos/quiet-confidence-q.png',
  'OGPictures': '/logos/og-pictures.png',
  'Reminisce Photography': '/logos/reminisce-photography.png',
}

// Clients we've built for who don't have a Google review in REVIEWS (yet) but
// should still show in the strip. Same rule: real logo file only, no invented
// marks. Kept separate from CLIENT_LOGOS so the review-linked list stays a
// pure mirror of REVIEWS.
const EXTRA_CLIENT_LOGOS = [
  { label: 'Squad Cuts', logo: '/logos/squad-cuts.png' },
  { label: 'The Hood', logo: '/logos/the-hood.png' },
  { label: 'SPF Catering', logo: '/logos/spf-catering.png' },
]

const LOGO_ITEMS = [
  ...REVIEWS.filter((r) => CLIENT_LOGOS[r.business]).map((r) => ({
    label: r.business,
    logo: CLIENT_LOGOS[r.business],
  })),
  ...EXTRA_CLIENT_LOGOS,
]

export default function TrustedBy() {
  if (LOGO_ITEMS.length === 0) return null

  return (
    <section className="tb-section">
      <div className="tb-inner">
        <p className="tb-label">Vertrouwd door ondernemers in heel Suriname</p>

        <div className="tb-marquee">
          <div className="tb-marquee-track">
            {Array.from({ length: 4 }).map((_, row) =>
              LOGO_ITEMS.map((item) => (
                <img
                  key={`${row}-${item.label}`}
                  src={item.logo}
                  alt={item.label}
                  className="tb-logo-img"
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
