import React, { useState } from 'react';
import { Lock, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';

/**
 * Reusable credential gate for Admin, Partner, and Support portals.
 */
export const PortalLoginGate = ({
  portalKey,
  title,
  subtitle,
  badgeText,
  validId,
  validAltId,
  validPassword,
  children
}) => {
  const storageKey = `vride_auth_${portalKey}`;
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(storageKey) === 'true';
  });
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return (
      <div className="relative">
        {children}
        <button
          onClick={() => {
            localStorage.removeItem(storageKey);
            setIsAuthenticated(false);
          }}
          className="fixed bottom-4 left-4 z-50 px-3 py-1.5 rounded-xl bg-black/85 text-white border border-white/15 text-[11px] font-bold hover:bg-black shadow-lg"
        >
          Lock / Sign Out ({portalKey})
        </button>
      </div>
    );
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const idTrim = identifier.trim().toLowerCase();
    const matchesId =
      idTrim === validId.toLowerCase() ||
      (validAltId && idTrim === validAltId.toLowerCase());

    if (matchesId && password === validPassword) {
      localStorage.setItem(storageKey, 'true');
      setError('');
      setIsAuthenticated(true);
    } else {
      setError('Invalid credentials. Please check your ID and password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl space-y-5 border border-yellow-400/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FFD600] text-black flex items-center justify-center font-black text-lg shadow-sm">
              V
            </div>
            <div>
              <h1 className="font-black text-base text-gray-900 leading-tight">{title}</h1>
              <p className="text-[11px] text-gray-500 font-medium">{subtitle}</p>
            </div>
          </div>
          <span className="text-[9px] font-black uppercase bg-yellow-100 text-yellow-900 px-2 py-0.5 rounded-full">
            {badgeText}
          </span>
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">
              Login ID / Email / Phone
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={validId}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFD600]"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFD600]"
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
            <p className="text-[11px] text-red-600 font-bold bg-red-50 p-2 rounded-xl border border-red-100">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-[#FFD600] hover:bg-yellow-400 text-black font-black text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Sign In to {title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 font-semibold pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Protected V RIDE Operations Access</span>
        </div>
      </div>
    </div>
  );
};

export default PortalLoginGate;
