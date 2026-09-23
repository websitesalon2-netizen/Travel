import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  Sparkles,
  MapPin,
  Compass,
  ArrowRight
} from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const { timelineItems, themeSettings, setActiveTripModal } = useApp();

  const activeItems = timelineItems.filter((item) => item.active);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-[#0f4332] text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>DYNAMIC DAY-IN-PARADISE TIMELINE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f231b] tracking-tight">
            A Day with Kashmiré Voyages
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Experience how seamlessly we synchronize your morning lake mists, private mountain ascent, gourmet dining, and cozy starlit hearths.
          </p>
        </div>

        {/* Timeline Line & Items */}
        <div className="relative">
          {/* Vertical Center Glow Line */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#e5be73]/20 via-[#b88628]/40 to-[#e5be73]/20" />

          <div className="space-y-12">
            {activeItems.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  style={{
                    animationDuration: `${themeSettings.timelineAnimationDuration}s`,
                    animationDelay: `${index * themeSettings.timelineAnimationDelay}s`
                  }}
                >
                  {/* Content Card Side */}
                  <div className={`w-full lg:w-1/2 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="bg-[#f8faf9] p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-[#b88628]/50 hover:shadow-md transition-all space-y-3 group">
                      <div className={`flex items-center gap-2 ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>
                        <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-[#0f4332] text-xs font-mono font-bold tracking-wider shadow-2xs">
                          {item.time}
                        </span>
                        {item.duration && (
                          <span className="text-[11px] text-slate-500 font-medium">
                            • {item.duration}
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0f231b] group-hover:text-[#0f4332] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>

                      <div className={`flex flex-wrap items-center gap-2 pt-1 ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>
                        {item.location && (
                          <span className="text-[11px] text-[#b88628] font-semibold flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {item.location}
                          </span>
                        )}
                        {item.activity && (
                          <span className="px-2 py-0.5 rounded bg-white text-[10px] text-slate-700 font-medium border border-slate-200">
                            {item.activity}
                          </span>
                        )}
                      </div>

                      {item.buttonText && (
                        <div className={`pt-2 flex ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}>
                          <button
                            onClick={() => setActiveTripModal(true)}
                            className="text-xs text-[#0f4332] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <span>{item.buttonText}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Center Node Badge */}
                  <div className="relative shrink-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#b88628] text-[#0f4332] flex items-center justify-center shadow-md z-10">
                      <span className="font-serif font-bold text-sm">0{index + 1}</span>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div className="w-full lg:w-1/2">
                    {item.image ? (
                      <div className="relative h-56 sm:h-64 rounded-3xl overflow-hidden border border-slate-200 shadow-md group">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </div>
                    ) : (
                      <div className="h-48 rounded-3xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs">
                        Scenic Moment
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
