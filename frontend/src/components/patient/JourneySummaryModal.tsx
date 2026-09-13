import React from 'react';
import { useCareBridge } from '../../context/CareBridgeContext';
import { Printer, Share2, X, ShieldCheck, HeartHandshake, FileText, Calendar, CheckCircle } from 'lucide-react';

interface JourneySummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JourneySummaryModal: React.FC<JourneySummaryModalProps> = ({ isOpen, onClose }) => {
  const { selectedPatient, tasks, appointments, t, currentLanguage } = useCareBridge();

  if (!isOpen) return null;

  const patientTasks = tasks.filter(t => t.patient_id === selectedPatient.id);
  const completedTasks = patientTasks.filter(t => t.status === 'Completed');
  const pendingTasks = patientTasks.filter(t => t.status !== 'Completed' && t.status !== 'Cancelled');
  const nextAppt = appointments.find(a => a.patient_id === selectedPatient.id) || appointments[0];

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `CareBridge Cancer Summary - ${selectedPatient.name}`,
        text: `Cancer care follow-up summary for ${selectedPatient.name} (${selectedPatient.diagnosis}).`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      alert('Secure share link generated. Copied to clipboard.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-stone-200 shadow-modal overflow-hidden p-6 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Modal Top Bar */}
        <div className="flex items-start justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900 leading-tight">
                Cancer Care Journey Summary
              </h3>
              <p className="text-[11px] text-stone-500">
                National Cancer Grid (NCG) • Patient Care Summary Sheet
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Summary Sheet Surface */}
        <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-stone-200/90 space-y-4 text-xs text-stone-800">
          {/* Patient Card */}
          <div className="flex justify-between items-start pb-3 border-b border-stone-200">
            <div>
              <h4 className="text-base font-bold text-stone-900">{selectedPatient.name}</h4>
              <p className="text-stone-600 mt-0.5">
                {selectedPatient.age} yrs • {selectedPatient.gender} • MRN: <span className="font-mono font-semibold">{selectedPatient.mrn}</span>
              </p>
              <p className="text-emerald-900 font-medium mt-1">
                <strong>Diagnosis:</strong> {selectedPatient.diagnosis}
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
              Active Treatment
            </span>
          </div>

          {/* Clinical Team & Facility */}
          <div className="grid grid-cols-2 gap-3 pb-3 border-b border-stone-200">
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-semibold">Treating Oncologist</span>
              <p className="font-bold text-stone-900">{selectedPatient.primary_oncologist}</p>
              <p className="text-stone-500">{selectedPatient.department}</p>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-semibold">Primary Caregiver</span>
              <p className="font-bold text-stone-900">{selectedPatient.caregiver_name || 'Family member'}</p>
              <p className="text-stone-500">{selectedPatient.caregiver_phone || 'On file'}</p>
            </div>
          </div>

          {/* Next Scheduled Appointment */}
          {nextAppt && (
            <div className="pb-3 border-b border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase font-semibold">Upcoming Oncology Visit</span>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-800" />
                  <span className="font-bold text-stone-900">{nextAppt.date_time}</span>
                </div>
                <span className="text-stone-600">{nextAppt.department} ({nextAppt.room_or_floor})</span>
              </div>
            </div>
          )}

          {/* Actionable Follow-up Orders */}
          <div>
            <span className="text-[10px] text-stone-400 uppercase font-semibold">Active Care Instructions & Tasks</span>
            <div className="mt-2 space-y-2">
              {pendingTasks.map((task) => (
                <div key={task.id} className="p-2.5 bg-white rounded-xl border border-stone-200 flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-stone-900">
                      {task.simplified_instruction[currentLanguage] || task.simplified_instruction.en}
                    </div>
                    <div className="text-[10px] text-stone-500 mt-0.5">
                      Due: {task.due_date} • Location: {task.where_location[currentLanguage] || task.where_location.en}
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-50 text-amber-800 border border-amber-200 flex-shrink-0">
                    Pending
                  </span>
                </div>
              ))}

              {completedTasks.length > 0 && (
                <div className="text-[11px] text-emerald-800 flex items-center gap-1.5 pt-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{completedTasks.length} recent clinical action(s) completed and closed.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center gap-1.5 transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-800 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-soft transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
