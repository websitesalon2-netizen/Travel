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
  ActivityItem,
  TimelineItem,
  FoodGuideItem,
  ReviewItem,
  TravelStory,
  BookingRecord,
  EnquiryLead
} from '../types';

export const initialBusinessInfo: BusinessInfo = {
  name: "Kashmiré Voyages",
  tagline: "Bespoke Kashmir Journeys & Himalayan Hospitality",
  address: "Shalina, Budgam, J&K, India",
  phone: "+91 9622229622",
  whatsapp: "+91 9622229622",
  email: "curate@kashmirevoyages.com",
  googleMapsUrl: "https://maps.google.com/?q=Shalina,+Budgam,+Jammu+and+Kashmir",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.924846467026!2d74.78018247547704!3d34.01955357316972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e18f2584144073%3A0x89e02efb15e9e075!2sBudgam%2C%20Jammu%20and%20Kashmir!5e0!3m2!1sen!2sin!4v1711000000000!5m2!1sen!2sin",
  officeAddress: "Shalina, Budgam, J&K, India",
  pickupAddress: "Sheikh ul-Alam International Airport, Srinagar (SXR)",
  contactAddress: "Kashmiré Voyages Suite, Shalina, Budgam, J&K, India - 191111",
  socialLinks: {
    instagram: "https://instagram.com/kashmirevoyages",
    facebook: "https://facebook.com/kashmirevoyages",
    youtube: "https://youtube.com/@kashmirevoyages",
    tripadvisor: "https://tripadvisor.com"
  }
};

export const initialLogoSettings: LogoSettings = {
  lightLogo: "",
  darkLogo: "",
  favicon: "",
  size: 42,
  position: 'left'
};

export const initialThemeSettings: ThemeSettings = {
  primaryColor: "#0f4332",
  secondaryColor: "#b88628",
  accentColor: "#c99e52",
  backgroundColor: "#f8faf9",
  cardColor: "#ffffff",
  textColor: "#0f231b",
  fontSelection: "'Cinzel', 'Playfair Display', serif",
  borderRadius: 16,
  buttonStyle: 'rounded-luxury',
  animationEnabled: true,
  timelineAnimationDuration: 1.2,
  timelineAnimationDelay: 0.15,
  timelineAnimationType: 'fade-up'
};

export const initialDeveloperCredit: DeveloperCredit = {
  enabled: true,
  developerName: "Developed by Shujaat",
  whatsappNumber: "+91 9622229622",
  whatsappMessage: "Hello, I want to discuss about website for my business."
};

export const initialPaymentSettings: PaymentSettings = {
  upiId: "9622229622@upi",
  upiQrCode: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=9622229622@upi&pn=Kashmire%20Voyages&cu=INR",
  advancePercentage: 30,
  fixedAdvanceAmount: 15000,
  advanceMode: 'percentage',
  fullPaymentAllowed: true,
  currency: "INR (₹)",
  paymentInstructions: "Scan the official Kashmiré Voyages QR Code or tap 'Pay with UPI App' to initiate payment directly to 9622229622@upi. Submit your 12-digit UTR/Reference number and receipt screenshot for instant manager verification."
};

export const initialEmergencyContacts: EmergencyContacts = {
  travelAgent: "+91 9622229622",
  policeHelpline: "112 / 100",
  touristPoliceSrinagar: "+91 194 2452222",
  touristPoliceGulmarg: "+91 1954 254444",
  medicalAmbulance: "108",
  sdrfRescue: "+91 194 2472424",
  driverHelpline: "+91 9622229622"
};

export const initialLiveStatus: Record<string, DestinationStatus> = {
  Gulmarg: {
    weather: "Sunny with Sub-Zero Crisp Winds",
    temp: "-2°C",
    snowStatus: "Fresh Powder Snow (Phase 1: 3.5 ft | Phase 2: 7 ft)",
    roadStatus: "Open (Snow chains mandatory Tangmarg upwards)",
    crowd: "Moderate",
    gondolaStatus: "Phase 1 & 2 fully operational",
    lastUpdated: "Today, 10:30 AM"
  },
  Pahalgam: {
    weather: "Clear Alpine Sunlight",
    temp: "+5°C",
    snowStatus: "Snow visible in Aru & Baisaran Valley",
    roadStatus: "Clear & Smooth via National Highway 44",
    crowd: "Peaceful",
    gondolaStatus: "Pony Trails & Cab circuits open",
    lastUpdated: "Today, 10:30 AM"
  },
  Sonamarg: {
    weather: "Alpine Mist & Sunshine",
    temp: "+1°C",
    snowStatus: "Thajiwas Glacier snow accessible",
    roadStatus: "Open through Z-Morh all-weather tunnel",
    crowd: "Moderate",
    gondolaStatus: "Snow sledging & pony routes active",
    lastUpdated: "Today, 10:30 AM"
  },
  Srinagar: {
    weather: "Golden Morning Mist over Dal",
    temp: "+9°C",
    snowStatus: "Snow-dusted Zabarwan mountain ranges",
    roadStatus: "All city, Boulevard & Airport routes open",
    crowd: "Moderate",
    gondolaStatus: "All Shikara ghats operating",
    lastUpdated: "Today, 10:30 AM"
  },
  Gurez: {
    weather: "Deep Winter Sub-Zero Chill",
    temp: "-6°C",
    snowStatus: "Heavy snow blanket in Dawar & Razdan Pass",
    roadStatus: "4x4 snow vehicles allowed with passes",
    crowd: "Low",
    gondolaStatus: "Pristine untouched wilderness",
    lastUpdated: "Today, 10:30 AM"
  },
  Doodhpathri: {
    weather: "Crisp Pine Breeze",
    temp: "+4°C",
    snowStatus: "Meadow snow banks near Shaliganga river",
    roadStatus: "Clear road from Budgam / Srinagar",
    crowd: "Peaceful",
    lastUpdated: "Today, 10:30 AM"
  }
};

export const initialPriceMatrix: PriceMatrix = {
  hotelPerNight: {
    budget: 2800,
    threeStar: 4500,
    fourStar: 7800,
    fiveStar: 16500,
    luxuryHouseboat: 9500
  },
  vehiclePerDay: {
    sedan: 2800,
    suv: 4200,
    innova: 4900,
    tempoTraveller: 7500,
    luxurySuv: 9500
  },
  airportPickup: 1400,
  shikaraRide: 1200,
  gondolaPhase1: 850,
  gondolaPhase2: 1050,
  skiLesson: 2500,
  guidePerDay: 1800,
  wazwanDinnerPerPerson: 1600,
  riverRafting: 1800,
  ponyRideBaisaran: 1500
};

