import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import * as motion from 'framer-motion/client';
import { getAllPosts } from '@/lib/blog';

export default function BlogSection() {
  const posts = getAllPosts();

  return (
    <section id="blog" className="py-20 md:py-28 px-6 md:px-12 border-t border-white/[0.05] scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <h2 className="text-3xl font-serif font-normal leading-[1.2] tracking-normal text-primary mb-4">Notes</h2>
          <p className="text-sm md:text-base text-primary mb-8 max-w-full leading-relaxed font-[400]">
            Essays and notes on scientific computing, complex systems, and mathematical abstractions.
          </p>

          {posts.length === 0 ? (
            <p className="text-secondary text-sm">No posts yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <Link key={post.slug} href={post.href} className="block group">
                  <div className="bg-white/[0.01] border border-white/[0.05] rounded-xl p-4 transition-all duration-200 hover:border-white/[0.15] hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgb(0,0,0,0.3)]">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-primary">{post.title}</h3>
                      <ArrowRight className="w-5 h-5 text-secondary opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
