import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitChars } from "../utils/splitChars";

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
      })
        .from(
          ".anim-line",
          { scaleY: 0, duration: 0.8, ease: "power3.out", stagger: 0.2 },
          "-=0.4",
        )
        .to(
          ".anim-wipe",
          { scaleX: 0, duration: 0.6, ease: "power3.inOut", stagger: 0.15 },
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
      id="experience"
    >
      <div
        className="section-bg-text font-display text-foreground absolute top-0 left-0 pointer-events-none select-none whitespace-nowrap leading-none"
        style={{ fontSize: "clamp(80px, 15vw, 180px)", opacity: 0.03 }}
        aria-hidden="true"
      >
        EXPERIENCE
      </div>
      <h2
        className="font-display text-foreground text-5xl md:text-7xl mb-16 tracking-wide"
        style={{ perspective: "600px" }}
      >
        {splitChars("EXPERIENCE")}
      </h2>

      <div className="space-y-0">
        {EXPERIENCES.map((exp) => (
          <div key={exp.company} className="relative pl-8 pb-14">
            {/* Animated left border line */}
            <div
              className={`anim-line absolute left-0 top-0 w-0.5 h-full origin-top ${
                "bg-accent"
              }`}
            />
            <div className="anim-card relative overflow-hidden">
              {/* Crimson wipe overlay */}
              <div className="anim-wipe absolute inset-0 bg-accent z-10 origin-right" />
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
