export default function Hero() {
  return (
    <section className="folio-hero">
      <div className="hero-masthead">
        <p className="hero-topline">Mathematics student / BITS Goa</p>
        <h1>Harliv<span> Singh</span><span className="name-period">.</span></h1>
        <p className="hero-subjects">Mathematics. Deep learning.<br /><span>Quantum computing.</span></p>
      </div>
      <div className="hero-footnote">
        <p className="hero-description">Exploring interesting systems<br />from first principles.</p>
        <a href="#work" className="hero-explore">
          Selected work <span aria-hidden="true">↘</span>
        </a>
      </div>
    </section>
  );
}
