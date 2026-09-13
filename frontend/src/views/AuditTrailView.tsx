import React, { useState } from 'react';
import { useCareBridge } from '../context/CareBridgeContext';
import {
  FileText, ShieldCheck, User, Sparkles, Send, CheckCircle2,
  Clock, Filter, Search, Shield
} from 'lucide-react';

export const AuditTrailView: React.FC = () => {
  const { auditLogs, patients } = useCareBridge();
  const [selectedPatientFilter, setSelectedPatientFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredLogs = auditLogs.filter(log => {
    const matchesPatient = selectedPatientFilter === 'all' || log.patient_id === selectedPatientFilter;
    const matchesQuery =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.patient_id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPatient && matchesQuery;
  });

  const getActionIcon = (action: string) => {
    const actLower = action.toLowerCase();
    if (actLower.includes("create")) return <FileText className="w-4 h-4 text-slate-600" />;
    if (actLower.includes("ai") || actLower.includes("draft")) return <Sparkles className="w-4 h-4 text-amber-500" />;
    if (actLower.includes("approve")) return <ShieldCheck className="w-4 h-4 text-teal-600" />;
    if (actLower.includes("dispatch") || actLower.includes("sent")) return <Send className="w-4 h-4 text-sky-600" />;
    if (actLower.includes("completed")) return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    return <Clock className="w-4 h-4 text-slate-500" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Clinical & Patient Action Audit Trail
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
              Immutable Log ({auditLogs.length})
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Forensic compliance timeline logging every doctor order, AI draft, human signoff, and patient acknowledgement.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search audit trail..."
              className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl outline-none"
            />
          </div>

          <select
            value={selectedPatientFilter}
            onChange={(e) => setSelectedPatientFilter(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-1.5 outline-none font-medium text-slate-700"
          >
            <option value="all">All Patients</option>
            {patients.slice(0, 10).map((p) => (
              <option key={p.id} value={p.id}>
                {p.id} — {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Audit Log Timeline */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6">
        <div className="space-y-6">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log, index) => (
              <div key={log.id} className="relative flex items-start gap-4">
                {/* Vertical connecting line */}
                {index < filteredLogs.length - 1 && (
                  <div className="absolute left-4 top-9 -bottom-6 w-0.5 bg-slate-200" />
                )}

                {/* Icon bubble */}
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0 z-10 shadow-xs">
                  {getActionIcon(log.action)}
                </div>

                {/* Event Details */}
                <div className="flex-1 bg-slate-50/70 hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-4 transition space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        {log.action}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-teal-50 text-teal-800 border border-teal-200">
                        {log.patient_id}
                      </span>
                      {log.language && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-slate-200 text-slate-700 uppercase">
                          {log.language}
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] font-semibold text-slate-500">
                      {log.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium">
                    {log.details}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                    <span>Actor: <strong>{log.actor}</strong></span>
                    <span>•</span>
                    <span>Role: {log.role}</span>
                    <span>•</span>
                    <span className="font-mono text-[10px]">ID: {log.id}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 py-12 text-center">No logs match the filter.</p>
          )}
        </div>
      </div>
    </div>
  );
};
