'use client';

import { useEffect, useRef } from 'react';

const CHARS = ' .·:-=+*#%@';

/** Terminal-rendered fields: a hero wavefront or flowing lower-section contours. */
export default function AsciiBackground({ variant = 'hero', phase = 0 }: {
  variant?: 'hero' | 'flow';
  phase?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0, height = 0, frame = 0, last = 0;
    let visible = true;
    let disposed = false;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const cell = variant === 'hero' ? 14 : 16;
    const draw = (now: number) => {
      frame = 0;
      if (disposed || !visible || document.hidden || !width || !height) return;
      if (now - last < 50 && !motion.matches) {
        frame = requestAnimationFrame(draw);
        return;
      }
      last = now;
      const time = (motion.matches ? 0 : now * .00012) + phase;
      pointer.x += (pointer.tx - pointer.x) * .08;
      pointer.y += (pointer.ty - pointer.y) * .08;
      ctx.clearRect(0, 0, width, height);
      const scroll = variant === 'hero' ? Math.min(1, Math.max(0, -canvas.getBoundingClientRect().top / height)) : 0;
      ctx.font = `11px ${getComputedStyle(canvas).fontFamily}`;
      ctx.textAlign = 'center';
      // The lower canvas spans the document; only animate rows near the viewport.
      // Reduced motion draws the full static field, so scrolling needs no redraw.
      const top = canvas.getBoundingClientRect().top;
      const crop = variant === 'flow' && !motion.matches;
      const firstRow = crop ? Math.max(0, Math.floor((-top - cell) / cell)) : 0;
      const lastRow = crop ? Math.min(Math.ceil(height / cell), Math.ceil((window.innerHeight - top + cell) / cell)) : Math.ceil(height / cell);
      for (let r = firstRow; r < lastRow; r++) {
        const rowFade = Math.max(0, 1 - scroll * 2 + r * cell / height * .5);
        for (let c = 0; c < width / cell; c++) {
          const x = (c * cell - width * .68) / Math.min(width, 850) - pointer.x;
          const y = (r * cell - height * .48) / Math.min(width, 850) - pointer.y;
          const radius = Math.hypot(x, y * 1.2);
          const envelope = Math.exp(-Math.pow((radius - .27) / .19, 2));
          const wave = (Math.sin(radius * 72 - time * 3 + Math.sin(Math.atan2(y, x) * 3 + time)) + 1) / 2;
          const nx = c * cell / width;
          const ny = r * cell / height;
          const contour = .5 + .5 * Math.sin(nx * 12 + ny * 7 + time * .5 + 1.8 * Math.sin(ny * 5 - time * .35));
          const density = variant === 'hero'
            ? envelope * (.25 + wave * .75)
            : Math.pow(contour, 4) * (.35 + .65 * Math.sin(ny * Math.PI) ** 2);
          const glyph = CHARS[Math.min(CHARS.length - 1, Math.floor(density * CHARS.length))];
          if (glyph === ' ') continue;
          // Dim the reading column while retaining the field's silhouette.
          const readingMask = variant === 'hero'
            ? .25 + .75 * Math.min(1, Math.hypot((nx - .5) * 3, (ny - .45) * 3))
            : .25 + .75 * nx ** 2;
          ctx.fillStyle = `rgba(94,234,212,${density * (variant === 'hero' ? .25 : .18) * rowFade * readingMask})`;
          ctx.fillText(glyph, c * cell, r * cell);
        }
      }
      if (!motion.matches) frame = requestAnimationFrame(draw);
    };
    const start = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const dpr = variant === 'flow' ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      start();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(frame);
    });
    observer.observe(canvas);
    const onMove = (event: PointerEvent) => {
      if (variant === 'flow' || motion.matches || event.pointerType === 'touch') return;
      pointer.tx = (event.clientX / window.innerWidth - .5) * .035;
      pointer.ty = (event.clientY / window.innerHeight - .5) * .035;
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    document.fonts.ready.then(() => { if (!disposed) resize(); });
    document.addEventListener('visibilitychange', start);
    window.addEventListener('pointermove', onMove, { passive: true });
    motion.addEventListener('change', start);
    resize();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', start);
      window.removeEventListener('pointermove', onMove);
      motion.removeEventListener('change', start);
    };
  }, [variant, phase]);

  return <canvas ref={canvasRef} className={`${variant === 'hero' ? 'hero-field' : 'flow-field'} font-mono`} aria-hidden="true" />;
}
