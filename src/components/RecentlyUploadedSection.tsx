import React, { useState } from 'react';
import { Book, BookCategory } from '../types';
import { BookCover } from './BookCover';
import { 
  Sparkles, 
  Clock, 
  ShoppingCart, 
  Eye, 
  Heart, 
  Zap, 
  FileText, 
  Star, 
  ArrowRight,
  ShieldCheck,
  Flame,
  Check
} from 'lucide-react';
import { formatPrice } from '../utils/helpers';

interface RecentlyUploadedSectionProps {
  books: Book[];
  onPreviewBook: (book: Book) => void;
  onBuyNow: (book: Book) => void;
  onAddToCart: (book: Book) => void;
  onToggleWishlist: (bookId: string) => void;
  wishlistIds: string[];
}

export const RecentlyUploadedSection: React.FC<RecentlyUploadedSectionProps> = ({
  books,
  onPreviewBook,
  onBuyNow,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [addedBookId, setAddedBookId] = useState<string | null>(null);

  // Filter only recently uploaded books or fallback to newest
  const recentBooks = books.filter(b => b.isRecentlyUploaded);
  const displayBooks = activeFilter === 'all' 
    ? recentBooks 
    : recentBooks.filter(b => b.category.toLowerCase().includes(activeFilter.toLowerCase()) || b.category === activeFilter);

  const handleAddToCartWithFeedback = (book: Book) => {
    onAddToCart(book);
    setAddedBookId(book.id);
    setTimeout(() => {
      setAddedBookId(null);
    }, 1600);
  };

  return (
    <section id="recent-uploads" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white">
      {/* Background Decorative Lighting & Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
           IMPOSED SLOGAN & HEROIC BANNER
           ========================================================================= */}
        <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 mb-12 border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-2xl overflow-hidden text-center">
          {/* Subtle glow rim */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-blue-500/20 via-sky-400/30 to-indigo-500/20 blur-xl" />
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-subheading font-semibold uppercase tracking-wider mb-4">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Fresh 2026 Uploads • Curated Digital Library</span>
          </div>

          {/* Main Heading -> SF Pro Display Bold */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
            Recently Uploaded eBooks
          </h2>

          {/* Slogan Imposed -> Outfit SemiBold & High Impact */}
          <div className="mt-4 py-3 px-4 sm:px-6 rounded-2xl bg-white/5 border border-white/10 max-w-3xl mx-auto">
            <p className="text-xl sm:text-2xl lg:text-3xl font-subheading font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-sky-100 to-indigo-200 tracking-tight">
              “Knowledge Should Never Be a Luxury — World-Class eBooks at Only 100 KES.”
            </p>
          </div>

          {/* Body Text -> Inter Regular */}
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-body font-normal max-w-2xl mx-auto leading-relaxed">
            Freshly added high-resolution PDFs in Self Development, Business, AI Leadership, and Wealth Engineering with immediate verified download links.
          </p>

          {/* Real-time Feature Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-slate-800/80 max-w-4xl mx-auto text-left">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading font-bold text-white text-sm sm:text-base">5 New Drops</div>
                <div className="font-body font-normal text-xs text-slate-400">Added This Week</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading font-bold text-white text-sm sm:text-base">Instant Access</div>
                <div className="font-body font-normal text-xs text-slate-400">M-Pesa Verified STK</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading font-bold text-white text-sm sm:text-base">High-Res PDF</div>
                <div className="font-body font-normal text-xs text-slate-400">All Devices & Kindle</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading font-bold text-white text-sm sm:text-base">KES 100 Flat</div>
                <div className="font-body font-normal text-xs text-slate-400">Lifetime Read License</div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
           CATEGORY FILTER CHIPS (Outfit SemiBold)
           ========================================================================= */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-sm font-subheading font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700/70 hover:text-white border border-slate-700'
              }`}
            >
              All Recent Uploads ({recentBooks.length})
            </button>
            <button
              onClick={() => setActiveFilter('Business')}
              className={`px-4 py-2 rounded-xl text-sm font-subheading font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'Business'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700/70 hover:text-white border border-slate-700'
              }`}
            >
              Business & AI
            </button>
            <button
              onClick={() => setActiveFilter('Self Development')}
              className={`px-4 py-2 rounded-xl text-sm font-subheading font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'Self Development'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700/70 hover:text-white border border-slate-700'
              }`}
            >
              Self Development
            </button>
            <button
              onClick={() => setActiveFilter('Finance')}
              className={`px-4 py-2 rounded-xl text-sm font-subheading font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'Finance'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700/70 hover:text-white border border-slate-700'
              }`}
            >
              Finance & Wealth
            </button>
            <button
              onClick={() => setActiveFilter('Psychology')}
              className={`px-4 py-2 rounded-xl text-sm font-subheading font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'Psychology'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700/70 hover:text-white border border-slate-700'
              }`}
            >
              Psychology
            </button>
          </div>

          <div className="text-xs text-slate-400 font-body font-normal flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Catalog synchronized • Updated August 2026</span>
          </div>
        </div>

        {/* =========================================================================
           RECENTLY UPLOADED BOOKS GRID
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayBooks.map((book) => {
            const isWishlisted = wishlistIds.includes(book.id);
            const isAdded = addedBookId === book.id;

            return (
              <div
                key={book.id}
                className="group relative flex flex-col rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden"
              >
                {/* Header Badge Strip */}
                <div className="flex items-center justify-between p-4 pb-2 border-b border-slate-800/60 bg-slate-950/40">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-subheading font-semibold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      <span>{book.badge || 'Just Uploaded'}</span>
                    </span>
                    {book.uploadedAt && (
                      <span className="text-xs text-slate-400 font-body font-normal flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {book.uploadedAt}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onToggleWishlist(book.id)}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'text-pink-400 bg-pink-500/20 border border-pink-500/30'
                        : 'text-slate-400 hover:text-pink-400 hover:bg-slate-800'
                    }`}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    aria-label={`Wishlist ${book.title}`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-pink-400' : ''}`} />
                  </button>
                </div>

                {/* Main Card Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  {/* Visual 3D Book Cover Presentation */}
                  <div className="flex justify-center mb-6 py-2 cursor-pointer" onClick={() => onPreviewBook(book)}>
                    <div className="transform transition-transform duration-300 group-hover:scale-105">
                      <BookCover book={book} size="md" />
                    </div>
                  </div>

                  {/* Metadata Row */}
                  <div className="flex items-center justify-between gap-2 text-xs mb-2">
                    <span className="text-xs font-subheading font-semibold text-blue-400 uppercase tracking-wider">
                      {book.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 font-body font-normal">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-semibold text-white">{book.rating}</span>
                      <span className="text-slate-400">({book.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Title -> SF Pro Display Bold */}
                  <h3 
                    onClick={() => onPreviewBook(book)}
                    className="text-lg sm:text-xl font-heading font-bold text-white group-hover:text-blue-400 transition-colors cursor-pointer line-clamp-1 mb-1"
                  >
                    {book.title}
                  </h3>

                  {/* Subtitle -> Outfit SemiBold */}
                  <p className="text-sm font-subheading font-semibold text-slate-300 line-clamp-2 mb-3 leading-snug">
                    {book.subtitle}
                  </p>

                  {/* Description / Summary -> Inter Regular */}
                  <p className="text-xs sm:text-sm font-body font-normal text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {book.description}
                  </p>

                  {/* Key Takeaway Snippet */}
                  {book.keyTakeaways && book.keyTakeaways.length > 0 && (
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-5">
                      <div className="text-[11px] font-subheading font-semibold uppercase text-slate-400 mb-1 flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Core Insight:</span>
                      </div>
                      <p className="text-xs font-body font-normal text-slate-300 line-clamp-1 italic">
                        "{book.keyTakeaways[0]}"
                      </p>
                    </div>
                  )}

                  {/* Footer Price & Buttons */}
                  <div className="mt-auto pt-4 border-t border-slate-800/80 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[11px] font-body font-normal text-slate-400">M-Pesa Instant Rate</div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl sm:text-2xl font-heading font-bold text-white">
                            {formatPrice(book.priceKES)}
                          </span>
                          <span className="text-xs font-body font-normal text-slate-500 line-through">
                            {formatPrice(book.originalPriceKES)}
                          </span>
                        </div>
                      </div>

                      <div className="text-right text-xs font-body font-normal text-slate-400">
                        <div>{book.pages} Pages</div>
                        <div className="text-emerald-400 font-medium">{book.fileSize}</div>
                      </div>
                    </div>

                    {/* Action Buttons -> Inter Medium */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onBuyNow(book)}
                        className="w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm font-body font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30 transition-transform active:scale-95 cursor-pointer"
                      >
                        <Zap className="w-4 h-4 text-amber-300" />
                        <span>Buy Now (100 KSh)</span>
                      </button>

                      <button
                        onClick={() => handleAddToCartWithFeedback(book)}
                        className={`w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm font-body font-medium flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-200" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 text-slate-300" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>

                    <button
                      onClick={() => onPreviewBook(book)}
                      className="w-full py-2 text-xs font-body font-medium text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview Book Details & Excerpt</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
