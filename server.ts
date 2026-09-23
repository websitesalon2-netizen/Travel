import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import {
  initialDestinations,
  initialBusinessInfo,
  initialPaymentSettings,
  initialTimelineItems,
  initialPackages,
  initialBookings,
  initialLeads,
} from './src/data/initialData';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Set up persistent data store and uploads directory
const STORAGE_DIR = path.join(process.cwd(), 'data_storage');
const DB_PATH = path.join(STORAGE_DIR, 'shared_store.json');
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Serve uploaded images publicly for all devices
app.use('/uploads', express.static(UPLOADS_DIR));

interface SharedStore {
  destinations: any[];
  businessInfo: any;
  paymentSettings: any;
  mountainStatus: any;
  timelineItems: any[];
  packages: any[];
  bookings: any[];
  leads: any[];
  lastUpdated: number;
}

function getDefaultStore(): SharedStore {
  return {
    destinations: initialDestinations,
    businessInfo: initialBusinessInfo,
    paymentSettings: initialPaymentSettings,
    mountainStatus: {
      gondolaStatus: 'Phase 1 & Phase 2 Active (Subject to wind)',
      gulmargSnow: '4.5 ft on Apharwat Peak',
      sonamargSnow: 'Fresh Powder at Zero Point',
      pahalgamWeather: 'Clear Skies, 14°C',
      nh44Status: 'Two-Way Traffic Open (Srinagar-Jammu)',
      snowChainsRequired: 'Mandatory from Tangmarg to Gulmarg'
    },
    timelineItems: initialTimelineItems,
    packages: initialPackages,
    bookings: initialBookings,
    leads: initialLeads,
    lastUpdated: Date.now()
  };
}

function readStore(): SharedStore {
  try {
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      return {
        ...getDefaultStore(),
        ...parsed,
      };
    }
  } catch (err) {
    console.error('Error reading shared_store.json:', err);
  }
  const defaultStore = getDefaultStore();
  writeStore(defaultStore);
  return defaultStore;
}

function writeStore(data: SharedStore) {
  try {
    data.lastUpdated = Date.now();
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing shared_store.json:', err);
  }
}

