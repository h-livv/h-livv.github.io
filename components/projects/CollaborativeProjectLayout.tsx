'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProjectNavbar from './ProjectNavbar';
import ProjectFooter from './ProjectFooter';

export interface CollaborativeProjectLayoutProps {
  title: string;
  subtitle: string;
  organization: string;
  role: string;
  summaryParagraphs: string[];
  contributionItems: string[];
  technologies: string[];
  repoUrl: string;
  backgroundCanvas: React.ReactNode;
  repositoryDescription?: string;
}

export default function CollaborativeProjectLayout({
  title,
  subtitle,
  organization,
  role,
  summaryParagraphs,
  contributionItems,
  technologies,
  repoUrl,
  backgroundCanvas,
  repositoryDescription,
}: CollaborativeProjectLayoutProps) {
  return (
    <main className="min-h-screen bg-transparent text-white relative overflow-hidden font-sans pb-16">
      {/* Quiet, low-opacity background animation */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        {backgroundCanvas}
      </div>

      <ProjectNavbar title={title} repoUrl={repoUrl} />

      {/* Main Content Area: Compact, 1-2 screen heights */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16 flex flex-col gap-16">
        
        {/* ==========================================
            1. HERO SECTION (Quiet & Compact)
           ========================================== */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl md:text-5xl font-serif font-normal tracking-normal text-white">
              {title}
            </h1>
            <p className="text-[16px] font-light text-neutral-400 leading-normal max-w-2xl">
              {subtitle}
            </p>
          </div>

          {/* Key Metadata Block */}
          <div className="grid grid-cols-2 gap-4 max-w-md p-4 border border-white/[0.04] bg-neutral-950/40 rounded font-mono text-[12px]">
            <div className="flex flex-col gap-1">
              <span className="text-neutral-500 uppercase tracking-wider">Organization</span>
              <span className="text-white font-medium">{organization}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-neutral-500 uppercase tracking-wider">Role</span>
              <span className="text-white font-medium">{role}</span>
            </div>
          </div>
        </section>

        {/* ==========================================
            2. MOTIVATION
           ========================================== */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-t border-white/[0.04] pt-8">
          <div className="md:col-span-4 font-mono text-[12px] uppercase tracking-widest text-neutral-500">
            Motivation
          </div>
          <div className="md:col-span-8 flex flex-col gap-4 text-neutral-350 text-[14px] font-light leading-relaxed">
            {summaryParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </section>

        {/* ==========================================
            3. MY CONTRIBUTION (Most Important)
           ========================================== */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-t border-white/[0.04] pt-8">
          <div className="md:col-span-4 font-mono text-[12px] uppercase tracking-widest text-neutral-500">
            My Contribution
          </div>
          <div className="md:col-span-8 flex flex-col gap-3.5 font-mono text-[12px]">
            {contributionItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 border-b border-white/[0.02] pb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 shrink-0 mt-1.5" />
                <span className="text-neutral-300 font-light leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            4. TECHNOLOGY STACK
           ========================================== */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-t border-white/[0.04] pt-8">
          <div className="md:col-span-4 font-mono text-[12px] uppercase tracking-widest text-neutral-500">
            Technology
          </div>
          <div className="md:col-span-8 flex flex-wrap gap-2 font-mono text-[12px]">
            {technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-neutral-950/40 border border-white/[0.04] text-neutral-400 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* ==========================================
            5. REPOSITORY SECTION (Dominates the end)
           ========================================== */}
        <section className="border-t border-white/[0.04] pt-12 mt-4 text-center">
          <div className="max-w-2xl mx-auto flex flex-col items-center gap-5">
            <h2 className="text-3xl font-serif font-normal tracking-normal text-white">
              Explore {title}.
            </h2>
            <p className="text-neutral-400 text-[12px] font-light leading-relaxed max-w-sm">
              {repositoryDescription || "The repository contains source code, documentation, and ongoing development."}
            </p>
            <Link
              href={repoUrl}
              target="_blank"
              className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black font-mono font-medium text-[12px] rounded hover:bg-neutral-200 transition-colors uppercase tracking-wider"
            >
              <span>View Repository</span>
            </Link>
          </div>
        </section>

      </div>
      <ProjectFooter />
    </main>
  );
}
