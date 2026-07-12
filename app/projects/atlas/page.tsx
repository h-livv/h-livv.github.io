'use client';

import React from 'react';
import CollaborativeProjectLayout from '../../../components/projects/CollaborativeProjectLayout';
import { AtlasBackground } from '../../../components/projects/ProjectBackgrounds';

export default function AtlasPage() {
  const summaryParagraphs = [
    'Atlas is a generalized research framework for computational quantum systems designed to experiment with, evaluate, and benchmark variational algorithms. It provides a modular API decoupling physical spin structures, circuit ansatz designs, and classical parameter optimization routines.',
    'Developed in collaboration with qBITS, the framework is designed for high extensibility, supporting various quantum algorithms and Hamiltonian configurations. The first implemented algorithms include the Variational Quantum Eigensolver (VQE) and the Variational Quantum Deflation (VQD), but these serve as initial concrete examples of the broader architecture rather than its defining purpose.'
  ];

  const contributions = [
    'Framework Architecture: Designed and implemented the unified, object-oriented Atlas API, decoupling physical model representations from specific variational solvers.',
    'Quantum Algorithm Development: Implemented the initial VQE and VQD algorithm solvers, validating ground-state and excited-state energy searches.',
    'Model Abstraction: Developed the Transverse Field Ising Model (TFIM) lattice Hamiltonian mapper, converting spin grid interactions into Pauli operator strings for execution.'
  ];

  const technologies = ['Python', 'Qiskit', 'NumPy', 'SciPy'];

  return (
    <CollaborativeProjectLayout
      title="Atlas"
      subtitle="A framework for variational quantum algorithms."
      organization="qBITS"
      role="Lead Developer / Framework Architecture / Quantum Algorithm Development"
      summaryParagraphs={summaryParagraphs}
      contributionItems={contributions}
      technologies={technologies}
      repoUrl="https://github.com/h-livv/atlas"
      backgroundCanvas={<AtlasBackground />}
    />
  );
}
