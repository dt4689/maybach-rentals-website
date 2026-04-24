export function buildWhatsAppLink(message: string, phone = '919892904433'): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_PRIMARY = '919892904433';
export const WHATSAPP_SECONDARY = '919619882855';
