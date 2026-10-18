import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import AsciiDivider from './AsciiDivider';
import SectionKicker from './SectionKicker';

export default function BlogSection() {
  const posts = getAllPosts();
  return (
    <section id="blog" className="writing-section py-24 md:py-32 px-6 md:px-12 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <AsciiDivider />
        <div className="section-heading">
          <div><SectionKicker>Notes & essays</SectionKicker><h2 className="font-serif text-6xl md:text-8xl mt-5">Writing<span className="text-dither-warm">.</span></h2></div>
          <p className="section-note">Notes and essays on<br />things I find interesting.</p>
        </div>
        <div className="notebook mt-14">
          <div className="notebook-pages">
            {posts.length === 0 ? <p className="p-8 text-secondary">No posts yet.</p> : posts.map((post, index) => (
              <Link key={post.slug} href={post.href} className="note-entry group">
                <span className="note-index" aria-hidden="true">[{String(index + 1).padStart(2, '0')}]</span>
                <article>
                  <h3 className="font-serif text-3xl md:text-4xl leading-tight">{post.title}</h3>
                  <p className="mt-4 text-sm text-secondary max-w-xl">{post.description}</p>
                </article>
                <span className="note-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
