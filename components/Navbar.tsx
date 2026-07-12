import * as motion from "framer-motion/client";
import Link from 'next/link';

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
            <a href="#projects" className="text-[12px] font-mono tracking-wider uppercase text-secondary hover:text-primary transition-colors">Projects</a>
            <a href="#blog" className="text-[12px] font-mono tracking-wider uppercase text-secondary hover:text-primary transition-colors">Writing</a>
            <a href="#contact" className="text-[12px] font-mono tracking-wider uppercase text-secondary hover:text-primary transition-colors">Contact</a>
          </div>
        </div>

        <div className="w-4 h-4 rounded-full border border-secondary/50 flex items-center justify-center text-secondary hover:text-primary hover:border-primary transition-colors cursor-pointer">
          <div className="w-2 h-2 rounded-full bg-current opacity-80" />
        </div>
      </div>
    </motion.nav>
  );
}
