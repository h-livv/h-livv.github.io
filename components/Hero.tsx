"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 pb-16">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full"
        >
          <p className="text-sm font-mono uppercase tracking-[0.2em] text-secondary mb-8">
            Harliv Singh
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal leading-[1.05] tracking-normal text-primary max-w-4xl">
            Physics, Mathematics,
            <br />
            and Computation
          </h1>

          <p className="mt-8 text-sm md:text-base text-secondary max-w-2xl leading-relaxed">
            A mathematics student exploring interesting systems from first principles.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <a
              href="#work"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary hover:text-white transition-colors duration-200"
            >
              Work <span aria-hidden="true">→</span>
            </a>
            <a
              href="#contact"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-secondary hover:text-primary transition-colors duration-200"
            >
              Get in touch <span aria-hidden="true">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
