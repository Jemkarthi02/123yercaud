import React, { useState, useEffect } from 'react';
import { MessageSquare, PhoneCall, X, ArrowUp } from 'lucide-react';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  timing?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = '9443916492',
  timing = '10.00 AM - 5.00 PM',
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Extract raw digits and ensure international prefix 91
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  const waNumber = cleanNumber.startsWith('91') && cleanNumber.length > 10 
    ? cleanNumber 
    : `91${cleanNumber.replace(/^0+/, '')}`;

  const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    'Hello 123yercaud Admin, I would like to inquire about Yercaud property listings and local services.'
  )}`;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 180) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-2.5 pointer-events-auto">
      {/* Tooltip Card on Hover / Mobile */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-2.5 bg-slate-800 text-white rounded-2xl p-3 shadow-2xl border border-slate-700 w-60 animate-in fade-in slide-in-from-bottom-2 text-xs">
          <div className="flex items-center justify-between gap-2 border-b border-slate-700 pb-1.5 mb-1.5">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Direct WhatsApp Support
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            Need hill hotel bookings, verified cab transfers, or property listings?
          </p>
          <div className="mt-2 pt-1.5 border-t border-slate-700 text-[10px] text-amber-300 flex flex-col gap-0.5 font-mono">
            <span className="font-bold text-white">Hotline: +91 94439 16492</span>
            <span>Admin Timing : {timing}</span>
          </div>
        </div>
      )}

      {/* 1. Sticky WhatsApp Button (Placed ABOVE the scroll-to-top button) */}
      <div className="relative group flex items-center justify-center">
        <span className="absolute right-full mr-2.5 bg-slate-800/95 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-700 hidden sm:block">
          WhatsApp: 9443916492
        </span>

        {/* Pulsing glow ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-30 animate-ping pointer-events-none" />

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label="Direct WhatsApp Contact 9443916492"
          id="sticky-whatsapp-btn"
          className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-tr from-emerald-600 via-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-400 text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer border-2 border-white ring-2 ring-emerald-500/25"
        >
          {/* Official Crisp SVG WhatsApp icon */}
          <svg
            className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-white drop-shadow-xs"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>

      {/* 2. Sticky Scroll To Top Button (Placed directly BELOW WhatsApp) */}
      <div 
        className={`transition-all duration-300 transform ${
          showScrollTop 
            ? 'opacity-100 translate-y-0 pointer-events-auto scale-100' 
            : 'opacity-0 translate-y-4 pointer-events-none scale-75 h-0 overflow-hidden'
        }`}
      >
        <button
          onClick={scrollToTop}
          className="w-9 h-9 sm:w-10 sm:h-10 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer border-2 border-white ring-2 ring-red-600/25 group"
          aria-label="Scroll to top of page"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4 stroke-[2.5] group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
