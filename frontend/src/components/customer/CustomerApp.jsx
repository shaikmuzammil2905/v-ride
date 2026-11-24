import React, { useState } from 'react';
import {
  Home, Bike, UtensilsCrossed, Package, User
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

import SplashScreen from '../common/SplashScreen';
import CustomerHome from './CustomerHome';
import RideBooking from './RideBooking';
import ParcelBooking from './ParcelBooking';
import FoodOrdering from './FoodOrdering';
import RestaurantDetail from './RestaurantDetail';
import TrackOrder from './TrackOrder';
import OrdersHistory from './OrdersHistory';
import SupportScreen from './SupportScreen';
import ProfileScreen from './ProfileScreen';
import TravelScreen from './TravelScreen';

export const CustomerApp = () => {
  // Splash Screen State
  const [showSplash, setShowSplash] = useState(true);

  // Current screen state: 'home' | 'ride' | 'parcel' | 'food' | 'restaurant' | 'track' | 'orders' | 'support' | 'profile'
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState('rest_paradise');

  // Bottom Navigation tabs strictly per instructions:
  // 1. Home
  // 2. Rides (Rapido inspired)
  // 3. Food (Swiggy inspired)
  // 4. Parcel (Rapido Parcel inspired)
  // 5. Profile
  // (Wallet and Pick & Drop permanently removed)
  const bottomTabs = [
    { id: 'home', label: 'Home', icon: Home, targetScreen: 'home' },
    { id: 'rides', label: 'Rides', icon: Bike, targetScreen: 'ride' },
    { id: 'food', label: 'Food', icon: UtensilsCrossed, targetScreen: 'food' },
    { id: 'parcel', label: 'Parcel', icon: Package, targetScreen: 'parcel' },
    { id: 'profile', label: 'Profile', icon: User, targetScreen: 'profile' }
  ];

  const isTabActive = (tabId) => {
    switch (tabId) {
      case 'home':
        return currentScreen === 'home';
      case 'rides':
        return currentScreen === 'ride' || currentScreen === 'rides';
      case 'food':
        return currentScreen === 'food' || currentScreen === 'restaurant';
      case 'parcel':
        return currentScreen === 'parcel';
      case 'profile':
        return currentScreen === 'profile' || currentScreen === 'orders' || currentScreen === 'support';
      default:
        return false;
    }
  };

  const handleTabClick = (tab) => {
    setCurrentScreen(tab.targetScreen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <CustomerHome onNavigate={setCurrentScreen} />;
      case 'ride':
      case 'rides':
        return <RideBooking onNavigate={setCurrentScreen} onBack={() => setCurrentScreen('home')} />;
      case 'parcel':
        return <ParcelBooking onNavigate={setCurrentScreen} onBack={() => setCurrentScreen('home')} />;
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
      case 'support':
        return <SupportScreen onBack={() => setCurrentScreen('home')} />;
      case 'travel':
        return <TravelScreen onBack={() => setCurrentScreen('ride')} onNavigate={setCurrentScreen} />;
      case 'profile':
        return <ProfileScreen onNavigate={setCurrentScreen} />;
      default:
        return <CustomerHome onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <>
      {/* Animated Splash Screen on App Launch */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* Standalone Native Mobile Container */}
      <div className="w-full min-h-screen min-h-[100dvh] bg-[#f8f9fa] flex flex-col items-center justify-start relative overflow-x-hidden">
        <div className="w-full max-w-md min-h-screen min-h-[100dvh] bg-white flex flex-col relative shadow-md">
          {/* Scrollable Screen Content with bottom clearance for fixed navigation */}
          <main className="flex-1 overflow-y-auto no-scrollbar relative pb-20">
            {renderScreen()}
          </main>

          {/* PERMANENTLY FIXED BOTTOM NAVIGATION BAR - VISIBLE ACROSS ALL SECTIONS */}
          <nav
            aria-label="Bottom Navigation"
            className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-gray-100 px-3 py-1.5 flex items-center justify-around z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-[max(0.6rem,env(safe-area-inset-bottom))]"
          >
            {bottomTabs.map(tab => {
              const Icon = tab.icon;
              const active = isTabActive(tab.id);
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all active:scale-95 ${
                    active ? 'text-black font-extrabold' : 'text-gray-400 hover:text-gray-700 font-medium'
                  }`}
                  aria-label={tab.label}
                >
                  <div className={`p-1.5 rounded-xl transition ${active ? 'bg-[#FFD600] text-black shadow-xs' : ''}`}>
                    <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5] text-black' : 'stroke-[1.8]'}`} />
                  </div>
                  <span className={`text-[10px] mt-0.5 tracking-tight ${active ? 'font-extrabold text-black' : 'font-semibold'}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default CustomerApp;
