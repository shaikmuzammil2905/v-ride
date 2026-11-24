import React, { useState } from 'react';
import {
  ArrowLeft, Search, ChevronDown, Star, Clock, Tag,
  ChevronRight, Heart, Filter, Mic, Zap, ShoppingBag,
  Plus, Check, RotateCcw, Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FoodOrdering = ({ onNavigate, onBack, onSelectRestaurant }) => {
  const { selectedLocation, cartCount, cartSubtotal, addToCart } = useApp();

  // Food sub-tabs: 'food' | 'bolt' | '99store' | 'eatright' | 'reorder'
  const [currentFoodTab, setCurrentFoodTab] = useState('food');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [activeSubFilter, setActiveSubFilter] = useState(':: ALL');

  // What's on your mind categories
  const whatsOnYourMind = [
    { name: 'Biryani', icon: '🍛' },
    { name: 'Dosa', icon: '🥞' },
    { name: 'Idli', icon: '🥟' },
    { name: 'Poori', icon: '🫓' },
    { name: 'Cakes', icon: '🍰' },
    { name: 'Khichdi', icon: '🍲' },
    { name: 'Burgers', icon: '🍔' },
    { name: 'Pizza', icon: '🍕' }
  ];

  // 99 Store Items matching image copy 30.png
  const store99Items = [
    { id: 'item_idli_99', name: 'Idli (3 pcs)', price: 35, originalPrice: 50, badge: 'ITEMS AT ₹29', rating: 4.2, reviews: 80, time: '20–25 mins', restaurant: 'Sri Parameswari Tasty Foods', isVeg: true },
    { id: 'item_dosa_plain', name: 'Plain Dosa', price: 39, originalPrice: 59, badge: 'ITEMS AT ₹10', rating: 3.3, reviews: 5, time: '25–30 mins', restaurant: 'Jai Sri Tea and Tiffins', isVeg: true },
    { id: 'item_puli_dosa', name: 'Pulibongaram', price: 29, originalPrice: 50, badge: 'ITEMS AT ₹29', rating: 4.3, reviews: 33, time: '25–30 mins', restaurant: 'Sri Parameswari Tasty Foods', isVeg: true }
  ];

  // Regular Restaurants
  const restaurants = [
    {
      id: 'rest_paradise',
      name: 'Paradise Biryani',
      rating: 4.5,
      reviewsCount: '12.5k+',
      cuisines: ['Biryani', 'Indian', 'Hyderabadi'],
      deliveryTime: '30–40 min',
      deliveryFee: '₹40 Delivery Fee',
      minOrder: '₹200 Min Order',
      tag: '50% OFF',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'rest_cakezone',
      name: 'Cheesecakes By CakeZone',
      rating: 4.1,
      reviewsCount: '167',
      cuisines: ['Desserts', 'Bakery'],
      deliveryTime: '45–55 MINS',
      deliveryFee: '₹35 Delivery Fee',
      minOrder: '₹150 Min Order',
      tag: '50% off upto ₹100',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'rest_dominos',
      name: "Domino's Pizza",
      rating: 4.3,
      reviewsCount: '18.2k+',
      cuisines: ['Pizzas', 'Italian', 'Pastas'],
      deliveryTime: '20–30 min',
      deliveryFee: 'FREE Delivery',
      minOrder: '₹99 Min Order',
      tag: 'Flat ₹100 OFF',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="flex flex-col bg-[#f8f9fa] pb-2 select-none">
      {/* ============================================================ */}
      {/* 1. DARK HERO SECTION WITH BIRYANI ILLUSTRATION & YELLOW WAVE */}
      {/* EXACT MATCH TO image copy 30.png                             */}
      {/* ============================================================ */}
      <div className="relative bg-[#0b0e14] text-white pt-3 pb-5 px-4 overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FFD600]/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Header Row with Back and Location */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 rounded-full glass-btn-dark hover:bg-white/10 text-white transition active:scale-95"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#FFD600] font-black text-xs truncate max-w-[150px]">{selectedLocation}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <p className="text-[10px] text-gray-400 font-semibold truncate max-w-[200px]">
                Miyapur, Hyderabad · Live Kitchens
              </p>
            </div>
          </div>

          <span className="text-[10px] font-black uppercase text-black bg-[#FFD600] px-2.5 py-0.5 rounded-full">
            V RIDE FOOD
          </span>
        </div>

        {/* Hero Title & Biryani Illustration */}
        <div className="mt-4 flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-lg font-black text-white leading-tight">Food Delivery</h1>
            <p className="text-xs text-gray-300 font-medium mt-0.5">
              From Your Favorite Restaurants in Hyderabad
            </p>
          </div>
          <div className="text-3xl shrink-0">
            🍲
          </div>
        </div>

        {/* Search Bar with Mic & VEG Toggle Switch inside Dark Header */}
        <div className="mt-3 flex items-center gap-2 relative z-10">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for 'Biryani', 'Pizza', 'Dosa'..."
              className="w-full pl-9 pr-9 py-2 rounded-2xl glass-pill-dark text-xs font-bold text-white placeholder:text-gray-400 focus:outline-none"
            />
            <Mic className="w-4 h-4 text-[#FFD600] absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" />
          </div>

          {/* VEG Switch Toggle Button */}
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`px-3 py-2 rounded-2xl text-[10px] font-black flex items-center gap-1.5 transition active:scale-95 ${
              vegOnly ? 'bg-emerald-600 text-white shadow-sm' : 'glass-pill-dark text-gray-200'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${vegOnly ? 'bg-white' : 'bg-emerald-400'}`}></span>
            <span>VEG</span>
          </button>
        </div>

        {/* Bottom Curved Yellow Accent Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#FFD600]"></div>
      </div>

      {/* ============================================================ */}
      {/* 2. SUB FILTER TABS (image copy 30.png)                       */}
      {/* ============================================================ */}
      <div className="px-4 pt-3 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
        {[':: ALL', '99 STORE', '🏷️ OFFERS', '⚡ BOLT', '❤️ FOR YOU'].map((tab) => {
          const isActive = activeSubFilter === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveSubFilter(tab)}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap text-[11px] font-extrabold transition active:scale-95 ${
                isActive
                  ? 'glass-btn-yellow text-black'
                  : 'glass-btn text-gray-800 hover:bg-gray-200/60'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* 3. "WHAT'S ON YOUR MIND?" DISH CIRCLES                       */}
      {/* ============================================================ */}
      <div className="px-4 pt-3.5">
        <h3 className="font-black text-sm text-gray-900 mb-2">What's on your mind?</h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {whatsOnYourMind.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSearchQuery(item.name)}
              className="flex flex-col items-center min-w-[56px] cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center text-2xl group-hover:scale-105 group-hover:border-yellow-400 transition shadow-2xs">
                {item.icon}
              </div>
              <span className="text-[11px] font-bold text-gray-800 mt-1 truncate">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. "99 STORE" SECTION WITH REAL GLASSY ADD BUTTONS           */}
      {/* EXACT MATCH TO image copy 30.png                             */}
      {/* ============================================================ */}
      <div className="px-4 pt-3.5">
        <div className="bg-[#FFFBF0] p-3.5 rounded-3xl border border-yellow-200/90 space-y-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-lg bg-black text-[#FFD600] font-black text-xs">99 store</span>
              <span className="text-xs font-bold text-gray-900">Meals under ₹99</span>
            </div>
            <button className="text-xs font-extrabold text-blue-600 hover:underline">
              View All →
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {store99Items.map((item) => (
              <div key={item.id} className="bg-white p-2.5 rounded-2xl border border-gray-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="w-2 h-2 rounded-full bg-emerald-600 block mb-1"></span>
                  <h4 className="font-extrabold text-[11px] text-gray-900 leading-tight truncate">{item.name}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="font-black text-xs text-gray-900">₹{item.price}</span>
                    <span className="text-[9px] text-gray-400 line-through">₹{item.originalPrice}</span>
                  </div>
                </div>
                <button
                  onClick={() => addToCart({ id: item.id, name: item.name, price: item.price }, 'rest_99')}
                  className="glass-btn-yellow mt-2 w-full py-1 rounded-xl text-black font-black text-xs transition active:scale-95 flex items-center justify-center gap-0.5"
                >
                  <Plus className="w-3 h-3 stroke-[3]" />
                  <span>ADD</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 5. TOP RESTAURANTS TO EXPLORE (image copy 30.png)            */}
      {/* ============================================================ */}
      <div className="px-4 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-sm text-gray-900">Top Restaurants to Explore</h3>
          <span className="text-xs font-bold text-gray-500">137 Available</span>
        </div>

        {restaurants.map((rest) => (
          <div
            key={rest.id}
            onClick={() => onSelectRestaurant(rest.id)}
            className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden cursor-pointer hover:border-yellow-300 transition active:scale-99"
          >
            <div className="relative h-36 bg-gray-100">
              <img src={rest.image} alt={rest.name} className="w-full h-full object-cover" />
              <span className="absolute bottom-2.5 left-2.5 glass-btn-dark px-2.5 py-0.5 rounded-lg text-white font-black text-xs">
                {rest.tag}
              </span>
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div>
                <h4 className="font-black text-sm text-gray-900">{rest.name}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                  <span className="flex items-center gap-0.5 font-bold text-gray-900">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    {rest.rating}
                  </span>
                  <span>·</span>
                  <span>{rest.deliveryTime}</span>
                  <span>·</span>
                  <span>{rest.cuisines.join(', ')}</span>
                </div>
              </div>

              <button className="glass-btn-yellow px-3 py-1.5 rounded-xl text-black font-extrabold text-xs flex items-center gap-1 active:scale-95">
                <span>View Menu</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FLOATING CART PILL IF ITEMS ADDED */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 left-4 right-4 max-w-md mx-auto z-30 animate-slideUp">
          <div
            onClick={() => onNavigate('track')}
            className="glass-btn-dark p-3.5 rounded-2xl flex items-center justify-between cursor-pointer border border-[#FFD600]/40 shadow-xl"
          >
            <div className="flex items-center gap-2 text-white text-xs">
              <ShoppingBag className="w-4 h-4 text-[#FFD600]" />
              <span className="font-bold">{cartCount} items added</span>
              <span>·</span>
              <span className="font-black text-[#FFD600]">₹{cartSubtotal}</span>
            </div>
            <button className="glass-btn-yellow px-3.5 py-1 rounded-xl text-black font-black text-xs">
              View Cart →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodOrdering;
