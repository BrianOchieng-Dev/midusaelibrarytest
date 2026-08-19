import React from 'react';
import { BookCategory } from '../types';
import { CATEGORIES } from '../data/booksData';
import { generateWhatsAppUrl } from '../utils/helpers';
import { 
  BookOpen, 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Globe
} from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: BookCategory) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onScrollToSection,
}) => {
  return (
    <footer className="relative bg-slate-900 border-t border-slate-800 pt-14 pb-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 pb-10 border-b border-slate-800">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-3.5">
            <div 
              onClick={() => onScrollToSection('hero')}
              className="flex items-center gap-2.5 cursor-pointer group inline-flex"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-600 text-white shadow-sm">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white">
                Midusa<span className="text-blue-400">Elibrary</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              <span className="text-slate-200 font-semibold italic">"Get Your Best eBooks Today, Elevate Your Knowledge."</span> Premium digital bookstore delivering curated bestsellers across Self Development, Business, Psychology, Finance, and Entrepreneurship.
            </p>

            {/* Direct WhatsApp Concierge Button */}
            <div className="pt-1">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-semibold text-xs bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Instant Support & Orders</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-slate-200">
              Quick Links
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onScrollToSection('hero')}
                  className="hover:text-white transition-colors"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('catalog')}
                  className="hover:text-white transition-colors"
                >
                  Featured eBooks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('why-choose-us')}
                  className="hover:text-white transition-colors"
                >
                  Why Choose Midusa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('testimonials')}
                  className="hover:text-white transition-colors"
                >
                  Reader Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('faq')}
                  className="hover:text-white transition-colors"
                >
                  FAQ & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-slate-200">
              Top Categories
            </h4>
            <ul className="space-y-1.5">
              {CATEGORIES.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(c.name);
                      onScrollToSection('catalog');
                    }}
                    className="hover:text-white transition-colors flex items-center justify-between w-full"
                  >
                    <span>{c.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({c.count})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Formats & Guarantees */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-slate-200">
              Digital Formats & Trust
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-slate-300">
                <Zap className="w-3.5 h-3.5 text-blue-400" />
                <span>Instant High-Res PDF</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit SSL Encrypted</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>30-Day Money Guarantee</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>Kindle & Apple Books Sync</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500">
          <p className="text-xs">
            © {new Date().getFullYear()} MidusaElibrary. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Refund Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
