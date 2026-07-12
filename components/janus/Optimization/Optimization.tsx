'use client';

import { motion } from 'framer-motion';

export default function Optimization() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-12 py-24 select-none">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full">
        {/* Left text column */}
        <div className="md:col-span-7 flex flex-col items-start gap-6 text-left">
          <div className="font-mono text-xs uppercase tracking-widest text-amber-500 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            05. SYSTEM OPTIMIZATION
          </div>
          
          <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-white leading-tight">
            Physics-driven optimization <span className="text-amber-500 font-medium">of the complete pipeline.</span>
          </h2>
          
          <p className="text-secondary text-sm md:text-base font-light leading-relaxed max-w-xl">
            Janus couples physical simulations with differentiable optimization. By taking gradients directly through solver steps, the platform performs multi-objective sweeps to optimize magnet placement, cooling schedules, and electrode potentials simultaneously.
          </p>
        </div>

        {/* Right stats column */}
        <div className="md:col-span-5 border border-borders bg-black/40 backdrop-blur-sm p-6 rounded font-mono text-xs flex flex-col gap-6 text-left w-full">
          <div className="text-white border-b border-borders pb-3 uppercase tracking-wider font-semibold">
            OPTIMIZATION ENGINE
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="text-secondary">METHOD</span>
              <span className="text-white">Gradient-Based</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">SOLVER</span>
              <span className="text-white">L-BFGS-B</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">OBJECTIVE</span>
              <span className="text-white">User Defined</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">BACKEND</span>
              <span className="text-white">SciPy</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">STATUS</span>
              <span className="text-amber-500 font-medium">Experimental</span>
            </div>
          </div>

          <div className="border-t border-borders pt-4 text-[10px] text-secondary leading-normal">
            * Optimization infrastructure designed for future differentiable physics workflows.
          </div>
        </div>
      </div>
    </section>
  );
}
