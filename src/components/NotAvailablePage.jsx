import React from 'react';
import { Construction, ArrowLeft } from 'lucide-react';

export default function NotAvailablePage({ navTitle, onBackToDirectory }) {
  return (
    <div className="max-w-[1400px] mx-auto p-6 sm:p-10 animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded p-8 sm:p-12 text-center max-w-xl mx-auto shadow-2xs space-y-4">
        
        <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-700">
          <Construction className="w-6 h-6 stroke-[1.5]" />
        </div>

        <div className="space-y-1">
          <h2 className="text-base font-bold text-slate-900">
            {navTitle}
          </h2>
          <p className="text-sm font-semibold text-slate-700">
            Not Available Currently
          </p>
        </div>

        <div className="pt-3">
          <button
            onClick={onBackToDirectory}
            className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded inline-flex items-center space-x-1.5 cursor-pointer shadow-2xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to Employee Directory</span>
          </button>
        </div>

      </div>
    </div>
  );
}
