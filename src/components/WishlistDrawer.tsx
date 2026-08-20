import React, { useEffect, useState } from 'react';
import { Book } from '../types';
import { formatPrice } from '../utils/helpers';
import { BookCover } from './BookCover';
import { 
  X, 
  Heart, 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  Sparkles,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistBooks: Book[];
  onRemoveWishlist: (bookId: string) => void;
  onAddToCart: (book: Book) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistBooks,
  onRemoveWishlist,
  onAddToCart,
}) => {
  const [movedBookId, setMovedBookId] = useState<string | null>(null);
  const [isMovingAll, setIsMovingAll] = useState(false);

  // Close on Escape key
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

  const handleMoveToCart = (book: Book) => {
    onAddToCart(book);
    setMovedBookId(book.id);
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.7 },
      colors: ['#00F2FE', '#1E90FF', '#EC4899'],
    });
    setTimeout(() => {
      onRemoveWishlist(book.id);
      setMovedBookId(null);
    }, 400);
  };

  const handleMoveAllToCart = () => {
    setIsMovingAll(true);
    wishlistBooks.forEach((book) => {
      onAddToCart(book);
      onRemoveWishlist(book.id);
    });
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#00F2FE', '#1E90FF', '#EC4899'],
    });
    setTimeout(() => {
      setIsMovingAll(false);
    }, 500);
  };

  const totalValueKES = wishlistBooks.length * 100;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md sm:max-w-lg bg-white border-l border-slate-200 shadow-2xl flex flex-col h-full z-50 animate-slideLeft">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200 bg-slate-50/80 backdrop-blur-xs shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-pink-100 text-pink-600 shadow-xs">
                <Heart className="w-5 h-5 fill-pink-600" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">
                  Saved Wishlist
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  {wishlistBooks.length} {wishlistBooks.length === 1 ? 'eBook' : 'eBooks'} saved
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
              title="Close Wishlist (Esc)"
              aria-label="Close Wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body / Scrollable Content */}
          {wishlistBooks.length === 0 ? (
            <div className="flex-1 px-6 py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-pink-50 text-pink-400 flex items-center justify-center shadow-xs border border-pink-100">
                <Heart className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-lg font-bold text-slate-900">Your wishlist is empty</h4>
                <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                  Browse our catalog and click the heart icon on any eBook to save titles you plan to read later.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explore Catalog</span>
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3 sm:space-y-4">
              {wishlistBooks.map((book) => {
                const isMoved = movedBookId === book.id;

                return (
                  <div
                    key={book.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex gap-4 items-center"
                  >
                    {/* Book Thumbnail */}
                    <div className="shrink-0 flex items-center justify-center">
                      <BookCover book={book} size="xs" showBadge={false} />
                    </div>

                    {/* Book Information & Actions */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5 space-y-2">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-100/60 uppercase tracking-wider">
                            {book.category}
                          </span>
                          
                          {/* Remove from wishlist */}
                          <button
                            onClick={() => onRemoveWishlist(book.id)}
                            className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Remove from saved books"
                            aria-label={`Remove ${book.title}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Title */}
                        <h4 className="font-bold text-sm sm:text-base text-slate-900 truncate mt-1">
                          {book.title}
                        </h4>

                        {/* Author */}
                        <p className="text-xs text-slate-500 truncate">
                          By {book.author}
                        </p>
                      </div>

                      {/* Price & Move to Cart Button */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
                        <span className="text-sm font-extrabold text-slate-900">
                          {formatPrice(book.priceKES)}
                        </span>

                        <button
                          onClick={() => handleMoveToCart(book)}
                          disabled={isMoved}
                          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer ${
                            isMoved
                              ? 'bg-emerald-600 text-white'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          {isMoved ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>Moved!</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4" />
                              <span>Move to Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer Summary / Batch Actions */}
          {wishlistBooks.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50/80 backdrop-blur-xs shrink-0 space-y-3.5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-500 font-medium">
                  Total Wishlist Value ({wishlistBooks.length} items):
                </span>
                <span className="font-extrabold text-slate-900 text-base sm:text-lg">
                  {formatPrice(totalValueKES)}
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={handleMoveAllToCart}
                  disabled={isMovingAll}
                  className="flex-1 py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                >
                  <ShoppingCart className="w-4.5 h-4.5" />
                  <span>Move All ({wishlistBooks.length}) to Cart</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </div>

              <div className="text-center pt-1">
                <button
                  onClick={onClose}
                  className="text-xs sm:text-sm text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
