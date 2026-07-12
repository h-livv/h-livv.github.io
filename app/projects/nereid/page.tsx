'use client';

import React from 'react';
import CollaborativeProjectLayout from '../../../components/projects/CollaborativeProjectLayout';
import { NereidBackground } from '../../../components/projects/ProjectBackgrounds';

export default function NereidPage() {
  const summaryParagraphs = [
    'Nereid is a physical simulation framework for particle-based fluid dynamics utilizing Smoothed Particle Hydrodynamics (SPH). The platform provides a research-focused environment for modeling compressible and incompressible fluid flows by representing fluid volumes as discrete particle systems.',
    'Developed as a collaborative project within SEDS Celestia, Nereid uses local smoothing kernels to interpolate physical quantities (density, pressure, viscosity) across neighbors, enabling simulation of free-surface flows, droplet dynamics, and container boundary interactions.'
  ];

  const contributions = [
    'Framework Refactoring: Led a complete architectural overhaul of the SPH framework, modernizing the codebase for long-term maintainability and extensibility.',

    'Simulation Infrastructure: Redesigned the simulation pipeline into modular components to support future numerical methods, visualization, and GPU acceleration.',

    'Project Leadership: Sole active developer responsible for advancing the framework\'s technical roadmap and next-generation architecture.',
  ];

  const technologies = ['Python', 'NumPy', 'CUDA (Roadmap)'];

  return (
    <CollaborativeProjectLayout
      title="Nereid"
      subtitle="Particle-based fluid simulation using Smoothed Particle Hydrodynamics."
      organization="SEDS Celestia"
      role="Lead Developer / Simulation Development / Framework Design"
      summaryParagraphs={summaryParagraphs}
      contributionItems={contributions}
      technologies={technologies}
      repoUrl="https://github.com/seds-celestia-simulations/sim-nereid"
      backgroundCanvas={<NereidBackground />}
    />
  );
}
