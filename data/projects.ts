export interface Project {
  title: string;
  slug: string;
  description: string;
  href?: string;
  image?: string;
  date?: string;
  status?: string;
  subtitle?: string;
  affiliation?: string;
  external?: boolean;
  imageAlign?: 'left' | 'right';
  tier: 'current' | 'selected' | 'earlier';
}

export const projects: Project[] = [
  {
    title: 'QC4HEP',
    slug: 'qc4hep',
    subtitle: 'Quantum simulation of QFTs and lattice gauge theories, and quantum computing for HEP workflows',
    description:
      'A computational research project investigating quantum simulation of QFTs and lattice gauge theories, and exploring quantum computing for HEP workflows under near-term hardware constraints.',
    date: 'Aug 2026 — Present',
    status: 'Scoping phase',
    affiliation: 'qBITS · BITS Goa',
    tier: 'current',
  },
  {
    title: 'Tempest',
    slug: 'tempest',
    description:
      'A computational physics laboratory for numerical methods, PDE simulation, and scientific machine learning.',
    href: '/projects/tempest',
    image: '/images/projects/tempest.png',
    date: 'Jun – Aug 2026',
    status: 'Archived',
    imageAlign: 'left',
    tier: 'selected',
  },
  {
    title: 'Janus',
    slug: 'janus',
    description:
      'A computational framework coupling Geant4 particle-interaction simulation with Xsuite beam transport.',
    href: '/projects/janus',
    image: '/images/projects/janus.png',
    date: 'Jun – Aug 2026',
    status: 'Archived',
    imageAlign: 'right',
    tier: 'selected',
  },
  {
    title: 'Transformer from NumPy',
    slug: 'transformer-numpy',
    description:
      'Full Transformer language-model architecture built from scratch in NumPy, including the tokenizer, self-attention, backpropagation, and cross-entropy, with no autograd.',
    href: 'https://github.com/h-livv/transformer-numpy',
    date: '2026',
    status: 'Experimental',
    external: true,
    tier: 'selected',
  },
  {
    title: 'Emergent Misalignment',
    slug: 'emergent-misalignment',
    description:
      'Small-scale local reproduction attempt of emergent misalignment experiments from Betley et al. The experiments did not recover the intended persona at the available scale.',
    href: 'https://github.com/h-livv/emergent-misalignment',
    date: '2026',
    status: 'Archived',
    external: true,
    tier: 'selected',
  },
  {
    title: 'Penrose',
    slug: 'penrose',
    description:
      'Numerical exploration of particle and photon motion in curved spacetime, focusing on geodesic integration in Schwarzschild spacetime and related visualisation.',
    href: '/projects/penrose',
    image: '/images/projects/penrose.png',
    date: 'Mar – Jul 2026',
    status: 'Club Project',
    imageAlign: 'left',
    tier: 'selected',
  },
  {
    title: 'Atlas',
    slug: 'atlas',
    description: 'Physics-first laboratory for quantum Hamiltonian simulation and variational algorithms.',
    href: 'https://github.com/h-livv/atlas',
    date: 'July 2026',
    status: 'Archived',
    external: true,
    tier: 'earlier',
  },
  {
    title: 'GeantPy',
    slug: 'geantpy',
    description: 'A Python orchestration layer for Geant4 simulation workflows.',
    href: '/projects/geantpy',
    date: 'Jul 2026',
    status: 'Archived',
    tier: 'earlier',
  },
  {
    title: 'Deconvolution Lab',
    slug: 'deconvolution',
    description:
      'Exploratory study of convolution-based inverse problems using controlled 2D experiments, with Solar Gravitational Lens imaging as a motivating application.',
    href: 'https://github.com/h-livv/deconvolution',
    date: 'Aug 2026',
    status: 'Exploration',
    external: true,
    tier: 'earlier',
  },
  {
    title: 'Exoplanet detection',
    slug: 'exoplanet-detection',
    description:
      'Exploratory pipeline for detecting and characterizing exoplanet transit signals in TESS photometric data.',
    href: 'https://github.com/h-livv/exoplanet-detection',
    date: 'July 2026',
    status: 'Exploration',
    external: true,
    tier: 'earlier',
  },
];

export const currentProject = projects.find((project) => project.tier === 'current')!;
export const selectedWork = projects.filter((project) => project.tier === 'selected');
export const earlierExperiments = projects.filter((project) => project.tier === 'earlier');
