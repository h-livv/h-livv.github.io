import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import * as motion from "framer-motion/client";

export default function ProjectSection() {
  const researchProjects = projects.filter(p => p.category === 'Research Projects');
  const labsAndTools = projects.filter(p => p.category === 'Research Labs');

  return (
    <section id="projects" className="py-20 md:py-28 px-6 md:px-12 border-t border-white/[0.05] scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <p className="text-xs font-mono text-secondary uppercase tracking-widest mb-4">
            Evidence
          </p>
          <h2 className="text-3xl font-serif font-normal leading-[1.2] tracking-normal text-primary mb-4">Projects</h2>
          <p className="text-sm text-secondary max-w-prose leading-relaxed mb-16">
            Computational systems built to investigate physical and mathematical problems.
          </p>
          
          <div className="mb-20">
            <h3 className="text-xs font-mono text-secondary uppercase tracking-widest mb-6">Research Projects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {researchProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.05] bg-white/[0.005] p-6 md:p-8">
            <div className="mb-8">
              <h3 className="text-xs font-mono text-secondary uppercase tracking-widest mb-2">Research Labs</h3>
              <p className="text-xs text-secondary/70 max-w-prose">
                Reusable frameworks and platforms for scientific computation.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {labsAndTools.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
