import React, { useState } from 'react';
import {
  User, Star, ChevronRight, HelpCircle, Package,
  CreditCard, Clock, Shield, Gift, Award, Ticket,
  LogOut, Phone, MapPin, CheckCircle2, ChevronLeft,
  Settings, ShoppingBag, Bike
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileScreen = ({ onNavigate }) => {
  const { currentUser, setCurrentUser, setCurrentPortal } = useApp();
  const [userName] = useState(currentUser?.name || 'Sri Latha');
  const [userPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [showReferModal, setShowReferModal] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);

  // V RIDE Profile Menu Items matching image copy 31.png
  const profileMenuItems = [
    {
      id: 'help',
      title: 'Help & Support',
      icon: HelpCircle,
      action: () => alert('24/7 V RIDE Support: Call 1800-200-8743 or email support@vride.in')
    },
    {
      id: 'payment',
      title: 'Payments & UPI',
      icon: CreditCard,
      action: () => alert('V RIDE Payments: UPI, Credit/Debit Cards, NetBanking and Cash on Delivery enabled.')
    },
    {
      id: 'my_rides',
      title: 'My Rides',
      icon: Bike,
      action: () => onNavigate && onNavigate('rides')
    },
    {
      id: 'orders',
      title: 'My Orders',
      icon: ShoppingBag,
      action: () => onNavigate && onNavigate('orders')
    },
    {
      id: 'safety',
      title: 'Safety & Emergency SOS',
      icon: Shield,
      action: () => alert('V RIDE Safety: 24/7 Police SOS (112), Verified Drivers, Live GPS route sharing.')
    },
    {
      id: 'refer',
      title: 'Refer and Earn',
      badge: 'Get ₹50',
      icon: Gift,
      action: () => setShowReferModal(true)
    },
    {
      id: 'rewards',
      title: 'My Rewards',
      icon: Award,
      action: () => alert('My Rewards: You have 250 V RIDE Coins and 3 active discount coupons!')
    },
    {
      id: 'pass',
      title: 'Power Pass',
      icon: Ticket,
      action: () => setShowPassModal(true)
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: Settings,
      action: () => alert('V RIDE Settings: Language (English), Notifications (Enabled), Dark Mode (Auto).')
    }
  ];

  return (
    <div className="flex flex-col bg-[#f8f9fa] pb-2 select-none">
      {/* ============================================================ */}
      {/* 1. DARK HEADER WITH YELLOW WAVE                             */}
      {/* EXACT MATCH TO image copy 31.png                             */}
      {/* ============================================================ */}
      <div className="relative bg-[#0b0e14] text-white pt-4 pb-6 px-4 overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#FFD600]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate && onNavigate('home')}
              className="p-1.5 rounded-full glass-btn-dark hover:bg-white/10 text-white transition active:scale-95"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
            <h1 className="text-lg font-black text-white">Profile</h1>
          </div>

          <span className="glass-btn-yellow px-2.5 py-0.5 rounded-full text-black font-black text-[10px] uppercase">
            V RIDE Verified
          </span>
        </div>

        {/* Bottom Yellow Accent Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#FFD600]"></div>
      </div>

      <div className="p-3.5 space-y-3">
        {/* ============================================================ */}
        {/* 2. USER PROFILE HERO CARD                                    */}
        {/* ============================================================ */}
        <div className="p-4 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-3 ring-[#FFD600] shadow-sm">
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'}
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-black text-base text-gray-900">{userName}</h2>
                <p className="text-xs text-gray-500 font-semibold">{userPhone}</p>
              </div>
            </div>

            <button
              onClick={() => alert('Profile details verified with government ID and phone OTP.')}
              className="glass-btn-yellow px-3 py-1.5 rounded-full text-black font-black text-[10px] flex items-center gap-1 active:scale-95"
            >
              <span>✔ VERIFIED</span>
              <ChevronRight className="w-3 h-3 stroke-[3]" />
            </button>
          </div>

          {/* Stats Row matching image copy 31.png */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-center">
            <div className="p-2 rounded-2xl bg-[#FFFBE6] border border-yellow-200">
              <span className="text-xs font-black text-black block">⭐ 4.92</span>
              <span className="text-[9px] text-gray-600 font-bold block">My Rating</span>
            </div>
            <div className="p-2 rounded-2xl bg-[#FFFBE6] border border-yellow-200">
              <span className="text-xs font-black text-black block">🛵 128</span>
              <span className="text-[9px] text-gray-600 font-bold block">Total Rides</span>
            </div>
            <div className="p-2 rounded-2xl bg-[#FFFBE6] border border-yellow-200">
              <span className="text-xs font-black text-black block">🍲 43</span>
              <span className="text-[9px] text-gray-600 font-bold block">Food Orders</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. MENU LIST WITH YELLOW CIRCULAR ICONS                      */}
        {/* ============================================================ */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm divide-y divide-gray-100 overflow-hidden">
          {profileMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={item.action}
                className="flex items-center justify-between p-3.5 hover:bg-yellow-50/50 cursor-pointer transition active:scale-99"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FFFBE6] text-black border border-yellow-300 flex items-center justify-center shadow-2xs">
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="font-extrabold text-xs text-gray-900">{item.title}</span>
                </div>

                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* LOGOUT BUTTON */}
        <div className="pt-2">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to sign out?')) {
                setCurrentPortal('website');
              }
            }}
            className="glass-btn-dark w-full py-3.5 rounded-2xl text-white font-black text-xs flex items-center justify-center gap-2 active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of V RIDE</span>
          </button>
        </div>
      </div>

      {/* REFER MODAL */}
      {showReferModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-3 text-center">
            <div className="w-14 h-14 rounded-full bg-yellow-100 text-3xl mx-auto flex items-center justify-center">
              🎁
            </div>
            <h3 className="font-black text-base text-gray-900">Refer Friends, Earn ₹50</h3>
            <p className="text-xs text-gray-500">
              Share your referral code with friends and family. When they take their first ride or order food, you both get ₹50 cash in your V RIDE Wallet!
            </p>
            <div className="p-3 bg-gray-100 rounded-2xl font-mono font-black text-sm text-black">
              VRIDE-LATHA99
            </div>
            <button
              onClick={() => {
                navigator.clipboard?.writeText('VRIDE-LATHA99');
                alert('Referral link copied to clipboard!');
                setShowReferModal(false);
              }}
              className="glass-btn-yellow w-full py-3 rounded-2xl text-black font-black text-xs"
            >
              Copy Referral Code
            </button>
          </div>
        </div>
      )}

      {/* PASS MODAL */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-3 text-center">
            <div className="w-14 h-14 rounded-full bg-yellow-100 text-3xl mx-auto flex items-center justify-center">
              ⚡
            </div>
            <h3 className="font-black text-base text-gray-900">V RIDE Power Pass</h3>
            <p className="text-xs text-gray-500">
              Save up to ₹400 every month on Hyderabad rides and free food deliveries with Power Pass!
            </p>
            <div className="p-3 bg-yellow-50 border border-yellow-300 rounded-2xl text-xs font-bold text-gray-800">
              ₹99 / month · 10 Discount Coupons · Zero Surge Fare
            </div>
            <button
              onClick={() => {
                alert('Power Pass activated successfully on your account!');
                setShowPassModal(false);
              }}
              className="glass-btn-yellow w-full py-3 rounded-2xl text-black font-black text-xs"
            >
              Activate Power Pass
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
