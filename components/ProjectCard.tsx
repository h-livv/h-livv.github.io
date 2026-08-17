import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Project } from '../data/projects';

export default function ProjectCard({ project, featured = false, compact = false, diminished = false, stretchImage = false }: { project: Project, featured?: boolean, compact?: boolean, diminished?: boolean, stretchImage?: boolean }) {
  return (
    <Link href={project.href} className={`block group h-full ${diminished ? 'scale-[0.90] hover:scale-[0.93] transition-all duration-500' : ''}`}>
      <div className="flex flex-col bg-white/[0.01] border border-white/[0.05] rounded-xl overflow-hidden transition-all duration-200 hover:border-white/[0.15] hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgb(0,0,0,0.3)] h-full">
        {!compact && (
          <div className={`relative bg-black w-full overflow-hidden border-b border-white/[0.05] ${stretchImage ? 'aspect-[4/3] sm:aspect-[16/10] md:aspect-auto md:flex-1 md:min-h-0' : (featured ? 'aspect-[4/3] sm:aspect-[16/10]' : 'aspect-[4/3]')}`}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
            />
          </div>
        )}
        <div className={`p-4 shrink-0 ${featured ? 'md:p-6 md:pb-5' : 'pb-3.5'}`}>
          <div className="flex items-center justify-between mb-1.5">
            <h3 className={`font-semibold text-primary ${featured ? 'text-sm md:text-base' : 'text-sm'}`}>{project.title}</h3>
            <ArrowRight className="w-5 h-5 text-secondary opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary" />
          </div>
          <p className={`text-secondary leading-normal max-w-prose ${featured ? 'text-[11px] md:text-xs line-clamp-3' : 'text-[11px] line-clamp-2'}`}>{project.description}</p>
        </div>
      </div>
    </Link>
  );
}
