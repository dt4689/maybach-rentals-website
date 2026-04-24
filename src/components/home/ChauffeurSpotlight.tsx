'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Container from '@/components/ui/Container';

const ease = [0.22, 1, 0.36, 1] as const;

const chauffeurs = [
  {
    name: 'Amol',
    tagline: '8 years of service',
    reviews: 142,
    quote: 'Will definitely come back whenever we need to rent luxury cars.',
    reviewer: 'Amit Punjabi',
    initial: 'A',
  },
  {
    name: 'Wasama',
    tagline: '6 years of service',
    reviews: 98,
    quote: 'The driver was patient, dedicated and lovely.',
    reviewer: 'Dawn Dee',
    initial: 'W',
  },
  {
    name: 'Pandey',
    tagline: '5 years of service',
    reviews: 87,
    quote: 'Very punctual and professional experience.',
    reviewer: 'Tarun Sharma',
    initial: 'P',
  },
];

export default function ChauffeurSpotlight() {
  return (
    <section className="py-24 bg-onyx border-y border-graphite">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <p className="font-inter text-xs font-medium text-champagne tracking-[0.25em] uppercase mb-3">The Team</p>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-semibold text-ivory mb-4">
            The Chauffeurs Who Earned Our Reviews
          </h2>
          <p className="font-inter text-base text-muted max-w-xl mx-auto">
            Every five-star rating on Google mentions a name. Meet the team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {chauffeurs.map((c, i) => (
            <motion.article
              key={c.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, ease, delay: i * 0.12 }}
              className="bg-obsidian border border-graphite rounded-sm p-8 flex flex-col"
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-graphite border border-champagne/20 flex items-center justify-center">
                  <span className="font-cormorant text-2xl font-semibold text-champagne">{c.initial}</span>
                </div>
                <div>
                  <h3 className="font-cormorant text-2xl font-semibold text-ivory">{c.name}</h3>
                  <p className="font-inter text-xs text-muted">{c.tagline}</p>
                </div>
              </div>

              {/* Review count badge */}
              <div className="inline-flex items-center gap-1.5 mb-6">
                <span className="font-inter text-xs text-champagne font-medium tabular-nums">{c.reviews}</span>
                <span className="font-inter text-xs text-muted">reviews mention their name</span>
              </div>

              {/* Quote */}
              <blockquote className="mt-auto">
                <Quote className="w-5 h-5 text-champagne/40 mb-3" />
                <p className="font-inter text-sm text-ivory/90 leading-relaxed italic mb-3">
                  &ldquo;{c.quote}&rdquo;
                </p>
                <footer className="font-inter text-xs text-muted">— {c.reviewer}</footer>
              </blockquote>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
