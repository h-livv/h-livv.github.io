import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import * as motion from "framer-motion/client";

export default function ProjectSection() {
  const getProject = (slug: string) => projects.find(p => p.slug === slug)!;

  const simulations = ['janus', 'tempest', 'penrose'].map(getProject);

  return (
    <section id="work" className="py-20 md:py-28 px-6 md:px-12 border-t border-white/[0.05] scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* CURRENT SECTION */}
          <div className="mb-16">
            <h2 className="text-sm font-mono text-secondary uppercase tracking-widest mb-6">Current</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col bg-white/[0.01] border border-white/[0.05] rounded-xl p-6 md:p-8 transition-all duration-200 hover:border-white/[0.15] hover:shadow-[0_4px_20px_rgb(0,0,0,0.3)]">
                <h3 className="font-semibold text-primary text-base md:text-lg mb-1">QC4HEP</h3>
                <span className="block text-xs font-mono text-secondary/70 uppercase tracking-widest mb-3">Aug 2026 - Present</span>
                <p className="text-secondary leading-relaxed text-sm md:text-base">
                  Leading an undergraduate research project investigating quantum simulation of QFTs and lattice gauge theories, and evaluating quantum methods for HEP workflows under near-term hardware constraints.
                </p>
                <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/[0.05]">
                  <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">Scoping phase</span>
                  <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">qBITS @ BITS Goa</span>
                </div>
                </div>
              </div>
            </div>

          {/* PAST SECTION */}
          <div className="mb-16">
            <h2 className="text-sm font-mono text-secondary uppercase tracking-widest mb-6">Past</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                {simulations.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className="h-full"
                  >
                    <ProjectCard project={project} featured={true} />
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, delay: 3 * 0.08 }}
                  className="h-full"
                >
                  <a href="https://github.com/h-livv/transformer-numpy" target="_blank" rel="noopener noreferrer" className="block group h-full">
                    <div className="flex flex-col bg-white/[0.01] border border-white/[0.05] rounded-xl overflow-hidden transition-all duration-200 hover:border-white/[0.15] hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgb(0,0,0,0.3)] h-full text-center">
                      <div className="flex flex-col items-center justify-center w-full aspect-[4/3] sm:aspect-[16/10] p-6 border-b border-white/[0.05] bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors">
                         <h3 className="font-bold text-primary text-2xl sm:text-3xl tracking-tight leading-none mb-2">Transformer</h3>
                         <h4 className="font-medium text-secondary text-lg sm:text-xl">from NumPy</h4>
                      </div>
                      <div className="p-4 md:p-6 md:pb-5 flex-1 flex flex-col items-center justify-center">
                        <span className="block text-[10px] font-mono text-secondary/70 uppercase tracking-widest mb-2">Aug 2026</span>
                        <p className="text-secondary leading-normal text-[11px] md:text-xs max-w-[250px] mx-auto">
                          Full transformer built from scratch in NumPy, including the tokenizer, self-attention, backpropagation, and cross-entropy, with no autograd.
                        </p>
                      </div>
                    </div>
                  </a>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, delay: 4 * 0.08 }}
                  className="h-full"
                >
                  <a href="https://github.com/h-livv/emergent-misalignment" target="_blank" rel="noopener noreferrer" className="block group h-full">
                    <div className="flex flex-col bg-white/[0.01] border border-white/[0.05] rounded-xl overflow-hidden transition-all duration-200 hover:border-white/[0.15] hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgb(0,0,0,0.3)] h-full text-center">
                      <div className="flex flex-col items-center justify-center w-full aspect-[4/3] sm:aspect-[16/10] p-6 border-b border-white/[0.05] bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors">
                         <h3 className="font-bold text-primary text-xl sm:text-2xl tracking-tight leading-none mb-2">Emergent</h3>
                         <h4 className="font-medium text-secondary text-base sm:text-lg">Misalignment</h4>
                      </div>
                      <div className="p-4 md:p-6 md:pb-5 flex-1 flex flex-col items-center justify-center">
                        <span className="block text-[10px] font-mono text-secondary/70 uppercase tracking-widest mb-2">Last touched: Aug 2026</span>
                        <p className="text-secondary leading-normal text-[11px] md:text-xs max-w-[250px] mx-auto">
                          Reproduces emergent misalignment on smaller models; investigating the mechanism via interpretability.
                        </p>
                      </div>
                    </div>
                  </a>
                </motion.div>
            </div>
          </div>

          {/* TOOLS SECTION */}
          <div>
            <h2 className="text-sm font-mono text-secondary uppercase tracking-widest mb-6">Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "GeantPy",
                  desc: "Automates Geant4 workflows via macro generation, outputting NPZ/tensor datasets for downstream use.",
                  link: "/projects/geantpy",
                  date: "Last touched: Jul 2026"
                },
                {
                  title: "CiteHop",
                  desc: "Given a paper, retrieves its citation network and runs a local-LLM review against a claims/gaps schema.",
                  link: "https://github.com/h-livv/citehop"
                },
                {
                  title: "Machina",
                  desc: "Personal local Linux dashboard: telemetry, service control, model setup, and device health in one place.",
                  link: "https://github.com/h-livv/machina"
                },
                {
                  title: "LLM Bench",
                  desc: "Benchmarks local LLMs against personal hardware constraints to find the best-fit model.",
                  link: "https://github.com/h-livv/llm-bench"
                }
              ].map((item: any, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  target={item.link.startsWith('/') ? undefined : "_blank"}
                  rel={item.link.startsWith('/') ? undefined : "noopener noreferrer"}
                  className="block group h-full"
                >
                  <div className="flex items-center justify-between p-4 h-full bg-white/[0.01] border border-white/[0.05] rounded-lg transition-all duration-200 hover:border-white/[0.15] hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgb(0,0,0,0.2)]">
                    <div className="flex flex-col gap-1 pr-4">
                      <span className="text-sm font-semibold text-primary group-hover:text-white transition-colors duration-200">
                        {item.title}
                      </span>
                      {item.date && (
                        <span className="block text-[10px] font-mono text-secondary/70 uppercase tracking-widest mt-0.5 mb-0.5">{item.date}</span>
                      )}
                      <span className="text-[11px] text-secondary leading-normal">
                        {item.desc}
                      </span>
                    </div>
                    <span className="text-secondary opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary shrink-0">
                      →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
