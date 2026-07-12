'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers } from 'lucide-react';
import { GeantPyBackground } from '../../../components/projects/ProjectBackgrounds';
import ProjectNavbar from '../../../components/projects/ProjectNavbar';
import ProjectFooter from '../../../components/projects/ProjectFooter';

export default function GeantPyPage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden font-sans pb-24">
      {/* Quiet, low-opacity background animation */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <GeantPyBackground />
      </div>

      <ProjectNavbar title="GeantPy" repoUrl="https://github.com/h-livv/geantpy" />

      {/* Main Content Area: Compact, 1-2 screen heights */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-16 flex flex-col gap-16">
        
        {/* ==========================================
            1. HERO SECTION (Quiet & Compact)
           ========================================== */}
        <section className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-white">
            GeantPy
          </h1>
          <p className="text-lg font-light text-neutral-400 leading-normal max-w-2xl">
            Python-first workflows for Geant4 simulations.
          </p>
          <p className="text-xs font-light text-neutral-500 max-w-xl leading-relaxed">
            A Python framework for configuring, executing, and analyzing Geant4 simulations through a clean, automated workflow.
          </p>
        </section>

        {/* ==========================================
            2. PROJECT OVERVIEW
           ========================================== */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-t border-white/[0.04] pt-8">
          <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
            Overview
          </div>
          <div className="md:col-span-8 flex flex-col gap-4 text-neutral-300 text-sm font-light leading-relaxed">
            <p>
              GeantPy is an orchestration and productivity layer built around the Geant4 simulation engine. Rather than replacing Geant4's underlying C++ simulation capabilities, the framework wraps the execution pipeline in a Python interface, simplifying configuration setups, parameter sweeps, and structured data extraction.
            </p>
          </div>
        </section>

        {/* ==========================================
            3. WHY GEANTPY?
           ========================================== */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-t border-white/[0.04] pt-8">
          <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
            Why GeantPy?
          </div>
          <div className="md:col-span-8 border-l border-white/[0.08] pl-4 py-1 flex flex-col gap-3 font-light text-neutral-400 italic text-sm">
            <p>
              "Generating simulation datasets with Geant4 often requires repetitive C++ configuration and manual execution."
            </p>
            <p>
              "GeantPy provides a Python-first workflow that streamlines experiment configuration, execution, and analysis while preserving the flexibility of the underlying Geant4 engine."
            </p>
          </div>
        </section>

        {/* ==========================================
            4. CORE FEATURES
           ========================================== */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-t border-white/[0.04] pt-8">
          <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
            Core Features
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-[11px]">
            <div className="p-4 border border-white/[0.03] bg-neutral-950/20 rounded">
              <span className="text-white font-medium block mb-1">Python Configuration</span>
              <span className="text-neutral-400 font-light leading-normal">Configure simulations through Python rather than manually editing C++ applications.</span>
            </div>
            
            <div className="p-4 border border-white/[0.03] bg-neutral-950/20 rounded">
              <span className="text-white font-medium block mb-1">Automated Execution</span>
              <span className="text-neutral-400 font-light leading-normal">Launch batches of simulations with reproducible configurations.</span>
            </div>
            
            <div className="p-4 border border-white/[0.03] bg-neutral-950/20 rounded">
              <span className="text-white font-medium block mb-1">Parameter Sweeps</span>
              <span className="text-neutral-400 font-light leading-normal">Generate datasets across multiple beam energies, target materials, or geometries.</span>
            </div>
            
            <div className="p-4 border border-white/[0.03] bg-neutral-950/20 rounded">
              <span className="text-white font-medium block mb-1">Structured Data</span>
              <span className="text-neutral-400 font-light leading-normal">Collect simulation outputs into analysis-ready formats for downstream scientific tasks.</span>
            </div>
          </div>
        </section>

        {/* ==========================================
            5. ECOSYSTEM INTEGRATION
           ========================================== */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-t border-white/[0.04] pt-8">
          <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
            Ecosystem
          </div>
          <div className="md:col-span-8 flex flex-col gap-6">
            {/* Flowchart Diagram */}
            <div className="flex justify-center py-2 border border-white/[0.03] bg-neutral-950/20 rounded-md">
              <svg className="w-full max-w-[280px] h-auto" viewBox="0 0 200 130">
                {/* Geant4 */}
                <rect x="50" y="5" width="100" height="24" rx="2" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
                <text x="100" y="20" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">Geant4 Solver</text>
                
                {/* Arrow 1 */}
                <path d="M 100,29 L 100,47" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" strokeDasharray="2 2" />
                
                {/* GeantPy */}
                <rect x="40" y="48" width="120" height="26" rx="2" fill="none" stroke="#ffffff" strokeWidth="1" />
                <text x="100" y="64" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">GeantPy (Orchestration)</text>
                
                {/* Arrow 2 */}
                <path d="M 100,74 L 100,92" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" strokeDasharray="2 2" />
                
                {/* Janus */}
                <rect x="50" y="93" width="100" height="24" rx="2" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
                <text x="100" y="108" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle">Janus Platform</text>
              </svg>
            </div>
            
            <p className="text-neutral-450 text-xs font-light leading-relaxed">
              GeantPy provides the simulation orchestration layer used by Janus for automated particle production studies. Standalone and modular, it remains useful independently for researchers utilizing Geant4 in other computational physics pipelines.
            </p>
          </div>
        </section>

        {/* ==========================================
            6. TECHNOLOGY
           ========================================== */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-t border-white/[0.04] pt-8">
          <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
            Technology
          </div>
          <div className="md:col-span-8 flex flex-wrap gap-2 font-mono text-xs">
            {['Python', 'Geant4', 'NumPy', 'Pandas', 'Matplotlib'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-neutral-950/40 border border-white/[0.04] text-neutral-400 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* ==========================================
            7. REPOSITORY SECTION (Dominates the end)
           ========================================== */}
        <section className="border-t border-white/[0.04] pt-12 mt-4 text-center">
          <div className="max-w-2xl mx-auto flex flex-col items-center gap-5">
            <h2 className="text-xl font-normal tracking-tight text-white">
              Explore GeantPy.
            </h2>
            <p className="text-neutral-400 text-xs font-light leading-relaxed max-w-sm">
              The repository contains source code, documentation, and ongoing development.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link
                href="https://github.com/h-livv/geantpy"
                target="_blank"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-black font-mono font-medium text-xs rounded hover:bg-neutral-200 transition-colors uppercase tracking-wider min-w-[160px]"
              >
                <span>View Repository</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
      <ProjectFooter />
    </main>
  );
}
