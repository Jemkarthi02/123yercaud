import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Grid, 
  List, 
  ArrowUpDown, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Search, 
  X, 
  Bookmark, 
  Building,
  Sparkles,
  Mountain
} from 'lucide-react';
import { Business } from '../types';
import { BusinessCard } from './BusinessCard';
import { YERCAUD_LOCALITIES, DIRECTORY_CATEGORIES } from '../data/yercaudData';

interface BusinessListProps {
  businesses: Business[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onOpenDetail: (business: Business) => void;
  onOpenEnquiry: (business: Business) => void;
  onOpenAddListing: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedLocality: string;
  onLocalityChange: (locality: string) => void;
  selectedSubcategory: string;
  onSubcategoryChange: (sub: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
  isSavedOnlyView: boolean;
  onExitSavedView: () => void;
}

export const BusinessList: React.FC<BusinessListProps> = ({
  businesses,
  savedIds,
  onToggleSave,
  onOpenDetail,
  onOpenEnquiry,
  onOpenAddListing,
  selectedCategory,
  onCategoryChange,
  selectedLocality,
  onLocalityChange,
  selectedSubcategory,
  onSubcategoryChange,
  searchQuery,
  onClearSearch,
  isSavedOnlyView,
  onExitSavedView,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'reviews' | 'name'>('featured');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);

  // Available subcategories for current selected category
  const currentCategoryData = useMemo(() => {
    return DIRECTORY_CATEGORIES.find((c) => c.name === selectedCategory);
  }, [selectedCategory]);

  // Filtering Logic
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((biz) => {
      // Saved Only Filter
      if (isSavedOnlyView && !savedIds.includes(biz.id)) {
        return false;
      }

      // Keyword Search Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = biz.name.toLowerCase().includes(query);
        const matchesDesc = biz.description.toLowerCase().includes(query);
        const matchesCategory = biz.category.toLowerCase().includes(query);
        const matchesSubcategory = biz.subcategory.toLowerCase().includes(query);
        const matchesLocality = biz.locality.toLowerCase().includes(query);
        const matchesService = biz.services.some((s) => s.toLowerCase().includes(query));

        if (!matchesName && !matchesDesc && !matchesCategory && !matchesSubcategory && !matchesLocality && !matchesService) {
          return false;
        }
      }

      // Category Filter
      if (selectedCategory !== 'all' && biz.category !== selectedCategory) {
        return false;
      }

      // Subcategory Filter
      if (selectedSubcategory !== 'all' && biz.subcategory !== selectedSubcategory) {
        return false;
      }

      // Locality Filter
      if (selectedLocality !== 'All Localities' && biz.locality !== selectedLocality) {
        return false;
      }

      // Verified Filter
      if (verifiedOnly && !biz.isVerified) {
        return false;
      }

      // Rating Filter
      if (minRating > 0 && biz.rating < minRating) {
        return false;
      }

      return true;
    });
  }, [
    businesses,
    savedIds,
    isSavedOnlyView,
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    selectedLocality,
    verifiedOnly,
    minRating,
  ]);

  // Sorting Logic
  const sortedBusinesses = useMemo(() => {
    const list = [...filteredBusinesses];
    switch (sortBy) {
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'reviews':
        return list.sort((a, b) => b.reviewCount - a.reviewCount);
      case 'name':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'featured':
      default:
        return list.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.rating - a.rating;
        });
    }
  }, [filteredBusinesses, sortBy]);

  return (
    <section className="py-8 bg-white min-h-[600px]" id="business-directory-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Active Filter Pill Indicators */}
        {(searchQuery || selectedCategory !== 'all' || selectedLocality !== 'All Localities' || isSavedOnlyView || selectedSubcategory !== 'all') && (
          <div className="mb-6 p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-700">Active Filters:</span>

              {isSavedOnlyView && (
                <span className="inline-flex items-center bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full font-bold">
                  <Bookmark className="w-3 h-3 mr-1 fill-amber-700" />
                  Saved Places ({savedIds.length})
                  <button onClick={onExitSavedView} className="ml-1 hover:text-amber-950">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-full font-semibold">
                  <Search className="w-3 h-3 mr-1" />
                  "{searchQuery}"
                  <button onClick={onClearSearch} className="ml-1 hover:text-emerald-950">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center bg-slate-200 text-slate-800 px-2.5 py-1 rounded-full font-semibold">
                  Category: {selectedCategory}
                  <button onClick={() => onCategoryChange('all')} className="ml-1 hover:text-black">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedSubcategory !== 'all' && (
                <span className="inline-flex items-center bg-slate-200 text-slate-800 px-2.5 py-1 rounded-full font-semibold">
                  Sub: {selectedSubcategory}
                  <button onClick={() => onSubcategoryChange('all')} className="ml-1 hover:text-black">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedLocality !== 'All Localities' && (
                <span className="inline-flex items-center bg-slate-200 text-slate-800 px-2.5 py-1 rounded-full font-semibold">
                  <MapPin className="w-3 h-3 mr-1 text-red-500" />
                  {selectedLocality}
                  <button onClick={() => onLocalityChange('All Localities')} className="ml-1 hover:text-black">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>

            <button
              onClick={() => {
                onClearSearch();
                onCategoryChange('all');
                onSubcategoryChange('all');
                onLocalityChange('All Localities');
                if (isSavedOnlyView) onExitSavedView();
              }}
              className="text-emerald-800 hover:text-emerald-950 font-bold hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Subcategories Horizontal Bar (If Category is Selected) */}
        {currentCategoryData && currentCategoryData.subcategories.length > 0 && (
          <div className="mb-6 pb-2 overflow-x-auto flex items-center gap-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-400 shrink-0 uppercase tracking-wider">
              Subcategories:
            </span>
            <button
              onClick={() => onSubcategoryChange('all')}
              className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors ${
                selectedSubcategory === 'all'
                  ? 'bg-emerald-900 text-white font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All {currentCategoryData.name}
            </button>
            {currentCategoryData.subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => onSubcategoryChange(sub)}
                className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors ${
                  selectedSubcategory === sub
                    ? 'bg-emerald-900 text-white font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Directory Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Verified Yercaud Business Listings</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                {sortedBusinesses.length} Found
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing verified resorts, coffee estates, chocolates, tour cabs &amp; local enterprises in Yercaud
            </p>
          </div>

          {/* Filter / Sort Controls */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            {/* Verified Toggle */}
            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`px-3 py-2 rounded-lg border font-semibold flex items-center gap-1.5 transition-colors ${
                verifiedOnly
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${verifiedOnly ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>123 Verified Only</span>
            </button>

            {/* Rating Filter */}
            <button
              onClick={() => setMinRating(minRating === 4.5 ? 0 : 4.5)}
              className={`px-3 py-2 rounded-lg border font-semibold flex items-center gap-1.5 transition-colors ${
                minRating > 0
                  ? 'bg-amber-50 border-amber-400 text-amber-900'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${minRating > 0 ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
              <span>4.5+ Rating</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center bg-white border border-slate-200 rounded-lg px-2.5 py-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 mr-1.5 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="featured">Sort: Featured First</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Yellow Pages List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Directory Results Container */}
        {sortedBusinesses.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sortedBusinesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  isSaved={savedIds.includes(business.id)}
                  onToggleSave={onToggleSave}
                  onOpenDetail={onOpenDetail}
                  onOpenEnquiry={onOpenEnquiry}
                  viewMode="grid"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedBusinesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  isSaved={savedIds.includes(business.id)}
                  onToggleSave={onToggleSave}
                  onOpenDetail={onOpenDetail}
                  onOpenEnquiry={onOpenEnquiry}
                  viewMode="list"
                />
              ))}
            </div>
          )
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              No matching businesses found in Yercaud
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-6">
              We couldn't find any listings matching your search or filters. Try adjusting your search term, switching localities, or list your business for free.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  onClearSearch();
                  onCategoryChange('all');
                  onSubcategoryChange('all');
                  onLocalityChange('All Localities');
                  setVerifiedOnly(false);
                  setMinRating(0);
                  if (isSavedOnlyView) onExitSavedView();
                }}
                className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800 transition-colors"
              >
                Clear All Filters
              </button>
              <button
                onClick={onOpenAddListing}
                className="px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-lg hover:bg-red-700 transition-colors"
              >
                + Add Your Business to 123yercaud
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
