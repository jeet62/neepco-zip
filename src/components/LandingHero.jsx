import React, { useState, useEffect } from 'react';
import { User, KeyRound, ArrowRight, MapPin, ShieldCheck } from 'lucide-react';
import { EMPLOYEES_DATA, ADMIN_USERS, loginAuthAPI } from '../data/employeesData';

const NEEPCO_SLIDES = [
  {
    id: 1,
    title: "Ranganadi Hydro Power Station (रंगनाडी हाइड्रो पावर स्टेशन)",
    location: "Yazali, Lower Subansiri, Arunachal Pradesh",
    imageUrl: "/neepco_site3_ranganadi_dam.jpg"
  },
  {
    id: 2,
    title: "Pare Hydro Power Station (PHPS)",
    location: "Doimukh, Papum Pare, Arunachal Pradesh",
    imageUrl: "/neepco_site2_pare_station.jpg"
  },
  {
    id: 3,
    title: "NEEPCO Power House (बिजली घर)",
    location: "Riverine Hydro Station Complex",
    imageUrl: "/neepco_site1_bijli_ghar.jpg"
  },
  {
    id: 4,
    title: "Doyang Hydro Power Station",
    location: "Wokha District, Nagaland",
    imageUrl: "/neepco_site4_doyang_lake.jpg"
  },
  {
    id: 5,
    title: "Kameng Hydro Power Station (KaHPS)",
    location: "West Kameng, Arunachal Pradesh",
    imageUrl: "/neepco_site5_kameng_spillway.jpg"
  }
];

