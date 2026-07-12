import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { marked } from 'marked';
import type { Metadata } from 'next';
import MathRenderer from '@/components/janus/MathRenderer';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

// Map path slugs to content markdown files
const slugToFileMap: Record<string, string> = {
  '': '', // Special case: documentation hub landing page
  'physics': 'physics/index.md', // Physics overview is now here
  'physics/core': 'physics/core.md',
  'physics/production': 'physics/interaction.md',
  'physics/transport': 'physics/transport.md',
  'physics/future': 'physics/future.md',
  'validation': 'validation/index.md',
  'validation/interaction': 'validation/interaction/index.md',
  'validation/interaction/architecture': 'validation/interaction/architecture.md',
  'validation/interaction/invariants': 'validation/interaction/invariants.md',
  'validation/interaction/phenomenology': 'validation/interaction/phenomenology.md',
  'validation/transport': 'validation/transport/index.md',
  'validation/transport/integrator': 'validation/transport/integrator.md',
  'validation/transport/composite': 'validation/transport/composite.md',
  'validation/transport/beam-dynamics': 'validation/transport/beam-dynamics.md',
  'validation/transport/optics': 'validation/transport/optics.md',
  'validation/transport/summary': 'validation/transport/summary.md',
  'roadmap': 'roadmap.md',
  'acknowledgements': 'acknowledgements.md',
};

export async function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ['physics'] },
    { slug: ['physics', 'core'] },
    { slug: ['physics', 'production'] },
    { slug: ['physics', 'transport'] },
    { slug: ['physics', 'future'] },
    { slug: ['validation'] },
    { slug: ['validation', 'interaction'] },
    { slug: ['validation', 'interaction', 'architecture'] },
    { slug: ['validation', 'interaction', 'invariants'] },
    { slug: ['validation', 'interaction', 'phenomenology'] },
    { slug: ['validation', 'transport'] },
    { slug: ['validation', 'transport', 'integrator'] },
    { slug: ['validation', 'transport', 'composite'] },
    { slug: ['validation', 'transport', 'beam-dynamics'] },
    { slug: ['validation', 'transport', 'optics'] },
    { slug: ['validation', 'transport', 'summary'] },
    { slug: ['roadmap'] },
    { slug: ['acknowledgements'] },
  ];
}

interface NavItem {
  title: string;
  href?: string;
  slug?: string;
  items?: NavItem[];
}

// Side menu configuration - Roadmap placed above Physics and Validation
const navTree: NavItem[] = [
  {
    title: 'Overview',
    href: '/projects/janus/docs',
    slug: '',
  },
  {
    title: 'Roadmap',
    href: '/projects/janus/docs/roadmap',
    slug: 'roadmap',
  },
  {
    title: 'Physics',
    items: [
      { title: 'Overview', href: '/projects/janus/docs/physics', slug: 'physics' },
      { title: 'Core Physics', href: '/projects/janus/docs/physics/core', slug: 'physics/core' },
      { title: 'Production Physics', href: '/projects/janus/docs/physics/production', slug: 'physics/production' },
      { title: 'Transport Physics', href: '/projects/janus/docs/physics/transport', slug: 'physics/transport' },
      { title: 'Future Extensions', href: '/projects/janus/docs/physics/future', slug: 'physics/future' },
    ],
  },
  {
    title: 'Validation',
    items: [
      { title: 'Overview', href: '/projects/janus/docs/validation', slug: 'validation' },
      {
        title: 'Interaction Validation',
        items: [
          { title: 'Overview', href: '/projects/janus/docs/validation/interaction', slug: 'validation/interaction' },
          { title: 'Extraction Architecture', href: '/projects/janus/docs/validation/interaction/architecture', slug: 'validation/interaction/architecture' },
          { title: 'Invariant Checks', href: '/projects/janus/docs/validation/interaction/invariants', slug: 'validation/interaction/invariants' },
          { title: 'Phenomenological Validation', href: '/projects/janus/docs/validation/interaction/phenomenology', slug: 'validation/interaction/phenomenology' },
        ]
      },
      {
        title: 'Transport Validation',
        items: [
          { title: 'Overview', href: '/projects/janus/docs/validation/transport', slug: 'validation/transport' },
          { title: 'Single-Particle Integrator', href: '/projects/janus/docs/validation/transport/integrator', slug: 'validation/transport/integrator' },
          { title: 'Composite Lattices', href: '/projects/janus/docs/validation/transport/composite', slug: 'validation/transport/composite' },
          { title: 'Beam Dynamics', href: '/projects/janus/docs/validation/transport/beam-dynamics', slug: 'validation/transport/beam-dynamics' },
          { title: 'Linear Optics Benchmarking', href: '/projects/janus/docs/validation/transport/optics', slug: 'validation/transport/optics' },
          { title: 'Conservation & Scope', href: '/projects/janus/docs/validation/transport/summary', slug: 'validation/transport/summary' },
        ]
      }
    ]
  },
  {
    title: 'Acknowledgements',
    href: '/projects/janus/docs/acknowledgements',
    slug: 'acknowledgements',
  }
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const slugKey = slug.join('/');
  
  if (slugKey === '') {
    return {
      title: 'Documentation',
      description: 'Documentation index for the Janus simulation platform, covering accelerator lattices, production cascades, and validation tracks.',
    };
  }

  const contentFile = slugToFileMap[slugKey];
  if (!contentFile) return { title: 'Not Found' };

  const filePath = path.join(process.cwd(), 'content', contentFile);
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const match = fileContent.match(/^#\s+(.+)$/m);
    if (match) {
      return {
        title: match[1].trim(),
        description: `Technical description and equations for Janus antimatter framework component: ${match[1].trim()}`,
      };
    }
  }
  
  const basename = contentFile.split('/').pop()?.replace('.md', '') || '';
  const title = basename.charAt(0).toUpperCase() + basename.slice(1);
  
  return {
    title,
    description: `Technical description and equations for Janus antimatter framework component: ${basename}`,
  };
}

