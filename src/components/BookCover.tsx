import React from 'react';
import { Book } from '../types';
import { BookOpen, Sparkles, Star, Cpu, Code2, Brain, TrendingUp, Briefcase, Rocket, GraduationCap, Target } from 'lucide-react';

interface BookCoverProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showBadge?: boolean;
  className?: string;
}

export const BookCover: React.FC<BookCoverProps> = ({
  book,
  size = 'md',
  showBadge = true,
  className = '',
}) => {
  const getCategoryIcon = () => {
    switch (book.category) {
      case 'Self Development':
        return <Sparkles className="w-4 h-4 text-purple-300" />;
      case 'Business':
        return <Briefcase className="w-4 h-4 text-sky-300" />;
      case 'Psychology':
        return <Brain className="w-4 h-4 text-pink-300" />;
      case 'Finance':
        return <TrendingUp className="w-4 h-4 text-emerald-300" />;
      case 'Entrepreneurship':
        return <Rocket className="w-4 h-4 text-amber-300" />;
      default:
        return <BookOpen className="w-4 h-4 text-blue-300" />;
    }
  };

  const dimensions = {
    sm: 'w-[140px] h-[200px]',
    md: 'w-[200px] h-[290px]',
    lg: 'w-[240px] h-[340px]',
    hero: 'w-[250px] sm:w-[280px] md:w-[320px] h-[360px] sm:h-[400px] md:h-[450px]',
  }[size];

  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-2xl transition-all duration-300 select-none group book-spine-effect ${dimensions} ${className}`}
      style={{
        background: `linear-gradient(145deg, ${book.coverGradient.from} 0%, ${book.coverGradient.via || '#111827'} 50%, ${book.coverGradient.to} 100%)`,
        boxShadow: `0 15px 35px -10px rgba(0,0,0,0.8), 0 0 25px -5px ${book.coverGradient.accent}33`,
      }}
    >
      {/* Background Tech Geometric Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(${book.coverGradient.accent} 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
        }}
      />

      {/* Glossy top-left highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/60 pointer-events-none" />

      {/* Decorative Neon Accent Lines */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 blur-2xl opacity-40 rounded-full pointer-events-none"
        style={{ backgroundColor: book.coverGradient.accent }}
      />
      <div 
        className="absolute bottom-0 left-0 w-24 h-24 blur-xl opacity-30 rounded-full pointer-events-none"
        style={{ backgroundColor: book.coverGradient.to }}
      />

      {/* Badge at top right */}
      {showBadge && book.badge && (
        <div className="absolute top-3 right-3 z-10">
          <span 
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg"
            style={{
              backgroundColor: 'rgba(10, 15, 30, 0.85)',
              color: book.coverGradient.accent,
              border: `1px solid ${book.coverGradient.accent}66`,
            }}
          >
            <Sparkles className="w-2.5 h-2.5" />
            {book.badge}
          </span>
        </div>
      )}

      {/* Main Cover Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-4 sm:p-5 pl-6 sm:pl-7 text-left">
        {/* Header: Midusa Logo / Category Pill */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 opacity-90">
              <div className="p-1 rounded-md bg-white/10 backdrop-blur-sm">
                {getCategoryIcon()}
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                {book.category}
              </span>
            </div>
          </div>

          <div className="w-8 h-1 rounded-full mb-3" style={{ backgroundColor: book.coverGradient.accent }} />

          {/* Book Title */}
          <h4 
            className={`font-bold tracking-tight text-white line-clamp-3 leading-snug drop-shadow-md ${
              size === 'sm' ? 'text-sm' : size === 'hero' ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
            }`}
          >
            {book.title}
          </h4>

          {size !== 'sm' && (
            <p className="text-[11px] text-slate-300/90 mt-1 line-clamp-2 leading-relaxed">
              {book.subtitle}
            </p>
          )}
        </div>

        {/* Footer: Author & Formats */}
        <div className="pt-2 border-t border-white/10 mt-auto">
          <div className="flex items-center justify-between text-xs text-slate-200">
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Author</p>
              <p className="font-semibold text-xs text-white truncate max-w-[120px] sm:max-w-[150px]">
                {book.author}
              </p>
            </div>
            
            <div className="flex items-center gap-1 text-amber-300 text-xs font-semibold bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{book.rating}</span>
            </div>
          </div>

          {/* Midusa Edition Watermark */}
          <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5 text-[9px] text-slate-400 tracking-wider font-mono">
            <span>MIDUSA DIGITAL</span>
            <span>{book.publicationYear} ED.</span>
          </div>
        </div>
      </div>

      {/* Book Right Edge 3D Page Thickness Visual */}
      <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-gradient-to-l from-white/40 to-transparent pointer-events-none" />
    </div>
  );
};
