'use client';

import React, { useEffect, useRef, useState } from 'react';

// ==========================================
// A. TEMPEST GALLERY VISUALS
// ==========================================

export function TempestSurfaceEvolution() {
  return (
    <svg className="w-full h-full bg-[#020617] p-4" viewBox="0 0 400 300">
      <defs>
        <linearGradient id="surfGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <text x="15" y="25" fill="#60a5fa" fontSize="8" fontFamily="monospace" letterSpacing="1">SURFACE_EVOLUTION // T = 4.82s</text>
      
      {/* 3D Wireframe Surface */}
      <g transform="translate(0, 40)">
        {Array.from({ length: 15 }).map((_, r) => {
          const points: string[] = [];
          for (let c = 0; c <= 20; c++) {
            const x = (c / 20) * 360 + 20;
            const yBasis = 80 + r * 8;
            const wave = Math.sin(c * 0.4 + r * 0.3) * Math.cos(r * 0.5) * 20;
            points.push(`${x},${yBasis + wave}`);
          }
          return (
            <polyline
              key={r}
              points={points.join(' ')}
              fill="none"
              stroke={r % 2 === 0 ? '#3b82f6' : '#1e3a8a'}
              strokeWidth="0.8"
              opacity={0.3 + (r / 15) * 0.6}
            />
          );
        })}
      </g>
      
      {/* HUD markers */}
      <rect x="340" y="15" width="45" height="15" fill="#1e293b" rx="2" opacity="0.5" />
      <text x="345" y="25" fill="#10b981" fontSize="7" fontFamily="monospace">GRID_64x64</text>
    </svg>
  );
}

export function TempestRossbyWave() {
  return (
    <svg className="w-full h-full bg-[#020617] p-4" viewBox="0 0 400 300">
      <text x="15" y="25" fill="#60a5fa" fontSize="8" fontFamily="monospace" letterSpacing="1">ROSSBY_WAVE_PROPAGATION</text>
      
      {/* Fluid vorticity field contours */}
      <g transform="translate(0, 40)">
        {Array.from({ length: 8 }).map((_, idx) => {
          const amplitude = 18 - idx * 1.5;
          const points: string[] = [];
          for (let x = 0; x <= 400; x += 10) {
            const y = 110 + idx * 8 + Math.sin(x * 0.035) * amplitude * Math.sin(x * 0.015);
            points.push(`${x},${y}`);
          }
          return (
            <polyline
              key={idx}
              points={points.join(' ')}
              fill="none"
              stroke="#60a5fa"
              strokeWidth="1"
              opacity={0.15 + (idx / 8) * 0.55}
              strokeDasharray={idx % 2 !== 0 ? '4 2' : undefined}
            />
          );
        })}
      </g>
      
      <circle cx="200" cy="150" r="40" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      <text x="210" y="130" fill="#ef4444" fontSize="7" fontFamily="monospace" opacity="0.6">POTENTIAL_VORTICITY_BARRIER</text>
    </svg>
  );
}

export function TempestShallowWater() {
  return (
    <svg className="w-full h-full bg-[#020617] p-4" viewBox="0 0 400 300">
      <text x="15" y="25" fill="#60a5fa" fontSize="8" fontFamily="monospace" letterSpacing="1">VECTOR_VELOCITY_FIELD</text>
      
      {/* Grid of arrows */}
      <g transform="translate(20, 40)">
        {Array.from({ length: 10 }).map((_, r) => {
          return Array.from({ length: 12 }).map((_, c) => {
            const x = c * 30 + 15;
            const y = r * 22 + 15;
            
            // Vortex math
            const dx = x - 180;
            const dy = y - 110;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            const vx = -dy / len;
            const vy = dx / len;
            const size = Math.min(14, 180 / len);
            
            const arrowAngle = Math.atan2(vy, vx) * (180 / Math.PI);
            
            return (
              <g key={`${r}-${c}`} transform={`translate(${x}, ${y}) rotate(${arrowAngle})`}>
                <line x1={-size/2} y1="0" x2={size/2} y2="0" stroke="#3b82f6" strokeWidth="0.8" opacity={0.4} />
                <polyline points={`${size/2 - 3},-2.5 ${size/2},0 ${size/2 - 3},2.5`} fill="none" stroke="#60a5fa" strokeWidth="0.8" opacity="0.7" />
              </g>
            );
          });
        })}
      </g>
    </svg>
  );
}

