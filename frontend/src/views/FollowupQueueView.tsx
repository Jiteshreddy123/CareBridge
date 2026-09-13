import React, { useState } from 'react';
import { useCareBridge } from '../context/CareBridgeContext';
import {
  AlertTriangle, Clock, Calendar, CheckCircle2, Phone,
  Send, ShieldAlert, ArrowRight, Eye, User, FileText
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

export const FollowupQueueView: React.FC = () => {
  const {
    tasks,
    appointments,
    helpRequests,
    patients,
    setSelectedPatientId,
    setCurrentRole,
    setCurrentView
  } = useCareBridge();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Unconfirmed tasks due soon
  const unconfirmedTasks = tasks.filter(t => t.status === 'Sent' || t.requires_staff_attention);
  // Reschedule requests
  const rescheduleRequests = appointments.filter(a => a.status === 'Reschedule Requested');
  // Open help requests
  const openHelpRequests = helpRequests.filter(h => h.status !== 'Resolved');

  const handleSendReminder = (patientPhone: string, taskTitle: string) => {
    setToastMessage(`✓ Automated SMS & WhatsApp reminder dispatched to ${patientPhone} for "${taskTitle}"`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleViewPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
    setCurrentRole('patient');
    setCurrentView('patient-home');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-teal-500 flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Policy Notice */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Staff Follow-up Queue
            </h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              Needs Attention ({unconfirmedTasks.length + rescheduleRequests.length + openHelpRequests.length})
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Operational workflow queue flagging unclosed steps that require staff outreach.
          </p>
        </div>

        {/* Operational Guardrail Callout */}
        <div className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-600 max-w-md">
          <strong className="text-slate-800 block">Assistive Operational Triage:</strong>
          This queue identifies operational delays (e.g. unconfirmed appointments, transport hurdles). It does not compute clinical risk scores.
        </div>
      </div>

      {/* 3 Actionable Triage Lanes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lane 1: Unconfirmed Tasks Due Soon */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Unconfirmed Follow-ups</span>
            </h3>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              {unconfirmedTasks.length} items
            </span>
          </div>

          <div className="space-y-3">
            {unconfirmedTasks.length > 0 ? (
              unconfirmedTasks.map((task) => {
                const patient = patients.find(p => p.id === task.patient_id);
                return (
                  <div key={task.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                        {task.patient_id}
                      </span>
                      <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                        Due: {task.due_date}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-xs text-slate-900">
                        {task.title}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Patient: <strong>{patient?.name}</strong> • Language: {patient?.preferred_language.toUpperCase()}
                      </p>
                      <p className="text-[11px] text-amber-700 font-medium mt-1">
                        ⚠️ Patient has not marked or acknowledged completion.
                      </p>
                    </div>

                    <div className="pt-1 flex gap-2 justify-end">
                      <button
                        onClick={() => patient && handleSendReminder(patient.phone, task.title)}
                        className="py-1.5 px-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                      >
                        <Send className="w-3 h-3 text-teal-600" />
                        <span>Resend SMS</span>
                      </button>
                      <button
                        onClick={() => handleViewPatient(task.patient_id)}
                        className="py-1.5 px-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">No unconfirmed tasks.</p>
            )}
          </div>
        </div>

        {/* Lane 2: Patient Reschedule Requests */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-600" />
              <span>Reschedule Requests</span>
            </h3>
            <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
              {rescheduleRequests.length} requests
            </span>
          </div>

          <div className="space-y-3">
            {rescheduleRequests.length > 0 ? (
              rescheduleRequests.map((appt) => {
                const patient = patients.find(p => p.id === appt.patient_id);
                return (
                  <div key={appt.id} className="p-3.5 bg-orange-50/60 rounded-xl border border-orange-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-800 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        {appt.patient_id}
                      </span>
                      <span className="text-[10px] font-bold text-orange-800 bg-orange-100 px-2 py-0.5 rounded">
                        Reschedule
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-xs text-slate-900">
                        {appt.doctor_name} ({appt.department})
                      </h4>
                      <p className="text-[11px] text-slate-600">
                        Original Slot: {appt.date_time}
                      </p>
                      <div className="mt-1 p-2 bg-white rounded border border-orange-200 text-[11px] text-orange-950 font-medium italic">
                        "{appt.reschedule_reason || "Patient requested reschedule via app"}"
                      </div>
                    </div>

                    <div className="pt-1 flex gap-2 justify-end">
                      <a
                        href={`tel:${patient?.phone}`}
                        className="py-1.5 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                      >
                        <Phone className="w-3 h-3 text-teal-600" />
                        <span>Call Patient</span>
                      </a>
                      <button
                        onClick={() => handleViewPatient(appt.patient_id)}
                        className="py-1.5 px-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold transition"
                      >
                        <span>Manage</span>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">No pending reschedule requests.</p>
            )}
          </div>
        </div>

        {/* Lane 3: Patient Clarification & Help Requests */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Patient Help Inquiries</span>
            </h3>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              {openHelpRequests.length} open
            </span>
          </div>

          <div className="space-y-3">
            {openHelpRequests.length > 0 ? (
              openHelpRequests.map((req) => (
                <div key={req.id} className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-800 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      {req.patient_id}
                    </span>
                    <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                      Language: {req.language.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-rose-950">
                      {req.reason}
                    </h4>
                    {req.details && (
                      <p className="text-[11px] text-slate-700 mt-1 line-clamp-2 italic">
                        "{req.details}"
                      </p>
                    )}
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Submitted: {req.created_at}
                    </span>
                  </div>

                  <div className="pt-1 flex gap-2 justify-end">
                    <button
                      onClick={() => setCurrentView('help-requests')}
                      className="py-1.5 px-3 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
                    >
                      <span>Resolve in Help Queue</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">No open help inquiries.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
