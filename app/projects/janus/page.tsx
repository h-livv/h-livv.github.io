import React from 'react';
import type { Metadata } from 'next';
import CollaborativeProjectLayout from '../../../components/projects/CollaborativeProjectLayout';
import { JanusBackground } from '../../../components/projects/ProjectBackgrounds';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'JANUS',
  description: 'A research code for Geant4 particle production and handwritten relativistic Boris transport through idealized magnetic beamlines, with a historical validation campaign.',
  path: '/projects/janus',
});

export default function JanusPage() {
  const summary = [
    'Janus is a from-scratch particle-production and beam-transport research code. Its C++ Geant4 engine models proton bombardment of a high-Z target and records secondary-particle phase space.',
    'A separate handwritten relativistic Boris integrator transports selected charged particles through prescribed electromagnetic fields. The repository preserves an archived validation campaign; its reported figures are historical and were not regenerated for this website update.'
  ];

  const explored = [
    'Particle production: Geant4 simulates target interactions and writes secondary-particle data for transport.',
    'Particle transport: Janus integrates the relativistic Lorentz force with a staggered Boris leapfrog scheme in prescribed fields.',
    'Validation: archived cases cover single-particle trajectories, conservation, timestep convergence, composite lattices, beam observables, and linear-optics comparisons.'
  ];

  const technologies = ['Geant4', 'Relativistic Boris Integrator', 'Python', 'C++', 'ROOT'];

  return (
    <CollaborativeProjectLayout
      title="JANUS"
      subtitle="A computational framework for studying high-energy particle transport and production."
      statusContext="Archived"
      motivationHeader="Overview"
      contributionHeader="PHYSICAL MODEL"
      summaryParagraphs={summary}
      contributionItems={explored}
      technologies={technologies}
      repoUrl="https://github.com/h-livv/janus"
      backgroundCanvas={<JanusBackground />}
      repositoryDescription="Archived research snapshot containing the handwritten transport implementation, validation framework, and historical validation figures. No further development is planned."
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
            Proton Beam → Geant4 Target Interaction → Secondary Phase Space → Boris Transport → Beamline Diagnostics
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
            &ldquo;How well can a handwritten relativistic particle tracker reproduce expected motion through idealized beamline fields?&rdquo;
          </p>
          <p>
            The project separates stochastic particle production in Geant4 from classical transport in externally prescribed fields. The tracker does not model self-consistent fields or collective space-charge effects.
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
            <li>ROOT output and phase-space input for selected secondary particles</li>
            <li>Handwritten relativistic Boris leapfrog integration of the Lorentz force</li>
            <li>Idealized drift, dipole, quadrupole, and magnetic-horn fields with apertures</li>
            <li>Historical validation cases for trajectories, conservation, timestep convergence, composite lattices, beam observables, and linear optics</li>
          </ul>
        </div>
      </section>

    </CollaborativeProjectLayout>
  );
}
