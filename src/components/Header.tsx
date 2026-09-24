import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  PlusCircle, 
  FileText, 
  ShieldAlert, 
  Bookmark, 
  Search, 
  Compass, 
  Menu, 
  X, 
  Sparkles, 
  Clock, 
  CloudSun 
} from 'lucide-react';
import { DIRECTORY_CATEGORIES } from '../data/yercaudData';

interface HeaderProps {
  onOpenAddListing: () => void;
  onOpenEmergency: () => void;
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string;
  savedCount: number;
  onToggleSavedView: () => void;
  isSavedView: boolean;
  onScrollToCityGuide: () => void;
  onResetToHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAddListing,
  onOpenEmergency,
  onSelectCategory,
  selectedCategory,
  savedCount,
  onToggleSavedView,
  isSavedView,
  onScrollToCityGuide,
  onResetToHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Utility Bar */}
      <div className="bg-slate-800 text-slate-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-amber-400 font-medium">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Yercaud's Official Yellow Pages Since 2008
            </span>
            <span className="hidden md:inline-flex items-center text-slate-400">
              <CloudSun className="w-3.5 h-3.5 mr-1 text-sky-300" />
              Yercaud Hills 19°C • Misty &amp; Pleasant
            </span>
            <span className="hidden lg:inline-flex items-center text-slate-400">
              <Clock className="w-3.5 h-3.5 mr-1 text-slate-300" />
              IST {currentTime || 'Live'}
            </span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <a 
              href="tel:04281222224" 
              className="flex items-center hover:text-white transition-colors"
              title="Tourist & Business Helpline for Yercaud"
            >
              <Phone className="w-3 h-3 mr-1 text-emerald-400" />
              <span>04281 222224</span>
            </a>

            <button
              onClick={onOpenEmergency}
              className="flex items-center text-rose-300 hover:text-rose-100 font-semibold transition-colors"
            >
              <ShieldAlert className="w-3 h-3 mr-1 text-rose-400" />
              Emergency 24x7
            </button>

            <button
              onClick={onToggleSavedView}
              className={`flex items-center transition-colors px-2 py-0.5 rounded ${
                isSavedView ? 'bg-amber-500 text-slate-900 font-bold' : 'hover:text-white'
              }`}
            >
              <Bookmark className="w-3 h-3 mr-1 text-amber-400" />
              <span>Saved ({savedCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Branding & Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* 123yercaud Logo */}
          <div 
            onClick={onResetToHome}
            className="cursor-pointer flex items-center gap-3 select-none group"
            id="brand-logo"
          >
            <div className="flex items-center shadow-md rounded-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 px-3 py-1.5 flex items-center justify-center">
                <span className="text-2xl font-black tracking-tighter text-slate-900 font-mono">123</span>
              </div>
              <div className="bg-emerald-800 px-3 py-1.5 flex flex-col justify-center">
                <span className="text-xl font-extrabold tracking-tight text-white leading-none">
                  yercaud<span className="text-amber-400">.com</span>
                </span>
                <span className="text-[9px] uppercase tracking-wider text-emerald-200 font-semibold mt-0.5">
                  The Local Search Engine
                </span>
              </div>
            </div>
            
            <div className="hidden xl:block border-l border-slate-200 pl-3">
              <span className="block text-xs font-semibold text-slate-700">Yercaud Yellow Pages</span>
              <span className="block text-[10px] text-slate-500">Resorts, Coffee Estates &amp; Local Directory</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={onScrollToCityGuide}
              className="inline-flex items-center px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-emerald-900 hover:bg-slate-100 rounded-lg transition-all"
              id="header-city-guide-btn"
            >
              <Compass className="w-4 h-4 mr-1.5 text-slate-500" />
              Yercaud Travel Guide
            </button>

            <button
              onClick={onOpenAddListing}
              className="inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 rounded-lg shadow-sm hover:shadow transition-all"
              id="header-free-listing-btn"
            >
              <PlusCircle className="w-4 h-4 mr-1.5 text-amber-200" />
              List Your Business/Service
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={onOpenAddListing}
              className="inline-flex items-center px-2.5 py-1.5 text-xs font-bold text-white bg-red-600 rounded-md"
            >
              <PlusCircle className="w-3.5 h-3.5 mr-1" />
              List Your Business/Service
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-emerald-900 hover:bg-slate-100 rounded-md"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Categories Horizontal Navigation Bar */}
      <nav className="bg-slate-50 border-t border-slate-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between overflow-x-auto py-1 text-xs">
          <div className="flex items-center space-x-1 whitespace-nowrap py-1">
            <button
              onClick={onResetToHome}
              className={`px-3 py-1.5 rounded font-semibold transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-emerald-900 hover:bg-slate-200/60'
              }`}
            >
              All Categories
            </button>

            {DIRECTORY_CATEGORIES.slice(0, 7).map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className={`px-2.5 py-1.5 rounded transition-colors font-medium ${
                  selectedCategory === cat.name
                    ? 'bg-emerald-900 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-emerald-900 hover:bg-slate-200/60'
                }`}
              >
                {cat.name.split('&')[0].trim()}
              </button>
            ))}

            <button
              onClick={() => onSelectCategory('all')}
              className="px-2.5 py-1.5 text-emerald-700 font-semibold hover:underline"
            >
              More &rarr;
            </button>
          </div>

          <div className="text-[11px] text-slate-500 font-medium whitespace-nowrap pl-4 hidden xl:block">
            Verified Directory for Resorts, Homestays &amp; Hill Businesses
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3 shadow-lg animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenAddListing();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center p-2.5 text-xs font-bold text-white bg-red-600 rounded-lg shadow-xs"
            >
              <PlusCircle className="w-4 h-4 mr-1.5" />
              List Your Business/Service
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Quick Links
            </span>
            <button
              onClick={() => {
                onResetToHome();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-sm font-medium text-slate-700 hover:text-emerald-900"
            >
              Home / Yellow Pages
            </button>
            <button
              onClick={() => {
                onOpenEmergency();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-sm font-medium text-rose-600 hover:text-rose-800 flex items-center"
            >
              <ShieldAlert className="w-4 h-4 mr-2" />
              Yercaud Emergency Helplines (Police, Hospital, Forest)
            </button>
            <button
              onClick={() => {
                onScrollToCityGuide();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-sm font-medium text-slate-700 hover:text-emerald-900 flex items-center"
            >
              <Compass className="w-4 h-4 mr-2" />
              Yercaud Travel &amp; Tourism Guide
            </button>
            <button
              onClick={() => {
                onToggleSavedView();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-sm font-medium text-amber-700 hover:text-amber-900 flex items-center"
            >
              <Bookmark className="w-4 h-4 mr-2" />
              My Saved Places ({savedCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
