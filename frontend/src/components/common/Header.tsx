import React from 'react';
import { useCareBridge } from '../../context/CareBridgeContext';
import { UserRole } from '../../types';
import { LanguageDropdown } from './LanguageDropdown';
import {
  Stethoscope, User, HeartHandshake, Smartphone, Monitor,
  Sparkles, Activity
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    currentView,
    setCurrentView,
    deviceMode,
    setDeviceMode,
    heroDemoStep,
    setHeroDemoStep,
    metrics
  } = useCareBridge();

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'clinician') {
      setCurrentView('dashboard');
      setDeviceMode('desktop');
    } else if (role === 'patient') {
      setCurrentView('patient-home');
      setDeviceMode('mobile_frame');
    } else if (role === 'caregiver') {
      setCurrentView('caregiver');
      setDeviceMode('desktop');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F6F1]/95 backdrop-blur border-b border-stone-200/90 shadow-soft">
      {/* Top micro-bar: Minimalist, clinical reassurance */}
      <div className="bg-[#1C2B27] text-stone-300 text-xs px-4 sm:px-6 py-1.5 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="inline-flex items-center px-2 py-0.2 rounded text-[9.5px] font-bold uppercase tracking-wider bg-emerald-900/60 text-emerald-300 border border-emerald-700/40">
            NCG Platform
          </span>
          <span className="text-stone-300">
            Assistive Oncology Follow-up & Care-Instruction Closure
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="hidden md:inline text-stone-400">
            Closure KPI: <strong className="text-emerald-400 font-semibold">{metrics.pilot_rate}%</strong> (Baseline: {metrics.baseline_rate}%)
          </span>
          <button
            onClick={() => setHeroDemoStep(heroDemoStep > 0 ? 0 : 1)}
            className="inline-flex items-center gap-1 bg-emerald-800 hover:bg-emerald-700 text-stone-100 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>{heroDemoStep > 0 ? `Demo Step ${heroDemoStep}/10` : "10-Step Interactive Demo"}</span>
          </button>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand identity: Editorial, calm medical design */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setCurrentView('landing')}
        >
          <div className="w-10 h-10 rounded-2xl bg-[#1C4A40] text-white flex items-center justify-center shadow-soft group-hover:bg-[#153831] transition">
            <Activity className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-serif font-bold tracking-tight text-stone-900">
                CareBridge <span className="text-emerald-800 font-sans font-extrabold text-base">NCG</span>
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200/80">
                Cancer Care
              </span>
            </div>
            <p className="text-[11px] text-stone-500 hidden sm:block">
              Multilingual Care-Instruction & Follow-up Closure
            </p>
          </div>
        </div>

        {/* Clinician Navigation Tabs */}
        {currentRole === 'clinician' && (
          <nav className="hidden lg:flex items-center space-x-1 text-xs font-semibold">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'patients', label: 'Patient Roster' },
              { id: 'queue', label: 'Closure Queue', badge: metrics.open_help_requests_count },
              { id: 'help-requests', label: 'Assistance Requests' },
              { id: 'impact', label: 'Impact & Pilot' },
              { id: 'audit', label: 'Audit Trail' },
            ].map((tab) => {
              const isActive = currentView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentView(tab.id)}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-emerald-900 font-bold shadow-soft border border-stone-200'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100/60'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="px-1.5 py-0.2 text-[9px] bg-rose-100 text-rose-800 rounded-full font-bold">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        )}

        {/* Right Tools: Pan-Indian Language Dropdown & Posh Role Pills */}
        <div className="flex items-center gap-3">
          {/* Pan-Indian Language Dropdown */}
          <LanguageDropdown />

          {/* Role Pill Switcher */}
          <div className="flex items-center bg-white rounded-xl p-0.5 border border-stone-200 shadow-soft text-xs">
            <button
              onClick={() => handleRoleChange('clinician')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition ${
                currentRole === 'clinician'
                  ? 'bg-emerald-800 text-white shadow-soft'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Clinician / Oncology Care Team"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Doctor</span>
            </button>
            <button
              onClick={() => handleRoleChange('patient')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition ${
                currentRole === 'patient'
                  ? 'bg-emerald-800 text-white shadow-soft'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Patient Digital Follow-up Pass"
            >
              <User className="w-3.5 h-3.5" />
              <span>Patient</span>
            </button>
            <button
              onClick={() => handleRoleChange('caregiver')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition ${
                currentRole === 'caregiver'
                  ? 'bg-emerald-800 text-white shadow-soft'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Family Caregiver Mode"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Caregiver</span>
            </button>
          </div>

          {/* Viewport Frame Toggle for Patient Pass */}
          {currentRole === 'patient' && (
            <div className="hidden md:flex items-center bg-white rounded-xl p-0.5 border border-stone-200 shadow-soft">
              <button
                onClick={() => setDeviceMode('mobile_frame')}
                className={`p-1.5 rounded-lg transition ${
                  deviceMode === 'mobile_frame'
                    ? 'bg-stone-100 text-emerald-900 font-bold'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
                title="Phone Frame Preview"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`p-1.5 rounded-lg transition ${
                  deviceMode === 'desktop'
                    ? 'bg-stone-100 text-emerald-900 font-bold'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
                title="Expanded Desktop Mode"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
