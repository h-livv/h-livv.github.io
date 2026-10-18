type PlateKind = 'lattice' | 'fourier' | 'curve' | 'attention';

/** Decorative mathematical studies, not plots of experimental results. */
export default function ResearchPlate({ kind, className = '' }: { kind: PlateKind; className?: string }) {
  const marks = [];
  for (let row = 0; row < 48; row++) {
    for (let col = 0; col < 72; col++) {
      const x = (col - 36) / 18;
      const y = (row - 24) / 12;
      let value = 0;
      if (kind === 'lattice') {
        value = Math.exp(-.48 * (x * x + y * y)) * Math.abs(Math.cos(x * 4 + y * 2) * Math.sin(y * 4 - x));
      } else if (kind === 'fourier') {
        value = Math.pow((Math.cos(x * 5 + y * 3) + Math.cos(y * 6 - x * 2) + 2) / 4, 3) * Math.exp(-.16 * (x * x + y * y));
      } else if (kind === 'curve') {
        const residual = y * y - x * x * x + x;
        value = Math.exp(-Math.abs(residual) * 4) + .12 * Math.exp(-Math.abs(residual));
      } else {
        const a = col / 72, b = row / 48;
        value = b < a ? 0 : Math.exp(-Math.abs(a - b) * 8) * (.4 + .6 * Math.pow(Math.sin(col * .7 + row * .3), 2));
      }
      if (value < .055) continue;
      marks.push(<circle key={`${row}-${col}`} cx={col * 8 + 12} cy={row * 8 + 12} r={.6 + Math.min(1, value) * 1.8} opacity={.15 + Math.min(1, value) * .85} />);
    }
  }
  return (
    <div className={`research-plate plate-${kind} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 592 400" fill="currentColor" preserveAspectRatio="xMidYMid slice">
        {marks}
      </svg>
    </div>
  );
}
