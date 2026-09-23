import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ReviewItem } from '../types';
import {
  Star,
  ShieldCheck,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle,
  PlusCircle,
  X,
  MessageSquare
} from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview } = useApp();
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Form state for writing review
  const [customerName, setCustomerName] = useState('');
  const [originCity, setOriginCity] = useState('');
  const [tripTitle, setTripTitle] = useState('Classic Kashmir Holiday');
  const [rating, setRating] = useState(5);
  const [hotelRating, setHotelRating] = useState(5);
  const [driverRating, setDriverRating] = useState(5);
  const [foodRating, setFoodRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !comment) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      customerName,
      originCity: originCity || 'Verified Guest',
      tripTitle,
      rating,
      date: 'Just Now',
      hotelRating,
      driverRating,
      foodRating,
      supportRating: 5,
      comment,
      photos: [],
      verified: true
    };

    addReview(newRev);
    setSubmittedMessage(true);
    setTimeout(() => {
      setShowReviewModal(false);
      setSubmittedMessage(false);
      setCustomerName('');
      setOriginCity('');
      setComment('');
    }, 2000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8faf9] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-[#0f4332] text-xs font-bold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-[#b88628] text-[#b88628]" />
              <span>4.96/5.0 AVERAGE RATING FROM 1,400+ GUESTS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f231b] tracking-tight">
              Honest Kashmir Travel Stories
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              Read transparent feedback from families, couples, and adventurers who experienced our private chauffeured tours.
            </p>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="btn-luxury px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-2 cursor-pointer self-start md:self-end"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Share Your Experience</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#b88628]/50 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="space-y-3">
                {/* Header with star & verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Verified Traveler
                    </span>
                  )}
                </div>

                <h4 className="font-serif text-lg font-bold text-slate-900 leading-snug">
                  "{rev.tripTitle}"
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{rev.comment}"
                </p>

                {/* Sub-ratings */}
                <div className="grid grid-cols-3 gap-1 pt-2 text-[10px] text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div>
                    <span className="block text-slate-500 font-medium">Chauffeur</span>
                    <span className="font-bold text-[#b88628]">★ {rev.driverRating}.0</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 font-medium">Stay/Heating</span>
                    <span className="font-bold text-[#b88628]">★ {rev.hotelRating}.0</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 font-medium">Wazwan</span>
                    <span className="font-bold text-[#b88628]">★ {rev.foodRating}.0</span>
                  </div>
                </div>
              </div>

              {/* Author footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">{rev.customerName}</span>
                  <span className="text-[11px] text-[#b88628] font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {rev.originCity}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-1">
              Write a Review
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Share your feedback about your journey with Kashmiré Voyages.
            </p>

            {submittedMessage ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900">Thank You for Your Feedback!</h4>
                <p className="text-xs text-slate-600">Your review has been verified and added to the website.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Vikram & Priya"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0f4332] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Origin City</label>
                    <input
                      type="text"
                      value={originCity}
                      onChange={(e) => setOriginCity(e.target.value)}
                      placeholder="e.g. Mumbai, Delhi"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0f4332] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Trip Name</label>
                  <input
                    type="text"
                    value={tripTitle}
                    onChange={(e) => setTripTitle(e.target.value)}
                    placeholder="e.g. 5-Day Honeymoon in Gulmarg"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0f4332] focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-slate-600 mb-1 text-[11px] font-semibold">Overall Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full px-2 py-2 rounded-xl bg-slate-50 border border-slate-200 text-amber-700 font-bold"
                    >
                      <option value={5}>5 ★ (Excellent)</option>
                      <option value={4}>4 ★ (Very Good)</option>
                      <option value={3}>3 ★ (Average)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 text-[11px] font-semibold">Driver Rating</label>
                    <select
                      value={driverRating}
                      onChange={(e) => setDriverRating(Number(e.target.value))}
                      className="w-full px-2 py-2 rounded-xl bg-slate-50 border border-slate-200 text-amber-700 font-bold"
                    >
                      <option value={5}>5 ★</option>
                      <option value={4}>4 ★</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 text-[11px] font-semibold">Hotel Rating</label>
                    <select
                      value={hotelRating}
                      onChange={(e) => setHotelRating(Number(e.target.value))}
                      className="w-full px-2 py-2 rounded-xl bg-slate-50 border border-slate-200 text-amber-700 font-bold"
                    >
                      <option value={5}>5 ★</option>
                      <option value={4}>4 ★</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Your Detailed Experience *</label>
                  <textarea
                    rows={4}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell future travelers about your chauffeur, snow experience, heating, and service..."
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0f4332] focus:bg-white"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-luxury py-3 rounded-xl font-bold uppercase tracking-wider shadow"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
