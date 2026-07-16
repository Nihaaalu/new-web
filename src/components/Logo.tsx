import { useState } from "react";

interface LogoProps {
  variant: "dark-bg" | "light-bg" | "loading-dark" | "loading-light";
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function Logo({ variant, className = "", size = 48, showText = false }: LogoProps) {
  const [hasError, setHasError] = useState(false);

  // Map variant to file paths requested
  let src = "";
  if (variant === "dark-bg") src = "/logo/logobg.png";
  else if (variant === "light-bg") src = "/logo/blogobg.png";
  else if (variant === "loading-dark") src = "/logo/wloadbg.png";
  else if (variant === "loading-light") src = "/logo/bloadbg.png";

  return (
    <div className={`inline-flex items-center ${showText ? "gap-3" : ""} select-none ${className}`} id={`logo-container-${variant}`}>
      {!hasError ? (
        <img
          src={src}
          alt="HRBY Solutions"
          style={{ height: size, objectFit: "contain" }}
          onError={() => setHasError(true)}
          className="transition-transform duration-300"
          id={`logo-img-${variant}`}
        />
      ) : (
        // Premium inline SVG fallback - beautiful minimalist overlapping geometric "HRBY" emblem
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-300 transform hover:scale-105"
          id={`logo-svg-${variant}`}
        >
          <defs>
            <linearGradient id="premium-gradient-dark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#A3A3A3" />
              <stop offset="100%" stopColor="#404040" />
            </linearGradient>
            <linearGradient id="premium-gradient-light" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="50%" stopColor="#404040" />
              <stop offset="100%" stopColor="#737373" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Abstract interlocking corporate ribbon design "H" & "S" */}
          {variant.includes("dark") ? (
            <>
              {/* Outer Glow for dark background */}
              <rect x="25" y="25" width="50" height="50" rx="14" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
              {/* Left Bar */}
              <rect x="35" y="30" width="10" height="40" rx="3" fill="url(#premium-gradient-dark)" />
              {/* Right Bar */}
              <rect x="55" y="30" width="10" height="40" rx="3" fill="url(#premium-gradient-dark)" />
              {/* Interlocking modern diagonal connector */}
              <path d="M45 42 L55 58" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
              <circle cx="50" cy="50" r="4" fill="#FFFFFF" filter="url(#glow)" />
            </>
          ) : (
            <>
              {/* Light variant */}
              <rect x="25" y="25" width="50" height="50" rx="14" stroke="rgba(0, 0, 0, 0.08)" strokeWidth="1" />
              <rect x="35" y="30" width="10" height="40" rx="3" fill="url(#premium-gradient-light)" />
              <rect x="55" y="30" width="10" height="40" rx="3" fill="url(#premium-gradient-light)" />
              <path d="M45 44 L55 56" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
              <circle cx="50" cy="50" r="4" fill="#000000" />
            </>
          )}
        </svg>
      )}

      {/* Corporate logotype aligned to standard scale headings */}
      {showText && (
        <span
          style={{ fontSize: size * 0.42 }}
          className={`font-sans tracking-[0.25em] font-medium leading-none select-none uppercase ${
            variant.includes("dark") ? "text-white" : "text-black"
          }`}
        >
          HRBY
        </span>
      )}
    </div>
  );
}
