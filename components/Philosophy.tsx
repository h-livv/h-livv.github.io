import * as motion from "framer-motion/client";

const principles = [
  {
    title: "First Principles",
    description: "Ground every system in mathematical and physical foundations.",
  },
  {
    title: "Computational Science",
    description: "Use computation as an instrument for understanding complex systems.",
  },
  {
    title: "Research Software",
    description: "Build tools that advance inquiry, not just demonstrations.",
  },
];

export default function Philosophy() {
  return (
    <section className="py-16 md:py-20 px-6 md:px-12 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <p className="text-xs font-mono text-secondary uppercase tracking-widest mb-8">
            Approach
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className="relative pl-4 border-l border-white/[0.08]"
              >
                <h3 className="text-sm font-medium text-primary mb-2">
                  {principle.title}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
