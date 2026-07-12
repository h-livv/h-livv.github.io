'use client';

import { motion } from 'framer-motion';

export default function Trapping() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-12 py-24 select-none">
      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left config column */}
        <div className="md:col-span-5 border border-borders bg-black/40 backdrop-blur-sm p-6 rounded font-mono text-xs flex flex-col gap-6 order-2 md:order-1">
          <div className="text-white border-b border-borders pb-3 uppercase tracking-wider font-semibold">
            CONFINEMENT MODEL
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="text-secondary">TRAP</span>
              <span className="text-white">Penning</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">FIELDS</span>
              <span className="text-white">Electromagnetic</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">PLASMA</span>
              <span className="text-white">Non-neutral</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">STATUS</span>
              <span className="text-violet-500 font-medium">Planned</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">SIMULATION</span>
              <span className="text-white">In Development</span>
            </div>
          </div>

          <div className="border-t border-borders pt-4 text-[10px] text-secondary leading-normal">
            * Planned support for long-term charged-particle confinement studies.
          </div>
        </div>

        {/* Right text column */}
        <div className="md:col-span-7 flex flex-col items-start gap-6 order-1 md:order-2">
          <div className="font-mono text-xs uppercase tracking-widest text-violet-500 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            04. ELECTROMAGNETIC CONFINEMENT
          </div>
          
          <h2 className="text-4xl md:text-6xl font-normal tracking-tight text-white leading-tight">
            Confinement with <span className="text-violet-500 font-medium">electromagnetic fields.</span>
          </h2>
          
          <p className="text-secondary text-base md:text-lg font-light leading-relaxed">
            Antimatter is held using a combination of strong uniform magnetic fields and multi-electrode electrostatic potentials. Janus models the plasma dynamics, cyclotron resonance heating, and quantum cooling inside Penning-Malmberg traps, enabling stable and long-term containment.
          </p>
        </div>
      </div>
    </section>
  );
}
