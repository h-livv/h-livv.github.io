'use client';

import React from 'react';
import CollaborativeProjectLayout from '../../../components/projects/CollaborativeProjectLayout';
import { PenroseBackground } from '../../../components/projects/ProjectBackgrounds';

export default function PenrosePage() {
  const summaryParagraphs = [
    'Penrose is a relativistic rendering framework designed for Schwarzschild spacetime ray tracing and general relativistic scientific visualization. The project solves the geodesic equations of motion around highly compact massive objects to simulate the extreme bending of light caused by strong gravitational lensing.',
    'Developed in collaboration with the SEDS Celestia engineering team, the framework enables real-time visual output of black hole event horizons, photon spheres, and warped accretion disks, translating general relativistic physics into interactive, high-frame-rate simulations.'
  ];

  const contributions = [
    'Physics Pipeline: Developed and benchmarked the CPU-based relativistic integration pipeline for Schwarzschild ray tracing and gravitational lensing simulations.',
    'Framework Architecture: Refactored the simulation engine into a modular, extensible architecture separating physics, benchmarking, and visualization components.',
    'Scientific Validation: Designed benchmarking workflows and validation infrastructure to verify numerical accuracy and performance of the CPU physics backend.',
  ];

  const technologies = ['C++', 'OpenGL', 'GLSL'];

  return (
    <CollaborativeProjectLayout
      title="Penrose"
      subtitle="A framework for relativistic ray tracing and black hole visualization."
      organization="SEDS Celestia"
      role="Core Developer /Physics Pipeline / Framework Architecture"
      summaryParagraphs={summaryParagraphs}
      contributionItems={contributions}
      technologies={technologies}
      repoUrl="https://github.com/seds-celestia-simulations/sim-nereid"
      backgroundCanvas={<PenroseBackground />}
    />
  );
}