export const initialWebsiteContent: WebsiteContent = {
  heroHeadline: "Your Kashmir Story Starts Here.",
  heroSubheading: "Plan. Customize. Book. Experience the crown of the Himalayas with local travel connoisseurs and bespoke concierge service.",
  heroTaglineBadge: "AUTHENTIC KASHMIRI CONCIERGE & BOUTIQUE OPERATOR",
  heroBackgroundImage: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2000&q=85",
  seasonalSectionTitle: "When Should You Visit Paradise?",
  seasonalSectionDesc: "Every season in Kashmir paints a completely different canvas. Select your ideal mood below to view seasonal highlights and packing essentials.",
  gallerySectionTitle: "Glimpses of Paradise",
  gallerySectionDesc: "Photographed by our mountain guides and travelers across all four distinct seasons.",
  seasonalWinterImage: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
  seasonalSpringImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
  seasonalSummerImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
  seasonalAutumnImage: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
  foodGuideBannerImage: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1400&q=80",
  aboutTitle: "The Soul of Kashmiré Voyages",
  aboutParagraph1: "Born in the scenic meadows of Budgam, Kashmiré Voyages was crafted to redefine mountain travel. We blend the timeless warmth of Kashmiri hospitality ('Mehman-nawazi') with modern concierge standards, private executive fleets, hand-selected luxury houseboats, and certified local mountain guides.",
  aboutParagraph2: "From soaring Apharwat snowlines in Gulmarg to the poetic seclusion of Gurez and midnight whispers over Nigeen Lake, every journey we curate is deeply personal, unhurried, and authentic.",
  destinationSectionTitle: "The Enigmatic Crown of Kashmir",
  destinationSectionDesc: "Explore majestic glacier peaks, historic saffron meadows, quiet pine-shadowed glens, and pristine border valleys documented with official JKTDC insights.",
  packagesSectionTitle: "Curated Kashmir Itineraries",
  packagesSectionDesc: "Handcrafted journeys balancing iconic sights with intimate local discoveries, private chauffeured transfers, and verified luxury stays.",
  experiencesSectionTitle: "The Kashmir Experience Marketplace",
  experiencesSectionDesc: "Immerse in timeless traditions: glide on floating lotus gardens, savor royal Wazwan feasts, and carve tracks on powdery ski runs.",
  foodGuideTitle: "The Imperial Wazwan & Culinary Heritage",
  foodGuideDesc: "Discover Kashmir's rich gastronomy shaped by centuries of silk route spices, slow-simmered brass pots, and wild mountain herbs.",
  bookingInstructions: "Select your desired travel parameters, review your transparent pricing breakdown, and confirm via UPI QR Code or mobile UPI deep link. Once payment proof is submitted, our operations team verifies your reservation immediately.",
  cancellationPolicy: "Full refund for cancellations made 15+ days prior to arrival. 50% refund for cancellations within 7-14 days. Rescheduling is complimentary up to 72 hours before arrival subject to seasonal room availability.",
  termsAndConditions: "All tours operate under J&K Tourism official standards. 4x4 vehicles and snow chains are deployed as per Tangmarg/Gulmarg traffic authority regulations during snowfall. Rates include driver allowance, fuel, tolls, and parking.",
  privacyPolicy: "Kashmiré Voyages preserves the confidentiality of our travelers. Identity records collected for border permits or hotel check-in comply with Indian privacy regulations and are never shared with external advertisers.",
  copyrightText: "© 2026 Kashmiré Voyages. All Rights Reserved. Shalina, Budgam, J&K, India.",
  galleryImages: [
    {id:"gallery-1",title:"Gondola Phase 2 Snow Peaks",location:"Gulmarg, 13,780 ft",category:"Snow & Mountains",url:"https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"},
    {id:"gallery-2",title:"Golden Hour Houseboats on Nigeen Lake",location:"Srinagar",category:"Lakes & Water",url:"https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80"},
    {id:"gallery-3",title:"Lidder River Pine Valley Trails",location:"Pahalgam",category:"Valleys & Pines",url:"https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80"},
    {id:"gallery-4",title:"Habba Khatoon Pyramid Peak",location:"Gurez Valley",category:"Offbeat & Hidden",url:"https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80"}
  ],
  travelStories: []
};

