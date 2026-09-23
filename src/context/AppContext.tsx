import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import {
  BusinessInfo,
  LogoSettings,
  ThemeSettings,
  DeveloperCredit,
  PaymentSettings,
  EmergencyContacts,
  DestinationStatus,
  PriceMatrix,
  WebsiteContent,
  Destination,
  TourPackage,
  Hotel,
  Vehicle,
  ExperienceItem,
  TimelineItem,
  BookingRecord,
  EnquiryLead,
  ReviewItem,
  TravelStory,
  FoodGuideItem,
  AuditLogItem,
  Quotation,
  MountainStatusInfo
} from '../types';
import {
  initialBusinessInfo,
  initialLogoSettings,
  initialThemeSettings,
  initialDeveloperCredit,
  initialPaymentSettings,
  initialEmergencyContacts,
  initialLiveStatus,
  initialPriceMatrix,
  initialWebsiteContent,
  initialDestinations,
  initialPackages,
  initialHotels,
  initialVehicles,
  initialExperiences,
  initialTimelineItems,
  initialReviews,
  initialTravelStories,
  initialFoodGuide,
  initialBookings,
  initialLeads
} from '../data/initialData';
import {
  subscribeToDestinations,
  saveDestinationToCloud,
  deleteDestinationFromCloud,
  subscribeToSettings,
  saveBusinessInfoToCloud,
  savePaymentSettingsToCloud,
  saveMountainStatusToCloud,
  subscribeToTimeline,
  saveTimelineItemToCloud,
  deleteTimelineItemFromCloud,
  subscribeToBookings,
  saveBookingToCloud,
  deleteBookingFromCloud,
  subscribeToLeads,
  saveLeadToCloud,
  deleteLeadFromCloud,
  subscribeToWebsiteContent,
  saveWebsiteContentToCloud,
  subscribeToPackages,
  savePackageToCloud,
  deletePackageFromCloud,
  subscribeToHotels,
  saveHotelToCloud,
  deleteHotelFromCloud,
  subscribeToExperiences,
  saveExperienceToCloud,
  deleteExperienceFromCloud
} from '../lib/firestoreService';

interface AppContextType {
  // Central configs
  businessInfo: BusinessInfo;
  updateBusinessInfo: (info: Partial<BusinessInfo>, role?: 'Developer' | 'Manager') => void;

  logoSettings: LogoSettings;
  updateLogoSettings: (settings: Partial<LogoSettings>, role?: 'Developer' | 'Manager') => void;

  themeSettings: ThemeSettings;
  updateThemeSettings: (theme: Partial<ThemeSettings>, role?: 'Developer' | 'Manager') => void;
  restoreDefaultTheme: () => void;
  resetToDefaults: () => void;

  developerCredit: DeveloperCredit;
  updateDeveloperCredit: (credit: Partial<DeveloperCredit>) => void;

  paymentSettings: PaymentSettings;
  updatePaymentSettings: (settings: Partial<PaymentSettings>, role?: 'Developer' | 'Manager') => void;

  emergencyContacts: EmergencyContacts;
  updateEmergencyContacts: (contacts: Partial<EmergencyContacts>) => void;

  liveStatus: Record<string, DestinationStatus>;
  updateLiveStatus: (destination: string, status: Partial<DestinationStatus>) => void;

  mountainStatus: MountainStatusInfo;
  updateMountainStatus: (status: Partial<MountainStatusInfo>) => void;

  priceMatrix: PriceMatrix;
  updatePriceMatrix: (matrix: Partial<PriceMatrix>) => void;

  websiteContent: WebsiteContent;
  updateWebsiteContent: (content: Partial<WebsiteContent>, role?: 'Developer' | 'Manager') => void;

  // Domain entities
  destinations: Destination[];
  addDestination: (dest: Destination) => void;
  updateDestination: (id: string, dest: Partial<Destination>) => void;
  deleteDestination: (id: string) => void;

  packages: TourPackage[];
  addPackage: (pkg: TourPackage) => void;
  updatePackage: (id: string, pkg: Partial<TourPackage>) => void;
  deletePackage: (id: string) => void;

  hotels: Hotel[];
  addHotel: (hotel: Hotel) => void;
  updateHotel: (id: string, hotel: Partial<Hotel>) => void;
  deleteHotel: (id: string) => void;

