import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Home from './pages/Home.jsx'
import Voorwaarden from './pages/Voorwaarden.jsx'
import Privacy from './pages/Privacy.jsx'

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
      <Route path="/" element={<Home />} />
      <Route path="/voorwaarden" element={<Voorwaarden />} />
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  )
}

export default App
