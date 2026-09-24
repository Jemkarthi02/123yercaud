import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Tag, 
  User, 
  CheckCircle, 
  ArrowLeft, 
  ChevronRight, 
  ExternalLink, 
  Share2, 
  Bookmark, 
  MessageSquare, 
  SlidersHorizontal,
  Search,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { Business, Category } from '../types';

interface CategoryDetailsViewProps {
  selectedCategory: string;
  categories: Category[];
  businesses: Business[];
  savedIds: string[];
  onSelectCategory: (catName: string) => void;
  onBackToGrid: () => void;
  onOpenEmailSms: (biz: Business) => void;
  onOpenDirection: (biz: Business) => void;
  onOpenDetailModal: (biz: Business) => void;
  onToggleSave: (bizId: string) => void;
}

export const CategoryDetailsView: React.FC<CategoryDetailsViewProps> = ({
  selectedCategory,
  categories,
  businesses,
  savedIds,
  onSelectCategory,
  onBackToGrid,
  onOpenEmailSms,
  onOpenDirection,
  onOpenDetailModal,
  onToggleSave,
}) => {
  // State for revealed phone numbers
  const [revealedPhones, setRevealedPhones] = useState<Record<string, boolean>>({});
  const [selectedSubcategoryFilter, setSelectedSubcategoryFilter] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'listings' | 'hot' | 'related'>('listings');

  const currentCatObj = categories.find(
    (c) => c.name.toLowerCase() === selectedCategory.toLowerCase()
  );

  // Filter businesses for this category
  const categoryBusinesses = businesses.filter((b) => {
    const matchesCat = b.category.toLowerCase() === selectedCategory.toLowerCase();
    if (!matchesCat) return false;
    if (selectedSubcategoryFilter) {
      const subMatch = b.subcategory.toLowerCase() === selectedSubcategoryFilter.toLowerCase();
      const tagMatch = b.tags?.some((t) => t.toLowerCase().includes(selectedSubcategoryFilter.toLowerCase()));
      return subMatch || tagMatch;
    }
    return true;
  });

  // Hot Categories list (prominent top categories matching screenshot)
  const hotCategoryNames = [
    'Tour Operators',
    'Chimney Dealers',
    'Concrete Blocks Manufacturers',
    'Non Veg Restaurants',
    'Water Purifier',
    'Marriage Halls',
    'Aquariums',
    'Agro Products',
    'AC Dealers',
    'Builders',
    'Advocates',
    'Resorts & Cottages',
    'Coffee Estates & Spices',
    'Homemade Chocolates',
    'Auditors',
    'Astrologers',
    'Beauty Parlours',
  ];

  // Related categories for this category
  const relatedSubcategories = currentCatObj?.subcategories || [
    'Attestation Services',
    'Civil Lawyers',
    'Criminal Advocates',
    'Document Writer',
    'Government Approved Valuers',
    'Lawyers',
    'Notary Advocate',
    'Property Lawyers',
  ];

  const handleRevealPhone = (id: string) => {
    setRevealedPhones((prev) => ({ ...prev, [id]: true }));
  };

  const getMaskedPhone = (phone: string, isRevealed: boolean) => {
    if (isRevealed) return phone;
    const clean = phone.replace(/[^0-9]/g, '');
    if (clean.length >= 7) {
      return `${clean.slice(0, 3)}****${clean.slice(-3)}`;
    }
    return `${phone.slice(0, 3)}****`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-4 sm:py-6 bg-slate-100/70 min-h-screen text-slate-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Breadcrumb & Navigation Bar */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center text-xs sm:text-sm font-medium text-slate-600 gap-1.5 flex-wrap">
            <button
              onClick={onBackToGrid}
              className="hover:text-red-600 flex items-center gap-1 font-bold text-slate-800 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-red-600" />
              <span>Categories</span>
            </button>
            <span className="text-slate-400">/</span>
            <span className="font-bold text-slate-900">{selectedCategory}</span>
            {selectedSubcategoryFilter && (
              <>
                <span className="text-slate-400">/</span>
                <span className="text-red-600 font-semibold">{selectedSubcategoryFilter}</span>
                <button
                  onClick={() => setSelectedSubcategoryFilter(null)}
                  className="text-xs bg-red-100 text-red-700 px-1.5 py-0.2 rounded hover:bg-red-200 font-bold ml-1 cursor-pointer"
                >
                  Clear Filter
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-slate-500 font-semibold">
              Showing <strong className="text-red-600">{categoryBusinesses.length}</strong> verified listings
            </div>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex lg:hidden bg-white p-1 rounded-xl border border-slate-200 mb-4 shadow-2xs text-xs font-bold">
          <button
            onClick={() => setMobileTab('listings')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mobileTab === 'listings' ? 'bg-red-600 text-white shadow-2xs' : 'text-slate-600'
            }`}
          >
            Listings ({categoryBusinesses.length})
          </button>
          <button
            onClick={() => setMobileTab('hot')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mobileTab === 'hot' ? 'bg-red-600 text-white shadow-2xs' : 'text-slate-600'
            }`}
          >
            Hot Categories
          </button>
          <button
            onClick={() => setMobileTab('related')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mobileTab === 'related' ? 'bg-red-600 text-white shadow-2xs' : 'text-slate-600'
            }`}
          >
            Related Categories
          </button>
        </div>

        {/* 3-COLUMN RESPONSIVE LAYOUT - EXACTLY AS IN SCREENSHOT 2 */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* ================= LEFT COLUMN: HOT CATEGORIES ================= */}
          <aside
            className={`w-full lg:w-64 xl:w-72 shrink-0 ${
              mobileTab !== 'hot' ? 'hidden lg:block' : 'block'
            }`}
          >
            <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden sticky top-20">
              {/* Solid Red Header Banner - Matches Screenshot 2 */}
              <div className="bg-red-600 text-white font-bold text-sm sm:text-base py-2.5 px-4 text-center tracking-wide">
                Hot Categories
              </div>

              {/* Scrollable Categories List with Red Scrollbar */}
              <div className="p-3 max-h-[580px] overflow-y-auto custom-red-scrollbar space-y-1">
                {hotCategoryNames.map((catName) => {
                  const isCurrent = catName.toLowerCase() === selectedCategory.toLowerCase();
                  return (
                    <button
                      key={catName}
                      onClick={() => {
                        onSelectCategory(catName);
                        setSelectedSubcategoryFilter(null);
                        setMobileTab('listings');
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded text-xs font-semibold flex items-center transition-colors cursor-pointer group ${
                        isCurrent
                          ? 'bg-red-50 text-red-700 font-bold border-l-3 border-red-600'
                          : 'text-slate-700 hover:text-red-600 hover:bg-slate-50'
                      }`}
                    >
                      {/* Red double chevron "»" as in screenshot */}
                      <span className="text-red-600 font-black mr-2 text-sm leading-none shrink-0 group-hover:translate-x-0.5 transition-transform">
                        &raquo;
                      </span>
                      <span className="truncate">{catName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* ================= CENTER COLUMN: BUSINESS LISTINGS ================= */}
          <main
            className={`flex-1 min-w-0 w-full ${
              mobileTab !== 'listings' ? 'hidden lg:block' : 'block'
            }`}
          >
            {categoryBusinesses.length > 0 ? (
              <div className="space-y-4">
                {categoryBusinesses.map((biz) => {
                  const isRevealed = !!revealedPhones[biz.id];
                  const displayedPhone = getMaskedPhone(biz.phone, isRevealed);
                  const isSaved = savedIds.includes(biz.id);

                  return (
                    <div
                      key={biz.id}
                      className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all relative group"
                      id={`biz-item-${biz.id}`}
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Service & Place Image */}
                        <div 
                          onClick={() => onOpenDetailModal(biz)}
                          className="w-full sm:w-44 md:w-52 h-44 sm:h-auto shrink-0 rounded-xl overflow-hidden bg-slate-100 relative cursor-pointer border border-slate-200"
                        >
                          <img
                            src={biz.imageUrl}
                            alt={`${biz.name} - ${biz.subcategory}, ${biz.locality}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                            {biz.locality}
                          </span>
                          {biz.isFeatured && (
                            <span className="absolute top-2 left-2 bg-amber-500 text-slate-950 font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                              Featured
                            </span>
                          )}
                        </div>

                        {/* Content Column */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            {/* Top Row: Business Name & Slot Badge */}
                            <div className="flex items-start justify-between gap-3 mb-1.5">
                              <h2 
                                onClick={() => onOpenDetailModal(biz)}
                                className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-red-700 transition-colors cursor-pointer leading-snug"
                              >
                                {biz.name}
                              </h2>

                              {/* Slot Badge */}
                              {biz.slotBadge ? (
                                <div 
                                  className="w-7 h-7 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0 select-none"
                                  title="Featured Sponsor Slot"
                                >
                                  {biz.slotBadge}
                                </div>
                              ) : biz.isFeatured ? (
                                <div 
                                  className="w-7 h-7 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0 select-none"
                                  title="Featured Listing"
                                >
                                  ★
                                </div>
                              ) : null}
                            </div>

                            {/* Contact Person */}
                            {biz.contactPerson && (
                              <div className="flex items-center text-xs text-slate-700 mb-1.5">
                                <User className="w-3.5 h-3.5 mr-1.5 text-slate-500 shrink-0" />
                                <span className="font-medium text-slate-800">{biz.contactPerson}</span>
                              </div>
                            )}

                            {/* Address with View More */}
                            <div className="flex items-start text-xs text-slate-600 mb-2">
                              <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-500 shrink-0 mt-0.5" />
                              <span className="truncate max-w-md">{biz.address} , {biz.locality}</span>
                              <button
                                onClick={() => onOpenDetailModal(biz)}
                                className="ml-1 text-slate-800 hover:text-red-600 font-medium text-xs whitespace-nowrap cursor-pointer"
                              >
                                | View More
                              </button>
                            </div>

                            {/* Tags / Specializations */}
                            <div className="flex items-start text-xs text-slate-800 mb-3">
                              <Tag className="w-3.5 h-3.5 mr-1.5 text-slate-500 shrink-0 mt-0.5" />
                              <span className="font-bold text-slate-800 line-clamp-1">
                                {biz.tags && biz.tags.length > 0
                                  ? biz.tags.join(' , ')
                                  : `${biz.subcategory} , ${biz.category}`}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons Row: Phone Icon Call, WhatsApp, Get Direction (Email/SMS removed) */}
                          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
                            {/* Left Action Buttons */}
                            <div className="flex flex-wrap items-center gap-2">
                              {/* Direct Phone Call Icon Button - no phone number displayed on screen */}
                              <a
                                href="tel:9443916492"
                                onClick={(e) => e.stopPropagation()}
                                className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
                                title="Click to Call Directly"
                              >
                                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Call</span>
                              </a>

                              {/* WhatsApp Icon Button */}
                              <a
                                href={`https://wa.me/919443916492?text=${encodeURIComponent(
                                  `Hello, I am inquiring about ${biz.name} (${biz.category}) in Yercaud.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
                                title="Chat on WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>WhatsApp</span>
                              </a>

                              {/* Get Direction Option - Kept */}
                              <button
                                onClick={() => onOpenDirection(biz)}
                                className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded shadow-2xs transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <MapPin className="w-3.5 h-3.5" />
                                <span>Get Direction</span>
                              </button>
                            </div>

                            {/* Right Action Button: Verified Badge and Bookmark */}
                            <div className="flex items-center gap-2">
                              {biz.isVerified && (
                                <div className="px-3 py-1.5 bg-emerald-700 text-white font-bold text-xs rounded flex items-center gap-1 shadow-2xs select-none">
                                  <span>Verified</span>
                                  <CheckCircle className="w-3.5 h-3.5" />
                                </div>
                              )}

                              <button
                                onClick={() => onToggleSave(biz.id)}
                                className={`p-2 rounded border transition-colors cursor-pointer ${
                                  isSaved
                                    ? 'bg-amber-50 border-amber-300 text-amber-600'
                                    : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                                }`}
                                title={isSaved ? 'Remove Bookmark' : 'Bookmark this listing'}
                              >
                                <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">
                  No listings found for "{selectedCategory}"
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Be the first business to get listed in this category and receive customer enquiries.
                </p>
                <div className="mt-4 flex justify-center gap-2">
                  {selectedSubcategoryFilter && (
                    <button
                      onClick={() => setSelectedSubcategoryFilter(null)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg cursor-pointer"
                    >
                      Clear Subcategory Filter
                    </button>
                  )}
                  <button
                    onClick={onBackToGrid}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow-xs cursor-pointer"
                  >
                    View All Categories
                  </button>
                </div>
              </div>
            )}
          </main>

          {/* ================= RIGHT COLUMN: RELATED CATEGORIES ================= */}
          <aside
            className={`w-full lg:w-64 xl:w-72 shrink-0 ${
              mobileTab !== 'related' ? 'hidden lg:block' : 'block'
            }`}
          >
            <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden sticky top-20">
              {/* Solid Red Header Banner - Matches Screenshot 2 */}
              <div className="bg-red-600 text-white font-bold text-sm sm:text-base py-2.5 px-4 text-center tracking-wide">
                Related Categories
              </div>

              {/* Scrollable Related Categories List with Red Scrollbar */}
              <div className="p-3 max-h-[580px] overflow-y-auto custom-red-scrollbar space-y-1">
                {relatedSubcategories.map((subName) => {
                  const isFiltered = selectedSubcategoryFilter === subName;
                  return (
                    <button
                      key={subName}
                      onClick={() => {
                        setSelectedSubcategoryFilter(isFiltered ? null : subName);
                        setMobileTab('listings');
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded text-xs font-semibold flex items-center transition-colors cursor-pointer group ${
                        isFiltered
                          ? 'bg-red-50 text-red-700 font-bold border-l-3 border-red-600'
                          : 'text-slate-700 hover:text-red-600 hover:bg-slate-50'
                      }`}
                    >
                      {/* Red double chevron "»" as in screenshot */}
                      <span className="text-red-600 font-black mr-2 text-sm leading-none shrink-0 group-hover:translate-x-0.5 transition-transform">
                        &raquo;
                      </span>
                      <span className="truncate">{subName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
