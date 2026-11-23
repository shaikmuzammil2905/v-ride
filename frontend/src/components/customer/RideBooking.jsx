import React, { useState } from 'react';
import {
  ArrowLeft, ArrowUpDown, Info, Shield, Phone, MessageSquare,
  AlertTriangle, CheckCircle2, Star, Navigation
} from 'lucide-react';
import MapComponent from '../common/MapComponent';
import { useApp } from '../../context/AppContext';

export const RideBooking = ({ onNavigate, onBack }) => {
  const { currentUser, setActiveRide } = useApp();

  const [pickup, setPickup] = useState('Miyapur, Hyderabad');
  const [drop, setDrop] = useState('Kukatpally, Hyderabad');
  const [selectedVehicle, setSelectedVehicle] = useState('bike'); // 'bike' | 'auto' | 'car'
  const [bookingStep, setBookingStep] = useState('select'); // 'select' | 'searching' | 'confirmed' | 'live'
  const [rideOtp] = useState('7391');
  const [showSosModal, setShowSosModal] = useState(false);
  const [sosAlertSent, setSosAlertSent] = useState(false);

  // Swap pickup & drop
  const handleSwap = () => {
    const temp = pickup;
    setPickup(drop);
    setDrop(temp);
  };

  const vehicleFares = {
    bike: { label: 'Bike', fareRange: '₹56 - ₹72', time: '12 min', icon: '🛵' },
    auto: { label: 'Auto', fareRange: '₹85 - ₹105', time: '14 min', icon: '🛺' },
    car: { label: 'Car', fareRange: '₹145 - ₹180', time: '16 min', icon: '🚗' }
  };

  const handleBookRide = () => {
    setBookingStep('searching');
    setTimeout(() => {
      setBookingStep('confirmed');
      const booked = {
        id: 'ride_' + Date.now(),
        pickup,
        drop,
        vehicleType: selectedVehicle,
        fare: selectedVehicle === 'bike' ? 68 : selectedVehicle === 'auto' ? 95 : 160,
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
      {/* Header matching image.png */}
      <div className="flex items-center px-4 py-3.5 border-b border-gray-100 bg-white sticky top-0 z-20">
        <button
          onClick={onBack}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-800 transition mr-3 active:scale-95"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>
        <h1 className="text-base font-bold text-gray-900">Book a Ride</h1>
      </div>

      {/* Map View matching reference screenshot */}
      <div className="p-4 bg-white">
        <MapComponent
          pickupCoords={[17.4948, 78.3578]}
          dropCoords={[17.4842, 78.3986]}
          pickupName={pickup}
          dropName={drop}
          vehicleType={selectedVehicle}
          height="220px"
        />
      </div>

      {bookingStep === 'select' && (
        <div className="px-5 space-y-4">
          {/* Vehicle Category Selector Pills (Bike / Auto / Car matching screenshot) */}
          <div className="grid grid-cols-3 gap-3">
            {/* 1. Bike */}
            <button
              onClick={() => setSelectedVehicle('bike')}
              className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-2xl border transition-all ${
                selectedVehicle === 'bike'
                  ? 'bg-vride-yellow border-black text-black font-extrabold shadow-sm'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">🛵</span>
              <span className="text-xs font-bold mt-1">Bike</span>
            </button>

            {/* 2. Auto */}
            <button
              onClick={() => setSelectedVehicle('auto')}
              className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-2xl border transition-all ${
                selectedVehicle === 'auto'
                  ? 'bg-vride-yellow border-black text-black font-extrabold shadow-sm'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">🛺</span>
              <span className="text-xs font-bold mt-1">Auto</span>
            </button>

            {/* 3. Car */}
            <button
              onClick={() => setSelectedVehicle('car')}
              className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-2xl border transition-all ${
                selectedVehicle === 'car'
                  ? 'bg-vride-yellow border-black text-black font-extrabold shadow-sm'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">🚗</span>
              <span className="text-xs font-bold mt-1">Car</span>
            </button>
          </div>

          {/* Location inputs with swap button matching reference screenshot */}
          <div className="bg-[#f9fafb] p-3.5 rounded-2xl border border-gray-200 relative">
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
            <div className="flex items-center gap-2.5 pt-2.5">
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

            {/* Swap Button */}
            <button
              onClick={handleSwap}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white border border-gray-300 shadow-sm hover:bg-gray-50 text-gray-600 active:scale-95"
              title="Swap Locations"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Fare Estimate matching screenshot */}
          <div className="flex items-center justify-between px-1 py-1">
            <span className="text-xs font-bold text-gray-700">Fare Estimate</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-extrabold text-gray-900">
                {vehicleFares[selectedVehicle].fareRange}
              </span>
              <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
            </div>
          </div>

          {/* Book Ride Button (Yellow full width matching screenshot) */}
          <button
            onClick={handleBookRide}
            className="w-full py-3.5 rounded-2xl bg-vride-yellow text-black font-extrabold text-sm shadow-yellow-glow hover:bg-yellow-400 transition active:scale-98"
          >
            Book Ride
          </button>
        </div>
      )}

      {/* Searching State */}
      {bookingStep === 'searching' && (
        <div className="px-5 py-8 text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="w-16 h-16 rounded-full border-4 border-yellow-200 border-t-vride-yellow animate-spin"></div>
            <span className="absolute inset-0 flex items-center justify-center text-xl">🛵</span>
          </div>
          <h3 className="font-bold text-sm text-gray-900">Finding nearby {selectedVehicle} drivers...</h3>
          <p className="text-xs text-gray-500">Connecting you to top-rated partners near Miyapur</p>
        </div>
      )}

      {/* Confirmed / Assigned State */}
      {bookingStep === 'confirmed' && (
        <div className="px-5 space-y-4">
          {/* OTP Banner */}
          <div className="bg-yellow-50 border border-yellow-300 p-3.5 rounded-2xl flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[10px] font-bold text-gray-600 uppercase">Share Ride Start OTP</span>
              <p className="text-xl font-black text-black tracking-widest">{rideOtp}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2.5 py-1 rounded-full">
                Driver Arriving (3 min)
              </span>
            </div>
          </div>

          {/* Assigned Driver Card */}
          <div className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                  alt="Rider Ramesh K"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-yellow-400"
                />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Ramesh K</h4>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-800">4.8</span>
                    <span>(2,341 trips)</span>
                  </div>
                </div>
              </div>

              {/* Call and Chat Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href="tel:+919848012345"
                  className="w-9 h-9 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center hover:bg-yellow-200 transition"
                  title="Call Driver"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <button
                  onClick={() => alert('Driver Chat: "I am near Miyapur Metro Pillar 1120. Reaching in 2 minutes!"')}
                  className="w-9 h-9 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center hover:bg-yellow-200 transition"
                  title="Chat with Driver"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="bg-gray-50 p-2.5 rounded-xl flex items-center justify-between text-xs">
              <span className="font-medium text-gray-600">
                {selectedVehicle === 'bike' ? 'Bajaj Pulsar 150' : 'Auto Rickshaw'}
              </span>
              <span className="font-black text-gray-900 tracking-wider">TS 08 EA 4521</span>
            </div>

            {/* SOS & Cancel */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowSosModal(true)}
                className="flex-1 py-2.5 rounded-xl bg-red-50 text-red-600 border border-red-200 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-red-100 transition"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Emergency SOS</span>
              </button>

              <button
                onClick={() => {
                  if (confirm('Are you sure you want to cancel this ride?')) {
                    setBookingStep('select');
                    setActiveRide(null);
                  }
                }}
                className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-bold text-xs hover:bg-gray-200 transition"
              >
                Cancel Ride
              </button>
            </div>
          </div>

          {/* Test Action to simulate trip start/end */}
          <div className="pt-2 text-center">
            <button
              onClick={() => {
                alert('Trip Simulation: Ride safely completed! Fare ₹68 paid from V RIDE Wallet.');
                setBookingStep('select');
                setActiveRide(null);
                onNavigate('home');
              }}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              Simulate Complete Trip & Pay →
            </button>
          </div>
        </div>
      )}

      {/* SOS MODAL */}
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
