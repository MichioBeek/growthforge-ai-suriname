import { Link } from 'react-router-dom'
import { Mail, MessageCircle } from 'lucide-react'
import { CONTACT_EMAIL, WHATSAPP_LINK, WHATSAPP_NUMBER } from '../constants.js'
import Logo from './Logo.jsx'

const NAV_LINKS = [
  { label: 'Diensten', href: '#diensten' },
  { label: 'Werkwijze', href: '#werkwijze' },
  { label: 'Contact', href: '#contact' },
]

const LEGAL_LINKS = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Voorwaarden', href: '/voorwaarden' },
]

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden rounded-t-[4rem] bg-void px-6 pb-8 pt-20 md:px-12 md:pt-24"
    >
      <div
        className="circuit-grid pointer-events-none absolute inset-0 opacity-[0.05]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-9 w-9 rounded-[12px] shadow-ion-glow" />
              <span className="font-sora text-2xl font-bold tracking-[-0.02em] text-ice">
                GrowthForge AI
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-platinum opacity-90">
              AI-automatisering voor Surinaamse ondernemers.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-platinum/15 bg-carbon px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <span className="mono-label text-[12px] text-ice md:text-[13px]">
                Systeem Operationeel
              </span>
            </div>
          </div>

          <div>
            <h4 className="mono-label text-[12px] text-platinum opacity-90 md:text-[13px]">
              NAVIGATIE
            </h4>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="link-lift text-[15px] text-ice opacity-95">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mono-label text-[12px] text-platinum opacity-90 md:text-[13px]">
              CONTACT
            </h4>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="link-lift inline-flex items-center gap-2 text-[15px] text-ice opacity-95"
                >
                  <Mail className="h-4 w-4 text-platinum" aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="link-lift inline-flex items-center gap-2 text-[15px] text-ice opacity-95"
                >
                  <MessageCircle className="h-4 w-4 text-platinum" aria-hidden="true" />
                  {WHATSAPP_NUMBER}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-center justify-between gap-4 border-t border-platinum/10 pt-6 md:flex-row">
          <span className="text-[13px] text-platinum opacity-90">
            © {new Date().getFullYear()} GrowthForge AI. Alle rechten voorbehouden.
          </span>
          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="link-lift text-[13px] text-platinum opacity-90"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
