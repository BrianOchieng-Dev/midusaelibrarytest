import React, { useState, useEffect } from 'react';
import { Book, BookCategory, CartItem, Currency, UserProfile } from './types';
import { BOOKS_DATA } from './data/booksData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
import { FeaturedBooks } from './components/FeaturedBooks';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { BookPreviewModal } from './components/BookPreviewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AuthModal } from './components/AuthModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  // Global States (Default to Kenyan Shillings 100 KES as requested)
  const [currency, setCurrency] = useState<Currency>('KES');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { book: BOOKS_DATA[0], quantity: 1, selectedFormat: 'PDF' },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['book-02', 'book-06']);
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals & Drawers
  const [previewBook, setPreviewBook] = useState<Book | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // User Auth Profile
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Cart Operations
  const handleAddToCart = (book: Book) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { book, quantity: 1, selectedFormat: 'PDF' }];
    });
  };

  const handleUpdateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(bookId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.book.id === bookId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (bookId: string) => {
    setCartItems((prev) => prev.filter((item) => item.book.id !== bookId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Operations
  const handleToggleWishlist = (book: Book) => {
    setWishlistIds((prev) => {
      if (prev.includes(book.id)) {
        return prev.filter((id) => id !== book.id);
      }
      return [...prev, book.id];
    });
  };

  const handleRemoveWishlist = (bookId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== bookId));
  };

  const wishlistBooks = BOOKS_DATA.filter((b) => wishlistIds.includes(b.id));

  // Preview Operations
  const handleOpenPreview = (book: Book) => {
    setPreviewBook(book);
    setIsPreviewOpen(true);
  };

  // Smooth scroll
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-500/20 selection:text-blue-700">
      
      {/* Top Glassmorphic Navigation Bar */}
      <Navbar
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        currentUser={currentUser}
        currency={currency}
        onChangeCurrency={setCurrency}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* 1. Hero Section with 3D Floating Book Mockups & Live Stats */}
        <Hero
          featuredBooks={BOOKS_DATA}
          onBrowseBooks={() => handleScrollToSection('catalog')}
          onPreviewBook={handleOpenPreview}
          onAddToCart={handleAddToCart}
          currency={currency}
        />

        {/* 2. Category Exploration Grid with Hover Glows */}
        <CategoriesSection
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          onScrollToCatalog={() => handleScrollToSection('catalog')}
        />

        {/* 3. Featured Books Catalog with Live Search, Filter, Sort & 3D Cards */}
        <FeaturedBooks
          books={BOOKS_DATA}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onPreviewBook={handleOpenPreview}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          currency={currency}
        />

        {/* 4. Why Choose MidusaElibrary Feature Matrix */}
        <WhyChooseUs />

        {/* 5. Verified Reader Testimonials */}
        <Testimonials />

        {/* 6. Frequently Asked Questions */}
        <FaqSection />

        {/* 7. Newsletter & 20% Coupon Unlock */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={setSelectedCategory}
        onScrollToSection={handleScrollToSection}
      />

      {/* Interactive eBook Preview & Sample Reader Modal */}
      <BookPreviewModal
        book={previewBook}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onAddToCart={handleAddToCart}
        currency={currency}
      />

      {/* Slide-over Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        currency={currency}
      />

      {/* Slide-over Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistBooks={wishlistBooks}
        onRemoveWishlist={handleRemoveWishlist}
        onAddToCart={handleAddToCart}
        currency={currency}
      />

      {/* Auth & User Library Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLogin={setCurrentUser}
        onLogout={() => setCurrentUser(null)}
        books={BOOKS_DATA}
      />

      {/* Special Feature: Floating WhatsApp Concierge & Instant Order Button */}
      <FloatingWhatsApp currentBookTitle={previewBook?.title || BOOKS_DATA[0]?.title} />

    </div>
  );
}
