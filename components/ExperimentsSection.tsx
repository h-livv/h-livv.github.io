import { earlierExperiments } from '../data/projects';
import ProjectAnchor from './ProjectAnchor';
import SectionKicker from './SectionKicker';

export default function ExperimentsSection() {
  return (
    <section id="experiments" className="page-section experiments-section px-6 md:px-12 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <SectionKicker>Experiments</SectionKicker>
        <div className="experiment-index mt-6">
          {earlierExperiments.map((project) => (
            <ProjectAnchor
              key={project.slug}
              project={project}
              className={
                project.href
                  ? 'block group experiment-row'
                  : 'block'
              }
            >
              <article className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-8 py-6 md:py-8">
                <h3
                  className={`sm:col-span-4 text-sm text-primary ${
                    project.href ? 'group-hover:text-white transition-colors duration-200' : ''
                  }`}
                >
                  {project.title}
                </h3>
                <p className="sm:col-span-5 text-xs text-secondary leading-relaxed">
                  {project.description}
                </p>
                <p className="sm:col-span-3 sm:text-right font-mono text-[10px] uppercase tracking-[0.16em] text-secondary">
                  {project.date}
                  <span className="text-white/20 mx-1.5" aria-hidden="true">
                    ·
                  </span>
                  {project.status}
                  {project.href ? (
                    <span className="ml-2 text-primary/45 group-hover:text-primary" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                </p>
              </article>
            </ProjectAnchor>
          ))}
        </div>
      </div>
    </section>
  );
}
