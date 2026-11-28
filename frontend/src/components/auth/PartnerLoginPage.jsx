import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, ArrowRight, Bike, Store, UserPlus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { authApiRequest } from '../../services/api';
import { AuthLayoutShell, ForgotPasswordModal, getDashboardPathForRole } from './AuthShared';
import PartnerOnboarding from './PartnerOnboarding';

/**
 * Common V RIDE Partner Login & Onboarding for Rider Partners and Restaurant Owners.
 */
export const PartnerLoginPage = () => {
  const navigate = useNavigate();
  const { loginWithSession } = useApp();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await authApiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password, loginPortal: 'partner' })
    });
    setLoading(false);

    if (!res?.success || !res.token || !res.user) {
      setError(res?.message || 'Invalid partner credentials.');
      return;
    }

    loginWithSession(res.token, res.user);
    navigate(getDashboardPathForRole(res.user.role), { replace: true });
  };

  return (
    <AuthLayoutShell
      title="V RIDE PARTNER PORTAL"
      subtitle="Unified Portal · Rider Partner & Restaurant Owner"
      badge="Partner"
    >
      <div className="space-y-4">
        {/* Top Mode Switcher: Sign In vs Register as Partner */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-gray-100 rounded-2xl">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            className={`py-2 px-2 rounded-xl text-[11px] font-black flex items-center justify-center gap-1.5 transition ${
              mode === 'login' ? 'bg-[#FFD000] text-black shadow-xs' : 'text-gray-600 hover:text-black'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Partner Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(''); }}
            className={`py-2 px-2 rounded-xl text-[11px] font-black flex items-center justify-center gap-1.5 transition ${
              mode === 'register' ? 'bg-[#FFD000] text-black shadow-xs' : 'text-gray-600 hover:text-black'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register / Onboard</span>
          </button>
        </div>

        {mode === 'register' ? (
          <PartnerOnboarding onBackToLogin={() => setMode('login')} />
        ) : (
          <>
            <div className="p-3 rounded-2xl bg-[#FFF9DB] border border-[#FFD000]/60 flex items-center gap-3 text-[11px] text-gray-800 font-semibold">
              <div className="flex items-center gap-1 shrink-0 text-black">
                <Bike className="w-4 h-4" />
                <Store className="w-4 h-4" />
              </div>
              <span>
                Sign in with your registered partner account. You will be automatically routed to your Rider or Restaurant dashboard.
              </span>
            </div>

            <form onSubmit={handlePasswordLogin} className="space-y-3.5">
              <div>
                <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">
                  Registered Email, Username or Mobile Number
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="rider@vride.in or vendor@vride.in"
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
                    placeholder="Enter your password"
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
                className="w-full py-3 rounded-2xl bg-[#FFD000] hover:bg-yellow-400 text-black font-black text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{loading ? 'Verifying Partner...' : 'Sign In to Partner Portal'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </>
        )}
      </div>

      <ForgotPasswordModal
        isOpen={showForgot}
        onClose={() => setShowForgot(false)}
        defaultIdentifier={identifier}
      />
    </AuthLayoutShell>
  );
};

export default PartnerLoginPage;
