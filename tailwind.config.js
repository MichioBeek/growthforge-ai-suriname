/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#FFFFFF',
        ion: '#3DE7DE',
        plasma: '#7C6BFF',
        platinum: '#6B6B6B',
        ice: '#0A0A0A',
        carbon: '#F4F4F5',
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
        'ion-glow': '0 0 20px rgba(61,231,222,0.35)',
        'ion-glow-lg': '0 0 40px rgba(61,231,222,0.45)',
      },
      transitionTimingFunction: {
        magnetic: 'cubic-bezier(0.25,0.46,0.45,0.94)',
      },
    },
  },
  plugins: [],
}
