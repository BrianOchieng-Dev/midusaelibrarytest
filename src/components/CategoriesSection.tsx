import React from 'react';
import { BookCategory } from '../types';
import { CATEGORIES } from '../data/booksData';
import { 
  Briefcase, 
  TrendingUp, 
  Sparkles, 
  Brain, 
  Rocket, 
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
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Brain':
        return <Brain className="w-5 h-5" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const handleCategoryClick = (categoryName: BookCategory) => {
    onSelectCategory(categoryName);
    onScrollToCatalog();
  };

  return (
    <section id="categories" className="py-12 sm:py-16 relative bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Browse by Domain
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Explore focused PDF collections across 5 essential fields.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.name;
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className={`p-5 rounded-2xl cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-2 border-blue-600 bg-blue-50/40 shadow-xs'
                    : 'bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div 
                      className="p-2.5 rounded-xl flex items-center justify-center"
                      style={{ 
                        backgroundColor: `${category.accentColor}15`, 
                        color: category.accentColor 
                      }}
                    >
                      {getCategoryIcon(category.iconName)}
                    </div>

                    <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                      Collection
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {category.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-blue-600">
                  <span>View Books</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
