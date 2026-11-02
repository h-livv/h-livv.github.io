import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

import ProjectSection from '../components/ProjectSection';
import BlogSection from '../components/BlogSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ExperimentsSection from '../components/ExperimentsSection';
import AsciiBackground from '../components/AsciiBackground';
import { socials } from '../data/socials';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 relative z-10 bg-transparent">
        <Hero />

        <section id="about" className="page-section px-6 md:px-12 scroll-mt-24">
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-[0.7fr_1.3fr]">
            <h2 className="font-serif text-4xl md:text-5xl">About<span className="text-accent">.</span></h2>
            <div className="max-w-2xl">
              <p className="text-sm md:text-base text-secondary leading-relaxed">
                I’m Harliv Singh, a mathematics student at BITS Pilani, Goa. My interests span computational mathematics and science, quantum computing, and artificial intelligence. I build and study mathematical and computational models to understand how complex systems work, with a focus on careful implementation and first-principles reasoning.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-[0.12em]">
                {socials.filter(({ name }) => name !== 'Email').map(({ name, href }) => (
                  <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">{name} ↗</a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ProjectSection />
        <div className="lower-page">
          <div className="lower-page-backdrop" aria-hidden="true">
            <AsciiBackground variant="flow" />
          </div>
          <ExperimentsSection />
          <BlogSection />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