export function TempestConvergenceStudy() {
  return (
    <svg className="w-full h-full bg-[#020617] p-6" viewBox="0 0 400 300">
      <text x="20" y="25" fill="#60a5fa" fontSize="8" fontFamily="monospace" letterSpacing="1">L2_ERROR_CONVERGENCE_RATES</text>
      
      {/* Gridlines */}
      <line x1="50" y1="50" x2="50" y2="250" stroke="#1e293b" strokeWidth="1" />
      <line x1="50" y1="250" x2="350" y2="250" stroke="#1e293b" strokeWidth="1" />
      
      {Array.from({ length: 5 }).map((_, i) => {
        const y = 50 + i * 50;
        const x = 50 + i * 75;
        return (
          <g key={i} opacity="0.3">
            <line x1="50" y1={y} x2="350" y2={y} stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1={x} y1="50" x2={x} y2="250" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 2" />
          </g>
        );
      })}
      
      {/* L2 decay plots */}
      {/* 2nd Order finite difference */}
      <polyline
        points="50,60 120,95 190,140 260,195 330,240"
        fill="none"
        stroke="#ef4444"
        strokeWidth="1.2"
      />
      
      {/* RK4 4th Order */}
      <polyline
        points="50,80 120,135 190,200 240,245"
        fill="none"
        stroke="#10b981"
        strokeWidth="1.2"
      />
      
      <circle cx="330" cy="240" r="3" fill="#ef4444" />
      <circle cx="240" cy="245" r="3" fill="#10b981" />
      
      {/* Legends */}
      <g transform="translate(230, 60)" fontSize="7" fontFamily="monospace">
        <rect x="0" y="0" width="10" height="4" fill="#ef4444" />
        <text x="15" y="5" fill="#ef4444">FD_2ND_ORDER [O(h²)]</text>
        
        <rect x="0" y="15" width="10" height="4" fill="#10b981" />
        <text x="15" y="20" fill="#10b981">RK4_INTEGRATOR [O(dt⁴)]</text>
      </g>
    </svg>
  );
}

export function TempestNeuralOperator() {
  return (
    <svg className="w-full h-full bg-[#020617] p-4" viewBox="0 0 400 300">
      <text x="15" y="25" fill="#60a5fa" fontSize="8" fontFamily="monospace" letterSpacing="1">FOURIER_NEURAL_OPERATOR_PREDICTION</text>
      
      {/* Ground Truth */}
      <g transform="translate(10, 40)">
        <rect x="10" y="15" width="165" height="180" fill="none" stroke="#1e293b" />
        <text x="15" y="30" fill="#94a3b8" fontSize="7" fontFamily="monospace">GROUND_TRUTH // Burgers</text>
        
        {Array.from({ length: 8 }).map((_, idx) => {
          const points: string[] = [];
          for (let x = 0; x <= 145; x += 5) {
            const wave = Math.sin(x * 0.05) * Math.exp(-idx * 0.15) * 20;
            points.push(`${20 + x},${100 + idx * 8 - wave}`);
          }
          return (
            <polyline key={idx} points={points.join(' ')} fill="none" stroke="#3b82f6" strokeWidth="0.8" opacity={0.6} />
          );
        })}
      </g>
      
      {/* FNO Prediction */}
      <g transform="translate(195, 40)">
        <rect x="10" y="15" width="165" height="180" fill="none" stroke="#1e293b" />
        <text x="15" y="30" fill="#10b981" fontSize="7" fontFamily="monospace">FNO_PREDICTION // MSE: 1.42e-4</text>
        
        {Array.from({ length: 8 }).map((_, idx) => {
          const points: string[] = [];
          for (let x = 0; x <= 145; x += 5) {
            // slightly perturbed with simulated NN noise
            const noise = Math.sin(x * 0.3) * 0.8;
            const wave = Math.sin(x * 0.05) * Math.exp(-idx * 0.15) * 20 + noise;
            points.push(`${20 + x},${100 + idx * 8 - wave}`);
          }
          return (
            <polyline key={idx} points={points.join(' ')} fill="none" stroke="#10b981" strokeWidth="0.8" opacity={0.6} />
          );
        })}
      </g>
    </svg>
  );
}


// ==========================================
// B. PENROSE GALLERY VISUALS
// ==========================================

