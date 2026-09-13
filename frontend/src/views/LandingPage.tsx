import React from 'react';
import { useCareBridge } from '../context/CareBridgeContext';
import {
  Sparkles, CheckCircle2, Globe, HeartHandshake, Stethoscope,
  ArrowRight, ShieldCheck, Activity, Smartphone,
  FileText, Check, Compass, HeartPulse
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const {
    setCurrentView,
    setCurrentRole,
    setDeviceMode,
    setHeroDemoStep,
    t
  } = useCareBridge();

  const handleStartHeroDemo = () => {
    setHeroDemoStep(1);
    setCurrentRole('clinician');
    setCurrentView('dashboard');
  };

  const handleStartPatientDemo = () => {
    setCurrentRole('patient');
    setDeviceMode('mobile_frame');
    setCurrentView('patient-home');
  };

  return (
    <div className="bg-[#F8F6F1] text-stone-900 min-h-screen space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-14 pb-20 px-4 sm:px-6 lg:px-8 border-b border-stone-200/90 bg-white">
        {/* Soft background warm gradient blur */}
        <div className="absolute top-0 right-1/4 w-[420px] h-[420px] bg-emerald-50/70 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold tracking-wide shadow-soft">
            <Activity className="w-4 h-4 text-emerald-700" />
            <span>CareBridge NCG • Longitudinal Cancer Follow-up Closure</span>
          </div>

          {/* Refined Serif Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.12]">
            Make every cancer-care <br className="hidden sm:inline" />
            <span className="text-emerald-800">
              follow-up count.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed font-normal">
            CareBridge NCG bridges the communication gap between oncologist discharge slips and patient homes—converting complex orders into 11 Indian languages, zero-friction caregiver cards, and tracked actions that prevent treatment drop-out.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setCurrentRole('clinician');
                setCurrentView('dashboard');
              }}
              className="w-full sm:w-auto py-3 px-6 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-soft transition flex items-center justify-center gap-2 active:scale-95"
            >
              <Stethoscope className="w-4 h-4" />
              <span>{t.tryClinicianDemo}</span>
            </button>

            <button
              onClick={handleStartPatientDemo}
              className="w-full sm:w-auto py-3 px-6 bg-[#FAF8F5] hover:bg-stone-100 text-stone-800 border border-stone-300 font-bold rounded-2xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-soft"
            >
              <Smartphone className="w-4 h-4 text-emerald-800" />
              <span>{t.tryPatientExp} (Mobile View)</span>
            </button>

            <button
              onClick={handleStartHeroDemo}
              className="w-full sm:w-auto py-3 px-6 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-soft transition flex items-center justify-center gap-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Interactive 10-Step Walkthrough</span>
            </button>
          </div>

          {/* Assistive Boundary Badge */}
          <div className="pt-3 flex items-center justify-center gap-2 text-xs font-semibold text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Assistive. Human-Approved by Treating Oncologists. Non-Diagnostic.</span>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-1">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
            Care Delivery Framework
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Simplify • Localize • Navigate • Close the Loop
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Card 1: Jargon Simplification */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-card hover:border-emerald-700/40 transition space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Clear Actions
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Technical terms like “CBC with diff prior to C3D1” are converted into 4 simple questions: What, Why, Where, and When.
            </p>
            <div className="pt-2 text-[11px] font-bold text-emerald-800 flex items-center gap-1">
              <span>Oncologist Verified</span>
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </div>

          {/* Card 2: 11 Indian Languages */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-card hover:border-emerald-700/40 transition space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Pan-Indian Reach
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Full native script localization in Hindi, Telugu, Tamil, Kannada, Bengali, Malayalam, Marathi, Gujarati, Punjabi, and Odia.
            </p>
            <div className="pt-2 text-[11px] font-bold text-emerald-800 flex items-center gap-1">
              <span>11 Languages</span>
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </div>

          {/* Card 3: Longitudinal Journey */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-card hover:border-emerald-700/40 transition space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Journey Roadmap
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Tracks 7 key milestones from Diagnosis to Treatment Cycles and Survivorship, paired with daily 7-day symptom tracking.
            </p>
            <div className="pt-2 text-[11px] font-bold text-emerald-800 flex items-center gap-1">
              <span>Longitudinal Engine</span>
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </div>

          {/* Card 4: Loop Closure */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-card hover:border-emerald-700/40 transition space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Follow-Up Closure
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Hospital coordinators monitor an active queue of at-risk patients who haven't completed pre-chemo steps, preventing drop-outs.
            </p>
            <div className="pt-2 text-[11px] font-bold text-emerald-800 flex items-center gap-1">
              <span>Verified Closure</span>
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </div>
        </div>
      </section>

      {/* Guiding Principle Card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C2B27] rounded-3xl p-8 sm:p-10 text-white shadow-soft border border-stone-700/50 space-y-4 text-center sm:text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-500/30 inline-block">
            National Cancer Grid Philosophy
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug">
            “We don't tell clinicians what care to provide. We make sure the care they have already decided on doesn't get lost between the clinic, patient, and family caregiver.”
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
            CareBridge NCG is assistive, not diagnostic. It does not diagnose cancer, interpret scans, or calculate speculative risk scores. It resolves the severe logistical breakdown between hospital discharge slips and treatment completion.
          </p>
        </div>
      </section>
    </div>
  );
};
