import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";

interface StatItem {
  id: string;
  target: number;
  suffix: string;
  label: string;
  subtitle: string;
}

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const stats: StatItem[] = [
    {
      id: "stat-research",
      target: 90,
      suffix: "%",
      label: "Online Research",
      subtitle: "Customers research online before making purchasing decisions."
    },
    {
      id: "stat-credibility",
      target: 75,
      suffix: "%",
      label: "Credibility Judgment",
      subtitle: "Visitors base credibility of businesses entirely on design quality."
    },
    {
      id: "stat-availability",
      target: 24,
      suffix: "/7",
      label: "Active Availability",
      subtitle: "Your digital storefront stays open converting leads night and day."
    }
  ];

  return (
    <section
      ref={containerRef}
      id="stats-section"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-[#030303] border-t border-white/5 overflow-hidden font-sans select-none"
    >
      {/* Decorative background visual neon accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-white/1 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col gap-16 relative z-10" id="stats-section-container">
        
        {/* Short meta heading */}
        <div className="flex flex-col gap-3 text-center items-center max-w-xl mx-auto" id="stats-header">
          <span className="font-mono text-[9px] tracking-[0.3em] text-neutral-500 uppercase">
            Section // 04 // Market Metrics
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight leading-tight">
            The Hard Web Data
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
            Beautiful design translates into measurable client returns. In the digital space, visual quality represents operational quality.
          </p>
        </div>

        {/* Counter Items Grid layout block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 border-t border-b border-white/5 py-12" id="stats-counters-grid">
          {stats.map((stat, index) => (
            <div key={stat.id} className="flex flex-col items-center justify-center text-center gap-4 px-4" id={stat.id}>
              {/* Dynamic Increment Counter display */}
              <div className="text-5xl sm:text-7xl font-sans tracking-tight font-semibold text-white flex items-baseline gap-1" id={`counter-display-${stat.id}`}>
                {isInView ? (
                  <Counter target={stat.target} duration={1.5 + index * 0.4} />
                ) : (
                  <span>0</span>
                )}
                <span className="text-neutral-500 text-3xl sm:text-5xl">{stat.suffix}</span>
              </div>

              {/* Stat Text Descriptors */}
              <div className="flex flex-col gap-1.5" id={`counter-meta-${stat.id}`}>
                <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase font-medium">
                  {stat.label}
                </span>
                <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-xs">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Custom Counter Component mapping state changes smoothly
function Counter({ target, duration }: { target: number; duration: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // Cinematic ease-out timing function computation
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * target));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [target, duration]);

  return <span>{count}</span>;
}
