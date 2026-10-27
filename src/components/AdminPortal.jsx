import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Filter, ChevronDown, ChevronUp, ChevronRight, MoreVertical, 
  ArrowUpDown, X, RotateCcw, Eye, Edit3, FileText, Check, 
  ArrowLeft, Save, Printer, Download, User, MapPin, Briefcase, 
  Award, Shield, Calendar, Phone, Mail, Building, CheckCircle2,
  TrendingUp, Globe, Clock, History, AlertCircle, Layers, CheckSquare, Square
} from 'lucide-react';
import { NEEPCO_LOCATIONS, HIERARCHY_STRUCTURE, ALL_DEPARTMENTS, updateEmployeeRecord } from '../data/employeesData';
import AdminWorkflowModal from './AdminWorkflowModal';

export default function AdminPortal({ adminUser, onViewDocument, onGenerateOrder }) {
  const adminOfficeId = adminUser?.officeId || adminUser?.stationId || 'ALL';
  const isSuperAdmin = adminUser?.role === 'superadmin' || adminOfficeId === 'ALL';

  const [employees, setEmployees] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [selectedGender, setSelectedGender] = useState('ALL');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCadres, setSelectedCadres] = useState([]);
  const [selectedGradeCodes, setSelectedGradeCodes] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedStations, setSelectedStations] = useState(isSuperAdmin ? [] : [adminOfficeId]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedAparGrades, setSelectedAparGrades] = useState([]);
  const [selectedEmpTypes, setSelectedEmpTypes] = useState([]);
  
  const [deptSearch, setDeptSearch] = useState('');
  const [stationSearch, setStationSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('empNo');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const [collapsedSections, setCollapsedSections] = useState({
    gender: false,
    category: false,
    designationHierarchy: false,
    executiveCadre: false,
    supervisoryCadre: false,
    workmenCadre: false,
    department: false,
    station: false,
    status: false,
    apar: false,
    empType: false
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeMenuRowId, setActiveMenuRowId] = useState(null);
  const [viewingEmployee, setViewingEmployee] = useState(null);
  const [profileTab, setProfileTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [activeWorkflow, setActiveWorkflow] = useState(null);

  const categoryList = [
    { id: "General", label: "General / Unreserved" },
    { id: "SC", label: "SC — Scheduled Caste" },
    { id: "ST", label: "ST — Scheduled Tribe" },
    { id: "OBC", label: "OBC — Other Backward Class" }
  ];

  const statusList = ["Active", "On Leave", "Transferred", "Retired", "Separated"];
  const aparList = ["Outstanding", "Very Good", "Good", "Average", "Below Average"];
  const empTypeList = ["Regular", "Contract", "Executive Trainee", "Trainee"];

  const toggleSection = (key) => {
    setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCategoryToggle = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  const handleCadreToggle = (cadreName) => {
    const cadreObj = HIERARCHY_STRUCTURE.find(c => c.cadre === cadreName);
    if (!cadreObj) return;
    const cadreCodes = cadreObj.grades.map(g => g.code);
    const allSelected = cadreCodes.every(c => selectedGradeCodes.includes(c));

    if (allSelected) {
      setSelectedGradeCodes(prev => prev.filter(c => !cadreCodes.includes(c)));
      setSelectedCadres(prev => prev.filter(c => c !== cadreName));
    } else {
      setSelectedGradeCodes(prev => Array.from(new Set([...prev, ...cadreCodes])));
      setSelectedCadres(prev => Array.from(new Set([...prev, cadreName])));
    }
    setCurrentPage(1);
  };

  const handleGradeToggle = (gradeCode, cadreName) => {
    setSelectedGradeCodes(prev => 
      prev.includes(gradeCode) ? prev.filter(g => g !== gradeCode) : [...prev, gradeCode]
    );
    setCurrentPage(1);
  };

  const handleDepartmentToggle = (dept) => {
    setSelectedDepartments(prev => 
      prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
    );
    setCurrentPage(1);
  };

  const handleStationToggle = (stnId) => {
    if (!isSuperAdmin) return;
    setSelectedStations(prev => 
      prev.includes(stnId) ? prev.filter(s => s !== stnId) : [...prev, stnId]
    );
    setCurrentPage(1);
  };

  const handleStatusToggle = (st) => {
    setSelectedStatuses(prev => 
      prev.includes(st) ? prev.filter(s => s !== st) : [...prev, st]
    );
    setCurrentPage(1);
  };

  const handleAparToggle = (grade) => {
    setSelectedAparGrades(prev => 
      prev.includes(grade) ? prev.filter(g => g !== grade) : [...prev, grade]
    );
    setCurrentPage(1);
  };

  const handleEmpTypeToggle = (type) => {
    setSelectedEmpTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const handleClearAllFilters = () => {
    setSelectedGender('ALL');
    setSelectedCategories([]);
    setSelectedCadres([]);
    setSelectedGradeCodes([]);
    setSelectedDepartments([]);
    setSelectedStations(isSuperAdmin ? [] : [adminOfficeId]);
    setSelectedStatuses([]);
    setSelectedAparGrades([]);
    setSelectedEmpTypes([]);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const activeFilterCount = (selectedGender !== 'ALL' ? 1 : 0) +
    selectedCategories.length +
    selectedGradeCodes.length +
    selectedDepartments.length +
    (isSuperAdmin ? selectedStations.length : 0) +
    selectedStatuses.length +
    selectedAparGrades.length +
    selectedEmpTypes.length +
    (searchQuery.trim() ? 1 : 0);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        officeId: adminOfficeId,
        page: String(currentPage),
        pageSize: String(pageSize),
        sortBy,
        sortOrder
      });

      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      if (selectedGender !== 'ALL') params.append('genders', selectedGender);
      if (selectedCategories.length > 0) params.append('categories', selectedCategories.join(','));
      if (selectedCadres.length > 0) params.append('cadres', selectedCadres.join(','));
      if (selectedGradeCodes.length > 0) params.append('gradeCodes', selectedGradeCodes.join(','));
      if (selectedDepartments.length > 0) params.append('departments', selectedDepartments.join(','));
      if (isSuperAdmin && selectedStations.length > 0) params.append('stations', selectedStations.join(','));
      if (selectedStatuses.length > 0) params.append('statuses', selectedStatuses.join(','));
      if (selectedAparGrades.length > 0) params.append('aparGrades', selectedAparGrades.join(','));
      if (selectedEmpTypes.length > 0) params.append('employeeTypes', selectedEmpTypes.join(','));

      const res = await fetch(`/api/admin/employees?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setEmployees(data.employees || []);
        setTotalCount(data.count || 0);
        setTotalPages(data.totalPages || 1);
        setStats(data.stats || {});
      }
    } catch (err) {
      console.error('Failed to fetch employees from backend:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [
    adminOfficeId, selectedGender, selectedCategories, selectedCadres, selectedGradeCodes, 
    selectedDepartments, selectedStations, selectedStatuses, selectedAparGrades, 
    selectedEmpTypes, searchQuery, sortBy, sortOrder, currentPage, pageSize
  ]);

  const handleOpenProfile = (emp, startEdit = false) => {
    setViewingEmployee(emp);
    setEditFormData({ ...emp });
    setIsEditing(startEdit);
    setProfileTab('overview');
    setActiveMenuRowId(null);
  };

  const handleSaveProfileChanges = async () => {
    if (!viewingEmployee || !editFormData) return;
    const success = await updateEmployeeRecord(viewingEmployee.empNo, editFormData, adminUser);
    if (success) {
      setViewingEmployee({ ...editFormData });
      setIsEditing(false);
      setSaveSuccessMsg('✓ Employee record successfully updated and saved in SQLite database.');
      fetchEmployees();
      setTimeout(() => setSaveSuccessMsg(''), 4000);
    }
  };

  const handleWorkflowFinished = (orderObj, orderType) => {
    setSaveSuccessMsg(`✓ Official ${orderType.toUpperCase()} order successfully sanctioned and recorded.`);
    fetchEmployees();
    if (onGenerateOrder && viewingEmployee) {
      onGenerateOrder(orderObj, orderType);
    }
    setTimeout(() => setSaveSuccessMsg(''), 5000);
  };

  const filteredDepartments = useMemo(() => {
    if (!deptSearch.trim()) return ALL_DEPARTMENTS;
    return ALL_DEPARTMENTS.filter(d => d.toLowerCase().includes(deptSearch.toLowerCase()));
  }, [deptSearch]);

  const filteredStations = useMemo(() => {
    if (!stationSearch.trim()) return NEEPCO_LOCATIONS;
    return NEEPCO_LOCATIONS.filter(l => l.name.toLowerCase().includes(stationSearch.toLowerCase()));
  }, [stationSearch]);

  const startRecordNum = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRecordNum = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="w-full bg-[#F5F6F8] min-h-full font-sans text-slate-800 antialiased pb-12">
      
      <div className="bg-white border-b border-slate-200 px-6 py-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-2">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-slate-900 text-sm">
              {adminUser?.officeName || "Headquarters Office, Shillong"}
            </span>
            <span className="text-slate-300">|</span>
            <span>
              Jurisdiction: <span className="text-slate-800 font-medium">{isSuperAdmin ? "All NEEPCO Stations" : "Assigned Power Station"}</span>
            </span>
            <span className="text-slate-300">|</span>
            <span>
              HR Administrator: <span className="text-slate-800 font-medium">{adminUser?.name}</span>
            </span>
          </div>
        </div>
      </div>

      {!viewingEmployee ? (
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-5">
          
          <div className="block lg:hidden mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex-1 py-2 px-3 bg-white border border-slate-300 rounded text-xs font-bold text-slate-800 flex items-center justify-center space-x-2 shadow-2xs"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>FILTERS {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                className="flex-1 py-2 px-3 bg-white border border-slate-300 rounded text-xs font-medium text-slate-800"
              >
                <option value="empNo">Sort: Employee ID</option>
                <option value="name">Sort: Name (A–Z)</option>
                <option value="gradeCode">Sort: Grade (High to Low)</option>
                <option value="designation">Sort: Designation</option>
                <option value="department">Sort: Department</option>
                <option value="joiningDate">Sort: Joining Date</option>
              </select>
            </div>
          </div>

          <div className="flex gap-5 items-start">
            
            <aside className="hidden lg:block w-[260px] shrink-0 bg-white border border-slate-200 rounded shadow-2xs select-none">
              
              <div className="p-3 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  FILTERS {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
                </span>
                {activeFilterCount > 0 && (
                  <button
                    onClick={handleClearAllFilters}
                    className="text-[11px] font-bold text-[#007AFF] hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                
                <div className="p-3">
                  <button
                    onClick={() => toggleSection('gender')}
                    className="w-full flex items-center justify-between font-bold text-slate-800 mb-1.5 cursor-pointer"
                  >
                    <span className="uppercase text-[11px] text-slate-500 tracking-wider">Gender</span>
                    {collapsedSections.gender ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400" />}
                  </button>

                  {!collapsedSections.gender && (
                    <div className="space-y-1.5 pt-1">
                      {['ALL', 'Male', 'Female'].map((gen) => (
                        <label key={gen} className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 cursor-pointer">
                          <input
                            type="radio"
                            name="filter-gender"
                            checked={selectedGender === gen}
                            onChange={() => { setSelectedGender(gen); setCurrentPage(1); }}
                            className="w-3.5 h-3.5 text-[#007AFF] focus:ring-0"
                          />
                          <span className="text-xs">{gen === 'ALL' ? 'All Genders' : gen}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <button
                    onClick={() => toggleSection('category')}
                    className="w-full flex items-center justify-between font-bold text-slate-800 mb-1.5 cursor-pointer"
                  >
                    <span className="uppercase text-[11px] text-slate-500 tracking-wider">Category / Caste</span>
                    {collapsedSections.category ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400" />}
                  </button>

                  {!collapsedSections.category && (
                    <div className="space-y-1.5 pt-1">
                      {categoryList.map((cat) => (
                        <label key={cat.id} className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat.id)}
                            onChange={() => handleCategoryToggle(cat.id)}
                            className="w-3.5 h-3.5 rounded text-[#007AFF] focus:ring-0"
                          />
                          <span className="text-xs">{cat.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <button
                    onClick={() => toggleSection('designationHierarchy')}
                    className="w-full flex items-center justify-between font-bold text-slate-800 mb-1.5 cursor-pointer"
                  >
                    <span className="uppercase text-[11px] text-slate-900 font-bold tracking-wider">Designation & Hierarchy</span>
                    {collapsedSections.designationHierarchy ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400" />}
                  </button>

                  {!collapsedSections.designationHierarchy && (
                    <div className="space-y-2.5 pt-1">
                      
                      <div className="border border-slate-200 rounded p-2 bg-slate-50/60">
                        <div className="flex items-center justify-between mb-1.5">
                          <button
                            onClick={() => handleCadreToggle("Executive Cadre")}
                            className="font-bold text-[11px] uppercase tracking-wider text-slate-800 hover:text-slate-900 text-left flex items-center space-x-1 cursor-pointer"
                          >
                            <span>EXECUTIVE CADRE</span>
                          </button>
                          <button
                            onClick={() => toggleSection('executiveCadre')}
                            className="p-0.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                          >
                            {collapsedSections.executiveCadre ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
                          </button>
                        </div>

                        {!collapsedSections.executiveCadre && (
                          <div className="space-y-1.5 pl-0.5 max-h-52 overflow-y-auto">
                            {[
                              { code: "E9", label: "E9 — Executive Director" },
                              { code: "E8", label: "E8 — Chief General Manager / General Manager" },
                              { code: "E7", label: "E7 — Deputy General Manager" },
                              { code: "E6", label: "E6 — Senior Manager" },
                              { code: "E5", label: "E5 — Manager" },
                              { code: "E4", label: "E4 — Deputy Manager" },
                              { code: "E3", label: "E3 — Assistant Manager" },
                              { code: "E2", label: "E2 — Engineer / Officer / Executive Trainee" },
                              { code: "E1", label: "E1 — Assistant Engineer / Assistant Officer / Junior Executive" }
                            ].map((g) => (
                              <label key={g.code} className="flex items-start space-x-2 text-slate-700 hover:text-slate-900 cursor-pointer py-0.5">
                                <input
                                  type="checkbox"
                                  checked={selectedGradeCodes.includes(g.code)}
                                  onChange={() => handleGradeToggle(g.code, "Executive Cadre")}
                                  className="w-3.5 h-3.5 mt-0.5 rounded text-[#007AFF] focus:ring-0 shrink-0"
                                />
                                <span className="text-[11px] leading-tight font-normal">
                                  {g.label}
                                </span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="border border-slate-200 rounded p-2 bg-slate-50/60">
                        <div className="flex items-center justify-between mb-1.5">
                          <button
                            onClick={() => handleCadreToggle("Supervisory Cadre")}
                            className="font-bold text-[11px] uppercase tracking-wider text-slate-800 hover:text-slate-900 text-left flex items-center space-x-1 cursor-pointer"
                          >
                            <span>SUPERVISORY CADRE</span>
                          </button>
                          <button
                            onClick={() => toggleSection('supervisoryCadre')}
                            className="p-0.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                          >
                            {collapsedSections.supervisoryCadre ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
                          </button>
                        </div>

                        {!collapsedSections.supervisoryCadre && (
                          <div className="space-y-1.5 pl-0.5">
                            {[
                              { code: "S3", label: "S3 — Senior Supervisor" },
                              { code: "S2", label: "S2 — Supervisor" },
                              { code: "S1", label: "S1 — Junior Supervisor" }
                            ].map((g) => (
                              <label key={g.code} className="flex items-start space-x-2 text-slate-700 hover:text-slate-900 cursor-pointer py-0.5">
                                <input
                                  type="checkbox"
                                  checked={selectedGradeCodes.includes(g.code)}
                                  onChange={() => handleGradeToggle(g.code, "Supervisory Cadre")}
                                  className="w-3.5 h-3.5 mt-0.5 rounded text-[#007AFF] focus:ring-0 shrink-0"
                                />
                                <span className="text-[11px] leading-tight font-normal">
                                  {g.label}
                                </span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="border border-slate-200 rounded p-2 bg-slate-50/60">
                        <div className="flex items-center justify-between mb-1.5">
                          <button
                            onClick={() => handleCadreToggle("Non-Executive / Workmen")}
                            className="font-bold text-[11px] uppercase tracking-wider text-slate-800 hover:text-slate-900 text-left flex items-center space-x-1 cursor-pointer"
                          >
                            <span>NON-EXECUTIVE / WORKMEN</span>
                          </button>
                          <button
                            onClick={() => toggleSection('workmenCadre')}
                            className="p-0.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                          >
                            {collapsedSections.workmenCadre ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
                          </button>
                        </div>

                        {!collapsedSections.workmenCadre && (
                          <div className="space-y-1.5 pl-0.5 max-h-44 overflow-y-auto">
                            {["W8", "W7", "W6", "W5", "W4", "W3", "W2", "W1"].map((code) => (
                              <label key={code} className="flex items-start space-x-2 text-slate-700 hover:text-slate-900 cursor-pointer py-0.5">
                                <input
                                  type="checkbox"
                                  checked={selectedGradeCodes.includes(code)}
                                  onChange={() => handleGradeToggle(code, "Non-Executive / Workmen")}
                                  className="w-3.5 h-3.5 mt-0.5 rounded text-[#007AFF] focus:ring-0 shrink-0"
                                />
                                <span className="text-[11px] leading-tight font-normal">
                                  {code}
                                </span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>
                  )}
                </div>

                <div className="p-3">
                  <button
                    onClick={() => toggleSection('department')}
                    className="w-full flex items-center justify-between font-bold text-slate-800 mb-1.5 cursor-pointer"
                  >
                    <span className="uppercase text-[11px] text-slate-500 tracking-wider">Department</span>
                    {collapsedSections.department ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400" />}
                  </button>

                  {!collapsedSections.department && (
                    <div className="space-y-2 pt-1">
                      <input
                        type="text"
                        value={deptSearch}
                        onChange={(e) => setDeptSearch(e.target.value)}
                        placeholder="Search departments..."
                        className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none focus:bg-white"
                      />
                      <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                        {filteredDepartments.map((dept) => (
                          <label key={dept} className="flex items-start space-x-2 text-slate-700 hover:text-slate-900 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedDepartments.includes(dept)}
                              onChange={() => handleDepartmentToggle(dept)}
                              className="w-3.5 h-3.5 mt-0.5 rounded text-[#007AFF] focus:ring-0 shrink-0"
                            />
                            <span className="text-xs leading-tight">{dept}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {isSuperAdmin && (
                  <div className="p-3">
                    <button
                      onClick={() => toggleSection('station')}
                      className="w-full flex items-center justify-between font-bold text-slate-800 mb-1.5 cursor-pointer"
                    >
                      <span className="uppercase text-[11px] text-slate-500 tracking-wider">Office / Station</span>
                      {collapsedSections.station ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400" />}
                    </button>

                    {!collapsedSections.station && (
                      <div className="space-y-2 pt-1">
                        <input
                          type="text"
                          value={stationSearch}
                          onChange={(e) => setStationSearch(e.target.value)}
                          placeholder="Search offices..."
                          className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none focus:bg-white"
                        />
                        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                          {filteredStations.map((loc) => (
                            <label key={loc.id} className="flex items-start space-x-2 text-slate-700 hover:text-slate-900 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedStations.includes(loc.id)}
                                onChange={() => handleStationToggle(loc.id)}
                                className="w-3.5 h-3.5 mt-0.5 rounded text-[#007AFF] focus:ring-0 shrink-0"
                              />
                              <span className="text-xs leading-tight">{loc.name.split(',')[0]}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="p-3">
                  <button
                    onClick={() => toggleSection('status')}
                    className="w-full flex items-center justify-between font-bold text-slate-800 mb-1.5 cursor-pointer"
                  >
                    <span className="uppercase text-[11px] text-slate-500 tracking-wider">Status</span>
                    {collapsedSections.status ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400" />}
                  </button>

                  {!collapsedSections.status && (
                    <div className="space-y-1.5 pt-1">
                      {statusList.map((st) => (
                        <label key={st} className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedStatuses.includes(st)}
                            onChange={() => handleStatusToggle(st)}
                            className="w-3.5 h-3.5 rounded text-[#007AFF] focus:ring-0"
                          />
                          <span className="text-xs">{st}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <button
                    onClick={() => toggleSection('apar')}
                    className="w-full flex items-center justify-between font-bold text-slate-800 mb-1.5 cursor-pointer"
                  >
                    <span className="uppercase text-[11px] text-slate-500 tracking-wider">APAR Rating</span>
                    {collapsedSections.apar ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400" />}
                  </button>

                  {!collapsedSections.apar && (
                    <div className="space-y-1.5 pt-1">
                      {aparList.map((grade) => (
                        <label key={grade} className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedAparGrades.includes(grade)}
                            onChange={() => handleAparToggle(grade)}
                            className="w-3.5 h-3.5 rounded text-[#007AFF] focus:ring-0"
                          />
                          <span className="text-xs">{grade}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <button
                    onClick={() => toggleSection('empType')}
                    className="w-full flex items-center justify-between font-bold text-slate-800 mb-1.5 cursor-pointer"
                  >
                    <span className="uppercase text-[11px] text-slate-500 tracking-wider">Employee Type</span>
                    {collapsedSections.empType ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400" />}
                  </button>

                  {!collapsedSections.empType && (
                    <div className="space-y-1.5 pt-1">
                      {empTypeList.map((type) => (
                        <label key={type} className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedEmpTypes.includes(type)}
                            onChange={() => handleEmpTypeToggle(type)}
                            className="w-3.5 h-3.5 rounded text-[#007AFF] focus:ring-0"
                          />
                          <span className="text-xs">{type}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </aside>

            <main className="flex-1 min-w-0 space-y-3">
              
              <div className="bg-white border border-slate-200 rounded p-3 shadow-2xs space-y-2.5">
                
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    placeholder="Search by employee name, employee ID, PAN, Aadhaar, designation, department..."
                    className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 pl-9 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-500 transition-colors"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-slate-100">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-sm font-bold text-slate-900">
                      {totalCount} employees found
                    </span>
                    <span className="text-xs text-slate-500 font-normal">
                      · Assigned to: <strong className="text-slate-700 font-semibold">{isSuperAdmin ? "All NEEPCO Stations" : (adminUser?.officeName || "Headquarters Office, Shillong")}</strong>
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-slate-500">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                      className="bg-transparent font-medium text-slate-800 border-b border-slate-300 py-0.5 focus:outline-none cursor-pointer"
                    >
                      <option value="empNo">Employee ID</option>
                      <option value="name">Name (A–Z)</option>
                      <option value="gradeCode">Grade (High to Low)</option>
                      <option value="designation">Designation</option>
                      <option value="department">Department</option>
                      <option value="joiningDate">Joining Date</option>
                    </select>

                    <button
                      onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                      title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                      className="p-1 text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {activeFilterCount > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                    <span className="text-[11px] text-slate-400 font-medium mr-1">Filters:</span>

                    {selectedGender !== 'ALL' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 text-[11px]">
                        Gender: {selectedGender}
                        <button onClick={() => setSelectedGender('ALL')} className="hover:text-red-600"><X className="w-3 h-3" /></button>
                      </span>
                    )}

                    {selectedCategories.map(cat => (
                      <span key={cat} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 text-[11px]">
                        {cat}
                        <button onClick={() => handleCategoryToggle(cat)} className="hover:text-red-600"><X className="w-3 h-3" /></button>
                      </span>
                    ))}

                    {selectedGradeCodes.map(code => (
                      <span key={code} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 text-[11px]">
                        Grade: {code}
                        <button onClick={() => handleGradeToggle(code)} className="hover:text-red-600"><X className="w-3 h-3" /></button>
                      </span>
                    ))}

                    {selectedDepartments.map(dept => (
                      <span key={dept} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 text-[11px]">
                        {dept.split(' ')[0]}
                        <button onClick={() => handleDepartmentToggle(dept)} className="hover:text-red-600"><X className="w-3 h-3" /></button>
                      </span>
                    ))}

                    {selectedStatuses.map(st => (
                      <span key={st} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 text-[11px]">
                        Status: {st}
                        <button onClick={() => handleStatusToggle(st)} className="hover:text-red-600"><X className="w-3 h-3" /></button>
                      </span>
                    ))}

                    {selectedAparGrades.map(grade => (
                      <span key={grade} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 text-[11px]">
                        APAR: {grade}
                        <button onClick={() => handleAparToggle(grade)} className="hover:text-red-600"><X className="w-3 h-3" /></button>
                      </span>
                    ))}

                    {selectedEmpTypes.map(t => (
                      <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 text-[11px]">
                        Type: {t}
                        <button onClick={() => handleEmpTypeToggle(t)} className="hover:text-red-600"><X className="w-3 h-3" /></button>
                      </span>
                    ))}

                    <button
                      onClick={handleClearAllFilters}
                      className="text-[11px] font-bold text-[#007AFF] hover:underline ml-1 cursor-pointer"
                    >
                      Clear all
                    </button>
                  </div>
                )}

              </div>

              <div className="bg-white border border-slate-200 rounded shadow-2xs overflow-hidden">
                <div className="overflow-x-auto min-h-[420px]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 sticky top-0 z-10 select-none">
                      <tr>
                        <th className="py-2.5 px-3 w-20 font-mono text-slate-900">Employee ID</th>
                        <th className="py-2.5 px-3 min-w-[180px]">Employee</th>
                        <th className="py-2.5 px-3 w-16">Grade</th>
                        <th className="py-2.5 px-3 min-w-[160px]">Designation</th>
                        <th className="py-2.5 px-3 min-w-[180px]">Department</th>
                        <th className="py-2.5 px-3 min-w-[150px]">Station</th>
                        <th className="py-2.5 px-3 w-16">Gender</th>
                        <th className="py-2.5 px-3 w-24">Category</th>
                        <th className="py-2.5 px-3 w-20">Status</th>
                        <th className="py-2.5 px-3 w-10 text-center"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {isLoading ? (
                        <tr>
                          <td colSpan={10} className="py-12 text-center text-slate-400">
                            Loading employee records from SQLite database...
                          </td>
                        </tr>
                      ) : employees.length === 0 ? (
                        <tr>
                          <td colSpan={10} className="py-12 text-center text-slate-500">
                            No employees found matching the filter criteria in your office jurisdiction.
                          </td>
                        </tr>
                      ) : (
                        employees.map((emp) => (
                          <tr key={emp.empNo} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-2 px-3 font-mono text-slate-900">
                              {emp.empNo}
                            </td>

                            <td className="py-2 px-3">
                              <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-[9px] flex items-center justify-center shrink-0">
                                  {emp.name?.charAt(0) || 'E'}
                                </div>
                                <button
                                  onClick={() => handleOpenProfile(emp, false)}
                                  className="font-bold text-slate-900 hover:text-[#007AFF] text-left truncate cursor-pointer"
                                >
                                  {emp.name}
                                </button>
                              </div>
                            </td>

                            <td className="py-2 px-3 font-mono font-medium text-slate-900">
                              {emp.gradeCode || 'E4'}
                            </td>

                            <td className="py-2 px-3 text-slate-800 truncate max-w-[170px]" title={emp.designation}>
                              {emp.designation}
                            </td>

                            <td className="py-2 px-3 text-slate-600 truncate max-w-[190px]" title={emp.department}>
                              {emp.department}
                            </td>

                            <td className="py-2 px-3 text-slate-600 truncate max-w-[160px]" title={emp.locationName}>
                              {emp.locationName?.split(',')[0]}
                            </td>

                            <td className="py-2 px-3 text-slate-700">
                              {emp.gender}
                            </td>

                            <td className="py-2 px-3 text-slate-700 text-[11px]">
                              {emp.caste?.split(' ')[0] || 'General'}
                            </td>

                            <td className="py-2 px-3 text-slate-700 text-xs font-normal">
                              {emp.status || 'Active'}
                            </td>

                            <td className="py-2 px-3 text-center relative">
                              <div className="relative inline-block text-left">
                                <button
                                  onClick={() => setActiveMenuRowId(activeMenuRowId === emp.empNo ? null : emp.empNo)}
                                  className="p-1 text-slate-400 hover:text-slate-800 cursor-pointer"
                                  title="Actions"
                                >
                                  <MoreVertical className="w-3.5 h-3.5" />
                                </button>

                                {activeMenuRowId === emp.empNo && (
                                  <div className="absolute right-0 mt-1 w-44 rounded bg-white border border-slate-200 shadow-md py-1 z-30 animate-in fade-in zoom-in-95 duration-100 text-left text-xs">
                                    <button
                                      onClick={() => handleOpenProfile(emp, false)}
                                      className="w-full px-3 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center space-x-2 cursor-pointer"
                                    >
                                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                                      <span>View Employee</span>
                                    </button>

                                    <button
                                      onClick={() => handleOpenProfile(emp, true)}
                                      className="w-full px-3 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center space-x-2 cursor-pointer"
                                    >
                                      <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                                      <span>Edit Employee</span>
                                    </button>

                                    <button
                                      onClick={() => { handleOpenProfile(emp, false); setProfileTab('service'); }}
                                      className="w-full px-3 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center space-x-2 cursor-pointer"
                                    >
                                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                                      <span>Service History</span>
                                    </button>

                                    <button
                                      onClick={() => { handleOpenProfile(emp, false); setProfileTab('leave'); }}
                                      className="w-full px-3 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center space-x-2 cursor-pointer"
                                    >
                                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                      <span>Leave & Attendance</span>
                                    </button>

                                    <button
                                      onClick={() => { handleOpenProfile(emp, false); setProfileTab('apar'); }}
                                      className="w-full px-3 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center space-x-2 cursor-pointer"
                                    >
                                      <Award className="w-3.5 h-3.5 text-slate-400" />
                                      <span>APAR</span>
                                    </button>

                                    <button
                                      onClick={() => { handleOpenProfile(emp, false); setProfileTab('documents'); }}
                                      className="w-full px-3 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center space-x-2 cursor-pointer border-t border-slate-100"
                                    >
                                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                                      <span>Documents</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="text-slate-600">
                    Showing {startRecordNum}–{endRecordNum} of {totalCount} employees
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-slate-500">Rows per page:</span>
                      <select
                        value={pageSize}
                        onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                        className="bg-white border border-slate-300 rounded px-2 py-0.5 text-slate-800 cursor-pointer"
                      >
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage <= 1}
                        className="px-2 py-0.5 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        ‹ Previous
                      </button>

                      {Array.from({ length: Math.min(totalPages, 5) }, (_, idx) => {
                        const pageNum = idx + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-6 h-6 rounded text-xs transition-colors cursor-pointer ${
                              currentPage === pageNum
                                ? 'bg-slate-900 text-white font-bold'
                                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      {totalPages > 5 && <span className="px-1 text-slate-400">...</span>}

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage >= totalPages}
                        className="px-2 py-0.5 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Next ›
                      </button>
                    </div>
                  </div>
                </div>

              </div>

            </main>

          </div>

        </div>
      ) : (
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-5 space-y-4 animate-in fade-in duration-200">
          
          <div className="flex items-center justify-between bg-white p-3 border border-slate-200 rounded">
            <button
              onClick={() => { setViewingEmployee(null); setIsEditing(false); }}
              className="px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Back to Employee Directory</span>
            </button>

            <div className="flex items-center space-x-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3.5 py-1.5 rounded bg-slate-900 hover:bg-black text-white font-semibold text-xs flex items-center space-x-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Employee</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSaveProfileChanges}
                    className="px-3.5 py-1.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save to SQLite</span>
                  </button>
                  <button
                    onClick={() => { setEditFormData({ ...viewingEmployee }); setIsEditing(false); }}
                    className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 text-xs hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <button
                onClick={() => setActiveWorkflow('transfer')}
                className="px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs cursor-pointer"
              >
                Transfer
              </button>

              <button
                onClick={() => setActiveWorkflow('promote')}
                className="px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs cursor-pointer"
              >
                Promote
              </button>

              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs flex items-center space-x-1 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {saveSuccessMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-xs font-semibold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{saveSuccessMsg}</span>
            </div>
          )}

          <div className="bg-white border border-slate-200 rounded p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full bg-slate-800 text-white font-bold text-lg flex items-center justify-center shrink-0">
                  {viewingEmployee.name?.charAt(0) || 'E'}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-base font-bold text-slate-900">
                      {viewingEmployee.name}
                    </h2>
                    <span className="text-xs text-slate-500 font-mono">
                      (Employee ID: {viewingEmployee.empNo})
                    </span>
                  </div>

                  <p className="text-xs font-medium text-slate-700">
                    <strong className="text-slate-900">{viewingEmployee.gradeCode || 'E4'}</strong> · {viewingEmployee.cadre || 'Executive Cadre'} · {viewingEmployee.designation}
                  </p>

                  <p className="text-xs text-slate-500">
                    {viewingEmployee.department} · {viewingEmployee.locationName}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-xs">
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase">Status</span>
                  <span className="font-normal text-slate-700">{viewingEmployee.status || 'Active'}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase">APAR Rating</span>
                  <span className="font-semibold text-slate-800">{viewingEmployee.aparScore || '9.4 / 10'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded overflow-hidden">
            
            <div className="border-b border-slate-200 bg-slate-50 px-4 flex space-x-6 overflow-x-auto text-xs font-semibold select-none">
              <button
                onClick={() => setProfileTab('overview')}
                className={`py-2.5 transition-colors border-b-2 cursor-pointer ${
                  profileTab === 'overview' ? 'border-slate-900 text-slate-900 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Overview
              </button>

              <button
                onClick={() => setProfileTab('personal')}
                className={`py-2.5 transition-colors border-b-2 cursor-pointer ${
                  profileTab === 'personal' ? 'border-slate-900 text-slate-900 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Personal
              </button>

              <button
                onClick={() => setProfileTab('employment')}
                className={`py-2.5 transition-colors border-b-2 cursor-pointer ${
                  profileTab === 'employment' ? 'border-slate-900 text-slate-900 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Employment
              </button>

              <button
                onClick={() => setProfileTab('service')}
                className={`py-2.5 transition-colors border-b-2 cursor-pointer ${
                  profileTab === 'service' ? 'border-slate-900 text-slate-900 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Service History
              </button>

              <button
                onClick={() => setProfileTab('leave')}
                className={`py-2.5 transition-colors border-b-2 cursor-pointer ${
                  profileTab === 'leave' ? 'border-slate-900 text-slate-900 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Leave & Attendance
              </button>

              <button
                onClick={() => setProfileTab('apar')}
                className={`py-2.5 transition-colors border-b-2 cursor-pointer ${
                  profileTab === 'apar' ? 'border-slate-900 text-slate-900 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                APAR
              </button>

              <button
                onClick={() => setProfileTab('documents')}
                className={`py-2.5 transition-colors border-b-2 cursor-pointer ${
                  profileTab === 'documents' ? 'border-slate-900 text-slate-900 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Documents
              </button>
            </div>

            <div className="p-5 text-xs">
              
              {profileTab === 'overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">Cadre & Grade</span>
                      <p className="font-bold text-slate-900">{viewingEmployee.cadre || 'Executive Cadre'} ({viewingEmployee.gradeCode || 'E4'})</p>
                      <p className="text-slate-500 text-[11px]">{viewingEmployee.grade}</p>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">Posting & Office</span>
                      <p className="font-bold text-slate-900">{viewingEmployee.locationName}</p>
                      <p className="text-slate-500 text-[11px]">{viewingEmployee.department}</p>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">Service Details</span>
                      <p className="font-bold text-slate-900">Joined: {viewingEmployee.joiningDate}</p>
                      <p className="text-slate-500 text-[11px]">Type: {viewingEmployee.employeeType || 'Regular'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <span className="text-slate-400 font-medium">Permanent Address:</span>
                      <p className="text-slate-800 leading-relaxed">{viewingEmployee.permanentAddress}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-slate-400 font-medium">Present Quarters:</span>
                      <p className="text-slate-800 leading-relaxed">{viewingEmployee.presentAddress}</p>
                    </div>
                  </div>
                </div>
              )}

              {profileTab === 'personal' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editFormData.name}
                          onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 font-bold"
                        />
                      ) : (
                        <div className="font-bold text-slate-900 py-1">{viewingEmployee.name}</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">Date of Birth</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editFormData.dob}
                          onChange={(e) => setEditFormData({ ...editFormData, dob: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 font-mono"
                        />
                      ) : (
                        <div className="text-slate-800 font-mono py-1">{viewingEmployee.dob}</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">Gender</label>
                      {isEditing ? (
                        <select
                          value={editFormData.gender}
                          onChange={(e) => setEditFormData({ ...editFormData, gender: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      ) : (
                        <div className="text-slate-800 py-1">{viewingEmployee.gender}</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">Category / Caste</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editFormData.caste}
                          onChange={(e) => setEditFormData({ ...editFormData, caste: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900"
                        />
                      ) : (
                        <div className="text-slate-800 py-1">{viewingEmployee.caste}</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">Aadhaar Number</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editFormData.aadharNo}
                          onChange={(e) => setEditFormData({ ...editFormData, aadharNo: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 font-mono"
                        />
                      ) : (
                        <div className="text-slate-800 font-mono py-1">{viewingEmployee.aadharNo}</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">PAN Number</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editFormData.panNo}
                          onChange={(e) => setEditFormData({ ...editFormData, panNo: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 font-mono"
                        />
                      ) : (
                        <div className="text-slate-800 font-mono py-1">{viewingEmployee.panNo}</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {profileTab === 'employment' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="block text-slate-400 text-[11px] mb-1">Cadre</span>
                      <span className="font-semibold text-slate-900">{viewingEmployee.cadre}</span>
                    </div>

                    <div>
                      <span className="block text-slate-400 text-[11px] mb-1">Grade Code</span>
                      <span className="font-mono font-bold text-slate-900">{viewingEmployee.gradeCode}</span>
                    </div>

                    <div>
                      <span className="block text-slate-400 text-[11px] mb-1">Designation</span>
                      <span className="font-semibold text-slate-900">{viewingEmployee.designation}</span>
                    </div>

                    <div>
                      <span className="block text-slate-400 text-[11px] mb-1">Department</span>
                      <span className="text-slate-900">{viewingEmployee.department}</span>
                    </div>

                    <div>
                      <span className="block text-slate-400 text-[11px] mb-1">Date of Joining</span>
                      <span className="font-mono text-slate-900">{viewingEmployee.joiningDate}</span>
                    </div>

                    <div>
                      <span className="block text-slate-400 text-[11px] mb-1">Basic Pay</span>
                      <span className="font-mono text-slate-900">₹{viewingEmployee.basicSalary?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {profileTab === 'service' && (
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">Current Posting</span>
                    <p className="font-bold text-slate-900">{viewingEmployee.locationName} · {viewingEmployee.department}</p>
                  </div>

                  {viewingEmployee.promotionHistory && viewingEmployee.promotionHistory.length > 0 && (
                    <div className="space-y-2">
                      <span className="font-bold text-slate-800 text-xs block">Promotion Records</span>
                      {viewingEmployee.promotionHistory.map((p, idx) => (
                        <div key={idx} className="p-2.5 border border-slate-200 rounded flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-slate-900">{p.fromGrade} → {p.toGrade}</span>
                            <p className="text-[11px] text-slate-500">Order #{p.orderNo}</p>
                          </div>
                          <span className="font-mono text-slate-600 text-[11px]">{p.effectiveDate}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {profileTab === 'leave' && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 border border-slate-200 rounded">
                    <span className="text-slate-400 text-[10px] uppercase block">Earned Leave (EL)</span>
                    <span className="text-base font-bold text-slate-900">42 Days</span>
                  </div>
                  <div className="p-3 border border-slate-200 rounded">
                    <span className="text-slate-400 text-[10px] uppercase block">Casual Leave (CL)</span>
                    <span className="text-base font-bold text-slate-900">8 Days</span>
                  </div>
                  <div className="p-3 border border-slate-200 rounded">
                    <span className="text-slate-400 text-[10px] uppercase block">Half Pay / Medical</span>
                    <span className="text-base font-bold text-slate-900">20 Days</span>
                  </div>
                </div>
              )}

              {profileTab === 'apar' && (
                <div className="p-4 border border-slate-200 rounded bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 text-xs">Annual Performance Appraisal Report (APAR 2024–25)</span>
                    <p className="text-xs text-slate-600 mt-0.5">Composite Assessment Score: <strong>{viewingEmployee.aparScore || '9.4 / 10'}</strong></p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-xs">
                    {viewingEmployee.aparGrade || 'Outstanding'}
                  </span>
                </div>
              )}

              {profileTab === 'documents' && (
                <div className="space-y-2">
                  <div className="p-2.5 border border-slate-200 rounded flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Appointment Sanction Letter</span>
                    <button
                      onClick={() => onViewDocument && onViewDocument({ name: `Appointment Order - ${viewingEmployee.name}` })}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-black text-white text-xs rounded cursor-pointer"
                    >
                      View
                    </button>
                  </div>

                  <div className="p-2.5 border border-slate-200 rounded flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Identity & Aadhaar Verification</span>
                    <button
                      onClick={() => onViewDocument && onViewDocument({ name: `Identity Record - ${viewingEmployee.name}` })}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-black text-white text-xs rounded cursor-pointer"
                    >
                      View
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      )}

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white animate-in slide-in-from-bottom duration-200">
          <div className="p-3 border-b border-slate-200 flex items-center justify-between">
            <span className="font-bold text-xs text-slate-900 uppercase">FILTERS</span>
            <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-slate-500">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            <div>
              <span className="font-bold text-slate-800 uppercase block mb-1.5">Gender</span>
              <div className="space-y-1.5">
                {['ALL', 'Male', 'Female'].map(gen => (
                  <label key={gen} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="mob-gender"
                      checked={selectedGender === gen}
                      onChange={() => setSelectedGender(gen)}
                    />
                    <span>{gen === 'ALL' ? 'All Genders' : gen}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <span className="font-bold text-slate-800 uppercase block mb-1.5">Category</span>
              <div className="space-y-1.5">
                {categoryList.map(cat => (
                  <label key={cat.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => handleCategoryToggle(cat.id)}
                    />
                    <span>{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 border-t border-slate-200 flex gap-2">
            <button
              onClick={() => { handleClearAllFilters(); setIsMobileFilterOpen(false); }}
              className="flex-1 py-2 rounded border border-slate-300 text-xs font-semibold text-slate-700"
            >
              CLEAR ALL
            </button>
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="flex-1 py-2 rounded bg-slate-900 text-white text-xs font-bold"
            >
              APPLY FILTERS
            </button>
          </div>
        </div>
      )}

      <AdminWorkflowModal
        isOpen={!!activeWorkflow}
        onClose={() => setActiveWorkflow(null)}
        workflowType={activeWorkflow}
        employee={viewingEmployee}
        adminUser={adminUser}
        onWorkflowComplete={handleWorkflowFinished}
      />

    </div>
  );
}
