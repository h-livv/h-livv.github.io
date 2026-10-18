'use client';

import { useEffect, useRef } from 'react';

/** A compact interference study in a clear accent colour. Render once into a bounded buffer. */
export default function TextureStudy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    canvas.width = 1100;
    canvas.height = 260;
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < canvas.height; y += 5) {
      for (let x = 0; x < canvas.width; x += 5) {
        const u = x / canvas.width;
        const v = y / canvas.height;
        const curve = .5 + .19 * Math.sin(u * 8) + .08 * Math.sin(u * 17);
        const envelope = Math.exp(-((v - curve) ** 2) / .025);
        const wave = .5 + .5 * Math.sin(u * 22 + v * 9);
        const fade = Math.sin(u * Math.PI) ** 2;
        const alpha = envelope * wave * fade * .95;
        if (alpha < .015) continue;
        ctx.fillStyle = `rgba(94,234,212,${alpha})`;
        ctx.fillRect(x, y, 2, 2);
      }
    }
  }, []);

  return <div className="texture-study" aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
