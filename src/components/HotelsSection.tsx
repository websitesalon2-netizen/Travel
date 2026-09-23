import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Hotel } from '../types';
import {
  Building2,
  Star,
  MapPin,
  CheckCircle,
  Sparkles,
  Wifi,
  Waves,
  Mountain,
  Flame,
  Coffee,
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface HotelsSectionProps {
  onSelectHotelForTrip?: (hotel: Hotel) => void;
}

export const HotelsSection: React.FC<HotelsSectionProps> = ({
  onSelectHotelForTrip
}) => {
  const { hotels, setActiveTripModal } = useApp();
  const [filterLocation, setFilterLocation] = useState<string>('all');

  const locations = [
    { id: 'all', label: 'All Stays' },
    { id: 'Srinagar', label: 'Srinagar (Lake Houseboats & Suites)' },
    { id: 'Gulmarg', label: 'Gulmarg (Ski Resorts)' },
    { id: 'Pahalgam', label: 'Pahalgam (Riverfront Lodges)' },
    { id: 'Sonamarg', label: 'Sonamarg (Glacier Chalets)' }
  ];

  const filtered = hotels.filter((h) => {
    if (filterLocation === 'all') return true;
    return h.location.toLowerCase().includes(filterLocation.toLowerCase());
  });

  const handleSelectHotel = (hotel: Hotel) => {
    if (onSelectHotelForTrip) {
      onSelectHotelForTrip(hotel);
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
              <Building2 className="w-3.5 h-3.5 text-[#b88628]" />
              <span>HANDPICKED HIMALAYAN RETREATS & HERITAGE PALACES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f231b] tracking-tight">
              Hotels, Chalets & Luxury Houseboats
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              Every property is audited in-person for heating reliability, mountain views, cedar wood hygiene, and authentic Kashmiri service.
            </p>
          </div>

          {/* Location Filter */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setFilterLocation(loc.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  filterLocation === loc.id
                    ? 'bg-[#0f4332] text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden hover:border-[#b88628]/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between group"
            >
              {/* Image & Badges */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={hotel.coverImage}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                {/* Star rating top left */}
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/20">
                  <div className="flex text-amber-400">
                    {[...Array(hotel.starRating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-white text-xs font-bold ml-1">{hotel.starRating}-Star</span>
                </div>

                {/* View Badge */}
                <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                  {hotel.lakeView && (
                    <span className="px-2.5 py-0.5 rounded-md bg-cyan-900/90 border border-cyan-400 text-cyan-100 text-[10px] font-bold uppercase flex items-center gap-1">
                      <Waves className="w-3 h-3" /> Lake Front
                    </span>
                  )}
                  {hotel.mountainView && (
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-900/90 border border-emerald-400 text-emerald-100 text-[10px] font-bold uppercase flex items-center gap-1">
                      <Mountain className="w-3 h-3" /> Mountain View
                    </span>
                  )}
                </div>

                {/* Location text bottom */}
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[11px] text-[#e5be73] font-semibold uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {hotel.location}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white leading-snug drop-shadow">
                    {hotel.name}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                {/* Amenities pills */}
                <div className="flex flex-wrap gap-1.5">
                  {hotel.amenities.slice(0, 4).map((amenity, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-lg bg-slate-50 text-slate-700 text-[11px] border border-slate-200 font-medium"
                    >
                      ✓ {amenity}
                    </span>
                  ))}
                  {hotel.amenities.length > 4 && (
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-50 text-[#b88628] text-[11px] font-bold">
                      +{hotel.amenities.length - 4} more
                    </span>
                  )}
                </div>

                {/* Sample Room Types preview */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">
                    Featured Room Category
                  </span>
                  <p className="font-bold text-slate-900">{hotel.roomTypes[0]?.name}</p>
                  <p className="text-[11px] text-slate-500">
                    Capacity: {hotel.roomTypes[0]?.capacity} • {hotel.breakfastIncluded ? 'Breakfast Included' : 'European Plan'}
                  </p>
                </div>

                {/* Price & CTA */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Nightly Tariff</span>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-[#b88628]">
                      ₹{hotel.pricePerNight.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium"> / night</span>
                  </div>

                  <button
                    onClick={() => handleSelectHotel(hotel)}
                    className="btn-luxury px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                  >
                    <span>Add to Trip</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
