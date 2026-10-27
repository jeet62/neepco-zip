import React from 'react';
import { Printer, MapPin, TrendingUp, Building, Globe, FileText, ArrowDown } from 'lucide-react';

export default function ServiceOrders({ employee, onGenerateOrder }) {
  return (
    <div className="space-y-8 font-sans text-slate-900">
      
      {/* Chronological Service History Timeline */}
      <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-2xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
            Service History Timeline
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Chronological career progression from entry into NEEPCO service to current posting
          </p>
        </div>

        <div className="relative pl-6 space-y-8 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-300">
          {employee.timeline && employee.timeline.map((item, idx) => (
            <div key={item.id || idx} className="relative group">
              <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-white border-2 border-[#1e3a8a] flex items-center justify-center text-[#1e3a8a] font-bold text-xs shadow-xs">
                •
              </div>

              <div className="p-6 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-500">{item.date}</span>
                  <span className="px-2.5 py-0.5 rounded bg-blue-50 text-[#1e3a8a] text-xs font-bold border border-blue-200">
                    {item.type}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-700 font-medium">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promotion History Section */}
      <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-2xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
            Promotion Sanction Orders
          </h2>
        </div>

        <div className="space-y-4">
          {employee.promotionHistory.map((prom, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono font-bold text-[#1e3a8a]">{prom.orderNo}</span>
                  <span className="text-xs text-slate-500 font-medium">({prom.orderDate})</span>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  <span className="text-slate-500">{prom.fromGrade}</span> → <span className="text-[#1e3a8a]">{prom.toGrade}</span>
                </h3>

                <p className="text-xs text-slate-600 font-medium">
                  Sanctioned By: <strong>{prom.sanctionedBy}</strong> · Effective Date: <strong>{prom.effectiveDate}</strong>
                </p>
              </div>

              <button
                onClick={() => onGenerateOrder(prom, 'promotion')}
                className="px-4 py-2.5 rounded-lg bg-[#1e3a8a] hover:bg-[#172554] text-white font-semibold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer shadow-none self-start md:self-auto"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Order</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Transfer & Posting History Section */}
      <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-2xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
            Posting & Transfer Records
          </h2>
        </div>

        <div className="space-y-4">
          {employee.placementHistory.map((place, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono font-bold text-[#1e3a8a]">{place.orderNo}</span>
                  <span className="text-xs font-semibold text-slate-500">{place.duration}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{place.postingStation}</h3>
                <p className="text-xs text-slate-700 font-semibold">{place.specializedSkillArea}</p>
                <p className="text-xs text-slate-500 font-medium">{place.specializedSkillSubArea}</p>
              </div>

              <button
                onClick={() => onGenerateOrder(place, 'placement')}
                className="px-4 py-2.5 rounded-lg bg-[#1e3a8a] hover:bg-[#172554] text-white font-semibold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer shadow-none self-start md:self-auto"
              >
                <Printer className="w-4 h-4" />
                <span>Print Transfer Order</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Training Deputation Section */}
      <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-2xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
            Training Deputation Sanctions
          </h2>
        </div>

        <div className="space-y-4">
          {employee.trainingHistory.map((trg, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono font-bold text-[#1e3a8a]">{trg.orderNo}</span>
                  <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
                    {trg.type}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{trg.courseTitle}</h3>
                <p className="text-xs text-slate-700 font-semibold">{trg.institution} ({trg.location})</p>
                <p className="text-xs text-slate-500 font-medium">Duration: {trg.duration} · Status: {trg.status}</p>
              </div>

              <button
                onClick={() => onGenerateOrder(trg, 'training')}
                className="px-4 py-2.5 rounded-lg bg-[#1e3a8a] hover:bg-[#172554] text-white font-semibold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer shadow-none self-start md:self-auto"
              >
                <Printer className="w-4 h-4" />
                <span>Print Sanction Order</span>
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
