import TextureStudy from './TextureStudy';

export default function Hero() {
  return (
    <section className="folio-hero">
      <div className="hero-topline"><span>Mathematics student / BITS Goa</span></div>
      <div className="hero-name"><h1>Harliv<span> Singh</span><span className="name-period">.</span></h1></div>
      <TextureStudy />
      <div className="hero-bottomline">
        <p>Mathematics. Deep learning.<br /><span>Quantum computing.</span></p>
        <p className="hero-description">Exploring interesting systems<br />from first principles.</p>
        <a href="#work" className="hero-explore">Selected work <span aria-hidden="true">↘</span></a>
      </div>
    </section>
  );
}
