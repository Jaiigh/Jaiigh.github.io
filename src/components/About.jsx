import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('.anim-child'), {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 md:px-16 max-w-7xl mx-auto"
      id="about"
    >
      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Bio */}
        <div>
          <h2 className="anim-child font-display text-foreground text-5xl md:text-7xl mb-8 tracking-wide">
            ABOUT
          </h2>
          <p className="anim-child font-mono text-muted text-sm leading-relaxed mb-4">
            I'm Jay — a Computer Engineering student at Chulalongkorn University,
            Bangkok. I build production AI systems during the day and explore ML
            pipelines by night.
          </p>
          <p className="anim-child font-mono text-muted text-sm leading-relaxed">
            Currently transitioning from full-stack engineering toward AI, data
            science, and ML engineering. I care about systems that scale and models
            that ship.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="anim-child border border-[#222] p-6">
            <div className="font-display text-accent text-5xl">3.31</div>
            <div className="font-mono text-muted text-xs uppercase tracking-widest mt-2">GPA</div>
          </div>

          <div className="anim-child border border-[#222] p-6">
            <div className="font-display text-foreground text-3xl leading-tight">EN · ZH · TH</div>
            <div className="font-mono text-muted text-xs uppercase tracking-widest mt-2">Languages</div>
          </div>

          <div className="anim-child border border-[#222] p-6">
            <div className="font-display text-foreground text-2xl leading-tight">IELTS 7.5</div>
            <div className="font-mono text-muted text-xs uppercase tracking-widest mt-2">English</div>
          </div>

          <div className="anim-child border border-[#222] p-6">
            <div className="font-display text-foreground text-2xl leading-tight">HSK 3</div>
            <div className="font-mono text-muted text-xs uppercase tracking-widest mt-2">Chinese</div>
          </div>

          <div className="anim-child col-span-2 border border-accent p-6">
            <div className="font-mono text-accent text-xs uppercase tracking-widest">
              ● Open to Internships &amp; Full-Time
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
