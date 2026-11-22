import React, { useEffect, useState } from 'react';
import { Navigation, MapPin } from 'lucide-react';

export const MapComponent = ({
  pickupCoords = [17.4948, 78.3578], // Miyapur
  dropCoords = [17.4842, 78.3986],   // Kukatpally
  pickupName = 'Miyapur, Hyderabad',
  dropName = 'Kukatpally, Hyderabad',
  vehicleType = 'bike',
  animated = true,
  height = '240px'
}) => {
  // SVG based simulated live GPS tracking map that mirrors the screenshot exactly!
  const [riderProgress, setRiderProgress] = useState(0.45);

  useEffect(() => {
    if (!animated) return;
    const interval = setInterval(() => {
      setRiderProgress(prev => (prev >= 0.95 ? 0.05 : prev + 0.008));
    }, 200);
    return () => clearInterval(interval);
  }, [animated]);

  // Coordinates for the SVG road network
  // Path matching the screenshot: starts top left (green dot), bends right, turns down, heads right to red dot
  const startX = 60;
  const startY = 40;
  const endX = 320;
  const endY = 170;

  // Compute position of rider along the path
  const t = riderProgress;
  // Cubic Bezier interpolation: P0=(60,40), P1=(180,30), P2=(140,180), P3=(320,170)
  const riderX = Math.round(Math.pow(1 - t, 3) * 60 + 3 * Math.pow(1 - t, 2) * t * 180 + 3 * (1 - t) * Math.pow(t, 2) * 160 + Math.pow(t, 3) * 320);
  const riderY = Math.round(Math.pow(1 - t, 3) * 40 + 3 * Math.pow(1 - t, 2) * t * 70 + 3 * (1 - t) * Math.pow(t, 2) * 180 + Math.pow(t, 3) * 170);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#e8f1f5] border border-gray-200 shadow-inner select-none" style={{ height }}>
      {/* City Road Network Background (SVG Grid) */}
      <svg className="w-full h-full absolute inset-0" viewBox="0 0 380 220" preserveAspectRatio="none">
        <defs>
          <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* City Blocks & Parks */}
        <rect x="20" y="15" width="120" height="70" rx="8" fill="#e2ede5" opacity="0.6" />
        <rect x="170" y="20" width="190" height="85" rx="8" fill="#f0ebe1" opacity="0.7" />
        <rect x="25" y="110" width="130" height="95" rx="8" fill="#eaf2ea" opacity="0.6" />
        <rect x="200" y="125" width="160" height="80" rx="8" fill="#e7ebed" opacity="0.8" />

        {/* Secondary Roads / Arteries */}
        <path d="M 0 60 L 380 60" stroke="#ffffff" strokeWidth="12" />
        <path d="M 0 140 L 380 140" stroke="#ffffff" strokeWidth="14" />
        <path d="M 150 0 L 150 220" stroke="#ffffff" strokeWidth="14" />
        <path d="M 280 0 L 280 220" stroke="#ffffff" strokeWidth="10" />
        <path d="M 0 20 L 380 190" stroke="#ffffff" strokeWidth="8" />

        {/* Active Route Polyline (Black Bold matching image.png) */}
        <path
          d="M 60 40 C 180 30, 160 180, 320 170"
          fill="none"
          stroke="#111111"
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* Route Shadow */}
        <path
          d="M 60 40 C 180 30, 160 180, 320 170"
          fill="none"
          stroke="#000000"
          strokeWidth="8"
          strokeOpacity="0.08"
          strokeLinecap="round"
        />

        {/* Green Pickup Pin (Miyapur) */}
        <circle cx="60" cy="40" r="9" fill="#10B981" stroke="#ffffff" strokeWidth="3" />
        <circle cx="60" cy="40" r="3" fill="#ffffff" />

        {/* Red Drop Pin (Kukatpally) */}
        <circle cx="320" cy="170" r="9" fill="#EF4444" stroke="#ffffff" strokeWidth="3" />
        <circle cx="320" cy="170" r="3" fill="#ffffff" />
      </svg>

      {/* Animated Moving Rider / Vehicle Badge */}
      <div
        className="absolute transition-all duration-200 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-10"
        style={{ left: `${(riderX / 380) * 100}%`, top: `${(riderY / 220) * 100}%` }}
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-vride-yellow border-2 border-black flex items-center justify-center shadow-lg transform hover:scale-110">
            {vehicleType === 'bike' ? (
              <span className="text-xs font-black">🛵</span>
            ) : vehicleType === 'auto' ? (
              <span className="text-xs font-black">🛺</span>
            ) : (
              <span className="text-xs font-black">🚗</span>
            )}
          </div>
          <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border border-white animate-ping"></span>
        </div>
      </div>

      {/* Floating GPS details badge */}
      <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm border border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-gray-800">
        <Navigation className="w-3 h-3 text-blue-500 fill-blue-500" />
        <span>Live Route · 5.4 km</span>
      </div>

      {/* Location tag on map */}
      <div className="absolute bottom-2 left-2.5 bg-black/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1">
        <MapPin className="w-2.5 h-2.5 text-vride-yellow" />
        <span>Hyderabad Metro Corridor</span>
      </div>
    </div>
  );
};

export default MapComponent;
