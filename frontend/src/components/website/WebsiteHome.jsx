import React, { useState } from 'react';
import {
  Bike, Package, MapPin, Utensils, Smartphone, Shield,
  Star, CheckCircle2, ArrowRight, Download, Phone, Mail,
  ChevronDown, HelpCircle, DollarSign, Award, Heart
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
          <div className="w-9 h-9 rounded-xl bg-vride-yellow text-black flex items-center justify-center font-black text-xl shadow-yellow-glow">
            V
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-wide text-black">V RIDE</span>
            <span className="text-[10px] text-gray-500 block leading-none font-bold">Rides · Parcels · Food</span>
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

      {/* Services Section */}
      <section id="services" className="py-12 md:py-16 px-4 md:px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-vride-yellowDark uppercase tracking-wider">Our Solutions</span>
            <h2 className="text-3xl font-black text-gray-900">Four Core Services, Infinite Convenience</h2>
            <p className="text-xs text-gray-600 font-medium">Built specifically for the dynamic streets of Hyderabad and Indian cities.</p>
          </div>

          {/* Service Selector Tabs */}
          <div className="flex justify-center gap-3 overflow-x-auto">
            {[
              { id: 'ride', label: 'Ride Booking', icon: Bike },
              { id: 'parcel', label: 'Send Parcels', icon: Package },
              { id: 'pickdrop', label: 'Pick & Drop', icon: MapPin },
              { id: 'food', label: 'Food Delivery', icon: Utensils }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveServiceTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-extrabold transition shadow-xs ${
                    activeServiceTab === tab.id
                      ? 'bg-vride-yellow text-black ring-2 ring-black'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Service Detail Showcase */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-black uppercase text-yellow-600 tracking-wider">
                {activeServiceTab.toUpperCase()} HIGHLIGHTS
              </span>
              <h3 className="text-2xl font-black text-gray-900">
                {activeServiceTab === 'ride' && 'Instant Bike, Auto & Cab Rides Across Hyderabad'}
                {activeServiceTab === 'parcel' && 'Doorstep Parcel Pickup With OTP Delivery Security'}
                {activeServiceTab === 'pickdrop' && 'Send Important Documents & Items Anywhere'}
                {activeServiceTab === 'food' && 'Order Hot Meals From Top Local Hyderabadi Restaurants'}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                {activeServiceTab === 'ride' && 'Skip traffic jams with quick bike taxis or travel comfortably in verified cabs and autos with upfront transparent pricing.'}
                {activeServiceTab === 'parcel' && 'Whether it is small documents or large packages up to 10 kg, our delivery fleet ensures swift doorstep transfer.'}
                {activeServiceTab === 'pickdrop' && 'Forgot keys, urgent contracts, or gifts? Our pick & drop agents handle your belongings with maximum care.'}
                {activeServiceTab === 'food' && 'From authentic Paradise Biryani to Domino’s pizzas and Subway subs, enjoy fast delivery with live GPS order tracking.'}
              </p>
              <button
                onClick={() => setCurrentPortal('customer')}
                className="px-5 py-2.5 rounded-xl bg-black text-white font-extrabold text-xs flex items-center gap-2 hover:bg-neutral-800 transition"
              >
                <span>Book {activeServiceTab.toUpperCase()} Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-md h-64 bg-gray-100">
              <img
                src={
                  activeServiceTab === 'ride'
                    ? 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80'
                    : activeServiceTab === 'parcel'
                    ? 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80'
                    : activeServiceTab === 'pickdrop'
                    ? 'https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?w=600&auto=format&fit=crop&q=80'
                    : 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80'
                }
                alt="Service Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-vride-yellow text-black flex items-center justify-center font-black">V</div>
              <span className="font-black text-base">V RIDE</span>
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
