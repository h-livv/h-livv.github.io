'use client';

import { useEffect, useRef } from 'react';

const HARMONICS = [
  { freq: 1, amp: 32 },
  { freq: 2, amp: 20 },
  { freq: 3, amp: 12 },
  { freq: 4, amp: 7 },
  { freq: 5, amp: 4 },
  { freq: 6, amp: 2.5 },
];

const COLUMNS = [
  { label: 'Continuous Field', sublabel: 'u(x, t)', color: '#22d3ee', xStart: 0.02, xEnd: 0.3 },
  { label: 'Frequency Operator', sublabel: 'G(û)', color: '#c084fc', xStart: 0.34, xEnd: 0.62 },
  { label: 'Predicted Field', sublabel: 'û(x, t)', color: '#67e8f9', xStart: 0.66, xEnd: 0.98 },
] as const;

export default function FourierOperatorVisual() {
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
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spatialValue = (x: number, t: number) => {
      let sum = 0;
      for (let i = 0; i < HARMONICS.length; i++) {
        const h = HARMONICS[i];
        sum += h.amp * Math.sin(x * Math.PI * 2 * h.freq + t * 0.4);
      }
      return sum;
    };

    const render = () => {
      if (!isVisibleRef.current) {
        animationId = requestAnimationFrame(render);
        return;
      }
      time += 0.016;
      
      const CYCLE = 10.0;
      const tCycle = time % CYCLE;

      // Narrative logic based on time cycle
      // 0.0 - 1.5: Field only
      // 1.5 - 3.0: FFT & Samples travelling
      // 3.0 - 5.0: Frequency lattice illuminates
      // 5.0 - 7.0: Operator learning (deformations)
      // 7.0 - 8.5: Inverse FFT travelling
      // 8.5 - 10.0: Reconstruct and evolve prediction
      
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const labelY = height * 0.1;
      const waveY = height * 0.52;
      const baseY = height * 0.78;

      // Column dividers
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      [0.32, 0.64].forEach((frac) => {
        const x = width * frac;
        ctx.beginPath();
        ctx.moveTo(x, height * 0.06);
        ctx.lineTo(x, height * 0.92);
        ctx.stroke();
      });

      // Column labels
      COLUMNS.forEach((col, idx) => {
        let alpha = 1;
        if (idx === 1 && tCycle < 1.5) alpha = 0.2; // Dim center initially
        if (idx === 2 && tCycle < 7.0) alpha = 0.2; // Dim right initially

        const centerX = width * ((col.xStart + col.xEnd) / 2);
        ctx.textAlign = 'center';
        ctx.font = 'bold 13px monospace';
        ctx.fillStyle = col.color;
        ctx.globalAlpha = alpha;
        ctx.fillText(col.label, centerX, labelY);
        ctx.font = '11px monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillText(col.sublabel, centerX, labelY + 16);
        ctx.globalAlpha = 1.0;
      });

      // Baseline
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, baseY);
      ctx.lineTo(width, baseY);
      ctx.stroke();

      // 1. Actual wave (left column)
      const spatialX0 = width * COLUMNS[0].xStart;
      const spatialX1 = width * COLUMNS[0].xEnd;
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const t = i / 200;
        const x = spatialX0 + t * (spatialX1 - spatialX0);
        const y = waveY - spatialValue(t, time) * 0.85;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = 'rgba(34, 211, 238, 0.18)';
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const t = i / 200;
        const x = spatialX0 + t * (spatialX1 - spatialX0);
        const y = waveY - spatialValue(t, time) * 0.85;
        if (i === 0) ctx.moveTo(x, baseY);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(spatialX1, baseY);
      ctx.closePath();
      ctx.fill();

      // 2. FFT Samples Travelling (1.5s to 3.5s)
      const fourierCenterY = waveY - 10;
      const fourierX0 = width * COLUMNS[1].xStart;
      const barSpacing = (width * (COLUMNS[1].xEnd - COLUMNS[1].xStart)) / HARMONICS.length;

      if (tCycle > 1.5 && tCycle < 4.0) {
        const progress = Math.min(1, (tCycle - 1.5) / 1.5);
        HARMONICS.forEach((h, idx) => {
          const startX = spatialX1;
          const startY = waveY - h.amp * 0.85; // rough origin
          const targetX = fourierX0 + idx * barSpacing + barSpacing * 0.5;
          const targetY = baseY - h.amp * 2;
          
          const px = startX + (targetX - startX) * progress;
          const py = startY + (targetY - startY) * progress + Math.sin(progress * Math.PI) * -30; // arc
          
          ctx.fillStyle = '#c084fc'; // Purple
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = `rgba(192, 132, 252, ${0.4 * (1 - progress)})`;
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(px, py);
          ctx.stroke();
        });
      }

      // 3 & 4. Fourier space (center column)
      if (tCycle > 3.0 && tCycle < 8.0) {
        const buildUp = Math.min(1, (tCycle - 3.0) / 0.5);
        const learning = tCycle > 5.0 && tCycle < 7.0 ? (tCycle - 5.0) / 2.0 : 0;
        const decay = tCycle > 7.5 ? 1 - (tCycle - 7.5) / 0.5 : 1;
        
        HARMONICS.forEach((h, idx) => {
          const x = fourierX0 + idx * barSpacing + barSpacing * 0.5;
          const barH = h.amp * 2 * buildUp * decay;
          
          // Operator acting: Deform and glow
          const morph = learning > 0 ? Math.sin(time * 2.0 + idx) * 8 * Math.sin(learning * Math.PI) : 0;
          const color = learning > 0 ? '#d8b4fe' : '#a855f7'; // Purple glow

          ctx.strokeStyle = color;
          ctx.lineWidth = 4 + (learning > 0 ? 2 * Math.sin(learning * Math.PI) : 0);
          ctx.beginPath();
          ctx.moveTo(x, baseY);
          ctx.lineTo(x + morph, baseY - barH);
          ctx.stroke();

          ctx.fillStyle = `rgba(255, 255, 255, ${0.5 * buildUp * decay})`;
          ctx.font = '11px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(`k=${h.freq}`, x, baseY + 18);
        });

        // Network lattice overlay during learning
        if (learning > 0) {
          ctx.strokeStyle = `rgba(192, 132, 252, ${0.2 * Math.sin(learning * Math.PI)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          for(let i=0; i<HARMONICS.length-1; i++) {
             const x1 = fourierX0 + i * barSpacing + barSpacing * 0.5;
             const y1 = baseY - HARMONICS[i].amp * 2;
             const x2 = fourierX0 + (i+1) * barSpacing + barSpacing * 0.5;
             const y2 = baseY - HARMONICS[i+1].amp * 2;
             ctx.moveTo(x1, y1);
             ctx.lineTo(x2, y2);
          }
          ctx.stroke();
        }
      }

      // 5. Inverse FFT Travelling (7.0 to 8.5)
      const predX0 = width * COLUMNS[2].xStart;
      const predX1 = width * COLUMNS[2].xEnd;
      
      if (tCycle > 7.0 && tCycle < 9.0) {
        const progress = Math.min(1, (tCycle - 7.0) / 1.5);
        HARMONICS.forEach((h, idx) => {
          const startX = fourierX0 + idx * barSpacing + barSpacing * 0.5;
          const startY = baseY - h.amp * 2;
          const targetX = predX0;
          const targetY = waveY;
          
          const px = startX + (targetX - startX) * progress;
          const py = startY + (targetY - startY) * progress + Math.sin(progress * Math.PI) * -30;
          
          ctx.fillStyle = '#67e8f9'; // Bright cyan
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // 6. Predicted wave (right column)
      if (tCycle > 8.5 || tCycle < 1.0) {
        // Carry over slightly into next cycle before resetting
        let alpha = 1;
        if (tCycle > 8.5) {
          alpha = Math.min(1, (tCycle - 8.5) / 0.5);
        } else if (tCycle < 1.0) {
          alpha = 1 - tCycle;
        }

        ctx.strokeStyle = `rgba(103, 232, 249, ${alpha})`;
        ctx.lineWidth = 2.5;
        
        ctx.beginPath();
        for (let i = 0; i <= 200; i++) {
          const t = i / 200;
          const x = predX0 + t * (predX1 - predX0);
          const y = waveY - spatialValue(t, time) * 0.85;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.fillStyle = `rgba(103, 232, 249, ${0.15 * alpha})`;
        ctx.beginPath();
        for (let i = 0; i <= 200; i++) {
          const t = i / 200;
          const x = predX0 + t * (predX1 - predX0);
          const y = waveY - spatialValue(t, time) * 0.85;
          if (i === 0) ctx.moveTo(x, baseY);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(predX1, baseY);
        ctx.closePath();
        ctx.fill();
      }



      animationId = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full aspect-[16/9] max-w-3xl rounded border border-white/10 overflow-hidden bg-black relative">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}
