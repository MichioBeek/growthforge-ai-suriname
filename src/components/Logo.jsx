export default function Logo({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="logo-chrome" x1="32" y1="28" x2="100" y2="104" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#EAF2FB" />
          <stop offset="0.45" stopColor="#8FE4DF" />
          <stop offset="1" stopColor="#3DE7DE" />
        </linearGradient>
        <linearGradient id="logo-tile" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#111A2B" />
          <stop offset="1" stopColor="#080B14" />
        </linearGradient>
        <filter id="logo-halo" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id="logo-core-glow" x="-160%" y="-160%" width="420%" height="420%">
          <feGaussianBlur stdDeviation="3.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect x="0" y="0" width="128" height="128" rx="30" fill="url(#logo-tile)" />
      <rect
        x="0.75"
        y="0.75"
        width="126.5"
        height="126.5"
        rx="29.25"
        fill="none"
        stroke="#3DE7DE"
        strokeOpacity="0.18"
        strokeWidth="1.5"
      />
      <g transform="translate(16,16)">
        <path
          d="M78 30 L66 18 L30 18 L18 30 L18 66 L30 78 L66 78 L78 66 L78 48 L48 48"
          fill="none"
          stroke="#7C6BFF"
          strokeWidth="11"
          strokeLinejoin="miter"
          filter="url(#logo-halo)"
          opacity="0.3"
        />
        <path
          d="M78 30 L66 18 L30 18 L18 30 L18 66 L30 78 L66 78 L78 66 L78 48 L48 48"
          fill="none"
          stroke="url(#logo-chrome)"
          strokeWidth="11"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
        <rect x="40" y="40" width="16" height="16" rx="2" fill="#3DE7DE" filter="url(#logo-core-glow)" />
      </g>
    </svg>
  )
}