  vehicles: Vehicle[];
  addVehicle: (vehicle: Vehicle) => void;
  updateVehicle: (id: string, vehicle: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;

  experiences: ExperienceItem[];
  addExperience: (exp: ExperienceItem) => void;
  updateExperience: (id: string, exp: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;

  timelineItems: TimelineItem[];
  addTimelineItem: (item: TimelineItem) => void;
  updateTimelineItem: (id: string, item: Partial<TimelineItem>) => void;
  deleteTimelineItem: (id: string) => void;
  reorderTimelineItems: (newItems: TimelineItem[]) => void;

  reviews: ReviewItem[];
  addReview: (review: ReviewItem) => void;
  updateReview: (id: string, review: Partial<ReviewItem>) => void;
  deleteReview: (id: string) => void;
  foodGuide: FoodGuideItem[];
  addFoodGuideItem: (item: FoodGuideItem) => void;
  updateFoodGuideItem: (id: string, item: Partial<FoodGuideItem>) => void;
  deleteFoodGuideItem: (id: string) => void;

  travelStories: TravelStory[];

  bookings: BookingRecord[];
  createBooking: (booking: Omit<BookingRecord, 'id' | 'createdAt'>) => BookingRecord;
  addBooking: (booking: any) => BookingRecord;
  updateBooking: (id: string, updates: Partial<BookingRecord>) => void;
  deleteBooking: (idOrRef: string) => void;
  getBookingByReference: (ref: string, mobile?: string) => BookingRecord | undefined;

  leads: EnquiryLead[];
  addLead: (lead: Omit<EnquiryLead, 'id' | 'createdAt'>) => EnquiryLead;
  updateLead: (id: string, updates: Partial<EnquiryLead>) => void;
  deleteLead: (idOrNumber: string) => void;

  quotations: Quotation[];
  createQuotation: (quote: Omit<Quotation, 'id' | 'createdAt'>) => Quotation;

  auditLogs: AuditLogItem[];
  addAuditLog: (userRole: 'Developer' | 'Manager', action: string, details: string) => void;

  // Role Session
  currentUserRole: 'guest' | 'developer' | 'manager' | 'driver';
  loginAs: (role: 'guest' | 'developer' | 'manager' | 'driver') => void;
  logout: () => void;

  // Quick navigation / dialog triggers
  activeTripModal: boolean;
  setActiveTripModal: (open: boolean) => void;
  activeAirportTransferModal: boolean;
  setActiveAirportTransferModal: (open: boolean) => void;
  activeChatModal: boolean;
  setActiveChatModal: (open: boolean) => void;

  // Real-time Cloud Synchronization across all devices
  syncStatus: 'synced' | 'syncing' | 'offline' | 'error';
  lastSyncTime: string;
  syncAllToLiveServer: () => Promise<boolean>;
  refreshFromLiveServer: () => Promise<boolean>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Local storage helper
  function useStickyState<T>(defaultValue: T, key: string): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
      try {
        const stickyValue = window.localStorage.getItem(key);
        if (stickyValue !== null) {
          const parsed = JSON.parse(stickyValue);
          if (key === 'kv_theme_settings' && (parsed.backgroundColor === '#08120e' || parsed.backgroundColor === '#06120e')) {
            return {
              ...defaultValue,
              ...parsed,
              backgroundColor: '#f8faf9',
              cardColor: '#ffffff',
              textColor: '#0f231b',
              primaryColor: '#0f4332',
              secondaryColor: '#b88628',
              accentColor: '#c99e52'
            };
          }
          return parsed;
        }
        return defaultValue;
      } catch (e) {
        console.warn(`Error reading localStorage key "${key}":`, e);
        return defaultValue;
      }
    });

