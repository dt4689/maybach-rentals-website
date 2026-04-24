'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Car } from 'lucide-react';
import Container from '@/components/ui/Container';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const ease = [0.22, 1, 0.36, 1] as const;

const areas = [
  'Airoli', 'Andheri', 'Antop Hill', 'Bandra', 'Borivali', 'Byculla',
  'Chandivali', 'Colaba', 'Juhu', 'Lower Parel', 'Powai', 'BKC', 'Other',
];

const carOptions = [
  'No preference', 'Bentley Flying Spur W12', 'Maybach V600 Limousine',
  'Mercedes-Maybach GLS600', 'Range Rover Vogue', 'Mercedes S-Class S500',
  'BMW 7 Series', 'Audi A8L', 'Mercedes E-Class',
];

const durations = ['2 hours', '4 hours', '6 hours', '8 hours (full day)', '10 hours', '12 hours', 'Custom'];

export default function AvailabilityChecker() {
  const [form, setForm] = useState({
    date: '',
    time: '',
    duration: '',
    area: '',
    car: '',
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      'Hello! I would like to check availability for a luxury car rental.',
      `Date: ${form.date || 'TBD'}`,
      `Time: ${form.time || 'TBD'}`,
      `Duration: ${form.duration || 'TBD'}`,
      `Pickup area: ${form.area || 'TBD'}`,
      `Car preference: ${form.car || 'No preference'}`,
    ].join('\n');
    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  };

  const inputCls = 'w-full bg-obsidian border border-graphite rounded-sm px-4 py-3 font-inter text-sm text-ivory placeholder-muted focus:outline-none focus:border-champagne/60 transition-colors duration-200';

  return (
    <section id="availability" className="py-24 border-t border-graphite">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <p className="font-inter text-xs font-medium text-champagne tracking-[0.25em] uppercase mb-3">Book Now</p>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-semibold text-ivory mb-4">
              Check Availability
            </h2>
            <p className="font-inter text-sm text-muted">
              Fill in your details and we will confirm availability on WhatsApp instantly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-onyx border border-graphite rounded-sm p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="flex items-center gap-2 font-inter text-xs text-muted mb-2">
                  <Calendar className="w-3.5 h-3.5 text-champagne" />
                  Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={set('date')}
                  className={inputCls}
                  style={{ colorScheme: 'dark' }}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-inter text-xs text-muted mb-2">
                  <Clock className="w-3.5 h-3.5 text-champagne" />
                  Pickup Time
                </label>
                <input
                  type="time"
                  value={form.time}
                  onChange={set('time')}
                  className={inputCls}
                  style={{ colorScheme: 'dark' }}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-inter text-xs text-muted mb-2">
                  <Clock className="w-3.5 h-3.5 text-champagne" />
                  Duration
                </label>
                <select value={form.duration} onChange={set('duration')} className={inputCls}>
                  <option value="">Select duration</option>
                  {durations.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 font-inter text-xs text-muted mb-2">
                  <MapPin className="w-3.5 h-3.5 text-champagne" />
                  Pickup Area
                </label>
                <select value={form.area} onChange={set('area')} className={inputCls}>
                  <option value="">Select area</option>
                  {areas.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-center gap-2 font-inter text-xs text-muted mb-2">
                  <Car className="w-3.5 h-3.5 text-champagne" />
                  Car Preference
                </label>
                <select value={form.car} onChange={set('car')} className={inputCls}>
                  {carOptions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full font-inter text-sm font-medium bg-champagne text-obsidian py-4 rounded-sm hover:bg-champagne-light transition-all duration-300 tracking-wide"
            >
              Check Availability on WhatsApp
            </button>

            <p className="font-inter text-xs text-muted text-center mt-4">
              Opens WhatsApp with your details pre-filled. We reply within minutes.
            </p>
          </form>
        </motion.div>
      </Container>
    </section>
  );
}
