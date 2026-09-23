import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ShieldCheck,
  UserCheck,
  ExternalLink,
  ShieldAlert,
  Heart,
  ChevronRight,
  Plane,
  Sparkles
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const {
    businessInfo,
    developerCredit,
    emergencyContacts,
    websiteContent,
    setActiveTripModal,
    setActiveAirportTransferModal
  } = useApp();

  const handleDeveloperClick = () => {
    if (!developerCredit.enabled) return;
    const cleanPhone = developerCredit.whatsappNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(developerCredit.whatsappMessage);
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const handleBusinessWhatsApp = () => {
    const cleanPhone = businessInfo.whatsapp.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Hello ${businessInfo.name}, I am reaching out from your website.`);
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#081711] text-slate-300 border-t border-slate-200 relative overflow-hidden">
      {/* Subtle Himalayan ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-emerald-500/5 blur-3xl pointer-events-none" />

      {/* Top Banner: Local Hospitality Pledge */}
      <div className="border-b border-emerald-900/50 bg-[#0c221a] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#143729] border border-emerald-700/60 flex items-center justify-center text-[#e5be73] shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-serif font-bold text-sm tracking-wide">
                Kashmiré Mehman-Nawazi Standard
              </h4>
              <p className="text-xs text-slate-300">
                Direct local operators based in Budgam, Kashmir. 100% transparent pricing, zero middleman markups.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTripModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#173e2f] hover:bg-[#1d4d3b] border border-emerald-600/50 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#e5be73]" />
              Build Itinerary
            </button>
            <button
              onClick={() => setActiveAirportTransferModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#102c21] hover:bg-[#163a2c] border border-emerald-800/60 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plane className="w-3.5 h-3.5 text-[#e5be73]" />
              Airport Transfer
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Address Column */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1b4e3a] to-[#0c231a] border border-[#e5be73]/60 flex items-center justify-center">
                <Compass className="w-5 h-5 text-[#e5be73]" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-wider group-hover:text-[#e5be73] transition-colors">
                {businessInfo.name}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-4 font-normal">
              {businessInfo.tagline}. Handcrafting authentic, safe, and poetic journeys across the meadows, glaciers, and mountain valleys of Jammu & Kashmir.
            </p>

            <div className="space-y-2.5 pt-2 text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-[#e5be73] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Office: </strong>
                  {businessInfo.address}
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-[#e5be73] shrink-0" />
                <a href={`tel:${businessInfo.phone}`} className="hover:text-white transition-colors font-medium">
                  {businessInfo.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <button
                  onClick={handleBusinessWhatsApp}
                  className="hover:underline text-emerald-400 cursor-pointer font-medium"
                >
                  WhatsApp: {businessInfo.whatsapp} (Instant Help)
                </button>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-[#e5be73] shrink-0" />
                <a href={`mailto:${businessInfo.email}`} className="hover:text-white transition-colors">
                  {businessInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-semibold text-white tracking-wider uppercase">
              Explore Kashmir
            </h5>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'destinations', label: 'All Destinations' },
                { id: 'packages', label: 'Curated Tour Packages' },
                { id: 'hotels', label: 'Luxury Stays & Houseboats' },
                { id: 'experiences', label: 'Shikara & Skiing' },
                { id: 'guide', label: 'Travel & Food Guide' },
                { id: 'gallery', label: 'Kashmir Photo Gallery' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => setActiveTab(link.id)}
                    className="text-slate-400 hover:text-[#e5be73] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-[#e5be73]" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Guest Services & Tracking */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-semibold text-white tracking-wider uppercase">
              Guest Services
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('mytrip')}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-semibold text-amber-300"
                >
                  <ChevronRight className="w-3 h-3 text-[#e5be73]" />
                  My Trip (Track Booking)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveAirportTransferModal(true)}
                  className="text-slate-400 hover:text-[#e5be73] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#e5be73]" />
                  Airport Pickup / Drop
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTripModal(true)}
                  className="text-slate-400 hover:text-[#e5be73] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#e5be73]" />
                  AI Custom Trip Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('about')}
                  className="text-slate-400 hover:text-[#e5be73] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#e5be73]" />
                  About Our Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="text-slate-400 hover:text-[#e5be73] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-[#e5be73]" />
                  Contact & Office Map
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <h6 className="text-[11px] font-semibold text-slate-400 uppercase mb-1">
                Internal Portals
              </h6>
              <div className="flex flex-col gap-1 text-[11px]">
                <button
                  onClick={() => setActiveTab('developer-desk')}
                  className="text-left text-amber-400/90 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-medium"
                >
                  <ShieldCheck className="w-3 h-3" />
                  Developer Desk
                </button>
                <button
                  onClick={() => setActiveTab('manager-desk')}
                  className="text-left text-emerald-400/90 hover:text-emerald-300 flex items-center gap-1 cursor-pointer font-medium"
                >
                  <UserCheck className="w-3 h-3" />
                  Manager Desk
                </button>
              </div>
            </div>
          </div>

          {/* Emergency & Tourism Helplines */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-semibold text-white tracking-wider uppercase flex items-center gap-1.5 text-rose-300">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              Tourism Helplines
            </h5>
            <div className="bg-[#0e241b] border border-emerald-900/80 rounded-2xl p-3.5 space-y-2 text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                  Kashmiré Concierge (24x7)
                </span>
                <a href={`tel:${emergencyContacts.travelAgent}`} className="font-bold text-[#e5be73] hover:underline">
                  {emergencyContacts.travelAgent}
                </a>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                  Tourist Police Srinagar
                </span>
                <span className="text-slate-200 font-mono text-[11px]">
                  {emergencyContacts.touristPoliceSrinagar}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                  Police Helpline / Ambulance
                </span>
                <span className="text-slate-200 font-mono text-[11px]">
                  {emergencyContacts.policeHelpline} | {emergencyContacts.medicalAmbulance}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Policies snippet */}
        <div className="mt-8 pt-6 border-t border-emerald-950 text-[11px] text-slate-400 flex flex-wrap justify-between gap-4">
          <p>{websiteContent.copyrightText}</p>
          <div className="flex flex-wrap gap-4">
            <span className="hover:text-slate-200 cursor-pointer" onClick={() => setActiveTab('contact')}>
              Cancellation Policy
            </span>
            <span className="hover:text-slate-200 cursor-pointer" onClick={() => setActiveTab('contact')}>
              Terms & Conditions
            </span>
            <span className="hover:text-slate-200 cursor-pointer" onClick={() => setActiveTab('contact')}>
              Privacy Policy
            </span>
          </div>
        </div>

        {/* Guaranteed Clickable Developer Credit Requirement */}
        {developerCredit.enabled && (
          <div className="mt-6 pt-4 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <span>Crafted with passion for Kashmir</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            </div>

            {/* Clickable Developer Credit - Opens WhatsApp with prefilled message */}
            <button
              onClick={handleDeveloperClick}
              title="Click to chat on WhatsApp with developer"
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#102d21] hover:bg-[#173e2e] border border-emerald-800/80 text-slate-300 hover:text-white transition-all cursor-pointer shadow-xs"
            >
              <span className="text-[11px] text-slate-400">Website Design:</span>
              <span className="font-semibold text-[#e5be73] group-hover:text-white underline decoration-[#e5be73]/50 underline-offset-2">
                {developerCredit.developerName}
              </span>
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </footer>
  );
};
