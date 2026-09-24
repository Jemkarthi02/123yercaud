import React, { useState, useEffect } from 'react';
import { Business, Review, Category, BusinessInquiry, CityEvent } from './types';
import { PORTAL_CATEGORIES, PORTAL_BUSINESSES, getBusinessesWithFallback } from './data/portalData';
import { INITIAL_BUSINESSES, YERCAUD_LOCALITIES } from './data/yercaudData';
import { INITIAL_INQUIRIES } from './data/inquiriesData';
import { INITIAL_EVENTS } from './data/eventsData';
import { PortalHeader } from './components/PortalHeader';
import { CategoriesGridView } from './components/CategoriesGridView';
import { CategoryDetailsView } from './components/CategoryDetailsView';
import { BusinessDetailModal } from './components/BusinessDetailModal';
import { EmailSmsModal } from './components/EmailSmsModal';
import { DirectionModal } from './components/DirectionModal';
import { BloodDonorsModal } from './components/BloodDonorsModal';
import { EventsModal } from './components/EventsModal';
import { EventsPageView } from './components/EventsPageView';
import { ContactAdminModal } from './components/ContactAdminModal';
import { EmergencyDirectoryModal } from './components/EmergencyDirectoryModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminLoginPage } from './components/AdminLoginPage';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';
import { api } from './services/api';