export const initialDestinations: Destination[] = [
  {
    id: "gulmarg",
    name: "Gulmarg",
    kashmiriName: "گلمرگ (Meadow of Flowers)",
    tagline: "Asia's Premier Ski Paradise & Highest Cable Car",
    description: "Nestled at 8,694 ft in the Pir Panjal range, Gulmarg is world-renowned for powdery alpine ski slopes and the iconic Gulmarg Gondola that ascends to 13,780 ft at Apharwat Peak.",
    images: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1620619767323-b95a89183081?auto=format&fit=crop&w=1000&q=80"
    ],
    bannerImage: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80",
    altitude: "2,650 m (8,694 ft)",
    distanceFromSrinagar: "51 km",
    driveTime: "1 hr 45 min",
    bestTime: "Dec - Mar (Snow/Ski) | May - Sep (Lush Golf & Meadows)",
    recommendedStay: "2 to 3 Nights",
    estimatedCost: "₹18,000 - ₹45,000 / couple",
    difficulty: "Moderate",
    familyFriendly: true,
    coupleFriendly: true,
    adventureRating: 5,
    snowStatus: "Heavy powder snow active at Phase 1 & 2",
    isPopular: true,
    isOffbeat: false,
    activities: ["Gondola Phase 1 & Phase 2", "Powder Skiing & Snowboarding", "Snowmobile Safari", "St. Mary's Victorian Church", "Strawberry Valley Walk"],
    nearbyAttractions: ["Tangmarg Pine Forest", "Drung Frozen Waterfall", "Baba Reshi Shrine", "Alpather Frozen Lake"],
    thingsToDo: ["Ride the world's second-highest operating cable car", "Take certified ski lessons with licensed instructors", "Warm up with hot Kahwa at Kongdoori bowl"],
    howToReach: "Drive via Srinagar-Baramulla Highway to Tangmarg; switch to 4x4 snow chain vehicles for the final 12 km alpine climb during winter.",
    hiddenGemTip: "Visit Drung Frozen Waterfall in early morning before tour crowds arrive.",
    mapCoords: { lat: 34.0484, lng: 74.3805 }
  },
  {
    id: "pahalgam",
    name: "Pahalgam",
    kashmiriName: "پہلگام (Valley of Shepherds)",
    tagline: "Lidder River Symphony & Pine-Clad Romantic Glades",
    description: "Situated at the confluence of streams flowing from Sheshnag Lake and Lidder River, Pahalgam offers sweeping pine meadows, rushing trout streams, and tranquil valley trails.",
    images: [
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80"
    ],
    bannerImage: "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1600&q=80",
    altitude: "2,130 m (6,988 ft)",
    distanceFromSrinagar: "92 km",
    driveTime: "2 hr 30 min",
    bestTime: "April - November (Greenery & Rafting) | Dec - Feb (Winter Snow)",
    recommendedStay: "2 Nights",
    estimatedCost: "₹14,000 - ₹38,000 / couple",
    difficulty: "Easy",
    familyFriendly: true,
    coupleFriendly: true,
    adventureRating: 4,
    snowStatus: "Snow blanket in upper Aru & Chandanwari",
    isPopular: true,
    isOffbeat: false,
    activities: ["Betaab Valley excursion", "Aru Valley eco-village hike", "Baisaran 'Mini Switzerland' horse trail", "Lidder River rafting", "Trout angling"],
    nearbyAttractions: ["Chandanwari (Amarnath Base)", "Aru Wildlife Sanctuary", "Mamaleshwar Temple (12th Century)", "Baisaran Meadow"],
    thingsToDo: ["Picnic on the banks of Lidder River", "Hike through Aru's traditional wooden log villages", "Taste fresh river trout at riverside wood bistros"],
    howToReach: "Comfortable drive through saffron town Pampore and Awantipora ruins along NH 44.",
    hiddenGemTip: "Aru Valley is far more peaceful in the afternoon after day-trippers return to Pahalgam center.",
    mapCoords: { lat: 34.0150, lng: 75.3262 }
  },
  {
    id: "srinagar",
    name: "Srinagar",
    kashmiriName: "سرینگر (City of the Sun & Lakes)",
    tagline: "Carved Walnut Houseboats, Floating Markets & Mughal Gardens",
    description: "The summer capital and heartbeat of Kashmir, famous for Dal and Nigeen Lakes, floating shikaras, ancient wooden shrines, and terraces of Nishat & Shalimar Mughal gardens.",
    images: [
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=1000&q=80"
    ],
    bannerImage: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=80",
    altitude: "1,585 m (5,200 ft)",
    distanceFromSrinagar: "0 km (Center)",
    driveTime: "City Hub (Airport: 25 min)",
    bestTime: "All Year Round (Tulip Festival in April; Chinar Gold in Autumn)",
    recommendedStay: "2 to 3 Nights",
    estimatedCost: "₹12,000 - ₹35,000 / couple",
    difficulty: "Easy",
    familyFriendly: true,
    coupleFriendly: true,
    adventureRating: 2,
    snowStatus: "Chilly winter air; snow on surrounding mountain rims",
    isPopular: true,
    isOffbeat: false,
    activities: ["Sunrise floating vegetable market shikara", "Nishat & Shalimar Mughal Gardens", "Old Downtown wood architecture walk", "Pashmina & carpet weaving ateliers", "Pari Mahal sunset"],
    nearbyAttractions: ["Shankaracharya Temple", "Hazratbal Shrine", "Khanqah-e-Moula", "Dachigam National Park"],
    thingsToDo: ["Stay in an authentic carved cedar houseboat on Nigeen Lake", "Drink Kehwa on a shikara near Char Chinar", "Explore Downtown copper bazaar"],
    howToReach: "Srinagar Airport (SXR) has daily direct flights from Delhi, Mumbai, Bengaluru, Chandigarh, and Jammu.",
    hiddenGemTip: "Nigeen Lake has 80% fewer noisy motorboats than Boulevard Dal Lake, ideal for tranquility.",
    mapCoords: { lat: 34.0837, lng: 74.7973 }
  },
  {
    id: "sonamarg",
    name: "Sonamarg",
    kashmiriName: "سونمرگ (Meadow of Gold)",
    tagline: "Glacier Gateways to Ladakh & Sparkling Sindh Waters",
    description: "Surrounded by soaring snow-bound peaks like Kolahoi, Sonamarg is the majestic gateway where Sindh river carves through mountain cliffs and ancient glaciers.",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80"
    ],
    bannerImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    altitude: "2,730 m (8,957 ft)",
    distanceFromSrinagar: "80 km",
    driveTime: "2 hr 15 min",
    bestTime: "April to October | Winter access now open via Z-Morh Tunnel",
    recommendedStay: "1 to 2 Nights",
    estimatedCost: "₹12,000 - ₹28,000 / couple",
    difficulty: "Moderate",
    familyFriendly: true,
    coupleFriendly: true,
    adventureRating: 4,
    snowStatus: "Year-round snow at Thajiwas Glacier and Nilagrad",
    isPopular: true,
    isOffbeat: false,
    activities: ["Thajiwas Glacier pony/sledge tour", "Zero Point snow excursion", "Sindh river whitewater rafting", "Baltal Valley scenic drive"],
    nearbyAttractions: ["Zoji La Pass", "Fish Point Nilagrad", "Krishnasar & Vishansar Alpine Lakes Trek base"],
    thingsToDo: ["Hike up to Thajiwas glacier snout", "Taste authentic highway Kangri tea", "Photograph wild alpine meadows"],
    howToReach: "NH1 road towards Leh; recently fortified with the state-of-the-art Z-Morh tunnel ensuring winter connectivity.",
    hiddenGemTip: "Drive 10 km past Sonamarg town towards Baltal for breathtaking untouched cliffside vistas.",
    mapCoords: { lat: 34.3129, lng: 75.2974 }
  },
  {
    id: "doodhpathri",
    name: "Doodhpathri",
    kashmiriName: "دودھ پتھری (Valley of Milk)",
    tagline: "Pristine Frothing Streams & Unspoiled Rolling Alpine Downs",
    description: "Located right here in Budgam district, Doodhpathri is an unspoiled bowl of velvet green pastures where the Shaliganga river froths with milky white water over river stones.",
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80"
    ],
    bannerImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    altitude: "2,730 m (8,957 ft)",
    distanceFromSrinagar: "42 km (from Budgam: 28 km)",
    driveTime: "1 hr 20 min",
    bestTime: "May to October (Lush Downs) | Dec to Feb (Snow Sanctuary)",
    recommendedStay: "Day Trip or 1 Night",
    estimatedCost: "₹6,000 - ₹15,000 / couple",
    difficulty: "Easy",
    familyFriendly: true,
    coupleFriendly: true,
    adventureRating: 3,
    snowStatus: "Serene snow glades with no crowded commercial noise",
    isPopular: false,
    isOffbeat: true,
    activities: ["Shaliganga river bank walk", "Horse riding through pine ridges", "Authentic Gujjar nomad hut visits", "Peaceful alpine meditation"],
    nearbyAttractions: ["Parhas Maidan", "Khanpur Sarai", "Dikshal Village"],
    thingsToDo: ["Dip your hands into icy mountain water", "Enjoy fresh roasted corn and tea with local shepherds", "Hike to Dikshal ridges"],
    howToReach: "Smooth drive through Budgam town, Khansahib pine belt, and winding alpine forests.",
    hiddenGemTip: "Because Kashmiré Voyages office is located in Budgam, we offer private luxury day hampers and private guides here.",
    mapCoords: { lat: 33.9167, lng: 74.5833 }
  },
  {
    id: "gurez",
    name: "Gurez Valley",
    kashmiriName: "گوریز (The Forgotten Himalayan Shangri-La)",
    tagline: "Crown of Habba Khatoon Peak & The Sacred Kishanganga River",
    description: "Deep in the northern borderlands across the 11,672 ft Razdan Pass lies Gurez—a timeless valley of log homes, Dard-Shin tribal culture, and Habba Khatoon's poetic pyramid peak.",
    images: [
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
    ],
    bannerImage: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1600&q=80",
    altitude: "2,400 m (8,000 ft)",
    distanceFromSrinagar: "123 km",
    driveTime: "4 hr 30 min",
    bestTime: "June to October (Summer) | Dedicated snow permits in early winter",
    recommendedStay: "2 to 3 Nights",
    estimatedCost: "₹22,000 - ₹45,000 / couple",
    difficulty: "Moderate",
    familyFriendly: true,
    coupleFriendly: true,
    adventureRating: 5,
    snowStatus: "Heavy winter snow isolated paradise",
    isPopular: false,
    isOffbeat: true,
    activities: ["Habba Khatoon peak sunset", "Kishanganga river trout angling", "Dawar wooden village exploration", "Razdan Pass viewpoint panorama", "Camping by border star skies"],
    nearbyAttractions: ["Tulail Valley", "Chorwan Border Village", "Wular Lake (en-route)"],
    thingsToDo: ["Hear the folk ballad of poet queen Habba Khatoon", "Cross the roaring Kishanganga river suspension footbridges"],
    howToReach: "Drive from Srinagar via Bandipora and climb up the zig-zagging Razdan Pass into Dawar.",
    hiddenGemTip: "Kashmiré Voyages handles all northern district permit documentation in advance.",
    mapCoords: { lat: 34.6333, lng: 74.9000 }
  },
  {
    id: "yusmarg",
    name: "Yusmarg",
    kashmiriName: "یوسمرگ (Meadow of Jesus)",
    tagline: "Endless Green Undulations & The Roaring Doodh Ganga",
    description: "A tranquil paradise flanked by Sunset Peak (Tatadoti) and Sang-e-Safed valley. Less commercialized than Gulmarg, offering miles of virgin pine forest walks.",
    images: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80"
    ],
    bannerImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80",
    altitude: "2,396 m (7,861 ft)",
    distanceFromSrinagar: "47 km",
    driveTime: "1 hr 45 min",
    bestTime: "May to October (Lush Downs) | Jan - Feb (Snow Solitude)",
    recommendedStay: "1 Night or Day Excursion",
    estimatedCost: "₹8,000 - ₹18,000 / couple",
    difficulty: "Easy",
    familyFriendly: true,
    coupleFriendly: true,
    adventureRating: 3,
    snowStatus: "Quiet snow glens with zero lift crowds",
    isPopular: false,
    isOffbeat: true,
    activities: ["Doodh Ganga river hike", "Nilnag Alpine Blue Lake trek", "Horse trail to Sang-e-Safed valley", "Charar-e-Sharief shrine visit"],
    nearbyAttractions: ["Charar-e-Sharief (Sheikh Noor-ud-din Wali Shrine)", "Nilnag Lake", "Sunset Peak views"],
    thingsToDo: ["Walk alongside Doodh Ganga's roaring gushing waters", "Taste fresh Kashmiri walnut pastries en-route"],
    howToReach: "Accessible via Chadoora and Charar-e-Sharief highway through Apple orchards.",
    hiddenGemTip: "Nilnag is a blue water lake hidden in pine trees reachable by a 4 km picturesque walk.",
    mapCoords: { lat: 33.8290, lng: 74.6640 }
  },
  {
    id: "sinthan_top",
    name: "Sinthan Top",
    kashmiriName: "سنتھن ٹاپ (The 12,500 ft High Mountain Pass)",
    tagline: "360-Degree Himalayan Snow Panoramas Linking Kashmir to Kishtwar",
    description: "Perched at 12,500 ft on the Breng valley border, Sinthan Top offers snow availability even in late summer, with sweeping views of Pir Panjal and Chenab valleys.",
    images: [
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80"
    ],
    bannerImage: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1600&q=80",
    altitude: "3,800 m (12,467 ft)",
    distanceFromSrinagar: "132 km",
    driveTime: "4 hr 15 min",
    bestTime: "May to October (Road accessible)",
    recommendedStay: "Stay at Kokernag / Daksum & day pass",
    estimatedCost: "₹15,000 - ₹26,000 / couple",
    difficulty: "Challenging",
    familyFriendly: true,
    coupleFriendly: true,
    adventureRating: 5,
    snowStatus: "Snow present until mid-July at top pass",
    isPopular: false,
    isOffbeat: true,
    activities: ["High altitude pass photography", "Snow play in summer months", "Daksum pine picnic", "Kokernag botanical gardens"],
    nearbyAttractions: ["Daksum Forest Reserve", "Kokernag Rose Gardens", "Achabal Mughal Garden"],
    thingsToDo: ["Stand with one foot in Kashmir valley and one in Jammu province", "Pack hot thermos tea for the freezing pass winds"],
    howToReach: "Via Anantnag, Kokernag, and Daksum forest road.",
    hiddenGemTip: "Pair with an overnight stay in the JKTDC wooden chalets of Daksum pine glade.",
    mapCoords: { lat: 33.5670, lng: 75.4980 }
  },
  {
    id: "aharbal",
    name: "Aharbal Waterfall",
    kashmiriName: "اہربل (Niagara of Kashmir)",
    tagline: "Thundering Mountain Falls & The Pristine Kounsarnag Trail",
    description: "Where the roaring Veshav river plunges 25 meters down sheer basalt canyon rock, surrounded by deep fir and pine woods in Kulgam district.",
    images: [
      "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1200&q=80"
    ],
    bannerImage: "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1600&q=80",
    altitude: "2,266 m (7,434 ft)",
    distanceFromSrinagar: "75 km",
    driveTime: "2 hr 15 min",
    bestTime: "April to October",
    recommendedStay: "Day excursion from Srinagar or 1 Night",
    estimatedCost: "₹7,000 - ₹16,000 / couple",
    difficulty: "Moderate",
    familyFriendly: true,
    coupleFriendly: true,
    adventureRating: 4,
    snowStatus: "Winter ice cascades and snow banks",
    isPopular: false,
    isOffbeat: true,
    activities: ["Waterfall lookout decks", "Veshav river canyon photography", "Trek towards Kounsarnag high glacial lake", "Apple orchard farm tour"],
    nearbyAttractions: ["Kungwattan meadow", "Kounsarnag Lake", "Shopian apple country"],
    thingsToDo: ["Feel the mist of the crashing falls on the secure iron viewing decks", "Taste fresh crisp Honeycrisp apples right from trees in autumn"],
    howToReach: "Drive via Pulwama or Shopian apple capital.",
    hiddenGemTip: "Stop in Shopian for the freshest autumn apples and walnuts directly from growers.",
    mapCoords: { lat: 33.6470, lng: 74.7920 }
  },
  {
    id: "dachigam",
    name: "Dachigam National Park",
    kashmiriName: "داچی گام (Ten Villages)",
    tagline: "Last Sanctuary of the Royal Hangul Stag & Himalayan Black Bear",
    description: "Spanning 141 sq km right behind Srinagar's Zabarwan mountains, Dachigam protects the critically endangered Hangul (Kashmir Stag) in untouched oak and birch wilderness.",
    images: [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80"
    ],
    bannerImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80",
    altitude: "1,700 m to 4,300 m",
    distanceFromSrinagar: "22 km",
    driveTime: "40 min",
    bestTime: "October - March (Hangul in Lower Dachigam) | May - Aug (Flora & Upper Trails)",
    recommendedStay: "Half-day Safari",
    estimatedCost: "₹3,500 - ₹8,000 / private safari",
    difficulty: "Easy",
    familyFriendly: true,
    coupleFriendly: true,
    adventureRating: 3,
    snowStatus: "Snow dusted oak slopes",
    isPopular: true,
    isOffbeat: true,
    activities: ["Guided battery car safari", "Hangul deer spotting", "Trout breeding hatchery visit", "Himalayan black bear conservation trail"],
    nearbyAttractions: ["Harwan Buddhist Ruins", "Astaan-e-Syed Mirak Shah", "Zabarwan Park"],
    thingsToDo: ["Carry telephoto lenses for deer spotting", "Experience the pure silence of the protected reserve"],
    howToReach: "Scenic drive alongside Dal Lake, Shalimar, and Harwan canal.",
    hiddenGemTip: "Department permits must be applied 24 hours prior; our team manages everything.",
    mapCoords: { lat: 34.1333, lng: 75.0333 }
  }
];

