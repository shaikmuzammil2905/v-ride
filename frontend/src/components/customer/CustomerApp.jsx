import React, { useState } from 'react';
import {
  Home, ShoppingBag, Wallet, HelpCircle, User
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

  // Pure standalone mobile-first application container
  return (
    <div className="w-full min-h-screen min-h-[100dvh] bg-[#f8f9fa] flex flex-col items-center justify-start relative overflow-x-hidden">
      {/* Centered mobile screen container */}
      <div className="w-full max-w-md min-h-screen min-h-[100dvh] bg-white flex flex-col relative shadow-md">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          {renderScreen()}
        </div>

        {/* Bottom Navigation Bar */}
        {showBottomNav && (
          <div className="bg-white/95 backdrop-blur-md border-t border-gray-100 px-3 py-2 flex items-center justify-around sticky bottom-0 z-40 shadow-soft pb-[max(0.5rem,env(safe-area-inset-bottom))]">
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
