import * as motion from "framer-motion/client";

const pillars = [
  { label: "Mathematics", description: "Foundations" },
  { label: "Computing", description: "Methods" },
  { label: "Scientific Research", description: "Discovery" },
];

const domains = [
  "Scientific Computing",
  "Computational Physics",
  "Artificial Intelligence",
  "Computer Systems",
  "Mathematics",
];

export default function ResearchIdentity() {
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
          <p className="text-xs font-mono text-secondary uppercase tracking-widest mb-4">
            Research Direction
          </p>
          <h2 className="text-3xl font-serif font-normal leading-[1.2] tracking-normal text-primary mb-16 max-w-2xl">
            Building computational systems for scientific research
          </h2>

          {/* Connected pillars */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-stretch gap-0">
              {pillars.map((pillar, index) => (
                <div key={pillar.label} className="flex flex-col md:flex-row items-center flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex-1 w-full p-6 md:p-8 rounded-xl bg-white/[0.01] border border-white/[0.05] hover:border-white/[0.1] transition-colors duration-300"
                  >
                    <p className="text-[10px] font-mono text-accent/70 uppercase tracking-widest mb-2">
                      {pillar.description}
                    </p>
                    <p className="text-base md:text-lg font-medium text-primary">
                      {pillar.label}
                    </p>
                  </motion.div>
                  {index < pillars.length - 1 && (
                    <div className="flex items-center justify-center py-3 md:py-0 md:px-3 shrink-0">
                      <div className="hidden md:block w-6 h-px bg-white/[0.15]" />
                      <div className="md:hidden w-px h-6 bg-white/[0.15]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Research domains */}
          <div>
            <p className="text-xs font-mono text-secondary uppercase tracking-widest mb-6">
              Domains
            </p>
            <div className="flex flex-wrap gap-3">
              {domains.map((domain, index) => (
                <motion.span
                  key={domain}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="px-4 py-2 rounded-lg text-xs font-mono text-secondary border border-white/[0.06] bg-white/[0.01] hover:border-white/[0.12] hover:text-primary transition-colors duration-200"
                >
                  {domain}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
