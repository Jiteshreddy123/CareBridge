import React from 'react';
import { ShieldCheck, Lock, EyeOff, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Privacy Policy & Clinical Safeguards
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational boundary disclosures and data governance framework for CareBridge NCG.
          </p>
        </div>
      </div>

      {/* Synthetic Data Alert */}
      <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
          Hackathon / Pilot Demonstration Prototype
        </span>
        <h3 className="font-extrabold text-sm text-amber-950">
          100% Synthetic & De-Identified Cohort
        </h3>
        <p className="text-xs text-amber-900 leading-relaxed">
          All patient names, hospital numbers (MRNs), caregiver contacts, and appointment schedules demonstrated in this prototype are entirely synthetic and fictitious. No protected health information (PHI) or personally identifiable information (PII) from real patients is used or stored.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        <div className="space-y-3">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-teal-600" />
            <span>Assistive Workflow Boundary (Non-Diagnostic)</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            CareBridge NCG operates strictly as an assistive care-instruction closure utility. The system:
          </p>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
            <li>Does <strong>not</strong> diagnose cancer or interpret radiological/pathological studies.</li>
            <li>Does <strong>not</strong> recommend cancer treatments or prescribe medications.</li>
            <li>Does <strong>not</strong> calculate black-box clinical risk scores or replace clinical judgement.</li>
            <li>Does <strong>not</strong> dispatch any AI-simplified or translated instruction to patients without prior human clinician approval.</li>
          </ul>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-teal-600" />
            <span>Role-Based Access & Caregiver Consent</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Caregiver access requires explicit authorization from the patient or designated care coordinator (e.g. Consent ID CG-8891). Caregivers receive view-only access to follow-up tasks and reminder triggers without exposure to confidential billing or non-care records.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-600" />
            <span>Audit Trail Immutability</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every clinical instruction creation, AI drafting event, doctor approval, multilingual dispatch, patient view, and task completion is logged with a forensic timestamp in an append-only audit trail accessible to authorized hospital quality and governance staff.
          </p>
        </div>
      </div>
    </div>
  );
};