export function PenroseBlackHoleRender() {
  return (
    <svg className="w-full h-full bg-black p-4" viewBox="0 0 400 300">
      <text x="15" y="25" fill="#a855f7" fontSize="8" fontFamily="monospace" letterSpacing="1">SCHWARZSCHILD_SPACETIME_LENSING</text>
      
      {/* Accretion Disk Warp Schematic */}
      <g transform="translate(200, 150)">
        {/* Einstein ring lensed background part */}
        <path
          d="M -160,0 C -120,-60 -50,-80 0,-80 C 50,-80 120,-60 160,0 C 120,-10 60,-15 0,-15 C -60,-15 -120,-10 -160,0 Z"
          fill="rgba(147, 51, 234, 0.45)"
          stroke="#c084fc"
          strokeWidth="1"
        />
        
        {/* Forefront accretion disk */}
        <path
          d="M -160,0 C -120,40 -50,60 0,60 C 50,60 120,40 160,0 C 100,5 50,8 0,8 C -50,8 -100,5 -160,0 Z"
          fill="rgba(147, 51, 234, 0.75)"
          stroke="#c084fc"
          strokeWidth="1.2"
        />

        {/* Schwarzschild Event Horizon */}
        <circle cx="0" cy="0" r="32" fill="#000000" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        
        {/* Photon sphere orbit radius */}
        <circle cx="0" cy="0" r="48" fill="none" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="3 3" />
        <text x="52" y="5" fill="#ef4444" fontSize="6" fontFamily="monospace">PHOTON_SPHERE (r = 3M)</text>
      </g>
    </svg>
  );
}

export function PenrosePhotonRings() {
  return (
    <svg className="w-full h-full bg-black p-6" viewBox="0 0 400 300">
      <text x="20" y="25" fill="#a855f7" fontSize="8" fontFamily="monospace" letterSpacing="1">RAY_INTENSITY_PROFILE // N-ring peaks</text>
      
      {/* Intensity axis */}
      <line x1="50" y1="60" x2="50" y2="240" stroke="#334155" strokeWidth="1" />
      <line x1="50" y1="240" x2="350" y2="240" stroke="#334155" strokeWidth="1" />
      <text x="32" y="65" fill="#94a3b8" fontSize="6" fontFamily="monospace" transform="rotate(-90 32 65)">INTENSITY (I)</text>
      <text x="180" y="255" fill="#94a3b8" fontSize="6" fontFamily="monospace">IMPACT_PARAMETER (b)</text>

      {/* Primary, Secondary, and Tertiary ring lensed peaks */}
      <path
        d="M 60,240 L 120,240 C 130,240 145,210 150,90 L 151,90 C 153,190 156,230 160,240 L 168,240 C 170,240 171,215 172,130 L 172.5,130 C 173,210 175,238 178,240 L 340,240"
        fill="none"
        stroke="#c084fc"
        strokeWidth="1.5"
      />
      
      <text x="135" y="80" fill="#c084fc" fontSize="6" fontFamily="monospace">PRIMARY_RING (n=1)</text>
      <text x="182" y="125" fill="#a855f7" fontSize="6" fontFamily="monospace">SECONDARY (n=2)</text>
    </svg>
  );
}

export function PenroseTrajectoryPlot() {
  return (
    <svg className="w-full h-full bg-black p-4" viewBox="0 0 400 300">
      <text x="15" y="25" fill="#a855f7" fontSize="8" fontFamily="monospace" letterSpacing="1">GEODESIC_INTEGRATOR_OUTPUT</text>
      
      <g transform="translate(200, 150)">
        {/* Center singularity */}
        <circle cx="0" cy="0" r="16" fill="#000000" stroke="#a855f7" strokeWidth="1" />
        <circle cx="0" cy="0" r="32" fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
        
        {/* Deflected light geodesics */}
        {/* 1. Captured ray */}
        <path d="M -180,-80 Q -60,-80 -25,-40 Q -10,-20 -8,0" fill="none" stroke="#ef4444" strokeWidth="1" />
        
        {/* 2. Critical orbit ray (wind) */}
        <path d="M -180,-30 Q -60,-30 -35,-5 C -30,20 -10,35 -2,32 C 10,25 25,0 16,-20 C 10,-30 -10,-32 -22,-16" fill="none" stroke="#10b981" strokeWidth="1" />
        
        {/* 3. Escaping deflected ray */}
        <path d="M -180,-110 Q -60,-110 -35,-80 Q 20,-40 180,-30" fill="none" stroke="#3b82f6" strokeWidth="1.2" />
        
        <text x="-160" y="-70" fill="#ef4444" fontSize="6" fontFamily="monospace">CAPTURED (b &lt; 3√3 M)</text>
        <text x="-165" y="-100" fill="#3b82f6" fontSize="6" fontFamily="monospace">DEFLECTED (b &gt;&gt; 3M)</text>
      </g>
    </svg>
  );
}


