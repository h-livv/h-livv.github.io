'use client';

import React from 'react';
import CollaborativeProjectLayout from '../../../components/projects/CollaborativeProjectLayout';
import { PenroseBackground } from '../../../components/projects/ProjectBackgrounds';

export default function PenrosePage() {
  const summaryParagraphs = [
    'Penrose is a computational general relativity framework for simulating particle and photon motion in curved spacetime. It combines numerical geodesic integration, scientific validation, and visualization within a modular architecture designed to support research in relativistic physics and computational astrophysics.',
    'The framework has evolved into a generalized simulation engine supporting extensible spacetime models, interchangeable numerical components, and mission-oriented applications. It now serves as the computational foundation for the Solar Gravitational Lens (SGL) digital twin, enabling the simulation of relativistic light propagation for future deep-space imaging studies.'
  ];

  const contributions = [
    'Physics & Simulation Engine: Designed and implemented the generalized CPU simulation engine for relativistic particle and photon propagation, replacing metric-specific logic with a modular architecture supporting multiple spacetime models.',
    'Framework Architecture: Led the architectural redesign of the framework, separating simulation, visualization, benchmarking, and rendering into extensible components to support future scientific applications.',
    'Scientific Validation: Developed validation and benchmarking workflows to verify numerical accuracy, conservation properties, and long-term integration stability of the relativistic simulation engine.',
    'SGL Development: Leading the development of the Solar Gravitational Lens digital twin, extending Penrose into a mission-scale simulation platform for modeling relativistic light propagation and end-to-end imaging workflows.',
  ];

  const technologies = ['C++', 'OpenGL', 'GLSL', 'Python'];

  return (
    <CollaborativeProjectLayout
      title="Penrose"
      subtitle="General relativity framework for simulating trajectories in curved spacetime."
      organization="SEDS Celestia"
      role="Core Developer"
      summaryParagraphs={summaryParagraphs}
      contributionItems={contributions}
      technologies={technologies}
      repoUrl="https://github.com/seds-celestia-simulations/Penrose"
      backgroundCanvas={<PenroseBackground />}
    />
  );
}
