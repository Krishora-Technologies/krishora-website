"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroSection from "@/components/HeroSection";
import BannerSection from "@/components/BannerSection";
import AboutSection from "@/components/AboutSection";
import TechStackMarquee from "@/components/TechStackMarquee";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  /* ── Custom cursor (for-text style) ── */
  useEffect(() => {
    const dot = cursorDotRef.current;
    if (!dot) return;

    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    const xDot = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3" });

    function onMove(e: MouseEvent) {
      xDot(e.clientX);
      yDot(e.clientY);
    }

    function onEnterLink() { dot!.closest(".kr-cursor")?.classList.add("kr-cursor--hover"); }
    function onLeaveLink() { dot!.closest(".kr-cursor")?.classList.remove("kr-cursor--hover"); }

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, [class*='nav-item'], [class*='magnetic'], .kr-service-card").forEach(el => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  /* ── Nav reveal after load ── */
  useEffect(() => {
    if (!navRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const logoSpans = navRef.current.querySelectorAll(".kr-nav__logo span");
    const links = navRef.current.querySelectorAll(".kr-nav__links a");
    
    // Set initial states for 3D flip-in load animation
    gsap.set(logoSpans, { y: 20, opacity: 0, scale: 0.8, rotationX: -90 });
    gsap.set(links, { y: 20, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.2 });
    
    // Animate logo with a 3D flip-in stagger
    tl.to(logoSpans, { 
       y: 0, 
       opacity: 1, 
       scale: 1, 
       rotationX: 0, 
       duration: 0.8, 
       stagger: 0.05, 
       ease: "back.out(2)" 
    })
    // Slide up links
    .to(links, { 
       y: 0, 
       opacity: 1, 
       duration: 0.6, 
       stagger: 0.1, 
       ease: "power3.out" 
    }, "-=0.4");
  }, []);

  return (
    <>
      {/* ── Custom cursor ── */}
      <div className="kr-cursor" aria-hidden="true">
        <div ref={cursorDotRef} className="kr-cursor__dot" />
      </div>

      {/* ── Fixed nav (GSAP moves it to dock) ── */}
      <header>
        <nav ref={navRef} className="kr-nav" aria-label="Main navigation">
          <a href="#home" className="kr-nav__logo">
            {"KRISHORA".split("").map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </a>
          <div className="kr-nav__links">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      {/* ── Page sections ── */}
      <main id="main-content">
        <HeroSection />
        <BannerSection />
        <AboutSection />
        <TechStackMarquee />
        <ServicesSection />
        <ProcessSection />
        <ContactSection />
      </main>
    </>
  );
}
