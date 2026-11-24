import React, { useState } from 'react';
import {
  ArrowLeft, ArrowUpDown, Info, Shield, Phone, MessageSquare,
  AlertTriangle, CheckCircle2, Star, Navigation, MapPin, Heart,
  Clock, Search, Plus, ChevronDown, ChevronRight, X
} from 'lucide-react';
import MapComponent from '../common/MapComponent';
import { useApp } from '../../context/AppContext';

export const RideBooking = ({ onNavigate, onBack }) => {
  const { currentUser, setActiveRide } = useApp();

  // Booking states
  const [pickup, setPickup] = useState('19-7-326, I.P.D Colony, Miyapur, Hyderabad');
  const [drop, setDrop] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('bike');
  const [bookingStep, setBookingStep] = useState('select'); // 'select' | 'searching' | 'confirmed' | 'live'
  const [rideOtp] = useState('7391');

  // Modals
  const [showMapModal, setShowMapModal] = useState(false);
  const [showAllServicesModal, setShowAllServicesModal] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);
  const [sosAlertSent, setSosAlertSent] = useState(false);
  const [showForMeDropdown, setShowForMeDropdown] = useState(false);
  const [selectedRideFor, setSelectedRideFor] = useState('For me');

  // Swap pickup & drop
  const handleSwap = () => {
    if (!drop) return;
    const temp = pickup;
    setPickup(drop);
    setDrop(temp);
  };

  const vehicleFares = {
    bike: { label: 'Bike', fare: 68, fareRange: '₹56 - ₹72', time: '12 min', icon: '🛵', desc: 'Beat the traffic' },
    auto: { label: 'Auto', fare: 95, fareRange: '₹85 - ₹105', time: '14 min', icon: '🛺', desc: 'Everyday ride' },
    shared_auto: { label: 'Shared Auto', fare: 40, fareRange: '₹35 - ₹45', time: '18 min', icon: '🛺', desc: 'Pocket friendly' },
    cab_economy: { label: 'Cab Economy', fare: 135, fareRange: '₹120 - ₹150', time: '15 min', icon: '🚗', desc: 'Comfortable AC' },
    cab_premium: { label: 'Cab Premium', fare: 210, fareRange: '₹190 - ₹240', time: '15 min', icon: '✨', desc: 'Prime Sedan' }
  };

  const recentDestinations = [
    {
      id: 'loc_1',
      title: 'Hindu College of Pharmacy',
      address: 'Amaravati Road, Venugopalnagar, Gauthami Nagar, Hyderabad',
      fav: true
    },
    {
      id: 'loc_2',
      title: 'RTO Office Road',
      address: 'Swarnabharathi Nagar, Main Ring Road, Hyderabad',
      fav: true
    },
    {
      id: 'loc_3',
      title: 'Kukatpally Metro Station',
      address: 'JNTU Road, Kukatpally, Hyderabad',
      fav: true
    },
    {
      id: 'loc_4',
      title: 'Hitec City Cyber Towers',
      address: 'Madhapur, Hitec City, Hyderabad',
      fav: false
    },
    {
      id: 'loc_5',
      title: 'Gachibowli Stadium',
      address: 'Old Mumbai Highway, Gachibowli, Hyderabad',
      fav: false
    }
  ];

  const handleSelectDestination = (dest) => {
    setDrop(dest.title + ', ' + dest.address);
  };

  const handleBookRide = () => {
    if (!drop) {
      setDrop('Kukatpally Metro Station, Hyderabad');
    }
    setBookingStep('searching');
    setTimeout(() => {
      setBookingStep('confirmed');
      const booked = {
        id: 'ride_' + Date.now(),
        pickup,
        drop: drop || 'Kukatpally Metro Station, Hyderabad',
        vehicleType: selectedVehicle,
        fare: vehicleFares[selectedVehicle]?.fare || 68,
        partnerName: 'Ramesh K',
        partnerPhone: '+91 98480 12345',
        partnerRating: 4.8,
        vehicleModel: selectedVehicle === 'bike' ? 'Bajaj Pulsar 150 (Yellow)' : selectedVehicle === 'auto' ? 'Bajaj RE Auto Rickshaw' : 'Maruti Suzuki Dzire',
        vehicleNumber: 'TS 08 EA 4521',
        otp: rideOtp,
        status: 'arriving'
      };
      setActiveRide(booked);
    }, 1500);
  };

  return (
    <div className="flex flex-col bg-white pb-2 select-none">
      {/* ============================================================ */}
      {/* 1. DARK HEADER WITH YELLOW WAVE & 3D RIDER SILHOUETTE        */}
      {/* EXACT MATCH TO image copy 29.png                             */}
      {/* ============================================================ */}
      <div className="relative bg-[#0b0e14] text-white pt-3 pb-5 px-4 overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#FFD600]/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top bar with back arrow and glassy dropdown */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 rounded-full glass-btn-dark hover:bg-white/10 text-white transition active:scale-95"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
            <span className="font-extrabold text-sm text-white">Where would you like to go?</span>
          </div>

          {/* Glassy 'For me v' Dropdown Pill */}
          <div className="relative">
            <button
              onClick={() => setShowForMeDropdown(!showForMeDropdown)}
              className="glass-pill-dark px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1.5 active:scale-95"
            >
              <span>{selectedRideFor}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {showForMeDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-[#161c28] border border-white/15 rounded-2xl shadow-2xl z-30 p-1.5 text-xs font-bold animate-fadeIn text-white">
                <button
                  onClick={() => { setSelectedRideFor('For me'); setShowForMeDropdown(false); }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/10 text-white flex items-center gap-2"
                >
                  <span>👤 For me</span>
                </button>
                <button
                  onClick={() => { setSelectedRideFor('For someone else'); setShowForMeDropdown(false); }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/10 text-white flex items-center gap-2"
                >
                  <span>👥 For someone else</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 3D Scooter Graphic on Yellow Wave */}
        <div className="mt-3 flex items-center justify-between relative z-10">
          <div>
            <span className="text-[10px] font-black uppercase text-[#FFD600] tracking-wider block">
              V RIDE FAST MOBILITY
            </span>
            <p className="text-xs text-gray-300 font-medium mt-0.5">
              Doorstep pickup in 2 to 5 minutes across Hyderabad
            </p>
          </div>
          <div className="shrink-0 text-3xl -mr-1">
            🛵
          </div>
        </div>

        {/* Yellow Wave Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#FFD600]"></div>
      </div>

      {/* ============================================================ */}
      {/* 2. PICKUP & DROP INPUT CARD                                  */}
      {/* ============================================================ */}
      {bookingStep === 'select' && (
        <div className="p-4 space-y-4">
          <div className="bg-[#f9fafb] p-3.5 rounded-3xl border border-gray-200 relative space-y-3 shadow-2xs">
            {/* Pickup Location input with green dot */}
            <div className="flex items-center gap-2.5 pb-2 border-b border-gray-200/80">
              <span className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-emerald-200 shrink-0"></span>
              <div className="flex-1 min-w-0">
                <label className="text-[9px] text-gray-400 font-extrabold uppercase tracking-wider block">
                  Pickup Location
                </label>
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Enter pickup point"
                  className="w-full text-xs font-bold text-gray-900 bg-transparent focus:outline-none truncate"
                />
              </div>
              <button
                onClick={() => alert('Add Stop: Via stop added for multi-location rides.')}
                className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-200 transition"
                title="Add stop"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Drop Location input with orange pin */}
            <div className="flex items-center gap-2.5 pt-1">
              <span className="w-3 h-3 rounded-full bg-orange-500 ring-2 ring-orange-200 shrink-0"></span>
              <div className="flex-1 min-w-0">
                <label className="text-[9px] text-gray-400 font-extrabold uppercase tracking-wider block">
                  Drop Location
                </label>
                <input
                  type="text"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  placeholder="Search destination"
                  className="w-full text-xs font-bold text-gray-900 bg-transparent focus:outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Swap Button */}
            <button
              onClick={handleSwap}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white border border-gray-300 shadow-xs hover:bg-gray-50 text-gray-700 active:scale-95"
              title="Swap Locations"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action Row: Glassy Map Picker button & All Ride Options */}
          <div className="flex items-center justify-between px-1">
            <button
              onClick={() => setShowMapModal(true)}
              className="glass-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-gray-900 active:scale-95"
            >
              <MapPin className="w-3.5 h-3.5 text-black" />
              <span>Map Picker</span>
            </button>

            <button
              onClick={() => setShowAllServicesModal(true)}
              className="text-xs font-extrabold text-gray-800 hover:text-black hover:underline"
            >
              All Ride Options →
            </button>
          </div>

          {/* ============================================================ */}
          {/* 3. SELECT VEHICLE CATEGORY (5 CARDS)                         */}
          {/* EXACT MATCH TO image copy 29.png                             */}
          {/* ============================================================ */}
          <div className="space-y-2 pt-1">
            <h3 className="font-extrabold text-xs text-gray-900 uppercase tracking-wide">
              Select Vehicle Category
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'bike', label: 'Bike', icon: '🛵', fare: '₹56 - ₹72' },
                { id: 'auto', label: 'Auto', icon: '🛺', fare: '₹85 - ₹105' },
                { id: 'shared_auto', label: 'Shared Auto', icon: '🛺', fare: '₹35 - ₹45' },
                { id: 'cab_economy', label: 'Cab Economy', icon: '🚗', fare: '₹120 - ₹150' },
                { id: 'cab_premium', label: 'Cab Premium', icon: '✨', fare: '₹190 - ₹240' }
              ].map((v) => {
                const isSelected = selectedVehicle === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVehicle(v.id)}
                    className={`p-2.5 rounded-2xl border transition-all text-left flex flex-col justify-between relative ${
                      isSelected
                        ? 'border-yellow-400 bg-[#FFFBE6] text-black font-extrabold shadow-sm'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-black text-white text-[9px] flex items-center justify-center font-black">
                        ✓
                      </span>
                    )}
                    <span className="text-xl mb-1">{v.icon}</span>
                    <span className="text-xs font-black block leading-tight">{v.label}</span>
                    <span className="text-[10px] text-gray-500 font-bold block mt-0.5">{v.fare}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ============================================================ */}
          {/* 4. EVERYTHING IN MINUTES BANNER                              */}
          {/* ============================================================ */}
          <div className="pt-2 space-y-2">
            <div className="p-3.5 rounded-2xl bg-[#FFF9D2] border border-yellow-300/80 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-black uppercase tracking-wider text-yellow-900 block">
                  Everything In Minutes
                </span>
                <h4 className="font-black text-xs text-black">Beat the traffic with Bike Taxi</h4>
                <p className="text-[10px] text-gray-700 font-medium">Fast · Safe · Affordable</p>
              </div>
              <div className="text-2xl">🛵</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div
                onClick={() => setSelectedVehicle('auto')}
                className="p-3 rounded-2xl bg-white border border-gray-200/80 hover:border-yellow-300 transition cursor-pointer flex items-center justify-between"
              >
                <div>
                  <h5 className="font-black text-xs text-gray-900">Your everyday rides</h5>
                  <p className="text-[10px] text-gray-500">Auto & Cabs</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

              <div
                onClick={() => setShowAllServicesModal(true)}
                className="p-3 rounded-2xl bg-white border border-gray-200/80 hover:border-yellow-300 transition cursor-pointer flex items-center justify-between"
              >
                <div>
                  <h5 className="font-black text-xs text-gray-900">Explore options</h5>
                  <p className="text-[10px] text-gray-500">All 5 categories</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* 5. RECENT / SAVED PLACES LIST                                */}
          {/* ============================================================ */}
          <div className="space-y-2 pt-1">
            <h3 className="font-extrabold text-xs text-gray-900 uppercase tracking-wide">
              Recent & Saved Places
            </h3>

            <div className="divide-y divide-gray-100 border border-gray-100 rounded-3xl bg-white overflow-hidden shadow-2xs">
              {recentDestinations.map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => handleSelectDestination(dest)}
                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-yellow-50/60 transition active:scale-99"
                >
                  <div className="flex items-start gap-2.5 min-w-0 pr-2">
                    <Clock className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-gray-900 truncate">{dest.title}</h4>
                      <p className="text-[10px] text-gray-400 truncate">{dest.address}</p>
                    </div>
                  </div>
                  <Heart className={`w-4 h-4 shrink-0 transition ${dest.fav ? 'text-rose-500 fill-rose-500' : 'text-gray-300'}`} />
                </div>
              ))}
            </div>
          </div>

          {/* ============================================================ */}
          {/* 6. GLASSY BOOK RIDE BUTTON                                   */}
          {/* ============================================================ */}
          <div className="pt-2">
            <button
              onClick={handleBookRide}
              className="glass-btn-yellow w-full py-3.5 rounded-2xl text-black font-black text-sm flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Book {vehicleFares[selectedVehicle]?.label.toUpperCase()} · ₹{vehicleFares[selectedVehicle]?.fare}</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      )}

      {/* SEARCHING DRIVER STATE */}
      {bookingStep === 'searching' && (
        <div className="px-5 py-12 text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="w-16 h-16 rounded-full border-4 border-yellow-200 border-t-[#FFD600] animate-spin"></div>
            <span className="absolute inset-0 flex items-center justify-center text-xl">
              {vehicleFares[selectedVehicle]?.icon || '🛵'}
            </span>
          </div>
          <h3 className="font-black text-base text-gray-900">
            Finding nearby {vehicleFares[selectedVehicle]?.label} partners...
          </h3>
          <p className="text-xs text-gray-500">Connecting you to top-rated verified drivers in Hyderabad</p>
        </div>
      )}

      {/* CONFIRMED / ARRIVING DRIVER STATE */}
      {bookingStep === 'confirmed' && (
        <div className="p-4 space-y-4">
          {/* OTP Banner */}
          <div className="bg-[#FFFBE6] border border-yellow-300 p-4 rounded-3xl flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider block">
                Share Ride Start OTP
              </span>
              <p className="text-2xl font-black text-black tracking-widest">{rideOtp}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full inline-block">
                Driver Arriving (3 min)
              </span>
            </div>
          </div>

          {/* Assigned Driver Card */}
          <div className="bg-white border border-gray-200 p-4 rounded-3xl shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black text-base">
                  RK
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-gray-900">Ramesh K</h4>
                  <div className="flex items-center gap-1 text-[11px] text-gray-500">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-900">4.8</span>
                    <span>· 1,420 rides</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-black text-black block">TS 08 EA 4521</span>
                <span className="text-[10px] text-gray-500 block">Yellow Pulsar 150</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="tel:+919848012345"
                className="glass-btn-dark py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Driver</span>
              </a>
              <button
                onClick={() => alert('Chat with Ramesh: Driver says "I am at the main gate in 2 mins."')}
                className="glass-btn py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 text-gray-900"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Message</span>
              </button>
            </div>
          </div>

          {/* Action to complete or cancel */}
          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                alert('Ride completed! Thank you for choosing V RIDE.');
                setBookingStep('select');
              }}
              className="glass-btn-yellow flex-1 py-3 rounded-2xl text-black font-black text-xs"
            >
              Complete Ride
            </button>
            <button
              onClick={() => setBookingStep('select')}
              className="glass-btn flex-1 py-3 rounded-2xl text-gray-700 font-bold text-xs"
            >
              Cancel Ride
            </button>
          </div>
        </div>
      )}

      {/* MAP PICKER MODAL */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col justify-end animate-fadeIn">
          <div className="bg-white rounded-t-3xl max-w-md w-full mx-auto p-4 space-y-3 h-[75vh] flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-black text-sm text-gray-900">Pick Location on Hyderabad Map</h3>
              <button
                onClick={() => setShowMapModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden border border-gray-200">
              <MapComponent height="100%" interactive={true} />
            </div>
            <button
              onClick={() => {
                setDrop('Selected Map Point, Hitec City, Hyderabad');
                setShowMapModal(false);
              }}
              className="glass-btn-yellow w-full py-3 rounded-2xl text-black font-black text-xs"
            >
              Confirm Selected Pin
            </button>
          </div>
        </div>
      )}

      {/* ALL SERVICES MODAL */}
      {showAllServicesModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col justify-end animate-fadeIn">
          <div className="bg-white rounded-t-3xl max-w-md w-full mx-auto p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-black text-sm text-gray-900">All V RIDE Mobility Services</h3>
              <button
                onClick={() => setShowAllServicesModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {Object.entries(vehicleFares).map(([key, val]) => (
                <div
                  key={key}
                  onClick={() => {
                    setSelectedVehicle(key);
                    setShowAllServicesModal(false);
                  }}
                  className="p-3 rounded-2xl border border-gray-200 hover:border-yellow-400 hover:bg-yellow-50/50 cursor-pointer flex items-center justify-between transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{val.icon}</span>
                    <div>
                      <h4 className="font-black text-xs text-gray-900">{val.label}</h4>
                      <p className="text-[10px] text-gray-500">{val.desc} · {val.time}</p>
                    </div>
                  </div>
                  <span className="font-black text-xs text-black">{val.fareRange}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RideBooking;
