import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'GeantPy',
  description: 'A Python orchestration layer for configuring Geant4 simulation workflows, automating runs, and collecting structured results.',
  path: '/projects/geantpy',
});

export default function GeantPyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
