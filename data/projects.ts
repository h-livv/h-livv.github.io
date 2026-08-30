export interface Project {
  title: string;
  slug: string;
  description: string;
  role: string;
  category: 'Research Projects' | 'Research Labs';
  image: string;
  href: string;
  date?: string;
}

export const projects: Project[] = [
  {
    title: 'Janus',
    slug: 'janus',
    description: 'Geant4 Monte Carlo for particle collisions coupled to an Xsuite-based CERN-inspired beamline.',
    role: 'Lead Developer',
    category: 'Research Projects',
    image: '/images/projects/janus.png',
    href: '/projects/janus',
    date: 'Jun - Aug 2026'
  },
  {
    title: 'Penrose',
    slug: 'penrose',
    description: 'Computes Christoffel symbols and integrates null geodesics for a generalized metric on the CPU side, paired with a GPU raytracer built by collaborators.',
    role: 'Core Developer',
    category: 'Research Projects',
    image: '/images/projects/penrose.png',
    href: '/projects/penrose',
    date: 'Mar - Jul 2026'
  },
  {
    title: 'Tempest',
    slug: 'tempest',
    description: 'A numerical PDE laboratory spanning multiple equation families and integration schemes, now extending into scientific machine learning.',
    role: 'Lead Developer',
    category: 'Research Labs',
    image: '/images/projects/tempest.png',
    href: '/projects/tempest',
    date: 'Jun - Aug 2026'
  },
  {
    title: 'Atlas',
    slug: 'atlas',
    description: 'Exploration of quantum simulation through Hamiltonian simulation and variational algorithms.',
    role: 'Lead Developer',
    category: 'Research Labs',
    image: '/images/projects/atlas.png',
    href: '/projects/atlas'
  },
  {
    title: 'Nereid',
    slug: 'nereid',
    description: 'Exploration of particle-based fluid simulation using Smoothed Particle Hydrodynamics.',
    role: 'Lead Developer',
    category: 'Research Labs',
    image: '/images/projects/nereid.png',
    href: '/projects/nereid'
  },
  {
    title: 'GeantPy',
    slug: 'geantpy',
    description: 'Python interface for automating and orchestrating Geant4 simulation workflows.',
    role: 'Lead Developer',
    category: 'Research Labs',
    image: '/images/projects/geantpy.png',
    href: '/projects/geantpy'
  },
  {
    title: 'Solar Gravitational Lens',
    slug: 'sgl',
    description: 'Foundation for SGL Research',
    role: 'Lead Developer',
    category: 'Research Projects',
    image: '',
    href: 'https://github.com/h-livv/sgl'
  }
];
