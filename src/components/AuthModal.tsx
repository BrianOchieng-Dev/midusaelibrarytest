import React, { useState } from 'react';
import { UserProfile, Book } from '../types';
import { X, Mail, Lock, User, Sparkles, CheckCircle2, BookOpen, Download, LogOut, ArrowRight, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  books: Book[];
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  books,
}) => {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleDemoLogin = (role: 'student' | 'tech' | 'founder') => {
    setLoading(true);
    setTimeout(() => {
      let profile: UserProfile;
      if (role === 'student') {
        profile = {
          id: 'user-01',
          name: 'Alex Vance (Student)',
          email: 'alex.vance@university.edu',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
          purchasedBookIds: ['book-07', 'book-04'],
          wishlistIds: ['book-01'],
        };
      } else if (role === 'tech') {
        profile = {
          id: 'user-02',
          name: 'Sarah Chen (Lead Engineer)',
          email: 'sarah.chen@techcorp.io',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
          purchasedBookIds: ['book-01', 'book-06'],
          wishlistIds: ['book-03', 'book-05'],
        };
      } else {
        profile = {
          id: 'user-03',
          name: 'Marcus Brody (Founder)',
          email: 'marcus@startupfund.com',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
          purchasedBookIds: ['book-03', 'book-08', 'book-02'],
          wishlistIds: [],
        };
      }
      onLogin(profile);
      setLoading(false);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
      });
      onClose();
    }, 500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const profile: UserProfile = {
        id: `user-${Date.now()}`,
        name: name || email.split('@')[0] || 'Reader',
        email: email || 'reader@midusaelibrary.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
        purchasedBookIds: ['book-01', 'book-04'],
        wishlistIds: [],
      };
      onLogin(profile);
      setLoading(false);
      onClose();
    }, 500);
  };

  const purchasedBooks = currentUser
    ? books.filter((b) => currentUser.purchasedBookIds.includes(b.id))
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              M
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {currentUser ? 'My Midusa Account' : 'MidusaElibrary Cloud'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {currentUser ? (
          <div className="p-6 space-y-5">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-full border border-blue-400 object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 truncate text-sm">
                  {currentUser.name}
                </h4>
                <p className="text-xs text-slate-500 truncate">
                  {currentUser.email}
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 mt-1 font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  Lifetime Cloud Sync Active
                </span>
              </div>
            </div>

            {/* My Purchased Library */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Your Purchased eBooks ({purchasedBooks.length})
                </h5>
              </div>

              {purchasedBooks.length === 0 ? (
                <p className="text-xs text-slate-500 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  You haven't purchased any eBooks yet. Browse our catalog!
                </p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {purchasedBooks.map((b) => (
                    <div
                      key={b.id}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div className="truncate mr-2">
                        <p className="font-semibold text-slate-900 truncate">{b.title}</p>
                        <p className="text-[10px] text-slate-500">{b.author}</p>
                      </div>
                      <button
                        onClick={() => alert(`Downloading instant ${b.title} (PDF/ePub)...`)}
                        className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 font-semibold transition-colors shrink-0"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out of Midusa</span>
            </button>
          </div>
        ) : (
          <div className="p-6">
            {/* Tab switch */}
            <div className="flex border-b border-slate-200 mb-5">
              <button
                onClick={() => setTab('signin')}
                className={`flex-1 pb-2.5 text-xs font-bold transition-all relative ${
                  tab === 'signin'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab('signup')}
                className={`flex-1 pb-2.5 text-xs font-bold transition-all relative ${
                  tab === 'signup'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Fast 1-Click Demo Profiles */}
            <div className="mb-5 p-3 rounded-xl bg-blue-50/70 border border-blue-200">
              <p className="text-[11px] font-semibold text-blue-800 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Fast 1-Click Demo Access
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleDemoLogin('student')}
                  className="p-1.5 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 text-[11px] text-slate-800 font-medium transition-all shadow-xs"
                >
                  🎓 Student
                </button>
                <button
                  onClick={() => handleDemoLogin('tech')}
                  className="p-1.5 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 text-[11px] text-slate-800 font-medium transition-all shadow-xs"
                >
                  💻 Tech Lead
                </button>
                <button
                  onClick={() => handleDemoLogin('founder')}
                  className="p-1.5 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 text-[11px] text-slate-800 font-medium transition-all shadow-xs"
                >
                  🚀 Founder
                </button>
              </div>
            </div>

            {/* Credentials Form */}
            <form onSubmit={handleFormSubmit} className="space-y-3">
              {tab === 'signup' && (
                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-medium">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{tab === 'signin' ? 'Sign In' : 'Create Free Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-3.5 pt-3.5 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>Protected by 256-Bit Cloud Encryption</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
