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
  const [activeSubFilter, setActiveSubFilter] = useState('ALL');
  const [selected99PriceRange, setSelected99PriceRange] = useState('under_39');

  // What's on your mind categories
  const whatsOnYourMind = [
    { name: 'Dosa', icon: '🥞' },
    { name: 'Idli', icon: '🥟' },
    { name: 'Poori', icon: '🫓' },
    { name: 'Cakes', icon: '🍰' },
    { name: 'Khichdi', icon: '🍲' },
    { name: 'Biryani', icon: '🍛' },
    { name: 'Burgers', icon: '🍔' },
    { name: 'Pizza', icon: '🍕' }
  ];

  // 99 Store Items matching image copy 20.png & 23.png
  const store99Items = [
    { id: 'item_idli_99', name: 'Idli (3 pcs)', price: 35, originalPrice: 50, badge: 'ITEMS AT ₹29', rating: 4.2, reviews: 80, time: '20–25 mins', restaurant: 'Sri Parameswari Tasty Foods', category: 'under_39', isVeg: true },
    { id: 'item_dosa_plain', name: 'Plain Dosa', price: 39, originalPrice: 59, badge: 'ITEMS AT ₹10', rating: 3.3, reviews: 5, time: '25–30 mins', restaurant: 'Jai Sri Tea and Tiffins', category: 'under_39', isVeg: true },
    { id: 'item_puli_dosa', name: 'Pulibongaram Dosa', price: 29, originalPrice: 50, badge: 'ITEMS AT ₹29', rating: 4.3, reviews: 33, time: '25–30 mins', restaurant: 'Sri Parameswari Tasty Foods', category: 'under_39', isVeg: true },
    { id: 'item_ravva_dosa', name: 'Ravva Dosa', price: 69, originalPrice: 90, badge: 'BESTSELLER', rating: 3.4, reviews: 104, time: '20–25 mins', restaurant: 'Surya Tiffins', category: 'under_69', isVeg: true },
    { id: 'item_egg_maggi', name: 'Egg Maggi', price: 99, originalPrice: 120, badge: 'POPULAR', rating: 4.6, reviews: 19, time: '15–20 mins', restaurant: "Mamma's Kitchen", category: 'under_99', isVeg: false },
    { id: 'item_shw_99', name: 'Veg Shawarma Roll', price: 99, originalPrice: 130, badge: 'HOT', rating: 4.4, reviews: 62, time: '20 mins', restaurant: 'Arabian Nights', category: 'under_99', isVeg: true }
  ];

  // Bolt Fast Delivery Items matching image copy 22.png
  const boltRestaurants = [
    {
      id: 'rest_babu',
      name: 'Hotel Babu Biryani Point',
      rating: 4.1,
      reviews: '14K+',
      deliveryTime: '10–15 mins',
      offer: '70% off upto ₹130',
      items: [
        { id: 'bolt_combo_b', name: 'Combo - B (Biryani + Curry)', price: 189, badge: 'Bestseller', isVeg: false },
        { id: 'bolt_kichidi', name: 'Kichidi Rice Special', price: 129, badge: 'Bestseller', isVeg: true },
        { id: 'bolt_chicken_dum', name: 'Chicken Dum Biryani Single', price: 169, badge: 'Hot', isVeg: false }
      ]
    },
    {
      id: 'rest_parameswari',
      name: 'Sri Parameswari Tasty Foods',
      rating: 4.2,
      reviews: '270',
      deliveryTime: '10–15 mins',
      offer: 'Items at ₹29',
      items: [
        { id: 'bolt_idli', name: 'Ghee Sambar Idli (2 pcs)', price: 49, badge: '10 Min Ready', isVeg: true },
        { id: 'bolt_vada', name: 'Crispy Medu Vada', price: 55, badge: 'Fresh', isVeg: true }
      ]
    }
  ];

  // EatRight Healthy Food items matching image copy 24.png
  const eatRightCollections = [
    {
      id: 'high_protein',
      title: 'HIGH PROTEIN (30+ GRAMS)',
      desc: 'Grilled chicken salads, sprouts, boiled eggs, tofu & soya bowls',
      tag: 'Muscle Recovery'
    },
    {
      id: 'low_cal',
      title: 'LOW CAL (UNDER 400KCAL)',
      desc: 'Berry granola, oats bowls, clear soups & steamed wraps',
      tag: 'Weight Management'
    }
  ];

  const eatRightDishes = [
    { id: 'er_1', name: 'Grilled Herb Chicken Salad (35g Protein)', restaurant: 'Saladify Health Kitchen', calories: '340 kcal', protein: '35g', price: 249, isVeg: false },
    { id: 'er_2', name: 'Paneer Tikka Protein Bowl (24g Protein)', restaurant: 'Fit Bites Hyderabad', calories: '380 kcal', protein: '24g', price: 219, isVeg: true },
    { id: 'er_3', name: 'Nutty Berry Granola Bowl', restaurant: 'Oat & Berry Cafe', calories: '290 kcal', protein: '12g', price: 189, isVeg: true }
  ];

  // Reorder items matching image copy 25.png
  const previousOrders = [
    {
      id: 'reord_1',
      restaurantName: 'Dawat Biryani House',
      status: 'Uh-oh! The outlet is not accepting orders at the moment',
      available: false,
      item: 'Chicken Dum Biryani (Full)',
      price: 149,
      originalPrice: 258,
      isVeg: false,
      date: 'Ordered 2 days ago'
    },
    {
      id: 'reord_2',
      restaurantName: 'Paradise Biryani',
      status: 'Outlet open · Delivering in 30 mins',
      available: true,
      item: 'Royal Chicken Biryani + Thums Up',
      price: 299,
      originalPrice: 349,
      isVeg: false,
      date: 'Ordered yesterday'
    }
  ];

  // Regular Restaurants
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
      cuisines: ['Pizza', 'Italian'],
      deliveryTime: '25–35 min',
      deliveryFee: '₹35 Delivery Fee',
      minOrder: '₹150 Min Order',
      tag: 'Flat ₹100 OFF',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80'
    }
  ];

  const filtered99Items = store99Items.filter(item => {
    if (selected99PriceRange === 'under_39') return item.price <= 39;
    if (selected99PriceRange === 'under_69') return item.price <= 69;
    return true;
  });

  return (
    <div className="flex flex-col min-h-full bg-white pb-36 select-none relative">
      {/* 1. TOP HEADER WITH LOCATION & VEG TOGGLE (image copy 21.png) */}
      <div className="px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-2.5">
            {onBack && (
              <button onClick={onBack} className="p-1 rounded-full hover:bg-gray-100 text-gray-800 transition active:scale-95">
                <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-1 text-xs font-black text-gray-900">
                <span>Deliver to</span>
                <span className="text-[#D97706] font-extrabold truncate max-w-[150px]">{selectedLocation}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <p className="text-[10px] text-gray-400 font-semibold truncate max-w-[220px]">
                Miyapur, Hyderabad · Live Kitchens
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              V RIDE Food
            </span>
          </div>
        </div>

        {/* Search Bar with Mic & VEG Toggle Switch (image copy 21.png) */}
        <div className="flex items-center gap-2 pt-1">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for 'Sweets', 'Biryani', 'Pizza'..."
              className="w-full pl-9 pr-9 py-2.5 rounded-2xl bg-gray-100 text-xs font-bold text-gray-900 focus:outline-none focus:ring-1 focus:ring-black placeholder:text-gray-400"
            />
            <Mic className="w-4 h-4 text-orange-500 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" />
          </div>

          {/* VEG Switch Toggle Button */}
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`px-3 py-2 rounded-2xl text-[10px] font-black flex items-center gap-1 border transition ${
              vegOnly ? 'bg-emerald-600 text-white border-emerald-500 shadow-2xs' : 'bg-gray-100 text-gray-800 border-gray-200'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${vegOnly ? 'bg-white' : 'bg-green-600'}`}></span>
            <span>VEG</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SCREEN 1: FOOD HOME (image copy 20.png & 21.png) */}
      {/* ==================================================================== */}
      {currentFoodTab === 'food' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Sub Filter Tabs (image copy 21.png) */}
          <div className="px-4 pt-2 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
            {[':: ALL', '99 STORE', 'OFFERS', '⚡ BOLT', 'FOR YOU'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  if (tab === '99 STORE') setCurrentFoodTab('99store');
                  else if (tab === '⚡ BOLT') setCurrentFoodTab('bolt');
                  else setActiveSubFilter(tab);
                }}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap text-[11px] font-extrabold transition ${
                  activeSubFilter === tab ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* "What's on your mind?" circular dishes (image copy 21.png) */}
          <div className="px-4 pt-1">
            <h3 className="font-black text-sm text-gray-900 mb-2">What's on your mind?</h3>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {whatsOnYourMind.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSearchQuery(item.name)}
                  className="flex flex-col items-center min-w-[56px] cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-2xl group-hover:scale-105 group-hover:border-yellow-400 transition shadow-2xs">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold text-gray-700 mt-1 truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* "99 Store" In-Stream Card with Real ADD Buttons (image copy 20.png) */}
          <div className="px-4">
            <div className="bg-[#FFFBF0] p-3.5 rounded-3xl border border-yellow-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-lg bg-black text-[#FFD600] font-black text-xs">99 store</span>
                  <span className="text-xs font-bold text-gray-900">Meals at ₹99 + Free Delivery</span>
                </div>
                <button
                  onClick={() => setCurrentFoodTab('99store')}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  View All →
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {store99Items.slice(0, 3).map((item) => (
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
                      className="mt-2 w-full py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-300 font-black text-xs hover:bg-emerald-600 hover:text-white transition active:scale-95 flex items-center justify-center gap-0.5"
                    >
                      <Plus className="w-3 h-3 stroke-[3]" />
                      <span>ADD</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Restaurant Discovery List matching image copy 21.png */}
          <div className="px-4 space-y-3">
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
                  <div className="absolute top-3 left-3 bg-[#080808]/80 backdrop-blur-md text-[#FFD600] font-black text-[10px] px-2.5 py-1 rounded-full shadow-sm">
                    {rest.tag}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-black font-black text-xs px-2.5 py-1 rounded-full shadow-md">
                    {rest.deliveryTime}
                  </div>
                </div>

                <div className="p-3.5 flex items-center justify-between">
                  <div>
                    <h4 className="font-black text-sm text-gray-900">{rest.name}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-extrabold text-gray-900">{rest.rating}</span>
                      <span>·</span>
                      <span className="truncate">{rest.cuisines.join(', ')}</span>
                    </div>
                  </div>
                  <button className="px-3.5 py-1.5 rounded-xl bg-[#FFD600] text-black font-extrabold text-xs">
                    Menu →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SCREEN 2: BOLT / QUICK FOOD IN 15 MINS (image copy 22.png) */}
      {/* ==================================================================== */}
      {currentFoodTab === 'bolt' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Dark Crimson Maroon Hero Banner matching image copy 22.png */}
          <div className="p-5 bg-gradient-to-r from-[#380216] via-[#520320] to-[#2B0111] text-white rounded-b-3xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-2xl font-black tracking-tight text-[#FFD600]">
                  <span>Bolt</span>
                  <Zap className="w-6 h-6 fill-[#FFD600] stroke-[#FFD600]" />
                </div>
                <h2 className="text-xl font-black text-white mt-0.5">Food in 15 mins!</h2>
                <p className="text-xs text-rose-200 font-semibold mt-1">Fresh, Hot & Crisp</p>
              </div>
              <div className="text-5xl">🥪🥐</div>
            </div>
          </div>

          {/* Fast Delivery Quick Categories */}
          <div className="px-4">
            <h3 className="font-black text-xs text-gray-900 mb-2">What's on your mind?</h3>
            <div className="flex gap-3 overflow-x-auto no-scrollbar">
              {['Dosa', 'Idli', 'Poori', 'Cakes', 'Vada'].map((name, i) => (
                <div key={i} className="flex flex-col items-center min-w-[50px] cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-xl">
                    🥞
                  </div>
                  <span className="text-[10px] font-bold text-gray-700 mt-1">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bolt Restaurants & 1-tap Items */}
          <div className="px-4 space-y-4">
            {boltRestaurants.map((rest) => (
              <div key={rest.id} className="bg-white rounded-3xl p-4 border border-gray-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                  <div>
                    <span className="text-[9px] font-black text-white bg-rose-600 px-2 py-0.5 rounded-md inline-block">
                      Bolt ⚡ 10–15 Mins
                    </span>
                    <h4 className="font-black text-sm text-gray-900 mt-1">{rest.name}</h4>
                    <span className="text-xs text-green-700 font-extrabold">{rest.offer}</span>
                  </div>
                  <button
                    onClick={() => onSelectRestaurant('rest_paradise')}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    View Items →
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {rest.items.map((item) => (
                    <div key={item.id} className="bg-gray-50 p-2.5 rounded-2xl flex flex-col justify-between h-24">
                      <div>
                        <span className="text-[9px] font-black uppercase text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded-md">
                          {item.badge}
                        </span>
                        <h5 className="font-extrabold text-xs text-gray-900 truncate mt-1">{item.name}</h5>
                        <span className="font-black text-xs text-gray-900">₹{item.price}</span>
                      </div>
                      <button
                        onClick={() => addToCart({ id: item.id, name: item.name, price: item.price }, rest.id)}
                        className="self-end px-3 py-1 rounded-xl bg-black text-white font-black text-xs hover:bg-neutral-800 active:scale-95"
                      >
                        + ADD
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SCREEN 3: 99 STORE DEDICATED (image copy 23.png) */}
      {/* ==================================================================== */}
      {currentFoodTab === '99store' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Sky Blue Banner matching image copy 23.png */}
          <div className="p-5 bg-gradient-to-r from-[#0091EA] to-[#00B0FF] text-white rounded-b-3xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-2.5 py-1 rounded-lg bg-black text-[#FFD600] font-black text-sm inline-block">
                  99 store
                </span>
                <h2 className="text-xl font-black text-white mt-1">Meals at ₹99 + Free Delivery</h2>
                <p className="text-xs text-blue-100 font-medium">Affordable everyday cravings</p>
              </div>
              <div className="text-4xl">🍛🍔🥤</div>
            </div>
          </div>

          {/* Price Category Filter Pills (image copy 23.png) */}
          <div className="px-4 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-bold">
            {[
              { id: 'under_39', label: 'Items under 39' },
              { id: 'under_69', label: 'Items under 69' },
              { id: 'under_99', label: 'Items under 99' }
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => setSelected99PriceRange(pill.id)}
                className={`px-4 py-2 rounded-2xl whitespace-nowrap text-xs font-black transition ${
                  selected99PriceRange === pill.id
                    ? 'bg-black text-[#FFD600] shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Dishes Grid with ADD Buttons (image copy 23.png) */}
          <div className="px-4 grid grid-cols-2 gap-3">
            {filtered99Items.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl p-3 border border-gray-200 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-black text-white bg-blue-600 px-2 py-0.5 rounded-md inline-block">
                    {item.badge}
                  </span>
                  <h4 className="font-extrabold text-xs text-gray-900 mt-1">{item.name}</h4>
                  <p className="text-[10px] text-gray-400 truncate">{item.restaurant}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="font-black text-sm text-gray-900">₹{item.price}</span>
                    <span className="text-xs text-gray-400 line-through">₹{item.originalPrice}</span>
                  </div>
                </div>

                <button
                  onClick={() => addToCart({ id: item.id, name: item.name, price: item.price }, 'rest_99')}
                  className="mt-3 w-full py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-400 font-black text-xs hover:bg-emerald-600 hover:text-white transition active:scale-95 flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>ADD</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SCREEN 4: EATRIGHT / HEALTHY FOOD (image copy 24.png) */}
      {/* ==================================================================== */}
      {currentFoodTab === 'eatright' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Deep Purple Hero Banner matching image copy 24.png */}
          <div className="p-5 bg-gradient-to-r from-[#2A0845] via-[#3B0E63] to-[#4A154B] text-white rounded-b-3xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">EatRight</h2>
                <p className="text-xs text-purple-200 font-semibold mt-0.5">
                  Meals with high protein, low cal and no added sugar
                </p>
              </div>
              <div className="text-4xl">🥗🥑</div>
            </div>

            {/* Mascot Badges (image copy 24.png) */}
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                <span className="text-[10px] font-black text-emerald-300 block">LOW CAL</span>
                <span className="text-[9px] text-gray-300">&lt; 400 kcal</span>
              </div>
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                <span className="text-[10px] font-black text-pink-300 block">HIGH PROTEIN</span>
                <span className="text-[9px] text-gray-300">30g+ Power</span>
              </div>
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                <span className="text-[10px] font-black text-cyan-300 block">NO ADDED SUGAR</span>
                <span className="text-[9px] text-gray-300">Clean Food</span>
              </div>
            </div>
          </div>

          {/* For Every Diet & Lifestyle Cards */}
          <div className="px-4 space-y-2.5">
            <h3 className="font-black text-xs text-gray-900 uppercase tracking-wide">For Every Diet & Lifestyle</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {eatRightCollections.map((col) => (
                <div key={col.id} className="p-3.5 rounded-3xl bg-purple-50 border border-purple-200">
                  <span className="text-[9px] font-black text-purple-800 bg-purple-100 px-2 py-0.5 rounded-md">
                    {col.tag}
                  </span>
                  <h4 className="font-extrabold text-xs text-gray-900 mt-1">{col.title}</h4>
                  <p className="text-[10px] text-gray-500 mt-1 leading-tight">{col.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Healthy Dishes List */}
          <div className="px-4 space-y-2.5">
            <h3 className="font-black text-sm text-gray-900">Recommended Healthy Dishes</h3>
            {eatRightDishes.map((dish) => (
              <div key={dish.id} className="bg-white p-3.5 rounded-3xl border border-gray-200 flex items-center justify-between">
                <div>
                  <span className="w-2 h-2 rounded-full bg-green-600 block mb-1"></span>
                  <h4 className="font-extrabold text-xs text-gray-900">{dish.name}</h4>
                  <p className="text-[10px] text-gray-400">{dish.restaurant}</p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] font-bold text-gray-700">
                    <span className="text-emerald-600">{dish.calories}</span>
                    <span>·</span>
                    <span className="text-purple-700">{dish.protein}</span>
                    <span>·</span>
                    <span className="font-black text-black">₹{dish.price}</span>
                  </div>
                </div>
                <button
                  onClick={() => addToCart({ id: dish.id, name: dish.name, price: dish.price }, 'rest_health')}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-extrabold text-xs active:scale-95"
                >
                  + ADD
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SCREEN 5: REORDER (image copy 25.png) */}
      {/* ==================================================================== */}
      {currentFoodTab === 'reorder' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="px-4 pt-3 flex items-center justify-between">
            <h2 className="text-lg font-black text-gray-900 tracking-tight">REORDER</h2>
            <span className="text-xs font-bold text-gray-500">Your Past Orders</span>
          </div>

          {/* Search by Restaurant or Dish matching image copy 25.png */}
          <div className="px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by restaurant or dish"
                className="w-full pl-4 pr-10 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 focus:outline-none"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Filter Pills matching image copy 25.png */}
          <div className="px-4 flex items-center gap-2 text-xs font-extrabold">
            <button className="px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-700">
              Favourites
            </button>
            <button className="px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-700">
              Price 149 - 300
            </button>
            <button className="px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-700">
              Price &gt; 300
            </button>
          </div>

          {/* Previous Orders Cards matching image copy 25.png */}
          <div className="px-4 space-y-3">
            {previousOrders.map((ord) => (
              <div key={ord.id} className="bg-white rounded-3xl p-4 border border-gray-200 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <div>
                    <h4 className="font-extrabold text-sm text-gray-900">{ord.restaurantName}</h4>
                    <span className="text-[10px] text-gray-400">{ord.date}</span>
                  </div>
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                </div>

                {!ord.available && (
                  <div className="p-2 bg-amber-50 border border-amber-200 rounded-xl text-[11px] font-bold text-amber-800">
                    ⚠️ {ord.status}
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <h5 className="font-bold text-xs text-gray-900">{ord.item}</h5>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-black text-xs text-gray-900">₹{ord.price}</span>
                      <span className="text-[10px] text-gray-400 line-through">₹{ord.originalPrice}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!ord.available) {
                        alert('This outlet is currently closed. You can reorder when it opens!');
                      } else {
                        addToCart({ id: ord.id, name: ord.item, price: ord.price }, 'rest_reorder');
                      }
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition active:scale-95 ${
                      ord.available ? 'bg-[#FFD600] text-black shadow-sm' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Reorder
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* "Live it up! Crafted for Hyderabad" footer text matching image copy 25.png */}
          <div className="p-6 text-center space-y-1">
            <h3 className="text-3xl font-black text-gray-300 tracking-tight">Live it up!</h3>
            <p className="text-xs text-gray-400 font-bold">Crafted with ❤️ in Hyderabad, India</p>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 5-TAB FOOD SUB-NAVIGATION BAR (Sticky above global bottom nav) */}
      {/* ==================================================================== */}
      <div className="fixed bottom-14 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-gray-100 px-3 py-1.5 flex items-center justify-around z-30 shadow-md">
        {[
          { id: 'food', label: 'Food', icon: '🍲' },
          { id: 'bolt', label: 'Bolt (15m)', icon: '⚡' },
          { id: '99store', label: '99 store', icon: '🏷️' },
          { id: 'eatright', label: 'EatRight', icon: '🥑' },
          { id: 'reorder', label: 'Reorder', icon: '🔁' }
        ].map((tab) => {
          const isActive = currentFoodTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentFoodTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
                isActive ? 'text-black font-black' : 'text-gray-400 font-bold hover:text-gray-700'
              }`}
            >
              <span className={`text-base leading-none ${isActive ? 'scale-110' : ''}`}>{tab.icon}</span>
              <span className={`text-[9px] mt-0.5 ${isActive ? 'text-[#FFD600] bg-black px-1.5 py-0.2 rounded-md font-black' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* FLOATING CART BAR (Elevated directly above Food sub-nav bar) */}
      {cartCount > 0 && (
        <div className="fixed bottom-28 inset-x-0 max-w-md mx-auto px-4 z-40 pointer-events-auto">
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
