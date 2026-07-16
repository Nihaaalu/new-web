import { motion } from "motion/react";
import { Compass, Zap, Smartphone, Server } from "lucide-react";

export default function About({ isStandalone = false }: { isStandalone?: boolean }) {
  const pillars = [
    {
      icon: <Compass className="w-5 h-5 text-neutral-100" />,
      title: "Modern Design",
      description: "Rooted in Swiss architecture principles. Generous negative space, pristine typographic pairings, and strict focus layouts.",
    },
    {
      icon: <Zap className="w-5 h-5 text-neutral-100" />,
      title: "Fast Performance",
      description: "Optimized static layouts compiling to pure responsive code with high performance metrics and fluid transitions.",
    },
    {
      icon: <Smartphone className="w-5 h-5 text-neutral-100" />,
      title: "Mobile Friendly",
      description: "Designed fluidly using CSS modules for perfect rendering across ultra-wide monitors, iPads, and handheld touch screens.",
    },
    {
      icon: <Server className="w-5 h-5 text-neutral-100" />,
      title: "Scalable Solutions",
      description: "Modular development foundations allowing easy scaling of portfolio layouts, pages, and interactive client engines.",
    },
  ];

  return (
    <section
      id="about"
      className={`relative w-full px-6 sm:px-12 bg-[#030303] overflow-hidden ${isStandalone ? "py-16 sm:py-24" : "py-24 sm:py-32"}`}
    >
      {/* Visual lighting depth overlays */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] bg-white/1 rounded-full blur-[100px] pointer-events-none select-none" />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-start relative z-10" id="about-us-container">
        {/* Left side static text content - clean and bold headings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 lg:w-5/12 text-left"
          id="about-lhs-pitch"
        >
          <span className="font-mono text-[9px] tracking-[0.35em] text-neutral-500 uppercase select-none">
            Corporate Statement
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-medium text-white tracking-tight leading-[1.1]" id="about-headline">
            About <br className="hidden sm:inline" /> HRBY Solutions
          </h2>
          <div className="w-12 h-[1px] bg-neutral-700 my-2" />
          <p className="text-sm sm:text-base text-neutral-300 font-sans tracking-wide leading-relaxed" id="about-pitch-text">
            We create modern websites that help businesses build trust, attract customers, and grow online.
          </p>
          <p className="text-xs text-neutral-500 font-sans leading-relaxed tracking-wide">
            Our approach discards overly crowded layout gimmicks to focus exclusively on visual rhythm, technical execution, and extreme digital accessibility.
          </p>
        </motion.div>

        {/* Right side pillars presentation - elegant grid structures */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-7/12 w-full" id="about-rhs-features">
          {pillars.map((p, index) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col justify-between bg-neutral-950/40 hover:bg-neutral-950/70 border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-400 select-none"
              id={`about-pillar-${index}`}
            >
              {/* Pillar top indicator */}
              <div className="flex items-center justify-between mb-4 w-full">
                <div className="w-10 h-10 rounded-xl bg-white/4 border border-white/5 flex items-center justify-center transition-colors group-hover:bg-white/8 group-hover:border-white/10">
                  {p.icon}
                </div>
                <span className="font-mono text-[9px] text-neutral-600 group-hover:text-neutral-400 transition-colors">
                  0{index + 1} // STRUCT
                </span>
              </div>

              {/* Pillar text */}
              <div className="text-left">
                <h4 className="text-sm font-sans font-medium text-white tracking-wide mb-1.5 group-hover:translate-x-0.5 transition-transform duration-300">
                  {p.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
