import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  Plus, 
  ShieldCheck, 
  Star, 
  Phone, 
  MapPin, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  LayoutList, 
  LayoutGrid, 
  FileSpreadsheet, 
  X,
  AlertCircle,
  Eye
} from 'lucide-react';
import { Business, Category } from '../../types';

interface AdminListingsTabProps {
  businesses: Business[];
  categories: Category[];
  localities: string[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (c: string) => void;
  selectedLocality: string;
  onLocalityChange: (l: string) => void;
  statusFilter: 'all' | 'verified' | 'unverified' | 'featured';
  onStatusFilterChange: (s: 'all' | 'verified' | 'unverified' | 'featured') => void;
  sortBy: 'name' | 'rating' | 'reviews';
  onSortByChange: (s: 'name' | 'rating' | 'reviews') => void;
  onOpenAddModal: () => void;
  onOpenEditModal: (biz: Business) => void;
  onDeleteBusiness: (id: string) => void;
  onToggleVerify: (biz: Business) => void;
  onToggleFeatured: (biz: Business) => void;
  onViewBusinessPublic: (biz: Business) => void;
  onExportCSV: () => void;
  showToast: (msg: string) => void;
}

export const AdminListingsTab: React.FC<AdminListingsTabProps> = ({
  businesses,
  categories,
  localities,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLocality,
  onLocalityChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortByChange,
  onOpenAddModal,
  onOpenEditModal,
  onDeleteBusiness,
  onToggleVerify,
  onToggleFeatured,
  onViewBusinessPublic,
  onExportCSV,
  showToast,
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [bizToDelete, setBizToDelete] = useState<Business | null>(null);

  // Filter listings
  const filteredBusinesses = businesses.filter((b) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = b.name.toLowerCase().includes(q);
      const matchCat = b.category.toLowerCase().includes(q);
      const matchSub = b.subcategory.toLowerCase().includes(q);
      const matchLoc = b.locality.toLowerCase().includes(q);
      const matchPhone = b.phone.includes(q);
      if (!matchName && !matchCat && !matchSub && !matchLoc && !matchPhone) {
        return false;
      }
    }

    // Category filter
    if (selectedCategory !== 'all' && b.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }

    // Locality filter
    if (selectedLocality !== 'all' && b.locality.toLowerCase() !== selectedLocality.toLowerCase()) {
      return false;
    }

    // Status filter
    if (statusFilter === 'verified' && !b.isVerified) return false;
    if (statusFilter === 'unverified' && b.isVerified) return false;
    if (statusFilter === 'featured' && !b.isFeatured) return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'reviews') return (b.reviewCount || 0) - (a.reviewCount || 0);
    return a.name.localeCompare(b.name);
  });

  const verifiedTotal = businesses.filter((b) => b.isVerified).length;
  const unverifiedTotal = businesses.filter((b) => !b.isVerified).length;
  const featuredTotal = businesses.filter((b) => b.isFeatured).length;

  const handleDeleteConfirm = () => {
    if (!bizToDelete) return;
    onDeleteBusiness(bizToDelete.id);
    showToast(`Removed "${bizToDelete.name}" from directory`);
    setBizToDelete(null);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Filter and Controls Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        {/* Row 1: Search & Action buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by business name, phone, category, locality..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-red-600 transition-colors font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* View Mode Toggle */}
            <div className="bg-slate-100 border border-slate-200 p-1 rounded-xl flex items-center gap-1">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Table view"
              >
                <LayoutList className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Card grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onExportCSV}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Download directory in CSV spreadsheet"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={onOpenAddModal}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Listing</span>
            </button>
          </div>
        </div>

        {/* Row 2: Status Pills, Dropdowns, and Sorter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          {/* Status Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => onStatusFilterChange('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-red-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              All ({businesses.length})
            </button>

            <button
              onClick={() => onStatusFilterChange('verified')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                statusFilter === 'verified'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:text-emerald-700 hover:bg-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified ({verifiedTotal})</span>
            </button>

            <button
              onClick={() => onStatusFilterChange('unverified')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                statusFilter === 'unverified'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:text-amber-700 hover:bg-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Pending ({unverifiedTotal})</span>
            </button>

            <button
              onClick={() => onStatusFilterChange('featured')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                statusFilter === 'featured'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:text-amber-700 hover:bg-slate-200'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Featured ({featuredTotal})</span>
            </button>
          </div>

          {/* Category, Locality, and Sort Dropdowns */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1.5 font-medium focus:outline-none focus:bg-white focus:border-red-600"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={selectedLocality}
              onChange={(e) => onLocalityChange(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1.5 font-medium focus:outline-none focus:bg-white focus:border-red-600"
            >
              <option value="all">All Localities</option>
              {localities.filter((l) => l !== 'All Localities').map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1.5 font-medium focus:outline-none focus:bg-white focus:border-red-600"
            >
              <option value="name">Sort: A to Z</option>
              <option value="rating">Sort: Highest Rating</option>
              <option value="reviews">Sort: Most Reviews</option>
            </select>
          </div>
        </div>
      </div>

      {/* Result Count Status */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
        <span>
          Showing <strong className="text-slate-900 font-mono font-bold">{filteredBusinesses.length}</strong> listings
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
        {(selectedCategory !== 'all' || selectedLocality !== 'all' || statusFilter !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              onSearchChange('');
              onCategoryChange('all');
              onLocalityChange('all');
              onStatusFilterChange('all');
            }}
            className="text-red-600 hover:text-red-700 font-bold transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Empty State */}
      {filteredBusinesses.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">No listings match your filter</h4>
            <p className="text-xs text-slate-500 mt-1">Try clearing search filters or add a new listing to this category.</p>
          </div>
          <button
            onClick={onOpenAddModal}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Listing</span>
          </button>
        </div>
      )}

      {/* View Mode 1: Table View */}
      {viewMode === 'table' && filteredBusinesses.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">Business / Service</th>
                  <th className="py-3.5 px-4">Category &amp; Locality</th>
                  <th className="py-3.5 px-4">Contact Phone</th>
                  <th className="py-3.5 px-3 text-center">Status</th>
                  <th className="py-3.5 px-3 text-center">Featured</th>
                  <th className="py-3.5 px-3 text-center">Rating</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBusinesses.map((biz) => {
                  const cleanPhone = biz.phone.replace(/\D/g, '');
                  const waNumber = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

                  return (
                    <tr 
                      key={biz.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Name & Photo */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={biz.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945'}
                            alt={biz.name}
                            className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                          />
                          <div>
                            <span className="font-bold text-sm text-slate-900 group-hover:text-red-600 transition-colors block">
                              {biz.name}
                            </span>
                            <span className="text-[11px] text-slate-500 line-clamp-1">
                              {biz.address}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category & Locality */}
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded text-[10px] inline-block mb-1 border border-slate-200/60">
                          {biz.category}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <MapPin className="w-3 h-3 text-red-600 shrink-0" />
                          <span className="truncate max-w-[140px]">{biz.locality}</span>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="py-3 px-4 font-mono text-slate-700 font-semibold">
                        <div className="flex items-center gap-1.5">
                          <span>{biz.phone}</span>
                          <a
                            href={`https://wa.me/${waNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 hover:text-emerald-700 text-slate-400 transition-colors"
                            title="WhatsApp"
                          >
                            <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-1 py-0.5 rounded">WA</span>
                          </a>
                        </div>
                      </td>

                      {/* Verified Toggle */}
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => onToggleVerify(biz)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                            biz.isVerified
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                          }`}
                          title="Click to toggle verification status"
                        >
                          {biz.isVerified ? (
                            <>
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              <span>Verified</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 text-amber-600" />
                              <span>Pending</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Featured Toggle */}
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => onToggleFeatured(biz)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            biz.isFeatured
                              ? 'text-amber-500 bg-amber-50 border border-amber-200 hover:bg-amber-100'
                              : 'text-slate-300 hover:text-slate-600 hover:bg-slate-100'
                          }`}
                          title={biz.isFeatured ? 'Featured listing (Click to remove)' : 'Click to feature on homepage'}
                        >
                          <Star className={`w-4 h-4 ${biz.isFeatured ? 'fill-amber-400' : ''}`} />
                        </button>
                      </td>

                      {/* Rating */}
                      <td className="py-3 px-3 text-center">
                        <span className="font-bold text-amber-500">{biz.rating}★</span>
                        <span className="text-[10px] text-slate-400 block">({biz.reviewCount})</span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onViewBusinessPublic(biz)}
                            className="p-1.5 hover:text-slate-900 text-slate-500 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                            title="View on live website"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => onOpenEditModal(biz)}
                            className="p-1.5 hover:text-red-600 text-slate-500 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                            title="Edit listing details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setBizToDelete(biz)}
                            className="p-1.5 hover:text-rose-600 text-slate-500 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                            title="Delete listing"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View Mode 2: Card Grid View */}
      {viewMode === 'grid' && filteredBusinesses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBusinesses.map((biz) => {
            const cleanPhone = biz.phone.replace(/\D/g, '');
            const waNumber = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

            return (
              <div
                key={biz.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Photo & Badges */}
                  <div className="relative h-40 bg-slate-100 overflow-hidden">
                    <img
                      src={biz.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945'}
                      alt={biz.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Top status pills */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <button
                        onClick={() => onToggleVerify(biz)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-md cursor-pointer flex items-center gap-1 ${
                          biz.isVerified
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-400 text-slate-950 font-black'
                        }`}
                      >
                        {biz.isVerified ? (
                          <>
                            <ShieldCheck className="w-3 h-3" />
                            <span>Verified</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" />
                            <span>Pending</span>
                          </>
                        )}
                      </button>

                      {biz.isFeatured && (
                        <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-black text-[10px] rounded-full shadow-md flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-slate-950" />
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
                      <button
                        onClick={() => onToggleFeatured(biz)}
                        className={`p-1.5 rounded-lg bg-white/90 backdrop-blur-xs transition-colors cursor-pointer ${
                          biz.isFeatured ? 'text-amber-500' : 'text-slate-500 hover:text-slate-900'
                        }`}
                        title="Toggle Featured"
                      >
                        <Star className={`w-3.5 h-3.5 ${biz.isFeatured ? 'fill-amber-400' : ''}`} />
                      </button>
                    </div>

                    {/* Bottom Category */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs text-white">
                      <span className="px-2 py-0.5 bg-black/60 backdrop-blur-xs rounded text-[10px] font-semibold">
                        {biz.category}
                      </span>
                      <span className="font-bold text-amber-400 bg-black/60 px-2 py-0.5 rounded text-[10px]">
                        ★ {biz.rating} ({biz.reviewCount})
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2">
                    <h4 className="font-bold text-base text-slate-900 line-clamp-1">{biz.name}</h4>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span className="truncate">{biz.locality}</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {biz.description}
                    </p>

                    {/* Services Chips */}
                    {biz.services && biz.services.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {biz.services.slice(0, 3).map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] rounded font-medium border border-slate-200/60"
                          >
                            {s}
                          </span>
                        ))}
                        {biz.services.length > 3 && (
                          <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded">
                            +{biz.services.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${biz.phone}`}
                      className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-colors"
                      title="Call business"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[11px]">{biz.phone}</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onViewBusinessPublic(biz)}
                      className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                      title="View on site"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onOpenEditModal(biz)}
                      className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setBizToDelete(biz)}
                      className="p-2 bg-slate-50 hover:bg-rose-50 text-rose-600 border border-slate-200 hover:border-rose-200 rounded-lg transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {bizToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Delete Listing?</h3>
                <p className="text-xs text-slate-500">This action will remove the listing from the public directory.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
              <span className="font-bold text-slate-900 block mb-0.5">{bizToDelete.name}</span>
              <span>{bizToDelete.locality} • {bizToDelete.category}</span>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setBizToDelete(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Yes, Delete Listing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
