'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { Star } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Luxury sedan SVG silhouette (Maybach S-Class inspired, facing right) ─── */
function CarSilhouette() {
  return (
    <svg
      viewBox="0 0 920 270"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full"
    >
      <defs>
        <radialGradient id="groundGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A961" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#C9A961" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="headlightBeam" cx="0%" cy="50%" r="100%">
          <stop offset="0%" stopColor="#C9A961" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#C9A961" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#242426" />
          <stop offset="100%" stopColor="#141416" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ground shadow / reflection */}
      <ellipse cx="458" cy="256" rx="370" ry="11" fill="url(#groundGlow)" />

      {/* Headlight beam (cone extending right) */}
      <path
        d="M 868 195 Q 920 180 920 215 Q 920 230 868 222 Z"
        fill="url(#headlightBeam)"
        opacity="0.6"
      />

      {/* ── Main car body ── */}
      <path
        d="
          M 100 240
          C 84 240 75 230 75 220
          L 75 195
          L 95 178
          L 215 162
          Q 242 162 255 150
          L 302 92
          Q 320 70 350 63
          L 510 59
          Q 552 59 575 72
          L 602 92
          L 634 162
          L 840 162
          Q 866 163 874 180
          L 878 200
          Q 881 216 876 232
          L 874 240

          L 793 240
          Q 792 192 756 192
          Q 720 192 719 240

          L 358 240
          Q 357 192 316 192
          Q 275 192 274 240
          Z
        "
        fill="url(#bodyGrad)"
        stroke="#C9A961"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      {/* ── Greenhouse / windows ── */}
      <path
        d="
          M 610 158
          L 575 72
          Q 552 59 510 59
          L 390 59
          L 390 158
          Z
        "
        fill="#0E0E10"
        stroke="#C9A961"
        strokeWidth="0.8"
        opacity="0.85"
      />
      <path
        d="
          M 390 59
          L 350 63
          Q 323 70 305 92
          L 268 158
          L 390 158
          Z
        "
        fill="#0E0E10"
        stroke="#C9A961"
        strokeWidth="0.8"
        opacity="0.85"
      />

      {/* B-pillar */}
      <line x1="390" y1="59" x2="395" y2="160" stroke="#C9A961" strokeWidth="1.2" opacity="0.5" />

      {/* ── Rear wheel ── */}
      <circle cx="316" cy="240" r="48" fill="#0A0A0B" stroke="#C9A961" strokeWidth="1.4" />
      <circle cx="316" cy="240" r="30" fill="#141416" stroke="#C9A961" strokeWidth="0.75" />
      {/* Spokes */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <line
          key={deg}
          x1={316 + 8 * Math.cos((deg * Math.PI) / 180)}
          y1={240 + 8 * Math.sin((deg * Math.PI) / 180)}
          x2={316 + 29 * Math.cos((deg * Math.PI) / 180)}
          y2={240 + 29 * Math.sin((deg * Math.PI) / 180)}
          stroke="#C9A961"
          strokeWidth="0.8"
          opacity="0.5"
        />
      ))}
      <circle cx="316" cy="240" r="6" fill="#C9A961" />

      {/* ── Front wheel ── */}
      <circle cx="756" cy="240" r="48" fill="#0A0A0B" stroke="#C9A961" strokeWidth="1.4" />
      <circle cx="756" cy="240" r="30" fill="#141416" stroke="#C9A961" strokeWidth="0.75" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <line
          key={deg}
          x1={756 + 8 * Math.cos((deg * Math.PI) / 180)}
          y1={240 + 8 * Math.sin((deg * Math.PI) / 180)}
          x2={756 + 29 * Math.cos((deg * Math.PI) / 180)}
          y2={240 + 29 * Math.sin((deg * Math.PI) / 180)}
          stroke="#C9A961"
          strokeWidth="0.8"
          opacity="0.5"
        />
      ))}
      <circle cx="756" cy="240" r="6" fill="#C9A961" />

      {/* ── Front headlight ── */}
      <path
        d="M 76 192 Q 72 200 72 210 L 80 208 Q 80 200 82 192 Z"
        fill="#C9A961"
        opacity="0.9"
        filter="url(#glow)"
      />
      <ellipse cx="76" cy="202" rx="5" ry="9" fill="#C9A961" opacity="0.7" filter="url(#glow)" />

      {/* ── Rear tail light ── */}
      <rect x="872" y="186" width="8" height="20" rx="2" fill="#B8292E" opacity="0.9" filter="url(#glow)" />

      {/* ── Chrome side trim ── */}
      <path
        d="M 98 208 L 274 192 L 634 185 L 840 185"
        stroke="#C9A961"
        strokeWidth="0.7"
        opacity="0.35"
      />

      {/* ── Door handle details ── */}
      <rect x="340" y="185" width="28" height="5" rx="2.5" fill="#C9A961" opacity="0.4" />
      <rect x="480" y="185" width="28" height="5" rx="2.5" fill="#C9A961" opacity="0.4" />

      {/* ── Front grille detail lines ── */}
      {[180, 190, 200, 210].map((y) => (
        <line key={y} x1="76" y1={y} x2="90" y2={y} stroke="#C9A961" strokeWidth="0.5" opacity="0.3" />
      ))}

      {/* ── Star emblem on hood ── */}
      <circle cx="620" cy="105" r="5" fill="none" stroke="#C9A961" strokeWidth="0.6" opacity="0.5" />
    </svg>
  );
}

