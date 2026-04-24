'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Container from '@/components/ui/Container';
import CarCard from '@/components/fleet/CarCard';
import { fleet } from '@/lib/fleet-data';
import type { Car } from '@/lib/fleet-data';

const ease = [0.22, 1, 0.36, 1] as const;

const brands = ['All', ...Array.from(new Set(fleet.map(c => c.brand))).sort()];
const useCases = ['All', 'wedding', 'airport', 'corporate', 'outstation', 'photoshoot'];
const tiers = ['All', 'ultra', 'premium', 'standard'];
const tierLabel: Record<string, string> = { ultra: 'Ultra', premium: 'Premium', standard: 'Standard', All: 'All' };
const useCaseLabel: Record<string, string> = { All: 'All', wedding: 'Wedding', airport: 'Airport', corporate: 'Corporate', outstation: 'Outstation', photoshoot: 'Photoshoot' };

function FilterSelect({ label, value, options, onChange, labelMap }: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  labelMap?: Record<string, string>;
}) {
  return (
    <div className="relative">
      <label className="font-inter text-[10px] text-muted uppercase tracking-[0.15em] mb-1.5 block">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none bg-onyx border border-graphite rounded-sm px-4 py-2.5 font-inter text-sm text-ivory focus:outline-none focus:border-champagne/60 transition-colors pr-8"
        >
          {options.map(o => (
            <option key={o} value={o}>{labelMap ? labelMap[o] : o}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted pointer-events-none" />
      </div>
    </div>
  );
}

export default function FleetPage() {
  const [brand, setBrand] = useState('All');
  const [useCase, setUseCase] = useState('All');
  const [tier, setTier] = useState('All');
  const [sort, setSort] = useState<'price-asc' | 'price-desc'>('price-asc');

  const filtered = useMemo(() => {
    let cars: Car[] = [...fleet];
    if (brand !== 'All') cars = cars.filter(c => c.brand === brand);
    if (tier !== 'All') cars = cars.filter(c => c.tier === tier);
    if (useCase !== 'All') cars = cars.filter(c => c.bestFor.includes(useCase as Car['bestFor'][0]));
    cars.sort((a, b) => sort === 'price-asc' ? a.pricePerHour - b.pricePerHour : b.pricePerHour - a.pricePerHour);
    return cars;
  }, [brand, tier, useCase, sort]);

  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-16 border-b border-graphite">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="font-inter text-xs font-medium text-champagne tracking-[0.25em] uppercase mb-3">The Fleet</p>
            <h1 className="font-cormorant text-5xl sm:text-6xl font-semibold text-ivory tracking-[-0.02em] mb-4">
              Every car. Every occasion.
            </h1>
            <p className="font-inter text-base text-muted max-w-xl">
              30+ luxury vehicles available for chauffeur-driven hire across Mumbai. All prices include a professional driver.
            </p>
          </motion.div>
        </Container>
      </div>

      {/* Filters */}
      <div className="py-6 border-b border-graphite bg-onyx sticky top-16 lg:top-20 z-30 backdrop-blur-md">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <FilterSelect label="Brand" value={brand} options={brands} onChange={setBrand} />
            <FilterSelect label="Occasion" value={useCase} options={useCases} onChange={setUseCase} labelMap={useCaseLabel} />
            <FilterSelect label="Tier" value={tier} options={tiers} onChange={setTier} labelMap={tierLabel} />
            <FilterSelect
              label="Sort by"
              value={sort}
              options={['price-asc', 'price-desc']}
              onChange={v => setSort(v as typeof sort)}
              labelMap={{ 'price-asc': 'Price: Low to High', 'price-desc': 'Price: High to Low' }}
            />
          </div>
          <p className="font-inter text-xs text-muted mt-3">{filtered.length} car{filtered.length !== 1 ? 's' : ''} shown</p>
        </Container>
      </div>

      {/* Grid */}
      <Container className="py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-cormorant text-3xl text-muted">No cars match your filters.</p>
            <button
              onClick={() => { setBrand('All'); setUseCase('All'); setTier('All'); }}
              className="mt-4 font-inter text-sm text-champagne hover:text-champagne-light"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((car, i) => (
              <motion.div
                key={car.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease, delay: Math.min(i * 0.05, 0.4) }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
