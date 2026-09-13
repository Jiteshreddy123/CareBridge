import React, { useState } from 'react';
import { useCareBridge } from '../context/CareBridgeContext';
import {
  Search, Filter, User, ArrowUpRight, HeartHandshake,
  Calendar, CheckCircle2, AlertTriangle, ShieldCheck
} from 'lucide-react';

export const PatientListView: React.FC = () => {
  const {
    patients,
    tasks,
    selectedPatientId,
    setSelectedPatientId,
    setCurrentRole,
    setCurrentView
  } = useCareBridge();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [langFilter, setLangFilter] = useState<string>('all');

  const filteredPatients = patients.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.mrn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === 'all' || p.department === deptFilter;
    const matchesLang = langFilter === 'all' || p.preferred_language === langFilter;
    return matchesSearch && matchesDept && matchesLang;
  });

  const handleSelectPatient = (patientId: string, role: 'patient' | 'caregiver' = 'patient') => {
    setSelectedPatientId(patientId);
    setCurrentRole(role);
    if (role === 'patient') {
      setCurrentView('patient-home');
    } else {
      setCurrentView('caregiver');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Synthetic Patient Directory
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-300">
              18 Cohort Patients
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Realistic synthetic cancer patients across oncology departments, languages, and care regimens.
          </p>
        </div>
      </div>

      {/* Filter controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patient, diagnosis, MRN..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-teal-500 outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 outline-none font-medium text-slate-700"
          >
            <option value="all">All Departments</option>
            <option value="Medical Oncology">Medical Oncology</option>
            <option value="Radiation Oncology">Radiation Oncology</option>
            <option value="Surgical Oncology">Surgical Oncology</option>
            <option value="Palliative Care">Palliative Care</option>
          </select>

          <select
            value={langFilter}
            onChange={(e) => setLangFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 outline-none font-medium text-slate-700"
          >
            <option value="all">All Languages</option>
            <option value="te">Telugu (తెలుగు)</option>
            <option value="hi">Hindi (हिन्दी)</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.map((patient) => {
          const patientTasks = tasks.filter(t => t.patient_id === patient.id);
          const pendingCount = patientTasks.filter(t => t.status !== 'Completed' && t.status !== 'Cancelled').length;
          const isSelected = patient.id === selectedPatientId;

          return (
            <div
              key={patient.id}
              className={`bg-white rounded-2xl p-5 border shadow-soft transition hover:border-teal-400 flex flex-col justify-between space-y-4 ${
                isSelected ? 'border-teal-500 ring-2 ring-teal-500/20' : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm border border-teal-200">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">
                        {patient.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {patient.gender}, {patient.age} yrs • MRN: {patient.mrn}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="font-mono text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {patient.id}
                    </span>
                    <span className="text-[10px] uppercase font-bold bg-teal-50 text-teal-800 px-1.5 py-0.2 rounded">
                      {patient.preferred_language}
                    </span>
                  </div>
                </div>

                <div className="mt-3.5 space-y-1.5 text-xs text-slate-600">
                  <p className="font-semibold text-slate-800 line-clamp-1">
                    {patient.diagnosis}
                  </p>
                  <p className="text-slate-500">
                    Dept: {patient.department} • {patient.primary_oncologist}
                  </p>
                  {patient.caregiver_name && (
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
                      <HeartHandshake className="w-3.5 h-3.5 text-teal-600" />
                      <span>Caregiver: {patient.caregiver_name}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-slate-500">
                  {pendingCount > 0 ? (
                    <span className="text-amber-700 font-bold">● {pendingCount} Pending Tasks</span>
                  ) : (
                    <span className="text-emerald-700 font-bold">✓ All Closed</span>
                  )}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSelectPatient(patient.id, 'patient')}
                    className="py-1 px-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold transition"
                  >
                    Patient App
                  </button>
                  <button
                    onClick={() => handleSelectPatient(patient.id, 'caregiver')}
                    className="py-1 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
                    title="Open Caregiver Mode"
                  >
                    Caregiver
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
