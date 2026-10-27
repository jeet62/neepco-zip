import React, { useState } from 'react';
import { Search, Bell, LogOut, Settings, ChevronDown, User } from 'lucide-react';
import { EMPLOYEES_DATA } from '../data/employeesData';

export default function HeaderBar({ 
  breadcrumb = "HR Administration / Employee Directory", 
  loggedInUser, 
  userRole = 'employee',
  onSearchSelect, 
  onLogout,
  onOpenLogin
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isHRAdmin = userRole === 'admin' || userRole === 'superadmin' || userRole === 'hr_admin';

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.trim().toLowerCase();
    
    const matched = Object.values(EMPLOYEES_DATA).find((emp) => {
      if (isHRAdmin && loggedInUser?.officeId && loggedInUser.officeId !== 'ALL') {
        if (emp.locationId !== loggedInUser.officeId) return false;
      }
      return (
        emp.empNo.toLowerCase() === q ||
        emp.name.toLowerCase().includes(q) ||
        emp.panNo.toLowerCase() === q ||
        emp.department.toLowerCase().includes(q) ||
        emp.locationName.toLowerCase().includes(q)
      );
    });

    if (matched && onSearchSelect) {
      onSearchSelect(matched);
    } else {
      alert(`No employee record matching "${searchQuery}" found in your office directory.`);
    }
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 px-6 py-2.5 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      
      <div className="flex flex-col">
        <h1 className="text-sm font-bold text-slate-900 leading-tight">
          {isHRAdmin ? "Employee Directory" : "Official Service Book"}
        </h1>
        <span className="text-[11px] font-medium text-slate-400 leading-tight">
          {isHRAdmin ? "HR Administration / Employee Directory" : "Personnel Records / Service Book"}
        </span>
      </div>

      <div className="flex items-center space-x-3">
        
        {isHRAdmin && (
          <form onSubmit={handleSearchSubmit} className="relative w-48 sm:w-60">
            <input
              id="header-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search directory..."
              className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 pl-8 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-400"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
          </form>
        )}

        <button
          onClick={() => alert("3 Unread Notifications:\n1. Service Book Verification completed\n2. DPC Promotion Order logged\n3. Annual APAR Submitted for FY 2024-25")}
          className="relative p-1.5 rounded border border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500" />
        </button>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 p-1.5 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-slate-800 text-white font-bold text-[10px] flex items-center justify-center">
              {loggedInUser ? loggedInUser.name.charAt(0) : 'U'}
            </div>
            <span className="text-xs font-bold text-slate-900 truncate max-w-[120px]">
              {loggedInUser ? loggedInUser.name.split(' ')[0] : 'User'}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-56 rounded bg-white border border-slate-200 shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900 truncate">{loggedInUser?.name}</p>
                <p className="text-[10px] text-slate-500 font-medium truncate">{loggedInUser?.designation}</p>
                <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[9px] font-bold border border-slate-200">
                  {isHRAdmin ? `HR ADMIN (${loggedInUser?.officeId || 'ALL'})` : `EMPLOYEE #${loggedInUser?.empNo}`}
                </span>
              </div>

              <button
                onClick={() => { setIsDropdownOpen(false); onOpenLogin(); }}
                className="w-full px-3 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2 font-medium cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                <span>Switch Role / Account</span>
              </button>

              <button
                onClick={() => { setIsDropdownOpen(false); onLogout(); }}
                className="w-full px-3 py-1.5 text-left text-xs text-red-600 hover:bg-red-50 flex items-center space-x-2 font-medium cursor-pointer border-t border-slate-100"
              >
                <LogOut className="w-3.5 h-3.5 text-red-500" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}
