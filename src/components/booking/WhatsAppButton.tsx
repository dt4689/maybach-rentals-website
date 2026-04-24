'use client';

import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export default function WhatsAppButton() {
  const href = buildWhatsAppLink('Hello, I would like to book a luxury car in Mumbai.');
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-champagne shadow-lg hover:bg-champagne-light transition-all duration-300 hover:scale-110"
    >
      <MessageCircle className="w-6 h-6 text-obsidian" />
    </a>
  );
}
