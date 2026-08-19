import React, { useState } from 'react';
import { Book } from '../types';
import { BookCover } from './BookCover';
import { formatPrice } from '../utils/helpers';
import { 
  BookOpen, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Flame,
  CheckCircle2,
  Info
} from 'lucide-react';

interface HeroProps {
  featuredBooks: Book[];
  onBrowseBooks: () => void;
  onPreviewBook: (book: Book) => void;
  onAddToCart: (book: Book) => void;
}

export const Hero: React.FC<HeroProps> = ({
  featuredBooks,
  onBrowseBooks,
  onPreviewBook,
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
            
            {/* Price Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs text-blue-700 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="font-semibold">Digital PDF eBooks</span>
              <span className="text-slate-300">•</span>
              <span className="font-bold text-blue-800">KSh 100 Each</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Curated Bestsellers for{' '}
              <span className="text-blue-600">
                Ambitious Minds
              </span>
            </h1>

            {/* Concise Subheadline */}
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Explore bestsellers across <span className="font-semibold text-slate-800">Self Development</span>, <span className="font-semibold text-slate-800">Business</span>, <span className="font-semibold text-slate-800">Psychology</span>, <span className="font-semibold text-slate-800">Finance</span>, and <span className="font-semibold text-slate-800">Entrepreneurship</span>. Delivered instantly in PDF format for just KSh 100.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                onClick={onBrowseBooks}
                className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 flex items-center gap-2 transition-transform active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-white" />
                <span>Browse All Books (KSh 100)</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={() => onPreviewBook(activeBook)}
                className="px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-xs flex items-center gap-2 transition-transform active:scale-95"
              >
                <Info className="w-4 h-4 text-blue-600" />
                <span>Book Overview</span>
              </button>
            </div>

            {/* Simple Trust Features */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant PDF Download</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Universal Device Support</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>WhatsApp Instant Order</span>
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
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-11/12 p-2.5 rounded-xl bg-white/95 border border-slate-200 shadow-lg backdrop-blur-md flex items-center justify-between z-20">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 font-mono flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                      Featured Title
                    </span>
                    <p className="text-xs font-bold text-slate-900 truncate max-w-[140px] sm:max-w-[170px]">
                      {activeBook.title}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-blue-600">
                      {formatPrice(activeBook.priceKES)}
                    </span>
                    <span className="block text-[9px] text-slate-400 font-mono">
                      PDF Format
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Category Selector Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-5 z-10">
              {featuredBooks.slice(0, 5).map((book, idx) => (
                <button
                  key={book.id}
                  onClick={() => setActiveHeroIdx(idx)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    activeHeroIdx === idx
                      ? 'bg-blue-600 text-white shadow-xs border border-blue-600'
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
