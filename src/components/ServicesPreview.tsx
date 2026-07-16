import React from "react";
import { motion } from "motion/react";
import { Hotel, Utensils, Briefcase, UserCheck, Layers, ArrowUpRight } from "lucide-react";
import { navigate } from "../lib/router";

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ServicesPreview() {
  const services: ServiceItem[] = [
    {
      icon: <Hotel className="w-5 h-5 text-neutral-300" />,
      title: "Hotel Websites",
      description: "Direct-booking systems and virtual concierge spaces optimized for luxury hospitality channels."
    },
    {
      icon: <Utensils className="w-5 h-5 text-neutral-300" />,
      title: "Restaurant Websites",
      description: "Seamless table booking systems, visual seasonal menus, and direct local orders routing."
    },
    {
      icon: <Briefcase className="w-5 h-5 text-neutral-300" />,
      title: "Business Websites",
      description: "Clean, high-performance information systems highlighting enterprise capabilities and authority."
    },
    {
      icon: <UserCheck className="w-5 h-5 text-neutral-300" />,
      title: "Portfolio Websites",
      description: "Clipped structural grids designed, demonstrating high-end architecture projects for private clients."
    },
    {
      icon: <Layers className="w-5 h-5 text-neutral-300" />,
      title: "Custom Solutions",
      description: "Custom web applications, responsive databases, and clean systems built from scratch."
    }
  ];

  return (
    <section
      id="services-preview"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-[#080808] border-t border-white/5 overflow-hidden font-sans select-none"
    >
      {/* Background soft ambient radial light */}
      <div className="absolute top-[30%] left-[-10%] w-[450px] h-[450px] bg-white/1 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col gap-16 relative z-10" id="services-preview-container">
        
        {/* Section Header Text Metadata */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6" id="services-preview-header">
          <div className="flex flex-col gap-3 text-left max-w-xl">
            <span className="font-mono text-[9px] tracking-[0.3em] text-neutral-500 uppercase">
              Section // 05 // Service Offerings
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-tight leading-tight">
              Tailored Websites For <span className="font-semibold">Every Channel</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              We focus purely on highly responsive codes, clean layouts, and functional booking solutions that represent your business professionally.
            </p>
          </div>

          <button
            onClick={() => navigate("/gallery")}
            className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-400 hover:text-white transition-colors group cursor-pointer w-fit"
            id="view-all-projects-services-cta"
          >
            [ View Creative Showcase ]
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </button>
        </div>

        {/* Dynamic Service Bento-esque Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services-preview-grid">
          {services.map((svc, index) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col justify-between bg-[#0e0e0e] border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] cursor-pointer"
              id={`service-card-${index}`}
            >
              {/* Subtle visual structural frames */}
              <div className="absolute top-0 left-0 w-3 h-[1px] bg-neutral-800 group-hover:bg-neutral-600 transition-colors" />
              <div className="absolute top-0 left-0 w-[1px] h-3 bg-neutral-800 group-hover:bg-neutral-600 transition-colors" />

              <div className="flex flex-col gap-6">
                {/* Custom icon box */}
                <div className="p-2 w-fit rounded-lg bg-white/4 border border-white/5 text-neutral-400 group-hover:text-white transition-colors">
                  {svc.icon}
                </div>

                {/* Symmetrical Text layout */}
                <div className="flex flex-col gap-2 text-left" id={`services-desc-box-${index}`}>
                  <h3 className="text-base font-sans font-medium text-white tracking-wide">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans tracking-wide leading-relaxed font-light">
                    {svc.description}
                  </p>
                </div>
              </div>

              {/* Floating micro-arrow indicators */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between" id={`services-footer-block-${index}`}>
                <span className="font-mono text-[8px] tracking-wide text-neutral-600 group-hover:text-neutral-400 transition-colors">
                  [ ACTIVE_SERVICE ]
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
