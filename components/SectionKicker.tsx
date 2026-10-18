'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * SectionKicker
 *
 * Monospaced uppercase label with an animated ASCII dash prefix.
 * The dashes stagger in character-by-character on scroll.
 */
const DASHES = '────';

export default function SectionKicker({
  children,
  tone = 'quiet',
  as: Tag = 'h2',
}: {
  children: ReactNode;
  tone?: 'current' | 'quiet';
  as?: 'h1' | 'h2' | 'h3';
}) {
  const reducedMotion = useReducedMotion();
  const toneClass = tone === 'current' ? 'text-accent' : 'text-secondary';

  return (
    <Tag className={`text-[13px] font-mono uppercase tracking-[0.2em] ${toneClass} flex items-baseline gap-3`}>
      <span className="inline-flex shrink-0 text-accent/40" aria-hidden="true">
        {Array.from(DASHES).map((dash, index) => (
          <motion.span
            key={index}
            initial={reducedMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: .25, delay: reducedMotion ? 0 : index * .08 }}
          >{dash}</motion.span>
        ))}
      </span>
      {children}
    </Tag>
  );
}
