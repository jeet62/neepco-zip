import React from 'react';
import { X, FileText, Download, Printer } from 'lucide-react';

export default function DocumentModal({ doc, isOpen, onClose }) {
  if (!isOpen || !doc) return null;

  const isAvailable = doc && doc.name;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 font-sans text-slate-900">
        
        <div className="p-5 border-b border-slate-300 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-slate-700 stroke-[1.75] shrink-0" />
            <div>
              <h3 className="text-base font-bold tracking-tight text-slate-900 leading-none">
                {doc.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-none mt-1">
                Official Statutory HR Document
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-200/70 flex items-center justify-center min-h-[420px]">
          {!isAvailable ? (
            <div className="p-8 bg-white rounded-lg border border-slate-300 text-center max-w-md space-y-2">
              <h4 className="text-sm font-bold text-slate-900">Document unavailable</h4>
              <p className="text-xs text-slate-500">The document has not been uploaded for this employee record.</p>
            </div>
          ) : (
            <div className="w-full max-w-[760px] bg-white border border-slate-300 shadow-md p-8 sm:p-12 space-y-6 text-slate-900 text-left rounded-xs">
              
              <div className="flex items-center justify-between border-b border-slate-300 pb-4">
                <div className="flex items-center space-x-3">
                  <img src="/neepco_logo.png" alt="NEEPCO Logo" className="w-10 h-10 object-contain" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-none uppercase">
                      North Eastern Electric Power Corporation Ltd.
                    </h4>
                    <p className="text-[11px] text-slate-600 font-medium leading-none mt-1">
                      (A Government of India Enterprise) • Corporate Office, Shillong
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-slate-500">
                  OFFICIAL RECORD COPY
                </span>
              </div>

              <div className="space-y-4 pt-2">
                <div className="text-center space-y-1 py-2 bg-slate-50 border border-slate-200 rounded">
                  <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-600">
                    Personnel Document Record • NEEPCO Employee Service Book
                  </p>
                </div>

                <div className="text-xs text-slate-800 space-y-3 leading-relaxed pt-2">
                  <p className="font-semibold text-slate-900">
                    Subject: Verified Copy attached to Personnel Service Record File.
                  </p>
                  
                  <p className="text-slate-700">
                    This document certifies that the attached copy of <strong className="text-slate-900">{doc.name}</strong> has been verified against official physical records maintained by the Personnel & Administration Department of North Eastern Electric Power Corporation Limited.
                  </p>

                  <div className="grid grid-cols-2 gap-4 p-3 bg-slate-50 border border-slate-200 rounded font-mono text-[11px]">
                    <div>
                      <span className="text-slate-500 block">DOCUMENT NAME:</span>
                      <span className="font-bold text-slate-900">{doc.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">RECORD STATUS:</span>
                      <span className="font-bold text-emerald-700">Verified & Archived</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">FILE FORMAT:</span>
                      <span className="font-bold text-slate-900">Digital PDF Copy</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">HEADQUARTERS:</span>
                      <span className="font-bold text-slate-900">Brookland Compound, Shillong</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-300 flex items-end justify-between text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">VERIFIED BY</span>
                  <p className="font-bold text-slate-900">Senior Manager (HR / Records)</p>
                  <p className="text-[11px] text-slate-600">NEEPCO Corporate Office, Shillong</p>
                </div>

                <div className="w-24 h-24 border-2 border-dashed border-slate-300 rounded-full flex flex-col items-center justify-center text-center p-1 text-[9px] font-bold text-slate-500 select-none">
                  <span>NEEPCO HR</span>
                  <span>RECORD SEAL</span>
                  <span className="text-[8px] font-mono mt-0.5">SHILLONG</span>
                </div>
              </div>

            </div>
          )}
        </div>

        <div className="px-6 py-3.5 bg-white border-t border-slate-300 flex items-center justify-end space-x-3 text-xs">
          <button 
            onClick={() => window.print()}
            className="px-4 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Print</span>
          </button>

          <button 
            onClick={() => alert(`Downloading document ${doc.name}...`)}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>Download</span>
          </button>
        </div>

      </div>
    </div>
  );
}
