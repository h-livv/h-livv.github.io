'use client';

import { ReactNode } from 'react';

interface ImplementationCardProps {
  title: string;
  accent?: 'cyan' | 'green' | 'teal' | 'purple';
  children: ReactNode;
  className?: string;
}

const accentStyles = {
  cyan: {
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/5',
    title: 'text-cyan-400',
    divider: 'border-cyan-500/10',
  },
  green: {
    border: 'border-green-500/20',
    bg: 'bg-green-500/5',
    title: 'text-green-400',
    divider: 'border-green-500/10',
  },
  teal: {
    border: 'border-teal-500/20',
    bg: 'bg-teal-500/5',
    title: 'text-teal-400',
    divider: 'border-teal-500/10',
  },
  purple: {
    border: 'border-purple-500/20',
    bg: 'bg-purple-500/5',
    title: 'text-purple-400',
    divider: 'border-purple-500/10',
  },
};

export default function ImplementationCard({
  title,
  accent = 'cyan',
  children,
  className = '',
}: ImplementationCardProps) {
  const s = accentStyles[accent];

  return (
    <div
      className={`border ${s.border} ${s.bg} p-5 rounded font-mono text-xs flex flex-col gap-4 ${className}`}
    >
      <span
        className={`text-white border-b ${s.divider} pb-2 uppercase tracking-wider font-semibold ${s.title}`}
      >
        {title}
      </span>
      {children}
    </div>
  );
}
