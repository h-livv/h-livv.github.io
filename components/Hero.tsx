"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 pb-12">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-secondary font-mono text-lg md:text-xl uppercase tracking-widest">Harliv Singh</span>
          </div>
          
          <h1 className="text-2xl md:text-4xl font-[700] leading-[1.2] tracking-tight text-primary mb-6">
            Exploring physics, mathematics,<br className="hidden md:block" />
            and computing through<br className="hidden md:block" />
            research software.
          </h1>
          
          <p className="text-sm md:text-base text-secondary max-w-prose leading-relaxed font-[400] mb-8">
            Mathematics student at BITS Goa building research software to study complex systems.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href="#projects"
              className="px-4 py-2 rounded-lg bg-white text-black text-xs font-medium hover:scale-[1.02] active:scale-100 transition-transform duration-200"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="px-4 py-2 rounded-lg bg-transparent text-primary text-xs font-medium border border-borders hover:bg-white/5 active:bg-white/10 transition-colors duration-200"
            >
              Get in touch
            </a>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div 
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto"
          >
            <a 
              href="#projects" 
              className="flex flex-col items-center gap-2 text-secondary hover:text-primary transition-colors text-[10px] font-mono uppercase tracking-widest"
            >
              <span>Explore my Projects</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
