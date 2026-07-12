import { useEffect, useState } from 'react';

export interface TempestScrollStore {
  progress: number;
  mouse: { x: number; y: number };
}

export const tempestScrollStore: TempestScrollStore = {
  progress: 0,
  mouse: { x: 0.5, y: 0.5 },
};

const progressListeners = new Set<(p: number) => void>();

export function updateScrollProgress(progress: number) {
  tempestScrollStore.progress = progress;
  progressListeners.forEach((fn) => fn(progress));
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(tempestScrollStore.progress);

  useEffect(() => {
    progressListeners.add(setProgress);
    return () => {
      progressListeners.delete(setProgress);
    };
  }, []);

  return progress;
}
