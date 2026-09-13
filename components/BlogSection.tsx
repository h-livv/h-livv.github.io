import Link from 'next/link';
import * as motion from 'framer-motion/client';
import { getAllPosts } from '@/lib/blog';

export default function BlogSection() {
  const posts = getAllPosts();

  return (
    <section id="blog" className="py-24 md:py-32 px-6 md:px-12 border-t border-white/[0.05] scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-normal text-primary leading-[1.1]">
            Writing
          </h2>
          <p className="mt-5 text-sm md:text-base text-secondary max-w-2xl leading-relaxed">
            Notes and essays on things I find interesting.
          </p>

          {posts.length === 0 ? (
            <p className="mt-10 text-secondary text-sm">No posts yet.</p>
          ) : (
            <div className="mt-10 border-b border-white/[0.06]">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={post.href}
                  className="block group focus-visible:outline-none focus-visible:bg-white/[0.02]"
                >
                  <article className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-8 py-5 md:py-6 border-t border-white/[0.06]">
                    <h3 className="sm:col-span-4 font-serif text-xl md:text-2xl font-normal text-primary leading-tight group-hover:text-white transition-colors duration-200">
                      {post.title}
                    </h3>
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
          )}
        </motion.div>
      </div>
    </section>
  );
}