// Lazy initialize Google Gen AI
let aiClient: GoogleGenAI | null = null;
function getGenAI() {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Image Upload Endpoint (Converts Device-Uploaded Photos into Publicly Hosted URLs for All Devices)
app.post('/api/upload', (req, res) => {
  try {
    const image = req.body.image || req.body.imageBase64 || req.body.data;
    if (!image || typeof image !== 'string') {
      return res.status(400).json({ success: false, error: 'No image data provided' });
    }

    // If it's already an HTTP URL or local /uploads/ URL, return directly
    if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('/uploads/')) {
      return res.json({ success: true, url: image });
    }

    // Match data:[<mediatype>];base64,<data>
    const matches = image.match(/^data:([A-Za-z0-9\-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      // If unable to parse as base64 data URI, return as-is
      return res.json({ success: true, url: image });
    }

    const mimeType = matches[1].toLowerCase();
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    let ext = 'jpg';
    if (mimeType.includes('png')) ext = 'png';
    else if (mimeType.includes('webp')) ext = 'webp';
    else if (mimeType.includes('svg')) ext = 'svg';
    else if (mimeType.includes('jpeg')) ext = 'jpg';

    const safeName = `photo-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const targetFile = path.join(UPLOADS_DIR, safeName);

    fs.writeFileSync(targetFile, buffer);

    const publicUrl = `/uploads/${safeName}`;
    res.json({ success: true, url: publicUrl });
  } catch (error: any) {
    console.error('Server photo upload error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET Shared Data across all devices
app.get('/api/shared-data', (req, res) => {
  try {
    const store = readStore();
    res.json({ success: true, data: store, lastUpdated: store.lastUpdated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST Shared Data (Bulk or partial sync)
app.post('/api/shared-data', (req, res) => {
  try {
    const store = readStore();
    const updates = req.body;
    const newStore: SharedStore = {
      ...store,
      ...updates,
      lastUpdated: Date.now()
    };
    writeStore(newStore);
    res.json({ success: true, data: newStore, lastUpdated: newStore.lastUpdated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET Destinations
app.get('/api/destinations', (req, res) => {
  try {
    const store = readStore();
    res.json({ success: true, destinations: store.destinations, lastUpdated: store.lastUpdated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST Add or Update Destination (synchronized to all devices)
app.post('/api/destinations', (req, res) => {
  try {
    const destination = req.body;
    if (!destination || !destination.name) {
      return res.status(400).json({ success: false, error: 'Destination name is required' });
    }
    const store = readStore();
    const destId = destination.id || `dest-${Date.now()}`;
    const completeDest = { ...destination, id: destId };

    const existingIndex = store.destinations.findIndex((d: any) => d.id === destId);
    let updatedDestinations;
    if (existingIndex >= 0) {
      updatedDestinations = [...store.destinations];
      updatedDestinations[existingIndex] = { ...updatedDestinations[existingIndex], ...completeDest };
    } else {
      updatedDestinations = [completeDest, ...store.destinations];
    }

    store.destinations = updatedDestinations;
    writeStore(store);

    res.json({
      success: true,
      destination: completeDest,
      destinations: store.destinations,
      lastUpdated: store.lastUpdated
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT Update Existing Destination
app.put('/api/destinations/:id', (req, res) => {
  try {
    const id = req.params.id;
    const store = readStore();
    const index = store.destinations.findIndex((d: any) => d.id === id);
    if (index === -1) {
      // If not found, add it
      const newDest = { ...req.body, id };
      store.destinations = [newDest, ...store.destinations];
      writeStore(store);
      return res.json({ success: true, destination: newDest, destinations: store.destinations, lastUpdated: store.lastUpdated });
    }
    store.destinations[index] = { ...store.destinations[index], ...req.body };
    writeStore(store);
    res.json({ success: true, destination: store.destinations[index], destinations: store.destinations, lastUpdated: store.lastUpdated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE Destination
app.delete('/api/destinations/:id', (req, res) => {
  try {
    const id = req.params.id;
    const store = readStore();
    store.destinations = store.destinations.filter((d: any) => d.id !== id);
    writeStore(store);
    res.json({ success: true, destinations: store.destinations, lastUpdated: store.lastUpdated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST Business Info
app.post('/api/business-info', (req, res) => {
  try {
    const store = readStore();
    store.businessInfo = { ...store.businessInfo, ...req.body };
    writeStore(store);
    res.json({ success: true, businessInfo: store.businessInfo, lastUpdated: store.lastUpdated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST Payment Settings
app.post('/api/payment-settings', (req, res) => {
  try {
    const store = readStore();
    store.paymentSettings = { ...store.paymentSettings, ...req.body };
    writeStore(store);
    res.json({ success: true, paymentSettings: store.paymentSettings, lastUpdated: store.lastUpdated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST Mountain Status
app.post('/api/mountain-status', (req, res) => {
  try {
    const store = readStore();
    store.mountainStatus = { ...store.mountainStatus, ...req.body };
    writeStore(store);
    res.json({ success: true, mountainStatus: store.mountainStatus, lastUpdated: store.lastUpdated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST Timeline Items
app.post('/api/timeline', (req, res) => {
  try {
    const store = readStore();
    if (Array.isArray(req.body.items)) {
      store.timelineItems = req.body.items;
    }
    writeStore(store);
    res.json({ success: true, timelineItems: store.timelineItems, lastUpdated: store.lastUpdated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST Bookings
app.post('/api/bookings', (req, res) => {
  try {
    const store = readStore();
    const booking = req.body;
    const idx = store.bookings.findIndex((b: any) => b.referenceNumber === booking.referenceNumber);
    if (idx >= 0) {
      store.bookings[idx] = { ...store.bookings[idx], ...booking };
    } else {
      store.bookings = [booking, ...store.bookings];
    }
    writeStore(store);
    res.json({ success: true, bookings: store.bookings, lastUpdated: store.lastUpdated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE Booking
app.delete('/api/bookings/:ref', (req, res) => {
  try {
    const store = readStore();
    store.bookings = store.bookings.filter((b: any) => b.referenceNumber !== req.params.ref);
    writeStore(store);
    res.json({ success: true, bookings: store.bookings, lastUpdated: store.lastUpdated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST Leads
app.post('/api/leads', (req, res) => {
  try {
    const store = readStore();
    const lead = req.body;
    const idx = store.leads.findIndex((l: any) => l.id === lead.id);
    if (idx >= 0) {
      store.leads[idx] = { ...store.leads[idx], ...lead };
    } else {
      store.leads = [lead, ...store.leads];
    }
    writeStore(store);
    res.json({ success: true, leads: store.leads, lastUpdated: store.lastUpdated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE Lead
app.delete('/api/leads/:id', (req, res) => {
  try {
    const store = readStore();
    store.leads = store.leads.filter((l: any) => l.id !== req.params.id);
    writeStore(store);
    res.json({ success: true, leads: store.leads, lastUpdated: store.lastUpdated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// AI Kashmir Trip Intelligence endpoint
app.post('/api/ai/itinerary', async (req, res) => {
  try {
    const { travelers, duration, budget, origin, preferences, currentItinerary, modificationPrompt } = req.body;

    const ai = getGenAI();
    if (!ai) {
      // Return high quality structured fallback if API key is not yet set
      return res.json({
        success: true,
        source: 'local-intelligence',
        itinerary: generateCuratedFallback(travelers, duration, budget, preferences, modificationPrompt),
      });
    }

    const systemPrompt = `You are the Lead Master Itinerary Architect at Kashmiré Voyages, a luxury boutique travel agency based in Shalina, Budgam, Kashmir.
Generate a realistic, high-end, detailed Kashmir itinerary in JSON format with day-by-day plan, realistic driving times, authentic recommendations, activities, and budget estimates.
Output ONLY valid JSON without markdown wrapping.

The JSON schema must follow:
{
  "title": string,
  "summary": string,
  "totalEstimatedPrice": number,
  "recommendedSeason": string,
  "days": [
    {
      "dayNumber": number,
      "title": string,
      "location": string,
      "driveTime": string,
      "hotelRecommendation": string,
      "hotelCategory": string,
      "activities": string[],
      "timeline": [
        { "time": string, "activity": string, "detail": string }
      ],
      "localTip": string
    }
  ],
  "packingEssentials": string[],
  "budgetBreakdown": {
    "hotel": number,
    "transport": number,
    "activities": number,
    "meals": number,
    "buffer": number
  }
}`;

    const prompt = `Plan a trip for:
Travelers: ${travelers || 'Couple'}
Duration: ${duration || '5 nights'}
Budget: ${budget || '₹60,000'}
Origin: ${origin || 'Delhi'}
Preferences/Style: ${preferences || 'Snow, luxury houseboat, gondola, photography, scenic offbeat'}
${modificationPrompt ? `Modification requested: ${modificationPrompt}. Current context: ${JSON.stringify(currentItinerary || {})}` : ''}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '';
    try {
      const parsed = JSON.parse(text);
      return res.json({ success: true, source: 'gemini-3.8-flash', itinerary: parsed });
    } catch {
      return res.json({
        success: true,
        source: 'local-intelligence',
        itinerary: generateCuratedFallback(travelers, duration, budget, preferences, modificationPrompt),
      });
    }
  } catch (error: any) {
    console.error('AI Itinerary error:', error);
    return res.json({
      success: true,
      source: 'fallback',
      itinerary: generateCuratedFallback(req.body.travelers, req.body.duration, req.body.budget, req.body.preferences, req.body.modificationPrompt),
    });
  }
});

// AI Kashmir Travel Assistant Chatbot
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        reply: getLocalKashmirReply(message),
      });
    }

    const systemPrompt = `You are 'Zaffran', the senior Kashmir travel expert and cultural concierge for Kashmiré Voyages (Office: Shalina, Budgam, J&K | Phone/WhatsApp: +91 9622229622).
Provide warm, authoritative, culturally rich, and precise guidance on Kashmir travel:
- Snow conditions, Apharwat Peak Gondola Phase 1 & 2 bookings, skiing.
- Houseboats on Dal Lake and Nigeen Lake (luxury vs deluxe).
- Authentic Kashmiri Wazwan (Rogan Josh, Gushtaba, Rista, Tabak Maaz, Kahwa).
- Offbeat destinations: Gurez Valley, Doodhpathri, Yusmarg, Aharbal, Sinthan Top, Lolab.
- Roads, passes, seasonal packing, safety, and local etiquette.
Keep responses concise, welcoming, and high-end. Mention that bookings and custom plans can be finalized on WhatsApp at +91 9622229622.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: message,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    return res.json({ reply: response.text || getLocalKashmirReply(message) });
  } catch (error: any) {
    console.error('AI Chat error:', error);
    return res.json({ reply: getLocalKashmirReply(req.body?.message || '') });
  }
});

function generateCuratedFallback(travelers: string, duration: string, budgetStr: string, prefs: string, modPrompt?: string) {
  const isGurez = modPrompt?.toLowerCase().includes('gurez') || prefs?.toLowerCase().includes('gurez');
  const budgetNum = parseInt((budgetStr || '60000').replace(/[^0-9]/g, '')) || 60000;

  return {
    title: isGurez ? "The Majestic Gurez & Crown Valleys Expedition" : "Kashmiré Signature Alpine & Lakes Experience",
    summary: `Tailored for ${travelers || '2 travelers'} covering scenic mountain vistas, serene lakes, and curated heritage over ${duration || '5 Nights / 6 Days'}.`,
    totalEstimatedPrice: budgetNum,
    recommendedSeason: "October to April (Snow & Golden Autumn) / May to September (Meadow Bloom)",
    days: [
      {
        dayNumber: 1,
        title: "Srinagar Arrival & Royal Dal Lake Houseboat",
        location: "Srinagar (Dal Lake & Boulevard)",
        driveTime: "30 mins from Sheikh ul-Alam International Airport",
        hotelRecommendation: "Miracle Palace Luxury Heritage Houseboat, Nigeen Lake",
        hotelCategory: "5-Star Heritage Houseboat",
        activities: ["Private Airport Pickup", "Sunset Shikara Cruise into Golden Lotus Gardens", "Floating Char Chinar Tea", "Candlelight Wazwan Dinner"],
        timeline: [
          { time: "11:30 AM", activity: "Airport Meet & Chauffeur Greeting", detail: "Personal executive sedan greeting with fresh saffron Kahwa" },
          { time: "01:30 PM", activity: "Houseboat Check-in & Kashmiri Lunch", detail: "Walnut wood carved suite overlooking tranquil lotus waters" },
          { time: "05:00 PM", activity: "Private Sunset Shikara Ride", detail: "Gliding past floating vegetable gardens, Kabootar Khana and Char Chinar" },
          { time: "08:00 PM", activity: "Welcome Wazwan Dinner", detail: "Multi-course feast featuring Rogan Josh, Gushtaba & Kehwa" }
        ],
        localTip: "Sunset over Hari Parbat Fort from a shikara is magical for photography."
      },
      {
        dayNumber: 2,
        title: "Srinagar to Gulmarg: Meadow of Flowers & Snow Peaks",
        location: "Gulmarg",
        driveTime: "1 hr 45 mins (51 km)",
        hotelRecommendation: "The Khyber Himalayan Resort & Spa / Kolahoi Green Heights",
        hotelCategory: "Luxury Mountain Resort",
        activities: ["Scenic drive via Tangmarg pine forests", "Gondola Phase 1 (Kongdoori)", "Apharwat Snow Bowl excursion", "Evening fireplace relaxation"],
        timeline: [
          { time: "08:30 AM", activity: "Departure for Gulmarg", detail: "Scenic climb stopping at Tangmarg for snow-chain fitting and hot kahwa" },
          { time: "10:30 AM", activity: "Arrival & Hotel Check-in", detail: "Panoramic mountain view suites" },
          { time: "12:00 PM", activity: "Gulmarg Gondola Ride Phase 1 & 2", detail: "Ascending to 13,780 ft on Apharwat Peak for snow activities and alpine panorama" },
          { time: "04:30 PM", activity: "St. Mary's Church & Golf Course Walk", detail: "Victorian colonial era heritage in cedar glades" }
        ],
        localTip: "Book Phase 2 tickets in advance; carry insulated waterproof snow boots."
      },
      {
        dayNumber: 3,
        title: isGurez ? "Expedition to Gurez Valley via Razdan Pass" : "Gulmarg Alpine Activities & Scenic Transfer",
        location: isGurez ? "Dawar, Gurez Valley" : "Gulmarg to Srinagar Heritage Glades",
        driveTime: isGurez ? "4 hrs 30 mins via Razdan Pass (11,672 ft)" : "1 hr 40 mins",
        hotelRecommendation: isGurez ? "JKTDC Pine Chalets Dawar" : "The Lalit Grand Palace Srinagar",
        hotelCategory: "Luxury Heritage",
        activities: ["Kishan Ganga river walk", "Habba Khatoon peak view", "Traditional woodcraft hamlet visit"],
        timeline: [
          { time: "09:00 AM", activity: "Morning Mountain Excursion", detail: "Fresh mountain air, skiing lessons or snowmobile trail" },
          { time: "01:00 PM", activity: "Local Trout Lunch", detail: "Freshly prepared Himalayan trout with Kashmiri herbs" },
          { time: "04:00 PM", activity: "Handicrafts & Pashmina Studio Visit", detail: "Master artisans hand-weaving 100% cashmere shawls" }
        ],
        localTip: "Keep identity documents ready for northern border circuit checkpoints."
      },
      {
        dayNumber: 4,
        title: "Valley of Shepherds: Pahalgam & Betaab Valley",
        location: "Pahalgam",
        driveTime: "2 hrs 30 mins from Srinagar (92 km) via Saffron fields of Pampore",
        hotelRecommendation: "Pahalgam Hotel / Pine N Peak by ITC",
        hotelCategory: "Luxury Riverfront Resort",
        activities: ["Pampore Saffron farm stopover", "Avantipur temple ruins", "Betaab Valley & Aru Valley excursion", "Lidder River banks stroll"],
        timeline: [
          { time: "08:00 AM", activity: "Drive towards Pahalgam", detail: "En-route stop at Pampore saffron farms and dried fruit gardens" },
          { time: "11:30 AM", activity: "Aru Valley & Betaab Valley Tour", detail: "Pristine meadows framed by deodar woods and snow cliffs" },
          { time: "03:30 PM", activity: "Baisaran 'Mini Switzerland' Trek/Pony Ride", detail: "Lush undulating green bowl surrounded by dense pine forests" },
          { time: "07:30 PM", activity: "Riverside Bonfire & Dinner", detail: "Listening to the rushing crystal waters of Lidder River" }
        ],
        localTip: "Try the pure saffron honey in Pampore cooperatives."
      },
      {
        dayNumber: 5,
        title: "Doodhpathri Valley of Milk or Sonamarg Golden Glaciers",
        location: "Doodhpathri / Sonamarg",
        driveTime: "1 hr 30 mins to Doodhpathri (Budgam)",
        hotelRecommendation: "Radisson Collection Srinagar / Orchard Retreat",
        hotelCategory: "5-Star Luxury Resort",
        activities: ["Shaliganga river hike", "Pristine pine meadows with grazing herds", "Old Srinagar artisan walk", "Farewell dinner"],
        timeline: [
          { time: "09:00 AM", activity: "Morning Meadow Excursion", detail: "Rolling green carpet meadows where bubbling milk-white streams flow" },
          { time: "02:00 PM", activity: "Return to Srinagar", detail: "Shopping for saffron, walnut carvings, papier-mâché, and almond kernels" },
          { time: "05:00 PM", activity: "Old City Architecture Walk", detail: "Khanqah-e-Moula, Jamia Masjid wooden spires, and historic bridges" },
          { time: "08:30 PM", activity: "Grand Farewell Wazwan Feast", detail: "Special feast hosted by Kashmiré Voyages directors" }
        ],
        localTip: "Doodhpathri is peaceful and untouched by heavy tourist crowds."
      },
      {
        dayNumber: 6,
        title: "Farewell to Paradise: Airport Transfer",
        location: "Srinagar Airport (SXR)",
        driveTime: "25 mins from Srinagar City",
        hotelRecommendation: "Departure Day",
        hotelCategory: "Executive Chauffeur",
        activities: ["Breakfast with views of Zabarwan mountains", "Souvenir collection", "Airport transfer with assistance"],
        timeline: [
          { time: "09:00 AM", activity: "Breakfast on Lakefront Terrace", detail: "Fresh bakery Tsot, apricot jam, and Nun Chai or Kahwa" },
          { time: "11:00 AM", activity: "Departure Transfer to SXR Airport", detail: "Assisted check-in and farewell keepsake from Kashmiré Voyages" }
        ],
        localTip: "Arrive at Srinagar Airport 2.5 hours prior due to mountain airport security protocols."
      }
    ],
    packingEssentials: [
      "Thermal base layers (merino wool recommended)",
      "Waterproof trekking shoes with firm grip",
      "Puffer down jacket (sub-zero grade for Gulmarg Phase 2)",
      "Sunscreen SPF 50+ & UV sunglasses (high snow reflection)",
      "Personal first-aid kit with mountain acclimatization tablets",
      "Postpaid BSNL / Airtel / Jio SIM (Prepaid SIMs from other states do not work in J&K due to telecom regulations)"
    ],
    budgetBreakdown: {
      hotel: Math.round(budgetNum * 0.45),
      transport: Math.round(budgetNum * 0.28),
      activities: Math.round(budgetNum * 0.15),
      meals: Math.round(budgetNum * 0.08),
      buffer: Math.round(budgetNum * 0.04)
    }
  };
}

function getLocalKashmirReply(msg: string) {
  const m = msg.toLowerCase();
  if (m.includes('snow') || m.includes('gulmarg')) {
    return `Snow is guaranteed at Apharwat Peak (Phase 2 Gondola, 13,780 ft) for 8-9 months of the year, with deep winter snow across Gulmarg, Sonamarg, and Sinthan Top from December to April. We recommend pre-booking Phase 1 & 2 tickets at least 2 weeks ahead during peak snow season. Kashmiré Voyages provides private chauffeurs with 4x4 snow chains and curated ski lessons!`;
  }
  if (m.includes('houseboat') || m.includes('dal') || m.includes('nigeen')) {
    return `For the most peaceful and pristine experience, we strongly recommend Nigeen Lake or the private lotus canals of Dal Lake. Kashmiré Voyages partners with historic carved-cedar houseboats featuring royal walnut wood craftsmanship, private butler service, and complimentary sunset shikara rides with fresh saffron kahwa.`;
  }
  if (m.includes('food') || m.includes('wazwan') || m.includes('eat')) {
    return `Kashmir's culinary heritage is legendary! You must experience a traditional Wazwan: Rogan Josh, Gushtaba, Rista, Tabak Maaz, and aromatic Yakhni. For winter mornings, hot Harissa in Old Downtown Srinagar is an unforgettable ritual. Vegetarian guests love Dum Aloo, Nadru Yakhni (lotus stem), and paneer Chaman!`;
  }
  if (m.includes('safe') || m.includes('family') || m.includes('children')) {
    return `Kashmir is one of the warmest, most hospitable destinations for families and solo travelers. Tourists are treated as 'Mehmaan' (cherished guests). Our company provides vetted chauffeurs, 24/7 manager helpline, verified hotels, and seamless transfers.`;
  }
  if (m.includes('pack') || m.includes('sim') || m.includes('phone')) {
    return `Crucial travel tip: Prepaid SIM cards from outside Jammu & Kashmir do not work here due to telecom regulations. Ensure you have a Postpaid connection (Jio, Airtel, or BSNL). Pack thermals, sturdy shoes, and moisturizers for crisp mountain air.`;
  }
  return `Thank you for consulting Kashmiré Voyages! We curate customized luxury tours across Srinagar, Gulmarg, Pahalgam, Sonamarg, Gurez, and Doodhpathri. Tell me your travel dates, number of guests, and desired pace, or connect directly with our master trip designer on WhatsApp at +91 9622229622!`;
}

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Kashmiré Voyages Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
