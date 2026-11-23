import React, { useEffect, useState } from 'react';

export const SplashScreen = ({ onFinish }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(onFinish, 400); // Allow fade-out transition
    }, 1400);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      onClick={() => { setFading(true); setTimeout(onFinish, 200); }}
      className={`fixed inset-0 z-50 bg-[#080808] flex flex-col items-center justify-center p-6 text-white cursor-pointer transition-opacity duration-300 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Centered Logo with Entrance & Pulse */}
      <div className="relative flex flex-col items-center animate-fadeIn">
        <div className="w-28 h-28 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,214,0,0.4)] border border-yellow-400/30 p-1 bg-[#FFD600] flex items-center justify-center transform hover:scale-105 transition">
          <img
            src="/logo.png"
            alt="V RIDE Logo"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Brand Text */}
        <h1 className="text-2xl font-black tracking-wider text-[#FFD600] mt-6">
          V RIDE
        </h1>
        <p className="text-xs text-gray-400 font-semibold tracking-widest uppercase mt-1">
          Rides · Food · Parcel
        </p>

        {/* Subtle loading spinner */}
        <div className="mt-8 flex gap-1.5 items-center">
          <span className="w-2 h-2 rounded-full bg-[#FFD600] animate-bounce"></span>
          <span className="w-2 h-2 rounded-full bg-[#FFD600] animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-2 h-2 rounded-full bg-[#FFD600] animate-bounce [animation-delay:0.4s]"></span>
        </div>
      </div>

      <div className="absolute bottom-8 text-[11px] text-gray-500 font-medium">
        Made for Hyderabad
      </div>
    </div>
  );
};

export default SplashScreen;
