import NoiseOverlay from '../components/NoiseOverlay.jsx'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import TrustedBy from '../components/TrustedBy.jsx'
import Features from '../components/Features.jsx'
import Philosophy from '../components/Philosophy.jsx'
import Protocol from '../components/Protocol.jsx'
import Trust from '../components/Trust.jsx'
import ChatDemo from '../components/ChatDemo.jsx'
import Reviews from '../components/Reviews.jsx'
import SlotCTA from '../components/SlotCTA.jsx'
import BookingSection from '../components/BookingSection.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <div className="relative bg-void">
      <NoiseOverlay />
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <Philosophy />
      <Protocol />
      <Trust />
      <ChatDemo />
      <Reviews />
      <SlotCTA />
      <BookingSection />
      <Footer />
    </div>
  )
}
