import React, { useState } from 'react';
import {
  X, Bike, Package, Utensils, ShieldCheck,
  HelpCircle, LogOut, ChevronRight, Tag,
  CreditCard, MapPin, ExternalLink, Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DrawerMenu = ({ isOpen, onClose, onNavigate }) => {
  const { currentUser, setCurrentPortal } = useApp();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentsModal, setShowPaymentsModal] = useState(false);
  const [showCouponsModal, setShowCouponsModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Slide-in Drawer matching image copy 33.png */}
      <div className="relative w-[85%] max-w-[320px] bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-slideRight overflow-y-auto">
        <div>
          {/* ============================================================ */}
          {/* 1. DARK HEADER WITH LOGO & CLOSE BUTTON (image copy 33.png)   */}
          {/* ============================================================ */}
          <div className="relative bg-[#0b0e14] text-white p-5 pb-6 overflow-hidden">
            {/* Glow */}
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#FFD600]/15 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg overflow-hidden shadow-xs border border-[#FFD600]">
                  <img src="/logo.png" alt="V RIDE" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="font-black text-base tracking-wider text-white">V RIDE</span>
                  <span className="text-[8px] block text-[#FFD600] font-black uppercase -mt-0.5">Rides · Food · Parcel</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full glass-btn-dark flex items-center justify-center text-white hover:bg-white/20 active:scale-95"
                aria-label="Close menu"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Profile Card inside Header */}
            <div
              onClick={() => { onClose(); onNavigate('profile'); }}
              className="mt-4 p-3 rounded-2xl glass-pill-dark border border-white/10 flex items-center gap-3 cursor-pointer hover:border-[#FFD600] transition"
            >
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'}
                alt={currentUser?.name || 'Sri Latha'}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-[#FFD600]"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-extrabold text-xs text-white truncate">{currentUser?.name || 'Sri Latha'}</h4>
                <p className="text-[11px] text-gray-300 truncate">{currentUser?.phone || '+91 98765 43210'}</p>
                <span className="inline-block mt-0.5 px-2 py-0.2 rounded-full bg-[#FFD600] text-black text-[9px] font-black">
                  Verified Customer ✓
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
            </div>

            {/* Bottom Yellow Accent Wave */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFD600]"></div>
          </div>

          {/* ============================================================ */}
          {/* 2. SECTIONS WITH VERTICAL YELLOW BAR INDICATOR |             */}
          {/* EXACT MATCH TO image copy 33.png                             */}
          {/* ============================================================ */}
          <div className="p-4 space-y-4 text-xs font-bold text-gray-700">
            {/* --- SECTION 1: PRIMARY SERVICES --- */}
            <div>
              <div className="flex items-center gap-1.5 text-[11px] uppercase font-black text-gray-900 px-2 mb-1.5">
                <span className="w-1 h-3.5 bg-[#FFD600] rounded-full inline-block"></span>
                <span>PRIMARY SERVICES</span>
              </div>

              <div className="space-y-0.5">
                <button
                  onClick={() => { onClose(); onNavigate('rides'); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-yellow-50 hover:text-black transition"
                >
                  <div className="flex items-center gap-3">
                    <Bike className="w-4 h-4 text-yellow-600 stroke-[2.2]" />
                    <span>My Rides</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>

                <button
                  onClick={() => { onClose(); onNavigate('food'); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-yellow-50 hover:text-black transition"
                >
                  <div className="flex items-center gap-3">
                    <Utensils className="w-4 h-4 text-red-500 stroke-[2.2]" />
                    <span>Food Orders</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>

                <button
                  onClick={() => { onClose(); onNavigate('parcel'); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-yellow-50 hover:text-black transition"
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-purple-600 stroke-[2.2]" />
                    <span>Send Parcels</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* --- SECTION 2: ACCOUNT & PREFERENCES --- */}
            <div>
              <div className="flex items-center gap-1.5 text-[11px] uppercase font-black text-gray-900 px-2 mb-1.5">
                <span className="w-1 h-3.5 bg-[#FFD600] rounded-full inline-block"></span>
                <span>ACCOUNT & PREFERENCES</span>
              </div>

              <div className="space-y-0.5">
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-yellow-50 hover:text-black transition"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-blue-600 stroke-[2.2]" />
                    <span>Saved Addresses</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold">3 Saved</span>
                </button>

                <button
                  onClick={() => setShowPaymentsModal(true)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-yellow-50 hover:text-black transition"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4 text-green-600 stroke-[2.2]" />
                    <span>Payments & UPI</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>

                <button
                  onClick={() => setShowCouponsModal(true)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-yellow-50 hover:text-black transition"
                >
                  <div className="flex items-center gap-3">
                    <Tag className="w-4 h-4 text-orange-500 stroke-[2.2]" />
                    <span>Offers & Promo Codes</span>
                  </div>
                  <span className="text-[9px] font-black bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">
                    3 Active
                  </span>
                </button>
              </div>
            </div>

            {/* --- SECTION 3: SUPPORT & PORTALS --- */}
            <div>
              <div className="flex items-center gap-1.5 text-[11px] uppercase font-black text-gray-900 px-2 mb-1.5">
                <span className="w-1 h-3.5 bg-[#FFD600] rounded-full inline-block"></span>
                <span>SUPPORT & PORTALS</span>
              </div>

              <div className="space-y-0.5">
                <button
                  onClick={() => { onClose(); onNavigate('support'); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-yellow-50 hover:text-black transition"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-amber-600 stroke-[2.2]" />
                    <span>24/7 Help & Support</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>

                <button
                  onClick={() => setShowAboutModal(true)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-yellow-50 hover:text-black transition"
                >
                  <div className="flex items-center gap-3">
                    <Info className="w-4 h-4 text-gray-600 stroke-[2.2]" />
                    <span>About V RIDE</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold">v2.5.0</span>
                </button>
              </div>
            </div>

            {/* --- SECTION 4: SWITCH PORTALS (image copy 33.png) --- */}
            <div>
              <div className="flex items-center gap-1.5 text-[11px] uppercase font-black text-gray-900 px-2 mb-1.5">
                <span className="w-1 h-3.5 bg-[#FFD600] rounded-full inline-block"></span>
                <span>SWITCH PORTALS</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 pt-1">
                <button
                  onClick={() => { onClose(); onNavigate('rides'); }}
                  className="p-2 rounded-xl border border-yellow-400 bg-yellow-50 text-center active:scale-95 transition"
                >
                  <span className="text-lg block">🛵</span>
                  <span className="text-[9px] font-black text-black block leading-tight mt-0.5">Ride Portal</span>
                </button>

                <button
                  onClick={() => { onClose(); onNavigate('food'); }}
                  className="p-2 rounded-xl border border-gray-200 bg-white text-center hover:bg-gray-50 active:scale-95 transition"
                >
                  <span className="text-lg block">🍔</span>
                  <span className="text-[9px] font-bold text-gray-800 block leading-tight mt-0.5">Food Portal</span>
                </button>

                <button
                  onClick={() => { onClose(); onNavigate('parcel'); }}
                  className="p-2 rounded-xl border border-gray-200 bg-white text-center hover:bg-gray-50 active:scale-95 transition"
                >
                  <span className="text-lg block">📦</span>
                  <span className="text-[9px] font-bold text-gray-800 block leading-tight mt-0.5">Parcel Portal</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Sign Out */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => {
              if (window.confirm('Sign out from V RIDE Customer Account?')) {
                onClose();
                setCurrentPortal('website');
              }
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black text-red-600 bg-red-50 hover:bg-red-100 transition active:scale-98"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* ADDRESS MODAL */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-black text-sm text-gray-900">Saved Addresses</h3>
              <button
                onClick={() => setShowAddressModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200">
                <span className="font-black block text-gray-900">🏠 Home</span>
                <p className="text-gray-500 text-[11px]">19-7-326, I.P.D Colony, Miyapur, Hyderabad</p>
              </div>
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200">
                <span className="font-black block text-gray-900">💼 Work</span>
                <p className="text-gray-500 text-[11px]">Cyber Gateway, Phase 2, Hitec City, Hyderabad</p>
              </div>
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200">
                <span className="font-black block text-gray-900">📍 Other</span>
                <p className="text-gray-500 text-[11px]">Kukatpally Metro Station, Hyderabad</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAYMENTS MODAL */}
      {showPaymentsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-black text-sm text-gray-900">Payment & UPI Methods</h3>
              <button
                onClick={() => setShowPaymentsModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-yellow-50 border border-yellow-300 flex items-center justify-between">
                <div>
                  <span className="font-black text-gray-900 block">Google Pay / PhonePe UPI</span>
                  <span className="text-[10px] text-gray-500">srilatha@okhdfcbank</span>
                </div>
                <span className="text-xs font-black text-emerald-600">✓ Default</span>
              </div>
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200">
                <span className="font-black text-gray-900 block">V RIDE Wallet</span>
                <span className="text-[10px] text-gray-500">Balance: ₹250.00</span>
              </div>
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200">
                <span className="font-black text-gray-900 block">Cash On Delivery</span>
                <span className="text-[10px] text-gray-500">Pay cash directly to driver or delivery partner</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COUPONS MODAL */}
      {showCouponsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-black text-sm text-gray-900">Available Promo Codes</h3>
              <button
                onClick={() => setShowCouponsModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-yellow-50 border border-yellow-300">
                <div className="flex items-center justify-between">
                  <span className="font-black text-black">VRIDE20</span>
                  <span className="text-emerald-700 font-bold">20% OFF</span>
                </div>
                <p className="text-[10px] text-gray-600 mt-1">Valid on all food orders and rides in Hyderabad.</p>
              </div>
              <div className="p-3 rounded-2xl bg-yellow-50 border border-yellow-300">
                <div className="flex items-center justify-between">
                  <span className="font-black text-black">FIRST50</span>
                  <span className="text-emerald-700 font-bold">Flat ₹50 OFF</span>
                </div>
                <p className="text-[10px] text-gray-600 mt-1">Flat ₹50 discount on your first bike or auto ride.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABOUT MODAL */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-3 text-center">
            <div className="w-12 h-12 rounded-xl bg-yellow-400 mx-auto flex items-center justify-center font-black text-black text-xl">
              V
            </div>
            <h3 className="font-black text-base text-gray-900">V RIDE Ecosystem</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Hyderabad's unified mobility and hyper-local delivery platform. Built for reliable bike taxis, autos, cabs, food orders, and express doorstep courier deliveries.
            </p>
            <p className="text-[10px] text-gray-400 font-bold">Version 2.5.0 · Made with ❤️ for Hyderabad</p>
            <button
              onClick={() => setShowAboutModal(false)}
              className="glass-btn-yellow w-full py-2.5 rounded-2xl text-black font-black text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawerMenu;
