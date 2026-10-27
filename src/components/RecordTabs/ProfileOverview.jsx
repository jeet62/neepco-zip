import React, { useState } from 'react';
import { Eye, EyeOff, FileText, Download } from 'lucide-react';

export default function ProfileOverview({ employee, onViewDocument }) {
  const [showAadhaar, setShowAadhaar] = useState(false);

  const maskedAadhaar = employee.aadharNo 
    ? `•••• •••• ${employee.aadharNo.slice(-4)}`
    : '•••• •••• ••••';

  return (
    <div className="space-y-8 font-sans text-slate-900">
      <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-2xs space-y-7">
        
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight border-b border-slate-200 pb-3 uppercase">
            Personal Information
          </h2>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-bold text-[#1e3a8a] uppercase tracking-widest border-l-2 border-[#1e3a8a] pl-2.5">
            Basic Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-12">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">FULL LEGAL NAME</span>
              <span className="text-base sm:text-lg font-bold text-slate-900">{employee.name}</span>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">EMPLOYEE NUMBER</span>
              <span className="text-base sm:text-lg font-mono font-bold text-slate-900">{employee.empNo}</span>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">DATE OF BIRTH</span>
              <div className="flex items-center space-x-3">
                <span className="text-base font-mono font-bold text-slate-900">{employee.dob}</span>
                {employee.dobDoc && (
                  <button
                    onClick={() => onViewDocument(employee.dobDoc)}
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-[#1e3a8a] font-semibold text-xs inline-flex items-center gap-1.5 border border-slate-300 transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Proof</span>
                  </button>
                )}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">GENDER</span>
              <span className="text-base font-bold text-slate-900">{employee.gender || 'Male'}</span>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">NEEPCO JOINING DATE</span>
              <div className="flex items-center space-x-3">
                <span className="text-base font-mono font-bold text-slate-900">{employee.joiningDate}</span>
                {employee.appointmentDoc && (
                  <button
                    onClick={() => onViewDocument(employee.appointmentDoc)}
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-[#1e3a8a] font-semibold text-xs inline-flex items-center gap-1.5 border border-slate-300 transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Appointment Letter</span>
                  </button>
                )}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">DESIGNATION & GRADE</span>
              <span className="text-base font-bold text-slate-900">{employee.designation}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-4 border-t border-slate-200/80">
          <h3 className="text-xs font-bold text-[#1e3a8a] uppercase tracking-widest border-l-2 border-[#1e3a8a] pl-2.5">
            Contact Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-12">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">OFFICIAL EMAIL</span>
              <span className="text-base font-semibold text-slate-900">{employee.email}</span>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">OFFICIAL PHONE</span>
              <span className="text-base font-mono font-bold text-slate-900">{employee.phone}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-4 border-t border-slate-200/80">
          <h3 className="text-xs font-bold text-[#1e3a8a] uppercase tracking-widest border-l-2 border-[#1e3a8a] pl-2.5">
            Addresses
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">PERMANENT ADDRESS</span>
                {employee.permanentAddressDoc && (
                  <button
                    onClick={() => onViewDocument(employee.permanentAddressDoc)}
                    className="px-2.5 py-1 rounded-md bg-white hover:bg-slate-100 text-[#1e3a8a] font-semibold text-xs inline-flex items-center gap-1.5 border border-slate-300 transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Domicile Proof</span>
                  </button>
                )}
              </div>
              <p className="text-sm text-slate-900 font-semibold leading-relaxed">
                {employee.permanentAddress}
              </p>
            </div>

            <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">PRESENT RESIDENTIAL ADDRESS</span>
                {employee.presentAddressDoc && (
                  <button
                    onClick={() => onViewDocument(employee.presentAddressDoc)}
                    className="px-2.5 py-1 rounded-md bg-white hover:bg-slate-100 text-[#1e3a8a] font-semibold text-xs inline-flex items-center gap-1.5 border border-slate-300 transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Allotment Order</span>
                  </button>
                )}
              </div>
              <p className="text-sm text-slate-900 font-semibold leading-relaxed">
                {employee.presentAddress}
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-2xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight border-b border-slate-200 pb-3 uppercase">
            Identification & Statutory Information
          </h2>
        </div>

        <div className="space-y-6">
          <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">AADHAAR NUMBER</span>
              <div className="flex items-center space-x-3">
                <span className="text-lg font-mono font-bold text-slate-900">
                  {showAadhaar ? employee.aadharNo : maskedAadhaar}
                </span>
                <button
                  onClick={() => setShowAadhaar(!showAadhaar)}
                  className="px-2.5 py-1 rounded-md bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs inline-flex items-center gap-1.5 border border-slate-300 transition-colors cursor-pointer"
                >
                  {showAadhaar ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showAadhaar ? 'Hide' : 'Reveal'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-500 font-medium">Verified Official National Identity Record</p>
            </div>

            {employee.aadharDoc && (
              <button
                onClick={() => onViewDocument(employee.aadharDoc)}
                className="px-4 py-2 rounded-lg bg-[#1e3a8a] hover:bg-[#172554] text-white font-semibold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer shadow-none self-start md:self-auto"
              >
                <FileText className="w-4 h-4" />
                <span>View Aadhaar Copy</span>
              </button>
            )}
          </div>

          <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">PAN (PERMANENT ACCOUNT NUMBER)</span>
              <span className="text-lg font-mono font-bold text-slate-900">{employee.panNo}</span>
              <p className="text-xs text-slate-500 font-medium">Income Tax Department Verified</p>
            </div>

            {employee.panDoc && (
              <button
                onClick={() => onViewDocument(employee.panDoc)}
                className="px-4 py-2 rounded-lg bg-[#1e3a8a] hover:bg-[#172554] text-white font-semibold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer shadow-none self-start md:self-auto"
              >
                <FileText className="w-4 h-4" />
                <span>View PAN Copy</span>
              </button>
            )}
          </div>

          <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">CASTE & CATEGORY</span>
              <span className="text-base font-bold text-slate-900 block">{employee.caste}</span>
              <p className="text-xs text-slate-600 font-medium">{employee.casteBenefitTaken}</p>
            </div>

            {employee.casteDoc && (
              <button
                onClick={() => onViewDocument(employee.casteDoc)}
                className="px-4 py-2 rounded-lg bg-[#1e3a8a] hover:bg-[#172554] text-white font-semibold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer shadow-none self-start md:self-auto"
              >
                <FileText className="w-4 h-4" />
                <span>View Caste Certificate</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
