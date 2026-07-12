import type { Metadata } from 'next';
import TempestGlobalBackground from '@/components/tempest/Background/TempestGlobalBackground';
import TempestPageWrapper from '@/components/tempest/TempestPageWrapper';
import Hero from '@/components/tempest/Hero/Hero';
import NumericalSolvers from '@/components/tempest/NumericalSolvers/NumericalSolvers';
import NumericalMethods from '@/components/tempest/NumericalMethods/NumericalMethods';
import Validation from '@/components/tempest/Validation/Validation';
import ScientificML from '@/components/tempest/ScientificML/ScientificML';
import Architecture from '@/components/tempest/Architecture/Architecture';
import Footer from '@/components/tempest/Footer/Footer';

export const metadata: Metadata = {
  title: 'Tempest',
  description:
    'A computational framework for numerical PDE simulation, scientific validation, and operator learning.',
};

export default function TempestPage() {
  return (
    <main className="min-h-screen bg-black text-white relative">
      <TempestGlobalBackground />

      <TempestPageWrapper>
        <Hero />
        <NumericalSolvers />
        <NumericalMethods />
        <Validation />
        <ScientificML />
        <Architecture />
        <Footer />
      </TempestPageWrapper>
    </main>
  );
}
