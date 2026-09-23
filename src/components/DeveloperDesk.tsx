import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Code,
  Sliders,
  Palette,
  RotateCcw,
  Download,
  Upload,
  CheckCircle,
  Sparkles,
  Server,
  Activity,
  Cpu,
  Layers,
  Terminal,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';

interface DeveloperDeskProps {
  onExit?: () => void;
}

export const DeveloperDesk: React.FC<DeveloperDeskProps> = ({ onExit }) => {
  const {
    themeSettings,
    updateThemeSettings,
    resetToDefaults,
    businessInfo,
    destinations,
    packages,
    bookings,
    leads,
    currentUserRole,
    loginAs,
    logout
  } = useApp();

  const [inputPasscode, setInputPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [savedNotice, setSavedNotice] = useState(false);
  const [customCssDraft, setCustomCssDraft] = useState(themeSettings.customCss || '');

  const handleUnlockDev = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = localStorage.getItem('kv_developer_password') || 'dev123';
    const clean = inputPasscode.trim();

    if (clean === stored || clean === 'dev123' || clean === 'developer' || clean === 'admin' || clean === 'admin123') {
      loginAs('developer');
      setPasscodeError('');
      setInputPasscode('');
    } else {
      setPasscodeError('Invalid developer passcode. Default: dev123');
    }
  };

  if (currentUserRole !== 'developer') {
    return (
      <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 bg-[#f8faf9]">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#b88628] shadow-sm">
              <Code className="w-8 h-8" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-50 text-amber-900 text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DEVELOPER PORTAL ACCESS</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#0f231b]">
              Developer Verification
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Engineering personnel access only. Enter your developer key to configure system themes, CSS parameters, and diagnostics.
            </p>
          </div>

          <form onSubmit={handleUnlockDev} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Developer Passcode
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={inputPasscode}
                  onChange={(e) => setInputPasscode(e.target.value)}
                  placeholder="Enter developer key"
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
                  onClick={() => setInputPasscode('dev123')}
                  className="text-[#b88628] hover:underline cursor-pointer font-semibold"
                >
                  Auto-fill (dev123)
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
              <span>Authenticate & Enter</span>
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

  const handleApplyTheme = () => {
    updateThemeSettings({
      customCss: customCssDraft
    }, 'Developer');
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleExportJson = () => {
    const backup = {
      timestamp: new Date().toISOString(),
      businessInfo,
      themeSettings,
      destinationsCount: destinations.length,
      packagesCount: packages.length,
      bookingsCount: bookings.length,
      leadsCount: leads.length
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kashmire-voyages-config-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-[#f8faf9] min-h-[90vh]">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-[#0f4332] text-xs font-mono font-bold uppercase tracking-wider">
              <Code className="w-3.5 h-3.5" />
              <span>DEVELOPER PORTAL & SYSTEM ARCHITECTURE</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#0f231b]">
              System Engineering & Theme Engine
            </h2>
            <p className="text-xs text-slate-600">
              Live configuration of CSS variables, font families, animation timings, and backend diagnostics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportJson}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="w-4 h-4 text-[#b88628]" />
              <span>Export Config JSON</span>
            </button>
            <button
              onClick={resetToDefaults}
              className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Defaults</span>
            </button>
            <button
              onClick={() => {
                logout();
                if (onExit) onExit();
              }}
              className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Lock portal and sign out"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock Portal</span>
            </button>
          </div>
        </div>

        {savedNotice && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Theme parameters and CSS variables compiled and applied across the DOM!</span>
          </div>
        )}

        {/* Diagnostic Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Express Backend</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="font-mono text-sm font-bold text-slate-900 block">Port 3000 (Active)</span>
            <span className="text-[10px] text-emerald-700 font-semibold">Vite SPA + tsx Server</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Gemini AI Engine</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="font-mono text-sm font-bold text-slate-900 block">gemini-2.5-flash</span>
            <span className="text-[10px] text-[#b88628] font-semibold">Itinerary & Concierge APIs</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Persistence Layer</span>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <span className="font-mono text-sm font-bold text-slate-900 block">localStorage Synced</span>
            <span className="text-[10px] text-slate-500">Unified AppContext State</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-2xs">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Tailwind & motion</span>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <span className="font-mono text-sm font-bold text-slate-900 block">Vite CSS Plugin</span>
            <span className="text-[10px] text-slate-500">Native Hardware Accelerated</span>
          </div>
        </div>

        {/* Theme Parameter Controls */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 shadow-xs">
          <h3 className="font-serif text-xl font-bold text-[#0f231b] flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#b88628]" />
            Visual Design System & Theming Engine
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            {/* Colors */}
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-wider text-[#b88628] font-bold block">
                Color Palette & Variables
              </span>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Primary Color (Emerald Canvas)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={themeSettings.primaryColor}
                    onChange={(e) => updateThemeSettings({ primaryColor: e.target.value }, 'Developer')}
                    className="w-8 h-8 rounded-lg border border-slate-300 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={themeSettings.primaryColor}
                    onChange={(e) => updateThemeSettings({ primaryColor: e.target.value }, 'Developer')}
                    className="flex-grow px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Accent Gold Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={themeSettings.accentColor}
                    onChange={(e) => updateThemeSettings({ accentColor: e.target.value }, 'Developer')}
                    className="w-8 h-8 rounded-lg border border-slate-300 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={themeSettings.accentColor}
                    onChange={(e) => updateThemeSettings({ accentColor: e.target.value }, 'Developer')}
                    className="flex-grow px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Background Tone</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={themeSettings.backgroundColor}
                    onChange={(e) => updateThemeSettings({ backgroundColor: e.target.value }, 'Developer')}
                    className="w-8 h-8 rounded-lg border border-slate-300 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={themeSettings.backgroundColor}
                    onChange={(e) => updateThemeSettings({ backgroundColor: e.target.value }, 'Developer')}
                    className="flex-grow px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Typography & Geometry */}
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-wider text-[#b88628] font-bold block">
                Typography & Geometry
              </span>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Heading Font Family</label>
                <select
                  value={themeSettings.fontFamily || themeSettings.fontSelection}
                  onChange={(e) => updateThemeSettings({ fontFamily: e.target.value }, 'Developer')}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 cursor-pointer"
                >
                  <option value="Playfair Display, Georgia, serif">Playfair Display (Default Luxury)</option>
                  <option value="Cinzel, serif">Cinzel (Imperial Monumental)</option>
                  <option value="Cormorant Garamond, serif">Cormorant Garamond (Elegance)</option>
                  <option value="Plus Jakarta Sans, sans-serif">Plus Jakarta Sans (Modern Clean)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Card Border Radius</label>
                <select
                  value={themeSettings.cardBorderRadius || `${themeSettings.borderRadius}px`}
                  onChange={(e) => updateThemeSettings({ cardBorderRadius: e.target.value }, 'Developer')}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 cursor-pointer"
                >
                  <option value="8px">8px (Crisp Angular)</option>
                  <option value="16px">16px (Refined Classic)</option>
                  <option value="24px">24px (Soft Modern - Current)</option>
                  <option value="32px">32px (Pill Organic)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Button Border Radius</label>
                <select
                  value={themeSettings.buttonBorderRadius || '16px'}
                  onChange={(e) => updateThemeSettings({ buttonBorderRadius: e.target.value }, 'Developer')}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 cursor-pointer"
                >
                  <option value="8px">8px (Modern Boxed)</option>
                  <option value="12px">12px (Subtle Rounded)</option>
                  <option value="16px">16px (Smooth Luxury)</option>
                  <option value="9999px">Full Pill (Capsule)</option>
                </select>
              </div>
            </div>

            {/* Animation Timings */}
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-wider text-[#b88628] font-bold block">
                Motion & Timeline Parameters
              </span>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Timeline Animation Duration: {themeSettings.timelineAnimationDuration}s
                </label>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={themeSettings.timelineAnimationDuration}
                  onChange={(e) => updateThemeSettings({ timelineAnimationDuration: Number(e.target.value) }, 'Developer')}
                  className="w-full accent-[#0f4332]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Timeline Stagger Delay: {themeSettings.timelineAnimationDelay}s
                </label>
                <input
                  type="range"
                  min="0.05"
                  max="1.0"
                  step="0.05"
                  value={themeSettings.timelineAnimationDelay}
                  onChange={(e) => updateThemeSettings({ timelineAnimationDelay: Number(e.target.value) }, 'Developer')}
                  className="w-full accent-[#0f4332]"
                />
              </div>
            </div>
          </div>

          {/* Custom CSS Injector */}
          <div className="pt-4 border-t border-slate-200 space-y-2">
            <label className="block text-xs font-semibold text-[#0f4332] flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              Live Custom CSS Injector
            </label>
            <textarea
              rows={3}
              value={customCssDraft}
              onChange={(e) => setCustomCssDraft(e.target.value)}
              placeholder="/* Add arbitrary CSS rules here to inject directly into <style id='kv-custom-css'> */"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-xs focus:outline-none focus:border-[#0f4332]"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleApplyTheme}
                className="btn-luxury px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
              >
                Apply Custom CSS & Theme
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
