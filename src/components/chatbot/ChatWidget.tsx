'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, ExternalLink } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { fleet } from '@/lib/fleet-data';

const ease = [0.22, 1, 0.36, 1] as const;

type Message = { role: 'user' | 'assistant'; content: string };

const SUGGESTED = [
  'Suggest a car for my wedding',
  'What is available this Saturday?',
  'Best car for airport pickup with 6 people',
];

function findCarSlug(text: string): string | null {
  for (const car of fleet) {
    if (text.toLowerCase().includes(car.name.toLowerCase())) return car.slug;
  }
  return null;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const next: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';

      setMessages(m => [...m, { role: 'assistant', content: '' }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          assistantText += decoder.decode(value, { stream: true });
          setMessages(m => {
            const updated = [...m];
            updated[updated.length - 1] = { role: 'assistant', content: assistantText };
            return updated;
          });
        }
      }
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Sorry, something went wrong. Please try again or message us directly on WhatsApp.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      {/* Trigger bubble — sits above WhatsApp button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : 'Open chat assistant'}
        className="fixed bottom-24 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-onyx border border-champagne/40 text-champagne shadow-lg hover:bg-graphite hover:border-champagne transition-all duration-300"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
              <X className="w-5 h-5" />
            </motion.span>
          ) : (
            <motion.span key="msg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageSquare className="w-5 h-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.3, ease }}
            className="fixed bottom-40 right-6 z-40 w-[90vw] sm:w-[380px] h-[560px] bg-obsidian border border-graphite rounded-sm shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-graphite bg-onyx">
              <div>
                <p className="font-cormorant text-lg font-semibold text-ivory">Booking Assistant</p>
                <p className="font-inter text-xs text-muted">Ask about cars, pricing, or availability</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-muted hover:text-ivory transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-hidden">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="font-inter text-sm text-muted text-center py-4">
                    Hello! I can help you choose the perfect car or answer any questions.
                  </p>
                  {SUGGESTED.map(s => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="w-full text-left font-inter text-sm text-ivory bg-onyx border border-graphite rounded-sm px-4 py-3 hover:border-champagne/40 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m, i) => {
                const carSlug = m.role === 'assistant' ? findCarSlug(m.content) : null;
                return (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-sm px-4 py-3 ${m.role === 'user' ? 'bg-champagne text-obsidian' : 'bg-onyx border border-graphite text-ivory'}`}>
                      <p className="font-inter text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                      {carSlug && m.role === 'assistant' && (
                        <a
                          href={buildWhatsAppLink(`Hello, I am interested in booking the car mentioned. Please share availability.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 flex items-center gap-1.5 font-inter text-xs font-medium text-champagne hover:text-champagne-light transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Book this car on WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}

              {loading && messages[messages.length - 1]?.role !== 'assistant' && (
                <div className="flex justify-start">
                  <div className="bg-onyx border border-graphite rounded-sm px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                          className="w-1.5 h-1.5 rounded-full bg-champagne"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-graphite bg-onyx">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask anything..."
                  disabled={loading}
                  className="flex-1 bg-obsidian border border-graphite rounded-sm px-3 py-2.5 font-inter text-sm text-ivory placeholder-muted focus:outline-none focus:border-champagne/60 transition-colors disabled:opacity-50"
                />
                <button
                  onClick={() => send(input)}
                  disabled={loading || !input.trim()}
                  aria-label="Send"
                  className="w-9 h-9 flex items-center justify-center bg-champagne text-obsidian rounded-sm hover:bg-champagne-light transition-colors disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
