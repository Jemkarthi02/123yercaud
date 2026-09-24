import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Save, 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  Image as ImageIcon,
  Plus,
  Trash2,
  Upload,
  Camera,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { Business, Category } from '../types';

interface EditBusinessModalProps {
  business: Business | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedBiz: Business) => void;
  categories: Category[];
  localities: string[];
}

export const EditBusinessModal: React.FC<EditBusinessModalProps> = ({
  business,
  isOpen,
  onClose,
  onSave,
  categories,
  localities,
}) => {
  const [formData, setFormData] = useState<Business | null>(null);
  const [newService, setNewService] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [imagesList, setImagesList] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (business) {
      setFormData({ ...business });
      const currentList = [business.imageUrl, ...(business.gallery || [])].filter(
        (url): url is string => Boolean(url && typeof url === 'string' && url.trim().length > 0)
      );
      const unique = Array.from(new Set(currentList));
      setImagesList(unique.length > 0 ? unique : [business.imageUrl]);
    }
  }, [business]);

  if (!isOpen || !formData) return null;

  const handleInputChange = (field: keyof Business, value: any) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleAddService = () => {
    if (!newService.trim() || !formData) return;
    if (!formData.services.includes(newService.trim())) {
      setFormData({
        ...formData,
        services: [...formData.services, newService.trim()],
      });
    }
    setNewService('');
  };

  const handleRemoveService = (index: number) => {
    if (!formData) return;
    setFormData({
      ...formData,
      services: formData.services.filter((_, i) => i !== index),
    });
  };

  // Gallery multi-image handlers
  const handleAddUrlImage = () => {
    if (!newImageUrl.trim()) return;
    if (imagesList.length >= 5) {
      alert('Maximum 5 photos allowed per listing.');
      return;
    }
    const updated = [...imagesList, newImageUrl.trim()];
    setImagesList(updated);
    setNewImageUrl('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = 5 - imagesList.length;
    if (remainingSlots <= 0) {
      alert('Maximum 5 photos allowed per listing.');
      return;
    }

    const filesToRead = Array.from(files).slice(0, remainingSlots);
    filesToRead.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setImagesList((prev) => (prev.length < 5 ? [...prev, result] : prev));
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSetCoverImage = (index: number) => {
    if (index === 0) return;
    const selected = imagesList[index];
    const filtered = imagesList.filter((_, i) => i !== index);
    setImagesList([selected, ...filtered]);
  };

  const handleRemoveImage = (index: number) => {
    if (imagesList.length <= 1) {
      alert('At least one photo is required for the listing.');
      return;
    }
    const updated = imagesList.filter((_, i) => i !== index);
    setImagesList(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !formData.name.trim()) return;

    const primaryImage = imagesList[0] || formData.imageUrl;
    const galleryImages = imagesList;

    const finalBusiness: Business = {
      ...formData,
      imageUrl: primaryImage,
      gallery: galleryImages,
    };

    onSave(finalBusiness);
    onClose();
  };

  const selectedCategoryObj = categories.find(
    (c) => c.name.toLowerCase() === formData.category.toLowerCase()
  );

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-slate-200 text-slate-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 border border-red-200 flex items-center justify-center font-bold shrink-0">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">Edit Business Listing</h3>
              <p className="text-[11px] text-slate-500">Manage Information &amp; Multi-Photo Gallery &bull; ID: {formData.id}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* Row 1: Business Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Business Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-red-600 font-bold"
            />
          </div>

          {/* Row 2: Category & Subcategory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => {
                  const newCat = e.target.value;
                  const catObj = categories.find((c) => c.name === newCat);
                  setFormData({
                    ...formData,
                    category: newCat,
                    subcategory: catObj?.subcategories[0] || 'General Services',
                  });
                }}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-red-600 font-medium"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Subcategory
              </label>
              <select
                value={formData.subcategory}
                onChange={(e) => handleInputChange('subcategory', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-red-600 font-medium"
              >
                {selectedCategoryObj?.subcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                )) || <option value={formData.subcategory}>{formData.subcategory}</option>}
              </select>
            </div>
          </div>

          {/* Row 3: Locality & Address */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Yercaud Locality *
              </label>
              <select
                value={formData.locality}
                onChange={(e) => handleInputChange('locality', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-red-600 font-medium"
              >
                {localities
                  .filter((l) => l !== 'All Localities')
                  .map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Address / Street / Landmark *
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-red-600"
              />
            </div>
          </div>

          {/* Row 4: Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Primary Phone *
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-red-600 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                WhatsApp Number
              </label>
              <input
                type="text"
                value={formData.whatsapp || ''}
                onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Contact Person
              </label>
              <input
                type="text"
                value={formData.contactPerson || ''}
                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-red-600"
              />
            </div>
          </div>

          {/* Row 5: Email & Website */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Website URL
              </label>
              <input
                type="text"
                value={formData.website || ''}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-red-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Google Maps Location URL (e.g. https://maps.app.goo.gl/obEgkHD1Zs74RRfU8)
            </label>
            <input
              type="text"
              value={formData.mapUrl || ''}
              onChange={(e) => handleInputChange('mapUrl', e.target.value)}
              placeholder="https://maps.app.goo.gl/obEgkHD1Zs74RRfU8"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-red-600"
            />
          </div>

          {/* Row 6: Multi-Image Listing Photos & Gallery (Up to 5 images) */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-red-600" />
                  <span>Listing Photos &amp; Image Gallery ({imagesList.length}/5)</span>
                </label>
                <p className="text-[11px] text-slate-500">
                  First image is the primary cover. Upload up to 5 photos for the slider.
                </p>
              </div>

              {imagesList.length < 5 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                >
                  <Upload className="w-3 h-3 text-red-600" />
                  <span>Upload Files</span>
                </button>
              )}
            </div>

            {/* Hidden multi-file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              multiple
              accept="image/*"
              className="hidden"
            />

            {/* Uploaded Photos Thumbnails Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {imagesList.map((img, idx) => (
                <div
                  key={idx}
                  className={`relative group rounded-lg overflow-hidden border-2 bg-white aspect-4/3 flex flex-col shadow-xs ${
                    idx === 0 ? 'border-amber-500 ring-2 ring-amber-400/30' : 'border-slate-200'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Photo ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Badge */}
                  <span
                    className={`absolute top-1 left-1 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs ${
                      idx === 0
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-black/70 text-white'
                    }`}
                  >
                    {idx === 0 ? 'Cover Photo' : `#${idx + 1}`}
                  </span>

                  {/* Overlay Controls */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-1">
                    {idx !== 0 && (
                      <button
                        type="button"
                        onClick={() => handleSetCoverImage(idx)}
                        className="px-1.5 py-0.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-bold rounded cursor-pointer transition-colors"
                        title="Set as primary cover"
                      >
                        Make Cover
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="px-1.5 py-0.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded cursor-pointer transition-colors flex items-center gap-0.5"
                      title="Delete photo"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}

              {/* Add More Image Dropzone Slot if < 5 */}
              {imagesList.length < 5 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-red-500 rounded-lg aspect-4/3 flex flex-col items-center justify-center p-2 text-slate-500 hover:text-red-600 bg-white/60 hover:bg-red-50/50 transition-colors cursor-pointer"
                >
                  <Plus className="w-5 h-5 mb-0.5" />
                  <span className="text-[10px] font-bold">Add Photo</span>
                  <span className="text-[8px] text-slate-400">({5 - imagesList.length} left)</span>
                </button>
              )}
            </div>

            {/* Optional URL Adder for Remote Images */}
            {imagesList.length < 5 && (
              <div className="flex gap-1.5 pt-1">
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Or paste image URL (https://...)"
                  className="flex-1 px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddUrlImage();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddUrlImage}
                  disabled={!newImageUrl.trim()}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Add URL
                </button>
              </div>
            )}
          </div>

          {/* Row 7: Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Description / About
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-red-600 text-xs"
            />
          </div>

          {/* Row 8: Tags / Services */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Amenities / Key Services
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                placeholder="e.g. Bonfire, Valley View, Free Breakfast"
                className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddService();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddService}
                className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {formData.services.map((srv, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center text-xs bg-slate-100 text-slate-800 border border-slate-200 px-2 py-0.5 rounded-md font-medium"
                >
                  {srv}
                  <button
                    type="button"
                    onClick={() => handleRemoveService(idx)}
                    className="ml-1 text-slate-500 hover:text-red-600 cursor-pointer"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Row 9: Verification, Featured & Rating Status Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between sm:justify-start gap-3">
              <div>
                <span className="block text-xs font-bold text-slate-800">Verified Badge</span>
                <span className="text-[11px] text-slate-500">Show green badge</span>
              </div>
              <input
                type="checkbox"
                checked={formData.isVerified}
                onChange={(e) => handleInputChange('isVerified', e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-3">
              <div>
                <span className="block text-xs font-bold text-slate-800">Featured Listing</span>
                <span className="text-[11px] text-slate-500">Show gold star badge</span>
              </div>
              <input
                type="checkbox"
                checked={formData.isFeatured || false}
                onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-700 shrink-0">Rating:</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => handleInputChange('rating', parseFloat(e.target.value) || 4.5)}
                className="w-20 px-2 py-1 bg-white border border-slate-300 rounded text-xs font-bold text-slate-800"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 bg-slate-100 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

