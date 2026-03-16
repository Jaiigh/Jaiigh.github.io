import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitChars } from "../utils/splitChars";

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
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
        ".anim-child",
        { opacity: 0, y: 40, duration: 0.8, ease: "power3.out", stagger: 0.12 },
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
      id="contact"
    >
      <div
        className="section-bg-text font-display text-foreground absolute top-0 left-0 pointer-events-none select-none whitespace-nowrap leading-none"
        style={{ fontSize: "clamp(80px, 15vw, 180px)", opacity: 0.03 }}
        aria-hidden="true"
      >
        CONTACT
      </div>
      <h2
        className="font-display text-foreground text-5xl md:text-7xl mb-16 tracking-wide"
        style={{ perspective: "600px" }}
      >
        {splitChars("CONTACT")}
      </h2>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="anim-child flex-1">
          <a
            href="mailto:chanonchiang2004@gmail.com"
            className="group flex flex-col h-full bg-secondary border border-border p-8 hover:border-foreground hover:bg-background transition-colors duration-300"
          >
            <div className="font-mono text-muted text-xs uppercase tracking-widest mb-3">
              Email
            </div>
            <div className="flex items-baseline justify-between">
              <div className="font-display text-foreground text-xl">
                chanonchiang2004@gmail.com
              </div>
              <span className="font-mono text-foreground text-sm opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-300 ml-2">
                →
              </span>
            </div>
          </a>
        </div>

        <div className="anim-child flex-1">
          <a
            href="https://github.com/Jaiigh"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col h-full bg-secondary border border-border p-8 hover:border-foreground hover:bg-background transition-colors duration-300"
          >
            <div className="font-mono text-muted text-xs uppercase tracking-widest mb-3">
              GitHub
            </div>
            <div className="flex items-baseline justify-between">
              <div className="font-display text-foreground text-xl">
                github.com/Jaiigh
              </div>
              <span className="font-mono text-foreground text-sm opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-300 ml-2">
                →
              </span>
            </div>
          </a>
        </div>

        <div className="anim-child flex-1 bg-secondary border border-border p-8">
          <div className="font-mono text-muted text-xs uppercase tracking-widest mb-3">
            Location
          </div>
          <div className="font-display text-foreground text-xl">
            Bangkok, Thailand
          </div>
        </div>
      </div>

      <div className="anim-child mt-16 border-t border-border pt-8 font-mono text-muted text-xs text-center">
        © 2025 Chanon Chiang. Built with React, Three.js &amp; GSAP.
      </div>
    </section>
  );
};

export default Contact;
