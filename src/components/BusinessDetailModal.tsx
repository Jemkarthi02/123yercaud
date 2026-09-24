import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  Globe, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Star, 
  Share2, 
  Bookmark, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  User, 
  Navigation,
  Check,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Camera,
  Layers,
  ThumbsUp,
  FileText
} from 'lucide-react';
import { Business, Review } from '../types';

interface BusinessDetailModalProps {
  business: Business | null;
  onClose: () => void;
  onAddReview: (businessId: string, review: Omit<Review, 'id' | 'date'>) => void;
  onSubmitEnquiry?: (business: Business, data: { name: string; phone: string; message: string }) => void;
  onOpenDirection?: (business: Business) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const BusinessDetailModal: React.FC<BusinessDetailModalProps> = ({
  business,
  onClose,
  onAddReview,
  onOpenDirection,
  isSaved,
  onToggleSave,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');
  const [copiedShare, setCopiedShare] = useState(false);

  // Review form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Multi-image list (max 5 images for the business listing)
  const allImages = useMemo(() => {
    if (!business) return [];
    const list = [business.imageUrl, ...(business.gallery || [])].filter(
      (url): url is string => Boolean(url && typeof url === 'string' && url.trim().length > 0)
    );
    // Deduplicate while preserving order, max 5 images
    return Array.from(new Set(list)).slice(0, 5);
  }, [business?.id, business?.imageUrl, business?.gallery]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index and tab when opening a different business
  useEffect(() => {
    setCurrentImageIndex(0);
    setActiveTab('overview');
    setReviewSuccess(false);
  }, [business?.id]);

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (allImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (allImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for image gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (allImages.length <= 1) return;
      if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [allImages.length]);

  if (!business) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${business.name} on 123yercaud.com`,
        text: `Check out ${business.name} in Yercaud:`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello ${business.name}, I am contacting you regarding your services on 123yercaud.com.`
    );
    window.open(`https://wa.me/919443916492?text=${message}`, '_blank');
  };

  const handleGetDirection = () => {
    if (onOpenDirection) {
      onOpenDirection(business);
    } else {
      const mapsQuery = encodeURIComponent(`${business.name}, ${business.address}, ${business.locality}`);
      window.open(`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`, '_blank');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    onAddReview(business.id, {
      author: reviewName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
      verifiedUser: true,
    });

    setReviewSuccess(true);
    setReviewName('');
    setReviewComment('');
    setReviewRating(5);
    setTimeout(() => {
      setReviewSuccess(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-800/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 my-auto"
        id="business-detail-modal-card"
      >
        {/* Fixed Modal Header */}
        <div className="px-4 sm:px-6 py-3 bg-slate-800 text-white flex items-center justify-between shrink-0 border-b border-slate-700">
          <div className="flex items-center space-x-2 truncate">
            <span className="text-[11px] font-bold text-amber-300 bg-amber-400/15 px-2 py-0.5 rounded border border-amber-400/30 whitespace-nowrap">
              123yercaud Verified Yellow Pages
            </span>
            <span className="text-slate-400 text-xs">&bull;</span>
            <span className="text-xs text-slate-200 font-medium truncate">{business.category}</span>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
            <button
              onClick={() => onToggleSave(business.id)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              title={isSaved ? 'Remove from Saved' : 'Save this listing'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              title="Share Listing"
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content Body (Ensures Overview, Services, Reviews & Ratings are 100% visible) */}
        <div className="flex-1 min-h-0 overflow-y-auto custom-red-scrollbar bg-slate-50/50">
          {/* Modal Hero Banner */}
          <div className="relative h-48 sm:h-60 w-full bg-slate-800 overflow-hidden group select-none shrink-0">
            <img
              key={allImages[currentImageIndex] || business.imageUrl}
              src={allImages[currentImageIndex] || business.imageUrl}
              alt={`${business.name} - Photo ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-300 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-800/40 to-transparent" />

            {/* Multiple Images Carousel Controls inside Banner */}
            {allImages.length > 1 && (
              <>
                {/* Previous Photo Button */}
                <button
                  type="button"
                  onClick={handlePrevImage}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-800/85 hover:bg-slate-700 text-white border border-white/20 flex items-center justify-center backdrop-blur-md shadow-xl transition-all hover:scale-105 active:scale-95 z-20 cursor-pointer opacity-90 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Next Photo Button */}
                <button
                  type="button"
                  onClick={handleNextImage}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-800/85 hover:bg-slate-700 text-white border border-white/20 flex items-center justify-center backdrop-blur-md shadow-xl transition-all hover:scale-105 active:scale-95 z-20 cursor-pointer opacity-90 group-hover:opacity-100"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Photo Counter Badge */}
                <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
                  <span className="bg-slate-800/90 text-white/95 text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                    <Camera className="w-3.5 h-3.5 text-amber-400" />
                    <span>{currentImageIndex + 1} / {allImages.length} Photos</span>
                  </span>
                </div>

                {/* Mini Dot Indicator */}
                <div className="absolute top-3.5 left-4 z-20 flex items-center gap-1.5">
                  {allImages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(idx);
                      }}
                      className={`h-1.5 transition-all rounded-full cursor-pointer ${
                        idx === currentImageIndex
                          ? 'w-5 bg-amber-400 shadow-sm'
                          : 'w-1.5 bg-white/50 hover:bg-white/90'
                      }`}
                      title={`View photo ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Business Details Overlaid in Banner */}
            <div className="absolute bottom-3 left-4 right-4 sm:left-6 sm:right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 z-10">
              <div className="max-w-xl">
                <div className="flex flex-wrap items-center gap-1.5 mb-1">
                  <span className="text-[11px] font-bold bg-amber-500 text-slate-900 px-2 py-0.5 rounded shadow-xs">
                    {business.subcategory}
                  </span>
                  {business.isVerified && (
                    <span className="inline-flex items-center text-[11px] font-semibold bg-emerald-600 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1 text-white" />
                      Verified Listing
                    </span>
                  )}
                  {allImages.length > 1 && (
                    <span className="text-[10px] font-semibold text-slate-200 bg-white/20 px-2 py-0.5 rounded border border-white/20">
                      {allImages.length} Photos
                    </span>
                  )}
                </div>

                <h2 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight drop-shadow-sm leading-snug">
                  {business.name}
                </h2>

                <p className="text-[11px] sm:text-xs text-slate-200 flex items-center mt-0.5 drop-shadow-xs truncate">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-red-400 shrink-0" />
                  <span className="truncate">{business.address}, {business.locality} - {business.pincode}</span>
                </p>
              </div>

              {/* Star Rating Badge */}
              <div className="bg-slate-800/80 backdrop-blur-md px-3 py-1.5 sm:p-2.5 rounded-xl border border-white/20 text-center shrink-0 w-fit self-start sm:self-auto">
                <div className="flex items-center justify-center gap-1 text-amber-300 font-black text-base sm:text-lg">
                  <span>{business.rating.toFixed(1)}</span>
                  <Star className="w-4 h-4 fill-amber-300" />
                </div>
                <div className="text-[10px] text-slate-200 font-medium">
                  {business.reviews.length || business.reviewCount} reviews
                </div>
              </div>
            </div>
          </div>

          {/* Multi-Photo Thumbnail Bar */}
          {allImages.length > 1 && (
            <div className="px-4 sm:px-6 py-2 bg-slate-800 border-b border-slate-700 flex items-center gap-2 overflow-x-auto shrink-0">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
                <Camera className="w-3 h-3 text-amber-400" />
                <span>Gallery:</span>
              </span>
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative h-10 w-14 sm:w-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    idx === currentImageIndex
                      ? 'border-amber-400 scale-105 shadow-md ring-2 ring-amber-400/40 opacity-100'
                      : 'border-slate-600 opacity-70 hover:opacity-100 hover:border-slate-400'
                  }`}
                  title={`Switch to photo ${idx + 1}`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0.5 right-0.5 bg-slate-800/90 text-white text-[8px] font-bold px-1 rounded">
                    {idx + 1}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Sticky Navigation Tabs (Always accessible when scrolling) */}
          <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shadow-2xs">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'border-red-600 text-red-600 bg-red-50/50'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Overview &amp; Services</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('reviews')}
                className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-red-600 text-red-600 bg-red-50/50'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${activeTab === 'reviews' ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
                <span>Reviews &amp; Ratings</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                  activeTab === 'reviews' ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {business.reviews.length}
                </span>
              </button>
            </div>

            {/* Quick action hotline badge */}
            <div className="hidden md:flex items-center gap-2 text-xs font-mono font-bold text-slate-600">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <a href="tel:+919443916492" className="hover:text-red-600 transition-colors">
                +91 94439 16492
              </a>
            </div>
          </div>

          {/* Tab Content Section */}
          <div className="p-4 sm:p-6 text-slate-700 text-xs sm:text-sm space-y-6">
            {/* TAB 1: OVERVIEW & SERVICES */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                {/* Quick Contact Action Strip */}
                <div className="p-3.5 sm:p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-xl border border-emerald-200 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 block">
                      Direct Verified Directory Hotline
                    </span>
                    <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-red-600" />
                      <span>Admin Timing : 10.00 AM - 5.00 PM</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href="tel:+919443916492"
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer transition-all active:scale-95"
                      title="Direct Phone Call"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Call Now</span>
                    </a>

                    <button
                      onClick={handleWhatsApp}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer transition-all active:scale-95"
                      title="Direct WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      onClick={handleGetDirection}
                      className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer transition-all active:scale-95"
                      title="Get Route & Direction"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Direction</span>
                    </button>
                  </div>
                </div>

                {/* About Business Section */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>About {business.name}</span>
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                    {business.description || `${business.name} is a premier verified provider in Yercaud offering quality services, authentic pricing, and dependable customer support.`}
                  </p>
                </div>

                {/* Services & Key Highlights Section */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Services &amp; Key Highlights</span>
                  </h4>
                  {business.services && business.services.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {business.services.map((srv, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 sm:p-3 bg-slate-50 hover:bg-emerald-50/50 transition-colors rounded-xl border border-slate-200 flex items-start gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-xs font-bold text-slate-800">{srv}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">Standard service offerings available on request.</p>
                  )}
                </div>

                {/* Photo Gallery Grid (if multiple photos available) */}
                {allImages.length > 1 && (
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-emerald-600" />
                        <span>Photo Gallery ({allImages.length} Photos)</span>
                      </h4>
                      <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">
                        Click any photo to view full in banner
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                      {allImages.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setCurrentImageIndex(idx);
                            const modalBody = document.querySelector('.custom-red-scrollbar');
                            if (modalBody) modalBody.scrollTop = 0;
                          }}
                          className={`group relative rounded-xl overflow-hidden aspect-4/3 border-2 transition-all cursor-pointer shadow-xs ${
                            idx === currentImageIndex
                              ? 'border-amber-500 ring-2 ring-amber-400/40 scale-[1.02]'
                              : 'border-slate-200 hover:border-emerald-600 hover:scale-[1.01]'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`${business.name} Gallery ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end justify-between p-1.5 text-white">
                            <span className="text-[10px] font-bold">
                              {idx === 0 ? 'Cover' : `Photo ${idx + 1}`}
                            </span>
                            {idx === currentImageIndex && (
                              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detailed Business Information Section */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider mb-3">
                    Business Information &amp; Contacts
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    <div className="space-y-2.5">
                      <div className="flex items-center text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <Clock className="w-4 h-4 mr-2 text-red-500 shrink-0" />
                        <span><strong>Operating Hours:</strong> {business.openingHours || '10:00 AM to 5:00 PM'}</span>
                      </div>
                      {business.contactPerson && (
                        <div className="flex items-center text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          <User className="w-4 h-4 mr-2 text-blue-500 shrink-0" />
                          <span><strong>Contact Person:</strong> {business.contactPerson}</span>
                        </div>
                      )}
                      {business.establishedYear && (
                        <div className="flex items-center text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          <Calendar className="w-4 h-4 mr-2 text-emerald-500 shrink-0" />
                          <span><strong>Established:</strong> {business.establishedYear}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2.5">
                      {business.email && (
                        <div className="flex items-center text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200 truncate">
                          <Mail className="w-4 h-4 mr-2 text-blue-600 shrink-0" />
                          <a href={`mailto:${business.email}`} className="text-blue-700 font-bold hover:underline truncate">
                            {business.email}
                          </a>
                        </div>
                      )}
                      {business.website && (
                        <div className="flex items-center text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200 truncate">
                          <Globe className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
                          <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold hover:underline truncate">
                            Official Website
                          </a>
                        </div>
                      )}
                      <div className="flex items-center text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <ShieldCheck className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
                        <span><strong>Directory ID:</strong> 123YCD-{business.id.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: REVIEWS & RATINGS */}
            {activeTab === 'reviews' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                {/* Review Overall Score Banner */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border-2 border-amber-400 flex flex-col items-center justify-center text-amber-500">
                      <span className="text-2xl font-black">{business.rating.toFixed(1)}</span>
                      <div className="flex items-center gap-0.5 -mt-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base font-black text-slate-900">
                        Verified Customer Rating
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Based on {business.reviews.length} authenticated reviews on 123yercaud.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>100% Genuine Tourist Verified</span>
                  </div>
                </div>

                {/* Write a Review Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h5 className="font-black text-sm text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Write a Review for {business.name}</span>
                    </h5>
                    <span className="text-[11px] text-slate-400 font-medium">Takes less than 1 minute</span>
                  </div>

                  {reviewSuccess ? (
                    <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-xl text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Thank you! Your rating and review have been published to 123yercaud.com.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={reviewName}
                            onChange={(e) => setReviewName(e.target.value)}
                            placeholder="e.g. Ramesh Kumar"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:border-red-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Your Rating (1 to 5 Stars) *
                          </label>
                          <div className="flex items-center gap-1.5 pt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setReviewRating(star)}
                                className="p-1 hover:scale-110 transition-transform cursor-pointer"
                              >
                                <Star
                                  className={`w-6 h-6 ${
                                    star <= reviewRating
                                      ? 'fill-amber-400 text-amber-400'
                                      : 'text-slate-300'
                                  }`}
                                />
                              </button>
                            ))}
                            <span className="ml-2 font-black text-amber-600 text-xs font-mono">
                              {reviewRating}.0 / 5.0
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Your Review &amp; Experience *
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          placeholder="Share your experience regarding service quality, hospitality, amenities, or pricing..."
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:border-red-600"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-2"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Publish Review</span>
                      </button>
                    </form>
                  )}
                </div>

                {/* Existing Customer Reviews List */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider mb-3">
                    Recent Customer Feedback ({business.reviews.length})
                  </h4>

                  {business.reviews.length > 0 ? (
                    <div className="space-y-3">
                      {business.reviews.map((rev) => (
                        <div
                          key={rev.id}
                          className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-slate-800 text-amber-400 font-bold text-xs flex items-center justify-center shadow-2xs">
                                {rev.author.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <span className="font-bold text-xs text-slate-900 block">
                                  {rev.author}
                                </span>
                                <span className="text-[10px] text-slate-400">{rev.date || 'Recent Visit'}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md text-[11px] font-bold">
                              <span>{rev.rating}</span>
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            </div>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed pt-1">
                            "{rev.comment}"
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-slate-400 text-xs">
                      No reviews yet. Be the first to share your experience!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-4 sm:px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <a
              href="tel:+919443916492"
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Call Helpline</span>
            </a>
            <button
              onClick={handleWhatsApp}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 font-bold text-xs text-slate-700 bg-slate-100 border border-slate-300 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
