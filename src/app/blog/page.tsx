'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { blogPosts } from '@/lib/blog-data';

const ease = [0.22, 1, 0.36, 1] as const;

export default function BlogPage() {
  return (
    <>
      <div className="pt-32 pb-16 border-b border-graphite">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="font-inter text-xs font-medium text-champagne tracking-[0.25em] uppercase mb-3">Journal</p>
            <h1 className="font-cormorant text-5xl sm:text-6xl font-semibold text-ivory tracking-[-0.02em] mb-4">
              Stories and guides.
            </h1>
            <p className="font-inter text-base text-muted max-w-xl">
              Advice on choosing the right car, planning a luxury airport transfer, and making any occasion in Mumbai unforgettable.
            </p>
          </motion.div>
        </Container>
      </div>

      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              className="bg-onyx border border-graphite rounded-sm overflow-hidden group"
            >
              {/* Category colour bar */}
              <div className={`h-1 w-full ${
                post.category === 'Weddings' ? 'bg-champagne' :
                post.category === 'Airport' ? 'bg-champagne/60' :
                'bg-champagne/40'
              }`} />

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-inter text-[10px] font-medium text-champagne tracking-[0.15em] uppercase">{post.category}</span>
                  <span className="font-inter text-xs text-muted">{post.date}</span>
                  <span className="font-inter text-xs text-muted">&bull; {post.readTime}</span>
                </div>

                <h2 className="font-cormorant text-2xl font-semibold text-ivory leading-snug mb-3 group-hover:text-champagne transition-colors duration-300">
                  {post.title}
                </h2>

                <p className="font-inter text-sm text-muted leading-relaxed mb-5">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="font-inter text-sm text-champagne hover:text-champagne-light transition-colors"
                >
                  Read more →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </>
  );
}