    useEffect(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.warn(`Error setting localStorage key "${key}":`, e);
      }
    }, [key, value]);

    return [value, setValue];
  }

  const [businessInfo, setBusinessInfo] = useStickyState<BusinessInfo>(initialBusinessInfo, 'kv_business_info');
  const [logoSettings, setLogoSettings] = useStickyState<LogoSettings>(initialLogoSettings, 'kv_logo_settings');
  const [themeSettings, setThemeSettings] = useStickyState<ThemeSettings>(initialThemeSettings, 'kv_theme_settings');
  const [developerCredit, setDeveloperCredit] = useStickyState<DeveloperCredit>(initialDeveloperCredit, 'kv_dev_credit');
  const [paymentSettings, setPaymentSettings] = useStickyState<PaymentSettings>(initialPaymentSettings, 'kv_payment_settings');
  const [emergencyContacts, setEmergencyContacts] = useStickyState<EmergencyContacts>(initialEmergencyContacts, 'kv_emergency_contacts');
  const [liveStatus, setLiveStatus] = useStickyState<Record<string, DestinationStatus>>(initialLiveStatus, 'kv_live_status');
  const [priceMatrix, setPriceMatrix] = useStickyState<PriceMatrix>(initialPriceMatrix, 'kv_price_matrix');
  const [websiteContent, setWebsiteContent] = useStickyState<WebsiteContent>({ ...initialWebsiteContent, travelStories: initialTravelStories }, 'kv_website_content');

  const [destinations, setDestinations] = useStickyState<Destination[]>(initialDestinations, 'kv_destinations');
  const [packages, setPackages] = useStickyState<TourPackage[]>(initialPackages, 'kv_packages');
  const [hotels, setHotels] = useStickyState<Hotel[]>(initialHotels, 'kv_hotels');
  const [vehicles, setVehicles] = useStickyState<Vehicle[]>(initialVehicles, 'kv_vehicles');
  const [experiences, setExperiences] = useStickyState<ExperienceItem[]>(initialExperiences, 'kv_experiences');
  const [timelineItems, setTimelineItems] = useStickyState<TimelineItem[]>(initialTimelineItems, 'kv_timeline_items');
  const [reviews, setReviews] = useStickyState<ReviewItem[]>(initialReviews, 'kv_reviews');
  const [foodGuide, setFoodGuide] = useStickyState<FoodGuideItem[]>(initialFoodGuide, 'kv_food_guide');
  const [travelStories] = useStickyState<TravelStory[]>(initialTravelStories, 'kv_travel_stories');
  const [bookings, setBookings] = useStickyState<BookingRecord[]>(initialBookings, 'kv_bookings');
  const [leads, setLeads] = useStickyState<EnquiryLead[]>(initialLeads, 'kv_leads');
  const [quotations, setQuotations] = useStickyState<Quotation[]>([], 'kv_quotations');

  const [auditLogs, setAuditLogs] = useStickyState<AuditLogItem[]>([
    {
      id: 'log-1',
      userRole: 'Developer',
      action: 'Initial Provisioning',
      details: 'System initialized with Kashmiré Voyages master settings and luxury theme palette',
      timestamp: new Date().toISOString()
    }
  ], 'kv_audit_logs');

  const [currentUserRole, setCurrentUserRole] = useState<'guest' | 'developer' | 'manager' | 'driver'>('guest');
  const [activeTripModal, setActiveTripModal] = useState<boolean>(false);
  const [activeAirportTransferModal, setActiveAirportTransferModal] = useState<boolean>(false);
  const [activeChatModal, setActiveChatModal] = useState<boolean>(false);

  // Real-time Cloud Synchronization State across all devices
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'offline' | 'error'>('syncing');
  const [lastSyncTime, setLastSyncTime] = useState<string>('Connecting to live server...');
  const lastServerTimestampRef = useRef<number>(0);
  const isInitialSyncDoneRef = useRef<boolean>(false);

  // Synchronize state with live cloud database & server
  const refreshFromLiveServer = async (): Promise<boolean> => {
    try {
      setSyncStatus('syncing');
      const res = await fetch('/api/shared-data');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const serverData = json.data;
          if (serverData.destinations && Array.isArray(serverData.destinations)) {
            setDestinations(serverData.destinations);
          }
          if (serverData.businessInfo) setBusinessInfo(serverData.businessInfo);
          if (serverData.paymentSettings) setPaymentSettings(serverData.paymentSettings);
          if (serverData.mountainStatus) setMountainStatus(serverData.mountainStatus);
          if (serverData.timelineItems && Array.isArray(serverData.timelineItems)) {
            setTimelineItems(serverData.timelineItems);
          }
        }
      }
      setSyncStatus('synced');
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      return true;
    } catch (err) {
      console.warn('Could not sync with live server:', err);
      setSyncStatus('offline');
      return false;
    }
  };

  // Push all local data to the live Cloud Firestore database & server
  const syncAllToLiveServer = async (): Promise<boolean> => {
    try {
      setSyncStatus('syncing');
      // Push each destination to Firestore cloud
      for (const dest of destinations) {
        await saveDestinationToCloud(dest);
      }
      await saveBusinessInfoToCloud(businessInfo);
      await savePaymentSettingsToCloud(paymentSettings);
      await saveMountainStatusToCloud(mountainStatus);
      for (const item of timelineItems) {
        await saveTimelineItemToCloud(item);
      }
      // Also backup to server
      fetch('/api/shared-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinations,
          businessInfo,
          paymentSettings,
          mountainStatus,
          timelineItems,
          packages,
          bookings,
          leads
        })
      }).catch(() => {});

      setSyncStatus('synced');
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      return true;
    } catch (err) {
      console.warn('Error pushing data to cloud:', err);
      setSyncStatus('offline');
      return false;
    }
  };

  // Real-time Firestore Cloud synchronization lifecycle across all devices
  useEffect(() => {
    setSyncStatus('syncing');

    // 1. Real-time Destinations subscription from Firebase Firestore
    const unsubWebsiteContent = subscribeToWebsiteContent((cloudContent) => {
      if (cloudContent) {
        setWebsiteContent((prev) => ({ ...prev, ...cloudContent }));
        if (Array.isArray(cloudContent.reviews)) setReviews(cloudContent.reviews);
        if (Array.isArray(cloudContent.foodGuideItems)) setFoodGuide(cloudContent.foodGuideItems);
      }
    });

    const unsubDestinations = subscribeToDestinations(
      (cloudDestinations) => {
        if (cloudDestinations && cloudDestinations.length > 0) {
          setDestinations(cloudDestinations);
          setSyncStatus('synced');
          setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
      },
      (err) => {
        console.warn('Firestore destination sync notice:', err);
      }
    );

    // 2. Real-time catalog subscriptions. These were previously localStorage-only,
    // which meant manager edits did not appear on another device.
    const unsubPackages = subscribeToPackages((items) => { setPackages(items); });
    const unsubHotels = subscribeToHotels((items) => { setHotels(items); });
    const unsubExperiences = subscribeToExperiences((items) => { setExperiences(items); });

    // 3. Real-time Settings subscription (Business info, payment QR, mountain status)
    const unsubSettings = subscribeToSettings(
      (bInfo) => { if (bInfo) setBusinessInfo((prev) => ({ ...prev, ...bInfo })); },
      (pSettings) => { if (pSettings) setPaymentSettings((prev) => ({ ...prev, ...pSettings })); },
      (mStatus) => { if (mStatus) setMountainStatus((prev) => ({ ...prev, ...mStatus })); }
    );

    // 3. Real-time Timeline subscription
    const unsubTimeline = subscribeToTimeline((items) => {
      if (items && items.length > 0) setTimelineItems(items);
    });

    // 4. Real-time Bookings subscription
    const unsubBookings = subscribeToBookings((bks) => {
      if (bks) setBookings(bks);
    });

    // 5. Real-time Leads subscription
    const unsubLeads = subscribeToLeads((lds) => {
      if (lds) setLeads(lds);
    });

    return () => {
      if (unsubWebsiteContent) unsubWebsiteContent();
      if (unsubDestinations) unsubDestinations();
      if (unsubPackages) unsubPackages();
      if (unsubHotels) unsubHotels();
      if (unsubExperiences) unsubExperiences();
      if (unsubSettings) unsubSettings();
      if (unsubTimeline) unsubTimeline();
      if (unsubBookings) unsubBookings();
      if (unsubLeads) unsubLeads();
    };
  }, []);

  // Apply Theme CSS variables dynamically
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', themeSettings.primaryColor);
    root.style.setProperty('--color-secondary', themeSettings.secondaryColor);
    root.style.setProperty('--color-accent', themeSettings.accentColor);
    root.style.setProperty('--color-bg', themeSettings.backgroundColor);
    root.style.setProperty('--color-card', themeSettings.cardColor);
    root.style.setProperty('--color-text', themeSettings.textColor);
    root.style.setProperty('--radius-custom', `${themeSettings.borderRadius}px`);
    root.style.setProperty('--timeline-duration', `${themeSettings.timelineAnimationDuration}s`);

    // Favicon update
    if (logoSettings.favicon) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'shortcut icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = logoSettings.favicon;
    }
  }, [themeSettings, logoSettings.favicon]);

  const addAuditLog = (userRole: 'Developer' | 'Manager', action: string, details: string) => {
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      userRole,
      action,
      details,
      timestamp: new Date().toISOString()
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 99)]);
  };

  const updateBusinessInfo = (info: Partial<BusinessInfo>, role: 'Developer' | 'Manager' = 'Manager') => {
    setBusinessInfo((prev) => {
      const updated = { ...prev, ...info };
      saveBusinessInfoToCloud(updated).catch((e) => console.warn('Cloud businessInfo:', e));
      return updated;
    });
    addAuditLog(role, 'Updated Business Information', Object.keys(info).join(', '));
    fetch('/api/business-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.lastUpdated) lastServerTimestampRef.current = res.lastUpdated;
      })
      .catch(() => {});
  };

  const updateLogoSettings = (settings: Partial<LogoSettings>, role: 'Developer' | 'Manager' = 'Manager') => {
    setLogoSettings((prev) => ({ ...prev, ...settings }));
    addAuditLog(role, 'Updated Logo/Favicon', Object.keys(settings).join(', '));
  };

  const updateThemeSettings = (theme: Partial<ThemeSettings>, role: 'Developer' | 'Manager' = 'Developer') => {
    setThemeSettings((prev) => ({ ...prev, ...theme }));
    addAuditLog(role, 'Updated Visual Theme', Object.keys(theme).join(', '));
  };

  const restoreDefaultTheme = () => {
    setThemeSettings(initialThemeSettings);
    addAuditLog('Developer', 'Restored Default Theme', 'Default palette applied');
  };

  const resetToDefaults = () => {
    setThemeSettings(initialThemeSettings);
    setBusinessInfo(initialBusinessInfo);
    setPaymentSettings(initialPaymentSettings);
    addAuditLog('Developer', 'Reset all settings to Factory Defaults', 'Cleared custom overrides');
  };

  const updateDeveloperCredit = (credit: Partial<DeveloperCredit>) => {
    setDeveloperCredit((prev) => ({ ...prev, ...credit }));
    addAuditLog('Developer', 'Updated Developer Credit', 'Credit settings changed');
  };

  const updatePaymentSettings = (settings: Partial<PaymentSettings>, role: 'Developer' | 'Manager' = 'Manager') => {
    setPaymentSettings((prev) => {
      const updated = { ...prev, ...settings };
      savePaymentSettingsToCloud(updated).catch((e) => console.warn('Cloud paymentSettings:', e));
      return updated;
    });
    addAuditLog(role, 'Updated Payment Settings', Object.keys(settings).join(', '));
    fetch('/api/payment-settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.lastUpdated) lastServerTimestampRef.current = res.lastUpdated;
      })
      .catch(() => {});
  };

  const updateEmergencyContacts = (contacts: Partial<EmergencyContacts>) => {
    setEmergencyContacts((prev) => ({ ...prev, ...contacts }));
    addAuditLog('Manager', 'Updated Emergency Numbers', Object.keys(contacts).join(', '));
  };

  const [mountainStatus, setMountainStatus] = useStickyState<MountainStatusInfo>(
    {
      gondolaStatus: 'Phase 1 & Phase 2 Active (Subject to wind)',
      gulmargSnow: '4.5 ft on Apharwat Peak',
      sonamargSnow: 'Fresh Powder at Zero Point',
      pahalgamWeather: 'Clear Skies, 14°C',
      nh44Status: 'Two-Way Traffic Open (Srinagar-Jammu)',
      snowChainsRequired: 'Mandatory from Tangmarg to Gulmarg'
    },
    'kv_mountain_status'
  );

  const updateMountainStatus = (status: Partial<MountainStatusInfo>) => {
    setMountainStatus((prev) => {
      const updated = { ...prev, ...status };
      saveMountainStatusToCloud(updated).catch((e) => console.warn('Cloud mountainStatus:', e));
      return updated;
    });
    addAuditLog('Manager', 'Updated Mountain & Gondola Status', JSON.stringify(status));
    fetch('/api/mountain-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(status)
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.lastUpdated) lastServerTimestampRef.current = res.lastUpdated;
      })
      .catch(() => {});
  };

  const updateLiveStatus = (destination: string, status: Partial<DestinationStatus>) => {
    setLiveStatus((prev) => ({
      ...prev,
      [destination]: {
        ...prev[destination],
        ...status,
        lastUpdated: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      }
    }));
    addAuditLog('Manager', `Updated Live Status for ${destination}`, JSON.stringify(status));
  };

  const updatePriceMatrix = (matrix: Partial<PriceMatrix>) => {
    setPriceMatrix((prev) => ({ ...prev, ...matrix }));
    addAuditLog('Manager', 'Updated Live Price Matrix', Object.keys(matrix).join(', '));
  };

  const updateWebsiteContent = (content: Partial<WebsiteContent>, role: 'Developer' | 'Manager' = 'Manager') => {
    setWebsiteContent((prev) => {
      const next = { ...prev, ...content };
      saveWebsiteContentToCloud(next).catch((e) => console.warn('Cloud website content save:', e));
      return next;
    });
    addAuditLog(role, 'Updated Website Content Text', Object.keys(content).join(', '));
  };

  // Destination actions (Synchronized to Cloud Firestore & server for instant cross-device visibility)
  const addDestination = (dest: Destination) => {
    setDestinations((prev) => [dest, ...prev]);
    addAuditLog('Manager', 'Added Destination', dest.name);
    // Instant real-time Firestore persistence
    saveDestinationToCloud(dest).catch((e) => console.warn('Cloud destination save:', e));
    fetch('/api/destinations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dest)
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.lastUpdated) lastServerTimestampRef.current = res.lastUpdated;
        setSyncStatus('synced');
        setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      })
      .catch((err) => console.error('Failed to sync destination to server:', err));
  };

  const updateDestination = (id: string, dest: Partial<Destination>) => {
    let fullUpdated: Destination | null = null;
    setDestinations((prev) => {
      const updatedList = prev.map((d) => {
        if (d.id === id) {
          fullUpdated = { ...d, ...dest };
          return fullUpdated;
        }
        return d;
      });
      return updatedList;
    });
    addAuditLog('Manager', 'Updated Destination', id);
    // Instant real-time Firestore persistence
    if (fullUpdated) {
      saveDestinationToCloud(fullUpdated).catch((e) => console.warn('Cloud destination update:', e));
    }
    fetch(`/api/destinations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dest)
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.lastUpdated) lastServerTimestampRef.current = res.lastUpdated;
        setSyncStatus('synced');
        setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      })
      .catch((err) => console.error('Failed to sync updated destination to server:', err));
  };

  const deleteDestination = (id: string) => {
    setDestinations((prev) => prev.filter((d) => d.id !== id));
    addAuditLog('Manager', 'Deleted Destination', id);
    // Instant real-time Firestore persistence
    deleteDestinationFromCloud(id).catch((e) => console.warn('Cloud destination delete:', e));
    fetch(`/api/destinations/${id}`, {
      method: 'DELETE'
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.lastUpdated) lastServerTimestampRef.current = res.lastUpdated;
        setSyncStatus('synced');
        setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      })
      .catch((err) => console.error('Failed to sync deleted destination to server:', err));
  };

  // Packages actions
  const addPackage = (pkg: TourPackage) => {
    setPackages((prev) => [pkg, ...prev]);
    savePackageToCloud(pkg).catch((e) => console.warn('Cloud package save:', e));
    addAuditLog('Manager', 'Added Package', pkg.title);
  };
  const updatePackage = (id: string, pkg: Partial<TourPackage>) => {
    let full: TourPackage | null = null;
    setPackages((prev) => prev.map((p) => { if (p.id === id) { full = { ...p, ...pkg }; return full; } return p; }));
    if (full) savePackageToCloud(full).catch((e) => console.warn('Cloud package update:', e));
    addAuditLog('Manager', 'Updated Package', id);
  };
  const deletePackage = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
    deletePackageFromCloud(id).catch((e) => console.warn('Cloud package delete:', e));
    addAuditLog('Manager', 'Deleted Package', id);
  };

  // Hotel actions
  const addHotel = (hotel: Hotel) => {
    setHotels((prev) => [hotel, ...prev]);
    saveHotelToCloud(hotel).catch((e) => console.warn('Cloud hotel save:', e));
    addAuditLog('Manager', 'Added Hotel', hotel.name);
  };
  const updateHotel = (id: string, hotel: Partial<Hotel>) => {
    let full: Hotel | null = null;
    setHotels((prev) => prev.map((h) => { if (h.id === id) { full = { ...h, ...hotel }; return full; } return h; }));
    if (full) saveHotelToCloud(full).catch((e) => console.warn('Cloud hotel update:', e));
    addAuditLog('Manager', 'Updated Hotel', id);
  };
  const deleteHotel = (id: string) => {
    setHotels((prev) => prev.filter((h) => h.id !== id));
    deleteHotelFromCloud(id).catch((e) => console.warn('Cloud hotel delete:', e));
    addAuditLog('Manager', 'Deleted Hotel', id);
  };

  // Vehicle actions
  const addVehicle = (vehicle: Vehicle) => {
    setVehicles((prev) => [vehicle, ...prev]);
    addAuditLog('Manager', 'Added Vehicle', vehicle.name);
  };
  const updateVehicle = (id: string, vehicle: Partial<Vehicle>) => {
    setVehicles((prev) => prev.map((v) => (v.id === id ? { ...v, ...vehicle } : v)));
    addAuditLog('Manager', 'Updated Vehicle', id);
  };
  const deleteVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    addAuditLog('Manager', 'Deleted Vehicle', id);
  };

  // Experience actions
  const addExperience = (exp: ExperienceItem) => {
    setExperiences((prev) => [exp, ...prev]);
    saveExperienceToCloud(exp).catch((e) => console.warn('Cloud experience save:', e));
    addAuditLog('Manager', 'Added Experience', exp.title);
  };
  const updateExperience = (id: string, exp: Partial<ExperienceItem>) => {
    let full: ExperienceItem | null = null;
    setExperiences((prev) => prev.map((e) => { if (e.id === id) { full = { ...e, ...exp }; return full; } return e; }));
    if (full) saveExperienceToCloud(full).catch((e) => console.warn('Cloud experience update:', e));
    addAuditLog('Manager', 'Updated Experience', id);
  };
  const deleteExperience = (id: string) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
    deleteExperienceFromCloud(id).catch((e) => console.warn('Cloud experience delete:', e));
    addAuditLog('Manager', 'Deleted Experience', id);
  };

  // Timeline actions (Synchronized to Cloud Firestore & server)
  const addTimelineItem = (item: TimelineItem) => {
    const updated = [...timelineItems, item].sort((a, b) => a.order - b.order);
    setTimelineItems(updated);
    addAuditLog('Manager', 'Added Timeline Item', item.title);
    saveTimelineItemToCloud(item).catch((e) => console.warn('Cloud timeline:', e));
    fetch('/api/timeline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: updated })
    }).catch(() => {});
  };
  const updateTimelineItem = (id: string, item: Partial<TimelineItem>) => {
    let fullItem: TimelineItem | null = null;
    const updated = timelineItems.map((t) => {
      if (t.id === id) {
        fullItem = { ...t, ...item };
        return fullItem;
      }
      return t;
    });
    setTimelineItems(updated);
    addAuditLog('Manager', 'Updated Timeline Item', id);
    if (fullItem) {
      saveTimelineItemToCloud(fullItem).catch((e) => console.warn('Cloud timeline:', e));
    }
    fetch('/api/timeline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: updated })
    }).catch(() => {});
  };
  const deleteTimelineItem = (id: string) => {
    const updated = timelineItems.filter((t) => t.id !== id);
    setTimelineItems(updated);
    addAuditLog('Manager', 'Deleted Timeline Item', id);
    deleteTimelineItemFromCloud(id).catch((e) => console.warn('Cloud timeline delete:', e));
    fetch('/api/timeline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: updated })
    }).catch(() => {});
  };
  const reorderTimelineItems = (newItems: TimelineItem[]) => {
    setTimelineItems(newItems);
    addAuditLog('Manager', 'Reordered Timeline', `${newItems.length} items reordered`);
    for (const it of newItems) {
      saveTimelineItemToCloud(it).catch(() => {});
    }
    fetch('/api/timeline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: newItems })
    }).catch(() => {});
  };

  // Reviews
  const addReview = (review: ReviewItem) => {
    setReviews((prev) => { const next = [review, ...prev]; saveWebsiteContentToCloud({ reviews: next } as any).catch(console.warn); return next; });
  };
  const updateReview = (id: string, review: Partial<ReviewItem>) => {
    setReviews((prev) => { const next = prev.map((r) => r.id === id ? { ...r, ...review } : r); saveWebsiteContentToCloud({ reviews: next } as any).catch(console.warn); return next; });
  };
  const deleteReview = (id: string) => {
    setReviews((prev) => { const next = prev.filter((r) => r.id !== id); saveWebsiteContentToCloud({ reviews: next } as any).catch(console.warn); return next; });
  };

  // Food guide CMS
  const addFoodGuideItem = (item: FoodGuideItem) => {
    setFoodGuide((prev) => { const next = [item, ...prev]; saveWebsiteContentToCloud({ foodGuideItems: next } as any).catch(console.warn); return next; });
  };
  const updateFoodGuideItem = (id: string, item: Partial<FoodGuideItem>) => {
    setFoodGuide((prev) => { const next = prev.map((x) => x.id === id ? { ...x, ...item } as FoodGuideItem : x); saveWebsiteContentToCloud({ foodGuideItems: next } as any).catch(console.warn); return next; });
  };
  const deleteFoodGuideItem = (id: string) => {
    setFoodGuide((prev) => { const next = prev.filter((x) => x.id !== id); saveWebsiteContentToCloud({ foodGuideItems: next } as any).catch(console.warn); return next; });
  };


  // Bookings (Synchronized to Cloud Firestore & server)
  const createBooking = (bookingData: Omit<BookingRecord, 'id' | 'createdAt'>): BookingRecord => {
    const newBooking: BookingRecord = {
      ...bookingData,
      id: `book-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setBookings((prev) => [newBooking, ...prev]);
    addAuditLog('Manager', 'New Booking Created', `${newBooking.referenceNumber} - ${newBooking.customerName}`);
    saveBookingToCloud(newBooking).catch((e) => console.warn('Cloud booking:', e));
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBooking)
    }).catch(() => {});
    return newBooking;
  };

  const addBooking = (data: any): BookingRecord => {
    const record: Omit<BookingRecord, 'id' | 'createdAt'> = {
      referenceNumber: data.referenceNumber || `KV-BOK-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: data.customerName || 'Valued Guest',
      mobile: data.mobile || data.customerPhone || '',
      customerPhone: data.customerPhone || data.mobile || '',
      email: data.email || data.customerEmail || '',
      customerEmail: data.customerEmail || data.email || '',
      adults: Number(data.adults || 2),
      children: Number(data.children || 0),
      travelDate: data.travelDate || new Date().toISOString().split('T')[0],
      returnDate: data.returnDate || new Date().toISOString().split('T')[0],
      durationDays: Number(data.durationDays || 5),
      pickupLocation: data.pickupLocation || 'Srinagar Airport (SXR)',
      destination: data.destination || 'Srinagar & Gulmarg',
      vehicleType: data.vehicleType || 'Toyota Innova Crysta',
      hotelCategory: data.hotelCategory || 'Luxury Heritage Houseboat',
      selectedPackage: data.selectedPackage,
      selectedHotel: data.selectedHotel,
      selectedVehicle: data.selectedVehicle || data.vehicleType,
      selectedActivities: data.selectedActivities || [],
      specialRequirements: data.specialRequirements || data.specialRequests,
      specialRequests: data.specialRequests || data.specialRequirements,
      tripAmount: Number(data.tripAmount || data.totalAmount || 0),
      totalAmount: Number(data.totalAmount || data.tripAmount || 0),
      advanceAmount: Number(data.advanceAmount || 0),
      remainingAmount: Number(data.remainingAmount || 0),
      paymentMethod: data.paymentMethod || 'UPI QR',
      paymentStatus: data.paymentStatus || 'Payment Verification',
      bookingStatus: data.bookingStatus || 'Confirmed',
      paymentProofUrl: data.paymentProofUrl,
      utrReference: data.utrReference || data.utrNumber,
      driverDetails: data.driverDetails
    };
    return createBooking(record);
  };

  const updateBooking = (id: string, updates: Partial<BookingRecord>) => {
    let fullBooking: BookingRecord | null = null;
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === id || b.referenceNumber === id) {
          fullBooking = { ...b, ...updates };
          return fullBooking;
        }
        return b;
      })
    );
    addAuditLog('Manager', 'Updated Booking', `${id}: ${Object.keys(updates).join(', ')}`);
    if (fullBooking) {
      saveBookingToCloud(fullBooking).catch((e) => console.warn('Cloud booking:', e));
    }
  };

  const deleteBooking = (idOrRef: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== idOrRef && b.referenceNumber !== idOrRef));
    addAuditLog('Manager', 'Deleted Booking', `Removed record ${idOrRef}`);
    deleteBookingFromCloud(idOrRef).catch((e) => console.warn('Cloud booking delete:', e));
    fetch(`/api/bookings/${idOrRef}`, { method: 'DELETE' }).catch(() => {});
  };

  const getBookingByReference = (ref: string, mobile?: string): BookingRecord | undefined => {
    const cleanRef = ref.trim().toUpperCase();
    return bookings.find((b) => {
      const matchRef = b.referenceNumber.toUpperCase() === cleanRef || b.id.toUpperCase() === cleanRef;
      if (!mobile) return matchRef;
      const cleanMobile = mobile.replace(/[^0-9]/g, '');
      const bMobile = b.mobile.replace(/[^0-9]/g, '');
      return matchRef && (bMobile.includes(cleanMobile) || cleanMobile.includes(bMobile));
    });
  };

  // Leads & Quotations (Synchronized to Cloud Firestore & server)
  const addLead = (leadData: Omit<EnquiryLead, 'id' | 'createdAt'>): EnquiryLead => {
    const newLead: EnquiryLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setLeads((prev) => [newLead, ...prev]);
    addAuditLog('Manager', 'New Lead Generated', `${newLead.leadNumber} - ${newLead.name}`);
    saveLeadToCloud(newLead).catch((e) => console.warn('Cloud lead:', e));
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLead)
    }).catch(() => {});
    return newLead;
  };

  const updateLead = (id: string, updates: Partial<EnquiryLead>) => {
    let fullLead: EnquiryLead | null = null;
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === id || l.leadNumber === id) {
          fullLead = { ...l, ...updates };
          return fullLead;
        }
        return l;
      })
    );
    addAuditLog('Manager', 'Updated Lead', `${id}: ${Object.keys(updates).join(', ')}`);
    if (fullLead) {
      saveLeadToCloud(fullLead).catch((e) => console.warn('Cloud lead:', e));
    }
  };

  const deleteLead = (idOrNumber: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== idOrNumber && l.leadNumber !== idOrNumber));
    addAuditLog('Manager', 'Deleted Lead', `Removed lead ${idOrNumber}`);
    deleteLeadFromCloud(idOrNumber).catch((e) => console.warn('Cloud lead delete:', e));
    fetch(`/api/leads/${idOrNumber}`, { method: 'DELETE' }).catch(() => {});
  };

  const createQuotation = (quoteData: Omit<Quotation, 'id' | 'createdAt'>): Quotation => {
    const newQuote: Quotation = {
      ...quoteData,
      id: `quote-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setQuotations((prev) => [newQuote, ...prev]);
    addAuditLog('Manager', 'Created Quotation', `${newQuote.quoteNumber} for ${newQuote.customerName}`);
    return newQuote;
  };

  const loginAs = (role: 'guest' | 'developer' | 'manager' | 'driver') => {
    setCurrentUserRole(role);
  };

  const logout = () => {
    setCurrentUserRole('guest');
  };

  return (
    <AppContext.Provider
      value={{
        businessInfo,
        updateBusinessInfo,
        logoSettings,
        updateLogoSettings,
        themeSettings,
        updateThemeSettings,
        restoreDefaultTheme,
        resetToDefaults,
        developerCredit,
        updateDeveloperCredit,
        paymentSettings,
        updatePaymentSettings,
        emergencyContacts,
        updateEmergencyContacts,
        liveStatus,
        updateLiveStatus,
        mountainStatus,
        updateMountainStatus,
        priceMatrix,
        updatePriceMatrix,
        websiteContent,
        updateWebsiteContent,
        destinations,
        addDestination,
        updateDestination,
        deleteDestination,
        packages,
        addPackage,
        updatePackage,
        deletePackage,
        hotels,
        addHotel,
        updateHotel,
        deleteHotel,
        vehicles,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        experiences,
        addExperience,
        updateExperience,
        deleteExperience,
        timelineItems,
        addTimelineItem,
        updateTimelineItem,
        deleteTimelineItem,
        reorderTimelineItems,
        reviews,
        addReview,
        updateReview,
        deleteReview,
        foodGuide,
        addFoodGuideItem,
        updateFoodGuideItem,
        deleteFoodGuideItem,
        travelStories,
        bookings,
        createBooking,
        addBooking,
        updateBooking,
        deleteBooking,
        getBookingByReference,
        leads,
        addLead,
        updateLead,
        deleteLead,
        quotations,
        createQuotation,
        auditLogs,
        addAuditLog,
        currentUserRole,
        loginAs,
        logout,
        activeTripModal,
        setActiveTripModal,
        activeAirportTransferModal,
        setActiveAirportTransferModal,
        activeChatModal,
        setActiveChatModal,
        syncStatus,
        lastSyncTime,
        syncAllToLiveServer,
        refreshFromLiveServer
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
