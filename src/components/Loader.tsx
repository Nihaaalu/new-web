import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo";

export default function Loader({ onLoadComplete }: { onLoadComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Dynamic progress bar loading simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            if (onLoadComplete) {
              onLoadComplete();
            }
          }, 600);
          return 100;
        }
        // Slightly random progression speed for realistic loading
        const increment = Math.floor(Math.random() * 12) + 6;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="global-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303]"
        >
          {/* Subtle background glow */}
          <div className="absolute w-[350px] h-[350px] bg-white/2 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col items-center gap-6 max-w-xs z-10 text-center">
            {/* Spinning/pulsating branding */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Logo variant="loading-dark" size={60} />
            </motion.div>

            {/* Micro progress indicator */}
            <div className="w-40 h-[1.5px] bg-neutral-900 rounded-full overflow-hidden mt-2 relative">
              <motion.div
                className="h-full bg-neutral-100 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>

            {/* Custom load state metadata */}
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-neutral-500 select-none">
              Initializing Core Canvas • {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
