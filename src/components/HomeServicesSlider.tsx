import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  Mountain, 
  Scale, 
  Car, 
  HardHat, 
  Coffee,
  CheckCircle2
} from 'lucide-react';

export interface ServiceSlide {
  id: string;
  categoryName: string;
  badge: string;
  title: string;
  highlightText: string;
  subtitle: string;
  ctaText: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  imageUrl: string;
  accentBg: string;
  accentBorder: string;
  textColor: string;
  pillColor: string;
}

const SLIDES: ServiceSlide[] = [
  {
    id: 'slide-resorts',
    categoryName: 'Resorts & Cottages',
    badge: '★ Top Rated Hill Stays',
    title: 'Find Peaceful',
    highlightText: 'Resorts, Cottages & Homestays',
    subtitle: 'Overlook misty valleys, lakefront cottages, family bonfire villas, and coffee plantation retreats with verified ratings.',
    ctaText: 'Explore Resorts & Stays',
    icon: Mountain,
    tags: ['Lake View Stays', 'Coffee Estate Cottages', 'Campfire & BBQ', 'Family Villas', 'Private Pool'],
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    accentBg: 'from-emerald-950/90 via-slate-900/85 to-slate-950/95',
    accentBorder: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    pillColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    id: 'slide-advocates',
    categoryName: 'Advocates',
    badge: '⚖ Bar Council Registered',
    title: 'Trusted Local',
    highlightText: 'Advocates, Notaries & Legal Advisors',
    subtitle: 'Experienced civil advocates, criminal defense, property documentation, title verification, and notary attestation services.',
    ctaText: 'Consult Advocates',
    icon: Scale,
    tags: ['Civil Lawyers', 'Criminal Advocates', 'Property Documentation', 'Notary Public', 'Deed Writers'],
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    accentBg: 'from-red-950/90 via-slate-900/85 to-slate-950/95',
    accentBorder: 'border-red-500/30',
    textColor: 'text-red-400',
    pillColor: 'bg-red-500/20 text-red-300 border-red-500/30',
  },
  {
    id: 'slide-tours',
    categoryName: 'Tour Operators',
    badge: '🚗 24/7 Verified Transport',
    title: 'Book Reliable',
    highlightText: 'Tour Operators & Ghat Road Cabs',
    subtitle: 'Safe 20-hairpin-bend drivers, round-trip Salem drops, tempo travellers, and custom guided sightseeing for families.',
    ctaText: 'Find Cabs & Packages',
    icon: Car,
    tags: ['Ghat Road Taxi', 'Sightseeing Packages', 'Tempo Traveller', 'Salem Station Pickup', 'Jeep Safari'],
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    accentBg: 'from-blue-950/90 via-slate-900/85 to-slate-950/95',
    accentBorder: 'border-blue-500/30',
    textColor: 'text-blue-400',
    pillColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  },
  {
    id: 'slide-builders',
    categoryName: 'Builders',
    badge: '🏗 Licensed Contractors',
    title: 'Certified',
    highlightText: 'Builders, Borewells & Civil Engineers',
    subtitle: 'Hill terrain foundations, hollow brick suppliers, aluminium fabrication, water diviners, and turnkey villa construction.',
    ctaText: 'Contact Builders & Engineers',
    icon: HardHat,
    tags: ['Civil Contractors', 'Borewell Drilling', 'Hollow Bricks', 'Aluminium Fabricators', 'Plan Approval'],
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    accentBg: 'from-amber-950/90 via-slate-900/85 to-slate-950/95',
    accentBorder: 'border-amber-500/30',
    textColor: 'text-amber-400',
    pillColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  },
  {
    id: 'slide-coffee',
    categoryName: 'Coffee Estates & Spices',
    badge: '☕ 100% Plantation Fresh',
    title: 'Estate Direct',
    highlightText: 'Pure Filter Coffee & Spices',
    subtitle: 'Authentic Arabica & Robusta roasts, wild hill honey, black pepper, eucalyptus oil, and homemade artisan chocolates.',
    ctaText: 'Browse Coffee & Spices',
    icon: Coffee,
    tags: ['Pure Filter Coffee', 'Homemade Chocolates', 'Hill Spices', 'Eucalyptus Oil', 'Estate Tours'],
    imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80',
    accentBg: 'from-stone-950/90 via-amber-950/80 to-slate-950/95',
    accentBorder: 'border-orange-500/30',
    textColor: 'text-orange-400',
    pillColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  }
];

