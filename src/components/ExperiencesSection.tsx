import React from 'react';
import { useApp } from '../context/AppContext';
import { ExperienceItem } from '../types';
import {
  Sparkles,
  Clock,
  MapPin,
  CheckCircle,
  ArrowRight,
  Compass
} from 'lucide-react';

export const ExperiencesSection: React.FC = () => {
  const { experiences, websiteContent, setActiveTripModal } = useApp();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-[#0f4332] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#b88628]" />
            <span>AUTHENTIC EXPERIENCES & PRIVATE SESSIONS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f231b] tracking-tight">
            {websiteContent.experiencesSectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            {websiteContent.experiencesSectionDesc}
          </p>
        </div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden hover:border-[#b88628]/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between group"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Duration Tag */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/20 text-xs text-white flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#e5be73]" />
                  <span>{exp.duration}</span>
                </div>

                {/* Location */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] uppercase font-bold text-[#e5be73] flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {exp.location.split(',')[0]}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white line-clamp-1 drop-shadow">
                    {exp.title}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {exp.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-[11px] text-slate-700">
                  {exp.highlights.slice(0, 2).map((item, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <CheckCircle className="w-3 h-3 text-emerald-600 mt-0.5 shrink-0" />
                      <span className="line-clamp-1 font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Price</span>
                    <span className="font-serif text-lg font-bold text-[#b88628]">
                      ₹{exp.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-500"> / session</span>
                  </div>

                  <button
                    onClick={() => setActiveTripModal(true)}
                    className="btn-luxury px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm flex items-center gap-1"
                  >
                    <span>Add to Trip</span>
                    <ArrowRight className="w-3 h-3" />
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
