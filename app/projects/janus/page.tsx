import type { Metadata } from 'next';
import PipelineBackground from '@/components/janus/Background/PipelineBackground';
import JanusPageWrapper from '@/components/janus/JanusPageWrapper';
import Hero from '@/components/janus/Hero/Hero';
import Production from '@/components/janus/Production/Production';
import Transport from '@/components/janus/Transport/Transport';
import Cooling from '@/components/janus/Cooling/Cooling';
import Trapping from '@/components/janus/Trapping/Trapping';
import Optimization from '@/components/janus/Optimization/Optimization';
import Footer from '@/components/janus/Footer/Footer';

export const metadata: Metadata = {
  title: 'Janus',
  description: 'An immersive product experience modeling antimatter production, relativistic transport, stochastic cooling, electromagnetic trapping, and parameter optimization.',
};

export default function JanusPage() {
  return (
    <main className="min-h-screen bg-transparent text-white relative">
      {/* Persistent 3D WebGL particle simulation background */}
      <PipelineBackground />

      {/* Cinematic scroll wrapper containing all sections */}
      <JanusPageWrapper>
        <div className="janus-section">
          <Hero />
        </div>
        <div className="janus-section">
          <Production />
        </div>
        <div className="janus-section">
          <Transport />
        </div>
        <div className="janus-section">
          <Cooling />
        </div>
        <div className="janus-section">
          <Trapping />
        </div>
        <div className="janus-section">
          <Optimization />
        </div>
        <div className="janus-footer">
          <Footer />
        </div>
      </JanusPageWrapper>
    </main>
  );
}
