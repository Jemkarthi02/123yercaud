import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Heart, 
  ArrowUp,
  Sparkles,
  Mountain,
  Clock
} from 'lucide-react';
import { Category } from '../types';
import { DIRECTORY_CATEGORIES, YERCAUD_LOCALITIES } from '../data/yercaudData';
import { AppLogo } from './AppLogo';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onSelectLocality: (loc: string) => void;
  onOpenAddListing: () => void;
  onOpenEmergency: () => void;
  onOpenEvents?: () => void;
  categories?: Category[];
  localities?: string[];
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onSelectLocality,
  onOpenAddListing,
  onOpenEmergency,
  onOpenEvents,
  categories,
  localities,
}) => {
  const displayCategories = categories && categories.length > 0 ? categories : DIRECTORY_CATEGORIES;
  const displayLocalities = localities && localities.length > 0 ? localities : YERCAUD_LOCALITIES;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-800 text-slate-200 text-xs border-t border-slate-700">
      {/* Top CTA Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-800 border-b border-emerald-700/60 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <span className="text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center md:justify-start gap-1">
              <Sparkles className="w-3.5 h-3.5" /> For Yercaud Resort Owners, Homestay Hosts &amp; Merchants
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
              Promote Your Stay &amp; Services with 123yercaud Yellow Pages
            </h3>
            <p className="text-xs text-emerald-100 mt-1">
              Connect directly with thousands of travellers visiting Shevaroy Hills. Get listed in 2 minutes for 100% free.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenAddListing}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              List Your Business/Service
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Column 1: About 123yercaud */}
          <div className="lg:col-span-2 space-y-4">
            <div className="px-3 py-2 bg-white rounded-xl shadow-md border border-slate-300 w-fit inline-block">
              <AppLogo size="md" />
            </div>

            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              123yercaud.com is Yercaud’s premier local search engine and hill directory connecting travellers and residents with verified valley-view resorts, cozy estate homestays, fresh coffee estates, and local transport services.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-1">
              <p className="flex items-start">
                <MapPin className="w-3.5 h-3.5 mr-2 text-amber-400 shrink-0 mt-0.5" />
                <span>Yercaud Main Road, Near Bus Stand, Shevaroy Hills, Salem - 636601</span>
              </p>
              <p className="flex items-center">
                <Phone className="w-3.5 h-3.5 mr-2 text-emerald-400 shrink-0" />
                <span>
                  <a href="tel:+919443916492" className="hover:text-amber-300 transition-colors font-medium">+91 94439 16492</a>
                </span>
              </p>
              <p className="flex items-center text-amber-300 font-medium">
                <Clock className="w-3.5 h-3.5 mr-2 text-amber-400 shrink-0" />
                <span>Admin Timing : 10.00 AM - 5.00 PM</span>
              </p>
              <p className="flex items-center">
                <Mail className="w-3.5 h-3.5 mr-2 text-blue-300 shrink-0" />
                <a href="mailto:123yercaud@gmail.com" className="hover:text-amber-300 transition-colors font-medium">
                  123yercaud@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Popular Directory Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-slate-700 pb-2">
              Popular Categories
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {displayCategories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.name)}
                    className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Top Yercaud Localities */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-slate-700 pb-2">
              Yercaud Localities
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {displayLocalities.slice(1, 8).map((loc) => (
                <li key={loc}>
                  <button
                    onClick={() => onSelectLocality(loc)}
                    className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                  >
                    {loc}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Links & Helplines */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-slate-700 pb-2">
              Helplines &amp; Portal
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {onOpenEvents && (
                <li>
                  <button
                    onClick={onOpenEvents}
                    className="text-amber-300 hover:text-amber-200 font-semibold text-left flex items-center cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-400" />
                    Events &amp; Notices
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={onOpenEmergency}
                  className="text-rose-300 hover:text-rose-200 font-semibold text-left flex items-center cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-rose-400" />
                  24x7 Emergency Numbers
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAddListing}
                  className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  List Your Business/Service
                </button>
              </li>
              <li>
                <a
                  href="https://www.growtechnologies.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors text-left block font-medium"
                >
                  Grow Technologies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; 2008 &ndash; 2026 <strong>123yercaud.com</strong> &bull; All Rights Reserved.
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center text-slate-300">
              made by{' '}
              <a
                href="https://www.growtechnologies.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-300 hover:text-emerald-200 font-medium ml-1 underline underline-offset-2"
              >
                Grow Technologies
              </a>
            </span>

            <button
              onClick={scrollToTop}
              className="p-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white rounded-lg transition-colors flex items-center gap-1 cursor-pointer border border-slate-600"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
