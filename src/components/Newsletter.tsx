import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubscribed(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#00F2FE', '#1E90FF', '#10B981'],
    });
  };

  return (
    <section className="py-12 sm:py-16 relative bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Box */}
        <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg text-center space-y-4">
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Stay Updated on New Releases
          </h2>

          <p className="text-xs sm:text-sm text-blue-100 max-w-md mx-auto leading-relaxed">
            Get notified when new bestsellers in Business, Finance, and Psychology drop in our catalog.
          </p>

          {subscribed ? (
            <div className="p-4 rounded-2xl bg-white/15 border border-white/20 max-w-sm mx-auto animate-scaleIn space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-emerald-300 font-bold text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscribed Successfully</span>
              </div>
              <p className="text-[11px] text-blue-100">
                You will receive alerts when new bestsellers are added to the library.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-1">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <p className="text-[10px] text-blue-200">
            No spam • Unsubscribe anytime with 1 click
          </p>
        </div>

      </div>
    </section>
  );
};
