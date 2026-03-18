import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitChars } from "../utils/splitChars";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  name: string;
  tag: string;
  description: string;
  tech: string[];
}

const PROJECTS: ProjectItem[] = [
  {
    name: "Bulbbet",
    tag: "Hackathon — 2nd Runner-Up",
    description:
      "Secured 2nd runner-up at Thinc 10-day hackathon. Built a full-stack prediction market where users buy and sell outcome shares — share prices update dynamically based on collective user positions, reflecting real-time crowd probability.",
    tech: ["Python", "FastAPI", "React", "ML"],
  },
  {
    name: "A2A Agent Platform",
    tag: "BotNoi Group — Production",
    description:
      "Internal AI workflow builder enabling teams to compose multi-agent pipelines without code. Designed the orchestration layer and the agent-to-agent communication protocol.",
    tech: ["LangChain", "FastAPI", "React", "Docker"],
  },
  {
    name: "Larngear Camp",
    tag: "66,000+ Users",
    description:
      "Full-stack platform for a large-scale student tech camp. Handled registration, team formation, and real-time communication for tens of thousands of concurrent users.",
    tech: ["Next.js", "PostgreSQL", "Redis", "TypeScript"],
  },
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
      tl.from(".anim-char", {
        y: 100,
        opacity: 0,
        rotateX: 90,
        duration: 1,
        ease: "power4.out",
        stagger: 0.04,
      }).from(
        ".anim-card",
        {
          y: 80,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
        },
        "-=0.4",
      );

      gsap.to(".section-bg-text", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 px-6 md:px-16 max-w-7xl mx-auto"
      id="projects"
    >
      <div
        className="section-bg-text font-display text-foreground absolute top-0 left-0 pointer-events-none select-none whitespace-nowrap leading-none"
        style={{ fontSize: "clamp(80px, 15vw, 180px)", opacity: 0.03 }}
        aria-hidden="true"
      >
        PROJECTS
      </div>
      <h2
        className="font-display text-foreground text-5xl md:text-7xl mb-16 tracking-wide"
        style={{ perspective: "600px" }}
      >
        {splitChars("PROJECTS")}
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {PROJECTS.map((project, index) => (
          <div
            key={project.name}
            data-cursor="view"
            className="anim-card group relative overflow-hidden bg-secondary border border-border p-8 hover:bg-background hover:-translate-y-1 transition-[border-color,background-color,transform] duration-300 flex flex-col"
          >
            {/* Background texture number */}
            <div
              className="font-display text-foreground absolute top-2 right-4 pointer-events-none select-none"
              style={{ fontSize: "120px", opacity: 0.04, lineHeight: 1 }}
            >
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="font-mono text-accent2 text-xs uppercase tracking-widest mb-4">
              {project.tag}
            </div>
            <h3 className="font-display text-foreground text-3xl tracking-wide mb-4 group-hover:text-foreground transition-colors duration-300">
              {project.name}
            </h3>
            <p className="font-mono text-muted text-sm leading-relaxed flex-1 mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs text-muted border border-border px-2 py-0.5 hover:border-foreground hover:text-foreground transition-colors duration-200 cursor-default"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
