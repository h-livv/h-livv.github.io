export default function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto flex items-center justify-start text-xs text-secondary">
        <p>© {new Date().getFullYear()} HARLIV. All rights reserved.</p>
      </div>
    </footer>
  );
}
