'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { updateScrollProgress } from '@/hooks/tempest/useScrollStore';

interface TempestPageWrapperProps {
  children: React.ReactNode;
}

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function TempestPageWrapper({ children }: TempestPageWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    const scrollHandler = () => ScrollTrigger.update();
    lenis.on('scroll', scrollHandler);

    const tickerHandler = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerHandler);
    gsap.ticker.lagSmoothing(0);

    const progressTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        updateScrollProgress(self.progress);
      },
    });

    return () => {
      lenis.off('scroll', scrollHandler);
      gsap.ticker.remove(tickerHandler);
      lenis.destroy();
      progressTrigger.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen text-white bg-transparent">
      <nav className="fixed top-0 inset-x-0 z-50 h-14 border-b border-white/[0.08] bg-black flex items-center justify-between px-6 md:px-12">
        <Link
          href="/projects/tempest"
          className="text-white hover:text-cyan-400 transition-colors font-mono tracking-wider font-medium text-sm"
        >
          Tempest
        </Link>
        <div className="flex items-center gap-6 font-mono text-xs">
          <Link
            href="https://github.com/h-livv/tempest"
            target="_blank"
            className="text-secondary hover:text-white transition-colors flex items-center gap-1.5"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </Link>
        </div>
      </nav>

      <div className="relative z-10 w-full pt-14">{children}</div>
    </div>
  );
}
