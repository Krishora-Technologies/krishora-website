"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BannerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Initial set
      gsap.set(el.querySelectorAll(".kr-banner__eyebrow"), { y: 20, opacity: 0 });
      gsap.set(el.querySelectorAll(".kr-banner__headline span"), { y: "110%" });
      gsap.set(el.querySelector(".kr-banner__sub"), { y: 20, opacity: 0 });
      gsap.set(el.querySelectorAll(".kr-banner__cta a"), { y: 20, opacity: 0 });
      gsap.set(el.querySelectorAll(".kr-banner__orb"), { scale: 0, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.to(el.querySelectorAll(".kr-banner__orb"), {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "elastic.out(1, 0.5)",
      })
      .to(el.querySelector(".kr-banner__eyebrow"), {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      }, "-=0.8")
      .to(el.querySelectorAll(".kr-banner__headline span"), {
        y: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
      }, "-=0.4")
      .to(el.querySelector(".kr-banner__sub"), {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
      }, "-=0.5")
      .to(el.querySelectorAll(".kr-banner__cta a"), {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.4");

      // Continuous orb float
      el.querySelectorAll(".kr-banner__orb").forEach((orb, i) => {
        gsap.to(orb, {
          y: `+=${20 + i * 15}`,
          x: `+=${10 + i * 8}`,
          duration: 3 + i * 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Scroll parallax on orbs
      el.querySelectorAll(".kr-banner__orb").forEach((orb, i) => {
        gsap.to(orb, {
          y: (i + 1) * -60,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, el);

    // 3D tilt on mouse move
    const tilt = tiltRef.current;
    const onMove = (e: MouseEvent) => {
      if (!tilt || !el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(tilt, {
        rotationY: x * 6,
        rotationX: -y * 6,
        duration: 0.6,
        ease: "power2.out",
      });
      // Spotlight follow
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        spotlightRef.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
      }
    };
    const onLeave = () => {
      if (!tilt) return;
      gsap.to(tilt, { rotationY: 0, rotationX: 0, duration: 0.8, ease: "power2.out" });
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    // Magnetic buttons
    btnRefs.current.forEach((btn) => {
      if (!btn) return;
      const onBtnMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.3;
        const dy = (e.clientY - cy) * 0.3;
        gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: "power2.out" });
      };
      const onBtnLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      };
      btn.addEventListener("mousemove", onBtnMove);
      btn.addEventListener("mouseleave", onBtnLeave);
    });

    return () => {
      ctx.revert();
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} className="kr-banner">
      {/* Background orbs */}
      <div className="kr-banner__orb kr-banner__orb--1" aria-hidden="true" />
      <div className="kr-banner__orb kr-banner__orb--2" aria-hidden="true" />
      <div className="kr-banner__orb kr-banner__orb--3" aria-hidden="true" />

      {/* Mouse spotlight */}
      <div ref={spotlightRef} className="kr-banner__spotlight" aria-hidden="true" />

      {/* Floating particles */}
      <div className="kr-banner__particles" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="kr-banner__particle" style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

      <div ref={tiltRef} className="kr-banner__tilt">
        <div className="kr-banner__inner">
          <p className="kr-banner__eyebrow">What We Do</p>

          <h2 className="kr-banner__headline">
            <span>We Engineer</span>
            <span>Digital Excellence</span>
          </h2>

          <p className="kr-banner__sub">
            From cloud-native architectures to AI-driven platforms, we transform
            complex challenges into elegant, scalable solutions that power modern
            enterprises.
          </p>

          <div className="kr-banner__cta">
            <a ref={(el) => { btnRefs.current[0] = el; }} href="#services">Explore Services</a>
            <a ref={(el) => { btnRefs.current[1] = el; }} href="#contact">Get in Touch</a>
          </div>
        </div>
      </div>
    </section>
  );
}
