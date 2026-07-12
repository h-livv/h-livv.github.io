'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/tempest/shared/SectionLabel';
import { ARCHITECTURE_NODES } from '@/lib/tempest/theme';

export default function Architecture() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 20%',
      end: 'bottom 60%',
      scrub: 0.3,
      onUpdate: (self) => {
        const idx = Math.min(
          Math.floor(self.progress * ARCHITECTURE_NODES.length),
          ARCHITECTURE_NODES.length - 1
        );
        setActiveNode(idx);
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      id="architecture"
      ref={sectionRef}
      className="relative min-h-[120vh] w-full flex flex-col justify-center px-6 md:px-12 py-24"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-4 flex flex-col gap-6 sticky top-32">
          <SectionLabel number="05" title="Framework Architecture" />

          <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-white leading-tight">
            A modular pipeline from{' '}
            <span className="text-cyan-400">grid</span> to{' '}
            <span className="text-purple-400">validation.</span>
          </h2>

          <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed max-w-sm">
            Scroll to illuminate each layer of the Tempest execution stack.
            Connections activate as you progress through the pipeline.
          </p>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-0 relative">
          {ARCHITECTURE_NODES.map((node, idx) => {
            const isActive = activeNode === idx;
            const isPast = idx < activeNode;

            // Compute theme colors
            // Use Purple for ML/Validation (last 2 nodes), Cyan for Grid/Field/Solver
            const isLateStage = idx >= ARCHITECTURE_NODES.length - 2;
            const activeBorderColor = isLateStage ? 'border-purple-500/40' : 'border-cyan-500/40';
            const activeBgColor = isLateStage ? 'bg-purple-500/5' : 'bg-cyan-500/5';
            const activeTextColor = isLateStage ? 'text-purple-400' : 'text-cyan-400';
            const activeDotColor = isLateStage ? 'bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.5)]';

            return (
              <div key={node.name} className="relative flex flex-col items-center">
                <div
                  className={`w-full flex justify-between items-center p-4 border rounded transition-all duration-500 ${
                    isActive
                      ? `${activeBorderColor} ${activeBgColor} text-white`
                      : isPast
                        ? 'border-white/[0.08] bg-neutral-950/30 text-neutral-400'
                        : 'border-white/[0.04] bg-black/20 text-neutral-500 opacity-50'
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span
                      className={`text-[10px] uppercase font-semibold tracking-wider ${
                        isActive ? activeTextColor : 'text-neutral-500'
                      }`}
                    >
                      {node.name}
                    </span>
                    <span className="text-[11px] font-light">{node.desc}</span>
                  </div>

                  <span
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      isActive
                        ? activeDotColor
                        : isPast
                          ? (isLateStage ? 'bg-purple-500/30' : 'bg-cyan-500/30')
                          : 'bg-neutral-800'
                    }`}
                  />
                </div>

                {idx < ARCHITECTURE_NODES.length - 1 && (
                  <div className="w-px h-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/[0.04]" />
                    <div
                      className={`absolute inset-x-0 top-0 transition-all duration-500 ${isLateStage ? 'bg-purple-500/50' : 'bg-cyan-500/50'}`}
                      style={{
                        height: isPast || isActive ? '100%' : '0%',
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
