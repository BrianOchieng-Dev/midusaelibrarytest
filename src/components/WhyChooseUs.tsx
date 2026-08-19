import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Coins, 
  Smartphone, 
  Library, 
  Infinity as InfinityIcon, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      id: 1,
      title: 'Instant Digital PDF Delivery',
      description: 'Get immediate access to high-resolution, DRM-free PDF files seconds after checkout without waiting.',
      icon: Zap,
      accent: '#0284C7',
      tag: '0s Latency',
    },
    {
      id: 2,
      title: '256-Bit Secure Payments',
      description: 'Encrypted end-to-end checkout supporting Visa, Mastercard, PayPal, and instant Mobile Money / M-Pesa.',
      icon: ShieldCheck,
      accent: '#1E90FF',
      tag: 'Bank-Grade',
    },
    {
      id: 3,
      title: 'Affordable Pricing',
      description: 'Direct-from-author pricing, bundle discounts, and dedicated academic student relief programs.',
      icon: Coins,
      accent: '#059669',
      tag: 'Up to 50% Off',
    },
    {
      id: 4,
      title: 'Mobile-Friendly Reading',
      description: 'Read seamlessly inside our interactive browser reader or sync effortlessly to your Kindle, iPad, and Android.',
      icon: Smartphone,
      accent: '#7C3AED',
      tag: 'Any Device',
    },
    {
      id: 5,
      title: 'Large Knowledge Library',
      description: 'Over 10,000+ thoroughly vetted titles spanning computer science, enterprise finance, psychology, and academic guides.',
      icon: Library,
      accent: '#2563EB',
      tag: '10,000+ Titles',
    },
    {
      id: 6,
      title: 'Lifetime Access & Updates',
      description: 'Once purchased, your books are yours forever. Download revised editions and bonus material free of charge.',
      icon: InfinityIcon,
      accent: '#DB2777',
      tag: 'Perpetual',
    },
  ];

  return (
    <section id="why-choose-us" className="py-14 sm:py-20 relative overflow-hidden bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>The Midusa Standard</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Readers Worldwide Choose MidusaElibrary
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl mx-auto">
            Built from the ground up for ambitious engineers, founders, scholars, and lifelong learners.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="group relative p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Accent Top Border Highlight */}
                <div 
                  className="w-10 h-1 rounded-full mb-5 transition-all duration-300 group-hover:w-16"
                  style={{ backgroundColor: feat.accent }}
                />

                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div 
                      className="p-3 rounded-xl shadow-xs transition-transform group-hover:scale-105"
                      style={{ 
                        backgroundColor: `${feat.accent}15`,
                        border: `1px solid ${feat.accent}35`,
                        color: feat.accent,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-600">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-3.5 mt-5 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Midusa Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
