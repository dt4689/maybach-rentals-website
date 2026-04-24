'use client';

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

export default function CarDetail({ car }: { car: Car }) {
  const waLink = buildWhatsAppLink(
    `Hello, I would like to book the ${car.name} (${car.colour}). Please share availability and confirm pricing.`
  );

  return (
    <div className="pt-20">
      {/* Hero image */}
      <div className="relative h-[50vh] min-h-[360px] bg-graphite overflow-hidden">
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(10,10,11,0.9) 0%, rgba(10,10,11,0.2) 60%)' }}
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
                  <span
                    key={tag}
                    className="font-inter text-sm text-ivory border border-champagne/30 bg-champagne/5 px-4 py-2 rounded-sm"
                  >
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
                    <tr>
                      <td className="px-5 py-4 font-inter text-sm text-muted">Base rate (8 hr / 80 km)</td>
                      <td className="px-5 py-4 font-inter text-sm text-ivory tabular-nums text-right">
                        ₹{(car.pricePerHour * 8).toLocaleString('en-IN')}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-4 font-inter text-sm text-muted">Per hour base rate</td>
                      <td className="px-5 py-4 font-inter text-sm text-champagne tabular-nums text-right">
                        ₹{car.pricePerHour.toLocaleString('en-IN')} /hr
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-4 font-inter text-sm text-muted">Extra hour rate</td>
                      <td className="px-5 py-4 font-inter text-sm text-ivory tabular-nums text-right">
                        ₹{car.extraHourRate.toLocaleString('en-IN')} /hr
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-4 font-inter text-sm text-muted">Extra km rate</td>
                      <td className="px-5 py-4 font-inter text-sm text-ivory tabular-nums text-right">
                        ₹{car.extraKmRate.toLocaleString('en-IN')} /km
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="font-inter text-xs text-muted mt-3">
                All packages include a professional chauffeur. Toll charges billed actuals.
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
                Confirm availability and pricing directly via WhatsApp. Instant response.
              </p>

              <div className="mb-4 py-3 border-t border-b border-graphite text-center">
                <span className="font-inter text-xs text-muted">Starting from </span>
                <span className="font-inter text-3xl font-medium text-champagne tabular-nums">
                  ₹{car.pricePerHour.toLocaleString('en-IN')}
                </span>
                <span className="font-inter text-xs text-muted"> /hr</span>
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
                +91 9892 904433 &bull; replies within minutes
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
