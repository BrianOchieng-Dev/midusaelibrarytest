import { Book, Currency } from '../types';

export const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number; label: string }> = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  KES: { symbol: 'KSh ', rate: 132.0, label: 'KES (KSh)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
};

export function formatPrice(priceUSD: number, currency: Currency = 'USD'): string {
  const { symbol, rate } = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
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
    text = `Hello MidusaElibrary, I would like to purchase this book: "${bookTitle}". Please assist me with payment and instant download options.`;
  } else {
    text = 'Hello MidusaElibrary, I would like to purchase this book.';
  }

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
}

export function generateCartWhatsAppUrl(items: { book: Book; quantity: number; selectedFormat: string }[], totalUSD: number, currency: Currency): string {
  const phoneNumber = '1234567890';
  const totalFormatted = formatPrice(totalUSD, currency);
  
  let itemListText = items
    .map((item, idx) => `${idx + 1}. ${item.book.title} [${item.selectedFormat}] x${item.quantity} - ${formatPrice(item.book.priceUSD * item.quantity, currency)}`)
    .join('\n');

  const message = `Hello MidusaElibrary! 📚\n\nI would like to purchase the following eBooks:\n\n${itemListText}\n\n*Total Amount:* ${totalFormatted}\n\nPlease provide payment details (Card/M-Pesa/PayPal) and send my instant digital delivery link!`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
