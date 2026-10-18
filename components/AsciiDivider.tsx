/** A clipped line of type, long enough to span even wide displays. */
export default function AsciiDivider() {
  return (
    <div className="ascii-divider" aria-hidden="true">
      {'─·'.repeat(240)}
    </div>
  );
}
