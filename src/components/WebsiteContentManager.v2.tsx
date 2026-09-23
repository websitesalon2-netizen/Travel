import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WebsiteContent } from '../types';
import { uploadImageToServer } from '../utils/imageUpload';
import { CalendarDays, Image as ImageIcon, Save, Upload, Sparkles, Utensils, Eye } from 'lucide-react';

const Field: React.FC<{ label: string; value: string; onChange: (v: string) => void; textarea?: boolean }> = ({ label, value, onChange, textarea }) => (
  <label className="block space-y-1.5">
    <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</span>
    {textarea ? (
      <textarea value={value || ''} onChange={e => onChange(e.target.value)} rows={4} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0f4332]" />
    ) : (
      <input value={value || ''} onChange={e => onChange(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0f4332]" />
    )}
  </label>
);

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">{children}</div>;

const UploadField: React.FC<{ label: string; value: string; onChange: (v: string) => void; name: string }> = ({ label, value, onChange, name }) => {
  const [busy, setBusy] = useState(false);
  const handleFile = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadImageToServer(file, name);
      onChange(url);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="space-y-2">
      <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</span>
      <div className="grid md:grid-cols-[1fr_auto] gap-2">
        <input value={value || ''} onChange={e => onChange(e.target.value)} placeholder="Image URL (optional)" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
        <label className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f4332] text-white px-4 py-2.5 text-xs font-bold hover:bg-[#0b3528]">
          <Upload className="w-4 h-4" /> {busy ? 'Uploading…' : 'Upload from Device'}
          <input type="file" accept="image/*" className="hidden" disabled={busy} onChange={e => handleFile(e.target.files?.[0])} />
        </label>
      </div>
      {value && <img src={value} alt="Preview" className="w-full max-w-md h-40 object-cover rounded-xl border border-slate-200" />}
    </div>
  );
};

