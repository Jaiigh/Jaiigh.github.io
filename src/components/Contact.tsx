import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current!.querySelectorAll(".anim-child"), {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
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
      id="contact"
    >
      <h2 className="anim-child font-display text-foreground text-5xl md:text-7xl mb-16 tracking-wide">
        CONTACT
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        <a
          href="mailto:chanonchiang2004@gmail.com"
          className="anim-child group border border-border p-8 hover:border-accent transition-colors duration-300"
        >
          <div className="font-mono text-muted text-xs uppercase tracking-widest mb-3">
            Email
          </div>
          <div className="font-display text-foreground text-xl group-hover:text-accent transition-colors duration-300">
            chanonchiang2004@gmail.com
          </div>
        </a>

        <a
          href="https://github.com/Jaiigh"
          target="_blank"
          rel="noopener noreferrer"
          className="anim-child group border border-border p-8 hover:border-accent transition-colors duration-300"
        >
          <div className="font-mono text-muted text-xs uppercase tracking-widest mb-3">
            GitHub
          </div>
          <div className="font-display text-foreground text-xl group-hover:text-accent transition-colors duration-300">
            github.com/Jaiigh
          </div>
        </a>

        <div className="anim-child border border-border p-8">
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
