'use client';

import { useEffect, useRef } from 'react';

const STAGES = [
  { label: 'Equation', sublabel: '∂u/∂t + ∇·F = 0' },
  { label: 'Spatial Discretization', sublabel: '(Central / Upwind / Lax)' },
  { label: 'Flux Computation', sublabel: 'F_{i+1/2}' },
  { label: 'Time Integration', sublabel: '(Euler / RK4 / Leapfrog)' },
  { label: 'Updated Solution', sublabel: 'u(x, t+Δt)' },
];

export default function FluxVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = () => {
      time += 0.012;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const startY = height * 0.15;
      const endY = height * 0.85;
      const gap = (endY - startY) / (STAGES.length - 1);
      const centerX = width * 0.5;
      
      const boxW = Math.min(width * 0.8, 260);
      const boxH = gap * 0.55;

      // Draw connections
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX, startY);
      ctx.lineTo(centerX, endY);
      ctx.stroke();

      // Draw moving packets
      const totalDist = endY - startY;
      const packetSpeed = 0.4;
      const t = (time * packetSpeed) % 1;
      const t2 = ((time * packetSpeed) + 0.33) % 1;
      const t3 = ((time * packetSpeed) + 0.66) % 1;
      
      [t, t2, t3].forEach(prog => {
        const py = startY + prog * totalDist;
        
        ctx.fillStyle = '#22d3ee'; // Cyan
        ctx.shadowColor = '#22d3ee';
        ctx.shadowBlur = 8;
        
        ctx.beginPath();
        ctx.arc(centerX, py, 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
      });

      // Draw stages
      STAGES.forEach((stage, idx) => {
        const y = startY + idx * gap;
        
        // Check if a packet is currently inside this stage's box
        let isGlow = false;
        [t, t2, t3].forEach(prog => {
          const py = startY + prog * totalDist;
          if (Math.abs(py - y) < boxH * 0.6) {
             isGlow = true;
          }
        });
        
        const boxColor = isGlow ? 'rgba(34, 211, 238, 0.15)' : 'rgba(255, 255, 255, 0.03)';
        const borderColor = isGlow ? 'rgba(34, 211, 238, 0.4)' : 'rgba(255, 255, 255, 0.1)';
        const textColor = isGlow ? '#ffffff' : '#a3a3a3';

        ctx.fillStyle = boxColor;
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 1;
        
        // Draw box
        ctx.beginPath();
        ctx.rect(centerX - boxW/2, y - boxH/2, boxW, boxH);
        ctx.fill();
        ctx.stroke();

        // Draw text
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.font = '500 12px monospace';
        ctx.fillStyle = textColor;
        ctx.fillText(stage.label, centerX, y - 6);

        ctx.font = '300 10px monospace';
        ctx.fillStyle = isGlow ? 'rgba(34, 211, 238, 0.8)' : 'rgba(163, 163, 163, 0.6)';
        ctx.fillText(stage.sublabel, centerX, y + 8);
      });

      animationId = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />;
}
