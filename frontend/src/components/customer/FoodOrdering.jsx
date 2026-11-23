import React, { useState } from 'react';
import {
  ArrowLeft, Search, ChevronDown, Star, Clock, Tag,
  ChevronRight, Heart, Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FoodOrdering = ({ onNavigate, onBack, onSelectRestaurant }) => {
  const { selectedLocation, setSelectedLocation, cartCount, cartSubtotal, addToCart } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [vegOnly, setVegOnly] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('ALL');

  const categories = [
    { id: 'All', name: 'All', icon: '🍽️' },
    { id: 'Biryani', name: 'Biryani', icon: '🍲' },
    { id: 'Pizza', name: 'Pizza', icon: '🍕' },
    { id: 'Burgers', name: 'Burgers', icon: '🍔' },
    { id: 'Meals', name: 'Meals', icon: '🍛' }
  ];

  const whatsOnYourMind = [
    { name: 'Fried rice', icon: '🍚' },
    { name: 'Cakes', icon: '🍰' },
    { name: 'Dosa', icon: '🥞' },
    { name: 'Noodles', icon: '🍜' },
    { name: 'Idli', icon: '🥟' },
    { name: 'Biryani', icon: '🍲' },
    { name: 'Burgers', icon: '🍔' },
    { name: 'Pizza', icon: '🍕' }
  ];

  const store99Items = [
    { id: 'item_shw', name: 'Veg Shawarma', price: 99, isVeg: true },
    { id: 'item_corn_pizza', name: 'Sweet Corns Pizza', price: 99, isVeg: true },
    { id: 'item_ghee_dosa', name: 'Ghee Dosa', price: 79, isVeg: true },
    { id: 'item_popcorn', name: 'Crispy Popcorn', price: 99, isVeg: false }
  ];

  const restaurants = [
    {
      id: 'rest_paradise',
      name: 'Paradise Biryani',
      rating: 4.4,
      reviewsCount: '12.5k+',
      cuisines: ['Biryani', 'Indian', 'Hyderabadi'],
      deliveryTime: '30–40 min',
      deliveryFee: '₹40 Delivery Fee',
      minOrder: '₹200 Min Order',
      tag: 'Up to 50% OFF',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80',
      logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100'
    },
    {
      id: 'rest_dominos',
      name: "Domino's Pizza",
      rating: 4.3,
      reviewsCount: '18.2k+',
      cuisines: ['Pizza', 'Italian'],
      deliveryTime: '25–35 min',
      deliveryFee: '₹35 Delivery Fee',
      minOrder: '₹150 Min Order',
      tag: 'Flat ₹100 OFF',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80',
      logo: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=100'
    },
    {
      id: 'rest_subway',
      name: 'Subway',
      rating: 4.2,
      reviewsCount: '9.4k+',
      cuisines: ['Sandwich', 'Salads'],
      deliveryTime: '20–30 min',
      deliveryFee: '₹30 Delivery Fee',
      minOrder: '₹150 Min Order',
      tag: 'Buy 1 Get 1 Free',
      image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&auto=format&fit=crop&q=80',
      logo: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=100'
    },
    {
      id: 'rest_bawarchi',
      name: 'Bawarchi Restaurant',
      rating: 4.5,
      reviewsCount: '22k+',
      cuisines: ['Biryani', 'Mughlai'],
      deliveryTime: '35–45 min',
      deliveryFee: '₹45 Delivery Fee',
      minOrder: '₹250 Min Order',
      tag: 'Hyderabadi Special',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=80',
      logo: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=100'
    }
  ];

  const filteredRestaurants = restaurants.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.cuisines.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || r.cuisines.some(c => c.toLowerCase() === activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-full bg-white pb-28 select-none">
      {/* Header matching image.png */}
      <div className="px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-800 transition active:scale-95"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">Food</h1>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-600 cursor-pointer">
                <span>Deliver to</span>
                <span className="font-bold text-gray-900">{selectedLocation}</span>
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Search bar with VEG toggle switch matching image copy 13.png */}
        <div className="mt-3 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for restaurants, dishes..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-gray-100 text-xs font-bold text-gray-900 focus:outline-none focus:ring-1 focus:ring-black placeholder-gray-400"
            />
          </div>

          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`px-3 py-2 rounded-2xl text-[10px] font-black flex items-center gap-1 border transition ${
              vegOnly
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                : 'bg-gray-100 text-gray-800 border-gray-200'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${vegOnly ? 'bg-white' : 'bg-green-600'}`}></span>
            <span>VEG</span>
          </button>
        </div>
      </div>

      {/* Sub Filter Tabs (image copy 13.png) */}
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
        {['ALL', '99 STORE', 'OFFERS', '⚡ BOLT', 'TOP RATED'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-3 py-1 rounded-full whitespace-nowrap text-[10px] font-black transition ${
              activeSubTab === tab
                ? 'bg-black text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* "What's on your mind?" circular dishes (image copy 14.png) */}
      <div className="px-4 pt-3 pb-2 bg-white">
        <h3 className="font-black text-xs text-gray-900 mb-2">What's on your mind?</h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {whatsOnYourMind.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSearchQuery(item.name)}
              className="flex flex-col items-center min-w-[54px] cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-2xl group-hover:scale-105 group-hover:border-yellow-400 transition shadow-xs">
                {item.icon}
              </div>
              <span className="text-[10px] font-bold text-gray-700 mt-1 truncate">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* "99 store" Section with 1-tap ADD buttons (image copy 14.png) */}
      <div className="px-4 pt-2 pb-1">
        <div className="bg-[#FFFBF0] p-3 rounded-2xl border border-yellow-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-lg bg-black text-[#FFD600] font-black text-xs">99 store</span>
              <span className="text-xs font-bold text-gray-900">Meals at ₹99 + Free Delivery</span>
            </div>
            <span className="text-[10px] font-bold text-blue-600">View All →</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {store99Items.map(item => (
              <div key={item.id} className="bg-white p-2.5 rounded-xl border border-gray-200 flex items-center justify-between">
                <div>
                  <span className="w-2 h-2 rounded-full bg-emerald-600 block mb-0.5"></span>
                  <h4 className="font-extrabold text-[11px] text-gray-900 leading-tight">{item.name}</h4>
                  <span className="font-black text-xs text-gray-900">₹{item.price}</span>
                </div>
                <button
                  onClick={() => addToCart({ id: item.id, name: item.name, price: item.price }, 'rest_paradise')}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-300 font-black text-xs hover:bg-emerald-600 hover:text-white transition active:scale-95"
                >
                  + ADD
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Pills matching screenshot (All, Biryani, Pizza, Burgers, Meals) */}
      <div className="px-4 pt-3 pb-2 flex gap-3 overflow-x-auto no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex flex-col items-center justify-center min-w-[56px] py-2 px-1 rounded-2xl border transition-all ${
              activeCategory === cat.id
                ? 'border-yellow-400 bg-yellow-50 text-black font-extrabold shadow-xs'
                : 'border-gray-100 bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="text-xl mb-1">{cat.icon}</span>
            <span className="text-[11px] font-bold">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Promotional Carousel Banner matching screenshot */}
      <div className="px-4 pt-2">
        <div
          onClick={() => onSelectRestaurant('rest_paradise')}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#D94E28] to-[#E86A38] text-white p-4 cursor-pointer shadow-sm hover:shadow-md transition active:scale-98"
        >
          <div className="max-w-[62%] relative z-10">
            <h3 className="text-sm font-extrabold leading-snug">
              Delicious Food<br />at Your Doorstep
            </h3>
            <span className="mt-2 inline-block bg-white text-[#D94E28] text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
              Up to 50% OFF
            </span>
          </div>

          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-28 h-28 rounded-full overflow-hidden border-2 border-white/20 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80"
              alt="Delicious Dum Biryani"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Dots Indicator */}
          <div className="flex gap-1 justify-center mt-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
          </div>
        </div>
      </div>

      {/* Popular Restaurants List matching screenshot */}
      <div className="px-4 pt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-900">Popular Restaurants</h2>
          <button className="text-xs font-bold text-blue-600 hover:text-blue-700">View All</button>
        </div>

        <div className="space-y-3">
          {filteredRestaurants.map(restaurant => (
            <div
              key={restaurant.id}
              onClick={() => onSelectRestaurant(restaurant.id)}
              className="flex items-center justify-between p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-yellow-200 transition cursor-pointer active:scale-98"
            >
              <div className="flex items-center gap-3">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-14 h-14 rounded-xl object-cover shadow-xs"
                />
                <div>
                  <h3 className="font-extrabold text-xs text-gray-900 leading-snug">{restaurant.name}</h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-0.5">
                    <span className="flex items-center gap-0.5 font-bold text-gray-800">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {restaurant.rating}
                    </span>
                    <span>·</span>
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium truncate max-w-[170px] mt-0.5">
                    {restaurant.cuisines.join(', ')}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Grand & Bright Floating Cart Bar (Above Bottom Navigation Bar) */}
      {cartCount > 0 && (
        <div className="fixed bottom-[78px] inset-x-0 max-w-md mx-auto px-4 z-40 pointer-events-auto">
          <div
            onClick={() => onSelectRestaurant('rest_paradise')}
            className="bg-[#080808] border-2 border-[#FFD600] text-white p-3.5 rounded-2xl shadow-[0_12px_35px_rgba(0,0,0,0.35)] flex items-center justify-between cursor-pointer hover:bg-neutral-900 transition active:scale-98"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFD600] text-black flex items-center justify-center font-black text-sm shadow-md">
                {cartCount}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-white tracking-wide">₹{cartSubtotal}</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    {cartCount} {cartCount === 1 ? 'Item' : 'Items'} Added
                  </span>
                </div>
                <p className="text-[11px] text-gray-300 font-medium mt-0.5">Paradise Biryani · Tap to checkout</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFD600] text-black font-black text-xs shadow-sm hover:bg-yellow-400 transition">
              <span>View Cart</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default FoodOrdering;
