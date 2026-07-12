'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function MathRenderer() {
  const pathname = usePathname();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const renderMath = () => {
      if (typeof window !== 'undefined' && (window as any).renderMathInElement) {
        (window as any).renderMathInElement(document.body, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true }
          ],
          throwOnError: false
        });
        return true; // success
      }
      return false; // not ready yet
    };

    // Try immediately
    if (!renderMath()) {
      // Poll every 50ms until KaTeX script is ready in window
      intervalId = setInterval(() => {
        if (renderMath()) {
          clearInterval(intervalId);
        }
      }, 50);
    }

    // Secondary trigger after a short delay for safety with client-side hydration
    const timer = setTimeout(renderMath, 200);

    return () => {
      if (intervalId) clearInterval(intervalId);
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
