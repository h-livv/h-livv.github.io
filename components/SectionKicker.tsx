import type { ReactNode } from 'react';

export default function SectionKicker({
  children,
  tone = 'quiet',
  as: Tag = 'h2',
}: {
  children: ReactNode;
  tone?: 'current' | 'quiet';
  as?: 'h1' | 'h2';
}) {
  const toneClass = tone === 'current' ? 'text-accent' : 'text-secondary';

  return (
    <Tag className={`text-[13px] font-mono uppercase tracking-[0.2em] ${toneClass}`}>
      {children}
    </Tag>
  );
}
