import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { TabType } from "../types";
import { navigate, tabToPath } from "../lib/router";

interface HeaderProps {
  activeTab: TabType;
}

export default function Header({ activeTab }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems: { id: TabType; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "gallery", label: "Gallery" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact Us" },
  ];

  const handleTabClick = (tabId: TabType) => {
    navigate(tabToPath(tabId));
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      id="main-app-header"
      className="fixed top-0 left-0 w-full z-40 bg-transparent py-4 px-4 sm:px-8 border-b border-transparent"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between border border-white/5 rounded-full px-6 sm:px-8 py-3 bg-neutral-950/45 backdrop-blur-xl">
        {/* Left Side: Brand Logo and Navigation Group */}
        <div className="flex items-center gap-6 sm:gap-8 md:gap-12" id="header-left-group">
          {/* Brand/Logo system */}
          <div
            className="cursor-pointer flex items-center shrink-0"
            onClick={() => handleTabClick("home")}
            id="header-brand-logo"
          >
            <Logo variant="dark-bg" size={46} />
          </div>

          {/* Desktop Sliding Pill Navigation (Vercel Style) */}
          <nav className="hidden md:flex items-center gap-1 relative" id="header-desktop-nav">
            {navigationItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative px-4 py-2 text-xs font-sans tracking-wide uppercase font-medium transition-colors duration-300 z-10 select-none ${
                    isActive ? "text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-white/5 rounded-full border border-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Call to action button */}
        <div className="hidden md:block" id="header-desktop-cta">
          <button
            onClick={() => handleTabClick("contact")}
            className="group flex items-center gap-1.5 px-4 py-2.5 text-[10px] sm:text-xs font-sans tracking-wider uppercase font-medium bg-white text-black rounded-full border border-white hover:bg-neutral-900 hover:text-white transition-all duration-300 select-none shadow-[0_4px_12px_rgba(255,255,255,0.08)]"
          >
            Start Project
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors border border-white/5 bg-neutral-950/20 rounded-full"
          aria-label="Toggle Menu"
          id="mobile-nav-toggle"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-drawer-portal"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-18 left-4 right-4 z-30 p-6 bg-neutral-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl md:hidden overflow-hidden flex flex-col gap-4 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {navigationItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-xs font-medium uppercase tracking-widest transition-all ${
                      isActive
                        ? "bg-white/5 text-white border-l-2 border-white pl-5"
                        : "text-neutral-400 hover:bg-neutral-900/50 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-white/5 my-2 pt-4">
              <button
                onClick={() => handleTabClick("contact")}
                className="w-full py-3 flex items-center justify-center gap-1 text-xs uppercase tracking-widest font-medium bg-neutral-100 hover:bg-white text-black rounded-xl transition-all"
              >
                Start Project <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
