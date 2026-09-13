import { socials } from '../data/socials';
import * as motion from 'framer-motion/client';

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 border-t border-white/[0.05] scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-normal text-primary leading-[1.1]">
            Contact
          </h2>
          <div className="mt-10 border-b border-white/[0.06]">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block group focus-visible:outline-none focus-visible:bg-white/[0.02]"
              >
                <div className="flex items-center justify-between py-5 md:py-6 border-t border-white/[0.06]">
                  <span className="text-sm text-primary group-hover:text-white transition-colors duration-200">
                    {social.name}
                  </span>
                  <span
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary/45 group-hover:text-primary transition-colors duration-200"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
