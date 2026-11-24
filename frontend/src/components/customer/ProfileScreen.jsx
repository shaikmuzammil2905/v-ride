import React, { useState } from 'react';
import {
  User, Star, ChevronRight, HelpCircle, Package,
  CreditCard, Clock, Shield, Gift, Award, Ticket,
  LogOut, Phone, MapPin, CheckCircle2, ChevronLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileScreen = ({ onNavigate }) => {
  const { currentUser, setCurrentUser, setCurrentPortal } = useApp();
  const [userName] = useState(currentUser.name || 'Shaik Muzammil');
  const [userPhone] = useState(currentUser.phone || '9490838139');
  const [showReferModal, setShowReferModal] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);

  // V RIDE Profile Menu Items
  const profileMenuItems = [
    {
      id: 'help',
      title: 'Help',
      icon: HelpCircle,
      action: () => alert('24/7 V RIDE Support: Call 1800-200-8743 or email support@vride.in')
    },
    {
      id: 'parcel',
      title: 'Parcel - Send Items',
      icon: Package,
      action: () => onNavigate && onNavigate('parcel')
    },
    {
      id: 'payment',
      title: 'Payment',
      icon: CreditCard,
      action: () => alert('V RIDE Payments: UPI, Cards, NetBanking and Cash on Delivery enabled.')
    },
    {
      id: 'my_rides',
      title: 'My Rides',
      icon: Clock,
      action: () => onNavigate && onNavigate('rides')
    },
    {
      id: 'safety',
      title: 'Safety',
      icon: Shield,
      action: () => alert('V RIDE Safety: 24/7 Police SOS (112), Verified Drivers, Live GPS route sharing.')
    },
    {
      id: 'refer',
      title: 'Refer and Earn',
      subtitle: 'Get ₹50',
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
    }
  ];

  return (
    <div className="flex flex-col min-h-full bg-[#f8f9fa] pb-28 select-none">
      {/* Header matching image copy 15.png */}
      <div className="px-5 pt-4 pb-3 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-20">
        <h1 className="text-xl font-black text-gray-900 tracking-tight">Profile</h1>
        <span className="text-[10px] font-black uppercase text-yellow-800 bg-yellow-100 px-2 py-0.5 rounded-full">
          V RIDE Verified
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* User Profile Card matching image copy 15.png */}
        <div className="bg-white rounded-3xl p-4 border border-gray-200/80 shadow-xs space-y-3">
          {/* Top user row with chevron */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-slate-700">
                <User className="w-7 h-7 stroke-[2]" />
              </div>
              <div>
                <h2 className="font-extrabold text-base text-gray-900">{userName}</h2>
                <p className="text-xs text-gray-500 font-bold">{userPhone}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          {/* User Rating row matching image copy 15.png */}
          <div className="flex items-center justify-between pt-1 cursor-pointer">
            <div className="flex items-center gap-2.5">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-extrabold text-sm text-gray-900">4.92 My Rating</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Profile Menu List matching image copy 15.png */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden divide-y divide-gray-100">
          {profileMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={item.action}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition active:scale-99"
              >
                <div className="flex items-center gap-3.5">
                  <Icon className="w-5 h-5 text-gray-500 stroke-[1.8]" />
                  <div>
                    <span className="font-extrabold text-xs text-gray-900 block leading-tight">
                      {item.title}
                    </span>
                    {item.subtitle && (
                      <span className="text-[10px] font-bold text-emerald-600 block">
                        {item.subtitle}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            );
          })}
        </div>

        {/* Switch Portals & Logout */}
        <div className="pt-2 space-y-2">
          <button
            onClick={() => setCurrentPortal('website')}
            className="w-full py-3 rounded-2xl bg-black text-white font-extrabold text-xs shadow-sm hover:bg-neutral-800 transition"
          >
            Switch to Official Website View
          </button>
          <button
            onClick={() => alert('Logged out successfully.')}
            className="w-full py-2.5 rounded-2xl bg-gray-100 text-gray-600 font-bold text-xs hover:bg-gray-200 transition"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Refer & Earn Modal */}
      {showReferModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xs rounded-3xl p-5 text-center space-y-3 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center mx-auto text-2xl font-black">
              🎁
            </div>
            <h3 className="font-black text-base text-gray-900">Refer & Earn ₹50</h3>
            <p className="text-xs text-gray-500">
              Share your referral code with friends. They get 20% off their first ride, and you get ₹50 V RIDE Cash!
            </p>
            <div className="p-3 bg-yellow-50 border border-yellow-300 rounded-xl font-black text-sm tracking-widest text-black">
              VRIDE50
            </div>
            <button
              onClick={() => {
                navigator.clipboard?.writeText('VRIDE50');
                alert('Referral code copied to clipboard!');
                setShowReferModal(false);
              }}
              className="w-full py-3 rounded-xl bg-[#FFD600] text-black font-extrabold text-xs shadow-md"
            >
              Copy Referral Code
            </button>
            <button
              onClick={() => setShowReferModal(false)}
              className="w-full py-1 text-xs font-bold text-gray-400 hover:text-black"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Power Pass Modal */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xs rounded-3xl p-5 text-center space-y-3 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto text-2xl font-black">
              🎫
            </div>
            <h3 className="font-black text-base text-gray-900">V RIDE Power Pass</h3>
            <p className="text-xs text-gray-500">
              Enjoy flat 25% off on all bike and auto rides for the next 30 days! No surge pricing.
            </p>
            <div className="p-3 bg-purple-50 border border-purple-300 rounded-xl font-black text-sm text-purple-900">
              ₹149 / Month
            </div>
            <button
              onClick={() => {
                alert('Power Pass activated successfully on your account!');
                setShowPassModal(false);
              }}
              className="w-full py-3 rounded-xl bg-purple-600 text-white font-extrabold text-xs shadow-md"
            >
              Activate Power Pass
            </button>
            <button
              onClick={() => setShowPassModal(false)}
              className="w-full py-1 text-xs font-bold text-gray-400 hover:text-black"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