export const initialPackages: TourPackage[] = [
  {
    id: "pkg-honeymoon-royale",
    title: "Kashmiré Royal Honeymoon & Romance",
    duration: "5 Nights / 6 Days",
    nights: 5,
    days: 6,
    badge: "MOST POPULAR FOR COUPLES",
    category: "honeymoon",
    coverImage: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1000&q=80"
    ],
    startingPrice: 52000,
    discountedPrice: 46800,
    route: ["Srinagar (Heritage Houseboat)", "Gulmarg (Snow Pines)", "Pahalgam (Lidder Valleys)", "Srinagar (Mughal Heritage)"],
    overview: "Designed for couples seeking supreme intimacy, featuring a luxury carved-cedar houseboat on serene Nigeen Lake, flower-bedecked private shikara cruises, gondola snow passes, candlelight wazwan dinner, and executive sedan chauffeur throughout.",
    highlights: [
      "2 Nights Luxury Cedar Houseboat on peaceful Nigeen Lake",
      "1 Night Mountain View Resort in Gulmarg with fireplace suite",
      "2 Nights Riverfront Resort in Pahalgam",
      "Private Sunset Shikara Cruise with fresh Kehwa and flowers",
      "Candlelight Wazwan 7-course dinner for two",
      "Complimentary professional couple photo session in traditional Pheran"
    ],
    inclusions: [
      "Dedicated Chauffeur in Executive Sedan (AC, fuel, tolls included)",
      "Daily gourmet buffet breakfasts & royal dinners",
      "Nigeen Lake Shikara Cruise (2 hours)",
      "Airport VIP pick up and drop with luggage assistance",
      "All interstate tolls, parking, and driver allowances"
    ],
    exclusions: [
      "Airfare / Train tickets",
      "Gulmarg Gondola tickets (can be bundled at actuals)",
      "Pony riding / sledge fees in Baisaran"
    ],
    dayWiseItinerary: [
      {
        day: 1,
        title: "Srinagar Airport Arrival & Nigeen Houseboat Romance",
        location: "Srinagar",
        description: "VIP meet and greet at Srinagar Airport. Transfer to luxury houseboat. Relax with saffron Kahwa. In the evening, embark on a private sunset shikara ride across tranquil lotus canals.",
        activities: ["Airport Reception", "Houseboat Check-in", "Sunset Shikara Cruise", "Candlelight Dinner"]
      },
      {
        day: 2,
        title: "Srinagar to Gulmarg: Ascent to Apharwat Snows",
        location: "Gulmarg",
        description: "Scenic drive via Tangmarg pine forests to Gulmarg. Check into pine resort. Board Gulmarg Gondola up to Kongdoori and Apharwat peak for snow play and scenic views.",
        activities: ["Drive to Gulmarg", "Gondola Phase 1 & 2", "Snow Play", "Fireplace Suite Relaxation"]
      },
      {
        day: 3,
        title: "Gulmarg to Pahalgam: Through the Saffron Valleys",
        location: "Pahalgam",
        description: "Travel through the saffron fields of Pampore and historic Awantipora ruins. Arrive in Pahalgam by the singing Lidder river. Evening leisure at the riverside promenade.",
        activities: ["Saffron Farm Stop", "Awantipora Ruins", "Pahalgam Arrival", "Riverside Bonfire"]
      },
      {
        day: 4,
        title: "Betaab Valley, Aru & Baisaran 'Mini Switzerland'",
        location: "Pahalgam",
        description: "Excursion to Betaab Valley, named after the Bollywood romance. Continue into pristine Aru Valley village. Optional horse ride to Baisaran alpine green meadow.",
        activities: ["Betaab Valley", "Aru Valley", "Baisaran Meadow", "Local Trout Dinner"]
      },
      {
        day: 5,
        title: "Pahalgam to Srinagar: Mughal Heritage & Old Downtown",
        location: "Srinagar",
        description: "Return to Srinagar. Visit royal terraced gardens: Nishat Bagh and Shalimar Bagh. Sunset from Pari Mahal with sweeping views over Dal Lake.",
        activities: ["Mughal Gardens Tour", "Pari Mahal Sunset", "Pashmina Atelier Walk", "Farewell Wazwan"]
      },
      {
        day: 6,
        title: "Farewell to Paradise",
        location: "Srinagar Airport",
        description: "Final morning breakfast overlooking the mountains. Transfer to Srinagar International Airport with commemorative Kashmiri saffron gift box.",
        activities: ["Breakfast", "Airport Transfer", "Assisted Departure"]
      }
    ],
    isPopular: true,
    featured: true
  },
  {
    id: "pkg-winter-wonderland",
    title: "Gulmarg Ski & Winter Wonderland Expedition",
    duration: "4 Nights / 5 Days",
    nights: 4,
    days: 5,
    badge: "POWDER SNOW GUARANTEE",
    category: "winter",
    coverImage: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80"
    ],
    startingPrice: 42000,
    discountedPrice: 38500,
    route: ["Srinagar", "Drung Frozen Waterfall", "Gulmarg Apharwat", "Tangmarg", "Srinagar"],
    overview: "Crafted for snow enthusiasts and winter photographers. Spend multiple days in Gulmarg's powdery terrain with licensed ski coaches, snowmobile trails, and hot fireplaces.",
    highlights: [
      "3 Nights in Gulmarg Mountain Resort with central heating",
      "1 Night Luxury Houseboat in Srinagar",
      "Drung Frozen Waterfall winter stop",
      "Apharwat Peak Phase 2 snow exploration",
      "Optional half-day beginner ski lesson with certified instructor"
    ],
    inclusions: [
      "Private 4x4 Chauffeur with winter snow chains from Tangmarg",
      "Breakfast & Dinner included daily",
      "All inner line driver allowances & heating surcharges"
    ],
    exclusions: ["Ski gear rental & Gondola tickets at actuals"],
    dayWiseItinerary: [
      { day: 1, title: "Arrival in Srinagar & Transfer to Gulmarg", location: "Gulmarg", description: "Arrive at Srinagar, straight drive to Gulmarg with chain fitting in Tangmarg.", activities: ["Arrival", "Tangmarg snow chains", "Check-in", "Hot Kehwa by Fireplace"] },
      { day: 2, title: "Gondola Phase 1 & 2 Powders", location: "Gulmarg", description: "Ascend to 13,780 ft. Skiing and snowmobile adventure in Apharwat bowl.", activities: ["Gondola Phase 2", "Snowmobile Safari", "Ski Lesson"] },
      { day: 3, title: "Drung Frozen Waterfall & Pine Snow Trails", location: "Gulmarg / Drung", description: "Visit the cascading icicle palace of Drung Frozen Waterfall.", activities: ["Drung Waterfall", "Victorian Church", "Alpather Valley Snow Walk"] },
      { day: 4, title: "Gulmarg to Srinagar Lake Retreat", location: "Srinagar", description: "Descend to Srinagar. Board luxury houseboat. Evening Shikara ride.", activities: ["Descent to Srinagar", "Houseboat Check-in", "Sunset Shikara"] },
      { day: 5, title: "Departure", location: "Srinagar Airport", description: "Airport transfer with lasting memories of snowy peaks.", activities: ["Airport Transfer"] }
    ],
    isPopular: true,
    featured: true
  },
  {
    id: "pkg-offbeat-kashmir",
    title: "Crown of the North: Gurez & Hidden Kashmir",
    duration: "6 Nights / 7 Days",
    nights: 6,
    days: 7,
    badge: "100% OFF THE BEATEN PATH",
    category: "offbeat",
    coverImage: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80"
    ],
    startingPrice: 58000,
    discountedPrice: 52000,
    route: ["Srinagar", "Razdan Pass (11,672 ft)", "Gurez Valley (Dawar & Tulail)", "Doodhpathri", "Srinagar"],
    overview: "For discerning travelers who have seen mainstream destinations. Discover the sacred Kishanganga river in Gurez, timber Dard hamlets, and the untouched 'Valley of Milk' in Doodhpathri.",
    highlights: [
      "2 Nights in Gurez Valley riverside wooden retreats",
      "1 Night in Doodhpathri / Budgam pine valley",
      "2 Nights in Srinagar Luxury Heritage Houseboat",
      "Razdan Pass panoramic mountain viewpoint",
      "Tulail remote border village exploration",
      "Full northern district travel permit handling included"
    ],
    inclusions: [
      "Dedicated 4x4 SUV (Innova / Scorpio) with expert mountain chauffeur",
      "All permits and border paperwork assistance",
      "All breakfasts and regional mountain dinners"
    ],
    exclusions: ["Personal horse charges", "Airfare"],
    dayWiseItinerary: [
      { day: 1, title: "Srinagar Arrival & Heritage Acclimatization", location: "Srinagar", description: "Arrive in Srinagar, stay on quiet Nigeen Lake houseboat.", activities: ["Houseboat check-in", "Old City walk"] },
      { day: 2, title: "Across Razdan Pass into Gurez Valley", location: "Gurez (Dawar)", description: "Spectacular drive crossing Razdan Pass at 11,672 ft down to Kishanganga river.", activities: ["Razdan Pass", "Dawar check-in", "Habba Khatoon peak view"] },
      { day: 3, title: "Tulail Border Hamlet Expedition", location: "Gurez (Tulail)", description: "Drive alongside the turquoise Kishanganga into pure timber log villages.", activities: ["Tulail valley", "Chorwan border", "Trout lunch"] },
      { day: 4, title: "Gurez to Srinagar", location: "Srinagar", description: "Return journey with scenic stops along Wular Lake shores.", activities: ["Wular Lake view", "Return to Srinagar"] },
      { day: 5, title: "Doodhpathri Valley of Milk", location: "Doodhpathri", description: "Unspoiled rolling green meadows and frothing Shaliganga streams.", activities: ["Shaliganga hike", "Horse trail", "Nomad tea"] },
      { day: 6, title: "Srinagar Crafts & Mughal Terraces", location: "Srinagar", description: "Artisan copper, woodcarving, and saffron shopping.", activities: ["Craft ateliers", "Farewell feast"] },
      { day: 7, title: "Departure", location: "Srinagar Airport", description: "Airport transfer with assistance.", activities: ["Airport transfer"] }
    ],
    isPopular: false,
    featured: true
  },
  {
    id: "pkg-family-grand-tour",
    title: "Classic Kashmir Family Heritage & Meadows",
    duration: "6 Nights / 7 Days",
    nights: 6,
    days: 7,
    badge: "PERFECT FOR FAMILIES",
    category: "family",
    coverImage: "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1000&q=80"
    ],
    startingPrice: 64000,
    discountedPrice: 58000,
    route: ["Srinagar", "Gulmarg", "Pahalgam", "Sonamarg Glacier", "Srinagar Houseboat"],
    overview: "An easy-paced, child-friendly circuit with minimal driving stress, spacious family suites, and activities tailored for all generations from grandparents to kids.",
    highlights: [
      "Spacious Toyota Innova Crysta throughout",
      "Family interconnecting suites or luxury 2-bedroom houseboat",
      "Shikara boat rides with kid safety lifejackets",
      "Gulmarg Gondola & Pahalgam amusement meadows",
      "Dedicated 24/7 family travel manager on call"
    ],
    inclusions: [
      "Chauffeured Toyota Innova Crysta",
      "Daily breakfast & kid-friendly customized dinners",
      "Houseboat stay & shikara ride"
    ],
    exclusions: ["Pony rides", "Personal expenses"],
    dayWiseItinerary: [
      { day: 1, title: "Srinagar Arrival & Dal Lake Check-in", location: "Srinagar", description: "Relaxing start on Nigeen Lake.", activities: ["Shikara ride", "Welcome tea"] },
      { day: 2, title: "Gulmarg Day Adventure", location: "Gulmarg", description: "Gondola cable car ride and snow sledging.", activities: ["Gondola Phase 1", "Snowman building"] },
      { day: 3, title: "To Pahalgam & Saffron Farms", location: "Pahalgam", description: "Saffron tasting in Pampore and check into riverfront resort.", activities: ["Saffron farm", "River stroll"] },
      { day: 4, title: "Betaab Valley & Children's Meadows", location: "Pahalgam", description: "Picnic in Betaab Valley and Aru pine forests.", activities: ["Betaab picnic", "Pony ride"] },
      { day: 5, title: "Sonamarg Glaciers Expedition", location: "Sonamarg", description: "Day trip to Thajiwas glacier.", activities: ["Glacier view", "Snow sledges"] },
      { day: 6, title: "Mughal Gardens & Floating Markets", location: "Srinagar", description: "Nishat Bagh fountains and shopping for family souvenirs.", activities: ["Mughal gardens", "Dry fruit shopping"] },
      { day: 7, title: "Departure", location: "Srinagar Airport", description: "Assisted airport farewell.", activities: ["Airport drop"] }
    ],
    isPopular: true,
    featured: true
  }
];