export const WebsiteContentManager: React.FC = () => {
  const { websiteContent, updateWebsiteContent } = useApp();
  const [section, setSection] = useState<'home' | 'seasonal' | 'food'>('home');
  const [form, setForm] = useState<WebsiteContent>(websiteContent);
  const [notice, setNotice] = useState('');

  React.useEffect(() => setForm(websiteContent), [websiteContent]);

  const set = <K extends keyof WebsiteContent>(key: K, value: WebsiteContent[K]) => setForm(prev => ({ ...prev, [key]: value }));
  const save = () => {
    updateWebsiteContent(form, 'Manager');
    setNotice('Saved to the live website database.');
    window.setTimeout(() => setNotice(''), 2500);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-3xl bg-[#0f4332] p-5 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold">Website Content CMS</h2>
          <p className="text-xs text-white/75 mt-1">Simple edit forms — no JSON, no coding. Device uploads are supported.</p>
        </div>
        {notice && <div className="rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-xs font-semibold">✓ {notice}</div>}
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setSection('home')} className={`px-4 py-2.5 rounded-xl text-xs font-bold border ${section === 'home' ? 'bg-[#0f4332] text-white border-[#0f4332]' : 'bg-white border-slate-200'}`}><Sparkles className="inline w-4 h-4 mr-1" /> Home & Hero</button>
        <button onClick={() => setSection('seasonal')} className={`px-4 py-2.5 rounded-xl text-xs font-bold border ${section === 'seasonal' ? 'bg-[#0f4332] text-white border-[#0f4332]' : 'bg-white border-slate-200'}`}><CalendarDays className="inline w-4 h-4 mr-1" /> When Should You Visit Paradise?</button>
        <button onClick={() => setSection('food')} className={`px-4 py-2.5 rounded-xl text-xs font-bold border ${section === 'food' ? 'bg-[#0f4332] text-white border-[#0f4332]' : 'bg-white border-slate-200'}`}><Utensils className="inline w-4 h-4 mr-1" /> Imperial Wazwan & Culinary Heritage</button>
      </div>

      {section === 'home' && <div className="space-y-5">
        <Card>
          <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2"><ImageIcon className="w-5 h-5 text-[#b88628]" /> Main Hero — “Your Kashmir Story Starts Here”</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Hero heading" value={form.heroHeadline} onChange={v => set('heroHeadline', v)} />
            <Field label="Hero badge" value={form.heroTaglineBadge} onChange={v => set('heroTaglineBadge', v)} />
            <Field label="Hero description" value={form.heroSubheading} onChange={v => set('heroSubheading', v)} textarea />
            <UploadField label="Hero background — upload from phone/computer or use URL" value={form.heroBackgroundImage} onChange={v => set('heroBackgroundImage', v)} name="hero-background" />
          </div>
          <button onClick={save} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0f4332] px-5 py-3 text-xs font-bold text-white"><Save className="w-4 h-4" /> Save Hero</button>
        </Card>

        <Card>
          <h3 className="font-serif text-xl font-bold mb-4">Public section headings</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Curated Kashmir Itineraries" value={form.packagesSectionTitle} onChange={v => set('packagesSectionTitle', v)} />
            <Field label="Itineraries description" value={form.packagesSectionDesc} onChange={v => set('packagesSectionDesc', v)} textarea />
            <Field label="The Kashmir Experience Marketplace" value={form.experiencesSectionTitle} onChange={v => set('experiencesSectionTitle', v)} />
            <Field label="Experience description" value={form.experiencesSectionDesc} onChange={v => set('experiencesSectionDesc', v)} textarea />
            <Field label="Hotels / Chalets / Luxury Houseboats" value={form.destinationSectionTitle} onChange={v => set('destinationSectionTitle', v)} />
            <Field label="The Soul of Kashmiré Voyages" value={form.aboutTitle} onChange={v => set('aboutTitle', v)} />
            <Field label="Soul paragraph 1" value={form.aboutParagraph1} onChange={v => set('aboutParagraph1', v)} textarea />
            <Field label="Soul paragraph 2" value={form.aboutParagraph2} onChange={v => set('aboutParagraph2', v)} textarea />
            <Field label="Glimpses of Paradise" value={form.gallerySectionTitle} onChange={v => set('gallerySectionTitle', v)} />
            <Field label="Gallery description" value={form.gallerySectionDesc} onChange={v => set('gallerySectionDesc', v)} textarea />
          </div>
          <button onClick={save} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0f4332] px-5 py-3 text-xs font-bold text-white"><Save className="w-4 h-4" /> Save Website Sections</button>
        </Card>
      </div>}

      {section === 'seasonal' && <Card>
        <h3 className="font-serif text-xl font-bold mb-2">When Should You Visit Paradise?</h3>
        <p className="text-xs text-slate-500 mb-5">Edit the section text and the four seasonal images. The public page updates from these settings.</p>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Section title" value={form.seasonalSectionTitle} onChange={v => set('seasonalSectionTitle', v)} />
          <Field label="Section description" value={form.seasonalSectionDesc} onChange={v => set('seasonalSectionDesc', v)} textarea />
          <UploadField label="Winter image" value={form.seasonalWinterImage} onChange={v => set('seasonalWinterImage', v)} name="seasonal-winter" />
          <UploadField label="Spring image" value={form.seasonalSpringImage} onChange={v => set('seasonalSpringImage', v)} name="seasonal-spring" />
          <UploadField label="Summer image" value={form.seasonalSummerImage} onChange={v => set('seasonalSummerImage', v)} name="seasonal-summer" />
          <UploadField label="Autumn image" value={form.seasonalAutumnImage} onChange={v => set('seasonalAutumnImage', v)} name="seasonal-autumn" />
        </div>
        <button onClick={save} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0f4332] px-5 py-3 text-xs font-bold text-white"><Save className="w-4 h-4" /> Save Seasonal Guide</button>
      </Card>}

      {section === 'food' && <Card>
        <h3 className="font-serif text-xl font-bold mb-2">The Imperial Wazwan & Culinary Heritage</h3>
        <p className="text-xs text-slate-500 mb-5">Manage the public heading, description and culinary banner image.</p>
        <div className="space-y-4">
          <Field label="Public heading — Kashmiri Flavors & Traditional Feast" value={form.foodGuideTitle} onChange={v => set('foodGuideTitle', v)} />
          <Field label="Public description" value={form.foodGuideDesc} onChange={v => set('foodGuideDesc', v)} textarea />
          <UploadField label="Culinary heritage banner — upload from device" value={form.foodGuideBannerImage} onChange={v => set('foodGuideBannerImage', v)} name="wazwan-banner" />
        </div>
        <button onClick={save} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0f4332] px-5 py-3 text-xs font-bold text-white"><Save className="w-4 h-4" /> Save Wazwan Section</button>
      </Card>}

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 flex items-start gap-2">
        <Eye className="w-4 h-4 mt-0.5 shrink-0" /> Changes are stored in Firestore and are intended to appear across devices after the public site receives the update.
      </div>
    </div>
  );
};
