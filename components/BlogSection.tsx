import * as motion from "framer-motion/client";

export default function BlogSection() {
  return (
    <section id="blog" className="py-12 px-6 md:px-12 border-t border-white/[0.05] scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-bold tracking-tight text-primary mb-4">Notes</h2>
          <p className="text-sm md:text-base text-primary mb-6 max-w-prose leading-relaxed font-[400]">
            Essays and notes on scientific computing, physical simulations, and mathematical abstractions.
          </p>
          <div className="inline-block px-4 py-2 rounded-lg bg-white/[0.02] border border-white/[0.05] text-secondary text-xs font-medium tracking-wide">
            Blog launching soon
          </div>
        </motion.div>
      </div>
    </section>
  );
}
