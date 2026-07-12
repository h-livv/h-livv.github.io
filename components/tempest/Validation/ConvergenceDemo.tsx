'use client';

import { useState, useMemo } from 'react';
import {
  analyticalSolution,
  cellAverage,
  computeL2Error,
  observedOrder,
} from '@/lib/tempest/math';

export default function ConvergenceDemo() {
  const [gridSize, setGridSize] = useState(32);

  const error = useMemo(() => computeL2Error(gridSize), [gridSize]);
  const order = useMemo(() => observedOrder(gridSize), [gridSize]);

  const plotHeight = 240;
  const plotWidth = 480;
  const margin = { left: 28, right: 20, top: 20, bottom: 28 };
  const innerW = plotWidth - margin.left - margin.right;
  const innerH = plotHeight - margin.top - margin.bottom;

  const analyticalPath = useMemo(() => {
    const points: string[] = [];
    for (let i = 0; i <= 200; i++) {
      const x = i / 200;
      const y = analyticalSolution(x);
      const px = margin.left + x * innerW;
      const py = margin.top + (1 - y) * innerH;
      points.push(`${i === 0 ? 'M' : 'L'}${px},${py}`);
    }
    return points.join(' ');
  }, [innerW, innerH]);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="border border-white/10 bg-black rounded p-4 flex flex-col gap-3 w-full max-w-xl mx-auto">
        <span className="font-mono text-[10px] text-cyan-300 uppercase tracking-wider">
          Overlapped Convergence — Numerical vs Analytical
        </span>

        <div className="aspect-[2/1] w-full bg-black rounded relative overflow-hidden border border-white/[0.06]">
          <svg viewBox={`0 0 ${plotWidth} ${plotHeight}`} className="w-full h-full">
            <g stroke="rgba(255,255,255,0.08)" strokeWidth="0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={`h${i}`}
                  x1={margin.left}
                  y1={margin.top + (i / 4) * innerH}
                  x2={margin.left + innerW}
                  y2={margin.top + (i / 4) * innerH}
                />
              ))}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={`v${i}`}
                  x1={margin.left + (i / 4) * innerW}
                  y1={margin.top}
                  x2={margin.left + (i / 4) * innerW}
                  y2={margin.top + innerH}
                />
              ))}
            </g>

            <g
              fill="rgba(6, 182, 212, 0.22)"
              stroke="rgba(6, 182, 212, 0.7)"
              strokeWidth="0.8"
            >
              {Array.from({ length: gridSize }).map((_, i) => {
                const x = margin.left + (i / gridSize) * innerW;
                const nextX = margin.left + ((i + 1) / gridSize) * innerW;
                const val = cellAverage(i, gridSize);
                const y = margin.top + (1 - val) * innerH;
                return (
                  <rect
                    key={i}
                    x={x}
                    y={y}
                    width={nextX - x}
                    height={margin.top + innerH - y}
                  />
                );
              })}
            </g>

            <path
              d={analyticalPath}
              fill="none"
              stroke="#c084fc"
              strokeWidth="2"
            />
          </svg>

          <div className="absolute bottom-2 right-2 flex items-center gap-4 font-mono text-[9px]">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-2 bg-cyan-400/30 border border-cyan-400/70 rounded-sm" />
              <span className="text-cyan-300">Numerical</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-purple-400" />
              <span className="text-purple-400">Analytical</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 font-mono text-xs max-w-md mx-auto w-full">
        <div className="flex justify-between items-center text-neutral-300">
          <span>Grid Refinement</span>
          <span className="text-white font-medium">{gridSize} × {gridSize}</span>
        </div>
        <input
          type="range"
          min="16"
          max="128"
          step="16"
          value={gridSize}
          onChange={(e) => setGridSize(parseInt(e.target.value))}
          className="w-full accent-cyan-400 bg-neutral-900 border border-white/10 rounded h-2 cursor-pointer appearance-none"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 border border-white/10 bg-black p-4 rounded font-mono text-xs max-w-md mx-auto w-full">
        <div className="flex flex-col gap-1">
          <span className="text-neutral-400 text-[8px] uppercase tracking-wider">Grid</span>
          <span className="text-white font-medium">{gridSize} × {gridSize}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-neutral-400 text-[8px] uppercase tracking-wider">Error</span>
          <span className="text-cyan-300 font-medium">
            {error < 0.001 ? error.toExponential(1) : error.toFixed(4)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-neutral-400 text-[8px] uppercase tracking-wider">Observed Order</span>
          <span className="text-purple-400 font-medium">{order}</span>
        </div>
      </div>
    </div>
  );
}
