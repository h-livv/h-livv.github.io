"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const interests = [
  {
    title: "Scientific Computing",
    topics: ["Numerical Methods", "PDEs", "Optimization", "HPC"],
  },
  {
    title: "Computational Physics",
    topics: [
      "High-Energy Physics",
      "General Relativity",
      "Fluid Dynamics",
      "Quantum Simulation",
    ],
  },
  {
    title: "Intelligent Systems",
    topics: [
      "Mechanistic Interpretability",
      "AI Systems",
      "Scientific ML",
    ],
  },
  {
    title: "Computational Systems",
    topics: [
      "GPU Architecture",
      "Parallel Computing",
      "Computer Architecture",
      "Memory Systems",
    ],
  },
];

export default function ResearchInterests() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = interests[activeIndex];

  return (
    <section
      id="research"
      className="py-20 md:py-28 px-6 md:px-12 border-t border-white/[0.05] scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-serif font-normal leading-[1.2] tracking-normal text-primary mb-10">
            Research Interests
          </h2>

          <div className="flex flex-wrap gap-2 mb-8">
            {interests.map((interest, index) => (
              <button
                key={interest.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest border transition-all duration-200 ${
                  activeIndex === index
                    ? "bg-white/[0.04] border-white/[0.15] text-primary"
                    : "bg-white/[0.01] border-white/[0.06] text-secondary hover:border-white/[0.12] hover:text-primary"
                }`}
              >
                {interest.title}
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-white/[0.05] bg-white/[0.01] p-6 md:p-8 min-h-[120px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <p className="text-sm font-medium text-primary mb-5">
                  {active.title}
                </p>
                <div className="flex flex-wrap gap-2">
                  {active.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1.5 rounded-lg text-xs text-secondary border border-white/[0.06] bg-black/40 hover:border-white/[0.12] hover:text-primary transition-colors duration-200"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
