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
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-slate-900 tracking-tight">
            Browse by Domain
          </h2>
          <p className="text-sm sm:text-base font-subheading font-semibold text-slate-600 mt-2">
            Explore focused PDF collections across 5 essential fields.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.name;
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className={`p-6 rounded-2xl cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-2 border-blue-600 bg-blue-50/50 shadow-sm'
                    : 'bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-white hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="p-3 rounded-xl flex items-center justify-center"
                      style={{ 
                        backgroundColor: `${category.accentColor}15`, 
                        color: category.accentColor 
                      }}
                    >
                      {getCategoryIcon(category.iconName)}
                    </div>

                    <span className="text-xs font-subheading font-semibold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200 uppercase tracking-wider">
                      Collection
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900 mb-1.5">
                    {category.name}
                  </h3>
                  <p className="text-sm font-body font-normal text-slate-600 leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/70 flex items-center justify-between text-sm font-body font-medium text-slate-700 group-hover:text-blue-600">
                  <span className="text-blue-600">View Books</span>
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
