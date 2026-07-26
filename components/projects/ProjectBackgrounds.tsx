'use client';

import React, { useEffect, useRef } from 'react';

/**
 * 1. TEMPEST BACKGROUND
 * Evolving PDE wave isolines / contour grid
 */
export function TempestBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    });
    observer.observe(canvas);

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let time = 0;
    const render = () => {
      if (!isVisibleRef.current) {
        animationId = requestAnimationFrame(render);
        return;
      }
      time += 0.003; // extremely slow, continuous evolution
      
      // Deep navy background
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      // Draw 3D wireframe mesh grid (solving PDE wave equation)
      const cols = 28;
      const rows = 28;
      const spacingX = width / (cols - 1) * 1.4;
      const spacingY = height / (rows - 1) * 1.4;
      
      // Projection helper
      const project = (r: number, c: number) => {
        // Center-aligned coordinates
        const x0 = (c - cols / 2) * (width / 50);
        const y0 = (r - rows / 2) * (height / 50);
        
        // Multi-frequency wave superposition (glowing wave field)
        const dist = Math.sqrt(x0 * x0 + y0 * y0) * 0.15;
        const ampMod = 0.8 + 0.2 * Math.sin(time * 0.15); // slow amplitude morphing
        
        const w1 = Math.sin(x0 * 0.18 + time * 0.35) * Math.cos(y0 * 0.15 - time * 0.2);
        const w2 = Math.sin(y0 * 0.22 + time * 0.5) * Math.sin(dist - time * 0.3);
        const w3 = Math.cos(dist * 1.2 - time * 0.1) * 0.6;
        
        const z = (w1 + w2 + w3) * 6 * ampMod;

        // Orthographic projection with tilt
        const px = width * 0.5 + (x0 * 1.2 - y0 * 0.6) * 12;
        const py = height * 0.45 + (x0 * 0.3 + y0 * 0.9) * 10 - z * 8;
        
        return { x: px, y: py, z: z };
      };

      // Draw wireframe grid
      ctx.lineWidth = 1;
      
      // Grid mesh representation
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pt = project(r, c);
          
          // Color based on height (z value) - blending cyan, green, and a tiny amount of purple
          let color = 'rgba(6, 182, 212, 0.05)'; // Cyan default
          if (pt.z > 2) {
            color = 'rgba(34, 197, 94, 0.08)'; // Green peak
          } else if (pt.z < -2) {
            color = 'rgba(139, 92, 246, 0.06)'; // Purple valley
          } else {
            color = `rgba(6, 182, 212, ${0.04 + Math.abs(pt.z) * 0.01})`;
          }
          ctx.strokeStyle = color;

          // Connect to column neighbor (horizontal line)
          if (c < cols - 1) {
            const nextPt = project(r, c + 1);
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(nextPt.x, nextPt.y);
            ctx.stroke();
          }

          // Connect to row neighbor (vertical line)
          if (r < rows - 1) {
            const nextPt = project(r + 1, c);
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(nextPt.x, nextPt.y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block absolute inset-0" />;
}

export function PenroseBackground() {
  return <div className="w-full h-full block absolute inset-0 bg-black" />;
}

/**
 * 3. NEREID BACKGROUND
 * Plain black background
 */
export function NereidBackground() {
  return <div className="w-full h-full block absolute inset-0 bg-black" />;
}

/**
 * 4. ATLAS BACKGROUND
 * Plain black background
 */
export function AtlasBackground() {
  return <div className="w-full h-full block absolute inset-0 bg-black" />;
}

export function GeantPyBackground() {
  return <div className="w-full h-full block absolute inset-0 bg-black" />;
}

