import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import * as motion from "framer-motion/client";

const infrastructureSlugs = ['janus', 'penrose', 'geantpy', 'sgl'];
const engineSlugs = ['tempest', 'nereid', 'atlas'];

export default function ProjectSection() {
  const infrastructure = infrastructureSlugs
    .map(slug => projects.find(p => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  const engines = engineSlugs
    .map(slug => projects.find(p => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <section id="projects" className="py-20 md:py-28 px-6 md:px-12 border-t border-white/[0.05] scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-serif font-normal leading-[1.2] tracking-normal text-primary mb-16">
            Systems
          </h2>
          
          <div className="mb-20">
            <h3 className="text-xs font-mono text-secondary uppercase tracking-widest mb-6">Research</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-5">
                {infrastructure.filter(p => p.slug === 'janus').map((project) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.35, delay: 0 }}
                  >
                    <ProjectCard project={project} featured={true} />
                  </motion.div>
                ))}
                {infrastructure.filter(p => p.slug === 'geantpy').map((project) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.35, delay: 0.16 }}
                  >
                    <ProjectCard project={project} compact={true} />
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-col gap-5">
                {infrastructure.filter(p => p.slug === 'penrose').map((project) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.35, delay: 0.08 }}
                  >
                    <ProjectCard project={project} featured={true} />
                  </motion.div>
                ))}
                {infrastructure.filter(p => p.slug === 'sgl').map((project) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.35, delay: 0.24 }}
                  >
                    <ProjectCard project={project} compact={true} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono text-secondary uppercase tracking-widest mb-6">Labs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {engines.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                >
                  <ProjectCard project={project} diminished={true} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
