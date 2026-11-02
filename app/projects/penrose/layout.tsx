import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Penrose',
  description: 'A numerical project exploring particle and photon trajectories in curved spacetime through geodesic integration and visualization.',
  path: '/projects/penrose',
});

export default function PenroseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
