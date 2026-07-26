'use client';

import React from 'react';
import CollaborativeProjectLayout from '../../../components/projects/CollaborativeProjectLayout';
import { AtlasBackground } from '../../../components/projects/ProjectBackgrounds';

export default function AtlasPage() {
  const summaryParagraphs = [
    'Quantum algorithms are often studied as isolated implementations tied to specific problems or software libraries. Atlas was created as a laboratory for exploring computational quantum systems from first principles. Implementing algorithms, constructing physical models, and understanding how quantum dynamics emerge through simulation and experimentation.'
  ];

  const contributions = [
    'Framework Architecture: Designed the modular architecture separating physical models, Hamiltonian representations, simulation backends, and quantum algorithms into reusable components.',
    'Quantum Algorithms: Implemented and benchmarked variational quantum algorithms, Hamiltonian simulation techniques, and supporting optimization workflows for studying quantum dynamics.',
    'Physical Models: Developed abstractions for quantum many-body systems, enabling Hamiltonian construction and simulation across multiple lattice models and interaction types.'
  ];

  const technologies = ['Python', 'Qiskit', 'NumPy', 'SciPy'];

  return (
    <CollaborativeProjectLayout
      title="Atlas"
      subtitle="A quantum laboratory for Hamiltonian simulation, quantum algorithms, and quantum dynamics."
      organization="qBITS"
      role="Lead Developer"
      summaryParagraphs={summaryParagraphs}
      contributionItems={contributions}
      technologies={technologies}
      repoUrl="https://github.com/h-livv/atlas"
      backgroundCanvas={<AtlasBackground />}
      repositoryDescription="The repository contains implementations, documentation, and ongoing experimental work."
    />
  );
}
