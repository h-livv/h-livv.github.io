"use client";
import * as motion from "framer-motion/client";
import Link from 'next/link';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 inset-x-0 z-50 pt-8 pb-4 px-6 md:px-12 pointer-events-none bg-black/85 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        <Link href="/" className="text-primary font-mono text-[11px] tracking-[0.22em] uppercase hover:opacity-80 transition-opacity">
          Harliv
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/#work" className="text-[11px] font-mono tracking-[0.22em] uppercase text-secondary hover:text-primary transition-colors">Work</Link>
          <Link href="/#blog" className="text-[11px] font-mono tracking-[0.22em] uppercase text-secondary hover:text-primary transition-colors">Writing</Link>
          <Link href="/#contact" className="text-[11px] font-mono tracking-[0.22em] uppercase text-secondary hover:text-primary transition-colors">Contact</Link>
        </div>
      </div>
    </motion.nav>
  );
}
