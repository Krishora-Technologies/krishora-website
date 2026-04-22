"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SERVICES = [
  {
    id: "web",
    label: "Web Solutions",
    sub: "Full-stack web applications built for scale and performance.",
  },
  {
    id: "ai",
    label: "AI Integration",
    sub: "Intelligent automation and machine-learning pipelines for your business.",
  },
  {
    id: "cloud",
    label: "Cloud Architecture",
    sub: "Resilient, cost-efficient cloud infrastructure designed for growth.",
  },
];

const DEFAULT_TEXT = "KRISHORA";
const DEFAULT_SUB = "Engineering tomorrow's solutions, today.";

/* ── Shuffle letters effect from animatos Hero.jsx ── */
function shuffleLetters(
  text: string,
  container: HTMLElement,
  onDone?: () => void,
) {
  const chars = container.querySelectorAll<HTMLElement>("span");
  const finalText = text.toUpperCase();
  const letters = finalText.split("");
  let shuffleCount = 0;
  const handles: ReturnType<typeof setInterval>[] = [];

  function shuffleLetter(i: number) {
    if (shuffleCount < 28) {
      if (chars[i]) {
        chars[i].textContent =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
      }
    } else {
      if (chars[i]) chars[i].textContent = letters[i] ?? "";
      clearInterval(handles[i]);
    }
  }

  for (let i = 0; i < Math.min(chars.length, letters.length); i++) {
    handles[i] = setInterval(() => shuffleLetter(i), 70);
  }

  const shuffleTimer = setInterval(() => {
    shuffleCount++;
    if (shuffleCount >= 28) {
      clearInterval(shuffleTimer);
      for (let i = 0; i < handles.length; i++) clearInterval(handles[i]);
      // Blur-clear effect
      setTimeout(() => blurClear(container, onDone), 200);
    }
  }, 70);
}

function blurClear(container: HTMLElement, onDone?: () => void) {
  const spans = container.querySelectorAll<HTMLElement>("span");
  spans.forEach((s) => (s.style.filter = "blur(8px)"));
  spans.forEach((s, i) => {
    setTimeout(() => {
      gsap.to(s, { filter: "blur(0px)", duration: 0.4 });
    }, i * 80);
  });
  if (onDone) setTimeout(onDone, spans.length * 80 + 500);
}

/* Build spans for current text filling up to maxLen */
function buildSpans(text: string, maxLen: number) {
  const arr: string[] = text.toUpperCase().split("");
  while (arr.length < maxLen) arr.push("\u00A0");
  return arr;
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const subheaderRef = useRef<HTMLParagraphElement>(null);
  const [currentSpans, setCurrentSpans] = useState<string[]>(
    buildSpans(DEFAULT_TEXT, DEFAULT_TEXT.length),
  );

  const maxLen = Math.max(
    DEFAULT_TEXT.length,
    ...SERVICES.map((s) => s.label.length),
  );

  // Hover handlers — animatos Hero.jsx pattern
  function handleMouseOver(service: (typeof SERVICES)[0]) {
    if (!sectionRef.current || !placeholderRef.current) return;

    // Colour flip
    gsap.to(sectionRef.current, {
      backgroundColor: "#0e0e0c",
      duration: 0.4,
    });
    sectionRef.current.classList.add("kr-services--dark");

    // Update sub text
    if (subheaderRef.current)
      subheaderRef.current.textContent = service.sub.toUpperCase();

    // Rebuild spans for new text
    setCurrentSpans(buildSpans(service.label, maxLen));

    // Wait one tick for spans to render, then shuffle
    requestAnimationFrame(() => {
      if (placeholderRef.current)
        shuffleLetters(service.label.toUpperCase(), placeholderRef.current);
    });
  }

  function handleMouseOut() {
    if (!sectionRef.current || !placeholderRef.current) return;

    gsap.to(sectionRef.current, {
      backgroundColor: "#f8f8fc",
      duration: 0.4,
    });
    sectionRef.current.classList.remove("kr-services--dark");

    if (subheaderRef.current)
      subheaderRef.current.textContent = DEFAULT_SUB.toUpperCase();

    setCurrentSpans(buildSpans(DEFAULT_TEXT, maxLen));

    requestAnimationFrame(() => {
      if (placeholderRef.current)
        shuffleLetters(DEFAULT_TEXT, placeholderRef.current);
    });
  }

  // Scale anim on hover (animatos Hero.jsx animateScale)
  function handleHover(entering: boolean, service: (typeof SERVICES)[0]) {
    if (!placeholderRef.current) return;
    gsap.to(placeholderRef.current, {
      scale: entering ? 1.08 : 1,
      duration: 1.8,
      ease: "power1.inOut",
    });
    if (entering) handleMouseOver(service);
    else handleMouseOut();
  }

  return (
    <div ref={sectionRef} id="services" className="kr-services" style={{ backgroundColor: "#f8f8fc" }}>
      <div className="kr-services__container">
        <p className="kr-services__eyebrow">What We Do</p>

        {/* Nav items — trigger shuffle effect on hover */}
        <nav className="kr-services__nav" aria-label="Services">
          {SERVICES.map((s) => (
            <div
              key={s.id}
              id={`service-${s.id}`}
              className="kr-services__nav-item"
              onMouseEnter={() => handleHover(true, s)}
              onMouseLeave={() => handleHover(false, s)}
            >
              {s.label}
            </div>
          ))}
        </nav>

        {/* Big placeholder display */}
        <div className="kr-services__display">
          <div
            ref={placeholderRef}
            className="kr-services__placeholder"
            aria-live="polite"
          >
            {currentSpans.map((ch, i) => (
              <span key={i}>{ch}</span>
            ))}
          </div>
          <p ref={subheaderRef} className="kr-services__subheader">
            {DEFAULT_SUB.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
