"use client";
import * as motion from "framer-motion/client";
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 inset-x-0 z-50 pt-8 px-6 md:px-12 pointer-events-none"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-primary font-mono tracking-tight text-[14px] hover:opacity-80 transition-opacity">
            HARLIV
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#work" className="text-[12px] font-mono tracking-wider uppercase text-secondary hover:text-primary transition-colors">Work</Link>
            <Link href="/#blog" className="text-[12px] font-mono tracking-wider uppercase text-secondary hover:text-primary transition-colors">Writing</Link>
            <Link href="/#contact" className="text-[12px] font-mono tracking-wider uppercase text-secondary hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
