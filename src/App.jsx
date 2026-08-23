import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Home from './pages/Home.jsx'
import Voorwaarden from './pages/Voorwaarden.jsx'
import Privacy from './pages/Privacy.jsx'
import Pakket from './pages/Pakket.jsx'
import { PAKKET_ROUTE, HOME_ROUTE } from './constants.js'

gsap.registerPlugin(ScrollTrigger)

function usePageViewTracking() {
  const location = useLocation()

  useEffect(() => {
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
      <Route path={PAKKET_ROUTE} element={<Pakket />} />
      <Route path={HOME_ROUTE} element={<Home />} />
      <Route path="/voorwaarden" element={<Voorwaarden />} />
      <Route path="/privacy" element={<Privacy />} />
      {/* Old quiz URL — redirect so it never dead-ends if it's already been shared */}
      <Route path="/pakket" element={<Navigate to={PAKKET_ROUTE} replace />} />
    </Routes>
  )
}

export default App
