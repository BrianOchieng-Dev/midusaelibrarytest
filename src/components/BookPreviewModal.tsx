import React, { useState, useEffect } from 'react';
import { Book } from '../types';
import { formatPrice, generateWhatsAppUrl } from '../utils/helpers';
import { BookCover } from './BookCover';
import { 
  X, 
  ShoppingCart, 
  Share2,
  Check,
  MessageSquare,
  Star,
  FileText,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookPreviewModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (book: Book) => void;
}

export const BookPreviewModal: React.FC<BookPreviewModalProps> = ({
  book,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

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

  if (!isOpen || !book) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddToCartClick = () => {
    onAddToCart(book);
    setAddedToCart(true);
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#1E90FF', '#00F2FE'],
    });
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50 z-20">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Books</span>
          </button>

          {/* Action Tools & Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-200 transition-colors"
              title="Share Book"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-200 transition-all"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {/* Main Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left Cover Column */}
            <div className="md:col-span-4 flex flex-col items-center justify-center space-y-2">
              <BookCover book={book} size="lg" />
              <div className="flex items-center gap-1 text-xs text-slate-500 font-mono pt-1">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>{book.fileSize}</span>
              </div>
            </div>

            {/* Right Details Column */}
            <div className="md:col-span-8 space-y-3.5">
              
              {/* Category & Rating */}
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                  {book.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{book.rating}</span>
                  <span className="text-slate-400 font-normal">({book.reviewsCount})</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                  {book.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {book.subtitle}
                </p>
              </div>

              {/* Author & Pages */}
              <div className="text-xs text-slate-500">
                <span>By </span>
                <span className="font-semibold text-slate-800">{book.author}</span>
                <span> • {book.pages} Pages • PDF</span>
              </div>

              {/* Pricing Box */}
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-slate-900">
                      {formatPrice(book.priceKES)}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      {formatPrice(book.originalPriceKES)}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Instant Download • Lifetime Access
                  </span>
                </div>

                {/* Primary CTA Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddToCartClick}
                    className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 ${
                      addedToCart 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <a
                    href={generateWhatsAppUrl(book.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Order</span>
                  </a>
                </div>
              </div>

              {/* Book Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Overview
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {book.description}
                </p>
              </div>

            </div>

          </div>

          {/* Key Takeaways Section */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              What You Will Learn
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {book.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Bar */}
        <div className="p-3.5 px-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
          <span className="text-xs text-slate-600 font-medium">
            Price: <strong className="text-slate-900 text-sm">{formatPrice(book.priceKES)}</strong> (PDF Format)
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleAddToCartClick}
              className="px-4 py-2 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
            >
              Add to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
