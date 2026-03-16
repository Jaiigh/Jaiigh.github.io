import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
      tl.from('.anim-heading', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
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
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 md:px-16 max-w-7xl mx-auto"
      id="skills"
    >
      <h2 className="anim-heading font-display text-foreground text-5xl md:text-7xl mb-16 tracking-wide">
        SKILLS
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
                  className="anim-tag font-mono text-xs text-accent border border-accent px-3 py-1"
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
