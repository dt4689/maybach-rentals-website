'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Container from '@/components/ui/Container';

const ease = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    name: 'Rohit Mehta',
    role: 'Corporate client',
    stars: 5,
    text: 'The Maybach S500 was immaculate. Our clients from London were genuinely impressed — the car, the chauffeur, the punctuality. Not a single thing to complain about.',
  },
  {
    name: 'Priya Kapoor',
    role: 'Wedding client',
    stars: 5,
    text: 'Amol was incredible. Arrived an hour early, helped with the floral arrangements, and made the entire wedding morning feel effortless. Booking them again for the reception.',
  },
  {
    name: 'Sanjay Malhotra',
    role: 'Airport transfer',
    stars: 5,
    text: 'Flight was delayed by two hours. Wasama waited without a single complaint and had the car chilled and music ready when I walked out. Exactly what you want after a long flight.',
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-3.5 h-3.5 fill-champagne text-champagne" />
    ))}
  </div>
);

export default function Testimonials() {
  return (
    <section className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <p className="font-inter text-xs font-medium text-champagne tracking-[0.25em] uppercase mb-3">Reviews</p>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-semibold text-ivory">
              5.0 on Google.<br />494 reasons why.
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-4 h-4 fill-champagne text-champagne" />
              ))}
            </div>
            <span className="font-inter text-sm text-muted">5.0 / 494 reviews</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, ease, delay: i * 0.12 }}
              className="bg-onyx border border-graphite rounded-sm p-8"
            >
              <Stars count={t.stars} />
              <p className="font-inter text-sm text-ivory/90 leading-relaxed mt-5 mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="font-inter text-sm font-medium text-ivory">{t.name}</p>
                <p className="font-inter text-xs text-muted">{t.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
