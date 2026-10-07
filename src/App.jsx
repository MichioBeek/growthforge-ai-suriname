import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Home from './pages/Home.jsx'
import Voorwaarden from './pages/Voorwaarden.jsx'
import Privacy from './pages/Privacy.jsx'
import Pakket from './pages/Pakket.jsx'
import Start from './pages/Start.jsx'
import Korting from './pages/Korting.jsx'
import { PAKKET_ROUTE, HOME_ROUTE, START_ROUTE, KORTING_ROUTE, KORTING_LIVE } from './constants.js'
import { track, startPing } from './lib/track.js'

gsap.registerPlugin(ScrollTrigger)

function usePageViewTracking() {
  const location = useLocation()

  useEffect(() => {
    track('view', location.pathname)
    startPing()
    if (typeof window.gtag !== 'function') return
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
    })
  }, [location])
}

function App() {
  usePageViewTracking()

  return (
    <Routes>
      <Route path={HOME_ROUTE} element={<Home />} />
      <Route path={PAKKET_ROUTE} element={<Pakket />} />
      <Route path={START_ROUTE} element={<Start />} />
      {KORTING_LIVE && <Route path={KORTING_ROUTE} element={<Korting />} />}
      <Route path="/voorwaarden" element={<Voorwaarden />} />
      <Route path="/privacy" element={<Privacy />} />
      {/* Anything else falls back to the homepage */}
      <Route path="*" element={<Navigate to={HOME_ROUTE} replace />} />
    </Routes>
  )
}

export default App
