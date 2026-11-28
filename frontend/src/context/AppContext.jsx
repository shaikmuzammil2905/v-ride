import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DEFAULT_HYDERABAD_DATA, authApiRequest } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // App view toggle: 'customer' | 'partner' | 'admin' | 'website'
  const [currentPortal, setCurrentPortal] = useState('customer');
  // Mobile frame simulator mode for Customer App: true (phone mockup) | false (full responsive)
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  // Unified Auth Session State
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('vride_auth_token') || null);
  const [authUser, setAuthUser] = useState(() => {
    try {
      const saved = localStorage.getItem('vride_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [authLoading, setAuthLoading] = useState(() => Boolean(localStorage.getItem('vride_auth_token')));

  const clearLegacyRoleKeys = () => {
    ['customer', 'admin', 'rider', 'vendor', 'partner', 'support'].forEach((r) => {
      localStorage.removeItem(`vride_auth_${r}`);
    });
    localStorage.removeItem('vride_partner_session');
  };

  const loginWithSession = useCallback((token, user) => {
    clearLegacyRoleKeys();
    localStorage.setItem('vride_auth_token', token);
    localStorage.setItem('vride_auth_user', JSON.stringify(user));
    localStorage.setItem(`vride_auth_${user.role}`, 'true');
    if (user.role === 'rider' || user.role === 'vendor') {
      localStorage.setItem('vride_partner_session', JSON.stringify({ role: user.role, token, user }));
    }
    setAuthToken(token);
    setAuthUser(user);

    if (user.role === 'customer') {
      setCurrentUser((prev) => ({
        ...prev,
        ...user,
        savedAddresses: user.savedAddresses?.length ? user.savedAddresses : prev.savedAddresses
      }));
    } else if (user.role === 'rider') {
      setCurrentPartner((prev) => ({ ...prev, ...user }));
    }
  }, []);

  const logoutSession = useCallback(async () => {
    try {
      await authApiRequest('/auth/logout', { method: 'POST' });
    } catch {
      // ignore network errors on logout
    }
    clearLegacyRoleKeys();
    localStorage.removeItem('vride_auth_token');
    localStorage.removeItem('vride_auth_user');
    setAuthToken(null);
    setAuthUser(null);
  }, []);

  useEffect(() => {
    let active = true;
    const verifyExistingSession = async () => {
      const token = localStorage.getItem('vride_auth_token');
      if (!token) {
        if (active) setAuthLoading(false);
        return;
      }
      const res = await authApiRequest('/auth/me', { method: 'GET' });
      if (!active) return;
      if (res?.success && res.user) {
        setAuthUser(res.user);
        localStorage.setItem('vride_auth_user', JSON.stringify(res.user));
        if (res.user.role === 'customer') {
          setCurrentUser((prev) => ({ ...prev, ...res.user }));
        }
      } else if (res?.status === 401) {
        clearLegacyRoleKeys();
        localStorage.removeItem('vride_auth_token');
        localStorage.removeItem('vride_auth_user');
        setAuthToken(null);
        setAuthUser(null);
      }
      setAuthLoading(false);
    };
    verifyExistingSession();
    return () => { active = false; };
  }, []);

  // User state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('vride_user');
    return saved ? JSON.parse(saved) : DEFAULT_HYDERABAD_DATA.user;
  });

  // Partner state
  const [currentPartner, setCurrentPartner] = useState(() => {
    const saved = localStorage.getItem('vride_partner');
    return saved ? JSON.parse(saved) : DEFAULT_HYDERABAD_DATA.partner;
  });

  // Customer selected location
  const [selectedLocation, setSelectedLocation] = useState('Miyapur, Hyderabad');

  // Customer Active Booking / Order states
  const [activeRide, setActiveRide] = useState(null);
  const [activeParcel, setActiveParcel] = useState(null);
  const [activePickDrop, setActivePickDrop] = useState(null);
  const [activeFoodOrder, setActiveFoodOrder] = useState(() => {
    const saved = localStorage.getItem('vride_active_food_order');
    return saved ? JSON.parse(saved) : DEFAULT_HYDERABAD_DATA.activeFoodOrder;
  });

  // Food Cart
  const [cartItems, setCartItems] = useState([
    { id: 'menu_cb_paradise', name: 'Chicken Biryani', price: 299, quantity: 1, restaurantId: 'rest_paradise', isVeg: false },
    { id: 'menu_mb_paradise', name: 'Mutton Biryani', price: 299, quantity: 1, restaurantId: 'rest_paradise', isVeg: false }
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Rider Assigned', desc: 'Ramesh K has accepted your ride request.', time: '2m ago', read: false },
    { id: 2, title: 'Food Order Arriving', desc: 'Your Paradise Biryani order is 8 mins away.', time: '5m ago', read: false },
    { id: 3, title: 'Special Promo', desc: 'Use VRIDE20 for 20% off on your next food order!', time: '1h ago', read: true }
  ]);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('vride_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('vride_partner', JSON.stringify(currentPartner));
  }, [currentPartner]);

  useEffect(() => {
    if (activeFoodOrder) {
      localStorage.setItem('vride_active_food_order', JSON.stringify(activeFoodOrder));
    }
  }, [activeFoodOrder]);

  // Cart calculations
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (item, restaurantId = 'rest_paradise') => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1, restaurantId }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== itemId);
    });
  };

  const clearCart = () => setCartItems([]);

  // Wallet operations
  const addMoneyToWallet = (amount) => {
    const updated = {
      ...currentUser,
      walletBalance: (currentUser.walletBalance || 0) + Number(amount)
    };
    setCurrentUser(updated);
  };

  const deductFromWallet = (amount) => {
    if ((currentUser.walletBalance || 0) >= amount) {
      setCurrentUser(prev => ({ ...prev, walletBalance: prev.walletBalance - amount }));
      return true;
    }
    return false;
  };

  return (
    <AppContext.Provider
      value={{
        currentPortal,
        setCurrentPortal,
        isPhoneFrame,
        setIsPhoneFrame,
        authToken,
        authUser,
        authLoading,
        loginWithSession,
        logoutSession,
        currentUser,
        setCurrentUser,
        currentPartner,
        setCurrentPartner,
        selectedLocation,
        setSelectedLocation,
        activeRide,
        setActiveRide,
        activeParcel,
        setActiveParcel,
        activePickDrop,
        setActivePickDrop,
        activeFoodOrder,
        setActiveFoodOrder,
        cartItems,
        setCartItems,
        cartSubtotal,
        cartCount,
        addToCart,
        removeFromCart,
        clearCart,
        notifications,
        setNotifications,
        addMoneyToWallet,
        deductFromWallet
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
