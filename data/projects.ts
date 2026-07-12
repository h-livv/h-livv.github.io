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
    title: 'Tempest',
    slug: 'tempest',
    description: 'Scientific machine learning for PDE systems.',
    role: 'Lead Developer',
    category: 'Personal',
    image: '/images/projects/tempest.png',
    href: '/projects/tempest'
  },
  {
    title: 'Janus',
    slug: 'janus',
    description: 'End-to-end antimatter systems modeling and analysis.',
    role: 'Lead Developer',
    category: 'Personal',
    image: '/images/projects/janus.png',
    href: '/projects/janus'
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
    description: 'Particle-based framework focused on Smoothed Particle Hydrodynamics (SPH).',
    role: 'Lead Developer',
    category: 'Collaborative',
    image: '/images/projects/nereid.png',
    href: '/projects/nereid'
  },
  {
    title: 'Atlas',
    slug: 'atlas',
    description: 'Quantum simulation framework for researching physical systems.',
    role: 'Lead Developer',
    category: 'Collaborative',
    image: '/images/projects/atlas.png',
    href: '/projects/atlas'
  }
];
