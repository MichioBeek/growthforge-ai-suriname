import { useEffect, useState } from 'react'
import { X, Check } from 'lucide-react'
import KortingForm from './KortingForm.jsx'
import { KORTING_STORAGE_KEY } from '../constants.js'
import { track } from '../lib/track.js'

// Homepage capture popup for the "$25 korting" funnel. Opens once a visitor has
// shown some interest (scrolled ~40% or stayed 15s), or when anything dispatches
// the 'open-korting' event (the KortingBand button), or the URL ends in #korting. Closing it hides it for 7 days;
// signing up hides it for good. Never auto-opens for someone who already signed up.

const SNOOZE_DAYS = 7

function readFlag() {
  try { return localStorage.getItem(KORTING_STORAGE_KEY) } catch { return null }
}

function isSnoozed() {
  const v = readFlag()
  if (!v) return false
  if (v === 'signed-up') return true
  const until = Number(v)
  return Number.isFinite(until) && Date.now() < until
}

export default function KortingPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const manual = () => setOpen(true)
    window.addEventListener('open-korting', manual)
    // omzetto.com/#korting opens it straight away (handy for links and bios)
    if (window.location.hash === '#korting') setOpen(true)
    if (isSnoozed()) return () => window.removeEventListener('open-korting', manual)

    let fired = false
    const fire = () => {
      if (fired || isSnoozed()) return
      fired = true
      setOpen(true)
      cleanup()
    }
    const onScroll = () => {
      const h = document.documentElement
      if (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) > 0.4) fire()
    }
    const timer = setTimeout(fire, 15000)
    window.addEventListener('scroll', onScroll, { passive: true })
    function cleanup() {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
    return () => { cleanup(); window.removeEventListener('open-korting', manual) }
  }, [])

  useEffect(() => {
    if (!open) return
    track('popup')
    // Freeze the page behind the popup so only the popup is on screen.
    const html = document.documentElement
    const prev = [html.style.overflow, document.body.style.overflow]
    html.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      html.style.overflow = prev[0]
      document.body.style.overflow = prev[1]
    }
  }, [open])

  function close() {
    setOpen(false)
    if (readFlag() === 'signed-up') return
    try {
      localStorage.setItem(KORTING_STORAGE_KEY, String(Date.now() + SNOOZE_DAYS * 864e5))
    } catch { /* private mode */ }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex touch-none items-end justify-center overscroll-contain bg-forest/70 p-3 backdrop-blur-md sm:items-center sm:p-4"
      onClick={close}
      role="presentation"
    >
      {/* A voucher: dark stub with the amount, a perforated tear line, the form below. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="korting-title"
        onClick={(e) => e.stopPropagation()}
        className="korting-pop relative max-h-[96dvh] w-full max-w-[26rem] touch-auto overflow-y-auto overscroll-contain rounded-[1.75rem] bg-void shadow-[0_30px_80px_-20px_rgba(13,31,24,0.6)]"
      >
        <div className="relative overflow-hidden rounded-t-[1.75rem] bg-forest px-7 pb-8 pt-7 sm:px-8 [@media(max-height:760px)]:pb-5 [@media(max-height:760px)]:pt-5">
          {/* brand arc, very faint */}
          <svg viewBox="0 0 72 72" aria-hidden="true" className="pointer-events-none absolute -right-10 -top-12 h-52 w-52 opacity-[0.09]">
            <g transform="translate(4,6)">
              <path d="M 32 4 A 28 28 0 1 0 59.5 36" fill="none" stroke="#35d99a" strokeWidth="9" strokeLinecap="round" />
              <path d="M 47 10 L 63 4 L 60 21" fill="none" stroke="#35d99a" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
          <button
            type="button"
            onClick={close}
            aria-label="Sluiten"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#9db8ac] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-plasma"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <p className="pr-10 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-plasma">
            Welkomstkorting · 7 dagen geldig
          </p>
          <h2 id="korting-title" className="mt-3 flex items-end gap-3 text-white">
            <span className="font-sora text-[64px] font-extrabold leading-[0.85] tracking-[-0.05em] text-plasma sm:text-[72px] [@media(max-height:760px)]:text-[52px]">$25</span>
            <span className="pb-1 font-serif text-[30px] italic leading-none sm:text-[34px]">korting</span>
          </h2>
          <p className="mt-4 max-w-[19rem] text-[15px] leading-relaxed text-[#c9d6cf] [@media(max-height:760px)]:mt-3 [@media(max-height:760px)]:text-[14px] [@media(max-height:760px)]:leading-snug">
            Op je eerste website, WhatsApp-bot of boekingssysteem. Laat je WhatsApp-nummer achter,
            dan krijg je je code meteen.
          </p>
        </div>

        {/* perforated tear line */}
        <div aria-hidden="true" className="relative h-0">
          <span className="absolute left-5 right-5 top-0 border-t-2 border-dashed border-forest/15" />
        </div>

        <div className="px-7 pb-7 pt-6 sm:px-8 [@media(max-height:760px)]:pb-5 [@media(max-height:760px)]:pt-4">
          <KortingForm source="popup" />
          <ul className="mt-5 [@media(max-height:760px)]:mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[12px] text-platinum">
            <li className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-ion" aria-hidden="true" />Geen verplichting</li>
            <li className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-ion" aria-hidden="true" />Stoppen kan altijd</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
