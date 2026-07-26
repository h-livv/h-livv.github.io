'use client';

import { useEffect, useRef } from 'react';
import { tempestScrollStore } from '@/hooks/tempest/useScrollStore';

export default function TempestGlobalBackground() {
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
    let width = 0;
    let height = 0;
    let time = 0;

    // Field configuration
    const cols = 64;
    const rows = 48;
    const field = new Float32Array(cols * rows);
    const nextField = new Float32Array(cols * rows);

    // Initialization
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initField = () => {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c / cols;
          const y = r / rows;
          field[r * cols + c] =
            0.35 +
            0.25 * Math.sin(x * Math.PI * 3.2) * Math.cos(y * Math.PI * 2.8) +
            0.15 * Math.sin((x + y) * Math.PI * 5);
        }
      }
    };

    const stepField = () => {
      const mx = tempestScrollStore.mouse.x;
      const my = tempestScrollStore.mouse.y;
      const phaseX = (mx - 0.5) * 0.4;
      const phaseY = (my - 0.5) * 0.4;
      
      // Add a subtle ripple based on time
      const ripple = Math.sin(time * 2.0) * 0.02;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c / cols;
          const y = r / rows;
          
          // Evolving wave equation proxy
          const wave =
            Math.sin(x * Math.PI * 4 + time * 0.35 + phaseX) *
              Math.cos(y * Math.PI * 3 - time * 0.28 + phaseY) +
            0.5 * Math.sin((x + y) * Math.PI * 6 - time * 0.15) + ripple;
            
          const idx = r * cols + c;
          nextField[idx] = field[idx] * 0.92 + wave * 0.08;
        }
      }
      field.set(nextField);
    };

    // Rendering pipeline
    const render = () => {
      if (!isVisibleRef.current) {
        animationId = requestAnimationFrame(render);
        return;
      }
      time += 0.008;
      const scroll = Math.max(0, Math.min(1, tempestScrollStore.progress));
      
      stepField();

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const cellW = width / cols;
      const cellH = height / rows;

      // Morphing weights based on scroll
      // 0.0 - 0.25: Wave field dominates
      // 0.25 - 0.5: Contours and mesh emerge
      // 0.5 - 0.75: Mesh dissolves, frequency lattice appears
      // 0.75 - 1.0: Architecture graph elements
      
      const waveWeight = Math.max(0, 1 - scroll * 2.5); // Fades out by 0.4
      const contourWeight = Math.max(0, Math.min(1, (scroll - 0.1) * 3)) * Math.max(0, 1 - (scroll - 0.4) * 3);
      const meshWeight = Math.max(0, Math.min(1, (scroll - 0.2) * 2)) * Math.max(0, 1 - (scroll - 0.6) * 2.5);
      const freqWeight = Math.max(0, Math.min(1, (scroll - 0.5) * 3)) * Math.max(0, 1 - (scroll - 0.8) * 3);
      const graphWeight = Math.max(0, Math.min(1, (scroll - 0.7) * 3));

      // 1. Render Scalar Field (Wave)
      if (waveWeight > 0.01) {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const val = (field[r * cols + c] + 1) * 0.5;
            const clamped = Math.max(0, Math.min(1, val));
            
            // Cyan base
            const g = Math.floor(34 + clamped * 80);
            const b = Math.floor(120 + clamped * 135);
            const a = (0.04 + clamped * 0.12) * waveWeight;

            ctx.fillStyle = `rgba(6, ${g}, ${b}, ${a})`;
            ctx.fillRect(c * cellW, r * cellH, cellW + 0.5, cellH + 0.5);
          }
        }
      }

      // 2. Render Contours
      if (contourWeight > 0.01) {
        const levels = 6;
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 * contourWeight})`; // Cyan
        ctx.lineWidth = 0.5 + contourWeight * 0.5;
        
        // Drifting contour threshold
        const contourDrift = Math.sin(time * 0.5) * 0.1;
        
        for (let level = 0; level < levels; level++) {
          const threshold = -0.5 + (level / levels) * 1.5 + contourDrift;
          for (let r = 0; r < rows - 1; r++) {
            for (let c = 0; c < cols - 1; c++) {
              const v00 = field[r * cols + c];
              const v10 = field[r * cols + c + 1];
              const v01 = field[(r + 1) * cols + c];
              
              if ((v00 < threshold && v10 >= threshold) || (v00 >= threshold && v10 < threshold)) {
                const t = (threshold - v00) / (v10 - v00);
                const x = (c + t) * cellW;
                const y = r * cellH;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + cellH);
                ctx.stroke();
              }
              if ((v00 < threshold && v01 >= threshold) || (v00 >= threshold && v01 < threshold)) {
                const t = (threshold - v00) / (v01 - v00);
                const x = c * cellW;
                const y = (r + t) * cellH;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + cellW, y);
                ctx.stroke();
              }
            }
          }
        }
      }

      // 3. Render Mesh / Grid
      if (meshWeight > 0.01) {
        // Validation/Solvers -> Cyan
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 * meshWeight})`; // Cyan tint
        ctx.lineWidth = 0.5;
        const gridStep = 48;
        
        // Breathing mesh vertices
        const breathe = Math.sin(time) * 2;
        
        for (let x = 0; x < width; x += gridStep) {
          ctx.beginPath();
          ctx.moveTo(x + breathe, 0);
          ctx.lineTo(x - breathe, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridStep) {
          ctx.beginPath();
          ctx.moveTo(0, y + breathe);
          ctx.lineTo(width, y - breathe);
          ctx.stroke();
        }
      }

      // 4. Render Frequency Lattice (SciML)
      if (freqWeight > 0.01) {
        ctx.strokeStyle = `rgba(168, 85, 247, ${0.15 * freqWeight})`; // Purple
        ctx.fillStyle = `rgba(168, 85, 247, ${0.4 * freqWeight})`;
        
        const centerX = width * 0.5;
        const centerY = height * 0.5;
        const radius = Math.min(width, height) * 0.3;
        
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2 + time * 0.2;
          const r = radius * (0.8 + 0.2 * Math.sin(time * 2 + i));
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          
          ctx.fillRect(x - 2, y - 2, 4, 4);
        }
        ctx.closePath();
        ctx.stroke();
        
        // Internal connections
        ctx.beginPath();
        for (let i = 0; i < 8; i += 2) {
           const angle1 = (i / 8) * Math.PI * 2 + time * 0.2;
           const angle2 = ((i+3) / 8) * Math.PI * 2 + time * 0.2;
           ctx.moveTo(centerX + Math.cos(angle1) * radius, centerY + Math.sin(angle1) * radius);
           ctx.lineTo(centerX + Math.cos(angle2) * radius, centerY + Math.sin(angle2) * radius);
        }
        ctx.stroke();
      }

      // 5. Render Architecture Graph
      if (graphWeight > 0.01) {
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 * graphWeight})`; // Cyan
        ctx.fillStyle = `rgba(6, 182, 212, ${0.3 * graphWeight})`;
        
        // Cascading network nodes downwards
        const nodeCount = 12;
        for (let i = 0; i < nodeCount; i++) {
          const progress = (time * 0.1 + i / nodeCount) % 1;
          const y = height * progress;
          const x = width * 0.2 + (Math.sin(i * 134.5 + time) * 0.5 + 0.5) * width * 0.6;
          
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
          
          // Connect to previous nodes faintly
          if (i > 0) {
            const prevProgress = (time * 0.1 + (i - 1) / nodeCount) % 1;
            const prevY = height * prevProgress;
            const prevX = width * 0.2 + (Math.sin((i - 1) * 134.5 + time) * 0.5 + 0.5) * width * 0.6;
            
            // Only draw line if they are relatively close vertically to avoid wrap-around lines
            if (Math.abs(y - prevY) < height * 0.3) {
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(prevX, prevY);
              ctx.stroke();
            }
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    const onMouseMove = (e: MouseEvent) => {
      tempestScrollStore.mouse.x = e.clientX / window.innerWidth;
      tempestScrollStore.mouse.y = e.clientY / window.innerHeight;
    };

    resize();
    initField();
    render();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full block pointer-events-none z-0 bg-black"
    />
  );
}
