import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { navigate } from "../lib/router";
import { 
  Wifi, 
  RotateCw, 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  Menu,
  Sparkles
} from "lucide-react";

import ShopWebsite from "./apps/ShopWebsite";

interface RouteState {
  page: string;
  params?: any;
}

function MiniAppSkeleton() {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-3 py-6 text-left animate-pulse bg-neutral-900">
      <div className="h-6 bg-white/10 rounded w-1/3" />
      <div className="h-28 bg-white/5 rounded-xl w-full" />
      <div className="h-4 bg-white/10 rounded w-2/3" />
      <div className="h-3 bg-white/5 rounded w-1/2" />
      
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="h-14 bg-white/5 rounded-lg" />
        <div className="h-14 bg-white/5 rounded-lg" />
      </div>

      <div className="h-10 bg-white/10 rounded-lg w-full mt-auto" />
    </div>
  );
}

export default function PhoneShowcase3D() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Web Browser History State Engine for the StyleHub website
  const [historyStack, setHistoryStack] = useState<RouteState[]>([{ page: "home" }]);
  const [historyIdx, setHistoryIdx] = useState(0);

  // Experience Settings: isSandboxActive (false = Preview Mode / UNLOCK, true = Interactive Sandbox / LOCK)
  const [isSandboxActive, setIsSandboxActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isMobileSize = window.innerWidth < 768;
      setIsMobile(isMobileSize || mobileUA);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Lock parent scrolling when mouse enters/touchstart inside the phone in active sandbox mode
  React.useEffect(() => {
    if (!isSandboxActive) {
      document.body.style.overflow = "";
      return;
    }

    const displayElement = document.getElementById("phone-display");
    if (!displayElement) return;

    const handlePointerEnter = () => {
      document.body.style.overflow = "hidden";
    };

    const handlePointerLeave = () => {
      document.body.style.overflow = "";
    };

    const handleTouchStart = () => {
      document.body.style.overflow = "hidden";
    };

    const handleTouchEndOrCancel = () => {
      document.body.style.overflow = "";
    };

    const handleStopPropagation = (e: Event) => {
      e.stopPropagation();
    };

    displayElement.addEventListener("pointerenter", handlePointerEnter, { passive: true });
    displayElement.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    displayElement.addEventListener("touchstart", handleTouchStart, { passive: true });
    displayElement.addEventListener("touchend", handleTouchEndOrCancel, { passive: true });
    displayElement.addEventListener("touchcancel", handleTouchEndOrCancel, { passive: true });

    displayElement.addEventListener("wheel", handleStopPropagation, { passive: false });
    displayElement.addEventListener("touchmove", handleStopPropagation, { passive: false });
    displayElement.addEventListener("pointermove", handleStopPropagation, { passive: false });

    return () => {
      document.body.style.overflow = "";
      displayElement.removeEventListener("pointerenter", handlePointerEnter);
      displayElement.removeEventListener("pointerleave", handlePointerLeave);
      displayElement.removeEventListener("touchstart", handleTouchStart);
      displayElement.removeEventListener("touchend", handleTouchEndOrCancel);
      displayElement.removeEventListener("touchcancel", handleTouchEndOrCancel);

      displayElement.removeEventListener("wheel", handleStopPropagation);
      displayElement.removeEventListener("touchmove", handleStopPropagation);
      displayElement.removeEventListener("pointermove", handleStopPropagation);
    };
  }, [isSandboxActive]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isSandboxActive) return; // Completely disable hover/tilt logic in LOCK mode
    if (isMobile) return; // Keep chassis flat on mobile
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    if (isSandboxActive) return; // Completely disable hover/tilt logic in LOCK mode
    setMousePos({ x: 0, y: 0 });
  };

  // History modification helpers
  const handleNavigate = (page: string, params?: any) => {
    const newStack = historyStack.slice(0, historyIdx + 1);
    setHistoryStack([...newStack, { page, params }]);
    setHistoryIdx(newStack.length);
  };

  const handleGoBack = () => {
    if (historyIdx > 0) {
      setHistoryIdx(historyIdx - 1);
    }
  };

  const handleGoForward = () => {
    if (historyIdx < historyStack.length - 1) {
      setHistoryIdx(historyIdx + 1);
    }
  };

  const handleGoHome = () => {
    setHistoryStack([{ page: "home" }]);
    setHistoryIdx(0);
    setMenuOpen(false);
  };

  const handleReload = () => {
    setIsReloading(true);
    setTimeout(() => {
      setIsReloading(false);
    }, 450);
  };

  const activeRoute = historyStack[historyIdx] || { page: "home" };

  // Calculate browser URL address string
  const getUrlString = () => {
    const domain = "stylehub.store";
    if (activeRoute.page === "home") return `https://${domain}`;
    
    let path = activeRoute.page;
    if (activeRoute.params && activeRoute.params.id) {
      path = `${activeRoute.page}/${activeRoute.params.id}`;
    } else if (activeRoute.page === "contact-success") {
      path = "contact/success";
    } else if (activeRoute.page === "checkout-success") {
      path = "checkout/success";
    } else {
      path = activeRoute.page.replace("-", "/");
    }
    return `https://${domain}/${path}`;
  };

  // 3D parameters - completely zeroed out during active sandbox LOCK mode
  const rotateX = (isMobile || isSandboxActive) ? 0 : mousePos.y * 14; 
  const rotateY = (isMobile || isSandboxActive) ? 0 : mousePos.x * -14; 
  const shadowX = (isMobile || isSandboxActive) ? 0 : mousePos.x * -20;
  const shadowY = (isMobile || isSandboxActive) ? 12 : mousePos.y * -20 + 12;

  return (
    <section
      id="phone-showcase"
      className="relative w-full py-20 lg:py-32 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#050505] border-t border-b border-white/5 overflow-visible flex items-center justify-center font-sans select-none"
    >
      <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-20">
        
        {/* LEFT COLUMN: Core text content + CTA actions */}
        <div className="lg:col-span-7 flex flex-col items-start text-left max-w-2xl px-1">
          <div className="flex items-center gap-2 mb-4.5">
            <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-400 uppercase leading-none flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" /> Live Showcase
            </span>
          </div>

          <h2 
            className="text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight leading-[1.08] mb-6" 
            id="phone-showcase-heading"
          >
            See How a Modern Website <span className="font-semibold text-neutral-305 block mt-1.5 bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-400">Feels in Action</span>
          </h2>

          <p 
            className="text-base sm:text-lg text-neutral-400 leading-relaxed font-light font-sans mb-10 max-w-xl" 
            id="phone-showcase-desc"
          >
            Click, scroll, and explore StyleHub — our benchmark apparel experience. Realize the fluid responsiveness, clean organic layouts, and premium interaction patterns that build trust and drive conversions for your business on any screen size.
          </p>

          {/* Clean modern layout of CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
                const el = document.getElementById("phone-display");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
              className="w-full sm:w-auto px-7 py-3 rounded-full text-neutral-950 font-semibold text-sm bg-white hover:bg-neutral-100 active:bg-neutral-200 transition-all cursor-pointer shadow-[0_8px_24px_rgba(255,255,255,0.08)] hover:scale-[1.01] duration-150 text-center"
            >
              Interact with Mockup
            </button>
            <button
              onClick={() => {
                navigate("/contact");
              }}
              className="w-full sm:w-auto px-7 py-3 rounded-full text-white font-semibold text-sm bg-neutral-900 border border-white/10 hover:bg-neutral-850 hover:border-white/25 transition-all cursor-pointer hover:scale-[1.01] duration-150 text-center"
            >
              Start Your Project
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Phone Mockup as Hero - No card or panel backdrop */}
        <div className="lg:col-span-5 flex items-center justify-center relative min-h-0 select-none">
          <div
            ref={containerRef}
            onMouseMove={isSandboxActive ? undefined : handleMouseMove}
            onMouseLeave={isSandboxActive ? undefined : handleMouseLeave}
            className="relative flex flex-col items-center justify-center w-full select-none overflow-visible"
            id="phone-3d-scene-container"
          >
            <div className="relative flex justify-center items-center w-full">
              {/* Dynamic perspective drop-shadow layer */}
              <div
                style={{
                  transform: (isMobile || isSandboxActive)
                    ? "translate3d(0px, 15px, 0px) scale(1.0)"
                    : `translate3d(${shadowX}px, ${shadowY}px, -100px) scale(0.96)`,
                  filter: (isMobile || isSandboxActive) ? "blur(30px)" : "blur(45px)",
                  opacity: (isMobile || isSandboxActive) ? 0.6 : 0.82
                }}
                className="absolute w-[246px] h-[492px] sm:w-[268px] sm:h-[536px] md:w-[282px] md:h-[564px] lg:w-[290px] lg:h-[580px] xl:w-[310px] xl:h-[620px] bg-neutral-950 rounded-[50px] transition-all duration-305 ease-out pointer-events-none"
              />

              {/* Luxurious phone body */}
              <div
                style={{
                  transform: (isMobile || isSandboxActive)
                    ? "none"
                    : `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
                  transformStyle: (isMobile || isSandboxActive) ? "flat" : "preserve-3d",
                }}
                className="relative w-[246px] h-[492px] sm:w-[268px] sm:h-[536px] md:w-[282px] md:h-[564px] lg:w-[290px] lg:h-[580px] xl:w-[310px] xl:h-[620px] bg-[#0c0c0e] rounded-[44px] sm:rounded-[54px] p-2 sm:p-3 lg:p-3.5 border border-neutral-800/80 shadow-[inset_0_2px_12px_rgba(255,255,255,0.08),0_25px_70px_rgba(0,0,0,0.9)] transition-all duration-305 ease-out flex items-center justify-center z-30"
                id="phone-3d-chassis"
              >
                {/* Glossy reflection layer */}
                <div className="absolute inset-0 rounded-[44px] sm:rounded-[54px] overflow-hidden pointer-events-none z-20">
                  <div 
                    style={{
                      transform: (isMobile || isSandboxActive) ? "none" : `translate3d(${mousePos.x * 60}px, ${mousePos.y * 60}px, 0)`,
                    }}
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent transition-transform duration-305 ease-out" 
                  />
                </div>

                {/* Inner display bezel */}
                <div className="w-full h-full rounded-[36px] sm:rounded-[44px] bg-neutral-950 p-[4px] sm:p-[6px] overflow-hidden relative flex flex-col justify-between">
                  
                  {/* Top Dynamic Island Notch */}
                  <div className="absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-3.5 sm:h-5 bg-neutral-900 rounded-full z-40 flex items-center justify-between px-2 sm:px-3.5 pointer-events-none">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-neutral-950 border border-neutral-850" />
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-neutral-900" />
                  </div>

                  {/* screen display viewport */}
                  <div 
                    className={`w-full h-full rounded-[32px] sm:rounded-[38px] overflow-hidden overscroll-contain bg-black relative z-10 flex flex-col transition-all duration-300 ${!isSandboxActive ? "pointer-events-none select-none" : "pointer-events-auto"}`} 
                    id="phone-display"
                    onWheel={isSandboxActive ? (e) => e.stopPropagation() : undefined}
                    onTouchMove={isSandboxActive ? (e) => e.stopPropagation() : undefined}
                    onPointerMove={isSandboxActive ? (e) => e.stopPropagation() : undefined}
                  >
                    
                    {/* STATUS BAR */}
                    <div className="w-full h-[28px] sm:h-[40px] bg-black shrink-0 relative z-40 flex items-end pb-1 sm:pb-1.5 px-4.5 sm:px-5.5 text-[6.5px] sm:text-[8px] font-mono text-neutral-400 font-bold select-none pointer-events-none">
                      <span className="tracking-tight text-white font-black">9:41</span>
                      <div className="mx-auto" />
                      <div className="flex items-center gap-0.5 sm:gap-1 text-white/95">
                        <div className="flex items-end gap-[0.5px] sm:gap-[1px] h-1.5">
                          <div className="w-[0.8px] sm:w-[1.2px] h-0.5 bg-white/70" />
                          <div className="w-[0.8px] sm:w-[1.2px] h-1 bg-white/70" />
                          <div className="w-[0.8px] sm:w-[1.2px] h-1.4 bg-white" />
                        </div>
                        <span className="text-[5.5px] sm:text-[7px] font-sans font-black tracking-tighter">5G</span>
                        <Wifi className="w-1.8 h-1.8 sm:w-2.2 sm:h-2.2 text-white shrink-0" />
                        <div className="relative w-2.5 sm:w-3.5 h-1.5 sm:h-2 border border-white/40 rounded-3xs p-[0.5px] sm:p-[1px] flex items-center">
                          <div className="w-[85%] h-full bg-white rounded-4xs" />
                        </div>
                      </div>
                    </div>

                    {/* web browser url input crust */}
                    <div className="w-full bg-[#16161a] border-b border-white/5 px-2.5 sm:px-3.5 py-0.5 sm:py-1.5 flex items-center justify-between gap-1 sm:gap-1.5 shrink-0 z-30 select-none">
                      <span className="text-[6.5px] sm:text-[8px] text-green-500 shrink-0">🔒</span>
                      <div className="flex-1 bg-black/40 border border-white/5 rounded-md py-0.5 px-2 text-left overflow-hidden truncate">
                        <span className="font-mono text-[5.5px] sm:text-[7.5px] text-neutral-350 tracking-tight font-bold">
                          {getUrlString()}
                        </span>
                      </div>
                      <button 
                        onClick={handleReload} 
                        disabled={!isSandboxActive}
                        className={`p-0.5 shrink-0 transition-opacity ${!isSandboxActive ? "opacity-35 cursor-not-allowed" : "cursor-pointer"} ${isReloading ? "animate-spin text-emerald-400" : "text-neutral-400 hover:text-white"}`}
                      >
                        <RotateCw className="w-2 sm:w-2.5 h-2 sm:h-2.5" />
                      </button>
                    </div>

                    {/* StyleHub application iframe simulator */}
                    <div className="w-full flex-grow relative overflow-hidden bg-neutral-950">
                      <AnimatePresence mode="wait">
                        {isReloading ? (
                          <motion.div
                            key="skeleton"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="w-full h-full absolute inset-0"
                          >
                            <MiniAppSkeleton />
                          </motion.div>
                        ) : (
                          <motion.div
                            key={activeRoute.page}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.28, ease: "easeOut" }}
                            className="w-full h-full absolute inset-0"
                          >
                            <ShopWebsite 
                              navState={activeRoute} 
                              onNavigate={handleNavigate} 
                              menuOpen={menuOpen} 
                              setMenuOpen={setMenuOpen} 
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Bottom web browser controls */}
                    <div className="w-full h-8.5 sm:h-11 bg-[#121214] border-t border-white/5 flex items-center justify-around px-2.5 sm:px-3.5 shrink-0 relative z-40 select-none">
                      {/* Back button */}
                      <button 
                        disabled={!isSandboxActive || historyIdx === 0} 
                        onClick={handleGoBack}
                        className={`p-1 sm:p-1.5 transition-all text-neutral-400 rounded-lg hover:text-white hover:bg-white/5 ${(!isSandboxActive || historyIdx === 0) ? "opacity-35 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <ArrowLeft className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5" />
                      </button>

                      {/* Home button */}
                      <button 
                        disabled={!isSandboxActive}
                        onClick={handleGoHome}
                        className={`p-1 sm:p-1.5 transition-all text-[#ffffff]/95 rounded-lg hover:text-white hover:bg-white/5 ${!isSandboxActive ? "opacity-35 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <Home className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5" />
                      </button>

                      {/* Forward button */}
                      <button 
                        disabled={!isSandboxActive || historyIdx === historyStack.length - 1} 
                        onClick={handleGoForward}
                        className={`p-1 sm:p-1.5 transition-all text-neutral-400 rounded-lg hover:text-white hover:bg-white/5 ${(!isSandboxActive || historyIdx === historyStack.length - 1) ? "opacity-35 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <ArrowRight className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5" />
                      </button>

                      {/* Menu button toggler */}
                      <button 
                        disabled={!isSandboxActive}
                        onClick={() => setMenuOpen(!menuOpen)}
                        className={`p-1 sm:p-1.5 transition-all rounded-lg hover:bg-white/5 ${!isSandboxActive ? "opacity-35 cursor-not-allowed" : "cursor-pointer"} ${menuOpen ? "text-[#10b981] bg-white/5" : "text-neutral-400 hover:text-white"}`}
                      >
                        <Menu className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5" />
                      </button>
                    </div>

                    {/* Bottom dynamic indicator handle bar */}
                    <div className="w-full h-2.5 sm:h-3.5 bg-[#121214] flex items-center justify-center shrink-0">
                      <div className="w-12 sm:w-20 h-[2.5px] sm:h-[3.5px] bg-white/20 rounded-full" />
                    </div>

                  </div>
                </div>

                {/* Metal physical buttons hardware on chassis edges */}
                <div className="absolute top-24 sm:top-36 -left-[2px] w-[2px] sm:w-[3px] h-6 sm:h-10 bg-neutral-700 rounded-r-sm pointer-events-none" />
                <div className="absolute top-34 sm:top-48 -left-[2px] w-[2px] sm:w-[3px] h-8 sm:h-12 bg-neutral-700 rounded-r-sm pointer-events-none" />
                <div className="absolute top-44 sm:top-60 -left-[2px] w-[2px] sm:w-[3px] h-8 sm:h-12 bg-neutral-700 rounded-r-sm pointer-events-none" />
                <div className="absolute top-30 sm:top-42 -right-[2px] w-[2px] sm:w-[3px] h-10 sm:h-15 bg-neutral-700 rounded-l-sm pointer-events-none" />
              </div>
            </div>

            {/* Lock / Unlock Toggle row centered below the phone */}
            <div className="mt-8 flex flex-col items-center gap-3.5 relative z-30 select-none">
              <div className="inline-flex bg-neutral-900/90 border border-white/10 rounded-full p-1 shadow-2xl backdrop-blur-md">
                <button
                  type="button"
                  id="unlock-btn"
                  onClick={() => setIsSandboxActive(false)}
                  className={`px-6 py-2 rounded-full text-[10px] font-mono tracking-widest uppercase font-extrabold flex items-center gap-1.5 transition-all duration-300 ease-out cursor-pointer ${
                    !isSandboxActive 
                      ? "bg-white/10 border border-white/10 text-white font-black shadow-[0_4px_12px_rgba(0,0,0,0.5)]" 
                      : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  🔓 UNLOCK
                </button>
                <button
                  type="button"
                  id="lock-btn"
                  onClick={() => setIsSandboxActive(true)}
                  className={`px-6 py-2 rounded-full text-[10px] font-mono tracking-widest uppercase font-extrabold flex items-center gap-1.5 transition-all duration-300 ease-out cursor-pointer ${
                    isSandboxActive 
                      ? "bg-emerald-950/40 border border-emerald-500/25 text-emerald-400 font-black shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
                      : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  🔒 LOCK
                </button>
              </div>

              {/* Status Indicator Bar */}
              <div className="flex items-center gap-1.5 mt-1 select-none pointer-events-none transition-all duration-300">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] font-extrabold flex items-center gap-2">
                  {isSandboxActive ? (
                    <>
                      <span className="text-[#10b981] animate-pulse text-[12px] leading-none">●</span> Interactive Sandbox
                    </>
                  ) : (
                    <>
                      <span className="text-neutral-500 text-[12px] leading-none">●</span> Preview Mode
                    </>
                  )}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