const customStyles = `
  .markdown-content {
    font-family: var(--font-geist-sans), sans-serif;
  }
  .markdown-content h1 {
    font-size: 2rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: 0.75rem;
  }
  .markdown-content h2 {
    font-size: 1.35rem;
    font-weight: 500;
    letter-spacing: -0.01em;
    color: #ffffff;
    margin-top: 2.2rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    padding-bottom: 0.5rem;
  }
  .markdown-content h3 {
    font-size: 1.1rem;
    font-weight: 500;
    color: #ffffff;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }
  .markdown-content p {
    color: #a3a3a3;
    font-weight: 300;
    line-height: 1.7;
    margin-bottom: 1.25rem;
    font-size: 0.925rem;
  }
  .markdown-content ul, .markdown-content ol {
    padding-left: 1.5rem;
    color: #a3a3a3;
    font-weight: 300;
    margin-bottom: 1.25rem;
    font-size: 0.925rem;
  }
  .markdown-content ul {
    list-style-type: disc;
  }
  .markdown-content ol {
    list-style-type: decimal;
  }
  .markdown-content strong {
    font-weight: 600;
    color: #ffffff;
  }
  .markdown-content li {
    margin-bottom: 0.5rem;
  }
  .markdown-content a {
    color: #5EEAD4;
    text-decoration: none;
    transition: text-decoration 0.2s;
  }
  .markdown-content a:hover {
    text-decoration: underline;
  }
  .markdown-content code {
    font-family: var(--font-geist-mono), monospace;
    color: #5EEAD4;
    background-color: rgba(94, 234, 212, 0.05);
    padding: 0.125rem 0.3rem;
    border-radius: 0.25rem;
    font-size: 0.85em;
  }
  .markdown-content pre {
    background-color: #050505;
    border: 1px solid rgba(255, 255, 255, 0.04);
    padding: 1rem;
    border-radius: 0.375rem;
    overflow-x: auto;
    margin-bottom: 1.5rem;
  }
  .markdown-content pre code {
    background-color: transparent;
    padding: 0;
    color: #e5e5e5;
    font-size: 0.85rem;
  }
  .markdown-content hr {
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    margin: 2rem 0;
  }
  .markdown-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 0.825rem;
    text-align: left;
  }
  .markdown-content th {
    color: #ffffff;
    font-weight: 500;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.6rem 0.75rem;
  }
  .markdown-content td {
    color: #a3a3a3;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    padding: 0.6rem 0.75rem;
    font-weight: 300;
  }
  .markdown-content .katex-display {
    margin: 1.5rem 0;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0.5rem 0;
  }
`;

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const slugKey = slug.join('/');

  const isLandingPage = slugKey === '';
  let htmlContent = '';

  if (!isLandingPage) {
    const contentFile = slugToFileMap[slugKey];
    if (!contentFile) {
      notFound();
    }

    const filePath = path.join(process.cwd(), 'content', contentFile);
    if (!fs.existsSync(filePath)) {
      notFound();
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    // Preprocess: Extract LaTeX math blocks to protect them from markdown parsing errors
    const mathBlocks: string[] = [];
    let processedMarkdown = fileContent;

    // 1. Extract block math $$ ... $$
    processedMarkdown = processedMarkdown.replace(/\$\$([\s\S]+?)\$\$/g, (match) => {
      const placeholder = `MATHPEXT${mathBlocks.length}TEMP`;
      mathBlocks.push(match);
      return placeholder;
    });

    // 2. Extract inline math $ ... $
    processedMarkdown = processedMarkdown.replace(/\$([^\$\n]+?)\$/g, (match) => {
      const placeholder = `MATHPEXT${mathBlocks.length}TEMP`;
      mathBlocks.push(match);
      return placeholder;
    });

    // Parse markdown into HTML string
    htmlContent = await marked.parse(processedMarkdown);

    // Restore protected LaTeX math blocks
    for (let i = 0; i < mathBlocks.length; i++) {
      htmlContent = htmlContent.replace(`MATHPEXT${i}TEMP`, mathBlocks[i]);
    }

    // Convert relative validation asset image paths to public URLs
    htmlContent = htmlContent.replace(/src="\.\.\/assets\//g, 'src="/projects/janus/validation/assets/');

    // Convert relative markdown links to Next.js routes
    htmlContent = htmlContent.replace(/href="([^"]+)"/g, (match, p1) => {
      let href = p1;
      const hash = href.includes('#') ? '#' + href.split('#')[1] : '';
      const cleanHref = href.split('#')[0];

      if (cleanHref.endsWith('.md')) {
        if (cleanHref.endsWith('physics/index.md')) {
          href = '/projects/janus/docs/physics' + hash;
        } else if (cleanHref.endsWith('validation/index.md')) {
          href = '/projects/janus/docs/validation' + hash;
        } else if (cleanHref.endsWith('interaction/index.md') || cleanHref.endsWith('interaction/')) {
          href = '/projects/janus/docs/validation/interaction' + hash;
        } else if (cleanHref.endsWith('transport/index.md') || cleanHref.endsWith('transport/')) {
          href = '/projects/janus/docs/validation/transport' + hash;
        } else {
          const basename = cleanHref.split('/').pop()?.replace('.md', '') || '';
          
          const mapping: Record<string, string> = {
            'core': '/projects/janus/docs/physics/core',
            'interaction': '/projects/janus/docs/physics/production',
            'transport': '/projects/janus/docs/physics/transport',
            'future': '/projects/janus/docs/physics/future',
            'architecture': '/projects/janus/docs/validation/interaction/architecture',
            'invariants': '/projects/janus/docs/validation/interaction/invariants',
            'phenomenology': '/projects/janus/docs/validation/interaction/phenomenology',
            'integrator': '/projects/janus/docs/validation/transport/integrator',
            'composite': '/projects/janus/docs/validation/transport/composite',
            'beam-dynamics': '/projects/janus/docs/validation/transport/beam-dynamics',
            'optics': '/projects/janus/docs/validation/transport/optics',
            'summary': '/projects/janus/docs/validation/transport/summary',
            'roadmap': '/projects/janus/docs/roadmap',
            'acknowledgements': '/projects/janus/docs/acknowledgements',
          };
          
          if (mapping[basename]) {
            href = mapping[basename] + hash;
          }
        }
      }
      return `href="${href}"`;
    });
  }

  // Helper to render sidebar items recursively
  const renderSidebarItem = (item: NavItem) => {
    const isHeader = !item.href && item.items;
    const isSelected = item.slug !== undefined && item.slug === slugKey;
    
    if (isHeader) {
      return (
        <div key={item.title} className="mb-6">
          <div className="text-[9px] tracking-[0.2em] uppercase text-neutral-500 font-semibold mb-2.5">
            {item.title}
          </div>
          <div className="flex flex-col gap-1 border-l border-white/[0.04] pl-3.5">
            {item.items?.map(sub => renderSidebarItem(sub))}
          </div>
        </div>
      );
    }

    return (
      <Link
        key={item.title}
        href={item.href || '#'}
        className={`text-xs block py-1 font-light transition-colors hover:text-white ${
          isSelected ? 'text-[#5EEAD4] font-medium' : 'text-neutral-400'
        }`}
      >
        {item.title}
      </Link>
    );
  };

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* KaTeX Math Delimiter Styling & Script Inclusion */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" />
      <Script src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js" strategy="afterInteractive" />
      <Script 
        src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js" 
        strategy="afterInteractive"
      />
      
      {/* Route listener client component to trigger math renders on navigation */}
      <MathRenderer />

      {/* Inject custom theme typography stylesheet */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* Sticky Translucent Top Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 h-16 border-b border-white/[0.05] bg-black/40 backdrop-blur-md flex items-center justify-between px-6 md:px-12">
        <Link href="/projects/janus" className="text-white hover:text-[#5EEAD4] transition-colors font-mono tracking-wider font-semibold uppercase text-sm">
          Janus
        </Link>
        <Link href="/projects/janus/docs" className="text-secondary hover:text-white transition-colors font-mono tracking-wider text-xs uppercase">
          Documentation
        </Link>
      </nav>

      {/* Docs Body layout */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-20 flex gap-12">
        {/* Left Sidebar */}
        <aside className="w-60 hidden md:block shrink-0 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto font-mono select-none pr-4">
          {navTree.map(item => renderSidebarItem(item))}
        </aside>

        {/* Central Content Column */}
        <article className="flex-1 min-w-0">
          {isLandingPage ? (
            <div className="flex flex-col gap-8 max-w-3xl font-sans">
              <div className="border-b border-white/[0.08] pb-6">
                <div className="text-[10px] tracking-widest uppercase text-[#5EEAD4] font-mono mb-2">
                  Documentation Hub
                </div>
                <h1 className="text-4xl font-normal text-white tracking-tight leading-tight">
                  Janus Core Documentation
                </h1>
                <p className="text-neutral-400 font-light mt-3 leading-relaxed text-sm">
                  Welcome to the Janus computational physics platform documentation. This reference material describes the physical models, numerical integrators, and rigorous verification pipelines implemented within the framework.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <Link href="/projects/janus/docs/roadmap" className="group border border-white/[0.05] p-5 rounded hover:border-[#5EEAD4]/40 hover:bg-neutral-900/10 transition-all duration-300 flex flex-col gap-2 bg-neutral-950/20">
                  <span className="font-mono text-[9px] tracking-widest text-[#5EEAD4]">01 // TIMELINE</span>
                  <h3 className="text-white font-medium text-lg group-hover:text-[#5EEAD4] transition-colors">Roadmap</h3>
                  <p className="text-neutral-400 text-xs font-light leading-normal">
                    Explore the active, incremental developmental timeline, current project milestones, and long-term vision.
                  </p>
                </Link>

                <Link href="/projects/janus/docs/physics" className="group border border-white/[0.05] p-5 rounded hover:border-orange-500/40 hover:bg-neutral-900/10 transition-all duration-300 flex flex-col gap-2 bg-neutral-950/20">
                  <span className="font-mono text-[9px] tracking-widest text-orange-500">02 // MODELS</span>
                  <h3 className="text-white font-medium text-lg group-hover:text-orange-500 transition-colors">Physics Overview</h3>
                  <p className="text-neutral-400 text-xs font-light leading-normal">
                    Review core physics modules including Lorentz forces, secondary particle production models, and future extensions.
                  </p>
                </Link>

                <Link href="/projects/janus/docs/validation" className="group border border-white/[0.05] p-5 rounded hover:border-blue-500/40 hover:bg-neutral-900/10 transition-all duration-300 flex flex-col gap-2 bg-neutral-950/20">
                  <span className="font-mono text-[9px] tracking-widest text-blue-500">03 // VERIFICATION</span>
                  <h3 className="text-white font-medium text-lg group-hover:text-blue-500 transition-colors">Validation Reports</h3>
                  <p className="text-neutral-400 text-xs font-light leading-normal">
                    Read independent mathematical validation reports checking kinematics, invariants, and magnetic beam lattice tracking.
                  </p>
                </Link>

                <Link href="/projects/janus/docs/acknowledgements" className="group border border-white/[0.05] p-5 rounded hover:border-purple-500/40 hover:bg-neutral-900/10 transition-all duration-300 flex flex-col gap-2 bg-neutral-950/20">
                  <span className="font-mono text-[9px] tracking-widest text-purple-500">04 // CREDITS</span>
                  <h3 className="text-white font-medium text-lg group-hover:text-purple-500 transition-colors">Acknowledgements</h3>
                  <p className="text-neutral-400 text-xs font-light leading-normal">
                    Acknowledge key tools, external libraries, and academic work (like Geant4) which power the Janus simulator.
                  </p>
                </Link>
              </div>
            </div>
          ) : (
            <div 
              className="markdown-content max-w-3xl"
              dangerouslySetInnerHTML={{ __html: htmlContent }} 
            />
          )}
        </article>
      </div>
    </main>
  );
}
