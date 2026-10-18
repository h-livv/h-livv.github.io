import {
  currentProject,
  physicsSimulations,
  selectedWork,
  type Project,
} from '../data/projects';
import SectionKicker from './SectionKicker';
import DitheredImage from './DitheredImage';
import AsciiDivider from './AsciiDivider';
import ProjectAnchor, { isExternalProject } from './ProjectAnchor';
import ResearchPlate from './ResearchPlate';

function StatusLine({ date, status }: { date?: string; status?: string }) {
  if (!date && !status) return null;

  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-secondary">
      {date}
      {date && status ? (
        <span className="text-white/20 mx-1.5" aria-hidden="true">
          ·
        </span>
      ) : null}
      {status}
    </p>
  );
}

function DestinationLabel({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  return (
    <span
      className={`${compact ? 'mt-auto pt-4' : 'mt-6'} inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-primary/75 group-hover:text-primary transition-colors duration-200`}
    >
      {isExternalProject(project) ? 'Repository' : 'Project'}
      <span aria-hidden="true">→</span>
    </span>
  );
}

function ArchivedTile({ project }: { project: Project }) {
  return (
    <ProjectAnchor
      project={project}
      className="block group h-full focus-visible:outline-none focus-visible:bg-white/[0.02]"
    >
      <article className="flex h-full flex-col">
        {project.image ? (
          <DitheredImage
            src={project.image}
            alt={project.title}
            sizes="(min-width: 768px) 30vw, 100vw"
            className="aspect-[16/10] bg-black"
          />
        ) : null}
        <h3 className="mt-4 font-serif text-xl md:text-2xl font-normal tracking-normal text-primary leading-tight">
          {project.title}
        </h3>
        <div className="mt-2">
          <StatusLine date={project.date} status={project.status} />
        </div>
        <p className="mt-3 text-xs text-secondary leading-relaxed">
          {project.description}
        </p>
        <DestinationLabel project={project} compact />
      </article>
    </ProjectAnchor>
  );
}

function SelectedEntry({ project, index }: { project: Project; index: number }) {
  const kinds = ['fourier', 'curve', 'attention'] as const;
  return (
    <ProjectAnchor project={project} className={`research-card research-card-${index} group`}>
      <article className="h-full flex flex-col">
        <div className="research-card-image">
          <ResearchPlate kind={kinds[index % kinds.length]} />
        </div>
        <div className="research-card-copy flex flex-col flex-1">
          <StatusLine status={project.status} />
          <h3 className="font-serif text-3xl md:text-4xl leading-[1.08] mt-5 mb-5">{project.title}</h3>
          <p className="text-sm text-secondary">{project.description}</p>
          <div className="mt-auto pt-8 flex justify-between items-center">
            <span className="font-mono text-[10px] text-secondary">{project.date}</span>
            <DestinationLabel project={project} compact />
          </div>
        </div>
      </article>
    </ProjectAnchor>
  );
}

export default function ProjectSection() {
  return (
    <section
      id="work"
      className="work-section px-6 md:px-12 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        <AsciiDivider />
        <div>
          <div className="current-study">
            <div className="current-visual">
              <ResearchPlate kind="lattice" />
              <div className="study-equation" aria-hidden="true">|ψ(t)⟩ = e<sup>−iHt</sup>|ψ₀⟩</div>
            </div>
            <div className="current-copy">
              <SectionKicker tone="current">Current research</SectionKicker>
              <h3 className="font-serif text-6xl md:text-8xl font-normal tracking-tight mt-8 mb-5">{currentProject.title}</h3>
              <p className="font-serif text-xl md:text-2xl text-primary/80 leading-snug">{currentProject.subtitle}</p>
              <p className="mt-6 text-sm text-secondary whitespace-pre-wrap">{currentProject.description}</p>
              <div className="study-meta">
                <span className="study-status"><span className="status-dot" />{currentProject.status}</span>
                <div className="study-details">
                  <span>{currentProject.affiliation}</span>
                  <span>{currentProject.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="work-group">
          <div className="section-heading">
            <div><SectionKicker>Research & code</SectionKicker><h2 className="font-serif text-5xl md:text-7xl mt-5">Selected work.</h2></div>
          </div>
          <div className="research-grid mt-12">
            {selectedWork.map((project, index) => (
              <SelectedEntry key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>

        <div className="work-group">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <SectionKicker>Computational Physics &amp; Simulation</SectionKicker>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {physicsSimulations.map((project) => (
              <ArchivedTile key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
