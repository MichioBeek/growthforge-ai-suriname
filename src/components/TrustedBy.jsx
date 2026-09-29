import { REVIEWS } from '../data/reviews.js'
import './TrustedBy.css'

// Only add an entry here once a real logo file has been pulled from that
// client's own site/brand assets — never a placeholder or invented mark.
// Clients without an entry here simply don't appear in the strip yet —
// logos only, no text-name fallback.
// w/h are each file's real intrinsic pixel size (not the rendered size —
// CSS still renders every logo at a fixed 32px height). Passed through as
// the <img> width/height attributes so the browser reserves the right
// aspect-ratio box before the image bytes arrive: without them every logo
// lays out at 0 width until it decodes, and each one popping in shoves the
// rest of the already-animating marquee track sideways — visible as a
// jump/cut right around whichever logo was still loading.
const CLIENT_LOGOS = {
  'R Flow Plumbing Solutions': { src: '/logos/r-flow-plumbing.png', w: 320, h: 241 },
  'Sen Studios': { src: '/logos/sen-creative-studios.png', w: 1076, h: 408 },
  'Quite Confidence': { src: '/logos/quiet-confidence-q.png', w: 337, h: 351 },
  'OGPictures': { src: '/logos/og-pictures.png', w: 870, h: 814 },
  'Reminisce Photography': { src: '/logos/reminisce-photography.png', w: 150, h: 150 },
}

// Clients we've built for who don't have a Google review in REVIEWS (yet) but
// should still show in the strip. Same rule: real logo file only, no invented
// marks. Kept separate from CLIENT_LOGOS so the review-linked list stays a
// pure mirror of REVIEWS.
const EXTRA_CLIENT_LOGOS = [
  { label: 'Squad Cuts', logo: '/logos/squad-cuts.png', w: 606, h: 760 },
  { label: 'The Hood', logo: '/logos/the-hood.png', w: 361, h: 361 },
  { label: 'SPF Catering', logo: '/logos/spf-catering.png', w: 647, h: 720 },
]

const LOGO_ITEMS = [
  ...REVIEWS.filter((r) => CLIENT_LOGOS[r.business]).map((r) => ({
    label: r.business,
    logo: CLIENT_LOGOS[r.business].src,
    w: CLIENT_LOGOS[r.business].w,
    h: CLIENT_LOGOS[r.business].h,
  })),
  ...EXTRA_CLIENT_LOGOS.map(({ label, logo, w, h }) => ({ label, logo, w, h })),
]

export default function TrustedBy() {
  if (LOGO_ITEMS.length === 0) return null

  return (
    <section className="tb-section">
      <div className="tb-inner">
        <p className="tb-label">Vertrouwd door ondernemers in heel Suriname</p>

        <div className="tb-marquee">
          <div className="tb-marquee-track">
            {/* Two identical groups. Each group carries its own trailing gap
               (padding-right), so the track is exactly two tiles wide and the
               -50% animation lands on a perfect seam every loop — no snap,
               even while large logo images are still loading. */}
            {Array.from({ length: 2 }).map((_, group) => (
              <div
                className="tb-marquee-group"
                key={group}
                aria-hidden={group === 1 ? 'true' : undefined}
              >
                {LOGO_ITEMS.map((item) => (
                  <img
                    key={`${group}-${item.label}`}
                    src={item.logo}
                    alt={item.label}
                    width={item.w}
                    height={item.h}
                    className="tb-logo-img"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
