import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  ShieldCheck,
  HeartHandshake,
  Award,
  Users,
  MapPin,
  CheckCircle,
  PhoneCall
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { businessInfo, websiteContent, setActiveTripModal } = useApp();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8faf9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text & Heritage */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-[#0f4332] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#b88628]" />
              <span>THE SOUL OF KASHMIRÉ VOYAGES</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f231b] tracking-tight leading-tight">
              {websiteContent.aboutTitle}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              <p>{websiteContent.aboutParagraph1}</p>
              <p>{websiteContent.aboutParagraph2}</p>
              <p>
                Headquartered in Shalina, Budgam—just minutes from Sheikh ul-Alam Airport—we personally oversee every airport reception, mountain vehicle inspection, and houseboat check-in. You never deal with call-center intermediaries; our founders and licensed mountain concierges remain on call throughout your entire holiday.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-1.5 hover:border-[#b88628]/40 transition-colors">
                <div className="flex items-center gap-2 text-[#b88628]">
                  <ShieldCheck className="w-5 h-5 text-[#0f4332]" />
                  <h4 className="font-serif font-bold text-sm text-slate-900">Private Executive Fleet</h4>
                </div>
                <p className="text-[11px] text-slate-600">
                  Clean, well-maintained Innova Crystas, 4x4 Scorpios, and sedans with certified mountain chauffeurs.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-1.5 hover:border-[#b88628]/40 transition-colors">
                <div className="flex items-center gap-2 text-[#b88628]">
                  <Award className="w-5 h-5 text-[#0f4332]" />
                  <h4 className="font-serif font-bold text-sm text-slate-900">Handpicked Luxury Stays</h4>
                </div>
                <p className="text-[11px] text-slate-600">
                  Personally vetted cedar houseboats, central heating reliability, and mountain view suites.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-1.5 hover:border-[#b88628]/40 transition-colors">
                <div className="flex items-center gap-2 text-[#b88628]">
                  <HeartHandshake className="w-5 h-5 text-[#0f4332]" />
                  <h4 className="font-serif font-bold text-sm text-slate-900">Zero Hidden Markups</h4>
                </div>
                <p className="text-[11px] text-slate-600">
                  Transparent itemized pricing covering driver night allowances, fuel, tolls, and parking.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-1.5 hover:border-[#b88628]/40 transition-colors">
                <div className="flex items-center gap-2 text-[#b88628]">
                  <Users className="w-5 h-5 text-[#0f4332]" />
                  <h4 className="font-serif font-bold text-sm text-slate-900">24/7 Mountain Escort</h4>
                </div>
                <p className="text-[11px] text-slate-600">
                  Immediate assistance for snow chains, Gondola slot bookings, hospital needs, and weather alerts.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveTripModal(true)}
                className="btn-luxury px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow cursor-pointer"
              >
                Plan Your Journey with Us
              </button>
              <a
                href={`tel:${businessInfo.phone}`}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-2 transition-all shadow-xs"
              >
                <PhoneCall className="w-4 h-4 text-[#0f4332]" />
                <span>Speak with Concierge</span>
              </a>
            </div>
          </div>

          {/* Right Imagery Collage */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80"
                alt="Kashmiri Mehman-Nawazi"
                className="w-full h-[450px] sm:h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Floating Testimonial Pill */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0f4332] flex items-center justify-center text-[#e5be73] shrink-0 font-serif font-bold text-sm">
                    KV
                  </div>
                  <div>
                    <p className="text-xs text-slate-900 font-serif italic font-medium">
                      "Gar firdaus bar roo-e zameen ast, hameen ast-o hameen ast-o hameen ast."
                    </p>
                    <p className="text-[10px] text-[#b88628] font-bold tracking-wider uppercase mt-0.5">
                      — If there is a paradise on earth, it is this, it is this, it is this.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office badge */}
            <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-xl text-xs text-slate-800 font-semibold">
              <MapPin className="w-4 h-4 text-[#0f4332]" />
              <span>Based in Shalina, Budgam, J&K</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
