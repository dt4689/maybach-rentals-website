'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Star } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/fleet', label: 'Fleet' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const waLink = buildWhatsAppLink('Hello, I would like to book a luxury car.');

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-obsidian/95 backdrop-blur-md border-b border-graphite' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-cormorant text-xl font-semibold text-ivory tracking-widest uppercase">
              Maybach
            </span>
            <span className="font-inter text-[9px] font-medium text-champagne tracking-[0.25em] uppercase">
              Luxury Rentals Mumbai
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="font-inter text-sm text-muted hover:text-ivory transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Trust badge + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <Star className="w-3.5 h-3.5 fill-champagne text-champagne" />
              <span className="text-ivory font-medium tabular-nums">5.0</span>
              <span>(494 reviews)</span>
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-sm font-medium border border-champagne text-champagne px-5 py-2 rounded-sm hover:bg-champagne hover:text-obsidian transition-all duration-300 tracking-wide"
            >
              Book on WhatsApp
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            className="lg:hidden text-ivory p-2"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-obsidian/98 backdrop-blur-md border-t border-graphite">
          <nav className="flex flex-col px-4 py-6 gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-inter text-base text-ivory py-3 border-b border-graphite/50 hover:text-champagne transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 font-inter text-sm font-medium border border-champagne text-champagne px-5 py-3 rounded-sm text-center hover:bg-champagne hover:text-obsidian transition-all duration-300"
            >
              Book on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
