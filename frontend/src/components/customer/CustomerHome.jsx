import React, { useState } from 'react';
import {
  Menu, Bell, ChevronDown, MapPin, ChevronRight,
  ArrowRight, ShieldCheck, Star, RotateCcw, Zap, Navigation
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import DrawerMenu from '../common/DrawerMenu';

export const CustomerHome = ({ onNavigate }) => {
  const { currentUser, selectedLocation, setSelectedLocation, activeFoodOrder, notifications } = useApp();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const hyderabadLocations = [
    'Miyapur, Hyderabad',
    'Kukatpally, Hyderabad',
    'Madhapur, Hyderabad',
    'Gachibowli, Hyderabad',
    'Hitec City, Hyderabad',
    'Jubilee Hills, Hyderabad',
    'Banjara Hills, Hyderabad'
  ];

  const userName = currentUser?.name || 'Sri Latha';

  return (
    <div className="flex flex-col bg-white pb-2 text-gray-900 select-none">
      {/* 1. TOP HEADER BAR (#11151C) - EXACT MATCH TO image copy 41.png */}
      <header className="sticky top-0 z-30 bg-[#11151C] px-4 py-3 md:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <button
            type="button"
            onClick={() => setShowDrawer(true)}
            aria-label="Open Menu"
            className="rounded-lg p-1.5 text-white transition hover:bg-white/10 active:scale-95"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div
            onClick={() => onNavigate('home')}
            className="flex cursor-pointer items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFD400] shadow-md">
              <span className="text-xl font-black tracking-tighter text-[#11151C]">V</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-black tracking-wide text-[#FFD400]">V RIDE</span>
              <span className="mt-0.5 text-[8px] font-semibold tracking-[0.18em] text-gray-300">
                MOBILITY • FOOD • PARCEL
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowNotifications(true)}
            aria-label="Notifications"
            className="relative rounded-lg p-1.5 text-white transition hover:bg-white/10 active:scale-95"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#FFD400] ring-2 ring-[#11151C]" />
          </button>
        </div>
      </header>

      {/* 2. DARK CURVED HERO SECTION WITH FULL-BLEED BIKE BACKGROUND & YELLOW WAVE */}
      <section
        className="relative overflow-hidden bg-[#11151C] pt-5 pb-14"
        style={{
          backgroundImage: 'url("/images/bike-hero-bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Subtle left-side dark gradient overlay so text stays super crisp */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#11151C]/95 via-[#11151C]/70 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4">
          <div className="max-w-[65%]">
            <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              Hi <span className="text-[#FFD400]">{userName}</span>{' '}
              <span className="inline-block origin-bottom-right">👋</span>
            </h1>

            <p className="mt-1 text-[11px] font-medium text-gray-200 leading-snug">
              Where do you want to go or order today?
            </p>

            {/* Location Dropdown Pill */}
            <div className="relative mt-3 inline-block">
              <button
                type="button"
                onClick={() => setShowLocationModal(true)}
                className="flex items-center gap-1.5 rounded-full border border-white/30 bg-[#11151C]/75 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:border-[#FFD400] active:scale-95"
              >
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#FFD400]" />
                <span className="truncate max-w-[140px]">{selectedLocation}</span>
                <ChevronDown className="h-3.5 w-3.5 shrink-0 text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Bold Yellow Curved Wave into Pure White */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-9 w-full">
            <path d="M0,75 C380,120 980,5 1440,65 L1440,120 L0,120 Z" fill="#FFD400" />
            <path d="M0,96 C400,132 980,28 1440,84 L1440,120 L0,120 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      {/* 3. QUICK SERVICE CARDS GRID (3 COLUMNS) - EXACT MATCH TO image copy 41.png */}
      <section className="mx-auto w-full max-w-6xl px-3 pt-2 pb-2">
        <div className="grid grid-cols-3 gap-2.5">
          {/* Card 1: Rides */}
          <button
            type="button"
            onClick={() => onNavigate('rides')}
            className="group relative flex flex-col justify-between rounded-2xl bg-[#FFF9DB] p-2.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-95"
          >
            <div className="flex justify-end">
              <span className="rounded-full bg-[#FFD400] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#11151C]">
                FAST
              </span>
            </div>
            <div className="my-1.5 flex h-14 items-center justify-center">
              <img
                src="/images/service-rides.jpg"
                alt="Rides"
                className="h-full w-auto object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex items-end justify-between gap-1">
              <div>
                <h2 className="text-sm font-extrabold text-[#11151C] leading-tight">Rides</h2>
                <p className="text-[9px] font-medium text-gray-600 leading-tight">Bike • Auto • Cab</p>
              </div>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#11151C] text-[#FFD400]">
                <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </button>

          {/* Card 2: Food */}
          <button
            type="button"
            onClick={() => onNavigate('food')}
            className="group relative flex flex-col justify-between rounded-2xl bg-[#FFF0F2] p-2.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-95"
          >
            <div className="flex justify-end">
              <span className="rounded-full bg-[#D91E36] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white">
                50% OFF
              </span>
            </div>
            <div className="my-1.5 flex h-14 items-center justify-center">
              <img
                src="/images/service-food.jpg"
                alt="Food"
                className="h-full w-auto object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex items-end justify-between gap-1">
              <div>
                <h2 className="text-sm font-extrabold text-[#11151C] leading-tight">Food</h2>
                <p className="text-[9px] font-medium text-gray-600 leading-tight">Order Online</p>
              </div>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#11151C] text-[#FF8FA3]">
                <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </button>

          {/* Card 3: Parcel */}
          <button
            type="button"
            onClick={() => onNavigate('parcel')}
            className="group relative flex flex-col justify-between rounded-2xl bg-[#F4EEFF] p-2.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-95"
          >
            <div className="flex justify-end">
              <span className="rounded-full bg-[#6D28D9] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white">
                DOORSTEP
              </span>
            </div>
            <div className="my-1.5 flex h-14 items-center justify-center">
              <img
                src="/images/service-parcel.jpg"
                alt="Parcel"
                className="h-full w-auto object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex items-end justify-between gap-1">
              <div>
                <h2 className="text-sm font-extrabold text-[#11151C] leading-tight">Parcel</h2>
                <p className="text-[9px] font-medium text-gray-600 leading-tight">Send Anywhere</p>
              </div>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#11151C] text-[#C4B5FD]">
                <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* 4. ACTIVE ORDER LIVE TRACKING PILL */}
      <div className="px-3 pt-2">
        <div
          onClick={() => onNavigate('track')}
          className="bg-[#11151C] text-white p-3.5 rounded-2xl shadow-lg border border-[#FFD400]/30 flex items-center justify-between cursor-pointer hover:border-[#FFD400] transition active:scale-98"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFD400] flex items-center justify-center text-black font-bold text-lg shadow-sm">
              🛵
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xs text-[#FFD400]">{activeFoodOrder?.etaText || 'Arriving in 8 min'}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-[11px] text-gray-300 font-medium truncate max-w-[160px]">
                {activeFoodOrder?.restaurantName || 'Paradise Biryani'}
              </p>
            </div>
          </div>
          <button className="glass-btn-yellow px-3 py-1.5 rounded-xl text-black font-black text-xs flex items-center gap-1 active:scale-95">
            <span>Track Live</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 5. FOOD OFFER PROMO BANNER (VRIDE20) */}
      <div className="px-3 pt-3">
        <div
          onClick={() => onNavigate('food')}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white p-4 cursor-pointer hover:shadow-md transition active:scale-98"
        >
          <div className="max-w-[65%]">
            <span className="glass-pill px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white inline-block">
              Code: VRIDE20
            </span>
            <h3 className="text-base font-black mt-1.5 leading-tight">Flat 20% OFF</h3>
            <p className="text-xs text-rose-100 font-medium">on all food deliveries in Hyderabad</p>
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

      {/* 6. QUICK 1-TAP REBOOK ROUTE */}
      <div className="px-3 pt-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-gray-900">Recent Route</h2>
          <button onClick={() => onNavigate('rides')} className="text-xs font-bold text-gray-700 hover:text-black">
            All Rides →
          </button>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-900 flex items-center justify-center text-lg">
              🛵
            </div>
            <div>
              <h3 className="font-extrabold text-xs text-gray-900">Miyapur Metro → Kukatpally</h3>
              <p className="text-[10px] text-gray-500 font-medium">₹56–₹72 · 5.4 km · Bike Taxi</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('rides')}
            className="glass-btn-yellow px-3.5 py-1.5 rounded-xl text-black font-extrabold text-xs flex items-center gap-1.5 active:scale-95"
          >
            <RotateCcw className="w-3 h-3 stroke-[2.5]" />
            <span>Rebook</span>
          </button>
        </div>
      </div>

      {/* 7. POPULAR RESTAURANTS IN HYDERABAD */}
      <div className="px-3 pt-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Popular Restaurants</h2>
            <p className="text-[10px] text-gray-500">Delivered hot & fresh to your doorstep</p>
          </div>
          <button onClick={() => onNavigate('food')} className="text-xs font-bold text-gray-700 hover:text-black">
            View All →
          </button>
        </div>

        <div className="space-y-2.5">
          <div
            onClick={() => onNavigate('food')}
            className="p-3 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex items-center justify-between cursor-pointer hover:border-yellow-300 transition"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&auto=format&fit=crop&q=80"
                alt="Paradise Biryani"
                className="w-14 h-14 rounded-xl object-cover shadow-xs"
              />
              <div>
                <h3 className="font-extrabold text-xs text-gray-900">Paradise Biryani</h3>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-500 mt-0.5">
                  <span className="flex items-center gap-0.5 font-bold text-gray-900">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> 4.4
                  </span>
                  <span>·</span><span>30–40 min</span><span>·</span>
                  <span className="text-green-600 font-bold">50% OFF</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">Authentic Chicken & Mutton Dum Biryani</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          <div
            onClick={() => onNavigate('food')}
            className="p-3 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex items-center justify-between cursor-pointer hover:border-yellow-300 transition"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80"
                alt="Domino's Pizza"
                className="w-14 h-14 rounded-xl object-cover shadow-xs"
              />
              <div>
                <h3 className="font-extrabold text-xs text-gray-900">Domino&apos;s Pizza</h3>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-500 mt-0.5">
                  <span className="flex items-center gap-0.5 font-bold text-gray-900">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> 4.3
                  </span>
                  <span>·</span><span>25–35 min</span><span>·</span>
                  <span className="text-green-600 font-bold">Flat ₹100 OFF</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">Farmhouse, Pepperoni & Garlic Breads</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* 8. V RIDE ASSURED SAFETY & HYDERABAD PROMISE */}
      <div className="px-3 pt-3">
        <div className="p-3.5 rounded-2xl bg-white border border-gray-100 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <h3 className="font-extrabold text-xs text-gray-900">V RIDE Assured Safety</h3>
            </div>
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">100% Protected</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
            <div className="p-2 bg-gray-50 rounded-xl"><span className="text-sm block">🛡️</span><span className="font-bold text-gray-800 mt-0.5 block">Verified Fleet</span></div>
            <div className="p-2 bg-gray-50 rounded-xl"><span className="text-sm block">📍</span><span className="font-bold text-gray-800 mt-0.5 block">Live GPS</span></div>
            <div className="p-2 bg-gray-50 rounded-xl"><span className="text-sm block">🚨</span><span className="font-bold text-gray-800 mt-0.5 block">24/7 SOS</span></div>
          </div>
        </div>
      </div>

      <div className="px-3 pt-3 pb-2">
        <div className="p-3.5 rounded-2xl bg-[#11151C] text-white border border-[#FFD400]/40 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFD400] text-black flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 fill-black stroke-black" />
          </div>
          <div>
            <span className="text-[9px] font-black uppercase text-[#FFD400] tracking-wider block">Hyderabad&apos;s #1 Mobility App</span>
            <h4 className="font-extrabold text-xs text-white">Fast Rides · Hot Food · Express Parcels</h4>
          </div>
        </div>
      </div>

      {/* LOCATION PICKER MODAL */}
      {showLocationModal && (
        <div className="fixed inset-0 z-[1100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl animate-slideUp">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-base text-gray-900">Select Location</h3>
              <button onClick={() => setShowLocationModal(false)} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">✕</button>
            </div>
            <div className="mt-3 space-y-1.5 max-h-64 overflow-y-auto">
              {hyderabadLocations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => { setSelectedLocation(loc); setShowLocationModal(false); }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                    selectedLocation === loc ? 'bg-yellow-50 text-black border border-yellow-300' : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="flex items-center gap-2"><Navigation className="w-3.5 h-3.5 text-gray-400" />{loc}</span>
                  {selectedLocation === loc && <span className="text-xs text-yellow-600 font-bold">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATIONS MODAL */}
      {showNotifications && (
        <div className="fixed inset-0 z-[1100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-base text-gray-900 flex items-center gap-2"><Bell className="w-4 h-4 text-[#FFD400]" />Notifications</h3>
              <button onClick={() => setShowNotifications(false)} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">✕</button>
            </div>
            <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto">
              {notifications?.map((n) => (
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

      <DrawerMenu isOpen={showDrawer} onClose={() => setShowDrawer(false)} onNavigate={onNavigate} />
    </div>
  );
};

export default CustomerHome;
