import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { X, CheckCircle2, LogOut, User } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
}) => {
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'facebook' | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Simple 1-Click Sign in with Google
  const handleGoogleSignIn = () => {
    setLoadingProvider('google');
    setTimeout(() => {
      const profile: UserProfile = {
        id: `google-${Date.now()}`,
        name: 'Google Reader',
        email: 'reader@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
        provider: 'google',
      };
      onLogin(profile);
      setLoadingProvider(null);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335'],
      });
      onClose();
    }, 500);
  };

  // Simple 1-Click Sign in with Facebook
  const handleFacebookSignIn = () => {
    setLoadingProvider('facebook');
    setTimeout(() => {
      const profile: UserProfile = {
        id: `fb-${Date.now()}`,
        name: 'Facebook Reader',
        email: 'reader@facebook.com',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
        provider: 'facebook',
      };
      onLogin(profile);
      setLoadingProvider(null);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#1877F2', '#42B72A', '#00F2FE'],
      });
      onClose();
    }, 500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-sm bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              M
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              {currentUser ? 'My Account' : 'Sign In to Midusa'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        {currentUser ? (
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover shadow-xs"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 truncate text-xs sm:text-sm">
                  {currentUser.name}
                </h4>
                <p className="text-[11px] text-slate-500 truncate">
                  {currentUser.email}
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold mt-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                  Signed in via {currentUser.provider === 'google' ? 'Google' : 'Facebook'}
                </span>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="p-5 space-y-3.5">
            <p className="text-xs text-slate-600 text-center">
              Sign in with your favorite account to save your reading wishlist and manage your eBooks.
            </p>

            {/* Social Logins */}
            <div className="space-y-2.5 pt-1">
              {/* Google Sign In */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={!!loadingProvider}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-semibold text-xs text-slate-800 shadow-xs flex items-center justify-center gap-2.5 transition-all active:scale-98 disabled:opacity-50"
              >
                {loadingProvider === 'google' ? (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                )}
                <span>Continue with Google</span>
              </button>

              {/* Facebook Sign In */}
              <button
                type="button"
                onClick={handleFacebookSignIn}
                disabled={!!loadingProvider}
                className="w-full py-2.5 px-4 rounded-xl border border-[#1877F2]/20 bg-[#1877F2] hover:bg-[#166fe5] font-semibold text-xs text-white shadow-xs flex items-center justify-center gap-2.5 transition-all active:scale-98 disabled:opacity-50"
              >
                {loadingProvider === 'facebook' ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                )}
                <span>Continue with Facebook</span>
              </button>
            </div>

            <div className="pt-2 text-center">
              <p className="text-[10px] text-slate-400">
                Instant access • No long passwords required
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
