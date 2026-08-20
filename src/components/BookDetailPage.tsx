import React, { useState, useEffect } from 'react';
import { Book } from '../types';
import { formatPrice, generateWhatsAppUrl } from '../utils/helpers';
import { BookCover } from './BookCover';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Check, 
  MessageSquare, 
  Star, 
  FileText, 
  CheckCircle2, 
  BookOpen,
  Calendar,
  Layers,
  Globe,
  Zap,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookDetailPageProps {
  book: Book;
  allBooks: Book[];
  onBack: () => void;
  onSelectBook: (book: Book) => void;
  onBuyNow: (book: Book) => void;
  onAddToCart: (book: Book) => void;
  onToggleWishlist: (book: Book) => void;
  wishlistIds: string[];
}

export const BookDetailPage: React.FC<BookDetailPageProps> = ({
  book,
  allBooks,
  onBack,
  onSelectBook,
  onBuyNow,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Scroll to top when book changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [book.id]);

  const isWishlisted = wishlistIds.includes(book.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddToCartClick = () => {
    onAddToCart(book);
    setIsAdded(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#00F2FE', '#1E90FF', '#10B981'],
    });
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Find related books in the same category (excluding current book)
  const relatedBooks = allBooks
    .filter((b) => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  return (
    <div className="pt-20 pb-16 min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Breadcrumb Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-4 mb-6 border-b border-slate-200">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4.5 h-4.5 text-blue-600" />
            <span>Back to Catalog</span>
          </button>

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 overflow-hidden">
            <button 
              onClick={onBack}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-slate-600 font-medium">{book.category}</span>
            <span>/</span>
            <span className="font-bold text-slate-900 truncate max-w-[200px] sm:max-w-sm">
              {book.title}
            </span>
          </nav>
        </div>

        {/* Main Book Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Book Cover & Quick Actions */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* 3D Cover Display Container */}
            <div className="w-full max-w-sm p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />
              
              <div className="transition-transform duration-300 hover:scale-102">
                <BookCover book={book} size="hero" />
              </div>

              {/* Badges Under Cover */}
              <div className="flex items-center justify-center gap-3.5 mt-6 pt-4 border-t border-slate-100 w-full text-xs sm:text-sm text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="font-mono">{book.fileSize}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>{book.pages} Pages</span>
                </div>
                <span>•</span>
                <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold font-mono text-xs">
                  PDF
                </span>
              </div>
            </div>

            {/* Actions Card */}
            <div className="w-full max-w-sm mt-5 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3.5">
              
              {/* Primary Buy Now with M-Pesa Button */}
              <button
                onClick={() => onBuyNow(book)}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2.5 transition-transform active:scale-98 cursor-pointer"
              >
                <Smartphone className="w-5 h-5" />
                <span>Buy Now with M-Pesa ({formatPrice(book.priceKES)})</span>
              </button>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCartClick}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-xs'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4.5 h-4.5 text-emerald-600" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4.5 h-4.5 text-slate-600" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              {/* WhatsApp Direct Order */}
              <a
                href={generateWhatsAppUrl(book.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm text-emerald-800 hover:text-emerald-900 bg-emerald-50/70 hover:bg-emerald-100/90 border border-emerald-200/80 flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Order via WhatsApp</span>
              </a>

              {/* Wishlist & Share Secondary Bar */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={() => onToggleWishlist(book)}
                  className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'bg-pink-50 border-pink-200 text-pink-600'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-pink-600' : ''}`} />
                  <span>{isWishlisted ? 'In Wishlist' : 'Save Book'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-600">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Share Link</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

          {/* Right Column: Complete Book Information */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header & Title */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              
              {/* Category & Star Rating */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs sm:text-sm font-bold border border-blue-100">
                  {book.category}
                </span>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-amber-500 font-semibold bg-amber-50/60 px-3 py-1 rounded-full border border-amber-100">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span>{book.rating}</span>
                  <span className="text-slate-400 font-normal">
                    ({book.reviewsCount} verified reader reviews)
                  </span>
                </div>
              </div>

              {/* Book Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {book.title}
                </h1>
                <p className="text-base sm:text-lg text-slate-600 mt-2 leading-relaxed">
                  {book.subtitle}
                </p>
              </div>

              {/* Author & Specs Bar */}
              <div className="pt-2 flex items-center gap-2 text-sm text-slate-600">
                <span>Written by</span>
                <span className="font-bold text-slate-900 text-base">{book.author}</span>
              </div>

              {/* Price Banner */}
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-wrap items-center justify-between gap-4 mt-4">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                      {formatPrice(book.priceKES)}
                    </span>
                    <span className="text-sm sm:text-base text-slate-400 line-through">
                      {formatPrice(book.originalPriceKES)}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Complete digital edition • Instant PDF delivery
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-700 font-semibold bg-emerald-100/70 px-3.5 py-2 rounded-xl border border-emerald-200">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span>Unique Download Link</span>
                </div>
              </div>

            </div>

            {/* Detailed Synopsis / Overview */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3.5">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>Book Description & Overview</span>
              </h2>
              <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-3.5 pt-1">
                <p>{book.description}</p>
                <p>
                  This comprehensive eBook has been carefully formatted for digital reading on all screens, including smartphones, tablets, laptops, and e-readers. You receive the complete unabridged text in high-resolution PDF format.
                </p>
              </div>
            </div>

            {/* Key Takeaways Grid */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>What You Will Learn from this Book</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {book.keyTakeaways.map((takeaway, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5"
                  >
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-slate-700 leading-snug">
                      {takeaway}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                File Specifications & Compatibility
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-xs uppercase font-mono">Format</span>
                  <span className="font-bold text-slate-900 mt-1 flex items-center gap-1.5 text-sm">
                    <FileText className="w-4 h-4 text-blue-600" />
                    PDF (Print / Screen)
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-xs uppercase font-mono">File Size</span>
                  <span className="font-bold text-slate-900 mt-1 flex items-center gap-1.5 text-sm">
                    <Layers className="w-4 h-4 text-blue-600" />
                    {book.fileSize}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-xs uppercase font-mono">Pages</span>
                  <span className="font-bold text-slate-900 mt-1 flex items-center gap-1.5 text-sm">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    {book.pages} Pages
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-xs uppercase font-mono">Language</span>
                  <span className="font-bold text-slate-900 mt-1 flex items-center gap-1.5 text-sm">
                    <Globe className="w-4 h-4 text-blue-600" />
                    English
                  </span>
                </div>
              </div>
            </div>

            {/* Related Books in this Category */}
            {relatedBooks.length > 0 && (
              <div className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    More in {book.category}
                  </h3>
                  <button
                    onClick={onBack}
                    className="text-sm text-blue-600 hover:underline font-semibold cursor-pointer"
                  >
                    View All
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  {relatedBooks.map((relBook) => (
                    <div
                      key={relBook.id}
                      onClick={() => onSelectBook(relBook)}
                      className="group p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-center p-2">
                        <BookCover book={relBook} size="sm" showBadge={false} />
                      </div>
                      <div className="mt-2.5 text-left">
                        <h4 className="font-bold text-sm text-slate-900 truncate group-hover:text-blue-600">
                          {relBook.title}
                        </h4>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          {relBook.author}
                        </p>
                        <p className="text-sm font-bold text-blue-600 mt-1.5">
                          {formatPrice(relBook.priceKES)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
