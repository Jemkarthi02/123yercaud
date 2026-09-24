import React from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Share2, 
  Tag, 
  Ticket, 
  ExternalLink,
  MessageCircle,
  Building2,
  CalendarPlus,
  Sparkles
} from 'lucide-react';
import { CityEvent } from '../types';

interface EventDetailModalProps {
  event: CityEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !event) return null;

  const handleShareWhatsApp = () => {
    const text = `*${event.title}* in Yercaud!\n\n📅 Date: ${event.day || ''} ${event.month || ''} (${event.date})\n⏰ Time: ${event.time}\n📍 Venue: ${event.location}\n🎟️ Entry: ${event.entryFee || 'Free'}\n\n${event.description}\n\nCheck full details on 123 Yercaud Local Portal!`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleGoogleCalendar = () => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(`${event.description}\n\nOrganizer: ${event.organizer} (${event.organizerPhone || ''})`);
    const location = encodeURIComponent(event.location);
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank');
  };

  const openGoogleMaps = () => {
    const query = encodeURIComponent(`${event.location}, Yercaud, Tamil Nadu`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-800/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 my-auto animate-in zoom-in-95 duration-150 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 p-2 bg-slate-800/75 hover:bg-slate-700 text-white rounded-full backdrop-blur-xs transition-colors cursor-pointer"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image & Badges */}
        <div className="relative h-60 sm:h-72 w-full bg-slate-800">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-800/20 to-transparent" />

          {/* Date Badge */}
          <div className="absolute top-4 left-4 bg-red-600 text-white font-black text-center px-3.5 py-2 rounded-2xl shadow-xl border border-white/20 min-w-[60px]">
            <div className="text-xl sm:text-2xl leading-none font-black">{event.day || 'EV'}</div>
            <div className="text-[11px] uppercase font-bold tracking-wider">{event.month || 'EVENT'}</div>
          </div>

          {/* Category Pill */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              {event.category}
            </span>
            {event.entryFee && (
              <span className="bg-white/90 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Ticket className="w-3.5 h-3.5 text-red-600" />
                <span>{event.entryFee}</span>
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 space-y-5">
          {/* Title & Timing Grid */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {event.title}
            </h2>

            {/* Quick Metadata Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-red-100 text-red-600 shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Date &amp; Schedule</div>
                  <div className="text-slate-600 mt-0.5">{event.date}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Event Timing</div>
                  <div className="text-slate-600 mt-0.5">{event.time}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 sm:col-span-2">
                <div className="p-2 rounded-xl bg-blue-100 text-blue-600 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>Venue Location</span>
                    <button
                      onClick={openGoogleMaps}
                      className="text-[11px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Get Directions</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-slate-600 mt-0.5">{event.location}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Full Details */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              About this Event
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {event.fullDetails || event.description}
            </p>
          </div>

          {/* Organizer Details */}
          <div className="p-4 bg-slate-800 text-white rounded-2xl space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-red-400" />
                <span className="text-xs font-bold text-slate-300">Organized by</span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-red-600/30 text-red-300 border border-red-500/30 font-semibold">
                Verified Event
              </span>
            </div>
            <div className="text-sm font-bold text-white">{event.organizer}</div>

            <div className="flex flex-wrap gap-4 pt-1 text-xs text-slate-300">
              {event.organizerPhone && (
                <a
                  href={`tel:${event.organizerPhone}`}
                  className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{event.organizerPhone}</span>
                </a>
              )}
              {event.organizerEmail && (
                <a
                  href={`mailto:${event.organizerEmail}`}
                  className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span>{event.organizerEmail}</span>
                </a>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={handleShareWhatsApp}
              className="w-full sm:flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Event on WhatsApp</span>
            </button>

            <button
              onClick={handleGoogleCalendar}
              className="w-full sm:w-auto py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CalendarPlus className="w-4 h-4 text-red-600" />
              <span>Add to Calendar</span>
            </button>

            {event.organizerPhone && (
              <a
                href={`tel:${event.organizerPhone}`}
                className="w-full sm:w-auto py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-center"
              >
                <Phone className="w-4 h-4" />
                <span>Call Organizer</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
