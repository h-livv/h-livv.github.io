import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Project } from '../data/projects';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={project.href} className="block group">
      <div className="bg-white/[0.01] border border-white/[0.05] rounded-xl overflow-hidden transition-all duration-200 hover:border-white/[0.15] hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgb(0,0,0,0.3)]">
        <div className="relative aspect-[4/3] bg-black w-full overflow-hidden border-b border-white/[0.05]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="p-4 pb-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-sm font-semibold text-primary">{project.title}</h3>
            <ArrowRight className="w-5 h-5 text-secondary opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary" />
          </div>
          <p className="text-secondary text-[11px] leading-normal max-w-prose line-clamp-2">{project.description}</p>
        </div>
      </div>
    </Link>
  );
}
