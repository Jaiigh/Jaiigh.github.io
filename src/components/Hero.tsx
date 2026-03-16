import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import HeroScene from './HeroScene'

const Hero: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(sceneRef.current, { opacity: 0 })
      const tl = gsap.timeline({ delay: 0.2 })
      tl.from('.anim-word1', {
        y: 100,
        opacity: 0,
        rotateX: 90,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.04,
      })
      .from('.anim-word2', {
        y: 100,
        opacity: 0,
        rotateX: 90,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.04,
      }, '+=0.2')
      .from(textRef.current!.querySelectorAll('p'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
      }, '-=0.4')
      .to(sceneRef.current, { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.6')
      .from(scrollRef.current, { opacity: 0, y: 10, duration: 0.6, ease: 'power2.out' }, '-=0.4')

      // Canvas parallax — drifts slower than page scroll
      gsap.to(sceneRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative h-screen overflow-hidden bg-bg" id="hero">
      {/* 3D canvas — fills section, no pointer events so text stays selectable */}
      <div ref={sceneRef} className="absolute inset-0">
        <HeroScene />
      </div>

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-6">
        <div ref={textRef} className="text-center">
          <h1
            className="font-display text-foreground leading-none tracking-wide"
            style={{ fontSize: 'clamp(4rem, 13vw, 12rem)', perspective: '800px' }}
          >
            {'CHANON'.split('').map((c, i) => (
              <span key={i} className="anim-word1 inline-block">{c}</span>
            ))}
            <span className="inline-block">&nbsp;</span>
            {'CHIANG'.split('').map((c, i) => (
              <span key={i} className="anim-word2 inline-block">{c}</span>
            ))}
          </h1>
          <p className="font-mono text-xs md:text-sm tracking-widest uppercase mt-4">
            <span className="text-accent">AI</span>
            <span className="text-muted"> · </span>
            <span className="text-accent">Data Science</span>
            <span className="text-muted"> · Software Engineering</span>
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
