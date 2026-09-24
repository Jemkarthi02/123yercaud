import React from 'react';
import { X, Calendar, MapPin, Sparkles, Clock, ExternalLink } from 'lucide-react';
import { CITY_EVENTS } from '../data/portalData';

interface EventsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EventsModal: React.FC<EventsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 my-auto">
        {/* Header */}
        <div className="bg-red-600 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/15 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-200 uppercase tracking-wider block">
                Local Festivals &amp; Exhibitions
              </span>
              <h3 className="text-lg font-bold">Upcoming City &amp; Hill Events</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Events List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 custom-red-scrollbar">
          {CITY_EVENTS.map((event) => (
            <div
              key={event.id}
              className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-2xs hover:shadow-xs transition-all space-y-2"
            >
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-red-100 text-red-700 rounded-full border border-red-200">
                    {event.category}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                    {event.title}
                  </h4>
                </div>

                <div className="flex items-center text-xs font-bold text-red-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  <span>{event.date}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {event.description}
              </p>

              <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                <div className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-red-500" />
                  <span>{event.location}</span>
                </div>

                <span className="font-medium text-slate-700">
                  Organizer: {event.organizer}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 font-bold text-xs text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
