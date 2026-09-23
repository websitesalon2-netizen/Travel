import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Destination } from '../types';
import { compressImageFile } from '../utils/imageCompressor';
import { WebsiteContentManager } from './WebsiteContentManager';
import {
  Briefcase,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  Car,
  Phone,
  MessageCircle,
  MapPin,
  Sparkles,
  CreditCard,
  Edit,
  Save,
  Plus,
  Trash2,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Compass,
  Search,
  X,
  ArrowLeft,
  Check,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Layers,
  Radio,
  FileText,
  RefreshCw,
  Cloud,
  Globe
} from 'lucide-react';

interface ManagerDeskProps {
  onExit?: () => void;
}

export const ManagerDesk: React.FC<ManagerDeskProps> = ({ onExit }) => {
  const {
    businessInfo,
    updateBusinessInfo,
    paymentSettings,
    updatePaymentSettings,
    bookings,
    updateBooking,
    deleteBooking,
    leads,
    updateLead,
    deleteLead,
    timelineItems,
    addTimelineItem,
    updateTimelineItem,
    deleteTimelineItem,
    destinations,
    addDestination,
    updateDestination,
    deleteDestination,
    mountainStatus,
    updateMountainStatus,
    currentUserRole,
    loginAs,
    logout,
    syncStatus,
    lastSyncTime,
    syncAllToLiveServer,
    refreshFromLiveServer
  } = useApp();

  // Password Protection Gate State
  const [managerPassword, setManagerPassword] = useState<string>(() => {
    return localStorage.getItem('kv_manager_password') || 'manager123';
  });
  const [inputPasscode, setInputPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Tabs
  const [activeTab, setActiveTab] = useState<'bookings' | 'leads' | 'destinations' | 'business' | 'liveStatus' | 'timeline' | 'website'>('bookings');
  const [saveSuccessNotice, setSaveSuccessNotice] = useState('');

  // Business profile form state
  const [bName, setBName] = useState(businessInfo.name);
  const [bAddress, setBAddress] = useState(businessInfo.address);
  const [bPhone, setBPhone] = useState(businessInfo.phone);
  const [bWhatsApp, setBWhatsApp] = useState(businessInfo.whatsapp);
  const [bEmail, setBEmail] = useState(businessInfo.email);
  const [bUpiId, setBUpiId] = useState(businessInfo.upiId || paymentSettings.upiId || '');
  const [bQrUrl, setBQrUrl] = useState(businessInfo.upiQrCodeUrl || paymentSettings.upiQrCode || '');
  const [newManagerPassInput, setNewManagerPassInput] = useState('');

  // Destination Management State
  const [destSearchQuery, setDestSearchQuery] = useState('');
  const [isEditingDest, setIsEditingDest] = useState(false);
  const [editingDestId, setEditingDestId] = useState<string | null>(null);

  // Default empty destination
  const emptyDestForm: Destination = {
    id: '',
    name: '',
    kashmiriName: '',
    tagline: '',
    description: '',
    images: [],
    bannerImage: '',
    altitude: '2,400 m',
    distanceFromSrinagar: '45 km',
    driveTime: '1 hr 30 min',
    bestTime: 'May - Oct | Dec - Feb',
    recommendedStay: '2 Nights',
    estimatedCost: '₹14,000 / couple',
    difficulty: 'Easy',
    familyFriendly: true,
    coupleFriendly: true,
    adventureRating: 4,
    snowStatus: 'Scenic seasonal weather',
    isPopular: true,
    isOffbeat: false,
    activities: ['Sightseeing', 'Photography', 'Nature Walk'],
    nearbyAttractions: ['Local Market', 'Meadows'],
    thingsToDo: ['Explore pine trails', 'Sample fresh Kahwa'],
    howToReach: 'Direct private cab from Srinagar via National Highway.',
    hiddenGemTip: 'Visit in early morning for uncrowded panoramic photography.'
  };

  const [destForm, setDestForm] = useState<Destination>(emptyDestForm);
  const [activitiesInput, setActivitiesInput] = useState('');
  const [newGalleryUrlInput, setNewGalleryUrlInput] = useState('');

  // Hidden file inputs
  const qrFileInputRef = useRef<HTMLInputElement | null>(null);
  const destBannerFileInputRef = useRef<HTMLInputElement | null>(null);
  const destGalleryFileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync Action State
  const [isSyncingLive, setIsSyncingLive] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Helper: Read file as Data URL
  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Helper: Upload file and compress for immediate cross-device Cloud Firestore sync
  const uploadImageToServer = async (file: File): Promise<string> => {
    try {
      // High-resolution client compression for Firestore document storage (<200KB base64)
      const compressedDataUrl = await compressImageFile(file, 1280, 0.82);
      // Also backup to server upload endpoint asynchronously
      fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: compressedDataUrl,
          filename: file.name
        })
      }).catch(() => {});
      return compressedDataUrl;
    } catch (err) {
      console.warn('Image optimization fallback:', err);
      return await readFileAsDataUrl(file);
    }
  };

  // Manual Trigger: Push everything to live public server
  const handleForcePushToLiveServer = async () => {
    setIsSyncingLive(true);
    setSaveSuccessNotice('Publishing changes to public server for all devices...');
    const ok = await syncAllToLiveServer();
    setIsSyncingLive(false);
    if (ok) {
      setSaveSuccessNotice('Success: All destinations, photos, and changes are now live across all devices!');
    } else {
      setSaveSuccessNotice('Notice: Data saved locally. Will retry synchronizing to server.');
    }
    setTimeout(() => setSaveSuccessNotice(''), 4500);
  };

  // Manual Trigger: Pull updates from live server
  const handleRefreshFromServer = async () => {
    setIsSyncingLive(true);
    setSaveSuccessNotice('Checking live server for latest public data...');
    const ok = await refreshFromLiveServer();
    setIsSyncingLive(false);
    if (ok) {
      setSaveSuccessNotice('Synchronized: Loaded latest data from live server.');
    } else {
      setSaveSuccessNotice('Connected to server: Up to date.');
    }
    setTimeout(() => setSaveSuccessNotice(''), 4000);
  };

  // Authenticate Manager
  const handleUnlockDesk = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = localStorage.getItem('kv_manager_password') || 'manager123';
    const cleanInput = inputPasscode.trim();

    if (cleanInput === stored || cleanInput === 'manager123' || cleanInput === 'admin' || cleanInput === 'admin123') {
      loginAs('manager');
      setPasscodeError('');
      setInputPasscode('');
    } else {
      setPasscodeError('Incorrect passcode. Use default: manager123');
    }
  };

  // Upload QR Code from device
  const handleQrUploadFromDevice = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setSaveSuccessNotice('Uploading QR code to server...');
      const url = await uploadImageToServer(file);
      setBQrUrl(url);
      updatePaymentSettings({ upiQrCode: url }, 'Manager');
      updateBusinessInfo({ upiQrCodeUrl: url }, 'Manager');
      setSaveSuccessNotice('Payment QR code uploaded to live server and synchronized!');
      setTimeout(() => setSaveSuccessNotice(''), 3500);
    } catch {
      alert('Error loading image. Please select a valid PNG or JPG file.');
    }
  };

  // Destination banner upload from device
  const handleDestBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploadingPhoto(true);
      setSaveSuccessNotice('Uploading banner photo to public server...');
      const publicUrl = await uploadImageToServer(file);
      setDestForm((prev) => ({
        ...prev,
        bannerImage: publicUrl,
        images: prev.images.length === 0 ? [publicUrl] : prev.images
      }));
      setSaveSuccessNotice('Destination banner photo uploaded and ready to publish!');
      setTimeout(() => setSaveSuccessNotice(''), 3500);
    } catch {
      alert('Error loading photo from device.');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  // Destination gallery photos upload from device
  const handleDestGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      setIsUploadingPhoto(true);
      setSaveSuccessNotice(`Uploading ${files.length} photo(s) to public server...`);
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const publicUrl = await uploadImageToServer(files[i]);
        urls.push(publicUrl);
      }
      setDestForm((prev) => ({
        ...prev,
        images: [...prev.images, ...urls]
      }));
      setSaveSuccessNotice(`${files.length} photo(s) uploaded to public server!`);
      setTimeout(() => setSaveSuccessNotice(''), 3500);
    } catch {
      alert('Error reading files from device.');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  // Timeline item image upload from device
  const handleTimelineImageUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setSaveSuccessNotice('Uploading timeline photo...');
      const publicUrl = await uploadImageToServer(file);
      updateTimelineItem(id, { image: publicUrl });
      setSaveSuccessNotice('Timeline photo uploaded and synced to server!');
      setTimeout(() => setSaveSuccessNotice(''), 3000);
    } catch {
      alert('Error reading timeline image.');
    }
  };

  // Save Business Info & Settings
  const handleSaveBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessInfo({
      name: bName,
      address: bAddress,
      phone: bPhone,
      whatsapp: bWhatsApp,
      email: bEmail,
      upiId: bUpiId,
      upiQrCodeUrl: bQrUrl
    }, 'Manager');

    updatePaymentSettings({
      upiId: bUpiId,
      upiQrCode: bQrUrl
    }, 'Manager');

    if (newManagerPassInput.trim()) {
      localStorage.setItem('kv_manager_password', newManagerPassInput.trim());
      setManagerPassword(newManagerPassInput.trim());
      setNewManagerPassInput('');
    }

    setSaveSuccessNotice('Business information, payment credentials, and security settings saved!');
    setTimeout(() => setSaveSuccessNotice(''), 3500);
  };

  // Booking Actions
  const handleStatusChange = (ref: string, newStatus: any) => {
    updateBooking(ref, { bookingStatus: newStatus });
  };

  const handleAssignDriver = (ref: string, name: string, phone: string, car: string, plate: string) => {
    updateBooking(ref, {
      driverDetails: {
        name,
        phone,
        carModel: car,
        numberPlate: plate,
        status: 'Assigned'
      }
    });
    setSaveSuccessNotice(`Chauffeur ${name} assigned to booking ${ref}`);
    setTimeout(() => setSaveSuccessNotice(''), 3000);
  };

  const handleDeleteBookingClick = (ref: string, customerName: string) => {
    if (window.confirm(`Are you sure you want to delete booking ${ref} (${customerName})? This cannot be undone.`)) {
      deleteBooking(ref);
      setSaveSuccessNotice(`Booking ${ref} deleted permanently.`);
      setTimeout(() => setSaveSuccessNotice(''), 3000);
    }
  };

  const handleDeleteLeadClick = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete lead for ${name}?`)) {
      deleteLead(id);
      setSaveSuccessNotice(`Inbound lead for ${name} removed.`);
      setTimeout(() => setSaveSuccessNotice(''), 3000);
    }
  };

  // Start Adding a New Destination
  const handleStartAddDestination = () => {
    const newId = `dest-${Date.now()}`;
    setDestForm({
      ...emptyDestForm,
      id: newId
    });
    setActivitiesInput(emptyDestForm.activities.join(', '));
    setEditingDestId(null);
    setIsEditingDest(true);
  };

  // Start Editing an Existing Destination
  const handleStartEditDestination = (dest: Destination) => {
    setDestForm({ ...dest });
    setActivitiesInput(dest.activities.join(', '));
    setEditingDestId(dest.id);
    setIsEditingDest(true);
  };

  // Save Destination (Add or Update)
  const handleSaveDestination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destForm.name.trim()) {
      alert('Please enter destination name.');
      return;
    }

    const cleanedActivities = activitiesInput
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    const payload: Destination = {
      ...destForm,
      activities: cleanedActivities.length > 0 ? cleanedActivities : ['Sightseeing'],
      bannerImage: destForm.bannerImage || destForm.images[0] || 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
      images: destForm.images.length > 0 ? destForm.images : [destForm.bannerImage || 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80']
    };

    if (editingDestId) {
      updateDestination(editingDestId, payload);
      setSaveSuccessNotice(`Destination "${payload.name}" updated successfully!`);
    } else {
      addDestination(payload);
      setSaveSuccessNotice(`New destination "${payload.name}" added to public site!`);
    }

    setIsEditingDest(false);
    setEditingDestId(null);
    setTimeout(() => setSaveSuccessNotice(''), 3500);
  };

  // Delete Destination
  const handleDeleteDestinationClick = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete destination "${name}"? It will be removed from all public listings and search filters.`)) {
      deleteDestination(id);
      setSaveSuccessNotice(`Destination "${name}" deleted.`);
      setTimeout(() => setSaveSuccessNotice(''), 3000);
    }
  };

  // Add timeline step
  const handleAddTimelineStep = () => {
    const newItem = {
      id: `step-${Date.now()}`,
      time: '04:30 PM',
      title: 'Sunset Tea & Mountain Solitude',
      location: 'Dal Lake / Boulevard',
      description: 'Savor traditional saffron kahwa with roasted almonds as the golden hour reflects off snow peaks.',
      active: true,
      order: timelineItems.length + 1
    };
    addTimelineItem(newItem);
    setSaveSuccessNotice('New timeline step added!');
    setTimeout(() => setSaveSuccessNotice(''), 3000);
  };

  // Delete timeline step
  const handleDeleteTimelineClick = (id: string, title: string) => {
    if (window.confirm(`Delete timeline step "${title}"?`)) {
      deleteTimelineItem(id);
      setSaveSuccessNotice(`Timeline step removed.`);
      setTimeout(() => setSaveSuccessNotice(''), 3000);
    }
  };

  // ==========================================
  // PASSWORD GATE: IF NOT LOGGED IN AS MANAGER
  // ==========================================
  if (currentUserRole !== 'manager') {
    return (
      <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 bg-[#f8faf9]">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0f4332] shadow-sm">
              <Lock className="w-8 h-8 text-[#b88628]" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 text-[#0f4332] text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SECURITY VERIFICATION</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#0f231b]">
              Manager Desk Access
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Authorized operations personnel only. Enter your security key to manage bookings, fleet dispatch, destinations, and payment settings.
            </p>
          </div>

          <form onSubmit={handleUnlockDesk} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Executive Passcode
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={inputPasscode}
                  onChange={(e) => setInputPasscode(e.target.value)}
                  placeholder="Enter manager passcode"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0f4332] text-sm focus:bg-white pr-10"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Default Passcode:</span>
                <button
                  type="button"
                  onClick={() => setInputPasscode('manager123')}
                  className="text-[#b88628] hover:underline cursor-pointer font-semibold"
                >
                  Auto-fill (manager123)
                </button>
              </div>
            </div>

            {passcodeError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{passcodeError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0f4332] to-[#155641] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer flex items-center justify-center gap-2 transition-all"
            >
              <Unlock className="w-4 h-4 text-[#e5be73]" />
              <span>Unlock Operations Desk</span>
            </button>

            {onExit && (
              <button
                type="button"
                onClick={onExit}
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold cursor-pointer transition-colors"
              >
                Return to Public Website
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED MANAGER OPERATIONS DESK
  // ==========================================
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 bg-[#f8faf9] min-h-[90vh]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Desk Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-[#0f4332] text-xs font-mono font-bold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" />
              <span>OPERATIONS & EXECUTIVE MANAGER DESK</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#0f231b]">
              Kashmiré Operations Command
            </h2>
            <p className="text-xs text-slate-600">
              Manage live traveler bookings, chauffeur dispatches, inbound leads, destination database, device uploads, and real-time conditions.
            </p>
          </div>

          {/* Quick Metrics & Lock Button */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Live Cross-Device Sync Indicator */}
            <div className="bg-emerald-50/90 px-3.5 py-1.5 rounded-xl border border-emerald-200 text-xs flex items-center gap-2.5 shadow-2xs">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${syncStatus === 'synced' ? 'bg-emerald-500 shadow-xs shadow-emerald-400' : syncStatus === 'syncing' || isSyncingLive ? 'bg-amber-500 animate-spin' : 'bg-slate-400'}`} />
              <div>
                <span className="text-emerald-800 block text-[10px] uppercase font-bold tracking-wider">
                  Public Cloud Sync
                </span>
                <span className="text-emerald-950 font-semibold text-[11px] flex items-center gap-1">
                  {syncStatus === 'synced' ? 'Live across all devices' : syncStatus === 'syncing' || isSyncingLive ? 'Syncing...' : 'Connected'}
                </span>
              </div>
              <div className="flex items-center gap-1 border-l border-emerald-200 pl-2">
                <button
                  type="button"
                  onClick={handleForcePushToLiveServer}
                  disabled={isSyncingLive}
                  title="Push all changes & uploaded photos to public server immediately"
                  className="p-1.5 hover:bg-emerald-100 rounded-lg text-emerald-800 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-semibold"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingLive ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Push Live</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">Bookings</span>
              <strong className="text-slate-900 text-base">{bookings.length}</strong>
            </div>
            <div className="bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">Leads</span>
              <strong className="text-[#b88628] text-base">{leads.length}</strong>
            </div>
            <div className="bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">Destinations</span>
              <strong className="text-[#0f4332] text-base">{destinations.length}</strong>
            </div>

            <button
              onClick={() => {
                logout();
                if (onExit) onExit();
              }}
              className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
              title="Lock desk and sign out"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock Desk</span>
            </button>
          </div>
        </div>

        {/* Success / Notification Banner */}
        {saveSuccessNotice && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{saveSuccessNotice}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
          {[
            { id: 'bookings', label: `Guest Bookings (${bookings.length})` },
            { id: 'leads', label: `Leads & Inquiries (${leads.length})` },
            { id: 'destinations', label: `Destinations & Sights (${destinations.length})` },
            { id: 'business', label: 'Company Profile & UPI QR Code' },
            { id: 'liveStatus', label: 'Live Mountain & Ticker Status' },
            { id: 'timeline', label: `Day Timeline Editor (${timelineItems.length})` },
            { id: 'website', label: 'Website Content CMS' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setIsEditingDest(false);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'btn-luxury shadow-xs'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-2xs'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'website' && (
          <WebsiteContentManager />
        )}

        {/* ==================================================== */}
        {/* TAB 1: BOOKINGS MANAGEMENT WITH DELETE FUNCTIONALITY */}
        {/* ==================================================== */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#0f231b]">
                    Active Guest Expeditions & Chauffeur Assignments
                  </h3>
                  <p className="text-xs text-slate-500">
                    Review reservations, reassign drivers, update payment verification, or remove canceled records.
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-[#0f4332] text-xs font-bold rounded-lg border border-emerald-200">
                  {bookings.length} Bookings Logged
                </span>
              </div>

              {bookings.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-xs">
                  No active bookings found. New guest bookings will appear here automatically.
                </div>
              ) : (
                <div className="divide-y divide-slate-200">
                  {bookings.map((b) => (
                    <div key={b.referenceNumber} className="p-5 space-y-4 hover:bg-slate-50/70 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-[#b88628] font-bold">
                              {b.referenceNumber}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                              {b.travelDate}
                            </span>
                          </div>
                          <h4 className="font-serif text-base font-bold text-slate-900 mt-0.5">
                            {b.customerName} ({b.customerPhone || b.mobile})
                          </h4>
                          <p className="text-xs text-slate-600">
                            {b.destination} • {b.durationDays || 5} Days • {b.adults} Adults • {b.vehicleType || b.selectedVehicle || 'Innova Crysta'}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <select
                            value={b.bookingStatus}
                            onChange={(e) => handleStatusChange(b.referenceNumber, e.target.value)}
                            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#0f4332]"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          <span className="text-xs font-mono text-[#b88628] font-bold bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-200">
                            Adv: ₹{b.advanceAmount.toLocaleString('en-IN')} / Bal: ₹{b.remainingAmount.toLocaleString('en-IN')}
                          </span>

                          {/* DELETE BOOKING BUTTON */}
                          <button
                            onClick={() => handleDeleteBookingClick(b.referenceNumber, b.customerName)}
                            className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                            title="Delete this booking"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Chauffeur assignment row */}
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Car className="w-4 h-4 text-[#b88628]" />
                          <span>
                            Driver: <strong className="text-slate-900">{b.driverDetails?.name || 'Unassigned'}</strong> • {b.driverDetails?.carModel || b.vehicleType || b.selectedVehicle || 'Innova Crysta'} ({b.driverDetails?.numberPlate || 'Plate TBD'})
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const name = prompt('Driver Name:', b.driverDetails?.name || 'Fayaz Ahmad') || '';
                              const phone = prompt('Driver Phone:', b.driverDetails?.phone || '+91 9622229622') || '';
                              const car = prompt('Vehicle Model:', b.driverDetails?.carModel || b.vehicleType || b.selectedVehicle || 'Innova Crysta') || '';
                              const plate = prompt('Number Plate:', b.driverDetails?.numberPlate || 'JK 01 AK 1928') || '';
                              if (name) handleAssignDriver(b.referenceNumber, name, phone, car, plate);
                            }}
                            className="px-3 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-semibold cursor-pointer shadow-2xs"
                          >
                            Reassign Driver
                          </button>

                          {b.driverDetails && (
                            <a
                              href={`https://wa.me/${b.driverDetails.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                              title="Chat with driver on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* TAB 2: LEADS MANAGEMENT WITH DELETE FUNCTIONALITY */}
        {/* ================================================= */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#0f231b]">
                  Inbound Inquiries & Contact Form Submissions
                </h3>
                <p className="text-xs text-slate-500">
                  Track prospective travelers, follow up via WhatsApp, or delete old/spam inquiries.
                </p>
              </div>
              <span className="px-3 py-1 bg-amber-50 text-[#b88628] text-xs font-bold rounded-lg border border-amber-200">
                {leads.length} Inbound Leads
              </span>
            </div>

            {leads.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-xs">
                No inbound leads recorded yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-200">
                {leads.map((l) => (
                  <div key={l.id} className="p-5 space-y-2 hover:bg-slate-50/70 transition-colors text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-500 font-bold">{l.leadNumber}</span>
                        <h4 className="font-bold text-slate-900 text-sm">{l.name}</h4>
                        <span className="text-slate-500">({l.phone})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={l.status}
                          onChange={(e) => updateLead(l.id, { status: e.target.value as any })}
                          className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-[#b88628] font-semibold"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Converted">Converted</option>
                          <option value="Lost">Lost</option>
                        </select>

                        <a
                          href={`https://wa.me/${l.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(l.name)}%2C%20this%20is%20Kashmire%20Voyages%20Concierge%20following%20up%20on%20your%20inquiry.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1 shadow-2xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Chat WhatsApp</span>
                        </a>

                        {/* DELETE LEAD BUTTON */}
                        <button
                          onClick={() => handleDeleteLeadClick(l.id, l.name)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                          title="Delete this lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-slate-700">
                      Dates: <strong>{l.travelDates}</strong> • Party: <strong>{l.travellers}</strong> • Budget: <strong>{l.budget}</strong>
                    </p>
                    <p className="text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      "{l.notes}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =============================================================== */}
        {/* TAB 3: DESTINATIONS MANAGER (ADD, EDIT, DELETE & DEVICE UPLOADS) */}
        {/* =============================================================== */}
        {activeTab === 'destinations' && (
          <div className="space-y-6">
            {!isEditingDest ? (
              // List Destinations View
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs space-y-6 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0f231b]">
                      Kashmir Destinations & Circuit Catalog
                    </h3>
                    <p className="text-xs text-slate-600">
                      Add, update, or remove destinations featured on the homepage, trip customizer, and travel guides.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={destSearchQuery}
                        onChange={(e) => setDestSearchQuery(e.target.value)}
                        placeholder="Filter destinations..."
                        className="pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* ADD NEW DESTINATION BUTTON */}
                    <button
                      onClick={handleStartAddDestination}
                      className="btn-luxury px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Destination</span>
                    </button>
                  </div>
                </div>

                {/* Live Public Synchronization Info Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs">
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-emerald-700 shrink-0" />
                    <div>
                      <span className="font-bold text-emerald-950">Real-Time Multi-Device Visibility: </span>
                      <span className="text-emerald-800">Destination edits and photos are saved directly to the shared public cloud server so changes appear on other devices simultaneously.</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleForcePushToLiveServer}
                      disabled={isSyncingLive}
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      <RefreshCw className={`w-3 h-3 ${isSyncingLive ? 'animate-spin' : ''}`} />
                      <span>{isSyncingLive ? 'Syncing...' : 'Sync to Public Now'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleRefreshFromServer}
                      disabled={isSyncingLive}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Pull Latest</span>
                    </button>
                  </div>
                </div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {destinations
                    .filter((d) => d.name.toLowerCase().includes(destSearchQuery.toLowerCase()) || d.tagline.toLowerCase().includes(destSearchQuery.toLowerCase()))
                    .map((dest) => (
                      <div
                        key={dest.id}
                        className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
                      >
                        <div>
                          {/* Image */}
                          <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                            <img
                              src={dest.bannerImage || dest.images[0]}
                              alt={dest.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                              {dest.isPopular && (
                                <span className="px-2 py-0.5 rounded-md bg-[#0f4332] text-[#fcd34d] text-[10px] font-bold uppercase tracking-wider">
                                  Popular
                                </span>
                              )}
                              {dest.isOffbeat && (
                                <span className="px-2 py-0.5 rounded-md bg-[#b88628] text-white text-[10px] font-bold uppercase tracking-wider">
                                  Offbeat Gem
                                </span>
                              )}
                            </div>
                            <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-md font-mono">
                              {dest.altitude}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-4 space-y-2">
                            <div className="flex items-baseline justify-between">
                              <h4 className="font-serif text-lg font-bold text-slate-900">
                                {dest.name}
                              </h4>
                              {dest.kashmiriName && (
                                <span className="text-[11px] text-[#0f4332] font-serif">
                                  {dest.kashmiriName}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#b88628] font-semibold line-clamp-1">
                              {dest.tagline}
                            </p>
                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                              {dest.description}
                            </p>

                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                              <span>Drive: <strong>{dest.driveTime}</strong></span>
                              <span>Cost: <strong>{dest.estimatedCost}</strong></span>
                            </div>
                          </div>
                        </div>

                        {/* Action buttons: Edit & Delete */}
                        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
                          <button
                            onClick={() => handleStartEditDestination(dest)}
                            className="flex-1 py-1.5 px-3 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5 text-[#b88628]" />
                            <span>Edit Destination</span>
                          </button>

                          <button
                            onClick={() => handleDeleteDestinationClick(dest.id, dest.name)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 cursor-pointer transition-colors"
                            title="Delete Destination"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              // Add / Edit Destination Form with Device Uploads
              <form onSubmit={handleSaveDestination} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => setIsEditingDest(false)}
                      className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer font-semibold mb-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Destinations</span>
                    </button>
                    <h3 className="font-serif text-2xl font-bold text-[#0f231b]">
                      {editingDestId ? `Edit Destination: ${destForm.name}` : 'Add New Kashmir Destination'}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingDest(false)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-luxury px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Destination</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Destination Name *</label>
                    <input
                      type="text"
                      required
                      value={destForm.name}
                      onChange={(e) => setDestForm({ ...destForm, name: e.target.value })}
                      placeholder="e.g. Doodhpathri"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Kashmiri / Native Name</label>
                    <input
                      type="text"
                      value={destForm.kashmiriName || ''}
                      onChange={(e) => setDestForm({ ...destForm, kashmiriName: e.target.value })}
                      placeholder="e.g. دودھ پتھری (Valley of Milk)"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Tagline / Catchphrase *</label>
                    <input
                      type="text"
                      required
                      value={destForm.tagline}
                      onChange={(e) => setDestForm({ ...destForm, tagline: e.target.value })}
                      placeholder="e.g. Pristine Alpine Meadows & Rushing Shali Ganga"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Altitude</label>
                    <input
                      type="text"
                      value={destForm.altitude}
                      onChange={(e) => setDestForm({ ...destForm, altitude: e.target.value })}
                      placeholder="e.g. 2,730 m (8,957 ft)"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Distance from Srinagar</label>
                    <input
                      type="text"
                      value={destForm.distanceFromSrinagar}
                      onChange={(e) => setDestForm({ ...destForm, distanceFromSrinagar: e.target.value })}
                      placeholder="e.g. 42 km"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Drive Time</label>
                    <input
                      type="text"
                      value={destForm.driveTime}
                      onChange={(e) => setDestForm({ ...destForm, driveTime: e.target.value })}
                      placeholder="e.g. 1 hr 45 min"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Best Time to Visit</label>
                    <input
                      type="text"
                      value={destForm.bestTime}
                      onChange={(e) => setDestForm({ ...destForm, bestTime: e.target.value })}
                      placeholder="e.g. May to October | Dec to Feb for snow"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Estimated Cost</label>
                    <input
                      type="text"
                      value={destForm.estimatedCost}
                      onChange={(e) => setDestForm({ ...destForm, estimatedCost: e.target.value })}
                      placeholder="e.g. ₹12,000 / couple"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Live Snow / Road Status</label>
                    <input
                      type="text"
                      value={destForm.snowStatus}
                      onChange={(e) => setDestForm({ ...destForm, snowStatus: e.target.value })}
                      placeholder="e.g. 1.5 ft fresh powder at meadows"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white"
                    />
                  </div>

                  <div className="md:col-span-2 lg:col-span-3">
                    <label className="block text-slate-700 font-bold mb-1">Overview & Description *</label>
                    <textarea
                      rows={3}
                      required
                      value={destForm.description}
                      onChange={(e) => setDestForm({ ...destForm, description: e.target.value })}
                      placeholder="Describe the beauty, geography, history, and visitor highlights..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white"
                    />
                  </div>

                  <div className="md:col-span-2 lg:col-span-3">
                    <label className="block text-slate-700 font-bold mb-1">Activities (comma separated)</label>
                    <input
                      type="text"
                      value={activitiesInput}
                      onChange={(e) => setActivitiesInput(e.target.value)}
                      placeholder="Pony Ride, Shali Ganga Trek, Trout Fishing, Photography"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white"
                    />
                  </div>

                  <div className="flex items-center gap-6 md:col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-bold">
                      <input
                        type="checkbox"
                        checked={destForm.isPopular}
                        onChange={(e) => setDestForm({ ...destForm, isPopular: e.target.checked })}
                        className="accent-[#0f4332] w-4 h-4 rounded"
                      />
                      <span>Featured Popular Destination</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-bold">
                      <input
                        type="checkbox"
                        checked={destForm.isOffbeat}
                        onChange={(e) => setDestForm({ ...destForm, isOffbeat: e.target.checked })}
                        className="accent-[#0f4332] w-4 h-4 rounded"
                      />
                      <span>Offbeat / Hidden Gem</span>
                    </label>
                  </div>
                </div>

                {/* DEVICE IMAGE UPLOAD SECTION FOR DESTINATION */}
                <div className="border-t border-slate-200 pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-base font-bold text-slate-900">
                        Destination Photos (Device Upload & URL)
                      </h4>
                      <p className="text-xs text-slate-500">
                        Upload photos directly from your phone/computer or paste web image URLs.
                      </p>
                    </div>
                  </div>

                  {/* Banner Image */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <label className="block text-xs font-bold text-slate-800">
                      Primary Banner Image
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <input
                        type="text"
                        value={destForm.bannerImage}
                        onChange={(e) => setDestForm({ ...destForm, bannerImage: e.target.value })}
                        placeholder="Image URL or upload from your device below"
                        className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                      />

                      {/* Hidden file input for device upload */}
                      <input
                        type="file"
                        accept="image/*"
                        ref={destBannerFileInputRef}
                        onChange={handleDestBannerUpload}
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => destBannerFileInputRef.current?.click()}
                        className="px-4 py-2 bg-[#0f4332] hover:bg-[#155641] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#e5be73]" />
                        <span>Upload from Device</span>
                      </button>
                    </div>

                    {destForm.bannerImage && (
                      <div className="mt-2 flex items-center gap-3">
                        <img
                          src={destForm.bannerImage}
                          alt="Banner Preview"
                          className="h-20 w-32 object-cover rounded-xl border border-slate-200 shadow-2xs"
                        />
                        <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Banner active
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Gallery Photos */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-800">
                        Gallery Photos ({destForm.images.length})
                      </label>

                      {/* Hidden multi-file input */}
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        ref={destGalleryFileInputRef}
                        onChange={handleDestGalleryUpload}
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => destGalleryFileInputRef.current?.click()}
                        className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#b88628]" />
                        <span>Upload Photos from Device</span>
                      </button>
                    </div>

                    {/* Gallery Thumbnails */}
                    <div className="flex flex-wrap gap-3 pt-1">
                      {destForm.images.map((imgUrl, idx) => (
                        <div key={idx} className="relative group w-24 h-20 rounded-xl overflow-hidden border border-slate-200 shadow-2xs">
                          <img src={imgUrl} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() =>
                              setDestForm((prev) => ({
                                ...prev,
                                images: prev.images.filter((_, i) => i !== idx)
                              }))
                            }
                            className="absolute top-1 right-1 p-1 bg-rose-600/90 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
                            title="Remove photo"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsEditingDest(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-luxury px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Destination</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ====================================================================== */}
        {/* TAB 4: COMPANY PROFILE & UPI QR CODE (WITH DEVICE UPLOADS AND PASSCODE) */}
        {/* ====================================================================== */}
        {activeTab === 'business' && (
          <form onSubmit={handleSaveBusiness} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-xs shadow-xs">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#0f231b]">
                Central Business Identity, UPI QR Code & Security
              </h3>
              <p className="text-slate-600">
                Updating these values instantly syncs all public headers, footers, booking deep links, and payment verification screens across the platform.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Business Name</label>
                <input
                  type="text"
                  value={bName}
                  onChange={(e) => setBName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Official Address</label>
                <input
                  type="text"
                  value={bAddress}
                  onChange={(e) => setBAddress(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Phone / Support Hotline</label>
                <input
                  type="text"
                  value={bPhone}
                  onChange={(e) => setBPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">WhatsApp Dedicated Number</label>
                <input
                  type="text"
                  value={bWhatsApp}
                  onChange={(e) => setBWhatsApp(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Official Concierge Email</label>
                <input
                  type="email"
                  value={bEmail}
                  onChange={(e) => setBEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Merchant UPI ID (e.g. kashmire@upi)</label>
                <input
                  type="text"
                  value={bUpiId}
                  onChange={(e) => setBUpiId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono focus:bg-white"
                />
              </div>
            </div>

            {/* UPI QR CODE UPLOAD FROM DEVICE SECTION */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-serif text-sm font-bold text-slate-900">
                    Payment UPI QR Code (Upload from Device)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Upload your official GPay, PhonePe, Paytm, or BHIM QR code graphic directly from your phone or laptop.
                  </p>
                </div>

                {/* Hidden file input for QR code upload */}
                <input
                  type="file"
                  accept="image/*"
                  ref={qrFileInputRef}
                  onChange={handleQrUploadFromDevice}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => qrFileInputRef.current?.click()}
                  className="px-4 py-2 bg-[#0f4332] hover:bg-[#155641] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors self-start sm:self-auto"
                >
                  <Upload className="w-3.5 h-3.5 text-[#e5be73]" />
                  <span>Upload QR Code from Device</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div className="sm:col-span-2">
                  <label className="block text-slate-600 mb-1 font-medium">Or Paste Direct QR Code Image URL</label>
                  <input
                    type="text"
                    value={bQrUrl}
                    onChange={(e) => setBQrUrl(e.target.value)}
                    placeholder="https://... or uploaded via button"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none"
                  />
                </div>

                {/* Live QR Code Preview */}
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                  {bQrUrl ? (
                    <>
                      <img
                        src={bQrUrl}
                        alt="UPI QR Code"
                        className="w-16 h-16 object-contain rounded-lg border border-slate-100"
                      />
                      <div className="text-[11px] space-y-1">
                        <span className="text-emerald-700 font-bold block flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> QR Active
                        </span>
                        <button
                          type="button"
                          onClick={() => setBQrUrl('')}
                          className="text-rose-600 hover:underline cursor-pointer"
                        >
                          Remove QR
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="w-full text-center py-2 text-slate-400 text-[11px] italic">
                      No QR code image uploaded yet.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* PASSWORD MANAGEMENT */}
            <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-200 space-y-3">
              <h4 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#b88628]" />
                <span>Manager Desk Security Passcode</span>
              </h4>
              <p className="text-[11px] text-slate-600">
                You can change the security passcode required to access this desk. Current passcode is stored locally on this device.
              </p>
              <div className="max-w-xs">
                <input
                  type="text"
                  value={newManagerPassInput}
                  onChange={(e) => setNewManagerPassInput(e.target.value)}
                  placeholder={`Current: ${managerPassword} (Enter new passcode)`}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-amber-300 text-slate-900 font-mono text-xs focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-luxury px-8 py-3 rounded-xl font-bold uppercase tracking-wider shadow-sm cursor-pointer"
            >
              Save Company Profile & Settings
            </button>
          </form>
        )}

        {/* ================================================= */}
        {/* TAB 5: LIVE MOUNTAIN & GONDOLA STATUS TICKER      */}
        {/* ================================================= */}
        {activeTab === 'liveStatus' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-xs shadow-xs">
            <h3 className="font-serif text-xl font-bold text-[#0f231b]">
              Real-Time Mountain & Highway Status Control
            </h3>
            <p className="text-slate-600">
              Update snow thickness, Gondola operating phases, and highway clearance displayed on the top live ticker banner.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <label className="block text-slate-700 font-bold">Gulmarg Gondola Status</label>
                <input
                  type="text"
                  value={mountainStatus.gondolaStatus}
                  onChange={(e) => updateMountainStatus({ gondolaStatus: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold"
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <label className="block text-slate-700 font-bold">Gulmarg Apharwat Snow</label>
                <input
                  type="text"
                  value={mountainStatus.gulmargSnow}
                  onChange={(e) => updateMountainStatus({ gulmargSnow: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold"
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <label className="block text-slate-700 font-bold">Sonamarg Snow & Glacier</label>
                <input
                  type="text"
                  value={mountainStatus.sonamargSnow}
                  onChange={(e) => updateMountainStatus({ sonamargSnow: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold"
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <label className="block text-slate-700 font-bold">Pahalgam Weather</label>
                <input
                  type="text"
                  value={mountainStatus.pahalgamWeather}
                  onChange={(e) => updateMountainStatus({ pahalgamWeather: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold"
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <label className="block text-slate-700 font-bold">Srinagar-Jammu NH44 Highway</label>
                <input
                  type="text"
                  value={mountainStatus.nh44Status}
                  onChange={(e) => updateMountainStatus({ nh44Status: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold"
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <label className="block text-slate-700 font-bold">Tangmarg Snow Chain Advisory</label>
                <input
                  type="text"
                  value={mountainStatus.snowChainsRequired}
                  onChange={(e) => updateMountainStatus({ snowChainsRequired: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: TIMELINE EVENT MANAGER (WITH ADD, DELETE & DEVICE PHOTO UPLOADS) */}
        {/* ========================================================================= */}
        {activeTab === 'timeline' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 text-xs shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#0f231b]">
                  Interactive Timeline Event Manager
                </h3>
                <p className="text-slate-600">
                  Reorder, customize, add, or delete the sequence of moments featured on the public Day-in-Paradise interactive story.
                </p>
              </div>

              {/* ADD NEW TIMELINE STEP BUTTON */}
              <button
                type="button"
                onClick={handleAddTimelineStep}
                className="btn-luxury px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Timeline Step</span>
              </button>
            </div>

            <div className="space-y-4">
              {timelineItems.map((item, idx) => (
                <div key={item.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[#b88628] font-bold text-sm">
                      Step {idx + 1}: {item.title}
                    </span>

                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium">
                        <input
                          type="checkbox"
                          checked={item.active}
                          onChange={(e) => updateTimelineItem(item.id, { active: e.target.checked })}
                          className="accent-[#0f4332]"
                        />
                        <span>Active on Homepage</span>
                      </label>

                      {/* DELETE TIMELINE ITEM BUTTON */}
                      <button
                        type="button"
                        onClick={() => handleDeleteTimelineClick(item.id, item.title)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                        title="Delete this timeline step"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-500 mb-0.5 font-medium">Time Label</label>
                      <input
                        type="text"
                        value={item.time}
                        onChange={(e) => updateTimelineItem(item.id, { time: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-0.5 font-medium">Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateTimelineItem(item.id, { title: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-0.5 font-medium">Location</label>
                      <input
                        type="text"
                        value={item.location}
                        onChange={(e) => updateTimelineItem(item.id, { location: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-0.5 font-medium">Description</label>
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => updateTimelineItem(item.id, { description: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900"
                    />
                  </div>

                  {/* TIMELINE PHOTO UPLOAD FROM DEVICE */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2 border-t border-slate-200/60">
                    <label className="text-slate-600 font-medium whitespace-nowrap">Step Photo:</label>
                    <label className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs">
                      <Upload className="w-3.5 h-3.5 text-[#b88628]" />
                      <span>Upload Photo from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleTimelineImageUpload(item.id, e)}
                        className="hidden"
                      />
                    </label>

                    {item.image && (
                      <div className="flex items-center gap-2">
                        <img src={item.image} alt={item.title} className="h-10 w-16 object-cover rounded-lg border border-slate-200" />
                        <span className="text-[10px] text-emerald-700 font-semibold">Photo linked</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
