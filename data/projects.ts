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
  explorations?: { title: string; description?: string }[];
  tier: 'current' | 'selected' | 'physics' | 'earlier';
}

export const projects: Project[] = [
  // ── Current ──────────────────────────────────────────────────────────────
  {
    title: 'Quantum Computing',
    slug: 'quantum-computing',
    subtitle: 'Research with qBITS, the quantum computing club at BITS Goa.',
    explorations: [
      {
        title: 'QC4HEP',
        description:
          'Quantum simulation of the Schwinger effect to investigate theoretical and computational approaches towards identifying signatures relevant to its experimental observation.',
      },
      { title: 'Quantum-assisted drug discovery' },
      { title: 'Post-quantum cryptography' },
    ],
    date: 'AUG 2026 — PRESENT',
    status: 'QUANTUM COMPUTING EXPLORATIONS',
    affiliation: 'BITS GOA',
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
    title: 'Pairing-Based Additive Masking Cryptanalysis',
    slug: 'pairing-mask-cryptanalysis',
    description:
      'SageMath experiments testing attacks on the prime-field masking layer of a pairing-based scheme.',
    href: 'https://github.com/h-livv/pairing-mask-cryptanalysis',
    date: '2026',
    status: 'REPRODUCIBLE CRYPTANALYSIS',
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
