import React, { useState } from 'react';
import {
  ArrowLeft, Check, Package, ChevronDown, CheckCircle2,
  ShieldCheck, Phone, MapPin, ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ParcelBooking = ({ onNavigate, onBack }) => {
  const { setActiveParcel } = useApp();

  const [pickup, setPickup] = useState('Miyapur, Hyderabad');
  const [delivery, setDelivery] = useState('Gachibowli, Hyderabad');
  const [parcelSize, setParcelSize] = useState('small'); // 'small' | 'medium' | 'large'
  const [itemType, setItemType] = useState('Documents');
  const [senderPhone, setSenderPhone] = useState('+91 98765 43210');
  const [receiverPhone, setReceiverPhone] = useState('+91 99887 65432');
  const [receiverName, setReceiverName] = useState('Anil Kumar');
  const [instructions, setInstructions] = useState('Hand over directly to reception, 3rd floor');
  const [isBooked, setIsBooked] = useState(false);
  const [pickupOtp] = useState('6192');
  const [deliveryOtp] = useState('4018');

  const fareMap = {
    small: 85,
    medium: 120,
    large: 175
  };

  const handleContinue = () => {
    const parcelOrder = {
      id: 'pcl_' + Date.now(),
      pickup,
      delivery,
      parcelSize,
      itemType,
      fare: fareMap[parcelSize],
      senderPhone,
      receiverName,
      receiverPhone,
      instructions,
      pickupOtp,
      deliveryOtp,
      partnerName: 'Suresh Reddy',
      partnerPhone: '+91 97000 54321',
      status: 'assigned'
    };
    setActiveParcel(parcelOrder);
    setIsBooked(true);
  };

  return (
    <div className="flex flex-col bg-white pb-2 select-none">
      {/* Dark Hero Header with Yellow Wave */}
      <div className="relative bg-[#0b0e14] text-white pt-3 pb-4 px-4 overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#FFD600]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 rounded-full glass-btn-dark hover:bg-white/10 text-white transition active:scale-95"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
            <div>
              <h1 className="text-base font-black text-white leading-tight">Send Parcels</h1>
              <p className="text-[10px] text-gray-300 font-medium">Doorstep pickup & fast delivery in Hyderabad</p>
            </div>
          </div>
          <span className="text-2xl">📦</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#FFD600]"></div>
      </div>

      {!isBooked ? (
        <div className="px-4 pt-3.5 space-y-3.5">
          {/* Top banner removed per user instruction image copy 7.png */}

          {/* Locations Card matching reference screenshot */}
          <div className="bg-[#f9fafb] p-3.5 rounded-2xl border border-gray-200 space-y-3">
            {/* Pickup */}
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-gray-200">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-green-200"></span>
              <div className="flex-1">
                <label className="text-[10px] text-gray-400 block font-semibold uppercase">Pickup Location</label>
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full text-xs font-bold text-gray-900 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Delivery Location */}
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-red-200"></span>
              <div className="flex-1">
                <label className="text-[10px] text-gray-400 block font-semibold uppercase">Delivery Location</label>
                <input
                  type="text"
                  value={delivery}
                  onChange={(e) => setDelivery(e.target.value)}
                  className="w-full text-xs font-bold text-gray-900 bg-transparent focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Parcel Details Section matching reference screenshot */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wide">Parcel Details</h3>

            {/* Size options cards: Small / Medium / Large */}
            <div className="grid grid-cols-3 gap-2.5">
              {/* Small */}
              <button
                onClick={() => setParcelSize('small')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                  parcelSize === 'small'
                    ? 'border-black bg-yellow-50 text-black font-extrabold shadow-sm'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Package className="w-5 h-5 mb-1" />
                <span className="text-xs font-bold">Small</span>
                <span className="text-[10px] text-gray-400">(≤ 1 kg)</span>
              </button>

              {/* Medium */}
              <button
                onClick={() => setParcelSize('medium')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                  parcelSize === 'medium'
                    ? 'border-black bg-yellow-50 text-black font-extrabold shadow-sm'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Package className="w-5 h-5 mb-1" />
                <span className="text-xs font-bold">Medium</span>
                <span className="text-[10px] text-gray-400">(1 - 5 kg)</span>
              </button>

              {/* Large */}
              <button
                onClick={() => setParcelSize('large')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                  parcelSize === 'large'
                    ? 'border-black bg-yellow-50 text-black font-extrabold shadow-sm'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Package className="w-5 h-5 mb-1" />
                <span className="text-xs font-bold">Large</span>
                <span className="text-[10px] text-gray-400">(&gt; 5 kg)</span>
              </button>
            </div>

            {/* Item Type dropdown matching reference screenshot */}
            <div>
              <label className="text-[10px] text-gray-500 font-semibold block mb-1">Item Type</label>
              <div className="relative">
                <select
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-900 appearance-none focus:outline-none focus:border-black cursor-pointer"
                >
                  <option value="Documents">Documents</option>
                  <option value="Clothes">Clothes & Apparel</option>
                  <option value="Electronics">Electronics & Gadgets</option>
                  <option value="Food & Snacks">Food & Home Snacks</option>
                  <option value="Medicines">Medicines & Healthcare</option>
                  <option value="Gift items">Gift items</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Receiver Contact Details */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div>
                <label className="text-[10px] text-gray-500 font-semibold block mb-1">Receiver Name</label>
                <input
                  type="text"
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 font-semibold block mb-1">Receiver Phone</label>
                <input
                  type="text"
                  value={receiverPhone}
                  onChange={(e) => setReceiverPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Fare Summary */}
          <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-600">Calculated Delivery Fare</span>
            <span className="font-black text-gray-900 text-sm">₹{fareMap[parcelSize]}</span>
          </div>

          {/* Continue Button with Glassy Yellow Style */}
          <button
            onClick={handleContinue}
            className="glass-btn-yellow w-full py-3.5 rounded-2xl text-black font-black text-sm transition active:scale-98"
          >
            Continue · ₹{fareMap[parcelSize]}
          </button>
        </div>
      ) : (
        /* Confirmed State */
        <div className="px-5 pt-6 space-y-4">
          <div className="bg-green-50 border border-green-200 p-4 rounded-2xl text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-gray-900">Parcel Pickup Scheduled!</h3>
            <p className="text-xs text-gray-600">Partner Suresh Reddy has been assigned and is heading to your pickup location.</p>
          </div>

          {/* OTPs */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-yellow-50 rounded-2xl border border-yellow-300 text-center">
              <span className="text-[10px] font-bold text-gray-500 uppercase">Pickup OTP</span>
              <p className="text-xl font-black text-black">{pickupOtp}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-2xl border border-blue-300 text-center">
              <span className="text-[10px] font-bold text-gray-500 uppercase">Delivery OTP</span>
              <p className="text-xl font-black text-black">{deliveryOtp}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-3.5 rounded-2xl text-xs space-y-1.5">
            <div className="flex justify-between font-bold">
              <span>Estimated Fare:</span>
              <span>₹{fareMap[parcelSize]}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Category:</span>
              <span className="capitalize">{parcelSize} ({itemType})</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Receiver:</span>
              <span>{receiverName} ({receiverPhone})</span>
            </div>
          </div>

          <button
            onClick={() => {
              setIsBooked(false);
              onNavigate('home');
            }}
            className="w-full py-3 rounded-2xl bg-black text-white font-bold text-xs"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
};
export default ParcelBooking;
