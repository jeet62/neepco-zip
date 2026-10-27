import React from 'react';
import { X, Printer, Download, Building2 } from 'lucide-react';

export default function OrderDocumentModal({ orderData, orderType, employee, onClose }) {
  if (!orderData || !employee) return null;

  const getTitle = () => {
    switch (orderType) {
      case 'promotion': return 'OFFICIAL PROMOTION ORDER';
      case 'placement': return 'OFFICIAL TRANSFER & PLACEMENT ORDER';
      case 'training': return 'OFFICIAL TRAINING DEPUTATION SANCTION ORDER';
      default: return 'OFFICIAL SYSTEM GENERATED ORDER';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="no-print p-4 bg-slate-900 text-white flex items-center justify-between">
          <span className="text-xs font-bold tracking-wider uppercase flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#007AFF]" />
            Official Letterhead Document Preview
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-1.5 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Order</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="print-container p-8 sm:p-10 text-slate-900 space-y-6 max-h-[80vh] overflow-y-auto bg-white">
          <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <img src="/neepco_logo.png" alt="NEEPCO Emblem" className="w-16 h-16 object-contain" />
            </div>
            <h1 className="text-lg font-black tracking-wide text-slate-900 uppercase">
              NORTH EASTERN ELECTRIC POWER CORPORATION LIMITED
            </h1>
            <p className="text-xs font-semibold text-slate-700">
              (A Government of India Enterprise)
            </p>
            <p className="text-[11px] text-slate-600">
              Brookland Compound, Lower New Colony, Shillong - 793003, Meghalaya
            </p>
            <p className="text-[10px] font-mono text-slate-500 pt-1">
              CIN: U40101ML1976GOI001658 • Website: www.neepco.co.in
            </p>
          </div>

          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-800">
            <span>Ref No: {orderData.orderNo || 'NEEPCO/HR/ORD/2026/902'}</span>
            <span>Date: {orderData.orderDate || new Date().toLocaleDateString()}</span>
          </div>

          <div className="text-center py-2 bg-slate-100 rounded-lg">
            <h2 className="text-sm font-black text-slate-900 tracking-wider">
              {getTitle()}
            </h2>
          </div>

          <div className="text-xs leading-relaxed space-y-3 font-medium text-slate-800">
            <p>
              In pursuance of the approval of the Competent Authority, NEEPCO Corporate Management hereby issues the official system order in respect of:
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 font-mono">
              <p><strong>Employee Name:</strong> {employee.name}</p>
              <p><strong>Employee ID Number:</strong> {employee.empNo}</p>
              <p><strong>Current Designation:</strong> {employee.designation}</p>
              <p><strong>Primary Posting:</strong> {employee.locationName}</p>
            </div>

            {orderType === 'promotion' && (
              <div className="space-y-1.5 pt-2">
                <p><strong>1. Promoted Designation / Grade:</strong> {orderData.toGrade}</p>
                <p><strong>2. Former Designation / Grade:</strong> {orderData.fromGrade}</p>
                <p><strong>3. Effective Date of Promotion:</strong> {orderData.effectiveDate}</p>
                <p><strong>4. Sanctioning Authority:</strong> {orderData.sanctionedBy}</p>
              </div>
            )}

            {orderType === 'placement' && (
              <div className="space-y-1.5 pt-2">
                <p><strong>1. Transferred Posting Station:</strong> {orderData.postingStation}</p>
                <p><strong>2. Department / Wing:</strong> {orderData.department}</p>
                <p><strong>3. Specialized Skill Area:</strong> {orderData.specializedSkillArea}</p>
                <p><strong>4. Skill Sub-Area Breakdown:</strong> {orderData.specializedSkillSubArea}</p>
                <p><strong>5. Reporting Officer:</strong> {orderData.reportingOfficer}</p>
              </div>
            )}

            {orderType === 'training' && (
              <div className="space-y-1.5 pt-2">
                <p><strong>1. Training Course Title:</strong> {orderData.courseTitle}</p>
                <p><strong>2. Training Category:</strong> {orderData.type}</p>
                <p><strong>3. Organizing Institution:</strong> {orderData.institution}</p>
                <p><strong>4. Venue & Location:</strong> {orderData.location}</p>
                <p><strong>5. Sanctioned Duration:</strong> {orderData.duration}</p>
              </div>
            )}

            <p className="pt-3">
              The employee is advised to report to the concerned office as stipulated above. This order has been recorded in the digital Service Book and Audit Trail of the Corporation.
            </p>
          </div>

          <div className="pt-10 flex items-end justify-between text-xs">
            <div className="text-slate-500 space-y-1">
              <p>Copy to:</p>
              <p>1. Executive Director (HR)</p>
              <p>2. General Manager (Finance)</p>
              <p>3. Personal Service Book File</p>
            </div>

            <div className="text-right space-y-1">
              <div className="w-32 h-10 border-b border-[#007AFF] border-dashed mb-1 ml-auto flex items-center justify-center text-[10px] text-[#007AFF] font-mono">
                [Digital HR Seal]
              </div>
              <p className="font-bold text-slate-900">For NEEPCO HR Management</p>
              <p className="text-slate-600">Shillong Headquarters</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
