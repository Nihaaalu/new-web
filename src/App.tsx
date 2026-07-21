/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
        
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Loader from "./components/Loader";
import Header from "./components/Header";
import HomeStory from "./components/HomeStory";
import Gallery from "./components/Gallery";
import Clients from "./components/Clients";
import About from "./components/About";
import Contact from "./components/Contact";
import { useCurrentTab, navigate } from "./lib/router";

export default function App() {
  const activeTab = useCurrentTab();
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll height to show scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#030303] text-white selection:bg-neutral-800 selection:text-white antialiased overflow-x-hidden flex flex-col">
      {/* 1. Fullscreen Preloader System */}
      <Loader onLoadComplete={() => setIsLoading(false)} />

      {/* Renders other major assets content once preloaded */}
      {!isLoading && (
        <div className="flex flex-col min-h-screen animate-[fadeIn_0.8s_ease-out_forwards]" id="app-site-content">
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>

          {/* 2. Fixed Glassmorphic Navigation Header */}
          <Header activeTab={activeTab} />

          {/* 3. True Page Routing Viewport */}
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {activeTab === "home" && <HomeStory />}
                {activeTab === "gallery" && (
                  <div className="pt-24 min-h-screen bg-[#080808]" id="page-gallery">
                    <Gallery isStandalone />
                    <Clients />
                  </div>
                )}
                {activeTab === "about" && (
                  <div className="pt-24 min-h-screen bg-[#030303]" id="page-about">
                    <About isStandalone />
                  </div>
                )}
                {activeTab === "contact" && (
                  <div className="pt-24 min-h-screen bg-[#080808]" id="page-contact">
                    <Contact isStandalone />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* 4. Luxury Custom Agency Footer */}
          <footer className="w-full bg-[#030303] border-t border-white/5 py-16 px-6 sm:px-12 relative z-10 text-left select-none" id="site-footer">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
              {/* Left Brand Details */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-lg tracking-[0.25em] font-medium uppercase text-white">
                    HRBY SOLUTIONS
                  </span>
                </div>
                <p className="text-xs text-neutral-500 font-sans max-w-xs leading-relaxed">
                  Crafting exceptionally clean, performance-optimized, and conversion-focused websites for modern enterprises worldwide.
                </p>
              </div>

              {/* Center Quick Jumps */}
              <div className="flex flex-wrap gap-8 sm:gap-12" id="footer-links-grid">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-600">EXPLORE</span>
                  <button onClick={() => navigate("/")} className="text-left text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer">Home</button>
                  <button onClick={() => navigate("/gallery")} className="text-left text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer">Gallery</button>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-600">COMPANY</span>
                  <button onClick={() => navigate("/about")} className="text-left text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer">About Us</button>
                  <button onClick={() => navigate("/contact")} className="text-left text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer">Contact</button>
                </div>
              </div>

              {/* Right Copyright metadata */}
              <div className="flex flex-col md:items-end gap-2 text-neutral-500 text-xs font-mono font-light">
                <span>© {new Date().getFullYear()} HRBY SOLUTIONS. ALL RIGHTS RESERVED.</span>
                <span className="text-[10px] text-neutral-600">DESIGNED BY HEURISTICS STUDIO // ISO 9001</span>
              </div>
            </div>
          </footer>

          {/* 5. Floating Interactive Scroll-To-Top button */}
          {showScrollTop && (
            <button
              onClick={handleScrollToTop}
              id="scroll-to-top-button"
              className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-neutral-950/80 border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white backdrop-blur-md transition-all duration-300 shadow-2xl animate-bounce"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
