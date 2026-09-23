import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Plane,
  X,
  CheckCircle,
  Car,
  Clock,
  MapPin,
  ShieldCheck,
  Send,
  Phone
} from 'lucide-react';

export const AirportTransferModal: React.FC = () => {
  const {
    activeAirportTransferModal,
    setActiveAirportTransferModal,
    addBooking,
    businessInfo
  } = useApp();

  const [flightNumber, setFlightNumber] = useState('');
  const [arrivalDate, setArrivalDate] = useState('2026-10-15');
  const [arrivalTime, setArrivalTime] = useState('11:30 AM');
  const [destinationDrop, setDestinationDrop] = useState('Dal Lake Ghat (Houseboat transfer)');
  const [vehicle, setVehicle] = useState('Toyota Innova Crysta');
  const [paxCount, setPaxCount] = useState('2 Passengers');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (!activeAirportTransferModal) return null;

  const handleBookTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) return;

    const ref = `SXR-TRF-${Math.floor(1000 + Math.random() * 9000)}`;

    addBooking({
      referenceNumber: ref,
      customerName: guestName,
      customerPhone: guestPhone,
      customerEmail: `${guestPhone}@kashmirevoyages.in`,
      pickupLocation: `Srinagar Airport (SXR) - Flight ${flightNumber || 'Scheduled'}`,
      travelDate: arrivalDate,
      returnDate: arrivalDate,
      durationDays: 1,
      destination: destinationDrop,
      adults: 2,
      children: 0,
      vehicleType: vehicle,
      hotelCategory: 'Luxury Dal Houseboat',
      totalAmount: 2200,
      advanceAmount: 1000,
      remainingAmount: 1200,
      paymentMethod: 'Cash on Arrival',
      paymentStatus: 'Pay to Chauffeur',
      bookingStatus: 'Confirmed',
      driverDetails: {
        name: 'Tariq Ahmad',
        phone: businessInfo.phone,
        carModel: vehicle,
        numberPlate: 'JK 01 BF 4192',
        status: 'Assigned'
      },
      specialRequests: `Placard Meet & Greet at Airport Exit Gate. Arriving ${arrivalTime}.`
    });

    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="bg-slate-50 p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-[#0f4332]">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Srinagar Airport (SXR) Transfer
              </h3>
              <p className="text-[10px] text-[#b88628] font-bold uppercase tracking-wide">
                VIP Meet & Greet with Name Placard • Verified Chauffeur
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveAirportTransferModal(false)}
            className="p-1.5 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-xs text-slate-700 space-y-4">
          {confirmed ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-serif text-xl font-bold text-slate-900">Transfer Reserved!</h4>
              <p className="text-xs text-emerald-800">
                Our chauffeur will wait with a personalized name placard right outside Srinagar Airport Arrival Gate 1.
              </p>
              <button
                onClick={() => setActiveAirportTransferModal(false)}
                className="btn-luxury px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Close & Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookTransfer} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1 text-[11px]">Flight Number</label>
                  <input
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    placeholder="e.g. 6E-241"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0f4332]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1 text-[11px]">Arrival Date</label>
                  <input
                    type="date"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0f4332]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1 text-[11px]">Est. Landing Time</label>
                  <input
                    type="text"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    placeholder="e.g. 11:45 AM"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0f4332]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1 text-[11px]">Passengers</label>
                  <select
                    value={paxCount}
                    onChange={(e) => setPaxCount(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0f4332]"
                  >
                    <option value="1-2 Passengers">1-2 Passengers</option>
                    <option value="3-4 Passengers">3-4 Passengers</option>
                    <option value="5-7 Passengers (Innova)">5-7 Passengers (Innova)</option>
                    <option value="8+ Passengers (Tempo)">8+ Passengers (Tempo)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1 text-[11px]">Drop-off Destination</label>
                <select
                  value={destinationDrop}
                  onChange={(e) => setDestinationDrop(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0f4332]"
                >
                  <option value="Dal Lake Ghat (Houseboats & Boulevard)">Dal Lake Ghats (Boulevard)</option>
                  <option value="Nigeen Lake Luxury Houseboats">Nigeen Lake Houseboats</option>
                  <option value="Srinagar Downtown / Lal Chowk">Srinagar City Hotel</option>
                  <option value="Direct Transfer to Gulmarg">Direct to Gulmarg (50 km / 1.5 hrs)</option>
                  <option value="Direct Transfer to Pahalgam">Direct to Pahalgam (90 km / 2.2 hrs)</option>
                  <option value="Direct Transfer to Sonamarg">Direct to Sonamarg (80 km / 2 hrs)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1 text-[11px]">Guest Name *</label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0f4332]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1 text-[11px]">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-[#0f4332]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-luxury py-3 rounded-xl font-bold uppercase tracking-wider shadow cursor-pointer"
                >
                  Confirm Airport Pickup
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
