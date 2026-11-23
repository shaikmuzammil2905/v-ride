import React, { useState } from 'react';
import {
  Menu, Bell, ChevronDown, Bike, Package, Utensils,
  ArrowRight, ShieldCheck, Clock, Star, Phone, MessageSquare,
  RotateCcw, Sparkles, ChevronRight, Gift, Copy, CheckCircle2,
  Navigation, Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import DrawerMenu from '../common/DrawerMenu';

export const CustomerHome = ({ onNavigate }) => {
  const { currentUser, selectedLocation, setSelectedLocation, activeRide, activeFoodOrder, notifications } = useApp();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const hyderabadLocations = [
    'Miyapur, Hyderabad',
    'Kukatpally, Hyderabad',
    'Gachibowli, Hyderabad',
    'Hitec City, Hyderabad',
    'Jubilee Hills, Hyderabad',
    'Banjara Hills, Hyderabad',
    'Madhapur, Hyderabad'
  ];

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('VRIDE100');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-full bg-[#f8f9fa] pb-3 text-gray-900 select-none">
      {/* --- FIXED NATIVE HEADER WITH NEW OFFICIAL LOGO --- */}
      <header className="bg-white px-4 pt-3 pb-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowDrawer(true)}
            className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-800 transition active:scale-95"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 stroke-[2.2]" />
          </button>

          {/* New Official V RIDE Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-yellow-400 shadow-xs">
              <img src="/logo.png" alt="V RIDE" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-black text-lg tracking-wider text-[#080808] leading-none block">V RIDE</span>
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Mobility · Food · Parcel</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <button
            onClick={() => setShowNotifications(true)}
            className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-800 transition active:scale-95"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 stroke-[2]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>
        </div>
      </header>

      {/* --- USER GREETING & LOCATION PICKER --- */}
      <div className="px-4 pt-3.5 pb-2 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900 flex items-center gap-1.5">
              <span>Hi {currentUser.name || 'Sri Latha'}</span>
              <span className="text-xl">👋</span>
            </h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Where do you want to go or order today?</p>
          </div>
        </div>

        {/* Location Dropdown Pill */}
        <button
          onClick={() => setShowLocationModal(true)}
          className="mt-2.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 hover:bg-gray-100 transition active:scale-98"
        >
          <div className="w-2 h-2 rounded-full bg-[#FFD600] ring-2 ring-yellow-200"></div>
          <span className="truncate max-w-[200px]">{selectedLocation}</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </button>
      </div>

      {/* --- 3 MAIN PROMINENT SERVICE CARDS (RIDES, FOOD, PARCEL) --- */}
      {/* Pick & Drop standalone removed per user instructions and image copy 4.png */}
      <div className="px-4 pt-3 pb-1">
        <div className="grid grid-cols-3 gap-2.5">
          {/* 1. RIDES (Rapido-inspired) */}
          <button
            onClick={() => onNavigate('rides')}
            className="flex flex-col items-center justify-between p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-yellow-400 transition group active:scale-95 relative overflow-hidden"
          >
            <span className="absolute top-1.5 right-1.5 bg-yellow-400 text-black text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase">
              Fast
            </span>
            <div className="w-13 h-13 rounded-2xl bg-yellow-50 flex items-center justify-center text-yellow-800 group-hover:scale-105 transition shadow-xs mt-1">
              <Bike className="w-7 h-7 stroke-[2.3]" />
            </div>
            <div className="text-center mt-2">
              <span className="font-black text-xs text-gray-900 block">Rides</span>
              <span className="text-[10px] text-gray-500 font-semibold block leading-tight">Bike · Auto · Cab</span>
            </div>
          </button>

          {/* 2. FOOD (Swiggy-inspired) */}
          <button
            onClick={() => onNavigate('food')}
            className="flex flex-col items-center justify-between p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-red-400 transition group active:scale-95 relative overflow-hidden"
          >
            <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase">
              50% OFF
            </span>
            <div className="w-13 h-13 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 group-hover:scale-105 transition shadow-xs mt-1">
              <Utensils className="w-7 h-7 stroke-[2.3]" />
            </div>
            <div className="text-center mt-2">
              <span className="font-black text-xs text-gray-900 block">Food</span>
              <span className="text-[10px] text-gray-500 font-semibold block leading-tight">Order Online</span>
            </div>
          </button>

          {/* 3. PARCEL (Rapido Parcel-inspired) */}
          <button
            onClick={() => onNavigate('parcel')}
            className="flex flex-col items-center justify-between p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-400 transition group active:scale-95 relative overflow-hidden"
          >
            <span className="absolute top-1.5 right-1.5 bg-purple-600 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase">
              Doorstep
            </span>
            <div className="w-13 h-13 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-700 group-hover:scale-105 transition shadow-xs mt-1">
              <Package className="w-7 h-7 stroke-[2.3]" />
            </div>
            <div className="text-center mt-2">
              <span className="font-black text-xs text-gray-900 block">Parcel</span>
              <span className="text-[10px] text-gray-500 font-semibold block leading-tight">Send Anywhere</span>
            </div>
          </button>
        </div>
      </div>

      {/* --- ACTIVE ORDER FLOATING CARD (If ride or food active) --- */}
      {activeFoodOrder && (
        <div className="px-4 pt-2.5">
          <div
            onClick={() => onNavigate('track')}
            className="bg-[#080808] text-white p-3.5 rounded-2xl shadow-lg border border-yellow-400/40 flex items-center justify-between cursor-pointer hover:bg-neutral-900 transition active:scale-98"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFD600] flex items-center justify-center text-black font-bold text-sm">
                🛵
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-xs text-[#FFD600]">{activeFoodOrder.etaText || 'Arriving in 8 min'}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span>
                </div>
                <p className="text-[11px] text-gray-300 font-medium truncate max-w-[180px]">{activeFoodOrder.restaurantName || 'Paradise Biryani'}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-[#FFD600]">
              <span>Track Live</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}

      {/* --- SWIGGY-INSPIRED FOOD OFFER PROMO --- */}
      <div className="px-4 pt-3">
        <div
          onClick={() => onNavigate('food')}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white p-4 cursor-pointer hover:shadow-md transition active:scale-98"
        >
          <div className="max-w-[65%]">
            <span className="bg-white/20 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-sm">
              Code: VRIDE20
            </span>
            <h3 className="text-base font-black mt-1.5 leading-tight">
              Flat 20% OFF
            </h3>
            <p className="text-xs text-red-100 font-medium">on all food deliveries in Hyderabad</p>
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

      {/* --- RAPIDO-INSPIRED 1-TAP REBOOK ROUTE --- */}
      <div className="px-4 pt-3.5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-gray-900">Recent Route (Rapido Style)</h2>
          <button
            onClick={() => onNavigate('rides')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            All Rides
          </button>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-800 flex items-center justify-center text-lg">
              🛵
            </div>
            <div>
              <h3 className="font-extrabold text-xs text-gray-900">Miyapur Metro → Kukatpally</h3>
              <p className="text-[10px] text-gray-500 font-medium">₹56–₹72 · 5.4 km · Bike Taxi</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('rides')}
            className="px-3 py-1.5 rounded-xl bg-[#FFD600] text-black font-extrabold text-xs shadow-xs hover:bg-yellow-400 transition flex items-center gap-1 active:scale-95"
          >
            <RotateCcw className="w-3 h-3 stroke-[2.5]" />
            <span>Rebook</span>
          </button>
        </div>
      </div>

      {/* --- POPULAR RESTAURANTS IN HYDERABAD (Swiggy-inspired) --- */}
      <div className="px-4 pt-3.5">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Popular Restaurants (Swiggy Style)</h2>
            <p className="text-[10px] text-gray-500">Delivered hot & fresh to your doorstep</p>
          </div>
          <button
            onClick={() => onNavigate('food')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700"
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

      {/* --- RAPIDO PARCEL PROMO BANNER --- */}
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
              <span className="text-[9px] font-black uppercase text-purple-700 tracking-wider">Rapido Parcel Style</span>
              <h3 className="font-extrabold text-xs text-gray-900">Send Packages Doorstep</h3>
              <p className="text-[10px] text-gray-600">Documents, clothes & gifts delivered across Hyderabad</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-purple-600" />
        </div>
      </div>

      {/* --- V RIDE TRUST & SAFETY GUARANTEE --- */}
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

      {/* --- GRAND HYDERABAD BRAND PROMISE BANNER (Fills and elevates bottom layout) --- */}
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

      {/* --- LOCATION PICKER MODAL --- */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
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

      {/* --- NOTIFICATIONS MODAL --- */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
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
              {notifications.map(n => (
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

      {/* --- REDESIGNED HAMBURGER DRAWER --- */}
      <DrawerMenu
        isOpen={showDrawer}
        onClose={() => setShowDrawer(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
};
export default CustomerHome;
