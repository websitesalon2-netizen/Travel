import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LiveStatusBar } from './components/LiveStatusBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { DestinationsSection } from './components/DestinationsSection';
import { PackagesSection } from './components/PackagesSection';
import { HotelsSection } from './components/HotelsSection';
import { ExperiencesSection } from './components/ExperiencesSection';
import { SeasonalGuide } from './components/SeasonalGuide';
import { FoodGuideSection } from './components/FoodGuideSection';
import { TimelineSection } from './components/TimelineSection';
import { ReviewsSection } from './components/ReviewsSection';
import { GallerySection } from './components/GallerySection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { MyTripDashboard } from './components/MyTripDashboard';
import { TripPlannerModal } from './components/TripPlannerModal';
import { AIChatModal } from './components/AIChatModal';
import { AirportTransferModal } from './components/AirportTransferModal';
import { DeveloperDesk } from './components/DeveloperDesk';
import { ManagerDesk } from './components/ManagerDesk';

const MainLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const { currentUserRole, setActiveTripModal } = useApp();

  // Automatically scroll to top whenever activeTab changes so new screens appear immediately without manual scrolling
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

  const handleBookingSuccess = (referenceNumber: string) => {
    setActiveTab('mytrip');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9] text-slate-800 font-sans selection:bg-[#c99e52] selection:text-white">
      {/* Main Luxury Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Router based on activeTab */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            <HeroSection setActiveTab={setActiveTab} />
            <DestinationsSection />
            <PackagesSection />
            <ExperiencesSection />
            <SeasonalGuide />
            <TimelineSection />
            <HotelsSection />
            <FoodGuideSection />
            <GallerySection />
            <ReviewsSection />
            <AboutSection />
            <ContactSection />
          </>
        )}

        {activeTab === 'plan' && (
          <div className="py-16 px-4 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#b88628] font-bold">
                Bespoke Expedition Customizer
              </span>
              <h2 className="font-serif text-4xl font-bold text-[#0f231b]">
                Build Your Dream Kashmir Journey
              </h2>
              <p className="text-sm text-slate-600">
                Launch our interactive planner wizard to design your custom itinerary with private chauffeur, curated stays, and transparent pricing.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setActiveTripModal(true)}
                  className="btn-luxury px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm shadow-xl"
                >
                  Open Trip Intelligence Wizard
                </button>
              </div>
            </div>
            <PackagesSection />
          </div>
        )}

        {activeTab === 'destinations' && (
          <div className="pt-6">
            <DestinationsSection />
          </div>
        )}

        {activeTab === 'packages' && (
          <div className="pt-6">
            <PackagesSection />
          </div>
        )}

        {activeTab === 'hotels' && (
          <div className="pt-6">
            <HotelsSection />
          </div>
        )}

        {activeTab === 'experiences' && (
          <div className="pt-6 space-y-12">
            <ExperiencesSection />
            <FoodGuideSection />
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="pt-6">
            <ExperiencesSection />
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="pt-6 space-y-12">
            <SeasonalGuide />
            <FoodGuideSection />
            <ContactSection />
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="pt-6">
            <GallerySection />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="pt-6">
            <AboutSection />
            <ReviewsSection />
          </div>
        )}

        {activeTab === 'live-intel' && (
          <div className="pt-6">
            <LiveStatusBar />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="pt-6">
            <ContactSection />
          </div>
        )}

        {(activeTab === 'mytrip' || activeTab === 'my-trip' || activeTab === 'track' || activeTab === 'track-booking') && (
          <div className="pt-6">
            <MyTripDashboard />
          </div>
        )}

        {/* Portals with Password Protection */}
        {(activeTab === 'developer' || activeTab === 'developer-desk') && (
          <DeveloperDesk onExit={() => setActiveTab('home')} />
        )}
        {(activeTab === 'manager' || activeTab === 'manager-desk') && (
          <ManagerDesk onExit={() => setActiveTab('home')} />
        )}
      </main>

      {/* Full Footer with business info and emergency contacts */}
      <Footer setActiveTab={setActiveTab} />

      {/* Global Interactive Modals */}
      <TripPlannerModal onBookingSuccess={handleBookingSuccess} />
      <AIChatModal />
      <AirportTransferModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
