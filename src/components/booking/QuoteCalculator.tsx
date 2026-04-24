'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Container from '@/components/ui/Container';
import { fleet } from '@/lib/fleet-data';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const ease = [0.22, 1, 0.36, 1] as const;
const BASE_HOURS = 8;
const BASE_KM = 80;

export default function QuoteCalculator() {
  const [slug, setSlug] = useState(fleet[0].slug);
  const [hours, setHours] = useState(8);
  const [km, setKm] = useState(80);

  const car = fleet.find(c => c.slug === slug) ?? fleet[0];

  const { base, extraHourCost, extraKmCost, total } = useMemo(() => {
    const base = car.pricePerHour * BASE_HOURS;
    const extraH = Math.max(0, hours - BASE_HOURS);
    const extraK = Math.max(0, km - BASE_KM);
    const extraHourCost = extraH * car.extraHourRate;
    const extraKmCost = extraK * car.extraKmRate;
    return { base, extraHourCost, extraKmCost, total: base + extraHourCost + extraKmCost };
  }, [car, hours, km]);

  const waLink = buildWhatsAppLink(
    `Hello! Here is my quote breakdown:\n` +
    `Car: ${car.name} (${car.colour})\n` +
    `Hours: ${hours} hrs\n` +
    `Distance: ${km} km\n` +
    `Base (8hr/80km): ₹${base.toLocaleString('en-IN')}\n` +
    (hours > BASE_HOURS ? `Extra hours (${hours - BASE_HOURS} × ₹${car.extraHourRate}): ₹${extraHourCost.toLocaleString('en-IN')}\n` : '') +
    (km > BASE_KM ? `Extra km (${km - BASE_KM} × ₹${car.extraKmRate}): ₹${extraKmCost.toLocaleString('en-IN')}\n` : '') +
    `Total: ₹${total.toLocaleString('en-IN')}\n\n` +
    `Please confirm availability.`
  );

  const inputCls = 'w-full bg-obsidian border border-graphite rounded-sm px-4 py-3 font-inter text-sm text-ivory focus:outline-none focus:border-champagne/60 transition-colors';

  return (
    <section className="py-24 bg-onyx border-t border-graphite">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <p className="font-inter text-xs font-medium text-champagne tracking-[0.25em] uppercase mb-3">Pricing</p>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-semibold text-ivory mb-4">
              Get an Instant Quote
            </h2>
            <p className="font-inter text-sm text-muted">
              Prices update in real time as you adjust your requirements.
            </p>
          </div>

          <div className="bg-obsidian border border-graphite rounded-sm p-8 space-y-6">
            {/* Car selector */}
            <div>
              <label className="font-inter text-xs text-muted uppercase tracking-[0.15em] mb-2 block">Select Car</label>
              <div className="relative">
                <select
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                  className={`${inputCls} appearance-none pr-8`}
                >
                  {fleet.map(c => (
                    <option key={c.slug} value={c.slug}>
                      {c.name} ({c.colour}) — from ₹{c.pricePerHour.toLocaleString('en-IN')}/hr
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Hours */}
              <div>
                <label className="font-inter text-xs text-muted uppercase tracking-[0.15em] mb-2 block">
                  Hours: <span className="text-champagne tabular-nums">{hours}</span>
                </label>
                <input
                  type="range" min={1} max={24} value={hours}
                  onChange={e => setHours(Number(e.target.value))}
                  className="w-full accent-champagne"
                />
                <div className="flex justify-between font-inter text-xs text-muted mt-1">
                  <span>1 hr</span><span>24 hr</span>
                </div>
              </div>

              {/* Km */}
              <div>
                <label className="font-inter text-xs text-muted uppercase tracking-[0.15em] mb-2 block">
                  Distance: <span className="text-champagne tabular-nums">{km} km</span>
                </label>
                <input
                  type="range" min={10} max={500} step={10} value={km}
                  onChange={e => setKm(Number(e.target.value))}
                  className="w-full accent-champagne"
                />
                <div className="flex justify-between font-inter text-xs text-muted mt-1">
                  <span>10 km</span><span>500 km</span>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-onyx border border-graphite rounded-sm overflow-hidden">
              <div className="divide-y divide-graphite">
                <div className="flex justify-between items-center px-5 py-3">
                  <span className="font-inter text-sm text-muted">Base package (8 hr / 80 km)</span>
                  <span className="font-inter text-sm text-ivory tabular-nums">₹{base.toLocaleString('en-IN')}</span>
                </div>
                {hours > BASE_HOURS && (
                  <div className="flex justify-between items-center px-5 py-3">
                    <span className="font-inter text-sm text-muted">
                      Extra {hours - BASE_HOURS} hr × ₹{car.extraHourRate.toLocaleString('en-IN')}
                    </span>
                    <span className="font-inter text-sm text-ivory tabular-nums">₹{extraHourCost.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {km > BASE_KM && (
                  <div className="flex justify-between items-center px-5 py-3">
                    <span className="font-inter text-sm text-muted">
                      Extra {km - BASE_KM} km × ₹{car.extraKmRate.toLocaleString('en-IN')}
                    </span>
                    <span className="font-inter text-sm text-ivory tabular-nums">₹{extraKmCost.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between items-center px-5 py-4 bg-champagne/5">
                  <span className="font-inter text-sm font-medium text-ivory">Estimated Total</span>
                  <span className="font-inter text-2xl font-medium text-champagne tabular-nums">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <p className="font-inter text-xs text-muted">
              Estimate excludes toll and parking charges. Confirm final price on WhatsApp.
            </p>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full font-inter text-sm font-medium bg-champagne text-obsidian py-4 rounded-sm hover:bg-champagne-light transition-all duration-300 tracking-wide text-center"
            >
              Book This Quote on WhatsApp
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
