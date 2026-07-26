import { Routes, Route } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Home from './pages/Home.jsx'
import Voorwaarden from './pages/Voorwaarden.jsx'
import Privacy from './pages/Privacy.jsx'

gsap.registerPlugin(ScrollTrigger)

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/voorwaarden" element={<Voorwaarden />} />
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  )
}

export default App
