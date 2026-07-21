export interface Project {
  title: string;
  slug: string;
  description: string;
  role: string;
  category: 'Personal' | 'Collaborative';
  image: string;
  href: string;
}

export const projects: Project[] = [
  {
    title: 'Janus',
    slug: 'janus',
    description: 'Computational framework for antimatter systems modeling and analysis.',
    role: 'Lead Developer',
    category: 'Personal',
    image: '/images/projects/janus.png',
    href: '/projects/janus'
  },
  {
    title: 'Tempest',
    slug: 'tempest',
    description: 'A computational laboratory for numerical methods and PDE simulation.',
    role: 'Lead Developer',
    category: 'Personal',
    image: '/images/projects/tempest.png',
    href: '/projects/tempest'
  },
  {
    title: 'GeantPy',
    slug: 'geantpy',
    description: 'Python orchestration layer for Geant4 simulation workflows.',
    role: 'Lead Developer',
    category: 'Personal',
    image: '/images/projects/geantpy.png',
    href: '/projects/geantpy'
  },
  {
    title: 'Penrose',
    slug: 'penrose',
    description: 'General relativity framework for curved spacetime modeling.',
    role: 'Core Developer',
    category: 'Collaborative',
    image: '/images/projects/penrose.png',
    href: '/projects/penrose'
  },
  {
    title: 'Nereid',
    slug: 'nereid',
    description: 'An experimental platform for particle methods and Smoothed Particle Hydrodynamics.',
    role: 'Lead Developer',
    category: 'Collaborative',
    image: '/images/projects/nereid.png',
    href: '/projects/nereid'
  },
  {
    title: 'Atlas',
    slug: 'atlas',
    description: 'A physics-first quantum simulation framework for studying physical systems.',
    role: 'Lead Developer',
    category: 'Collaborative',
    image: '/images/projects/atlas.png',
    href: '/projects/atlas'
  }
  

];
