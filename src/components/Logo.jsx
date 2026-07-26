export default function Logo({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <filter id="logo-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>
      <rect width="48" height="48" rx="12" fill="#080B14" />
      <path
        d="M14 32 L24 16 L34 32"
        fill="none"
        stroke="#3DE7DE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <circle cx="24" cy="16" r="6" fill="#3DE7DE" opacity="0.35" filter="url(#logo-glow)" />
      <circle cx="14" cy="32" r="3.2" fill="#CBD5E1" />
      <circle cx="34" cy="32" r="3.2" fill="#CBD5E1" />
      <circle cx="24" cy="16" r="4.2" fill="#3DE7DE" />
    </svg>
  )
}
