import React, { useState } from 'react';
import { CartItem, Currency } from '../types';
import { formatPrice, generateCartWhatsAppUrl } from '../utils/helpers';
import { BookCover } from './BookCover';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Tag, 
  MessageSquare, 
  CheckCircle2, 
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (bookId: string, quantity: number) => void;
  onRemoveItem: (bookId: string) => void;
  onClearCart: () => void;
  currency: Currency;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError?: boolean } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);

  if (!isOpen) return null;

  const rawSubtotalUSD = items.reduce((acc, item) => acc + item.book.priceUSD * item.quantity, 0);
  const discountAmountUSD = (rawSubtotalUSD * discountPercent) / 100;
  const finalTotalUSD = Math.max(0, rawSubtotalUSD - discountAmountUSD);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'MIDUSA20' || clean === 'ELEVATE') {
      setDiscountPercent(20);
      setPromoMessage({ text: '🎉 20% Discount applied successfully!' });
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#00F2FE', '#1E90FF', '#8B5CF6'],
      });
    } else if (clean === 'STUDENT50') {
      setDiscountPercent(50);
      setPromoMessage({ text: '🎓 Student 50% Special applied!' });
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else if (clean === '') {
      setPromoMessage({ text: 'Please enter a coupon code', isError: true });
    } else {
      setPromoMessage({ text: 'Invalid promo code. Try "MIDUSA20"', isError: true });
    }
  };

  const handleProcessOrder = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutCompleted(true);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#00F2FE', '#1E90FF', '#10B981', '#8B5CF6'],
      });
    }, 1200);
  };

  const resetAndClose = () => {
    if (checkoutCompleted) {
      onClearCart();
      setCheckoutCompleted(false);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={resetAndClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Your Library Cart</h3>
                <p className="text-xs text-slate-500">
                  {items.length} {items.length === 1 ? 'eBook' : 'eBooks'} selected
                </p>
              </div>
            </div>
            <button
              onClick={resetAndClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content / Checkout Success */}
          {checkoutCompleted ? (
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Order Confirmed!
              </h3>
              <p className="text-xs text-slate-600 mb-5">
                Your instant digital download links have been generated and sent to your email.
              </p>

              <div className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-left mb-5 space-y-2">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Order ID:</span>
                  <span className="font-mono font-semibold text-blue-600">#MDE-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Delivery:</span>
                  <span className="text-emerald-600 font-semibold">Instant Digital PDF Download</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Total Paid:</span>
                  <span className="text-slate-900 font-bold">{formatPrice(finalTotalUSD, currency)}</span>
                </div>
              </div>

              <div className="w-full space-y-2.5">
                <a
                  href={generateCartWhatsAppUrl(items, finalTotalUSD, currency)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp Delivery Backup</span>
                </a>
                <button
                  onClick={resetAndClose}
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
                >
                  Continue Browsing eBooks
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">Your cart is empty</h4>
              <p className="text-xs text-slate-500 max-w-xs mb-5">
                Explore our curated collection of best-selling PDF eBooks in Self Development, Business, Psychology, Finance, and Entrepreneurship.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-transform active:scale-95"
              >
                Browse Featured eBooks
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
                {items.map((item) => (
                  <div
                    key={item.book.id}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all flex gap-3.5"
                  >
                    <BookCover book={item.book} size="sm" showBadge={false} className="shrink-0 !w-[64px] !h-[88px]" />
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-semibold text-xs sm:text-sm text-slate-900 line-clamp-1">
                            {item.book.title}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.book.id)}
                            className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                            title="Remove from cart"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">
                          {item.book.author}
                        </p>
                        <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                          {item.selectedFormat} Format
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200">
                        <span className="font-bold text-xs text-slate-900">
                          {formatPrice(item.book.priceUSD * item.quantity, currency)}
                        </span>

                        <div className="flex items-center gap-1.5 bg-white rounded-lg p-0.5 border border-slate-200 shadow-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.book.id, item.quantity - 1)}
                            className="p-1 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold text-slate-800 px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.book.id, item.quantity + 1)}
                            className="p-1 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="pt-1">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Discount code (e.g. MIDUSA20)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 uppercase tracking-wider"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`text-xs mt-1.5 ${promoMessage.isError ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {promoMessage.text}
                    </p>
                  )}
                </form>
              </div>

              {/* Checkout Calculation & Actions */}
              <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 space-y-3.5">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span className="text-slate-800">{formatPrice(rawSubtotalUSD, currency)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Promo Discount ({discountPercent}%)</span>
                      <span>-{formatPrice(discountAmountUSD, currency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-500">
                    <span>Digital Delivery</span>
                    <span className="text-emerald-600 font-medium">FREE Instant Download</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                    <span>Total Amount</span>
                    <span className="text-blue-600">{formatPrice(finalTotalUSD, currency)}</span>
                  </div>
                </div>

                {/* Direct WhatsApp Instant Buy Button */}
                <a
                  href={generateCartWhatsAppUrl(items, finalTotalUSD, currency)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Order via WhatsApp</span>
                </a>

                {/* Instant Online Checkout Button */}
                <button
                  onClick={handleProcessOrder}
                  disabled={isCheckingOut}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Generating Delivery Tokens...</span>
                    </div>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Instant Secure Checkout</span>
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-3 text-[10px] text-slate-500 pt-0.5">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    256-Bit Encrypted
                  </span>
                  <span>•</span>
                  <span>DRM-Free PDF/ePub</span>
                  <span>•</span>
                  <span>30-Day Guarantee</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
