"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TECHNOLOGIES = [
  { name: "Node.js", slug: "nodedotjs", color: "#339933" },
  { name: "Deno", slug: "deno", color: "#000000" },
  { name: "Bun", slug: "bun", color: "#fadeb3ff" },
  { name: "JavaScript", slug: "javascript", color: "#F7DF1E" },
  { name: "TypeScript", slug: "typescript", color: "#3178C6" },
  { name: "Python", slug: "python", color: "#3776AB" },
  { name: "Ollama", slug: "ollama", color: "#000000" },
  { name: "TensorFlow", slug: "tensorflow", color: "#FF6F00" },
  { name: "PyTorch", slug: "pytorch", color: "#EE4C2C" },
  { name: "React", slug: "react", color: "#61DAFB" },
  { name: "Next.js", slug: "nextdotjs", color: "#000000" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "#06B6D4" },
  { name: "Supabase", slug: "supabase", color: "#3ECF8E" },
  { name: "Firebase", slug: "firebase", color: "#FFCA28" },
  { name: "Docker", slug: "docker", color: "#2496ED" },
  { name: "PostgreSQL", slug: "postgresql", color: "#4169E1" },
  { name: "GraphQL", slug: "graphql", color: "#E10098" },
  { name: "Redis", slug: "redis", color: "#DC382D" },
  { name: "Kubernetes", slug: "kubernetes", color: "#326CE5" },
];

export default function TechStackMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    // Optional: add a slight parallax or fade-in on scroll
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="kr-techstack">
      <div className="kr-techstack__header">
        <p className="kr-section-label">Technologies We Use</p>
      </div>

      <div className="kr-techstack__marquee-wrapper">
        <div className="kr-techstack__marquee">
          <div className="kr-techstack__track">
            {TECHNOLOGIES.map((tech, i) => (
              <div key={`tech1-${i}`} className="kr-techstack__item">
                <img
                  src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color.replace("#", "")}`}
                  alt={`${tech.name} logo`}
                  className="kr-techstack__icon"
                  draggable={false}
                  loading="lazy"
                />
                <span className="kr-techstack__name">{tech.name}</span>
              </div>
            ))}
          </div>
          {/* Duplicate track for seamless loop */}
          <div className="kr-techstack__track" aria-hidden="true">
            {TECHNOLOGIES.map((tech, i) => (
              <div key={`tech2-${i}`} className="kr-techstack__item">
                <img
                  src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color.replace("#", "")}`}
                  alt={`${tech.name} logo`}
                  className="kr-techstack__icon"
                  draggable={false}
                  loading="lazy"
                />
                <span className="kr-techstack__name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
