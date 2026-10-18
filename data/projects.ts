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
  tier: 'current' | 'selected' | 'physics' | 'earlier';
}

export const projects: Project[] = [
  // ── Current ──────────────────────────────────────────────────────────────
  {
    title: 'QC4HEP',
    slug: 'qc4hep',
    subtitle:
      'Quantum simulation of QFTs and lattice gauge theories, and quantum computing for HEP workflows',
    description:
      'A computational research project investigating quantum simulation of lattice gauge theories and quantum computing for high-energy physics.\n\nReproduced selected results from a paper on nonequilibrium dynamics in the 1+1D Schwinger model, using exact diagonalization as a classical reference. Implemented VQE, VQD, and second-order Suzuki–Trotter evolution, comparing their results against exact calculations. Current extensions include larger-lattice benchmarks, time-dependent fields, and further validation of quantum algorithms.',
    href: 'https://github.com/qBITS-github/lattice-schwinger-qc',
    date: 'AUG 2026 — PRESENT',
    status: 'EXTENSION PHASE',
    affiliation: 'QBITS · BITS GOA',
    external: true,
    tier: 'current',
  },

  // ── Selected Work ─────────────────────────────────────────────────────────
  {
    title: 'Grokking & Mechanistic Interpretability',
    slug: 'grokking-mechinterp',
    description:
      'Investigating delayed generalization in Transformers trained on modular arithmetic, and whether their learned computations follow a Fourier-based algorithm.',
    href: 'https://github.com/h-livv/grokking-mechinterp',
    date: 'OCT 2026',
    status: 'RESEARCH EXPERIMENT',
    external: true,
    tier: 'selected',
  },
  {
    title: 'Elliptic Curve Multi-Secret Sharing',
    slug: 'elliptic-curve-mss',
    description:
      'SageMath reproduction of a hierarchical multi-secret sharing scheme using elliptic curves and pairings, currently scoped to two levels and one secret.',
    href: 'https://github.com/h-livv/elliptic-curve-mss',
    date: 'SEP–OCT 2026',
    status: 'MATHEMATICAL INVESTIGATION',
    external: true,
    tier: 'selected',
  },
  {
    title: 'Transformer from Scratch',
    slug: 'transformer-numpy',
    description:
      'A decoder-only character-level Transformer implemented from scratch in NumPy, including tokenization, multi-head self-attention, multiple Transformer blocks, manual backpropagation, and cross-entropy loss without automatic differentiation.',
    href: 'https://github.com/h-livv/transformer-numpy',
    date: '2026',
    status: 'IMPLEMENTATION STUDY',
    external: true,
    tier: 'selected',
  },

  // ── Computational Physics & Simulation ───────────────────────────────────
  {
    title: 'Penrose',
    slug: 'penrose',
    description:
      'Numerical exploration of particle and photon motion in curved spacetime, focusing on geodesic integration in Schwarzschild spacetime and relativistic visualization.',
    href: '/projects/penrose',
    image: '/images/projects/penrose.png',
    date: 'Mar – Jul 2026',
    status: 'Club Project',
    imageAlign: 'left',
    tier: 'physics',
  },
  {
    title: 'Tempest',
    slug: 'tempest',
    description:
      'A computational physics laboratory exploring numerical methods for partial differential equations alongside learned surrogate solvers, including experiments on long-horizon rollout and generalization.',
    href: '/projects/tempest',
    image: '/images/projects/tempest.png',
    date: 'Jun – Aug 2026',
    status: 'Archived',
    imageAlign: 'left',
    tier: 'physics',
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
    tier: 'physics',
  },

  // ── Experiments ───────────────────────────────────────────────────────────
  {
    title: 'Emergent Misalignment',
    slug: 'emergent-misalignment',
    description:
      'A small-scale reproduction study testing whether narrow fine-tuning induces broader behavioral changes. The intended behavior did not emerge at the tested model scale.',
    href: 'https://github.com/h-livv/emergent-misalignment',
    date: '2026',
    status: 'ARCHIVED REPRODUCTION STUDY',
    external: true,
    tier: 'earlier',
  },
  {
    title: 'Optimization',
    slug: 'optimization',
    description:
      'Optimization algorithms derived from their mathematical formulations and implemented in NumPy, starting with the simplex method for linear programming and its basis changes, pivots, and reduced costs.',
    href: 'https://github.com/h-livv/optimization',
    date: '2026',
    status: 'IN PROGRESS',
    external: true,
    tier: 'earlier',
  },
  {
    title: 'GeantPy',
    slug: 'geantpy',
    description:
      'A Python orchestration layer for Geant4 simulation workflows, enabling reproducible experiment configuration, automated execution, and structured data collection.',
    href: '/projects/geantpy',
    date: 'Jul 2026',
    status: 'ARCHIVED',
    tier: 'earlier',
  },
  {
    title: 'Atlas',
    slug: 'atlas',
    description:
      'An earlier physics-first environment for quantum Hamiltonian simulation and variational algorithms.',
    href: 'https://github.com/h-livv/atlas',
    date: 'July 2026',
    status: 'ARCHIVED',
    external: true,
    tier: 'earlier',
  },
  {
    title: 'Deconvolution',
    slug: 'deconvolution',
    description:
      'Controlled 2D inverse-problem experiments comparing direct, Fourier, and matrix-free iterative reconstruction methods, with a focus on convolution operators and boundary-model mismatch.',
    href: 'https://github.com/h-livv/deconvolution',
    date: 'Aug 2026',
    status: 'EXPLORATION',
    external: true,
    tier: 'earlier',
  },
  {
    title: 'Exoplanet Detection',
    slug: 'exoplanet-detection',
    description:
      'An exploratory notebook-based pipeline for detecting and characterizing transit signals in TESS photometric data.',
    href: 'https://github.com/h-livv/exoplanet-detection',
    date: 'July 2026',
    status: 'EXPLORATION',
    external: true,
    tier: 'earlier',
  },
];

export const currentProject = projects.find((project) => project.tier === 'current')!;
export const selectedWork = projects.filter((project) => project.tier === 'selected');
export const physicsSimulations = projects.filter((project) => project.tier === 'physics');
export const earlierExperiments = projects.filter((project) => project.tier === 'earlier');
