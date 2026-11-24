import React, { useState } from 'react';
import {
  Bike, Package, MapPin, Utensils, Smartphone, Shield,
  Star, CheckCircle2, ArrowRight, Download, Phone, Mail,
  ChevronDown, HelpCircle, DollarSign, Award, Heart, Search,
  Clock, Compass, Plus, Sparkles, Navigation, X, Mic, Flame,
  Percent, ChevronRight, Zap, ShoppingBag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WebsiteHome = () => {
  const { setCurrentPortal } = useApp();

  const [activeServiceTab, setActiveServiceTab] = useState('ride');
  const [partnerVehicle, setPartnerVehicle] = useState('bike');
  const [dailyHours, setDailyHours] = useState(8);
  const [partnerName, setPartnerName] = useState('');
  const [partnerPhone, setPartnerPhone] = useState('');
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);

  // Rides Interactive State
  const [showAllRideServices, setShowAllRideServices] = useState(false);
  const [selectedRideService, setSelectedRideService] = useState('bike');
  const [rideDestinationSearch, setRideDestinationSearch] = useState('');

  // Food Interactive State
  const [vegOnly, setVegOnly] = useState(false);
  const [foodActiveSubTab, setFoodActiveSubTab] = useState('ALL');
  const [addedFoodItems, setAddedFoodItems] = useState([
    { id: 'item_shw', name: 'Veg Shawarma', price: 99, count: 1 }
  ]);

  // Estimate partner earnings
  const ratePerHour = partnerVehicle === 'bike' ? 95 : partnerVehicle === 'auto' ? 125 : 170;
  const estimatedWeekly = Math.round(dailyHours * ratePerHour * 6);

  const handlePartnerApply = (e) => {
    e.preventDefault();
    if (!partnerPhone) return;
    setPartnerSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 select-none font-sans">
      {/* Website Navigation Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 md:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-yellow-400 shadow-xs">
            <img src="/logo.png" alt="V RIDE" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-wide text-black">V RIDE</span>
            <span className="text-[10px] text-gray-500 block leading-none font-bold uppercase tracking-wider">Rides · Food · Parcel</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-700">
          <a href="#services" className="hover:text-black transition">Services</a>
          <a href="#how-it-works" className="hover:text-black transition">How It Works</a>
          <a href="#partner" className="hover:text-black transition">Become a Partner</a>
          <a href="#safety" className="hover:text-black transition">Safety & Trust</a>
          <a href="#faq" className="hover:text-black transition">FAQs</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPortal('customer')}
            className="px-4 py-2 rounded-xl bg-vride-yellow text-black font-extrabold text-xs shadow-yellow-glow hover:bg-yellow-400 transition"
          >
            Launch Web App →
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-yellow-50/70 via-white to-white pt-8 md:pt-14 pb-10 md:pb-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-100 border border-yellow-300 text-xs font-black text-black">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              <span>HYDERABAD'S UNIFIED MOBILITY & DELIVERY ECOSYSTEM</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-black tracking-tight leading-tight">
              One App for <span className="bg-vride-yellow px-2 rounded-lg">Rides</span>, Parcels, & Delicious Food.
            </h1>

            <p className="text-base text-gray-600 font-medium leading-relaxed">
              Book bike, auto & cab rides in seconds, send parcels across the city with real-time GPS tracking, or order hot meals from Hyderabad's favorite restaurants.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setCurrentPortal('customer')}
                className="px-6 py-3.5 rounded-2xl bg-black text-white font-extrabold text-sm shadow-xl hover:bg-neutral-800 transition flex items-center gap-2"
              >
                <Smartphone className="w-4 h-4" />
                <span>Open Customer App</span>
              </button>

              <button
                onClick={() => setCurrentPortal('partner')}
                className="px-6 py-3.5 rounded-2xl bg-vride-yellow text-black font-extrabold text-sm shadow-yellow-glow hover:bg-yellow-400 transition flex items-center gap-2"
              >
                <Bike className="w-4 h-4" />
                <span>Partner Portal</span>
              </button>
            </div>

            {/* Quick stats badge */}
            <div className="pt-4 flex items-center gap-6 text-xs text-gray-500 font-bold border-t border-gray-100">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>100% Verified Drivers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Live Route GPS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>24/7 SOS Protection</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Mockup */}
          <div className="relative flex justify-center">
            <div className="relative w-80 h-[520px] rounded-[42px] bg-black p-3 shadow-2xl border-4 border-neutral-800">
              <div className="w-full h-full rounded-[32px] overflow-hidden bg-white flex flex-col justify-between p-4">
                {/* Visual mini card */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-vride-yellow font-black text-xs flex items-center justify-center">V</div>
                    <span className="font-extrabold text-xs">V RIDE</span>
                  </div>
                  <span className="text-[10px] text-green-600 font-bold">● Live in Hyderabad</span>
                </div>

                <div className="space-y-3 py-2">
                  <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                    <span className="text-[10px] font-bold text-gray-600 block">Daily Commute</span>
                    <p className="font-extrabold text-xs text-gray-900">Bike & Auto from ₹35</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                    <span className="text-[10px] font-bold text-gray-600 block">Send Parcels</span>
                    <p className="font-extrabold text-xs text-gray-900">Doorstep Pickup in 10 mins</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                    <span className="text-[10px] font-bold text-gray-600 block">Food Delivery</span>
                    <p className="font-extrabold text-xs text-gray-900">Paradise Biryani · 30 min</p>
                  </div>
                </div>

                <div className="p-3 bg-black text-white rounded-2xl text-center">
                  <span className="text-[11px] font-bold text-vride-yellow">All Services Under One Hood</span>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -left-4 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2 text-xs font-black">
              <span className="text-xl">🛵</span>
              <div>
                <span>Average Arrival</span>
                <p className="text-[10px] text-gray-400">Under 4 mins</p>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2 text-xs font-black">
              <span className="text-xl">⭐</span>
              <div>
                <span>4.8 Rating</span>
                <p className="text-[10px] text-gray-400">Over 50,000+ Rides</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Direct High-Fidelity Interactive Implementations */}
      <section id="services" className="py-12 md:py-16 px-4 md:px-6 bg-[#f8f9fa] border-y border-gray-100">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-[#D97706] uppercase tracking-wider bg-yellow-100/80 px-3 py-1 rounded-full border border-yellow-200">
              Interactive Platform Experience
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Rides · Food · Parcels
            </h2>
            <p className="text-xs md:text-sm text-gray-600 font-medium">
              Experience the exact interfaces of India's favorite mobility and food ecosystems in one unified platform.
            </p>
          </div>

          {/* 3 Core Service Selector Tabs */}
          <div className="flex justify-center gap-3 overflow-x-auto pb-1">
            {[
              { id: 'ride', label: 'V RIDE Rides', icon: Bike, desc: 'Bike Taxi, Auto & Cabs' },
              { id: 'food', label: 'V RIDE Food', icon: Utensils, desc: 'Flavourfest & 99 Store' },
              { id: 'parcel', label: 'V RIDE Parcel', icon: Package, desc: 'Doorstep Delivery' }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeServiceTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveServiceTab(tab.id)}
                  className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs font-black transition-all shadow-xs ${
                    isActive
                      ? 'bg-[#FFD600] text-black ring-2 ring-black shadow-md scale-102'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <div className="text-left">
                    <span className="block leading-tight">{tab.label}</span>
                    <span className="text-[10px] text-gray-500 font-semibold block">{tab.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: RIDES SECTION - EXACT MATCH TO image copy 11.png & image copy 12.png */}
          {/* ========================================================================= */}
          {activeServiceTab === 'ride' && (
            <div className="bg-white rounded-3xl p-4 md:p-8 border border-gray-200 shadow-xl max-w-4xl mx-auto space-y-6 animate-fadeIn">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-100 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                    <h3 className="text-xl font-black text-gray-900">V RIDE Rides — Instant Mobility</h3>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Beat the traffic in minutes with verified bike taxis, autos and cabs.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAllRideServices(!showAllRideServices)}
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-black font-extrabold text-xs transition"
                  >
                    {showAllRideServices ? '← Back to Ride Screen' : 'View All 8 Services →'}
                  </button>
                  <button
                    onClick={() => setCurrentPortal('customer')}
                    className="px-4 py-2 rounded-xl bg-[#FFD600] text-black font-black text-xs hover:bg-yellow-400 transition"
                  >
                    Launch Live in App
                  </button>
                </div>
              </div>

              {/* Mobile Phone Mockup Frame Container */}
              <div className="max-w-md mx-auto bg-[#fafafa] rounded-3xl border border-gray-200 shadow-inner overflow-hidden">
                {/* 1. MAP BACKGROUND WITH PING PILL (From image copy 11.png) */}
                <div className="relative h-44 bg-gradient-to-b from-blue-50 via-slate-100 to-yellow-50/50 p-4 flex flex-col justify-between overflow-hidden border-b border-gray-200">
                  {/* Subtle map grid graphic */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  {/* Top Location Pill "Trying to find where you are..." */}
                  <div className="relative z-10 self-center bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-md border border-gray-200 flex items-center gap-2 text-xs font-bold text-gray-800">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></div>
                    <span>Trying to find where you are... Miyapur, Hyderabad</span>
                  </div>

                  {/* Pulsing Location Pin on map */}
                  <div className="relative z-10 self-center flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-200 animate-pulse"></div>
                    <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full mt-1">You are here</span>
                  </div>
                </div>

                {/* 2. BOTTOM SHEET VIEW: Search & Recents OR All Services View */}
                {!showAllRideServices ? (
                  <div className="p-4 bg-white space-y-4">
                    {/* "Where do you want to go?" Search Bar matching image copy 11.png */}
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-700">
                        <Search className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <input
                        type="text"
                        value={rideDestinationSearch}
                        onChange={(e) => setRideDestinationSearch(e.target.value)}
                        placeholder="Where do you want to go?"
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border-2 border-yellow-400 text-xs font-bold text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-700 placeholder:font-bold"
                      />
                    </div>

                    {/* Recent Destination List with clock & heart icons matching image copy 11.png */}
                    <div className="space-y-3 pt-1">
                      {[
                        {
                          title: 'Royal Brothers - Bike Rentals - Miyapur',
                          desc: '4th Lane, Miyapur Cross Road, Hyderabad',
                          fav: true
                        },
                        {
                          title: 'Hindu College of Pharmacy',
                          desc: 'Amaravati Road, Venugopalnagar, Guntur / Hyderabad',
                          fav: true
                        },
                        {
                          title: 'Acharya Nagarjuna University (ANU)',
                          desc: 'Nagarjuna Nagar, Main Campus Gate, Hyderabad',
                          fav: true
                        }
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => setRideDestinationSearch(item.title)}
                          className="flex items-center justify-between pb-2.5 border-b border-dashed border-gray-100 cursor-pointer hover:bg-yellow-50/50 p-1.5 rounded-xl transition"
                        >
                          <div className="flex items-start gap-2.5">
                            <Clock className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                            <div>
                              <h4 className="font-extrabold text-xs text-gray-900 leading-snug">{item.title}</h4>
                              <p className="text-[10px] text-gray-400 font-medium">{item.desc}</p>
                            </div>
                          </div>
                          <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 hover:fill-red-500 transition shrink-0 ml-2" />
                        </div>
                      ))}
                    </div>

                    {/* "Everything In Minutes" Header matching image copy 11.png */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-black text-sm text-gray-900">Everything In Minutes</h4>
                        <button
                          onClick={() => setShowAllRideServices(true)}
                          className="text-xs font-bold text-gray-500 hover:text-black flex items-center gap-0.5"
                        >
                          <span>View All</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* 4 Cards Grid from image copy 11.png */}
                      <div className="grid grid-cols-2 gap-3">
                        {/* 1. Bike Taxi - Beat the traffic */}
                        <div
                          onClick={() => setSelectedRideService('bike')}
                          className={`p-3.5 rounded-2xl border transition cursor-pointer relative overflow-hidden flex flex-col justify-between h-32 ${
                            selectedRideService === 'bike'
                              ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-black shadow-sm ring-1 ring-black'
                              : 'bg-[#F6F8FA] border-gray-100 hover:border-yellow-300'
                          }`}
                        >
                          <div>
                            <span className="text-[10px] text-gray-500 font-semibold block leading-tight">Beat the traffic</span>
                            <h5 className="font-black text-sm text-gray-900">Bike Taxi</h5>
                          </div>
                          <div className="self-end text-3xl">🛵</div>
                          <span className="text-[9px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md w-fit">From ₹25 · 3 min</span>
                        </div>

                        {/* 2. Send Anything - Parcel */}
                        <div
                          onClick={() => setActiveServiceTab('parcel')}
                          className="p-3.5 rounded-2xl bg-[#F6F8FA] border border-gray-100 hover:border-purple-300 transition cursor-pointer relative overflow-hidden flex flex-col justify-between h-32"
                        >
                          <div>
                            <span className="text-[10px] text-gray-500 font-semibold block leading-tight">Send anything</span>
                            <h5 className="font-black text-sm text-gray-900">Parcel</h5>
                          </div>
                          <div className="self-end text-3xl">📦</div>
                          <span className="text-[9px] font-black text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded-md w-fit">Doorstep · Instant</span>
                        </div>

                        {/* 3. Your Everyday Rides - Book Now */}
                        <div
                          onClick={() => setSelectedRideService('auto')}
                          className={`p-3.5 rounded-2xl border transition cursor-pointer relative overflow-hidden flex flex-col justify-between h-32 ${
                            selectedRideService === 'auto'
                              ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-black shadow-sm ring-1 ring-black'
                              : 'bg-[#F6F8FA] border-gray-100 hover:border-yellow-300'
                          }`}
                        >
                          <div>
                            <span className="text-[10px] text-gray-500 font-semibold block leading-tight">Your everyday rides</span>
                            <h5 className="font-black text-sm text-gray-900">Book now</h5>
                          </div>
                          <div className="self-end text-3xl">🛺 🚗</div>
                          <span className="text-[9px] font-black text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded-md w-fit">Auto & Cabs</span>
                        </div>

                        {/* 4. All Services */}
                        <div
                          onClick={() => setShowAllRideServices(true)}
                          className="p-3.5 rounded-2xl bg-[#F6F8FA] border border-gray-100 hover:border-yellow-400 transition cursor-pointer flex flex-col justify-between h-32"
                        >
                          <div>
                            <span className="text-[10px] text-gray-500 font-semibold block leading-tight">Explore 8 options</span>
                            <h5 className="font-black text-sm text-gray-900">All Services</h5>
                          </div>
                          <div className="self-end flex items-center gap-1 text-2xl">
                            <span>🛺</span>
                            <span className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-black">→</span>
                          </div>
                          <span className="text-[9px] font-bold text-gray-600">Tap to view all</span>
                        </div>
                      </div>
                    </div>

                    {/* Book Now Quick CTA */}
                    <button
                      onClick={() => setCurrentPortal('customer')}
                      className="w-full py-3.5 rounded-2xl bg-[#FFD600] text-black font-black text-xs shadow-md hover:bg-yellow-400 transition flex items-center justify-center gap-2"
                    >
                      <span>Confirm & Book {selectedRideService.toUpperCase()} Ride (₹56 - ₹72)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  /* ========================================================== */
                  /* ALL SERVICES GRID SCREEN - EXACT MATCH TO image copy 12.png */
                  /* ========================================================== */
                  <div className="p-5 bg-white space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-base text-gray-900">All Services</h4>
                      <button
                        onClick={() => setShowAllRideServices(false)}
                        className="text-xs font-bold text-gray-500 hover:text-black underline"
                      >
                        ✕ Close
                      </button>
                    </div>

                    {/* 8 Grid items matching image copy 12.png */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'shared_auto', name: 'Shared Auto', icon: '🛺', tag: 'Affordable' },
                        { id: 'bike', name: 'Bike', icon: '🛵', tag: 'Fastest' },
                        { id: 'auto', name: 'Auto', icon: '🛺', tag: 'Everyday' },
                        { id: 'parcel_bike', name: 'Parcel on Bike', icon: '📦', tag: 'Instant' },
                        { id: 'cab_economy', name: 'Cab Economy', icon: '🚗', tag: 'Pocket friendly' },
                        { id: 'bike_lite', name: 'Bike Lite', icon: '⚡', tag: 'Flat % OFF' },
                        { id: 'cab_premium', name: 'Cab Premium', icon: '✨', tag: 'Luxury' },
                        { id: 'travel', name: 'Travel', icon: '🧳', tag: 'Outstation' }
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSelectedRideService(item.id);
                            setShowAllRideServices(false);
                          }}
                          className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition active:scale-95 ${
                            selectedRideService === item.id
                              ? 'bg-yellow-50 border-black ring-1 ring-black shadow-xs'
                              : 'bg-[#F9FAFB] border-gray-100 hover:bg-gray-100'
                          }`}
                        >
                          <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-gray-100 flex items-center justify-center text-2xl mb-1.5">
                            {item.icon}
                          </div>
                          <span className="font-extrabold text-xs text-gray-900 text-center leading-tight">
                            {item.name}
                          </span>
                          <span className="text-[9px] text-gray-400 font-semibold mt-0.5">{item.tag}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: FOOD SECTION - EXACT MATCH TO image copy 13.png & image copy 14.png */}
          {/* ========================================================================= */}
          {activeServiceTab === 'food' && (
            <div className="bg-white rounded-3xl p-4 md:p-8 border border-gray-200 shadow-xl max-w-4xl mx-auto space-y-6 animate-fadeIn">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-100 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                    <h3 className="text-xl font-black text-gray-900">V RIDE Food — Flavourfest & 99 Store Deals</h3>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Order from Hyderabad's top rated restaurants or discover meals at flat ₹99.</p>
                </div>
                <button
                  onClick={() => setCurrentPortal('customer')}
                  className="px-4 py-2 rounded-xl bg-[#FFD600] text-black font-black text-xs hover:bg-yellow-400 transition"
                >
                  Order Food in App →
                </button>
              </div>

              {/* Mobile Phone Mockup Frame Container for Food */}
              <div className="max-w-md mx-auto bg-white rounded-3xl border border-gray-200 shadow-inner overflow-hidden">
                {/* 1. TOP HEADER (Deep Crimson / Maroon background from image copy 13.png) */}
                <div className="bg-[#1f020f] text-white p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-xs font-black text-white">
                        <span>Work</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      <p className="text-[10px] text-gray-300 font-medium truncate max-w-[220px]">
                        Sangadigunta, Ipd Colony, Miyapur, Hyderabad...
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#FFD600] text-black flex items-center justify-center font-black text-xs shadow-xs">
                        VR
                      </div>
                    </div>
                  </div>

                  {/* Top Category Tabs: Food (Selected), Instamart, Dineout */}
                  <div className="flex items-center gap-2 pt-1">
                    <div className="px-3 py-1.5 rounded-xl bg-white/20 border border-white/30 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs">
                      <span>🍔</span>
                      <span>Food</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-white/5 text-gray-300 font-bold text-xs flex items-center gap-1.5">
                      <span>🛒</span>
                      <span>Instamart (4 mins)</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-white/5 text-gray-300 font-bold text-xs flex items-center gap-1.5">
                      <span>🍽️</span>
                      <span>Dineout</span>
                    </div>
                  </div>

                  {/* Search Bar with Mic & VEG Toggle Switch (image copy 13.png) */}
                  <div className="flex items-center gap-2 pt-1">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search for 'Biryani', 'Pizza', 'EatRight'..."
                        className="w-full pl-9 pr-9 py-2.5 rounded-2xl bg-white text-xs font-bold text-gray-900 focus:outline-none placeholder:text-gray-400"
                      />
                      <Mic className="w-4 h-4 text-orange-500 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" />
                    </div>

                    {/* VEG Toggle Button */}
                    <button
                      onClick={() => setVegOnly(!vegOnly)}
                      className={`px-2.5 py-2 rounded-2xl text-[10px] font-black flex items-center gap-1 border transition ${
                        vegOnly
                          ? 'bg-emerald-600 text-white border-emerald-400'
                          : 'bg-white text-gray-800 border-gray-300'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${vegOnly ? 'bg-white' : 'bg-green-600'}`}></span>
                      <span>VEG</span>
                    </button>
                  </div>
                </div>

                {/* 2. SUB-FILTER TABS (image copy 13.png) */}
                <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-bold">
                  {['ALL', '99 STORE', 'OFFERS', '⚡ BOLT', 'GOURMET'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setFoodActiveSubTab(tab)}
                      className={`px-3 py-1 rounded-full whitespace-nowrap text-[11px] font-extrabold transition ${
                        foodActiveSubTab === tab
                          ? 'bg-black text-white'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* 3. FLAVOURFEST HERO PROMO BANNER (image copy 13.png) */}
                <div className="p-4 bg-gradient-to-r from-[#C2185B] via-[#AD1457] to-[#880E4F] text-white">
                  <div className="flex items-center justify-between pb-3">
                    <div>
                      <h4 className="text-xl font-black tracking-wider text-[#FFD600] leading-none">FLAVOURFEST</h4>
                      <span className="text-[10px] font-bold tracking-widest text-white/90 uppercase mt-0.5 block">ORDER NOW</span>
                    </div>
                    <span className="text-2xl">🍔🍟</span>
                  </div>

                  {/* Promo Deal Cards Horizontal Carousel */}
                  <div className="grid grid-cols-4 gap-2 text-center text-black">
                    <div className="p-2 rounded-xl bg-pink-100 border border-pink-200">
                      <span className="text-base block">🏷️</span>
                      <span className="text-[9px] font-black leading-tight block mt-0.5">Get 70% OFF</span>
                    </div>
                    <div className="p-2 rounded-xl bg-yellow-100 border border-yellow-200">
                      <span className="text-base block">💰</span>
                      <span className="text-[9px] font-black leading-tight block mt-0.5">Flat ₹200 OFF</span>
                    </div>
                    <div className="p-2 rounded-xl bg-orange-100 border border-orange-200">
                      <span className="text-base block">🍛</span>
                      <span className="text-[9px] font-black leading-tight block mt-0.5">Meals At ₹49</span>
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-100 border border-emerald-200">
                      <span className="text-base block">🚀</span>
                      <span className="text-[9px] font-black leading-tight block mt-0.5">Free Delivery</span>
                    </div>
                  </div>
                </div>

                {/* 4. "WHAT'S ON YOUR MIND?" DISHES (image copy 14.png) */}
                <div className="p-4 bg-white border-b border-gray-100 space-y-2">
                  <h4 className="font-black text-sm text-gray-900">What's on your mind?</h4>
                  <div className="grid grid-cols-4 gap-3 text-center">
                    {[
                      { name: 'Fried rice', icon: '🍚' },
                      { name: 'Cakes', icon: '🍰' },
                      { name: 'Dosa', icon: '🥞' },
                      { name: 'Noodles', icon: '🍜' },
                      { name: 'Idli', icon: '🥟' },
                      { name: 'Biryani', icon: '🍲' },
                      { name: 'Burgers', icon: '🍔' },
                      { name: 'Pizza', icon: '🍕' }
                    ].map((dish, i) => (
                      <div
                        key={i}
                        onClick={() => setCurrentPortal('customer')}
                        className="flex flex-col items-center cursor-pointer group"
                      >
                        <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-2xl group-hover:scale-105 group-hover:border-yellow-400 transition shadow-xs">
                          {dish.icon}
                        </div>
                        <span className="text-[10px] font-bold text-gray-700 mt-1">{dish.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. "99 STORE" SECTION WITH REAL ADD BUTTONS (image copy 14.png) */}
                <div className="p-4 bg-[#FFFBF0] border-b border-yellow-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-lg bg-black text-[#FFD600] font-black text-xs">99 store</span>
                      <span className="text-xs font-bold text-gray-800">Meals at ₹99 + Free Delivery</span>
                    </div>
                    <span className="text-xs font-bold text-blue-600 cursor-pointer">View All →</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'item_shw', name: 'Veg Shawarma', price: 99, veg: true },
                      { id: 'item_piz', name: 'Sweet Corn Pizza', price: 99, veg: true },
                      { id: 'item_dosa', name: 'Ghee Dosa', price: 79, veg: true }
                    ].map(item => (
                      <div key={item.id} className="bg-white p-2.5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
                        <div>
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 block mb-1"></span>
                          <h5 className="font-extrabold text-[11px] text-gray-900 leading-snug">{item.name}</h5>
                          <span className="font-black text-xs text-gray-900 block mt-1">₹{item.price}</span>
                        </div>
                        <button
                          onClick={() => {
                            setAddedFoodItems(prev => [...prev, { ...item, count: 1 }]);
                          }}
                          className="mt-2 w-full py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-300 font-black text-xs hover:bg-emerald-600 hover:text-white transition flex items-center justify-center gap-1"
                        >
                          <Plus className="w-3 h-3 stroke-[3]" />
                          <span>ADD</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. FLOATING LIVE CART PILL (image copy 13.png & image copy 14.png) */}
                <div className="p-3 bg-white border-t border-gray-100">
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-950 to-neutral-900 border border-emerald-500/40 text-white flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-xs">
                        {addedFoodItems.length}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-black text-xs text-white">Paradise Biryani</span>
                          <span className="text-[9px] text-emerald-400 font-bold bg-emerald-900/60 px-1.5 py-0.2 rounded-full">
                            ₹{addedFoodItems.reduce((acc, curr) => acc + curr.price, 0)} Total
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400 block">NEW: Order from multiple restaurants</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentPortal('customer')}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-white font-black text-xs hover:bg-emerald-400 transition shadow-sm"
                    >
                      View Cart →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: PARCEL SECTION (V RIDE Parcel Doorstep Delivery) */}
          {/* ========================================================================= */}
          {activeServiceTab === 'parcel' && (
            <div className="bg-white rounded-3xl p-4 md:p-8 border border-gray-200 shadow-xl max-w-4xl mx-auto space-y-6 animate-fadeIn">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-100 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse"></span>
                    <h3 className="text-xl font-black text-gray-900">V RIDE Parcel — Doorstep Pickup & Safe Transit</h3>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Send documents, packages, clothes and gifts anywhere in Hyderabad within 45 minutes.</p>
                </div>
                <button
                  onClick={() => setCurrentPortal('customer')}
                  className="px-4 py-2 rounded-xl bg-[#FFD600] text-black font-black text-xs hover:bg-yellow-400 transition"
                >
                  Send Parcel Now →
                </button>
              </div>

              <div className="max-w-md mx-auto bg-white rounded-3xl border border-gray-200 p-5 space-y-4 shadow-inner">
                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200 space-y-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                    <span className="font-bold text-gray-800">Pickup: Miyapur Metro Station</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                    <span className="font-bold text-gray-800">Drop: Gachibowli Financial District</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-3 rounded-2xl bg-yellow-50 border border-yellow-300 font-bold">
                    <span className="text-lg block">📄</span>
                    <span className="text-xs font-black block mt-1">Small (≤ 1 kg)</span>
                    <span className="text-gray-500 text-[10px]">₹85 Flat</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-gray-200 font-bold">
                    <span className="text-lg block">📦</span>
                    <span className="text-xs font-black block mt-1">Medium (1-5 kg)</span>
                    <span className="text-gray-500 text-[10px]">₹120 Flat</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-gray-200 font-bold">
                    <span className="text-lg block">🚚</span>
                    <span className="text-xs font-black block mt-1">Large (&gt; 5 kg)</span>
                    <span className="text-gray-500 text-[10px]">₹175 Flat</span>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentPortal('customer')}
                  className="w-full py-3.5 rounded-2xl bg-[#FFD600] text-black font-black text-xs shadow-md hover:bg-yellow-400 transition"
                >
                  Book Doorstep Pickup (₹85) →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Become a Delivery Partner Section */}
      <section id="partner" className="py-12 md:py-16 px-4 md:px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-black text-vride-yellow uppercase tracking-widest">
              EARN ON YOUR OWN SCHEDULE
            </span>
            <h2 className="text-3xl md:text-4xl font-black leading-tight">
              Join the V RIDE Delivery Fleet & Earn up to <span className="text-vride-yellow">₹35,000 / month</span>
            </h2>
            <p className="text-xs text-gray-400 font-medium leading-relaxed">
              One app, three ways to earn. Pick up rides, deliver parcels, and drop off food orders without ever sitting idle. Daily settlements & weekly incentive bonuses!
            </p>

            {/* Earnings calculator */}
            <div className="p-5 rounded-2xl bg-[#1C1C1E] border border-neutral-800 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 font-bold uppercase">Select Your Vehicle:</span>
                <div className="flex gap-2">
                  {['bike', 'auto', 'car'].map(v => (
                    <button
                      key={v}
                      onClick={() => setPartnerVehicle(v)}
                      className={`px-3 py-1 rounded-lg font-bold text-xs capitalize ${
                        partnerVehicle === v ? 'bg-vride-yellow text-black' : 'bg-neutral-800 text-gray-400'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-gray-400">Daily Working Hours:</span>
                  <span className="text-vride-yellow">{dailyHours} Hours / Day</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="12"
                  value={dailyHours}
                  onChange={(e) => setDailyHours(Number(e.target.value))}
                  className="w-full accent-vride-yellow cursor-pointer"
                />
              </div>

              <div className="pt-2 border-t border-neutral-800 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-300">Estimated Weekly Earning:</span>
                <span className="text-xl font-black text-green-400">₹{estimatedWeekly.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Partner Registration Quick Form */}
          <div className="bg-[#1C1C1E] p-8 rounded-3xl border border-neutral-800 shadow-2xl space-y-4">
            <h3 className="text-base font-extrabold text-white">Apply to Become a Partner</h3>
            <p className="text-xs text-gray-400">Start earning in Miyapur, Kukatpally & Hyderabad Metro Corridor.</p>

            {partnerSubmitted ? (
              <div className="p-4 bg-green-950/60 border border-green-700 rounded-2xl text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-green-500 text-black flex items-center justify-center mx-auto font-black text-base">
                  ✓
                </div>
                <h4 className="font-extrabold text-sm text-green-400">Application Received!</h4>
                <p className="text-xs text-gray-300">Our onboarding team will call your number within 2 business hours for document verification.</p>
              </div>
            ) : (
              <form onSubmit={handlePartnerApply} className="space-y-3 text-xs">
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full p-2.5 rounded-xl bg-black border border-neutral-700 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Mobile Phone (for OTP)</label>
                  <input
                    type="text"
                    required
                    value={partnerPhone}
                    onChange={(e) => setPartnerPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full p-2.5 rounded-xl bg-black border border-neutral-700 text-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-vride-yellow text-black font-extrabold text-xs shadow-yellow-glow hover:bg-yellow-400 transition"
                >
                  Submit Partner Application →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Safety & Trust */}
      <section id="safety" className="py-12 md:py-16 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-green-600 uppercase tracking-wider">Uncompromising Safety</span>
            <h2 className="text-3xl font-black text-gray-900">Your Protection is Engineered into Every Trip</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center text-yellow-700 font-black">
                🛡️
              </div>
              <h3 className="font-extrabold text-base text-gray-900">Background Checked Fleet</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Every partner undergoes strict Aadhaar identity verification, valid driving license check, vehicle fitness RC confirmation, and police background checks.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 font-black">
                🚨
              </div>
              <h3 className="font-extrabold text-base text-gray-900">24/7 SOS Emergency Button</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                1-tap direct integration with local Hyderabad police control (112) and instant live location sharing with your pre-configured family emergency contacts.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 font-black">
                🔒
              </div>
              <h3 className="font-extrabold text-base text-gray-900">Two-Factor OTP Security</h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Rides and deliveries never start or complete without your explicit 4-digit OTP, ensuring zero wrong pickups or unauthorized package handovers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white pt-16 pb-8 px-6 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-neutral-800 text-xs">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-yellow-400">
                <img src="/logo.png" alt="V RIDE" className="w-full h-full object-cover" />
              </div>
              <span className="font-black text-lg text-white">V RIDE</span>
            </div>
            <p className="text-gray-400 font-medium">India's leading unified on-demand mobility, courier parcel, and food ordering ecosystem.</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Services</h4>
            <ul className="space-y-1.5 text-gray-400">
              <li><button onClick={() => setCurrentPortal('customer')} className="hover:text-white">Bike Rides</button></li>
              <li><button onClick={() => setCurrentPortal('customer')} className="hover:text-white">Auto Rickshaw</button></li>
              <li><button onClick={() => setCurrentPortal('customer')} className="hover:text-white">Cabs & Taxis</button></li>
              <li><button onClick={() => setCurrentPortal('customer')} className="hover:text-white">Parcel Pickup & Drop</button></li>
              <li><button onClick={() => setCurrentPortal('customer')} className="hover:text-white">Online Food Delivery</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Portals</h4>
            <ul className="space-y-1.5 text-gray-400">
              <li><button onClick={() => setCurrentPortal('customer')} className="hover:text-white">Customer Web App</button></li>
              <li><button onClick={() => setCurrentPortal('partner')} className="hover:text-white">Delivery Partner App</button></li>
              <li><button onClick={() => setCurrentPortal('admin')} className="hover:text-white">Super Admin Dashboard</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Corporate & Legal</h4>
            <p className="text-gray-400">CODTECH IT SOLUTIONS PRIVATE LIMITED</p>
            <p className="text-gray-400">Miyapur, Hyderabad, Telangana 500049</p>
            <p className="text-gray-400">support@vride.in · 1800-200-8743</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
          <p>© 2026 V RIDE Platform. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms & Conditions</span>
            <span className="hover:underline cursor-pointer">Pricing Guidelines</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default WebsiteHome;
