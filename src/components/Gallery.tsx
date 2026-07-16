import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Layers, ArrowRight } from "lucide-react";
import { Project } from "../types";

export default function Gallery({ isStandalone = false }: { isStandalone?: boolean }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultProjects: Project[] = [
    {
      title: "Hotel Website",
      description: "Modern hotel booking website.",
      image: "/gallery/hotel.jpg",
      link: "#"
    }
  ];

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => {
        if (!res.ok) throw new Error("Fallback triggered");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(defaultProjects);
        }
        setLoading(false);
      })
      .catch(() => {
        setProjects(defaultProjects);
        setLoading(false);
      });
  }, []);

  return (
    <section
      id="gallery"
      className={`relative w-full py-16 sm:py-24 px-6 sm:px-12 bg-[#080808] overflow-hidden font-sans ${isStandalone ? "" : "border-t border-white/5"}`}
    >
      {/* Background radial illumination */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-white/1 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col gap-14 relative z-10" id="gallery-container">
        {/* Gallery Title Area */}
        <div className="flex flex-col gap-3 text-left max-w-xl" id="gallery-header-meta">
          <span className="font-mono text-[9px] tracking-[0.35em] text-neutral-500 uppercase select-none">
            Scaleable Projects List
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-tight leading-tight" id="gallery-title">
            Case Studies
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light mt-1">
            Explore our curated dynamic index. As new entries are added to projects.json, the grid automatically adapts.
          </p>
        </div>

        {/* Gallery Scroll Viewport - compact premium carousel/scroll pane */}
        <div 
          className="w-full overflow-x-auto pb-6 scrollbar-thin flex gap-8 snap-x snap-mandatory" 
          id="gallery-scroller"
          style={{ scrollBehavior: "smooth" }}
        >
          {loading ? (
            <div className="flex gap-8 w-full" id="gallery-loading-placeholder">
              <div className="w-[340px] h-[300px] bg-white/2 rounded-2xl animate-pulse border border-white/5" />
            </div>
          ) : (
            <div className="flex gap-8" id="gallery-inner-scroller-layout">
              <AnimatePresence mode="popLayout">
                {projects.map((project, index) => (
                  <ProjectCard key={index} project={project} index={index} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Project Card (Compact, Minimalist, Luxury Layout specified)
function ProjectCard({ project, index }: { project: Project; index: number; key?: any }) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col bg-[#0d0d0d] border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] w-[320px] sm:w-[350px] shrink-0 snap-center"
      id={`project-card-${index}`}
    >
      {/* Exquisite corner accent frame details */}
      <div className="absolute top-0 left-0 w-4 h-[1px] bg-neutral-800 group-hover:bg-neutral-600 transition-colors" />
      <div className="absolute top-0 left-0 w-[1px] h-4 bg-neutral-800 group-hover:bg-neutral-600 transition-colors" />

      {/* Image preview with elegant contrast / grayscale transition */}
      <div className="relative w-full h-[160px] rounded-xl overflow-hidden bg-[#050505] border border-white/5 mb-5">
        {!imageError ? (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[0.16, 1, 0.3, 1]"
            id={`project-img-${index}`}
          />
        ) : (
          /* Procedural high-aesthetic skeletal grid fallback when images fetch */
          <div
            className="w-full h-full relative p-4 flex flex-col justify-between overflow-hidden select-none bg-[#090909]"
            id={`procedural-img-${index}`}
          >
            {/* Ambient inner soft glowing light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-white/2 rounded-full blur-2xl pointer-events-none" />

            {/* Custom pattern mapping wireframes */}
            <svg className="absolute inset-0 w-full h-full stroke-white/5 stroke-[0.5] [mask-image:radial-gradient(100%_100%_at_top,white,transparent)]">
              <defs>
                <pattern id={`pattern-${index}`} width="12" height="12" patternUnits="userSpaceOnUse">
                  <path d="M 12 0 L 0 0 0 12" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#pattern-${index})`} />
            </svg>

            <div className="flex items-center justify-between z-10 w-full">
              <span className="font-mono text-[7px] tracking-widest text-neutral-600 uppercase">
                GRID ENGINE v1.1
              </span>
              <Layers className="w-3.5 h-3.5 text-neutral-700" />
            </div>

            <div className="text-center z-10">
              <span className="font-sans font-medium text-[20px] tracking-tight text-white/5 uppercase select-none font-bold">
                {project.title}
              </span>
            </div>

            <div className="flex items-end justify-between z-10 w-full">
              <span className="font-mono text-[7px] text-neutral-500 border border-white/5 px-2 py-0.5 rounded-full bg-black/60">
                ACTIVE_STENCIL
              </span>
              <span className="font-mono text-[7px] text-neutral-600">60 FPS</span>
            </div>
          </div>
        )}
      </div>

      {/* Structured contents matching card guidelines precisely */}
      <div className="text-left flex flex-col gap-1.5" id={`project-text-node-${index}`}>
        <h3 className="text-base font-sans font-medium text-white tracking-wide" id={`project-title-${index}`}>
          {project.title}
        </h3>
        <p className="text-xs text-neutral-400 font-sans tracking-wide leading-relaxed font-light min-h-[40px]">
          {project.description}
        </p>

        {/* Visually stunning matching text format requested: ## [ Visit Website ] */}
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between" id={`project-cta-block-${index}`}>
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono font-medium tracking-wider text-neutral-400 hover:text-white transition-colors"
            id={`project-link-${index}`}
          >
            ## [ Visit Website ]
          </a>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </motion.div>
  );
}
