'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { scrollStore, updateActiveSection, useActiveSection } from '@/hooks/janus/useScrollStore';

interface JanusPageWrapperProps {
  children: React.ReactNode;
}

const DOTS = [
  { label: '00. INITIATION', index: 0 },
  { label: '01. PRODUCTION', index: 1 },
  { label: '02. TRANSPORT', index: 2 },
  { label: '03. COOLING', index: 3 },
  { label: '04. TRAPPING', index: 4 },
  { label: '05. OPTIMIZATION', index: 5 },
  { label: '06. PIPELINE', index: 6 },
];

export default function JanusPageWrapper({ children }: JanusPageWrapperProps) {
  const activeSection = useActiveSection();
  const lenisRef = useRef<Lenis | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Connect Lenis to ScrollTrigger
    const scrollHandler = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', scrollHandler);

    // Connect Lenis to GSAP Ticker
    const tickerHandler = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerHandler);
    gsap.ticker.lagSmoothing(0);

    // Track scroll and update sections
    const sections = containerRef.current?.querySelectorAll('.janus-section') || [];
    const triggers: ScrollTrigger[] = [];

    sections.forEach((section, index) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          // Record progress within this section
          scrollStore.sectionProgress[index] = self.progress;

          // Mark active section if triggered
          if (self.isActive) {
            updateActiveSection(index);
          }
        },
      });
      triggers.push(trigger);
    });

    // Special trigger for the footer/final section
    const footerElement = containerRef.current?.querySelector('.janus-footer');
    if (footerElement) {
      const footerTrigger = ScrollTrigger.create({
        trigger: footerElement,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true,
        onToggle: (self) => {
          if (self.isActive) {
            updateActiveSection(6);
          }
        },
        onUpdate: (self) => {
          scrollStore.sectionProgress[6] = self.progress;
        }
      });
      triggers.push(footerTrigger);
    }

    // Clean up
    return () => {
      lenis.off('scroll', scrollHandler);
      gsap.ticker.remove(tickerHandler);
      lenis.destroy();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const handleDotClick = (index: number) => {
    if (!lenisRef.current || !containerRef.current) return;
    const sections = containerRef.current.querySelectorAll('.janus-section');
    const footer = containerRef.current.querySelector('.janus-footer');
    
    if (index === 6 && footer) {
      lenisRef.current.scrollTo(footer as HTMLElement, { duration: 1.5 });
    } else if (sections[index]) {
      lenisRef.current.scrollTo(sections[index] as HTMLElement, { duration: 1.5 });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen text-white bg-transparent">
      {/* Sticky Translucent Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 h-16 border-b border-white/[0.05] bg-black/40 backdrop-blur-md flex items-center justify-between px-6 md:px-12 pointer-events-auto">
        <Link href="/projects/janus" className="text-white hover:text-[#5EEAD4] transition-colors font-mono tracking-wider font-semibold uppercase text-sm">
          Janus
        </Link>
        <Link href="/projects/janus/docs" className="text-secondary hover:text-white transition-colors font-mono tracking-wider text-xs uppercase">
          Documentation
        </Link>
      </nav>

      {/* Scrollable contents */}
      <div className="relative z-10 w-full">
        {children}
      </div>

      {/* Floating Dot Sidebar Navigation */}
      <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col gap-6 items-end font-mono">
        {DOTS.map((dot) => {
          const isActive = activeSection === dot.index;
          return (
            <button
              key={dot.index}
              onClick={() => handleDotClick(dot.index)}
              className="group flex items-center gap-3 cursor-pointer text-left focus:outline-none"
            >
              {/* Dot Label (reveals on hover or when active) */}
              <span
                className={`text-[9px] tracking-widest transition-all duration-300 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 ${
                  isActive ? 'text-[#5EEAD4] !translate-x-0 !opacity-100' : 'text-secondary'
                }`}
              >
                {dot.label}
              </span>
              
              {/* Dot Circle */}
              <span className="relative flex items-center justify-center w-5 h-5">
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-[#5EEAD4] scale-150 shadow-[0_0_8px_#5EEAD4]'
                      : 'bg-neutral-800 group-hover:bg-neutral-600'
                  }`}
                />
                {isActive && (
                  <span className="absolute w-4 h-4 border border-[#5EEAD4]/30 rounded-full animate-ping" />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
