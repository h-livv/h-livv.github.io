import AsciiDivider from './AsciiDivider';
import { socials } from '../data/socials';
import SectionKicker from './SectionKicker';

export default function Contact() {
  return (
    <section id="contact" className="contact-section page-section px-6 md:px-12 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <AsciiDivider />
        <div className="contact-grid">
          <div>
            <SectionKicker>Get in touch</SectionKicker>
            <h2 className="contact-title mt-8">Contact<span className="text-accent">.</span></h2>
            <div className="contact-links mt-12">
              {socials.map((social, index) => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="contact-link group">
                  <span className="font-mono text-[10px] text-secondary" aria-hidden="true">0{index + 1} /</span>
                  <span>{social.name}</span><span className="ml-auto text-accent" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