export default function App() {
  // Dynamic categories with persistence
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('portal_123_categories_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading categories', e);
    }
    return PORTAL_CATEGORIES;
  });

  // Dynamic Yercaud localities with persistence
  const [localities, setLocalities] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('portal_123_localities_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading localities', e);
    }
    return YERCAUD_LOCALITIES;
  });

  // Combine portal businesses and initial businesses
  const initialCombined = [...PORTAL_BUSINESSES, ...INITIAL_BUSINESSES.filter(
    (ib) => !PORTAL_BUSINESSES.some((pb) => pb.id === ib.id || pb.name.toLowerCase() === ib.name.toLowerCase())
  )];

  const [businesses, setBusinesses] = useState<Business[]>(() => {
    try {
      const saved = localStorage.getItem('portal_123_businesses_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge gallery photos from defaults if saved business doesn't have gallery
          return parsed.map((savedBiz: Business) => {
            if (!savedBiz.gallery || savedBiz.gallery.length === 0) {
              const defaultMatch = initialCombined.find(
                (d) => d.id === savedBiz.id || d.name.toLowerCase() === savedBiz.name.toLowerCase()
              );
              if (defaultMatch && defaultMatch.gallery && defaultMatch.gallery.length > 0) {
                return { ...savedBiz, gallery: defaultMatch.gallery };
              }
            }
            return savedBiz;
          });
        }
      }
    } catch (e) {
      console.error('Error loading businesses', e);
    }
    return initialCombined;
  });

  // Leads & Inquiries persistence
  const [inquiries, setInquiries] = useState<BusinessInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('portal_123_inquiries_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading inquiries', e);
    }
    return INITIAL_INQUIRIES;
  });

  // Saved bookmark IDs
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('portal_123_saved_ids_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading saved ids', e);
    }
    return ['adv-1', 'res-1', 'cof-1'];
  });

  // Events & Notices persistence
  const [events, setEvents] = useState<CityEvent[]>(() => {
    try {
      const saved = localStorage.getItem('portal_123_events_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading events', e);
    }
    return INITIAL_EVENTS;
  });

  // Current view: 'grid' (Screenshot 1) | 'details' (Screenshot 2) | 'bookmarks'
  const [currentView, setCurrentView] = useState<'grid' | 'details' | 'bookmarks'>('grid');
  const [isEventsViewActive, setIsEventsViewActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Advocates');

  // Modals and views state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [selectedBizForDetail, setSelectedBizForDetail] = useState<Business | null>(null);
  const [selectedBizForEmailSms, setSelectedBizForEmailSms] = useState<Business | null>(null);
  const [selectedBizForDirection, setSelectedBizForDirection] = useState<Business | null>(null);
  const [isBloodDonorsOpen, setIsBloodDonorsOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isContactAdminOpen, setIsContactAdminOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((c) => (c === msg ? null : c));
    }, 3500);
  };

  // Sync businesses to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('portal_123_businesses_v2', JSON.stringify(businesses));
    } catch (e) {
      console.error(e);
    }
  }, [businesses]);

  // Sync inquiries to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('portal_123_inquiries_v2', JSON.stringify(inquiries));
    } catch (e) {
      console.error(e);
    }
  }, [inquiries]);

  // Sync bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('portal_123_saved_ids_v2', JSON.stringify(savedIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('portal_123_categories_v2', JSON.stringify(categories));
    } catch (e) {
      console.error(e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('portal_123_localities_v2', JSON.stringify(localities));
    } catch (e) {
      console.error(e);
    }
  }, [localities]);

  useEffect(() => {
    try {
      localStorage.setItem('portal_123_events_v2', JSON.stringify(events));
    } catch (e) {
      console.error(e);
    }
  }, [events]);

  // Route Listener: Admin Panel accessible ONLY via /admin URL or #admin
  useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const isAdminRoute = 
        path === '/admin' || 
        path.startsWith('/admin') || 
        path === '/123yercaud/admin' ||
        path.startsWith('/123yercaud/admin') ||
        hash === '#/admin' || 
        hash === '#admin' ||
        hash.includes('admin');

      if (isAdminRoute) {
        const isAuthed = localStorage.getItem('portal_123_admin_auth') === 'true';
        if (isAuthed) {
          setIsAdminOpen(true);
          setIsAdminLoginOpen(false);
        } else {
          setIsAdminLoginOpen(true);
          setIsAdminOpen(false);
        }
      } else {
        setIsAdminOpen(false);
        setIsAdminLoginOpen(false);
      }

      if (hash === '#events' || hash === '#/events' || path === '/events') {
        setIsEventsViewActive(true);
      }
    };

    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    window.addEventListener('hashchange', handleUrlRoute);
    return () => {
      window.removeEventListener('popstate', handleUrlRoute);
      window.removeEventListener('hashchange', handleUrlRoute);
    };
  }, []);

  // Fetch initial data from backend MySQL database on mount
  useEffect(() => {
    let isMounted = true;
    const loadBackendData = async () => {
      try {
        const [bizRes, inqRes, evRes, taxRes] = await Promise.allSettled([
          api.businesses.getAll(),
          api.inquiries.getAll(),
          api.events.getAll(),
          api.taxonomy.get()
        ]);

        if (!isMounted) return;

        if (bizRes.status === 'fulfilled' && bizRes.value && bizRes.value.length > 0) {
          setBusinesses(bizRes.value);
        }
        if (inqRes.status === 'fulfilled' && inqRes.value && inqRes.value.length > 0) {
          setInquiries(inqRes.value);
        }
        if (evRes.status === 'fulfilled' && evRes.value && evRes.value.length > 0) {
          setEvents(evRes.value);
        }
        if (taxRes.status === 'fulfilled' && taxRes.value) {
          if (taxRes.value.categories && taxRes.value.categories.length > 0) {
            setCategories(taxRes.value.categories);
          }
          if (taxRes.value.localities && taxRes.value.localities.length > 0) {
            setLocalities(taxRes.value.localities);
          }
        }
      } catch (err) {
        console.warn('Could not sync with backend, continuing with local store', err);
      }
    };

    loadBackendData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Event handlers
  const handleAddEvent = (newEvent: CityEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
    showToast(`Published event "${newEvent.title}"!`);
    api.events.create(newEvent).catch((e) => console.error('Error saving event to MySQL:', e));
  };

  const handleUpdateEvent = (updatedEvent: CityEvent) => {
    setEvents((prev) => prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));
    showToast(`Updated event "${updatedEvent.title}"!`);
    api.events.update(updatedEvent.id, updatedEvent).catch((e) => console.error('Error updating event in MySQL:', e));
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    showToast('Event removed successfully.');
    api.events.delete(id).catch((e) => console.error('Error deleting event from MySQL:', e));
  };

  // Handlers for creating new Category, Subcategory, Locality
  const handleAddNewCategory = (newCat: Category) => {
    setCategories((prev) => {
      const exists = prev.some((c) => c.name.toLowerCase() === newCat.name.toLowerCase());
      if (exists) {
        return prev.map((c) => (c.name.toLowerCase() === newCat.name.toLowerCase() ? newCat : c));
      }
      return [newCat, ...prev];
    });
    showToast(`New category "${newCat.name}" created!`);
    api.taxonomy.createCategory(newCat).catch((e) => console.error('Error saving category to MySQL:', e));
  };

  const handleAddNewSubcategory = (categoryName: string, subcategoryName: string) => {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.name.toLowerCase() === categoryName.toLowerCase()) {
          const subExists = c.subcategories.some(
            (s) => s.toLowerCase() === subcategoryName.toLowerCase()
          );
          if (!subExists) {
            return {
              ...c,
              subcategories: [...c.subcategories, subcategoryName],
            };
          }
        }
        return c;
      })
    );
    showToast(`Subcategory "${subcategoryName}" added to "${categoryName}"!`);
    api.taxonomy.addSubcategory(categoryName, subcategoryName).catch((e) => console.error('Error adding subcategory to MySQL:', e));
  };

  const handleAddNewLocality = (newLocality: string) => {
    setLocalities((prev) => {
      const exists = prev.some((l) => l.toLowerCase() === newLocality.toLowerCase());
      if (exists) return prev;
      return [...prev, newLocality];
    });
    showToast(`Locality "${newLocality}" added to Yercaud!`);
    api.taxonomy.addLocality(newLocality).catch((e) => console.error('Error adding locality to MySQL:', e));
  };

  // Handlers for deleting incorrectly entered Category, Subcategory, Locality
  const handleDeleteCategory = (categoryNameToDelete: string) => {
    setCategories((prev) => {
      const updated = prev.filter(
        (c) => c.name.toLowerCase() !== categoryNameToDelete.toLowerCase()
      );
      return updated.length > 0 ? updated : PORTAL_CATEGORIES;
    });

    if (selectedCategory.toLowerCase() === categoryNameToDelete.toLowerCase()) {
      setCurrentView('grid');
      setSelectedCategory('Resorts & Cottages');
    }

    showToast(`Category "${categoryNameToDelete}" has been deleted.`);
    api.taxonomy.deleteCategory(categoryNameToDelete).catch((e) => console.error('Error deleting category from MySQL:', e));
  };

  const handleDeleteSubcategory = (categoryName: string, subcategoryNameToDelete: string) => {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.name.toLowerCase() === categoryName.toLowerCase()) {
          const filtered = c.subcategories.filter(
            (s) => s.toLowerCase() !== subcategoryNameToDelete.toLowerCase()
          );
          return {
            ...c,
            subcategories: filtered.length > 0 ? filtered : ['General Services'],
          };
        }
        return c;
      })
    );
    showToast(`Subcategory "${subcategoryNameToDelete}" removed from "${categoryName}".`);
    api.taxonomy.deleteSubcategory(categoryName, subcategoryNameToDelete).catch((e) => console.error('Error deleting subcategory from MySQL:', e));
  };

  const handleDeleteLocality = (localityNameToDelete: string) => {
    setLocalities((prev) => {
      const filtered = prev.filter(
        (l) => l.toLowerCase() !== localityNameToDelete.toLowerCase()
      );
      return filtered.length > 0 ? filtered : ['All Localities', 'Lake Road & Boathouse'];
    });
    showToast(`Locality "${localityNameToDelete}" removed.`);
    api.taxonomy.deleteLocality(localityNameToDelete).catch((e) => console.error('Error deleting locality from MySQL:', e));
  };

  // Handlers
  const handleSelectCategory = (catName: string) => {
    setSelectedCategory(catName);
    setCurrentView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSave = (id: string) => {
    setSavedIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from saved bookmarks');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to your bookmarks');
        return [...prev, id];
      }
    });
  };

  const handleAddBusiness = (newBiz: Business) => {
    setBusinesses((prev) => [newBiz, ...prev]);
    showToast(`"${newBiz.name}" has been listed successfully!`);
    setSelectedCategory(newBiz.category);
    setCurrentView('details');
    api.businesses.create(newBiz).catch((e) => console.error('Error creating business in MySQL:', e));
  };

  const handleAddReview = (businessId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: reviewData.author,
      rating: reviewData.rating,
      date: 'Today',
      comment: reviewData.comment,
      verifiedUser: true,
    };

    setBusinesses((prev) =>
      prev.map((b) => {
        if (b.id === businessId) {
          const updated = [newRev, ...b.reviews];
          const totalRating = updated.reduce((s, r) => s + r.rating, 0);
          const updatedBiz = {
            ...b,
            rating: parseFloat((totalRating / updated.length).toFixed(1)),
            reviewCount: updated.length,
            reviews: updated,
          };
          api.businesses.update(updatedBiz.id, updatedBiz).catch((e) => console.error('Error saving review to MySQL:', e));
          return updatedBiz;
        }
        return b;
      })
    );
    showToast('Your rating and review has been published!');
  };

  // Business CRUD Handlers for Admin
  const handleUpdateBusiness = (updatedBiz: Business) => {
    setBusinesses((prev) =>
      prev.map((b) => (b.id === updatedBiz.id ? updatedBiz : b))
    );
    showToast(`Updated "${updatedBiz.name}" successfully.`);
    api.businesses.update(updatedBiz.id, updatedBiz).catch((e) => console.error('Error updating business in MySQL:', e));
  };

  const handleDeleteBusiness = (id: string) => {
    const target = businesses.find((b) => b.id === id);
    setBusinesses((prev) => prev.filter((b) => b.id !== id));
    showToast(`Deleted "${target?.name || 'Listing'}" from directory.`);
    api.businesses.delete(id).catch((e) => console.error('Error deleting business from MySQL:', e));
  };

  // Inquiries / Leads Handlers
  const handleUpdateInquiryStatus = (
    id: string,
    status: BusinessInquiry['status'],
    notes?: string
  ) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id
          ? {
              ...inq,
              status,
              notes: notes !== undefined ? notes : inq.notes,
            }
          : inq
      )
    );
    showToast(`Inquiry #${id.slice(-5)} status updated to ${status}.`);
    api.inquiries.updateStatus(id, status, notes).catch((e) => console.error('Error updating inquiry in MySQL:', e));
  };

  const handleDeleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    showToast('Inquiry lead record deleted.');
    api.inquiries.delete(id).catch((e) => console.error('Error deleting inquiry from MySQL:', e));
  };

  const handleAddInquiry = (newInquiry: BusinessInquiry) => {
    setInquiries((prev) => [newInquiry, ...prev]);
    api.inquiries.create(newInquiry).catch((e) => console.error('Error creating inquiry in MySQL:', e));
  };

  const handleResetToDefaults = () => {
    localStorage.removeItem('portal_123_businesses_v2');
    localStorage.removeItem('portal_123_categories_v2');
    localStorage.removeItem('portal_123_localities_v2');
    localStorage.removeItem('portal_123_inquiries_v2');
    localStorage.removeItem('portal_123_saved_ids_v2');
    localStorage.removeItem('portal_123_admin_pin');
    setBusinesses(initialCombined);
    setCategories(PORTAL_CATEGORIES);
    setLocalities(YERCAUD_LOCALITIES);
    setInquiries(INITIAL_INQUIRIES);
    setSavedIds(['adv-1', 'res-1', 'cof-1']);
    showToast('Reset system to factory default records successfully.');
  };

  // Prepare businesses for current category with fallback ensuring rich data for any category clicked
  const activeCategoryBusinesses = getBusinessesWithFallback(selectedCategory, businesses, categories);

  // If Admin Login Page is requested (/admin URL unauthenticated), render modern login page
  if (isAdminLoginOpen) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-100 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-5 text-xs sm:text-sm font-semibold max-w-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        <AdminLoginPage
          onSuccess={() => {
            setIsAdminOpen(true);
            setIsAdminLoginOpen(false);
            const base = import.meta.env.BASE_URL.replace(/\/$/, '');
            window.history.pushState(null, '', base + '/admin');
          }}
          onCancel={() => {
            setIsAdminLoginOpen(false);
            const base = import.meta.env.BASE_URL.replace(/\/$/, '');
            if (window.location.pathname.toLowerCase().includes('/admin')) {
              window.history.pushState(null, '', base + '/');
            } else if (window.location.hash.toLowerCase().includes('admin')) {
              window.location.hash = '';
            }
          }}
          showToast={showToast}
        />
      </div>
    );
  }

  // If Admin Dashboard is active, render full Admin UI
  if (isAdminOpen) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        {/* Toast Notification in Admin view */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-100 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-5 text-xs sm:text-sm font-semibold max-w-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        <AdminDashboard
          businesses={businesses}
          categories={categories}
          localities={localities}
          inquiries={inquiries}
          events={events}
          onUpdateBusiness={handleUpdateBusiness}
          onDeleteBusiness={handleDeleteBusiness}
          onAddBusiness={handleAddBusiness}
          onUpdateInquiryStatus={handleUpdateInquiryStatus}
          onDeleteInquiry={handleDeleteInquiry}
          onAddInquiry={handleAddInquiry}
          onAddEvent={handleAddEvent}
          onUpdateEvent={handleUpdateEvent}
          onDeleteEvent={handleDeleteEvent}
          onAddNewCategory={handleAddNewCategory}
          onDeleteCategory={handleDeleteCategory}
          onAddNewSubcategory={handleAddNewSubcategory}
          onDeleteSubcategory={handleDeleteSubcategory}
          onAddNewLocality={handleAddNewLocality}
          onDeleteLocality={handleDeleteLocality}
          onCloseAdmin={() => {
            setIsAdminOpen(false);
            const base = import.meta.env.BASE_URL.replace(/\/$/, '');
            if (window.location.pathname.toLowerCase().includes('/admin')) {
              window.history.pushState(null, '', base + '/');
            } else if (window.location.hash.toLowerCase().includes('admin')) {
              window.location.hash = '';
            }
          }}
          onLogout={() => {
            localStorage.removeItem('portal_123_admin_auth');
            setIsAdminOpen(false);
            setIsAdminLoginOpen(true);
            showToast('Logged out of Admin Console');
          }}
          onViewBusinessPublic={(biz) => {
            setIsAdminOpen(false);
            setSelectedBizForDetail(biz);
            const base = import.meta.env.BASE_URL.replace(/\/$/, '');
            if (window.location.pathname.toLowerCase().includes('/admin')) {
              window.history.pushState(null, '', base + '/');
            } else if (window.location.hash.toLowerCase().includes('admin')) {
              window.location.hash = '';
            }
          }}
          onResetToDefaults={handleResetToDefaults}
          showToast={showToast}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/60 text-slate-900 font-sans antialiased selection:bg-red-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-20 z-50 bg-slate-950 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-5 text-xs sm:text-sm font-semibold max-w-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <PortalHeader
        onNavigateDirectory={() => {
          setIsEventsViewActive(false);
          setCurrentView('grid');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenEvents={() => {
          setIsEventsViewActive(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isEventsActive={isEventsViewActive}
        eventCount={events.length}
        onOpenAddListing={() => setIsContactAdminOpen(true)}
        appName="YERCAUD"
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {isEventsViewActive ? (
          <EventsPageView
            events={events}
            onBackToHome={() => {
              setIsEventsViewActive(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <>
            {currentView === 'grid' && (
              /* Screenshot 1: 5-Column Main Categories Grid */
              <CategoriesGridView
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            )}

            {currentView === 'details' && (
              /* Screenshot 2: 3-Column Category Details View */
              <CategoryDetailsView
                selectedCategory={selectedCategory}
                categories={categories}
                businesses={activeCategoryBusinesses}
                savedIds={savedIds}
                onSelectCategory={handleSelectCategory}
                onBackToGrid={() => {
                  setCurrentView('grid');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenEmailSms={(biz) => setSelectedBizForEmailSms(biz)}
                onOpenDirection={(biz) => setSelectedBizForDirection(biz)}
                onOpenDetailModal={(biz) => setSelectedBizForDetail(biz)}
                onToggleSave={handleToggleSave}
              />
            )}

            {currentView === 'bookmarks' && (
              /* Bookmarks View */
              <div className="py-6 sm:py-8 max-w-5xl mx-auto px-4 sm:px-6">
                <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentView('grid')}
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 cursor-pointer"
                    >
                      <ArrowLeft className="w-5 h-5 text-red-600" />
                    </button>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900">
                        Saved Bookmarks ({savedIds.length})
                      </h2>
                      <p className="text-xs text-slate-500">
                        Quickly access your saved businesses, resorts, and legal professionals
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentView('grid')}
                    className="px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-lg shadow-xs cursor-pointer"
                  >
                    Back to Directory
                  </button>
                </div>

                {businesses.filter((b) => savedIds.includes(b.id)).length > 0 ? (
                  <div className="space-y-4">
                    {businesses
                      .filter((b) => savedIds.includes(b.id))
                      .map((biz) => (
                        <div
                          key={biz.id}
                          className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all relative"
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h3
                              onClick={() => setSelectedBizForDetail(biz)}
                              className="text-base sm:text-lg font-bold text-slate-900 hover:text-red-600 cursor-pointer"
                            >
                              {biz.name}
                            </h3>
                            <span className="text-xs font-bold px-2 py-0.5 bg-red-50 text-red-600 rounded">
                              {biz.category}
                            </span>
                          </div>

                          {biz.contactPerson && (
                            <p className="text-xs text-slate-600 mb-1">
                              Contact: <strong>{biz.contactPerson}</strong>
                            </p>
                          )}

                          <p className="text-xs text-slate-600 mb-2">
                            {biz.phone} &bull; {biz.address}
                          </p>

                          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                            <button
                              onClick={() => setSelectedBizForEmailSms(biz)}
                              className="px-3 py-1.5 bg-red-600 text-white font-bold text-xs rounded shadow-2xs"
                            >
                              Email/SMS
                            </button>
                            <button
                              onClick={() => setSelectedBizForDirection(biz)}
                              className="px-3 py-1.5 bg-red-600 text-white font-bold text-xs rounded shadow-2xs"
                            >
                              Get Direction
                            </button>
                            <button
                              onClick={() => handleToggleSave(biz.id)}
                              className="px-3 py-1.5 bg-slate-100 text-slate-700 font-bold text-xs rounded hover:bg-slate-200 ml-auto"
                            >
                              Remove Bookmark
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
                    <p className="text-sm font-bold text-slate-800">No bookmarks saved yet</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Click the bookmark icon on any listing to save it here for quick access.
                    </p>
                    <button
                      onClick={() => setCurrentView('grid')}
                      className="mt-4 px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-lg shadow-xs"
                    >
                      Browse Categories
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setIsEventsViewActive(false);
          handleSelectCategory(cat);
        }}
        onSelectLocality={() => {
          setIsEventsViewActive(false);
          handleSelectCategory('Resorts & Cottages');
        }}
        onOpenAddListing={() => setIsContactAdminOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenEvents={() => {
          setIsEventsViewActive(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        categories={categories}
        localities={localities}
      />

      {/* Sticky WhatsApp Widget (with Scroll to Top below it) */}
      <FloatingWhatsApp
        phoneNumber="9443916492"
        timing="10.00 AM - 5.00 PM"
      />

      {/* MODALS */}
      {/* 1. Business Detail Modal */}
      <BusinessDetailModal
        business={selectedBizForDetail}
        onClose={() => setSelectedBizForDetail(null)}
        onAddReview={handleAddReview}
        onSubmitEnquiry={(biz, data) => {
          showToast(`Enquiry sent to ${biz.name}!`);
          handleAddInquiry({
            id: `inq-${Date.now()}`,
            businessId: biz.id,
            businessName: biz.name,
            category: biz.category,
            userName: data.name,
            userPhone: data.phone,
            userEmail: '',
            requirement: data.message,
            locality: biz.locality,
            date: 'Today',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'new',
            source: 'detail_enquiry',
          });
        }}
        isSaved={selectedBizForDetail ? savedIds.includes(selectedBizForDetail.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* 2. Email/SMS Modal */}
      <EmailSmsModal
        business={selectedBizForEmailSms}
        onClose={() => setSelectedBizForEmailSms(null)}
        onSubmitSuccess={(msg, inqData) => {
          showToast(msg);
          if (inqData && selectedBizForEmailSms) {
            handleAddInquiry({
              id: `inq-${Date.now()}`,
              businessId: selectedBizForEmailSms.id,
              businessName: selectedBizForEmailSms.name,
              category: selectedBizForEmailSms.category,
              userName: inqData.name,
              userPhone: inqData.phone,
              userEmail: inqData.email,
              requirement: inqData.message,
              locality: selectedBizForEmailSms.locality,
              date: 'Today',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              status: 'new',
              source: 'email_sms',
            });
          }
        }}
      />

      {/* 3. Direction & Route Modal */}
      <DirectionModal
        business={selectedBizForDirection}
        onClose={() => setSelectedBizForDirection(null)}
      />

      {/* 4. Voluntary Blood Donors Modal */}
      <BloodDonorsModal
        isOpen={isBloodDonorsOpen}
        onClose={() => setIsBloodDonorsOpen(false)}
      />

      {/* 5. City & Hill Events Modal */}
      <EventsModal
        isOpen={isEventsOpen}
        onClose={() => setIsEventsOpen(false)}
      />

      {/* Pop-up: To List Your Business/Service Contact admin */}
      <ContactAdminModal
        isOpen={isContactAdminOpen}
        onClose={() => setIsContactAdminOpen(false)}
        phoneNumber="+91 94439 16492"
        timing="10.00 AM - 5.00 PM"
      />

      {/* 7. 24x7 Emergency Helplines Modal */}
      <EmergencyDirectoryModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      {/* 8. Admin Login Modal (Triggered exclusively via /admin url) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => {
          setIsAdminLoginOpen(false);
          if (window.location.pathname.toLowerCase().startsWith('/admin')) {
            window.history.pushState(null, '', '/');
          } else if (window.location.hash.toLowerCase().includes('admin')) {
            window.location.hash = '';
          }
        }}
        onSuccess={() => {
          setIsAdminOpen(true);
          setIsAdminLoginOpen(false);
          if (!window.location.pathname.toLowerCase().startsWith('/admin')) {
            window.history.pushState(null, '', '/admin');
          }
        }}
        showToast={showToast}
      />
    </div>
  );
}