// ==========================================
// C. NEREID GALLERY VISUALS
// ==========================================

export function NereidSPHSetup() {
  return (
    <svg className="w-full h-full bg-[#030712] p-4" viewBox="0 0 400 300">
      <text x="15" y="25" fill="#06b6d4" fontSize="8" fontFamily="monospace" letterSpacing="1">SPH_SMOOTHING_KERNEL // W(r, h)</text>
      
      {/* Smoothing kernel visualization */}
      <g transform="translate(200, 150)">
        {/* Kernel circle radius h */}
        <circle cx="0" cy="0" r="75" fill="rgba(6, 182, 212, 0.05)" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="0" y1="0" x2="53" y2="53" stroke="#06b6d4" strokeWidth="1" />
        <text x="25" y="20" fill="#06b6d4" fontSize="7" fontFamily="monospace">KERNEL_RADIUS (h)</text>
        
        {/* Center particle i */}
        <circle cx="0" cy="0" r="4" fill="#ffffff" />
        <text x="-25" y="-10" fill="#ffffff" fontSize="8" fontFamily="monospace">PARTICLE_i</text>
        
        {/* Neighbor particles j */}
        <g opacity="0.6">
          <circle cx="-45" cy="30" r="3" fill="#06b6d4" />
          <line x1="0" y1="0" x2="-45" y2="30" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
          
          <circle cx="30" cy="-50" r="3" fill="#06b6d4" />
          <line x1="0" y1="0" x2="30" y2="-50" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
          
          <circle cx="60" cy="20" r="3" fill="#06b6d4" />
          <line x1="0" y1="0" x2="60" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
        </g>
        
        {/* Out-of-bounds particle (no interaction) */}
        <g opacity="0.3">
          <circle cx="-110" cy="-40" r="3" fill="#94a3b8" />
          <text x="-145" y="-45" fill="#94a3b8" fontSize="6" fontFamily="monospace">r &gt; h (ignored)</text>
        </g>
      </g>
    </svg>
  );
}

/**
 * Live 2D SPH Fluid simulation in Canvas!
 * Drops a dynamic box of particles that interactive splash.
 */
export function NereidFluidFrames() {
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

    let width = (canvas.width = 180);
    let height = (canvas.height = 135);

    // Dynamic SPH-like pseudo fluid simulation (2D Grid / Box constraint)
    const particleCount = 120;
    const particles = Array.from({ length: particleCount }).map((_, idx) => {
      const col = idx % 10;
      const row = Math.floor(idx / 10);
      return {
        x: 40 + col * 7 + (Math.random() - 0.5) * 2,
        y: 20 + row * 7 + (Math.random() - 0.5) * 2,
        vx: 0,
        vy: 0,
        radius: 2,
      };
    });

    const gravity = 0.15;
    const bounce = -0.55;
    const spacing = 7.5; // target spacing
    const springK = 0.08; // pressure repulsion

    let animationId: number;

    const render = () => {
      if (!isVisibleRef.current) {
        animationId = requestAnimationFrame(render);
        return;
      }
      // Dark bg
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, width, height);

      // Simple grid particle solver
      for (let step = 0; step < 2; step++) {
        // Double pass for constraint stability
        // Compute pressure forces (repulsion if too close)
        for (let i = 0; i < particleCount; i++) {
          const pA = particles[i];
          for (let j = i + 1; j < particleCount; j++) {
            const pB = particles[j];
            const dx = pB.x - pA.x;
            const dy = pB.y - pA.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 0.1;

            if (dist < spacing) {
              const overlap = spacing - dist;
              const forceX = (dx / dist) * overlap * springK;
              const forceY = (dy / dist) * overlap * springK;

              pA.vx -= forceX;
              pA.vy -= forceY;
              pB.vx += forceX;
              pB.vy += forceY;
            }
          }
        }

        // Apply velocities, gravity, boundary limits
        particles.forEach((p) => {
          p.vy += gravity;
          
          p.vx *= 0.98; // viscosity friction
          p.vy *= 0.98;

          p.x += p.vx;
          p.y += p.vy;

          // Wall limits
          if (p.x < 4) {
            p.x = 4;
            p.vx *= bounce;
          } else if (p.x > width - 4) {
            p.x = width - 4;
            p.vx *= bounce;
          }

          if (p.y < 4) {
            p.y = 4;
            p.vy *= bounce;
          } else if (p.y > height - 4) {
            p.y = height - 4;
            p.vy *= bounce;
          }
        });
      }

      // Draw particle droplets with overlapping blur
      ctx.fillStyle = 'rgba(6, 182, 212, 0.75)'; // Cyan
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Overlay outline details
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, width, height);

      ctx.fillStyle = '#06b6d4';
      ctx.font = '6px monospace';
      ctx.fillText('LIVE_SPH_COLLAPSE_SOLVER', 6, 10);

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#030712]">
      <canvas ref={canvasRef} className="border border-white/5 rounded-sm shadow-2xl" />
    </div>
  );
}


