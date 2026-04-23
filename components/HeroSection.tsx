"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const introBlockRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Ignore mobile address bar resize events to prevent jank
    ScrollTrigger.config({ ignoreMobileResize: true });

    const el = heroRef.current;
    if (!el || !nameRef.current || !introBlockRef.current) return;

    const ctx = gsap.context(() => {
      const wrappers = nameRef.current?.querySelectorAll<HTMLElement>(".kr-letter-wrapper");
      const solids = nameRef.current?.querySelectorAll<HTMLElement>(".kr-letter-solid");
      if (!wrappers || !solids) return;

      const navEl = document.querySelector(".kr-nav");

      // Initial state: wrappers hidden/down, solid clip path hidden
      // will-change promotes elements to GPU compositor layers to reduce lag
      gsap.set(wrappers, { y: 150, opacity: 0, willChange: "transform, opacity" });
      gsap.set(solids, { "--clipPath": "inset(100% 0 0 0)", willChange: "clip-path" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=150%",
          scrub: 0.5, // Faster scrub reduces perceived lag on mobile
          anticipatePin: 1,
          pin: true,
          pinSpacing: true,
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
        // 4. Clip path reveal them (half fill)
        .to(solids, {
          "--clipPath": "inset(100% 0 0 0)",
          duration: 1.5,
          stagger: 0.1,
          ease: "power1.inOut",
        }, "setting+=0.8");
    }, el);

    return () => ctx.revert();
  }, []);

  const nameLetters = "KRISHORA".split("");

  return (
    <section ref={heroRef} id="home" className="kr-hero" style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
      <div className="kr-hero__content" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>

        {/* Intro content block */}
        <div ref={introBlockRef} style={{ position: "absolute", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center", padding: "0 24px", width: "100%", maxWidth: "800px" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 6vw, 100px)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.05 }}>New Vision for Technologies</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px, 2vw, 22px)", color: "var(--text-muted)", maxWidth: "600px", lineHeight: 1.5 }}>
            Engineering tomorrow's solutions, today. We build tech that inspires.
          </p>
          <a href="#about" className="kr-hero__cta" style={{ marginTop: "16px", opacity: 1, transform: "none" }}>
            Get started.
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* KRISHORA with stagger + clip-path reveal — mapped to scroll */}
        <div style={{ position: "absolute", top: "42%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 5, pointerEvents: "none", width: "100%", display: "flex", justifyContent: "center", padding: "0 8px", boxSizing: "border-box" }}>
          <div ref={nameRef} className="kr-hero__name" aria-label="Krishora" style={{ display: "flex", gap: "clamp(2px, 1vw, 10px)", flexWrap: "nowrap" }}>
            {nameLetters.map((char, i) => (
              <div key={i} className="kr-letter-wrapper" style={{ display: "inline-grid", placeItems: "center" }}>
                {/* Outline Text */}
                <span className="kr-letter-outline" style={{
                  gridArea: "1 / 1",
                  fontFamily: "'Orbix', sans-serif",
                  fontSize: "clamp(28px, 10.5vw, 160px)",
                  color: "transparent",
                  WebkitTextStroke: "1.5px var(--text-primary)",
                  lineHeight: 1,
                  transform: "translate3d(0,0,0)",
                }}>
                  {char}
                </span>

                {/* Solid Filled Text (Revealed via GSAP clipPath) */}
                <span className="kr-letter-solid" style={{
                  gridArea: "1 / 1",
                  fontFamily: "'Orbix', sans-serif",
                  fontSize: "clamp(28px, 10.5vw, 160px)",
                  color: "var(--accent-1)",
                  clipPath: "var(--clipPath)",
                  lineHeight: 1,
                  transform: "translate3d(0,0,0)",
                }}>
                  {char}
                </span>
              </div>
            ))}
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
