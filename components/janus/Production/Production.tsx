'use client';

import { motion } from 'framer-motion';

export default function Production() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-12 py-24 select-none">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full">
        {/* Left text column */}
        <div className="md:col-span-7 flex flex-col items-start gap-6 text-left">
          <div className="font-mono text-xs uppercase tracking-widest text-orange-500 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            01. PRODUCTION ZONE
          </div>
          
          <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-white leading-tight">
            Billions of collisions.<br />
            <span className="text-orange-500 font-medium">A handful of antiprotons.</span>
          </h2>
          
          <p className="text-secondary text-sm md:text-base font-light leading-relaxed max-w-xl">
            Janus simulates high-energy proton beams striking metal targets. By calculating intranuclear cascades and particle yields, the platform identifies the optimal target geometries and beam profiles to maximize production efficiency under immense thermal loads.
          </p>
        </div>

        {/* Right stats column */}
        <div className="md:col-span-5 border border-borders bg-black/40 backdrop-blur-sm p-6 rounded font-mono text-xs flex flex-col gap-6 text-left w-full">
          <div className="text-white border-b border-borders pb-3 uppercase tracking-wider font-semibold">
            COLLISION CONFIG
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="text-secondary">BEAM</span>
              <span className="text-white">26 GeV Proton</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">TARGET</span>
              <span className="text-white">Iridium (Ir-77)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">ENGINE</span>
              <span className="text-white">Geant4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">PHYSICS_LIST</span>
              <span className="text-white">FTFP_BERT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">STATUS</span>
              <span className="text-orange-500 font-medium">Implemented</span>
            </div>
          </div>

          <div className="border-t border-borders pt-4 text-[10px] text-secondary leading-normal">
            * Configurable beam energy, target material and simulation parameters.
          </div>
        </div>
      </div>
    </section>
  );
}