// ==========================================
// D. ATLAS GALLERY VISUALS
// ==========================================

export function AtlasBlochSphereVisual() {
  return (
    <svg className="w-full h-full bg-black p-4" viewBox="0 0 400 300">
      <text x="15" y="25" fill="#6366f1" fontSize="8" fontFamily="monospace" letterSpacing="1">BLOCH_SPHERE_COORDINATES</text>
      
      <g transform="translate(200, 150)">
        {/* Sphere shell */}
        <circle cx="0" cy="0" r="70" fill="none" stroke="#6366f1" strokeWidth="0.8" opacity="0.3" />
        <ellipse cx="0" cy="0" rx="70" ry="20" fill="none" stroke="#6366f1" strokeWidth="0.5" opacity="0.15" />
        
        {/* Cartesian Axes */}
        <line x1="-90" y1="0" x2="90" y2="0" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1="0" y1="-90" x2="0" y2="90" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        
        {/* State arrow */}
        <line x1="0" y1="0" x2="40" y2="-45" stroke="#8b5cf6" strokeWidth="1.8" />
        <polygon points="40,-45 34,-41 38,-37" fill="#8b5cf6" />
        
        {/* Projected trail */}
        <line x1="40" y1="-45" x2="40" y2="0" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2 2" />
        <circle cx="40" cy="0" r="2" fill="#8b5cf6" opacity="0.6" />
        
        <text x="45" y="-48" fill="#ffffff" fontSize="7" fontFamily="monospace">|ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩</text>
      </g>
    </svg>
  );
}

export function AtlasQuantumCircuit() {
  return (
    <svg className="w-full h-full bg-black p-4" viewBox="0 0 400 300">
      <text x="15" y="25" fill="#6366f1" fontSize="8" fontFamily="monospace" letterSpacing="1">VQE_ANSATZ_CIRCUIT // SU(2) Entangler</text>
      
      {/* 3 qubits grid lines */}
      <g transform="translate(30, 60)">
        {Array.from({ length: 3 }).map((_, i) => (
          <g key={i} transform={`translate(0, ${i * 45})`}>
            <text x="0" y="4" fill="#94a3b8" fontSize="8" fontFamily="monospace">q[{i}]</text>
            <line x1="30" y1="0" x2="320" y2="0" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
          </g>
        ))}

        {/* 1. Hadamard gates */}
        <g transform="translate(60, 0)">
          {Array.from({ length: 3 }).map((_, i) => (
            <g key={i} transform={`translate(0, ${i * 45})`}>
              <rect x="-10" y="-10" width="20" height="20" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" rx="2" />
              <text x="-4" y="3" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">H</text>
            </g>
          ))}
        </g>

        {/* 2. Ry Parameterized rotation gates */}
        <g transform="translate(120, 0)">
          {Array.from({ length: 3 }).map((_, i) => (
            <g key={i} transform={`translate(0, ${i * 45})`}>
              <rect x="-16" y="-10" width="32" height="20" fill="#311042" stroke="#a855f7" strokeWidth="1" rx="2" />
              <text x="-12" y="3" fill="#ffffff" fontSize="7" fontFamily="monospace">Ry(θ{i})</text>
            </g>
          ))}
        </g>

        {/* 3. CNOT Entangling gates */}
        {/* q[0] control to q[1] target */}
        <g transform="translate(190, 0)">
          <circle cx="0" cy="0" r="3" fill="#6366f1" />
          <line x1="0" y1="0" x2="0" y2="45" stroke="#6366f1" strokeWidth="1.2" />
          <circle cx="0" cy="45" r="5" fill="none" stroke="#6366f1" strokeWidth="1.2" />
          <line x1="-5" y1="45" x2="5" y2="45" stroke="#6366f1" strokeWidth="1.2" />
          <line x1="0" y1="40" x2="0" y2="50" stroke="#6366f1" strokeWidth="1.2" />
        </g>
        
        {/* q[1] control to q[2] target */}
        <g transform="translate(250, 45)">
          <circle cx="0" cy="0" r="3" fill="#6366f1" />
          <line x1="0" y1="0" x2="0" y2="45" stroke="#6366f1" strokeWidth="1.2" />
          <circle cx="0" cy="45" r="5" fill="none" stroke="#6366f1" strokeWidth="1.2" />
          <line x1="-5" y1="45" x2="5" y2="45" stroke="#6366f1" strokeWidth="1.2" />
          <line x1="0" y1="40" x2="0" y2="50" stroke="#6366f1" strokeWidth="1.2" />
        </g>
      </g>
    </svg>
  );
}

