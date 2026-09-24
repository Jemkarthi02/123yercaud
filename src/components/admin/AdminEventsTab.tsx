import React, { useState, useRef } from 'react';
import { 
  Calendar, 
  Plus, 
  Trash2, 
  Edit3, 
  MapPin, 
  Clock, 
  Search, 
  Sparkles, 
  Ticket, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertTriangle,
  ExternalLink,
  X,
  Upload,
  Image as ImageIcon,
  Camera,
  RefreshCw,
  FolderUp
} from 'lucide-react';
import { CityEvent } from '../../types';

interface AdminEventsTabProps {
  events: CityEvent[];
  onAddEvent: (event: CityEvent) => void;
  onUpdateEvent: (event: CityEvent) => void;
  onDeleteEvent: (id: string) => void;
  showToast: (msg: string) => void;
}

export const AdminEventsTab: React.FC<AdminEventsTabProps> = ({
  events,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  showToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CityEvent | null>(null);
  const [eventToDelete, setEventToDelete] = useState<CityEvent | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formDay, setFormDay] = useState('');
  const [formMonth, setFormMonth] = useState('APR');
  const [formTime, setFormTime] = useState('10:00 AM');
  const [formLocation, setFormLocation] = useState('');
  const [formCategory, setFormCategory] = useState('Festival & Flower Show');
  const [formDescription, setFormDescription] = useState('');
  const [formFullDetails, setFormFullDetails] = useState('');
  const [formOrganizer, setFormOrganizer] = useState('');
  const [formOrganizerPhone, setFormOrganizerPhone] = useState('+91 94439 16492');
  const [formOrganizerEmail, setFormOrganizerEmail] = useState('');
  const [formEntryFee, setFormEntryFee] = useState('Free Entry');
  const [formImageUrl, setFormImageUrl] = useState('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80');
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const presetImages = [
    { label: 'Flower Festival', url: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Sports & Run', url: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Civic & Election', url: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Coffee & Agro', url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Temple & Spiritual', url: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Live Concert & Stage', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80' },
  ];

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image file size should be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setFormImageUrl(result);
        showToast('Event banner uploaded successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const resetForm = () => {
    setFormTitle('');
    setFormDate('');
    setFormDay('25');
    setFormMonth('MAY');
    setFormTime('10:00 AM');
    setFormLocation('Anna Park & Botanical Garden, Yercaud');
    setFormCategory('Festival & Flower Show');
    setFormDescription('');
    setFormFullDetails('');
    setFormOrganizer('Yercaud Tourism & Event Board');
    setFormOrganizerPhone('+91 94439 16492');
    setFormOrganizerEmail('');
    setFormEntryFee('Free Entry');
    setFormImageUrl('https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1000&q=80');
    setEditingEvent(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const openEditModal = (event: CityEvent) => {
    setEditingEvent(event);
    setFormTitle(event.title);
    setFormDate(event.date);
    setFormDay(event.day || '20');
    setFormMonth(event.month || 'MAY');
    setFormTime(event.time);
    setFormLocation(event.location);
    setFormCategory(event.category);
    setFormDescription(event.description);
    setFormFullDetails(event.fullDetails || '');
    setFormOrganizer(event.organizer);
    setFormOrganizerPhone(event.organizerPhone || '');
    setFormOrganizerEmail(event.organizerEmail || '');
    setFormEntryFee(event.entryFee || 'Free Entry');
    setFormImageUrl(event.imageUrl);
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formLocation.trim()) {
      showToast('Please enter event title and venue location.');
      return;
    }

    const eventPayload: CityEvent = {
      id: editingEvent ? editingEvent.id : `event-${Date.now()}`,
      title: formTitle.trim(),
      date: formDate.trim() || `${formDay} ${formMonth} 2026`,
      day: formDay.trim() || '20',
      month: formMonth.trim().toUpperCase() || 'MAY',
      time: formTime.trim() || '10:00 AM',
      location: formLocation.trim(),
      category: formCategory.trim(),
      description: formDescription.trim(),
      fullDetails: formFullDetails.trim() || formDescription.trim(),
      organizer: formOrganizer.trim() || '123 Yercaud Events',
      organizerPhone: formOrganizerPhone.trim(),
      organizerEmail: formOrganizerEmail.trim(),
      entryFee: formEntryFee.trim() || 'Free Entry',
      imageUrl: formImageUrl.trim() || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
      status: 'upcoming',
      isFeatured: true,
    };

    if (editingEvent) {
      onUpdateEvent(eventPayload);
      showToast(`Updated event "${eventPayload.title}"!`);
    } else {
      onAddEvent(eventPayload);
      showToast(`Posted new event "${eventPayload.title}" successfully!`);
    }

    setIsAddModalOpen(false);
    resetForm();
  };

  const filteredEvents = events.filter((ev) => {
    const q = searchQuery.toLowerCase();
    return (
      ev.title.toLowerCase().includes(q) ||
      ev.location.toLowerCase().includes(q) ||
      ev.category.toLowerCase().includes(q) ||
      ev.organizer.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner & Control Bar */}
      <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Yercaud Events &amp; Notices Manager
            </h2>
            <span className="text-xs bg-red-50 text-red-700 border border-red-200 font-bold px-2 py-0.5 rounded-full">
              {events.length} Live Events
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Post upcoming festivals, sports matches, elections, flower shows, and public notices shown on the Live Events page.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={openAddModal}
            className="w-full sm:w-auto px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Post New Event</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events by title, venue, organizer..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-red-600 shadow-2xs font-medium"
          />
        </div>
      </div>

      {/* Events Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all"
          >
            {/* Image & Date Badge */}
            <div className="relative h-40 w-full bg-slate-100">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              <div className="absolute top-2.5 left-2.5 bg-red-600 text-white text-center px-2 py-0.5 rounded-lg shadow-md min-w-[46px] flex items-center justify-center gap-1 text-xs font-black">
                <span>{event.day || '20'}</span>
                <span>{event.month || 'MAY'}</span>
              </div>

              <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                {event.category}
              </div>
            </div>

            {/* Event Info */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{event.time}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mt-2 line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {event.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="text-[11px] text-emerald-700 font-bold truncate">
                  {event.entryFee || 'Free Entry'}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(event)}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer border border-slate-200"
                    title="Edit Event"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setEventToDelete(event)}
                    className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors cursor-pointer border border-rose-200"
                    title="Delete Event"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {eventToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-slate-900">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Delete Event Notice?</h3>
                <p className="text-xs text-slate-500">This event will be removed from the live website.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600">
              Are you sure you want to delete <strong className="text-slate-900">"{eventToDelete.title}"</strong>?
            </p>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setEventToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 bg-slate-100 border border-slate-200 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteEvent(eventToDelete.id);
                  setEventToDelete(null);
                  showToast('Event removed successfully.');
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <Trash2 className="w-4 h-4" />
                <span>Yes, Delete Event</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Event Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl space-y-5 text-slate-900 my-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-red-50 text-red-600 border border-red-200 rounded-xl">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editingEvent ? 'Edit Event Notice' : 'Post New Event Notice'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Publish an upcoming event or announcement for Yercaud visitors and residents
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Event Title */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Event Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Yercaud Flower Show & Summer Festival 2026"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600 text-sm font-medium"
                />
              </div>

              {/* Date, Day, Month, Timing */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Day (e.g. 23)</label>
                  <input
                    type="text"
                    required
                    value={formDay}
                    onChange={(e) => setFormDay(e.target.value)}
                    placeholder="23"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600 text-center font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Month (e.g. APR)</label>
                  <input
                    type="text"
                    required
                    value={formMonth}
                    onChange={(e) => setFormMonth(e.target.value.toUpperCase())}
                    placeholder="APR"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600 text-center font-bold uppercase"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Event Timing</label>
                  <input
                    type="text"
                    required
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    placeholder="10:00 AM"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Entry Fee</label>
                  <input
                    type="text"
                    value={formEntryFee}
                    onChange={(e) => setFormEntryFee(e.target.value)}
                    placeholder="Free Entry / ₹50"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600"
                  />
                </div>
              </div>

              {/* Venue Location & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Venue / Location <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="e.g. Anna Park & Botanical Garden, Yercaud"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600 font-medium"
                  >
                    <option value="Festival & Flower Show">Festival & Flower Show</option>
                    <option value="Sports & Live Screen">Sports & Live Screen</option>
                    <option value="Community & Civic">Community & Civic</option>
                    <option value="Agriculture & Coffee">Agriculture & Coffee</option>
                    <option value="Sports & Adventure">Sports & Adventure</option>
                    <option value="Spiritual & Cultural">Spiritual & Cultural</option>
                    <option value="Music & Entertainment">Music & Entertainment</option>
                    <option value="Public Notice">Public Notice</option>
                  </select>
                </div>
              </div>

              {/* Banner Image Upload & Live Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-slate-700 font-bold">
                    Event Banner Photo <span className="text-red-600">*</span>
                  </label>
                  <span className="text-[11px] text-slate-500">
                    JPG, PNG, WebP (Max 5MB)
                  </span>
                </div>

                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  accept="image/*"
                  className="hidden"
                />

                {/* Drag and Drop Zone or Image Preview */}
                {formImageUrl ? (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group shadow-xs">
                    <div className="h-44 w-full relative">
                      <img
                        src={formImageUrl}
                        alt="Event Banner Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />

                      {/* Live Badge Preview */}
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
                        <span>{formDay || '20'}</span>
                        <span>{formMonth || 'MAY'}</span>
                      </div>

                      <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/10">
                        {formCategory}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-white text-xs font-semibold drop-shadow-md truncate max-w-[65%]">
                          {formTitle || 'Event Preview Title'}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-lg shadow-md transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5 text-red-600" />
                            <span>Change Photo</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-red-600 bg-red-50/50 scale-[0.99]'
                        : 'border-slate-300 hover:border-red-500 bg-slate-50 hover:bg-red-50/20'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-2 shadow-2xs">
                      <FolderUp className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                      Click to upload event photo
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5">
                      or drag & drop your image file here
                    </span>
                  </div>
                )}

                {/* Upload Button + Preset Quick Pickers */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-red-600" />
                    <span>Upload Image File</span>
                  </button>

                  <div className="flex flex-wrap items-center gap-1">
                    <span className="text-[11px] text-slate-500 font-medium mr-1">Presets:</span>
                    {presetImages.map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => setFormImageUrl(p.url)}
                        className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[10px] rounded-lg font-medium text-slate-700 cursor-pointer"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Short Summary Description */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Summary Description <span className="text-red-600">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Brief summary that appears on the card preview..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600"
                />
              </div>

              {/* Full Event Details & Agenda */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Full Details &amp; Highlights (shown in popup)
                </label>
                <textarea
                  rows={3}
                  value={formFullDetails}
                  onChange={(e) => setFormFullDetails(e.target.value)}
                  placeholder="Detailed schedule, parking arrangements, entry criteria, key attractions..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600"
                />
              </div>

              {/* Organizer Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Organizer Name</label>
                  <input
                    type="text"
                    value={formOrganizer}
                    onChange={(e) => setFormOrganizer(e.target.value)}
                    placeholder="e.g. Tamil Nadu Tourism Dept"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Organizer Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={formOrganizerPhone}
                    onChange={(e) => setFormOrganizerPhone(e.target.value)}
                    placeholder="+91 94439 16492"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-semibold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingEvent ? 'Save Changes' : 'Publish Event'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
