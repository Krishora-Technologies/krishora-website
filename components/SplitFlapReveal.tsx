"use client";

import { motion } from "framer-motion";

const PHRASES = ["Intelligence.", "Engineered.", "Scalable."];

const COLORS = [" #000000ff", "#000000ff", "#000000ff"];


// Each phrase starts after all previous phrases' letters have revealed
function getPhraseStartDelay(index: number): number {
  let delay = 0.4; // initial offset
  for (let i = 0; i < index; i++) {
    // time for phrase i = (letter count × stagger) + duration of last letter + buffer
    delay += PHRASES[i].length * 0.048 + 0.5 + 0.35;
  }
  return delay;
}

export default function SplitFlapReveal({
  text: _text,
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "flex-end",
        gap: "0.55em",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {PHRASES.map((phrase, i) => (
        <PhraseReveal
          key={phrase}
          phrase={phrase}
          color={COLORS[i]}
          startDelay={getPhraseStartDelay(i)}
        />
      ))}
    </div>
  );
}

function PhraseReveal({
  phrase,
  color,
  startDelay,
}: {
  phrase: string;
  color: string;
  startDelay: number;
}) {
  const letters = phrase.split("");
  // Underline sweeps after the last letter finishes revealing
  const underlineDelay = startDelay + (letters.length - 1) * 0.048 + 0.45;

  return (
    // Column: letters row on top, underline below — underline auto-matches text width
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px",
      }}
    >
      {/* ── Letter row ── */}
      <div style={{ display: "inline-flex", gap: "0.015em" }}>
        {letters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: startDelay + i * 0.048,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              display: "inline-block",
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(18px, 3.2vw, 38px)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              lineHeight: 1.15,
              color: color,
              whiteSpace: "pre",
              
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* ── Underline — width = 100% of the flex-column child = exact text width ── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{
          delay: underlineDelay,
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          height: "1.5px",
          width: "100%",
          backgroundImage: `linear-gradient(90deg, transparent 0%, ${color} 30%, ${color} 70%, transparent 100%)`,
          transformOrigin: "center",
          borderRadius: "2px",
          
        }}
      />
    </div>
  );
}
