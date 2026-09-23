import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Send,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { businessInfo, addLead, emergencyContacts } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('2 Adults');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is Kashmir safe for families, solo travelers, and couples?",
      a: "Yes, completely. Tourism is the heartbeat of Kashmir. Thousands of families and honeymooners visit daily. Our chauffeurs and concierges are locally stationed, and we maintain direct 24x7 liaison with Tourist Police Srinagar and Gulmarg authorities."
    },
    {
      q: "Do prepaid mobile SIM cards from other states work in Kashmir?",
      a: "Due to telecommunication regulations across Jammu & Kashmir, non-J&K prepaid SIM cards do not work. You will need a Postpaid connection (Jio, Airtel, or BSNL work seamlessly) or you can purchase a local tourist SIM at Srinagar airport upon arrival with your Aadhaar/Passport."
    },
    {
      q: "How do we get Gulmarg Gondola Phase 1 & 2 tickets?",
      a: "Gondola tickets are released online by the J&K Cable Car Corporation in advance slots. Because Phase 2 sells out rapidly during peak winter snow, we assist all our booked guests in securing valid official tickets well in advance."
    },
    {
      q: "Do your vehicles have snow chains for winter roads in Gulmarg?",
      a: "Yes. During snowfall, private sedans and 2WD vehicles are halted at Tangmarg by traffic police. Our fleet either utilizes dedicated 4x4 mountain vehicles or deploys certified heavy-duty snow chains from Tangmarg to Gulmarg, fully compliant with safety mandates."
    },
    {
      q: "What is your booking advance and cancellation policy?",
      a: "We only require a 30% advance deposit to reserve your private chauffeur and guaranteed hotel rooms. You can pay via UPI QR Code or mobile UPI. Cancellations made 15+ days prior to arrival receive a full refund."
    }
  ];

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    addLead({
      leadNumber: `LEAD-${Date.now().toString().slice(-4)}`,
      name,
      phone,
      email,
      travelDates: dates || 'Flexible',
      travellers: guests,
      budget: 'Standard Luxury',
      interestedDestinations: ['Kashmir Circuit'],
      source: 'Contact Page Web Form',
      status: 'New',
      notes: notes || 'Enquiry submitted via Contact Section form.'
    });

    setSubmitted(true);
  };

  const handleWhatsAppInstant = () => {
    const cleanPhone = businessInfo.whatsapp.replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(`Hello ${businessInfo.name}, I am ${name || 'a traveler'}. I would like to enquire about traveling to Kashmir around ${dates || 'upcoming dates'} with ${guests}.`);
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8faf9] relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-[#0f4332] text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#b88628]" />
            <span>WE ARE BASED IN KASHMIR, FOR KASHMIR</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f231b] tracking-tight">
            Connect with Kashmiré Voyages
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            Reach out directly to our local concierge in Shalina, Budgam for personalized quotes, road status advisories, and tailored itineraries.
          </p>
        </div>

        {/* Contact Grid: Info + Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Column 1: Info Cards & Google Map (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#b88628] font-bold block">
                  Registered Headquarters
                </span>
                <p className="font-serif text-lg font-bold text-slate-900">{businessInfo.name}</p>
                <p className="text-xs text-slate-600 flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-[#0f4332] shrink-0 mt-0.5" />
                  <span>{businessInfo.address}</span>
                </p>
                <a
                  href={businessInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#0f4332] hover:text-[#b88628] hover:underline font-bold inline-block pt-1"
                >
                  Open in Google Maps →
                </a>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#b88628] font-bold block">
                  Direct Line & WhatsApp
                </span>
                <div className="space-y-1.5 text-xs">
                  <p className="text-slate-700 flex items-center gap-1.5 font-medium">
                    <Phone className="w-4 h-4 text-[#0f4332]" />
                    <a href={`tel:${businessInfo.phone}`} className="hover:text-[#0f4332] font-bold">
                      {businessInfo.phone}
                    </a>
                  </p>
                  <p className="text-slate-700 flex items-center gap-1.5 font-medium">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <a href={`https://wa.me/${businessInfo.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-emerald-700 font-bold">
                      {businessInfo.whatsapp}
                    </a>
                  </p>
                  <p className="text-slate-700 flex items-center gap-1.5 font-medium">
                    <Mail className="w-4 h-4 text-[#0f4332]" />
                    <a href={`mailto:${businessInfo.email}`} className="hover:text-[#0f4332]">
                      {businessInfo.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Embedded Google Map */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#0f4332]" />
                  Office Location: Shalina, Budgam, J&K
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Near Srinagar International Airport (SXR)</span>
              </div>
              <div className="h-64 sm:h-72 w-full">
                <iframe
                  title="Kashmiré Voyages Office Map"
                  src={businessInfo.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Column 2: Lead / Enquiry Form (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#b88628] uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Travel Quotation</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0f231b] mb-2">
                Request a Custom Itinerary
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Fill this brief form and our senior travel designer will respond with an itemized quote within 30 minutes.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-slate-900">Enquiry Received!</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Our Kashmir desk has logged your request. You can also chat directly with us on WhatsApp right now:
                  </p>
                  <button
                    onClick={handleWhatsAppInstant}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Open in WhatsApp Now
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitLead} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikram Singhania"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0f4332] focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0f4332] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0f4332] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Travel Dates / Month</label>
                      <input
                        type="text"
                        value={dates}
                        onChange={(e) => setDates(e.target.value)}
                        placeholder="e.g. Nov 15 - 20"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0f4332] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Travelers</label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0f4332] focus:bg-white"
                      >
                        <option value="2 Adults (Couple)">2 Adults (Couple)</option>
                        <option value="Family (2 Adults + 2 Kids)">Family (2 Adults + 2 Kids)</option>
                        <option value="Group of 4-6">Group of 4-6</option>
                        <option value="Group of 7+">Group of 7+</option>
                        <option value="Solo Traveler">Solo Traveler</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Special Preferences / Queries</label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Need luxury houseboat on Nigeen Lake, Apharwat Gondola Phase 2 booking, vegetarian Wazwan..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#0f4332] focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-luxury py-3.5 rounded-xl font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit & Get Itinerary Quote</span>
                  </button>
                </form>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Zero Spam Guarantee
              </span>
              <span>Response time: &lt; 30 mins</span>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="pt-12 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#b88628] font-bold block">
              Frequently Asked Questions
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0f231b]">
              Everything You Need to Know Before Traveling
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif font-bold text-sm sm:text-base text-slate-900">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#b88628] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
