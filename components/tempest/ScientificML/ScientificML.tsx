'use client';

import dynamic from 'next/dynamic';
import SectionLabel from '@/components/tempest/shared/SectionLabel';
import ImplementationCard from '@/components/tempest/shared/ImplementationCard';

const FourierOperatorVisual = dynamic(
  () => import('@/components/tempest/ScientificML/FourierOperatorVisual'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-[16/9] max-w-3xl rounded border border-white/10 bg-black animate-pulse" />
    ),
  }
);

export default function ScientificML() {
  return (
    <section
      id="sciml"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-12 py-24"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-10 items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <SectionLabel number="04" title="Scientific Machine Learning" />

            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-white leading-tight">
              Operator learning in{' '}
              <span className="text-purple-400">frequency space.</span>
            </h2>

            <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed max-w-sm">
              Fourier Neural Operators map continuous fields through spectral
              decomposition, learn transformations in frequency domain, and
              reconstruct predictions on arbitrary grids.
            </p>

            <ImplementationCard title="ML Backend" accent="purple">
              <div className="flex flex-col gap-2 text-neutral-200 font-light">
                <span>Fourier Neural Operators</span>
                <span>Operator Learning</span>
              </div>
            </ImplementationCard>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-5 items-center w-full">
            <FourierOperatorVisual />
          </div>
        </div>

        <div className="font-mono text-sm text-neutral-200 flex items-center gap-6 flex-wrap justify-center">
          <span className="text-cyan-400 font-medium">Continuous Field</span>
          <span className="text-white/30">→</span>
          <span className="text-purple-400 font-medium">Frequency Operator</span>
          <span className="text-white/30">→</span>
          <span className="text-cyan-300 font-medium">Predicted Field</span>
        </div>
      </div>
    </section>
  );
}
