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
      <main className="flex-1">
        <Hero />
        <ProjectSection />
        <BlogSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}