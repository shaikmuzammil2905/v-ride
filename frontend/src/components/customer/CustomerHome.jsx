import React, { useState } from 'react';
import {
  Menu, Bell, ChevronDown, Bike, Package, Utensils,
  ArrowRight, ShieldCheck, Star, RotateCcw, Zap,
  Navigation, CheckCircle2, ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import DrawerMenu from '../common/DrawerMenu';

export const CustomerHome = ({ onNavigate }) => {
  const { currentUser, selectedLocation, setSelectedLocation, activeFoodOrder, notifications } = useApp();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const hyderabadLocations = [
    'Miyapur, Hyderabad',
    'Kukatpally, Hyderabad',
    'Gachibowli, Hyderabad',
    'Hitec City, Hyderabad',
    'Jubilee Hills, Hyderabad',
    'Banjara Hills, Hyderabad',
    'Madhapur, Hyderabad'
  ];

  return (
    <div className="flex flex-col bg-[#f8f9fa] pb-2 text-gray-900 select-none">
      {/* ============================================================ */}
      {/* 1. DARK HERO SECTION WITH YELLOW WAVE & GLASSY LOCATION PILL */}
      {/* EXACT MATCH TO image copy 32.png                             */}
      {/* ============================================================ */}
      <div className="relative bg-[#0b0e14] text-white pt-3 pb-6 px-4 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FFD600]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Bar inside Dark Hero */}
        <div className="flex items-center justify-between relative z-10">
          <button
            onClick={() => setShowDrawer(true)}
            className="p-2 rounded-xl glass-btn-dark hover:bg-white/10 text-white transition active:scale-95"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Centered V RIDE Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-7 h-7 rounded-lg overflow-hidden border border-[#FFD600] shadow-sm">
              <img src="/logo.png" alt="V RIDE" className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <span className="font-black text-base tracking-wider text-white leading-none block">V RIDE</span>
              <span className="text-[8px] text-[#FFD600] font-black uppercase tracking-wider block">Mobility · Food · Parcel</span>
            </div>
          </div>

          {/* Notification Bell */}
          <button
            onClick={() => setShowNotifications(true)}
            className="relative p-2 rounded-xl glass-btn-dark hover:bg-white/10 text-white transition active:scale-95"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 stroke-[2]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FFD600] ring-2 ring-[#0b0e14]"></span>
          </button>
        </div>

        {/* Greeting & Location Row with 3D Rider Silhouette */}
        <div className="mt-4 flex items-end justify-between relative z-10">
          <div>
            <h1 className="text-xl font-black text-white flex items-center gap-1.5 tracking-tight">
              <span>Hi {currentUser?.name || 'Sri Latha'}</span>
              <span className="text-xl">👋</span>
            </h1>
            <p className="text-xs text-gray-300 font-medium mt-0.5">
              Where do you want to go or order today?
            </p>

            {/* Glassy Location Dropdown Pill */}
            <button
              onClick={() => setShowLocationModal(true)}
              className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-btn-dark hover:bg-white/15 text-xs font-bold text-white transition active:scale-98"
            >
              <span className="w-2 h-2 rounded-full bg-[#FFD600] ring-2 ring-yellow-400/40"></span>
              <span className="truncate max-w-[190px]">{selectedLocation}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>

          {/* 3D Delivery Rider Illustration */}
          <div className="shrink-0 w-20 h-20 -mr-1 relative pointer-events-none">
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#FFD600]/20 to-transparent flex items-center justify-center text-4xl transform hover:scale-105 transition">
              🛵
            </div>
          </div>
        </div>

        {/* Bottom Curved Yellow Accent Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#FFD600]"></div>
      </div>

      {/* ============================================================ */}
      {/* 2. THREE PROMINENT SERVICE CARDS (RIDES, FOOD, PARCEL)       */}
      {/* EXACT MATCH TO image copy 32.png                             */}
      {/* ============================================================ */}
      <div className="px-4 -mt-1 pt-3 pb-1">
        <div className="grid grid-cols-3 gap-2.5">
          {/* 1. RIDES */}
          <button
            onClick={() => onNavigate('rides')}
            className="flex flex-col items-center justify-between p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-yellow-400 transition group active:scale-95 relative overflow-hidden"
          >
            <span className="absolute top-1.5 right-1.5 bg-[#FFD600] text-black text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
              Fast
            </span>
            <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center text-2xl group-hover:scale-110 transition mt-1 shadow-2xs">
              🛵
            </div>
            <div className="text-center mt-2 w-full">
              <span className="font-black text-xs text-gray-900 block">Rides</span>
              <span className="text-[9px] text-gray-500 font-semibold block leading-tight">Bike · Auto · Cab</span>
            </div>
            <div className="mt-2 w-6 h-6 rounded-full glass-btn-yellow flex items-center justify-center">
              <ChevronRight className="w-3.5 h-3.5 text-black stroke-[3]" />
            </div>
          </button>

          {/* 2. FOOD */}
          <button
            onClick={() => onNavigate('food')}
            className="flex flex-col items-center justify-between p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-red-400 transition group active:scale-95 relative overflow-hidden"
          >
            <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
              50% OFF
            </span>
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-2xl group-hover:scale-110 transition mt-1 shadow-2xs">
              🍔
            </div>
            <div className="text-center mt-2 w-full">
              <span className="font-black text-xs text-gray-900 block">Food</span>
              <span className="text-[9px] text-gray-500 font-semibold block leading-tight">Order Online</span>
            </div>
            <div className="mt-2 w-6 h-6 rounded-full glass-btn-yellow flex items-center justify-center">
              <ChevronRight className="w-3.5 h-3.5 text-black stroke-[3]" />
            </div>
          </button>

          {/* 3. PARCEL */}
          <button
            onClick={() => onNavigate('parcel')}
            className="flex flex-col items-center justify-between p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-400 transition group active:scale-95 relative overflow-hidden"
          >
            <span className="absolute top-1.5 right-1.5 bg-purple-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
              Doorstep
            </span>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-2xl group-hover:scale-110 transition mt-1 shadow-2xs">
              📦
            </div>
            <div className="text-center mt-2 w-full">
              <span className="font-black text-xs text-gray-900 block">Parcel</span>
              <span className="text-[9px] text-gray-500 font-semibold block leading-tight">Send Anywhere</span>
            </div>
            <div className="mt-2 w-6 h-6 rounded-full glass-btn-yellow flex items-center justify-center">
              <ChevronRight className="w-3.5 h-3.5 text-black stroke-[3]" />
            </div>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. ACTIVE ORDER LIVE TRACKING PILL                           */}
      {/* ============================================================ */}
      <div className="px-4 pt-2.5">
        <div
          onClick={() => onNavigate('track')}
          className="bg-[#0b0e14] text-white p-3.5 rounded-2xl shadow-lg border border-[#FFD600]/30 flex items-center justify-between cursor-pointer hover:border-[#FFD600] transition active:scale-98"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFD600] flex items-center justify-center text-black font-bold text-lg shadow-sm">
              🛵
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xs text-[#FFD600]">{activeFoodOrder?.etaText || 'Arriving in 8 min'}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-[11px] text-gray-300 font-medium truncate max-w-[170px]">
                {activeFoodOrder?.restaurantName || 'Paradise Biryani'}
              </p>
            </div>
          </div>
          <button className="glass-btn-yellow px-3 py-1.5 rounded-xl text-black font-black text-xs flex items-center gap-1 active:scale-95">
            <span>Track Live</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. FOOD OFFER PROMO BANNER (VRIDE20)                         */}
      {/* ============================================================ */}
      <div className="px-4 pt-3">
        <div
          onClick={() => onNavigate('food')}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white p-4 cursor-pointer hover:shadow-md transition active:scale-98"
        >
          <div className="max-w-[65%]">
            <span className="glass-pill px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white inline-block">
              Code: VRIDE20
            </span>
            <h3 className="text-base font-black mt-1.5 leading-tight">
              Flat 20% OFF
            </h3>
            <p className="text-xs text-rose-100 font-medium">on all food deliveries in Hyderabad</p>
          </div>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-20 h-20 rounded-xl overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=80"
              alt="Delicious Burger"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 5. QUICK 1-TAP REBOOK ROUTE                                  */}
      {/* ============================================================ */}
      <div className="px-4 pt-3.5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-gray-900">Recent Route</h2>
          <button
            onClick={() => onNavigate('rides')}
            className="text-xs font-bold text-gray-700 hover:text-black"
          >
            All Rides →
          </button>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-900 flex items-center justify-center text-lg">
              🛵
            </div>
            <div>
              <h3 className="font-extrabold text-xs text-gray-900">Miyapur Metro → Kukatpally</h3>
              <p className="text-[10px] text-gray-500 font-medium">₹56–₹72 · 5.4 km · Bike Taxi</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('rides')}
            className="glass-btn-yellow px-3.5 py-1.5 rounded-xl text-black font-extrabold text-xs flex items-center gap-1.5 active:scale-95"
          >
            <RotateCcw className="w-3 h-3 stroke-[2.5]" />
            <span>Rebook</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 6. POPULAR RESTAURANTS IN HYDERABAD                          */}
      {/* ============================================================ */}
      <div className="px-4 pt-3.5">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Popular Restaurants</h2>
            <p className="text-[10px] text-gray-500">Delivered hot & fresh to your doorstep</p>
          </div>
          <button
            onClick={() => onNavigate('food')}
            className="text-xs font-bold text-gray-700 hover:text-black"
          >
            View All →
          </button>
        </div>

        <div className="space-y-2.5">
          {/* Restaurant 1: Paradise Biryani */}
          <div
            onClick={() => onNavigate('food')}
            className="p-3 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex items-center justify-between cursor-pointer hover:border-yellow-300 transition active:scale-98"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&auto=format&fit=crop&q=80"
                alt="Paradise Biryani"
                className="w-14 h-14 rounded-xl object-cover shadow-xs"
              />
              <div>
                <h3 className="font-extrabold text-xs text-gray-900">Paradise Biryani</h3>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-500 mt-0.5">
                  <span className="flex items-center gap-0.5 font-bold text-gray-900">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    4.4
                  </span>
                  <span>·</span>
                  <span>30–40 min</span>
                  <span>·</span>
                  <span className="text-green-600 font-bold">50% OFF</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">Authentic Chicken & Mutton Dum Biryani</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          {/* Restaurant 2: Domino's */}
          <div
            onClick={() => onNavigate('food')}
            className="p-3 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex items-center justify-between cursor-pointer hover:border-yellow-300 transition active:scale-98"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80"
                alt="Domino's Pizza"
                className="w-14 h-14 rounded-xl object-cover shadow-xs"
              />
              <div>
                <h3 className="font-extrabold text-xs text-gray-900">Domino's Pizza</h3>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-500 mt-0.5">
                  <span className="flex items-center gap-0.5 font-bold text-gray-900">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    4.3
                  </span>
                  <span>·</span>
                  <span>25–35 min</span>
                  <span>·</span>
                  <span className="text-green-600 font-bold">Flat ₹100 OFF</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">Farmhouse, Pepperoni & Garlic Breads</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 7. V RIDE PARCEL PROMO BANNER                                */}
      {/* ============================================================ */}
      <div className="px-4 pt-3.5">
        <div
          onClick={() => onNavigate('parcel')}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 flex items-center justify-between cursor-pointer hover:border-purple-400 transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black shadow-xs">
              📦
            </div>
            <div>
              <span className="text-[9px] font-black uppercase text-purple-700 tracking-wider">V RIDE Express Parcel</span>
              <h3 className="font-extrabold text-xs text-gray-900">Send Packages Doorstep</h3>
              <p className="text-[10px] text-gray-600">Documents, clothes & gifts delivered across Hyderabad</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-purple-600" />
        </div>
      </div>

      {/* ============================================================ */}
      {/* 8. V RIDE TRUST & SAFETY GUARANTEE                           */}
      {/* ============================================================ */}
      <div className="px-4 pt-3.5">
        <div className="p-3.5 rounded-2xl bg-white border border-gray-100 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <h3 className="font-extrabold text-xs text-gray-900">V RIDE Assured Safety</h3>
            </div>
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              100% Protected
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px] pt-1">
            <div className="p-2 bg-gray-50 rounded-xl">
              <span className="text-sm block">🛡️</span>
              <span className="font-bold text-gray-800 mt-0.5 block">Verified Fleet</span>
              <span className="text-[9px] text-gray-400">Police Checked</span>
            </div>
            <div className="p-2 bg-gray-50 rounded-xl">
              <span className="text-sm block">📍</span>
              <span className="font-bold text-gray-800 mt-0.5 block">Live GPS</span>
              <span className="text-[9px] text-gray-400">Share with family</span>
            </div>
            <div className="p-2 bg-gray-50 rounded-xl">
              <span className="text-sm block">🚨</span>
              <span className="font-bold text-gray-800 mt-0.5 block">24/7 SOS</span>
              <span className="text-[9px] text-gray-400">Police Hotline 112</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 9. HYDERABAD BRAND PROMISE BANNER                            */}
      {/* ============================================================ */}
      <div className="px-4 pt-3 pb-2">
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#080808] to-[#1c1c1c] text-white border border-[#FFD600]/40 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD600] text-black flex items-center justify-center font-black text-base shadow-sm shrink-0">
              <Zap className="w-5 h-5 fill-black stroke-black" />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase text-[#FFD600] tracking-wider block">Hyderabad's #1 Mobility App</span>
              <h4 className="font-extrabold text-xs text-white">Fast Rides · Hot Food · Express Parcels</h4>
              <p className="text-[10px] text-gray-300 font-medium">★ 4.8 Rating · Trusted by 50,000+ Hyderabadis</p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 10. LOCATION PICKER MODAL                                    */}
      {/* ============================================================ */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl animate-slideUp">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-base text-gray-900">Select Location</h3>
              <button
                onClick={() => setShowLocationModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs"
              >
                ✕
              </button>
            </div>
            <div className="mt-3 space-y-1.5 max-h-64 overflow-y-auto">
              {hyderabadLocations.map(loc => (
                <button
                  key={loc}
                  onClick={() => {
                    setSelectedLocation(loc);
                    setShowLocationModal(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                    selectedLocation === loc ? 'bg-yellow-50 text-black border border-yellow-300' : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Navigation className="w-3.5 h-3.5 text-gray-400" />
                    {loc}
                  </span>
                  {selectedLocation === loc && <span className="text-xs text-yellow-600 font-bold">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 11. NOTIFICATIONS MODAL                                      */}
      {/* ============================================================ */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#FFD600]" />
                Notifications
              </h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs"
              >
                ✕
              </button>
            </div>
            <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto">
              {notifications?.map(n => (
                <div key={n.id} className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900">{n.title}</h4>
                    <span className="text-[10px] text-gray-400">{n.time}</span>
                  </div>
                  <p className="text-gray-600 mt-1 leading-snug">{n.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Drawer Menu */}
      <DrawerMenu
        isOpen={showDrawer}
        onClose={() => setShowDrawer(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default CustomerHome;
