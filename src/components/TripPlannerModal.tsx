import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Sparkles,
  Calendar,
  Users,
  MapPin,
  Car,
  Hotel,
  ShieldCheck,
  CheckCircle,
  CreditCard,
  QrCode,
  ArrowRight,
  ArrowLeft,
  Clock,
  ChevronRight,
  Loader2,
  FileCheck
} from 'lucide-react';

interface TripPlannerModalProps {
  onBookingSuccess?: (referenceNumber: string) => void;
}

export const TripPlannerModal: React.FC<TripPlannerModalProps> = ({ onBookingSuccess }) => {
  const {
    activeTripModal,
    setActiveTripModal,
    destinations,
    businessInfo,
    paymentSettings,
    addBooking,
    themeSettings
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const [loadingAI, setLoadingAI] = useState<boolean>(false);

  // Planner Form State
  const [durationDays, setDurationDays] = useState<number>(5);
  const [travelMonth, setTravelMonth] = useState<string>('October 2026');
  const [travelDate, setTravelDate] = useState<string>('2026-10-15');
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);

  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([
    'Srinagar',
    'Gulmarg',
    'Pahalgam'
  ]);

  const [hotelCategory, setHotelCategory] = useState<'3-Star Deluxe' | '4-Star Luxury' | '5-Star Heritage Palace' | 'Luxury Dal Houseboat'>('4-Star Luxury');
  const [vehicleType, setVehicleType] = useState<string>('Innova Crysta (Chauffeured)');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'Sunset Shikara Ride on Dal Lake',
    'Gulmarg Gondola Phase 1 & 2 Pass Assistance'
  ]);

  // Guest Details
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [pickupPoint, setPickupPoint] = useState<string>('Srinagar Airport (SXR)');

  // Generated Itinerary
  const [generatedItinerary, setGeneratedItinerary] = useState<any[]>([]);

  // Payment State
  const [utrNumber, setUtrNumber] = useState<string>('');
  const [paymentDone, setPaymentDone] = useState<boolean>(false);
  const [confirmedRef, setConfirmedRef] = useState<string>('');

  if (!activeTripModal) return null;

  // Toggle destination
  const toggleDestination = (destName: string) => {
    if (selectedDestinations.includes(destName)) {
      if (selectedDestinations.length > 1) {
        setSelectedDestinations(selectedDestinations.filter((d) => d !== destName));
      }
    } else {
      setSelectedDestinations([...selectedDestinations, destName]);
    }
  };

  // Toggle add-on
  const toggleAddon = (addon: string) => {
    if (selectedAddons.includes(addon)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== addon));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  // Dynamic price calculation
  const calculateTotal = () => {
    let basePerDay = 3800; // hotel + car per day base
    if (hotelCategory === '4-Star Luxury') basePerDay = 6200;
    if (hotelCategory === '5-Star Heritage Palace') basePerDay = 12500;
    if (hotelCategory === 'Luxury Dal Houseboat') basePerDay = 5800;

    let vehicleCostPerDay = 3200;
    if (vehicleType.includes('Scorpio')) vehicleCostPerDay = 4000;
    if (vehicleType.includes('Tempo')) vehicleCostPerDay = 5500;

    const nights = Math.max(1, durationDays - 1);
    const staysTotal = basePerDay * nights;
    const transportTotal = vehicleCostPerDay * durationDays;
    const addonsTotal = selectedAddons.length * 1500;
    const total = staysTotal + transportTotal + addonsTotal;
    const advance = Math.round(total * 0.3); // 30% advance
    return { total, advance, balance: total - advance };
  };

  const { total, advance, balance } = calculateTotal();

  // Call AI or local intelligent algorithm to construct itinerary
  const handleGenerateItinerary = async () => {
    setLoadingAI(true);
    try {
      const response = await fetch('/api/ai/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          duration: `${durationDays} Days / ${durationDays - 1} Nights`,
          travelers: `${adults} Adults, ${children} Children`,
          interests: selectedDestinations.join(', '),
          budget: hotelCategory,
          season: travelMonth
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.itinerary && Array.isArray(data.itinerary)) {
          setGeneratedItinerary(data.itinerary);
          setLoadingAI(false);
          setStep(3);
          return;
        }
      }
    } catch (e) {
      console.warn('Backend AI offline, generating native Kashmir itinerary:', e);
    }

    // Fallback native generator
    const nativeDays = Array.from({ length: durationDays }).map((_, i) => {
      const dayNum = i + 1;
      const targetDest = selectedDestinations[i % selectedDestinations.length] || 'Srinagar';
      return {
        day: dayNum,
        title: `Day ${dayNum}: Splendors of ${targetDest}`,
        morning: `Scenic breakfast and transfer to ${targetDest} viewpoints with private chauffeur.`,
        afternoon: `Explore iconic valleys, pine meadows, and traditional local craftsmanship in ${targetDest}.`,
        evening: `Traditional Kehwa tea tasting, relaxing mountain dinner, and cozy night stay in ${hotelCategory}.`,
        stay: `${targetDest} Luxury Retreat`
      };
    });

    setGeneratedItinerary(nativeDays);
    setLoadingAI(false);
    setStep(3);
  };

  // Finalize booking
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newReference = `KSH-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    addBooking({
      referenceNumber: newReference,
      customerName: guestName,
      customerPhone: guestPhone,
      customerEmail: guestEmail || `${guestPhone}@kashmirevoyages.in`,
      pickupLocation: pickupPoint,
      travelDate,
      returnDate: new Date(new Date(travelDate).getTime() + (durationDays - 1) * 86400000).toISOString().split('T')[0],
      durationDays,
      destination: selectedDestinations.join(' • '),
      adults,
      children,
      vehicleType,
      hotelCategory,
      totalAmount: total,
      advanceAmount: advance,
      remainingAmount: balance,
      paymentMethod: 'UPI QR',
      paymentStatus: utrNumber ? 'Advance Paid' : 'Pending Verification',
      bookingStatus: 'Confirmed',
      utrNumber: utrNumber || `UPI-TXN-${Date.now().toString().slice(-6)}`,
      driverDetails: {
        name: 'Bashir Ahmad Lone',
        phone: '+91 9622229622',
        carModel: vehicleType.split('(')[0].trim(),
        numberPlate: 'JK 01 AK 7821',
        status: 'Assigned'
      },
      hotelDetails: {
        name: hotelCategory.includes('Houseboat') ? 'Royal Heritage Cedar Houseboat' : 'The Khyber Grand Retreat',
        roomType: 'Luxury Mountain View Suite',
        checkInTime: '12:00 PM'
      },
      itinerarySummary: generatedItinerary.map((d) => `Day ${d.day}: ${d.title}`).join(' | '),
      specialRequests: selectedAddons.join(', ')
    });

    setConfirmedRef(newReference);
    setPaymentDone(true);

    if (onBookingSuccess) {
      onBookingSuccess(newReference);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl relative my-6 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-slate-50 p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-[#0f4332]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0f231b]">
                Kashmir Trip Intelligence & Customizer
              </h3>
              <p className="text-[11px] text-[#b88628] font-bold uppercase tracking-wide">
                Step {step} of 4 • Handcrafted by Kashmiré Voyages Local Concierge
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTripModal(false)}
            className="p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Progress Indicator */}
        <div className="grid grid-cols-4 bg-slate-100 text-[11px] font-semibold border-b border-slate-200 text-center">
          <div className={`py-2.5 transition-colors ${step === 1 ? 'bg-white text-[#0f4332] font-bold border-b-2 border-[#0f4332]' : 'text-slate-500'}`}>
            1. Duration & Dates
          </div>
          <div className={`py-2.5 transition-colors ${step === 2 ? 'bg-white text-[#0f4332] font-bold border-b-2 border-[#0f4332]' : 'text-slate-500'}`}>
            2. Stays & Chauffeur
          </div>
          <div className={`py-2.5 transition-colors ${step === 3 ? 'bg-white text-[#0f4332] font-bold border-b-2 border-[#0f4332]' : 'text-slate-500'}`}>
            3. AI Itinerary Review
          </div>
          <div className={`py-2.5 transition-colors ${step === 4 ? 'bg-white text-[#0f4332] font-bold border-b-2 border-[#0f4332]' : 'text-slate-500'}`}>
            4. Confirm & Deposit
          </div>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-grow text-xs sm:text-sm text-slate-700">
          {/* STEP 1: Destinations, Duration, Dates & Travelers */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#0f231b] mb-1">
                  Select Your Kashmir Destinations
                </h4>
                <p className="text-xs text-slate-600 mb-3">
                  Choose the valleys and icons you wish to experience. We ensure logical mountain routing.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {destinations.map((d) => {
                    const isSelected = selectedDestinations.includes(d.name);
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => toggleDestination(d.name)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs">{d.name}</span>
                          {isSelected && <CheckCircle className="w-3.5 h-3.5 text-[#0f4332]" />}
                        </div>
                        <span className="text-[10px] text-slate-500 block mt-1">{d.altitude.split('(')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                    Trip Duration
                  </label>
                  <select
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0f4332]"
                  >
                    <option value={4}>4 Days / 3 Nights (Short Break)</option>
                    <option value={5}>5 Days / 4 Nights (Popular Classic)</option>
                    <option value={6}>6 Days / 5 Nights (Recommended Circuit)</option>
                    <option value={7}>7 Days / 6 Nights (Grand Valleys)</option>
                    <option value={9}>9 Days / 8 Nights (Deep Kashmir & Gurez)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                    Travel Start Date
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0f4332]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                    Travel Party
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-1/2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0f4332]"
                    >
                      <option value={1}>1 Adult</option>
                      <option value={2}>2 Adults</option>
                      <option value={3}>3 Adults</option>
                      <option value={4}>4 Adults</option>
                      <option value={6}>6 Adults</option>
                      <option value={10}>10+ Adults</option>
                    </select>

                    <select
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-1/2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0f4332]"
                    >
                      <option value={0}>0 Kids</option>
                      <option value={1}>1 Kid</option>
                      <option value={2}>2 Kids</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Stays, Chauffeur & Addons */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#0f231b] mb-2">
                  Select Accommodation Tier
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: '4-Star Luxury', name: '4-Star Luxury Alpine Resort', desc: 'Central heating, mountain balcony views, buffet breakfast & dinner.' },
                    { id: '5-Star Heritage Palace', name: '5-Star Heritage / Palace', desc: 'Ultra-luxury properties like The Khyber, Vivanta Dal View, Lalit Grand Palace.' },
                    { id: 'Luxury Dal Houseboat', name: 'Luxury Carved Cedar Houseboat', desc: 'Private carved pinewood suite on Nigeen or Dal Lake with private Shikara transfers.' },
                    { id: '3-Star Deluxe', name: '3-Star Deluxe Comfort', desc: 'Clean, cozy family-run boutique stays with hot water and local hospitality.' }
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setHotelCategory(tier.id as any)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        hotelCategory === tier.id
                          ? 'bg-emerald-50 border-emerald-600 text-slate-900 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900 text-xs">{tier.name}</span>
                        {hotelCategory === tier.id && <CheckCircle className="w-4 h-4 text-[#0f4332]" />}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{tier.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#0f231b] mb-2">
                  Dedicated Mountain Chauffeur & Vehicle
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'Innova Crysta (Chauffeured)', name: 'Toyota Innova Crysta', desc: 'Ideal for couples and families up to 5 pax. Supreme hill comfort.' },
                    { id: '4x4 Scorpio / Safari (Mountain Ready)', name: 'Mahindra 4x4 Mountain SUV', desc: 'Equipped with winter snow clearance and offbeat pass capability.' },
                    { id: 'Force Urbania / Tempo Traveller (12-Seater)', name: 'Luxury Tempo / Urbania', desc: 'Plush push-back reclining seats for groups of 6 to 14 pax.' }
                  ].map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVehicleType(v.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        vehicleType === v.id
                          ? 'bg-emerald-50 border-emerald-600 text-slate-900 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900 text-xs">{v.name}</span>
                        {vehicleType === v.id && <CheckCircle className="w-4 h-4 text-[#0f4332]" />}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{v.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#0f231b] mb-2">
                  Curated Experiences & Fast-Pass Add-ons
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    'Sunset Shikara Ride on Dal Lake',
                    'Gulmarg Gondola Phase 1 & 2 Pass Assistance',
                    'Traditional 7-Course Wazwan Dinner in Houseboat',
                    'Skiing Instructor & Gear Session in Gulmarg',
                    'Pampore Saffron & Walnut Farm Walk'
                  ].map((addon) => {
                    const isChecked = selectedAddons.includes(addon);
                    return (
                      <div
                        key={addon}
                        onClick={() => toggleAddon(addon)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-semibold'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span>{addon}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="accent-[#0f4332] w-4 h-4"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Generated AI Itinerary Review & Guest Info */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#0f4332]" />
                    AI Customized Itinerary Plan ({durationDays} Days)
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    ✓ Optimized for {selectedDestinations.join(' • ')}
                  </span>
                </div>

                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {generatedItinerary.map((day) => (
                    <div key={day.day} className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs shadow-2xs">
                      <strong className="text-[#0f4332] block mb-1">Day {day.day}: {day.title}</strong>
                      <p className="text-slate-700 leading-relaxed">{day.morning || day.description}</p>
                      {day.evening && <p className="text-slate-500 mt-1 italic">{day.evening}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Guest Details Fields */}
              <div className="space-y-3">
                <h4 className="font-serif text-base font-bold text-slate-900">Lead Traveler Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1 text-[11px]">Primary Guest Name *</label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Rohini & Sameer Kapoor"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0f4332]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1 text-[11px]">WhatsApp Mobile *</label>
                    <input
                      type="tel"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0f4332]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1 text-[11px]">Email Address</label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="guest@example.com"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0f4332]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1 text-[11px]">Pickup Location</label>
                    <input
                      type="text"
                      value={pickupPoint}
                      onChange={(e) => setPickupPoint(e.target.value)}
                      placeholder="Srinagar Airport (SXR)"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0f4332]"
                    />
                  </div>
                </div>
              </div>

              {/* Price Breakdown Banner */}
              <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block font-semibold">Total Package Tariff</span>
                  <span className="font-serif text-2xl font-bold text-[#0f4332]">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-slate-600"> (All inclusions & chauffeur)</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-slate-500 block font-semibold">30% Advance Deposit</span>
                  <span className="font-serif text-xl font-bold text-[#b88628]">
                    ₹{advance.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-emerald-800 block font-medium">Balance payable upon arrival</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: UPI Payment & Confirmation */}
          {step === 4 && (
            <div className="space-y-6">
              {paymentDone ? (
                <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-200 text-center space-y-4">
                  <FileCheck className="w-12 h-12 text-emerald-600 mx-auto" />
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                    Booking Confirmed
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                    Voucher Generated: {confirmedRef}
                  </h3>
                  <p className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed">
                    Thank you {guestName}! Your custom Kashmir trip has been registered. You can track this booking anytime from the <strong className="text-slate-900">My Trip</strong> menu using your reference number.
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setActiveTripModal(false);
                      }}
                      className="btn-luxury px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      View in My Trip Dashboard
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleConfirmBooking} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* QR Code box */}
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 text-center space-y-3">
                      <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center">
                        <img
                          src={businessInfo.upiQrCodeUrl || paymentSettings.upiQrCode}
                          alt="Official UPI QR Code for Kashmiré Voyages"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-xs space-y-1">
                        <p className="font-bold text-slate-900">Official Kashmiré Voyages UPI</p>
                        <p className="font-mono text-[#0f4332] font-bold">{businessInfo.upiId || paymentSettings.upiId}</p>
                        <p className="text-slate-500 text-[10px]">Scan with GPay, PhonePe, Paytm, or BHIM</p>
                      </div>
                    </div>

                    {/* Deposit Info & UTR input */}
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
                        <span className="text-[10px] uppercase text-slate-500 block font-semibold">Advance Required</span>
                        <div className="font-serif text-3xl font-bold text-[#b88628]">
                          ₹{advance.toLocaleString('en-IN')}
                        </div>
                        <p className="text-slate-600">
                          Total Package: ₹{total.toLocaleString('en-IN')} • Remaining upon check-in: ₹{balance.toLocaleString('en-IN')}
                        </p>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1 text-[11px]">
                          Enter UPI UTR / Transaction Reference ID *
                        </label>
                        <input
                          type="text"
                          required
                          value={utrNumber}
                          onChange={(e) => setUtrNumber(e.target.value)}
                          placeholder="e.g. 429182910245"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0f4332] font-mono text-xs"
                        />
                        <span className="text-[10px] text-slate-500 block mt-1">
                          Copy the 12-digit UPI reference number from your payment app.
                        </span>
                      </div>

                      <button
                        type="submit"
                        className="w-full btn-luxury py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Confirm Deposit & Issue Travel Voucher</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Modal Navigation Footer */}
        {!paymentDone && (
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl bg-white text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step === 1 && (
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-luxury px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow"
              >
                <span>Continue to Stays & Fleet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {step === 2 && (
              <button
                type="button"
                disabled={loadingAI}
                onClick={handleGenerateItinerary}
                className="btn-luxury px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow"
              >
                {loadingAI ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>AI Crafting Kashmir Plan...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate AI Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            )}

            {step === 3 && (
              <button
                type="button"
                disabled={!guestName || !guestPhone}
                onClick={() => setStep(4)}
                className="btn-luxury px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow disabled:opacity-50"
              >
                <span>Proceed to UPI Advance Deposit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
