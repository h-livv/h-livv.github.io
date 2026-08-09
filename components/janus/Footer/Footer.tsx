'use client';

import { BookOpen, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Footer() {
  const steps = [
    { num: '01', name: 'Production', desc: 'Beam-target collisions' },
    { num: '02', name: 'Transport', desc: 'Magnetic steering' },
    { num: '03', name: 'Cooling', desc: 'Stochastic phase compression' },
    { num: '04', name: 'Trapping', desc: 'Electromagnetic confinement' },
    { num: '05', name: 'Optimization', desc: 'Physics-driven tuning' },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between px-6 py-12 md:px-12 md:py-20 select-none bg-black border-t border-borders">
      {/* Top section: Pipeline overview diagram */}
      <div className="max-w-6xl mx-auto w-full my-auto flex flex-col items-center justify-center gap-16 py-12">
        <div className="text-center flex flex-col items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#5EEAD4]">
            End-To-End Architecture
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
            The Complete Antimatter Pipeline
          </h2>
        </div>

        {/* Modular pipeline flow visualizer */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full max-w-5xl">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col gap-4 p-5 border border-borders bg-neutral-950/50 rounded hover:border-neutral-700 transition-colors group">
              <div className="font-mono text-[10px] text-secondary flex justify-between items-center">
                <span>STAGE_{step.num}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-borders group-hover:bg-[#5EEAD4] transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-white text-lg font-medium tracking-tight">
                  {step.name}
                </h3>
                <p className="text-secondary text-xs font-light leading-normal">
                  {step.desc}
                </p>
              </div>
              
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 bg-black p-0.5 border border-borders rounded-full text-secondary">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col gap-6 items-center">
          <h3 className="text-white text-lg font-light tracking-tight">
            Learn more about Janus
          </h3>
          <Link
            href="https://github.com/h-livv/Janus"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-borders hover:border-white/50 hover:bg-neutral-900/60 text-white font-medium text-base rounded transition-all duration-300 flex items-center gap-3 bg-black/50 w-full sm:w-auto justify-center"
          >
            <GithubIcon className="w-5 h-5 text-white" />
            <span>View on GitHub</span>
          </Link>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link
              href="/projects/janus/docs"
              className="px-6 py-3 border border-borders hover:border-[#5EEAD4]/40 hover:bg-neutral-900/50 text-white font-medium text-sm rounded transition-all duration-300 flex items-center gap-2 bg-black/40"
            >
              <BookOpen className="w-4 h-4 text-[#5EEAD4]" />
              <span>Documentation</span>
            </Link>
            <Link
              href="/projects/janus/docs/physics"
              className="px-6 py-3 border border-borders hover:border-orange-500/40 hover:bg-neutral-900/50 text-white font-medium text-sm rounded transition-all duration-300 flex items-center gap-2 bg-black/40"
            >
              <FileText className="w-4 h-4 text-orange-500" />
              <span>Physics Overview</span>
            </Link>
            <Link
              href="/projects/janus/docs/validation"
              className="px-6 py-3 border border-borders hover:border-blue-500/40 hover:bg-neutral-900/50 text-white font-medium text-sm rounded transition-all duration-300 flex items-center gap-2 bg-black/40"
            >
              <FileText className="w-4 h-4 text-blue-500" />
              <span>Validation Reports</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer: System credits and copyright */}
      <div className="max-w-6xl mx-auto w-full border-t border-borders pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-secondary">
        <div>
          © 2026 JANUS COMPUTATIONAL LABS. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-6">
          <Link href="/#projects" className="hover:text-white transition-colors">
            BACK TO HOME PORTFOLIO
          </Link>
        </div>
      </div>
    </section>
  );
}
