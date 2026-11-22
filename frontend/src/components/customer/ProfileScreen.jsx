import React, { useState } from 'react';
import { User, MapPin, Phone, Mail, Shield, LogOut, ChevronRight, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileScreen = () => {
  const { currentUser, setCurrentUser } = useApp();
  const [name, setName] = useState(currentUser.name || 'Sri Latha');
  const [email, setEmail] = useState(currentUser.email || 'srilatha@example.com');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setCurrentUser(prev => ({ ...prev, name, email }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-full bg-[#f8f9fa] pb-24 select-none">
      <div className="px-5 py-4 bg-white border-b border-gray-100">
        <h1 className="text-base font-bold text-gray-900">User Profile</h1>
      </div>

      <div className="p-5 space-y-4">
        {/* Profile Card */}
        <div className="p-4 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={name}
            className="w-16 h-16 rounded-full object-cover ring-4 ring-yellow-400"
          />
          <div>
            <h2 className="text-sm font-extrabold text-gray-900">{name}</h2>
            <p className="text-xs text-gray-500">{currentUser.phone}</p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-[10px] font-black">
              Verified Customer
            </span>
          </div>
        </div>

        {/* Profile Edit Fields */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs space-y-3">
          <h3 className="font-bold text-xs text-gray-900">Personal Information</h3>
          <div>
            <label className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Registered Phone</label>
            <input
              type="text"
              value={currentUser.phone}
              disabled
              className="w-full p-2.5 rounded-xl border border-gray-100 bg-gray-50 text-xs font-semibold text-gray-500"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full py-2.5 rounded-xl bg-black text-white font-bold text-xs hover:bg-neutral-800 transition"
          >
            {saved ? '✓ Saved Successfully' : 'Update Profile'}
          </button>
        </div>

        {/* Saved Addresses */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs space-y-2.5">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-xs text-gray-900">Saved Addresses</h3>
            <button
              onClick={() => alert('Add Address Modal: Enter Flat, Society, Area and Pincode.')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              + Add New
            </button>
          </div>

          {currentUser.savedAddresses?.map(addr => (
            <div key={addr.id} className="p-2.5 rounded-xl bg-gray-50 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <div>
                  <span className="font-bold text-gray-900 block">{addr.type}</span>
                  <p className="text-[11px] text-gray-500 truncate max-w-[200px]">{addr.address}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            if (confirm('Are you sure you want to log out?')) {
              alert('Logged out. Session cleared.');
            }
          }}
          className="w-full py-3 rounded-2xl bg-red-50 text-red-600 font-bold text-xs border border-red-200 flex items-center justify-center gap-1.5 hover:bg-red-100 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};
export default ProfileScreen;
