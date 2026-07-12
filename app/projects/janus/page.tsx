import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { projects } from '../../../data/projects';

export default function JanusPage() {
  const project = projects.find(p => p.slug === 'janus');
  
  if (!project) return null;

  return (
    <main className="min-h-screen py-24 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-secondary hover:text-primary mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <h1 className="text-4xl md:text-5xl font-medium text-primary mb-6">{project.title}</h1>
        <div className="flex items-center gap-4 mb-12 text-sm text-secondary font-mono uppercase tracking-wider">
          <span>{project.role}</span>
          <span>&bull;</span>
          <span>{project.category}</span>
        </div>
        <div className="prose prose-invert prose-p:text-secondary prose-p:font-light prose-p:leading-relaxed max-w-none">
          <p>{project.description}</p>
          <p>This page serves as the dedicated landing page for {project.title}. Detailed case study and technical documentation will be added here soon.</p>
        </div>
      </div>
    </main>
  );
}
