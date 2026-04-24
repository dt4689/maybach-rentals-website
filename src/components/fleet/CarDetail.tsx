'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, Clock, MapPin, Star } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import type { Car } from '@/lib/fleet-data';

const ease = [0.22, 1, 0.36, 1] as const;

const tagLabel: Record<string, string> = {
  wedding: 'Weddings',
  airport: 'Airport Transfers',
  corporate: 'Corporate',
  outstation: 'Outstation',
  photoshoot: 'Photoshoots',
};

function HeroImagePlaceholder({ car }: { car: Car }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-graphite/40">
      <svg viewBox="0 0 400 130" fill="none" className="w-72 opacity-15 mb-4" aria-hidden="true">
        <path d="M30 105 C20 105 14 99 14 93 L14 80 L26 74 L66 65 Q76 65 80 60 L102 32 Q108 22 120 19 L220 17 Q238 17 248 26 L268 60 L340 74 L355 80 L358 93 C358 99 352 105 342 105 L300 105 Q300 83 284 83 Q268 83 268 105 L145 105 Q145 83 126 83 Q107 83 107 105 Z" fill="#C9A961"/>
        <circle cx="126" cy="105" r="22" fill="#C9A961"/>
        <circle cx="284" cy="105" r="22" fill="#C9A961"/>
      </svg>
      <span className="font-inter text-xs text-muted/60 tracking-[0.2em] uppercase">Photo coming soon</span>
      <span className="font-inter text-xs text-muted/40 mt-1">{car.name} · {car.colour}</span>
    </div>
  );
}

export default function CarDetail({ car }: { car: Car }) {
  const [imgError, setImgError] = useState(false);
  const waLink = buildWhatsAppLink(
    `Hello, I would like to book the ${car.name} (${car.colour}). Please share availability and confirm pricing.`
  );

  const packagePrice = car.pricePerHour * 8;

  return (
    <div className="pt-20">
      {/* Hero image */}
      <div className="relative h-[50vh] min-h-[360px] bg-graphite overflow-hidden">
        {!imgError ? (
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <HeroImagePlaceholder car={car} />
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(10,10,11,0.92) 0%, rgba(10,10,11,0.3) 60%)' }}
          aria-hidden="true"
        />
        <div className="absolute bottom-8 left-0 right-0 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="font-inter text-xs font-medium text-champagne tracking-[0.2em] uppercase mb-2">{car.brand}</p>
            <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-semibold text-ivory tracking-[-0.02em]">
              {car.name}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: specs + tags */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quick specs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.15 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { icon: Users, label: 'Seats', value: `${car.seats} passengers` },
                { icon: Star, label: 'Tier', value: car.tier.charAt(0).toUpperCase() + car.tier.slice(1) },
                { icon: MapPin, label: 'Colour', value: car.colour },
                { icon: Clock, label: 'Base package', value: '8 hr / 80 km' },
              ].map(spec => (
                <div key={spec.label} className="bg-onyx border border-graphite rounded-sm p-4">
                  <spec.icon className="w-4 h-4 text-champagne mb-2" />
                  <p className="font-inter text-[10px] text-muted uppercase tracking-[0.15em]">{spec.label}</p>
                  <p className="font-inter text-sm text-ivory font-medium mt-0.5">{spec.value}</p>
                </div>
              ))}
            </motion.div>

            {/* Best for */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.25 }}
            >
              <h2 className="font-cormorant text-2xl font-semibold text-ivory mb-4">Best For</h2>
              <div className="flex flex-wrap gap-3">
                {car.bestFor.map(tag => (
                  <span key={tag} className="font-inter text-sm text-ivory border border-champagne/30 bg-champagne/5 px-4 py-2 rounded-sm">
                    {tagLabel[tag]}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Pricing table */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.35 }}
            >
              <h2 className="font-cormorant text-2xl font-semibold text-ivory mb-4">Pricing</h2>
              <div className="bg-onyx border border-graphite rounded-sm overflow-hidden">
                <table className="w-full">
                  <tbody className="divide-y divide-graphite">
                    <tr className="bg-champagne/5">
                      <td className="px-5 py-4 font-inter text-sm text-ivory font-medium">Base package (8 hr / 80 km)</td>
                      <td className="px-5 py-4 font-inter text-xl font-medium text-champagne tabular-nums text-right">
                        ₹{packagePrice.toLocaleString('en-IN')}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-4 font-inter text-sm text-muted">Extra hour</td>
                      <td className="px-5 py-4 font-inter text-sm text-ivory tabular-nums text-right">
                        ₹{car.extraHourRate.toLocaleString('en-IN')} /hr
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-4 font-inter text-sm text-muted">Extra kilometre</td>
                      <td className="px-5 py-4 font-inter text-sm text-ivory tabular-nums text-right">
                        ₹{car.extraKmRate.toLocaleString('en-IN')} /km
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="font-inter text-xs text-muted mt-3">
                Professional chauffeur included. Toll and parking charged at actuals. Outstation overnight allowance extra.
              </p>
            </motion.div>
          </div>

          {/* Right: booking panel */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-onyx border border-graphite rounded-sm p-8">
              <h2 className="font-cormorant text-2xl font-semibold text-ivory mb-2">Reserve this car</h2>
              <p className="font-inter text-sm text-muted mb-6">
                Instant confirmation via WhatsApp. We reply within minutes.
              </p>

              <div className="mb-6 py-4 border-t border-b border-graphite text-center">
                <p className="font-inter text-[10px] text-muted uppercase tracking-[0.15em] mb-1">8hr package from</p>
                <span className="font-inter text-3xl font-medium text-champagne tabular-nums">
                  ₹{packagePrice.toLocaleString('en-IN')}
                </span>
              </div>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full font-inter text-sm font-medium bg-champagne text-obsidian py-4 rounded-sm hover:bg-champagne-light transition-all duration-300 tracking-wide text-center"
              >
                Book on WhatsApp
              </a>

              <p className="font-inter text-xs text-muted text-center mt-4">
                +91 9892 904433 · replies within minutes
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
