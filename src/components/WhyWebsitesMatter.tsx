import React from "react";
import { motion } from "motion/react";
import { Clock, ShieldCheck, HeartPulse, Smartphone, Coins } from "lucide-react";

interface CardItem {
  number: string;
  title: string;
  description: string;
  points: string[];
  icon: React.ReactNode;
  gradient: string;
}

export default function WhyWebsitesMatter() {
  const cards: CardItem[] = [
    {
      number: "01",
      title: "24/7 Presence",
      description: "Your business stays open even when you are asleep.",
      points: [
        "Uninterrupted client reach",
        "Automated booking slots",
        "Consistent brand access"
      ],
      icon: <Clock className="w-5 h-5 text-neutral-300" />,
      gradient: "from-zinc-900 via-neutral-900 to-black"
    },
    {
      number: "02",
      title: "Build Trust",
      description: "Customers trust businesses with a professional online presence.",
      points: [
        "First-rate visual impression",
        "Authentic portfolio display",
        "Secured information portal"
      ],
      icon: <ShieldCheck className="w-5 h-5 text-neutral-300" />,
      gradient: "from-zinc-900 via-neutral-900 to-black"
    },
    {
      number: "03",
      title: "Generate More Leads",
      description: "Convert random visitors into active inquiries and paying customers.",
      points: [
        "Clean contact channels",
        "Higher inquiry conversions",
        "Measurable web metrics"
      ],
      icon: <Coins className="w-5 h-5 text-neutral-300" />,
      gradient: "from-zinc-900 via-neutral-900 to-black"
    },
    {
      number: "04",
      title: "Mobile Ready",
      description: "Most visitors discover local businesses from their phones.",
      points: [
        "Responsive grid layout",
        "Touch-optimized interfaces",
        "Blazing fast loading pages"
      ],
      icon: <Smartphone className="w-5 h-5 text-neutral-300" />,
      gradient: "from-zinc-900 via-neutral-900 to-black"
    }
  ];

  return (
    <section
      id="why-websites-matter"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-[#030303] overflow-hidden font-sans border-t border-white/5"
    >
      {/* Soft spotlight overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col gap-16 relative z-10" id="why-matters-container">
        {/* Header Metadata */}
        <div className="flex flex-col gap-3 text-left max-w-xl" id="why-matters-header">
          <span className="font-mono text-[9px] tracking-[0.3em] text-neutral-500 uppercase">
            Section // 02 // Agency Insights
          </span>
          <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-tight leading-tight">
            Why a Professional Website Is <span className="font-semibold">Essential</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
            In our highly digital ecosystem, a basic social page isn't enough. Modern audiences demand flawless design, fast interactions, and structured information layouts.
          </p>
        </div>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="why-matters-grid">
          {cards.map((card, index) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col justify-between p-6 rounded-2xl border border-white/5 bg-gradient-to-b ${card.gradient} transition-all duration-300 hover:border-white/15 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)] group overflow-hidden`}
              id={`why-card-${index}`}
            >
              {/* Sleek horizontal glowing bar border accent */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-white/20 transition-all duration-500" />

              {/* Top Meta Indicator Row */}
              <div className="flex items-center justify-between z-10">
                <span className="font-mono text-[9px] tracking-widest text-neutral-600 font-bold group-hover:text-neutral-400 transition-colors">
                  [ IND_0{card.number} ]
                </span>
                <div className="p-2 sm:ps-2.5 rounded-lg bg-white/4 border border-white/5 text-neutral-400 group-hover:text-white transition-colors">
                  {card.icon}
                </div>
              </div>

              {/* Middle Section Text Layout */}
              <div className="flex flex-col gap-2 mt-8 z-10">
                <h3 className="text-base font-sans font-medium text-white tracking-wide">
                  {card.title}
                </h3>
                <p className="text-xs text-neutral-400 font-sans tracking-wide leading-relaxed font-light min-h-[48px]">
                  {card.description}
                </p>
              </div>

              {/* Bottom Multi-Points for Luxury Bulleting feel */}
              <div className="mt-6 pt-4 border-t border-white/5 flex flex-col gap-1.5 z-10" id={`why-card-points-${index}`}>
                {card.points.map((pt, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-neutral-600 rounded-full group-hover:bg-neutral-400 transition-colors" />
                    <span className="font-mono text-[8px] tracking-wide text-neutral-500 group-hover:text-neutral-300 transition-colors">
                      {pt}
                    </span>
                  </div>
                ))}
              </div>

              {/* Exquisite procedural tech lattice in custom watermark */}
              <span className="absolute bottom-[-15px] right-[-10px] text-[100px] font-mono font-bold text-white/1 select-none pointer-events-none group-hover:scale-110 transition-transform">
                {card.number}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
