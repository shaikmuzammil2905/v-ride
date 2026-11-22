import React, { useState } from 'react';
import {
  ArrowLeft, Search, ChevronDown, Star, Clock, Tag,
  ChevronRight, Heart, Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FoodOrdering = ({ onNavigate, onBack, onSelectRestaurant }) => {
  const { selectedLocation, setSelectedLocation, cartCount, cartSubtotal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { id: 'All', name: 'All', icon: '🍽️' },
    { id: 'Biryani', name: 'Biryani', icon: '🍲' },
    { id: 'Pizza', name: 'Pizza', icon: '🍕' },
    { id: 'Burgers', name: 'Burgers', icon: '🍔' },
    { id: 'Meals', name: 'Meals', icon: '🍛' }
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
    <div className="flex flex-col min-h-full bg-white pb-20 select-none">
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

        {/* Search bar matching screenshot */}
        <div className="mt-3 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for restaurants, dishes..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-gray-100 text-xs font-medium text-gray-900 focus:outline-none focus:ring-1 focus:ring-black placeholder-gray-400"
          />
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

      {/* Floating Cart bar if items exist */}
      {cartCount > 0 && (
        <div className="fixed bottom-16 inset-x-0 px-4 z-30">
          <div
            onClick={() => onSelectRestaurant('rest_paradise')}
            className="bg-vride-yellow text-black font-extrabold px-4 py-3 rounded-2xl shadow-yellow-glow flex items-center justify-between cursor-pointer active:scale-98"
          >
            <div className="flex items-center gap-2 text-xs">
              <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-black">
                {cartCount}
              </span>
              <span>{cartCount} Items | ₹{cartSubtotal}</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-black">
              <span>View Cart</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default FoodOrdering;
