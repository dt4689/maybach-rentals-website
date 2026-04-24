'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Container from '@/components/ui/Container';
import { featuredCars } from '@/lib/fleet-data';

const ease = [0.22, 1, 0.36, 1] as const;

function ImageFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-graphite/50">
      <svg viewBox="0 0 120 50" fill="none" className="w-24 opacity-20" aria-hidden="true">
        <path d="M8 40 C5 40 3 38 3 36 L3 30 L7 28 L18 25 Q21 25 22 23 L28 14 Q30 10 34 9 L68 8 Q74 8 77 11 L83 23 L105 28 L108 30 L109 36 C109 38 107 40 104 40 L90 40 Q90 32 85 32 Q80 32 80 40 L44 40 Q44 32 38 32 Q32 32 32 40 Z" fill="#C9A961"/>
        <circle cx="38" cy="40" r="8" fill="#C9A961"/>
        <circle cx="84" cy="40" r="8" fill="#C9A961"/>
      </svg>
    </div>
  );
}

function TiltCard({ car }: { car: (typeof featuredCars)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const packagePrice = car.pricePerHour * 8;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative flex-shrink-0 w-[280px] sm:w-[320px] bg-onyx rounded-sm border border-graphite overflow-hidden group cursor-pointer"
    >
      <div className="relative h-48 bg-graphite">
        {!imgError ? (
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="object-cover"
            sizes="320px"
            onError={() => setImgError(true)}
          />
        ) : (
          <ImageFallback />
        )}
        {/* Champagne glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 60px 0 rgba(201,169,97,0.08)' }} />
      </div>

      <div className="p-5">
        <p className="font-inter text-[10px] font-medium text-champagne tracking-[0.2em] uppercase mb-1">{car.brand}</p>
        <h3 className="font-cormorant text-xl font-semibold text-ivory leading-tight mb-1">{car.name}</h3>
        <p className="font-inter text-xs text-muted mb-4">{car.seats} seats &bull; {car.colour}</p>
        <div className="flex items-end justify-between">
          <div>
            <p className="font-inter text-[10px] text-muted mb-0.5">8hr package from</p>
            <span className="font-inter text-lg font-medium text-champagne tabular-nums">
              ₹{packagePrice.toLocaleString('en-IN')}
            </span>
          </div>
          <Link
            href={`/fleet/${car.slug}`}
            className="font-inter text-xs font-medium text-champagne border border-champagne/40 px-3 py-1.5 rounded-sm hover:bg-champagne hover:text-obsidian hover:border-champagne transition-all duration-300"
          >
            View
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function FleetTeaser() {
  return (
    <section className="py-24 overflow-hidden">
      <Container className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="font-inter text-xs font-medium text-champagne tracking-[0.25em] uppercase mb-3">The Fleet</p>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-cormorant text-4xl sm:text-5xl font-semibold text-ivory">
              Driven by desire.<br />Defined by detail.
            </h2>
            <Link href="/fleet" className="hidden sm:inline-flex font-inter text-sm text-champagne hover:text-champagne-light transition-colors whitespace-nowrap">
              View all 30+ cars →
            </Link>
          </div>
        </motion.div>
      </Container>

      {/* Horizontal scroll strip */}
      <div
        className="flex gap-6 overflow-x-auto scroll-hidden pb-4"
        style={{ paddingLeft: 'max(1rem, calc((100vw - 80rem) / 2 + 2rem))' }}
      >
        {featuredCars.map((car, i) => (
          <motion.div
            key={car.slug}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.5, ease, delay: i * 0.08 }}
          >
            <TiltCard car={car} />
          </motion.div>
        ))}

        {/* See all card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.5 }}
          className="flex-shrink-0 w-[280px] sm:w-[320px] pr-4 sm:pr-6 lg:pr-8"
        >
          <Link
            href="/fleet"
            className="flex flex-col items-center justify-center h-full min-h-[260px] bg-onyx border border-dashed border-graphite rounded-sm hover:border-champagne/40 transition-colors duration-300 group"
          >
            <span className="font-cormorant text-3xl text-muted group-hover:text-champagne transition-colors">30+</span>
            <span className="font-inter text-sm text-muted group-hover:text-ivory transition-colors mt-2">View all cars</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