export const initialHotels: Hotel[] = [
  {
    id: "hotel-khyber-gulmarg",
    name: "The Khyber Himalayan Resort & Spa",
    location: "Gulmarg",
    type: "resort",
    starRating: 5,
    lakeView: false,
    mountainView: true,
    breakfastIncluded: true,
    pricePerNight: 28500,
    images: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ],
    coverImage: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    amenities: ["Heated Indoor Swimming Pool", "L'Occitane Spa", "Ski-in / Ski-out access", "Central Heating", "Fireplace Lounge", "Fine Dining Restaurants", "High-speed Wi-Fi"],
    roomTypes: [
      { name: "Premier Mountain View Room", price: 28500, capacity: "2 Adults", features: ["King Bed", "Pine & Apharwat Peak Views", "Deep Soaking Tub"] },
      { name: "Luxury Balcony Suite", price: 42000, capacity: "2 Adults + 1 Child", features: ["Private Balcony", "Fireplace", "Butler Service"] }
    ],
    available: true
  },
  {
    id: "hotel-miracle-houseboat",
    name: "Miracle Palace Luxury Heritage Houseboat",
    location: "Srinagar (Nigeen Lake)",
    type: "houseboat",
    starRating: 5,
    lakeView: true,
    mountainView: true,
    breakfastIncluded: true,
    pricePerNight: 11500,
    images: [
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80"
    ],
    coverImage: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
    amenities: ["Carved Deodar Wood Architecture", "Front Sun Deck over Water", "Private Shikara Ferry", "Traditional Walnut Dining Hall", "Central Heating & Electric Blankets", "Dedicated Butler", "Free Wi-Fi"],
    roomTypes: [
      { name: "Royal Lakefront Cedar Suite", price: 11500, capacity: "2 Adults", features: ["Handmade Kashmiri Carpets", "Chandelier Ceiling", "Lake Balcony"] },
      { name: "Family Two-Bedroom Suite", price: 19500, capacity: "4 Adults", features: ["2 Attached Bathrooms", "Living Room", "Private Dining"] }
    ],
    available: true
  },
  {
    id: "hotel-pahalgam-riverfront",
    name: "Pine N Peak by ITC / Pahalgam Grand",
    location: "Pahalgam",
    type: "resort",
    starRating: 5,
    lakeView: false,
    mountainView: true,
    breakfastIncluded: true,
    pricePerNight: 16500,
    images: [
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80"
    ],
    coverImage: "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80",
    amenities: ["Lidder River Overlook", "Lawn Bonfires", "Pine Forest Trail", "Heated Rooms", "Gym & Billiards", "Pure Veg Kitchen on request"],
    roomTypes: [
      { name: "Deluxe Pine View", price: 16500, capacity: "2 Adults", features: ["Forest Views", "Wooden Flooring", "Bathtub"] },
      { name: "Executive River Suite", price: 24000, capacity: "2 Adults + 1 Child", features: ["Sound of Lidder River", "Private Verandah"] }
    ],
    available: true
  },
  {
    id: "hotel-radisson-srinagar",
    name: "Radisson Collection Hotel & Spa",
    location: "Srinagar",
    type: "hotel",
    starRating: 5,
    lakeView: false,
    mountainView: true,
    breakfastIncluded: true,
    pricePerNight: 14000,
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    ],
    coverImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    amenities: ["Heated Swimming Pool", "Multiple Award-Winning Restaurants", "Spa & Wellness", "Conference Hub", "Airport Shuttle", "High-speed Wi-Fi"],
    roomTypes: [
      { name: "Superior King Room", price: 14000, capacity: "2 Adults", features: ["Contemporary Kashmiri Touches", "Smart TV", "Ergonomic Workspace"] }
    ],
    available: true
  },
  {
    id: "hotel-sonamarg-chalet",
    name: "Villa Himalaya Mountain Chalet",
    location: "Sonamarg",
    type: "chalet",
    starRating: 4,
    lakeView: false,
    mountainView: true,
    breakfastIncluded: true,
    pricePerNight: 9800,
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    ],
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    amenities: ["River Sindh Terrace", "Wooden Balconies", "Bonfire Pits", "Mountain Trek Assistance"],
    roomTypes: [
      { name: "Glacier Stream Room", price: 9800, capacity: "2 Adults", features: ["Direct Mountain & Stream Views", "Heating"] }
    ],
    available: true
  }
];

