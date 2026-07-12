'use client';

import { motion } from 'framer-motion';

export default function Transport() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-12 py-24 select-none">
      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left Stats Column */}
        <div className="md:col-span-5 border border-borders bg-black/40 backdrop-blur-sm p-6 rounded font-mono text-xs flex flex-col gap-6 order-2 md:order-1">
          <div className="text-white border-b border-borders pb-3 uppercase tracking-wider font-semibold">
            MAGNETIC LATTICE
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="text-secondary">INTEGRATOR</span>
              <span className="text-white">Boris</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">ELEMENTS</span>
              <span className="text-white">Dipole, Quadrupole</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">LATTICE</span>
              <span className="text-white">FODO</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">VALIDATION</span>
              <span className="text-[#5EEAD4] font-medium">Analytical ✓</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">STATUS</span>
              <span className="text-white">Implemented</span>
            </div>
          </div>

          <div className="border-t border-borders pt-4 text-[10px] text-secondary leading-normal">
            * Transport validated against analytical charged-particle motion.
          </div>
        </div>

        {/* Right Text Column */}
        <div className="md:col-span-7 flex flex-col items-start gap-6 order-1 md:order-2">
          <div className="font-mono text-xs uppercase tracking-widest text-[#5EEAD4] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5EEAD4] animate-pulse" />
            02. TRANSPORT BEAMLINE
          </div>
          
          <h2 className="text-4xl md:text-6xl font-normal tracking-tight text-white leading-tight">
            Deterministic particle transport <span className="text-[#5EEAD4] font-medium">through magnetic fields.</span>
          </h2>
          
          <p className="text-secondary text-base md:text-lg font-light leading-relaxed">
            The Janus transport engine performs relativistic tracking of charged particles through complex magnetic lattices. It simulates chromatic aberration, space charge effects, and aperture losses, ensuring optimal transmission from production targets to confinement chambers.
          </p>
        </div>
      </div>
    </section>
  );
}
