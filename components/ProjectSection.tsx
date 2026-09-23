import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as motion from 'framer-motion/client';
import {
  currentProject,
  earlierExperiments,
  physicsSimulations,
  selectedWork,
  type Project,
} from '../data/projects';
import SectionKicker from './SectionKicker';

function isExternalProject(project: Project) {
  return Boolean(project.external || project.href?.startsWith('http'));
}

function ProjectAnchor({
  project,
  className,
  children,
}: {
  project: Project;
  className?: string;
  children: ReactNode;
}) {
  if (!project.href) {
    return <div className={className}>{children}</div>;
  }

  if (isExternalProject(project)) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={project.href} className={className}>
      {children}
    </Link>
  );
}

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
          <div className="relative aspect-[16/10] bg-black overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 30vw, 100vw"
            />
          </div>
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

function SelectedEntry({ project }: { project: Project }) {
  const imageOnRight = project.imageAlign === 'right';

  if (project.image) {
    return (
      <ProjectAnchor
        project={project}
        className="block group focus-visible:outline-none focus-visible:bg-white/[0.02]"
      >
        <article className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 py-12 md:py-16 border-t border-white/[0.06]">
          <div
            className={`relative aspect-[16/10] bg-black md:col-span-7 overflow-hidden ${
              imageOnRight ? 'md:order-2' : ''
            }`}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 58vw, 100vw"
            />
          </div>
          <div className="md:col-span-5 flex flex-col justify-center">
            <h3 className="font-serif text-3xl md:text-[2.5rem] font-normal tracking-normal text-primary leading-tight">
              {project.title}
            </h3>
            <div className="mt-4">
              <StatusLine date={project.date} status={project.status} />
            </div>
            <p className="mt-5 text-sm text-secondary leading-relaxed max-w-md">
              {project.description}
            </p>
            <DestinationLabel project={project} />
          </div>
        </article>
      </ProjectAnchor>
    );
  }

  return (
    <ProjectAnchor
      project={project}
      className="block group focus-visible:outline-none focus-visible:bg-white/[0.02]"
    >
      <article className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-12 md:py-16 border-t border-white/[0.06]">
        <div className="md:col-span-4">
          <h3 className="font-serif text-3xl md:text-[2.25rem] font-normal tracking-normal text-primary leading-tight">
            {project.title}
          </h3>
          <div className="mt-4">
            <StatusLine date={project.date} status={project.status} />
          </div>
        </div>
        <div className="md:col-span-8 flex flex-col justify-center">
          <p className="text-sm md:text-[15px] text-secondary leading-relaxed max-w-xl">
            {project.description}
          </p>
          <DestinationLabel project={project} />
        </div>
      </article>
    </ProjectAnchor>
  );
}

export default function ProjectSection() {
  return (
    <section
      id="work"
      className="py-24 md:py-32 px-6 md:px-12 border-t border-white/[0.05] scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <SectionKicker tone="current">Current</SectionKicker>
          <div className="mt-8 md:mt-10 border-l border-accent/50 pl-6 md:pl-10">
            <h3 className="font-serif text-5xl md:text-6xl lg:text-7xl font-normal tracking-normal text-primary leading-[1.05]">
              {currentProject.title}
            </h3>
            {currentProject.subtitle && (
              <p className="mt-5 md:mt-6 font-serif text-lg md:text-2xl font-normal text-secondary leading-snug max-w-3xl">
                {currentProject.subtitle}
              </p>
            )}
            <p className="mt-6 md:mt-8 text-sm md:text-base text-secondary leading-relaxed max-w-2xl whitespace-pre-wrap">
              {currentProject.description}
            </p>
            <div className="mt-10 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-x-8 font-mono text-[11px] uppercase tracking-[0.18em] text-secondary">
              <span>{currentProject.date}</span>
              <span>{currentProject.affiliation}</span>
              <span className="text-primary">{currentProject.status}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mt-28 md:mt-36"
        >
          <SectionKicker>Selected Work</SectionKicker>
          <div className="mt-8">
            {selectedWork.map((project) => (
              <SelectedEntry key={project.slug} project={project} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mt-24 md:mt-32"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <SectionKicker>Computational Physics &amp; Simulation</SectionKicker>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-secondary">
              Archived — 2026
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {physicsSimulations.map((project) => (
              <ArchivedTile key={project.slug} project={project} />
            ))}
          </div>

          <h3 className="mt-16 md:mt-20 text-[12px] font-mono uppercase tracking-[0.18em] text-secondary">
            Earlier Experiments
          </h3>
          <div className="mt-6 border-b border-white/[0.06]">
            {earlierExperiments.map((project) => (
              <ProjectAnchor
                key={project.slug}
                project={project}
                className={
                  project.href
                    ? 'block group focus-visible:outline-none focus-visible:bg-white/[0.02]'
                    : 'block'
                }
              >
                <article className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-8 py-5 md:py-6 border-t border-white/[0.06]">
                  <h4
                    className={`sm:col-span-4 text-sm text-primary ${
                      project.href ? 'group-hover:text-white transition-colors duration-200' : ''
                    }`}
                  >
                    {project.title}
                  </h4>
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
        </motion.div>
      </div>
    </section>
  );
}
