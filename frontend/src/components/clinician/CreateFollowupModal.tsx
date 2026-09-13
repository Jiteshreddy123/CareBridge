import React, { useState } from 'react';
import { useCareBridge } from '../../context/CareBridgeContext';
import {
  X, Sparkles, Send, CheckCircle2, AlertTriangle, ShieldCheck,
  FileText, Globe, Check
} from 'lucide-react';
import { AIInstructionDraft, TaskCategory } from '../../types';

interface CreateFollowupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TEMPLATES = [
  {
    title: "Pre-Chemo CBC & Creatinine",
    instruction: "Complete CBC and Serum Creatinine prior to Cycle 3 follow-up on 18 Sept.",
    category: "Blood Test" as TaskCategory,
    dueDate: "18 September 2026"
  },
  {
    title: "Restaging CECT Scan",
    instruction: "Obtain contrast-enhanced CT thorax-abdomen-pelvis with 4 hours fasting before review.",
    category: "Imaging / Scan" as TaskCategory,
    dueDate: "22 September 2026"
  },
  {
    title: "Weekly RT Skin Review",
    instruction: "Visit radiation OPD for weekly skin assessment, maintain oral hydration 2L/day.",
    category: "Radiation Check" as TaskCategory,
    dueDate: "15 September 2026"
  },
  {
    title: "Surgical Stoma Check",
    instruction: "Visit surgical nursing station for stoma appliance inspection and bag change counsel.",
    category: "Wound & Stoma Care" as TaskCategory,
    dueDate: "20 September 2026"
  }
];

