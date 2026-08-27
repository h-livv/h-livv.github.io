import React from 'react';
import type { Metadata } from 'next';
import CollaborativeProjectLayout from '../../../components/projects/CollaborativeProjectLayout';
import { JanusBackground } from '../../../components/projects/ProjectBackgrounds';

export const metadata: Metadata = {
  title: 'JANUS',
  description: 'A computational framework for studying high-energy particle transport and production.',
};

export default function JanusPage() {
  const summary = [
    'Janus couples Geant4 particle-interaction simulation with Xsuite beam transport to study how physical parameters affect downstream particle behavior.',
    'The case study explored 26 GeV proton bombardment of a high-Z target, with antiproton production as the primary observable.'
  ];

  const explored = [
    'Particle interaction: Geant4 models high-energy proton–target interactions and particle production.',
    'Beam transport: Xsuite models relativistic particle transport through accelerator lattices and magnetic elements.'
  ];

  const technologies = ['Geant4', 'Xsuite', 'Python', 'C++', 'Numerical Simulation'];

  return (
    <CollaborativeProjectLayout
      title="JANUS"
      subtitle="A computational framework for studying high-energy particle transport and production."
      statusContext="Exploration"
      motivationHeader="Overview"
      contributionHeader="PHYSICAL MODEL"
      summaryParagraphs={summary}
      contributionItems={explored}
      technologies={technologies}
      repoUrl="https://github.com/h-livv/janus"
      backgroundCanvas={<JanusBackground />}
      repositoryDescription="The repository is preserved as a completed exploration of coupled particle-interaction simulation and beam transport."
    >
      {/* ==========================================
          THE PIPELINE
         ========================================== */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-t border-white/[0.04] pt-8">
        <div className="md:col-span-4 font-mono text-[12px] uppercase tracking-widest text-neutral-500">
          Pipeline
        </div>
        <div className="md:col-span-8 flex flex-col gap-4 text-neutral-350 text-[14px] font-light leading-relaxed">
          <div className="font-mono text-[12px] p-4 border border-white/[0.04] bg-neutral-950/40 rounded text-center">
            Proton Beam → Particle Interaction → Particle Production → Beam Transport → Diagnostics
          </div>
        </div>
      </section>

      {/* ==========================================
          RESEARCH QUESTION
         ========================================== */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-t border-white/[0.04] pt-8">
        <div className="md:col-span-4 font-mono text-[12px] uppercase tracking-widest text-neutral-500">
          Research Question
        </div>
        <div className="md:col-span-8 flex flex-col gap-4 text-neutral-350 text-[14px] font-light leading-relaxed">
          <p className="text-white font-medium italic">
            &ldquo;How do physical beamline parameters influence coupled high-energy particle simulations?&rdquo;
          </p>
          <p>
            The exploration focused on parameter sensitivity, downstream beam behavior, and the computational structure of coupling particle-interaction and beam-transport simulations.
          </p>
        </div>
      </section>

      {/* ==========================================
          IMPLEMENTATION
         ========================================== */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-t border-white/[0.04] pt-8">
        <div className="md:col-span-4 font-mono text-[12px] uppercase tracking-widest text-neutral-500">
          Implementation
        </div>
        <div className="md:col-span-8 flex flex-col gap-4 text-neutral-350 text-[14px] font-light leading-relaxed">
          <p>The implemented system includes:</p>
          <ul className="list-disc pl-5 space-y-2 text-neutral-400">
            <li>Geant4 target bombardment and collision validation</li>
            <li>ROOT-based particle data transfer</li>
            <li>Xsuite beam transport</li>
            <li>Configurable drift, quadrupole, bend, and aperture elements</li>
            <li>Transport diagnostics and validation tests</li>
          </ul>
        </div>
      </section>

    </CollaborativeProjectLayout>
  );
}
