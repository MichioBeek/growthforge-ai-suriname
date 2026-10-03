/** @type {import('tailwindcss').Config} */
// Omzetto palette (rebrand Okt 2026). The old Neural Chrome token NAMES are
// kept (void/ion/plasma/platinum/ice/carbon) and remapped to the new brand
// colors, so every page — Home, Pakket, Start, Privacy, Voorwaarden — reskins
// in one place without touching their class names. Source of truth:
// ~/Desktop/WORK/Omzetto/brand/BRAND.md
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#f7f5f0', // page background (bone)
        ion: '#0e7a55', // primary accent on light bg (green)
        plasma: '#35d99a', // accent on dark bg (mint)
        platinum: '#5d6a62', // muted text (green-gray)
        ice: '#14201a', // primary text (ink, green cast)
        carbon: '#edeae3', // card background
        forest: '#0d1f18', // dark sections / CTA band
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        '2xl-plus': '2rem',
        '3xl-plus': '3rem',
        '4xl-plus': '4rem',
      },
      boxShadow: {
        'ion-glow': '0 0 20px rgba(14,122,85,0.25)',
        'ion-glow-lg': '0 0 40px rgba(14,122,85,0.3)',
      },
      transitionTimingFunction: {
        magnetic: 'cubic-bezier(0.25,0.46,0.45,0.94)',
      },
    },
  },
  plugins: [],
}
