import React from 'react';
import { useCareBridge } from '../../context/CareBridgeContext';
import { X, QrCode, ShieldCheck, Hospital, User } from 'lucide-react';

interface PatientQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PatientQRCodeModal: React.FC<PatientQRCodeModalProps> = ({ isOpen, onClose }) => {
  const { selectedPatient, t } = useCareBridge();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
            <Hospital className="w-6 h-6" />
          </div>
        </div>

        <h3 className="text-base font-extrabold text-slate-900">
          {t.patientHome.clinicCheckinCode}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          NCG Regional Cancer Network Fast-Track Pass
        </p>

        {/* Patient Identity Badge */}
        <div className="my-4 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-left">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-900">{selectedPatient.name}</span>
            <span className="font-mono text-[11px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-semibold">
              {selectedPatient.mrn}
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex justify-between">
            <span>{selectedPatient.department}</span>
            <span>ID: {selectedPatient.id}</span>
          </div>
        </div>

        {/* Simulated High-Res QR Code */}
        <div className="mx-auto w-48 h-48 bg-white border-2 border-slate-900 rounded-2xl p-2.5 flex items-center justify-center shadow-inner relative">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Position Detection Patterns */}
            <rect x="5" y="5" width="26" height="26" fill="#0f172a" />
            <rect x="9" y="9" width="18" height="18" fill="#ffffff" />
            <rect x="13" y="13" width="10" height="10" fill="#0f172a" />

            <rect x="69" y="5" width="26" height="26" fill="#0f172a" />
            <rect x="73" y="9" width="18" height="18" fill="#ffffff" />
            <rect x="77" y="13" width="10" height="10" fill="#0f172a" />

            <rect x="5" y="69" width="26" height="26" fill="#0f172a" />
            <rect x="9" y="73" width="18" height="18" fill="#ffffff" />
            <rect x="13" y="77" width="10" height="10" fill="#0f172a" />

            {/* Random Matrix Modules */}
            <rect x="36" y="8" width="6" height="6" fill="#0f172a" />
            <rect x="46" y="8" width="8" height="6" fill="#0f172a" />
            <rect x="58" y="8" width="6" height="6" fill="#0f172a" />
            <rect x="36" y="20" width="12" height="6" fill="#0f172a" />
            <rect x="52" y="20" width="12" height="6" fill="#0d9488" />

            <rect x="8" y="38" width="18" height="6" fill="#0f172a" />
            <rect x="32" y="38" width="8" height="8" fill="#0f172a" />
            <rect x="44" y="36" width="16" height="16" fill="#0f172a" />
            <rect x="64" y="38" width="10" height="6" fill="#0d9488" />
            <rect x="78" y="38" width="14" height="6" fill="#0f172a" />

            <rect x="8" y="52" width="14" height="8" fill="#0f172a" />
            <rect x="26" y="52" width="14" height="8" fill="#0d9488" />
            <rect x="64" y="52" width="8" height="8" fill="#0f172a" />
            <rect x="76" y="52" width="16" height="8" fill="#0f172a" />

            <rect x="36" y="68" width="10" height="10" fill="#0f172a" />
            <rect x="50" y="68" width="8" height="6" fill="#0f172a" />
            <rect x="62" y="68" width="14" height="6" fill="#0d9488" />
            <rect x="80" y="68" width="12" height="10" fill="#0f172a" />

            <rect x="36" y="82" width="14" height="8" fill="#0f172a" />
            <rect x="54" y="82" width="10" height="8" fill="#0f172a" />
            <rect x="68" y="82" width="8" height="8" fill="#0f172a" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-8 h-8 rounded-lg bg-white shadow-md flex items-center justify-center border border-teal-500 text-teal-700">
              <QrCode className="w-5 h-5" />
            </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 mt-4 leading-relaxed">
          {t.patientHome.scanAtDesk}
        </p>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition"
        >
          {t.taskDetail.closeModal}
        </button>
      </div>
    </div>
  );
};
