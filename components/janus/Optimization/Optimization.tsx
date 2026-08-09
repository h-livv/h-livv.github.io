'use client';

import { motion } from 'framer-motion';

export default function Optimization() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-12 py-24 select-none">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full">
        {/* Left text column */}
        <div className="md:col-span-7 flex flex-col items-start gap-6 text-left">
          <div className="font-mono text-xs uppercase tracking-widest text-amber-500 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            05. SYSTEM OPTIMIZATION
          </div>
          
          <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-white leading-tight">
            Explore the parameter space. Understand the physics. <span className="text-amber-500 font-medium">Optimize the pipeline.</span>
          </h2>
          
          <p className="text-secondary text-sm md:text-base font-light leading-relaxed max-w-xl">
          Janus treats the antimatter pipeline as a coupled computational system. Parameter sweeps and sensitivity analysis reveal which physical parameters control performance, while surrogate models and numerical optimization provide increasingly efficient ways to explore the resulting design space.
          </p>
        </div>

        {/* Right stats column */}
        <div className="md:col-span-5 border border-borders bg-black/40 backdrop-blur-sm p-6 rounded font-mono text-xs flex flex-col gap-6 text-left w-full">
          <div className="text-white border-b border-borders pb-3 uppercase tracking-wider font-semibold">
            OPTIMIZATION FRAMEWORK
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="text-secondary">PARAMETER SPACE</span>
              <span className="text-white">Multi-dimensional</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">ANALYSIS</span>
              <span className="text-white">Sensitivity</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">SURROGATES</span>
              <span className="text-white">Experimental</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">OPTIMIZERS</span>
              <span className="text-white">Multiple methods</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">OBJECTIVES</span>
              <span className="text-white">Multi-objective</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">CONSTRAINTS</span>
              <span className="text-white">Physics-defined</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">STATUS</span>
              <span className="text-amber-500 font-medium">Experimental</span>
            </div>
          </div>

          <div className="border-t border-borders pt-4 text-[10px] text-secondary leading-normal">
            * Optimization methods are selected according to the structure and cost of the underlying physical model.
          </div>
        </div>
      </div>
    </section>
  );
}
