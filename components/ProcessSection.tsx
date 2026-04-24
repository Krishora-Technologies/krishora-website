"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PROCESS_STEPS = [
  {
    num: "01",
    title: "AI Strategy & Use-Case Design",
    desc: "We identify high-impact AI opportunities aligned with your business goals — focusing on ROI, feasibility, and real-world execution (not hype).",
  },
  {
    num: "02",
    title: "LLM Architecture & Data Design",
    desc: "We design end-to-end AI systems including prompt workflows, embeddings, vector search, data pipelines, and model orchestration.",
  },
  {
    num: "03",
    title: "Build & Train",
    desc: "We develop, fine-tune, and integrate LLM systems into your products and workflows with iterative testing and rapid feedback cycles.",
  },
  {
    num: "04",
    title: "Deploy, Scale & Optimize",
    desc: "We deploy production-ready systems with monitoring, evaluation, and continuous optimization to ensure performance, reliability, and cost efficiency.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    // Animate the connecting line
    gsap.to(lineFillRef.current, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 80%",
        scrub: 1,
      },
    });

    // Animate each step sliding in
    stepsRef.current.forEach((step, index) => {
      if (!step) return;
      
      const content = step.querySelector(".kr-process__step-content");
      const dot = step.querySelector(".kr-process__dot");
      const isEven = index % 2 === 1; // 0-indexed, so 1 and 3 are "even" visual steps on the right

      // Initial state
      gsap.set(content, { x: isEven ? 100 : -100, opacity: 0 });
      gsap.set(dot, { scale: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(dot, { scale: 1, duration: 0.4, ease: "back.out(2)" })
        .to(content, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.2");
    });
  }, []);

  return (
    <section ref={sectionRef} className="kr-process">
      <div className="kr-process__container">
        <div className="kr-process__header">
          <p className="kr-section-label">How We Work</p>
          <h2 className="kr-process__title">Our Process</h2>
          <p className="kr-services__desc" style={{paddingTop: "20px"}}>From Idea to Intelligent System</p>
        </div>
        

        <div className="kr-process__timeline">
          {/* Central connecting line */}
          <div className="kr-process__line">
            <div ref={lineFillRef} className="kr-process__line-fill" />
          </div>

          {PROCESS_STEPS.map((step, idx) => (
            <div key={idx} ref={(el) => { stepsRef.current[idx] = el; }} className="kr-process__step">
              <div className="kr-process__step-content">
                <div className="kr-process__step-text">
                  <h3 className="kr-process__step-title">{step.title}</h3>
                  <p className="kr-process__step-desc">{step.desc}</p>
                </div>
                <span className="kr-process__step-num">{step.num}</span>
              </div>
              <div className="kr-process__dot" />
              {/* Empty div for flex spacing to push content to one side */}
              <div style={{ width: "45%" }} className="kr-process__spacer" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
