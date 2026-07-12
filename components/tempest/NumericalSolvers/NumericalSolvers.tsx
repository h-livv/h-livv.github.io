'use client';

import dynamic from 'next/dynamic';
import SectionLabel from '@/components/tempest/shared/SectionLabel';
import ImplementationCard from '@/components/tempest/shared/ImplementationCard';
import { EQUATIONS } from '@/lib/tempest/theme';

const AdvectionSimulator = dynamic(
  () => import('@/components/tempest/NumericalSolvers/AdvectionSimulator'),
  { ssr: false, loading: () => (
    <div className="w-full max-w-lg aspect-[4/3] rounded border border-white/[0.06] bg-black animate-pulse" />
  )}
);

export default function NumericalSolvers() {
  return (
    <section id="solvers" className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <SectionLabel number="01" title="Numerical Solvers" />

          <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-white leading-tight">
            Continuous physical models as{' '}
            <span className="text-cyan-400">solver components.</span>
          </h2>

          <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed max-w-md">
            Tempest implements PDE solvers for advective transport, diffusion,
            wave propagation, and geophysical flows. Interact with the domain to
            inject scalar fields and observe real-time advection.
          </p>

          <ImplementationCard title="Supported Equations">
            <div className="flex flex-col gap-2 text-neutral-200 font-light">
              {EQUATIONS.map((eq) => (
                <span key={eq}>{eq}</span>
              ))}
            </div>
          </ImplementationCard>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-4 items-center">
          <AdvectionSimulator />
          <p className="font-mono text-[10px] text-neutral-400 text-center max-w-md">
            Semi-Lagrangian advection on a structured grid. Drag to inject initial conditions.
          </p>
        </div>
      </div>
    </section>
  );
}
