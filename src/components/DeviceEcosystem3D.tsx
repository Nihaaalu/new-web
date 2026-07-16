import React, { useState } from "react";
import { motion } from "motion/react";
import { Monitor, Tablet, Smartphone, Sparkles, Check } from "lucide-react";

export default function DeviceEcosystem3D() {
  const [hoveredDev, setHoveredDev] = useState<"laptop" | "tablet" | "phone" | null>(null);

  return (
    <section
      id="device-ecosystem"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-[#030303] border-t border-white/5 overflow-hidden font-sans select-none"
    >
      {/* Abstract light aura overlays */}
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-white/1 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-white/1 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col gap-16 relative z-10" id="device-ecosystem-container">
        
        {/* Story details */}
        <div className="flex flex-col gap-3 text-center items-center max-w-xl mx-auto" id="device-ecosystem-header">
          <span className="font-mono text-[9px] tracking-[0.3em] text-neutral-500 uppercase">
            Section // 06 // Responsive Geometry
          </span>
          <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-tight leading-tight">
            Looks Great On <span className="font-semibold block sm:inline">Every Screen</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
            Beautiful layouts must flow symmetrically across devices. We design custom responsive systems that stay perfectly balanced on phone, tablet, and desktop screens alike.
          </p>
        </div>

        {/* 3D Devices Showcase Canvas */}
        <div className="w-full min-h-[480px] flex items-center justify-center relative py-8" id="devices-3d-stage">
          {/* Main Backdrop Glowing Shield */}
          <div className="absolute w-[350px] h-[350px] bg-white/2 rounded-full blur-[100px] pointer-events-none z-0" />

          {/* Device 3D Perspective Grid */}
          <div className="relative w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-12 z-10" id="ecosystem-devices-grid">
            
            {/* TAB 1: LAPTOP VIEWPORT (Left/Center representation) */}
            <motion.div
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateX(${hoveredDev === "laptop" ? 8 : 12}deg) rotateY(${hoveredDev === "laptop" ? -14 : -18}deg)`,
              }}
              onMouseEnter={() => setHoveredDev("laptop")}
              onMouseLeave={() => setHoveredDev(null)}
              className="relative w-[340px] sm:w-[420px] aspect-[16/10] bg-[#0e0e11] rounded-2xl p-2.5 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out flex flex-col justify-between shrink-0"
              id="ecosystem-laptop-mockup"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/4 to-transparent pointer-events-none rounded-2xl" />
              
              {/* Inner Laptop Web Display screen */}
              <div className="w-full h-full bg-[#050505] rounded-xl overflow-hidden relative flex flex-col">
                <div className="h-6 w-full bg-neutral-900 border-b border-white/5 flex items-center px-4 gap-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-700/50" />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-700/50" />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-700/50" />
                  <span className="font-mono text-[7px] text-neutral-500 ml-4">https://grandpalace.hotel/suites</span>
                </div>

                <div className="flex-grow p-4 flex flex-col justify-between text-left">
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="font-sans text-[11px] text-white tracking-widest font-semibold uppercase">GRAND PALACE HOTEL</span>
                    <span className="font-mono text-[7px] text-neutral-500">[ DESKTOP_VIEW ]</span>
                  </div>
                  
                  <div className="my-auto py-2 flex items-center justify-between gap-4">
                     <div className="flex flex-col gap-1 max-w-[60%]">
                      <h4 className="font-sans text-[16px] text-white leading-tight font-medium">Bespoke Living.</h4>
                      <p className="text-[9px] text-neutral-400 font-light leading-relaxed">
                        Experience dynamic comfort with breathtaking ocean views and 5-star digital concierge service.
                      </p>
                    </div>
                    {/* Visual box placeholder mirroring responsive details */}
                    <div className="w-20 h-14 rounded-lg bg-white/2 border border-white/5 flex flex-col justify-between p-1.5">
                      <span className="text-[5px] text-neutral-500 font-mono">AVAILABLE ROOMS</span>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="bg-white w-3/4 h-full" />
                      </div>
                      <span className="text-[7px] text-white font-semibold text-right">$450_</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-1 pt-2 border-t border-white/5">
                    <span className="font-mono text-[6px] text-neutral-500">DYNAMIC BOOKING SYSTEM v4.1</span>
                    <button className="px-3 py-1.5 bg-white text-black font-sans font-medium text-[7px] tracking-widest uppercase rounded-md cursor-pointer hover:bg-neutral-200 transition-colors">
                      CHECK IN
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* TAB 2: TABLET VIEWPORT (Center/Right overlay) */}
            <motion.div
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateX(${hoveredDev === "tablet" ? 6 : 10}deg) rotateY(${hoveredDev === "tablet" ? 12 : 8}deg) translateZ(40px)`,
              }}
              onMouseEnter={() => setHoveredDev("tablet")}
              onMouseLeave={() => setHoveredDev(null)}
              className="relative w-[210px] sm:w-[245px] aspect-[3/4] bg-[#0c0c0f] rounded-2xl p-2 border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.85)] transition-all duration-500 ease-out flex flex-col justify-between shrink-0"
              id="ecosystem-tablet-mockup"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent pointer-events-none rounded-2xl" />

              {/* Tablet screen */}
              <div className="w-full h-full bg-[#050505] rounded-xl overflow-hidden p-3.5 flex flex-col justify-between relative">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="font-sans text-[10px] text-white tracking-widest font-semibold uppercase">GRAND PALACE</span>
                  <span className="font-mono text-[7px] text-neutral-500">[TABLET_VIEW]</span>
                </div>

                <div className="my-auto py-2 flex flex-col gap-2 text-left">
                  <span className="font-mono text-[6px] tracking-widest text-neutral-400 uppercase">THE NEW BENCHMARK</span>
                  <h4 className="font-sans text-[15px] text-white leading-snug font-medium">Bespoke Suite Living.</h4>
                  <p className="text-[8px] text-neutral-400 font-light leading-relaxed">
                    Experience dynamic comfort with breathtaking ocean views and 5-star digital concierge service.
                  </p>
                  
                  {/* Clean widget representing tablet responsive scaling */}
                  <div className="p-2 rounded-lg border border-white/5 bg-white/2 flex items-center justify-between">
                    <span className="text-[6px] text-neutral-500 font-mono">RATE PER NIGHT</span>
                    <span className="text-[9px] text-white font-sans font-semibold">$450</span>
                  </div>
                </div>

                <button className="w-full py-2 bg-white text-black font-sans font-medium text-[7px] tracking-widest uppercase rounded-md cursor-pointer hover:bg-neutral-200 transition-colors">
                  Reserve Suite
                </button>
              </div>
            </motion.div>

            {/* TAB 3: PHONE VIEWPORT (Forward hovering representation) */}
            <motion.div
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateX(${hoveredDev === "phone" ? 4 : 8}deg) rotateY(${hoveredDev === "phone" ? 22 : 18}deg) translateZ(80px) translateY(12px)`,
              }}
              onMouseEnter={() => setHoveredDev("phone")}
              onMouseLeave={() => setHoveredDev(null)}
              className="relative w-[130px] sm:w-[150px] aspect-[9/18] bg-[#08080a] rounded-2xl p-1.5 border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.9)] transition-all duration-500 ease-out flex flex-col justify-between shrink-0"
              id="ecosystem-phone-mockup"
            >
              {/* Phone screen is narrow, display text beautifully wrapped */}
              <div className="w-full h-full bg-[#050505] rounded-xl overflow-hidden p-2.5 flex flex-col justify-between relative">
                {/* Micro notch top */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2.5 bg-neutral-900 rounded-full z-25" />

                <div className="flex justify-between items-center border-b border-white/5 pb-1 pt-3.5">
                  <span className="font-sans text-[8px] text-white uppercase tracking-wider">GRAND PALACE</span>
                  <span className="font-mono text-[5px] text-neutral-500">[PHONE]</span>
                </div>

                <div className="my-auto flex flex-col gap-1 text-left">
                  <h4 className="font-sans text-[11px] text-white leading-tight font-medium">Bespoke Luxury.</h4>
                  <p className="text-[7px] text-neutral-400 font-light leading-normal">
                    5-star private lodging concierge service.
                  </p>
                </div>

                <button className="w-full py-1.5 bg-white text-black font-sans font-medium text-[6px] tracking-widest uppercase rounded cursor-pointer hover:bg-neutral-200 transition-colors">
                  Book Suite
                </button>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
