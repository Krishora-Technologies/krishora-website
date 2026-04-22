"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BannerSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Top descriptors
      tl.to(el.querySelectorAll(".kr-banner__top h5, .kr-banner__top h6"), {
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      })
      .to(el.querySelector(".kr-banner__top-line"), {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.4")
      // Big letter left
      .to(el.querySelectorAll(".kr-banner__left h1 span"), {
        y: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      }, "-=0.4")
      // Middle heading
      .to(el.querySelectorAll(".kr-banner__middle h2 span"), {
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6")
      // Number right
      .to(el.querySelectorAll(".kr-banner__right h1 span"), {
        y: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      }, "-=0.7")
      // Meta labels
      .to(el.querySelectorAll(".kr-banner__left-meta h5, .kr-banner__left-meta h6"), {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      }, "-=0.4")
      // Social icons
      .to(el.querySelectorAll(".kr-banner__right-social a"), {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      }, "-=0.3");
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="kr-banner">
      <div className="kr-banner__inner">
        {/* Top descriptor row */}
        <div className="kr-banner__top">
          <h5>Innovative Solutions</h5>
          <h6>Research &amp; Development — 2024</h6>
          <div className="kr-banner__top-line" />
        </div>

        {/* Main layout */}
        <div className="kr-banner__bottom">
          {/* Left — big letter */}
          <div className="kr-banner__left">
            <h1 aria-hidden="true">
              <span>K</span>
            </h1>
            <div className="kr-banner__left-meta">
              <h5>Cloud &amp; AI</h5>
              <h6>Architecture Study</h6>
            </div>
          </div>

          {/* Middle — main title */}
          <div className="kr-banner__middle">
            <h2>
              <span>Dynamic</span>
            </h2>
            <h2>
              <span>Solutions</span>
            </h2>
          </div>

          {/* Right — number + socials */}
          <div className="kr-banner__right">
            <h1 aria-hidden="true">
              <span>01</span>
            </h1>
            <div className="kr-banner__right-social">
              <span>Connect</span>
              <ul>
                <li>
                  <a href="https://linkedin.com" className="magnetic" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com" aria-label="X / Twitter" target="_blank" rel="noreferrer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noreferrer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@krishora.tech" aria-label="Email">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
