import * as motion from "framer-motion/client";

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
      "Scientific Machine Learning",
    ],
  },
  {
    title: "Computational Systems",
    topics: [
      "Computer Architecture",
      "Parallel Computing",
      "Memory Systems",
    ],
  },
];

export default function ResearchInterests() {
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="rounded-xl border border-white/[0.05] bg-white/[0.01] p-6 md:p-8"
              >
                <p className="text-sm font-medium text-primary mb-5">
                  {interest.title}
                </p>
                <div className="flex flex-wrap gap-2">
                  {interest.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1.5 rounded-lg text-xs text-secondary border border-white/[0.06] bg-black/40"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
