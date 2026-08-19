import React, { useState, useMemo } from 'react';
import { Book, BookCategory, BookFormat, Currency } from '../types';
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
  ArrowUpDown, 
  LayoutGrid, 
  List, 
  Volume2, 
  Check, 
  X,
  Flame,
  Clock
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
  currency: Currency;
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
  currency,
}) => {
  const [sortBy, setSortBy] = useState<'trending' | 'rating' | 'price-asc' | 'price-desc' | 'newest'>('trending');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [maxPrice, setMaxPrice] = useState<number>(60);
  const [addedBookId, setAddedBookId] = useState<string | null>(null);

  // Filter and sort computation
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        // Category match
        if (selectedCategory !== 'All' && book.category !== selectedCategory) {
          return false;
        }
        // Price limit
        if (book.priceUSD > maxPrice) {
          return false;
        }
        // Search query match
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchTitle = book.title.toLowerCase().includes(q);
          const matchAuthor = book.author.toLowerCase().includes(q);
          const matchCategory = book.category.toLowerCase().includes(q);
          const matchDesc = book.description.toLowerCase().includes(q);
          if (!matchTitle && !matchAuthor && !matchCategory && !matchDesc) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'trending') return b.reviewsCount - a.reviewsCount;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
        if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
        if (sortBy === 'newest') return b.publicationYear - a.publicationYear;
        return 0;
      });
  }, [books, selectedCategory, maxPrice, searchQuery, sortBy]);

  const handleAddToCartWithFeedback = (book: Book) => {
    onAddToCart(book);
    setAddedBookId(book.id);
    confetti({
      particleCount: 25,
      spread: 40,
      origin: { y: 0.8 },
      colors: ['#00F2FE', '#1E90FF'],
    });
    setTimeout(() => setAddedBookId(null), 1800);
  };

  return (
    <section id="catalog" className="py-14 sm:py-20 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Verified Best Sellers & New Releases</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured eBook Library
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Instant digital delivery with free sample chapters, audio narration, and DRM-free lifetime updates.
            </p>
          </div>

          {/* View Mode & Count */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500">
              Showing <span className="text-blue-600 font-bold">{filteredBooks.length}</span> titles
            </span>
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm mb-8 space-y-3.5">
          
          {/* Row 1: Search & Sorting */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            
            {/* Search Input */}
            <div className="sm:col-span-6 lg:col-span-7 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by book title, author, keyword, or topic..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="sm:col-span-6 lg:col-span-5 flex items-center gap-2">
              <div className="relative flex-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                >
                  <option value="trending">Most Popular & Best Sellers</option>
                  <option value="rating">Highest Rated (4.9+ ★)</option>
                  <option value="newest">Newest Editions (2026)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              {/* Format Indicator */}
              <div className="hidden lg:flex items-center gap-1.5 bg-blue-50/80 px-3 py-1.5 rounded-xl border border-blue-200/80 text-xs font-semibold text-blue-700">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Format: Universal PDF</span>
              </div>
            </div>
          </div>

          {/* Row 2: Category Filter Horizontal Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
            <button
              onClick={() => onSelectCategory('All')}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'All'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              All Domains
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.name
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-70">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Content Grid / List */}
        {filteredBooks.length === 0 ? (
          <div className="py-14 text-center rounded-3xl bg-slate-50 border border-slate-200 p-8">
            <div className="w-14 h-14 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No eBooks found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mb-5">
              We couldn't find any eBooks matching "{searchQuery}". Try searching for another topic or author.
            </p>
            <button
              onClick={() => {
                onSearchChange('');
                onSelectCategory('All');
              }}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition-transform active:scale-95"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredBooks.map((book) => {
              const isWishlisted = wishlistIds.includes(book.id);
              const isJustAdded = addedBookId === book.id;

              return (
                <div
                  key={book.id}
                  className="group relative rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1"
                >
                  {/* Top Cover Display Area */}
                  <div className="relative p-5 pb-2 flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
                    {/* Wishlist Heart Button */}
                    <button
                      onClick={() => onToggleWishlist(book)}
                      className={`absolute top-3 right-3 z-20 p-2 rounded-full border transition-all ${
                        isWishlisted
                          ? 'bg-pink-50 border-pink-200 text-pink-600'
                          : 'bg-white/90 border-slate-200 text-slate-400 hover:text-slate-800 hover:bg-white'
                      }`}
                      title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-pink-600' : ''}`} />
                    </button>

                    {/* Format Badge */}
                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-2 py-0.5 rounded-md bg-white/95 border border-slate-200 text-blue-700 shadow-xs font-mono text-[10px] font-bold tracking-wide">
                        PDF
                      </span>
                    </div>

                    {/* Book Cover with 3D hover */}
                    <div 
                      onClick={() => onPreviewBook(book)}
                      className="cursor-pointer transition-transform duration-300 group-hover:scale-105"
                    >
                      <BookCover book={book} size="md" />
                    </div>
                  </div>

                  {/* Book Card Body */}
                  <div className="p-5 pt-2 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating & Reading time */}
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                        <div className="flex items-center gap-1 text-amber-500 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span>{book.rating}</span>
                          <span className="text-slate-400 font-normal">({book.reviewsCount})</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{book.readingTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 
                        onClick={() => onPreviewBook(book)}
                        className="font-bold text-base text-slate-900 hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer leading-snug"
                      >
                        {book.title}
                      </h3>

                      {/* Author */}
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        By <span className="text-slate-700 font-medium">{book.author}</span>
                      </p>

                      {/* Short Description */}
                      <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                        {book.subtitle}
                      </p>
                    </div>

                    {/* Price & Primary Actions */}
                    <div className="pt-3.5 mt-3.5 border-t border-slate-100 space-y-2">
                      
                      {/* Price row */}
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-lg font-extrabold text-slate-900">
                            {formatPrice(book.priceUSD, currency)}
                          </span>
                          <span className="text-xs text-slate-400 line-through ml-2 font-normal">
                            {formatPrice(book.originalPriceUSD, currency)}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                          Instant DRM-Free
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        {/* Quick Preview Button */}
                        <button
                          onClick={() => onPreviewBook(book)}
                          className="w-full py-2 px-2.5 rounded-xl font-semibold text-xs bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                          <span>Sample</span>
                        </button>

                        {/* Add to Cart Button */}
                        <button
                          onClick={() => handleAddToCartWithFeedback(book)}
                          className={`w-full py-2 px-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
                            isJustAdded
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-[#1E90FF] hover:bg-blue-600 text-white shadow-sm shadow-blue-500/20'
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

                      {/* Direct WhatsApp Instant Buy link */}
                      <a
                        href={generateWhatsAppUrl(book.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-1.5 px-2 rounded-lg text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3 h-3 text-emerald-600" />
                        <span>Order via WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="space-y-3.5">
            {filteredBooks.map((book) => {
              const isJustAdded = addedBookId === book.id;

              return (
                <div
                  key={book.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 transition-all flex flex-col md:flex-row gap-4 items-start md:items-center justify-between shadow-xs hover:shadow-sm"
                >
                  <div className="flex gap-4 items-start">
                    <div 
                      onClick={() => onPreviewBook(book)}
                      className="cursor-pointer shrink-0"
                    >
                      <BookCover book={book} size="sm" showBadge={false} />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {book.category}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span>{book.rating}</span>
                        </div>
                      </div>

                      <h3 
                        onClick={() => onPreviewBook(book)}
                        className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 cursor-pointer"
                      >
                        {book.title}
                      </h3>

                      <p className="text-xs text-slate-500">
                        By <span className="text-slate-700">{book.author}</span> • {book.pages} Pages • {book.readingTime}
                      </p>

                      <p className="text-xs text-slate-500 line-clamp-2 max-w-2xl pt-0.5">
                        {book.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-left md:text-right">
                      <p className="text-lg font-extrabold text-slate-900">
                        {formatPrice(book.priceUSD, currency)}
                      </p>
                      <p className="text-xs text-slate-400 line-through font-normal">
                        {formatPrice(book.originalPriceUSD, currency)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onPreviewBook(book)}
                        className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                        title="Read Sample"
                      >
                        <BookOpen className="w-4 h-4 text-blue-600" />
                      </button>
                      
                      <button
                        onClick={() => handleAddToCartWithFeedback(book)}
                        className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                          isJustAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-500 text-white'
                        }`}
                      >
                        {isJustAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
                        <span>{isJustAdded ? 'Added' : 'Add to Cart'}</span>
                      </button>

                      <a
                        href={generateWhatsAppUrl(book.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                        title="Order on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
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
