import React from 'react';
import { X, MapPin, Navigation, Compass, ExternalLink } from 'lucide-react';
import { Business } from '../types';

interface DirectionModalProps {
  business: Business | null;
  onClose: () => void;
}

export const DirectionModal: React.FC<DirectionModalProps> = ({
  business,
  onClose,
}) => {
  if (!business) return null;

  const mapsQuery = encodeURIComponent(`${business.name}, ${business.address}, ${business.locality}`);
  const fallbackMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  const mapsUrl = business.mapUrl && business.mapUrl.trim() ? business.mapUrl.trim() : fallbackMapsUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-800/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 my-auto">
        {/* Header */}
        <div className="bg-red-600 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-amber-200" />
            <div>
              <span className="text-[10px] font-bold text-amber-200 uppercase tracking-wider block">
                Route &amp; GPS Location
              </span>
              <h3 className="text-base font-bold truncate max-w-xs">{business.name}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs sm:text-sm">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-start">
              <MapPin className="w-4 h-4 text-red-600 mr-2 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-bold text-sm">{business.name}</strong>
                <p className="text-slate-700 mt-0.5">{business.address}</p>
                <p className="text-slate-500 font-semibold">{business.locality}, Pincode: {business.pincode}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span>Operating Hours:</span>
              <span className="font-bold text-slate-900">{business.openingHours}</span>
            </div>
          </div>

          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <Compass className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Navigation Tip:</strong> You can open live turn-by-turn navigation directly in Google Maps or GPS navigation apps on your mobile device.
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-200 cursor-pointer"
            >
              Close
            </button>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
