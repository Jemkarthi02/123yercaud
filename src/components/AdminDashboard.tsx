import React, { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  Layers,
  Settings,
  Plus,
  ExternalLink,
  FileSpreadsheet,
  Download,
  Search,
  X,
  LogOut,
  Calendar
} from 'lucide-react';
import { Business, Category, BusinessInquiry, CityEvent } from '../types';
import { AppLogo } from './AppLogo';
import { EditBusinessModal } from './EditBusinessModal';
import { AddListingModal } from './AddListingModal';
import { AdminOverviewTab } from './admin/AdminOverviewTab';
import { AdminListingsTab } from './admin/AdminListingsTab';
import { AdminLeadsTab } from './admin/AdminLeadsTab';
import { AdminTaxonomyTab } from './admin/AdminTaxonomyTab';
import { AdminEventsTab } from './admin/AdminEventsTab';
import { AdminSettingsTab } from './admin/AdminSettingsTab';

interface AdminDashboardProps {
  businesses: Business[];
  categories: Category[];
  localities: string[];
  inquiries: BusinessInquiry[];
  events: CityEvent[];
  onUpdateBusiness: (updatedBiz: Business) => void;
  onDeleteBusiness: (id: string) => void;
  onAddBusiness: (newBiz: Business) => void;
  onUpdateInquiryStatus: (id: string, status: BusinessInquiry['status'], notes?: string) => void;
  onDeleteInquiry: (id: string) => void;
  onAddInquiry: (newInquiry: BusinessInquiry) => void;
  onAddEvent: (event: CityEvent) => void;
  onUpdateEvent: (event: CityEvent) => void;
  onDeleteEvent: (id: string) => void;
  onAddNewCategory: (cat: Category) => void;
  onDeleteCategory: (catName: string) => void;
  onAddNewSubcategory: (catName: string, sub: string) => void;
  onDeleteSubcategory: (catName: string, sub: string) => void;
  onAddNewLocality: (loc: string) => void;
  onDeleteLocality: (loc: string) => void;
  onCloseAdmin: () => void;
  onLogout?: () => void;
  onViewBusinessPublic: (biz: Business) => void;
  onResetToDefaults: () => void;
  showToast: (msg: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  businesses,
  categories,
  localities,
  inquiries,
  events,
  onUpdateBusiness,
  onDeleteBusiness,
  onAddBusiness,
  onUpdateInquiryStatus,
  onDeleteInquiry,
  onAddInquiry,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  onAddNewCategory,
  onDeleteCategory,
  onAddNewSubcategory,
  onDeleteSubcategory,
  onAddNewLocality,
  onDeleteLocality,
  onCloseAdmin,
  onLogout,
  onViewBusinessPublic,
  onResetToDefaults,
  showToast,
}) => {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'leads' | 'events' | 'taxonomy' | 'settings'>('overview');

  // Listings filters state
  const [listingSearch, setListingSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedLocalityFilter, setSelectedLocalityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'unverified' | 'featured'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'reviews'>('name');

  // Modals inside Admin
  const [editingBiz, setEditingBiz] = useState<Business | null>(null);
  const [isAddingBizModalOpen, setIsAddingBizModalOpen] = useState(false);

  // Derived counts
  const totalListings = businesses.length;
  const unverifiedCount = businesses.filter((b) => !b.isVerified).length;
  const totalLeads = inquiries.length;
  const newLeadsCount = inquiries.filter((inq) => inq.status === 'new').length;

  // Toggle listing verification in 1 click
  const handleToggleVerify = (biz: Business) => {
    const updated: Business = {
      ...biz,
      isVerified: !biz.isVerified,
    };
    onUpdateBusiness(updated);
    showToast(
      updated.isVerified
        ? `"${biz.name}" is now Verified & Approved`
        : `"${biz.name}" marked as Unverified`
    );
  };

  // Toggle listing featured badge in 1 click
  const handleToggleFeatured = (biz: Business) => {
    const updated: Business = {
      ...biz,
      isFeatured: !biz.isFeatured,
    };
    onUpdateBusiness(updated);
    showToast(
      updated.isFeatured
        ? `"${biz.name}" is now Featured on homepage`
        : `"${biz.name}" removed from Featured`
    );
  };

  // CSV Export for Businesses
  const exportBusinessesCSV = () => {
    const headers = [
      'ID',
      'Name',
      'Category',
      'Subcategory',
      'Locality',
      'Pincode',
      'Phone',
      'Email',
      'Website',
      'Rating',
      'Reviews Count',
      'Verified',
      'Featured',
    ];

    const rows = businesses.map((b) => [
      `"${b.id}"`,
      `"${b.name.replace(/"/g, '""')}"`,
      `"${b.category.replace(/"/g, '""')}"`,
      `"${b.subcategory.replace(/"/g, '""')}"`,
      `"${b.locality.replace(/"/g, '""')}"`,
      `"${b.pincode}"`,
      `"${b.phone}"`,
      `"${b.email || ''}"`,
      `"${b.website || ''}"`,
      b.rating,
      b.reviewCount,
      b.isVerified ? 'YES' : 'NO',
      b.isFeatured ? 'YES' : 'NO',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `123yercaud_businesses_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Businesses directory exported to CSV!');
  };

  // CSV Export for Leads
  const exportLeadsCSV = () => {
    const headers = [
      'ID',
      'Date',
      'User Name',
      'User Phone',
      'User Email',
      'Target Business',
      'Category',
      'Locality',
      'Status',
      'Requirement Details',
      'Admin Notes',
    ];

    const rows = inquiries.map((inq) => [
      `"${inq.id}"`,
      `"${inq.date}"`,
      `"${inq.userName.replace(/"/g, '""')}"`,
      `"${inq.userPhone}"`,
      `"${inq.userEmail || ''}"`,
      `"${(inq.businessName || '').replace(/"/g, '""')}"`,
      `"${(inq.category || '').replace(/"/g, '""')}"`,
      `"${inq.locality || ''}"`,
      `"${inq.status}"`,
      `"${inq.requirement.replace(/"/g, '""')}"`,
      `"${(inq.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `123yercaud_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leads & inquiries exported to CSV!');
  };

  // JSON Full Backup Export
  const exportFullBackupJSON = () => {
    const backupData = {
      version: '2.0',
      exportDate: new Date().toISOString(),
      portal: '123yercaud.com',
      stats: {
        totalBusinesses: businesses.length,
        totalInquiries: inquiries.length,
        totalCategories: categories.length,
        totalLocalities: localities.length,
      },
      businesses,
      inquiries,
      categories,
      localities,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `123yercaud_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Full system JSON backup downloaded!');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Top Admin Executive Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Portal Identity */}
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-slate-50 border border-slate-200 rounded-xl shadow-2xs">
              <AppLogo size="header" />
            </div>
            <div className="border-l border-slate-200 pl-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-red-600 text-white font-black text-[10px] rounded-md tracking-wider uppercase shadow-2xs">
                  Executive Admin
                </span>
                <span className="text-xs font-bold text-slate-800 hidden sm:inline">
                  Directory Control Center
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">123yercaud.com Management System</p>
            </div>
          </div>

          {/* Quick Header CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsAddingBizModalOpen(true)}
              className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              title="Add a new business or service listing"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Listing</span>
            </button>

            <button
              onClick={exportBusinessesCSV}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Export all businesses to CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden md:inline">Export CSV</span>
            </button>

            <button
              onClick={onCloseAdmin}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Return to the live directory website"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>Live Site</span>
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-xl border border-red-200 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Log out of Admin Session"
              >
                <LogOut className="w-3.5 h-3.5 text-red-600" />
                <span>Log Out</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="bg-slate-50/90 border-t border-slate-200 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto py-1.5 scrollbar-none">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview &amp; Metrics</span>
            </button>

            <button
              onClick={() => setActiveTab('listings')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'listings'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Listings Directory ({totalListings})</span>
              {unverifiedCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] font-black bg-amber-400 text-slate-900 rounded-full animate-pulse">
                  {unverifiedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Leads CRM ({totalLeads})</span>
              {newLeadsCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] font-black bg-rose-500 text-white rounded-full">
                  {newLeadsCount} new
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'events'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Events &amp; Notices ({events.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('taxonomy')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'taxonomy'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Categories &amp; Localities</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings &amp; Backup</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Tab Content Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <AdminOverviewTab
            businesses={businesses}
            categories={categories}
            localities={localities}
            inquiries={inquiries}
            onSelectTab={setActiveTab}
            onFilterCategory={(cat) => {
              setSelectedCategoryFilter(cat);
              setActiveTab('listings');
            }}
            onFilterStatus={(st) => {
              setStatusFilter(st);
              setActiveTab('listings');
            }}
            onToggleVerify={handleToggleVerify}
            onEditBusiness={(biz) => setEditingBiz(biz)}
            onViewBusinessPublic={onViewBusinessPublic}
            onUpdateInquiryStatus={onUpdateInquiryStatus}
            showToast={showToast}
          />
        )}

        {/* TAB 2: LISTINGS DIRECTORY */}
        {activeTab === 'listings' && (
          <AdminListingsTab
            businesses={businesses}
            categories={categories}
            localities={localities}
            searchQuery={listingSearch}
            onSearchChange={setListingSearch}
            selectedCategory={selectedCategoryFilter}
            onCategoryChange={setSelectedCategoryFilter}
            selectedLocality={selectedLocalityFilter}
            onLocalityChange={setSelectedLocalityFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            onOpenAddModal={() => setIsAddingBizModalOpen(true)}
            onOpenEditModal={(biz) => setEditingBiz(biz)}
            onDeleteBusiness={onDeleteBusiness}
            onToggleVerify={handleToggleVerify}
            onToggleFeatured={handleToggleFeatured}
            onViewBusinessPublic={onViewBusinessPublic}
            onExportCSV={exportBusinessesCSV}
            showToast={showToast}
          />
        )}

        {/* TAB 3: LEADS & CRM INQUIRIES */}
        {activeTab === 'leads' && (
          <AdminLeadsTab
            inquiries={inquiries}
            categories={categories}
            localities={localities}
            onUpdateInquiryStatus={onUpdateInquiryStatus}
            onDeleteInquiry={onDeleteInquiry}
            onAddInquiry={onAddInquiry}
            onExportCSV={exportLeadsCSV}
            showToast={showToast}
          />
        )}

        {/* TAB 4: EVENTS & NOTICES */}
        {activeTab === 'events' && (
          <AdminEventsTab
            events={events}
            onAddEvent={onAddEvent}
            onUpdateEvent={onUpdateEvent}
            onDeleteEvent={onDeleteEvent}
            showToast={showToast}
          />
        )}

        {/* TAB 5: TAXONOMY & CATEGORIES */}
        {activeTab === 'taxonomy' && (
          <AdminTaxonomyTab
            categories={categories}
            localities={localities}
            businesses={businesses}
            onAddNewCategory={onAddNewCategory}
            onDeleteCategory={onDeleteCategory}
            onAddNewSubcategory={onAddNewSubcategory}
            onDeleteSubcategory={onDeleteSubcategory}
            onAddNewLocality={onAddNewLocality}
            onDeleteLocality={onDeleteLocality}
            showToast={showToast}
          />
        )}

        {/* TAB 6: SETTINGS & BACKUP */}
        {activeTab === 'settings' && (
          <AdminSettingsTab
            businesses={businesses}
            categories={categories}
            localities={localities}
            inquiries={inquiries}
            onResetToDefaults={onResetToDefaults}
            onExportFullBackup={exportFullBackupJSON}
            onExportBusinessesCSV={exportBusinessesCSV}
            onExportLeadsCSV={exportLeadsCSV}
            showToast={showToast}
          />
        )}
      </main>

      {/* Edit Business Modal */}
      {editingBiz && (
        <EditBusinessModal
          business={editingBiz}
          isOpen={!!editingBiz}
          onClose={() => setEditingBiz(null)}
          onSave={(updated) => {
            onUpdateBusiness(updated);
            setEditingBiz(null);
            showToast(`Updated "${updated.name}"`);
          }}
          categories={categories}
          localities={localities}
        />
      )}

      {/* Add Listing Modal */}
      {isAddingBizModalOpen && (
        <AddListingModal
          isOpen={isAddingBizModalOpen}
          onClose={() => setIsAddingBizModalOpen(false)}
          onAddBusiness={(newBiz: Business) => {
            onAddBusiness(newBiz);
            setIsAddingBizModalOpen(false);
            showToast(`Published listing "${newBiz.name}"!`);
          }}
          categories={categories}
          localities={localities}
        />
      )}
    </div>
  );
};
