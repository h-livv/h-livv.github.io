'use client';

import dynamic from 'next/dynamic';
import SectionLabel from '@/components/tempest/shared/SectionLabel';
import ImplementationCard from '@/components/tempest/shared/ImplementationCard';

const ConvergenceDemo = dynamic(
  () => import('@/components/tempest/Validation/ConvergenceDemo'),
  { ssr: false, loading: () => (
    <div className="w-full h-64 rounded border border-white/[0.06] bg-black animate-pulse" />
  )}
);

export default function Validation() {
  return (
    <section id="validation" className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <SectionLabel number="03" title="Scientific Validation" />

          <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-white leading-tight">
            Rigorous verification through{' '}
            <span className="text-purple-400">convergence analysis.</span>
          </h2>

          <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed max-w-sm">
            Validation is a defining feature of Tempest. Compare numerical
            approximations against analytical solutions and observe error
            decrease as the mesh refines.
          </p>

          <ImplementationCard title="Validation" accent="purple">
            <div className="flex flex-col gap-2 text-neutral-200 font-light">
              <span>Analytical Solutions</span>
              <span>Convergence Studies</span>
              <span>Error Analysis</span>
              <span>Energy Diagnostics</span>
            </div>
          </ImplementationCard>
        </div>

        <div className="lg:col-span-8">
          <ConvergenceDemo />
        </div>
      </div>
    </section>
  );
}
