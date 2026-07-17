import Link from 'next/link';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { ArrowRight } from 'lucide-react';
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
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin-top: 0;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: 0.75rem;
  }
  .blog-markdown h2 {
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin-top: 2.25rem;
    margin-bottom: 0.85rem;
  }
  .blog-markdown h3 {
    font-size: 1.05rem;
    font-weight: 600;
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
    color: #5EEAD4;
    text-decoration: none;
  }
  .blog-markdown a:hover {
    text-decoration: underline;
  }
  .blog-markdown code {
    font-family: var(--font-geist-mono), monospace;
    color: #5EEAD4;
    background-color: rgba(255, 255, 255, 0.04);
    padding: 0.125rem 0.3rem;
    border-radius: 0.25rem;
    font-size: 0.85em;
  }
  .blog-markdown pre {
    background-color: #0a0a0a;
    border: 1px solid rgba(255, 255, 255, 0.05);
    padding: 1rem;
    border-radius: 0.5rem;
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
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
    margin: 1.75rem 0;
  }
  .blog-markdown blockquote {
    border-left: 2px solid rgba(255, 255, 255, 0.12);
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
          <section className="px-6 md:px-12 pt-28 pb-20">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-2xl font-bold tracking-tight text-primary mb-4">Notes</h1>
              <p className="text-sm md:text-base text-secondary mb-10 max-w-prose leading-relaxed">
                Essays and notes on scientific computing, physical simulations, and mathematical abstractions.
              </p>

              <div className="flex flex-col gap-4">
                {posts.map((post) => (
                  <Link key={post.slug} href={post.href} className="block group">
                    <div className="bg-white/[0.01] border border-white/[0.05] rounded-xl p-4 transition-all duration-200 hover:border-white/[0.15] hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgb(0,0,0,0.3)]">
                      <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-primary">{post.title}</h2>
                        <ArrowRight className="w-5 h-5 text-secondary opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary" />
                      </div>
                    </div>
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
        <article className="px-6 md:px-12 pt-28 pb-20">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-block text-[11px] font-mono uppercase tracking-widest text-secondary hover:text-primary transition-colors mb-8"
            >
              ← Notes
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
