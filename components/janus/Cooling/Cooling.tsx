'use client';

import { motion } from 'framer-motion';

export default function Cooling() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-12 py-24 select-none">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full">
        {/* Left text column */}
        <div className="md:col-span-7 flex flex-col items-start gap-6 text-left">
          <div className="font-mono text-xs uppercase tracking-widest text-blue-500 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            03. EMITTANCE COOLING
          </div>
          
          <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-white leading-tight">
            Preparing antimatter <span className="text-blue-500 font-medium">for confinement.</span>
          </h2>
          
          <p className="text-secondary text-sm md:text-base font-light leading-relaxed max-w-xl">
            Hot antiprotons cannot be trapped. Janus simulates stochastic and electron cooling techniques, tracking phase-space compression and emittance reduction over time. By modeling particle-beam interactions, the framework computes cooling rates and minimizes beam loss.
          </p>
        </div>

        {/* Right stats column */}
        <div className="md:col-span-5 border border-borders bg-black/40 backdrop-blur-sm p-6 rounded font-mono text-xs flex flex-col gap-6 text-left w-full">
          <div className="text-white border-b border-borders pb-3 uppercase tracking-wider font-semibold">
            COOLING MODEL
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="text-secondary">METHOD</span>
              <span className="text-white">Electron Cooling</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">PHASE SPACE</span>
              <span className="text-white">6D Tracking</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">BACKEND</span>
              <span className="text-white">Deterministic</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">STATUS</span>
              <span className="text-blue-500 font-medium">Planned</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">API</span>
              <span className="text-white">Under Design</span>
            </div>
          </div>

          <div className="border-t border-borders pt-4 text-[10px] text-secondary leading-normal">
            * Framework architecture prepared for future cooling implementations.
          </div>
        </div>
      </div>
    </section>
  );
}
