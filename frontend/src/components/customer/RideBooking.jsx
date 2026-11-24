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
  const [selectedVehicle, setSelectedVehicle] = useState('bike'); // 'bike' | 'auto' | 'shared_auto' | 'cab_economy' | 'cab_premium' | 'parcel_bike'
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
    shared_auto: { label: 'Shared Auto', fare: 40, fareRange: '₹35 - ₹45', time: '18 min', icon: '🛺', desc: 'Super pocket friendly' },
    cab_economy: { label: 'Cab Economy', fare: 135, fareRange: '₹120 - ₹150', time: '15 min', icon: '🚗', desc: 'Comfortable AC Hatch' },
    cab_premium: { label: 'Cab Premium', fare: 210, fareRange: '₹190 - ₹240', time: '15 min', icon: '✨', desc: 'Top rated Prime Sedan' },
    parcel_bike: { label: 'Parcel on Bike', fare: 50, fareRange: '₹40 - ₹60', time: '15 min', icon: '📦', desc: 'Quick package delivery' }
  };

  // Recent / Saved Locations matching image copy 18.png & 19.png
  const recentDestinations = [
    {
      id: 'loc_1',
      title: 'Hindu College of Pharmacy',
      address: 'Amaravati Road, Venugopalnagar, Gauthami Nagar...',
      fav: true
    },
    {
      id: 'loc_2',
      title: 'RTO Office Road',
      address: 'Swarnabharathi Nagar, Main Ring Road, Hyderabad...',
      fav: true
    },
    {
      id: 'loc_3',
      title: 'Shriram Automall Guntur',
      address: 'Chennai - Srikakulam National Highway, near Bharat...',
      fav: true
    },
    {
      id: 'loc_4',
      title: 'Shri hospital Darapaneni buildings',
      address: 'Doka Road, Kakumanu Vari Thota, Donka Road, M...',
      fav: false
    },
    {
      id: 'loc_5',
      title: 'NTR Stadium Walking Track',
      address: 'Ashok Nagar, Sports Complex Road, Hyderabad',
      fav: false
    },
    {
      id: 'loc_6',
      title: 'SR COLLEGE',
      address: 'Gorantla, Main Road, Guntur / Hyderabad',
      fav: false
    },
    {
      id: 'loc_7',
      title: 'Acharya Nagarjuna University (ANU)',
      address: 'Nagarjuna Nagar, Andhra Pradesh / Telangana Highway',
      fav: true
    },
    {
      id: 'loc_8',
      title: 'Vivaha Convention',
      address: 'Etukuru Road, near Indian Petrol Bunk, R Agrahara...',
      fav: false
    },
    {
      id: 'loc_9',
      title: 'NTR Bus Station Guntur',
      address: 'Arrival Block Road, Coastal Andhra Region, Tham...',
      fav: true
    }
  ];

  const handleSelectDestination = (dest) => {
    setDrop(dest.title);
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
    <div className="flex flex-col min-h-full bg-white pb-28 select-none">
      {/* 1. Header with 'For me v' dropdown matching image copy 18.png */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-800 transition active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
          <span className="font-extrabold text-sm text-gray-900">Where would you like to go?</span>
        </div>

        {/* 'For me v' Dropdown Pill (image copy 18.png) */}
        <div className="relative">
          <button
            onClick={() => setShowForMeDropdown(!showForMeDropdown)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 text-xs font-extrabold text-gray-800 bg-white shadow-2xs hover:bg-gray-50 active:scale-95"
          >
            <span>{selectedRideFor}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </button>

          {showForMeDropdown && (
            <div className="absolute right-0 mt-1.5 w-44 bg-white border border-gray-200 rounded-2xl shadow-xl z-30 p-1.5 text-xs font-bold animate-fadeIn">
              <button
                onClick={() => { setSelectedRideFor('For me'); setShowForMeDropdown(false); }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-yellow-50 text-gray-800"
              >
                👤 For me
              </button>
              <button
                onClick={() => { setSelectedRideFor('For someone else'); setShowForMeDropdown(false); }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-yellow-50 text-gray-800"
              >
                👥 For someone else
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. PICKUP & DROP INPUT CARD (NO GIANT MAP - EXACT MATCH TO image copy 18.png & 19.png) */}
      {bookingStep === 'select' && (
        <div className="p-4 space-y-4">
          <div className="bg-[#f9fafb] p-3.5 rounded-3xl border border-gray-200 relative space-y-3 shadow-2xs">
            {/* Tooltip: You can now book a ride for someone else */}
            {selectedRideFor === 'For someone else' && (
              <div className="bg-blue-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-sm flex items-center justify-between">
                <span>✓ Booking for family/friends enabled</span>
                <span className="text-[10px] opacity-80">Share live OTP</span>
              </div>
            )}

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
                  placeholder="Drop location (Search destination)"
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

          {/* Map Location Picker Pill Button matching image copy 18.png */}
          <div className="flex items-center justify-between px-1">
            <button
              onClick={() => setShowMapModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-extrabold text-gray-800 shadow-xs hover:bg-gray-50 active:scale-95"
            >
              <MapPin className="w-3.5 h-3.5 text-black" />
              <span>Map Picker</span>
            </button>

            <button
              onClick={() => setShowAllServicesModal(true)}
              className="text-xs font-extrabold text-blue-600 hover:underline"
            >
              All 8 Services →
            </button>
          </div>

          {/* 3. VEHICLE CATEGORIES BELOW FIELDS (Bike, Auto, Shared Auto, Cab Economy, Cab Premium, Parcel) */}
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
                { id: 'cab_premium', label: 'Cab Premium', icon: '✨', fare: '₹190 - ₹240' },
                { id: 'parcel_bike', label: 'Parcel on Bike', icon: '📦', fare: '₹40 - ₹60' }
              ].map((v) => {
                const isSelected = selectedVehicle === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVehicle(v.id)}
                    className={`p-2.5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                      isSelected
                        ? 'border-black bg-[#FFFBE6] text-black font-extrabold ring-1 ring-black shadow-xs'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl mb-1">{v.icon}</span>
                    <span className="text-xs font-black block leading-tight">{v.label}</span>
                    <span className="text-[10px] text-gray-500 font-bold block mt-0.5">{v.fare}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. "EVERYTHING IN MINUTES" 4-CARD SECTION (image copy 19.png) */}
          <div className="pt-2 space-y-2">
            <h3 className="font-black text-sm text-gray-900">Everything In Minutes</h3>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Bike Taxi */}
              <div
                onClick={() => setSelectedVehicle('bike')}
                className={`p-3 rounded-2xl border transition cursor-pointer flex flex-col justify-between h-28 ${
                  selectedVehicle === 'bike' ? 'bg-[#FFFBE6] border-black' : 'bg-[#F9FAFB] border-gray-100 hover:border-yellow-300'
                }`}
              >
                <div>
                  <span className="text-[10px] text-gray-500 font-semibold block leading-tight">Beat the traffic</span>
                  <h4 className="font-black text-sm text-gray-900">Bike Taxi</h4>
                </div>
                <div className="self-end text-3xl">🛵</div>
              </div>

              {/* Parcel */}
              <div
                onClick={() => onNavigate && onNavigate('parcel')}
                className="p-3 rounded-2xl bg-[#F9FAFB] border border-gray-100 hover:border-purple-300 transition cursor-pointer flex flex-col justify-between h-28"
              >
                <div>
                  <span className="text-[10px] text-gray-500 font-semibold block leading-tight">Send anything</span>
                  <h4 className="font-black text-sm text-gray-900">Parcel</h4>
                </div>
                <div className="self-end text-3xl">📦</div>
              </div>

              {/* Book Now Auto/Cab */}
              <div
                onClick={() => setSelectedVehicle('auto')}
                className={`p-3 rounded-2xl border transition cursor-pointer flex flex-col justify-between h-28 ${
                  selectedVehicle === 'auto' ? 'bg-[#FFFBE6] border-black' : 'bg-[#F9FAFB] border-gray-100 hover:border-yellow-300'
                }`}
              >
                <div>
                  <span className="text-[10px] text-gray-500 font-semibold block leading-tight">Your everyday rides</span>
                  <h4 className="font-black text-sm text-gray-900">Book now</h4>
                </div>
                <div className="self-end text-2xl">🛺 🚗</div>
              </div>

              {/* All Services */}
              <div
                onClick={() => setShowAllServicesModal(true)}
                className="p-3 rounded-2xl bg-[#F9FAFB] border border-gray-100 hover:border-yellow-400 transition cursor-pointer flex flex-col justify-between h-28"
              >
                <div>
                  <span className="text-[10px] text-gray-500 font-semibold block leading-tight">Explore options</span>
                  <h4 className="font-black text-sm text-gray-900">All Services</h4>
                </div>
                <div className="self-end text-xl flex items-center gap-1 font-bold">
                  <span>🛺</span>
                  <span className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-black">→</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5. RECENT / SAVED LOCATIONS LIST (image copy 18.png & 19.png) */}
          <div className="space-y-2 pt-2">
            <h3 className="font-extrabold text-xs text-gray-900 uppercase tracking-wide">
              Recent & Saved Places
            </h3>

            <div className="divide-y divide-gray-100 border border-gray-100 rounded-3xl bg-white overflow-hidden shadow-2xs">
              {recentDestinations.slice(0, 6).map((dest) => (
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

          {/* 6. CONFIRM & BOOK RIDE BUTTON */}
          <div className="pt-2">
            <button
              onClick={handleBookRide}
              className="w-full py-4 rounded-2xl bg-[#FFD600] text-black font-black text-sm shadow-md hover:bg-yellow-400 transition active:scale-98 flex items-center justify-center gap-2"
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
                <div className="w-12 h-12 rounded-full bg-yellow-400 text-black font-black flex items-center justify-center text-base shadow-xs">
                  RK
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-gray-900">Ramesh K</h4>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-800">4.8</span>
                    <span>(2,341 trips)</span>
                  </div>
                </div>
              </div>

              {/* Call and Chat Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href="tel:+919848012345"
                  className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center hover:bg-yellow-200 transition"
                  title="Call Driver"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <button
                  onClick={() => alert('Driver: "Reaching Miyapur Metro pillar 1120 in 2 minutes!"')}
                  className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center hover:bg-yellow-200 transition"
                  title="Chat with Driver"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="bg-gray-50 p-3 rounded-2xl flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-700">
                {selectedVehicle === 'bike' ? 'Bajaj Pulsar 150 (Yellow)' : 'Auto Rickshaw'}
              </span>
              <span className="font-black text-gray-900 tracking-wider">TS 08 EA 4521</span>
            </div>

            {/* Route summary */}
            <div className="text-xs text-gray-500 space-y-1 pt-1">
              <div className="flex items-center gap-1.5 truncate">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="truncate">{pickup}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span className="truncate">{drop || 'Kukatpally, Hyderabad'}</span>
              </div>
            </div>

            {/* SOS & Cancel */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowSosModal(true)}
                className="flex-1 py-3 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 font-extrabold text-xs flex items-center justify-center gap-1.5 hover:bg-rose-100 transition"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Emergency SOS</span>
              </button>

              <button
                onClick={() => {
                  if (confirm('Cancel this ride?')) {
                    setBookingStep('select');
                    setActiveRide(null);
                  }
                }}
                className="flex-1 py-3 rounded-2xl bg-gray-100 text-gray-700 font-bold text-xs hover:bg-gray-200 transition"
              >
                Cancel Ride
              </button>
            </div>
          </div>

          {/* Test Action */}
          <div className="text-center pt-2">
            <button
              onClick={() => {
                alert('Trip Simulation: Ride completed! Fare ₹68 deducted.');
                setBookingStep('select');
                setActiveRide(null);
                onNavigate && onNavigate('home');
              }}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              Simulate Complete Trip & Pay →
            </button>
          </div>
        </div>
      )}

      {/* 7. ALL SERVICES MODAL (image copy 17.png) */}
      {showAllServicesModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-black text-base text-gray-900">All Services</h3>
              <button
                onClick={() => setShowAllServicesModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 py-4">
              {[
                { id: 'shared_auto', name: 'Shared Auto', icon: '🛺', fare: '₹35' },
                { id: 'bike', name: 'Bike', icon: '🛵', fare: '₹56' },
                { id: 'auto', name: 'Auto', icon: '🛺', fare: '₹85' },
                { id: 'parcel_bike', name: 'Parcel on Bike', icon: '📦', fare: '₹40' },
                { id: 'cab_economy', name: 'Cab Economy', icon: '🚗', fare: '₹120' },
                { id: 'bike_lite', name: 'Bike Lite', icon: '⚡', fare: '₹45' },
                { id: 'cab_premium', name: 'Cab Premium', icon: '✨', fare: '₹190' },
                { id: 'travel', name: 'Travel', icon: '🧳', fare: 'Outstation' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    if (s.id === 'travel') {
                      setShowAllServicesModal(false);
                      onNavigate && onNavigate('travel');
                    } else {
                      setSelectedVehicle(s.id);
                      setShowAllServicesModal(false);
                    }
                  }}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center ${
                    selectedVehicle === s.id
                      ? 'border-black bg-yellow-50 text-black font-extrabold shadow-sm ring-1 ring-black'
                      : 'border-gray-100 bg-[#F9FAFB] text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-2xl mb-1">{s.icon}</span>
                  <span className="text-xs font-bold block leading-tight">{s.name}</span>
                  <span className="text-[10px] text-gray-500 mt-0.5">{s.fare}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 8. MAP LOCATION PICKER MODAL (Opened ONLY when user explicitly clicks Map Picker) */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-black text-sm text-gray-900">Map Location Picker</h3>
              <button
                onClick={() => setShowMapModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-200">
              <MapComponent
                pickupCoords={[17.4948, 78.3578]}
                dropCoords={[17.4842, 78.3986]}
                pickupName={pickup}
                dropName={drop || 'Select Drop on Map'}
                vehicleType={selectedVehicle}
                height="220px"
              />
            </div>

            <button
              onClick={() => {
                if (!drop) setDrop('Kukatpally Metro Station, Hyderabad');
                setShowMapModal(false);
              }}
              className="w-full py-3 rounded-2xl bg-[#FFD600] text-black font-extrabold text-xs shadow-md"
            >
              Confirm Location on Map
            </button>
          </div>
        </div>
      )}

      {/* 9. SOS MODAL */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xs rounded-3xl p-5 text-center space-y-3 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="font-black text-base text-gray-900">Emergency SOS</h3>
            <p className="text-xs text-gray-500">
              Immediate live GPS coordinates and driver info will be broadcast to local police (112) and emergency contacts.
            </p>
            {sosAlertSent ? (
              <div className="p-3 bg-red-600 text-white rounded-xl text-xs font-bold">
                ✓ SOS Alert Dispatched to Emergency Helpline & Police!
              </div>
            ) : (
              <button
                onClick={() => setSosAlertSent(true)}
                className="w-full py-3 rounded-xl bg-red-600 text-white font-extrabold text-xs shadow-lg hover:bg-red-700 transition"
              >
                Trigger SOS Alert Now
              </button>
            )}
            <button
              onClick={() => { setShowSosModal(false); setSosAlertSent(false); }}
              className="w-full py-2 text-xs font-bold text-gray-500 hover:text-gray-800"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RideBooking;
