import React from 'react';
import { PlusCircle, Calendar } from 'lucide-react';
import { AppLogo } from './AppLogo';

interface PortalHeaderProps {
  onNavigateDirectory: () => void;
  onOpenEvents: () => void;
  onOpenAddListing: () => void;
  isEventsActive?: boolean;
  eventCount?: number;
  appName?: string;
}

export const PortalHeader: React.FC<PortalHeaderProps> = ({
  onNavigateDirectory,
  onOpenEvents,
  onOpenAddListing,
  isEventsActive = false,
  eventCount = 0,
  appName = 'YERCAUD',
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-2.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo - 123yercaud.com */}
          <div 
            onClick={onNavigateDirectory}
            className="flex items-center cursor-pointer select-none shrink-0 group py-0.5"
            title="123yercaud.com - Home"
          >
            <AppLogo size="header" className="transition-transform duration-200 group-hover:scale-[1.02]" />
          </div>

          {/* Right Header Navigation & Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Events Page Button */}
            <button
              onClick={onOpenEvents}
              className={`px-3 sm:px-3.5 py-2 rounded text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                isEventsActive
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200'
              }`}
              title="View Upcoming Events & Notices in Yercaud"
            >
              <Calendar className={`w-3.5 h-3.5 ${isEventsActive ? 'text-white' : 'text-red-600'}`} />
              <span>Events</span>
              {eventCount > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                  isEventsActive ? 'bg-white text-red-600' : 'bg-red-600 text-white'
                }`}>
                  {eventCount}
                </span>
              )}
            </button>

            {/* List Your Business Button */}
            <button
              onClick={onOpenAddListing}
              className="px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5 text-white" />
              <span className="hidden xs:inline sm:inline">List Your Business/Service</span>
              <span className="xs:hidden sm:hidden">List</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};