export const initialVehicles: Vehicle[] = [
  {
    id: "veh-innova-crysta",
    name: "Toyota Innova Crysta (Luxury Captain Seats)",
    category: "Innova Crysta",
    seats: 6,
    luggageCapacity: "4 Large Suitcases + 2 Handbags",
    airConditioned: true,
    fourWheelDrive: false,
    ratePerDay: 4800,
    airportTransferRate: 2200,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
    features: ["Plush Leather Recliners", "Dual AC & Rear Climate Control", "USB Fast Chargers", "Snow Chains for Tangmarg", "Experienced Uniformed Chauffeur"],
    driverAssigned: {
      name: "Bashir Ahmad Lone",
      phone: "+91 9622229622",
      experience: "14 Years Kashmir Mountain Roads",
      vehiclePlate: "JK-01-AK-4422",
      rating: 4.95
    },
    available: true
  },
  {
    id: "veh-sedan-etios",
    name: "Executive Sedan (Toyota Etios / Dzire)",
    category: "Sedan",
    seats: 4,
    luggageCapacity: "2 Large Suitcases + 2 Small Bags",
    airConditioned: true,
    fourWheelDrive: false,
    ratePerDay: 2800,
    airportTransferRate: 1400,
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80",
    features: ["Clean Air-Conditioned Cabin", "Smooth Highway Comfort", "Knowledgeable Local Chauffeur", "First Aid Kit & Water Bottles"],
    driverAssigned: {
      name: "Fayaz Ahmad Wani",
      phone: "+91 9622229622",
      experience: "9 Years Expert Tour Driver",
      vehiclePlate: "JK-04-B-8910",
      rating: 4.88
    },
    available: true
  },
  {
    id: "veh-suv-scorpio",
    name: "Mahindra Scorpio 4x4 Mountain SUV",
    category: "SUV",
    seats: 6,
    luggageCapacity: "3 Large Suitcases",
    airConditioned: true,
    fourWheelDrive: true,
    ratePerDay: 4200,
    airportTransferRate: 2000,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    features: ["True 4-Wheel Drive", "High Ground Clearance for Razdan / Gurez / Snow Passes", "Rugged Off-road Stability"],
    driverAssigned: {
      name: "Tariq Hussain Dar",
      phone: "+91 9622229622",
      experience: "16 Years High Altitude Driving",
      vehiclePlate: "JK-01-R-3101",
      rating: 4.97
    },
    available: true
  },
  {
    id: "veh-tempo-traveller",
    name: "Force Tempo Traveller (12 to 17 Seater)",
    category: "Tempo Traveller",
    seats: 14,
    luggageCapacity: "10-12 Large Bags in Dedicated Trunk",
    airConditioned: true,
    fourWheelDrive: false,
    ratePerDay: 7500,
    airportTransferRate: 3500,
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
    features: ["High Roof with Walking Isle", "Reclining Push-back Seats", "Surround Sound & Mic for Tour Guide", "Large Luggage Carrier"],
    driverAssigned: {
      name: "Showkat Ali Mir",
      phone: "+91 9622229622",
      experience: "12 Years Large Group Tourism",
      vehiclePlate: "JK-01-T-7700",
      rating: 4.91
    },
    available: true
  }
];

