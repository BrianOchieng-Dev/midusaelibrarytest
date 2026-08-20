import React, { useState } from 'react';
import { Book } from '../types';
import { BookCover } from './BookCover';
import { formatPrice } from '../utils/helpers';
import { 
  BookOpen, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Sparkles,
  Smartphone
} from 'lucide-react';

interface HeroProps {
  featuredBooks: Book[];
  onBrowseBooks: () => void;
  onPreviewBook: (book: Book) => void;
  onBuyNow: (book: Book) => void;
}

export const Hero: React.FC<HeroProps> = ({
  featuredBooks,
  onBrowseBooks,
  onPreviewBook,
  onBuyNow,
}) => {
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const activeBook = featuredBooks[activeHeroIdx] || featuredBooks[0];

  return (
    <section id="hero" className="relative pt-20 pb-12 sm:pt-28 sm:pb-16 overflow-hidden bg-gradient-to-b from-blue-50/30 via-white to-white">
      {/* Background Soft Glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[550px] sm:w-[800px] h-[350px] bg-gradient-to-tr from-blue-500/10 via-sky-400/10 to-indigo-500/10 blur-[90px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Copywriting & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-5">
            
            {/* Tag Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-sm shadow-md border border-slate-800">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="font-subheading font-semibold text-slate-100">Curated Digital Library • Verified PDF Editions</span>
            </div>

            {/* Main Headline -> SF Pro Display Bold */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-slate-900 leading-[1.12]">
              Curated Bestsellers for{' '}
              <span className="text-blue-600">
                Ambitious Minds
              </span>
            </h1>

            {/* Concise Subheadline -> Outfit SemiBold / Inter */}
            <p className="text-base sm:text-lg text-slate-600 font-body font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Explore handpicked titles across <span className="font-subheading font-semibold text-slate-900">Self Development</span>, <span className="font-subheading font-semibold text-slate-900">Business</span>, <span className="font-subheading font-semibold text-slate-900">Psychology</span>, <span className="font-subheading font-semibold text-slate-900">Finance</span>, and <span className="font-subheading font-semibold text-slate-900">Entrepreneurship</span>. Instant M-Pesa checkout with immediate PDF download.
            </p>

            {/* CTA Buttons -> Inter Medium */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                onClick={onBrowseBooks}
                className="px-6 py-3.5 rounded-xl font-body font-medium text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 flex items-center gap-2.5 transition-transform active:scale-95 cursor-pointer"
              >
                <BookOpen className="w-5 h-5 text-white" />
                <span>Browse Catalog</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={() => onBuyNow(activeBook)}
                className="px-6 py-3.5 rounded-xl font-body font-medium text-sm sm:text-base bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center gap-2.5 transition-transform active:scale-95 cursor-pointer"
              >
                <Smartphone className="w-5 h-5" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Simple Trust Features */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-2 text-sm text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Instant M-Pesa Prompt</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Unique Account Download Link</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Lifetime Access</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Floating Book Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            <div className="relative book-3d-wrapper py-4">
              
              {/* Secondary book in background */}
              {featuredBooks[1] && (
                <div 
                  onClick={() => setActiveHeroIdx(1)}
                  className="absolute top-2 -right-6 opacity-50 scale-90 rotate-6 cursor-pointer hover:opacity-80 transition-all hidden sm:block z-0"
                >
                  <BookCover book={featuredBooks[1]} size="md" showBadge={false} />
                </div>
              )}

              {/* Main Featured 3D Book */}
              <div 
                className="relative z-10 cursor-pointer group book-3d-card"
                onClick={() => onPreviewBook(activeBook)}
              >
                <BookCover book={activeBook} size="hero" />

                {/* Floating Badge Over Book */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-11/12 p-3 rounded-xl bg-white/95 border border-slate-200 shadow-lg backdrop-blur-md flex items-center justify-between z-20">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-blue-600 font-mono">
                      Featured Title
                    </span>
                    <p className="text-sm font-bold text-slate-900 truncate max-w-[150px] sm:max-w-[190px]">
                      {activeBook.title}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-sm sm:text-base font-extrabold text-blue-600">
                      {formatPrice(activeBook.priceKES)}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Category Selector Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6 z-10">
              {featuredBooks.slice(0, 5).map((book, idx) => (
                <button
                  key={book.id}
                  onClick={() => setActiveHeroIdx(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeHeroIdx === idx
                      ? 'bg-blue-600 text-white shadow-xs border border-blue-600'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {book.category}
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
