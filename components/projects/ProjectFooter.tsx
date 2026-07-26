import React from 'react';
import Link from 'next/link';

export default function ProjectFooter() {
  return (
    <footer className="w-full border-t border-white/[0.04] py-8 px-6 md:px-12 mt-12 bg-black relative z-10">
      <div className="max-w-5xl mx-auto flex items-center justify-between font-mono text-xs text-neutral-500 uppercase tracking-wider">
        <span>Harliv Singh</span>
        <Link
          href="/#projects"
          className="hover:text-white transition-colors"
        >
          Back to Portfolio
        </Link>
      </div>
    </footer>
  );
}