export function AtlasEnergyConvergence() {
  return (
    <svg className="w-full h-full bg-black p-6" viewBox="0 0 400 300">
      <text x="20" y="25" fill="#6366f1" fontSize="8" fontFamily="monospace" letterSpacing="1">VQE_OPTIMIZATION_CONVERGENCE</text>
      
      {/* Chart boundary */}
      <line x1="50" y1="50" x2="50" y2="230" stroke="#334155" strokeWidth="1" />
      <line x1="50" y1="230" x2="350" y2="230" stroke="#334155" strokeWidth="1" />
      
      {/* Analytical limit line */}
      <line x1="50" y1="210" x2="350" y2="210" stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 3" />
      <text x="245" y="204" fill="#10b981" fontSize="6" fontFamily="monospace">EXACT_GROUND_STATE (E₀ = -2.1283 eV)</text>

      {/* Energy trace curve */}
      {/* Starts high (unoptimized ansatz), decays and converges to exact line */}
      <path
        d="M 50,65 L 75,80 L 100,110 L 125,145 L 150,175 L 175,190 L 200,205 L 225,208.5 L 250,209.2 L 275,209.7 L 300,209.9 L 350,210.0"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="1.8"
      />
      
      {/* Legends */}
      <text x="180" y="245" fill="#94a3b8" fontSize="6" fontFamily="monospace">OPTIMIZER_ITERATIONS (COBYLA)</text>
      <text x="32" y="60" fill="#94a3b8" fontSize="6" fontFamily="monospace" transform="rotate(-90 32 60)">ENERGY &lt;H&gt; (eV)</text>
      
      <circle cx="350" cy="210" r="3" fill="#8b5cf6" />
    </svg>
  );
}

export function AtlasHamiltonianLattice() {
  return (
    <svg className="w-full h-full bg-black p-4" viewBox="0 0 400 300">
      <text x="15" y="25" fill="#6366f1" fontSize="8" fontFamily="monospace" letterSpacing="1">1D_TRANSVERSE_FIELD_ISING_MODEL_LATTICE</text>
      
      {/* Spin nodes connected in a chain */}
      <g transform="translate(0, 150)">
        {/* Connection bonds */}
        <line x1="50" y1="0" x2="350" y2="0" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
        <line x1="50" y1="0" x2="350" y2="0" stroke="#6366f1" strokeWidth="0.8" />

        {Array.from({ length: 6 }).map((_, i) => {
          const x = 50 + i * 60;
          // Spin states alternate up and down
          const isUp = i % 2 === 0;
          
          return (
            <g key={i} transform={`translate(${x}, 0)`}>
              {/* Spin site circle */}
              <circle cx="0" cy="0" r="14" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
              
              {/* Arrow */}
              <g transform={isUp ? 'rotate(0)' : 'rotate(180)'}>
                <line x1="0" y1="7" x2="0" y2="-7" stroke="#ffffff" strokeWidth="1.5" />
                <polyline points="-3,-4 0,-7 3,-4" fill="none" stroke="#ffffff" strokeWidth="1.5" />
              </g>
              
              <text x="-12" y="26" fill="#94a3b8" fontSize="7" fontFamily="monospace">σ_z[{i}]</text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
