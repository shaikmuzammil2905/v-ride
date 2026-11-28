import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Smartphone, Eye, EyeOff, ArrowRight, Bike, Store } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { authApiRequest } from '../../services/api';
import { AuthLayoutShell, ForgotPasswordModal, getDashboardPathForRole } from './AuthShared';

/**
 * Common V RIDE Partner Login for both Rider Partners and Restaurant Owners.
 * Never lets users pick a role manually — role is determined strictly by the
 * authenticated backend database record and redirected automatically.
 */
export const PartnerLoginPage = () => {
  const navigate = useNavigate();
  const { loginWithSession } = useApp();

  const [mode, setMode] = useState('password'); // 'password' | 'otp'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [devOtpHint, setDevOtpHint] = useState('');

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

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await authApiRequest('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, loginPortal: 'partner' })
    });
    setLoading(false);

    if (!res?.success) {
      setError(res?.message || 'Unable to send OTP.');
      return;
    }
    setOtpSent(true);
    if (res.devOtp) setDevOtpHint(res.devOtp);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await authApiRequest('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, otp, loginPortal: 'partner' })
    });
    setLoading(false);

    if (!res?.success || !res.token || !res.user) {
      setError(res?.message || 'Invalid OTP.');
      return;
    }

    loginWithSession(res.token, res.user);
    navigate(getDashboardPathForRole(res.user.role), { replace: true });
  };

  return (
    <AuthLayoutShell
      title="V RIDE PARTNER LOGIN"
      subtitle="Unified Portal · Rider Partner & Restaurant Owner"
      badge="Partner"
    >
      <div className="space-y-4">
        <div className="p-3 rounded-2xl bg-[#FFF9DB] border border-[#FFD000]/60 flex items-center gap-3 text-[11px] text-gray-800 font-semibold">
          <div className="flex items-center gap-1 shrink-0 text-black">
            <Bike className="w-4 h-4" />
            <Store className="w-4 h-4" />
          </div>
          <span>
            Sign in with your registered partner account. You will be automatically routed to your Rider or Restaurant dashboard.
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 p-1 bg-gray-100 rounded-2xl">
          {[
            { id: 'password', label: 'Password Login', icon: Lock },
            { id: 'otp', label: 'Mobile OTP', icon: Smartphone }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = mode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => { setMode(tab.id); setError(''); }}
                className={`py-2 px-2 rounded-xl text-[11px] font-black flex items-center justify-center gap-1.5 transition ${
                  active ? 'bg-[#FFD000] text-black shadow-xs' : 'text-gray-600 hover:text-black'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {mode === 'password' ? (
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
        ) : (
          <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-3.5">
            <div>
              <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">
                Registered Partner Mobile Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 97034 56789 or +91 90001 11222"
                required
                disabled={otpSent}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFD000] disabled:bg-gray-50"
              />
            </div>

            {otpSent && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500">Enter 4-Digit OTP</label>
                  <button
                    type="button"
                    onClick={() => { setOtpSent(false); setOtp(''); }}
                    className="text-[11px] font-bold text-amber-700 hover:underline"
                  >
                    Change Number
                  </button>
                </div>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="1234"
                  maxLength={6}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 tracking-widest focus:outline-none focus:ring-2 focus:ring-[#FFD000]"
                />
                {devOtpHint && (
                  <p className="text-[11px] text-emerald-700 font-bold mt-1">
                    Demo OTP: {devOtpHint}
                  </p>
                )}
              </div>
            )}

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
              <Smartphone className="w-3.5 h-3.5" />
              <span>{loading ? 'Please wait...' : otpSent ? 'Verify OTP & Continue' : 'Send Partner OTP'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
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
