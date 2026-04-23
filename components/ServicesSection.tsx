"use client";
import { useEffect, useRef, useState, useCallback, startTransition } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SERVICES = [
  {
    id: "web",
    label: "Web Solutions",
    sub: "Full-stack web applications built for scale and performance. We use modern frameworks to craft engaging digital experiences.",
    details: ["React, Vue, & Next.js", "Headless CMS Integration", "Progressive Web Apps", "High Performance & SEO"],
    colSpan: "col-span-1 md:col-span-2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="kr-service-icon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    )
  },
  {
    id: "ai",
    label: "AI Integration",
    sub: "Intelligent automation and machine-learning pipelines for your business.",
    details: ["LLM Fine-tuning", "Computer Vision", "Automated Workflows", "Predictive Analytics"],
    colSpan: "col-span-1",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="kr-service-icon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    )
  },
  {
    id: "mobile",
    label: "Mobile Apps",
    sub: "Native and cross-platform mobile experiences that captivate users.",
    details: ["React Native & Flutter", "iOS & Android Native", "Offline-First Apps", "App Store Optimization"],
    colSpan: "col-span-1",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="kr-service-icon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    )
  },
  {
    id: "cyber",
    label: "Cybersecurity & InfoSec",
    sub: "Fortifying your digital assets with enterprise-grade security protocols.",
    details: ["Penetration Testing", "Compliance & Auditing", "Threat Intelligence", "Zero-Trust Architecture"],
    colSpan: "col-span-1 md:col-span-2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="kr-service-icon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    )
  },
  {
    id: "cloud",
    label: "Cloud Architecture",
    sub: "Resilient, cost-efficient cloud infrastructure designed for infinite growth.",
    details: ["AWS, GCP & Azure", "Serverless Architecture", "Kubernetes Clustering", "Data Migration"],
    colSpan: "col-span-1 md:col-span-2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="kr-service-icon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
      </svg>
    )
  },
  {
    id: "devops",
    label: "DevOps & CI/CD",
    sub: "Automated pipelines and reliable deployment architectures.",
    details: ["Continuous Integration", "Infrastructure as Code", "Monitoring & Logging", "Security Audits"],
    colSpan: "col-span-1",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="kr-service-icon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    )
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [flippedId, setFlippedId] = useState<string | null>(null);

  const handleCardClick = useCallback((id: string) => {
    startTransition(() => {
      setFlippedId(prev => prev === id ? null : id);
    });
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    
    if (!sectionRef.current) return;
    const validCards = cardsRef.current.filter(Boolean);

    // Set initial states via GSAP to prevent CLS
    const headerElements = sectionRef.current.querySelectorAll('.kr-services__header > *');
    gsap.set(headerElements, { y: 40, opacity: 0 });
    if (validCards.length > 0) {
      gsap.set(validCards, { y: 120, opacity: 0, rotateX: 45, rotateY: -15, scale: 0.8, filter: "blur(20px)" });
    }

    // Header animation (initial state set above)
    gsap.to(
      headerElements,
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    // Cards Entrance animation (initial state set above)
    if (validCards.length > 0) {
      gsap.to(
        validCards,
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 1.2,
          ease: "elastic.out(1, 0.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );
    }

    // 3D Tilt Effect on Hover
    validCards.forEach((card) => {
      if (!card) return;
      const content = card.querySelector('.kr-service-card__content');
      const glow = card.querySelector('.kr-service-card__glow');

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate rotation based on cursor position
        const xRot = gsap.utils.mapRange(0, rect.height, 5, -5, y);
        const yRot = gsap.utils.mapRange(0, rect.width, -5, 5, x);

        gsap.to(content, {
          rotateX: xRot,
          rotateY: yRot,
          duration: 0.5,
          ease: "power2.out",
          transformPerspective: 1000,
        });

        if (glow) {
          gsap.to(glow, {
            x: x,
            y: y,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(content, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.7,
          ease: "power2.out",
        });
        if (glow) {
          gsap.to(glow, { opacity: 0, duration: 0.5 });
        }
      });
    });

  }, []);

  return (
    <div ref={sectionRef} id="services" className="kr-services">
      <div className="kr-services__container">
        <div className="kr-services__header">
          <p className="kr-section-label">Our Capabilities</p>
          <h2 className="kr-services__title">What We Do</h2>
          <p className="kr-services__desc">Engineering tomorrow's solutions with a focus on design, performance, and scalability.</p>
        </div>

        <div className="kr-services__bento">
          {SERVICES.map((s, i) => (
            <div
              key={s.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`kr-service-card ${s.colSpan} ${flippedId === s.id ? 'is-flipped' : ''}`}
              onClick={() => handleCardClick(s.id)}
            >
              <div className="kr-service-card__inner">
                {/* Front of card */}
                <div className="kr-service-card__front">
                  <div className="kr-service-card__glow" />
                  <div className="kr-service-card__content">
                    <div className="kr-service-card__icon-wrapper">
                      {s.icon}
                    </div>
                    <h3 className="kr-service-card__label">{s.label}</h3>
                    <p className="kr-service-card__sub">{s.sub}</p>
                    <div className="kr-service-card__arrow">
                      {/* Plus icon when not flipped */}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div className="kr-service-card__back">
                  <div className="kr-service-card__content">
                    <h3 className="kr-service-card__back-title">{s.label} Details</h3>
                    <div className="kr-service-card__list">
                      {s.details.map((detail, idx) => (
                        <div key={idx} className="kr-service-card__list-item">{detail}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
