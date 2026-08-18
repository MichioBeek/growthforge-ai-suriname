import NoiseOverlay from '../components/NoiseOverlay.jsx'
import OfferBanner from '../components/OfferBanner.jsx'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import TrustedBy from '../components/TrustedBy.jsx'
import Features from '../components/Features.jsx'
import Philosophy from '../components/Philosophy.jsx'
import Protocol from '../components/Protocol.jsx'
import Trust from '../components/Trust.jsx'
import ChatDemo from '../components/ChatDemo.jsx'
import Reviews from '../components/Reviews.jsx'
import WebsiteOffer from '../components/WebsiteOffer.jsx'
import SlotCTA from '../components/SlotCTA.jsx'
import BookingSection from '../components/BookingSection.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <div className="relative bg-void">
      <NoiseOverlay />
      <OfferBanner />
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <Philosophy />
      <Protocol />
      <Trust />
      <ChatDemo />
      <Reviews />
      <WebsiteOffer />
      <SlotCTA />
      <BookingSection />
      <Footer />
    </div>
  )
}
