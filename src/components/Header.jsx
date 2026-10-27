import React from 'react';

export default function Header({ loggedInEmp, userRole, onOpenLogin, onLogout }) {
  if (loggedInEmp) {
    return null;
  }

  return (
    <header className="w-full bg-transparent pt-5 px-4 sm:px-8 absolute top-0 left-0 right-0 z-30 pointer-events-auto animate-fade-down">
      <div className="max-w-[1680px] mx-auto flex items-center justify-between h-[70px] px-2">
        <div className="flex items-center space-x-3.5 cursor-pointer">
          <img 
            src="/neepco_logo.png" 
            alt="NEEPCO Logo" 
            className="w-12 h-12 rounded-xl object-contain bg-white shadow-xs p-1 border border-white/90" 
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white tracking-wide uppercase leading-none drop-shadow-sm">
              NEEPCO
            </span>
            <span className="text-xs font-normal text-white/90 leading-none mt-1 drop-shadow-xs">
              North Eastern Electric Power Corp.
            </span>
          </div>
        </div>

        <div>
          <button
            onClick={onOpenLogin}
            className="px-6 py-2.5 rounded-xl bg-[#007AFF] hover:bg-[#0062cc] text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95 uppercase tracking-wider cursor-pointer"
          >
            Employee Login
          </button>
        </div>

      </div>
    </header>
  );
}
