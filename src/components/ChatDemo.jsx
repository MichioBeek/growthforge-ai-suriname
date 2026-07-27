import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ChatDemo() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        y: 32,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="demo" ref={sectionRef} className="relative bg-void px-6 py-24 md:py-32">
      <div ref={contentRef} className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
          <span className="mono-label text-[12px] uppercase text-ion md:text-[13px]">
            Live Demo
          </span>
          <h2 className="mt-4 font-sora text-3xl font-bold text-ice md:text-4xl">
            Praat nu met <span className="font-serif italic font-normal text-platinum">onze AI chatbot.</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-platinum opacity-90 md:text-base">
            Stel een vraag zoals een klant dat zou doen. Dit is precies wat er op uw eigen
            website of WhatsApp gebeurt.
          </p>
        </div>

        <div
          className="glow-ion-lg mx-auto max-w-2xl overflow-hidden rounded-[2rem] p-1"
          style={{ background: 'linear-gradient(135deg, #3DE7DE 0%, #7C6BFF 100%)' }}
        >
          <div className="overflow-hidden rounded-[1.75rem] bg-carbon">
            <iframe
              src="https://buildmyagent.io/shared/rAfgM5YgGr?embed=true"
              title="GrowthForge AI chatbot demo"
              height="525"
              style={{ width: '100%', height: '525px', display: 'block', border: 'none', background: '#12161F' }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
