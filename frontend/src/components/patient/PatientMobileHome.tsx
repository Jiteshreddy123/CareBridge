import React, { useState } from 'react';
import { useCareBridge } from '../../context/CareBridgeContext';
import { FollowUpTask } from '../../types';
import {
  Calendar, CheckCircle2, HelpCircle, QrCode,
  MapPin, Clock, ArrowRight, ChevronRight, HeartHandshake,
  HeartPulse, FileText
} from 'lucide-react';
import { TaskDetailModal } from './TaskDetailModal';
import { NeedHelpModal } from './NeedHelpModal';
import { PatientQRCodeModal } from './PatientQRCodeModal';
import { PatientBottomNav } from './PatientBottomNav';
import { JourneyStageRail } from './JourneyStageRail';
import { WellbeingTrackerModal } from './WellbeingTrackerModal';
import { JourneySummaryModal } from './JourneySummaryModal';

export const PatientMobileHome: React.FC = () => {
  const {
    selectedPatient,
    tasks,
    appointments,
    currentLanguage,
    completeTask,
    confirmAppointment,
    requestReschedule,
    setCurrentRole,
    t
  } = useCareBridge();

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedTask, setSelectedTask] = useState<FollowUpTask | null>(null);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [isQROpen, setIsQROpen] = useState<boolean>(false);
  const [isWellbeingOpen, setIsWellbeingOpen] = useState<boolean>(false);
  const [isJourneySummaryOpen, setIsJourneySummaryOpen] = useState<boolean>(false);
  const [isReschedulePrompt, setIsReschedulePrompt] = useState<boolean>(false);
  const [rescheduleReason, setRescheduleReason] = useState<string>('');

  // Filter tasks for this patient
  const patientTasks = tasks.filter(t => t.patient_id === selectedPatient.id);
  const pendingTasks = patientTasks.filter(t => t.status !== 'Completed' && t.status !== 'Cancelled');

  // Next upcoming appointment
  const patientAppointment = appointments.find(a => a.patient_id === selectedPatient.id) || appointments[0];

  const handleOpenTaskDetail = (task: FollowUpTask) => {
    setSelectedTask(task);
    setIsTaskDetailOpen(true);
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (patientAppointment) {
      requestReschedule(patientAppointment.id, rescheduleReason || "Need convenient date due to family transit");
      setIsReschedulePrompt(false);
      setRescheduleReason('');
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-[#F8F6F1] text-stone-900 pb-6">
      {/* Patient Header Card - Organic Spruce Aesthetic */}
      <div className="bg-gradient-to-br from-[#1C4A40] via-[#245A4E] to-[#122A25] text-white p-5 rounded-b-[28px] shadow-soft relative overflow-hidden">
        {/* Soft background light glow */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-36 h-36 rounded-full bg-emerald-400/10 pointer-events-none blur-2xl" />

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white font-serif font-bold text-lg shadow-inner">
              {selectedPatient.name.charAt(0)}
            </div>
            <div>
              <span className="text-[10px] text-emerald-200 uppercase tracking-widest font-bold">
                NCG Digital Care Pass
              </span>
              <h2 className="text-lg font-serif font-bold tracking-tight text-white leading-tight">
                {selectedPatient.name}
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsQROpen(true)}
            className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition flex items-center gap-1.5 shadow-soft active:scale-95"
            title="Clinic Check-in QR Code"
          >
            <QrCode className="w-4 h-4 text-emerald-200" />
            <span className="text-[11px] font-semibold hidden xs:inline">Desk QR</span>
          </button>
        </div>

        {/* Patient Medical Identifier Strip */}
        <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-emerald-100">
          <div className="flex items-center gap-2">
            <span className="font-mono bg-black/30 px-2 py-0.5 rounded text-[10.5px] text-emerald-300 font-semibold border border-white/10">
              {selectedPatient.id}
            </span>
            <span className="truncate max-w-[180px]">{selectedPatient.department}</span>
          </div>

          <span className="text-[11px] text-emerald-200/90 font-medium">
            {selectedPatient.diagnosis.includes('Stage') ? selectedPatient.diagnosis.split('(')[0] : 'Colorectal Care'}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 space-y-4 flex-1">
        {/* Longitudinal Journey Stage Rail (Integrated from OncoPath) */}
        <JourneyStageRail onOpenSummary={() => setIsJourneySummaryOpen(true)} />

        {/* Quick Supportive Action Strip */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setIsWellbeingOpen(true)}
            className="p-3 bg-white rounded-2xl border border-stone-200/90 hover:border-emerald-700/40 shadow-soft text-left transition flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/70 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition">
              <HeartPulse className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-stone-900 block leading-tight">
                {t.wellbeing?.checkinButton || 'Symptom Check-in'}
              </span>
              <span className="text-[10px] text-stone-500">Track 7-day trend</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setIsJourneySummaryOpen(true)}
            className="p-3 bg-white rounded-2xl border border-stone-200/90 hover:border-emerald-700/40 shadow-soft text-left transition flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/70 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-stone-900 block leading-tight">
                {t.patientHome.journeySummaryButton || 'Care Summary'}
              </span>
              <span className="text-[10px] text-stone-500">Print or share</span>
            </div>
          </button>
        </div>

        {/* Actionable Follow-up Section Header */}
        <div className="pt-2">
          <h1 className="text-xl font-serif font-bold text-stone-900 tracking-tight">
            {t.patientHome.nextStepsHeadline}
          </h1>
          <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
            {t.patientHome.subhead}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CARD 1: NEXT APPOINTMENT (రాబోయే అపాయింట్‌మెంట్) */}
        {/* ========================================================================= */}
        {patientAppointment && (
          <div className="bg-white rounded-2xl p-4 shadow-card border border-stone-200/90 transition hover:border-emerald-700/30">
            <div className="flex items-center justify-between pb-2.5 border-b border-stone-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                {t.appointment.nextAppointment}
              </span>
              {patientAppointment.status === 'Confirmed' ? (
                <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                  {t.appointment.confirmedBadge}
                </span>
              ) : patientAppointment.status === 'Reschedule Requested' ? (
                <span className="px-2.5 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-800 rounded-full border border-amber-200 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-700" />
                  {t.appointment.rescheduleRequestedBadge}
                </span>
              ) : (
                <span className="px-2.5 py-0.5 text-[10px] font-bold bg-stone-100 text-stone-700 rounded-full border border-stone-200">
                  {t.statuses.acknowledged}
                </span>
              )}
            </div>

            <div className="mt-3 space-y-1">
              <h3 className="text-base font-bold text-stone-900 leading-snug">
                {patientAppointment.date_time}
              </h3>
              <p className="text-xs text-stone-600 font-medium">
                {patientAppointment.doctor_name} • {patientAppointment.department}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-stone-500 pt-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                <span>{patientAppointment.room_or_floor}, {patientAppointment.hospital_name}</span>
              </div>
            </div>

            {/* Attendance Confirmation & Reschedule Action */}
            <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setIsReschedulePrompt(!isReschedulePrompt)}
                className="text-xs font-semibold text-stone-500 hover:text-stone-800 py-1 transition"
              >
                {t.appointment.needToReschedule}
              </button>

              {patientAppointment.status !== 'Confirmed' && (
                <button
                  onClick={() => confirmAppointment(patientAppointment.id)}
                  className="py-1.5 px-3.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-soft transition flex items-center gap-1.5 active:scale-95"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{t.appointment.confirmAppointment}</span>
                </button>
              )}
            </div>

            {/* In-place Reschedule Request Box */}
            {isReschedulePrompt && (
              <form onSubmit={handleRescheduleSubmit} className="mt-3 p-3 bg-amber-50/60 rounded-xl border border-amber-200 space-y-2">
                <p className="text-xs text-amber-900 font-medium">
                  {t.appointment.rescheduleNotice}
                </p>
                <input
                  type="text"
                  value={rescheduleReason}
                  onChange={(e) => setRescheduleReason(e.target.value)}
                  placeholder="e.g. Travel unavailable, prefer morning slot..."
                  className="w-full p-2 bg-white rounded-lg border border-amber-300 outline-none text-xs text-stone-800"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsReschedulePrompt(false)}
                    className="px-3 py-1 bg-stone-200 text-stone-700 rounded-lg font-medium text-xs"
                  >
                    {t.appointment.cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-amber-700 hover:bg-amber-600 text-white rounded-lg font-bold text-xs"
                  >
                    {t.appointment.submitRequest}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* CARD 2: TO DO ACTIONS (చేయవలసిన పనులు) */}
        {/* ========================================================================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
              {t.patientHome.tasksToDo} ({pendingTasks.length})
            </span>
            <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Follow-up Closure
            </span>
          </div>

          {pendingTasks.length > 0 ? (
            pendingTasks.map((task) => {
              const simplified = task.simplified_instruction[currentLanguage] || task.simplified_instruction.en;
              const whyText = task.why_explanation[currentLanguage] || task.why_explanation.en;
              return (
                <div
                  key={task.id}
                  className="bg-white rounded-2xl p-4 shadow-card border border-stone-200/90 relative overflow-hidden transition hover:border-emerald-700/40"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[9.5px] font-bold bg-emerald-50 text-emerald-800 rounded border border-emerald-200 uppercase">
                          {task.category}
                        </span>
                        <span className="text-[11px] font-medium text-stone-500">
                          Due: {task.due_date}
                        </span>
                      </div>
                      <h4 className="text-base font-serif font-bold text-stone-900 mt-2 leading-snug">
                        {simplified}
                      </h4>
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                        {whyText}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons: "I've completed this" & "View Details" */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenTaskDetail(task)}
                      className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 py-1"
                    >
                      <span>{t.patientHome.viewDetails}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => completeTask(task.id)}
                      className="py-2 px-3.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-soft transition flex items-center gap-1.5 active:scale-95"
                    >
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                      <span>{t.patientHome.completedThis}</span>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-5 text-center space-y-2">
              <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h4 className="font-bold text-sm text-emerald-950">
                {t.patientHome.noPendingTasks}
              </h4>
              <p className="text-xs text-emerald-800">
                {t.patientHome.allCaughtUp}
              </p>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* CARD 3: NEED HELP? (సహాయం కావాలా?) */}
        {/* ========================================================================= */}
        <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200/90 shadow-soft">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm text-amber-950">
                {t.patientHome.needHelpHeadline}
              </h4>
              <p className="text-xs text-amber-900/90 mt-0.5 leading-relaxed">
                “{t.patientHome.needHelpSubhead}”
              </p>
              <button
                onClick={() => setIsHelpOpen(true)}
                className="mt-3 py-1.5 px-3.5 bg-amber-700 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-soft transition inline-flex items-center gap-1.5 active:scale-95"
              >
                <span>{t.nav.help}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Caregiver Linked Notice */}
        {selectedPatient.caregiver_authorized && (
          <div className="p-3 bg-white rounded-2xl border border-stone-200/90 flex items-center justify-between text-xs text-stone-700 shadow-soft">
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-emerald-800 flex-shrink-0" />
              <span>Caregiver: <strong>{selectedPatient.caregiver_name}</strong></span>
            </div>
            <button
              onClick={() => setCurrentRole('caregiver')}
              className="text-emerald-800 font-bold hover:underline"
            >
              Open Caregiver View
            </button>
          </div>
        )}
      </div>

      {/* Android Bottom Navigation */}
      <PatientBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Modals */}
      <TaskDetailModal
        task={selectedTask}
        isOpen={isTaskDetailOpen}
        onClose={() => setIsTaskDetailOpen(false)}
        onNeedHelp={() => {
          setIsTaskDetailOpen(false);
          setIsHelpOpen(true);
        }}
      />

      <NeedHelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      <PatientQRCodeModal
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
      />

      <WellbeingTrackerModal
        isOpen={isWellbeingOpen}
        onClose={() => setIsWellbeingOpen(false)}
      />

      <JourneySummaryModal
        isOpen={isJourneySummaryOpen}
        onClose={() => setIsJourneySummaryOpen(false)}
      />
    </div>
  );
};
