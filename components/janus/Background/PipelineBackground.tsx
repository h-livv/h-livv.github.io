'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import PipelineParticles from './PipelineParticles';
import { scrollStore } from '@/hooks/janus/useScrollStore';

export default function PipelineBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to -1 to 1 range
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      scrollStore.mouse.x = x;
      scrollStore.mouse.y = y;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 w-full h-full bg-black pointer-events-none" />;
  }

  return (
    <div className="fixed inset-0 -z-10 w-full h-full bg-black pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: false, depth: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <PipelineParticles />
        </Suspense>
      </Canvas>
      
      {/* Subtle vignettes and dark overlay lights to tie WebGL into DOM seamlessly */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_40%,#000000_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0)_15%,rgba(0,0,0,0)_85%,rgba(0,0,0,0.9)_100%)] pointer-events-none" />
    </div>
  );
}
