import { useEffect, useRef, useState } from 'react'
import { DEMO_URL } from '../constants.js'
import Logo from './Logo.jsx'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const heroEl = document.getElementById('hero')
    if (!heroEl) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Once the hero's top edge has scrolled past the viewport top,
        // boundingClientRect.top goes negative — that's the cue to morph
        // the pill into its "scrolled" chrome state.
        setScrolled(entry.boundingClientRect.top < -10)
      },
      { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
    )

    observer.observe(heroEl)
    return () => observer.disconnect()
  }, [])

  const navLinks = [
    { label: 'Diensten', href: '#diensten' },
    { label: 'Werkwijze', href: '#werkwijze' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header
      ref={navRef}
      className={[
        'fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-3xl',
        'rounded-full transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] border',
        scrolled
          ? 'bg-void/60 backdrop-blur-xl border-platinum/20 shadow-ion-glow'
          : 'bg-transparent backdrop-blur-0 border-transparent',
      ].join(' ')}
    >
      <nav className="flex items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-3.5">
        <a
          href="#hero"
          className="flex items-center gap-2.5 font-sora font-semibold text-ice text-[15px] md:text-base tracking-[-0.02em] whitespace-nowrap"
        >
          <Logo className="h-7 w-7 md:h-8 md:w-8 rounded-[12px] shadow-ion-glow" />
          GrowthForge AI
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="link-lift text-platinum text-[15px] font-medium opacity-95"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href={DEMO_URL}>
          <button
            type="button"
            className="btn-magnetic relative glow-ion bg-ion text-void rounded-full px-5 py-2.5 md:px-6 md:py-2.5"
          >
            <span className="btn-wipe" />
            <span className="btn-label font-sora font-semibold text-[14px] md:text-[15px] whitespace-nowrap">
              Gratis demo
            </span>
          </button>
        </a>
      </nav>
    </header>
  )
}
