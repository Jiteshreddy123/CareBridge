import React, { useState } from 'react';
import { useCareBridge } from '../../context/CareBridgeContext';
import {
  X, UploadCloud, FileText, Image as ImageIcon, FileSpreadsheet,
  CheckCircle2, Sparkles, ShieldCheck, Check, Trash2, ArrowRight
} from 'lucide-react';
import { TaskCategory } from '../../types';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_DOCS = [
  {
    id: "discharge_summary",
    title: "Post-Chemo Cycle 2 Discharge Order (PDF)",
    dept: "Medical Oncology",
    icon: FileText
  },
  {
    id: "radiology_requisition",
    title: "Restaging CECT Requisition Slip (Scanned Image)",
    dept: "Radiology & Imaging",
    icon: ImageIcon
  },
  {
    id: "radiation_prescription",
    title: "Radiation Toxicity Review Sheet (CSV Import)",
    dept: "Radiation Oncology",
    icon: FileSpreadsheet
  }
];

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({ isOpen, onClose }) => {
  const { selectedPatient, createTask } = useCareBridge();
  const [selectedDocType, setSelectedDocType] = useState<string>("discharge_summary");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [extractedItems, setExtractedItems] = useState<any[] | null>(null);

  if (!isOpen) return null;

  const handleSimulateExtraction = async () => {
    setIsProcessing(true);
    // Simulate OCR & AI parser extraction
    setTimeout(() => {
      if (selectedDocType === 'discharge_summary') {
        setExtractedItems([
          {
            id: "EXT-1",
            title: "Complete CBC and Serum Creatinine",
            category: "Blood Test" as TaskCategory,
            due_date: "18 September 2026",
            clinical_text: "Patient advised to report for CBC and Serum Creatinine 48 hours prior to Cycle 3 follow-up.",
            simplified_en: "Please get your blood test (CBC & Kidney function) done before your next doctor visit on 18 September.",
            translated_te: "దయచేసి సెప్టెంబర్ 18న మీ తదుపరి డాక్టర్ సందర్శనకు ముందు రక్త పరీక్ష చేయించుకోండి.",
            translated_hi: "कृपया 18 सितंबर को अपनी अगली डॉक्टर मुलाकात से पहले रक्त परीक्षण करवाएं।",
            confidence: "94% Confidence"
          },
          {
            id: "EXT-2",
            title: "Review with Medical Oncologist in OPD",
            category: "Doctor Consultation" as TaskCategory,
            due_date: "20 September 2026",
            clinical_text: "Follow-up in Daycare OPD Room 12 with fresh CBC results for cycle assessment.",
            simplified_en: "Visit Dr. Rao at Daycare OPD Room 12 with your fresh blood test report.",
            translated_te: "మీ తాజా రక్త పరీక్ష నివేదికతో డేకేర్ ఓపీడీ రూమ్ 12లో డాక్టర్ రావు గారిని కలవండి.",
            translated_hi: "अपनी ताजा रक्त जांच रिपोर्ट के साथ डेकेयर ओपीडी रूम 12 में डॉ. राव से मिलें।",
            confidence: "91% Confidence"
          }
        ]);
      } else if (selectedDocType === 'radiology_requisition') {
        setExtractedItems([
          {
            id: "EXT-3",
            title: "Contrast-Enhanced CT Abdomen & Pelvis",
            category: "Imaging / Scan" as TaskCategory,
            due_date: "22 September 2026",
            clinical_text: "Schedule CECT abdomen-pelvis with 4 hr fasting and eGFR report prior to review.",
            simplified_en: "Complete your CT scan of abdomen & pelvis. Maintain 4 hours fasting before scan.",
            translated_te: "కడుపు మరియు పెల్విస్ సిటి స్కాన్ పూర్తి చేయండి. స్కాన్‌కు ముందు 4 గంటల ఉపవాసం పాటించండి.",
            translated_hi: "पेट और पेल्विस का सीटी स्कैन करवाएं। स्कैन से पहले 4 घंटे भूखे पेट रहें।",
            confidence: "96% Confidence"
          }
        ]);
      } else {
        setExtractedItems([
          {
            id: "EXT-4",
            title: "Weekly RT Skin Assessment & Hydration Check",
            category: "Radiation Check" as TaskCategory,
            due_date: "15 September 2026",
            clinical_text: "Weekly RT review for radiation dermatitis check. Emphasize oral hydration protocol.",
            simplified_en: "Visit Radiation OPD for skin check. Drink at least 2 liters of water daily.",
            translated_te: "చర్మ తనిఖీ కోసం రేడియేషన్ ఓపీడీకి రండి. ప్రతిరోజూ కనీసం 2 లీటర్ల నీరు త్రాగండి.",
            translated_hi: "त्वचा की जांच के लिए रेडिएशन ओपीडी आएं। रोजाना कम से कम 2 लीटर पानी पिएं।",
            confidence: "88% Confidence"
          }
        ]);
      }
      setIsProcessing(false);
    }, 700);
  };

  const handleApproveItem = async (item: any) => {
    await createTask({
      title: item.title,
      category: item.category,
      department: selectedPatient.department,
      due_date: item.due_date,
      clinical_instruction: item.clinical_text,
      simplified_instruction: {
        en: item.simplified_en,
        te: item.translated_te,
        hi: item.translated_hi
      },
      why_explanation: {
        en: "Extracted from clinical document and approved by oncologist.",
        te: "క్లినికల్ డాక్యుమెంట్ నుండి గ్రహించి వైద్యులు ఆమోదించారు.",
        hi: "दस्तावेज़ से निकाला गया और डॉक्टर द्वारा अनुमोदित किया गया।"
      },
      what_to_do: {
        en: item.simplified_en,
        te: item.translated_te,
        hi: item.translated_hi
      },
      where_location: {
        en: "NCG Partner Hospital",
        te: "ఆసుపత్రి విభాగం",
        hi: "अस्पताल विभाग"
      },
      approvedImmediately: true
    });

    setExtractedItems(prev => prev ? prev.filter(i => i.id !== item.id) : null);
  };

  const handleDiscardItem = (id: string) => {
    setExtractedItems(prev => prev ? prev.filter(i => i.id !== id) : null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                Document Ingestion
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-semibold">
                Anonymized Records Only
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
              Extract Follow-up Instructions from Hospital Documents
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Document Selection / Upload Dropzone */}
        {!extractedItems ? (
          <div className="mt-4 space-y-4">
            <div className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-2xl p-6 text-center cursor-pointer transition bg-slate-50/60">
              <UploadCloud className="w-10 h-10 text-teal-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-800">
                Choose a clinical document to parse
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Supports PDF discharge summaries, scanned OPD slips, and lab CSV files.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Or Select Synthetic Demonstration Document:
              </label>
              <div className="space-y-2">
                {SAMPLE_DOCS.map((doc) => {
                  const Icon = doc.icon;
                  return (
                    <label
                      key={doc.id}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition ${
                        selectedDocType === doc.id
                          ? 'border-teal-500 bg-teal-50/70 text-teal-950 font-semibold'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="doc_type"
                          checked={selectedDocType === doc.id}
                          onChange={() => setSelectedDocType(doc.id)}
                          className="text-teal-600 focus:ring-teal-500"
                        />
                        <Icon className="w-4 h-4 text-teal-700" />
                        <span>{doc.title}</span>
                      </div>
                      <span className="text-[11px] text-slate-500">{doc.dept}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleSimulateExtraction}
              disabled={isProcessing}
              className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-2xl text-xs shadow transition flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isProcessing ? "Scanning & Extracting Actions..." : "Extract Candidate Follow-up Actions"}</span>
            </button>
          </div>
        ) : (
          /* Extracted Candidate Actions View */
          <div className="mt-4 space-y-4">
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between text-xs text-amber-900">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0" />
                <span>
                  <strong>Review before sending:</strong> Every AI-extracted task requires clinician approval before reaching patient.
                </span>
              </div>
              <button
                onClick={() => setExtractedItems(null)}
                className="text-amber-800 underline font-semibold ml-2"
              >
                Re-upload
              </button>
            </div>

            {extractedItems.length > 0 ? (
              <div className="space-y-3">
                {extractedItems.map((item) => (
                  <div key={item.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-teal-100 text-teal-800 rounded">
                            {item.category}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-500">
                            {item.confidence}
                          </span>
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded">
                            AI DRAFT
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 mt-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-mono italic mt-0.5">
                          "{item.clinical_text}"
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                        Due: {item.due_date}
                      </span>
                    </div>

                    {/* Multilingual simplified preview */}
                    <div className="pt-2 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                        <span className="font-semibold text-slate-600 block text-[10px] uppercase">Telugu Translation</span>
                        <p className="font-telugu text-slate-900 text-[11px]">{item.translated_te}</p>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                        <span className="font-semibold text-slate-600 block text-[10px] uppercase">Simplified English</span>
                        <p className="text-slate-900 text-[11px]">{item.simplified_en}</p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        onClick={() => handleDiscardItem(item.id)}
                        className="py-1.5 px-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Discard</span>
                      </button>
                      <button
                        onClick={() => handleApproveItem(item)}
                        className="py-1.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Approve & Dispatch</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-xs font-semibold">
                ✓ All extracted candidate actions have been reviewed and approved!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
