import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Sun,
  CloudSnow,
  Sparkles,
  Thermometer,
  ShieldCheck,
  CheckCircle,
  Wind
} from 'lucide-react';

export const SeasonalGuide: React.FC = () => {
  const { websiteContent } = useApp();
  const [activeSeason, setActiveSeason] = useState<'spring' | 'summer' | 'autumn' | 'winter'>('winter');

  const seasons = [
    {
      id: 'winter',
      name: 'Winter Wonderland',
      kashmiri: 'Wandah (Deep Winter)',
      months: 'December to February',
      temp: '-8°C to +7°C',
      headline: 'Fluffy Himalayan Powders, Apharwat Skiing & Frozen Cascades',
      image: websiteContent.seasonalWinterImage,
      highlights: [
        'Apharwat Peak cable car ride amidst 6-8 feet snow fields',
        'Certified skiing and snowboarding courses in Gulmarg',
        'Drung frozen icicle waterfall spectacle',
        'Traditional Kangri warming, steaming Harissa breakfast, and midnight snow in houseboats'
      ],
      clothing: ['Heavy down jackets / parkas', 'Thermal innerwear (upper & lower)', 'Waterproof snow boots with grip', 'Woolen gloves, balaclava & fleece caps']
    },
    {
      id: 'spring',
      name: 'Spring Blossom',
      kashmiri: 'Sont (Awakening)',
      months: 'March to May',
      temp: '+10°C to +22°C',
      headline: 'Asia’s Largest Tulip Garden, Badamwari Almond Blooms & Melting Glacial Streams',
      image: websiteContent.seasonalSpringImage,
      highlights: [
        'Over 1.5 million tulips in 68 varieties at Indira Gandhi Memorial Tulip Garden',
        'Fragrant pink and white almond blossoms at Badamwari Srinagar',
        'Fresh alpine breezes and blooming mustard yellow fields',
        'Mild weather perfect for elder family travelers and honeymoon couples'
      ],
      clothing: ['Light woolens & cardigans', 'Comfortable walking sneakers', 'Sun hat & sunglasses', 'Light evening jackets']
    },
    {
      id: 'summer',
      name: 'Verdant Alpine Summer',
      kashmiri: 'Grishim (The Golden Valley)',
      months: 'June to August',
      temp: '+15°C to +28°C',
      headline: 'Velvet Meadow Downlands, Whitewater Sindh Rafting & High Altitude Treks',
      image: websiteContent.seasonalSummerImage,
      highlights: [
        'Escape mainland heatwaves to cool mountain pine valleys',
        'Rafting on roaring Lidder river in Pahalgam and Sindh in Sonamarg',
        'Great Lakes alpine high-altitude trek circuits',
        'Camping under starlit northern skies in Gurez and Doodhpathri'
      ],
      clothing: ['Breathable cotton t-shirts & trousers', 'Light windcheater for high passes', 'Sturdy hiking shoes', 'UV protection sunscreen']
    },
    {
      id: 'autumn',
      name: 'The Golden Chinar Autumn',
      kashmiri: 'Harud (Harvest & Gold)',
      months: 'September to November',
      temp: '+5°C to +18°C',
      headline: 'Burning Amber Chinar Foliage, Saffron Plucking & Crisp Crystal Skies',
      image: websiteContent.seasonalAutumnImage,
      highlights: [
        'Naseem Bagh & Char Chinar glowing with scarlet and amber leaves',
        'Saffron blossom festivals in the plateaus of Pampore',
        'Crisp mountain air offering the sharpest photography horizons',
        'Fresh walnuts, almonds, and crisp Honeycrisp apples fresh from trees'
      ],
      clothing: ['Medium woolens, hoodies & sweaters', 'Warm scarves & pashmina shawls', 'Comfortable boots', 'Moisturizer & lip balm']
    }
  ];

  const current = seasons.find((s) => s.id === activeSeason) || seasons[0];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8faf9] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-[#0f4332] text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-[#b88628]" />
            <span>KASHMIR THROUGH THE FOUR SEASONS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f231b] tracking-tight">
            {websiteContent.seasonalSectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            {websiteContent.seasonalSectionDesc}
          </p>
        </div>

        {/* Season Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
          {seasons.map((s) => {
            const isActive = activeSeason === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSeason(s.id as any)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0f4332] border-[#0f4332] text-white shadow-lg'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold uppercase ${isActive ? 'text-[#e5be73]' : 'text-slate-500'}`}>
                    {s.name.split(' ')[0]}
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isActive ? 'bg-black/30 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {s.temp.split('to')[0]}
                  </span>
                </div>
                <h4 className={`font-serif text-base font-bold ${isActive ? 'text-white' : 'text-slate-900'}`}>{s.name}</h4>
                <p className={`text-[11px] ${isActive ? 'text-white/80' : 'text-slate-500'}`}>{s.months}</p>
              </button>
            );
          })}
        </div>

        {/* Active Season Featured Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="relative min-h-[350px] lg:min-h-[480px]">
            <img
              src={current.image}
              alt={current.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/60" />

            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/20 text-[#0f4332] text-xs font-bold uppercase shadow-sm">
                {current.kashmiri}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-2 drop-shadow">
                {current.name}
              </h3>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
                  <span className="text-slate-500 font-normal">Duration: </span>{current.months}
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
                  <span className="text-amber-700 font-normal">Atmosphere: </span>{current.temp}
                </div>
              </div>

              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#0f231b] leading-snug">
                {current.headline}
              </h4>

              {/* Highlights */}
              <div className="space-y-2 pt-2">
                <span className="text-xs uppercase tracking-wider text-[#b88628] font-bold block">
                  Signature Seasonal Experiences
                </span>
                <ul className="space-y-2">
                  {current.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What to Pack */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#0f4332] font-bold flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-[#b88628]" />
                  What to Pack & Wear
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {current.clothing.map((cloth, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                      <span className="text-[#b88628] font-bold">•</span>
                      <span>{cloth}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Need personal season advice?</span>
              <span className="text-xs font-bold text-[#b88628]">Call Concierge: +91 9622229622</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
