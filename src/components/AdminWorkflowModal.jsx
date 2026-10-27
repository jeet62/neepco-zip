import React, { useState } from 'react';
import { X, TrendingUp, MapPin, Globe, CheckCircle2, ArrowRight, FileCheck } from 'lucide-react';
import { NEEPCO_LOCATIONS, executePromotionWorkflow, executeTransferWorkflow, executeTrainingWorkflow } from '../data/employeesData';

export default function AdminWorkflowModal({ isOpen, onClose, workflowType, employee, adminUser, onWorkflowComplete }) {
  if (!isOpen || !employee || !adminUser) return null;

  const [promoForm, setPromoForm] = useState({
    fromGrade: employee.designation,
    toGrade: '',
    effectiveDate: new Date().toISOString().split('T')[0]
  });

  const [transferForm, setTransferForm] = useState({
    postingStation: NEEPCO_LOCATIONS[0].name,
    department: employee.department || 'Hydro Operations & Maintenance',
    specializedSkillArea: 'Hydro Generation & Substation Grid Systems',
    specializedSkillSubArea: 'High Voltage Transformer Diagnostics & SCADA Systems',
    reportingOfficer: 'Executive Director (Operations)'
  });

  const [trainingForm, setTrainingForm] = useState({
    courseTitle: '',
    type: 'Domestic Training',
    institution: '',
    location: '',
    duration: '5 Days'
  });

  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  const handlePromotionSubmit = (e) => {
    e.preventDefault();
    if (!promoForm.toGrade) {
      setError('Please enter the promoted designation / grade.');
      return;
    }
    const orderObj = executePromotionWorkflow(employee.empNo, promoForm, adminUser);
    onWorkflowComplete(orderObj, 'promotion');
    onClose();
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    if (!transferForm.postingStation) {
      setError('Please select the posting station.');
      return;
    }
    const orderObj = executeTransferWorkflow(employee.empNo, transferForm, adminUser);
    onWorkflowComplete(orderObj, 'placement');
    onClose();
  };

  const handleTrainingSubmit = (e) => {
    e.preventDefault();
    if (!trainingForm.courseTitle || !trainingForm.institution) {
      setError('Please fill in course title and organizing institution.');
      return;
    }
    const orderObj = executeTrainingWorkflow(employee.empNo, trainingForm, adminUser);
    onWorkflowComplete(orderObj, 'training');
    onClose();
  };

  const getTitle = () => {
    switch (workflowType) {
      case 'promote': return 'Promote Employee Workflow';
      case 'transfer': return 'Transfer & Placement Workflow';
      case 'training': return 'Sanction Training Deputation Workflow';
      default: return 'HR Workflow Action';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-50 rounded-xl text-[#007AFF]">
              {workflowType === 'promote' && <TrendingUp className="w-5 h-5 stroke-[1.5]" />}
              {workflowType === 'transfer' && <MapPin className="w-5 h-5 stroke-[1.5]" />}
              {workflowType === 'training' && <Globe className="w-5 h-5 stroke-[1.5]" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{getTitle()}</h3>
              <p className="text-xs text-slate-500">
                Target Employee: <strong className="text-slate-800">{employee.name} (Emp #{employee.empNo})</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          
          {error && (
            <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl font-medium border border-red-100">
              ⚠️ {error}
            </p>
          )}

          {workflowType === 'promote' && (
            <form onSubmit={handlePromotionSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Current Grade / Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={promoForm.fromGrade}
                  disabled
                  className="w-full bg-slate-100 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Promoted Grade / Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={promoForm.toGrade}
                  onChange={(e) => setPromoForm({ ...promoForm, toGrade: e.target.value })}
                  placeholder="e.g. E-6 (Deputy General Manager - Electrical)"
                  className="w-full bg-white px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-900 border border-slate-200 focus:outline-none focus:border-[#007AFF]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Effective Promotion Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={promoForm.effectiveDate}
                  onChange={(e) => setPromoForm({ ...promoForm, effectiveDate: e.target.value })}
                  className="w-full bg-white px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-900 border border-slate-200 focus:outline-none focus:border-[#007AFF]"
                  required
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                >
                  <span>Generate Promotion Order & Save</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
                </button>
              </div>
            </form>
          )}

          {workflowType === 'transfer' && (
            <form onSubmit={handleTransferSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  New Posting Station / Location <span className="text-red-500">*</span>
                </label>
                <select
                  value={transferForm.postingStation}
                  onChange={(e) => setTransferForm({ ...transferForm, postingStation: e.target.value })}
                  className="w-full bg-white px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-900 border border-slate-200 focus:outline-none focus:border-[#007AFF]"
                >
                  {NEEPCO_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.name}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Department / Division <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={transferForm.department}
                  onChange={(e) => setTransferForm({ ...transferForm, department: e.target.value })}
                  className="w-full bg-white px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-900 border border-slate-200 focus:outline-none focus:border-[#007AFF]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Specialized Skill Area <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={transferForm.specializedSkillArea}
                  onChange={(e) => setTransferForm({ ...transferForm, specializedSkillArea: e.target.value })}
                  placeholder="e.g. Hydro Turbine Maintenance & Grid Integration"
                  className="w-full bg-white px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-900 border border-slate-200 focus:outline-none focus:border-[#007AFF]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Specialized Skill Sub-Area Breakdown <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={transferForm.specializedSkillSubArea}
                  onChange={(e) => setTransferForm({ ...transferForm, specializedSkillSubArea: e.target.value })}
                  placeholder="e.g. High Voltage Transformer Calibration"
                  className="w-full bg-white px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-900 border border-slate-200 focus:outline-none focus:border-[#007AFF]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  New Reporting Officer Name & Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={transferForm.reportingOfficer}
                  onChange={(e) => setTransferForm({ ...transferForm, reportingOfficer: e.target.value })}
                  className="w-full bg-white px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-900 border border-slate-200 focus:outline-none focus:border-[#007AFF]"
                  required
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                >
                  <span>Generate Transfer Order & Save</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
                </button>
              </div>
            </form>
          )}

          {workflowType === 'training' && (
            <form onSubmit={handleTrainingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Training Course Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={trainingForm.courseTitle}
                  onChange={(e) => setTrainingForm({ ...trainingForm, courseTitle: e.target.value })}
                  placeholder="e.g. Substation Automation & Cyber Security"
                  className="w-full bg-white px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-900 border border-slate-200 focus:outline-none focus:border-[#007AFF]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Training Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={trainingForm.type}
                  onChange={(e) => setTrainingForm({ ...trainingForm, type: e.target.value })}
                  className="w-full bg-white px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-900 border border-slate-200 focus:outline-none focus:border-[#007AFF]"
                >
                  <option value="Domestic Training">Domestic Training</option>
                  <option value="Foreign Training">Foreign Training</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Organizing Institution <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={trainingForm.institution}
                  onChange={(e) => setTrainingForm({ ...trainingForm, institution: e.target.value })}
                  placeholder="e.g. National Power Training Institute (NPTI), Faridabad"
                  className="w-full bg-white px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-900 border border-slate-200 focus:outline-none focus:border-[#007AFF]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Training Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={trainingForm.location}
                  onChange={(e) => setTrainingForm({ ...trainingForm, location: e.target.value })}
                  placeholder="e.g. Faridabad, Haryana"
                  className="w-full bg-white px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-900 border border-slate-200 focus:outline-none focus:border-[#007AFF]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Duration <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={trainingForm.duration}
                  onChange={(e) => setTrainingForm({ ...trainingForm, duration: e.target.value })}
                  placeholder="e.g. 5 Days"
                  className="w-full bg-white px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-900 border border-slate-200 focus:outline-none focus:border-[#007AFF]"
                  required
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                >
                  <span>Generate Training Order & Save</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
