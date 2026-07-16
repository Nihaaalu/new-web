import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import Canvas3D from "./Canvas3D";
import { TabType } from "../types";
import { navigate, tabToPath } from "../lib/router";

export default function Hero() {
  const handleCtaClick = (tabId: TabType) => {
    navigate(tabToPath(tabId));
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#030303] px-6 py-24 sm:py-32"
    >
      {/* 1. Custom 3D Interactive Canvas Scene Background */}
      <div className="absolute inset-0 z-0">
        <Canvas3D />
      </div>

      {/* 2. Soft, ultra-luxurious radiant lighting accent */}
      <div className="absolute bottom-[-15%] left-[10%] w-[500px] h-[350px] bg-white/2 rounded-full blur-[140px] pointer-events-none select-none" />
      <div className="absolute top-[10%] right-[5%] w-[400px] h-[300px] bg-neutral-100/1 rounded-full blur-[100px] pointer-events-none select-none" />

      {/* 3. Hero Content Wrapper  */}
      <div className="relative z-10 max-w-4xl text-center flex flex-col items-center gap-8 mt-12">
        {/* Subtle high-end micro-tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 px-3 py-1 bg-white/4 border border-white/5 rounded-full backdrop-blur-md select-none"
          id="hero-micro-tag"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neutral-200"></span>
          </span>
          <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-300 uppercase">
            NOW ACCEPTING CLIENTS FOR 2026/2027
          </span>
        </motion.div>

        {/* Master Heading (websites that help businesses grow) */}
        <h1
          className="font-sans font-medium text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.05] select-none"
          id="hero-main-title"
        >
          {/* We stagger each line beautifully like Apple landing pages */}
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="block text-transparent bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-300"
          >
            Websites That Help
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="block text-transparent bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-400 font-semibold"
          >
            Businesses Grow
          </motion.span>
        </h1>

        {/* Short description with premium whitespace structure */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-neutral-400 font-sans tracking-wide max-w-xl font-normal leading-relaxed"
          id="hero-subphrase"
        >
          Modern websites for hotels, restaurants, stores, startups, and local businesses. Purely bespoke design minus any clutter.
        </motion.p>

        {/* Dual Actions with exquisite hovering effect */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto"
          id="hero-cta-buttons"
        >
          <button
            onClick={() => handleCtaClick("gallery")}
            id="hero-cta-view-work"
            className="w-full sm:w-auto px-8 py-3.5 text-xs font-sans tracking-widest uppercase font-medium bg-white hover:bg-neutral-100 text-black rounded-full border border-white hover:border-neutral-200 transition-all duration-300 shadow-[0_8px_24px_rgba(255,255,255,0.06)] scale-100 hover:scale-[1.02] active:scale-[0.98]"
          >
            View Work
          </button>
          <button
            onClick={() => handleCtaClick("contact")}
            id="hero-cta-contact-us"
            className="w-full sm:w-auto px-8 py-3.5 text-xs font-sans tracking-widest uppercase font-medium bg-neutral-950 hover:bg-white/5 text-white rounded-full border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md scale-100 hover:scale-[1.02] active:scale-[0.98]"
          >
            Contact Us
          </button>
        </motion.div>
      </div>

      {/* Floating subtle details indicating scrollability */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={() => handleCtaClick("gallery")}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2 cursor-pointer select-none group"
        id="hero-scroll-indicator"
      >
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-neutral-500 group-hover:text-neutral-300 transition-colors">
          SCROLL TO EXPLORE
        </span>
        <ArrowDown className="w-4 h-4 text-neutral-500 group-hover:text-neutral-200 group-hover:translate-y-1 transition-all animate-bounce" />
      </motion.div>
    </section>
  );
}
