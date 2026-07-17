'use client';

import { ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const PIPELINE = [
  { name: 'Numerical Methods', desc: 'Spatial and temporal discretization' },
  { name: 'Simulation', desc: 'PDE solver execution' },
  { name: 'Validation', desc: 'Analytical convergence studies' },
  { name: 'Scientific ML', desc: 'Fourier Neural Operators' },
  { name: 'Visualization', desc: 'Field exports and contours' },
  { name: 'Research', desc: 'Reproducible experiments' },
];

export default function Footer() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between px-6 py-12 md:px-12 md:py-20 select-none border-t border-white/[0.06] bg-black">
      <div className="max-w-6xl mx-auto w-full my-auto flex flex-col items-center justify-center gap-16 py-12">
        <div className="text-center flex flex-col items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300">
            Unified Framework
          </span>
          <h2 className="text-3xl md:text-5xl font-extralight text-white tracking-tight max-w-2xl">
            A cohesive ecosystem for computational mathematics
          </h2>
          <p className="text-neutral-300 text-sm md:text-base font-light max-w-lg">
            Tempest unifies numerical methods, simulation, validation, and
            operator learning within one research platform.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-5xl">
          {PIPELINE.map((step, idx) => (
            <div
              key={step.name}
              className="relative flex flex-col gap-3 p-4 border border-white/10 bg-black rounded hover:border-cyan-500/30 transition-colors group"
            >
              <div className="font-mono text-[9px] text-neutral-400 flex justify-between items-center">
                <span>0{idx + 1}</span>
                <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-cyan-400 transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-white text-sm font-light tracking-tight">
                  {step.name}
                </h3>
                <p className="text-neutral-400 text-[10px] font-light leading-normal">
                  {step.desc}
                </p>
              </div>

              {idx < PIPELINE.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-white/20">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/blog/tempest"
            className="inline-flex items-center gap-2.5 px-6 py-2.5 border border-white/20 text-white font-mono font-medium text-xs rounded hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all uppercase tracking-widest"
          >
            <FileText className="w-4 h-4" />
            <span>Notes</span>
          </Link>
          <Link
            href="https://github.com/h-livv/tempest"
            target="_blank"
            className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-white text-black font-mono font-medium text-xs rounded hover:bg-neutral-200 transition-all uppercase tracking-widest"
          >
            <GithubIcon className="w-4 h-4" />
            <span>View on GitHub</span>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-400">
        <span className="text-neutral-300">Harliv Singh</span>
        <Link href="/#projects" className="hover:text-white transition-colors">
          Back to Portfolio
        </Link>
      </div>
    </section>
  );
}
