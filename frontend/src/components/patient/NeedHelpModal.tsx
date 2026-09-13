import React, { useState } from 'react';
import { useCareBridge } from '../../context/CareBridgeContext';
import { X, Send, HelpCircle, CheckCircle2 } from 'lucide-react';

interface NeedHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultReason?: string;
}

export const NeedHelpModal: React.FC<NeedHelpModalProps> = ({ isOpen, onClose, defaultReason }) => {
  const { submitHelpRequest, t } = useCareBridge();
  const [selectedReason, setSelectedReason] = useState<string>(defaultReason || t.helpModal.reasons.cannotReachHospital);
  const [details, setDetails] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const reasonsList = [
    t.helpModal.reasons.dontUnderstand,
    t.helpModal.reasons.cannotReachHospital,
    t.helpModal.reasons.needApptHelp,
    t.helpModal.reasons.couldNotComplete,
    t.helpModal.reasons.needCaregiver,
    t.helpModal.reasons.other,
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitHelpRequest(selectedReason, details);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setDetails('');
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-slate-100 animate-in fade-in slide-in-from-bottom-6 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">{t.helpModal.title}</h3>
              <p className="text-xs text-slate-500">{t.helpModal.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h4 className="font-bold text-lg text-slate-800">
              {t.helpModal.successMessage}
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Our oncology care coordinator has been notified and will call you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Select your difficulty:
              </label>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {reasonsList.map((reason) => (
                  <label
                    key={reason}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                      selectedReason === reason
                        ? 'border-teal-500 bg-teal-50/70 text-teal-900 font-medium'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="help_reason"
                      checked={selectedReason === reason}
                      onChange={() => setSelectedReason(reason)}
                      className="text-teal-600 focus:ring-teal-500 h-4 w-4"
                    />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Additional Details (Optional):
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={t.helpModal.detailsPlaceholder}
                rows={2}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
              />
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              >
                {t.appointment.cancel}
              </button>
              <button
                type="submit"
                className="flex-2 py-2.5 px-4 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 rounded-xl shadow transition flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                {t.helpModal.submitButton}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
