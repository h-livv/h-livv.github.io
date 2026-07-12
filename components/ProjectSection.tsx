import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import * as motion from "framer-motion/client";

export default function ProjectSection() {
  const personalProjects = projects.filter(p => p.category === 'Personal');
  const collabProjects = projects.filter(p => p.category === 'Collaborative');

  return (
    <section id="projects" className="py-12 px-6 md:px-12 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-bold tracking-tight text-primary mb-8">Projects</h2>
          
          <div className="mb-12">
            <h3 className="text-xs font-mono text-secondary uppercase tracking-widest mb-4">Independent work</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {personalProjects.map(project => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono text-secondary uppercase tracking-widest mb-4">Collaborative research</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {collabProjects.map(project => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
