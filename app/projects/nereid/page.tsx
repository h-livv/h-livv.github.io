'use client';

import React from 'react';
import CollaborativeProjectLayout from '../../../components/projects/CollaborativeProjectLayout';
import { NereidBackground } from '../../../components/projects/ProjectBackgrounds';

export default function NereidPage() {
  const summaryParagraphs = [
    'Nereid is a computational laboratory for exploring particle-based numerical methods used in fluid dynamics and continuum simulation. The project investigates how physical systems can be represented through interacting particles, emphasizing numerical accuracy, simulation architecture, and scalable computational techniques.',
    'Built as an experimental platform rather than a single simulator, Nereid provides an environment for developing particle methods, testing numerical formulations, and exploring high-performance implementations across CPU and GPU architectures.'
  ];

  const contributions = [
    'Framework Architecture: Led the architectural redesign of the simulation framework, introducing a modular pipeline supporting extensible numerical methods, visualization, and future GPU backends.',
    'Particle Simulation: Implemented and validated particle-based simulation infrastructure, including neighborhood search, kernel evaluation, force computation, and time integration components.',
    'High-Performance Computing: Designing the next-generation simulation engine with a focus on vectorization, parallel algorithms, spatial acceleration structures, and GPU execution.',
    'Technical Leadership: Leading the technical roadmap and long-term evolution of the project following the development phase.'
  ];

  const technologies = ['Python', 'NumPy', 'Numba'];

  return (
    <CollaborativeProjectLayout
      title="Nereid"
      subtitle="A computational laboratory for particle methods, fluid simulation, and high-performance computing."
      organization="SEDS Celestia"
      role="Lead Developer"
      summaryParagraphs={summaryParagraphs}
      contributionItems={contributions}
      technologies={technologies}
      repoUrl="https://github.com/seds-celestia-simulations/sim-nereid"
      backgroundCanvas={<NereidBackground />}
    />
  );
}
