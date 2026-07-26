export default function NoiseOverlay() {
  return (
    <svg className="noise-overlay" aria-hidden="true">
      <filter id="neural-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#neural-noise)" />
    </svg>
  )
}
