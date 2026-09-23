export interface BusinessInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  googleMapsUrl: string;
  googleMapsEmbed: string;
  officeAddress: string;
  pickupAddress: string;
  contactAddress: string;
  upiId?: string;
  upiQrCodeUrl?: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    youtube: string;
    tripadvisor?: string;
  };
}

export interface LogoSettings {
  lightLogo: string;
  darkLogo: string;
  favicon: string;
  size: number; // in pixels (e.g. 42)
  position: 'left' | 'center';
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  cardColor: string;
  textColor: string;
  fontSelection: string;
  borderRadius: number;
  buttonStyle: 'rounded-luxury' | 'pill' | 'sharp';
  animationEnabled: boolean;
  timelineAnimationDuration: number; // in seconds
  timelineAnimationDelay: number;
  timelineAnimationType: 'fade-up' | 'slide-left' | 'scale';
  customCss?: string;
  cardBorderRadius?: string;
  buttonBorderRadius?: string;
  fontFamily?: string;
}

export interface DeveloperCredit {
  enabled: boolean;
  developerName: string;
  whatsappNumber: string;
  whatsappMessage: string;
}

export interface PaymentSettings {
  upiId: string;
  upiQrCode: string;
  advancePercentage: number;
  fixedAdvanceAmount: number;
  advanceMode: 'percentage' | 'fixed';
  fullPaymentAllowed: boolean;
  currency: string;
  paymentInstructions: string;
}

export interface EmergencyContacts {
  travelAgent: string;
  policeHelpline: string;
  touristPoliceSrinagar: string;
  touristPoliceGulmarg: string;
  medicalAmbulance: string;
  sdrfRescue: string;
  driverHelpline: string;
}

export interface MountainStatusInfo {
  gondolaStatus: string;
  gulmargSnow: string;
  sonamargSnow: string;
  pahalgamWeather?: string;
  nh44Status?: string;
  snowChainsRequired?: string;
}

export interface DestinationStatus {
  weather: string;
  temp: string;
  snowStatus: string;
  roadStatus: string;
  crowd: 'Low' | 'Moderate' | 'High' | 'Peaceful';
  gondolaStatus?: string;
  lastUpdated: string;
}

export interface PriceMatrix {
  hotelPerNight: {
    budget: number;
    threeStar: number;
    fourStar: number;
    fiveStar: number;
    luxuryHouseboat: number;
  };
  vehiclePerDay: {
    sedan: number;
    suv: number;
    innova: number;
    tempoTraveller: number;
    luxurySuv: number;
  };
  airportPickup: number;
  shikaraRide: number;
  gondolaPhase1: number;
  gondolaPhase2: number;
  skiLesson: number;
  guidePerDay: number;
  wazwanDinnerPerPerson: number;
  riverRafting: number;
  ponyRideBaisaran: number;
}

export interface WebsiteContent {
  heroHeadline: string;
  heroSubheading: string;
  heroTaglineBadge: string;
  heroBackgroundImage: string;
  seasonalSectionTitle: string;
  seasonalSectionDesc: string;
  gallerySectionTitle: string;
  gallerySectionDesc: string;
  seasonalWinterImage: string;
  seasonalSpringImage: string;
  seasonalSummerImage: string;
  seasonalAutumnImage: string;
  foodGuideBannerImage: string;
  aboutTitle: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  destinationSectionTitle: string;
  destinationSectionDesc: string;
  packagesSectionTitle: string;
  packagesSectionDesc: string;
  experiencesSectionTitle: string;
  experiencesSectionDesc: string;
  foodGuideTitle: string;
  foodGuideDesc: string;
  bookingInstructions: string;
  cancellationPolicy: string;
  termsAndConditions: string;
  privacyPolicy: string;
  copyrightText: string;
  galleryImages?: { id: string; title: string; location: string; category: string; url: string }[];
  travelStories?: TravelStory[];
  foodGuideItems?: FoodGuideItem[];
  reviews?: ReviewItem[];
}

export interface Destination {
  id: string;
  name: string;
  kashmiriName?: string;
  tagline: string;
  description: string;
  images: string[];
  bannerImage: string;
  altitude: string;
  distanceFromSrinagar: string;
  driveTime: string;
  bestTime: string;
  recommendedStay: string;
  estimatedCost: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  familyFriendly: boolean;
  coupleFriendly: boolean;
  adventureRating: number; // 1-5
  snowStatus: string;
  isPopular: boolean;
  isOffbeat: boolean;
  activities: string[];
  nearbyAttractions: string[];
  thingsToDo: string[];
  howToReach: string;
  hiddenGemTip: string;
  mapCoords?: { lat: number; lng: number };
}

export interface TourPackage {
  id: string;
  title: string;
  duration: string; // e.g. "5 Nights / 6 Days"
  nights: number;
  days: number;
  badge: string;
  category: 'honeymoon' | 'family' | 'luxury' | 'adventure' | 'winter' | 'offbeat';
  coverImage: string;
  gallery: string[];
  startingPrice: number;
  discountedPrice?: number;
  route: string[];
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  dayWiseItinerary: {
    day: number;
    title: string;
    location: string;
    description: string;
    activities: string[];
  }[];
  isPopular: boolean;
  featured: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  location: string; // Srinagar, Gulmarg, Pahalgam, Sonamarg
  type: 'hotel' | 'houseboat' | 'resort' | 'chalet';
  starRating: number;
  lakeView: boolean;
  mountainView: boolean;
  breakfastIncluded: boolean;
  pricePerNight: number;
  images: string[];
  coverImage: string;
  amenities: string[];
  roomTypes: {
    name: string;
    price: number;
    capacity: string;
    features: string[];
  }[];
  mapUrl?: string;
  available: boolean;
}

