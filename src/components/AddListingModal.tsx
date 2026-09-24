import React, { useState, useRef } from 'react';
import { 
  X, 
  Building, 
  MapPin, 
  Phone, 
  Globe, 
  Mail, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Clock, 
  Sparkles,
  Mountain,
  UploadCloud,
  Image as ImageIcon,
  FolderPlus,
  Compass,
  AlertCircle,
  AlertTriangle,
  Check,
  Settings2,
  Search,
  Star,
  Camera
} from 'lucide-react';
import { Business, Category } from '../types';

interface AddListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBusiness: (business: Business) => void;
  categories: Category[];
  localities: string[];
  onAddNewCategory?: (category: Category) => void;
  onAddNewSubcategory?: (categoryName: string, subcategoryName: string) => void;
  onAddNewLocality?: (localityName: string) => void;
  onDeleteCategory?: (categoryName: string) => void;
  onDeleteSubcategory?: (categoryName: string, subcategoryName: string) => void;
  onDeleteLocality?: (localityName: string) => void;
}

// Compress and downscale uploaded image to fit within localStorage safely (~150-250KB)
const readFileAsOptimizedDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 1200;
        const maxHeight = 850;
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          if (width / maxWidth > height / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const AddListingModal: React.FC<AddListingModalProps> = ({
  isOpen,
  onClose,
  onAddBusiness,
  categories,
  localities,
  onAddNewCategory,
  onAddNewSubcategory,
  onAddNewLocality,
  onDeleteCategory,
  onDeleteSubcategory,
  onDeleteLocality,
}) => {
  // Form values
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>(categories[0]?.name || 'Resorts & Cottages');
  const [subcategory, setSubcategory] = useState<string>(
    categories[0]?.subcategories[0] || 'General Services'
  );
  const [locality, setLocality] = useState<string>(
    localities.find((l) => l !== 'All Localities') || 'Lake Road & Boathouse'
  );
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('636601');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [mapUrl, setMapUrl] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [description, setDescription] = useState('');
  const [openingHours, setOpeningHours] = useState('10:00 AM to 5:00 PM');
  const [establishedYear, setEstablishedYear] = useState<number>(2020);
  
  // Multiple Images Upload state (max 5 images for listing)
  const MAX_IMAGES = 5;
  const [photos, setPhotos] = useState<Array<{ id: string; url: string; name: string }>>([
    {
      id: 'default-cover',
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      name: 'yercaud-default-cover.jpg',
    },
  ]);
  const [hasCustomPhotos, setHasCustomPhotos] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showUrlFallback, setShowUrlFallback] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dynamic Category Creation state
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');
  const [newCategoryFirstSubcat, setNewCategoryFirstSubcat] = useState('');

  // Dynamic Subcategory Creation state
  const [isCreatingSubcategory, setIsCreatingSubcategory] = useState(false);
  const [newSubcategoryName, setNewSubcategoryName] = useState('');

  // Dynamic Locality Creation & Management state
  const [isCreatingLocality, setIsCreatingLocality] = useState(false);
  const [newLocalityName, setNewLocalityName] = useState('');
  const [isManagingLocalities, setIsManagingLocalities] = useState(false);
  const [localitySearchFilter, setLocalitySearchFilter] = useState('');

  // Deletion confirmation states (for wrongly entered items)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState<string | null>(null);
  const [localityToDelete, setLocalityToDelete] = useState<string | null>(null);

  const [services, setServices] = useState<string[]>(['Valley View Cottages', 'Campfire & Bonfire']);
  const [newService, setNewService] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Active category object
  const currentCatObj = categories.find((c) => c.name.toLowerCase() === category.toLowerCase());

  // Confirm delete category handler
  const handleConfirmDeleteCategory = () => {
    if (!categoryToDelete) return;
    const toDelete = categoryToDelete;
    setCategoryToDelete(null);
    onDeleteCategory?.(toDelete);

    const remaining = categories.filter(
      (c) => c.name.toLowerCase() !== toDelete.toLowerCase()
    );
    if (remaining.length > 0) {
      setCategory(remaining[0].name);
      setSubcategory(remaining[0].subcategories[0] || 'General Services');
    }
  };

  // Confirm delete subcategory handler
  const handleConfirmDeleteSubcategory = () => {
    if (!subcategoryToDelete) return;
    const toDelete = subcategoryToDelete;
    setSubcategoryToDelete(null);
    onDeleteSubcategory?.(category, toDelete);

    if (currentCatObj) {
      const remainingSubs = currentCatObj.subcategories.filter(
        (s) => s.toLowerCase() !== toDelete.toLowerCase()
      );
      setSubcategory(remainingSubs[0] || 'General Services');
    }
  };

  // Confirm delete locality handler
  const handleConfirmDeleteLocality = () => {
    if (!localityToDelete) return;
    const toDelete = localityToDelete;
    setLocalityToDelete(null);
    onDeleteLocality?.(toDelete);

    const remainingLocs = localities.filter(
      (l) => l.toLowerCase() !== toDelete.toLowerCase() && l !== 'All Localities'
    );
    setLocality(remainingLocs[0] || 'Lake Road & Boathouse');
  };

  // Delete a specific locality from the manager list
  const handleDeleteSpecificLocality = (locNameToDelete: string) => {
    onDeleteLocality?.(locNameToDelete);
    if (locality.toLowerCase() === locNameToDelete.toLowerCase()) {
      const remainingLocs = localities.filter(
        (l) => l.toLowerCase() !== locNameToDelete.toLowerCase() && l !== 'All Localities'
      );
      setLocality(remainingLocs[0] || 'Lake Road & Boathouse');
    }
  };

  const handleCategoryChange = (newCat: string) => {
    if (newCat === '__CREATE_NEW__') {
      setIsCreatingCategory(true);
      return;
    }
    setCategory(newCat);
    const catData = categories.find((c) => c.name === newCat);
    if (catData && catData.subcategories.length > 0) {
      setSubcategory(catData.subcategories[0]);
    } else {
      setSubcategory('General Services');
    }
  };

  const handleSubcategoryChange = (newSub: string) => {
    if (newSub === '__CREATE_NEW__') {
      setIsCreatingSubcategory(true);
      return;
    }
    setSubcategory(newSub);
  };

  const handleLocalityChange = (newLoc: string) => {
    if (newLoc === '__CREATE_NEW__') {
      setIsCreatingLocality(true);
      return;
    }
    if (newLoc === '__DELETE_CURRENT__') {
      setLocalityToDelete(locality);
      return;
    }
    if (newLoc === '__MANAGE_LOCALITIES__') {
      setIsManagingLocalities(true);
      return;
    }
    setLocality(newLoc);
  };

  // Create new category
  const handleSaveNewCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;

    // Check if category already exists
    const existing = categories.find((c) => c.name.toLowerCase() === trimmed.toLowerCase());
    if (existing) {
      setCategory(existing.name);
      if (existing.subcategories.length > 0) {
        setSubcategory(existing.subcategories[0]);
      }
      setIsCreatingCategory(false);
      return;
    }

    const firstSubcat = newCategoryFirstSubcat.trim() || 'General Services';
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name: trimmed,
      iconName: 'Building',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description: newCategoryDesc.trim() || `Verified ${trimmed} businesses and services in Yercaud`,
      count: 1,
      subcategories: [firstSubcat, 'Customer Enquiries'],
    };

    onAddNewCategory?.(newCat);
    setCategory(trimmed);
    setSubcategory(firstSubcat);
    setIsCreatingCategory(false);
    setNewCategoryName('');
    setNewCategoryDesc('');
    setNewCategoryFirstSubcat('');
  };

  // Create new subcategory
  const handleSaveNewSubcategory = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newSubcategoryName.trim();
    if (!trimmed) return;

    onAddNewSubcategory?.(category, trimmed);
    setSubcategory(trimmed);
    setIsCreatingSubcategory(false);
    setNewSubcategoryName('');
  };

  // Create new locality
  const handleSaveNewLocality = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newLocalityName.trim();
    if (!trimmed) return;

    onAddNewLocality?.(trimmed);
    setLocality(trimmed);
    setIsCreatingLocality(false);
    setNewLocalityName('');
  };

  // Multiple Images Upload Handler (Max 5 images)
  const handleProcessFiles = async (fileList: FileList | File[]) => {
    setUploadError(null);
    const files = Array.from(fileList);
    if (files.length === 0) return;

    // Filter valid image types
    const validImageFiles = files.filter((f) => f.type.startsWith('image/'));
    if (validImageFiles.length === 0) {
      setUploadError('Please select valid image files (JPG, PNG, WEBP, etc.)');
      return;
    }

    const currentCount = hasCustomPhotos ? photos.length : 0;
    const availableSlots = MAX_IMAGES - currentCount;

    if (availableSlots <= 0) {
      setUploadError(`Maximum ${MAX_IMAGES} images limit reached. Remove an existing image to upload new ones.`);
      return;
    }

    const filesToProcess = validImageFiles.slice(0, availableSlots);
    if (validImageFiles.length > availableSlots) {
      setUploadError(`You can upload a maximum of ${MAX_IMAGES} images. First ${availableSlots} image(s) processed.`);
    }

    try {
      const newItems: Array<{ id: string; url: string; name: string }> = [];
      for (let i = 0; i < filesToProcess.length; i++) {
        const file = filesToProcess[i];
        if (file.size > 15 * 1024 * 1024) {
          setUploadError(`"${file.name}" is too large (max 15MB). Skipping this file.`);
          continue;
        }
        const dataUrl = await readFileAsOptimizedDataUrl(file);
        newItems.push({
          id: `photo-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
          url: dataUrl,
          name: file.name,
        });
      }

      if (newItems.length > 0) {
        if (!hasCustomPhotos) {
          setPhotos(newItems);
          setHasCustomPhotos(true);
        } else {
          setPhotos((prev) => [...prev, ...newItems].slice(0, MAX_IMAGES));
        }
      }
    } catch (err) {
      console.error(err);
      setUploadError('Failed to process uploaded photos. Please try again.');
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleProcessFiles(e.target.files);
    }
    if (e.target) e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFiles(e.dataTransfer.files);
    }
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => {
      const remaining = prev.filter((p) => p.id !== id);
      if (remaining.length === 0) {
        setHasCustomPhotos(false);
        return [
          {
            id: 'default-cover',
            url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
            name: 'yercaud-default-cover.jpg',
          },
        ];
      }
      return remaining;
    });
  };

  const handleSetPrimary = (index: number) => {
    if (index === 0) return;
    setPhotos((prev) => {
      const copy = [...prev];
      const [chosen] = copy.splice(index, 1);
      copy.unshift(chosen);
      return copy;
    });
  };

  const handleAddUrlPhoto = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    const currentCount = hasCustomPhotos ? photos.length : 0;
    if (currentCount >= MAX_IMAGES) {
      setUploadError(`Maximum ${MAX_IMAGES} images limit reached.`);
      return;
    }
    const newPhoto = {
      id: `url-photo-${Date.now()}`,
      url: trimmed,
      name: 'web-image-url',
    };
    if (!hasCustomPhotos) {
      setPhotos([newPhoto]);
      setHasCustomPhotos(true);
    } else {
      setPhotos((prev) => [...prev, newPhoto].slice(0, MAX_IMAGES));
    }
    setUrlInput('');
    setShowUrlFallback(false);
  };

  const handleAddService = () => {
    if (newService.trim()) {
      setServices([...services, newService.trim()]);
      setNewService('');
    }
  };

  const handleRemoveService = (index: number) => {
    setServices(services.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) return;

    const primaryImg = photos[0]?.url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
    const allGalleryUrls = photos.map((p) => p.url);

    const newBusiness: Business = {
      id: `biz-${Date.now()}`,
      name: name.trim(),
      category,
      subcategory,
      rating: 5.0,
      reviewCount: 1,
      address: address.trim(),
      locality,
      pincode: pincode.trim(),
      phone: phone.trim(),
      whatsapp: whatsapp.trim() || phone.replace(/[^0-9]/g, ''),
      email: email.trim() || undefined,
      website: website.trim() || undefined,
      mapUrl: mapUrl.trim() || undefined,
      openingHours: openingHours.trim(),
      isVerified: true,
      isFeatured: true,
      establishedYear: Number(establishedYear) || undefined,
      contactPerson: contactPerson.trim() || undefined,
      description: description.trim() || `${name} is a verified business offering ${category} services in ${locality}, Yercaud.`,
      services: services.length > 0 ? services : ['Local Quality Service', 'Customer Support'],
      imageUrl: primaryImg,
      gallery: allGalleryUrls,
      reviews: [
        {
          id: `rev-${Date.now()}`,
          author: '123yercaud Verification Team',
          rating: 5,
          date: 'Just now',
          comment: 'New verified business listing registered on 123yercaud.com directory.',
          verifiedUser: true,
        },
      ],
    };

    onAddBusiness(newBusiness);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-xl sm:rounded-2xl max-w-3xl w-full max-h-[96vh] sm:max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 my-auto"
        id="add-listing-modal-container"
      >
        {/* Header */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 bg-emerald-950 text-white flex items-start sm:items-center justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <div className="text-[10px] sm:text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
              <Mountain className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Free Business Listing Portal
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-black leading-snug truncate sm:whitespace-normal">
              List Your Business on 123yercaud.com
            </h3>
            <p className="text-[11px] sm:text-xs text-emerald-200 mt-0.5 line-clamp-2 sm:line-clamp-none">
              Add your resort, shop, cab service, or professional practice to Yercaud's primary directory
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all shrink-0 cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <div className="p-3.5 sm:p-5 md:p-6 overflow-y-auto min-h-0 overscroll-contain">
          {submitted ? (
            <div className="text-center py-10 sm:py-12 space-y-3">
              <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="text-lg sm:text-xl font-bold text-slate-900">
                Congratulations! Listing Published
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto px-2">
                Your business <strong>"{name}"</strong> has been successfully added to 123yercaud.com under <strong>{category}</strong> ({locality}) and is now searchable by tourists and locals.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm">
              {/* Business Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Business / Resort / Firm Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Shevaroy Valley Mist Cottages & Hill Cafe"
                  className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-800 text-xs sm:text-sm font-medium"
                />
              </div>

              {/* Category & Subcategory Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 bg-slate-50/90 p-3 sm:p-4 rounded-xl border border-slate-200">
                {/* 1. Category Selector & Creation */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Primary Category *
                    </label>
                    {!isCreatingCategory ? (
                      <button
                        type="button"
                        onClick={() => setIsCreatingCategory(true)}
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <Plus className="w-3 h-3 text-emerald-600" />
                        <span>+ New Category</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsCreatingCategory(false)}
                        className="text-[11px] font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  {isCreatingCategory ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg space-y-2 animate-in fade-in">
                      <div className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
                        <FolderPlus className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Create New Business Category</span>
                      </div>
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="New category name (e.g. Spas & Wellness)..."
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-emerald-300 rounded-md text-slate-900 font-medium focus:outline-none focus:border-emerald-700"
                        autoFocus
                      />
                      <input
                        type="text"
                        value={newCategoryFirstSubcat}
                        onChange={(e) => setNewCategoryFirstSubcat(e.target.value)}
                        placeholder="First subcategory (e.g. Ayurvedic Massage)..."
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-emerald-300 rounded-md text-slate-900 focus:outline-none focus:border-emerald-700"
                      />
                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setIsCreatingCategory(false)}
                          className="px-2 py-1 text-[11px] font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveNewCategory}
                          className="px-3 py-1 text-[11px] font-bold bg-emerald-700 text-white rounded-md hover:bg-emerald-800 shadow-xs cursor-pointer"
                        >
                          Save & Select
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        <select
                          value={category}
                          onChange={(e) => handleCategoryChange(e.target.value)}
                          className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-medium focus:outline-none focus:border-emerald-800"
                        >
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                              {cat.name}
                            </option>
                          ))}
                          <option value="__CREATE_NEW__" className="text-emerald-700 font-bold bg-emerald-50">
                            + Create New Category...
                          </option>
                        </select>
                        {onDeleteCategory && categories.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setCategoryToDelete(category)}
                            title={`Delete category "${category}" if entered wrongly`}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-300 rounded-lg transition-colors shrink-0 cursor-pointer"
                            aria-label="Delete Category"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Inline Category Deletion Confirmation */}
                      {categoryToDelete && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-2 animate-in fade-in">
                          <div className="flex items-start gap-2 text-red-900 text-xs">
                            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-red-900">
                                Delete Category "{categoryToDelete}"?
                              </p>
                              <p className="text-[11px] text-red-700 mt-0.5">
                                If entered wrongly or by mistake, clicking Delete will remove it completely from the directory.
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setCategoryToDelete(null)}
                              className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-md cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleConfirmDeleteCategory}
                              className="px-3 py-1 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-md shadow-xs cursor-pointer flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Yes, Delete</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 2. Subcategory Selector & Creation */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Subcategory
                    </label>
                    {!isCreatingSubcategory ? (
                      <button
                        type="button"
                        onClick={() => setIsCreatingSubcategory(true)}
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <Plus className="w-3 h-3 text-emerald-600" />
                        <span>+ New Subcategory</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsCreatingSubcategory(false)}
                        className="text-[11px] font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  {isCreatingSubcategory ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg space-y-2 animate-in fade-in">
                      <div className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
                        <Plus className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Add Subcategory to "{category}"</span>
                      </div>
                      <input
                        type="text"
                        value={newSubcategoryName}
                        onChange={(e) => setNewSubcategoryName(e.target.value)}
                        placeholder="Subcategory name (e.g. Hill View Cottages)..."
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-emerald-300 rounded-md text-slate-900 font-medium focus:outline-none focus:border-emerald-700"
                        autoFocus
                      />
                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setIsCreatingSubcategory(false)}
                          className="px-2 py-1 text-[11px] font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveNewSubcategory}
                          className="px-3 py-1 text-[11px] font-bold bg-emerald-700 text-white rounded-md hover:bg-emerald-800 shadow-xs cursor-pointer"
                        >
                          Add & Select
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        <select
                          value={subcategory}
                          onChange={(e) => handleSubcategoryChange(e.target.value)}
                          className="min-w-0 flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-medium focus:outline-none focus:border-emerald-800 text-xs sm:text-sm"
                        >
                          {currentCatObj?.subcategories.map((sub) => (
                            <option key={sub} value={sub}>
                              {sub}
                            </option>
                          ))}
                          <option value="__CREATE_NEW__" className="text-emerald-700 font-bold bg-emerald-50">
                            + Add New Subcategory...
                          </option>
                        </select>
                        {onDeleteSubcategory && currentCatObj && currentCatObj.subcategories.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setSubcategoryToDelete(subcategory)}
                            title={`Delete subcategory "${subcategory}" if entered wrongly`}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-300 rounded-lg transition-colors shrink-0 cursor-pointer"
                            aria-label="Delete Subcategory"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Inline Subcategory Deletion Confirmation */}
                      {subcategoryToDelete && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-2 animate-in fade-in">
                          <div className="flex items-start gap-2 text-red-900 text-xs">
                            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-red-900">
                                Delete Subcategory "{subcategoryToDelete}"?
                              </p>
                              <p className="text-[11px] text-red-700 mt-0.5">
                                This will remove this subcategory from "{category}".
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setSubcategoryToDelete(null)}
                              className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-md cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleConfirmDeleteSubcategory}
                              className="px-3 py-1 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-md shadow-xs cursor-pointer flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Yercaud Locality & Street Address */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 bg-slate-50/90 p-3 sm:p-4 rounded-xl border border-slate-200">
                <div className="lg:col-span-1">
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      Yercaud Locality *
                    </label>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {!isCreatingLocality ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setIsCreatingLocality(true)}
                            className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5 hover:underline cursor-pointer"
                          >
                            <Plus className="w-3 h-3 text-emerald-600" />
                            <span>+ New</span>
                          </button>
                          {onDeleteLocality && (
                            <button
                              type="button"
                              onClick={() => setLocalityToDelete(locality)}
                              className="text-[11px] font-bold text-red-600 hover:text-red-800 flex items-center gap-0.5 hover:underline cursor-pointer"
                              title={`Delete locality "${locality}" if entered wrongly`}
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setIsManagingLocalities(true)}
                            className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-0.5 hover:underline cursor-pointer"
                            title="Manage and delete any locality"
                          >
                            <Settings2 className="w-3 h-3 text-slate-500" />
                            <span>Manage</span>
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsCreatingLocality(false)}
                          className="text-[11px] font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>

                  {isCreatingLocality ? (
                    <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-lg space-y-1.5 animate-in fade-in">
                      <input
                        type="text"
                        value={newLocalityName}
                        onChange={(e) => setNewLocalityName(e.target.value)}
                        placeholder="e.g. Tipperary Road..."
                        className="w-full px-2 py-1.5 text-xs bg-white border border-emerald-300 rounded-md text-slate-900 font-medium focus:outline-none focus:border-emerald-700"
                        autoFocus
                      />
                      <div className="flex justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setIsCreatingLocality(false)}
                          className="px-2 py-1 text-[10px] font-semibold text-slate-600 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveNewLocality}
                          className="px-2.5 py-1 text-[10px] font-bold bg-emerald-700 text-white rounded hover:bg-emerald-800 cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <select
                          value={locality}
                          onChange={(e) => handleLocalityChange(e.target.value)}
                          className="min-w-0 flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-medium focus:outline-none focus:border-emerald-800 text-xs sm:text-sm"
                        >
                          {localities
                            .filter((l) => l !== 'All Localities')
                            .map((loc) => (
                              <option key={loc} value={loc}>
                                {loc}
                              </option>
                            ))}
                          <option value="__CREATE_NEW__" className="text-emerald-700 font-bold bg-emerald-50">
                            + Add New Locality...
                          </option>
                          <option value="__DELETE_CURRENT__" className="text-red-600 font-bold bg-red-50">
                            🗑️ Delete "{locality}" (If entered wrongly)...
                          </option>
                          <option value="__MANAGE_LOCALITIES__" className="text-slate-700 font-bold bg-slate-100">
                            ⚙️ Manage &amp; Delete All Localities...
                          </option>
                        </select>
                        {onDeleteLocality && (
                          <button
                            type="button"
                            onClick={() => setLocalityToDelete(locality)}
                            title={`Delete locality "${locality}" if entered wrongly`}
                            className="px-2.5 py-2 text-xs font-bold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 border border-red-200 hover:border-red-600 rounded-lg transition-all shrink-0 cursor-pointer flex items-center gap-1"
                            aria-label="Delete Locality"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="text-[11px] hidden sm:inline">Delete</span>
                          </button>
                        )}
                      </div>

                      {/* Inline Locality Deletion Confirmation */}
                      {localityToDelete && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-2 animate-in fade-in">
                          <div className="flex items-start gap-2 text-red-900 text-xs font-bold">
                            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                            <div>
                              <span>Delete locality "{localityToDelete}"?</span>
                              <p className="text-[11px] font-normal text-red-700 mt-0.5 leading-snug">
                                If this locality was entered wrongly or is no longer needed, clicking Delete will remove it from 123yercaud.com.
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap justify-end gap-1.5 pt-1">
                            <button
                              type="button"
                              onClick={() => setLocalityToDelete(null)}
                              className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-white border border-slate-300 rounded cursor-pointer hover:bg-slate-50"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleConfirmDeleteLocality}
                              className="px-3 py-1 text-[11px] font-bold text-white bg-red-600 hover:bg-red-700 rounded cursor-pointer flex items-center gap-1 shadow-xs"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Yes, Delete Locality</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Street Address / Landmark *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Near Lady's Seat Road, Next to Viewpoint Entrance"
                    className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-800 text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>

              {/* 4. MULTIPLE IMAGES UPLOAD (UP TO 5 PHOTOS) */}
              <div className="space-y-3 bg-emerald-50/40 p-3 sm:p-4 rounded-xl border border-emerald-200">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>Business / Service Photos (Upload Max 5 Images) *</span>
                    </label>
                    <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {hasCustomPhotos ? photos.length : 0} / {MAX_IMAGES} Photos
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {hasCustomPhotos && (
                      <button
                        type="button"
                        onClick={() => {
                          setPhotos([
                            {
                              id: 'default-cover',
                              url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
                              name: 'yercaud-default-cover.jpg',
                            },
                          ]);
                          setHasCustomPhotos(false);
                          setUploadError(null);
                        }}
                        className="text-[11px] text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                      >
                        Reset to Default
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowUrlFallback(!showUrlFallback)}
                      className="text-[11px] text-emerald-700 hover:text-emerald-900 underline font-medium cursor-pointer"
                    >
                      {showUrlFallback ? 'Hide URL Input' : '+ Add photo by URL'}
                    </button>
                  </div>
                </div>

                {/* Hidden File Input supporting multiple files */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  multiple
                  onChange={handleFileInputChange}
                  className="hidden"
                  id="business-photo-file-input"
                />

                {/* Primary Cover Banner Preview */}
                <div className="relative rounded-xl border border-slate-200 overflow-hidden bg-slate-900 shadow-xs group">
                  <img
                    src={photos[0]?.url}
                    alt="Cover Preview"
                    className="w-full h-36 sm:h-48 md:h-52 object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex flex-col justify-between p-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-amber-500 text-slate-950 shadow-xs">
                        <Star className="w-3 h-3 fill-slate-950" />
                        Main Banner Cover Photo (Photo #1)
                      </span>
                      {hasCustomPhotos ? (
                        <span className="text-[10px] text-white/90 bg-emerald-700/80 backdrop-blur-xs px-2 py-0.5 rounded font-medium">
                          {photos.length} uploaded photo{photos.length > 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="text-[10px] text-white/80 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded">
                          Sample Yercaud Cover
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-[11px] text-slate-200">
                        {hasCustomPhotos
                          ? 'This first photo is your listing hero banner. Other photos will appear in your business photo slider.'
                          : 'Upload up to 5 photos of your business, property, rooms, menu, or services.'}
                      </p>
                      {photos.length < MAX_IMAGES && (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow flex items-center gap-1.5 cursor-pointer transition-all"
                        >
                          <UploadCloud className="w-4 h-4 text-emerald-100" />
                          <span>+ Browse / Add Images ({photos.length}/{MAX_IMAGES})</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Uploaded Photos Thumbnails & Add Card Grid (up to 5 images) */}
                <div>
                  <div className="text-[11px] font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                    <span>Listing Gallery Images ({hasCustomPhotos ? photos.length : 0} of {MAX_IMAGES}):</span>
                    <span className="text-[10px] text-slate-500 font-normal">
                      Click "Set Cover" on any photo to make it the main banner
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                    {photos.map((item, idx) => (
                      <div
                        key={item.id}
                        className={`relative rounded-xl overflow-hidden border-2 aspect-4/3 bg-slate-900 group shadow-2xs ${
                          idx === 0
                            ? 'border-amber-400 ring-2 ring-amber-400/30'
                            : 'border-slate-200 hover:border-emerald-500'
                        }`}
                      >
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-1.5">
                          <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded w-fit ${
                            idx === 0
                              ? 'bg-amber-400 text-slate-950 font-black'
                              : 'bg-black/60 text-white'
                          }`}>
                            {idx === 0 ? '★ Cover' : `#${idx + 1}`}
                          </span>

                          <div className="flex items-center justify-end gap-1">
                            {idx !== 0 && (
                              <button
                                type="button"
                                onClick={() => handleSetPrimary(idx)}
                                title="Set as primary cover image"
                                className="px-1.5 py-0.5 text-[9px] font-bold bg-white/90 hover:bg-white text-slate-900 rounded cursor-pointer transition-all"
                              >
                                Set Cover
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(item.id)}
                              title="Delete this photo"
                              className="p-1 text-white bg-red-600 hover:bg-red-700 rounded cursor-pointer transition-all"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add More Photos Slot (if under 5 images) */}
                    {photos.length < MAX_IMAGES && (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl aspect-4/3 flex flex-col items-center justify-center p-2 text-center cursor-pointer transition-all ${
                          isDragging
                            ? 'border-emerald-600 bg-emerald-100/70 scale-[0.98]'
                            : 'border-emerald-300 hover:border-emerald-500 bg-white hover:bg-emerald-50/50'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1">
                          <UploadCloud className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-bold text-emerald-950">
                          + Add Photo
                        </span>
                        <span className="text-[9px] text-slate-500">
                          ({photos.length}/{MAX_IMAGES})
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Error message */}
                {uploadError && (
                  <div className="flex items-center gap-1.5 text-red-600 text-xs font-semibold bg-red-50 p-2 rounded-lg border border-red-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {/* Optional direct URL input */}
                {showUrlFallback && (
                  <div className="pt-2 p-3 bg-white border border-emerald-300 rounded-lg space-y-2">
                    <label className="text-[11px] font-bold text-slate-700 block">
                      Add Image via Direct URL (https://...):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-700"
                      />
                      <button
                        type="button"
                        onClick={handleAddUrlPhoto}
                        className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg cursor-pointer"
                      >
                        Add Photo
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="04281 XXXXXX or 94439 XXXXX"
                    className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-800 text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp Number (for customer queries)
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="9194439XXXXX"
                    className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-800 text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>

              {/* Email & Website */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@myyercaudbusiness.com"
                    className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-800 text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Website URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://myyercaudbusiness.com"
                    className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-800 text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>

              {/* Google Maps Direction URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Google Maps Location URL (e.g. https://maps.app.goo.gl/obEgkHD1Zs74RRfU8)
                </label>
                <input
                  type="url"
                  value={mapUrl}
                  onChange={(e) => setMapUrl(e.target.value)}
                  placeholder="https://maps.app.goo.gl/obEgkHD1Zs74RRfU8"
                  className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-800 text-xs sm:text-sm font-medium"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Business Description / Overview
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your services, accommodations, specialty products, or amenities..."
                  className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-800 text-xs sm:text-sm font-medium"
                />
              </div>

              {/* Services & Highlights list */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Services / Key Amenities
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    placeholder="e.g. Free Bonfire, 24-hr Hot Water, Ghat Cab Pickup"
                    className="flex-1 px-3 py-1.5 sm:py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm"
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
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-800 text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-slate-900 shrink-0"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {services.map((srv, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center text-xs bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-medium break-words max-w-full"
                    >
                      <span>{srv}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveService(idx)}
                        className="ml-1.5 text-emerald-700 hover:text-emerald-950 cursor-pointer p-0.5"
                        aria-label={`Remove ${srv}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Listing Support Banner */}
              <div className="p-3 sm:p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <span className="font-medium">Need assistance or premium banner promotion?</span>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold text-slate-800">
                  <a href="tel:+919443916492" className="text-emerald-700 hover:text-emerald-900 transition-colors">
                    +91 94439 16492
                  </a>
                  <span className="text-slate-300">|</span>
                  <span className="text-amber-800 font-semibold">
                    Admin Timing : 10.00 AM - 5.00 PM
                  </span>
                  <span className="text-slate-300">|</span>
                  <a href="mailto:123yercaud@gmail.com" className="text-blue-700 hover:text-blue-900 transition-colors">
                    123yercaud@gmail.com
                  </a>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3.5 sm:pt-4 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer text-center justify-center transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold text-white bg-red-600 hover:bg-red-700 active:scale-[0.99] rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Publish Business/Service on 123yercaud</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Dedicated Manage & Delete Localities Dialog */}
      {isManagingLocalities && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-5 shadow-2xl border border-slate-200 space-y-3.5 max-h-[90vh] sm:max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Manage Yercaud Localities
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Delete any locality entered wrongly or misspelled
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsManagingLocalities(false);
                  setLocalitySearchFilter('');
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filter */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={localitySearchFilter}
                onChange={(e) => setLocalitySearchFilter(e.target.value)}
                placeholder="Filter localities by name..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-red-500"
              />
            </div>

            {/* List with Delete Buttons */}
            <div className="flex-1 overflow-y-auto space-y-1 pr-1 max-h-64 divide-y divide-slate-100">
              {localities
                .filter((l) => l !== 'All Localities')
                .filter((l) =>
                  l.toLowerCase().includes(localitySearchFilter.toLowerCase().trim())
                )
                .map((loc) => {
                  const isCurrent = locality.toLowerCase() === loc.toLowerCase();
                  return (
                    <div
                      key={loc}
                      className={`pt-1.5 pb-1 flex items-center justify-between px-2 py-1.5 rounded-lg transition-colors ${
                        isCurrent ? 'bg-emerald-50/70 border border-emerald-200' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <MapPin
                          className={`w-3.5 h-3.5 shrink-0 ${
                            isCurrent ? 'text-emerald-700' : 'text-slate-400'
                          }`}
                        />
                        <span className="text-xs font-semibold text-slate-800 truncate">
                          {loc}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded">
                            Selected
                          </span>
                        )}
                      </div>

                      {onDeleteLocality && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete locality "${loc}"?`)) {
                              handleDeleteSpecificLocality(loc);
                            }
                          }}
                          className="px-2 py-1 text-red-600 hover:text-white hover:bg-red-600 border border-red-200 hover:border-red-600 rounded-md transition-colors cursor-pointer shrink-0 flex items-center gap-1 text-[11px] font-bold"
                          title={`Delete "${loc}"`}
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              {localities.filter((l) => l !== 'All Localities').length === 0 && (
                <p className="text-xs text-slate-400 text-center py-4">No localities found.</p>
              )}
            </div>

            {/* Quick Add */}
            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={newLocalityName}
                onChange={(e) => setNewLocalityName(e.target.value)}
                placeholder="Add new locality..."
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-700 font-medium"
              />
              <button
                type="button"
                onClick={handleSaveNewLocality}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0"
              >
                + Add
              </button>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsManagingLocalities(false);
                  setLocalitySearchFilter('');
                }}
                className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
