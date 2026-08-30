import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import * as motion from "framer-motion/client";

export default function ProjectSection() {
  const getProject = (slug: string) => projects.find(p => p.slug === slug)!;

  const tempest = getProject('tempest');
  const janus = getProject('janus');
  const explorationSlugs = ['janus', 'tempest', 'penrose'];
  const explorations = explorationSlugs.map(getProject);

  return (
    <section id="work" className="py-20 md:py-28 px-6 md:px-12 border-t border-white/[0.05] scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h2 className="text-xs font-mono text-secondary uppercase tracking-widest mb-16">
            Selected work
          </h2>

          <div className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {explorations.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                  >
                    <ProjectCard project={project} featured={true} />
                  </motion.div>
                ))}
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-xs font-mono text-secondary uppercase tracking-widest mb-6">Explorations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Emergent Misalignment",
                  desc: "Reproduction of emergent misalignment experiments.",
                  link: "https://github.com/h-livv/emergent-misalignment"
                },
                {
                  title: "Transformer from NumPy",
                  desc: "Minimal transformer implemented from scratch using NumPy.",
                  link: "https://github.com/h-livv/transformer-numpy"
                },
                {
                  title: "Deconvolution",
                  desc: "Exploration of numerical deconvolution techniques.",
                  link: "https://github.com/h-livv/deconvolution"
                },
                {
                  title: "Exoplanet Detection",
                  desc: "Exploration of transit-based exoplanet detection.",
                  link: "https://github.com/h-livv/exoplanet-detection"
                }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="flex items-center justify-between p-4 bg-white/[0.01] border border-white/[0.05] rounded-lg transition-all duration-200 hover:border-white/[0.15] hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgb(0,0,0,0.2)]">
                    <div className="flex flex-col gap-1 pr-4">
                      <span className="text-sm font-semibold text-primary group-hover:text-white transition-colors duration-200">
                        {item.title}
                      </span>
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

          <div className="mt-16">
            <h3 className="text-xs font-mono text-secondary uppercase tracking-widest mb-6">Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "GeantPy",
                  desc: "Python interface for automating and orchestrating Geant4 simulation workflows.",
                  link: "/projects/geantpy"
                },
                {
                  title: "CiteHop",
                  desc: "Finds citations and reviews literature claims locally.",
                  link: "https://github.com/h-livv/citehop"
                },
                {
                  title: "Machina",
                  desc: "Personal Linux control panel.",
                  link: "https://github.com/h-livv/machina"
                },
                {
                  title: "LLM Bench",
                  desc: "Personal local LLM benchmarking.",
                  link: "https://github.com/h-livv/llm-bench"
                }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  target={item.link.startsWith('/') ? undefined : "_blank"}
                  rel={item.link.startsWith('/') ? undefined : "noopener noreferrer"}
                  className="block group"
                >
                  <div className="flex items-center justify-between p-4 bg-white/[0.01] border border-white/[0.05] rounded-lg transition-all duration-200 hover:border-white/[0.15] hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgb(0,0,0,0.2)]">
                    <div className="flex flex-col gap-1 pr-4">
                      <span className="text-sm font-semibold text-primary group-hover:text-white transition-colors duration-200">
                        {item.title}
                      </span>
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
