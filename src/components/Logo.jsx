// Omzetto mark: ring opening into an upward arrow (omzet die stijgt), on a
// forest tile. Master SVG lives in ~/Desktop/WORK/Omzetto/brand/.
export default function Logo({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <rect x="0" y="0" width="128" height="128" rx="30" fill="#0d1f18" />
      <g transform="translate(30,34)">
        <path
          d="M 30 4 A 26 26 0 1 0 55.5 34"
          fill="none"
          stroke="#35d99a"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path
          d="M 44 10 L 59 4 L 56.2 20"
          fill="none"
          stroke="#35d99a"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
