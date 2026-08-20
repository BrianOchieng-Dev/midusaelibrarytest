import React, { useState, useEffect } from 'react';
import { BookCategory, UserProfile } from '../types';
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
  Award,
  HelpCircle
} from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenProfile: () => void;
  onNavigateHome: () => void;
  onSelectCategory: (category: BookCategory | 'All') => void;
  selectedCategory: BookCategory | 'All';
  currentUser: UserProfile | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenProfile,
  onNavigateHome,
  onSelectCategory,
  selectedCategory,
  currentUser,
  searchQuery,
  onSearchChange,
  onScrollToSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleHomeClick = () => {
    onNavigateHome();
    onScrollToSection('hero');
  };

  const handleCatalogClick = (category: BookCategory | 'All' = 'All') => {
    onSelectCategory(category);
    onNavigateHome();
    setTimeout(() => {
      onScrollToSection('catalog');
    }, 50);
  };

  return (
    <>
      {/* Sticky Top Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs py-2.5'
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            
            {/* Logo */}
            <div 
              onClick={handleHomeClick}
              className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-600 text-white shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-slate-900 leading-tight tracking-tight">
                  Midusa<span className="text-blue-600">Elibrary</span>
                </span>
                <span className="text-xs text-slate-500 font-medium hidden sm:block">
                  Digital Bookstore
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-slate-600">
              <button
                onClick={() => {
                  onNavigateHome();
                  setTimeout(() => onScrollToSection('recent-uploads'), 50);
                }}
                className="px-3.5 py-2 rounded-lg text-blue-600 bg-blue-50/80 hover:bg-blue-100/80 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Recent Uploads</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] uppercase font-mono bg-blue-600 text-white font-bold">New</span>
              </button>

              <button
                onClick={() => handleCatalogClick('All')}
                className="px-3.5 py-2 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                All Books
              </button>

              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  onMouseEnter={() => setIsCategoryDropdownOpen(true)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                    isCategoryDropdownOpen || selectedCategory !== 'All'
                      ? 'text-blue-600 bg-blue-50'
                      : 'hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  <span>Categories</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryDropdownOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>

                {isCategoryDropdownOpen && (
                  <div
                    onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                    className="absolute top-full left-0 mt-1.5 w-60 p-2 rounded-2xl bg-white border border-slate-200 shadow-xl z-50 animate-fadeIn"
                  >
                    <button
                      onClick={() => {
                        handleCatalogClick('All');
                        setIsCategoryDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between transition-colors cursor-pointer ${
                        selectedCategory === 'All'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>All 5 Categories</span>
                      <Sparkles className="w-4 h-4" />
                    </button>
                    <div className="h-px bg-slate-100 my-1.5" />
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          handleCatalogClick(cat.name);
                          setIsCategoryDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 rounded-xl text-sm flex items-center justify-between transition-colors cursor-pointer ${
                          selectedCategory === cat.name
                            ? 'bg-blue-50 text-blue-600 font-bold'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  onNavigateHome();
                  setTimeout(() => onScrollToSection('why-choose-us'), 50);
                }}
                className="px-3.5 py-2 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Why Us
              </button>
              
              <button
                onClick={() => {
                  onNavigateHome();
                  setTimeout(() => onScrollToSection('testimonials'), 50);
                }}
                className="px-3.5 py-2 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Reviews
              </button>
              
              <button
                onClick={() => {
                  onNavigateHome();
                  setTimeout(() => onScrollToSection('faq'), 50);
                }}
                className="px-3.5 py-2 rounded-lg hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                FAQ
              </button>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              
              {/* Search Bar on Desktop */}
              <div className="relative hidden md:block w-44 lg:w-60">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    onNavigateHome();
                  }}
                  className="w-full pl-9 pr-8 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Mobile Search Toggle Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 md:hidden text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
                title="Search"
                aria-label="Search books"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Button */}
              <button
                onClick={onOpenWishlist}
                className="relative p-2.5 text-slate-600 hover:text-pink-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                title="Saved Books"
                aria-label="Saved Books"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4.5 h-4.5 rounded-full bg-pink-600 text-white text-[10px] font-bold flex items-center justify-center animate-scaleIn">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-xs transition-transform active:scale-95 cursor-pointer"
                title="Shopping Cart"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                <span className="px-2 py-0.5 rounded-full bg-white text-blue-700 text-xs font-bold">
                  {cartCount}
                </span>
              </button>

              {/* User Profile / Account Button (Desktop) */}
              <button
                onClick={onOpenProfile}
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-sm font-semibold text-slate-800 transition-colors cursor-pointer"
                title="User Profile & Library"
              >
                {currentUser ? (
                  <>
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-5 h-5 rounded-full object-cover border border-blue-500"
                    />
                    <span className="max-w-[85px] truncate">
                      {currentUser.name.split(' ')[0]}
                    </span>
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4 text-blue-600" />
                    <span>Account</span>
                  </>
                )}
              </button>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 md:hidden text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
                title="Navigation Menu"
                aria-label="Open navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>
          </div>

          {/* Mobile Search Bar Expansion */}
          {isSearchOpen && (
            <div className="mt-2.5 md:hidden animate-fadeIn pb-1">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by title, author, or topic..."
                  value={searchQuery}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    onNavigateHome();
                  }}
                  className="w-full pl-9 pr-8 py-2.5 bg-slate-100 border border-blue-500 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Clean Mobile Slide-Out Navigation Drawer */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 md:hidden bg-slate-900/50 backdrop-blur-xs transition-opacity animate-fadeIn"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-xs bg-white shadow-2xl p-5 flex flex-col justify-between overflow-y-auto animate-slideLeft"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-5">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div 
                  onClick={() => {
                    handleHomeClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2.5 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <BookOpen className="w-4.5 h-4.5" />
                  </div>
                  <span className="font-bold text-slate-900 text-base">
                    Midusa<span className="text-blue-600">Elibrary</span>
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-700 bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Profile Page Button */}
              <div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenProfile();
                  }}
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left flex items-center gap-3.5 hover:bg-slate-100 transition-colors"
                >
                  {currentUser ? (
                    <>
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-10 h-10 rounded-full object-cover border border-blue-500"
                      />
                      <div className="overflow-hidden">
                        <p className="font-bold text-sm text-slate-900 truncate">{currentUser.name}</p>
                        <p className="text-xs text-slate-500 truncate">View Profile & Library</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900">My Account</p>
                        <p className="text-xs text-slate-500">Sign in with Google / Facebook</p>
                      </div>
                    </>
                  )}
                </button>
              </div>

              {/* Main Links */}
              <div className="space-y-1.5">
                <p className="text-xs uppercase font-bold text-slate-400 tracking-wider px-2">Navigation</p>
                <button
                  onClick={() => {
                    onNavigateHome();
                    setTimeout(() => onScrollToSection('recent-uploads'), 50);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-blue-600 bg-blue-50/80 hover:bg-blue-100 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Recent Uploads</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] uppercase font-mono bg-blue-600 text-white font-bold">New</span>
                </button>

                <button
                  onClick={() => {
                    handleCatalogClick('All');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 flex items-center justify-between"
                >
                  <span>All Books</span>
                  <BookOpen className="w-4.5 h-4.5 text-slate-400" />
                </button>

                <button
                  onClick={() => {
                    onNavigateHome();
                    setTimeout(() => onScrollToSection('why-choose-us'), 50);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 flex items-center justify-between"
                >
                  <span>Why Choose Us</span>
                  <Award className="w-4.5 h-4.5 text-slate-400" />
                </button>

                <button
                  onClick={() => {
                    onNavigateHome();
                    setTimeout(() => onScrollToSection('testimonials'), 50);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 flex items-center justify-between"
                >
                  <span>Reader Reviews</span>
                  <Sparkles className="w-4.5 h-4.5 text-slate-400" />
                </button>

                <button
                  onClick={() => {
                    onNavigateHome();
                    setTimeout(() => onScrollToSection('faq'), 50);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 flex items-center justify-between"
                >
                  <span>FAQ & Support</span>
                  <HelpCircle className="w-4.5 h-4.5 text-slate-400" />
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-1.5 pt-2.5 border-t border-slate-100">
                <p className="text-xs uppercase font-bold text-slate-400 tracking-wider px-2">Categories</p>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      handleCatalogClick(cat.name);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-sm font-medium flex items-center justify-between ${
                      selectedCategory === cat.name
                        ? 'bg-blue-50 text-blue-600 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Note */}
            <div className="pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400">
                Knowledge should not be that expensive.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
