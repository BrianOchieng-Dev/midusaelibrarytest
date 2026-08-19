import React, { useState, useEffect } from 'react';
import { BookCategory, Currency, UserProfile } from '../types';
import { CATEGORIES } from '../data/booksData';
import { 
  BookOpen, 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Globe
} from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAuth: () => void;
  onSelectCategory: (category: BookCategory | 'All') => void;
  selectedCategory: BookCategory | 'All';
  currentUser: UserProfile | null;
  currency: Currency;
  onChangeCurrency: (currency: Currency) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAuth,
  onSelectCategory,
  selectedCategory,
  currentUser,
  currency,
  onChangeCurrency,
  searchQuery,
  onSearchChange,
  onScrollToSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm py-2.5'
            : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            
            {/* Logo */}
            <div 
              onClick={() => onScrollToSection('hero')}
              className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1E90FF] via-[#4FACFE] to-[#00F2FE] p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-[#1E90FF]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                  Midusa<span className="text-[#1E90FF]">Elibrary</span>
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono mt-0.5 hidden sm:block">
                  Digital Bookstore
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links - Clean, Uncluttered */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-slate-600">
              <button
                onClick={() => onScrollToSection('hero')}
                className="px-3 py-1.5 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-colors"
              >
                Home
              </button>

              <button
                onClick={() => {
                  onSelectCategory('All');
                  onScrollToSection('catalog');
                }}
                className="px-3 py-1.5 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-colors"
              >
                Books
              </button>

              {/* Categories Clean Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  onMouseEnter={() => setIsCategoryDropdownOpen(true)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                    isCategoryDropdownOpen || selectedCategory !== 'All'
                      ? 'text-blue-600 bg-blue-50'
                      : 'hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  <span>Categories</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryDropdownOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isCategoryDropdownOpen && (
                  <div
                    onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                    className="absolute top-full left-0 mt-1.5 w-64 p-2 rounded-2xl bg-white border border-slate-200 shadow-xl z-50 animate-fadeIn"
                  >
                    <button
                      onClick={() => {
                        onSelectCategory('All');
                        setIsCategoryDropdownOpen(false);
                        onScrollToSection('catalog');
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                        selectedCategory === 'All'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>All Collections</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                    <div className="h-px bg-slate-100 my-1.5" />
                    <div className="space-y-0.5 max-h-72 overflow-y-auto">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            onSelectCategory(cat.name);
                            setIsCategoryDropdownOpen(false);
                            onScrollToSection('catalog');
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                            selectedCategory === cat.name
                              ? 'bg-blue-50 text-blue-600 font-bold'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <span>{cat.name}</span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {cat.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => onScrollToSection('why-choose-us')}
                className="px-3 py-1.5 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-colors"
              >
                Why Us
              </button>
              
              <button
                onClick={() => onScrollToSection('testimonials')}
                className="px-3 py-1.5 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-colors"
              >
                Reviews
              </button>
              
              <button
                onClick={() => onScrollToSection('faq')}
                className="px-3 py-1.5 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-colors"
              >
                FAQ
              </button>
            </nav>

            {/* Right Side Compact & Clean Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              
              {/* Search Bar - Sleek Expandable on Desktop or Compact Input */}
              <div className="relative hidden md:block w-36 lg:w-48 transition-all">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-100/80 border border-slate-200/80 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all"
                />
              </div>

              {/* Mobile Search Icon Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 md:hidden text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                title="Search eBooks"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Currency Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors"
                >
                  <Globe className="w-3 h-3 text-blue-600" />
                  <span>{currency}</span>
                  <ChevronDown className="w-2.5 h-2.5 text-slate-500" />
                </button>
                {isCurrencyDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-28 p-1 rounded-xl bg-white border border-slate-200 shadow-xl z-50 animate-fadeIn">
                    {(['USD', 'KES', 'EUR', 'GBP'] as Currency[]).map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          onChangeCurrency(curr);
                          setIsCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center justify-between ${
                          currency === curr
                            ? 'bg-blue-600 text-white font-bold'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{curr}</span>
                        <span className="text-[10px] opacity-70">
                          {curr === 'USD' ? '$' : curr === 'KES' ? 'KSh' : curr === 'EUR' ? '€' : '£'}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={onOpenWishlist}
                className="relative p-2 text-slate-600 hover:text-pink-600 rounded-lg hover:bg-slate-100 transition-colors"
                title="Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-pink-600 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1E90FF] hover:bg-blue-600 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-95"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cart</span>
                <span className="px-1.5 py-0.2 rounded-full bg-white text-blue-700 text-[10px] font-bold">
                  {cartCount}
                </span>
              </button>

              {/* Sign In Button */}
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-semibold text-slate-800 transition-colors"
              >
                {currentUser ? (
                  <>
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-4 h-4 rounded-full object-cover border border-blue-500"
                    />
                    <span className="hidden md:inline max-w-[70px] truncate">
                      {currentUser.name.split(' ')[0]}
                    </span>
                  </>
                ) : (
                  <>
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span className="hidden sm:inline">Account</span>
                  </>
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 lg:hidden text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-slate-700" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Overlay Bar */}
          {isSearchOpen && (
            <div className="mt-2.5 md:hidden animate-fadeIn">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search eBooks by title, author, topic..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 bg-slate-100 border border-blue-500/40 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-black/40 backdrop-blur-sm pt-16 px-5 pb-8 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-2xl p-5 shadow-2xl space-y-4 max-w-sm ml-auto mt-2 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-semibold text-slate-500">Currency</span>
              <div className="flex gap-1">
                {(['USD', 'KES', 'EUR', 'GBP'] as Currency[]).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => onChangeCurrency(curr)}
                    className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                      currency === curr ? 'bg-blue-600 text-white' : 'text-slate-600 bg-slate-100'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <button
                onClick={() => {
                  onScrollToSection('hero');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Home
              </button>
              <button
                onClick={() => {
                  onSelectCategory('All');
                  onScrollToSection('catalog');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Browse All Books
              </button>
              <button
                onClick={() => {
                  onScrollToSection('why-choose-us');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Why Choose Us
              </button>
              <button
                onClick={() => {
                  onScrollToSection('testimonials');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Reader Testimonials
              </button>
              <button
                onClick={() => {
                  onScrollToSection('faq');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                FAQ & Support
              </button>
            </div>

            {/* Category Quick Grid in mobile */}
            <div className="pt-3 border-t border-slate-100">
              <p className="text-[11px] uppercase font-mono tracking-wider text-slate-400 mb-2 font-bold">
                Categories
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.name);
                      onScrollToSection('catalog');
                      setIsMobileMenuOpen(false);
                    }}
                    className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-left text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