export default function LandingHero({ 
  isLoggedIn, 
  isLogoutAnimating,
  loggedInUser, 
  userRole, 
  onLoginSuccess, 
  onLogout, 
  onOpenLogin 
}) {
  const [loginMode, setLoginMode] = useState('employee');
  const [empNo, setEmpNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAnimatingShrink, setIsAnimatingShrink] = useState(false);
  const [animatingTargetUser, setAnimatingTargetUser] = useState(null);
  const [animatingRole, setAnimatingRole] = useState('employee');

  useEffect(() => {
    if (isLoggedIn || isAnimatingShrink || isLogoutAnimating) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % NEEPCO_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isLoggedIn, isAnimatingShrink, isLogoutAnimating]);

  const handleRoleToggle = (mode) => {
    if (mode === loginMode) return;
    setIsTransitioning(true);
    setError('');
    setTimeout(() => {
      setLoginMode(mode);
      setIsTransitioning(false);
    }, 150);
  };

  const handleHeroLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const inputClean = empNo.trim();
    const passClean = password.trim() || 'password123';

    try {
      const authRes = await loginAuthAPI(loginMode, inputClean, passClean);
      
      if (authRes.userType === 'hr_admin') {
        setAnimatingTargetUser(authRes.user);
        setAnimatingRole(authRes.role || 'admin');
        setIsAnimatingShrink(true);

        setTimeout(() => {
          onLoginSuccess(authRes.user, authRes.role || 'admin', 'hr_admin');
          setIsAnimatingShrink(false);
          setIsLoading(false);
        }, 750);
      } else {
        setAnimatingTargetUser(authRes.employee || authRes.user);
        setAnimatingRole('employee');
        setIsAnimatingShrink(true);

        setTimeout(() => {
          onLoginSuccess(authRes.employee || authRes.user, 'employee', 'employee');
          setIsAnimatingShrink(false);
          setIsLoading(false);
        }, 750);
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please verify credentials.');
      setIsLoading(false);
    }
  };

  const activeSlide = NEEPCO_SLIDES[slideIndex];
  const isShrunk = (isLoggedIn || isAnimatingShrink) && !isLogoutAnimating;

  const currentDisplayUser = animatingTargetUser || loggedInUser;
  const currentRole = animatingRole || userRole;
  const isHRAdmin = currentRole === 'admin' || currentRole === 'superadmin' || currentRole === 'hr_admin';

  return (
    <div className="w-full bg-[#F8FAFC] pt-3 pb-4 px-2 sm:px-5 shrink-0">
      <div className={`relative max-w-[1680px] mx-auto overflow-hidden ${
        isShrunk ? 'hero-container-shrunk' : 'hero-container-expanded'
      } shadow-md transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]`}>
        
        {NEEPCO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 bg-cover bg-center header-bg-subtle-blur ${
              idx === slideIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{ backgroundImage: `url('${slide.imageUrl}')` }}
          />
        ))}

        <div className="absolute inset-0 hero-vertical-gradient-overlay pointer-events-none" />

        {!isShrunk && (
          <div className="relative h-full max-w-[1600px] mx-auto px-6 sm:px-10 flex flex-col justify-between pt-6 pb-6 z-10 text-center animate-fade-in">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3 text-left">
                <img src="/neepco_logo.png" alt="NEEPCO Logo" className="w-10 h-10 object-contain drop-shadow-md" />
                <div className="flex flex-col text-white">
                  <span className="text-xl font-bold tracking-tight leading-none drop-shadow-md">NEEPCO</span>
                  <span className="text-xs text-white/90 font-medium leading-none mt-1 drop-shadow-sm">North Eastern Electric Power Corp.</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenLogin}
                className="px-5 py-2 rounded-full bg-white text-slate-900 font-bold text-xs shadow-md hover:bg-slate-100 transition-all cursor-pointer"
              >
                EMPLOYEE LOGIN
              </button>
            </div>

            <div className="space-y-2 max-w-2xl mx-auto my-auto pt-4">
              <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-md">
                NEEPCO HRIS Portal
              </h1>
              <p className="text-base sm:text-lg text-white/95 font-medium max-w-xl mx-auto drop-shadow-sm">
                Secure access to employee service records and HR services.
              </p>
            </div>

            <div className="w-full max-w-[700px] mx-auto bg-white rounded-xl p-5 sm:p-6 shadow-lg space-y-4 text-left my-auto border border-slate-200">
              
              <div className="flex items-center space-x-6 border-b border-slate-200 pb-2.5">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  SIGN IN AS:
                </span>

                <div className="flex items-center space-x-6">
                  <button
                    type="button"
                    onClick={() => handleRoleToggle('employee')}
                    className={`pb-1 text-xs font-bold transition-all cursor-pointer ${
                      loginMode === 'employee'
                        ? 'text-[#007AFF] border-b-2 border-[#007AFF]'
                        : 'text-slate-600 hover:text-slate-900 border-b-2 border-transparent'
                    }`}
                  >
                    Employee
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleToggle('admin')}
                    className={`pb-1 text-xs font-bold transition-all cursor-pointer ${
                      loginMode === 'admin'
                        ? 'text-[#007AFF] border-b-2 border-[#007AFF]'
                        : 'text-slate-600 hover:text-slate-900 border-b-2 border-transparent'
                    }`}
                  >
                    HR Administrator
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-xs font-medium text-red-600">
                  ⚠️ {error}
                </p>
              )}

              <form 
                onSubmit={handleHeroLogin} 
                className={`flex flex-col sm:flex-row items-end gap-3 transition-opacity duration-150 ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <div className="flex-1 w-full">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    {loginMode === 'admin' ? 'ADMINISTRATOR USERNAME' : 'EMPLOYEE NUMBER'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={empNo}
                      onChange={(e) => setEmpNo(e.target.value)}
                      placeholder={loginMode === 'admin' ? 'e.g. admin_shillong' : 'e.g. 1024'}
                      className="w-full bg-white border border-[#D5DCE5] rounded-lg h-10 px-3 pl-8 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#007AFF]"
                      required
                    />
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                  </div>
                </div>

                <div className="flex-1 w-full">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    PASSWORD
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white border border-[#D5DCE5] rounded-lg h-10 px-3 pl-8 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#007AFF]"
                      required
                    />
                    <KeyRound className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                  </div>
                </div>

                <div className="w-full sm:w-auto shrink-0">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto h-10 px-6 rounded-lg bg-[#007AFF] hover:bg-[#0062cc] text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                <span>Need help signing in? Contact your HR administrator.</span>
                <span className="text-[11px] font-mono text-slate-400">
                  {loginMode === 'admin' ? 'Demo: admin_shillong / admin_kameng / superadmin' : 'Demo: 1024 / 5821 / 7392 / 8410 / 9102'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-white">
              <div className="flex items-center space-x-2 text-xs font-semibold drop-shadow-md text-left">
                <MapPin className="w-3.5 h-3.5 text-[#007AFF] shrink-0" />
                <span>{activeSlide.title} - {activeSlide.location}</span>
              </div>

              <div className="flex items-center space-x-1.5">
                {NEEPCO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSlideIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === slideIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        )}

        {isShrunk && (
          <div className="relative h-full max-w-[1680px] mx-auto px-6 sm:px-10 flex items-center justify-between z-10 animate-fade-in">
            <div className="flex items-center space-x-5">
              <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-white/90 shadow-md flex items-center justify-center text-white text-xl font-bold shrink-0">
                {currentDisplayUser?.name?.charAt(0) || 'U'}
              </div>

              <div className="text-left space-y-0.5">
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-none drop-shadow-xs">
                    {currentDisplayUser?.name}
                  </h2>
                  {isHRAdmin && (
                    <span className="px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 text-[10px] font-bold border border-blue-400/40">
                      HR ADMINISTRATOR
                    </span>
                  )}
                </div>

                <div className="text-xs sm:text-sm font-semibold text-white/90 leading-tight drop-shadow-xs pt-0.5">
                  {currentDisplayUser?.designation}
                </div>

                <div className="text-xs font-normal text-white/85 leading-tight flex items-center space-x-2 pt-0.5">
                  <span>📍 {isHRAdmin ? (currentDisplayUser?.officeName || currentDisplayUser?.stationName) : currentDisplayUser?.locationName}</span>
                  <span>•</span>
                  <span>{isHRAdmin ? 'HR Administration Portal' : `Employee No. ${currentDisplayUser?.empNo}`}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
