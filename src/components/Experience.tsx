import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  upcoming: boolean;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "BotNoi Group",
    role: "AI NLP Engineer",
    period: "May 2025 - July 2025",
    description:
      "Designed and shipped NLP pipelines for Thai-language AI products. Built the A2A Agent Platform — an internal AI workflow builder enabling multi-agent orchestration at production scale.",
    upcoming: false,
  },
  {
    company: "JobTopGun",
    role: "Full-Stack Intern",
    period: "October 2025 - February 2026",
    description:
      "Developed React-based features for a job-matching platform. Implemented REST APIs and improved database query performance, reducing average response time.",
    upcoming: false,
  },
  {
    company: "AIS Thailand",
    role: "Software Development Intern",
    period: "Incoming 2026",
    description:
      "Upcoming role at one of Thailand's leading telecom and tech companies. Will be working within the software engineering division.",
    upcoming: true,
  },
];

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current!.querySelectorAll(".anim-child"), {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 md:px-16 max-w-7xl mx-auto"
      id="experience"
    >
      <h2 className="anim-child font-display text-foreground text-5xl md:text-7xl mb-16 tracking-wide">
        EXPERIENCE
      </h2>

      <div className="space-y-0">
        {EXPERIENCES.map((exp) => (
          <div
            key={exp.company}
            className={`anim-child border-l-2 pl-8 pb-14 ${
              exp.upcoming ? "border-accent" : "border-border"
            }`}
          >
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h3 className="font-display text-foreground text-2xl md:text-3xl tracking-wide">
                {exp.company}
              </h3>
              {exp.upcoming && (
                <span className="font-mono text-xs text-accent border border-accent px-2 py-0.5 uppercase tracking-widest">
                  Upcoming
                </span>
              )}
            </div>
            <div className="font-mono text-accent text-xs uppercase tracking-widest mb-1">
              {exp.role}
            </div>
            <div className="font-mono text-muted text-xs mb-4">
              {exp.period}
            </div>
            <p className="font-mono text-muted text-sm leading-relaxed max-w-2xl">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
