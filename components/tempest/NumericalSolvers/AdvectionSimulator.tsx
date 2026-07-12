'use client';

import { useEffect, useRef, useCallback } from 'react';

const COLS = 96;
const ROWS = 72;
const VX = 0.55;
const VY = 0.4;
const DT = 1.0;
const DIFFUSION = 0.012;

export default function AdvectionSimulator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const uField = useRef<Float32Array>(new Float32Array(COLS * ROWS));
  const uPrev = useRef<Float32Array>(new Float32Array(COLS * ROWS));
  const isDrawing = useRef(false);
  const sizeRef = useRef({ pw: 0, ph: 0 });

  const injectAt = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * COLS;
    const y = ((e.clientY - rect.top) / rect.height) * ROWS;
    const field = uField.current;
    const radius = 5;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const dx = c - x;
        const dy = r - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < radius) {
          const intensity = Math.exp(-dist * dist / 10) * 0.95;
          const idx = r * COLS + c;
          field[idx] = Math.min(1, field[idx] + intensity);
        }
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const field = uField.current;
    const prev = uPrev.current;

    const injectCenter = () => {
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const dx = c - COLS / 2;
          const dy = r - ROWS / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          field[r * COLS + c] = Math.exp(-dist * dist / 35);
        }
      }
    };
    injectCenter();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = container.clientWidth;
      const h = container.clientHeight;
      const pw = Math.round(w * dpr);
      const ph = Math.round(h * dpr);

      sizeRef.current = { pw, ph };
      canvas.width = pw;
      canvas.height = ph;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    const updateSimulation = () => {
      prev.set(field);

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          let srcC = (c - VX * DT) % COLS;
          let srcR = (r - VY * DT) % ROWS;
          if (srcC < 0) srcC += COLS;
          if (srcR < 0) srcR += ROWS;

          const c0 = Math.floor(srcC);
          const c1 = (c0 + 1) % COLS;
          const r0 = Math.floor(srcR);
          const r1 = (r0 + 1) % ROWS;
          const sVal = srcC - c0;
          const tVal = srcR - r0;

          const val =
            (1 - sVal) * (1 - tVal) * prev[r0 * COLS + c0] +
            sVal * (1 - tVal) * prev[r0 * COLS + c1] +
            (1 - sVal) * tVal * prev[r1 * COLS + c0] +
            sVal * tVal * prev[r1 * COLS + c1];

          field[r * COLS + c] = val;
        }
      }

      prev.set(field);
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const r0 = (r - 1 + ROWS) % ROWS;
          const r1 = (r + 1) % ROWS;
          const c0 = (c - 1 + COLS) % COLS;
          const c1 = (c + 1) % COLS;
          const neighbors =
            (prev[r0 * COLS + c] +
              prev[r1 * COLS + c] +
              prev[r * COLS + c0] +
              prev[r * COLS + c1]) *
            0.25;
          field[r * COLS + c] =
            (1 - DIFFUSION) * prev[r * COLS + c] + DIFFUSION * neighbors;
        }
      }
    };

    const render = () => {
      updateSimulation();

      const { pw, ph } = sizeRef.current;
      if (pw === 0 || ph === 0) {
        requestRef.current = requestAnimationFrame(render);
        return;
      }

      // putImageData operates in device pixels and ignores transforms
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, pw, ph);

      const scaleX = pw / COLS;
      const scaleY = ph / ROWS;
      const imgData = ctx.createImageData(pw, ph);
      const data = imgData.data;

      for (let r = 0; r < ph; r++) {
        const gridR = Math.min(ROWS - 1, Math.floor(r / scaleY));
        for (let c = 0; c < pw; c++) {
          const gridC = Math.min(COLS - 1, Math.floor(c / scaleX));
          const val = field[gridR * COLS + gridC];
          const index = (r * pw + c) * 4;
          data[index] = 0;
          data[index + 1] = Math.floor(val * 255);
          data[index + 2] = Math.floor(val * 255);
          data[index + 3] = Math.floor(Math.min(1, val * 2.5) * 255);
        }
      }
      ctx.putImageData(imgData, 0, 0);

      requestRef.current = requestAnimationFrame(render);
    };

    resize();
    render();

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    return () => {
      observer.disconnect();
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative group cursor-crosshair w-full max-w-lg aspect-[4/3] rounded border border-cyan-500/30 bg-black overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        onMouseDown={(e) => {
          isDrawing.current = true;
          injectAt(e);
        }}
        onMouseMove={(e) => {
          if (isDrawing.current) injectAt(e);
        }}
        onMouseUp={() => (isDrawing.current = false)}
        onMouseLeave={() => (isDrawing.current = false)}
        className="block w-full h-full"
      />
      <div className="absolute bottom-3 left-3 font-mono text-[9px] text-cyan-300 uppercase tracking-wider pointer-events-none">
        Click or drag to inject
      </div>
    </div>
  );
}
