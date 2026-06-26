"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function GlobalNav() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");

  const isHomePage = pathname === "/";
  const isBlogPage = pathname?.startsWith("/blog");

  useEffect(() => {
    if (!isHomePage) return;

    const sections = ["home", "about", "services", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  useEffect(() => {
    if (!navRef.current) return;

    const logoSpans = navRef.current.querySelectorAll(".kr-nav__logo span");
    const links = navRef.current.querySelectorAll(".kr-nav__links a");
    
    gsap.set(logoSpans, { y: 20, opacity: 0, scale: 0.8, rotationX: -90 });
    gsap.set(links, { y: 20, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.2 });
    
    tl.to(logoSpans, { 
       y: 0, 
       opacity: 1, 
       scale: 1, 
       rotationX: 0, 
       duration: 0.8, 
       stagger: 0.05, 
       ease: "back.out(2)" 
    })
    .to(links, { 
       y: 0, 
       opacity: 1, 
       duration: 0.6, 
       stagger: 0.1, 
       ease: "power3.out" 
    }, "-=0.4");
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (isHomePage) {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header>
      <nav ref={navRef} className="kr-nav" aria-label="Main navigation">
        <Link 
          href="/#home" 
          onClick={(e) => handleNavClick(e, "#home")}
          className={`kr-nav__logo ${activeSection === 'home' && isHomePage ? 'active' : ''}`}
        >
          {"KRISHORA".split("").map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </Link>
        <div className="kr-nav__links">
          <Link 
            href="/#about" 
            onClick={(e) => handleNavClick(e, "#about")}
            className={activeSection === 'about' && isHomePage ? 'active' : ''}
          >About</Link>
          <Link 
            href="/#services" 
            onClick={(e) => handleNavClick(e, "#services")}
            className={activeSection === 'services' && isHomePage ? 'active' : ''}
          >Services</Link>
          <Link 
            href="/blog" 
            className={isBlogPage ? 'active' : ''}
          >Blogs</Link>
          <Link 
            href="/#contact" 
            onClick={(e) => handleNavClick(e, "#contact")}
            className={activeSection === 'contact' && isHomePage ? 'active' : ''}
          >Contact</Link>
        </div>
      </nav>
    </header>
  );
}
