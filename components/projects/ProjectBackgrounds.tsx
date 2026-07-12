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
 * SPH fluid particle drift with smoothing kernel distance lines
 */
export function NereidBackground() {
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

    // Generate drift SPH particles
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      radius: 1.5 + Math.random() * 2,
    }));

    const kernelRadius = 140; // distance kernel threshold

    const render = () => {
      // Dark slate background
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, width, height);

      // Update positions
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Soft screen bounce
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;
      });

      // Draw interactive SPH connection lines
      for (let i = 0; i < particleCount; i++) {
        const pA = particles[i];
        for (let j = i + 1; j < particleCount; j++) {
          const pB = particles[j];
          const dx = pB.x - pA.x;
          const dy = pB.y - pA.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < kernelRadius * kernelRadius) {
            const dist = Math.sqrt(distSq);
            // SPH Kernel weight dropoff: (1 - d/h)
            const weight = 1.0 - dist / kernelRadius;
            ctx.strokeStyle = `rgba(6, 182, 212, ${weight * 0.12})`; // Cyan
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.stroke();
          }
        }
      }

      // Draw SPH particle dots
      particles.forEach((p) => {
        ctx.fillStyle = 'rgba(6, 182, 212, 0.22)'; // Cyan core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
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
 * 4. ATLAS BACKGROUND
 * Slowly rotating wireframe Bloch sphere representing state vector mapping
 */
export function AtlasBackground() {
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

    let angleY = 0;
    let angleX = 0.25; // fixed tilt

    const render = () => {
      angleY += 0.002;
      
      const center = { x: width * 0.72, y: height * 0.38 };
      const sphereRadius = 150;

      // Deep dark background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Draw Bloch Sphere Wireframe
      ctx.save();
      ctx.translate(center.x, center.y);

      // 1. Outer circle boundary
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.12)'; // Indigo
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, sphereRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 2. Vertical Z-axis
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      ctx.moveTo(0, -sphereRadius - 20);
      ctx.lineTo(0, sphereRadius + 20);
      ctx.stroke();
      
      // Z-axis Labels |0> and |1>
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.font = '9px monospace';
      ctx.fillText('|0⟩', -6, -sphereRadius - 26);
      ctx.fillText('|1⟩', -6, sphereRadius + 30);

      // 3. Equator Ellipse
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
      ctx.beginPath();
      ctx.ellipse(0, 0, sphereRadius, sphereRadius * 0.28, 0, 0, Math.PI * 2);
      ctx.stroke();

      // 4. Prime meridian ellipse (rotated along Y axis)
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
      ctx.save();
      ctx.rotate(angleY);
      ctx.beginPath();
      ctx.ellipse(0, 0, sphereRadius * Math.sin(angleY), sphereRadius, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 5. State Vector Arrow (evolving on the sphere)
      // Represent state: theta = time, phi = time * 0.8
      const theta = 0.8 * Math.sin(angleY * 2.5) + Math.PI / 3;
      const phi = angleY * 4.5;
      
      // Convert spherical coordinates to 3D Cartesian
      const vx = Math.sin(theta) * Math.sin(phi) * sphereRadius;
      const vy = -Math.cos(theta) * sphereRadius; // y-axis points down, so negative cos points up
      const vz = Math.sin(theta) * Math.cos(phi) * sphereRadius;

      // Project 3D onto 2D viewport (with simple projection skew)
      const projX = vx * Math.cos(angleX) - vz * Math.sin(angleX);
      const projY = vy + (vx * Math.sin(angleX) + vz * Math.cos(angleX)) * 0.15;

      // Draw historical trail
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.2)'; // Violet
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let step = 0; step < 100; step++) {
        const stepAngleY = angleY - step * 0.005;
        const stepTheta = 0.8 * Math.sin(stepAngleY * 2.5) + Math.PI / 3;
        const stepPhi = stepAngleY * 4.5;

        const svx = Math.sin(stepTheta) * Math.sin(stepPhi) * sphereRadius;
        const svy = -Math.cos(stepTheta) * sphereRadius;
        const svz = Math.sin(stepTheta) * Math.cos(stepPhi) * sphereRadius;

        const spX = svx * Math.cos(angleX) - svz * Math.sin(angleX);
        const spY = svy + (svx * Math.sin(angleX) + svz * Math.cos(angleX)) * 0.15;

        if (step === 0) ctx.moveTo(spX, spY);
        else ctx.lineTo(spX, spY);
      }
      ctx.stroke();

      // Draw State Vector Line
      ctx.strokeStyle = '#8b5cf6'; // Violet
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(projX, projY);
      ctx.stroke();

      // Draw State Vector Dot on sphere surface
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(projX, projY, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

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

