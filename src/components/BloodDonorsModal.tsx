import React, { useState } from 'react';
import { X, Droplet, Phone, Heart, User, MapPin, CheckCircle, ShieldAlert } from 'lucide-react';
import { BloodDonor } from '../types';
import { BLOOD_DONORS } from '../data/portalData';

interface BloodDonorsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BloodDonorsModal: React.FC<BloodDonorsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const bloodGroups = ['All', 'O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-'];

  if (!isOpen) return null;

  const filteredDonors = BLOOD_DONORS.filter((donor) => {
    if (selectedGroup === 'All') return true;
    return donor.bloodGroup === selectedGroup;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 my-auto">
        {/* Header */}
        <div className="bg-red-600 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/15 rounded-xl">
              <Droplet className="w-6 h-6 fill-white" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-200 uppercase tracking-wider block">
                Community Life Saver Directory
              </span>
              <h3 className="text-lg font-bold">123 Voluntary Blood Donors</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills Bar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 shrink-0">
          <div className="text-xs font-bold text-slate-600 mb-2">Filter by Blood Group:</div>
          <div className="flex flex-wrap gap-1.5">
            {bloodGroups.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedGroup === group
                    ? 'bg-red-600 text-white shadow-2xs'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        {/* Donors List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1 custom-red-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredDonors.map((donor) => (
              <div
                key={donor.id}
                className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow flex items-start justify-between gap-2"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 font-black text-xs rounded border border-red-200">
                      {donor.bloodGroup}
                    </span>
                    <strong className="text-xs sm:text-sm font-bold text-slate-900">
                      {donor.name}
                    </strong>
                  </div>

                  <p className="text-xs text-slate-500 flex items-center">
                    <MapPin className="w-3 h-3 mr-1 text-slate-400 shrink-0" />
                    <span className="truncate">{donor.locality}</span>
                  </p>

                  <p className="text-[11px] text-slate-400">
                    Last donated: {donor.lastDonationDate}
                  </p>
                </div>

                <a
                  href={`tel:${donor.phone.replace(/\s+/g, '')}`}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg flex items-center gap-1 shadow-2xs shrink-0 self-center"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 mt-3 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>For Critical Emergency Blood Requirements:</strong> Please also contact 108 or the nearest Government Hospital Blood Bank directly.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center shrink-0">
          <span className="text-xs text-slate-500">
            Showing {filteredDonors.length} registered donors
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 font-bold text-xs text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
