import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { splitChars } from '../utils/splitChars'
import SkillsAccent from './SkillsAccent'

gsap.registerPlugin(ScrollTrigger)

interface SkillGroup {
  label: string
  skills: string[]
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'ML / Data',
    skills: [
      'Python', 'PyTorch', 'scikit-learn', 'Pandas', 'NumPy',
      'HuggingFace', 'LangChain', 'FastAPI', 'SQL',
    ],
  },
  {
    label: 'Frontend',
    skills: [
      'React', 'TypeScript', 'Vite', 'Tailwind CSS',
      'Three.js', 'React Three Fiber', 'GSAP', 'Next.js',
    ],
  },
  {
    label: 'Languages & Tools',
    skills: [
      'JavaScript', 'Python', 'Go', 'Docker',
      'Git', 'Linux', 'PostgreSQL', 'Redis',
    ],
  },
]

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
      tl.from('.anim-char', {
        y: 100,
        opacity: 0,
        rotateX: 90,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.04,
      })
        .from('.anim-header', {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
        }, '-=0.4')
        .from('.anim-tag', {
          opacity: 0,
          y: 10,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.05,
        }, '-=0.3')

      gsap.to('.section-bg-text', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 px-6 md:px-16 max-w-7xl mx-auto"
      id="skills"
    >
      <div
        className="section-bg-text font-display text-foreground absolute top-0 left-0 pointer-events-none select-none whitespace-nowrap leading-none"
        style={{ fontSize: 'clamp(80px, 15vw, 180px)', opacity: 0.03 }}
        aria-hidden="true"
      >
        SKILLS
      </div>

      <SkillsAccent />

      <h2
        className="font-display text-foreground text-5xl md:text-7xl mb-16 tracking-wide"
        style={{ perspective: '600px' }}
      >
        {splitChars('SKILLS')}
      </h2>

      <div className="grid md:grid-cols-3 gap-12">
        {SKILL_GROUPS.map((group) => (
          <div key={group.label}>
            <div className="anim-header font-mono text-accent text-xs uppercase tracking-widest mb-6 pb-3 border-b border-border">
              {group.label}
            </div>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="anim-tag font-mono text-xs text-accent border border-accent px-3 py-1 hover:bg-[#1a0a0a] hover:text-foreground transition-colors duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
