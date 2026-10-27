import React from 'react';
import { FileText, Users, ShieldCheck } from 'lucide-react';

export default function FamilyDependants({ employee, onViewDocument }) {
  return (
    <div className="space-y-8 font-sans text-slate-900">
      <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-2xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight uppercase">
              Family & Dependants Record
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Official records of registered dependants eligible for LTC, Medical & HR benefits
            </p>
          </div>

          <div className="px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">FAMILY PLANNING BENEFIT</span>
            <span className="font-bold text-slate-900">{employee.familyPlanningBenefit}</span>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-bold text-[#1e3a8a] uppercase tracking-widest border-l-2 border-[#1e3a8a] pl-2.5">
            Registered Dependants ({employee.dependants ? employee.dependants.length : 0})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {employee.dependants && employee.dependants.map((dep) => (
              <div key={dep.id} className="p-6 rounded-lg bg-slate-50 border border-slate-200 space-y-5">
                <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{dep.name}</h4>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded bg-blue-50 text-[#1e3a8a] text-xs font-bold border border-blue-200">
                      {dep.relation}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
                    {dep.name.charAt(0)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">GENDER</span>
                    <span className="text-sm font-bold text-slate-900">{dep.gender}</span>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">DATE OF BIRTH</span>
                    <span className="text-sm font-mono font-bold text-slate-900">{dep.dob}</span>
                  </div>
                </div>

                {dep.dobDoc && (
                  <div className="pt-2">
                    <button
                      onClick={() => onViewDocument(dep.dobDoc)}
                      className="w-full px-3 py-2 rounded-md bg-white hover:bg-slate-100 text-[#1e3a8a] font-semibold text-xs inline-flex items-center justify-center gap-2 border border-slate-300 transition-colors cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View Proof Document ({dep.dobDoc.name})</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
