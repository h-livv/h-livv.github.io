import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import * as motion from "framer-motion/client";

export default function ProjectSection() {
  const getProject = (slug: string) => projects.find(p => p.slug === slug)!;

  const tempest = getProject('tempest');
  const janus = getProject('janus');
  const geantpy = getProject('geantpy');
  
  const earlierSlugs = ['penrose', 'nereid', 'atlas'];
  const earlierWork = earlierSlugs.map(getProject);

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
          
          <div className="mb-20">
            <h3 className="text-xs font-mono text-secondary uppercase tracking-widest mb-6">Current</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left Column: Janus + GeantPy */}
              <div className="flex flex-col gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, delay: 0 }}
                >
                  <ProjectCard project={janus} featured={true} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, delay: 0.08 }}
                >
                  <ProjectCard project={geantpy} compact={true} />
                </motion.div>
              </div>

              {/* Right Column: Tempest */}
              <div className="flex flex-col">
                <motion.div
                  className="h-full"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, delay: 0.16 }}
                >
                  <ProjectCard project={tempest} featured={true} stretchImage={true} />
                </motion.div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono text-secondary uppercase tracking-widest mb-6">Earlier Work</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {earlierWork.map((project, index) => (
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
