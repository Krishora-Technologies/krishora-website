"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import HeroSection from "@/components/HeroSection";
import BannerSection from "@/components/BannerSection";
import AboutSection from "@/components/AboutSection";
import TechStackMarquee from "@/components/TechStackMarquee";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function HomeClient() {

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        // Wait a small tick for GSAP to set up the DOM heights
        setTimeout(() => {
          gsap.to(window, {
            scrollTo: { y: target, autoKill: false },
            duration: 1.5,
            ease: "power3.out"
          });
        }, 100);
      }
    }
  }, []);

  return (
    <>

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
