import React, { useState } from 'react';
import {
  X, Bike, Package, Utensils, ShieldCheck,
  HelpCircle, LogOut, ChevronRight, Bell, Tag,
  CreditCard, MapPin, PhoneCall, ExternalLink
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
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Slide-in Drawer */}
      <div className="relative w-[85%] max-w-[320px] bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-slideRight overflow-y-auto">
        <div>
          {/* Drawer Header & Profile Card */}
          <div className="bg-gradient-to-b from-yellow-50/80 to-white p-5 border-b border-gray-100">
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg overflow-hidden shadow-xs border border-yellow-400">
                  <img src="/logo.png" alt="V RIDE" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="font-black text-base tracking-wider text-[#080808]">V RIDE</span>
                  <span className="text-[9px] block text-gray-500 font-bold uppercase -mt-0.5">Rides · Food · Parcel</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-95"
                aria-label="Close menu"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Customer Profile Section */}
            <div
              onClick={() => { onClose(); onNavigate('profile'); }}
              className="mt-2 p-3 rounded-2xl bg-white border border-yellow-200 shadow-xs flex items-center gap-3 cursor-pointer hover:border-yellow-400 transition"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#FFD600]"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-extrabold text-xs text-gray-900 truncate">{currentUser.name || 'Sri Latha'}</h4>
                <p className="text-[11px] text-gray-500 truncate">{currentUser.phone}</p>
                <span className="inline-block mt-0.5 px-2 py-0.2 rounded-full bg-yellow-100 text-yellow-900 text-[9px] font-black">
                  Verified Customer ✓
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
          </div>

          {/* Navigation Links List */}
          <div className="p-4 space-y-1 text-xs font-bold text-gray-700">
            <div className="text-[10px] uppercase font-black text-gray-400 px-3 py-1">Primary Services</div>

            {/* My Rides */}
            <button
              onClick={() => { onClose(); onNavigate('rides'); }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-yellow-50 hover:text-black transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-yellow-100 text-yellow-800 flex items-center justify-center">
                  <Bike className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span>My Rides (Rapido Style)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            {/* Food Orders */}
            <button
              onClick={() => { onClose(); onNavigate('food'); }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-yellow-50 hover:text-black transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                  <Utensils className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span>Food Orders (Swiggy Style)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            {/* My Parcels */}
            <button
              onClick={() => { onClose(); onNavigate('parcel'); }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-yellow-50 hover:text-black transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Package className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span>Send Parcels (Rapido Parcel)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <div className="text-[10px] uppercase font-black text-gray-400 px-3 pt-3 pb-1">Account & Preferences</div>

            {/* Saved Addresses */}
            <button
              onClick={() => setShowAddressModal(true)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-yellow-50 hover:text-black transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
                  <MapPin className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span>Saved Addresses</span>
              </div>
              <span className="text-[10px] text-gray-400 font-bold">3 Saved</span>
            </button>

            {/* Payments & UPI */}
            <button
              onClick={() => setShowPaymentsModal(true)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-yellow-50 hover:text-black transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span>Payments & UPI Methods</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            {/* Offers & Coupons */}
            <button
              onClick={() => setShowCouponsModal(true)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-yellow-50 hover:text-black transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
                  <Tag className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span>Offers & Promo Codes</span>
              </div>
              <span className="text-[10px] text-green-600 font-extrabold bg-green-50 px-1.5 py-0.5 rounded">3 Active</span>
            </button>

            <div className="text-[10px] uppercase font-black text-gray-400 px-3 pt-3 pb-1">Support & Portals</div>

            {/* Help & Support */}
            <button
              onClick={() => { onClose(); onNavigate('support'); }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-yellow-50 hover:text-black transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span>24/7 Help & Support</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            {/* About V RIDE */}
            <button
              onClick={() => setShowAboutModal(true)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-yellow-50 hover:text-black transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span>About V RIDE</span>
              </div>
              <span className="text-[10px] text-gray-400 font-bold">v2.5.0</span>
            </button>

            {/* Switch Portals (Partner / Admin) */}
            <div className="pt-2 border-t border-gray-100">
              <span className="text-[9px] uppercase font-black text-gray-400 px-3 block mb-1">Switch Portals</span>
              <div className="grid grid-cols-2 gap-1.5 px-1">
                <button
                  onClick={() => { onClose(); setCurrentPortal('partner'); }}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-yellow-100 text-[11px] font-bold text-gray-800 text-center"
                >
                  🛵 Partner App
                </button>
                <button
                  onClick={() => { onClose(); setCurrentPortal('admin'); }}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-yellow-100 text-[11px] font-bold text-gray-800 text-center"
                >
                  💼 Admin Panel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={() => {
              if (confirm('Log out from V RIDE session?')) {
                alert('Session logged out successfully.');
                onClose();
              }
            }}
            className="w-full py-2.5 rounded-xl bg-white border border-gray-200 text-red-600 font-bold text-xs flex items-center justify-center gap-2 hover:bg-red-50 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
          <p className="text-[10px] text-gray-400 text-center mt-2 font-medium">CODTECH IT SOLUTIONS · Hyderabad</p>
        </div>
      </div>

      {/* SAVED ADDRESSES MODAL */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-extrabold text-sm text-gray-900">Saved Addresses</h3>
              <button onClick={() => setShowAddressModal(false)} className="text-gray-400 font-bold">✕</button>
            </div>
            <div className="space-y-2">
              {currentUser.savedAddresses?.map(addr => (
                <div key={addr.id} className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs">
                  <span className="font-bold text-gray-900 block">{addr.type}</span>
                  <p className="text-gray-600 mt-0.5">{addr.address}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => { setShowAddressModal(false); alert('New address saved!'); }}
              className="w-full py-2.5 rounded-xl bg-[#FFD600] text-black font-extrabold text-xs shadow-xs"
            >
              + Add New Address
            </button>
          </div>
        </div>
      )}

      {/* PAYMENTS & UPI MODAL */}
      {showPaymentsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-extrabold text-sm text-gray-900">Payment Methods</h3>
              <button onClick={() => setShowPaymentsModal(false)} className="text-gray-400 font-bold">✕</button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <div>
                    <span className="font-bold text-gray-900 block">UPI (Google Pay / PhonePe)</span>
                    <span className="text-[10px] text-green-600 font-bold">Connected & Preferred</span>
                  </div>
                </div>
                <span className="text-xs text-green-600 font-bold">✓</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💳</span>
                  <div>
                    <span className="font-bold text-gray-900 block">Debit / Credit Cards</span>
                    <span className="text-[10px] text-gray-400">Visa, Mastercard, RuPay</span>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💵</span>
                  <div>
                    <span className="font-bold text-gray-900 block">Cash on Delivery / Ride</span>
                    <span className="text-[10px] text-gray-400">Pay directly to driver / rider</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowPaymentsModal(false)}
              className="w-full py-2.5 rounded-xl bg-black text-white font-bold text-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* OFFERS & COUPONS MODAL */}
      {showCouponsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-extrabold text-sm text-gray-900">Available Coupons & Offers</h3>
              <button onClick={() => setShowCouponsModal(false)} className="text-gray-400 font-bold">✕</button>
            </div>
            <div className="space-y-2.5">
              <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-xs">
                <span className="font-black text-red-700 bg-red-100 px-2 py-0.5 rounded text-[10px]">VRIDE20</span>
                <h4 className="font-bold text-gray-900 mt-1">Flat 20% OFF on Food Orders</h4>
                <p className="text-[11px] text-gray-500">Min order ₹199 · Max discount ₹100</p>
              </div>
              <div className="p-3 rounded-2xl bg-yellow-50 border border-yellow-200 text-xs">
                <span className="font-black text-yellow-900 bg-yellow-100 px-2 py-0.5 rounded text-[10px]">FIRST50</span>
                <h4 className="font-bold text-gray-900 mt-1">50% OFF First Bike Ride</h4>
                <p className="text-[11px] text-gray-500">Valid on bike & auto rides in Hyderabad</p>
              </div>
              <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 text-xs">
                <span className="font-black text-purple-800 bg-purple-100 px-2 py-0.5 rounded text-[10px]">FREEPARCEL</span>
                <h4 className="font-bold text-gray-900 mt-1">Flat ₹50 OFF Parcel Delivery</h4>
                <p className="text-[11px] text-gray-500">Same-day doorstep parcel deliveries</p>
              </div>
            </div>
            <button
              onClick={() => setShowCouponsModal(false)}
              className="w-full py-2.5 rounded-xl bg-black text-white font-bold text-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* ABOUT V RIDE MODAL */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-3 text-center">
            <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto shadow-md border border-yellow-400">
              <img src="/logo.png" alt="V RIDE" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-black text-base text-gray-900">V RIDE Platform</h3>
            <p className="text-xs text-gray-500 font-medium">
              Unified on-demand mobility (Rapido-inspired rides), online food ordering (Swiggy-inspired), and parcel courier delivery.
            </p>
            <div className="p-3 bg-gray-50 rounded-2xl text-[11px] text-gray-600 text-left space-y-1">
              <p><strong>App Version:</strong> 2.5.0 Production</p>
              <p><strong>Support:</strong> 1800-200-8743</p>
              <p><strong>Email:</strong> support@vride.in</p>
              <p><strong>Operating Area:</strong> Hyderabad Metro Corridor</p>
            </div>
            <button
              onClick={() => setShowAboutModal(false)}
              className="w-full py-2.5 rounded-xl bg-black text-white font-bold text-xs"
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
