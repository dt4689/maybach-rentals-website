'use client';

import { motion } from 'framer-motion';
import { UserCheck, MapPin, Users, Star } from 'lucide-react';
import Container from '@/components/ui/Container';

const ease = [0.22, 1, 0.36, 1] as const;

const pillars = [
  {
    icon: UserCheck,
    title: 'Chauffeur-Only',
    body: 'Every journey is led by a trained, vetted professional. No self-drive, no surprises — only composed, punctual service.',
  },
  {
    icon: MapPin,
    title: 'Pan-Mumbai Pickup',
    body: 'From Colaba to Borivali, from BKC to Airoli. Name your location; we arrive at your door.',
  },
  {
    icon: Users,
    title: '1,000+ Clients',
    body: 'A decade of weddings, board meetings, airport transfers, and film shoots has earned us an unblemished reputation.',
  },
  {
    icon: Star,
    title: '494 Five-Star Reviews',
    body: 'A perfect 5.0 on Google. Every review mentions a name — our chauffeurs. That is the differentiator.',
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 border-t border-graphite">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <p className="font-inter text-xs font-medium text-champagne tracking-[0.25em] uppercase mb-3">Why Maybach</p>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-semibold text-ivory">
            Not just a car. An experience.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
              className="flex flex-col"
            >
              <div className="w-10 h-10 rounded-sm bg-graphite flex items-center justify-center mb-5">
                <p.icon className="w-5 h-5 text-champagne" />
              </div>
              <h3 className="font-cormorant text-2xl font-semibold text-ivory mb-3">{p.title}</h3>
              <p className="font-inter text-sm text-muted leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
