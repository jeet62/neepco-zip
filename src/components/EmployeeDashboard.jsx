import React, { useState } from 'react';
import { Printer, Download, Search, FileText } from 'lucide-react';
import ProfileOverview from './RecordTabs/ProfileOverview';
import FamilyDependants from './RecordTabs/FamilyDependants';
import EducationQualifications from './RecordTabs/EducationQualifications';
import ServiceOrders from './RecordTabs/ServiceOrders';
import ComplianceReporting from './RecordTabs/ComplianceReporting';
import { EMPLOYEES_DATA } from '../data/employeesData';

export default function EmployeeDashboard({ employee, onViewDocument, onGenerateOrder }) {
  const [activeTab, setActiveTab] = useState('personal');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmp, setSelectedEmp] = useState(employee);
  const [searchError, setSearchError] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchError('');
    const q = searchQuery.trim().toLowerCase();

    if (!q) {
      setSelectedEmp(employee);
      return;
    }

    const matched = Object.values(EMPLOYEES_DATA).find((emp) => 
      emp.empNo.toLowerCase() === q ||
      emp.name.toLowerCase().includes(q) ||
      emp.panNo.toLowerCase() === q ||
      emp.department.toLowerCase().includes(q) ||
      emp.locationName.toLowerCase().includes(q) ||
      emp.designation.toLowerCase().includes(q)
    );

    if (matched) {
      setSelectedEmp(matched);
    } else {
      setSearchError(`No employee record found matching "${searchQuery}".`);
    }
  };

  const currentDisplayedEmp = selectedEmp || employee;

  return (
    <div className="max-w-[1560px] mx-auto px-4 sm:px-8 py-8 space-y-8 font-sans text-slate-900">
      
      {/* Official Government HRIS Breadcrumb & Functional Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-300">
        <div className="space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center space-x-2">
            <span className="text-[#1e3a8a]">NEEPCO HRIS PORTAL</span>
            <span>/</span>
            <span>DIGITAL SERVICE BOOK</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">
            Employee Service Record
          </h1>
        </div>

        {/* Functional Toolbar: Live Search + Print + Download PDF */}
        <div className="flex flex-wrap items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="relative min-w-[240px] sm:min-w-[300px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!e.target.value) {
                  setSelectedEmp(employee);
                  setSearchError('');
                }
              }}
              placeholder="Search by Emp No (1024), Name, PAN..."
              className="w-full bg-white px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/20 pl-9"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </form>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-300 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-700" />
            <span>Print Record</span>
          </button>

          <button
            onClick={() => alert(`Downloading Official Service Record PDF for ${currentDisplayedEmp.name}...`)}
            className="px-4 py-2 rounded-lg bg-[#1e3a8a] hover:bg-[#172554] text-white text-xs font-semibold border border-[#1e3a8a] flex items-center gap-2 transition-colors cursor-pointer shadow-none"
          >
            <Download className="w-4 h-4 text-white" />
            <span>Download Service Record</span>
          </button>
        </div>
      </div>

      {searchError && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
          ⚠️ {searchError}
        </div>
      )}

      {/* Institutional Employee Information Summary Header */}
      <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200/90 shadow-2xs space-y-6">
        <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{currentDisplayedEmp.name}</h2>
            <p className="text-sm font-bold text-[#1e3a8a] mt-0.5">{currentDisplayedEmp.designation}</p>
          </div>
          <div className="px-3.5 py-1.5 rounded-md bg-blue-50 text-[#1e3a8a] border border-blue-200 text-xs font-bold font-mono self-start sm:self-auto">
            EMP NO: {currentDisplayedEmp.empNo}
          </div>
        </div>

        {/* Spacious 2-Column Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">EMPLOYEE NUMBER</span>
            <span className="text-base font-mono font-bold text-slate-900">{currentDisplayedEmp.empNo}</span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">CURRENT POSTING</span>
            <span className="text-base font-bold text-slate-900 block truncate">{currentDisplayedEmp.locationName}</span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">JOINING DATE</span>
            <span className="text-base font-mono font-bold text-slate-900">{currentDisplayedEmp.joiningDate}</span>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">OFFICIAL EMAIL</span>
            <span className="text-base font-semibold text-slate-900 block truncate">{currentDisplayedEmp.email}</span>
          </div>
        </div>
      </div>

      {/* Institutional Document Tabs Navigation */}
      <div className="border-b border-slate-300 flex items-center space-x-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('personal')}
          className={activeTab === 'personal' ? 'govt-tab-active' : 'govt-tab-inactive'}
        >
          Personal Details
        </button>

        <button
          onClick={() => setActiveTab('family')}
          className={activeTab === 'family' ? 'govt-tab-active' : 'govt-tab-inactive'}
        >
          Family & Dependants
        </button>

        <button
          onClick={() => setActiveTab('education')}
          className={activeTab === 'education' ? 'govt-tab-active' : 'govt-tab-inactive'}
        >
          Education & Qualifications
        </button>

        <button
          onClick={() => setActiveTab('service')}
          className={activeTab === 'service' ? 'govt-tab-active' : 'govt-tab-inactive'}
        >
          Service History
        </button>

        <button
          onClick={() => setActiveTab('compliance')}
          className={activeTab === 'compliance' ? 'govt-tab-active' : 'govt-tab-inactive'}
        >
          Compliance & APAR
        </button>
      </div>

      {/* Active Tab View Display */}
      <div className="pt-2">
        {activeTab === 'personal' && (
          <ProfileOverview
            employee={currentDisplayedEmp}
            onViewDocument={onViewDocument}
          />
        )}

        {activeTab === 'family' && (
          <FamilyDependants
            employee={currentDisplayedEmp}
            onViewDocument={onViewDocument}
          />
        )}

        {activeTab === 'education' && (
          <EducationQualifications
            employee={currentDisplayedEmp}
            onViewDocument={onViewDocument}
          />
        )}

        {activeTab === 'service' && (
          <ServiceOrders
            employee={currentDisplayedEmp}
            onGenerateOrder={onGenerateOrder}
          />
        )}

        {activeTab === 'compliance' && (
          <ComplianceReporting
            employee={currentDisplayedEmp}
          />
        )}
      </div>

    </div>
  );
}
