import React, { useState } from 'react';
import { X, User, KeyRound, ArrowRight } from 'lucide-react';
import { loginAuthAPI } from '../data/employeesData';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [roleMode, setRoleMode] = useState('employee');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const authRes = await loginAuthAPI(roleMode, username.trim(), password.trim() || 'password123');
      if (authRes.userType === 'hr_admin') {
        onLoginSuccess(authRes.user, authRes.role || 'admin', 'hr_admin');
      } else {
        onLoginSuccess(authRes.employee || authRes.user, 'employee', 'employee');
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (userKey, role) => {
    setError('');
    setIsLoading(true);
    try {
      const authRes = await loginAuthAPI(role, userKey, 'password123');
      if (authRes.userType === 'hr_admin') {
        onLoginSuccess(authRes.user, authRes.role || 'admin', 'hr_admin');
      } else {
        onLoginSuccess(authRes.employee || authRes.user, 'employee', 'employee');
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Quick login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs transition-opacity">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Sign In to HRIS</h3>
            <p className="text-xs text-slate-500">Access Employee Records or Admin Portal</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        <div className="p-2 bg-slate-100 flex items-center justify-center space-x-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setRoleMode('employee'); setError(''); }}
            className={`flex-1 py-1.5 rounded-full transition-all text-center cursor-pointer ${
              roleMode === 'employee' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Employee Login
          </button>
          <button
            type="button"
            onClick={() => { setRoleMode('admin'); setError(''); }}
            className={`flex-1 py-1.5 rounded-full transition-all text-center cursor-pointer ${
              roleMode === 'admin' ? 'bg-white text-[#007AFF] shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            HR / Admin Login
          </button>
        </div>

        <div className="p-5 space-y-4">
          {error && (
            <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl font-medium border border-red-100">
              ⚠️ {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                {roleMode === 'admin' ? 'Admin Username' : 'Employee Number'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={roleMode === 'admin' ? 'e.g. admin_shillong' : 'e.g. 1024'}
                  className="w-full px-4 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/15 pl-9"
                  required
                />
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-2.5 stroke-[1.5]" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/15 pl-9"
                />
                <KeyRound className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-2.5 stroke-[1.5]" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-full bg-[#007AFF] hover:bg-[#0062cc] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? 'Signing In...' : (roleMode === 'admin' ? 'Sign In as Admin' : 'Sign In as Employee')}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
            <span className="block text-slate-400 font-medium">Quick Demo Credentials:</span>
            {roleMode === 'employee' ? (
              <div className="flex items-center space-x-2">
                <button onClick={() => handleQuickLogin('1024', 'employee')} className="hover:text-[#007AFF] underline font-bold cursor-pointer">Emp #1024</button>
                <button onClick={() => handleQuickLogin('5821', 'employee')} className="hover:text-[#007AFF] underline font-bold cursor-pointer">Emp #5821</button>
                <button onClick={() => handleQuickLogin('7392', 'employee')} className="hover:text-[#007AFF] underline font-bold cursor-pointer">Emp #7392</button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button onClick={() => handleQuickLogin('admin_shillong', 'admin')} className="hover:text-[#007AFF] underline font-bold cursor-pointer">HR Shillong</button>
                <button onClick={() => handleQuickLogin('admin_kameng', 'admin')} className="hover:text-[#007AFF] underline font-bold cursor-pointer">HR Kameng</button>
                <button onClick={() => handleQuickLogin('superadmin', 'superadmin')} className="hover:text-[#007AFF] underline font-bold cursor-pointer">Super Admin</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