export const CreateFollowupModal: React.FC<CreateFollowupModalProps> = ({ isOpen, onClose }) => {
  const {
    selectedPatient,
    simplifyInstruction,
    createTask,
    setCurrentView,
    setHeroDemoStep,
    heroDemoStep
  } = useCareBridge();

  const [clinicalText, setClinicalText] = useState<string>("Complete CBC and Serum Creatinine prior to Cycle 3 follow-up on 18 Sept.");
  const [dueDate, setDueDate] = useState<string>("18 September 2026");
  const [category, setCategory] = useState<TaskCategory>("Blood Test");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [aiDraft, setAiDraft] = useState<AIInstructionDraft | null>(null);

  // Editable draft states
  const [editEn, setEditEn] = useState<string>('');
  const [editTe, setEditTe] = useState<string>('');
  const [editHi, setEditHi] = useState<string>('');

  if (!isOpen) return null;

  const handleGenerateDraft = async () => {
    if (!clinicalText.trim()) return;
    setIsGenerating(true);
    const draft = await simplifyInstruction(clinicalText, dueDate);
    setAiDraft(draft);
    setEditEn(draft.simplified_en);
    setEditTe(draft.translated_te);
    setEditHi(draft.translated_hi);
    setIsGenerating(false);

    if (heroDemoStep === 2) {
      setHeroDemoStep(3);
    }
  };

  const handleApplyTemplate = (tmpl: typeof TEMPLATES[0]) => {
    setClinicalText(tmpl.instruction);
    setCategory(tmpl.category);
    setDueDate(tmpl.dueDate);
    setAiDraft(null);
  };

  const handleApproveAndSend = async () => {
    if (!aiDraft) return;

    await createTask({
      title: clinicalText.slice(0, 45) + (clinicalText.length > 45 ? '...' : ''),
      category,
      department: selectedPatient.department,
      due_date: dueDate,
      clinical_instruction: clinicalText,
      simplified_instruction: {
        en: editEn || aiDraft.simplified_en,
        te: editTe || aiDraft.translated_te,
        hi: editHi || aiDraft.translated_hi,
      },
      why_explanation: {
        en: aiDraft.why_en,
        te: aiDraft.why_te,
        hi: aiDraft.why_hi,
      },
      what_to_do: {
        en: aiDraft.what_en,
        te: aiDraft.what_te,
        hi: aiDraft.what_hi,
      },
      where_location: {
        en: aiDraft.suggested_location,
        te: "ఆసుపత్రి ప్రధాన ప్రయోగశాల, గ్రౌండ్ ఫ్లోర్",
        hi: "अस्पताल सेंट्रल लैब, ग्राउंड फ्लोर",
      },
      approvedImmediately: true,
      is_urgent: true,
    });

    if (heroDemoStep === 3 || heroDemoStep === 4) {
      setHeroDemoStep(5);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-3xl rounded-3xl p-6 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                Clinician Entry
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-700 font-semibold">
                Patient: {selectedPatient.name} ({selectedPatient.id})
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
              Create Follow-Up Care Instruction
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Clinical Templates */}
        <div className="my-4">
          <label className="block text-xs font-semibold text-slate-600 mb-2">
            Quick Oncology Templates:
          </label>
          <div className="flex flex-wrap gap-2">
            {TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.title}
                type="button"
                onClick={() => handleApplyTemplate(tmpl)}
                className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 text-slate-700 transition flex items-center gap-1.5"
              >
                <span>{tmpl.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Clinician Next Step Instruction:
            </label>
            <textarea
              rows={3}
              value={clinicalText}
              onChange={(e) => {
                setClinicalText(e.target.value);
                setAiDraft(null);
              }}
              placeholder="e.g. Complete hematological investigation prior to cycle 3 follow-up on 18 Sept."
              className="w-full text-sm p-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none font-mono text-slate-800"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Enter professional clinical instructions as you normally do. The assistive AI will simplify and translate it for patient clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Care Category:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
              >
                <option value="Blood Test">Blood Test (CBC, LFT, KFT)</option>
                <option value="Imaging / Scan">Imaging / Scan (CT, PET-CT, MRI)</option>
                <option value="Chemotherapy Review">Chemotherapy Review</option>
                <option value="Radiation Check">Radiation Check</option>
                <option value="Wound & Stoma Care">Wound & Stoma Care</option>
                <option value="Doctor Consultation">Doctor Consultation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Due Date:
              </label>
              <input
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="e.g. 18 September 2026"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>

          {/* AI Simplification trigger */}
          {!aiDraft && (
            <div className="pt-2">
              <button
                type="button"
                onClick={handleGenerateDraft}
                disabled={isGenerating || !clinicalText.trim()}
                className="w-full py-3 bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-600 hover:to-teal-500 text-white font-bold rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{isGenerating ? "Simplifying & Translating..." : "Generate Patient-Friendly Draft (English, Telugu, Hindi)"}</span>
              </button>
            </div>
          )}
        </div>

        {/* AI DRAFT REVIEW SECTION (Mandatory Human Signoff) */}
        {aiDraft && (
          <div className="mt-6 pt-5 border-t border-slate-200 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-bold bg-amber-100 text-amber-900 rounded-lg border border-amber-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  AI DRAFT — Human Clinician Review Required
                </span>
              </div>
              <span className="text-xs text-slate-500">
                Patient Language: <strong className="text-teal-700 uppercase">{selectedPatient.preferred_language}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* English */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-teal-600" />
                    English (Simplified)
                  </span>
                  <span className="text-[10px] text-slate-500">Patient-friendly</span>
                </div>
                <textarea
                  rows={3}
                  value={editEn}
                  onChange={(e) => setEditEn(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-slate-200 bg-white text-slate-800"
                />
              </div>

              {/* Telugu */}
              <div className="p-3.5 bg-teal-50/50 rounded-2xl border border-teal-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-teal-900">
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-teal-600" />
                    తెలుగు (Telugu)
                  </span>
                  <span className="text-[10px] text-teal-700 font-bold">Primary Match</span>
                </div>
                <textarea
                  rows={3}
                  value={editTe}
                  onChange={(e) => setEditTe(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-teal-300 bg-white text-slate-900 font-telugu"
                />
              </div>

              {/* Hindi */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-teal-600" />
                    हिन्दी (Hindi)
                  </span>
                  <span className="text-[10px] text-slate-500">Standard</span>
                </div>
                <textarea
                  rows={3}
                  value={editHi}
                  onChange={(e) => setEditHi(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-slate-200 bg-white text-slate-900 font-hindi"
                />
              </div>
            </div>

            {/* Why & Where info preview */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div>
                <strong className="text-slate-900 block mb-0.5">Why this instruction exists:</strong>
                <p className="text-slate-600">{aiDraft.why_en}</p>
              </div>
              <div>
                <strong className="text-slate-900 block mb-0.5">Hospital Location:</strong>
                <p className="text-slate-600">{aiDraft.suggested_location}</p>
              </div>
            </div>

            {/* Mandatory Approval Buttons */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setAiDraft(null)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"
              >
                Reject / Re-draft
              </button>

              <button
                type="button"
                onClick={handleApproveAndSend}
                className="py-2.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center gap-2 active:scale-98"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Approve & Send to Patient ({selectedPatient.name})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
