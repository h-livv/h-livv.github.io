'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

/**
 * Bayer 8×8 ordered dithering threshold matrix, normalized to [0, 1].
 */
const BAYER_8x8 = [
  [0 / 64, 48 / 64, 12 / 64, 60 / 64, 3 / 64, 51 / 64, 15 / 64, 63 / 64],
  [32 / 64, 16 / 64, 44 / 64, 28 / 64, 35 / 64, 19 / 64, 47 / 64, 31 / 64],
  [8 / 64, 56 / 64, 4 / 64, 52 / 64, 11 / 64, 59 / 64, 7 / 64, 55 / 64],
  [40 / 64, 24 / 64, 36 / 64, 20 / 64, 43 / 64, 27 / 64, 39 / 64, 23 / 64],
  [2 / 64, 50 / 64, 14 / 64, 62 / 64, 1 / 64, 49 / 64, 13 / 64, 61 / 64],
  [34 / 64, 18 / 64, 46 / 64, 30 / 64, 33 / 64, 17 / 64, 45 / 64, 29 / 64],
  [10 / 64, 58 / 64, 6 / 64, 54 / 64, 9 / 64, 57 / 64, 5 / 64, 53 / 64],
  [42 / 64, 26 / 64, 38 / 64, 22 / 64, 41 / 64, 25 / 64, 37 / 64, 21 / 64],
];

/** Parse a hex color string (#RRGGBB) to [r, g, b]. */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

interface DitheredImageProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  ditherColor?: string;
}

/** Ordered two-ink print. The real image remains the accessible fallback. */
export default function DitheredImage({
  src, alt, sizes, className = '', ditherColor = '#5EEAD4',
}: DitheredImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const applyDither = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!container || !canvas || !img?.complete || !img.naturalWidth) return;
    // Work at half resolution: visible print dots, bounded pixel processing.
    const w = Math.min(800, Math.ceil(container.clientWidth / 2));
    const h = Math.ceil(w * container.clientHeight / container.clientWidth);
    if (!w || !h) return;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    try {
      const pixels = ctx.getImageData(0, 0, w, h);
      const ink = hexToRgb(ditherColor);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const luminance = (0.299 * pixels.data[i] + 0.587 * pixels.data[i + 1] + 0.114 * pixels.data[i + 2]) / 255;
          const lit = Math.pow(luminance, 0.85) > BAYER_8x8[y & 7][x & 7] + 0.5 / 64;
          for (let channel = 0; channel < 3; channel++) {
            pixels.data[i + channel] = lit ? ink[channel] : 8;
          }
          pixels.data[i + 3] = 255;
        }
      }
      ctx.putImageData(pixels, 0, 0);
      canvas.dataset.ready = 'true';
    } catch {
      // A cross-origin image may forbid pixel reads. Keep the real image visible.
      delete canvas.dataset.ready;
    }
  }, [ditherColor]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(applyDither);
    observer.observe(container);
    return () => observer.disconnect();
  }, [applyDither]);

  return (
    <div ref={containerRef} className={`dither-image relative overflow-hidden ${className}`}>
      <Image ref={imageRef} src={src} alt={alt} fill sizes={sizes}
        onLoad={applyDither} className="object-cover" />
      <canvas ref={canvasRef} aria-hidden="true" className="dither-layer absolute inset-0 w-full h-full" />
      <span aria-hidden="true" className="print-caption">[ hover / decode ]</span>
    </div>
  );
}
