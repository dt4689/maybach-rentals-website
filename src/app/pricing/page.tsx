'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Container from '@/components/ui/Container';
import { fleet } from '@/lib/fleet-data';
import type { Car } from '@/lib/fleet-data';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import QuoteCalculator from '@/components/booking/QuoteCalculator';

const ease = [0.22, 1, 0.36, 1] as const;

const tierOrder: Record<Car['tier'], number> = { ultra: 0, premium: 1, standard: 2 };
const tierLabel: Record<Car['tier'], string> = { ultra: 'Ultra Luxury', premium: 'Premium', standard: 'Standard' };

export default function PricingPage() {
  const [sort, setSort] = useState<'price-asc' | 'price-desc' | 'tier'>('tier');

  const sorted = useMemo(() => {
    const cars = [...fleet];
    if (sort === 'price-asc') return cars.sort((a, b) => a.pricePerHour - b.pricePerHour);
    if (sort === 'price-desc') return cars.sort((a, b) => b.pricePerHour - a.pricePerHour);
    return cars.sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier]);
  }, [sort]);

  return (
    <>
      <div className="pt-32 pb-16 border-b border-graphite">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="font-inter text-xs font-medium text-champagne tracking-[0.25em] uppercase mb-3">Pricing</p>
            <h1 className="font-cormorant text-5xl sm:text-6xl font-semibold text-ivory tracking-[-0.02em] mb-4">
              Transparent pricing.<br />No hidden costs.
            </h1>
            <p className="font-inter text-base text-muted max-w-xl">
              All packages include a professional chauffeur. Base rate covers 8 hours and 80 km. Extra hours and kilometres are charged at the rates shown.
            </p>
          </motion.div>
        </Container>
      </div>

      <Container className="py-12">
        {/* Sort control */}
        <div className="flex items-center justify-between mb-8">
          <p className="font-inter text-sm text-muted">{fleet.length} vehicles</p>
          <div className="flex items-center gap-3">
            <label className="font-inter text-xs text-muted">Sort:</label>
            <div className="relative">
              <select
                value={sort}
                onChange={e => setSort(e.target.value as typeof sort)}
                className="appearance-none bg-onyx border border-graphite rounded-sm px-4 py-2 font-inter text-sm text-ivory pr-8 focus:outline-none focus:border-champagne/60"
              >
                <option value="tier">By Tier</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
          className="bg-onyx border border-graphite rounded-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-graphite">
                  <th className="text-left px-5 py-4 font-inter text-xs text-muted uppercase tracking-[0.15em]">Car</th>
                  <th className="text-left px-5 py-4 font-inter text-xs text-muted uppercase tracking-[0.15em]">Tier</th>
                  <th className="text-left px-5 py-4 font-inter text-xs text-muted uppercase tracking-[0.15em]">Seats</th>
                  <th className="text-right px-5 py-4 font-inter text-xs text-muted uppercase tracking-[0.15em]">Base /hr</th>
                  <th className="text-right px-5 py-4 font-inter text-xs text-muted uppercase tracking-[0.15em]">Extra hr</th>
                  <th className="text-right px-5 py-4 font-inter text-xs text-muted uppercase tracking-[0.15em]">Extra km</th>
                  <th className="px-5 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-graphite">
                {sorted.map((car, i) => (
                  <motion.tr
                    key={car.slug}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.02 }}
                    className="hover:bg-graphite/30 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <p className="font-inter text-sm font-medium text-ivory">{car.name}</p>
                      <p className="font-inter text-xs text-muted">{car.colour}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`font-inter text-xs font-medium px-2 py-0.5 rounded-sm ${
                        car.tier === 'ultra' ? 'bg-champagne/10 text-champagne' :
                        car.tier === 'premium' ? 'bg-graphite text-ivory/70' :
                        'bg-graphite text-muted'
                      }`}>
                        {tierLabel[car.tier]}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-inter text-sm text-muted">{car.seats}</td>
                    <td className="px-5 py-4 font-inter text-sm text-champagne tabular-nums text-right">
                      ₹{car.pricePerHour.toLocaleString('en-IN')}
                    </td>
                    <td className="px-5 py-4 font-inter text-sm text-ivory tabular-nums text-right">
                      ₹{car.extraHourRate.toLocaleString('en-IN')}
                    </td>
                    <td className="px-5 py-4 font-inter text-sm text-ivory tabular-nums text-right">
                      ₹{car.extraKmRate.toLocaleString('en-IN')}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <a
                        href={buildWhatsAppLink(`Hello, I am interested in the ${car.name}. Please share availability.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-inter text-xs text-champagne hover:text-champagne-light transition-colors"
                      >
                        Book →
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-4 border-t border-graphite">
            <p className="font-inter text-xs text-muted">
              Base rate covers 8 hours and 80 km. Toll and parking charges billed at actuals. All prices include a professional chauffeur.
            </p>
          </div>
        </motion.div>
      </Container>

      <QuoteCalculator />
    </>
  );
}
