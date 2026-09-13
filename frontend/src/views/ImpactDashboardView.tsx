import React, { useState } from 'react';
import { useCareBridge } from '../context/CareBridgeContext';
import {
  TrendingUp, CheckCircle2, Clock, Users, ArrowUpRight,
  ShieldCheck, AlertCircle, Calendar, BarChart3, HelpCircle
} from 'lucide-react';

export const ImpactDashboardView: React.FC = () => {
  const { metrics, tasks } = useCareBridge();
  const [activeTab, setActiveTab] = useState<'metrics' | 'pilot'>('metrics');

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = tasks.filter(t => t.status !== 'Completed' && t.status !== 'Cancelled').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* View Header & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Operational Pilot & Impact Analytics
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-300">
              Simulated NCG Pilot
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Measuring care-instruction closure and completion velocity across oncology follow-ups.
          </p>
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-4 py-1.5 rounded-lg transition ${
              activeTab === 'metrics'
                ? 'bg-white text-teal-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Operational KPIs
          </button>
          <button
            onClick={() => setActiveTab('pilot')}
            className={`px-4 py-1.5 rounded-lg transition ${
              activeTab === 'pilot'
                ? 'bg-white text-teal-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            60–90 Day Pilot Roadmap
          </button>
        </div>
      </div>

      {activeTab === 'metrics' ? (
        <div className="space-y-6">
          {/* ========================================================================= */}
          {/* HERO OPERATIONAL METRIC BANNER (Section 16) */}
          {/* ========================================================================= */}
          <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-teal-500/30 relative overflow-hidden">
            {/* Background glowing gradient */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-950/80 px-2.5 py-1 rounded-md border border-teal-500/30">
                  Primary Operational Metric
                </span>
                <span className="text-xs text-slate-400">
                  • Oncology Care Instruction Closure
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    {metrics.primary_kpi_name}
                  </h2>
                  <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                    “{metrics.kpi_definition}”
                  </p>
                </div>

                {/* Big Rate Comparison Display */}
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur border border-white/10 p-4 rounded-2xl">
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 font-semibold block uppercase">Baseline</span>
                    <span className="text-2xl sm:text-3xl font-bold text-slate-300">
                      {metrics.baseline_rate}%
                    </span>
                  </div>
                  <div className="text-teal-400 font-black text-2xl">→</div>
                  <div className="text-left">
                    <span className="text-[11px] text-teal-300 font-semibold block uppercase">Current Pilot</span>
                    <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                      {metrics.pilot_rate}%
                    </span>
                  </div>
                  <div className="ml-2 px-2.5 py-1 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black">
                    {metrics.rate_delta}
                  </div>
                </div>
              </div>

              {/* Progress Bar representation */}
              <div className="pt-2 space-y-2">
                <div className="flex justify-between text-xs text-slate-300 font-semibold">
                  <span>Baseline: 72%</span>
                  <span className="text-teal-300">Active Pilot: {metrics.pilot_rate}%</span>
                  <span>Pilot Target: +10 pts (85%)</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-700"
                    style={{ width: `${metrics.pilot_rate}%` }}
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-400 italic">
                *Simulated pilot metrics based on verified closure of scheduled follow-up orders within 7 days of due date.
              </p>
            </div>
          </div>

          {/* Secondary Operational Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>Avg Time to Acknowledge</span>
                <Clock className="w-4 h-4 text-teal-600" />
              </div>
              <p className="text-3xl font-black text-slate-900 mt-2">
                {metrics.average_time_to_acknowledge_hours} hrs
              </p>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">
                ↓ 68% faster than paper appointment slip
              </p>
            </div>

            {/* Metric 2 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>Pending Follow-ups</span>
                <AlertCircle className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-3xl font-black text-amber-700 mt-2">
                {pendingTasks}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Monitored in staff closure queue
              </p>
            </div>

            {/* Metric 3 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>Completed Follow-ups</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-3xl font-black text-emerald-700 mt-2">
                {completedTasks}
              </p>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">
                Verified task closure loop
              </p>
            </div>

            {/* Metric 4 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                <span>Help Requests Resolved</span>
                <HelpCircle className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-3xl font-black text-slate-900 mt-2">
                {metrics.resolved_help_requests_count} / {metrics.resolved_help_requests_count + metrics.open_help_requests_count}
              </p>
              <p className="text-[11px] text-blue-600 font-medium mt-1">
                Care coordinator resolution rate
              </p>
            </div>
          </div>

          {/* Department Breakdown Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
            <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-teal-600" />
              <span>Completion Rate by Oncology Department</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Medical Oncology (Chemotherapy & Labs)</span>
                  <span className="text-emerald-700 font-bold">88% Completion</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Radiation Oncology (Weekly Review & Hydration)</span>
                  <span className="text-teal-700 font-bold">81% Completion</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-600 rounded-full" style={{ width: '81%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Surgical Oncology (Stoma Care & Suture Check)</span>
                  <span className="text-teal-700 font-bold">84% Completion</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-600 rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* PILOT & ROADMAP VIEW (Section 17) */
        /* ========================================================================= */
        <div className="space-y-6">
          {/* Problem vs Intervention */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft space-y-2">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">The Problem</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Follow-up instructions are fragmented across discharge summaries, handwritten slips, and WhatsApp messages. Over 28% of cancer patients fail to complete critical intermediate follow-up investigations before their next doctor review.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft space-y-2">
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">The Intervention</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Convert existing clinician orders into simple, multilingual, trackable follow-up tasks in Telugu, Hindi, and English. Include human-in-the-loop signoff and non-punitive staff attention queues.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h3 className="font-extrabold text-sm text-slate-900">Primary KPI</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Follow-up Completion Rate:</strong> Demonstrating an increase from a historical baseline of <strong>72%</strong> to over <strong>82%</strong> (+10 percentage points) across participating National Cancer Grid regional hospitals.
              </p>
            </div>
          </div>

          {/* 60-90 Day Pilot Phases Roadmap */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-black text-lg text-slate-900">
                  60–90 Day Clinical Deployment Roadmap
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Phased deployment plan designed around existing hospital workflow without disruption.
                </p>
              </div>
              <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                Turnkey Implementation
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Phase 1 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
                  Weeks 1–2
                </span>
                <h4 className="font-extrabold text-sm text-slate-900">
                  Workflow Setup
                </h4>
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  <li>OPD & Daycare EHR mapping</li>
                  <li>Regional language lexicon calibration (Telugu & Hindi)</li>
                  <li>Consent & caregiver authorization protocols</li>
                </ul>
              </div>

              {/* Phase 2 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
                  Weeks 3–4
                </span>
                <h4 className="font-extrabold text-sm text-slate-900">
                  Staff Onboarding
                </h4>
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  <li>Care coordinator queue training</li>
                  <li>Clinician 1-click instruction approval setup</li>
                  <li>Patient enrollment kiosk trials</li>
                </ul>
              </div>

              {/* Phase 3 */}
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-2">
                <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block">
                  Weeks 5–8
                </span>
                <h4 className="font-extrabold text-sm text-slate-900">
                  Active Clinical Pilot
                </h4>
                <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                  <li>200+ cancer follow-up cohort active</li>
                  <li>Daily triage of unconfirmed tasks</li>
                  <li>Caregiver reminder dispatches</li>
                </ul>
              </div>

              {/* Phase 4 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
                  Weeks 9–12
                </span>
                <h4 className="font-extrabold text-sm text-slate-900">
                  Measure Outcomes
                </h4>
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  <li>Evaluate Follow-up Completion Rate</li>
                  <li>Measure reduction in lost-to-follow-up</li>
                  <li>Submit NCG network scalability report</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
