import Link from 'next/link';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import Container from '@/components/ui/Container';

const footerFleet = [
  { label: 'Bentley Flying Spur W12', href: '/fleet/bentley-flying-spur-w12-white' },
  { label: 'Maybach V600 Limousine', href: '/fleet/maybach-v600-limousine-black' },
  { label: 'Mercedes-Maybach GLS600', href: '/fleet/maybach-gls600-suv-white' },
  { label: 'Range Rover Vogue', href: '/fleet/range-rover-vogue-white' },
  { label: 'Mercedes S-Class S500', href: '/fleet/mercedes-s-class-s500' },
  { label: 'BMW 7 Series', href: '/fleet/bmw-7-series' },
];

const serviceAreas = ['Andheri', 'Bandra', 'BKC', 'Colaba', 'Juhu', 'Lower Parel', 'Powai', 'Borivali'];

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-champagne/20 mt-auto">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex flex-col leading-none mb-4">
              <span className="font-cormorant text-2xl font-semibold text-ivory tracking-widest uppercase">
                Maybach
              </span>
              <span className="font-inter text-[9px] font-medium text-champagne tracking-[0.25em] uppercase">
                Luxury Rentals Mumbai
              </span>
            </Link>
            <p className="font-inter text-sm text-muted leading-relaxed mt-4 max-w-xs">
              Mumbai&apos;s most trusted chauffeur-driven luxury car service. Over 1,000 clients. 494 five-star reviews on Google.
            </p>
          </div>

          {/* Fleet */}
          <div>
            <h3 className="font-inter text-xs font-medium text-champagne tracking-[0.2em] uppercase mb-5">Fleet</h3>
            <ul className="space-y-3">
              {footerFleet.map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="font-inter text-sm text-muted hover:text-ivory transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/fleet" className="font-inter text-sm text-champagne hover:text-champagne-light transition-colors">
                  View all cars →
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-inter text-xs font-medium text-champagne tracking-[0.2em] uppercase mb-5">Service Areas</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {serviceAreas.map(area => (
                <li key={area}>
                  <span className="font-inter text-sm text-muted">{area}</span>
                </li>
              ))}
            </ul>
            <p className="font-inter text-xs text-muted mt-4">Pan-Mumbai pickup and drop.</p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-inter text-xs font-medium text-champagne tracking-[0.2em] uppercase mb-5">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://wa.me/919892904433"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-inter text-sm text-muted hover:text-ivory transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-champagne flex-shrink-0" />
                  +91 9892 904433
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919619882855"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-inter text-sm text-muted hover:text-ivory transition-colors"
                >
                  <Phone className="w-4 h-4 text-champagne flex-shrink-0" />
                  +91 9619 882855
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@maybachrental.com"
                  className="flex items-center gap-3 font-inter text-sm text-muted hover:text-ivory transition-colors"
                >
                  <Mail className="w-4 h-4 text-champagne flex-shrink-0" />
                  info@maybachrental.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-graphite flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-muted">
            &copy; {new Date().getFullYear()} Maybach Luxury Rentals Mumbai. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="font-inter text-xs text-muted hover:text-ivory transition-colors">FAQ</Link>
            <Link href="/about" className="font-inter text-xs text-muted hover:text-ivory transition-colors">About</Link>
            <Link href="/contact" className="font-inter text-xs text-muted hover:text-ivory transition-colors">Contact</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
