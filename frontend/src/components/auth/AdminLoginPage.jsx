import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { authApiRequest } from '../../services/api';
import { AuthLayoutShell, ForgotPasswordModal, getDashboardPathForRole } from './AuthShared';

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { loginWithSession } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await authApiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password, loginPortal: 'admin' })
    });
    setLoading(false);

    if (!res?.success || !res.token || !res.user) {
      setError(res?.message || 'Invalid administrator credentials.');
      return;
    }

    loginWithSession(res.token, res.user);
    navigate(getDashboardPathForRole(res.user.role), { replace: true });
  };

  return (
    <AuthLayoutShell
      title="ADMIN LOGIN"
      subtitle="V RIDE Operations Command & Governance"
      badge="Admin"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center gap-2.5 text-[11px] text-gray-600 font-semibold">
          <ShieldCheck className="w-4 h-4 text-[#10151F] shrink-0" />
          <span>Restricted to authorized V RIDE Operations Administrators.</span>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">
            Admin Email or Username
          </label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="admin@vride.in"
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFD000]"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-[10px] font-bold uppercase text-gray-500">Password</label>
            <button
              type="button"
              onClick={() => setShowForgot(true)}
              className="text-[11px] font-bold text-amber-700 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFD000]"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-700 font-bold">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-2xl bg-[#10151F] hover:bg-black text-[#FFD000] font-black text-xs flex items-center justify-center gap-2 shadow-md transition"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>{loading ? 'Authenticating...' : 'Sign In to Admin Dashboard'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      <ForgotPasswordModal
        isOpen={showForgot}
        onClose={() => setShowForgot(false)}
        defaultIdentifier={identifier}
      />
    </AuthLayoutShell>
  );
};

export default AdminLoginPage;