export interface Vehicle {
  id: string;
  name: string;
  category: 'Sedan' | 'SUV' | 'Innova Crysta' | 'Tempo Traveller' | 'Luxury SUV';
  seats: number;
  luggageCapacity: string;
  airConditioned: boolean;
  fourWheelDrive: boolean;
  ratePerDay: number;
  airportTransferRate: number;
  image: string;
  features: string[];
  driverAssigned?: {
    name: string;
    phone: string;
    experience: string;
    vehiclePlate: string;
    rating: number;
  };
  available: boolean;
}

export interface ExperienceItem {
  id: string;
  title: string;
  category: 'cultural' | 'adventure' | 'culinary' | 'romantic' | 'seasonal';
  duration: string;
  location: string;
  price: number;
  image: string;
  description: string;
  highlights: string[];
  included: string[];
  bestTime: string;
}

export interface ActivityItem {
  id: string;
  name: string;
  destination: string;
  duration: string;
  cost: number;
  image: string;
  difficulty: string;
  description: string;
}

export interface TimelineItem {
  id: string;
  time: string;
  title: string;
  description: string;
  image?: string;
  duration?: string;
  location?: string;
  activity?: string;
  buttonText?: string;
  buttonAction?: string;
  order: number;
  active: boolean;
}

export type PaymentStatus =
  | 'Payment Pending'
  | 'Payment Initiated'
  | 'Payment Submitted'
  | 'Payment Verification Pending'
  | 'Payment Verified'
  | 'Payment Rejected'
  | 'Refunded';

export type BookingStatus =
  | 'New'
  | 'Payment Pending'
  | 'Payment Verification'
  | 'Confirmed'
  | 'Partially Paid'
  | 'Fully Paid'
  | 'Trip Ongoing'
  | 'Completed'
  | 'Cancelled'
  | 'Refund Pending'
  | 'Refunded';

export interface BookingRecord {
  id: string;
  referenceNumber: string;
  customerName: string;
  mobile: string;
  customerPhone?: string;
  email: string;
  customerEmail?: string;
  adults: number;
  children: number;
  travelDate: string;
  returnDate: string;
  durationDays?: number;
  pickupLocation: string;
  destination: string;
  vehicleType?: string;
  hotelCategory?: string;
  selectedPackage?: string;
  selectedHotel?: string;
  selectedVehicle?: string;
  selectedActivities?: string[];
  specialRequirements?: string;
  specialRequests?: string;
  itinerarySummary?: string;
  tripAmount?: number;
  totalAmount?: number;
  advanceAmount: number;
  remainingAmount: number;
  paymentMethod: 'UPI QR' | 'UPI App' | 'Card/Gateway' | 'Cash/Bank Transfer' | 'Cash on Arrival';
  paymentStatus: PaymentStatus | string;
  bookingStatus: BookingStatus | string;
  paymentProofUrl?: string;
  utrReference?: string;
  utrNumber?: string;
  paymentSubmittedAt?: string;
  paymentVerifiedAt?: string;
  createdAt: string;
  driverDetails?: {
    name: string;
    phone: string;
    carModel: string;
    numberPlate: string;
    status: 'Assigned' | 'Arrived' | 'Picked Up' | 'Trip Started' | 'Trip Completed' | string;
  };
  hotelDetails?: {
    name: string;
    location?: string;
    roomType: string;
    checkInTime: string;
  };
}

export interface EnquiryLead {
  id: string;
  leadNumber: string;
  name: string;
  phone: string;
  email?: string;
  travelDates: string;
  travellers: string;
  budget: string;
  interestedDestinations: string[];
  packageInterest?: string;
  source: string;
  status: 'New' | 'Contacted' | 'Quotation Sent' | 'Negotiation' | 'Confirmed' | 'Lost' | 'Completed';
  notes: string;
  createdAt: string;
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  leadId?: string;
  customerName: string;
  phone: string;
  hotel: string;
  roomType: string;
  vehicle: string;
  activities: string[];
  guests: number;
  nights: number;
  totalAmount: number;
  advanceAmount: number;
  validTill: string;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Converted to Booking';
  createdAt: string;
}

export interface ReviewItem {
  id: string;
  customerName: string;
  originCity: string;
  tripTitle: string;
  rating: number; // 1-5
  date: string;
  hotelRating: number;
  driverRating: number;
  foodRating: number;
  supportRating: number;
  comment: string;
  customerPhoto?: string;
  photos: string[];
  verified: boolean;
}

export interface TravelStory {
  id: string;
  title: string;
  author: string;
  duration: string;
  season: string;
  coverImage: string;
  excerpt: string;
  content: string;
  images: string[];
  likes: number;
}

export interface AuditLogItem {
  id: string;
  userRole: 'Developer' | 'Manager';
  action: string;
  details: string;
  timestamp: string;
}

export interface FoodGuideItem {
  id: string;
  name: string;
  kashmiriName: string;
  description: string;
  type: 'Non-Vegetarian' | 'Vegetarian' | 'Beverage';
  spiceLevel: 'Mild' | 'Medium' | 'Rich & Aromatic' | 'Fiery';
  whereToTry: string;
  approxPrice: string;
  image: string;
}
