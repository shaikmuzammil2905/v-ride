import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, Bike, Store, ArrowRight, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AuthLayoutShell, getDashboardPathForRole } from './AuthShared';

const LOGIN_OPTIONS = [
  {
    id: 'customer',
    title: 'Customer Login',
    subtitle: 'Book bike, auto & cab rides, order food, and send parcels across Hyderabad.',
    badge: 'Mobility · Food · Parcel',
    path: '/login/customer',
    icon: User,
    accentClass: 'bg-[#FFF9DB] border-[#FFD000]/60 hover:border-[#FFD000]',
    iconBgClass: 'bg-[#FFD000] text-black'
  },
  {
    id: 'admin',
    title: 'Admin Login',
    subtitle: 'Operations command center, fleet governance, payouts, and platform settings.',
    badge: 'Operations Command',
    path: '/login/admin',
    icon: ShieldCheck,
    accentClass: 'bg-gray-50 border-gray-200 hover:border-[#10151F]',
    iconBgClass: 'bg-[#10151F] text-[#FFD000]'
  },
  {
    id: 'partner',
    title: 'Rider / Restaurant Partner Login',
    subtitle: 'One unified V RIDE Partner Login for Rider Partners and Restaurant Owners.',
    badge: 'Auto Role Routing',
    path: '/login/partner',
    icon: Bike,
    secondaryIcon: Store,
    accentClass: 'bg-amber-50/70 border-amber-300 hover:border-black',
    iconBgClass: 'bg-[#FFD000] text-black'
  }
];

export const LoginSelectionScreen = () => {
  const navigate = useNavigate();
  const { authUser, logoutSession } = useApp();

  return (
    <AuthLayoutShell
      title="V RIDE PLATFORM"
      subtitle="Select your portal to sign in securely"
      badge="Unified Auth"
      showBack={false}
    >
      <div className="space-y-4">
        {authUser && (
          <div className="p-3.5 rounded-2xl bg-[#10151F] text-white flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase text-[#FFD000]">Active Session</p>
              <p className="text-xs font-extrabold truncate">
                {authUser.name} ({authUser.role})
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => navigate(getDashboardPathForRole(authUser.role))}
                className="px-3 py-1.5 rounded-xl bg-[#FFD000] text-black font-black text-[11px] hover:bg-yellow-400 transition"
              >
                Open Dashboard
              </button>
              <button
                type="button"
                onClick={logoutSession}
                title="Sign Out"
                className="p-1.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {LOGIN_OPTIONS.map((option) => {
            const Icon = option.icon;
            const SecondaryIcon = option.secondaryIcon;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => navigate(option.path)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-3.5 shadow-xs hover:shadow-md active:scale-[0.99] ${option.accentClass}`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${option.iconBgClass}`}>
                  {SecondaryIcon ? (
                    <div className="flex items-center gap-0.5">
                      <Icon className="w-4 h-4 stroke-[2.4]" />
                      <SecondaryIcon className="w-4 h-4 stroke-[2.4]" />
                    </div>
                  ) : (
                    <Icon className="w-5 h-5 stroke-[2.4]" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-black text-sm text-gray-900">{option.title}</h2>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-black/5 text-gray-700">
                      {option.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 mt-1 leading-snug">{option.subtitle}</p>
                </div>

                <ArrowRight className="w-4 h-4 text-gray-700 shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
    </AuthLayoutShell>
  );
};

export default LoginSelectionScreen;
