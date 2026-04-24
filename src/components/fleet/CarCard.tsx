'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Users } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import type { Car } from '@/lib/fleet-data';

const tierLabel: Record<Car['tier'], string> = {
  ultra: 'Ultra Luxury',
  premium: 'Premium',
  standard: 'Standard',
};

const tierColour: Record<Car['tier'], string> = {
  ultra: 'text-champagne border-champagne/40',
  premium: 'text-ivory/70 border-graphite',
  standard: 'text-muted border-graphite',
};

function CarImagePlaceholder({ name, tier }: { name: string; tier: Car['tier'] }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-graphite/60">
      {/* Stylised car silhouette */}
      <svg viewBox="0 0 200 80" fill="none" className="w-32 opacity-20 mb-2" aria-hidden="true">
        <path d="M20 60 C14 60 10 56 10 52 L10 44 L18 40 L44 35 Q50 35 53 32 L64 20 Q68 15 75 14 L125 13 Q135 13 140 18 L150 32 L185 40 L190 44 L190 52 C190 56 186 60 180 60 L160 60 Q160 46 148 46 Q136 46 136 60 L80 60 Q80 46 66 46 Q52 46 52 60 Z" fill="currentColor" className="text-champagne" />
        <circle cx="66" cy="60" r="12" fill="currentColor" className="text-champagne" />
        <circle cx="148" cy="60" r="12" fill="currentColor" className="text-champagne" />
      </svg>
      <span className="font-inter text-[10px] text-muted tracking-[0.15em] uppercase">Photo coming soon</span>
    </div>
  );
}

export default function CarCard({ car }: { car: Car }) {
  const ref = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const waLink = buildWhatsAppLink(
    `Hello, I am interested in booking the ${car.name} (${car.colour}). Please share availability.`
  );

  const packagePrice = car.pricePerHour * 8;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-onyx border border-graphite rounded-sm overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-52 bg-graphite overflow-hidden">
        {!imgError ? (
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <CarImagePlaceholder name={car.name} tier={car.tier} />
        )}

        {/* Champagne glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(201,169,97,0.15) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        {/* Tier badge */}
        <span className={`absolute top-3 left-3 font-inter text-[10px] font-medium tracking-[0.15em] uppercase border px-2 py-1 rounded-sm bg-obsidian/80 backdrop-blur-sm ${tierColour[car.tier]}`}>
          {tierLabel[car.tier]}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="font-inter text-[10px] font-medium text-champagne tracking-[0.2em] uppercase mb-1">{car.brand}</p>
        <h3 className="font-cormorant text-xl font-semibold text-ivory leading-tight mb-1">{car.name}</h3>

        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1 font-inter text-xs text-muted">
            <Users className="w-3 h-3" />
            {car.seats} seats
          </span>
          <span className="font-inter text-xs text-muted">&bull;</span>
          <span className="font-inter text-xs text-muted">{car.colour}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {car.bestFor.map(tag => (
            <span key={tag} className="font-inter text-[10px] tracking-wide capitalize bg-graphite text-muted px-2 py-0.5 rounded-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-end justify-between pt-4 border-t border-graphite">
          <div>
            <p className="font-inter text-[10px] text-muted mb-0.5 uppercase tracking-[0.12em]">8hr package from</p>
            <div className="flex items-baseline gap-1">
              <span className="font-inter text-xl font-medium text-champagne tabular-nums">
                ₹{packagePrice.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="font-inter text-[10px] text-muted mt-0.5">₹{car.extraHourRate.toLocaleString('en-IN')}/hr extra</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-xs font-medium bg-champagne text-obsidian px-3 py-1.5 rounded-sm hover:bg-champagne-light transition-colors duration-300"
            >
              Book
            </a>
            <Link
              href={`/fleet/${car.slug}`}
              className="font-inter text-xs font-medium border border-champagne/40 text-champagne px-3 py-1.5 rounded-sm hover:bg-champagne hover:text-obsidian hover:border-champagne transition-all duration-300"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
