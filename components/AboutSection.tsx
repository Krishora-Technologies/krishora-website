"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Set initial hidden states via GSAP to avoid CLS
      const words = el.querySelectorAll<HTMLElement>(".kr-typo-word, .kr-typo-symbol");
      gsap.set(words, { y: 80, opacity: 0 });
      gsap.set(el.querySelectorAll(".kr-stat"), { opacity: 0, y: 30 });

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

      // Stats reveal
      const stats = el.querySelectorAll<HTMLElement>(".kr-stat");
      stats.forEach((stat, i) => {
        ScrollTrigger.create({
          trigger: stat,
          start: "top 85%",
          onEnter: () => {
            gsap.to(stat, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.15 });
          },
        });

        // Number counter
        const numEl = stat.querySelector<HTMLElement>(".kr-stat__number");
        if (numEl) {
          const target = parseInt(numEl.dataset.target || "0");
          const obj = { val: 0 };
          ScrollTrigger.create({
            trigger: stat,
            start: "top 85%",
            onEnter: () => {
              gsap.to(obj, {
                val: target,
                duration: 2,
                ease: "power2.out",
                onUpdate: () => {
                  numEl.textContent = Math.round(obj.val) + "+";
                },
              });
            },
          });
        }
      });

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
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about-detail" className="kr-about">
      {/* ── Big scroll-reveal typography (for-text section 2 style) ── */}
      <div className="kr-about__showcase">
        <div className="kr-section-label">About Krishora</div>

        <div className="kr-about__typo">
          <div className="kr-typo-line">
            <span className="kr-typo-word outlined">We</span>
            <span className="kr-typo-word">Build</span>
          </div>
          <div className="kr-typo-line">
            <span className="kr-typo-word accent">Tech</span>
            <span className="kr-typo-word outlined">That</span>
          </div>
          <div className="kr-typo-line">
            <span className="kr-typo-word">Inspires</span>
            <span className="kr-typo-symbol" aria-hidden="true">✦</span>
          </div>
        </div>

        {/* ── Marquee (for-text marquee) ── */}
        <div className="kr-marquee-section">
          {/* Row 1: filled, left scroll */}
          <div className="kr-marquee-row">
            <div className="kr-marquee-track">
              <div className="kr-marquee-content">
                <span className="kr-marquee-word">DEVELOP</span>
                <span className="kr-marquee-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
                </span>
                <span className="kr-marquee-word">ARCHITECT</span>
                <span className="kr-marquee-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                </span>
                <span className="kr-marquee-word">INTEGRATE</span>
                <span className="kr-marquee-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><polygon points="12,2 22,22 2,22" /></svg>
                </span>
                <span className="kr-marquee-word">INNOVATE</span>
                <span className="kr-marquee-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
                </span>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="kr-marquee-content" aria-hidden="true">
                <span className="kr-marquee-word">DEVELOP</span>
                <span className="kr-marquee-icon"><svg viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg></span>
                <span className="kr-marquee-word">ARCHITECT</span>
                <span className="kr-marquee-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg></span>
                <span className="kr-marquee-word">INTEGRATE</span>
                <span className="kr-marquee-icon"><svg viewBox="0 0 24 24"><polygon points="12,2 22,22 2,22" /></svg></span>
                <span className="kr-marquee-word">INNOVATE</span>
                <span className="kr-marquee-icon"><svg viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg></span>
              </div>
            </div>
          </div>

          {/* Row 2: outlined, right scroll */}
          <div className="kr-marquee-row">
            <div className="kr-marquee-track reverse">
              <div className="kr-marquee-content">
                <span className="kr-marquee-word">STRATEGY</span>
                <span className="kr-marquee-dot" aria-hidden="true" />
                <span className="kr-marquee-word">INTERFACE</span>
                <span className="kr-marquee-dot" aria-hidden="true" />
                <span className="kr-marquee-word">EXPERIENCE</span>
                <span className="kr-marquee-dot" aria-hidden="true" />
                <span className="kr-marquee-word">SOLUTIONS</span>
                <span className="kr-marquee-dot" aria-hidden="true" />
              </div>
              <div className="kr-marquee-content" aria-hidden="true">
                <span className="kr-marquee-word">STRATEGY</span>
                <span className="kr-marquee-dot" />
                <span className="kr-marquee-word">INTERFACE</span>
                <span className="kr-marquee-dot" />
                <span className="kr-marquee-word">EXPERIENCE</span>
                <span className="kr-marquee-dot" />
                <span className="kr-marquee-word">SOLUTIONS</span>
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
              <textPath href="#krBadgePath">✦ KRISHORA TECHNOLOGIES ✦ TECH SOLUTIONS ✦ 2024 ✦ </textPath>
            </text>
          </svg>
          <div className="kr-badge__center">K</div>
        </div>
      </div>

      {/* ── Info grid: description + stats ── */}
      <div className="kr-about__info">
        <div className="kr-about__desc">
          <p>
            At Krishora Technologies, we believe that the best technology is invisible — it just works. Our team of engineers and architects craft scalable, elegant solutions to the hardest tech problems.
          </p>
          <p>
            From concept to deployment, we bring precision, creativity, and deep technical expertise to every engagement. We don't ship code; we ship impact.
          </p>
        </div>

        <div className="kr-stats">
          <div className="kr-stat">
            <div className="kr-stat__number" data-target="50">0+</div>
            <div className="kr-stat__label">Projects Delivered</div>
          </div>
          <div className="kr-stat">
            <div className="kr-stat__number" data-target="30">0+</div>
            <div className="kr-stat__label">Happy Clients</div>
          </div>
          <div className="kr-stat">
            <div className="kr-stat__number" data-target="5">0+</div>
            <div className="kr-stat__label">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}
