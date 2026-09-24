import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Bookmark, 
  ExternalLink, 
  Clock, 
  MessageSquare, 
  ChevronRight, 
  Check, 
  Copy,
  Calendar,
  Building
} from 'lucide-react';
import { Business } from '../types';

interface BusinessCardProps {
  business: Business;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onOpenDetail: (business: Business) => void;
  onOpenEnquiry?: (business: Business) => void;
  onOpenDirection?: (business: Business) => void;
  viewMode?: 'grid' | 'list';
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  isSaved,
  onToggleSave,
  onOpenDetail,
  onOpenEnquiry,
  onOpenDirection,
  viewMode = 'grid',
}) => {
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = encodeURIComponent(
      `Hello ${business.name}, I found your listing on 123yercaud.com and would like to inquire about your services.`
    );
    window.open(`https://wa.me/919443916492?text=${message}`, '_blank');
  };

  const handleGetDirection = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOpenDirection) {
      onOpenDirection(business);
    } else {
      const mapsQuery = encodeURIComponent(`${business.name}, ${business.address}, ${business.locality}`);
      window.open(`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`, '_blank');
    }
  };

  if (viewMode === 'list') {
    return (
      <div 
        onClick={() => onOpenDetail(business)}
        className="bg-white rounded-xl border border-slate-200 hover:border-emerald-700 hover:shadow-md transition-all p-4 sm:p-5 flex flex-col md:flex-row gap-5 cursor-pointer relative group"
        id={`business-card-${business.id}`}
      >
        {/* Thumbnail Image */}
        <div className="w-full md:w-56 h-44 shrink-0 rounded-lg overflow-hidden bg-slate-100 relative">
          <img
            src={business.imageUrl}
            alt={business.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          {business.isFeatured && (
            <span className="absolute top-2 left-2 bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
              Featured
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(business.id);
            }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-xs transition-colors"
            title={isSaved ? 'Remove from Saved' : 'Save this listing'}
          >
            <Bookmark
              className={`w-4 h-4 ${
                isSaved ? 'fill-amber-500 text-amber-500' : 'text-slate-600'
              }`}
            />
          </button>
        </div>

        {/* Info Column */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  {business.subcategory}
                </span>
                {business.establishedYear && (
                  <span className="text-[11px] text-slate-400">
                    Est. {business.establishedYear}
                  </span>
                )}
              </div>

              {/* Star Rating Badge */}
              <div className="flex items-center gap-1 bg-emerald-600 text-white px-2 py-0.5 rounded text-xs font-bold shadow-2xs">
                <span>{business.rating.toFixed(1)}</span>
                <Star className="w-3 h-3 fill-white" />
                <span className="text-[10px] text-emerald-100 font-normal ml-0.5">
                  ({business.reviewCount})
                </span>
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-900 transition-colors flex items-center gap-1.5">
              <span>{business.name}</span>
              {business.isVerified && (
                <span title="123yercaud Verified Business">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                </span>
              )}
            </h3>

            <p className="text-xs text-slate-500 flex items-center mt-1">
              <MapPin className="w-3.5 h-3.5 text-red-500 mr-1 shrink-0" />
              <span>{business.address}, {business.locality} - {business.pincode}</span>
            </p>

            <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
              {business.description}
            </p>

            {/* Services Pills */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {business.services.slice(0, 3).map((srv, idx) => (
                <span
                  key={idx}
                  className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                >
                  &bull; {srv}
                </span>
              ))}
              {business.services.length > 3 && (
                <span className="text-[11px] text-slate-400 font-medium">
                  +{business.services.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 mt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-400 flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                {business.openingHours}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="tel:9443916492"
                onClick={(e) => e.stopPropagation()}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                title="Direct Phone Call"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call</span>
              </a>

              <button
                onClick={handleWhatsApp}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={handleGetDirection}
                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                title="Get Direction"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Get Direction</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Mode
  return (
    <div
      onClick={() => onOpenDetail(business)}
      className="bg-white rounded-xl border border-slate-200 hover:border-emerald-700 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer relative group overflow-hidden"
      id={`business-card-${business.id}`}
    >
      <div>
        {/* Card Header Image */}
        <div className="h-44 w-full bg-slate-100 relative overflow-hidden">
          <img
            src={business.imageUrl}
            alt={business.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          {business.isFeatured && (
            <span className="absolute top-2 left-2 bg-amber-500 text-slate-900 font-black text-[10px] uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
              Featured
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(business.id);
            }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-xs transition-colors"
            title={isSaved ? 'Remove from Saved' : 'Save this listing'}
          >
            <Bookmark
              className={`w-4 h-4 ${
                isSaved ? 'fill-amber-500 text-amber-500' : 'text-slate-600'
              }`}
            />
          </button>

          <span className="absolute bottom-2 left-2 bg-slate-800/85 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
            {business.locality}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-4">
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 truncate">
              {business.subcategory}
            </span>

            <div className="flex items-center gap-1 bg-emerald-600 text-white px-1.5 py-0.5 rounded text-[11px] font-bold shrink-0">
              <span>{business.rating.toFixed(1)}</span>
              <Star className="w-3 h-3 fill-white" />
              <span className="text-[9px] text-emerald-100 font-normal">
                ({business.reviewCount})
              </span>
            </div>
          </div>

          <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-900 transition-colors line-clamp-1 flex items-center gap-1">
            <span>{business.name}</span>
            {business.isVerified && (
              <span title="123yercaud Verified">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              </span>
            )}
          </h3>

          <p className="text-[11px] text-slate-500 flex items-center mt-1 truncate">
            <MapPin className="w-3 h-3 text-red-500 mr-1 shrink-0" />
            <span>{business.address}</span>
          </p>

          <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
            {business.description}
          </p>
        </div>
      </div>

      {/* Card Action Strip */}
      <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
        <a
          href="tel:9443916492"
          onClick={(e) => e.stopPropagation()}
          className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
          title="Direct Phone Call"
        >
          <Phone className="w-3 h-3 text-emerald-400" />
          <span>Call</span>
        </a>

        <button
          onClick={handleWhatsApp}
          className="flex-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1 shadow-2xs transition-colors cursor-pointer"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="w-3 h-3" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={handleGetDirection}
          className="py-1.5 px-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1 shadow-2xs transition-colors cursor-pointer"
          title="Get Direction"
        >
          <MapPin className="w-3 h-3" />
          <span className="hidden xs:inline">Direction</span>
        </button>
      </div>
    </div>
  );
};
