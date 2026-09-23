import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FoodGuideItem } from '../types';
import {
  Sparkles,
  Flame,
  Coffee,
  CheckCircle,
  MapPin,
  Tag
} from 'lucide-react';

export const FoodGuideSection: React.FC = () => {
  const { websiteContent, foodGuide } = useApp();
  const [activeTab, setActiveTab] = useState<'All' | 'Non-Vegetarian' | 'Vegetarian' | 'Beverage'>('All');

  const filtered = foodGuide.filter((item) => {
    if (activeTab === 'All') return true;
    return item.type === activeTab;
  });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-[#0f4332] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#b88628]" />
              <span>THE IMPERIAL WAZWAN & MOUNTAIN GASTRONOMY</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f231b] tracking-tight">
              {websiteContent.foodGuideTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              {websiteContent.foodGuideDesc}
            </p>
          </div>

          <div className="hidden md:block w-64 h-32 rounded-2xl overflow-hidden border border-slate-200 shadow-sm shrink-0">
            <img src={websiteContent.foodGuideBannerImage} alt="Kashmiri culinary heritage" className="w-full h-full object-cover" />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-200 shadow-xs">
            {(['All', 'Non-Vegetarian', 'Beverage'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#0f4332] text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden hover:border-[#b88628]/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between group"
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Spice Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/20 text-xs text-amber-300 font-medium flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>{dish.spiceLevel}</span>
                </div>

                {/* Names */}
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-xs text-[#e5be73] font-serif block font-semibold">
                    {dish.kashmiriName}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white drop-shadow">
                    {dish.name}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {dish.description}
                </p>

                {/* Where to try */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1 text-xs">
                  <span className="text-[10px] uppercase text-[#0f4332] font-bold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#b88628]" /> Recommended Local Spot
                  </span>
                  <p className="text-slate-800 font-medium">{dish.whereToTry}</p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                  <span className="text-slate-500 font-medium">Typical Price:</span>
                  <span className="font-bold text-[#b88628]">{dish.approxPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Wazwan Traem Cultural Banner */}
        <div className="mt-12 bg-gradient-to-r from-emerald-50 via-emerald-100/50 to-emerald-50 rounded-3xl border border-emerald-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#0f231b]">
              Private In-Houseboat Traditional Traem Banquet
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We arrange an authentic four-person carved copper Traem dining experience served by certified master Wazas inside your luxury houseboat or garden suite, with royal handwashing ceremony (Tash-t-Naer).
            </p>
          </div>
          <div className="shrink-0">
            <a
              href="https://wa.me/919622229622?text=Hello%20Kashmire%20Voyages%2C%20I%20want%20to%20reserve%20a%20private%20royal%20Wazwan%20dinner"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow inline-block"
            >
              Reserve Wazwan Banquet
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
