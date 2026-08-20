import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Coins, 
  Smartphone, 
  Library, 
  Infinity as InfinityIcon, 
  CheckCircle2
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      id: 1,
      title: 'Instant Digital Delivery',
      description: 'Get immediate download access to crisp eBook files seconds after checkout.',
      icon: Zap,
      accent: '#0284C7',
    },
    {
      id: 2,
      title: 'Secure Payments',
      description: 'Encrypted checkout supporting M-Pesa, Card, PayPal, and WhatsApp direct ordering.',
      icon: ShieldCheck,
      accent: '#1E90FF',
    },
    {
      id: 3,
      title: 'Affordable Access',
      description: 'High-impact bestsellers curated to be universally accessible for every reader.',
      icon: Coins,
      accent: '#059669',
    },
    {
      id: 4,
      title: 'Universal Device Support',
      description: 'Standard PDF files open smoothly on iPhone, iPad, Android, Kindle, Mac, and Windows PC.',
      icon: Smartphone,
      accent: '#7C3AED',
    },
    {
      id: 5,
      title: '5 Core Domains',
      description: 'Curated bestsellers across Self Development, Business, Psychology, Finance, and Entrepreneurship.',
      icon: Library,
      accent: '#2563EB',
    },
    {
      id: 6,
      title: 'Lifetime Access',
      description: 'Once purchased, your PDF books are yours forever with unlimited downloads.',
      icon: InfinityIcon,
      accent: '#DB2777',
    },
  ];

  return (
    <section id="why-choose-us" className="py-12 sm:py-16 relative bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Choose MidusaElibrary
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
            Quality digital reading engineered for modern learners and professionals.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-sm hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3.5"
                    style={{ 
                      backgroundColor: `${feat.accent}15`,
                      color: feat.accent,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Guaranteed Quality</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
