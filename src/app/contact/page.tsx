'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import Container from '@/components/ui/Container';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const ease = [0.22, 1, 0.36, 1] as const;

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello! Contact form submission:\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nMessage: ${form.message}`;
    window.open(buildWhatsAppLink(msg), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const inputCls = 'w-full bg-onyx border border-graphite rounded-sm px-4 py-3 font-inter text-sm text-ivory placeholder-muted focus:outline-none focus:border-champagne/60 transition-colors duration-200';

  return (
    <>
      <div className="pt-32 pb-16 border-b border-graphite">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="font-inter text-xs font-medium text-champagne tracking-[0.25em] uppercase mb-3">Contact</p>
            <h1 className="font-cormorant text-5xl sm:text-6xl font-semibold text-ivory tracking-[-0.02em] mb-4">
              Let us know how<br />we can help.
            </h1>
          </motion.div>
        </Container>
      </div>

      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-cormorant text-2xl font-semibold text-ivory mb-6">Get in touch</h2>
              <div className="space-y-5">
                <a
                  href="https://wa.me/919892904433"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-sm bg-graphite flex items-center justify-center flex-shrink-0 group-hover:bg-champagne/10 transition-colors">
                    <MessageCircle className="w-4 h-4 text-champagne" />
                  </div>
                  <div>
                    <p className="font-inter text-xs text-muted uppercase tracking-[0.15em] mb-0.5">WhatsApp (Primary)</p>
                    <p className="font-inter text-sm text-ivory group-hover:text-champagne transition-colors">+91 9892 904433</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/919619882855"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-sm bg-graphite flex items-center justify-center flex-shrink-0 group-hover:bg-champagne/10 transition-colors">
                    <Phone className="w-4 h-4 text-champagne" />
                  </div>
                  <div>
                    <p className="font-inter text-xs text-muted uppercase tracking-[0.15em] mb-0.5">WhatsApp (Secondary)</p>
                    <p className="font-inter text-sm text-ivory group-hover:text-champagne transition-colors">+91 9619 882855</p>
                  </div>
                </a>

                <a
                  href="mailto:info@maybachrental.com"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-sm bg-graphite flex items-center justify-center flex-shrink-0 group-hover:bg-champagne/10 transition-colors">
                    <Mail className="w-4 h-4 text-champagne" />
                  </div>
                  <div>
                    <p className="font-inter text-xs text-muted uppercase tracking-[0.15em] mb-0.5">Email</p>
                    <p className="font-inter text-sm text-ivory group-hover:text-champagne transition-colors">info@maybachrental.com</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-graphite flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-champagne" />
                  </div>
                  <div>
                    <p className="font-inter text-xs text-muted uppercase tracking-[0.15em] mb-0.5">Service area</p>
                    <p className="font-inter text-sm text-ivory">Pan-Mumbai — all neighbourhoods</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-onyx border border-graphite rounded-sm h-56 flex items-center justify-center">
              {/* TODO: replace with embedded Google Map */}
              <p className="font-inter text-xs text-muted">Map — Mumbai, Maharashtra</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            {sent ? (
              <div className="bg-onyx border border-graphite rounded-sm p-10 text-center h-full flex flex-col items-center justify-center">
                <p className="font-cormorant text-3xl font-semibold text-ivory mb-3">Message sent!</p>
                <p className="font-inter text-sm text-muted">
                  We have opened WhatsApp with your details. We will respond within minutes.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 font-inter text-sm text-champagne hover:text-champagne-light transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-onyx border border-graphite rounded-sm p-8 space-y-5">
                <h2 className="font-cormorant text-2xl font-semibold text-ivory mb-2">Send a message</h2>
                <p className="font-inter text-sm text-muted mb-4">Your message will open in WhatsApp for an instant reply.</p>

                <div>
                  <label className="font-inter text-xs text-muted mb-1.5 block">Name</label>
                  <input type="text" value={form.name} onChange={set('name')} required placeholder="Your name" className={inputCls} />
                </div>
                <div>
                  <label className="font-inter text-xs text-muted mb-1.5 block">Phone</label>
                  <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" className={inputCls} />
                </div>
                <div>
                  <label className="font-inter text-xs text-muted mb-1.5 block">Email</label>
                  <input type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" className={inputCls} />
                </div>
                <div>
                  <label className="font-inter text-xs text-muted mb-1.5 block">Message</label>
                  <textarea
                    value={form.message}
                    onChange={set('message')}
                    required
                    rows={4}
                    placeholder="Tell us about your requirement..."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full font-inter text-sm font-medium bg-champagne text-obsidian py-4 rounded-sm hover:bg-champagne-light transition-all duration-300 tracking-wide"
                >
                  Send via WhatsApp
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </>
  );
}
