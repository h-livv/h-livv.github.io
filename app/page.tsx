import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProjectSection from '../components/ProjectSection';
import BlogSection from '../components/BlogSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 relative z-10 bg-transparent">
        <Hero />
        <ProjectSection />
        <BlogSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}