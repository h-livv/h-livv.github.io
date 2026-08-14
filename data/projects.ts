export interface Project {
  title: string;
  slug: string;
  description: string;
  role: string;
  category: 'Research Projects' | 'Research Labs';
  image: string;
  href: string;
}

export const projects: Project[] = [
  {
    title: 'Janus',
    slug: 'janus',
    description: 'Computational framework for particle transport and optimization, with a focus on antimatter systems',
    role: 'Lead Developer',
    category: 'Research Projects',
    image: '/images/projects/janus.png',
    href: '/projects/janus'
  },
  {
    title: 'Penrose',
    slug: 'penrose',
    description: 'Computational framework for studying particle and photon motion in curved spacetime through numerical general relativity',
    role: 'Core Developer',
    category: 'Research Projects',
    image: '/images/projects/penrose.png',
    href: '/projects/penrose'
  },
  {
    title: 'Tempest',
    slug: 'tempest',
    description: 'Computational laboratory for investigating numerical methods and their application to partial differential equations',
    role: 'Lead Developer',
    category: 'Research Labs',
    image: '/images/projects/tempest.png',
    href: '/projects/tempest'
  },
  {
    title: 'Atlas',
    slug: 'atlas',
    description: 'Physics-first framework for studying quantum systems through Hamiltonian simulation and variational algorithms',
    role: 'Lead Developer',
    category: 'Research Labs',
    image: '/images/projects/atlas.png',
    href: '/projects/atlas'
  },
  {
    title: 'Nereid',
    slug: 'nereid',
    description: 'Exploratory laboratory for particle-based fluid simulation using smoothed particle hydrodynamics',
    role: 'Lead Developer',
    category: 'Research Labs',
    image: '/images/projects/nereid.png',
    href: '/projects/nereid'
  },
  {
    title: 'GeantPy',
    slug: 'geantpy',
    description: 'Python interface for automating and orchestrating Geant4 simulation workflows',
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
