import React from 'react';
import { Book, Currency } from '../types';
import { formatPrice } from '../utils/helpers';
import { BookCover } from './BookCover';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistBooks: Book[];
  onRemoveWishlist: (bookId: string) => void;
  onAddToCart: (book: Book) => void;
  currency: Currency;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistBooks,
  onRemoveWishlist,
  onAddToCart,
  currency,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-pink-100 text-pink-600">
                <Heart className="w-5 h-5 fill-pink-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Your Wishlist</h3>
                <p className="text-xs text-slate-500">
                  {wishlistBooks.length} saved {wishlistBooks.length === 1 ? 'eBook' : 'eBooks'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          {wishlistBooks.length === 0 ? (
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">Your wishlist is empty</h4>
              <p className="text-xs text-slate-500 max-w-xs mb-5">
                Click the heart icon on any eBook to save it to your personal reading wishlist.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-transform active:scale-95"
              >
                Explore eBooks
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
              {wishlistBooks.map((book) => (
                <div
                  key={book.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all flex gap-3.5"
                >
                  <BookCover book={book} size="sm" showBadge={false} className="shrink-0 !w-[64px] !h-[88px]" />
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-semibold text-xs sm:text-sm text-slate-900 line-clamp-1">
                          {book.title}
                        </h4>
                        <button
                          onClick={() => onRemoveWishlist(book.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">
                        {book.author}
                      </p>
                      <p className="text-xs font-bold text-blue-600 mt-1">
                        {formatPrice(book.priceUSD, currency)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-200">
                      <button
                        onClick={() => {
                          onAddToCart(book);
                          onRemoveWishlist(book.id);
                        }}
                        className="flex-1 py-1.5 px-3 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
