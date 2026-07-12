import * as motion from "framer-motion/client";

const items = [
  { prefix: "Currently Building", name: "Janus" },
  { prefix: "Developing", name: "Tempest" },
  { prefix: "Exploring", name: "Neural Operators" }
];

export default function CurrentFocus() {
  return (
    <section className="py-12 px-6 md:px-12 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
              className="p-5 rounded-xl bg-white/[0.01] border border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.02] transition-colors duration-200 group"
            >
              <p className="text-[10px] font-mono text-secondary mb-1.5 uppercase tracking-widest">{item.prefix}</p>
              <p className="text-sm font-medium text-primary group-hover:text-white transition-colors duration-200">
                {item.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
