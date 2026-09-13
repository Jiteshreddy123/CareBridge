import React from 'react';
import { TaskStatus, AppointmentStatus } from '../../types';
import { CheckCircle2, Clock, Eye, Send, FileEdit, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: TaskStatus | AppointmentStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const isSm = size === 'sm';
  const baseClasses = `inline-flex items-center gap-1.5 font-medium rounded-full ${
    isSm ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-xs'
  }`;

  switch (status) {
    case 'Created':
      return (
        <span className={`${baseClasses} bg-slate-100 text-slate-700 border border-slate-200`}>
          <FileEdit className="w-3.5 h-3.5 text-slate-500" />
          Created
        </span>
      );
    case 'Clinician Approved':
      return (
        <span className={`${baseClasses} bg-teal-50 text-teal-700 border border-teal-200`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
          Clinician Approved
        </span>
      );
    case 'Sent':
      return (
        <span className={`${baseClasses} bg-sky-50 text-sky-700 border border-sky-200`}>
          <Send className="w-3.5 h-3.5 text-sky-600" />
          Sent (Awaiting Conf)
        </span>
      );
    case 'Viewed':
      return (
        <span className={`${baseClasses} bg-indigo-50 text-indigo-700 border border-indigo-200`}>
          <Eye className="w-3.5 h-3.5 text-indigo-600" />
          Viewed
        </span>
      );
    case 'Acknowledged':
      return (
        <span className={`${baseClasses} bg-amber-50 text-amber-800 border border-amber-200`}>
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          Acknowledged
        </span>
      );
    case 'Completed':
      return (
        <span className={`${baseClasses} bg-emerald-50 text-emerald-800 border border-emerald-300 font-semibold`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Completed
        </span>
      );
    case 'Confirmed':
      return (
        <span className={`${baseClasses} bg-emerald-50 text-emerald-800 border border-emerald-300 font-semibold`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Confirmed
        </span>
      );
    case 'Awaiting Confirmation':
      return (
        <span className={`${baseClasses} bg-amber-50 text-amber-800 border border-amber-200`}>
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          Awaiting Conf
        </span>
      );
    case 'Reschedule Requested':
      return (
        <span className={`${baseClasses} bg-orange-50 text-orange-800 border border-orange-200`}>
          <AlertCircle className="w-3.5 h-3.5 text-orange-600" />
          Reschedule Requested
        </span>
      );
    default:
      return (
        <span className={`${baseClasses} bg-slate-100 text-slate-700 border border-slate-200`}>
          {status}
        </span>
      );
  }
};
