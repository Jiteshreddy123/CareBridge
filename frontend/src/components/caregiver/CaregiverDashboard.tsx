import React, { useState } from 'react';
import { useCareBridge } from '../../context/CareBridgeContext';
import {
  HeartHandshake, Bell, PhoneCall, Calendar, CheckCircle2,
  Clock, ShieldCheck, FileText, ChevronRight, AlertCircle
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { TaskDetailModal } from '../patient/TaskDetailModal';
import { FollowUpTask } from '../../types';

export const CaregiverDashboard: React.FC = () => {
  const {
    selectedPatient,
    tasks,
    appointments,
    currentLanguage,
    t
  } = useCareBridge();

  const [reminderToast, setReminderToast] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<FollowUpTask | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);

  const patientTasks = tasks.filter(t => t.patient_id === selectedPatient.id);
  const pendingTasks = patientTasks.filter(t => t.status !== 'Completed' && t.status !== 'Cancelled');
  const completedTasks = patientTasks.filter(t => t.status === 'Completed');
  const patientAppointment = appointments.find(a => a.patient_id === selectedPatient.id);

  const handleRemindPatient = () => {
    setReminderToast("✓ Reminder SMS & WhatsApp notification sent to " + selectedPatient.phone);
    setTimeout(() => setReminderToast(null), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Toast */}
      {reminderToast && (
        <div className="fixed top-16 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-teal-500 flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{reminderToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-card border border-teal-500/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                  {t.caregiver.title}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-teal-950 text-teal-300 border border-teal-500/30 font-semibold">
                  Authorized Access
                </span>
              </div>
              <h2 className="text-xl font-extrabold tracking-tight mt-0.5">
                {selectedPatient.name}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Caregiver: <strong>{selectedPatient.caregiver_name}</strong> ({selectedPatient.caregiver_relation}) • {selectedPatient.phone}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleRemindPatient}
              className="py-2.5 px-4 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-xl text-xs font-bold shadow transition flex items-center gap-1.5"
            >
              <Bell className="w-4 h-4" />
              <span>{t.caregiver.remindPatient}</span>
            </button>
          </div>
        </div>

        {/* Legal Consent Banner */}
        <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] text-teal-200">
          <ShieldCheck className="w-4 h-4 text-teal-400 flex-shrink-0" />
          <span>{t.caregiver.authorizedBanner}</span>
        </div>
      </div>

      {/* Grid: Upcoming Appointment & Pending Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Next Appointment Card */}
        <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>{t.caregiver.upcoming}</span>
            </h3>
            {patientAppointment && (
              <StatusBadge status={patientAppointment.status} size="sm" />
            )}
          </div>

          {patientAppointment ? (
            <div className="mt-4 space-y-3">
              <div>
                <span className="text-xs text-slate-500">Scheduled Time</span>
                <p className="text-base font-extrabold text-slate-900">
                  {patientAppointment.date_time}
                </p>
              </div>
              <div className="text-xs text-slate-700">
                <p className="font-medium">{patientAppointment.doctor_name} • {patientAppointment.department}</p>
                <p className="text-slate-500">{patientAppointment.hospital_name}</p>
              </div>

              <div className="pt-2 flex gap-2">
                <a
                  href="tel:18004250000"
                  className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
                  <span>Call Hospital Desk</span>
                </a>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-xs text-slate-500">No appointments scheduled.</p>
          )}
        </div>

        {/* Pending Tasks Card */}
        <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>{t.caregiver.pendingTasks} ({pendingTasks.length})</span>
            </h3>
            <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              Action Required
            </span>
          </div>

          <div className="mt-3 space-y-3">
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task) => (
                <div key={task.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-900">
                      {task.simplified_instruction[currentLanguage] || task.simplified_instruction.en}
                    </span>
                    <StatusBadge status={task.status} size="sm" />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Due: <strong>{task.due_date}</strong> • {task.department}
                  </p>
                  <div className="flex gap-2 justify-end pt-1">
                    <button
                      onClick={() => {
                        setSelectedTask(task);
                        setIsTaskModalOpen(true);
                      }}
                      className="text-xs text-teal-700 hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>{t.caregiver.viewInstructions}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-xs text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-200">
                ✓ All follow-up tasks completed by patient!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Completed tasks list */}
      {completedTasks.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-200">
          <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{t.caregiver.completedTasks} ({completedTasks.length})</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {completedTasks.map((task) => (
              <div key={task.id} className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-emerald-900">
                    {task.simplified_instruction[currentLanguage] || task.simplified_instruction.en}
                  </span>
                  <p className="text-[11px] text-emerald-700 mt-0.5">Completed {task.completed_at}</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Direct Contact Support Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-white">{t.caregiver.contactCareTeam}</h4>
          <p className="text-xs text-slate-400 mt-0.5">{t.caregiver.callClinicStaff}</p>
        </div>
        <a
          href="tel:1800425624"
          className="py-2.5 px-5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs transition shadow flex items-center gap-2"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Connect with Oncology Coordinator</span>
        </a>
      </div>

      {/* Task detail modal */}
      <TaskDetailModal
        task={selectedTask}
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onNeedHelp={() => setIsTaskModalOpen(false)}
      />
    </div>
  );
};
