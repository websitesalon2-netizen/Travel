import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Destination } from '../types';
import {
  MapPin,
  Compass,
  Clock,
  Navigation,
  Sparkles,
  Mountain,
  Heart,
  ChevronRight,
  X,
  CheckCircle,
  AlertCircle,
  Calendar,
  CloudSnow,
  TrendingUp,
  Shield
} from 'lucide-react';

interface DestinationsSectionProps {
  onSelectDestinationForTrip?: (destName: string) => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  onSelectDestinationForTrip
}) => {
  const { destinations, websiteContent, setActiveTripModal } = useApp();
  const [filter, setFilter] = useState<'all' | 'popular' | 'offbeat'>('all');
  const [selectedDestModal, setSelectedDestModal] = useState<Destination | null>(null);

  const filtered = destinations.filter((dest) => {
    if (filter === 'popular') return dest.isPopular;
    if (filter === 'offbeat') return dest.isOffbeat;
    return true;
  });

  const handlePlanTripTo = (dest: Destination) => {
    setSelectedDestModal(null);
    if (onSelectDestinationForTrip) {
      onSelectDestinationForTrip(dest.name);
    }
    setActiveTripModal(true);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8faf9] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-[#0f4332] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#b88628]" />
              <span>OFFICIAL JKTDC & LOCAL KASHMIR CIRCUIT</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f231b] tracking-tight">
              {websiteContent.destinationSectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              {websiteContent.destinationSectionDesc}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 self-start md:self-end shadow-sm">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#0f4332] text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              All Regions ({destinations.length})
            </button>
            <button
              onClick={() => setFilter('popular')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                filter === 'popular'
                  ? 'bg-[#0f4332] text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Popular Icons
            </button>
            <button
              onClick={() => setFilter('offbeat')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                filter === 'offbeat'
                  ? 'bg-[#0f4332] text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Offbeat Valleys
            </button>
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden group hover:border-[#b88628]/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Image & Badges */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dest.bannerImage || dest.images[0]}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                {/* Tags */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {dest.isPopular && (
                    <span className="px-2.5 py-1 rounded-md bg-[#0f4332]/90 backdrop-blur-sm border border-emerald-600 text-white text-[11px] font-bold tracking-wider uppercase">
                      Popular Icon
                    </span>
                  )}
                  {dest.isOffbeat && (
                    <span className="px-2.5 py-1 rounded-md bg-amber-800/90 backdrop-blur-sm border border-amber-500 text-amber-100 text-[11px] font-bold tracking-wider uppercase">
                      Hidden Gem
                    </span>
                  )}
                </div>

                {/* Altitude Tag */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/20 text-xs font-mono text-cyan-200 flex items-center gap-1">
                  <Mountain className="w-3.5 h-3.5" />
                  <span>{dest.altitude.split('(')[0]}</span>
                </div>

                {/* Location text bottom left */}
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-serif text-2xl font-bold text-white drop-shadow">
                      {dest.name}
                    </h3>
                    {dest.kashmiriName && (
                      <span className="text-xs text-[#e5be73] font-serif font-medium">
                        {dest.kashmiriName.split('(')[0]}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/90 line-clamp-1">{dest.tagline}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {dest.description}
                </p>

                {/* Quick specs pill grid */}
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#f8faf9] p-3.5 rounded-2xl border border-slate-200/80">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Drive from Srinagar</span>
                    <span className="font-semibold text-slate-800">{dest.driveTime} ({dest.distanceFromSrinagar})</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Best Season</span>
                    <span className="font-semibold text-slate-800 line-clamp-1">{dest.bestTime.split('|')[0]}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Recommended Stay</span>
                    <span className="font-semibold text-slate-800">{dest.recommendedStay}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Estimated Budget</span>
                    <span className="font-bold text-[#b88628]">{dest.estimatedCost.split('/')[0]}</span>
                  </div>
                </div>

                {/* Activities chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {dest.activities.slice(0, 3).map((act, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-900 text-[11px] border border-emerald-200/60 font-medium"
                    >
                      {act}
                    </span>
                  ))}
                  {dest.activities.length > 3 && (
                    <span className="px-2 py-0.5 rounded-lg bg-amber-50 text-[#b88628] text-[11px] font-bold">
                      +{dest.activities.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedDestModal(dest)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>View Destination Guide</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  <button
                    onClick={() => handlePlanTripTo(dest)}
                    className="px-4 py-2.5 rounded-xl btn-luxury text-xs font-bold transition-all cursor-pointer shadow-sm"
                    title={`Plan trip to ${dest.name}`}
                  >
                    Plan Trip
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive Destination Detail Modal */}
      {selectedDestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl relative my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header Bar with Close */}
            <div className="relative h-64 sm:h-80 shrink-0">
              <img
                src={selectedDestModal.bannerImage || selectedDestModal.images[0]}
                alt={selectedDestModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30" />

              <button
                onClick={() => setSelectedDestModal(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 transition-all cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded bg-[#b88628] text-white text-xs font-bold uppercase">
                    JKTDC Verified Circuit
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-black/60 border border-white/20 text-cyan-200 text-xs font-mono">
                    Altitude: {selectedDestModal.altitude}
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white drop-shadow">
                  {selectedDestModal.name}
                </h2>
                <p className="text-sm text-[#e5be73] font-medium">{selectedDestModal.tagline}</p>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-grow text-slate-700 text-xs sm:text-sm">
              {/* Summary overview */}
              <div>
                <h4 className="font-serif text-lg font-bold text-slate-900 mb-2">Overview</h4>
                <p className="text-slate-600 leading-relaxed">{selectedDestModal.description}</p>
              </div>

              {/* Key Specs Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block font-bold">Distance</span>
                  <span className="font-bold text-slate-900">{selectedDestModal.distanceFromSrinagar}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block font-bold">Drive Time</span>
                  <span className="font-bold text-slate-900">{selectedDestModal.driveTime}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block font-bold">Stay Duration</span>
                  <span className="font-bold text-slate-900">{selectedDestModal.recommendedStay}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block font-bold">Budget Range</span>
                  <span className="font-bold text-[#b88628]">{selectedDestModal.estimatedCost}</span>
                </div>
              </div>

              {/* Things To Do & Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 bg-[#f8faf9] p-4 rounded-2xl border border-slate-200">
                  <h5 className="font-serif text-base font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Top Experiences & Activities
                  </h5>
                  <ul className="space-y-2">
                    {selectedDestModal.thingsToDo.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#b88628] mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 bg-[#f8faf9] p-4 rounded-2xl border border-slate-200">
                  <h5 className="font-serif text-base font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#b88628]" />
                    Nearby Attractions
                  </h5>
                  <ul className="space-y-2">
                    {selectedDestModal.nearbyAttractions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#b88628] mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* How To Reach & Local Secret Tip */}
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h5 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-1 text-[#0f4332]">
                    <Navigation className="w-4 h-4 text-[#b88628]" />
                    How to Reach
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">{selectedDestModal.howToReach}</p>
                </div>

                <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200">
                  <h5 className="font-serif text-sm font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-4 h-4 text-[#b88628]" />
                    Kashmiré Voyages Insider Tip
                  </h5>
                  <p className="text-xs text-amber-950 leading-relaxed">{selectedDestModal.hiddenGemTip}</p>
                </div>
              </div>

              {/* Bottom Action Footer inside Modal */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 block font-medium">Snow & Weather Status:</span>
                  <span className="text-xs font-bold text-emerald-800">{selectedDestModal.snowStatus}</span>
                </div>
                <button
                  onClick={() => handlePlanTripTo(selectedDestModal)}
                  className="w-full sm:w-auto btn-luxury px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Build Custom Trip to {selectedDestModal.name}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
