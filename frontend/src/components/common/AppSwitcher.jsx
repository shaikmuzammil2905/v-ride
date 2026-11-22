import React from 'react';
import { Smartphone, Bike, ShieldCheck, Globe, Monitor, PhoneCall, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AppSwitcher = () => {
  const { currentPortal, setCurrentPortal, isPhoneFrame, setIsPhoneFrame } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-black text-white px-4 py-2.5 shadow-md flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800">
      {/* Brand logo */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-vride-yellow flex items-center justify-center font-black text-black text-lg tracking-tighter shadow-yellow-glow">
          V
        </div>
        <div>
          <span className="font-extrabold text-base tracking-wide flex items-center gap-1.5">
            V RIDE
            <span className="bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              PROD
            </span>
          </span>
          <p className="text-[10px] text-gray-400 hidden sm:block">Mobility · Parcel · Pick & Drop · Food</p>
        </div>
      </div>

      {/* Portal Switcher Buttons */}
      <nav className="flex items-center bg-neutral-900 p-1 rounded-xl border border-neutral-800 text-xs font-semibold overflow-x-auto max-w-full">
        <button
          onClick={() => setCurrentPortal('customer')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            currentPortal === 'customer'
              ? 'bg-vride-yellow text-black font-bold shadow'
              : 'text-gray-300 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Customer App</span>
        </button>

        <button
          onClick={() => setCurrentPortal('partner')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            currentPortal === 'partner'
              ? 'bg-vride-yellow text-black font-bold shadow'
              : 'text-gray-300 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Bike className="w-3.5 h-3.5" />
          <span>Partner App</span>
        </button>

        <button
          onClick={() => setCurrentPortal('admin')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            currentPortal === 'admin'
              ? 'bg-vride-yellow text-black font-bold shadow'
              : 'text-gray-300 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin Panel</span>
        </button>

        <button
          onClick={() => setCurrentPortal('website')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            currentPortal === 'website'
              ? 'bg-vride-yellow text-black font-bold shadow'
              : 'text-gray-300 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Official Website</span>
        </button>
      </nav>

      {/* Frame mode toggle for mobile */}
      <div className="flex items-center gap-2">
        {currentPortal === 'customer' && (
          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg bg-neutral-800 hover:bg-neutral-700 text-gray-200 border border-neutral-700 transition"
            title="Toggle Phone Frame simulator"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isPhoneFrame ? 'Full Screen' : 'Phone Frame'}</span>
          </button>
        )}
        <div className="flex items-center gap-1.5 text-[11px] text-green-400 font-medium bg-green-950/60 px-2.5 py-1 rounded-full border border-green-800/50">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span>Live Ecosystem</span>
        </div>
      </div>
    </header>
  );
};
export default AppSwitcher;
