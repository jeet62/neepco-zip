import React from 'react';
import { Calendar, MapPin, TrendingUp, Globe, FileText, CheckCircle2, Building } from 'lucide-react';

export default function TimelineView({ timeline }) {
  if (!timeline || timeline.length === 0) {
    return (
      <div className="enterprise-card p-8 text-center text-slate-500 text-xs">
        No timeline events recorded yet.
      </div>
    );
  }

  const getIcon = (type) => {
    switch (type) {
      case 'Promotion': return <TrendingUp className="w-4 h-4 text-[#007AFF] stroke-[1.5]" />;
      case 'Transfer': return <MapPin className="w-4 h-4 text-emerald-600 stroke-[1.5]" />;
      case 'Training': return <Globe className="w-4 h-4 text-purple-600 stroke-[1.5]" />;
      case 'Joining': return <Building className="w-4 h-4 text-blue-600 stroke-[1.5]" />;
      default: return <FileText className="w-4 h-4 text-slate-600 stroke-[1.5]" />;
    }
  };

  return (
    <div className="enterprise-card p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Official Service Book Timeline</h3>
          <p className="text-xs text-slate-500">Automatically generated chronological career progression log</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-blue-50 text-[#007AFF] text-xs font-semibold border border-blue-100">
          Auto-Generated Timeline
        </span>
      </div>

      <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {timeline.map((item) => (
          <div key={item.id} className="relative group">
            <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-white border-2 border-[#007AFF] flex items-center justify-center shadow-xs">
              {getIcon(item.type)}
            </div>

            <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-[#007AFF]/40 hover:shadow-xs transition-all space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#007AFF]">{item.type}</span>
                <span className="text-[11px] font-mono text-slate-500">{item.date}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-600">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
