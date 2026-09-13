import Link from 'next/link';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllPosts, getAllPostSlugs, getPostBySlug } from '@/lib/blog';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateStaticParams() {
  return [
    { slug: [] },
    ...getAllPostSlugs().map((slug) => ({
      slug: slug.split('/'),
    })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const slug = (resolved.slug ?? []).join('/');

  if (!slug) {
    return {
      title: 'Notes · Harliv',
      description: 'Essays and notes on scientific computing, physical simulations, and mathematical abstractions.',
    };
  }

  const post = getPostBySlug(slug);
  if (!post) return { title: 'Not Found' };

  return {
    title: `${post.title} · Harliv`,
    description: post.description,
  };
}

const markdownStyles = `
  .blog-markdown {
    font-family: var(--font-geist-sans), sans-serif;
  }
  .blog-markdown h1 {
    font-family: var(--font-garamond), ui-serif, Georgia, serif;
    font-size: 2.75rem;
    font-weight: 400;
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: #ffffff;
    margin-top: 0;
    margin-bottom: 1.75rem;
  }
  .blog-markdown h2 {
    font-family: var(--font-garamond), ui-serif, Georgia, serif;
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin-top: 2.5rem;
    margin-bottom: 0.85rem;
  }
  .blog-markdown h3 {
    font-size: 1.05rem;
    font-weight: 500;
    color: #ffffff;
    margin-top: 1.75rem;
    margin-bottom: 0.65rem;
  }
  .blog-markdown p {
    color: #888888;
    font-weight: 400;
    line-height: 1.7;
    margin-bottom: 1.25rem;
    font-size: 0.95rem;
  }
  .blog-markdown ul, .blog-markdown ol {
    padding-left: 1.5rem;
    color: #888888;
    font-weight: 400;
    margin-bottom: 1.25rem;
    font-size: 0.95rem;
  }
  .blog-markdown ul {
    list-style-type: disc;
  }
  .blog-markdown ol {
    list-style-type: decimal;
  }
  .blog-markdown li {
    margin-bottom: 0.45rem;
    line-height: 1.65;
  }
  .blog-markdown strong {
    font-weight: 600;
    color: #ffffff;
  }
  .blog-markdown a {
    color: #ffffff;
    text-decoration: underline;
    text-underline-offset: 0.2em;
    text-decoration-color: rgba(255, 255, 255, 0.25);
  }
  .blog-markdown a:hover {
    text-decoration-color: rgba(255, 255, 255, 0.7);
  }
  .blog-markdown code {
    font-family: var(--font-geist-mono), monospace;
    color: #d4d4d4;
    background-color: rgba(255, 255, 255, 0.04);
    padding: 0.125rem 0.3rem;
    font-size: 0.85em;
  }
  .blog-markdown pre {
    background-color: #0a0a0a;
    border: 1px solid rgba(255, 255, 255, 0.06);
    padding: 1rem;
    overflow-x: auto;
    margin-bottom: 1.5rem;
  }
  .blog-markdown pre code {
    background-color: transparent;
    padding: 0;
    color: #e5e5e5;
    font-size: 0.85rem;
  }
  .blog-markdown hr {
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    margin: 2rem 0;
  }
  .blog-markdown img {
    display: block;
    max-width: 100%;
    height: auto;
    border: 1px solid rgba(255, 255, 255, 0.06);
    margin: 1.75rem 0;
  }
  .blog-markdown blockquote {
    border-left: 1px solid rgba(255, 255, 255, 0.18);
    padding-left: 1rem;
    color: #888888;
    margin: 1.5rem 0;
  }
`;

function rewriteImagePaths(html: string): string {
  return html
    .replace(/src="(?:\.\.\/)+public(\/[^"]+)"/g, 'src="$1"')
    .replace(/src="(?:\.\.\/)+images(\/[^"]+)"/g, 'src="/images$1"');
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolved = await params;
  const slug = (resolved.slug ?? []).join('/');

  if (!slug) {
    const posts = getAllPosts();

    return (
      <>
        <Navbar />
        <main className="flex-1">
          <section className="px-6 md:px-12 pt-32 pb-24 md:pb-32">
            <div className="max-w-6xl mx-auto">
              <h1 className="font-serif text-4xl md:text-5xl font-normal tracking-normal text-primary leading-[1.1]">
                Writing
              </h1>
              <p className="mt-5 text-sm md:text-base text-secondary mb-10 max-w-2xl leading-relaxed">
                Essays and notes on scientific computing, physical simulations, and mathematical abstractions.
              </p>

              <div className="border-b border-white/[0.06]">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={post.href}
                    className="block group focus-visible:outline-none focus-visible:bg-white/[0.02]"
                  >
                    <article className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-8 py-5 md:py-6 border-t border-white/[0.06]">
                      <h2 className="sm:col-span-4 font-serif text-xl md:text-2xl font-normal text-primary leading-tight group-hover:text-white transition-colors duration-200">
                        {post.title}
                      </h2>
                      <p className="sm:col-span-7 text-xs sm:text-sm text-secondary leading-relaxed">
                        {post.description}
                      </p>
                      <p className="sm:col-span-1 sm:text-right font-mono text-[11px] uppercase tracking-[0.18em] text-primary/45 group-hover:text-primary transition-colors duration-200">
                        <span aria-hidden="true">→</span>
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  let htmlContent = await marked.parse(post.content);
  htmlContent = rewriteImagePaths(htmlContent);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <style dangerouslySetInnerHTML={{ __html: markdownStyles }} />
        <article className="px-6 md:px-12 pt-32 pb-24 md:pb-32">
          <div className="max-w-2xl mx-auto">
            <Link
              href="/blog"
              className="inline-block text-[11px] font-mono uppercase tracking-[0.22em] text-secondary hover:text-primary transition-colors mb-10"
            >
              ← Writing
            </Link>
            <div
              className="blog-markdown"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
