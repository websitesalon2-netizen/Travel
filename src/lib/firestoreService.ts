import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  getDoc,
  writeBatch
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { Destination, BusinessInfo, PaymentSettings, MountainStatusInfo, TimelineItem, BookingRecord, EnquiryLead, WebsiteContent, TourPackage, Hotel, ExperienceItem } from '../types';
import {
  initialDestinations,
  initialBusinessInfo,
  initialPaymentSettings,
  initialTimelineItems,
  initialBookings,
  initialLeads,
  initialPackages,
  initialHotels,
  initialExperiences
} from '../data/initialData';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}


// ==========================================
// WEBSITE CONTENT CMS (REAL-TIME CLOUD)
// ==========================================

export function subscribeToWebsiteContent(
  onUpdate: (content: WebsiteContent) => void,
  onError?: (err: Error) => void
) {
  const ref = doc(db, 'settings', 'websiteContent');
  return onSnapshot(ref, (snap) => {
    if (snap.exists()) onUpdate(snap.data() as WebsiteContent);
  }, (error) => {
    console.warn('Website content snapshot warning:', error);
    onError?.(error);
  });
}

export async function saveWebsiteContentToCloud(content: WebsiteContent): Promise<void> {
  const path = 'settings/websiteContent';
  try {
    await setDoc(doc(db, 'settings', 'websiteContent'), content, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// ==========================================
// DESTINATIONS COLLECTION (REAL-TIME CLOUD)
// ==========================================

export function subscribeToDestinations(
  onUpdate: (destinations: Destination[]) => void,
  onError?: (err: Error) => void
) {
  const collRef = collection(db, 'destinations');
  return onSnapshot(
    collRef,
    async (snapshot) => {
      if (snapshot.empty) {
        // First boot: Seed initial destinations into Firestore so they are globally stored
        console.log('Seeding initial destinations into cloud Firestore...');
        await seedInitialDestinations();
        return;
      }
      const list: Destination[] = [];
      snapshot.forEach((docSnap) => {
        list.push(docSnap.data() as Destination);
      });
      // Sort by popular or order
      onUpdate(list);
    },
    (error) => {
      console.warn('Destinations snapshot warning:', error);
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.GET, 'destinations');
    }
  );
}

export async function saveDestinationToCloud(destination: Destination): Promise<void> {
  const path = `destinations/${destination.id}`;
  try {
    const docRef = doc(db, 'destinations', destination.id);
    await setDoc(docRef, destination, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteDestinationFromCloud(id: string): Promise<void> {
  const path = `destinations/${id}`;
  try {
    const docRef = doc(db, 'destinations', id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function seedInitialDestinations(): Promise<void> {
  try {
    const batch = writeBatch(db);
    initialDestinations.forEach((dest) => {
      const docRef = doc(db, 'destinations', dest.id);
      batch.set(docRef, dest);
    });
    await batch.commit();
  } catch (err) {
    console.error('Error seeding destinations to Firestore:', err);
  }
}

// ==========================================
// SETTINGS (BUSINESS INFO, PAYMENT, WEATHER)
// ==========================================

export function subscribeToSettings(
  onBusinessUpdate: (info: BusinessInfo) => void,
  onPaymentUpdate: (payment: PaymentSettings) => void,
  onMountainUpdate: (mountain: MountainStatusInfo) => void
) {
  const collRef = collection(db, 'settings');
  return onSnapshot(
    collRef,
    async (snapshot) => {
      if (snapshot.empty) {
        // Seed default settings
        await setDoc(doc(db, 'settings', 'business'), initialBusinessInfo);
        await setDoc(doc(db, 'settings', 'payment'), initialPaymentSettings);
        await setDoc(doc(db, 'settings', 'mountain'), {
          gondolaStatus: 'Phase 1 & Phase 2 Active (Subject to wind)',
          gulmargSnow: '4.5 ft on Apharwat Peak',
          sonamargSnow: 'Fresh Powder at Zero Point',
          sinthanPass: 'Open 4x4 Only (Chains Mandatory)',
          mughalRoad: 'Closed for Heavy Snow',
          lastReported: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        return;
      }

      snapshot.forEach((docSnap) => {
        const id = docSnap.id;
        const data = docSnap.data();
        if (id === 'business') onBusinessUpdate(data as BusinessInfo);
        if (id === 'payment') onPaymentUpdate(data as PaymentSettings);
        if (id === 'mountain') onMountainUpdate(data as MountainStatusInfo);
      });
    },
    (error) => {
      console.warn('Settings snapshot warning:', error);
      handleFirestoreError(error, OperationType.GET, 'settings');
    }
  );
}

export async function saveBusinessInfoToCloud(info: Partial<BusinessInfo>): Promise<void> {
  try {
    const docRef = doc(db, 'settings', 'business');
    await setDoc(docRef, info, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'settings/business');
  }
}

export async function savePaymentSettingsToCloud(settings: Partial<PaymentSettings>): Promise<void> {
  try {
    const docRef = doc(db, 'settings', 'payment');
    await setDoc(docRef, settings, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'settings/payment');
  }
}

export async function saveMountainStatusToCloud(status: Partial<MountainStatusInfo>): Promise<void> {
  try {
    const docRef = doc(db, 'settings', 'mountain');
    await setDoc(docRef, status, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'settings/mountain');
  }
}

// ==========================================
// TIMELINE ITEMS
// ==========================================

export function subscribeToTimeline(onUpdate: (items: TimelineItem[]) => void) {
  const collRef = collection(db, 'timeline');
  return onSnapshot(
    collRef,
    async (snapshot) => {
      if (snapshot.empty) {
        const batch = writeBatch(db);
        initialTimelineItems.forEach((item) => {
          batch.set(doc(db, 'timeline', item.id), item);
        });
        await batch.commit();
        return;
      }
      const list: TimelineItem[] = [];
      snapshot.forEach((docSnap) => {
        list.push(docSnap.data() as TimelineItem);
      });
      list.sort((a, b) => a.order - b.order);
      onUpdate(list);
    },
    (error) => {
      console.warn('Timeline snapshot warning:', error);
      handleFirestoreError(error, OperationType.GET, 'timeline');
    }
  );
}

export async function saveTimelineItemToCloud(item: TimelineItem): Promise<void> {
  try {
    const docRef = doc(db, 'timeline', item.id);
    await setDoc(docRef, item, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `timeline/${item.id}`);
  }
}

export async function deleteTimelineItemFromCloud(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'timeline', id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `timeline/${id}`);
  }
}

// ==========================================
// WEBSITE CATALOG COLLECTIONS (REAL-TIME CLOUD)
// ==========================================

export function subscribeToPackages(onUpdate: (items: TourPackage[]) => void) {
  return onSnapshot(collection(db, 'packages'), async (snapshot) => {
    if (snapshot.empty) {
      const didSeed = await ensureSeededCollection('packages', initialPackages, (item) => item.id);
      if (didSeed) return;
      onUpdate([]);
      return;
    }
    await markCollectionInitialized('packages');
    const list: TourPackage[] = [];
    snapshot.forEach((d) => list.push(d.data() as TourPackage));
    onUpdate(list);
  }, (error) => handleFirestoreError(error, OperationType.GET, 'packages'));
}

export async function savePackageToCloud(item: TourPackage): Promise<void> {
  try { await setDoc(doc(db, 'packages', item.id), item, { merge: true }); }
  catch (error) { handleFirestoreError(error, OperationType.WRITE, `packages/${item.id}`); }
}

export async function deletePackageFromCloud(id: string): Promise<void> {
  try { await deleteDoc(doc(db, 'packages', id)); }
  catch (error) { handleFirestoreError(error, OperationType.DELETE, `packages/${id}`); }
}

export function subscribeToHotels(onUpdate: (items: Hotel[]) => void) {
  return onSnapshot(collection(db, 'hotels'), async (snapshot) => {
    if (snapshot.empty) {
      const didSeed = await ensureSeededCollection('hotels', initialHotels, (item) => item.id);
      if (didSeed) return;
      onUpdate([]);
      return;
    }
    await markCollectionInitialized('hotels');
    const list: Hotel[] = [];
    snapshot.forEach((d) => list.push(d.data() as Hotel));
    onUpdate(list);
  }, (error) => handleFirestoreError(error, OperationType.GET, 'hotels'));
}

export async function saveHotelToCloud(item: Hotel): Promise<void> {
  try { await setDoc(doc(db, 'hotels', item.id), item, { merge: true }); }
  catch (error) { handleFirestoreError(error, OperationType.WRITE, `hotels/${item.id}`); }
}

export async function deleteHotelFromCloud(id: string): Promise<void> {
  try { await deleteDoc(doc(db, 'hotels', id)); }
  catch (error) { handleFirestoreError(error, OperationType.DELETE, `hotels/${id}`); }
}

export function subscribeToExperiences(onUpdate: (items: ExperienceItem[]) => void) {
  return onSnapshot(collection(db, 'experiences'), async (snapshot) => {
    if (snapshot.empty) {
      const didSeed = await ensureSeededCollection('experiences', initialExperiences, (item) => item.id);
      if (didSeed) return;
      onUpdate([]);
      return;
    }
    await markCollectionInitialized('experiences');
    const list: ExperienceItem[] = [];
    snapshot.forEach((d) => list.push(d.data() as ExperienceItem));
    onUpdate(list);
  }, (error) => handleFirestoreError(error, OperationType.GET, 'experiences'));
}

export async function saveExperienceToCloud(item: ExperienceItem): Promise<void> {
  try { await setDoc(doc(db, 'experiences', item.id), item, { merge: true }); }
  catch (error) { handleFirestoreError(error, OperationType.WRITE, `experiences/${item.id}`); }
}

export async function deleteExperienceFromCloud(id: string): Promise<void> {
  try { await deleteDoc(doc(db, 'experiences', id)); }
  catch (error) { handleFirestoreError(error, OperationType.DELETE, `experiences/${id}`); }
}

// One-time demo-data seeding. The marker prevents deleted collections from being
// automatically repopulated later. An empty collection is a legitimate manager state.
async function ensureSeededCollection<T extends { id?: string; referenceNumber?: string }>(
  collectionName: string,
  items: T[],
  getDocId: (item: T) => string
): Promise<boolean> {
  const markerRef = doc(db, 'settings', 'collectionSeedState');
  const markerSnap = await getDoc(markerRef);
  const seeded = Boolean(markerSnap.exists() && (markerSnap.data()?.[collectionName] === true));
  if (seeded) return false;
  const batch = writeBatch(db);
  items.forEach((item) => batch.set(doc(db, collectionName, getDocId(item)), item));
  await batch.commit();
  await setDoc(markerRef, { [collectionName]: true }, { merge: true });
  return true;
}

async function markCollectionInitialized(collectionName: string): Promise<void> {
  try {
    await setDoc(doc(db, 'settings', 'collectionSeedState'), { [collectionName]: true }, { merge: true });
  } catch (error) {
    console.warn(`Could not mark ${collectionName} as initialized:`, error);
  }
}

// ==========================================
// BOOKINGS & LEADS
// ==========================================

export function subscribeToBookings(onUpdate: (bookings: BookingRecord[]) => void) {
  const collRef = collection(db, 'bookings');
  return onSnapshot(
    collRef,
    async (snapshot) => {
      if (snapshot.empty) {
        const didSeed = await ensureSeededCollection('bookings', initialBookings, (item) => item.referenceNumber);
        if (didSeed) return;
        // Empty is valid: keep the Manager Desk empty after the manager deletes all bookings.
        onUpdate([]);
        return;
      }
      await markCollectionInitialized('bookings');
      const list: BookingRecord[] = [];
      snapshot.forEach((docSnap) => list.push(docSnap.data() as BookingRecord));
      onUpdate(list);
    },
    (error) => {
      console.warn('Bookings snapshot warning:', error);
      handleFirestoreError(error, OperationType.GET, 'bookings');
    }
  );
}

export async function saveBookingToCloud(booking: BookingRecord): Promise<void> {
  try {
    const docRef = doc(db, 'bookings', booking.referenceNumber);
    await setDoc(docRef, booking, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `bookings/${booking.referenceNumber}`);
  }
}

export async function deleteBookingFromCloud(ref: string): Promise<void> {
  try {
    const docRef = doc(db, 'bookings', ref);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `bookings/${ref}`);
  }
}

export function subscribeToLeads(onUpdate: (leads: EnquiryLead[]) => void) {
  const collRef = collection(db, 'leads');
  return onSnapshot(
    collRef,
    async (snapshot) => {
      // Seed demo leads only once. An empty leads collection is a valid state
      // after the manager deletes all leads and must never be repopulated.
      if (snapshot.empty) {
        const didSeed = await ensureSeededCollection('leads', initialLeads, (item) => item.id);
        if (didSeed) return;
        onUpdate([]);
        return;
      }
      await markCollectionInitialized('leads');
      const list: EnquiryLead[] = [];
      snapshot.forEach((docSnap) => {
        list.push(docSnap.data() as EnquiryLead);
      });
      onUpdate(list);
    },
    (error) => {
      console.warn('Leads snapshot warning:', error);
      handleFirestoreError(error, OperationType.GET, 'leads');
    }
  );
}

export async function saveLeadToCloud(lead: EnquiryLead): Promise<void> {
  try {
    const docRef = doc(db, 'leads', lead.id);
    await setDoc(docRef, lead, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `leads/${lead.id}`);
  }
}

export async function deleteLeadFromCloud(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'leads', id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `leads/${id}`);
  }
}
