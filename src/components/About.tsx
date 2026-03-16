import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
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
      tl.from(".anim-heading", {
        opacity: 0,
        x: -80,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".anim-bio",
          { opacity: 0, y: 30, duration: 0.8, ease: "power3.out", stagger: 0.12 },
          "-=0.4",
        )
        .from(
          ".anim-card",
          { opacity: 0, y: 20, duration: 0.8, ease: "power3.out", stagger: 0.1 },
          "-=0.4",
        );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 md:px-16 max-w-7xl mx-auto"
      id="about"
    >
      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Bio */}
        <div>
          <h2 className="anim-heading font-display text-foreground text-5xl md:text-7xl mb-8 tracking-wide">
            ABOUT
          </h2>
          <p className="anim-bio font-mono text-muted text-sm leading-relaxed mb-4">
            I'm Jay — a Computer Engineering student at Chulalongkorn
            University, Bangkok. I build production AI systems during the day
            and explore ML pipelines by night.
          </p>
          <p className="anim-bio font-mono text-muted text-sm leading-relaxed">
            Currently transitioning from full-stack engineering toward AI, data
            science, and ML engineering. I care about systems that scale and
            models that ship.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="anim-card border border-border p-6">
            <div className="font-display text-accent text-5xl">3.31</div>
            <div className="font-mono text-muted text-xs uppercase tracking-widest mt-2">
              GPA
            </div>
          </div>

          <div className="anim-card border border-border p-6">
            <div className="font-display text-foreground text-3xl leading-tight">
              EN · CH · TH
            </div>
            <div className="font-mono text-muted text-xs uppercase tracking-widest mt-2">
              Languages
            </div>
          </div>

          <div className="anim-card border border-border p-6">
            <div className="font-display text-foreground text-2xl leading-tight">
              IELTS 7.5
            </div>
            <div className="font-mono text-muted text-xs uppercase tracking-widest mt-2">
              English
            </div>
          </div>

          <div className="anim-card border border-border p-6">
            <div className="font-display text-foreground text-2xl leading-tight">
              HSK 3
            </div>
            <div className="font-mono text-muted text-xs uppercase tracking-widest mt-2">
              Chinese
            </div>
          </div>

          <div className="anim-card col-span-2 border border-accent p-6">
            <div className="font-mono text-accent text-xs uppercase tracking-widest">
              ● Open to Internships &amp; Full-Time
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
