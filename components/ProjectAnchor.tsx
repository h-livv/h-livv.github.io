import type { ReactNode } from 'react';
import Link from 'next/link';
import type { Project } from '../data/projects';

export function isExternalProject(project: Project) {
  return Boolean(project.external || project.href?.startsWith('http'));
}

export default function ProjectAnchor({
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

