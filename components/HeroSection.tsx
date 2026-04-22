"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoLetters from "./LogoLetters";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const introBlockRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = heroRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const wrappers = nameRef.current?.querySelectorAll<HTMLElement>(".kr-letter-wrapper");
      const solids = nameRef.current?.querySelectorAll<HTMLElement>(".kr-letter-solid");
      if (!wrappers || !solids) return;

      const navEl = document.querySelector(".kr-nav");

      // Initial state: wrappers hidden/down, solid clip path hidden
      gsap.set(wrappers, { y: 150, opacity: 0 });
      gsap.set(solids, { "--clipPath": "inset(100% 0 0 0)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=150%", // Pins the section for 1.5x screen height
          scrub: 1, // Smooth scrub
          anticipatePin: 1,
          pin: true,
        },
      });

      // 1. Blur and fade out intro content (3D-Earth-main logic)
      tl.to(introBlockRef.current, {
        filter: "blur(40px)",
        autoAlpha: 0,
        scale: 0.5,
        duration: 2,
        ease: "power1.inOut",
      }, "setting")
        // 2. Animate "KRISHORA" letters in while intro fades out
        .to(wrappers, {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: "power2.out",
        }, "setting+=0.5")
        // 3. Move the navigation dock down at the exact same time
        .to(navEl, {
          top: "calc(100vh - 80px)",
          duration: 1.5,
          ease: "power2.out",
        }, "setting+=0.5")
        // 4. Clip path reveal them
        .to(solids, {
          "--clipPath": "inset(0% 0 0 0)",
          duration: 1.5,
          stagger: 0.1,
          ease: "power1.inOut",
        }, "setting+=0.8");
    }, el);

    return () => ctx.revert();
  }, []);

  const nameLetters = "KRISHORA".split("");

  return (
    <section ref={heroRef} id="home" className="kr-hero" style={{ height: "100vh", position: "relative" }}>
      <div className="kr-hero__content" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>

        {/* Intro content block (matches 3D-earth-main initial content) */}
        <div ref={introBlockRef} style={{ position: "absolute", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px, 8vw, 100px)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1 }}>New Vison for Technologies</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px, 2vw, 22px)", color: "var(--text-muted)", maxWidth: "600px", lineHeight: 1.5 }}>
            Engineering tomorrow's solutions, today. We build tech that inspires.
          </p>
          <a href="#about" className="kr-hero__cta" style={{ marginTop: "16px", opacity: 1, transform: "none" }}>
            Get started.
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* KRISHORA with stagger + clip-path reveal — mapped to scroll (Replacing Earth) */}
        <div style={{ position: "absolute", zIndex: 5, pointerEvents: "none" }}>
          <div ref={nameRef} className="kr-hero__name" aria-label="Krishora">
            <LogoLetters />
          </div>
        </div>

      </div>

      {/* Scroll hint */}
      <div className="kr-hero__scroll-hint" aria-hidden="true" style={{ opacity: 1 }}>
        <span>Scroll</span>
        <div className="kr-hero__scroll-hint-line" />
      </div>
    </section>
  );
}
