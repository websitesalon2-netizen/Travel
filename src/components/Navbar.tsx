import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Phone,
  MessageCircle,
  Menu,
  X,
  UserCheck,
  ShieldCheck,
  Search,
  Sparkles,
  Luggage,
  Clock,
  Mountain,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const {
    businessInfo,
    logoSettings,
    currentUserRole,
    loginAs,
    logout,
    setActiveTripModal,
    setActiveAirportTransferModal,
    setActiveChatModal
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deskDropdownOpen, setDeskDropdownOpen] = useState(false);
  const [loginModalRole, setLoginModalRole] = useState<'developer' | 'manager' | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'packages', label: 'Tour Packages' },
    { id: 'hotels', label: 'Hotels & Houseboats' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'live-intel', label: 'Live Mountain Intel' },
    { id: 'guide', label: 'Travel Guide' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleDeskLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginModalRole) return;

    // Standard demo credentials with clear feedback
    const correctPassword = loginModalRole === 'developer' ? 'dev123' : 'manager123';
    if (passwordInput === correctPassword || passwordInput.toLowerCase() === 'admin') {
      loginAs(loginModalRole);
      setActiveTab(loginModalRole === 'developer' ? 'developer-desk' : 'manager-desk');
      setLoginModalRole(null);
      setPasswordInput('');
      setLoginError('');
      setDeskDropdownOpen(false);
    } else {
      setLoginError(`Invalid key. For demo access use: "${correctPassword}"`);
    }
  };

  const openWhatsApp = () => {
    const cleanNumber = businessInfo.whatsapp.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(`Hello ${businessInfo.name}, I would like to enquire about curating a luxury Kashmir trip.`);
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Top Notification & Concierge Bar */}
      <div className="bg-[#0f4332] border-b border-emerald-800 text-xs text-emerald-100 py-1.5 px-4 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#fcd34d] font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fcd34d] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fcd34d]"></span>
              </span>
              Live: Fresh Snow in Gulmarg & Apharwat Peak
            </span>
            <span className="hidden md:inline text-emerald-600">|</span>
            <span className="hidden md:flex items-center gap-1 text-emerald-100">
              <Clock className="w-3.5 h-3.5 text-[#fcd34d]" />
              24x7 Local Mountain Concierge Desk
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveAirportTransferModal(true)}
              className="text-xs hover:text-[#fcd34d] text-emerald-100 transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              <Luggage className="w-3 h-3 text-[#fcd34d]" />
              Airport Transfer
            </button>
            <span className="text-emerald-600">|</span>
            <button
              onClick={() => setActiveChatModal(true)}
              className="text-xs text-[#e5be73] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
            >
              <Sparkles className="w-3 h-3" />
              AI Trip Concierge
            </button>
            <span className="text-emerald-700">|</span>
            {currentUserRole === 'guest' ? (
              <div className="relative">
                <button
                  onClick={() => setDeskDropdownOpen(!deskDropdownOpen)}
                  className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-xs"
                >
                  <span>Portals</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {deskDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50 text-left">
                    <button
                      onClick={() => {
                        setLoginModalRole('developer');
                        setDeskDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-amber-50 text-xs text-amber-900 font-medium flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      Developer Desk
                    </button>
                    <button
                      onClick={() => {
                        setLoginModalRole('manager');
                        setDeskDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-emerald-50 text-xs text-emerald-900 font-medium flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <UserCheck className="w-4 h-4 text-emerald-600" />
                      Manager Desk
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-900 text-[#e5be73] font-medium border border-emerald-700">
                  {currentUserRole === 'developer' ? 'Developer' : 'Manager'} Active
                </span>
                <button
                  onClick={() => {
                    setActiveTab(currentUserRole === 'developer' ? 'developer-desk' : 'manager-desk');
                  }}
                  className="text-xs text-[#e5be73] hover:underline cursor-pointer"
                >
                  Desk
                </button>
                <button
                  onClick={() => {
                    logout();
                    setActiveTab('home');
                  }}
                  className="text-xs text-rose-300 hover:text-rose-200 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80'
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-200/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              {logoSettings.lightLogo ? (
                <img
                  src={logoSettings.lightLogo}
                  alt={businessInfo.name}
                  style={{ height: `${logoSettings.size}px` }}
                  className="object-contain"
                />
              ) : (
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0f4332] via-[#155641] to-[#0a2f23] border border-[#c99e52]/40 flex items-center justify-center shadow-md group-hover:border-[#c99e52] transition-colors">
                  <Compass className="w-6 h-6 text-[#e5be73] transform group-hover:rotate-45 transition-transform duration-500" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#0f231b] group-hover:text-[#0f4332] transition-colors">
                  {businessInfo.name}
                </span>
                <span className="text-[10px] tracking-widest text-[#537063] uppercase font-sans font-medium">
                  {businessInfo.tagline.split('&')[0]}
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'text-[#0f4332] bg-emerald-50 font-semibold border-b-2 border-[#b88628]'
                        : 'text-slate-700 hover:text-[#0f4332] hover:bg-emerald-50/60'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              {/* My Trip Look-up Button */}
              <button
                onClick={() => setActiveTab('mytrip')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 border cursor-pointer transition-all ${
                  activeTab === 'mytrip'
                    ? 'bg-[#0f4332] text-white border-[#0f4332]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#0f4332] hover:text-[#0f4332]'
                }`}
              >
                <Search className="w-3.5 h-3.5 text-[#b88628]" />
                <span>My Trip</span>
              </button>

              {/* Build Trip Primary Button */}
              <button
                onClick={() => setActiveTripModal(true)}
                className="btn-luxury px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Plan Your Trip</span>
              </button>

              {/* WhatsApp Quick Icon */}
              <button
                onClick={openWhatsApp}
                title="Chat with Kashmir Travel Expert on WhatsApp"
                className="w-10 h-10 rounded-lg bg-emerald-600 hover:bg-emerald-700 border border-emerald-500 flex items-center justify-center text-white transition-colors cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setActiveTab('mytrip')}
                className="p-2 rounded-lg bg-emerald-50 text-[#0f4332] border border-emerald-200 text-xs font-semibold"
              >
                My Trip
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-xl">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                    activeTab === item.id
                      ? 'bg-emerald-50 text-[#0f4332] font-semibold border-l-4 border-[#0f4332]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setActiveTripModal(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full btn-luxury py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Build Your Kashmir Trip
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${businessInfo.phone}`}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-slate-200"
                >
                  <Phone className="w-4 h-4 text-[#b88628]" />
                  Call Us
                </a>
                <button
                  onClick={openWhatsApp}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  WhatsApp
                </button>
              </div>

              {/* Desk switches for mobile */}
              <div className="pt-2 flex justify-between text-xs text-slate-500">
                <button
                  onClick={() => {
                    setLoginModalRole('developer');
                    setMobileMenuOpen(false);
                  }}
                  className="hover:text-amber-600 cursor-pointer font-medium"
                >
                  Developer Desk
                </button>
                <button
                  onClick={() => {
                    setLoginModalRole('manager');
                    setMobileMenuOpen(false);
                  }}
                  className="hover:text-emerald-700 cursor-pointer font-medium"
                >
                  Manager Desk
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Desk Authentication Modal */}
      {loginModalRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl relative">
            <button
              onClick={() => {
                setLoginModalRole(null);
                setPasswordInput('');
                setLoginError('');
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-2xl ${loginModalRole === 'developer' ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
                {loginModalRole === 'developer' ? <ShieldCheck className="w-6 h-6" /> : <UserCheck className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {loginModalRole === 'developer' ? 'Developer Desk Access' : 'Operations & Manager Desk'}
                </h3>
                <p className="text-xs text-slate-500">
                  {loginModalRole === 'developer' ? 'System controls, branding & web configuration' : 'Booking operations, pricing & live status'}
                </p>
              </div>
            </div>

            <form onSubmit={handleDeskLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Security Passcode
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter passcode"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0f4332] text-sm focus:bg-white"
                  autoFocus
                />
                <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Demo Passcode:</span>
                  <button
                    type="button"
                    onClick={() => setPasswordInput(loginModalRole === 'developer' ? 'dev123' : 'manager123')}
                    className="text-[#b88628] hover:underline cursor-pointer font-semibold"
                  >
                    Auto-fill ({loginModalRole === 'developer' ? 'dev123' : 'manager123'})
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                  {loginError}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setLoginModalRole(null);
                    setPasswordInput('');
                    setLoginError('');
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#c99e52] to-[#dfb86e] text-[#081510] font-bold text-xs hover:brightness-105 cursor-pointer shadow-md"
                >
                  Authenticate & Enter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
