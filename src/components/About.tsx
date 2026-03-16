import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitChars } from "../utils/splitChars";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const scrollOpts = {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      };

      const tl = gsap.timeline({ scrollTrigger: scrollOpts });
      tl.from(".anim-char", {
        y: 100,
        opacity: 0,
        rotateX: 90,
        duration: 1,
        ease: "power4.out",
        stagger: 0.04,
      })
        .from(
          ".anim-bio",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
          },
          "-=0.4",
        )
        .from(
          ".anim-card",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.4",
        );

      // GPA counter — fresh ScrollTrigger config (not shared with timeline)
      const gpaEl = sectionRef.current!.querySelector(".gpa-counter");
      const counter = { val: 0 };
      gsap.to(counter, {
        val: 3.31,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        onUpdate() {
          if (gpaEl) gpaEl.textContent = counter.val.toFixed(2);
        },
      });

      // Background text parallax
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

      // Stat card parallax — left column vs right column
      const statTrigger = {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      };
      gsap.to(".anim-stat-odd", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: statTrigger,
      });
      gsap.to(".anim-stat-even", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: statTrigger,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 px-6 md:px-16 max-w-7xl mx-auto"
      id="about"
    >
      {/* Background texture text */}
      <div
        className="section-bg-text font-display text-foreground absolute top-0 left-0 pointer-events-none select-none whitespace-nowrap leading-none"
        style={{ fontSize: "clamp(80px, 15vw, 180px)", opacity: 0.03 }}
        aria-hidden="true"
      >
        ABOUT
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Bio */}
        <div>
          <h2
            className="font-display text-foreground text-5xl md:text-7xl mb-8 tracking-wide"
            style={{ perspective: "600px" }}
          >
            {splitChars("ABOUT")}
          </h2>
          <p className="anim-bio font-mono text-muted text-sm leading-relaxed mb-4">
            I'm Jay — a Computer Engineering student at Chulalongkorn
            University, Bangkok. My background is in full-stack development, but
            my focus is shifting toward AI and data science.
          </p>
          <p className="anim-bio font-mono text-muted text-sm leading-relaxed">
            I've worked on NLP systems and AI workflow platforms in internships,
            and I'm actively building toward a career in ML engineering. Still
            learning — but learning fast.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="anim-card anim-stat-odd border border-border p-6">
            <div className="gpa-counter font-display text-accent2 text-5xl">
              0.00
            </div>
            <div className="font-mono text-muted text-xs uppercase tracking-widest mt-2">
              GPA
            </div>
          </div>

          <div className="anim-card anim-stat-even border border-border p-6">
            <div className="font-display text-foreground text-3xl leading-tight">
              EN · CH · TH
            </div>
            <div className="font-mono text-muted text-xs uppercase tracking-widest mt-2">
              Languages
            </div>
          </div>

          <div className="anim-card anim-stat-odd border border-border p-6">
            <div className="font-display text-foreground text-2xl leading-tight">
              IELTS 8
            </div>
            <div className="font-mono text-muted text-xs uppercase tracking-widest mt-2">
              English
            </div>
          </div>

          <div className="anim-card anim-stat-even border border-border p-6">
            <div className="font-display text-foreground text-2xl leading-tight">
              HSK 3
            </div>
            <div className="font-mono text-muted text-xs uppercase tracking-widest mt-2">
              Chinese
            </div>
          </div>

          <div className="anim-card col-span-2 border border-border p-6">
            <div className="font-mono text-xs uppercase tracking-widest">
              <span className="text-accent2">●</span>
              <span className="text-muted">
                {" "}
                Open to Internships &amp; Part-Time
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
