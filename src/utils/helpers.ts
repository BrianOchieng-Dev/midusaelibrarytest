import { Book, Currency } from '../types';

export const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number; label: string }> = {
  KES: { symbol: 'KSh ', rate: 130.0, label: 'KES (KSh 100)' },
  USD: { symbol: '$', rate: 1.0, label: 'USD ($0.77)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€0.71)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£0.61)' },
};

export function formatPrice(priceUSD: number, currency: Currency = 'KES'): string {
  const { symbol, rate } = CURRENCY_RATES[currency] || CURRENCY_RATES.KES;
  const converted = priceUSD * rate;
  if (currency === 'KES') {
    return `${symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${symbol}${converted.toFixed(2)}`;
}

export function generateWhatsAppUrl(bookTitle?: string, customMessage?: string): string {
  const phoneNumber = '1234567890'; // Default business line
  let text = '';
  
  if (customMessage) {
    text = customMessage;
  } else if (bookTitle) {
    text = `Hello MidusaElibrary, I would like to purchase this book for KSh 100: "${bookTitle}". Please assist me with payment and instant PDF download options.`;
  } else {
    text = 'Hello MidusaElibrary, I would like to purchase this PDF book for KSh 100.';
  }

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
}

export function generateCartWhatsAppUrl(items: { book: Book; quantity: number; selectedFormat: string }[], totalUSD: number, currency: Currency = 'KES'): string {
  const phoneNumber = '1234567890';
  const totalFormatted = formatPrice(totalUSD, currency);
  
  let itemListText = items
    .map((item, idx) => `${idx + 1}. ${item.book.title} [${item.selectedFormat}] x${item.quantity} - ${formatPrice(item.book.priceUSD * item.quantity, currency)}`)
    .join('\n');

  const message = `Hello MidusaElibrary! 📚\n\nI would like to purchase the following PDF eBooks (KSh 100 / Book):\n\n${itemListText}\n\n*Total Amount:* ${totalFormatted}\n\nPlease provide payment details (M-Pesa / Card / PayPal) and send my instant PDF download link!`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
