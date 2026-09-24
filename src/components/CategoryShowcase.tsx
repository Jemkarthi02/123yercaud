import React, { useState } from 'react';
import { 
  Building, 
  Flame, 
  Sparkles, 
  Car, 
  Utensils, 
  Compass, 
  Activity, 
  Briefcase, 
  GraduationCap, 
  Shield, 
  ArrowRight, 
  ChevronRight, 
  X,
  Layers,
  Mountain
} from 'lucide-react';
import { DIRECTORY_CATEGORIES } from '../data/yercaudData';
import { Category } from '../types';

interface CategoryShowcaseProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onSelectSubcategory: (category: string, subcategory: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  selectedCategory,
  onSelectCategory,
  onSelectSubcategory,
}) => {
  const [showAllCategoriesModal, setShowAllCategoriesModal] = useState(false);

  // Dynamic Lucide icon helper
  const renderCategoryIcon = (iconName: string, className = 'w-6 h-6') => {
    switch (iconName) {
      case 'Building': return <Building className={className} />;
      case 'Flame': return <Flame className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Car': return <Car className={className} />;
      case 'Utensils': return <Utensils className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'Activity': return <Activity className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      case 'GraduationCap': return <GraduationCap className={className} />;
      case 'Shield': return <Shield className={className} />;
      default: return <Mountain className={className} />;
    }
  };

  return (
    <section className="py-10 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              <span>Yercaud Yellow Pages Directory</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Explore Popular Categories in Yercaud
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Browse by hill resorts, coffee estates, homemade chocolates, tour cabs, and essential services
            </p>
          </div>

          <button
            onClick={() => setShowAllCategoriesModal(true)}
            className="inline-flex items-center text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-white border border-slate-200 px-3.5 py-2 rounded-lg shadow-2xs hover:shadow-xs transition-all cursor-pointer w-fit"
            id="view-all-categories-btn"
          >
            <span>View All Categories &amp; Subcategories</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {DIRECTORY_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className={`group relative bg-white rounded-xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-800 ring-2 ring-emerald-800/20 shadow-md bg-emerald-50/20'
                    : 'border-slate-200 hover:border-emerald-700 hover:shadow-md'
                }`}
                id={`category-card-${cat.id}`}
              >
                <div>
                  <div
                    className={`w-11 h-11 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-105 ${cat.color}`}
                  >
                    {renderCategoryIcon(cat.iconName, 'w-5 h-5')}
                  </div>

                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-900 line-clamp-2 leading-snug">
                    {cat.name}
                  </h3>

                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-600">
                    {cat.count} verified listings
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: View All Categories & Subcategories Tree */}
      {showAllCategoriesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-800/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 my-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-emerald-800 text-white flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-lg font-bold">123yercaud.com Complete Directory Taxonomy</h3>
                <p className="text-xs text-emerald-200">
                  Select any category or subcategory to instantly filter verified Yercaud hill businesses
                </p>
              </div>
              <button
                onClick={() => setShowAllCategoriesModal(false)}
                className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DIRECTORY_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-lg ${cat.color}`}>
                          {renderCategoryIcon(cat.iconName, 'w-4 h-4')}
                        </div>
                        <h4 className="font-bold text-sm text-slate-900">
                          {cat.name}
                        </h4>
                      </div>

                      <button
                        onClick={() => {
                          onSelectCategory(cat.name);
                          setShowAllCategoriesModal(false);
                        }}
                        className="text-xs font-bold text-emerald-800 hover:underline"
                      >
                        All &rarr;
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {cat.subcategories.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => {
                            onSelectSubcategory(cat.name, sub);
                            setShowAllCategoriesModal(false);
                          }}
                          className="px-2.5 py-1 text-xs bg-white hover:bg-emerald-900 hover:text-white text-slate-700 rounded-md border border-slate-200 transition-colors"
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
              <button
                onClick={() => setShowAllCategoriesModal(false)}
                className="px-4 py-2 font-bold text-xs text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
