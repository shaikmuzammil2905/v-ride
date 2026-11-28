import React, { useState } from 'react';
import { Store, Bike, ShieldCheck, Lock, ArrowRight, Eye, EyeOff, MessageSquare } from 'lucide-react';
import { apiRequest } from '../../services/api';

const ROLE_OPTIONS = [
  { id: 'vendor', label: 'Restaurant Owner', icon: Store, hint: 'vendor@vride.in' },
  { id: 'rider', label: 'Rider Partner', icon: Bike, hint: 'rider@vride.in or +91 97034 56789' },
  { id: 'admin', label: 'Admin', icon: ShieldCheck, hint: 'admin@vride.in' },
  { id: 'support', label: 'Support', icon: MessageSquare, hint: 'support@vride.in' }
];

const LOCAL_FALLBACK_CREDENTIALS = {
  vendor: { ids: ['vendor@vride.in', 'paradise@vride.in', '+91 90001 11222', '9000111222'], pass: 'Vendor@2026', user: { id: 'rest_paradise', name: 'Paradise Biryani', role: 'vendor' } },
  rider: { ids: ['partner@vride.in', 'rider@vride.in', '+91 98480 12345', '+91 97034 56789', '9703456789'], pass: 'Partner@2026', user: { id: 'ptn_ramesh', name: 'Raju Kumar', role: 'rider' } },
  admin: { ids: ['admin@vride.in', 'admin'], pass: 'VRideAdmin@2026', user: { id: 'adm_super', name: 'Operations Lead', role: 'admin' } },
  support: { ids: ['support@vride.in', 'anand.admin@vride.com'], pass: 'Support@2026', user: { id: 'adm_support', name: 'Anand Kumar', role: 'support' } }
};

export const UnifiedPartnerLogin = ({ initialRole = 'rider', onAuthenticated }) => {
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const activeMeta = ROLE_OPTIONS.find((r) => r.id === selectedRole) || ROLE_OPTIONS[1];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await apiRequest('/auth/portal-login', {
      method: 'POST',
      body: JSON.stringify({ role: selectedRole, identifier, password })
    });

    setLoading(false);

    if (res?.success && res.user) {
      localStorage.setItem(`vride_auth_${selectedRole}`, 'true');
      localStorage.setItem('vride_partner_session', JSON.stringify({ role: selectedRole, token: res.token, user: res.user }));
      onAuthenticated(selectedRole, res.user);
      return;
    }

    // Local fallback when backend server is offline
    const fallback = LOCAL_FALLBACK_CREDENTIALS[selectedRole];
    const idTrim = identifier.trim().toLowerCase();
    if (fallback && fallback.ids.includes(idTrim) && password === fallback.pass) {
      localStorage.setItem(`vride_auth_${selectedRole}`, 'true');
      localStorage.setItem('vride_partner_session', JSON.stringify({ role: selectedRole, user: fallback.user }));
      onAuthenticated(selectedRole, fallback.user);
      return;
    }

    setError('Invalid credentials for selected role. Please verify ID and password.');
  };

  return (
    <div className="min-h-screen bg-[#10151F] flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        {/* Top Brand Hero */}
        <div className="bg-[#151A23] text-white p-6 pb-5 border-b-4 border-[#FFD000]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#FFD000] text-[#10151F] flex items-center justify-center font-black text-xl shadow-md">
              V
            </div>
            <div>
              <h1 className="font-black text-lg tracking-wider text-white">V RIDE PARTNER PLATFORM</h1>
              <p className="text-xs text-gray-300">Unified Login · Vendor · Rider · Admin</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Role Selection */}
          <div>
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-2">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ROLE_OPTIONS.map((role) => {
                const Icon = role.icon;
                const active = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => { setSelectedRole(role.id); setError(''); }}
                    className={`p-2.5 rounded-2xl border text-center transition flex flex-col items-center gap-1 ${
                      active
                        ? 'bg-[#FFD000] border-black text-black font-black shadow-sm'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 font-bold'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px] leading-tight">{role.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">
                {selectedRole === 'rider' ? 'Mobile Number or Email' : 'Registered Email / ID'}
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={activeMeta.hint}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFD000]"
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
              className="w-full py-3 rounded-2xl bg-[#FFD000] hover:bg-yellow-400 text-black font-black text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{loading ? 'Signing In...' : `Sign In as ${activeMeta.label}`}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UnifiedPartnerLogin;
