import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TourPackage } from '../types';
import {
  Clock,
  Sparkles,
  CheckCircle,
  XCircle,
  ChevronRight,
  ArrowRight,
  MapPin,
  Users,
  ShieldCheck,
  Calendar,
  X,
  CreditCard
} from 'lucide-react';

interface PackagesSectionProps {
  onSelectPackageForBooking?: (pkg: TourPackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  onSelectPackageForBooking
}) => {
  const { packages, websiteContent, setActiveTripModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePackageModal, setActivePackageModal] = useState<TourPackage | null>(null);

  const categories = [
    { id: 'all', label: 'All Packages' },
    { id: 'honeymoon', label: 'Honeymoon & Romance' },
    { id: 'winter', label: 'Winter Snow & Skiing' },
    { id: 'offbeat', label: 'Offbeat & Gurez' },
    { id: 'family', label: 'Family Grand Tours' }
  ];

  const filtered = packages.filter((pkg) => {
    if (selectedCategory === 'all') return true;
    return pkg.category === selectedCategory;
  });

  const handleBookPackage = (pkg: TourPackage) => {
    setActivePackageModal(null);
    if (onSelectPackageForBooking) {
      onSelectPackageForBooking(pkg);
    } else {
      setActiveTripModal(true);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-[#0f4332] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#b88628]" />
              <span>HANDCRAFTED ITINERARIES & BESPOKE EXPEDITIONS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f231b] tracking-tight">
              {websiteContent.packagesSectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              {websiteContent.packagesSectionDesc}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-200 shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0f4332] text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden hover:border-[#b88628]/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between group"
            >
              {/* Image & Header */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={pkg.coverImage}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Badge top left */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-[#0f4332] text-[11px] font-bold tracking-wider uppercase shadow-md">
                    {pkg.badge}
                  </span>
                </div>

                {/* Duration Badge top right */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-white font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#e5be73]" />
                  <span>{pkg.duration}</span>
                </div>

                {/* Title & Route over gradient */}
                <div className="absolute bottom-4 left-5 right-5">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white drop-shadow">
                    {pkg.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-white/90">
                    <MapPin className="w-3.5 h-3.5 text-[#e5be73] shrink-0" />
                    <span>{pkg.route.join(' → ')}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-5 flex-grow flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pkg.overview}
                </p>

                {/* Highlights */}
                <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <span className="text-[11px] uppercase tracking-wider text-[#b88628] font-bold block">
                    Curated Journey Highlights
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {pkg.highlights.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Action Row */}
                <div className="pt-3 flex items-center justify-between gap-4 border-t border-slate-100">
                  <div>
                    <span className="text-[11px] text-slate-500 block uppercase tracking-wider font-bold">Starting From</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-[#b88628]">
                        ₹{pkg.discountedPrice?.toLocaleString('en-IN') || pkg.startingPrice.toLocaleString('en-IN')}
                      </span>
                      {pkg.discountedPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{pkg.startingPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                      <span className="text-[11px] text-slate-500 font-medium">/ couple</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActivePackageModal(pkg)}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-semibold transition-all cursor-pointer"
                    >
                      View Itinerary
                    </button>
                    <button
                      onClick={() => handleBookPackage(pkg)}
                      className="btn-luxury px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Package Day-wise Itinerary Modal */}
      {activePackageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl relative my-8 max-h-[92vh] flex flex-col">
            {/* Header with image */}
            <div className="relative h-60 sm:h-72 shrink-0">
              <img
                src={activePackageModal.coverImage}
                alt={activePackageModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />

              <button
                onClick={() => setActivePackageModal(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 transition-all cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-3 py-1 rounded-full bg-[#b88628] text-white text-xs font-bold uppercase shadow-sm">
                  {activePackageModal.duration}
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white drop-shadow mt-1">
                  {activePackageModal.title}
                </h2>
                <p className="text-xs sm:text-sm text-white/90">
                  {activePackageModal.route.join(' • ')}
                </p>
              </div>
            </div>

            {/* Scrollable Day-wise itinerary & inclusions */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-grow text-slate-700">
              {/* Day by Day Accordion/Cards */}
              <div className="space-y-4">
                <h4 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#b88628]" />
                  Day-by-Day Comprehensive Itinerary
                </h4>

                <div className="space-y-3">
                  {activePackageModal.dayWiseItinerary.map((day) => (
                    <div
                      key={day.day}
                      className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-[#0f4332] text-xs font-bold uppercase">
                          Day 0{day.day}: {day.location}
                        </span>
                      </div>
                      <h5 className="font-serif text-sm font-bold text-slate-900">{day.title}</h5>
                      <p className="text-xs text-slate-600 leading-relaxed">{day.description}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {day.activities.map((act, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-lg bg-white border border-slate-200 text-[10px] text-slate-700 font-medium"
                          >
                            ✓ {act}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 space-y-2">
                  <h5 className="font-serif text-sm font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Package Inclusions
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {activePackageModal.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-200 space-y-2">
                  <h5 className="font-serif text-sm font-bold text-rose-800 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    Exclusions
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {activePackageModal.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold">•</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal footer CTA */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 block uppercase font-bold">All-Inclusive Price:</span>
                  <span className="font-serif text-2xl font-bold text-[#b88628]">
                    ₹{activePackageModal.discountedPrice?.toLocaleString('en-IN') || activePackageModal.startingPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-500"> / couple</span>
                </div>

                <button
                  onClick={() => handleBookPackage(activePackageModal)}
                  className="w-full sm:w-auto btn-luxury px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Reserve & Pay Advance for this Package</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
