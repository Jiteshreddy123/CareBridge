import React from 'react';
import { FollowUpTask } from '../../types';
import { useCareBridge } from '../../context/CareBridgeContext';
import {
  X, CheckCircle2, AlertCircle, MapPin, Calendar, HelpCircle,
  ShieldCheck, Info, FileText
} from 'lucide-react';

interface TaskDetailModalProps {
  task: FollowUpTask | null;
  isOpen: boolean;
  onClose: () => void;
  onNeedHelp: () => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ task, isOpen, onClose, onNeedHelp }) => {
  const { currentLanguage, completeTask, t } = useCareBridge();

  if (!isOpen || !task) return null;

  const isCompleted = task.status === 'Completed';

  const simplified = task.simplified_instruction[currentLanguage] || task.simplified_instruction.en;
  const why = task.why_explanation[currentLanguage] || task.why_explanation.en;
  const what = task.what_to_do[currentLanguage] || task.what_to_do.en;
  const where = task.where_location[currentLanguage] || task.where_location.en;

  const handleComplete = () => {
    completeTask(task.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-6 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-700 rounded border border-teal-200">
                {task.category}
              </span>
              {isCompleted ? (
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
                  Completed
                </span>
              ) : (
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-amber-50 text-amber-800 rounded border border-amber-200">
                  Action Required
                </span>
              )}
            </div>
            <h3 className="font-extrabold text-lg text-slate-900 mt-1">
              {simplified}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Clear Sections: Why, What, When, Where */}
        <div className="my-4 space-y-3.5">
          {/* Why */}
          <div className="bg-teal-50/60 border border-teal-100 rounded-xl p-3.5 flex gap-3">
            <Info className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wider">
                {t.taskDetail.whyHeadline}
              </h4>
              <p className="text-sm text-teal-800 mt-0.5 leading-relaxed">
                {why}
              </p>
            </div>
          </div>

          {/* What to do */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {t.taskDetail.whatToDoHeadline}
              </h4>
              <p className="text-sm text-slate-800 mt-0.5 leading-relaxed">
                {what}
              </p>
            </div>
          </div>

          {/* When & Where Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex gap-2.5">
              <Calendar className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  {t.taskDetail.whenHeadline}
                </h4>
                <p className="text-xs font-semibold text-slate-800 mt-0.5">
                  {task.due_date}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex gap-2.5">
              <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  {t.taskDetail.whereHeadline}
                </h4>
                <p className="text-xs font-semibold text-slate-800 mt-0.5">
                  {where}
                </p>
              </div>
            </div>
          </div>

          {/* Clinician Approval Safeguard Badge */}
          <div className="p-2.5 bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <span>{t.taskDetail.humanApprovedNotice}</span>
          </div>

          {/* Original Doctor Order */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
            <div className="flex items-center gap-1.5 font-semibold text-slate-700 mb-1">
              <FileText className="w-3.5 h-3.5" />
              <span>{t.taskDetail.clinicianOriginal}</span>
            </div>
            <p className="italic font-mono text-[11px] text-slate-600 bg-white p-2 rounded border border-slate-200">
              "{task.clinical_instruction}" — {task.created_by}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          {!isCompleted ? (
            <button
              onClick={handleComplete}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm active:scale-98"
            >
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
              <span>{t.patientHome.completedThis}</span>
            </button>
          ) : (
            <div className="w-full py-2.5 px-4 bg-emerald-50 text-emerald-800 font-semibold rounded-xl text-center text-xs border border-emerald-200">
              ✓ {t.taskDetail.alreadyCompleted} {task.completed_at || "recently"}
            </div>
          )}

          <button
            onClick={onNeedHelp}
            className="w-full sm:w-auto py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition text-xs flex items-center justify-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>{t.taskDetail.needHelpButton}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
