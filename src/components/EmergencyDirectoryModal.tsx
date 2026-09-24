import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  Phone, 
  MapPin, 
  Clock, 
  Check, 
  Copy, 
  Ambulance, 
  Flame, 
  Building, 
  Zap, 
  HeartHandshake, 
  Shield,
  Trees
} from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../data/yercaudData';

interface EmergencyDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyDirectoryModal: React.FC<EmergencyDirectoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (id: string, number: string) => {
    navigator.clipboard?.writeText(number);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getIcon = (type: string) => {
    const props = { className: 'w-5 h-5 text-white' };
    switch (type) {
      case 'police': return <Shield {...props} />;
      case 'hospital': return <Ambulance {...props} />;
      case 'fire': return <Flame {...props} />;
      case 'civic': return <Trees {...props} />;
      case 'utility': return <Zap {...props} />;
      default: return <HeartHandshake {...props} />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'police': return 'bg-blue-600';
      case 'hospital': return 'bg-red-600';
      case 'fire': return 'bg-orange-600';
      case 'civic': return 'bg-emerald-600';
      case 'utility': return 'bg-amber-600';
      default: return 'bg-purple-600';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-800/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 my-auto">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-rose-700 via-red-600 to-rose-800 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <ShieldAlert className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">
                Yercaud 24x7 Emergency Helplines &amp; Services
              </h3>
              <p className="text-xs text-rose-100">
                Official emergency telephone directory for Yercaud &amp; Shevaroy Hills, Salem District
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Emergency Grid */}
        <div className="p-6 overflow-y-auto space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {EMERGENCY_CONTACTS.map((em) => (
              <div
                key={em.id}
                className="bg-slate-50 hover:bg-slate-100/80 rounded-xl p-4 border border-slate-200 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${getBadgeColor(em.type)}`}>
                        {getIcon(em.type)}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {em.department}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">
                          {em.name}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600 mt-2">
                    <p className="flex items-center text-slate-500">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-red-500 shrink-0" />
                      <span className="truncate">{em.address}</span>
                    </p>
                    <p className="flex items-center text-slate-500">
                      <Clock className="w-3.5 h-3.5 mr-1 text-emerald-600 shrink-0" />
                      <span>{em.timing}</span>
                    </p>
                  </div>
                </div>

                {/* Dial Strip */}
                <div className="pt-3 mt-3 border-t border-slate-200/70 flex items-center justify-between gap-2">
                  <div className="text-base font-extrabold text-slate-900 font-mono">
                    {em.number}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(em.id, em.number)}
                      className="p-1.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                      title="Copy Number"
                    >
                      {copiedId === em.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    <a
                      href={`tel:${em.number.replace(/\s+/g, '')}`}
                      className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Helpline</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-900 mt-4 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">In case of life-threatening emergencies or ghat road accidents:</strong>
              Call National Emergency Number <strong>112</strong> or 24-hr Ghat Ambulance <strong>108</strong> immediately from any mobile or landline across Shevaroy Hills.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 font-bold text-xs text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100"
          >
            Close Emergency Directory
          </button>
        </div>
      </div>
    </div>
  );
};
