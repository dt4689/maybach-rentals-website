import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/booking/WhatsAppButton';
import ChatWidget from '@/components/chatbot/ChatWidget';

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant-var',
});

const inter = Inter({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-var',
});

export const metadata: Metadata = {
  title: 'Maybach Luxury Car Rentals Mumbai — Chauffeur-Driven Mercedes, Bentley, Range Rover',
  description: 'Mumbai\'s premier chauffeur-driven luxury car rental service. Maybach, Bentley, Range Rover, and more. Pan-Mumbai pickup. 5.0 Google rating, 494 reviews.',
  keywords: 'luxury car rental Mumbai, chauffeur driven Mumbai, Maybach rental Mumbai, Bentley rental Mumbai, Range Rover rental Mumbai',
  openGraph: {
    title: 'Maybach Luxury Car Rentals Mumbai',
    description: 'Chauffeur-driven Maybach, Bentley, and Range Rover. Delivered to your door, anywhere in Mumbai.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-dvh flex flex-col bg-obsidian text-ivory antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ChatWidget />
      </body>
    </html>
  );
}
