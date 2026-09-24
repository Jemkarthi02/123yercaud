import React from 'react';
import { 
  Compass, 
  MapPin, 
  Clock, 
  Ticket, 
  Droplets, 
  Mountain, 
  Coffee,
  CloudSun,
  Trees
} from 'lucide-react';
import { CITY_ATTRACTIONS, YERCAUD_LOCALITIES } from '../data/yercaudData';

interface CityGuideSectionProps {
  onSelectLocality: (locality: string) => void;
}

export const CityGuideSection: React.FC<CityGuideSectionProps> = ({
  onSelectLocality,
}) => {
  return (
    <section className="py-12 bg-white border-t border-slate-200" id="coimbatore-city-guide">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            <span>Yercaud Travel Guide &amp; Heritage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Discover Yercaud: The Jewel of the South
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Nestled at an altitude of 1,515 meters (4,970 ft) in the Shevaroy Hills of the Eastern Ghats, Yercaud is affectionately named after "Yeri-Kadu" (Lake-Forest in Tamil). Renowned for its misty mornings, fragrant coffee estates, spice gardens, and tranquil emerald lake.
          </p>
        </div>

        {/* Yercaud Highlights Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
              <CloudSun className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 mb-1">Pleasant Salubrious Climate</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Temperatures hover between 13°C and 25°C all year. A tranquil, less-crowded alternative to Ooty and Kodaikanal.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
              <Coffee className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 mb-1">Estate Coffee &amp; Black Pepper</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              First planted in 1820 by British Governor M.D. Cockburn. Cultivates aromatic Arabica, Robusta, and Tellicherry pepper.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
              <Mountain className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 mb-1">20 Hairpin Ghat Bends</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              The 32-km scenic drive from Salem ascends 4,000 feet through 20 engineering marvel hairpin bends with panoramic valley vistas.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center mb-3">
              <Trees className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 mb-1">Botanical Orchidarium</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              India's 3rd largest orchidarium housing over 250 species of wild orchids, including endangered pitcher plants and kurinji blooms.
            </p>
          </div>
        </div>

        {/* Tourist Attractions Cards */}
        <div className="mb-8">
          <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
            <span>Must-Visit Sights in &amp; Around Yercaud</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {CITY_ATTRACTIONS.map((att) => (
              <div
                key={att.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col"
              >
                <div className="h-40 w-full relative bg-slate-100">
                  <img
                    src={att.imageUrl}
                    alt={att.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-2 left-2 bg-slate-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                    {att.category}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 leading-snug mb-1">
                      {att.name}
                    </h4>

                    <p className="text-[11px] text-slate-500 flex items-center mb-2">
                      <MapPin className="w-3 h-3 text-red-500 mr-1 shrink-0" />
                      <span className="truncate">{att.location}</span>
                    </p>

                    <p className="text-xs text-slate-600 line-clamp-3 mb-3 leading-relaxed">
                      {att.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1 text-slate-400" /> Timings:
                      </span>
                      <span className="font-semibold text-slate-700">{att.timings.split('(')[0]}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Ticket className="w-3 h-3 mr-1 text-slate-400" /> Entry:
                      </span>
                      <span className="font-semibold text-emerald-800">{att.entryFee.split('|')[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Localities Quick Selector Strip */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
            Explore Yercaud by Locality / Area
          </h4>
          <div className="flex flex-wrap gap-2">
            {YERCAUD_LOCALITIES.filter((l) => l !== 'All Localities').map((loc) => (
              <button
                key={loc}
                onClick={() => onSelectLocality(loc)}
                className="px-3 py-1.5 bg-white hover:bg-emerald-950 hover:text-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer"
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
