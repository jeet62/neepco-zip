import React from 'react';
import { ShieldCheck, FileCheck, CheckCircle2, Building2 } from 'lucide-react';

export default function ComplianceReporting({ employee }) {
  return (
    <div className="space-y-8 font-sans text-slate-900">
      
      {/* Present Administrative Posting & Reporting Authority */}
      <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-2xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
            Present Administrative Posting & Reporting Authority
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-12">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">CURRENT POSTING STATION</span>
            <span className="text-base font-bold text-slate-900">{employee.presentPosting.station}</span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">WING / DEPARTMENT</span>
            <span className="text-base font-bold text-[#1e3a8a]">{employee.presentPosting.department}</span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">SECTION / CELL</span>
            <span className="text-base font-bold text-slate-900">{employee.presentPosting.section}</span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">DATE OF JOINING PRESENT POSTING</span>
            <span className="text-base font-mono font-bold text-slate-900">{employee.presentPosting.dateOfJoinCurrentPosting}</span>
          </div>

          <div className="md:col-span-2 p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">REPORTING & APPRASIAL OFFICER</span>
            <p className="text-base font-bold text-slate-900">{employee.presentPosting.reportingOfficerName}</p>
            <p className="text-xs font-semibold text-slate-600">{employee.presentPosting.reportingOfficerDesignation}</p>
          </div>
        </div>
      </div>

      {/* APAR Ratings Section */}
      <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-2xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
            Annual Performance Appraisal Report (APAR) Ratings
          </h2>
        </div>

        <div className="space-y-4">
          {employee.aparRatings.map((apar, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono font-bold text-[#1e3a8a]">FY {apar.year}</span>
                <span className="px-3 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs">
                  {apar.grade} ({apar.score})
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                Reporting Officer Remarks: <strong>"{apar.remark}"</strong>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Property Return (IPR) Submittals */}
      <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-2xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
            Immovable Property Return (IPR) Declarations
          </h2>
        </div>

        <div className="space-y-4">
          {employee.propertyReturns.map((ipr, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono font-bold text-slate-900">{ipr.year}</span>
                <span className="px-3 py-1 rounded bg-blue-50 text-[#1e3a8a] border border-blue-200 font-mono font-bold text-xs">
                  Ack #{ipr.ackNo}
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium">Declaration Details: <strong>{ipr.details}</strong></p>
              <p className="text-xs text-slate-500 font-mono">Submitted on {ipr.submittedDate} · Status: <strong>{ipr.status}</strong></p>
            </div>
          ))}
        </div>
      </div>

      {/* Vigilance, Disciplinary & Legal Clearances */}
      <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-2xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
            Vigilance & Disciplinary Clearances
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">DISCIPLINARY PROCEEDINGS</span>
            <span className="px-3 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs inline-block">
              {employee.disciplinaryCases.status}
            </span>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">{employee.disciplinaryCases.details}</p>
          </div>

          <div className="p-6 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">COURT & VIGILANCE CLEARANCE</span>
            <span className="px-3 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs inline-block">
              {employee.ipcCases.status}
            </span>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">{employee.ipcCases.details}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
