export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verifiedUser?: boolean;
}

export interface Business {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  rating: number;
  reviewCount: number;
  address: string;
  locality: string;
  pincode: string;
  phone: string;
  alternatePhone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  mapUrl?: string;
  openingHours: string;
  isVerified: boolean;
  isFeatured?: boolean;
  establishedYear?: number;
  contactPerson?: string;
  slotBadge?: string;
  tags?: string[];
  description: string;
  services: string[];
  imageUrl: string;
  gallery?: string[];
  reviews: Review[];
}

export interface BloodDonor {
  id: string;
  name: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  phone: string;
  locality: string;
  lastDonationDate: string;
  available: boolean;
}

export interface CityEvent {
  id: string;
  title: string;
  date: string; // e.g. "2026-04-23" or "23 APR 2026"
  day?: string; // e.g. "23"
  month?: string; // e.g. "APR"
  time: string; // e.g. "10:00 AM" or "09:00 AM - 5:00 PM"
  location: string; // e.g. "Anna Park & Botanical Garden, Yercaud"
  category: string; // e.g. "Festival & Flower Show", "Sports & Marathon", "Music & Culture"
  description: string;
  fullDetails?: string;
  organizer: string;
  organizerPhone?: string;
  organizerEmail?: string;
  imageUrl: string;
  entryFee?: string; // "Free Entry" or "₹50 / Person"
  isFeatured?: boolean;
  status?: 'upcoming' | 'ongoing' | 'completed';
  venueMapUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  color: string;
  description: string;
  count: number;
  subcategories: string[];
}

export interface EmergencyContact {
  id: string;
  department: string;
  name: string;
  number: string;
  altNumber?: string;
  address: string;
  timing: string;
  type: 'police' | 'hospital' | 'fire' | 'civic' | 'utility' | 'helpline';
}

export interface CityAttraction {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  timings: string;
  entryFee: string;
  highlights: string[];
  imageUrl: string;
}

export interface BusinessInquiry {
  id: string;
  businessId?: string;
  businessName?: string;
  category?: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  requirement: string;
  locality: string;
  date: string;
  time?: string;
  status: 'new' | 'contacted' | 'resolved' | 'archived';
  source?: 'email_sms' | 'detail_enquiry' | 'post_requirement' | 'manual_phone';
  notes?: string;
}
