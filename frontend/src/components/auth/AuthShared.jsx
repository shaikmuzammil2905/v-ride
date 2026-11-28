import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, KeyRound, CheckCircle2, X, ShieldCheck } from 'lucide-react';
import { authApiRequest } from '../../services/api';

export const getDashboardPathForRole = (role) => {
  switch (role) {
    case 'customer':
      return '/';
    case 'admin':
    case 'super_admin':
      return '/admin';
    case 'rider':
      return '/rider';
    case 'vendor':
      return '/vendor';
    default:
      return '/';
  }
};

export const AuthLayoutShell = ({ title, subtitle, badge, showBack = true, children }) => (
  <div className="min-h-screen bg-[#10151F] flex flex-col items-center justify-center p-4 select-none">
    <div className="w-full max-w-md">
      {showBack && (
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFD000] hover:underline mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to V RIDE</span>
        </Link>
      )}

      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        <div className="bg-[#151A23] text-white p-6 pb-5 border-b-4 border-[#FFD000]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#FFD000] text-[#10151F] flex items-center justify-center font-black text-xl shadow-md shrink-0">
                V
              </div>
              <div>
                <h1 className="font-black text-base sm:text-lg tracking-wider text-white leading-tight">
                  {title}
                </h1>
                <p className="text-xs text-gray-300 mt-0.5">{subtitle}</p>
              </div>
            </div>
            {badge && (
              <span className="px-2.5 py-1 rounded-full bg-[#FFD000]/15 border border-[#FFD000]/40 text-[#FFD000] text-[10px] font-black uppercase tracking-wide shrink-0">
                {badge}
              </span>
            )}
          </div>
        </div>

        <div className="p-6">{children}</div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-semibold">
        <ShieldCheck className="w-3.5 h-3.5 text-[#FFD000]" />
        <span>V RIDE Secure Role-Based Authentication</span>
      </div>
    </div>
  </div>
);

export const ForgotPasswordModal = ({ isOpen, onClose, defaultIdentifier = '' }) => {
  const [step, setStep] = useState('request'); // 'request' | 'reset' | 'done'
  const [identifier, setIdentifier] = useState(defaultIdentifier);
  const [resetCode, setResetCode] = useState('');
  const [devCodeHint, setDevCodeHint] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    const res = await authApiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ identifier })
    });
    setLoading(false);

    if (!res?.success) {
      setError(res?.message || 'Unable to generate password reset code.');
      return;
    }

    setMessage(res.message);
    if (res.devResetCode) setDevCodeHint(res.devResetCode);
    setStep('reset');
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const res = await authApiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ identifier, resetCode, newPassword })
    });
    setLoading(false);

    if (!res?.success) {
      setError(res?.message || 'Failed to reset password.');
      return;
    }

    setStep('done');
  };

  const resetAndClose = () => {
    setStep('request');
    setResetCode('');
    setDevCodeHint('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FFD000] text-black flex items-center justify-center">
              <KeyRound className="w-4 h-4" />
            </div>
            <h3 className="font-black text-sm text-gray-900">
              {step === 'done' ? 'Password Updated' : 'Reset Password'}
            </h3>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'request' && (
          <form onSubmit={handleRequestCode} className="space-y-3">
            <p className="text-xs text-gray-600">
              Enter your registered email, username, or mobile number to receive a 6-digit reset code.
            </p>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Email, username, or mobile number"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFD000]"
            />
            {error && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-700 font-bold">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#FFD000] hover:bg-yellow-400 text-black font-black text-xs transition"
            >
              {loading ? 'Sending Code...' : 'Send Reset Code'}
            </button>
          </form>
        )}

        {step === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-3">
            {message && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 font-semibold">
                {message}
                {devCodeHint && (
                  <span className="block mt-1 font-black">Dev Reset Code: {devCodeHint}</span>
                )}
              </div>
            )}
            <div>
              <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">
                6-Digit Reset Code
              </label>
              <input
                type="text"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                placeholder="Enter 6-digit code"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFD000]"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFD000]"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFD000]"
              />
            </div>
            {error && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-[11px] text-red-700 font-bold">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#FFD000] hover:bg-yellow-400 text-black font-black text-xs transition"
            >
              {loading ? 'Updating Password...' : 'Reset Password'}
            </button>
          </form>
        )}

        {step === 'done' && (
          <div className="text-center space-y-3 py-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <p className="text-xs font-bold text-gray-800">
              Your password has been updated. Please sign in with your new password.
            </p>
            <button
              type="button"
              onClick={resetAndClose}
              className="w-full py-2.5 rounded-xl bg-[#FFD000] text-black font-black text-xs"
            >
              Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
