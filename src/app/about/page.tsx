'use client';

import { motion } from 'framer-motion';
import { Star, Users, Award, MapPin } from 'lucide-react';
import Container from '@/components/ui/Container';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { icon: Users, value: '1,000+', label: 'Clients served' },
  { icon: Star, value: '5.0', label: 'Google rating' },
  { icon: Award, value: '494', label: 'Five-star reviews' },
  { icon: MapPin, value: '12+', label: 'Mumbai neighbourhoods' },
];

export default function AboutPage() {
  const waLink = buildWhatsAppLink('Hello, I would like to know more about Maybach Rentals Mumbai.');

  return (
    <>
      <div className="pt-32 pb-16 border-b border-graphite">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="max-w-3xl"
          >
            <p className="font-inter text-xs font-medium text-champagne tracking-[0.25em] uppercase mb-3">About</p>
            <h1 className="font-cormorant text-5xl sm:text-6xl font-semibold text-ivory tracking-[-0.02em] mb-6">
              Built on trust.<br />Driven by excellence.
            </h1>
          </motion.div>
        </Container>
      </div>

      {/* Trust stats */}
      <div className="border-b border-graphite">
        <Container className="py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                className="text-center"
              >
                <s.icon className="w-6 h-6 text-champagne mx-auto mb-3" />
                <p className="font-cormorant text-4xl font-semibold text-ivory tabular-nums">{s.value}</p>
                <p className="font-inter text-xs text-muted mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>

      {/* Story */}
      <Container className="py-20">
        <div className="max-w-3xl mx-auto space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease }}
          >
            <h2 className="font-cormorant text-3xl font-semibold text-ivory mb-5">The Maybach story</h2>
            <div className="space-y-4 font-inter text-base text-muted leading-relaxed">
              <p>
                Maybach Luxury Rentals Mumbai was founded with a single conviction: that a truly great car hire is invisible. The car is immaculate, the chauffeur is present but unobtrusive, and the client arrives composed — whether it is a wedding morning, a board meeting, or a late-night airport transfer.
              </p>
              <p>
                Over a decade, we have built a fleet of more than thirty of the world&apos;s finest vehicles and a team of professional chauffeurs who understand that punctuality, discretion, and warmth are not optional extras. They are the service.
              </p>
              <p>
                Our clients return because of Amol, Wasama, and Pandey — names that appear in review after review. That trust is not manufactured; it is earned, one journey at a time.
              </p>
              <p>
                We serve all of Mumbai — from Colaba to Borivali, BKC to Airoli — and our cars are available for weddings, corporate events, airport transfers, outstation trips, and photoshoots. Every booking is confirmed directly via WhatsApp, within minutes.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease }}
            className="bg-onyx border border-graphite rounded-sm p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-4 h-4 fill-champagne text-champagne" />
              ))}
              <span className="font-inter text-sm font-medium text-ivory ml-2">5.0 on Google</span>
            </div>
            <p className="font-inter text-sm text-muted">
              494 verified five-star reviews. Every review tells the same story: an exceptional car, an exceptional chauffeur, and an experience worth sharing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease }}
            className="text-center pt-8 border-t border-graphite"
          >
            <h2 className="font-cormorant text-3xl font-semibold text-ivory mb-4">Ready to experience the difference?</h2>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-inter text-sm font-medium bg-champagne text-obsidian px-8 py-4 rounded-sm hover:bg-champagne-light transition-all duration-300 tracking-wide"
            >
              Book on WhatsApp
            </a>
          </motion.div>
        </div>
      </Container>
    </>
  );
}
