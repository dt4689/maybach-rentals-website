'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const ease = [0.22, 1, 0.36, 1] as const;

export default function CTASection() {
  const waLink = buildWhatsAppLink('Hello, I would like to get a quote and book a luxury car in Mumbai.');

  const scrollToChecker = () => {
    document.getElementById('availability')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-32 bg-onyx border-t border-graphite relative overflow-hidden">
      {/* Subtle champagne glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,169,97,0.05) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <Container className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="font-inter text-xs font-medium text-champagne tracking-[0.25em] uppercase mb-4">Ready?</p>
          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-semibold text-ivory mb-6 tracking-[-0.01em]">
            Your car is waiting.
          </h2>
          <p className="font-inter text-base text-muted max-w-md mx-auto mb-12 leading-relaxed">
            Reserve your chauffeur-driven luxury car for any occasion in Mumbai. Instant confirmation via WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-sm font-medium bg-champagne text-obsidian px-8 py-4 rounded-sm hover:bg-champagne-light transition-all duration-300 tracking-wide w-full sm:w-auto text-center"
            >
              Book on WhatsApp
            </a>
            <button
              onClick={scrollToChecker}
              className="font-inter text-sm font-medium border border-champagne text-champagne px-8 py-4 rounded-sm hover:bg-champagne hover:text-obsidian transition-all duration-300 tracking-wide w-full sm:w-auto"
            >
              Get Instant Quote
            </button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
