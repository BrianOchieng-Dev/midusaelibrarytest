import React, { useState } from 'react';
import { Book, Currency } from '../types';
import { formatPrice, generateWhatsAppUrl } from '../utils/helpers';
import { BookCover } from './BookCover';
import { 
  X, 
  BookOpen, 
  Volume2, 
  ShoppingCart, 
  Sparkles, 
  Download, 
  Sun, 
  Moon, 
  Coffee, 
  ChevronRight, 
  Share2,
  Check,
  Play,
  Pause,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookPreviewModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (book: Book) => void;
  currency: Currency;
}

export const BookPreviewModal: React.FC<BookPreviewModalProps> = ({
  book,
  isOpen,
  onClose,
  onAddToCart,
  currency,
}) => {
  const [activeTab, setActiveTab] = useState<'read' | 'contents'>('read');
  const [readingTheme, setReadingTheme] = useState<'dark' | 'sepia' | 'light'>('light');
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif' | 'mono'>('serif');
  const [selectedChapterIdx, setSelectedChapterIdx] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadedSample, setDownloadedSample] = useState(false);

  if (!isOpen || !book) return null;

  const currentChapter = book.tableOfContents[selectedChapterIdx] || book.tableOfContents[0];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadSample = () => {
    setDownloadedSample(true);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#1E90FF', '#00F2FE', '#8B5CF6'],
    });
    setTimeout(() => setDownloadedSample(false), 3000);
  };

  const themeStyles = {
    dark: 'bg-slate-900 text-slate-100 border-slate-800',
    sepia: 'bg-[#FBF0D9] text-[#433422] border-[#E8D4B0]',
    light: 'bg-white text-slate-900 border-slate-200',
  }[readingTheme];

  const fontClass = {
    sans: 'reader-sans',
    serif: 'reader-serif',
    mono: 'reader-mono',
  }[fontFamily];

  const fontSizeClass = {
    sm: 'text-sm leading-relaxed',
    md: 'text-base sm:text-lg leading-loose',
    lg: 'text-lg sm:text-xl leading-loose',
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-5xl h-[92vh] max-h-[850px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200 bg-slate-50 z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Interactive Preview
                </span>
                <span className="text-xs text-slate-500 hidden sm:inline">
                  {book.category}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate max-w-[200px] sm:max-w-md">
                {book.title}
              </h3>
            </div>
          </div>

          {/* Action Tools & Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors"
              title="Share Book Preview"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reader Subheader Controls (Themes, Fonts, Tabs) */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-2.5 bg-white border-b border-slate-200 text-xs text-slate-600">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('read')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'read'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read Sample</span>
            </button>
            <button
              onClick={() => setActiveTab('contents')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'contents'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="font-mono">#</span>
              <span>Table of Contents</span>
            </button>
          </div>

          {/* Reader Customizer (When in reading mode) */}
          {activeTab === 'read' && (
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Selector */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                <button
                  onClick={() => setReadingTheme('light')}
                  className={`p-1.5 rounded ${readingTheme === 'light' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'}`}
                  title="Light Theme"
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setReadingTheme('sepia')}
                  className={`p-1.5 rounded ${readingTheme === 'sepia' ? 'bg-[#E8D4B0] text-[#433422]' : 'text-slate-500'}`}
                  title="Warm Sepia Theme"
                >
                  <Coffee className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setReadingTheme('dark')}
                  className={`p-1.5 rounded ${readingTheme === 'dark' ? 'bg-slate-800 text-white' : 'text-slate-500'}`}
                  title="Dark Theme"
                >
                  <Moon className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Font Family Selector */}
              <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                <button
                  onClick={() => setFontFamily('serif')}
                  className={`px-2 py-1 rounded text-xs ${fontFamily === 'serif' ? 'bg-white text-blue-600 shadow-xs font-semibold' : 'text-slate-600'}`}
                >
                  Serif
                </button>
                <button
                  onClick={() => setFontFamily('sans')}
                  className={`px-2 py-1 rounded text-xs ${fontFamily === 'sans' ? 'bg-white text-blue-600 shadow-xs font-semibold' : 'text-slate-600'}`}
                >
                  Sans
                </button>
                <button
                  onClick={() => setFontFamily('mono')}
                  className={`px-2 py-1 rounded text-xs font-mono ${fontFamily === 'mono' ? 'bg-white text-blue-600 shadow-xs font-semibold' : 'text-slate-600'}`}
                >
                  Mono
                </button>
              </div>

              {/* Font Size Selector */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                <button
                  onClick={() => setFontSize('sm')}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${fontSize === 'sm' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize('md')}
                  className={`px-1.5 py-0.5 rounded text-xs font-bold ${fontSize === 'md' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('lg')}
                  className={`px-1.5 py-0.5 rounded text-sm font-bold ${fontSize === 'lg' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
                >
                  A+
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Reader Body Area */}
        <div className="flex-1 overflow-y-auto relative">
          {activeTab === 'read' && (
            <div className={`min-h-full p-6 sm:p-10 md:p-14 transition-colors duration-300 ${themeStyles} ${fontClass}`}>
              <div className="max-w-2xl mx-auto">
                {/* Chapter Title Badge */}
                <div className="text-center pb-6 border-b border-current/10 mb-6">
                  <span className="text-xs uppercase font-mono tracking-widest opacity-60">
                    Chapter {currentChapter.number} • Pages {currentChapter.pages}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold mt-2 font-sans tracking-tight">
                    {currentChapter.title}
                  </h2>
                  <p className="text-xs mt-1 opacity-70 font-mono">
                    By {book.author}
                  </p>
                </div>

                {/* Chapter Content Excerpt */}
                <div className={`space-y-5 ${fontSizeClass}`}>
                  <p className="first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-blue-600 first-letter:leading-none">
                    {currentChapter.excerpt}
                  </p>
                  
                  <div className="p-4 rounded-xl bg-current/5 border border-current/10 my-5">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5 text-blue-600">
                      <Sparkles className="w-3.5 h-3.5" />
                      Key Concept Extraction
                    </h4>
                    <p className="text-xs opacity-90 leading-relaxed font-sans">
                      {book.keyTakeaways[0]}
                    </p>
                  </div>

                  <div className="whitespace-pre-line text-sm sm:text-base">
                    {book.sampleSnippet}
                  </div>
                </div>

                {/* Sample End Prompt */}
                <div className="mt-12 p-6 rounded-2xl bg-blue-50 border border-blue-200 text-center text-slate-800 font-sans shadow-sm">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200 mb-2">
                    Sample Excerpt Concluded
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Unlock the Complete {book.pages}-Page Edition
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                    Get instant access to all {book.tableOfContents.length} chapters, worked source code, and audio narration.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4">
                    <button
                      onClick={() => {
                        onAddToCart(book);
                        onClose();
                      }}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center gap-2 transition-transform active:scale-95"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Get Full eBook ({formatPrice(book.priceUSD, currency)})</span>
                    </button>
                    <a
                      href={generateWhatsAppUrl(book.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 flex items-center gap-2 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <span>Order on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Table of Contents Tab */}
          {activeTab === 'contents' && (
            <div className="p-6 sm:p-10 max-w-3xl mx-auto text-slate-800 bg-white min-h-full">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">Full Table of Contents</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {book.tableOfContents.length} Comprehensive Modules • {book.pages} Pages
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-blue-600 font-semibold">
                    Est. {book.readingTime}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                {book.tableOfContents.map((chap, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedChapterIdx(idx);
                      setActiveTab('read');
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                      selectedChapterIdx === idx
                        ? 'bg-blue-50 border-blue-400 text-slate-900'
                        : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-mono font-bold text-xs text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        0{chap.number}
                      </span>
                      <div>
                        <h4 className="font-semibold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                          {chap.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {chap.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">
                        p. {chap.pages}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-slate-50 border-t border-slate-200 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadSample}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5 transition-colors shadow-xs"
            >
              {downloadedSample ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sample Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>Download Free Sample PDF</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">
                {formatPrice(book.priceUSD, currency)}
                <span className="text-xs text-slate-400 line-through ml-1.5 font-normal">
                  {formatPrice(book.originalPriceUSD, currency)}
                </span>
              </p>
            </div>

            <button
              onClick={() => {
                onAddToCart(book);
                onClose();
              }}
              className="px-4 py-2 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
