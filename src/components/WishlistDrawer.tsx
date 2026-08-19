import React, { useEffect } from 'react';
import { Book } from '../types';
import { formatPrice } from '../utils/helpers';
import { BookCover } from './BookCover';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';

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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col z-50 animate-slideLeft">
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-pink-100 text-pink-600">
                <Heart className="w-4 h-4 fill-pink-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Saved Books</h3>
                <p className="text-xs text-slate-500">
                  {wishlistBooks.length} {wishlistBooks.length === 1 ? 'book' : 'books'} saved
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          {wishlistBooks.length === 0 ? (
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Your wishlist is empty</h4>
              <p className="text-xs text-slate-500 max-w-xs mb-4">
                Click the heart icon on any eBook to save it for later.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl font-semibold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
              >
                Browse Books
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {wishlistBooks.map((book) => (
                <div
                  key={book.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex gap-3 items-center"
                >
                  <div className="w-12 shrink-0">
                    <BookCover book={book} size="sm" showBadge={false} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-xs text-slate-900 truncate">
                        {book.title}
                      </h4>
                      <button
                        onClick={() => onRemoveWishlist(book.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-500 truncate">
                      {book.author}
                    </p>
                    <p className="text-xs font-bold text-blue-600 mt-0.5">
                      {formatPrice(book.priceKES)}
                    </p>

                    <button
                      onClick={() => {
                        onAddToCart(book);
                        onRemoveWishlist(book.id);
                      }}
                      className="w-full mt-2 py-1 px-2.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      <span>Move to Cart</span>
                    </button>
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
