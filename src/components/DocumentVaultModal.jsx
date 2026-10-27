import React, { useState } from 'react';
import { X, FileText, Download, Search } from 'lucide-react';

export default function DocumentVaultModal({ isOpen, onClose, employee, onViewDocument }) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen || !employee) return null;

  const categories = [
    {
      name: "Service & Appointment Records",
      docs: [
        employee.appointmentDoc || { name: "NEEPCO Appointment Letter Ref: NEEPCO/HR/REC/2006/884", category: "Appointment", id: "DOC-APPT-1024", size: "2.2 MB", status: "Verified" }
      ]
    },
    {
      name: "Identity & Statutory Documents",
      docs: [
        employee.aadharDoc || { name: "Aadhaar Card Copy (Verified)", category: "Identity", id: "DOC-AADHAR-1024", size: "850 KB", status: "Verified" },
        employee.panDoc || { name: "PAN Card Copy", category: "Taxation", id: "DOC-PAN-1024", size: "620 KB", status: "Verified" },
        employee.casteDoc || { name: "Central OBC Certificate (Meghalaya Govt)", category: "Category Proof", id: "DOC-CASTE-1024", size: "1.1 MB", status: "Verified" }
      ]
    },
    {
      name: "Personal & Establishment Documents",
      docs: [
        employee.permanentAddressDoc || { name: "Domicile & Permanent Residence Certificate", category: "Address Proof", id: "DOC-PRM-1024", size: "1.8 MB", status: "Verified" },
        employee.presentAddressDoc || { name: "Quarter Allocation Order & Utility Bill", category: "Quarters Allotment", id: "DOC-PRS-1024", size: "1.3 MB", status: "Verified" },
        employee.dobDoc || { name: "Birth Certificate & Class 10 Admit Card", category: "Age Proof", id: "DOC-DOB-1024", size: "1.4 MB", status: "Verified" }
      ]
    }
  ];

  const filteredCategories = categories.map(cat => {
    const matchedDocs = cat.docs.filter(doc => 
      !searchQuery.trim() || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      doc.id.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
    return { ...cat, docs: matchedDocs };
  }).filter(cat => cat.docs.length > 0);

  const totalDocsCount = categories.reduce((acc, cat) => acc + cat.docs.length, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-[960px] max-h-[85vh] bg-white rounded-xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 font-sans text-slate-900">
        
        <div className="p-6 border-b border-slate-300 bg-white flex items-start justify-between shrink-0">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Employee Documents
            </h2>
            <p className="text-xs font-semibold text-slate-800">
              {employee.name} · Employee No. {employee.empNo}
            </p>
            <p className="text-xs text-slate-600 font-medium">
              Service Record Documents
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-3 bg-slate-100 border-b border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shrink-0">
          <span className="text-slate-700 font-semibold">
            {totalDocsCount} documents · Last updated 14 August 2026
          </span>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents..."
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 pl-8 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {filteredCategories.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 font-medium">
              No matching documents found in employee record register.
            </div>
          ) : (
            filteredCategories.map((cat, catIdx) => (
              <div key={catIdx} className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1.5">
                  {cat.name}
                </h3>

                <div className="divide-y divide-slate-200 border-t border-b border-slate-300">
                  {cat.docs.map((doc, docIdx) => (
                    <div key={docIdx} className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50 px-2 transition-colors">
                      
                      <div className="flex items-start space-x-3 overflow-hidden">
                        <FileText className="w-4 h-4 text-slate-800 mt-0.5 shrink-0 stroke-[1.75]" />
                        <div className="space-y-0.5 truncate">
                          <p className="text-sm font-bold text-slate-900 truncate">
                            {doc.name}
                          </p>
                          <div className="flex items-center space-x-3 text-xs text-slate-600 font-medium">
                            <span className="font-mono">Ref #{doc.id}</span>
                            <span>•</span>
                            <span>{doc.size || '1.5 MB'}</span>
                            {doc.status && (
                              <>
                                <span>•</span>
                                <span className="text-slate-900 font-bold flex items-center gap-1">
                                  <span>✓</span> Verified
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 shrink-0">
                        <button
                          onClick={() => { onClose(); onViewDocument(doc); }}
                          className="text-xs text-slate-900 hover:text-black font-bold underline cursor-pointer"
                        >
                          View
                        </button>

                        <button
                          onClick={() => alert(`Downloading official document ${doc.name}...`)}
                          className="p-1.5 rounded border border-slate-400 text-slate-800 hover:text-black hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Download Document"
                        >
                          <Download className="w-3.5 h-3.5 stroke-[1.75]" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 bg-slate-100 border-t border-slate-300 text-xs text-slate-700 flex items-center justify-between shrink-0 font-medium">
          <span>Confidential NEEPCO Personnel Record · Authorized Access Only</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-black text-white font-bold transition-colors cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
