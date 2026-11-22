import React, { useState } from 'react';
import {
  ArrowLeft, Headphones, Phone, MessageSquare, Star,
  ChevronRight, ChevronDown, CheckCircle2, ShieldCheck, Navigation
} from 'lucide-react';
import MapComponent from '../common/MapComponent';
import { useApp } from '../../context/AppContext';

export const TrackOrder = ({ onBack, onNavigateHome }) => {
  const { activeFoodOrder } = useApp();
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'partner', text: 'Hi Sri Latha! I have picked up your order from Paradise Biryani. Reaching soon!' },
    { id: 2, sender: 'user', text: 'Thank you Ramesh, please call once at the building gate.' }
  ]);
  const [newChatInput, setNewChatInput] = useState('');

  const handleSendChat = () => {
    if (!newChatInput.trim()) return;
    setChatMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: newChatInput.trim() }]);
    setNewChatInput('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'partner', text: 'Sure, I will call you right at the gate! 👍' }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-full bg-white pb-8 select-none">
      {/* Header matching Screen 8 in image.png */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 bg-white sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-800 transition active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
          <h1 className="text-base font-bold text-gray-900">Track Order</h1>
        </div>

        {/* Headset support icon matching screenshot */}
        <button
          onClick={() => alert('V RIDE 24x7 Priority Support: Connected with agent Pooja. Helpline: 1800-200-8743')}
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-800 transition"
          aria-label="Support"
        >
          <Headphones className="w-5 h-5" />
        </button>
      </div>

      {/* Map View matching reference screenshot */}
      <div className="p-4 bg-white">
        <MapComponent
          pickupCoords={[17.4948, 78.3578]}
          dropCoords={[17.4842, 78.3986]}
          pickupName="Paradise Biryani"
          dropName="Lotus Residency, Miyapur"
          vehicleType="bike"
          height="220px"
        />
      </div>

      <div className="px-5 space-y-4">
        {/* Status Heading matching screenshot: Arriving in 8 min */}
        <div>
          <h2 className="text-lg font-black text-gray-900 leading-tight">
            {activeFoodOrder?.etaText || 'Arriving in 8 min'}
          </h2>
          <p className="text-xs text-gray-500 font-medium mt-0.5">Your order is on the way</p>
        </div>

        {/* Stepper Progress matching screenshot: Order Placed -> Preparing -> Picked Up -> Arriving */}
        <div className="py-2">
          <div className="relative flex items-center justify-between">
            {/* Progress line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
            <div className="absolute top-1/2 left-0 w-3/4 h-1 bg-vride-yellow -translate-y-1/2 z-0"></div>

            {/* Steps */}
            <div className="relative z-10 flex flex-col items-center">
              <span className="w-4 h-4 rounded-full bg-vride-yellow border-2 border-white ring-2 ring-yellow-400"></span>
              <span className="text-[10px] font-bold text-gray-700 mt-1">Order Placed</span>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <span className="w-4 h-4 rounded-full bg-vride-yellow border-2 border-white ring-2 ring-yellow-400"></span>
              <span className="text-[10px] font-bold text-gray-700 mt-1">Preparing</span>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <span className="w-4 h-4 rounded-full bg-vride-yellow border-2 border-white ring-2 ring-yellow-400"></span>
              <span className="text-[10px] font-bold text-gray-700 mt-1">Picked Up</span>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <span className="w-4 h-4 rounded-full bg-vride-yellow border-2 border-white ring-2 ring-yellow-400 animate-pulse"></span>
              <span className="text-[10px] font-bold text-gray-900 mt-1">Arriving</span>
            </div>
          </div>
        </div>

        {/* Driver Card matching screenshot: Ramesh K, 4.8 (2,341 trips), Call, Chat */}
        <div className="p-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
              alt="Ramesh K"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-yellow-400"
            />
            <div>
              <h3 className="font-extrabold text-sm text-gray-900">Ramesh K</h3>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-gray-900">4.8</span>
                <span>(2,341 trips)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:+919848012345"
              className="w-9 h-9 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center hover:bg-yellow-200 transition active:scale-95"
              title="Call Rider"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setShowChatModal(true)}
              className="w-9 h-9 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center hover:bg-yellow-200 transition active:scale-95"
              title="Chat with Rider"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Delivery OTP Badge */}
        <div className="p-3 bg-yellow-50 rounded-2xl border border-yellow-200 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase block">Delivery OTP</span>
            <span className="font-black text-black text-lg tracking-wider">
              {activeFoodOrder?.otp || '4829'}
            </span>
          </div>
          <span className="text-[11px] text-gray-600 font-medium max-w-[170px] text-right">
            Share this OTP with Ramesh upon arrival
          </span>
        </div>

        {/* Order Details Expandable matching screenshot: "2 Items · ₹598" */}
        <div className="border border-gray-100 rounded-2xl bg-white overflow-hidden shadow-xs">
          <button
            onClick={() => setShowOrderDetails(!showOrderDetails)}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-gray-100 text-gray-700">📦</span>
              <div>
                <h4 className="font-bold text-xs text-gray-900">Order Details</h4>
                <p className="text-[11px] text-gray-500 font-medium">2 Items · ₹598</p>
              </div>
            </div>
            {showOrderDetails ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {showOrderDetails && (
            <div className="p-3.5 pt-0 border-t border-gray-100 text-xs space-y-2">
              <div className="flex justify-between py-1">
                <span className="text-gray-700">1x Chicken Biryani</span>
                <span className="font-bold text-gray-900">₹299</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-700">1x Mutton Biryani</span>
                <span className="font-bold text-gray-900">₹299</span>
              </div>
              <div className="pt-2 border-t border-gray-100 flex justify-between font-bold">
                <span>Total Paid via UPI</span>
                <span className="text-black">₹598</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CHAT MODAL */}
      {showChatModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl p-4 shadow-2xl h-[480px] flex flex-col justify-between">
            {/* Chat header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                  alt="Ramesh K"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-xs text-gray-900">Ramesh K (Partner)</h4>
                  <span className="text-[10px] text-green-500 font-bold">● Active on Delivery</span>
                </div>
              </div>
              <button
                onClick={() => setShowChatModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs"
              >
                ✕
              </button>
            </div>

            {/* Chat messages stream */}
            <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
              {chatMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] p-2.5 rounded-2xl text-xs font-medium ${
                      msg.sender === 'user'
                        ? 'bg-black text-white rounded-br-xs'
                        : 'bg-gray-100 text-gray-800 rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input bar */}
            <div className="pt-2 border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={newChatInput}
                onChange={(e) => setNewChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                placeholder="Type a message to partner..."
                className="flex-1 px-3 py-2 rounded-xl bg-gray-100 text-xs font-medium focus:outline-none"
              />
              <button
                onClick={handleSendChat}
                className="px-3 py-2 rounded-xl bg-vride-yellow text-black font-extrabold text-xs shadow-xs"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default TrackOrder;
