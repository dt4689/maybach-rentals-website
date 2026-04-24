'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Container from '@/components/ui/Container';

const ease = [0.22, 1, 0.36, 1] as const;

const areas = [
  'Airoli', 'Andheri', 'Antop Hill', 'Bandra',
  'Borivali', 'Byculla', 'Chandivali', 'Colaba',
  'Juhu', 'Lower Parel', 'Powai', 'BKC',
];

export default function ServiceAreas() {
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
          <p className="font-inter text-xs font-medium text-champagne tracking-[0.25em] uppercase mb-3">Coverage</p>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-semibold text-ivory mb-4">
            Wherever Mumbai takes you.
          </h2>
          <p className="font-inter text-base text-muted max-w-lg mx-auto">
            Pan-Mumbai pickup and drop with no restrictions. Our cars come to you.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {areas.map((area, i) => (
            <motion.div
              key={area}
              id={`area-${area.toLowerCase().replace(/\s+/g, '-')}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.4, ease, delay: i * 0.05 }}
              className="flex items-center gap-3 bg-onyx border border-graphite rounded-sm px-5 py-4 hover:border-champagne/30 transition-colors duration-300"
            >
              <MapPin className="w-4 h-4 text-champagne flex-shrink-0" />
              <span className="font-inter text-sm text-ivory">{area}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
