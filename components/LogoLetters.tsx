import React from "react";

export default function LogoLetters() {
  return (
    <svg
      viewBox="0 0 680 100"
      height="1em"
      width="auto"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", overflow: "visible", color: "var(--text-primary, #000)" }}
    >
      <defs>
        {/* Clip paths for perfectly flat horizontal cuts at Y=10 and Y=90 */}
        <clipPath id="c-k"><rect x="0" y="10" width="80" height="80" /></clipPath>
        <clipPath id="c-r1"><rect x="0" y="10" width="80" height="80" /></clipPath>
        <clipPath id="c-i"><rect x="0" y="10" width="30" height="80" /></clipPath>
        <clipPath id="c-s"><rect x="0" y="10" width="80" height="80" /></clipPath>
        <clipPath id="c-h"><rect x="0" y="10" width="80" height="80" /></clipPath>
        <clipPath id="c-o"><rect x="0" y="10" width="90" height="80" /></clipPath>
        <clipPath id="c-r2"><rect x="0" y="10" width="80" height="80" /></clipPath>
        <clipPath id="c-a"><rect x="0" y="10" width="90" height="80" /></clipPath>

        <linearGradient id="grad-k" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="60%" stopColor="var(--text-primary, #000)" />
        </linearGradient>
        <linearGradient id="grad-a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="40%" stopColor="var(--text-primary, #000)" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      <g fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="4">
        {/* K */}
        <g transform="translate(0,0)" className="kr-letter-wrapper">
          <g className="kr-letter-ghost" stroke="rgba(0,0,0,0.1)">
            <g clipPath="url(#c-k)">
              <line x1="15" y1="10" x2="15" y2="90" />
              <path d="M 80 -5 L 30 50 L 80 105" />
            </g>
          </g>
          <g className="kr-letter-solid" stroke="url(#grad-k)" style={{ clipPath: "var(--clipPath, inset(100% 0 0 0))" }}>
            <g clipPath="url(#c-k)">
              <line x1="15" y1="10" x2="15" y2="90" />
              <path d="M 80 -5 L 30 50 L 80 105" />
            </g>
          </g>
        </g>

        {/* R */}
        <g transform="translate(95,0)" className="kr-letter-wrapper">
          <g className="kr-letter-ghost" stroke="rgba(0,0,0,0.1)">
            <g clipPath="url(#c-r1)">
              <line x1="15" y1="10" x2="15" y2="90" />
              <path d="M 15 15 L 55 15 A 17 17 0 0 1 72 32 A 17 17 0 0 1 55 50 L 30 50 M 45 50 L 75 105" />
            </g>
          </g>
          <g className="kr-letter-solid" stroke="var(--text-primary, #000)" style={{ clipPath: "var(--clipPath, inset(100% 0 0 0))" }}>
            <g clipPath="url(#c-r1)">
              <line x1="15" y1="10" x2="15" y2="90" />
              <path d="M 15 15 L 55 15 A 17 17 0 0 1 72 32 A 17 17 0 0 1 55 50 L 30 50 M 45 50 L 75 105" />
            </g>
          </g>
        </g>

        {/* I */}
        <g transform="translate(185,0)" className="kr-letter-wrapper">
          <g className="kr-letter-ghost" stroke="rgba(0,0,0,0.1)">
            <g clipPath="url(#c-i)">
              <line x1="15" y1="10" x2="15" y2="90" />
            </g>
          </g>
          <g className="kr-letter-solid" stroke="var(--text-primary, #000)" style={{ clipPath: "var(--clipPath, inset(100% 0 0 0))" }}>
            <g clipPath="url(#c-i)">
              <line x1="15" y1="10" x2="15" y2="90" />
            </g>
          </g>
        </g>

        {/* S */}
        <g transform="translate(215,0)" className="kr-letter-wrapper">
          <g className="kr-letter-ghost" stroke="rgba(0,0,0,0.1)">
            <g clipPath="url(#c-s)">
              <path d="M 75 15 L 45 15 A 17 17 0 0 0 28 32 A 17 17 0 0 0 45 50 L 55 50 A 17 17 0 0 1 72 67 A 17 17 0 0 1 55 85 L 15 85" />
            </g>
          </g>
          <g className="kr-letter-solid" stroke="var(--text-primary, #000)" style={{ clipPath: "var(--clipPath, inset(100% 0 0 0))" }}>
            <g clipPath="url(#c-s)">
              <path d="M 75 15 L 45 15 A 17 17 0 0 0 28 32 A 17 17 0 0 0 45 50 L 55 50 A 17 17 0 0 1 72 67 A 17 17 0 0 1 55 85 L 15 85" />
            </g>
          </g>
        </g>

        {/* H */}
        <g transform="translate(305,0)" className="kr-letter-wrapper">
          <g className="kr-letter-ghost" stroke="rgba(0,0,0,0.1)">
            <g clipPath="url(#c-h)">
              <line x1="15" y1="10" x2="15" y2="90" />
              <line x1="75" y1="10" x2="75" y2="90" />
              <line x1="15" y1="50" x2="75" y2="50" />
            </g>
          </g>
          <g className="kr-letter-solid" stroke="var(--text-primary, #000)" style={{ clipPath: "var(--clipPath, inset(100% 0 0 0))" }}>
            <g clipPath="url(#c-h)">
              <line x1="15" y1="10" x2="15" y2="90" />
              <line x1="75" y1="10" x2="75" y2="90" />
              <line x1="15" y1="50" x2="75" y2="50" />
            </g>
          </g>
        </g>

        {/* O */}
        <g transform="translate(395,0)" className="kr-letter-wrapper">
          <g className="kr-letter-ghost" stroke="rgba(0,0,0,0.1)">
            <g clipPath="url(#c-o)">
              <rect x="15" y="15" width="60" height="70" rx="25" />
            </g>
          </g>
          <g className="kr-letter-solid" stroke="var(--text-primary, #000)" style={{ clipPath: "var(--clipPath, inset(100% 0 0 0))" }}>
            <g clipPath="url(#c-o)">
              <rect x="15" y="15" width="60" height="70" rx="25" />
            </g>
          </g>
        </g>

        {/* R */}
        <g transform="translate(485,0)" className="kr-letter-wrapper">
          <g className="kr-letter-ghost" stroke="rgba(0,0,0,0.1)">
            <g clipPath="url(#c-r2)">
              <line x1="15" y1="10" x2="15" y2="90" />
              <path d="M 15 15 L 55 15 A 17 17 0 0 1 72 32 A 17 17 0 0 1 55 50 L 30 50 M 45 50 L 75 105" />
            </g>
          </g>
          <g className="kr-letter-solid" stroke="var(--text-primary, #000)" style={{ clipPath: "var(--clipPath, inset(100% 0 0 0))" }}>
            <g clipPath="url(#c-r2)">
              <line x1="15" y1="10" x2="15" y2="90" />
              <path d="M 15 15 L 55 15 A 17 17 0 0 1 72 32 A 17 17 0 0 1 55 50 L 30 50 M 45 50 L 75 105" />
            </g>
          </g>
        </g>

        {/* Λ */}
        <g transform="translate(580,0)" className="kr-letter-wrapper">
          <g className="kr-letter-ghost" stroke="rgba(0,0,0,0.1)">
            <g clipPath="url(#c-a)">
              <path d="M 10 105 L 45 -5 L 80 105" />
            </g>
          </g>
          <g className="kr-letter-solid" stroke="url(#grad-a)" style={{ clipPath: "var(--clipPath, inset(100% 0 0 0))" }}>
            <g clipPath="url(#c-a)">
              <path d="M 10 105 L 45 -5 L 80 105" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
