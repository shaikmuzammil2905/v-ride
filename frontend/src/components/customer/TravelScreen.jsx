import React, { useState } from 'react';
import { ArrowLeft, Tag, Hotel, Plane, Bus, Train, Compass, Sparkles } from 'lucide-react';

export const TravelScreen = ({ onBack, onNavigate }) => {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('VRIDETRAVEL');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex flex-col bg-[#f8f9fa] pb-2 select-none">
      {/* Header */}
      <div className="px-4 py-3.5 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-800 transition active:scale-95"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
          )}
          <h1 className="text-base font-bold text-gray-900">V RIDE Travel</h1>
        </div>
        <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
          Outstation & Tours
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Grand Travel Sale Banner matching image copy 16.png */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#FFF275] via-[#FFE259] to-[#FFA751] p-5 text-center shadow-md border border-yellow-300">
          {/* Decorative Lotus icons & Garlands */}
          <div className="flex items-center justify-between text-xl opacity-80 mb-1">
            <span>🌸</span>
            <span className="text-xs font-black tracking-widest uppercase text-purple-900">Festive Special</span>
            <span>🌸</span>
          </div>

          <h2 className="text-2xl font-black text-[#2B0957] tracking-tight drop-shadow-xs">
            Grand Travel Sale
          </h2>

          {/* Coupon Code Pill */}
          <div
            onClick={handleCopyCode}
            className="mt-3 inline-flex flex-col items-center justify-center px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-dashed border-purple-700 cursor-pointer shadow-xs hover:bg-white transition"
          >
            <div className="flex items-center gap-1.5 font-black text-sm text-purple-900 tracking-wider">
              <Tag className="w-3.5 h-3.5 text-purple-700" />
              <span>VRIDETRAVEL</span>
            </div>
            <span className="text-[9px] font-extrabold text-gray-500 mt-0.5">
              {copiedCode ? '✓ Copied to clipboard!' : 'Use code at checkout'}
            </span>
          </div>
        </div>

        {/* Travel Grid matching image copy 16.png */}
        <div className="grid grid-cols-2 gap-3">
          {/* 1. Hotel */}
          <div
            onClick={() => alert('Hotels: Explore 500+ verified hotels across Hyderabad, Vizag, and Vijayawada.')}
            className="p-4 rounded-3xl bg-gradient-to-br from-[#FFF9D2] to-[#FFF1A8] border border-yellow-200/80 shadow-xs flex flex-col justify-between h-36 cursor-pointer hover:shadow-md transition active:scale-98"
          >
            <div>
              <span className="text-[9px] font-black text-white bg-yellow-600 px-2 py-0.5 rounded-md inline-block">
                Upto 55% Off
              </span>
              <h3 className="font-black text-base text-gray-900 mt-1">Hotel &gt;</h3>
            </div>
            <div className="self-end text-3xl">🏨</div>
          </div>

          {/* 2. Flight */}
          <div
            onClick={() => alert('Flights: Domestic & International flight tickets with instant web check-in.')}
            className="p-4 rounded-3xl bg-gradient-to-br from-[#E3EAFF] to-[#D0DEFF] border border-blue-200/80 shadow-xs flex flex-col justify-between h-36 cursor-pointer hover:shadow-md transition active:scale-98"
          >
            <div>
              <span className="text-[9px] font-black text-white bg-blue-600 px-2 py-0.5 rounded-md inline-block">
                Upto ₹4000 Off
              </span>
              <h3 className="font-black text-base text-gray-900 mt-1">Flight &gt;</h3>
            </div>
            <div className="self-end text-3xl">✈️</div>
          </div>

          {/* 3. Bus */}
          <div
            onClick={() => alert('Bus Tickets: APSRTC, TSRTC and private sleeper buses with live tracking.')}
            className="p-4 rounded-3xl bg-gradient-to-br from-[#F5E6FF] to-[#E9CCFF] border border-purple-200/80 shadow-xs flex flex-col justify-between h-36 cursor-pointer hover:shadow-md transition active:scale-98"
          >
            <div>
              <span className="text-[9px] font-black text-white bg-purple-700 px-2 py-0.5 rounded-md inline-block">
                Upto 25% Off
              </span>
              <h3 className="font-black text-base text-gray-900 mt-1">Bus &gt;</h3>
            </div>
            <div className="self-end text-3xl">🚌</div>
          </div>

          {/* 4. Train */}
          <div
            onClick={() => alert('Train Bookings: IRCTC authorized partner with zero service fee.')}
            className="p-4 rounded-3xl bg-gradient-to-br from-[#FFF2D8] to-[#FFE4B5] border border-amber-200/80 shadow-xs flex flex-col justify-between h-36 cursor-pointer hover:shadow-md transition active:scale-98"
          >
            <div>
              <span className="text-[9px] font-black text-white bg-amber-700 px-2 py-0.5 rounded-md inline-block">
                Zero Service Fee
              </span>
              <h3 className="font-black text-base text-gray-900 mt-1">Train &gt;</h3>
            </div>
            <div className="self-end text-3xl">🚆</div>
          </div>
        </div>

        {/* 5. Experiences You'll Never Forget banner matching image copy 16.png */}
        <div
          onClick={() => alert('Experiences: Heritage walks, Ramoji Film City tours, and weekend getaways!')}
          className="p-4 rounded-3xl bg-gradient-to-r from-pink-100 via-rose-100 to-amber-100 border border-pink-200 flex items-center justify-between cursor-pointer hover:shadow-md transition active:scale-98"
        >
          <div>
            <span className="text-[9px] font-black text-white bg-pink-600 px-2 py-0.5 rounded-md">
              New
            </span>
            <h4 className="font-extrabold text-xs text-gray-900 mt-1">
              Experiences You'll Never Forget
            </h4>
            <span className="text-xs font-black text-pink-700 flex items-center gap-1 mt-0.5">
              Explore Now &gt;
            </span>
          </div>
          <div className="text-3xl">🎈</div>
        </div>
      </div>
    </div>
  );
};

export default TravelScreen;
