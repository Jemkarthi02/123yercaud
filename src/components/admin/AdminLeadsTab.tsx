import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Plus, 
  Phone, 
  Send, 
  FileSpreadsheet, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Trash2, 
  ExternalLink, 
  User, 
  MapPin, 
  FileText, 
  Save, 
  X 
} from 'lucide-react';
import { BusinessInquiry, Category } from '../../types';

interface AdminLeadsTabProps {
  inquiries: BusinessInquiry[];
  categories: Category[];
  localities: string[];
  onUpdateInquiryStatus: (id: string, status: BusinessInquiry['status'], notes?: string) => void;
  onDeleteInquiry: (id: string) => void;
  onAddInquiry: (newInquiry: BusinessInquiry) => void;
  onExportCSV: () => void;
  showToast: (msg: string) => void;
}

export const AdminLeadsTab: React.FC<AdminLeadsTabProps> = ({
  inquiries,
  categories,
  localities,
  onUpdateInquiryStatus,
  onDeleteInquiry,
  onAddInquiry,
  onExportCSV,
  showToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'resolved'>('all');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);

  // Manual Lead Form State
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualCategory, setManualCategory] = useState(categories[0]?.name || 'Resorts & Stays');
  const [manualLocality, setManualLocality] = useState(localities[1] || 'Lake Road');
  const [manualReq, setManualReq] = useState('');

  // Counts
  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === 'new').length;
  const contactedCount = inquiries.filter((i) => i.status === 'contacted').length;
  const resolvedCount = inquiries.filter((i) => i.status === 'resolved').length;

  // Filter inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    // Status
    if (statusFilter !== 'all' && inq.status !== statusFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = inq.userName.toLowerCase().includes(q);
      const matchPhone = inq.userPhone.includes(q);
      const matchReq = inq.requirement.toLowerCase().includes(q);
      const matchBiz = (inq.businessName || '').toLowerCase().includes(q);
      const matchCat = (inq.category || '').toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchReq && !matchBiz && !matchCat) {
        return false;
      }
    }

    return true;
  });

  const handleSaveNotes = (inq: BusinessInquiry) => {
    onUpdateInquiryStatus(inq.id, inq.status, tempNotes);
    showToast('Admin note saved successfully!');
    setEditingNotesId(null);
  };

  const handleCreateManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim() || !manualPhone.trim() || !manualReq.trim()) {
      showToast('Please fill in Customer Name, Phone, and Requirements.');
      return;
    }

    const newLead: BusinessInquiry = {
      id: `lead_${Date.now()}`,
      userName: manualName.trim(),
      userPhone: manualPhone.trim(),
      userEmail: manualEmail.trim() || 'phone-inquiry@123yercaud.com',
      category: manualCategory,
      locality: manualLocality,
      requirement: manualReq.trim(),
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'new',
      source: 'manual_phone',
      notes: 'Direct phone / walk-in lead added by administrator',
    };

    onAddInquiry(newLead);
    showToast(`Added manual lead for ${manualName}!`);
    setIsAddLeadModalOpen(false);

    // Reset form
    setManualName('');
    setManualPhone('');
    setManualEmail('');
    setManualReq('');
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Metrics & Action Strip */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        {/* Row 1: KPI Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div 
            onClick={() => setStatusFilter('all')}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-slate-100 border-red-600 shadow-2xs'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}
          >
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Inquiries</span>
            <span className="text-xl font-black text-slate-900">{totalCount}</span>
          </div>

          <div 
            onClick={() => setStatusFilter('new')}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              statusFilter === 'new'
                ? 'bg-rose-50 border-rose-500 shadow-2xs'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">New (Action Needed)</span>
              {newCount > 0 && <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />}
            </div>
            <span className="text-xl font-black text-rose-700">{newCount}</span>
          </div>

          <div 
            onClick={() => setStatusFilter('contacted')}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              statusFilter === 'contacted'
                ? 'bg-amber-50 border-amber-500 shadow-2xs'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}
          >
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">In Progress</span>
            <span className="text-xl font-black text-amber-700">{contactedCount}</span>
          </div>

          <div 
            onClick={() => setStatusFilter('resolved')}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              statusFilter === 'resolved'
                ? 'bg-emerald-50 border-emerald-500 shadow-2xs'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}
          >
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Resolved</span>
            <span className="text-xl font-black text-emerald-700">{resolvedCount}</span>
          </div>
        </div>

        {/* Row 2: Search & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads by customer, phone, requirement, business..."
              className="w-full pl-10 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-red-600 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onExportCSV}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Export Leads CSV</span>
            </button>

            <button
              onClick={() => setIsAddLeadModalOpen(true)}
              className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Manual Lead</span>
            </button>
          </div>
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-3">
        {filteredInquiries.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">No inquiries match the current filter</h4>
            <p className="text-xs text-slate-500">Try changing status filters or record a new customer inquiry.</p>
          </div>
        ) : (
          filteredInquiries.map((inq) => {
            const cleanPhone = inq.userPhone.replace(/\D/g, '');
            const waNumber = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
            const targetName = inq.businessName || inq.category || 'General Yercaud Inquiry';
            const waMessage = `Hello ${inq.userName}, greetings from 123yercaud.com directory! Regarding your requirement for ${targetName}: "${inq.requirement.slice(0, 80)}" - how can we assist you with verified rates and booking?`;
            const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

            const isEditingNotes = editingNotesId === inq.id;

            return (
              <div
                key={inq.id}
                className={`bg-white border rounded-2xl p-4 sm:p-5 shadow-xs transition-all space-y-3 ${
                  inq.status === 'new'
                    ? 'border-rose-300 hover:border-rose-400 bg-rose-50/10'
                    : inq.status === 'contacted'
                    ? 'border-amber-300 hover:border-amber-400 bg-amber-50/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header: Customer Info & Status Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-black text-slate-800 shrink-0">
                      {inq.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm sm:text-base text-slate-900">{inq.userName}</span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {inq.date} {inq.time && `• ${inq.time}`}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="font-mono text-slate-800 font-bold">{inq.userPhone}</span>
                        {inq.userEmail && <span>• {inq.userEmail}</span>}
                        {inq.locality && (
                          <span className="flex items-center gap-1">
                            • <MapPin className="w-3 h-3 text-red-600" /> {inq.locality}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Status Pill */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Status Changer */}
                    <select
                      value={inq.status}
                      onChange={(e) => {
                        const newStatus = e.target.value as BusinessInquiry['status'];
                        onUpdateInquiryStatus(inq.id, newStatus);
                        showToast(`Status updated to ${newStatus}`);
                      }}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none cursor-pointer uppercase ${
                        inq.status === 'new'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : inq.status === 'contacted'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      <option value="new">Status: New</option>
                      <option value="contacted">Status: Contacted</option>
                      <option value="resolved">Status: Resolved</option>
                    </select>

                    {/* Quick Call */}
                    <a
                      href={`tel:${inq.userPhone}`}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 flex items-center gap-1.5 transition-colors"
                      title="Call customer directly"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="hidden xs:inline">Call</span>
                    </a>

                    {/* 1-Click WhatsApp */}
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
                      title="Send WhatsApp message"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    {/* Delete Lead */}
                    <button
                      onClick={() => setLeadToDelete(inq.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Requirement Message Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                      Target: <span className="text-slate-900 font-semibold">{inq.businessName || inq.category || 'General Service'}</span>
                    </span>
                    {inq.source && (
                      <span className="px-2 py-0.5 bg-white border border-slate-200 text-slate-600 text-[10px] rounded font-mono">
                        {inq.source}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {inq.requirement}
                  </p>
                </div>

                {/* Admin Notes Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pt-1">
                  {isEditingNotes ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={tempNotes}
                        onChange={(e) => setTempNotes(e.target.value)}
                        placeholder="Add notes: quoted tariff, customer booked, callback time..."
                        className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-red-600"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSaveNotes(inq)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center gap-1 cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={() => setEditingNotesId(null)}
                        className="px-2.5 py-1.5 text-slate-500 hover:text-slate-800"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-between text-slate-500">
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>
                          {inq.notes ? (
                            <span className="text-slate-800 italic font-medium">Admin Note: "{inq.notes}"</span>
                          ) : (
                            <span className="text-slate-400">No notes added yet</span>
                          )}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setEditingNotesId(inq.id);
                          setTempNotes(inq.notes || '');
                        }}
                        className="text-red-600 hover:text-red-700 font-bold ml-2 cursor-pointer"
                      >
                        {inq.notes ? 'Edit Note' : '+ Add Note'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Delete Confirm Modal */}
      {leadToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900">Delete Inquiry Lead?</h3>
            <p className="text-xs text-slate-500">This will permanently delete this customer inquiry from the CRM.</p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setLeadToDelete(null)}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteInquiry(leadToDelete);
                  showToast('Inquiry lead deleted');
                  setLeadToDelete(null);
                }}
                className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Lead Creation Modal */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Record Manual Lead</h3>
                <p className="text-xs text-slate-500">Log customer requirements received by direct call or counter</p>
              </div>
              <button
                onClick={() => setIsAddLeadModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600 font-mono font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    value={manualEmail}
                    onChange={(e) => setManualEmail(e.target.value)}
                    placeholder="guest@gmail.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Target Category</label>
                  <select
                    value={manualCategory}
                    onChange={(e) => setManualCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600 font-medium"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Preferred Locality</label>
                  <select
                    value={manualLocality}
                    onChange={(e) => setManualLocality(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600 font-medium"
                  >
                    {localities.filter((l) => l !== 'All Localities').map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Requirement / Details *</label>
                <textarea
                  required
                  rows={3}
                  value={manualReq}
                  onChange={(e) => setManualReq(e.target.value)}
                  placeholder="Need family cottage for 6 persons near Lake Road for coming weekend with campfire..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddLeadModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
