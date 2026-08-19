import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { formatPrice, generateCartWhatsAppUrl } from '../utils/helpers';
import { BookCover } from './BookCover';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  MessageSquare, 
  CheckCircle2, 
  Lock,
  Download,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (bookId: string, quantity: number) => void;
  onRemoveItem: (bookId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalKES = items.reduce((acc, item) => acc + item.book.priceKES * item.quantity, 0);

  const handleProcessOrder = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutCompleted(true);
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#00F2FE', '#1E90FF', '#10B981'],
      });
    }, 1000);
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
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={resetAndClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col z-50 animate-slideLeft">
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Shopping Cart</h3>
                <p className="text-xs text-slate-500">
                  {items.length} {items.length === 1 ? 'book' : 'books'} selected
                </p>
              </div>
            </div>
            <button
              onClick={resetAndClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              title="Close Cart (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content / Checkout Success */}
          {checkoutCompleted ? (
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Order Successful!
              </h3>
              <p className="text-xs text-slate-600 mb-5">
                Your PDF download links are ready.
              </p>

              <div className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-left mb-5 space-y-2">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Order ID:</span>
                  <span className="font-mono font-semibold text-blue-600">#MDE-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Delivery:</span>
                  <span className="text-emerald-600 font-semibold">Instant PDF</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Total Paid:</span>
                  <span className="text-slate-900 font-bold">{formatPrice(totalKES)}</span>
                </div>
              </div>

              <div className="w-full space-y-2">
                <button
                  onClick={resetAndClose}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF eBooks</span>
                </button>

                <button
                  onClick={resetAndClose}
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-1">
                Your cart is empty
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mb-5">
                Explore our bestsellers in Self Development, Business, Psychology, Finance, and Entrepreneurship for KSh 100 each.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
              >
                Browse Books
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                
                {/* Clear Cart Confirmation Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">Selected eBooks</span>
                  {showClearConfirm ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-rose-600 font-medium">Clear all?</span>
                      <button
                        onClick={() => {
                          onClearCart();
                          setShowClearConfirm(false);
                        }}
                        className="text-[11px] font-bold text-rose-600 hover:underline"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setShowClearConfirm(false)}
                        className="text-[11px] text-slate-500 hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowClearConfirm(true)}
                      className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  )}
                </div>

                {/* Items */}
                {items.map((item) => (
                  <div
                    key={item.book.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex gap-3 items-center"
                  >
                    <div className="w-12 shrink-0">
                      <BookCover book={item.book} size="sm" showBadge={false} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {item.book.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 truncate">
                        {item.book.author}
                      </p>
                      <p className="text-xs font-bold text-blue-600 mt-1">
                        {formatPrice(item.book.priceKES * item.quantity)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.book.id, item.quantity - 1)}
                        className="p-1 text-slate-500 hover:text-slate-900 rounded"
                        title="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.book.id, item.quantity + 1)}
                        className="p-1 text-slate-500 hover:text-slate-900 rounded"
                        title="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Remove item button */}
                    <button
                      onClick={() => onRemoveItem(item.book.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded"
                      title="Remove item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Checkout Calculation & Actions */}
              <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Format</span>
                    <span className="text-slate-800 font-medium">Digital PDF</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Delivery</span>
                    <span className="text-emerald-600 font-medium">Instant Download</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                    <span>Total Amount</span>
                    <span className="text-blue-600">{formatPrice(totalKES)}</span>
                  </div>
                </div>

                {/* Direct WhatsApp Instant Buy Button */}
                <a
                  href={generateCartWhatsAppUrl(items, totalKES)}
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
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Instant Checkout</span>
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
