'use client';

import React from 'react';
import CollaborativeProjectLayout from '../../../components/projects/CollaborativeProjectLayout';
import { NereidBackground } from '../../../components/projects/ProjectBackgrounds';

export default function NereidPage() {
  const summary = [
    'Nereid is an exploration of particle‑based fluid simulation using Smoothed Particle Hydrodynamics (SPH), focusing on numerical stability and performance.'
  ];

  const explored = [
    'Implemented core SPH components: neighborhood search, kernel evaluation, force computation, and time integration.',
    'Built a modular Python pipeline separating physical equations from execution.',
    'Optimized performance with NumPy vectorization and Numba JIT compilation.'
  ];

  const technologies = ['Python', 'NumPy', 'Numba'];

  return (
    <CollaborativeProjectLayout
      title="Nereid"
      subtitle="Exploration of particle-based fluid simulation using Smoothed Particle Hydrodynamics."
      statusContext="Exploration"
      motivationHeader="Overview"
      contributionHeader="FOCUS"
      summaryParagraphs={summary}
      contributionItems={explored}
      technologies={technologies}
      repoUrl="https://github.com/seds-celestia-simulations/sim-nereid"
      backgroundCanvas={<NereidBackground />}
      repositoryDescription="Source code and documentation for the project."
    />
  );
}
