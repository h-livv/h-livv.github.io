'use client';

import React from 'react';
import CollaborativeProjectLayout from '../../../components/projects/CollaborativeProjectLayout';
import { AtlasBackground } from '../../../components/projects/ProjectBackgrounds';

export default function AtlasPage() {
  const summary = [
    'Atlas is an exploration of quantum simulation through Hamiltonian construction and variational algorithms, providing a Python framework for low‑level study of quantum dynamics.'
  ];

  const explored = [
    'Implemented Hamiltonian simulation methods for many‑body and lattice models.',
    'Developed and benchmarked variational quantum algorithms, analyzing optimization and convergence.',
    'Designed a modular architecture separating physical models, Hamiltonian construction, and simulation backends.'
  ];

  const technologies = ['Python', 'Qiskit', 'NumPy', 'SciPy'];

  return (
    <CollaborativeProjectLayout
      title="Atlas"
      subtitle="Exploration of quantum simulation through Hamiltonian simulation and variational algorithms."
      statusContext="Exploration"
      /* organization and role omitted for Earlier Work */
      motivationHeader="Overview"
      contributionHeader="FOCUS"
      summaryParagraphs={summary}
      contributionItems={explored}
      technologies={technologies}
      repoUrl="https://github.com/h-livv/atlas"
      backgroundCanvas={<AtlasBackground />}
      repositoryDescription="Source code and documentation for the project."
    />
  );
}
