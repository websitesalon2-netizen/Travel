import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookingRecord } from '../types';
import {
  Search,
  CheckCircle,
  Clock,
  Car,
  Hotel,
  ShieldCheck,
  Calendar,
  MapPin,
  Phone,
  MessageCircle,
  FileText,
  Printer,
  Sparkles,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export const MyTripDashboard: React.FC = () => {
  const { getBookingByReference, businessInfo, emergencyContacts } = useApp();

  const [searchRef, setSearchRef] = useState('KSH-2026-00125');
  const [searchPhone, setSearchPhone] = useState('');
  const [currentBooking, setCurrentBooking] = useState<BookingRecord | null>(() => {
    return getBookingByReference('KSH-2026-00125') || null;
  });
  const [searchError, setSearchError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    if (!searchRef.trim()) {
      setSearchError('Please enter your Booking Reference Number.');
      return;
    }

    const found = getBookingByReference(searchRef, searchPhone);
    if (found) {
      setCurrentBooking(found);
      setSearchError('');
    } else {
      setSearchError(`No active booking found for reference "${searchRef}". Check your reference or use demo reference: KSH-2026-00125`);
    }
  };

  const handlePrintVoucher = () => {
    window.print();
  };

  const handleWhatsAppDriver = () => {
    if (!currentBooking?.driverDetails) return;
    const cleanPhone = currentBooking.driverDetails.phone.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(`Hello ${currentBooking.driverDetails.name}, I am ${currentBooking.customerName}, booked on trip ${currentBooking.referenceNumber}. Reaching out regarding our upcoming pickup.`);
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f8faf9] min-h-[85vh]">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Lookup Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-[#0f4332] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#b88628]" />
              <span>GUEST CONCIERGE & TRIP TRACKER</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#0f231b]">
              My Kashmir Journey
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Track your confirmed itinerary, driver vehicle details, hotel vouchers, and payment receipts.
            </p>
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                Booking Reference *
              </label>
              <input
                type="text"
                required
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                placeholder="e.g. KSH-2026-00125"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0f4332] focus:bg-white text-xs font-mono font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                Registered Mobile (Optional)
              </label>
              <input
                type="text"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0f4332] focus:bg-white text-xs"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full btn-luxury py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow h-[42px]"
              >
                <Search className="w-4 h-4" />
                <span>Locate Trip</span>
              </button>
            </div>
          </form>

          {searchError && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{searchError}</span>
            </div>
          )}
        </div>

        {/* Confirmed Booking Voucher Card */}
        {currentBooking ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden printable-area">
            {/* Voucher Header Banner */}
            <div className="bg-gradient-to-r from-[#0f4332] via-[#145640] to-[#0f4332] p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-[#e5be73] font-bold block">
                  OFFICIAL KASHMIRÉ VOYAGES VOUCHER
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Booking Ref: {currentBooking.referenceNumber}
                </h3>
                <p className="text-xs text-slate-200">
                  Guest: <strong className="text-white">{currentBooking.customerName}</strong> • {currentBooking.adults} Adults {currentBooking.children > 0 ? `+ ${currentBooking.children} Children` : ''}
                </p>
              </div>

              <div className="flex flex-col sm:items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  currentBooking.bookingStatus === 'Confirmed'
                    ? 'bg-emerald-900/90 text-emerald-200 border border-emerald-400/60'
                    : 'bg-amber-900/90 text-amber-200 border border-amber-400/60'
                }`}>
                  Status: {currentBooking.bookingStatus}
                </span>
                <span className="text-[11px] text-slate-300">
                  Created on: {new Date(currentBooking.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Voucher Body Grid */}
            <div className="p-6 sm:p-8 space-y-8 text-xs sm:text-sm">
              {/* Journey Overview Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Travel Dates</span>
                  <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#0f4332]" />
                    {currentBooking.travelDate} to {currentBooking.returnDate}
                  </p>
                  <p className="text-[11px] text-slate-500">Pickup: {currentBooking.pickupLocation}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Destination & Circuit</span>
                  <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#0f4332]" />
                    {currentBooking.destination}
                  </p>
                  <p className="text-[11px] text-slate-500">Private Chauffeured Vehicle</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Payment Breakdown</span>
                  <p className="font-bold text-[#b88628] text-sm">
                    Advance: ₹{currentBooking.advanceAmount.toLocaleString('en-IN')} (Paid)
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Due upon arrival: <strong className="text-slate-900 font-mono">₹{currentBooking.remainingAmount.toLocaleString('en-IN')}</strong>
                  </p>
                </div>
              </div>

              {/* Assigned Chauffeur & Vehicle details */}
              <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base font-bold text-slate-900 flex items-center gap-2">
                    <Car className="w-5 h-5 text-[#0f4332]" />
                    Assigned Mountain Chauffeur & Vehicle
                  </h4>
                  {currentBooking.driverDetails && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-300">
                      Chauffeur {currentBooking.driverDetails.status}
                    </span>
                  )}
                </div>

                {currentBooking.driverDetails ? (
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Chauffeur Name</span>
                      <strong className="text-slate-900 text-sm">{currentBooking.driverDetails.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Vehicle Model</span>
                      <strong className="text-slate-900 text-sm">{currentBooking.driverDetails.carModel}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Plate Number</span>
                      <strong className="font-mono text-[#0f4332] text-sm font-bold">{currentBooking.driverDetails.numberPlate}</strong>
                    </div>
                    <div>
                      <button
                        onClick={handleWhatsAppDriver}
                        className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Chat with Driver
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-amber-700">
                    Chauffeur assignment in progress. Your dedicated driver details will be SMSed 24 hours before pickup.
                  </p>
                )}
              </div>

              {/* Assigned Accommodations */}
              {currentBooking.hotelDetails && (
                <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="font-serif text-base font-bold text-slate-900 flex items-center gap-2">
                    <Hotel className="w-5 h-5 text-[#0f4332]" />
                    Confirmed Accommodations
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Property</span>
                      <strong className="text-slate-900">{currentBooking.hotelDetails.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Room Category</span>
                      <span className="text-slate-700 font-medium">{currentBooking.hotelDetails.roomType}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Check-in Time</span>
                      <span className="text-slate-700 font-medium">{currentBooking.hotelDetails.checkInTime}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions: Print Voucher & Emergency */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrintVoucher}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    <Printer className="w-4 h-4 text-[#0f4332]" />
                    <span>Print / Save Voucher PDF</span>
                  </button>
                </div>

                <div className="text-xs text-slate-600 font-medium">
                  <span>24x7 Trip Escort Helpline: </span>
                  <a href={`tel:${emergencyContacts.travelAgent}`} className="font-bold text-[#0f4332] hover:text-[#b88628] hover:underline">
                    {emergencyContacts.travelAgent}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
