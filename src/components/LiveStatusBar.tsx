import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CloudSnow,
  Sun,
  ShieldAlert,
  Car,
  Clock,
  Compass,
  ChevronRight,
  Info,
  Thermometer
} from 'lucide-react';

export const LiveStatusBar: React.FC = () => {
  const { liveStatus } = useApp();
  const [selectedPlace, setSelectedPlace] = useState<string>('Gulmarg');

  const current = liveStatus[selectedPlace] || liveStatus['Gulmarg'];

  return (
    <section className="bg-white border-y border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8 relative overflow-hidden shadow-xs">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          {/* Header & Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0f4332]">
                Live Mountain Intel
              </span>
            </div>

            {/* Destination selector chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              {Object.keys(liveStatus).map((place) => {
                const isSelected = selectedPlace === place;
                return (
                  <button
                    key={place}
                    onClick={() => setSelectedPlace(place)}
                    className={`text-xs px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0f4332] text-white font-bold shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {place}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Last updated badge */}
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#b88628]" />
            <span>Updated by Operations: {current.lastUpdated}</span>
          </div>
        </div>

        {/* Live Detail Grid for Selected Destination */}
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* Weather & Temp */}
          <div className="bg-[#f8faf9] border border-slate-200 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
              <Sun className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-bold">
                Atmosphere & Temp
              </span>
              <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>{current.weather}</span>
                <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-mono text-[11px] font-semibold">
                  {current.temp}
                </span>
              </p>
            </div>
          </div>

          {/* Snow Conditions */}
          <div className="bg-[#f8faf9] border border-slate-200 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0">
              <CloudSnow className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-bold">
                Snow Depth & Terrain
              </span>
              <p className="text-xs font-bold text-slate-900 truncate" title={current.snowStatus}>
                {current.snowStatus}
              </p>
            </div>
          </div>

          {/* Road & Chain Advisory */}
          <div className="bg-[#f8faf9] border border-slate-200 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0f4332] shrink-0">
              <Car className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-bold">
                Highway & 4x4 Advisory
              </span>
              <p className="text-xs font-bold text-slate-900 truncate" title={current.roadStatus}>
                {current.roadStatus}
              </p>
            </div>
          </div>

          {/* Cable Car / Tourism Status */}
          <div className="bg-[#f8faf9] border border-slate-200 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-[#b88628] shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-bold">
                Gondola / Excursion State
              </span>
              <p className="text-xs font-bold text-slate-900 truncate" title={current.gondolaStatus || `Crowd: ${current.crowd}`}>
                {current.gondolaStatus || `Visitors: ${current.crowd}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