/* ─── Animated floating particle ─── */
function Particle({ x, y, size, duration, delay }: { x: string; y: string; size: number; duration: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-champagne pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, opacity: 0 }}
      animate={{ y: [0, -80, -160], opacity: [0, 0.6, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeOut' }}
    />
  );
}

const particles = [
  { x: '10%', y: '70%', size: 2, duration: 4, delay: 0 },
  { x: '25%', y: '80%', size: 1.5, duration: 5, delay: 0.8 },
  { x: '40%', y: '75%', size: 2.5, duration: 3.5, delay: 1.4 },
  { x: '60%', y: '82%', size: 1.5, duration: 4.5, delay: 0.3 },
  { x: '75%', y: '72%', size: 2, duration: 3.8, delay: 1.2 },
  { x: '88%', y: '78%', size: 1, duration: 5.2, delay: 0.6 },
  { x: '52%', y: '88%', size: 1.5, duration: 4.2, delay: 2 },
  { x: '18%', y: '85%', size: 1, duration: 6, delay: 1.8 },
];

export default function Hero() {
  const waLink = buildWhatsAppLink('Hello, I would like to book a luxury car in Mumbai.');

  const scrollToChecker = () => {
    document.getElementById('availability')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-start overflow-hidden bg-obsidian pt-20">

      {/* ── Ambient light orbs ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ width: 600, height: 600, top: '-10%', left: '-15%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,97,0.06) 0%, transparent 70%)' }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{ width: 500, height: 500, bottom: '10%', right: '-10%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,97,0.05) 0%, transparent 70%)' }}
        animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* ── Floating particles ── */}
      {particles.map((p, i) => <Particle key={i} {...p} />)}

      {/* ── Text content (top half) ── */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-8 lg:mt-16 pb-8">

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="inline-flex items-center gap-2 bg-onyx border border-graphite rounded-full px-4 py-1.5 mb-8"
        >
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-champagne text-champagne" />)}
          </div>
          <span className="font-inter text-xs text-ivory">5.0</span>
          <span className="font-inter text-xs text-muted">· 494 Google reviews · 1,000+ clients</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="font-cormorant text-[44px] sm:text-[60px] lg:text-[76px] font-semibold text-ivory leading-[1.02] tracking-[-0.02em] mb-6"
        >
          Mumbai.<br className="sm:hidden" /> Driven Properly.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.25 }}
          className="font-inter text-base sm:text-lg text-ivory/75 leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          Chauffeur-driven Maybach, Bentley, and Range Rover.<br className="hidden sm:block" />
          Delivered to your door, anywhere in Mumbai.
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

      {/* ── Car animation ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 mt-4 sm:mt-0">

        {/* Scan line reveal */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          style={{ background: 'linear-gradient(to right, transparent 0%, rgba(201,169,97,0.04) 50%, transparent 100%)' }}
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1], delay: 0.8 }}
        />

        <motion.div
          initial={{ opacity: 0, x: 120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.6 }}
        >
          <CarSilhouette />
        </motion.div>

        {/* Animated ground line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease, delay: 1.2 }}
          style={{ originX: 0 }}
          className="h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent mt-0"
        />
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-inter text-[10px] tracking-[0.3em] text-champagne/50 uppercase">Scroll</span>
        <motion.div
          animate={{ scaleY: [1, 0.35, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-7 bg-champagne/30 origin-top"
        />
      </motion.div>
    </section>
  );
}
