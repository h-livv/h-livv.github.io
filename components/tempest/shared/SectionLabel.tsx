'use client';

interface SectionLabelProps {
  number: string;
  title: string;
}

export default function SectionLabel({ number, title }: SectionLabelProps) {
  return (
    <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
      {number} // {title}
    </div>
  );
}