export const initialExperiences: ExperienceItem[] = [
  {
    id: "exp-sunset-shikara",
    title: "Golden Hour Private Shikara & Lotus Cruise",
    category: "romantic",
    duration: "2 Hours",
    location: "Dal Lake & Nigeen Lake, Srinagar",
    price: 1500,
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
    description: "Glide gracefully through tranquil waterways, floating lotus beds, and under historic wooden bridges while sipping saffron-infused Kahwa from a traditional copper Samovar.",
    highlights: ["Hand-paddled traditional canopied boat", "Char Chinar island photo stop", "Floating vegetable market visit", "Fresh Kashmiri bakery snacks included"],
    included: ["Private boat for your group", "Kashmiri Kahwa & Shirmal biscuits", "Blankets in winter"],
    bestTime: "5:00 PM to 7:00 PM"
  },
  {
    id: "exp-wazwan-culinary",
    title: "The Royal 7-Course Traditional Wazwan Feast",
    category: "culinary",
    duration: "2.5 Hours",
    location: "Old Heritage Quarter, Srinagar",
    price: 2400,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    description: "The crown jewel of Kashmiri hospitality. Dine in traditional carpet seating around an engraved copper 'Traem', served by master waza chefs with centuries-old recipes.",
    highlights: ["Rogan Josh slow-cooked with mawal flowers", "Gushtaba in fragrant yogurt gravy", "Tabak Maaz crispy lamb ribs", "Aromatic Yakhni & Rista"],
    included: ["Complete 7-course feast", "Kashmiri saffron Kahwa", "Cultural explanation of each dish"],
    bestTime: "Lunch or Dinner"
  },
  {
    id: "exp-ski-apharwat",
    title: "Apharwat Peak Snow & Ski Masterclass",
    category: "adventure",
    duration: "4 Hours",
    location: "Gulmarg Gondola Phase 2 (13,780 ft)",
    price: 3500,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    description: "Experience the magic of true Himalayan powder snow. Private one-on-one session with a certified instructor from the Indian Institute of Skiing & Mountaineering.",
    highlights: ["Ski & boot equipment fitting", "Safety gear & slope navigation", "Gentle beginner slopes or advanced bowls", "Stunning panoramic photos"],
    included: ["Certified instructor", "Basic ski equipment rental", "Support assistance"],
    bestTime: "December to April"
  },
  {
    id: "exp-saffron-pampore",
    title: "Saffron Trails & Almond Orchards Walk",
    category: "cultural",
    duration: "3 Hours",
    location: "Pampore (The Saffron Town of the World)",
    price: 1800,
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
    description: "Walk the purple-blooming plateaus where the world's most prized spice, Crocus sativus, is hand-picked. Learn to test pure 'Mongra' saffron and visit cooperative farms.",
    highlights: ["Hands-on saffron plucking (Oct-Nov)", "Authentic saffron grading demonstration", "Pure saffron honey tasting", "Walnut cracking experience"],
    included: ["Local grower guide", "Saffron Kahwa tasting", "1g sample of GI-tagged Kashmiri Saffron"],
    bestTime: "Mid-October to Mid-November (Bloom) & Year-round farms"
  }
];

export const initialFoodGuide: FoodGuideItem[] = [
  {
    id: "food-rogan-josh",
    name: "Rogan Josh",
    kashmiriName: "روغن جوش",
    description: "A world-renowned tender lamb stew simmered in Kashmiri red chilies (gives rich crimson color without blistering heat), dried ginger (Shont), and cockscomb flower extract (Mawal).",
    type: "Non-Vegetarian",
    spiceLevel: "Rich & Aromatic",
    whereToTry: "Ahdoos (Residency Road), Mughal Darbar, or our Private Wazwan Dinners",
    approxPrice: "₹450 - ₹650",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "food-gushtaba",
    name: "Gushtaba",
    kashmiriName: "گشتابہ",
    description: "Known as the 'Dish of Kings' that concludes the grand Wazwan. Silky meatballs pounded for hours on smooth stone slabs, simmered in a velvety curd and cardamom gravy.",
    type: "Non-Vegetarian",
    spiceLevel: "Mild",
    whereToTry: "Grand Wazwan feasts & traditional heritage dining rooms",
    approxPrice: "₹500 - ₹750",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "food-kahwa",
    name: "Kashmiri Saffron Kahwa",
    kashmiriName: "قہوہ",
    description: "The soul-warming golden green tea brewed in a decorative brass Samovar with crushed saffron threads, green cardamom, cinnamon bark, and slivered blanched almonds.",
    type: "Beverage",
    spiceLevel: "Mild",
    whereToTry: "Every house, shikara, and mountain pass",
    approxPrice: "₹80 - ₹150",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "food-harissa",
    name: "Kashmiri Harissa",
    kashmiriName: "ہریثہ",
    description: "A legendary winter breakfast dish slow-cooked overnight for 12 hours in clay ovens until meat and rice dissolve into an unctuous paste, topped with boiling mustard oil and served with hot Girda bread.",
    type: "Non-Vegetarian",
    spiceLevel: "Rich & Aromatic",
    whereToTry: "Aali Kadal & Downtown Srinagar (Available Nov to March, 6 AM to 9 AM)",
    approxPrice: "₹350 - ₹500",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "food-yakhni",
    name: "Mutton or Nadru Yakhni",
    kashmiriName: "یخنی",
    description: "Delicate and aromatic stew made with yogurt, infused with crushed fennel seeds (Saunf), dried mint, and whole spices without any turmeric or red chili.",
    type: "Non-Vegetarian",
    spiceLevel: "Mild",
    whereToTry: "Wazwan restaurants across Srinagar & Pahalgam",
    approxPrice: "₹400 - ₹600",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "food-tabak-maaz",
    name: "Tabak Maaz",
    kashmiriName: "تبق ماز",
    description: "Lamb ribs simmered with milk, cloves, and spices until gelatinous, then pan-fried in pure desi ghee to achieve an intensely crisp golden crust with melting interior.",
    type: "Non-Vegetarian",
    spiceLevel: "Mild",
    whereToTry: "Traditional Wazwan banquets",
    approxPrice: "₹480 - ₹680",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
  }
];

export const initialTimelineItems: TimelineItem[] = [
  {
    id: "time-1",
    time: "08:00 AM",
    title: "Alpine Breakfast on Lakefront Deck",
    description: "Freshly baked local Girda bread, saffron honey, apricot jam, and warming Kashmiri Kahwa overlooking misty Nigeen Lake.",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=400&q=80",
    duration: "1 Hour",
    location: "Miracle Palace Houseboat, Srinagar",
    activity: "Breakfast",
    buttonText: "View Houseboat Menu",
    order: 1,
    active: true
  },
  {
    id: "time-2",
    time: "10:00 AM",
    title: "Scenic Departure for Gulmarg via Tangmarg",
    description: "Chauffeured drive through weeping willow country and pine-scented foothills. Brief stop at Tangmarg for snow equipment check.",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80",
    duration: "1 hr 45 min",
    location: "Tangmarg & Gulmarg Highway",
    activity: "Chauffeured Transfer",
    buttonText: "Check Highway Status",
    order: 2,
    active: true
  },
  {
    id: "time-3",
    time: "01:00 PM",
    title: "Mountain Pine Lunch & Hot Wazwan",
    description: "Relaxing lunch featuring Rogan Josh and fresh garlic naan at Highland Park Resort with roaring pine wood fireplace.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&q=80",
    duration: "1.5 Hours",
    location: "Gulmarg Resort Deck",
    activity: "Gourmet Lunch",
    order: 3,
    active: true
  },
  {
    id: "time-4",
    time: "03:00 PM",
    title: "Gulmarg Gondola Phase 2 to Apharwat Peak (13,780 ft)",
    description: "Boarding the iconic cable car to reach high alpine snow bowl. Breathless views of K2, Nanga Parbat, and deep snow fields.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80",
    duration: "2.5 Hours",
    location: "Apharwat Peak, Gulmarg",
    activity: "Gondola Expedition",
    buttonText: "Gondola Weather Status",
    order: 4,
    active: true
  },
  {
    id: "time-5",
    time: "07:00 PM",
    title: "Return to Resort & Bonfire Evening",
    description: "Cozying up by the hearth with spiced kahwa, sharing photographs from the peaks, and stargazing in crystal Himalayan mountain skies.",
    image: "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=400&q=80",
    duration: "Evening",
    location: "The Khyber / Pine Resort",
    activity: "Evening Bonfire",
    order: 5,
    active: true
  }
];

