import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  AlertCircle, 
  Star, 
  MessageSquare, 
  Phone, 
  ArrowUpRight, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ExternalLink,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { Business, BusinessInquiry, Category } from '../../types';

interface AdminOverviewTabProps {
  businesses: Business[];
  categories: Category[];
  localities: string[];
  inquiries: BusinessInquiry[];
  onSelectTab: (tab: 'overview' | 'listings' | 'leads' | 'taxonomy' | 'settings') => void;
  onFilterCategory: (categoryName: string) => void;
  onFilterStatus: (status: 'all' | 'verified' | 'unverified' | 'featured') => void;
  onToggleVerify: (biz: Business) => void;
  onEditBusiness: (biz: Business) => void;
  onViewBusinessPublic: (biz: Business) => void;
  onUpdateInquiryStatus: (id: string, status: BusinessInquiry['status'], notes?: string) => void;
  showToast: (msg: string) => void;
}

export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({
  businesses,
  categories,
  localities,
  inquiries,
  onSelectTab,
  onFilterCategory,
  onFilterStatus,
  onToggleVerify,
  onEditBusiness,
  onViewBusinessPublic,
  onUpdateInquiryStatus,
  showToast,
}) => {
  const totalListings = businesses.length;
  const verifiedCount = businesses.filter((b) => b.isVerified).length;
  const unverifiedBusinesses = businesses.filter((b) => !b.isVerified);
  const unverifiedCount = unverifiedBusinesses.length;
  const featuredCount = businesses.filter((b) => b.isFeatured).length;

  const totalLeads = inquiries.length;
  const newLeads = inquiries.filter((inq) => inq.status === 'new');
  const newLeadsCount = newLeads.length;
  const contactedLeadsCount = inquiries.filter((inq) => inq.status === 'contacted').length;
  const resolvedLeadsCount = inquiries.filter((inq) => inq.status === 'resolved').length;
  const resolutionRate = totalLeads > 0 ? Math.round((resolvedLeadsCount / totalLeads) * 100) : 0;

  // Average Rating
  const totalReviews = businesses.reduce((acc, b) => acc + (b.reviewCount || 0), 0);
  const avgRating = businesses.length > 0 
    ? (businesses.reduce((acc, b) => acc + (b.rating || 0), 0) / businesses.length).toFixed(1)
    : '4.8';

  // Category distribution
  const categoryCounts = categories.map((cat) => {
    const count = businesses.filter((b) => b.category.toLowerCase() === cat.name.toLowerCase()).length;
    return {
      name: cat.name,
      count,
      percent: totalListings > 0 ? Math.round((count / totalListings) * 100) : 0,
      color: cat.color || '#e11d48',
    };
  }).sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Executive Welcome & Health Strip */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Yercaud Local Engine • Live Sync Active
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Management &amp; Directory Operations Console
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Real-time directory oversight for resorts, homestays, estates, and tourist services across Shevaroy Hills.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-right">
              <span className="text-[10px] text-slate-500 block font-bold uppercase">Admin Hotline</span>
              <span className="text-xs font-mono font-bold text-red-600">+91 94439 16492</span>
            </div>
            <button
              onClick={() => onSelectTab('listings')}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Manage Directory</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Listings */}
        <div 
          onClick={() => {
            onFilterStatus('all');
            onSelectTab('listings');
          }}
          className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Total Listings</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalListings}</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              100% Live
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
            <span>{featuredCount} Featured Listings</span>
            <span className="text-red-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-bold">
              View all <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Card 2: Verification Ratio */}
        <div 
          onClick={() => {
            if (unverifiedCount > 0) {
              onFilterStatus('unverified');
            } else {
              onFilterStatus('verified');
            }
            onSelectTab('listings');
          }}
          className={`bg-white border rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer group ${
            unverifiedCount > 0 ? 'border-amber-300 hover:border-amber-400 bg-amber-50/20' : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Verified Rate</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              unverifiedCount > 0 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-50 text-emerald-600'
            }`}>
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{verifiedCount}</span>
            <span className="text-xs font-bold text-slate-500">/ {totalListings} verified</span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${totalListings > 0 ? (verifiedCount / totalListings) * 100 : 0}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs mt-2 text-slate-500">
            <span>{Math.round((verifiedCount / (totalListings || 1)) * 100)}% Verified</span>
            {unverifiedCount > 0 ? (
              <span className="text-amber-700 font-bold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                {unverifiedCount} Pending
              </span>
            ) : (
              <span className="text-emerald-700 font-bold">All Approved</span>
            )}
          </div>
        </div>

        {/* Card 3: Leads & Inquiries */}
        <div 
          onClick={() => onSelectTab('leads')}
          className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Customer Leads</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalLeads}</span>
            {newLeadsCount > 0 && (
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full animate-pulse border border-rose-200">
                {newLeadsCount} New
              </span>
            )}
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
            <span>{resolvedLeadsCount} Resolved ({resolutionRate}%)</span>
            <span className="text-sky-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-bold">
              CRM <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Card 4: Directory Rating & Reviews */}
        <div 
          onClick={() => onSelectTab('listings')}
          className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Directory Rating</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{avgRating}</span>
            <span className="text-xs font-bold text-amber-500">★ ★ ★ ★ ★</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
            <span>{totalReviews} Total Reviews</span>
            <span className="text-amber-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-bold">
              Top Rated <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Visual Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols wide on desktop): Category Distribution & Geographic Coverage */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Distribution Breakdown */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Listings Distribution by Category
                </h3>
                <p className="text-xs text-slate-500">Click any category bar to filter listings instantly</p>
              </div>
              <button
                onClick={() => onSelectTab('taxonomy')}
                className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
              >
                Manage Categories ({categories.length})
              </button>
            </div>

            <div className="space-y-3">
              {categoryCounts.slice(0, 8).map((cat) => (
                <div
                  key={cat.name}
                  onClick={() => {
                    onFilterCategory(cat.name);
                    onFilterStatus('all');
                    onSelectTab('listings');
                  }}
                  className="group cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                    <span className="text-slate-800 group-hover:text-red-600 transition-colors font-semibold">
                      {cat.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-mono">{cat.count} listings</span>
                      <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-bold">
                        {cat.percent}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 bg-red-600 group-hover:bg-red-700"
                      style={{ width: `${Math.max(cat.percent, 3)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Approval Quick Action Queue (If unverified items exist) */}
          {unverifiedBusinesses.length > 0 && (
            <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-amber-900">
                      Pending Listing Approvals ({unverifiedBusinesses.length})
                    </h3>
                    <p className="text-[11px] text-amber-700">
                      Listings waiting for directory verification
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onFilterStatus('unverified');
                    onSelectTab('listings');
                  }}
                  className="text-xs font-bold text-amber-800 hover:text-amber-900 hover:underline"
                >
                  View All Pending
                </button>
              </div>

              <div className="space-y-2.5 mt-3">
                {unverifiedBusinesses.slice(0, 3).map((biz) => (
                  <div 
                    key={biz.id}
                    className="bg-white border border-amber-200 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{biz.name}</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] rounded font-semibold">
                          {biz.category}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                        <span>{biz.locality}</span>
                        <span>•</span>
                        <span className="font-mono text-slate-700 font-semibold">{biz.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onToggleVerify(biz)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verify &amp; Approve</span>
                      </button>
                      <button
                        onClick={() => onEditBusiness(biz)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg border border-slate-200 transition-colors cursor-pointer"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Localities Breakdown */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Locality Geographic Coverage
            </h3>
            <p className="text-xs text-slate-500 mb-3">Total registered businesses across Yercaud areas</p>
            <div className="flex flex-wrap gap-2">
              {localities.filter((loc) => loc !== 'All Localities').slice(0, 10).map((loc) => {
                const count = businesses.filter((b) => b.locality === loc).length;
                return (
                  <div
                    key={loc}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs flex items-center gap-2"
                  >
                    <MapPin className="w-3 h-3 text-red-600" />
                    <span className="text-slate-800 font-medium">{loc}</span>
                    <span className="px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded-md font-mono text-[10px] font-bold">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: CRM Leads Pipeline & Recent Feed */}
        <div className="space-y-6">
          {/* Recent Inquiries Activity Feed */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Recent Inquiries
                </h3>
              </div>
              <button
                onClick={() => onSelectTab('leads')}
                className="text-xs font-bold text-sky-600 hover:text-sky-700"
              >
                All Leads ({totalLeads})
              </button>
            </div>

            {inquiries.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">No inquiries recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {inquiries.slice(0, 4).map((inq) => {
                  const cleanPhone = inq.userPhone.replace(/\D/g, '');
                  const waNumber = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
                  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
                    `Hello ${inq.userName}, regarding your inquiry on 123yercaud.com: "${inq.requirement.slice(0, 60)}..."`
                  )}`;

                  return (
                    <div
                      key={inq.id}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-xs text-slate-900 truncate">{inq.userName}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          inq.status === 'new'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : inq.status === 'contacted'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {inq.status}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 italic">
                        "{inq.requirement}"
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                        <span>{inq.businessName || inq.category}</span>
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${inq.userPhone}`}
                            className="p-1 hover:text-slate-900 text-slate-600 bg-white border border-slate-200 rounded transition-colors"
                            title="Call customer"
                          >
                            <Phone className="w-3 h-3 text-emerald-600" />
                          </a>
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 hover:text-slate-900 text-slate-600 bg-white border border-slate-200 rounded transition-colors"
                            title="Message customer on WhatsApp"
                          >
                            <span className="text-[10px] font-bold text-emerald-600">WA</span>
                          </a>
                          {inq.status === 'new' && (
                            <button
                              onClick={() => {
                                onUpdateInquiryStatus(inq.id, 'contacted');
                                showToast(`Marked ${inq.userName}'s lead as contacted!`);
                              }}
                              className="px-2 py-0.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold rounded cursor-pointer"
                            >
                              Mark Contacted
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Shortcuts & Diagnostics */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Quick Admin Actions
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onSelectTab('settings')}
                className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-bold text-left transition-colors border border-slate-200"
              >
                Change PIN
              </button>
              <button
                onClick={() => onSelectTab('taxonomy')}
                className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-bold text-left transition-colors border border-slate-200"
              >
                Add Category
              </button>
              <button
                onClick={() => onSelectTab('leads')}
                className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-bold text-left transition-colors border border-slate-200"
              >
                + Manual Lead
              </button>
              <button
                onClick={() => onSelectTab('settings')}
                className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-bold text-left transition-colors border border-slate-200"
              >
                Backup Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
