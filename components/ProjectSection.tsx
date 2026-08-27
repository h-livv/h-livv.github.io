import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import * as motion from "framer-motion/client";

export default function ProjectSection() {
  const getProject = (slug: string) => projects.find(p => p.slug === slug)!;

  const tempest = getProject('tempest');
  const janus = getProject('janus');
  const geantpy = getProject('geantpy');
  const explorationSlugs = ['janus', 'tempest', 'penrose', 'nereid', 'atlas'];
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
          <h2 className="text-3xl font-serif font-normal leading-[1.2] tracking-normal text-primary mb-16">
            Work
          </h2>
          



          <div>
              <h3 className="text-xs font-mono text-secondary uppercase tracking-widest mb-6">Explorations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {explorations.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                  >
                    {project.slug === 'janus' ? (
                      <div className="flex flex-col gap-2">
                        <ProjectCard project={project} featured={true} />
                        <ProjectCard project={geantpy} compact={true} />
                      </div>
                    ) : (
                      <ProjectCard project={project} diminished={true} />
                    )}
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
