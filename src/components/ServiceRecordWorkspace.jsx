import React, { useState } from 'react';
import { Printer, Download, Plus } from 'lucide-react';
import { updateEmployeeRecord } from '../data/employeesData';

export default function ServiceRecordWorkspace({ 
  employee, 
  userRole, 
  adminUser, 
  onViewDocument, 
  onGenerateOrder 
}) {
  const isHRAdmin = userRole === 'admin' || userRole === 'superadmin' || userRole === 'hr_admin';
  const [showAadhaar, setShowAadhaar] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...employee });
  const [saveToast, setSaveToast] = useState('');

  const currentEmp = editMode ? formData : (employee || {});

  const maskedAadhaar = currentEmp.aadharNo 
    ? `•••• •••• ${currentEmp.aadharNo.slice(-4)}`
    : '•••• •••• ••••';

  const handleSave = async () => {
    if (adminUser) {
      await updateEmployeeRecord(currentEmp.empNo, formData, adminUser);
    }
    setEditMode(false);
    setSaveToast('✓ Employee Service Record saved to SQLite DB!');
    setTimeout(() => setSaveToast(''), 4000);
  };

  const handleAddDependant = () => {
    const newDep = {
      id: `DEP-${Date.now()}`,
      name: "New Registered Dependant",
      relation: "Child",
      gender: "Male",
      dob: "01-01-2015",
      dobDoc: { name: "Dependant Birth Certificate", id: `DOC-DEP-${Date.now()}`, size: "950 KB" }
    };
    setFormData({
      ...formData,
      dependants: [...(formData.dependants || []), newDep]
    });
  };

  return (
    <div className="w-full space-y-7 pb-12 font-sans text-slate-900 animate-fade-in">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {isHRAdmin ? `Service Record File: ${currentEmp.name}` : 'My Employee Service Record'}
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Official personnel record for {currentEmp.name} · Employee No. {currentEmp.empNo} ({currentEmp.locationName})
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start sm:self-auto">
          {isHRAdmin ? (
            !editMode ? (
              <button
                onClick={() => { setFormData({ ...employee }); setEditMode(true); }}
                className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Edit Record
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSave}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Save Record
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )
          ) : null}

          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Print</span>
          </button>

          <button
            onClick={() => alert(`Downloading official Service Record PDF for ${currentEmp.name}...`)}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {saveToast && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 animate-in fade-in">
          {saveToast}
        </div>
      )}

      <section id="section-identity" className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-2">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Full Legal Name
            </label>
            {editMode ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none"
              />
            ) : (
              <div className="w-full bg-[#FAFBFD] border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-bold text-slate-900">
                {currentEmp.name}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Employee Number
            </label>
            <div className="w-full bg-[#FAFBFD] border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-mono font-bold text-slate-900">
              {currentEmp.empNo}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Designation
            </label>
            {editMode ? (
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none"
              />
            ) : (
              <div className="w-full bg-[#FAFBFD] border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-900">
                {currentEmp.designation}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Date of Birth
            </label>
            <div className="w-full bg-[#FAFBFD] border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-mono font-semibold text-slate-900 flex items-center justify-between">
              <span>{currentEmp.dob}</span>
              {currentEmp.dobDoc && (
                <button
                  onClick={() => onViewDocument(currentEmp.dobDoc)}
                  className="text-[11px] text-slate-600 hover:text-slate-900 underline font-medium cursor-pointer"
                >
                  View Proof
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Gender
            </label>
            <div className="w-full bg-[#FAFBFD] border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-900">
              {currentEmp.gender || 'Male'}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              NEEPCO Joining Date
            </label>
            <div className="w-full bg-[#FAFBFD] border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-mono font-semibold text-slate-900 flex items-center justify-between">
              <span>{currentEmp.joiningDate}</span>
              {currentEmp.appointmentDoc && (
                <button
                  onClick={() => onViewDocument(currentEmp.appointmentDoc)}
                  className="text-[11px] text-slate-600 hover:text-slate-900 underline font-medium cursor-pointer"
                >
                  View Appointment Order
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="section-contact" className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-2">
          Contact & Address Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Official Email Address
            </label>
            {editMode ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none"
              />
            ) : (
              <div className="w-full bg-[#FAFBFD] border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-900">
                {currentEmp.email}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Official Phone / Contact
            </label>
            {editMode ? (
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none"
              />
            ) : (
              <div className="w-full bg-[#FAFBFD] border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-mono font-semibold text-slate-900">
                {currentEmp.phone}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-500">
                Permanent Domicile Address
              </label>
              {currentEmp.permanentAddressDoc && (
                <button
                  onClick={() => onViewDocument(currentEmp.permanentAddressDoc)}
                  className="text-[11px] text-slate-600 hover:text-slate-900 underline font-medium cursor-pointer"
                >
                  View Domicile Proof
                </button>
              )}
            </div>
            {editMode ? (
              <textarea
                value={formData.permanentAddress}
                onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs font-medium text-slate-900 focus:outline-none min-h-[60px]"
              />
            ) : (
              <div className="w-full bg-[#FAFBFD] border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-900 leading-relaxed min-h-[60px]">
                {currentEmp.permanentAddress}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-500">
                Present Residential Address
              </label>
              {currentEmp.presentAddressDoc && (
                <button
                  onClick={() => onViewDocument(currentEmp.presentAddressDoc)}
                  className="text-[11px] text-slate-600 hover:text-slate-900 underline font-medium cursor-pointer"
                >
                  View Allotment Order
                </button>
              )}
            </div>
            {editMode ? (
              <textarea
                value={formData.presentAddress}
                onChange={(e) => setFormData({ ...formData, presentAddress: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs font-medium text-slate-900 focus:outline-none min-h-[60px]"
              />
            ) : (
              <div className="w-full bg-[#FAFBFD] border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-900 leading-relaxed min-h-[60px]">
                {currentEmp.presentAddress}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="section-statutory" className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-2">
          Identification & Statutory Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-500">
                Aadhaar Number
              </label>
              <button
                onClick={() => setShowAadhaar(!showAadhaar)}
                className="text-[11px] text-slate-600 hover:text-slate-900 underline font-medium cursor-pointer"
              >
                {showAadhaar ? 'Hide' : 'Reveal'}
              </button>
            </div>
            <div className="w-full bg-[#FAFBFD] border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-mono font-semibold text-slate-900 flex items-center justify-between">
              <span>{showAadhaar ? currentEmp.aadharNo : maskedAadhaar}</span>
              {currentEmp.aadharDoc && (
                <button
                  onClick={() => onViewDocument(currentEmp.aadharDoc)}
                  className="text-[11px] text-slate-600 hover:text-slate-900 underline font-medium cursor-pointer"
                >
                  View Copy
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              PAN (Permanent Account Number)
            </label>
            <div className="w-full bg-[#FAFBFD] border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-mono font-semibold text-slate-900 flex items-center justify-between">
              <span>{currentEmp.panNo}</span>
              {currentEmp.panDoc && (
                <button
                  onClick={() => onViewDocument(currentEmp.panDoc)}
                  className="text-[11px] text-slate-600 hover:text-slate-900 underline font-medium cursor-pointer"
                >
                  View Copy
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Caste / Category
            </label>
            <div className="w-full bg-[#FAFBFD] border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-semibold text-slate-900 flex items-center justify-between">
              <span>{currentEmp.caste}</span>
              {currentEmp.casteDoc && (
                <button
                  onClick={() => onViewDocument(currentEmp.casteDoc)}
                  className="text-[11px] text-slate-600 hover:text-slate-900 underline font-medium cursor-pointer"
                >
                  View Certificate
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="section-family" className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Family & Dependants
          </h2>
          {isHRAdmin && (
            <button
              onClick={handleAddDependant}
              className="text-xs text-slate-800 hover:text-slate-900 font-semibold flex items-center space-x-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Dependant</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentEmp.dependants && currentEmp.dependants.map((dep) => (
            <div key={dep.id} className="p-4 rounded-lg bg-[#FAFBFD] border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{dep.name}</span>
                <span className="text-[11px] font-bold text-slate-700">
                  {dep.relation}
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Gender: <strong className="text-slate-800">{dep.gender}</strong> · DOB: <strong className="font-mono text-slate-800">{dep.dob}</strong>
              </p>
              {dep.dobDoc && (
                <button
                  onClick={() => onViewDocument(dep.dobDoc)}
                  className="text-[11px] text-slate-600 hover:text-slate-900 underline font-medium cursor-pointer pt-1 inline-block"
                >
                  View Relationship / DOB Document
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="section-qualifications" className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-2">
          Educational Qualifications & Certifications
        </h2>

        <div className="space-y-3">
          {currentEmp.educationalQualifications && currentEmp.educationalQualifications.map((edu) => (
            <div key={edu.slNo} className="p-4 rounded-lg bg-[#FAFBFD] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-slate-900">{edu.degree}</h3>
                <p className="text-xs text-slate-600 font-medium">{edu.institution} (Passed: {edu.passingYear})</p>
                <p className="text-[11px] text-slate-500 font-medium">Grade: {edu.percentage} ({edu.division})</p>
              </div>

              {edu.doc && (
                <button
                  onClick={() => onViewDocument(edu.doc)}
                  className="text-xs text-slate-700 hover:text-slate-900 font-semibold underline cursor-pointer self-start sm:self-auto"
                >
                  View Degree Certificate
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="section-service-history" className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-2">
          Service History & Postings
        </h2>

        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-[#FAFBFD] border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Current Posting</span>
            <p className="text-xs font-bold text-slate-900">{currentEmp.locationName} ({currentEmp.presentPosting?.department || currentEmp.department})</p>
            <p className="text-xs text-slate-600 font-medium">Reporting Officer: <strong>{currentEmp.presentPosting?.reportingOfficerName || 'Executive Director'}</strong> ({currentEmp.presentPosting?.reportingOfficerDesignation || 'Operations'})</p>
          </div>

          {currentEmp.promotionHistory && currentEmp.promotionHistory.map((prom, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-[#FAFBFD] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Promotion Order #{prom.orderNo}</span>
                <p className="text-xs font-bold text-slate-900">{prom.fromGrade} → {prom.toGrade}</p>
                <p className="text-[11px] text-slate-500 font-medium">Sanctioned Date: {prom.orderDate} · Effective: {prom.effectiveDate}</p>
              </div>

              <button
                onClick={() => onGenerateOrder(prom, 'promotion')}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer self-start sm:self-auto"
              >
                View Promotion Order
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="section-compliance" className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-2">
          Compliance & APAR Ratings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-4 rounded-lg bg-[#FAFBFD] border border-slate-200 space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Vigilance & Disciplinary Clearance</span>
            <p className="text-xs font-bold text-emerald-700">Status: {currentEmp.disciplinaryCases?.status || 'Nil / Clear'}</p>
            <p className="text-xs text-slate-600 font-medium">{currentEmp.disciplinaryCases?.details || 'Clean service record.'}</p>
          </div>

          <div className="p-4 rounded-lg bg-[#FAFBFD] border border-slate-200 space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Immovable Property Return (IPR)</span>
            <p className="text-xs font-bold text-slate-900">FY 2024-25 (Ack #{currentEmp.propertyReturns?.[0]?.ackNo || 'IPR/2025/ACC'})</p>
            <p className="text-xs text-slate-600 font-medium">Submitted Date: {currentEmp.propertyReturns?.[0]?.submittedDate || '12-01-2025'} · {currentEmp.propertyReturns?.[0]?.status || 'Submitted & Accepted'}</p>
          </div>
        </div>
      </section>

    </div>
  );
}
