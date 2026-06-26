"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = cursorDotRef.current;
    if (!dot) return;

    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    const xDot = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3" });

    function onMove(e: MouseEvent) {
      xDot(e.clientX);
      yDot(e.clientY);

      // Event delegation for hover states so it works globally across all pages
      const target = e.target as HTMLElement;
      if (target.closest && target.closest("a, button, [class*='nav-item'], [class*='magnetic'], .kr-service-card, .blog-card")) {
        dot!.closest(".kr-cursor")?.classList.add("kr-cursor--hover");
      } else {
        dot!.closest(".kr-cursor")?.classList.remove("kr-cursor--hover");
      }
    }

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="kr-cursor" aria-hidden="true" style={{ zIndex: 9999999 }}>
      <div ref={cursorDotRef} className="kr-cursor__dot" />
    </div>
  );
}
