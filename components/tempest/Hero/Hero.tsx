'use client';

import { motion } from 'framer-motion';
import { BookOpen, FileText } from 'lucide-react';
import Link from 'next/link';


export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between px-6 py-12 md:px-12 md:py-20 overflow-hidden select-none">


      <div className="relative z-10 max-w-5xl my-auto flex flex-col items-start pt-20 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-[0.95] text-white max-w-4xl">
            Engineering numerical models for partial differential equations.
          </h1>

          <p className="text-neutral-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
            A computational framework for numerical simulation, scientific
            validation, and operator learning.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-4 font-mono text-xs"
        >
          <Link
            href="/blog/tempest"
            className="px-6 py-3 border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 rounded transition-colors text-slate-200 hover:text-white flex items-center gap-2"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Notes</span>
          </Link>
          <Link
            href="https://github.com/h-livv/tempest"
            target="_blank"
            className="px-6 py-3 border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 rounded transition-colors text-slate-200 hover:text-white flex items-center gap-2"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>GitHub</span>
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
