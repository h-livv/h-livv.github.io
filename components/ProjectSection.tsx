import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import * as motion from "framer-motion/client";

export default function ProjectSection() {
  const researchProjects = projects.filter(p => p.category === 'Research Projects');
  const labsAndTools = projects.filter(p => p.category === 'Research Labs');

  return (
    <section id="projects" className="py-12 px-6 md:px-12 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-serif font-normal tracking-tight text-primary mb-8">Projects</h2>
          
          <div className="mb-12">
            <h3 className="text-xs font-mono text-secondary uppercase tracking-widest mb-4">Research Projects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {researchProjects.map(project => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono text-secondary uppercase tracking-widest mb-4">Research Labs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {labsAndTools.map(project => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