interface HomeServicesSliderProps {
  onSelectCategory: (categoryName: string) => void;
}

export const HomeServicesSlider: React.FC<HomeServicesSliderProps> = ({
  onSelectCategory
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = SLIDES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      handleNext();
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPaused]);

  return (
    <div 
      className="relative mb-6 rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-900 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image with Fallback */}
      <div className="relative min-h-[360px] sm:min-h-[380px] md:min-h-[400px] flex items-center">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-105"
          style={{ backgroundImage: `url(${currentSlide.imageUrl})` }}
        />

        {/* Dynamic Dark Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${currentSlide.accentBg} transition-colors duration-700`} />

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-50" />

        {/* Slide Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 py-8 sm:py-10 flex flex-col justify-between">
          <div className="max-w-2xl">
            {/* Top Badge */}
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${currentSlide.pillColor} backdrop-blur-xs`}>
                <Sparkles className="w-3.5 h-3.5" />
                {currentSlide.badge}
              </span>
              <span className="text-[11px] font-bold text-slate-300/80 uppercase tracking-widest hidden sm:inline">
                Featured 123 Service #{currentIndex + 1} of {SLIDES.length}
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-2.5">
              <span>{currentSlide.title} </span>
              <span className={`block sm:inline ${currentSlide.textColor}`}>
                {currentSlide.highlightText}
              </span>
            </h2>

            {/* Subtitle / Description */}
            <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed mb-5 max-w-xl font-medium">
              {currentSlide.subtitle}
            </p>

            {/* Sub-Service Tags */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
              {currentSlide.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onSelectCategory(currentSlide.categoryName)}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white text-[11px] sm:text-xs font-semibold rounded-lg backdrop-blur-xs border border-white/10 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{tag}</span>
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onSelectCategory(currentSlide.categoryName)}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-red-600/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={() => onSelectCategory(currentSlide.categoryName)}
                className="px-4 py-3 bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 backdrop-blur-xs transition-colors cursor-pointer hidden sm:flex items-center gap-1.5"
              >
                <span>Direct Contact &amp; Hours</span>
              </button>
            </div>
          </div>
        </div>

        {/* Prev / Next Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous service slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/60 hover:bg-red-600 text-white border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer backdrop-blur-xs"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next service slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/60 hover:bg-red-600 text-white border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer backdrop-blur-xs"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Bottom Controls Bar: Slide Dots & Quick Switcher */}
      <div className="bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 py-2.5 border-t border-white/10 flex items-center justify-between gap-4">
        {/* Slide Indicators / Dots */}
        <div className="flex items-center gap-2">
          {SLIDES.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}: ${slide.categoryName}`}
                className={`transition-all rounded-full cursor-pointer ${
                  isActive
                    ? 'w-8 h-2.5 bg-red-600'
                    : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            );
          })}
        </div>

        {/* Interactive Slide Category Shortcut Pills */}
        <div className="hidden md:flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {SLIDES.map((slide, index) => {
            const isActive = index === currentIndex;
            const Icon = slide.icon;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(index)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-red-600' : 'text-slate-400'}`} />
                <span>{slide.categoryName}</span>
              </button>
            );
          })}
        </div>

        {/* Slide counter */}
        <div className="text-[11px] font-bold text-slate-400 shrink-0">
          Slide <strong className="text-white">{currentIndex + 1}</strong> of {SLIDES.length}
        </div>
      </div>
    </div>
  );
};
