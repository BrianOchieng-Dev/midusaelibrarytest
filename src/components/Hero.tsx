import React, { useState } from 'react';
import { Book, Currency } from '../types';
import { BookCover } from './BookCover';
import { formatPrice } from '../utils/helpers';
import { 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Star, 
  Flame,
  CheckCircle2,
  Play
} from 'lucide-react';

interface HeroProps {
  featuredBooks: Book[];
  onBrowseBooks: () => void;
  onPreviewBook: (book: Book) => void;
  onAddToCart: (book: Book) => void;
  currency: Currency;
}

export const Hero: React.FC<HeroProps> = ({
  featuredBooks,
  onBrowseBooks,
  onPreviewBook,
  onAddToCart,
  currency,
}) => {
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const activeBook = featuredBooks[activeHeroIdx] || featuredBooks[0];

  return (
    <section id="hero" className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white">
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] sm:w-[850px] h-[400px] bg-gradient-to-tr from-[#1E90FF]/10 via-[#00F2FE]/10 to-[#8B5CF6]/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Floating subtle grid lines */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(203, 213, 225, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(203, 213, 225, 0.4) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Copywriting & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5 sm:space-y-6">
            
            {/* Top Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs text-blue-700 shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="font-semibold tracking-wide">Next-Gen Digital Bookstore</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-mono text-[11px]">Instant DRM-Free Delivery</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Unlock Unlimited Knowledge With{' '}
              <span className="bg-gradient-to-r from-[#1E90FF] via-[#00B4D8] to-[#0077B6] bg-clip-text text-transparent">
                MidusaElibrary
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Browse thousands of premium eBooks in <span className="font-semibold text-slate-800">Self Development</span>, <span className="font-semibold text-slate-800">Business</span>, <span className="font-semibold text-slate-800">Psychology</span>, <span className="font-semibold text-slate-800">Finance</span>, and <span className="font-semibold text-slate-800">Entrepreneurship</span>. Read anywhere with interactive sample readers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
              <button
                onClick={onBrowseBooks}
                className="px-6 py-3 rounded-xl font-bold text-sm sm:text-base bg-[#1E90FF] hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-white" />
                <span>Browse Books</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={() => onPreviewBook(activeBook)}
                className="px-6 py-3 rounded-xl font-semibold text-sm sm:text-base bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-sm flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <Play className="w-4 h-4 fill-blue-600 text-blue-600" />
                <span>Read Free Sample</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-2 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>DRM-Free Universal PDF</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Verified Editions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Instant Download</span>
              </div>
            </div>

            {/* Key Statistics Grid */}
            <div className="pt-5 border-t border-slate-100 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0">
              <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center lg:text-left">
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
                  10,000+
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                  Curated eBooks
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center lg:text-left">
                <p className="text-xl sm:text-2xl font-extrabold text-blue-600 tracking-tight font-sans">
                  5,000+
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                  Happy Readers
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center lg:text-left">
                <p className="text-xl sm:text-2xl font-extrabold text-indigo-600 tracking-tight font-sans">
                  24/7
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                  Instant Access
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Floating Book Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* 3D Stack Wrapper */}
            <div className="relative book-3d-wrapper py-6">
              
              {/* Secondary book in background for stacked 3D depth */}
              {featuredBooks[1] && (
                <div 
                  onClick={() => setActiveHeroIdx(1)}
                  className="absolute top-4 -right-6 sm:-right-8 opacity-60 scale-90 rotate-6 cursor-pointer hover:opacity-90 hover:scale-95 transition-all duration-300 hidden sm:block z-0"
                >
                  <BookCover book={featuredBooks[1]} size="md" showBadge={false} />
                </div>
              )}

              {/* Tertiary book in background */}
              {featuredBooks[2] && (
                <div 
                  onClick={() => setActiveHeroIdx(2)}
                  className="absolute top-10 -left-6 sm:-left-8 opacity-50 scale-85 -rotate-6 cursor-pointer hover:opacity-80 hover:scale-90 transition-all duration-300 hidden sm:block z-0"
                >
                  <BookCover book={featuredBooks[2]} size="md" showBadge={false} />
                </div>
              )}

              {/* Main Featured 3D Book */}
              <div 
                className="relative z-10 cursor-pointer group book-3d-card animate-float-slow"
                onClick={() => onPreviewBook(activeBook)}
              >
                <BookCover book={activeBook} size="hero" />

                {/* Floating Interactive Badge Over Book */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-11/12 p-3 rounded-xl bg-white/95 border border-slate-200 shadow-xl backdrop-blur-md flex items-center justify-between z-20 group-hover:border-blue-400 transition-colors">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 font-mono flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                      Staff Pick Today
                    </span>
                    <p className="text-xs font-bold text-slate-900 truncate max-w-[140px] sm:max-w-[170px]">
                      {activeBook.title}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-blue-600">
                      {formatPrice(activeBook.priceUSD, currency)}
                    </span>
                    <span className="block text-[9px] text-slate-400 font-mono">
                      {activeBook.pages} Pages
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Book Carousel Thumbnails Selector */}
            <div className="flex items-center gap-2 mt-6 z-10">
              {featuredBooks.slice(0, 4).map((book, idx) => (
                <button
                  key={book.id}
                  onClick={() => setActiveHeroIdx(idx)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    activeHeroIdx === idx
                      ? 'bg-blue-600 text-white shadow-sm border border-blue-500'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
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
