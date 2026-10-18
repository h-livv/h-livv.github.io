import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

import ProjectSection from '../components/ProjectSection';
import BlogSection from '../components/BlogSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ExperimentsSection from '../components/ExperimentsSection';
import AsciiBackground from '../components/AsciiBackground';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 relative z-10 bg-transparent">
        <Hero />

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