export const initialReviews: ReviewItem[] = [
  {
    id: "rev-1",
    customerName: "Dr. Arvind & Sunita Mehra",
    originCity: "Mumbai, Maharashtra",
    tripTitle: "Royal Kashmir Honeymoon (6 Days)",
    rating: 5,
    date: "February 2026",
    hotelRating: 5,
    driverRating: 5,
    foodRating: 5,
    supportRating: 5,
    comment: "Kashmiré Voyages planned our trip flawlessly. Bashir ji, our chauffeur in the Innova Crysta, was polite, punctual, and safe on snowy Gulmarg roads. The Nigeen Lake houseboat was pure royal peace. Transparent pricing, no hidden costs!",
    photos: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=400&q=80"
    ],
    verified: true
  },
  {
    id: "rev-2",
    customerName: "Siddharth Verma & Family",
    originCity: "Bengaluru, Karnataka",
    tripTitle: "Winter Wonderland & Snow Expedition",
    rating: 5,
    date: "January 2026",
    hotelRating: 5,
    driverRating: 5,
    foodRating: 4,
    supportRating: 5,
    comment: "We had two small kids and elderly parents. Kashmiré Voyages managed hotel rooms with reliable central heating, booked Phase 1 and 2 tickets smoothly, and their 24/7 manager WhatsApp support kept us calm throughout.",
    photos: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80"
    ],
    verified: true
  },
  {
    id: "rev-3",
    customerName: "Rohan & Priya Sengupta",
    originCity: "Kolkata, West Bengal",
    tripTitle: "Offbeat Gurez & Doodhpathri Expedition",
    rating: 5,
    date: "October 2025",
    hotelRating: 5,
    driverRating: 5,
    foodRating: 5,
    supportRating: 5,
    comment: "If you want to experience real Kashmir without tourist traps, trust this company. Gurez was a dream—Kishanganga river, Habba Khatoon peak, and the homemade Wazwan dinner. Outstanding craftsmanship!",
    photos: [
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=400&q=80"
    ],
    verified: true
  }
];

export const initialTravelStories: TravelStory[] = [
  {
    id: "story-1",
    title: "Chasing First Snow at 13,780 Feet: Our Apharwat Diary",
    author: "Kavita Rao",
    duration: "5 Days in Gulmarg",
    season: "Winter (January)",
    coverImage: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
    excerpt: "The air grew thinner, the pines shrank below our gondola glass, and suddenly there was only boundless white...",
    content: "Landing at Srinagar airport, the crisp mountain air immediately woke us up. Our driver from Kashmiré Voyages welcomed us with warm smiles and hot saffron kahwa in a thermos flask. The drive up to Gulmarg was surreal—watching normal tarmac transform into a pristine white carpet...",
    images: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80"
    ],
    likes: 142
  },
  {
    id: "story-2",
    title: "Midnight Whispers on Nigeen Lake: The Houseboat Memoir",
    author: "Zainab & Aman",
    duration: "4 Days in Srinagar",
    season: "Autumn (Golden Chinar)",
    coverImage: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80",
    excerpt: "Away from the bustling city Boulevard, Nigeen was a mirror of liquid gold reflecting the amber Chinars...",
    content: "Staying on a handcrafted cedar houseboat built in 1968 was like stepping into an imperial time capsule. The walnut wood smelled of rain and cedar. At 6 AM, our shikara glided through lotus beds to witness the floating vegetable market...",
    images: [
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80"
    ],
    likes: 219
  }
];

export const initialBookings: BookingRecord[] = [
  {
    id: "book-1",
    referenceNumber: "KSH-2026-00125",
    customerName: "Sajjad Ahmad Mir",
    mobile: "+91 9876543210",
    email: "sajjad.travel@gmail.com",
    adults: 2,
    children: 1,
    travelDate: "2026-10-12",
    returnDate: "2026-10-18",
    pickupLocation: "Srinagar Airport (SXR)",
    destination: "Gulmarg & Pahalgam Circuit",
    selectedPackage: "pkg-honeymoon-royale",
    selectedHotel: "The Khyber & Miracle Houseboat",
    selectedVehicle: "Toyota Innova Crysta",
    selectedActivities: ["Gondola Phase 1 & 2", "Sunset Shikara", "Wazwan Dinner"],
    tripAmount: 52000,
    advanceAmount: 15000,
    remainingAmount: 37000,
    paymentMethod: "UPI QR",
    paymentStatus: "Payment Verified",
    bookingStatus: "Confirmed",
    utrReference: "UPI-428910023451",
    createdAt: "2026-03-15T11:20:00Z",
    driverDetails: {
      name: "Bashir Ahmad Lone",
      phone: "+91 9622229622",
      carModel: "Toyota Innova Crysta",
      numberPlate: "JK-01-AK-4422",
      status: "Assigned"
    },
    hotelDetails: {
      name: "Miracle Palace Luxury Houseboat",
      location: "Nigeen Lake, Srinagar",
      roomType: "Royal Cedar Lake Suite",
      checkInTime: "12:00 PM"
    }
  },
  {
    id: "book-2",
    referenceNumber: "KSH-2026-00126",
    customerName: "Ananya Sharma",
    mobile: "+91 9988776655",
    email: "ananya.sharma@outlook.com",
    adults: 2,
    children: 0,
    travelDate: "2026-11-04",
    returnDate: "2026-11-09",
    pickupLocation: "Srinagar Airport (SXR)",
    destination: "Gulmarg Ski Special",
    selectedPackage: "pkg-winter-wonderland",
    selectedHotel: "The Khyber Resort",
    selectedVehicle: "Mahindra Scorpio 4x4",
    selectedActivities: ["Gondola Phase 2", "Ski Lessons"],
    tripAmount: 42000,
    advanceAmount: 12600,
    remainingAmount: 29400,
    paymentMethod: "UPI App",
    paymentStatus: "Payment Verification Pending",
    bookingStatus: "Payment Verification",
    utrReference: "UPI-510092837412",
    createdAt: "2026-03-20T09:15:00Z"
  }
];

export const initialLeads: EnquiryLead[] = [
  {
    id: "lead-1024",
    leadNumber: "LEAD-1024",
    name: "Vikram Singhania",
    phone: "+91 9811223344",
    email: "vikram.s@singhania.in",
    travelDates: "Nov 15 - Nov 21 (6 Nights)",
    travellers: "2 Adults (Anniversary)",
    budget: "₹85,000",
    interestedDestinations: ["Gulmarg", "Srinagar Nigeen Lake", "Pahalgam"],
    packageInterest: "Kashmiré Royal Honeymoon & Romance",
    source: "Hero Trip Planner",
    status: "Quotation Sent",
    notes: "Requires luxury houseboat with private butler and gondola Phase 2 pre-booking.",
    createdAt: "2026-03-21T05:45:00Z"
  },
  {
    id: "lead-1025",
    leadNumber: "LEAD-1025",
    name: "Dr. Neha Kulkarni",
    phone: "+91 9765432109",
    email: "dr.neha@apollo.com",
    travelDates: "Dec 24 - Dec 29 (5 Nights)",
    travellers: "4 Adults + 2 Kids (Family)",
    budget: "₹1,20,000",
    interestedDestinations: ["Gulmarg Snow", "Pahalgam", "Doodhpathri"],
    source: "WhatsApp Enquiry",
    status: "New",
    notes: "Wants guaranteed snow for children and an Innova Crysta.",
    createdAt: "2026-03-21T08:10:00Z"
  }
];
