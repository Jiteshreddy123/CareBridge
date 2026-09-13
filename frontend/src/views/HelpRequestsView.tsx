import React, { useState } from 'react';
import { useCareBridge } from '../context/CareBridgeContext';
import {
  HelpCircle, CheckCircle2, PhoneCall, MessageSquare, Clock,
  Filter, Check, User
} from 'lucide-react';

export const HelpRequestsView: React.FC = () => {
  const { helpRequests, resolveHelpRequest, patients } = useCareBridge();
  const [selectedReqId, setSelectedReqId] = useState<string | null>(null);
  const [resolutionText, setResolutionText] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [toast, setToast] = useState<string | null>(null);

  const filteredRequests = helpRequests.filter(req => {
    if (filterStatus === 'all') return true;
    return req.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const handleResolveSubmit = (reqId: string) => {
    resolveHelpRequest(reqId, resolutionText || "Contacted patient and coordinated hospital transit assistance.");
    setSelectedReqId(null);
    setResolutionText('');
    setToast("✓ Help request marked resolved and recorded in audit log.");
    setTimeout(() => setToast(null), 3000);
  };

  const handleCallPatient = (phone: string, name: string) => {
    setToast(`Connecting call to ${name} (${phone})...`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {toast && (
        <div className="fixed top-16 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-teal-500 flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Patient Help Requests
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
              Operational Inquiries ({helpRequests.length})
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Structured operational requests submitted by patients and caregivers encountering obstacles.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 outline-none"
          >
            <option value="all">All Request Statuses</option>
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Help Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRequests.map((req) => {
          const patient = patients.find(p => p.id === req.patient_id);
          const isResolved = req.status === 'Resolved';

          return (
            <div
              key={req.id}
              className={`bg-white rounded-2xl p-5 border shadow-soft space-y-3 transition ${
                isResolved ? 'border-slate-200 opacity-80' : 'border-rose-200 hover:border-rose-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      {req.patient_name}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="font-mono font-semibold">{req.patient_id}</span>
                      <span>•</span>
                      <span>Language: <strong className="uppercase text-teal-700">{req.language}</strong></span>
                    </div>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    isResolved
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {req.status}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Reported Difficulty:
                </span>
                <p className="text-xs font-bold text-rose-950">
                  {req.reason}
                </p>
                {req.details && (
                  <p className="text-xs text-slate-600 mt-1 italic">
                    "{req.details}"
                  </p>
                )}
                <span className="text-[10px] text-slate-400 block pt-1">
                  Submitted: {req.created_at}
                </span>
              </div>

              {isResolved && req.resolution_notes && (
                <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 text-xs text-emerald-900 space-y-0.5">
                  <span className="font-bold block text-[10px] text-emerald-800 uppercase">
                    Resolution Note ({req.handled_by || "Care Staff"}):
                  </span>
                  <p>{req.resolution_notes}</p>
                </div>
              )}

              {/* Action Buttons */}
              {!isResolved && (
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  {selectedReqId === req.id ? (
                    <div className="space-y-2">
                      <textarea
                        rows={2}
                        value={resolutionText}
                        onChange={(e) => setResolutionText(e.target.value)}
                        placeholder="Document resolution action taken..."
                        className="w-full text-xs p-2.5 border border-teal-300 rounded-xl outline-none"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setSelectedReqId(null)}
                          className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleResolveSubmit(req.id)}
                          className="px-4 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition"
                        >
                          Save Resolution
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => patient && handleCallPatient(patient.phone, req.patient_name)}
                        className="py-1.5 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
                        <span>Contact Patient</span>
                      </button>
                      <button
                        onClick={() => setSelectedReqId(req.id)}
                        className="py-1.5 px-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Resolve Request</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
