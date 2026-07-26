import { socials } from '../data/socials';
import * as motion from "framer-motion/client";

export default function Contact() {
  return (
    <section id="contact" className="py-12 px-6 md:px-12 border-t border-white/[0.05] scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-serif font-normal tracking-tight text-primary mb-6">Contact</h2>
          
          <div className="flex flex-col sm:flex-row gap-6">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-secondary hover:text-white transition-colors duration-200 group"
                >
                  <Icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                  <span className="font-medium text-sm">{social.name}</span>
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
