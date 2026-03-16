import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import HeroScene from './HeroScene'

export default function Hero() {
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.4,
        stagger: 0.15,
        ease: 'power2.out',
      })
    }, textRef)
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
        <div className="font-mono text-muted text-xs uppercase tracking-widest">Scroll</div>
        <div className="w-px h-12 bg-gradient-to-b from-muted to-transparent" />
      </div>
    </section>
  )
}
