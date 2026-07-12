'use client';

import SectionLabel from '@/components/tempest/shared/SectionLabel';
import FluxVisual from '@/components/tempest/NumericalMethods/FluxVisual';

export default function NumericalMethods() {
  return (
    <section id="methods" className="relative w-full flex flex-col justify-center px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <SectionLabel number="02" title="Numerical Methods" />

          <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-white leading-tight">
            Modular discretization from{' '}
            <span className="text-cyan-400">equation to solution.</span>
          </h2>

          <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed max-w-md">
            Tempest separates spatial flux computation from temporal integration.
            Developers define the domain, plug in difference schemes, and select
            integrator routines without rewriting solver logic.
          </p>

          <div className="font-mono text-[10px] text-neutral-400 flex flex-col gap-1 border-l border-white/10 pl-4">
            <span className="text-white/80">Equation</span>
            <span>↓ Spatial Discretization</span>
            <span>↓ Time Integration</span>
            <span>↓ Solution Update</span>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="border border-white/10 bg-black rounded relative overflow-hidden min-h-[400px]">
            <FluxVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
