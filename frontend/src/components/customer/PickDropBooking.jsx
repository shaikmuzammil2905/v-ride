import React, { useState } from 'react';
import {
  ArrowLeft, Check, FileText, Box, MoreHorizontal,
  CheckCircle2, ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PickDropBooking = ({ onNavigate, onBack }) => {
  const { setActivePickDrop } = useApp();

  const [pickup, setPickup] = useState('Jubilee Hills, Hyderabad');
  const [drop, setDrop] = useState('Banjara Hills, Hyderabad');
  const [selectedCategory, setSelectedCategory] = useState('documents'); // 'documents' | 'item' | 'other'
  const [notes, setNotes] = useState('Handle with care');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    const order = {
      id: 'pkd_' + Date.now(),
      pickup,
      drop,
      category: selectedCategory,
      notes,
      fare: 75,
      partnerName: 'Ramesh K',
      partnerPhone: '+91 98480 12345',
      status: 'assigned'
    };
    setActivePickDrop(order);
    setIsConfirmed(true);
  };

  return (
    <div className="flex flex-col min-h-full bg-white pb-8 select-none">
      {/* Header matching image.png */}
      <div className="flex items-center px-4 py-3.5 border-b border-gray-100 bg-white sticky top-0 z-20">
        <button
          onClick={onBack}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-800 transition mr-3 active:scale-95"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>
        <h1 className="text-base font-bold text-gray-900">Pick & Drop</h1>
      </div>

      {!isConfirmed ? (
        <div className="px-5 pt-4 space-y-4">
          {/* Card matching reference screenshot */}
          <div className="relative overflow-hidden rounded-2xl bg-[#FFF9E6] border border-yellow-200 p-4">
            <div className="max-w-[62%] relative z-10">
              <h2 className="text-sm font-extrabold text-gray-900 leading-snug">
                Pickup & Drop<br />Anything
              </h2>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-700">
                  <span className="w-3.5 h-3.5 rounded-full bg-yellow-400 text-black flex items-center justify-center text-[9px] font-black">✓</span>
                  <span>From your location</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-700">
                  <span className="w-3.5 h-3.5 rounded-full bg-yellow-400 text-black flex items-center justify-center text-[9px] font-black">✓</span>
                  <span>To any location</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-700">
                  <span className="w-3.5 h-3.5 rounded-full bg-yellow-400 text-black flex items-center justify-center text-[9px] font-black">✓</span>
                  <span>Same-day delivery</span>
                </div>
              </div>
            </div>

            {/* Courier illustration matching screenshot */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-28 h-24 flex items-center justify-center pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?w=250&auto=format&fit=crop&q=80"
                alt="Courier Delivery"
                className="w-24 h-20 object-cover rounded-xl shadow-sm mix-blend-multiply opacity-90"
              />
            </div>
          </div>

          {/* Locations Inputs matching screenshot */}
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

            {/* Drop */}
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-red-200"></span>
              <div className="flex-1">
                <label className="text-[10px] text-gray-400 block font-semibold uppercase">Drop Location</label>
                <input
                  type="text"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  className="w-full text-xs font-bold text-gray-900 bg-transparent focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* What are you sending? matching screenshot */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-extrabold text-gray-900">What are you sending?</h3>
            <div className="grid grid-cols-3 gap-2.5">
              {/* Documents */}
              <button
                onClick={() => setSelectedCategory('documents')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                  selectedCategory === 'documents'
                    ? 'border-black bg-yellow-50 text-black font-extrabold shadow-sm'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FileText className="w-5 h-5 mb-1" />
                <span className="text-xs font-bold">Documents</span>
              </button>

              {/* Item */}
              <button
                onClick={() => setSelectedCategory('item')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                  selectedCategory === 'item'
                    ? 'border-black bg-yellow-50 text-black font-extrabold shadow-sm'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Box className="w-5 h-5 mb-1" />
                <span className="text-xs font-bold">Item</span>
              </button>

              {/* Other */}
              <button
                onClick={() => setSelectedCategory('other')}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                  selectedCategory === 'other'
                    ? 'border-black bg-yellow-50 text-black font-extrabold shadow-sm'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <MoreHorizontal className="w-5 h-5 mb-1" />
                <span className="text-xs font-bold">Other</span>
              </button>
            </div>
          </div>

          {/* Additional Notes (Optional) matching screenshot */}
          <div>
            <label className="text-[10px] text-gray-500 font-semibold block mb-1">Additional Notes (Optional)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Handle with care, ring bell 3 times"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-medium focus:outline-none focus:border-black"
            />
          </div>

          {/* Pricing Estimate */}
          <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-600">Standard Delivery Fare</span>
            <span className="font-black text-gray-900 text-sm">₹75</span>
          </div>

          {/* Confirm Pick & Drop Button matching screenshot */}
          <button
            onClick={handleConfirm}
            className="w-full py-3.5 rounded-2xl bg-vride-yellow text-black font-extrabold text-sm shadow-yellow-glow hover:bg-yellow-400 transition active:scale-98"
          >
            Confirm Pick & Drop
          </button>
        </div>
      ) : (
        /* Confirmed State */
        <div className="px-5 pt-6 space-y-4 text-center">
          <div className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-extrabold text-base text-gray-900">Pick & Drop Confirmed!</h3>
          <p className="text-xs text-gray-600">Partner Ramesh K is on the way to {pickup}.</p>

          <div className="p-3 bg-yellow-50 rounded-2xl border border-yellow-300 text-center">
            <span className="text-[10px] font-bold text-gray-500 uppercase">Pickup Verification OTP</span>
            <p className="text-2xl font-black text-black tracking-widest">5821</p>
          </div>

          <button
            onClick={() => {
              setIsConfirmed(false);
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
export default PickDropBooking;
