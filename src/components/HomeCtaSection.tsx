import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { navigate } from "../lib/router";

export default function HomeCtaSection() {
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <section
      id="home-cta-section"
      className="relative w-full py-28 sm:py-36 px-6 sm:px-12 bg-[#030303] border-t border-white/5 overflow-hidden font-sans select-none"
    >
      {/* Immersive cinematic background glows */}
      <div className="absolute top-[-20%] left-[-15%] w-[600px] h-[400px] bg-white/1 rounded-full blur-[140px] pointer-events-none select-none" />
      <div className="absolute bottom-[-20%] right-[-15%] w-[500px] h-[350px] bg-white/1 rounded-full blur-[120px] pointer-events-none select-none" />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8 relative z-10" id="home-cta-wrapper">
        
        {/* Sparkly Premium Indicator Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-3 py-1 bg-white/4 border border-white/5 rounded-full select-none text-neutral-450 text-[9px] tracking-[0.25em] font-mono uppercase"
          id="cta-sparkle-pill"
        >
          <Sparkles className="w-3 h-3 text-neutral-300" />
          <span>START THE EXPANSION</span>
        </motion.div>

        {/* Master Heading block */}
        <div className="flex flex-col gap-4 text-center" id="cta-heading-group">
          <h2 className="text-4xl sm:text-6xl text-white tracking-tight leading-[1.1] font-normal" id="cta-main-title">
            Ready To Build <span className="font-semibold block sm:inline">Something Better?</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-lg mx-auto mt-2">
            Let's create a website that represents your business professionally, builds long-term customer trust, and helps your enterprise grow.
          </p>
        </div>

        {/* Dynamic CTA dual triggers */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4" id="cta-buttons-layout">
          <button
            onClick={() => handleNavigation("/contact")}
            className="w-full sm:w-auto px-8 py-4 text-xs font-sans tracking-widest uppercase font-medium bg-white hover:bg-neutral-100 text-black rounded-full border border-white hover:border-neutral-200 transition-all duration-300 shadow-[0_12px_32px_rgba(255,255,255,0.08)] scale-100 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Start Project
          </button>
          
          <button
            onClick={() => handleNavigation("/contact")}
            className="w-full sm:w-auto px-8 py-4 text-xs font-sans tracking-widest uppercase font-medium bg-neutral-950 hover:bg-white/5 text-white rounded-full border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md scale-100 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 group"
          >
            Contact Us
            <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>

      </div>
    </section>
  );
}
