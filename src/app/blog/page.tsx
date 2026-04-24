'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Container from '@/components/ui/Container';

const ease = [0.22, 1, 0.36, 1] as const;

const posts = [
  {
    slug: 'top-luxury-cars-mumbai-weddings',
    title: 'The 5 Best Luxury Cars for Mumbai Weddings in 2025',
    excerpt: 'From a Bentley Flying Spur entrance to a Maybach GLS procession — how to choose the right car for every moment of your wedding day.',
    category: 'Weddings',
    date: 'March 2025',
    readTime: '5 min read',
  },
  {
    slug: 'airport-transfer-guide-mumbai',
    title: 'The Complete Guide to Luxury Airport Transfers in Mumbai',
    excerpt: 'CSIA T2, domestic terminal, late-night arrivals — everything you need to know about booking a chauffeur-driven airport pickup in Mumbai.',
    category: 'Airport',
    date: 'February 2025',
    readTime: '4 min read',
  },
  {
    slug: 'corporate-car-hire-bkc-mumbai',
    title: 'Why Mumbai\'s Corporate Elite Prefer Chauffeur-Driven Hire in BKC',
    excerpt: 'From client meetings in BKC to board presentations in Nariman Point — how a premium chauffeur service changes the way business gets done.',
    category: 'Corporate',
    date: 'January 2025',
    readTime: '6 min read',
  },
];

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
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              className="bg-onyx border border-graphite rounded-sm overflow-hidden group"
            >
              {/* Placeholder image */}
              <div className="h-48 bg-graphite flex items-center justify-center">
                {/* TODO: add real blog cover images */}
                <span className="font-inter text-xs text-muted">Image coming soon</span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-inter text-[10px] font-medium text-champagne tracking-[0.15em] uppercase">{post.category}</span>
                  <span className="font-inter text-xs text-muted">{post.date}</span>
                  <span className="font-inter text-xs text-muted">&bull; {post.readTime}</span>
                </div>

                <h2 className="font-cormorant text-2xl font-semibold text-ivory leading-snug mb-3 group-hover:text-champagne transition-colors">
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

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="font-inter text-xs text-muted text-center mt-16"
        >
          More articles coming soon.
        </motion.p>
      </Container>
    </>
  );
}
