import type { ReactNode } from 'react';

/** Shared section label, visible immediately as it enters the page. */
export default function SectionKicker({
  children,
  tone = 'quiet',
  as: Tag = 'h2',
}: {
  children: ReactNode;
  tone?: 'current' | 'quiet';
  as?: 'h1' | 'h2' | 'h3';
}) {
  const toneClass = tone === 'current' ? 'text-accent' : 'text-secondary';

  return (
    <Tag className={`text-[13px] font-mono uppercase tracking-[0.2em] ${toneClass} flex items-baseline gap-3`}>
      <span className="inline-flex shrink-0 text-accent/40" aria-hidden="true">
        ────
      </span>
      {children}
    </Tag>
  );
}
