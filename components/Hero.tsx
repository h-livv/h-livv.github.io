"use client";

import { motion } from "framer-motion";

export default function Hero() {

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 pb-12">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-secondary font-mono text-lg md:text-xl uppercase tracking-widest">Harliv Singh</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-serif font-normal leading-[1.2] tracking-normal text-primary mb-6">
            Physics, Mathematics,<br />and Computation
          </h1>
          
          <p className="text-sm md:text-base text-secondary max-w-prose leading-relaxed font-[400] mb-8">
            Mathematics student at BITS Goa investigating complex systems.
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

    </section>
  );
}
