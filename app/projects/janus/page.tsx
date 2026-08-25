import React from 'react';
import type { Metadata } from 'next';
import CollaborativeProjectLayout from '../../../components/projects/CollaborativeProjectLayout';
import { JanusBackground } from '../../../components/projects/ProjectBackgrounds';

export const metadata: Metadata = {
  title: 'JANUS',
  description: 'An exploratory computational physics project investigating optimization methods for high-energy particle beamlines.',
};

export default function JanusPage() {
  const summary = [
    'JANUS is a computational system built to investigate how physical beamline parameters influence coupled high-energy particle simulations, and how computational methods can explore and optimize those systems. It couples particle-interaction simulation with deterministic beam transport to measure downstream effects, using antiproton production as the current physical case study.'
  ];

  const explored = [
    'Particle interaction simulation: Geant4 is used to model high-energy proton–target interactions and resulting particle production.',
    'Beam transport simulation: Xsuite is used for deterministic relativistic particle transport through accelerator lattices and magnetic elements.'
  ];

  const technologies = ['Geant4', 'Xsuite', 'Python', 'C++', 'Numerical Optimization'];

  return (
    <CollaborativeProjectLayout
      title="JANUS"
      subtitle="Exploring computational optimization of high-energy particle beamlines."
      statusContext="Research Project"
      motivationHeader="Overview"
      contributionHeader="PHYSICAL MODEL"
      summaryParagraphs={summary}
      contributionItems={explored}
      technologies={technologies}
      repoUrl="https://github.com/h-livv/janus"
      backgroundCanvas={<JanusBackground />}
      repositoryDescription="Source code, experiments, and ongoing research for the JANUS project."
    >
      {/* ==========================================
          THE PIPELINE
         ========================================== */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-t border-white/[0.04] pt-8">
        <div className="md:col-span-4 font-mono text-[12px] uppercase tracking-widest text-neutral-500">
          The Pipeline
        </div>
        <div className="md:col-span-8 flex flex-col gap-4 text-neutral-350 text-[14px] font-light leading-relaxed">
          <div className="font-mono text-[12px] p-4 border border-white/[0.04] bg-neutral-950/40 rounded text-center">
            Beam / Particle Generation → Particle Interaction → Transport → Observable Extraction → Optimization
          </div>
          <p className="text-[13px] text-neutral-400">
            This represents the current computational environment for the antiproton case study.
          </p>
        </div>
      </section>

      {/* ==========================================
          MAIN RESEARCH QUESTION
         ========================================== */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-t border-white/[0.04] pt-8">
        <div className="md:col-span-4 font-mono text-[12px] uppercase tracking-widest text-neutral-500">
          Main Research Question
        </div>
        <div className="md:col-span-8 flex flex-col gap-4 text-neutral-350 text-[14px] font-light leading-relaxed">
          <p className="text-white font-medium italic">
            "How do physical beamline parameters influence coupled high-energy particle simulations, and how can computational methods explore and optimize those systems?"
          </p>
          <p>
            With antiproton production as the immediate case study, the work is interested in parameter sensitivity, search-space structure, parameter interactions, and the behavior and computational cost of simulation-based optimization.
          </p>
        </div>
      </section>

      {/* ==========================================
          VALIDATION
         ========================================== */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-t border-white/[0.04] pt-8">
        <div className="md:col-span-4 font-mono text-[12px] uppercase tracking-widest text-neutral-500">
          Validation
        </div>
        <div className="md:col-span-8 flex flex-col gap-4 text-neutral-350 text-[14px] font-light leading-relaxed">
          <p>
            JANUS separately validates and tests the collision and transport stages. This includes Geant4 collision validation, physical-distribution checks, and JANUS-side Xsuite transport tests. Refer to the <a href="https://github.com/h-livv/janus" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">repository validation documentation</a> for complete details.
          </p>
        </div>
      </section>

      {/* ==========================================
          FUTURE WORK
         ========================================== */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-t border-white/[0.04] pt-8">
        <div className="md:col-span-4 font-mono text-[12px] uppercase tracking-widest text-neutral-500">
          Future Work
        </div>
        <div className="md:col-span-8 flex flex-col gap-4 text-neutral-350 text-[14px] font-light leading-relaxed">
          <ul className="list-decimal pl-5 space-y-2 text-neutral-400">
            <li>Improving the coupled Geant4/Xsuite simulation environment.</li>
            <li>Investigating simulation-based optimization and parameter sensitivity.</li>
            <li>Expanding the physical constraints and beamline models as useful research questions emerge.</li>
          </ul>
        </div>
      </section>

    </CollaborativeProjectLayout>
  );
}
