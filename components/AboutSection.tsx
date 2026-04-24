"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scatterTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    const el = sectionRef.current;
    if (!el) return;

    let scatterSplit: SplitType | null = null;

    const ctx = gsap.context(() => {
      // Set initial hidden states via GSAP to avoid CLS
      const words = el.querySelectorAll<HTMLElement>(".kr-typo-word, .kr-typo-symbol");
      gsap.set(words, { y: 80, opacity: 0 });

      // Scroll-reveal for big typography words
      words.forEach((word, i) => {
        gsap.fromTo(
          word,
          { y: 80, opacity: 0, rotateX: -40 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: word,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.06,
          },
        );
      });

      // About paragraphs reveal
      const paras = el.querySelectorAll<HTMLElement>(".kr-about__desc p");
      paras.forEach((p, i) => {
        gsap.fromTo(
          p,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: p,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.15,
          },
        );
      });

      // Card scale reveal
      const card = el.querySelector<HTMLElement>(".kr-about__card");
      if (card) {
        gsap.fromTo(
          card,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Reveal text section (for-text §2 big reveal)
      const revealWords = el.querySelectorAll(".reveal-word");
      if (revealWords.length > 0) {
        gsap.fromTo(
          revealWords,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el.querySelector(".kr-about__reveal"),
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Scatter text reveal
      const scatterEl = scatterTextRef.current;
      if (scatterEl) {
        // Add a slight delay to ensure fonts are loaded
        setTimeout(() => {
          scatterSplit = new SplitType(scatterEl, { types: "words" });
          const words = scatterSplit.words || [];

          // Give each word a random starting 3D position
          gsap.set(words, {
            opacity: 0,
            z: () => gsap.utils.random(300, 900),
            x: () => gsap.utils.random(-200, 200),
            y: () => gsap.utils.random(-60, 60),
            rotationX: () => gsap.utils.random(-90, 90),
            rotationY: () => gsap.utils.random(-60, 60),
          });

          gsap.to(words, {
            opacity: 1,
            z: 0,
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            ease: "expo.out",
            stagger: { each: 0.022, from: "random" },
            scrollTrigger: {
              trigger: scatterEl,
              start: "top 80%",
              end: "bottom 40%",
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          });
        }, 100);
      }
    }, el);

    return () => {
      ctx.revert();
      if (scatterSplit) scatterSplit.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="kr-about" style={{ paddingBottom: "4rem" }}>
      {/* ── Big scroll-reveal typography (for-text section 2 style) ── */}
      <div className="kr-about__showcase">
        <div className="kr-section-label">About Krishora</div>

        <div className="kr-about__typo">
          <div className="kr-typo-line">
            <span className="kr-typo-word outlined">Turning</span>
            <span className="kr-typo-word accent">AI</span>
          </div>
          <div className="kr-typo-line">
            <span className="kr-typo-word">Potential</span>
            <span className="kr-typo-word outlined">Into</span>
          </div>
          <div className="kr-typo-line">
            <span className="kr-typo-word accent">Production</span>
            <span className="kr-typo-word ">Reality</span>
            <span className="kr-typo-symbol" aria-hidden="true">✦</span>
          </div>
        </div>

        {/* ── Marquee (for-text marquee) ── */}
        <div className="kr-marquee-section">
          {/* Row 1: filled, left scroll */}
          <div className="kr-marquee-row">
            <div className="kr-marquee-track">
              <div className="kr-marquee-content">
                <span className="kr-marquee-word">Intelligence.</span>
                <span className="kr-marquee-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
                </span>
                <span className="kr-marquee-word">Engineered.</span>
                <span className="kr-marquee-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                </span>
                <span className="kr-marquee-word">Scalable.</span>
                <span className="kr-marquee-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><polygon points="12,2 22,22 2,22" /></svg>
                </span>
                {/* <span className="kr-marquee-word">INNOVATE</span> */}
                {/* <span className="kr-marquee-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
                </span> */}
              </div>
              {/* Duplicate for seamless loop */}
              <div className="kr-marquee-content" aria-hidden="true">
                <span className="kr-marquee-word">Intelligence.</span>
                <span className="kr-marquee-icon"><svg viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg></span>
                <span className="kr-marquee-word">Engineered.</span>
                <span className="kr-marquee-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg></span>
                <span className="kr-marquee-word">Scalable.</span>
                <span className="kr-marquee-icon"><svg viewBox="0 0 24 24"><polygon points="12,2 22,22 2,22" /></svg></span>
                {/* <span className="kr-marquee-word">INNOVATE</span> */}
                {/* <span className="kr-marquee-icon"><svg viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg></span> */}
              </div>
            </div>
          </div>

          {/* Row 2: outlined, right scroll */}
          <div className="kr-marquee-row">
            <div className="kr-marquee-track reverse">
              <div className="kr-marquee-content">
                <span className="kr-marquee-word">Intelligence.</span>
                <span className="kr-marquee-dot" aria-hidden="true" />
                <span className="kr-marquee-word">Engineered.</span>
                <span className="kr-marquee-dot" aria-hidden="true" />
                <span className="kr-marquee-word">Scalable.</span>
                <span className="kr-marquee-dot" aria-hidden="true" />
              </div>
              <div className="kr-marquee-content" aria-hidden="true">
                <span className="kr-marquee-word">Intelligence.</span>
                <span className="kr-marquee-dot" />
                <span className="kr-marquee-word">Engineered.</span>
                <span className="kr-marquee-dot" />
                <span className="kr-marquee-word">Scalable.</span>
                <span className="kr-marquee-dot" />
              </div>
            </div>
          </div>
        </div>

        {/* Rotating badge */}
        <div className="kr-badge" aria-hidden="true">
          <svg viewBox="0 0 200 200" width="100%" height="100%">
            <defs>
              <path id="krBadgePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
            </defs>
            <text>
              <textPath href="#krBadgePath">✦ KRISHORA TECHNOLOGIES ✦ TECH SOLUTIONS ✦ 2026 ✦ </textPath>
            </text>
          </svg>
          <div className="kr-badge__center">K</div>
        </div>
      </div>

      {/* ── Info grid: description + card ── */}
      <div className="kr-about__info">
        <div className="kr-about__desc">
          <p>
            At Krishora Technologies, we specialize in building production-grade AI systems powered by Large Language Models.
          </p>

          <p>
            We believe the future isn’t just digital - it’s intelligent.
          </p>

          <p>
            From idea to deployment, we combine deep AI expertise, system design, and real-world execution.
          </p>
        </div>

        <div className="kr-about__card-wrapper">
          <div className="kr-about__card">
            <h3 className="kr-about__card-title">Our team engineers:</h3>
            <ul className="kr-about__list">
              <li>AI copilots for businesses</li>
              <li>Automated decision systems</li>
              <li>Context-aware chat and voice agents</li>
              <li>Scalable LLM pipelines</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Text Scatter Reveal ── */}
      <div
        style={{
          padding: "5rem 2rem 3rem 2rem",
          marginTop: "4rem",
          position: "relative",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "70%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "70vw",
            height: "250px",
            background:
              "radial-gradient(circle, rgba(108, 43, 217, 0.15) 0%, rgba(37, 99, 235, 0.05) 40%, transparent 70%)",
            pointerEvents: "none",
            filter: "blur(30px)",
            zIndex: 0,
          }}
        />

        <div
          className="section-container"
          style={{ position: "relative", zIndex: 1, textAlign: "center" }}
        >
          <span className="kr-section-label" style={{ justifyContent: "center", marginBottom: "80px" }}>
            Our Purpose
          </span>

          <div
            ref={scatterTextRef}
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.3,
              color: "var(--text-primary)",
              maxWidth: "900px",
              margin: "0 auto",
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            We don’t experiment with AI.<br />
            We operationalize it.
          </div>


        </div>
      </div>
    </section>
  );
}
