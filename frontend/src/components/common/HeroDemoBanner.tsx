import React from 'react';
import { useCareBridge } from '../../context/CareBridgeContext';
import {
  ChevronRight, RotateCcw, X
} from 'lucide-react';

const HERO_STEPS = [
  {
    step: 1,
    title: "Clinician opens patient P-1001",
    desc: "Doctor selects Ramesh Varma (Colorectal Stage II) on the oncology dashboard.",
    actionRole: "clinician",
    targetView: "dashboard"
  },
  {
    step: 2,
    title: "Doctor enters clinical instruction",
    desc: "Doctor enters technical order: 'Complete CBC and Creatinine prior to next follow-up'.",
    actionRole: "clinician",
    targetView: "dashboard"
  },
  {
    step: 3,
    title: "AI generates friendly draft & translations",
    desc: "Engine generates simplified Telugu, Hindi, and English drafts.",
    actionRole: "clinician",
    targetView: "dashboard"
  },
  {
    step: 4,
    title: "Clinician reviews & approves",
    desc: "Doctor verifies safety and clicks [Approve & Send]. Nothing reaches patient without approval.",
    actionRole: "clinician",
    targetView: "dashboard"
  },
  {
    step: 5,
    title: "Dispatched to patient in Telugu",
    desc: "Instruction sent to patient portal and caregiver SMS in primary language (Telugu).",
    actionRole: "clinician",
    targetView: "dashboard"
  },
  {
    step: 6,
    title: "Patient opens Android mobile view",
    desc: "Patient sees 'మీ తదుపరి పనులు' (Your next steps) with clear instructions.",
    actionRole: "patient",
    targetView: "patient-home"
  },
  {
    step: 7,
    title: "Patient marks: 'I\\'ve completed this'",
    desc: "Patient taps 'పూర్తయింది' (Completed) after visiting hospital lab.",
    actionRole: "patient",
    targetView: "patient-home"
  },
  {
    step: 8,
    title: "Dashboard updates: Pending → Completed",
    desc: "Doctor dashboard instantly updates status chip to green Completed.",
    actionRole: "clinician",
    targetView: "dashboard"
  },
  {
    step: 9,
    title: "Immutable audit log records action",
    desc: "Full forensic timestamp, actor, role, and action logged to audit trail.",
    actionRole: "clinician",
    targetView: "audit"
  },
  {
    step: 10,
    title: "Impact dashboard updates KPI",
    desc: "Live Follow-up Completion Rate reflects verified closure (72% → 82%).",
    actionRole: "clinician",
    targetView: "impact"
  },
];

export const HeroDemoBanner: React.FC = () => {
  const {
    heroDemoStep,
    setHeroDemoStep,
    advanceHeroDemo,
    resetToHeroState
  } = useCareBridge();

  if (heroDemoStep === 0) return null;

  const currentStepObj = HERO_STEPS[heroDemoStep - 1] || HERO_STEPS[0];

  return (
    <aside aria-label="Hero Demo Walkthrough Guide" className="bg-[#1C2B27] text-stone-200 border-b border-stone-700/60 px-4 py-2.5 shadow-soft">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Step indicator */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs shadow-soft">
            {heroDemoStep}
          </div>
          <div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="font-bold text-amber-300 uppercase tracking-wider">
                Interactive Walkthrough: Step {heroDemoStep} of 10
              </span>
              <span className="text-stone-500">•</span>
              <span className="text-stone-300">
                {currentStepObj.actionRole === 'clinician' ? "Doctor View" : "Patient View"}
              </span>
            </div>
            <h4 className="text-xs font-bold text-white mt-0.5">
              {currentStepObj.title}
            </h4>
            <p className="text-[11px] text-stone-300 line-clamp-1">
              {currentStepObj.desc}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={resetToHeroState}
            className="px-2 py-1 text-xs text-stone-400 hover:text-white flex items-center gap-1 transition"
            title="Reset demo data to initial state"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>

          <button
            onClick={advanceHeroDemo}
            className="bg-emerald-700 hover:bg-emerald-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-soft transition active:scale-95"
          >
            <span>Advance Step {heroDemoStep < 10 ? heroDemoStep + 1 : "Done"}</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>

          <button
            onClick={() => setHeroDemoStep(0)}
            className="text-stone-400 hover:text-stone-200 p-1 transition"
            title="Dismiss walkthrough"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Discrete Progress Timeline */}
      <div className="max-w-7xl mx-auto mt-2 grid grid-cols-10 gap-1.5">
        {HERO_STEPS.map((s) => (
          <div
            key={s.step}
            onClick={() => setHeroDemoStep(s.step)}
            className={`h-1 rounded-full cursor-pointer transition ${
              s.step < heroDemoStep
                ? 'bg-emerald-500'
                : s.step === heroDemoStep
                ? 'bg-amber-400 ring-2 ring-amber-400/30'
                : 'bg-stone-700 hover:bg-stone-600'
            }`}
            title={`Step ${s.step}: ${s.title}`}
          />
        ))}
      </div>
    </aside>
  );
};
