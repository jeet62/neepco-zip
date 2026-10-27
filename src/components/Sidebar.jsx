import React from 'react';
import { 
  LayoutDashboard, Users, FileText, CalendarCheck, 
  Award, Building2, BarChart3, Settings, LogOut, User, ShieldCheck, Folder, Bell, Clock
} from 'lucide-react';

export default function Sidebar({ 
  activeNav, 
  onSelectNav, 
  loggedInUser, 
  userRole = 'employee', 
  onLogout,
  onOpenDocumentVault
}) {
  const isSelected = (id) => activeNav === id;
  const isHRAdmin = userRole === 'admin' || userRole === 'superadmin' || userRole === 'hr_admin';

  const getNavClass = (id) => {
    if (isSelected(id)) {
      return "w-full flex items-center space-x-2.5 px-3 py-2 rounded-xs bg-slate-100 text-slate-900 font-bold text-xs transition-colors cursor-pointer border-l-2 border-slate-900";
    }
    return "w-full flex items-center space-x-2.5 px-3 py-2 rounded-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-medium transition-colors cursor-pointer border-l-2 border-transparent";
  };

  const handleNavClick = (navId, sectionId) => {
    onSelectNav(navId);

    if (sectionId) {
      setTimeout(() => {
        const secEl = document.getElementById(sectionId);
        if (secEl) {
          secEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <aside className="w-[230px] bg-white border-r border-slate-200 flex flex-col justify-between h-screen sticky top-0 left-0 shrink-0 select-none py-4 px-3 overflow-y-auto">
      
      <div className="space-y-4">
        <div className="px-2 pb-3 border-b border-slate-200">
          <div className="flex items-center space-x-2.5">
            <img src="/neepco_logo.png" alt="NEEPCO Logo" className="w-6 h-6 object-contain" />
            <div>
              <span className="text-sm font-black tracking-tight text-slate-900 leading-none block">
                NEEPCO
              </span>
              <span className="text-[10px] text-slate-500 font-medium leading-none block mt-0.5">
                North Eastern Electric Power Corp.
              </span>
            </div>
          </div>
        </div>

        <nav className="space-y-0.5 text-xs">
          {isHRAdmin ? (
            <>
              <button onClick={() => handleNavClick('directory', null)} className={getNavClass('directory')}>
                <Users className="w-4 h-4 text-slate-500 stroke-[1.5]" />
                <span>Employee Directory</span>
              </button>

              <button onClick={() => handleNavClick('dashboard', null)} className={getNavClass('dashboard')}>
                <LayoutDashboard className="w-4 h-4 text-slate-500 stroke-[1.5]" />
                <span>Dashboard</span>
              </button>

              <button onClick={() => handleNavClick('records', null)} className={getNavClass('records')}>
                <FileText className="w-4 h-4 text-slate-500 stroke-[1.5]" />
                <span>Employee Records</span>
              </button>

              <button onClick={() => handleNavClick('leave', null)} className={getNavClass('leave')}>
                <CalendarCheck className="w-4 h-4 text-slate-500 stroke-[1.5]" />
                <span>Leave & Attendance</span>
              </button>

              <button onClick={() => handleNavClick('service-records', null)} className={getNavClass('service-records')}>
                <Award className="w-4 h-4 text-slate-500 stroke-[1.5]" />
                <span>Service Records</span>
              </button>

              <button onClick={() => handleNavClick('departments', null)} className={getNavClass('departments')}>
                <Building2 className="w-4 h-4 text-slate-500 stroke-[1.5]" />
                <span>Departments</span>
              </button>

              <button onClick={() => handleNavClick('reports', null)} className={getNavClass('reports')}>
                <BarChart3 className="w-4 h-4 text-slate-500 stroke-[1.5]" />
                <span>Reports</span>
              </button>

              <button onClick={() => handleNavClick('settings', null)} className={getNavClass('settings')}>
                <Settings className="w-4 h-4 text-slate-500 stroke-[1.5]" />
                <span>Settings</span>
              </button>
            </>
          ) : (
            <>
              <div className="px-2 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                MY SERVICE BOOK
              </div>

              <button onClick={() => handleNavClick('service-record', 'section-hero')} className={getNavClass('service-record')}>
                <FileText className="w-4 h-4 text-slate-500 stroke-[1.5]" />
                <span>Service Record</span>
              </button>

              <button onClick={() => handleNavClick('service-record', 'section-identity')} className={getNavClass('personal')}>
                <User className="w-4 h-4 text-slate-500 stroke-[1.5]" />
                <span>Personal Details</span>
              </button>

              <button onClick={() => handleNavClick('service-record', 'section-service-history')} className={getNavClass('service')}>
                <Clock className="w-4 h-4 text-slate-500 stroke-[1.5]" />
                <span>Service History</span>
              </button>

              <button onClick={() => handleNavClick('service-record', 'section-compliance')} className={getNavClass('compliance')}>
                <ShieldCheck className="w-4 h-4 text-slate-500 stroke-[1.5]" />
                <span>APAR & Compliance</span>
              </button>

              <button onClick={() => onOpenDocumentVault()} className={getNavClass('documents')}>
                <Folder className="w-4 h-4 text-slate-500 stroke-[1.5]" />
                <span>Document Vault</span>
              </button>
            </>
          )}
        </nav>
      </div>

      <div className="pt-3 border-t border-slate-200 text-xs">
        <div className="px-2 space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Signed in
          </span>
          <p className="font-bold text-slate-900 text-xs truncate">
            {loggedInUser?.name || 'User'}
          </p>
          <p className="text-[11px] text-slate-500 truncate">
            {isHRAdmin ? (loggedInUser?.designation || 'Senior HR Officer') : `Emp #${loggedInUser?.empNo}`}
          </p>

          <div className="pt-2 flex items-center space-x-3 text-[11px]">
            <button
              onClick={() => alert(`Profile for ${loggedInUser?.name}\nRole: ${loggedInUser?.role || 'Employee'}\nOffice: ${loggedInUser?.officeName || loggedInUser?.locationName}`)}
              className="text-[#007AFF] hover:underline cursor-pointer"
            >
              Profile
            </button>
            <span className="text-slate-300">·</span>
            <button
              onClick={onLogout}
              className="text-red-600 hover:underline cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

    </aside>
  );
}
