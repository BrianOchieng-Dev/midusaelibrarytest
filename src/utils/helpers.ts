import { Book } from '../types';

export function formatPrice(priceKES: number = 100): string {
  return `KSh ${Math.round(priceKES).toLocaleString()}`;
}

export function generateWhatsAppUrl(bookTitle?: string, customText?: string): string {
  const phoneNumber = '1234567890';
  if (customText) {
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(customText)}`;
  }
  const text = bookTitle
    ? `Hello MidusaElibrary, I would like to buy the PDF eBook "${bookTitle}" for KSh 100. Please share payment and download details.`
    : 'Hello MidusaElibrary, I would like to buy a PDF eBook for KSh 100.';

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
}

export function generateCartWhatsAppUrl(
  items: { book: Book; quantity: number }[],
  totalKES: number
): string {
  const phoneNumber = '1234567890';
  const itemListText = items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.book.title} (x${item.quantity}) - KSh ${item.quantity * 100}`
    )
    .join('\n');

  const message = `Hello MidusaElibrary! 📚\n\nI would like to purchase the following PDF eBooks:\n\n${itemListText}\n\n*Total Amount:* KSh ${totalKES.toLocaleString()}\n\nPlease send M-Pesa / Card payment instructions and the instant PDF download links!`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
