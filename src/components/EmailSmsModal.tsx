import React, { useState } from 'react';
import { X, Send, Mail, Phone, CheckCircle2, User, MessageSquare } from 'lucide-react';
import { Business } from '../types';

interface EmailSmsModalProps {
  business: Business | null;
  onClose: () => void;
  onSubmitSuccess: (msg: string, inquiryData?: {
    name: string;
    phone: string;
    email: string;
    message: string;
  }) => void;
}

export const EmailSmsModal: React.FC<EmailSmsModalProps> = ({
  business,
  onClose,
  onSubmitSuccess,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendType, setSendType] = useState<'both' | 'sms' | 'email'>('both');
  const [isSent, setIsSent] = useState(false);

  if (!business) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSent(true);
    setTimeout(() => {
      onSubmitSuccess(`Enquiry successfully sent to ${business.name}!`, {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        message: message.trim() || `Interested in services of ${business.name}`,
      });
      setIsSent(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 my-auto">
        {/* Header */}
        <div className="bg-red-600 text-white px-5 py-3.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-amber-200 uppercase tracking-wider block">
              Direct Business Enquiry
            </span>
            <h3 className="text-base font-bold">Email / SMS to {business.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {isSent ? (
            <div className="text-center py-8 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="text-base font-bold text-slate-900">Message Delivered!</h4>
              <p className="text-xs text-slate-600">
                Your requirement has been transmitted to <strong>{business.name}</strong>.
                They will call or reply to your phone number shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs text-slate-600">
                <span className="font-bold text-slate-800 block">{business.name}</span>
                <span>{business.category} &bull; {business.locality}</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-red-600 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10 digit mobile"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-red-600 text-xs font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Optional"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-red-600 text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Requirement / Message
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Please share price quote, availability, or call back at the earliest."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-red-600 text-xs font-medium"
                />
              </div>

              <div className="flex items-center gap-2 pt-1 text-xs">
                <span className="font-semibold text-slate-600">Send Via:</span>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="sendtype"
                    checked={sendType === 'both'}
                    onChange={() => setSendType('both')}
                  />
                  <span>SMS + Email</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="sendtype"
                    checked={sendType === 'sms'}
                    onChange={() => setSendType('sms')}
                  />
                  <span>SMS Only</span>
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Free Enquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
