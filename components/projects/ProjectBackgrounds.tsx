'use client';

import React, { useEffect, useRef } from 'react';

/**
 * 1. TEMPEST BACKGROUND
 * Evolving PDE wave isolines / contour grid
 */
export function TempestBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block absolute inset-0" />;
}

/**
 * 2. PENROSE BACKGROUND
 * Schwarzschild ray-traced photon geodesics winding around a black hole
 */
export function PenroseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const center = { x: width * 0.7, y: height * 0.4 };

    // Geodesic ring templates
    const ringCount = 5;
    const rings = Array.from({ length: ringCount }).map((_, idx) => {
      const baseRadius = 80 + idx * 45;
      return {
        radiusX: baseRadius * 1.6,
        radiusY: baseRadius * 0.4,
        angle: -0.15, // tilt
        speed: 0.008 - idx * 0.001,
        color: `rgba(168, 85, 247, ${0.12 - idx * 0.015})`, // Purple
        offset: idx * Math.PI * 0.3,
      };
    });

    let time = 0;
    const render = () => {
      time += 0.01;
      center.x = width * 0.7;
      center.y = height * 0.4;

      // Dark background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Draw Accretion Disk Glow behind BH
      const glowGrad = ctx.createRadialGradient(center.x, center.y, 10, center.x, center.y, 220);
      glowGrad.addColorStop(0, 'rgba(147, 51, 234, 0.25)'); // purple glow
      glowGrad.addColorStop(0.3, 'rgba(88, 28, 135, 0.1)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(center.x, center.y, 220, 0, Math.PI * 2);
      ctx.fill();

      // Event Horizon
      ctx.fillStyle = '#000000';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(center.x, center.y, 35, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Orbiting photons along geodesics
      rings.forEach((ring) => {
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 1;

        ctx.save();
        ctx.translate(center.x, center.y);
        ctx.rotate(ring.angle);

        // Draw orbital path ellipse
        ctx.beginPath();
        ctx.ellipse(0, 0, ring.radiusX, ring.radiusY, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Draw photon pulses
        const t = time * ring.speed * 40 + ring.offset;
        const count = 3;
        for (let i = 0; i < count; i++) {
          const ptAngle = t + (i * Math.PI * 2) / count;
          const px = Math.cos(ptAngle) * ring.radiusX;
          const py = Math.sin(ptAngle) * ring.radiusY;

          const size = 1.5 + Math.sin(ptAngle) * 0.5; // perspective size
          const alpha = 0.3 + Math.sin(ptAngle) * 0.3; // fade on back side

          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block absolute inset-0" />;
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

/**
 * 5. GEANTPY BACKGROUND
 * Terminal grid with subtle green and cyan tracking paths
 */
export function GeantPyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Dynamic tracking paths
    interface Track {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      history: { x: number; y: number }[];
      maxHistory: number;
    }
    
    let tracks: Track[] = [];

    const spawnTrack = () => {
      const isGreen = Math.random() > 0.4;
      const angle = (Math.random() - 0.5) * Math.PI * 0.4; // forward direction
      const speed = 1.0 + Math.random() * 2.0;
      tracks.push({
        x: 0,
        y: height * 0.3 + Math.random() * height * 0.4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: isGreen ? 'rgba(34, 197, 94, 0.3)' : 'rgba(6, 182, 212, 0.3)', // Green or Cyan
        history: [],
        maxHistory: 30 + Math.floor(Math.random() * 40),
      });
    };

    // Pre-populate
    for (let i = 0; i < 5; i++) {
      spawnTrack();
      for (let step = 0; step < 50; step++) {
        tracks.forEach(t => {
          t.history.push({ x: t.x, y: t.y });
          t.x += t.vx;
          t.y += t.vy;
          t.vy += 0.015 * t.vx;
          t.vx -= 0.015 * t.vy;
        });
      }
    }

    const render = () => {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.012)';
      ctx.lineWidth = 1;
      const gridSize = 45;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and draw tracks
      if (Math.random() < 0.015 && tracks.length < 15) {
        spawnTrack();
      }

      tracks.forEach((t, idx) => {
        t.history.push({ x: t.x, y: t.y });
        if (t.history.length > t.maxHistory) {
          t.history.shift();
        }

        t.x += t.vx;
        t.y += t.vy;

        const bendForce = 0.003;
        const temp = t.vx;
        t.vx += t.vy * bendForce;
        t.vy -= temp * bendForce;

        if (t.history.length > 1) {
          ctx.strokeStyle = t.color;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(t.history[0].x, t.history[0].y);
          for (let i = 1; i < t.history.length; i++) {
            ctx.lineTo(t.history[i].x, t.history[i].y);
          }
          ctx.stroke();
        }
      });

      tracks = tracks.filter(t => t.x >= 0 && t.x <= width && t.y >= 0 && t.y <= height);

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block absolute inset-0" />;
}

