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
  // 2. Rides
  // 3. Food
  // 4. Parcel
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
          {/* Scrollable Screen Content with exact clearance for fixed bottom navigation */}
          <main className="flex-1 overflow-y-auto no-scrollbar relative pb-[68px]">
            {renderScreen()}
          </main>

          {/* PERMANENTLY FIXED BOTTOM NAVIGATION BAR - EXACT MATCH TO image copy 29, 30, 31, 32 */}
          <nav
            aria-label="Bottom Navigation"
            className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0a0d14]/95 backdrop-blur-xl border-t border-white/10 px-3 py-1.5 flex items-center justify-around z-40 shadow-[0_-8px_24px_rgba(0,0,0,0.4)] pb-[max(0.6rem,env(safe-area-inset-bottom))]"
          >
            {bottomTabs.map(tab => {
              const Icon = tab.icon;
              const active = isTabActive(tab.id);
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className={`flex flex-col items-center justify-center transition-all active:scale-95 ${
                    active
                      ? 'bg-[#FFD600] text-black px-4 py-1.5 rounded-2xl shadow-[0_2px_14px_rgba(255,214,0,0.4)]'
                      : 'text-white/60 hover:text-white py-1 px-2.5'
                  }`}
                  aria-label={tab.label}
                >
                  <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5] text-black' : 'stroke-[1.8] text-white/80'}`} />
                  <span className={`text-[10px] mt-0.5 tracking-tight ${active ? 'font-black text-black' : 'font-semibold text-white/70'}`}>
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
