import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeftRight, Check, AlertTriangle, ChevronRight, RefreshCw, X } from "lucide-react";

export default function TransformationSection() {
  const [activeTab, setActiveTab] = useState<"before" | "after">("after");

  return (
    <section
      id="transformation-section"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-[#080808] border-t border-white/5 overflow-hidden font-sans select-none"
    >
      {/* Visual lighting depth overlays */}
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[350px] bg-white/1 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-15%] w-[400px] h-[300px] bg-white/1 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left Col: Explanatory Metadata */}
        <div className="flex flex-col gap-6 text-left" id="transform-text-col">
          <span className="font-mono text-[9px] tracking-[0.3em] text-neutral-500 uppercase">
            Section // 03 // Comparative Analysis
          </span>

          <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-tight leading-[1.15]" id="transform-heading">
            First Impressions <span className="font-semibold block sm:inline">Happen Online</span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-xl">
            A customer forms a crucial opinion about your business style, reliability, and capability within **seconds** of loading your webpage. A fragmented layout or slow interactions will send them directly to competitors.
          </p>

          {/* Interactive Toggle Pill */}
          <div className="flex items-center gap-3 p-1.5 bg-neutral-900 border border-white/5 rounded-full w-fit mt-4">
            <button
              onClick={() => setActiveTab("before")}
              className={`px-5 py-2 text-xs font-mono tracking-wider uppercase font-medium rounded-full cursor-pointer transition-all flex items-center gap-2 ${
                activeTab === "before"
                  ? "bg-red-950/40 text-red-300 border border-red-900/40"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Old Design (v1.0)
            </button>
            <button
              onClick={() => setActiveTab("after")}
              className={`px-5 py-2 text-xs font-mono tracking-wider uppercase font-medium rounded-full cursor-pointer transition-all flex items-center gap-2 ${
                activeTab === "after"
                  ? "bg-emerald-950/40 text-emerald-300 border border-emerald-900/40"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              Bespoke Agency (v2.0)
            </button>
          </div>

          {/* Structured points list depending on selected toggle state */}
          <div className="mt-4 border-t border-white/5 pt-6 flex flex-col gap-4">
            {activeTab === "before" ? (
              <div className="flex flex-col gap-3 text-sm text-neutral-400">
                <div className="flex items-start gap-3">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Unoptimized layouts cause immediate visual stress and confusion.</span>
                </div>
                <div className="flex items-start gap-3">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Cramped template pages feel generic and untrustworthy.</span>
                </div>
                <div className="flex items-start gap-3">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Zero attention to typography or consistent mobile flow.</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 text-sm text-neutral-400">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Meticulous typography scales for effortless client scanning.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Optimized responsive codes tailored for swift interaction speeds.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Glassmorphic filters and ambient grids conveying absolute authority.</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Highly detailed Interactive Device Renderings */}
        <div className="relative flex justify-center items-center" id="device-transform-panel">
          
          <div className="w-full max-w-[340px] sm:max-w-[380px] h-[500px] relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 bg-neutral-950 p-[3px] flex items-center justify-center">
            
            {/* Soft Screen Refraction Edge Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/1 via-transparent to-white/5 pointer-events-none z-20" />

            {/* Inner dynamic viewports changing content according activeTab */}
            <div className="w-full h-full rounded-[22px] overflow-hidden relative" id="transformation-viewport">
              <AnimatePresence mode="wait">
                {activeTab === "before" ? (
                  <motion.div
                    key="before"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full bg-[#0011ff]/10 p-6 flex flex-col justify-between text-left font-serif text-amber-900 border border-red-500/20"
                    style={{ fontFamily: "Comic Sans MS, cursive, sans-serif" }}
                  >
                    {/* Retro / Broken UI System Layout on the Left */}
                    <div className="flex justify-between items-center border-b border-yellow-500/30 pb-2">
                      <span className="text-[14px] text-yellow-500 tracking-tighter uppercase font-bold">★ MY_HOTEL ★</span>
                      <span className="text-[8px] text-[#ff0055]">BEST QUALITY!</span>
                    </div>

                    <div className="my-auto flex flex-col gap-4">
                      <span className="text-[9px] text-white bg-red-650 px-2 py-0.5 w-fit rounded">
                        HOT DEAL!! CLICK HERE NOW!!
                      </span>
                      <h4 className="text-[26px] tracking-normal leading-tight text-white font-serif">
                        WELCOME TO GREAT LUXURY MOTEL CO. !!
                      </h4>
                      <p className="text-[11px] text-neutral-300 tracking-wide font-sans font-light leading-relaxed">
                        We have very cheap beds, and pool. Please book now call our cell number. It is fast clean and very safe. Do not wait!
                      </p>
                      
                      {/* Ugly solid flashing buttons */}
                      <div className="flex flex-col gap-1.5 mt-2">
                        <div className="w-full h-3 bg-red-600/20 border border-red-500 rounded relative overflow-hidden flex items-center justify-center text-[7px] text-red-400 font-mono">
                          ERROR_LOADING_IMAGE.JPG
                        </div>
                      </div>
                    </div>

                    <button className="w-full py-3.5 bg-yellow-400 text-black border-2 border-dashed border-red-600 font-bold text-[11px] tracking-wide rounded-none uppercase animate-pulse">
                      &gt;&gt; CLICK TO RESERVE NOW &lt;&lt;
                    </button>
                  </motion.div>
                ) : (
                  /* Ultra-High-End Premium Bespoke Layout on the Right */
                  <motion.div
                    key="after"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full bg-[#070707] p-6 flex flex-col justify-between text-left font-sans"
                  >
                    {/* Luxury Glassmorphic Header */}
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                      <span className="font-serif text-[10px] text-white tracking-[0.25em] uppercase font-light">MAISON</span>
                      <div className="flex gap-2 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                        <span className="font-mono text-[7px] text-neutral-500 tracking-widest">[ REV_8.4 ]</span>
                      </div>
                    </div>

                    <div className="my-auto flex flex-col gap-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                        <span className="font-mono text-[7px] tracking-[0.25em] text-[#d4af37] uppercase">THE NEW BENCHMARK</span>
                      </div>

                      <h4 className="text-[22px] tracking-tight leading-snug font-serif text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400">
                        Bespoke Suites Designed For Living.
                      </h4>

                      <p className="text-[10px] text-neutral-400 leading-relaxed font-light">
                        Discover pure architectural excellence and tailored concierge service mapping in our luxury private lodges in San Francisco.
                      </p>

                      {/* Clean pricing picker */}
                      <div className="p-3 rounded-xl border border-white/5 bg-white/2 flex items-center justify-between mt-2">
                        <div className="flex flex-col">
                          <span className="font-mono text-[6px] text-neutral-500">RESORT SUITE RATE</span>
                          <span className="font-serif text-[11px] text-[#d4af37]">$450 / night</span>
                        </div>
                        <span className="font-mono text-[8px] text-neutral-300 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                          CHECK_IN_INDEX
                        </span>
                      </div>
                    </div>

                    {/* Exquisite polished button */}
                    <button className="w-full py-3 bg-[#d4af37] text-neutral-950 font-sans font-semibold text-[8px] tracking-[0.25em] rounded-lg uppercase shadow-lg shadow-[#d4af37]/5 hover:bg-white hover:text-black transition-colors pointer-events-auto cursor-pointer">
                      Secure Luxury Lodge
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Symmetrical interactive floating key icon to indicate dynamic swap */}
          <div className="absolute top-[10%] right-[-15px] p-3 rounded-full bg-neutral-900 border border-white/10 text-white shadow-2xl z-30 animate-bounce cursor-pointer" onClick={() => setActiveTab(activeTab === "before" ? "after" : "before")}>
            <ArrowLeftRight className="w-4 h-4 text-[#d4af37]" />
          </div>
        </div>

      </div>
    </section>
  );
}
