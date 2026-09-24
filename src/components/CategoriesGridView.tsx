import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Category } from '../types';
import { CategoryIcon } from './CategoryIcon';
import { HomeServicesSlider } from './HomeServicesSlider';

interface CategoriesGridViewProps {
  categories: Category[];
  onSelectCategory: (categoryName: string) => void;
}

export const CategoriesGridView: React.FC<CategoriesGridViewProps> = ({
  categories,
  onSelectCategory,
}) => {
  const [filterText, setFilterText] = useState('');

  const filteredCategories = categories.filter((cat) => {
    if (!filterText.trim()) return true;
    const query = filterText.toLowerCase();
    return (
      cat.name.toLowerCase().includes(query) ||
      cat.description.toLowerCase().includes(query) ||
      cat.subcategories.some((sub) => sub.toLowerCase().includes(query))
    );
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-4 sm:py-6 bg-slate-50/70 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 5-Slide Related Services Featured Carousel */}
        <HomeServicesSlider onSelectCategory={onSelectCategory} />

        {/* Quick Search & Intro Bar */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>Main Business Categories</span>
              <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                {categories.length} Categories
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any category to browse verified listings, phone contacts, and directions
            </p>
          </div>

          {/* Search Filter Bar */}
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Search category (e.g. Advocates, AC, Resorts)..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-red-600 focus:bg-white transition-all text-slate-900 font-medium"
              />
              {filterText && (
                <button
                  onClick={() => setFilterText('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 5-Columns Grid - EXACTLY as in Screenshot 1 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="bg-white rounded-xl border border-slate-200 hover:border-red-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-2xs relative group cursor-pointer min-h-[140px]"
              id={`cat-card-${cat.id}`}
            >
              {/* Vibrant Illustrated Icon */}
              <div className="mb-3 transition-transform duration-150 group-hover:scale-105">
                <CategoryIcon name={cat.name} className="w-12 h-12" />
              </div>

              {/* Category Name */}
              <h3 className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 mt-4">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No categories found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try searching for something else like "Advocates", "AC Dealers", or "Builders"
            </p>
            <button
              onClick={() => setFilterText('')}
              className="mt-3 px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-lg shadow-xs cursor-pointer"
            >
              Clear Search Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

