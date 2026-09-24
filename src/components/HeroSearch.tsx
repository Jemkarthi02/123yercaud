import React from 'react';
import { 
  Search, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp,
  Mountain,
  ShieldCheck,
  Coffee
} from 'lucide-react';
import { YERCAUD_LOCALITIES } from '../data/yercaudData';

interface HeroSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedLocality: string;
  onLocalityChange: (locality: string) => void;
  onSearchSubmit: (e?: React.FormEvent) => void;
  onTagClick: (tag: string) => void;
  localities?: string[];
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchQuery,
  onSearchChange,
  selectedLocality,
  onLocalityChange,
  onSearchSubmit,
  onTagClick,
  localities = YERCAUD_LOCALITIES,
}) => {
  const trendingTags = [
    'Valley View Resorts',
    'Estate Homestays',
    'Single-Origin Coffee',
    'Killiyur Falls Trek',
    '20 Hairpin Ghat Cabs',
    'Homemade Chocolates',
    'Pure Eucalyptus Oil',
    'Lake Boating'
  ];

  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white pt-10 pb-14 px-4 sm:px-6 overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center space-y-6">
        {/* Super Headline Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-semibold text-amber-300">
          <Mountain className="w-3.5 h-3.5 text-amber-400" />
          <span>The Official Yercaud Hill Station Yellow Pages &amp; Travel Search</span>
        </div>

        {/* Main Title */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Discover Verified Resorts, Coffee Estates <br className="hidden sm:inline" />
            &amp; Hill Services in <span className="text-amber-400 underline decoration-amber-500/60 decoration-4">Yercaud</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Connect directly with valley-view resorts, private cottages, organic coffee plantations, 20-hairpin ghat road cabs, and authentic Shevaroy hill products without middleman commission.
          </p>
        </div>

        {/* Search Engine Bar */}
        <form
          onSubmit={onSearchSubmit}
          className="bg-white p-2 sm:p-2.5 rounded-2xl shadow-2xl border border-white/20 max-w-4xl mx-auto flex flex-col md:flex-row items-stretch gap-2 text-slate-800"
          id="hero-search-form"
        >
          {/* Locality Selector */}
          <div className="flex items-center px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 md:w-64 shrink-0">
            <MapPin className="w-4 h-4 text-red-500 mr-2 shrink-0" />
            <select
              value={selectedLocality}
              onChange={(e) => onLocalityChange(e.target.value)}
              className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              id="locality-select-dropdown"
            >
              {localities.map((loc) => (
                <option key={loc} value={loc} className="text-slate-800">
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Keyword Query Input */}
          <div className="flex-1 flex items-center px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="What are you looking for? (e.g. Resorts, Homestays, Coffee, Boating, Cabs)..."
              className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              id="hero-search-input"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-700 hover:to-emerald-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            id="hero-search-submit-btn"
          >
            <span>Search Yercaud</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        </form>

        {/* Trending Searches Tags */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] pt-1 text-slate-300">
          <span className="font-semibold text-amber-300 flex items-center mr-1">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            Popular:
          </span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onTagClick(tag)}
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-slate-200 hover:text-white transition-all cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl mx-auto text-xs text-slate-300 border-t border-white/10">
          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">Verified Hill Stays</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <Coffee className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">Direct Coffee Estates</span>
          </div>
          <div className="hidden sm:flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-sky-400" />
            <span className="font-semibold">100% Free Contact</span>
          </div>
        </div>
      </div>
    </div>
  );
};
