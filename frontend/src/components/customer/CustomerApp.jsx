import React, { useState } from 'react';
import {
  Home, ShoppingBag, Wallet, HelpCircle, User,
  Signal, Wifi, Battery
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

import CustomerHome from './CustomerHome';
import RideBooking from './RideBooking';
import ParcelBooking from './ParcelBooking';
import PickDropBooking from './PickDropBooking';
import FoodOrdering from './FoodOrdering';
import RestaurantDetail from './RestaurantDetail';
import TrackOrder from './TrackOrder';
import OrdersHistory from './OrdersHistory';
import WalletScreen from './WalletScreen';
import SupportScreen from './SupportScreen';
import ProfileScreen from './ProfileScreen';

export const CustomerApp = () => {
  const { isPhoneFrame } = useApp();
  // Current screen state: 'home' | 'ride' | 'parcel' | 'pickdrop' | 'food' | 'restaurant' | 'track' | 'orders' | 'wallet' | 'support' | 'profile'
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState('rest_paradise');

  // Bottom Navigation tabs: Home, Orders, Wallet, Support, Profile (exact match to screenshot)
  const bottomTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'support', label: 'Support', icon: HelpCircle },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <CustomerHome onNavigate={setCurrentScreen} />;
      case 'ride':
        return <RideBooking onNavigate={setCurrentScreen} onBack={() => setCurrentScreen('home')} />;
      case 'parcel':
        return <ParcelBooking onNavigate={setCurrentScreen} onBack={() => setCurrentScreen('home')} />;
      case 'pickdrop':
        return <PickDropBooking onNavigate={setCurrentScreen} onBack={() => setCurrentScreen('home')} />;
      case 'food':
        return (
          <FoodOrdering
            onNavigate={setCurrentScreen}
            onBack={() => setCurrentScreen('home')}
            onSelectRestaurant={(id) => {
              setSelectedRestaurantId(id);
              setCurrentScreen('restaurant');
            }}
          />
        );
      case 'restaurant':
        return (
          <RestaurantDetail
            onBack={() => setCurrentScreen('food')}
            onNavigateToTrack={() => setCurrentScreen('track')}
          />
        );
      case 'track':
        return (
          <TrackOrder
            onBack={() => setCurrentScreen('home')}
            onNavigateHome={() => setCurrentScreen('home')}
          />
        );
      case 'orders':
        return (
          <OrdersHistory
            onTrackFood={() => setCurrentScreen('track')}
            onNavigate={setCurrentScreen}
          />
        );
      case 'wallet':
        return <WalletScreen />;
      case 'support':
        return <SupportScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <CustomerHome onNavigate={setCurrentScreen} />;
    }
  };

  const showBottomNav = ['home', 'orders', 'wallet', 'support', 'profile'].includes(currentScreen);

  // Phone Frame Simulator Container
  return (
    <div className={`w-full flex justify-center items-start ${isPhoneFrame ? 'py-4 px-2' : 'p-0'}`}>
      <div
        className={`w-full bg-white relative transition-all ${
          isPhoneFrame
            ? 'max-w-[400px] h-[850px] rounded-[48px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border-[10px] border-black overflow-hidden flex flex-col'
            : 'max-w-2xl min-h-screen border-x border-gray-200 shadow-sm flex flex-col'
        }`}
      >
        {/* Mobile Device Status Bar matching reference screenshot (9:41, Signal, Wifi, Battery) */}
        {isPhoneFrame && (
          <div className="bg-white px-7 pt-3 pb-1 flex items-center justify-between text-black text-xs font-bold select-none z-30">
            <span>9:41</span>
            {/* Dynamic Island / Speaker Notch */}
            <div className="w-24 h-4 bg-black rounded-full"></div>
            <div className="flex items-center gap-1.5">
              <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
              <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
              <Battery className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
        )}

        {/* Screen Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          {renderScreen()}
        </div>

        {/* Bottom Navigation Bar matching reference screenshot: Home, Orders, Wallet, Support, Profile */}
        {showBottomNav && (
          <div className="bg-white border-t border-gray-100 px-3 py-2 flex items-center justify-around sticky bottom-0 z-40 shadow-soft">
            {bottomTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = currentScreen === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentScreen(tab.id)}
                  className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                    isActive ? 'text-black font-extrabold' : 'text-gray-400 hover:text-gray-600 font-medium'
                  }`}
                >
                  <div className={`p-1 rounded-xl transition ${isActive ? 'bg-yellow-100 text-black' : ''}`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5] text-black' : 'stroke-[1.8]'}`} />
                  </div>
                  <span className="text-[10px] mt-0.5">{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default CustomerApp;
