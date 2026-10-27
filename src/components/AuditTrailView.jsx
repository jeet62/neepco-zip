import React from 'react';
import { ShieldCheck, Clock, UserCheck, FileText } from 'lucide-react';

export default function AuditTrailView({ auditLog }) {
  if (!auditLog || auditLog.length === 0) {
    return (
      <div className="enterprise-card p-8 text-center text-slate-500 text-xs">
        No audit log records found for this employee profile.
      </div>
    );
  }

  return (
    <div className="enterprise-card p-8 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Audit Trail & Activity Log</h3>
          <p className="text-xs text-slate-500">Tamper-evident record of all HR updates and administrative modifications</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Vigilance Verified Log</span>
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Date & Time</th>
              <th className="py-3.5 px-4">Updated By (HR Officer)</th>
              <th className="py-3.5 px-4">Station</th>
              <th className="py-3.5 px-4">Field Changed</th>
              <th className="py-3.5 px-4">Previous Value</th>
              <th className="py-3.5 px-4">New Updated Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {auditLog.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-mono font-medium text-slate-600 whitespace-nowrap">{log.timestamp}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">{log.updatedBy}</td>
                <td className="py-3.5 px-4 font-medium text-slate-600">{log.station}</td>
                <td className="py-3.5 px-4 font-bold text-[#007AFF]">{log.field}</td>
                <td className="py-3.5 px-4 text-slate-500 max-w-[200px] truncate">{log.oldValue || 'None'}</td>
                <td className="py-3.5 px-4 font-semibold text-emerald-700 max-w-[200px] truncate">{log.newValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
