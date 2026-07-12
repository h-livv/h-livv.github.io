'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between px-6 py-12 md:px-12 md:py-20 overflow-hidden select-none">
      {/* Top Navigation / Status bar */}
      <div className="flex justify-between items-center w-full z-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-amber-500 uppercase tracking-widest px-2 py-0.5 border border-amber-500/20 bg-amber-500/5 rounded">
            SYS: STABLE
          </span>
          <span className="font-mono text-xs text-secondary tracking-tight hidden sm:inline">
            // COMP-PHYSICS.PLATFORM
          </span>
        </div>
        <div className="font-mono text-xs text-secondary text-right">
          LATENCY: 1.42ms | FPS: 60
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <div className="max-w-4xl my-auto z-10 flex flex-col items-start pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <div className="font-mono text-xs uppercase tracking-widest text-[#5EEAD4] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5EEAD4] animate-ping" />
            00. SYSTEM INITIATION
          </div>
          
          <h1 className="text-5xl md:text-8xl font-normal tracking-tight leading-none text-white max-w-3xl">
            Engineering the <span className="text-[#5EEAD4] font-medium">antimatter</span> pipeline.
          </h1>
          
          <p className="text-secondary text-lg md:text-xl font-light leading-relaxed max-w-2xl mt-4">
            A computational framework for modeling antimatter production, transport, storage, and optimization.
          </p>
        </motion.div>

      </div>

      {/* Footer and side information */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end w-full z-10 gap-6 mt-8">
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col gap-2 cursor-pointer"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#5EEAD4] uppercase">
            Scroll to Accelerate
          </span>
          <div className="flex items-center gap-2">
            <span className="w-8 h-[1px] bg-[#5EEAD4]/50 relative overflow-hidden block">
              <span className="absolute inset-0 bg-[#5EEAD4] w-1/2 animate-shimmer" />
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#5EEAD4] animate-bounce-horizontal" />
          </div>
        </motion.div>

        {/* Physics parameters readout */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2 border-l border-borders pl-6 font-mono text-[10px] text-secondary">
          <div>
            <div className="text-white">ENERGY: 26.0 GeV</div>
            <div>PBAR TARGET COMPRESSED</div>
          </div>
          <div>
            <div className="text-white">LUMINOSITY: 1.2E32/CM²S</div>
            <div>ACCELERATOR PHASING: OK</div>
          </div>
          <div className="col-span-2 md:col-span-1 hidden md:block">
            <div className="text-white">VACUUM: 1.2E-11 MBAR</div>
            <div>BEAM POSITION INJECTED</div>
          </div>
        </div>
      </div>
      
      {/* CSS overrides for animated components */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer {
          animation: shimmer 1.8s infinite linear;
        }
        @keyframes bounce-horizontal {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
        .animate-bounce-horizontal {
          animation: bounce-horizontal 1.2s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}
