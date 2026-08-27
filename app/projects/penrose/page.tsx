'use client';

import React from 'react';
import CollaborativeProjectLayout from '../../../components/projects/CollaborativeProjectLayout';
import { PenroseBackground } from '../../../components/projects/ProjectBackgrounds';

export default function PenrosePage() {
  const summary = [
    'Penrose is a numerical exploration of particle and photon motion in curved spacetime, focusing on geodesic integration within Schwarzschild spacetime and related visualisation.'
  ];

  const explored = [
    'Implemented solvers for particle and photon trajectories with focus on numerical accuracy and conservation.',
    'Designed a modular architecture separating physics, integration, and OpenGL rendering.',
    'Created visualizations to validate relativistic motion.',
    'Used the framework as a testbed for early Solar Gravitational Lens simulations.'
  ];

  const technologies = ['C++', 'OpenGL', 'GLSL', 'Python'];

  return (
    <CollaborativeProjectLayout
      title="Penrose"
      subtitle="Numerical exploration of particle and photon motion in curved spacetime."
      statusContext="Exploration"

      motivationHeader="Overview"
      contributionHeader="FOCUS"
      summaryParagraphs={summary}
      contributionItems={explored}
      technologies={technologies}
      repoUrl="https://github.com/seds-celestia-simulations/Penrose"
      backgroundCanvas={<PenroseBackground />}
      repositoryDescription="Source code and documentation for the project."
    />
  );
}
