'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Container from '@/components/ui/Container';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const ease = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    q: 'Can I rent a car with a chauffeur?',
    a: 'Every car in our fleet is chauffeur-driven. We do not offer self-drive rentals. Your professional chauffeur is included in every booking.',
  },
  {
    q: 'Do you offer airport pickup and drop?',
    a: 'Yes. Share your flight details at the time of booking and your chauffeur will track the flight and wait at the terminal — even if the flight is delayed.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Full refund up to 24 hours before the rental start time. Cancellations within 24 hours are subject to a 50% charge.',
  },
  {
    q: 'What is included in the base package?',
    a: 'The base package covers 8 hours and 80 km of travel. Chauffeur charges are included. Toll and parking charges are billed at actuals.',
  },
  {
    q: 'Can I hire a car for a wedding baraat or phera?',
    a: 'Absolutely. Weddings are one of our most popular bookings. We provide decorated vehicles on request and can coordinate timing with your wedding planners.',
  },
  {
    q: 'Do you cover outstation trips to Pune, Lonavala, or Goa?',
    a: 'Yes. We handle outstation trips across Maharashtra and beyond. Extra km charges apply beyond the base 80 km included in your package.',
  },
  {
    q: 'How quickly do you confirm a booking?',
    a: 'Most bookings are confirmed within minutes via WhatsApp. We recommend booking at least 24 hours in advance to guarantee your preferred vehicle.',
  },
  {
    q: 'Are your cars available 24 hours a day?',
    a: 'Yes. Our fleet operates around the clock. For late-night or early-morning pickups, please mention this at the time of booking.',
  },
  {
    q: 'Can I request a specific chauffeur?',
    a: 'You can request Amol, Wasama, or Pandey by name and we will do our best to accommodate. Subject to their availability on your date.',
  },
  {
    q: 'Do you provide cars for corporate accounts?',
    a: 'Yes. We offer corporate rate cards and monthly billing for frequent clients. Contact us on WhatsApp to discuss your requirements.',
  },
  {
    q: 'Is the car available for photoshoots and film shoots?',
    a: 'Yes. Our fleet is available for fashion photoshoots, film and ad shoots, and content creation. Rates vary by shoot duration and location.',
  },
  {
    q: 'What is the payment method?',
    a: 'We accept bank transfer, UPI, and cash. Payment terms are confirmed at booking via WhatsApp.',
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.4, ease, delay: index * 0.04 }}
      className="border-b border-graphite"
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        aria-expanded={open}
      >
        <span className="font-cormorant text-xl font-semibold text-ivory leading-snug">{faq.q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-champagne"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="overflow-hidden"
          >
            <p className="font-inter text-sm text-muted leading-relaxed pb-5">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const waLink = buildWhatsAppLink('Hello, I have a question about Maybach Rentals Mumbai.');

  return (
    <>
      <div className="pt-32 pb-16 border-b border-graphite">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="font-inter text-xs font-medium text-champagne tracking-[0.25em] uppercase mb-3">FAQ</p>
            <h1 className="font-cormorant text-5xl sm:text-6xl font-semibold text-ivory tracking-[-0.02em] mb-4">
              Common questions.
            </h1>
            <p className="font-inter text-base text-muted max-w-xl">
              Everything you need to know before booking. Still have a question? Message us directly on WhatsApp.
            </p>
          </motion.div>
        </Container>
      </div>

      <Container className="py-16">
        <div className="max-w-3xl mx-auto">
          <div className="border-t border-graphite">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="mt-16 text-center bg-onyx border border-graphite rounded-sm p-10"
          >
            <h2 className="font-cormorant text-3xl font-semibold text-ivory mb-3">Still have a question?</h2>
            <p className="font-inter text-sm text-muted mb-6">Our team responds within minutes on WhatsApp.</p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-inter text-sm font-medium bg-champagne text-obsidian px-8 py-4 rounded-sm hover:bg-champagne-light transition-all duration-300 tracking-wide"
            >
              Message Us on WhatsApp
            </a>
          </motion.div>
        </div>
      </Container>
    </>
  );
}
