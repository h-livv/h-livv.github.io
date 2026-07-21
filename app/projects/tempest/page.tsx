import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, FileText } from 'lucide-react';
import TempestGlobalBackground from '@/components/tempest/Background/TempestGlobalBackground';
import TempestPageWrapper from '@/components/tempest/TempestPageWrapper';

export const metadata: Metadata = {
  title: 'Tempest',
  description:
    'A computational physics laboratory for numerical methods, PDE simulation, and scientific machine learning.',
};

export default function TempestPage() {
  return (
    <main className="min-h-screen bg-black text-white relative font-sans overflow-hidden">
      <TempestGlobalBackground />

      <TempestPageWrapper>
        {/* Main Content Area */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-16 flex flex-col gap-16 pb-16">
          
          {/* 1. HERO SECTION */}
          <section className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-white">
                Tempest
              </h1>
              <p className="text-lg font-light text-neutral-400 leading-normal max-w-2xl">
                A computational physics laboratory for numerical methods, PDE simulation, and scientific machine learning.
              </p>
            </div>
          </section>

          {/* 2. MOTIVATION SECTION */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-t border-white/[0.04] pt-8">
            <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
              Motivation
            </div>
            <div className="md:col-span-8 flex flex-col gap-4 text-neutral-300 text-sm font-light leading-relaxed">
              <p>
                Numerical methods are fundamental to computational science, yet they are often encountered only as equations or black-box implementations. Tempest was created as a place to build these methods from first principles, validate them against known solutions, and explore how they behave across a range of physical systems.
              </p>
              <p>
                Rather than focusing solely on solving equations, Tempest emphasizes understanding numerical algorithms through implementation, experimentation, and comparison.
              </p>
            </div>
          </section>

          {/* 3. CURRENT FOCUS SECTION */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-t border-white/[0.04] pt-8">
            <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
              Current Focus
            </div>
            <div className="md:col-span-8 flex flex-col gap-4">
              {[
                {
                  title: 'Numerical Methods',
                  text: 'Implementing and validating finite difference methods, time integration schemes, stability analysis, and convergence studies.',
                },
                {
                  title: 'Physical Systems',
                  text: 'Exploring partial differential equations ranging from linear advection and diffusion to shallow water dynamics and geophysical fluid models.',
                },
                {
                  title: 'Scientific Machine Learning',
                  text: 'Investigating neural operators and physics-informed approaches alongside traditional numerical methods.',
                }
              ].map((card, idx) => (
                <div key={idx} className="border border-white/[0.04] p-5 rounded bg-neutral-950/40 backdrop-blur-sm flex flex-col gap-2 hover:border-white/[0.1] transition-colors">
                  <h3 className="text-white font-medium text-sm tracking-tight">{card.title}</h3>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 4. CLOSING SECTION */}
          <section className="border-t border-white/[0.04] pt-12 mt-4 text-center flex flex-col items-center gap-6">
            <p className="text-neutral-300 text-sm font-light leading-relaxed max-w-lg">
              Tempest is an evolving computational laboratory where numerical methods are implemented, tested, and understood through experimentation.
            </p>
            
            <div className="flex flex-wrap gap-4 font-mono text-xs justify-center">
              <Link
                href="/blog/tempest"
                className="px-6 py-3 border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 rounded transition-colors text-slate-200 hover:text-white flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Documentation</span>
              </Link>
              <Link
                href="https://github.com/h-livv/tempest"
                target="_blank"
                className="px-6 py-3 border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 rounded transition-colors text-slate-200 hover:text-white flex items-center gap-2"
              >
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>GitHub</span>
              </Link>
            </div>
          </section>

        </div>
        
        {/* Simple Footer preserving backward/forward project navigation */}
        <footer className="w-full border-t border-white/[0.04] py-8 px-6 md:px-12 mt-4 bg-black relative z-10">
          <div className="max-w-6xl mx-auto flex items-center justify-between font-mono text-xs text-neutral-500 uppercase tracking-wider">
            <span className="text-neutral-300">Harliv Singh</span>
            <Link
              href="/#projects"
              className="hover:text-white transition-colors"
            >
              Back to Portfolio
            </Link>
          </div>
        </footer>
        
      </TempestPageWrapper>
    </main>
  );
}
