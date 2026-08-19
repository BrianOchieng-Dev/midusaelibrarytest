import React, { useState } from 'react';
import { Mail, ArrowRight, Gift, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubscribed(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#00F2FE', '#1E90FF', '#8B5CF6'],
    });
  };

  return (
    <section className="py-14 sm:py-20 relative overflow-hidden bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Box */}
        <div className="relative rounded-3xl p-8 sm:p-12 md:p-14 overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-[#1E90FF] text-white shadow-xl">
          
          {/* Ambient Lighting Circles */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-400/15 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-5">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-semibold text-white shadow-xs">
              <Gift className="w-3.5 h-3.5 text-cyan-200" />
              <span>Get 20% Off Your First eBook</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Never Miss a New Release
            </h2>

            <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-xl mx-auto font-normal">
              Join over 25,000 engineers, researchers, and founders receiving our weekly deep-dive book summaries, author releases, and exclusive discount drops.
            </p>

            {subscribed ? (
              <div className="p-5 rounded-2xl bg-white/15 border border-white/25 text-center animate-scaleIn space-y-2 backdrop-blur-md">
                <div className="w-10 h-10 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Welcome to Midusa Inner Circle!
                </h3>
                <p className="text-xs text-blue-100">
                  Use coupon code <span className="font-mono font-bold text-white px-2 py-0.5 rounded bg-white/20 border border-white/30">MIDUSA20</span> at checkout for 20% off all titles.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto pt-1">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none shadow-md"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-white shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 whitespace-nowrap"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="flex items-center justify-center gap-6 text-[11px] text-blue-200 pt-1">
              <span>✓ No spam ever</span>
              <span>✓ 1-click unsubscribe</span>
              <span>✓ Instant coupon delivery</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
