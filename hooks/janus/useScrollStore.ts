import { useEffect, useState } from 'react';

export interface ScrollStore {
  progress: number; // 0 to 1
  sectionProgress: number[]; // 0 to 1 for each of the 6 sections
  activeSection: number; // 0 to 5
  mouse: { x: number; y: number };
}

// Global mutable store for 60fps WebGL updates (no React re-renders on scroll)
export const scrollStore: ScrollStore = {
  progress: 0,
  sectionProgress: [0, 0, 0, 0, 0, 0],
  activeSection: 0,
  mouse: { x: 0, y: 0 },
};

// Subscriptions for React UI components (only trigger when activeSection changes)
const activeSectionListeners = new Set<(section: number) => void>();

export function updateActiveSection(section: number) {
  if (scrollStore.activeSection !== section) {
    scrollStore.activeSection = section;
    activeSectionListeners.forEach(listener => listener(section));
  }
}

export function useActiveSection() {
  const [active, setActive] = useState(scrollStore.activeSection);

  useEffect(() => {
    const handleActiveChange = (section: number) => {
      setActive(section);
    };
    activeSectionListeners.add(handleActiveChange);
    return () => {
      activeSectionListeners.delete(handleActiveChange);
    };
  }, []);

  return active;
}
