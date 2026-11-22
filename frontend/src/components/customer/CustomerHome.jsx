import React, { useState } from 'react';
import {
  Menu, Bell, ChevronDown, Bike, Package, MapPin, Utensils,
  ArrowRight, Shield, Award, Clock, Star, Phone, MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CustomerHome = ({ onNavigate }) => {
  const { currentUser, selectedLocation, setSelectedLocation, activeRide, activeFoodOrder, notifications } = useApp();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showMenuDrawer, setShowMenuDrawer] = useState(false);
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
    <div className="flex flex-col min-h-full bg-[#f8f9fa] pb-24 text-gray-900 select-none">
      {/* --- TOP STATUS & HEADER --- */}
      <div className="bg-white px-4 pt-3 pb-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMenuDrawer(true)}
            className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-800 transition active:scale-95"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 stroke-[2.2]" />
          </button>

          {/* V RIDE Brand Logo matching reference screenshot */}
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-7 h-7 rounded-lg bg-vride-yellow flex items-center justify-center shadow-sm">
              <span className="font-black text-black text-sm tracking-tight">V</span>
            </div>
            <span className="font-extrabold text-lg tracking-wider text-black">V RIDE</span>
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
      </div>

      {/* --- USER GREETING & LOCATION BAR (Exact match to reference screenshot) --- */}
      <div className="px-5 pt-4 pb-2 bg-white">
        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-1.5">
          <span>Hi {currentUser.name || 'Sri Latha'}</span>
          <span className="text-xl">👋</span>
        </h1>
        <p className="text-xs text-gray-500 font-medium mt-0.5">What would you like to do today?</p>

        {/* Location Dropdown Pill */}
        <button
          onClick={() => setShowLocationModal(true)}
          className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 hover:bg-gray-100 transition active:scale-98"
        >
          <div className="w-2 h-2 rounded-full bg-vride-yellow ring-2 ring-yellow-200"></div>
          <span className="truncate max-w-[200px]">{selectedLocation}</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </button>
      </div>

      {/* --- SERVICE CATEGORY CARDS (Exact match to reference screenshot) --- */}
      <div className="px-5 pt-4 pb-2">
        <div className="grid grid-cols-4 gap-2.5">
          {/* 1. Ride */}
          <button
            onClick={() => onNavigate('ride')}
            className="flex flex-col items-center p-2.5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-yellow-300 transition group active:scale-95"
          >
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 group-hover:scale-105 transition shadow-inner">
              <Bike className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="font-bold text-xs text-gray-900 mt-2">Ride</span>
            <span className="text-[10px] text-gray-400 font-medium text-center leading-tight">Book a<br />bike ride</span>
          </button>

          {/* 2. Parcels */}
          <button
            onClick={() => onNavigate('parcel')}
            className="flex flex-col items-center p-2.5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-300 transition group active:scale-95"
          >
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-105 transition shadow-inner">
              <Package className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="font-bold text-xs text-gray-900 mt-2">Parcels</span>
            <span className="text-[10px] text-gray-400 font-medium text-center leading-tight">Send<br />packages</span>
          </button>

          {/* 3. Pick & Drop */}
          <button
            onClick={() => onNavigate('pickdrop')}
            className="flex flex-col items-center p-2.5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-300 transition group active:scale-95"
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-105 transition shadow-inner">
              <MapPin className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="font-bold text-xs text-gray-900 mt-2">Pick & Drop</span>
            <span className="text-[10px] text-gray-400 font-medium text-center leading-tight">Send or<br />collect</span>
          </button>

          {/* 4. Food */}
          <button
            onClick={() => onNavigate('food')}
            className="flex flex-col items-center p-2.5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-red-300 transition group active:scale-95"
          >
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500 group-hover:scale-105 transition shadow-inner">
              <Utensils className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="font-bold text-xs text-gray-900 mt-2">Food</span>
            <span className="text-[10px] text-gray-400 font-medium text-center leading-tight">Order<br />food</span>
          </button>
        </div>
      </div>

      {/* --- ACTIVE ORDER FLOATING PILL (If ride or food active) --- */}
      {activeFoodOrder && (
        <div className="px-5 pt-2">
          <div
            onClick={() => onNavigate('track')}
            className="bg-black text-white p-3.5 rounded-2xl shadow-lg border border-yellow-500/40 flex items-center justify-between cursor-pointer hover:bg-neutral-900 transition active:scale-98"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-vride-yellow flex items-center justify-center text-black font-bold text-sm">
                🛵
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-vride-yellow">{activeFoodOrder.etaText || 'Arriving in 8 min'}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span>
                </div>
                <p className="text-[11px] text-gray-300 font-medium truncate max-w-[180px]">{activeFoodOrder.restaurantName || 'Paradise Biryani'}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-vride-yellow">
              <span>Track</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}

      {/* --- PROMOTIONAL BANNER: Send Parcels Fast & Safe (Matches screenshot) --- */}
      <div className="px-5 pt-3">
        <div
          onClick={() => onNavigate('parcel')}
          className="relative overflow-hidden rounded-2xl bg-[#FFF9E6] border border-yellow-200 p-4 cursor-pointer hover:shadow-md transition active:scale-98"
        >
          <div className="max-w-[62%] relative z-10">
            <h2 className="text-sm font-extrabold text-gray-900 leading-snug">
              Send Parcels<br />Fast & Safe
            </h2>
            <p className="text-[11px] text-gray-600 mt-0.5">Doorstep pickup & delivery</p>
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate('parcel'); }}
              className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black text-white text-xs font-bold hover:bg-gray-800 transition shadow"
            >
              <span>Send Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Courier on Scooter Graphic Illustration */}
          <div className="absolute right-2 bottom-1 w-32 h-24 flex items-end justify-center pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=300&auto=format&fit=crop&q=80"
              alt="Fast Parcel Delivery Scooter"
              className="w-28 h-20 object-cover rounded-xl shadow-sm mix-blend-multiply opacity-90"
            />
          </div>
        </div>
      </div>

      {/* --- OFFERS FOR YOU (Exact match to screenshot) --- */}
      <div className="px-5 pt-5">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-bold text-gray-900">Offers for You</h2>
          <button
            onClick={() => onNavigate('food')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            View All
          </button>
        </div>

        {/* Offer Card: Flat 20% OFF on Food Orders */}
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
            <p className="text-xs text-red-100 font-medium">on Food Orders</p>
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

      {/* --- RECOMMENDED SERVICES / POPULAR IN HYDERABAD --- */}
      <div className="px-5 pt-5">
        <h2 className="text-sm font-bold text-gray-900 mb-2.5">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-2.5">
          <div
            onClick={() => onNavigate('ride')}
            className="p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow transition cursor-pointer flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600 font-bold">
              ⚡
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Daily Commute</p>
              <p className="text-[10px] text-gray-400">Bike rides from ₹35</p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('pickdrop')}
            className="p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow transition cursor-pointer flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
              📄
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Send Documents</p>
              <p className="text-[10px] text-gray-400">Safe doorstep transit</p>
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
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
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
                <Bell className="w-4 h-4 text-vride-yellow" />
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

      {/* --- MENU DRAWER --- */}
      {showMenuDrawer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="bg-white w-72 h-full shadow-2xl p-5 flex flex-col justify-between animate-slideRight">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-vride-yellow flex items-center justify-center font-black text-black">
                    V
                  </div>
                  <span className="font-black text-base tracking-wide">V RIDE</span>
                </div>
                <button
                  onClick={() => setShowMenuDrawer(false)}
                  className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs"
                >
                  ✕
                </button>
              </div>

              {/* User summary */}
              <div className="mt-4 p-3 rounded-2xl bg-yellow-50/60 border border-yellow-100 flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-yellow-400"
                />
                <div>
                  <h4 className="font-bold text-xs text-gray-900">{currentUser.name}</h4>
                  <p className="text-[11px] text-gray-500">{currentUser.phone}</p>
                </div>
              </div>

              {/* Navigation links */}
              <div className="mt-5 space-y-1">
                <button
                  onClick={() => { setShowMenuDrawer(false); onNavigate('orders'); }}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
                >
                  📦 My Orders & Rides
                </button>
                <button
                  onClick={() => { setShowMenuDrawer(false); onNavigate('wallet'); }}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
                >
                  💳 V RIDE Wallet (₹{currentUser.walletBalance || 850})
                </button>
                <button
                  onClick={() => { setShowMenuDrawer(false); onNavigate('support'); }}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
                >
                  🎧 24/7 Help & Support
                </button>
                <button
                  onClick={() => { setShowMenuDrawer(false); onNavigate('profile'); }}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
                >
                  👤 Manage Profile & Addresses
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 text-center">
              <span className="text-[10px] text-gray-400 font-medium">V RIDE v2.4.0 · Made for India</span>
            </div>
          </div>
          <div className="flex-1" onClick={() => setShowMenuDrawer(false)}></div>
        </div>
      )}
    </div>
  );
};
export default CustomerHome;
