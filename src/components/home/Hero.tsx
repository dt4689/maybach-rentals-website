'use client';

import { motion } from 'framer-motion';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const waLink = buildWhatsAppLink('Hello, I would like to book a luxury car in Mumbai.');

  const scrollToChecker = () => {
    document.getElementById('availability')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-dvh min-h-[600px] flex items-center justify-center overflow-hidden bg-obsidian">
      {/* TODO: replace with real asset at /public/videos/hero.mp4 */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
        aria-hidden="true"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(10,10,11,0.85) 0%, rgba(10,10,11,0.55) 50%, rgba(10,10,11,0.3) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="font-cormorant text-[44px] sm:text-[60px] lg:text-[72px] font-semibold text-ivory leading-[1.05] tracking-[-0.02em] mb-6"
        >
          Mumbai. Driven Properly.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="font-inter text-base sm:text-lg text-ivory/80 leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          Chauffeur-driven Maybach, Bentley, and Range Rover. Delivered to your door, anywhere in Mumbai.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={scrollToChecker}
            className="font-inter text-sm font-medium bg-champagne text-obsidian px-8 py-4 rounded-sm hover:bg-champagne-light transition-all duration-300 tracking-wide w-full sm:w-auto"
          >
            Check Availability
          </button>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-sm font-medium border border-champagne text-champagne px-8 py-4 rounded-sm hover:bg-champagne hover:text-obsidian transition-all duration-300 tracking-wide w-full sm:w-auto text-center"
          >
            Book on WhatsApp
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-inter text-[10px] tracking-[0.3em] text-champagne/60 uppercase">Scroll</span>
        <motion.div
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-8 bg-champagne/40 origin-top"
        />
      </motion.div>
    </section>
  );
}
