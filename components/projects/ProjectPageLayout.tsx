'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export interface FeatureItem {
  title: string;
  description: string;
}

export interface GalleryItem {
  title: string;
  description?: string;
  renderVisual: () => React.ReactNode;
}

export interface ProjectPageLayoutProps {
  title: string;
  tagline: string;
  status: string;
  role: string;
  organization: string;
  languages: string;
  accentClass: string; // e.g. 'text-[#3b82f6]'
  borderAccentClass: string; // e.g. 'border-[#3b82f6]/20'
  bgGradientClass: string; // e.g. 'from-[#3b82f6]/10'
  overviewText: string;
  features: FeatureItem[];
  highlightSectionTitle: string;
  highlightItems: { name: string; description: string }[];
  galleryItems: GalleryItem[];
  contributions: string[];
  technologies: string[];
  repoUrl: string;
  backgroundCanvas: React.ReactNode;
}

export default function ProjectPageLayout({
  title,
  tagline,
  status,
  role,
  organization,
  languages,
  accentClass,
  borderAccentClass,
  bgGradientClass,
  overviewText,
  features,
  highlightSectionTitle,
  highlightItems,
  galleryItems,
  contributions,
  technologies,
  repoUrl,
  backgroundCanvas,
}: ProjectPageLayoutProps) {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden font-sans pb-24">
      {/* Dynamic Visual Identity Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        {backgroundCanvas}
      </div>

      {/* Header / Back Navigation */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-8 flex items-center justify-between">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors font-mono text-xs uppercase tracking-wider group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </Link>
        <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
          PROJECT PROFILE
        </span>
      </header>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-16 flex flex-col gap-24">
        {/* ==========================================
            1. HERO SECTION
           ========================================== */}
        <section className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-serif font-normal tracking-normal text-white">
              {title}
            </h1>
            <p className="text-xl md:text-2xl font-light text-neutral-400 leading-relaxed">
              {tagline}
            </p>
          </div>

          {/* Metadata Panel */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 border border-white/[0.05] bg-black/60 backdrop-blur-md rounded font-mono text-xs select-none">
            <div className="flex flex-col gap-1.5">
              <span className="text-neutral-500 uppercase tracking-wider">Status</span>
              <span className={`font-medium ${accentClass}`}>{status}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-neutral-500 uppercase tracking-wider">Role</span>
              <span className="text-white font-medium">{role}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-neutral-500 uppercase tracking-wider">Organization</span>
              <span className="text-white font-medium">{organization}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-neutral-500 uppercase tracking-wider">Languages</span>
              <span className="text-white font-medium">{languages}</span>
            </div>
          </div>
        </section>

        {/* ==========================================
            2. OVERVIEW SECTION
           ========================================== */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-white/[0.05] pt-12">
          <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
            01 // Overview
          </div>
          <div className="md:col-span-8">
            <p className="text-neutral-300 font-light leading-relaxed text-base md:text-lg">
              {overviewText}
            </p>
          </div>
        </section>

        {/* ==========================================
            3. KEY FEATURES
           ========================================== */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-white/[0.05] pt-12">
          <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
            02 // Key Features
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="border border-white/[0.05] p-5 rounded bg-neutral-950/20 backdrop-blur-sm flex flex-col gap-2 hover:border-white/[0.1] transition-colors"
              >
                <h3 className="text-white font-medium text-sm tracking-tight">{feature.title}</h3>
                <p className="text-neutral-400 text-xs font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            4. TECHNICAL HIGHLIGHTS
           ========================================== */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-white/[0.05] pt-12">
          <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
            03 // {highlightSectionTitle}
          </div>
          <div className="md:col-span-8 flex flex-col gap-3 font-mono text-xs">
            {highlightItems.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center p-4 border border-white/[0.03] bg-neutral-950/10 rounded gap-2 hover:bg-neutral-950/30 transition-colors"
              >
                <span className="text-white font-medium">{item.name}</span>
                <span className="text-neutral-400 font-light text-[11px] sm:text-right">{item.description}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            5. GALLERY (INTERACTIVE VISUALS)
           ========================================== */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-white/[0.05] pt-12">
          <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
            04 // Visual Gallery
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {galleryItems.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-3 group">
                <div className="aspect-[4/3] w-full border border-white/[0.05] bg-black/80 rounded overflow-hidden relative hover:border-white/[0.12] transition-all duration-300">
                  {item.renderVisual()}
                </div>
                <div className="flex flex-col gap-1 pl-1">
                  <h4 className="text-white text-xs font-mono font-medium uppercase tracking-wider group-hover:text-white transition-colors">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-neutral-500 text-[10px] font-mono leading-normal uppercase">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            6. MY CONTRIBUTION
           ========================================== */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-white/[0.05] pt-12">
          <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
            05 // My Contribution
          </div>
          <div className="md:col-span-8 flex flex-col gap-4 font-mono text-xs">
            {contributions.map((contribution, idx) => (
              <div key={idx} className="flex items-center gap-3.5 border-b border-white/[0.03] pb-3">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${bgGradientClass} border ${borderAccentClass}`} />
                <span className="text-neutral-300 font-light leading-relaxed">{contribution}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            7. TECHNOLOGY STACK
           ========================================== */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-white/[0.05] pt-12">
          <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
            06 // Technology Stack
          </div>
          <div className="md:col-span-8 flex flex-wrap gap-2.5 font-mono text-xs">
            {technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 bg-neutral-950/60 border border-white/[0.04] text-neutral-300 rounded hover:border-white/[0.1] hover:text-white transition-all cursor-default select-none"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* ==========================================
            8. REPOSITORY CTA
           ========================================== */}
        <section className="border-t border-white/[0.05] pt-16 mt-8">
          <div className="w-full border border-white/[0.05] bg-neutral-950/20 backdrop-blur-md p-10 rounded-md flex flex-col items-center text-center gap-6 max-w-3xl mx-auto relative group overflow-hidden">
            {/* Hover decorative border highlight */}
            <div className={`absolute inset-x-0 bottom-0 h-0.5 ${bgGradientClass} opacity-20 group-hover:opacity-100 transition-opacity duration-300`} />
            
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-500 uppercase">
                Explore the implementation
              </span>
              <h2 className="text-2xl md:text-3xl font-normal tracking-tight text-white">
                This project is actively developed on GitHub.
              </h2>
            </div>
            
            <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-md">
              Review full source code, algorithmic tests, solver verifications, and parameter documentation in the public repository.
            </p>

            <Link
              href={repoUrl}
              target="_blank"
              className="mt-2 inline-flex items-center gap-2.5 px-6 py-3 bg-white text-black font-mono font-medium text-xs rounded hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 uppercase tracking-widest shadow-lg"
            >
              <span>View Repository</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
