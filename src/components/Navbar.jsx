import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { DEMO_URL } from '../constants.js'
import Logo from './Logo.jsx'
import './Navbar.css'

const DRAWER_LINKS = [
  { label: 'Diensten', href: '#diensten' },
  { label: 'Werkwijze', href: '#werkwijze' },
  { label: 'Demo', href: '#demo' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <>
      <header className="nav2-header">
        <div className="nav2-inner">
          <a href="#hero" className="nav2-logo" onClick={() => setOpen(false)}>
            <Logo className="nav2-logo-icon h-8 w-8" />
            GrowthForge AI
          </a>

          <button
            type="button"
            className={`nav2-menu-btn${open ? ' is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {open ? 'Sluiten' : 'Menu'}
            <ChevronUp size={16} />
          </button>
        </div>
      </header>

      <div className={`nav2-drawer${open ? ' is-open' : ''}`}>
        <nav className="nav2-drawer-links">
          {DRAWER_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href={DEMO_URL} onClick={() => setOpen(false)}>
            Plan een demo
          </a>
        </nav>
        <div className="nav2-drawer-footer">
          © {new Date().getFullYear()} GrowthForge AI. Alle rechten voorbehouden.
        </div>
      </div>
    </>
  )
}
