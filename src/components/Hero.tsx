import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import HeroScene from './HeroScene'

const Hero: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })
      tl.from(textRef.current!.querySelector('h1'), {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: 'power3.out',
      })
      .from(textRef.current!.querySelectorAll('p'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
      }, '+=0.05')
      .from(scrollRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3')
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative h-screen overflow-hidden bg-bg" id="hero">
      {/* 3D canvas — fills section, no pointer events so text stays selectable */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-6">
        <div ref={textRef} className="text-center">
          <h1
            className="font-display text-foreground leading-none tracking-wide"
            style={{ fontSize: 'clamp(4rem, 13vw, 12rem)' }}
          >
            CHANON CHIANG
          </h1>
          <p className="font-mono text-accent text-xs md:text-sm tracking-widest uppercase mt-4">
            AI · Data Science · Software Engineering
          </p>
          <p className="font-mono text-muted text-xs tracking-widest mt-2">
            Chulalongkorn University · Bangkok
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
        <div className="font-mono text-muted text-xs uppercase tracking-widest">Scroll</div>
        <div className="w-px h-12 bg-gradient-to-b from-muted to-transparent" />
      </div>
    </section>
  )
}

export default Hero
