import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Search, 
  Filter, 
  Sparkles, 
  Ticket, 
  ArrowLeft,
  Share2,
  CalendarCheck2
} from 'lucide-react';
import { CityEvent } from '../types';
import { EventDetailModal } from './EventDetailModal';

interface EventsPageViewProps {
  events: CityEvent[];
  onBackToHome: () => void;
}

export const EventsPageView: React.FC<EventsPageViewProps> = ({
  events,
  onBackToHome,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEventForModal, setSelectedEventForModal] = useState<CityEvent | null>(null);

  // Derive unique categories
  const categoriesList = ['all', ...Array.from(new Set(events.map((e) => e.category)))];

  const filteredEvents = events.filter((ev) => {
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === 'all' || ev.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCat;
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to get day and month if not explicitly present
  const getEventDay = (ev: CityEvent) => {
    if (ev.day) return ev.day;
    try {
      const d = new Date(ev.date);
      if (!isNaN(d.getDate())) return String(d.getDate()).padStart(2, '0');
    } catch {}
    const match = ev.date.match(/\b(\d{1,2})\b/);
    return match ? match[1] : '20';
  };

  const getEventMonth = (ev: CityEvent) => {
    if (ev.month) return ev.month.toUpperCase();
    try {
      const d = new Date(ev.date);
      if (!isNaN(d.getMonth())) {
        return d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
      }
    } catch {}
    const match = ev.date.match(/(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)/i);
    return match ? match[1].toUpperCase() : 'EVENT';
  };

  return (
    <div className="py-6 sm:py-8 bg-slate-50/70 min-h-[85vh] animate-in fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Back and Breadcrumb */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:text-red-600 hover:border-red-300 shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Back to Main Directory</span>
          </button>

          <div className="text-xs font-semibold text-slate-500">
            <span>Yercaud City Calendar &bull; </span>
            <strong className="text-red-600">{events.length} Upcoming Events</strong>
          </div>
        </div>

        {/* Big Centered "Events" Title as in the screenshot */}
        <div className="text-center mb-6 sm:mb-8 space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-red-700 tracking-tight">
            Events
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Upcoming festivals, sports championships, flower shows, community meets, and hill celebrations in Yercaud
          </p>
        </div>

        {/* Search & Category Filter Header Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs mb-6 space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events, festivals, venue..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white transition-all text-slate-900 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Event Counter Badge */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 self-end sm:self-auto">
              <CalendarCheck2 className="w-4 h-4 text-red-600" />
              <span>Showing <strong>{filteredEvents.length}</strong> of {events.length} Events</span>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 scrollbar-none">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer capitalize ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat === 'all' ? 'All Events' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid - Exact Design as in Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const day = getEventDay(event);
            const month = getEventMonth(event);

            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden flex flex-col group"
              >
                {/* Event Image with Overlaid Date Badge */}
                <div className="relative h-48 sm:h-52 w-full bg-slate-800 overflow-hidden">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80';
                    }}
                  />

                  {/* Gradient shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/30 pointer-events-none" />

                  {/* Red Date Badge on Top-Left (Exact as in Screenshot) */}
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-center px-2.5 py-1 rounded-lg shadow-md border border-white/20 min-w-[50px] flex items-center justify-center gap-1">
                    <span className="text-base font-extrabold leading-none">{day}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider leading-none">{month}</span>
                  </div>

                  {/* Category Pill on Top-Right */}
                  <div className="absolute top-3 right-3 bg-slate-800/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/10">
                    {event.category}
                  </div>

                  {/* Banner bottom info bar (optional schedule text if on image) */}
                  {event.entryFee && (
                    <div className="absolute bottom-2.5 right-3 bg-white/95 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                      <Ticket className="w-3 h-3 text-red-600" />
                      <span>{event.entryFee}</span>
                    </div>
                  )}
                </div>

                {/* Card Info Section */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Location & Time bar with icons (Exact as in Screenshot) */}
                    <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                      <div className="flex items-center gap-1 text-slate-700 truncate flex-1">
                        <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        <span className="truncate" title={event.location}>
                          {event.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 shrink-0">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{event.time}</span>
                      </div>
                    </div>

                    {/* Event Title */}
                    <h3
                      onClick={() => setSelectedEventForModal(event)}
                      className="text-base font-bold text-slate-900 mt-2 hover:text-red-700 transition-colors cursor-pointer line-clamp-2 leading-snug"
                      title={event.title}
                    >
                      {event.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Action Button: "View Event" (Exact red pill button as in Screenshot) */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedEventForModal(event)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span>View Event</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 mt-4">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No events found</h3>
            <p className="text-xs text-slate-500 mt-1">
              No events matched your current search or category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      <EventDetailModal
        event={selectedEventForModal}
        isOpen={!!selectedEventForModal}
        onClose={() => setSelectedEventForModal(null)}
      />
    </div>
  );
};
