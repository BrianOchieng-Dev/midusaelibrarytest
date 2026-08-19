import React, { useState } from 'react';
import { generateWhatsAppUrl } from '../utils/helpers';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

interface FloatingWhatsAppProps {
  currentBookTitle?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  currentBookTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState(
    currentBookTitle
      ? `Hello MidusaElibrary, I would like to purchase this book: "${currentBookTitle}".`
      : 'Hello MidusaElibrary, I would like to purchase this book.'
  );

  const handleSend = () => {
    const url = generateWhatsAppUrl(undefined, customMsg);
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Chat Popup Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl border border-slate-200 shadow-2xl overflow-hidden bg-white animate-scaleIn">
          {/* Header */}
          <div className="p-4 bg-emerald-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-300 border-2 border-emerald-600 animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Midusa WhatsApp Desk</h4>
                <p className="text-[11px] text-emerald-100">
                  Online • Instant Delivery
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body Bubble */}
          <div className="p-4 space-y-3 text-xs">
            <div className="p-3 rounded-2xl rounded-tl-none bg-slate-50 text-slate-700 border border-slate-200 leading-relaxed">
              <p className="font-semibold text-emerald-700 mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Hello Book Lover! 📚
              </p>
              Order any eBook directly through WhatsApp for instant PDF delivery and local payment (M-Pesa, Card, PayPal).
            </div>

            {/* Quick Prompt Buttons */}
            <div className="space-y-1.5 pt-0.5">
              <button
                onClick={() => setCustomMsg('Hello MidusaElibrary, I would like to purchase this book.')}
                className="w-full text-left p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 text-[11px] transition-colors"
              >
                📖 "I would like to purchase this book."
              </button>
              <button
                onClick={() => setCustomMsg('Hello MidusaElibrary, how does instant download work on Kindle and iPad?')}
                className="w-full text-left p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 text-[11px] transition-colors"
              >
                📱 "How does instant download work on Kindle?"
              </button>
            </div>

            {/* Textarea Input */}
            <div className="pt-1">
              <textarea
                rows={2}
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 resize-none"
              />
              <button
                onClick={handleSend}
                className="w-full mt-2 py-2 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open in WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center"
        title="Direct WhatsApp Order & Support"
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-25 pointer-events-none" />
        
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageSquare className="w-5 h-5 fill-white" />
        )}

        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
            1
          </span>
        )}
      </button>
    </div>
  );
};
