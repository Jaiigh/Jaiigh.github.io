import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ProjectItem {
  name: string
  tag: string
  description: string
  tech: string[]
}

const PROJECTS: ProjectItem[] = [
  {
    name: 'Bulbbet',
    tag: 'Hackathon — 2nd Runner-Up',
    description:
      'AI-powered prediction platform built at a national hackathon. Combines real-time data ingestion with an ML inference layer to surface high-confidence betting insights.',
    tech: ['Python', 'FastAPI', 'React', 'ML'],
  },
  {
    name: 'A2A Agent Platform',
    tag: 'BotNoi Group — Production',
    description:
      'Internal AI workflow builder enabling teams to compose multi-agent pipelines without code. Designed the orchestration layer and the agent-to-agent communication protocol.',
    tech: ['LangChain', 'FastAPI', 'React', 'Docker'],
  },
  {
    name: 'Larngear Camp',
    tag: '66,000+ Users',
    description:
      'Full-stack platform for a large-scale student tech camp. Handled registration, team formation, and real-time communication for tens of thousands of concurrent users.',
    tech: ['Next.js', 'PostgreSQL', 'Redis', 'TypeScript'],
  },
]

const Projects: React.FC = () => {
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
        .from('.anim-card', {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
        }, '-=0.4')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 md:px-16 max-w-7xl mx-auto"
      id="projects"
    >
      <h2 className="anim-heading font-display text-foreground text-5xl md:text-7xl mb-16 tracking-wide">
        PROJECTS
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {PROJECTS.map((project) => (
          <div
            key={project.name}
            className="anim-card group border border-border p-8 hover:border-accent transition-colors duration-300 flex flex-col"
          >
            <div className="font-mono text-accent text-xs uppercase tracking-widest mb-4">
              {project.tag}
            </div>
            <h3 className="font-display text-foreground text-3xl tracking-wide mb-4 group-hover:text-accent transition-colors duration-300">
              {project.name}
            </h3>
            <p className="font-mono text-muted text-sm leading-relaxed flex-1 mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs text-muted border border-border px-2 py-0.5"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
