import React, { useState } from 'react';
import { useCareBridge } from '../context/CareBridgeContext';
import {
  Calendar, CheckCircle2, Clock, AlertTriangle, Plus,
  UploadCloud, Search, Eye, Filter, ArrowUpRight, Sparkles
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { CreateFollowupModal } from '../components/clinician/CreateFollowupModal';
import { DocumentUploadModal } from '../components/clinician/DocumentUploadModal';

export const ClinicianDashboardView: React.FC = () => {
  const {
    tasks,
    patients,
    selectedPatientId,
    setSelectedPatientId,
    metrics,
    setCurrentView,
    setCurrentRole,
    setHeroDemoStep,
    heroDemoStep,
    t
  } = useCareBridge();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deptFilter, setDeptFilter] = useState<string>('all');

  const filteredTasks = tasks.filter(task => {
    const patient = patients.find(p => p.id === task.patient_id);
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.patient_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (patient && patient.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDept = deptFilter === 'all' || task.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const handleOpenCreateModal = (patientId?: string) => {
    if (patientId) setSelectedPatientId(patientId);
    setIsCreateModalOpen(true);
    if (heroDemoStep === 1) {
      setHeroDemoStep(2);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
            {t.clinician.dashboardTitle}
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Operational follow-up tracking across medical, surgical, and radiation oncology.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="py-2 px-3.5 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 rounded-xl text-xs font-semibold shadow-soft transition flex items-center gap-1.5"
          >
            <UploadCloud className="w-4 h-4 text-stone-500" />
            <span>{t.clinician.uploadDocButton}</span>
          </button>

          <button
            onClick={() => handleOpenCreateModal()}
            className="py-2 px-4 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-soft transition flex items-center gap-1.5 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{t.clinician.newFollowupButton}</span>
          </button>
        </div>
      </div>

      {/* 4 TOP KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Today's Follow-ups */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-soft">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>{t.clinician.todayFollowups}</span>
            <Calendar className="w-4 h-4 text-emerald-800" />
          </div>
          <p className="text-3xl font-serif font-bold text-stone-900 mt-2">
            {metrics.today_followups_count}
          </p>
          <p className="text-[11px] text-stone-400 mt-1">
            Scheduled across clinics today
          </p>
        </div>

        {/* Card 2: Awaiting Patient Confirmation */}
        <div
          onClick={() => setCurrentView('queue')}
          className="bg-white p-5 rounded-2xl border border-amber-200/90 hover:border-amber-400 shadow-soft cursor-pointer transition group"
        >
          <div className="flex items-center justify-between text-amber-900 text-xs font-semibold">
            <span>{t.clinician.awaitingConfirmation}</span>
            <Clock className="w-4 h-4 text-amber-700" />
          </div>
          <p className="text-3xl font-serif font-bold text-amber-950 mt-2">
            {metrics.awaiting_patient_confirmation_count}
          </p>
          <p className="text-[11px] text-amber-800/80 mt-1 flex items-center gap-1">
            <span>Requires patient acknowledgement</span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </p>
        </div>

        {/* Card 3: Total Pending Follow-ups */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-soft">
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold">
            <span>{t.clinician.pendingTasks}</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-3xl font-serif font-bold text-stone-900 mt-2">
            {metrics.pending_tasks_count}
          </p>
          <p className="text-[11px] text-stone-400 mt-1">
            Total active follow-up actions
          </p>
        </div>

        {/* Card 4: Loop Closure Rate */}
        <div
          onClick={() => setCurrentView('impact')}
          className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 shadow-soft cursor-pointer transition hover:bg-emerald-50"
        >
          <div className="flex items-center justify-between text-emerald-900 text-xs font-semibold">
            <span>{t.clinician.completedThisWeek}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-800" />
          </div>
          <p className="text-3xl font-serif font-bold text-emerald-950 mt-2">
            {metrics.pilot_rate}%
          </p>
          <p className="text-[11px] text-emerald-800 font-semibold mt-1">
            {metrics.rate_delta} over baseline (72%)
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by patient ID, name, or task..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 outline-none font-medium text-slate-700"
          >
            <option value="all">All Oncology Departments</option>
            <option value="Medical Oncology">Medical Oncology</option>
            <option value="Radiation Oncology">Radiation Oncology</option>
            <option value="Surgical Oncology">Surgical Oncology</option>
            <option value="Palliative Care">Palliative Care</option>
          </select>
        </div>
      </div>

      {/* CLINICIAN FOLLOW-UP TABLE (Section 7) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">{t.clinician.table.patient}</th>
                <th className="py-3.5 px-4">{t.clinician.table.nextStep}</th>
                <th className="py-3.5 px-4">{t.clinician.table.due}</th>
                <th className="py-3.5 px-4">{t.clinician.table.status}</th>
                <th className="py-3.5 px-4">{t.clinician.table.language}</th>
                <th className="py-3.5 px-4 text-right">{t.clinician.table.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => {
                  const patient = patients.find(p => p.id === task.patient_id);
                  const isSelected = task.patient_id === selectedPatientId;
                  return (
                    <tr
                      key={task.id}
                      className={`hover:bg-slate-50/80 transition ${
                        isSelected ? 'bg-teal-50/30' : ''
                      }`}
                    >
                      {/* Patient ID & Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 text-[11px]">
                            {task.patient_id}
                          </span>
                          <div>
                            <span className="font-bold text-slate-900 block">
                              {patient ? patient.name : "Patient"}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {task.department}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Next Step / Title */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-800 block">
                          {task.title}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono italic truncate max-w-xs block">
                          "{task.clinical_instruction}"
                        </span>
                      </td>

                      {/* Due Date */}
                      <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                        {task.due_date}
                      </td>

                      {/* Follow-up State Status */}
                      <td className="py-3.5 px-4">
                        <StatusBadge status={task.status} size="sm" />
                      </td>

                      {/* Language */}
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                          {patient ? patient.preferred_language : "te"}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => {
                            setSelectedPatientId(task.patient_id);
                            setCurrentRole('patient');
                            setCurrentView('patient-home');
                          }}
                          className="text-teal-700 hover:text-teal-900 font-bold hover:underline inline-flex items-center gap-1"
                        >
                          <span>{t.clinician.table.action} (Patient View)</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">
                    No follow-ups matching filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <CreateFollowupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <DocumentUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
};
