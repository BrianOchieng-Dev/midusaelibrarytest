import React from 'react';
import { BookCategory } from '../types';
import { CATEGORIES } from '../data/booksData';
import { 
  Code2, 
  Cpu, 
  Briefcase, 
  TrendingUp, 
  Sparkles, 
  Brain, 
  Target, 
  Rocket, 
  GraduationCap, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface CategoriesSectionProps {
  onSelectCategory: (category: BookCategory) => void;
  selectedCategory: BookCategory | 'All';
  onScrollToCatalog: () => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory,
  selectedCategory,
  onScrollToCatalog,
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Brain':
        return <Brain className="w-5 h-5" />;
      case 'Target':
        return <Target className="w-5 h-5" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const handleCategoryClick = (categoryName: BookCategory) => {
    onSelectCategory(categoryName);
    onScrollToCatalog();
  };

  return (
    <section id="categories" className="py-14 sm:py-20 relative overflow-hidden bg-slate-50/70 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Curated Knowledge Domains</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Premium Knowledge Categories
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl mx-auto leading-relaxed">
            High-leverage blueprints, academic textbooks, and transformative guides written by industry leaders.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.name;
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className={`group relative p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 bg-white border flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/40 shadow-md shadow-blue-500/10 -translate-y-1'
                    : 'border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-md hover:-translate-y-1'
                }`}
              >
                {/* Top Section: Icon & eBook Count */}
                <div className="relative z-10 flex items-start justify-between mb-3.5">
                  <div 
                    className="p-3 rounded-xl shadow-xs transition-transform group-hover:scale-105 duration-300"
                    style={{ 
                      backgroundColor: `${category.accentColor}15`, 
                      border: `1px solid ${category.accentColor}35`,
                      color: category.accentColor 
                    }}
                  >
                    {getCategoryIcon(category.iconName)}
                  </div>

                  <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 group-hover:text-blue-700 transition-colors">
                    {category.count.toLocaleString()} eBooks
                  </span>
                </div>

                {/* Body: Title & Description */}
                <div className="relative z-10 space-y-1.5 mb-3.5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                </div>

                {/* Bottom Action Link */}
                <div className="relative z-10 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-blue-600 transition-colors">
                  <span>Browse {category.name}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
