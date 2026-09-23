import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Search,
  ShieldCheck,
  Award,
  ChevronDown,
  ArrowRight,
  Plane,
  HeartHandshake
} from 'lucide-react';

interface HeroSectionProps {
  setActiveTab: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab }) => {
  const {
    businessInfo,
    websiteContent,
    setActiveTripModal,
    setActiveAirportTransferModal,
    setActiveChatModal
  } = useApp();

  const [selectedDestination, setSelectedDestination] = useState('Gulmarg & Apharwat');
  const [selectedMonth, setSelectedMonth] = useState('October - Autumn Bloom');
  const [selectedTravelers, setSelectedTravelers] = useState('2 Travelers (Couple)');
  const [selectedStyle, setSelectedStyle] = useState('Luxury & Romance');

  const handleQuickPlan = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTripModal(true);
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden">
      {/* Background Image Layer with Cinematic Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={websiteContent.heroBackgroundImage}
          alt="Majestic Kashmir Dal Lake and Himalayas"
          className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          style={{ animationDuration: '18s' }}
        />
        {/* Soft luxury cinematic vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/60" />
      </div>

      {/* Floating Trust Pill */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 w-full">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#e5be73]/60 backdrop-blur-md text-[#e5be73] text-xs font-semibold tracking-wider uppercase shadow-xl animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-[#e5be73]" />
          <span>{websiteContent.heroTaglineBadge}</span>
        </div>
      </div>

      {/* Main Hero Typography & Call-to-Actions */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col items-start justify-center flex-grow">
        <div className="max-w-3xl space-y-6">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-lg">
            {websiteContent.heroHeadline}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#f1f5f3] font-light leading-relaxed drop-shadow max-w-2xl">
            {websiteContent.heroSubheading}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setActiveTripModal(true)}
              className="btn-luxury px-8 py-4 rounded-xl text-sm sm:text-base font-bold uppercase tracking-wider flex items-center gap-3 shadow-2xl group cursor-pointer"
            >
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Build Your Kashmir Trip</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('destinations')}
              className="px-7 py-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-serif font-semibold text-sm sm:text-base tracking-wide border border-white/30 hover:border-white transition-all backdrop-blur-md cursor-pointer shadow-lg"
            >
              Explore Destinations
            </button>

            <button
              onClick={() => setActiveChatModal(true)}
              className="px-5 py-4 rounded-xl bg-black/40 hover:bg-black/60 text-[#e5be73] border border-[#e5be73]/50 hover:border-[#e5be73] text-xs font-semibold flex items-center gap-2 transition-all backdrop-blur-md cursor-pointer shadow-md"
            >
              <Compass className="w-4 h-4" />
              <span>AI Trip Assistant</span>
            </button>
          </div>

          {/* Value Badges */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-white/90 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#e5be73]" />
              <span>Official Local J&K Operator</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#e5be73]" />
              <span>Handpicked Luxury Fleets & Stays</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <HeartHandshake className="w-4 h-4 text-[#e5be73]" />
              <span>Dedicated 24/7 Mountain Escort</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Integrated Trip Search / Estimator Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
        <form
          onSubmit={handleQuickPlan}
          className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center"
        >
          {/* Destination */}
          <div className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl px-3.5 py-2.5 transition-colors">
            <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1 mb-0.5">
              <MapPin className="w-3 h-3 text-[#b88628]" />
              Where To?
            </label>
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="w-full bg-transparent text-slate-900 text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="Gulmarg & Apharwat" className="text-slate-900">Gulmarg Ski & Apharwat</option>
              <option value="Pahalgam & Lidder Valley" className="text-slate-900">Pahalgam & Lidder Valleys</option>
              <option value="Srinagar & Nigeen Houseboat" className="text-slate-900">Srinagar & Nigeen Houseboats</option>
              <option value="Sonamarg Glaciers" className="text-slate-900">Sonamarg & Thajiwas Glacier</option>
              <option value="Offbeat Gurez & Doodhpathri" className="text-slate-900">Offbeat Gurez & Doodhpathri</option>
              <option value="Complete Kashmir Grand Circuit" className="text-slate-900">Complete 6-Day Grand Circuit</option>
            </select>
          </div>

          {/* Season / Month */}
          <div className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl px-3.5 py-2.5 transition-colors">
            <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1 mb-0.5">
              <Calendar className="w-3 h-3 text-[#b88628]" />
              Travel Season
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full bg-transparent text-slate-900 text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="Winter (Dec - Feb) - Heavy Snow & Skiing" className="text-slate-900">Winter (Dec - Feb): Snow & Ski</option>
              <option value="Spring (Mar - Apr) - Tulips & Almond Bloom" className="text-slate-900">Spring (Mar - Apr): Tulips & Bloom</option>
              <option value="Summer (May - Aug) - Lush Green Meadows" className="text-slate-900">Summer (May - Aug): Meadows</option>
              <option value="Autumn (Sep - Nov) - Golden Chinars & Saffron" className="text-slate-900">Autumn (Sep - Nov): Saffron Gold</option>
            </select>
          </div>

          {/* Travelers */}
          <div className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl px-3.5 py-2.5 transition-colors">
            <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1 mb-0.5">
              <Users className="w-3 h-3 text-[#b88628]" />
              Travel Party
            </label>
            <select
              value={selectedTravelers}
              onChange={(e) => setSelectedTravelers(e.target.value)}
              className="w-full bg-transparent text-slate-900 text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="2 Adults (Couple / Honeymoon)" className="text-slate-900">2 Adults (Couple)</option>
              <option value="Family (2 Adults + 2 Kids)" className="text-slate-900">Family (2 Adults + 2 Kids)</option>
              <option value="Small Group (4-6 Friends)" className="text-slate-900">Group (4-6 Friends)</option>
              <option value="Large Group (7-14 with Tempo)" className="text-slate-900">Large Group (Tempo Traveller)</option>
              <option value="Solo Himalayan Traveler" className="text-slate-900">Solo Traveler</option>
            </select>
          </div>

          {/* Style */}
          <div className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl px-3.5 py-2.5 transition-colors">
            <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1 mb-0.5">
              <Sparkles className="w-3 h-3 text-[#b88628]" />
              Travel Style
            </label>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="w-full bg-transparent text-slate-900 text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="Luxury & Romance" className="text-slate-900">Luxury & Heritage</option>
              <option value="Adventure & Snow Sports" className="text-slate-900">Adventure & Skiing</option>
              <option value="Family Comfort & Leisure" className="text-slate-900">Family Leisure</option>
              <option value="Offbeat Hidden Valleys" className="text-slate-900">Offbeat & Wild</option>
            </select>
          </div>

          {/* Search CTA */}
          <button
            type="submit"
            className="w-full h-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#c99e52] via-[#e3be75] to-[#c99e52] text-[#07160f] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:brightness-105 cursor-pointer transition-transform active:scale-[0.98]"
          >
            <Search className="w-4 h-4" />
            <span>Customize Trip</span>
          </button>
        </form>
      </div>
    </div>
  );
};
