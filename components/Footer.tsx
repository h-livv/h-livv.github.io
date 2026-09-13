export default function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-secondary">
          © {new Date().getFullYear()} Harliv Singh
        </p>
      </div>
    </footer>
  );
}
