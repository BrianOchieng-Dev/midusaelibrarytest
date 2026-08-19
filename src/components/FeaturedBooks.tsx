import React, { useState, useMemo } from 'react';
import { Book, BookCategory } from '../types';
import { CATEGORIES } from '../data/booksData';
import { BookCover } from './BookCover';
import { formatPrice, generateWhatsAppUrl } from '../utils/helpers';
import { 
  Search, 
  Star, 
  ShoppingCart, 
  BookOpen, 
  Heart, 
  MessageSquare, 
  Check, 
  X,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FeaturedBooksProps {
  books: Book[];
  selectedCategory: BookCategory | 'All';
  onSelectCategory: (cat: BookCategory | 'All') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPreviewBook: (book: Book) => void;
  onAddToCart: (book: Book) => void;
  onToggleWishlist: (book: Book) => void;
  wishlistIds: string[];
}

export const FeaturedBooks: React.FC<FeaturedBooksProps> = ({
  books,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onPreviewBook,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [addedBookId, setAddedBookId] = useState<string | null>(null);

  // Filter computation
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Category match
      if (selectedCategory !== 'All' && book.category !== selectedCategory) {
        return false;
      }
      // Search query match
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = book.title.toLowerCase().includes(q);
        const matchAuthor = book.author.toLowerCase().includes(q);
        const matchCategory = book.category.toLowerCase().includes(q);
        if (!matchTitle && !matchAuthor && !matchCategory) {
          return false;
        }
      }
      return true;
    });
  }, [books, selectedCategory, searchQuery]);

  const handleAddToCartWithFeedback = (book: Book) => {
    onAddToCart(book);
    setAddedBookId(book.id);
    confetti({
      particleCount: 25,
      spread: 40,
      origin: { y: 0.8 },
      colors: ['#00F2FE', '#1E90FF'],
    });
    setTimeout(() => setAddedBookId(null), 1600);
  };

  return (
    <section id="catalog" className="py-12 sm:py-16 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Complete PDF Books</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured eBook Library
            </h2>
          </div>

          <span className="text-xs font-mono text-slate-500">
            Showing <span className="text-blue-600 font-bold">{filteredBooks.length}</span> titles • <span className="text-emerald-600 font-bold">KSh 100 Each</span>
          </span>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-8 space-y-3">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, author, or category..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-9 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            <button
              onClick={() => onSelectCategory('All')}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'All'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.name
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Book Grid */}
        {filteredBooks.length === 0 ? (
          <div className="py-12 text-center rounded-2xl bg-slate-50 border border-slate-200 p-6">
            <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-900 mb-1">No books found</h3>
            <p className="text-xs text-slate-500 mb-4">
              We couldn't find any books matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                onSearchChange('');
                onSelectCategory('All');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredBooks.map((book) => {
              const isWishlisted = wishlistIds.includes(book.id);
              const isJustAdded = addedBookId === book.id;

              return (
                <div
                  key={book.id}
                  className="group rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden"
                >
                  {/* Top Cover Display Area */}
                  <div className="relative p-5 pb-2 flex items-center justify-center bg-slate-50/60">
                    {/* Wishlist Button */}
                    <button
                      onClick={() => onToggleWishlist(book)}
                      className={`absolute top-3 right-3 z-10 p-2 rounded-full border transition-all ${
                        isWishlisted
                          ? 'bg-pink-50 border-pink-200 text-pink-600'
                          : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700'
                      }`}
                      title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                      aria-label="Wishlist"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-pink-600' : ''}`} />
                    </button>

                    {/* PDF Tag */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-blue-700 font-mono text-[10px] font-bold">
                        PDF
                      </span>
                    </div>

                    {/* Book Cover */}
                    <div 
                      onClick={() => onPreviewBook(book)}
                      className="cursor-pointer transition-transform duration-200 group-hover:scale-102"
                    >
                      <BookCover book={book} size="md" />
                    </div>
                  </div>

                  {/* Book Card Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating & Category */}
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          {book.category}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 font-semibold">
                          <Star className="w-3 h-3 fill-amber-500" />
                          <span>{book.rating}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 
                        onClick={() => onPreviewBook(book)}
                        className="font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
                      >
                        {book.title}
                      </h3>

                      {/* Author */}
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        By {book.author}
                      </p>
                    </div>

                    {/* Price & Primary Actions */}
                    <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
                      
                      {/* Price row */}
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-base font-extrabold text-slate-900">
                            {formatPrice(book.priceKES)}
                          </span>
                          <span className="text-xs text-slate-400 line-through ml-2">
                            {formatPrice(book.originalPriceKES)}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {book.fileSize}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onPreviewBook(book)}
                          className="w-full py-2 px-2 rounded-xl font-semibold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center justify-center gap-1 transition-colors"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                          <span>Details</span>
                        </button>

                        <button
                          onClick={() => handleAddToCartWithFeedback(book)}
                          className={`w-full py-2 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all active:scale-95 ${
                            isJustAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added!</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>Add Cart</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* WhatsApp Order Button */}
                      <a
                        href={generateWhatsAppUrl(book.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-1.5 px-2 rounded-lg text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3 h-3 text-emerald-600" />
                        <span>Order on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
