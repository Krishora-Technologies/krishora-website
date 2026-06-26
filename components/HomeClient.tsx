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
