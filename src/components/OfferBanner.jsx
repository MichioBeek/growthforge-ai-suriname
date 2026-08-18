import { useState } from 'react'
import { X } from 'lucide-react'
import { WEBSITE_OFFER_NEXT_PRICE, WEBSITE_OFFER_SPOTS_REMAINING } from '../constants.js'
import './OfferBanner.css'

export default function OfferBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="offer-banner">
      <a href="#aanbod" className="offer-banner-link">
        <span className="offer-banner-dot">
          <span className="offer-banner-dot-ping" />
          <span className="offer-banner-dot-core" />
        </span>
        <span className="offer-banner-text">
          Introductieprijs: <strong>$50 website</strong> &mdash; nog{' '}
          {WEBSITE_OFFER_SPOTS_REMAINING} plekken, daarna {WEBSITE_OFFER_NEXT_PRICE}
        </span>
        <span className="offer-banner-arrow" aria-hidden="true">
          &rarr;
        </span>
      </a>
      <button
        type="button"
        className="offer-banner-close"
        aria-label="Melding sluiten"
        onClick={() => setDismissed(true)}
      >
        <X size={14} strokeWidth={2} />
      </button>
    </div>
  )
}
