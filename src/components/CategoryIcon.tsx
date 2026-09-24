import React from 'react';
import {
  Wind,
  Wrench,
  UserCheck,
  Activity,
  Megaphone,
  Scale,
  Apple,
  Square,
  Fish,
  Moon,
  FileSpreadsheet,
  Cog,
  Sparkle,
  Flame,
  Building2,
  Smile,
  HeartHandshake,
  Zap,
  Compass,
  Box,
  HardHat,
  Mountain,
  Coffee,
  Cookie,
  Car,
  UtensilsCrossed,
  Droplet,
  Church,
  Layers,
  Shield
} from 'lucide-react';

interface CategoryIconProps {
  name: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, className = 'w-10 h-10' }) => {
  const norm = name.toLowerCase();

  if (norm.includes('ac dealer')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 shadow-2xs ${className}`}>
        <Wind className="w-full h-full text-cyan-600" />
      </div>
    );
  }

  if (norm.includes('ac repair')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 shadow-2xs ${className}`}>
        <Wrench className="w-full h-full text-sky-600" />
      </div>
    );
  }

  if (norm.includes('driver')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 shadow-2xs ${className}`}>
        <UserCheck className="w-full h-full text-amber-600" />
      </div>
    );
  }

  if (norm.includes('acupuncture')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 shadow-2xs ${className}`}>
        <Activity className="w-full h-full text-emerald-600" />
      </div>
    );
  }

  if (norm.includes('advertising')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 shadow-2xs ${className}`}>
        <Megaphone className="w-full h-full text-purple-600" />
      </div>
    );
  }

  if (norm.includes('advocate') || norm.includes('lawyer')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-red-50 border border-red-200 text-red-700 shadow-2xs ${className}`}>
        <Scale className="w-full h-full text-red-600" />
      </div>
    );
  }

  if (norm.includes('agro')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-lime-50 border border-lime-200 text-lime-700 shadow-2xs ${className}`}>
        <Apple className="w-full h-full text-lime-600" />
      </div>
    );
  }

  if (norm.includes('aluminium')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 shadow-2xs ${className}`}>
        <Square className="w-full h-full text-slate-600" />
      </div>
    );
  }

  if (norm.includes('aquarium')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 shadow-2xs ${className}`}>
        <Fish className="w-full h-full text-blue-600" />
      </div>
    );
  }

  if (norm.includes('astrologer')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 shadow-2xs ${className}`}>
        <Moon className="w-full h-full text-amber-600" />
      </div>
    );
  }

  if (norm.includes('auditor')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 shadow-2xs ${className}`}>
        <FileSpreadsheet className="w-full h-full text-indigo-600" />
      </div>
    );
  }

  if (norm.includes('automobile') || norm.includes('spare')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-yellow-50 border border-yellow-200 text-yellow-800 shadow-2xs ${className}`}>
        <Cog className="w-full h-full text-yellow-600" />
      </div>
    );
  }

  if (norm.includes('ayurvedic')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-2xs ${className}`}>
        <Sparkle className="w-full h-full text-emerald-600" />
      </div>
    );
  }

  if (norm.includes('bakery')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 shadow-2xs ${className}`}>
        <Flame className="w-full h-full text-rose-600" />
      </div>
    );
  }

  if (norm.includes('banquet')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 shadow-2xs ${className}`}>
        <Building2 className="w-full h-full text-amber-600" />
      </div>
    );
  }

  if (norm.includes('beauty parlour')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 shadow-2xs ${className}`}>
        <Smile className="w-full h-full text-pink-600" />
      </div>
    );
  }

  if (norm.includes('beauty spa')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 shadow-2xs ${className}`}>
        <HeartHandshake className="w-full h-full text-teal-600" />
      </div>
    );
  }

  if (norm.includes('body massage')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-800 shadow-2xs ${className}`}>
        <Zap className="w-full h-full text-cyan-600" />
      </div>
    );
  }

  if (norm.includes('borewell')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 shadow-2xs ${className}`}>
        <Compass className="w-full h-full text-blue-600" />
      </div>
    );
  }

  if (norm.includes('brick')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-orange-50 border border-orange-200 text-orange-900 shadow-2xs ${className}`}>
        <Box className="w-full h-full text-orange-600" />
      </div>
    );
  }

  if (norm.includes('builder')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 shadow-2xs ${className}`}>
        <HardHat className="w-full h-full text-amber-600" />
      </div>
    );
  }

  if (norm.includes('resort') || norm.includes('cottage')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-2xs ${className}`}>
        <Mountain className="w-full h-full text-emerald-600" />
      </div>
    );
  }

  if (norm.includes('coffee')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 shadow-2xs ${className}`}>
        <Coffee className="w-full h-full text-amber-700" />
      </div>
    );
  }

  if (norm.includes('chocolate')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 shadow-2xs ${className}`}>
        <Cookie className="w-full h-full text-rose-600" />
      </div>
    );
  }

  if (norm.includes('tour') || norm.includes('cab')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 shadow-2xs ${className}`}>
        <Car className="w-full h-full text-blue-600" />
      </div>
    );
  }

  if (norm.includes('restaurant')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-red-50 border border-red-200 text-red-800 shadow-2xs ${className}`}>
        <UtensilsCrossed className="w-full h-full text-red-600" />
      </div>
    );
  }

  if (norm.includes('water purifier')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 shadow-2xs ${className}`}>
        <Droplet className="w-full h-full text-sky-600" />
      </div>
    );
  }

  if (norm.includes('marriage hall')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 shadow-2xs ${className}`}>
        <Church className="w-full h-full text-purple-600" />
      </div>
    );
  }

  if (norm.includes('concrete')) {
    return (
      <div className={`flex items-center justify-center p-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 shadow-2xs ${className}`}>
        <Layers className="w-full h-full text-stone-600" />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 shadow-2xs ${className}`}>
      <Shield className="w-full h-full text-slate-600" />
    </div>
  );
};
