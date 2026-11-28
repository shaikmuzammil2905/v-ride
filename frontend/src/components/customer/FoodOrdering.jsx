import React, { useState } from 'react';
import {
  Menu, Bell, Utensils, MapPin, ChevronDown, Search,
  Star, ChevronRight, Mic, ShoppingBag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import DrawerMenu from '../common/DrawerMenu';

const DELIVERY_LOCATIONS = [
  'Miyapur, Hyderabad',
  'Kukatpally, Hyderabad',
  'Madhapur, Hyderabad',
  'Gachibowli, Hyderabad'
];

// Real Food Photography matching image copy 44.png (Zero emojis)
const FOOD_CATEGORIES = [
  {
    id: 'dosa',
    label: 'Dosa',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=240&auto=format&fit=crop&q=80'
  },
  {
    id: 'idli',
    label: 'Idli',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=240&auto=format&fit=crop&q=80'
  },
  {
    id: 'poori',
    label: 'Poori',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=240&auto=format&fit=crop&q=80'
  },
  {
    id: 'cakes',
    label: 'Cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=240&auto=format&fit=crop&q=80'
  },
  {
    id: 'khichdi',
    label: 'Khichdi',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=240&auto=format&fit=crop&q=80'
  },
  {
    id: 'biryani',
    label: 'Biryani',
    image: '/images/food-biryani.jpg'
  }
];

const NINETY_NINE_MEALS = [
  {
    id: 'item_idli_99',
    categoryId: 'idli',
    name: 'Idli (3 pcs)',
    price: 35,
    originalPrice: 50,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'item_dosa_plain',
    categoryId: 'dosa',
    name: 'Plain Dosa',
    price: 39,
    originalPrice: 59,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'item_puli_dosa',
    categoryId: 'khichdi',
    name: 'Pulibongaram ...',
    price: 29,
    originalPrice: 50,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&auto=format&fit=crop&q=80'
  }
];

export const FoodOrdering = ({ onNavigate, onSelectRestaurant }) => {
  const { selectedLocation, setSelectedLocation, cartCount, cartSubtotal, addToCart } = useApp();
  const [locationOpen, setLocationOpen] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [activeSubFilter, setActiveSubFilter] = useState(':: ALL');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartCounts, setCartCounts] = useState({});

  const restaurants = [
    {
      id: 'rest_paradise',
      name: 'Paradise Biryani',
      rating: 4.5,
      cuisines: ['Biryani', 'Indian', 'Hyderabadi'],
      deliveryTime: '30–40 min',
      tag: '50% OFF',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'rest_cakezone',
      name: 'Cheesecakes By CakeZone',
      rating: 4.1,
      cuisines: ['Desserts', 'Bakery'],
      deliveryTime: '45–55 MINS',
      tag: '50% off upto ₹100',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=80'
    },
    {
      id: 'rest_dominos',
      name: "Domino's Pizza",
      rating: 4.3,
      cuisines: ['Pizzas', 'Italian', 'Pastas'],
      deliveryTime: '20–30 min',
      tag: 'Flat ₹100 OFF',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80'
    }
  ];

  const handleAddMeal = (meal) => {
    setCartCounts((prev) => ({ ...prev, [meal.id]: (prev[meal.id] || 0) + 1 }));
    addToCart({ id: meal.id, name: meal.name, price: meal.price }, 'rest_99');
  };

  const visibleMeals = selectedCategory
    ? NINETY_NINE_MEALS.filter((item) => item.categoryId === selectedCategory)
    : NINETY_NINE_MEALS;

  return (
    <div className={`flex flex-col bg-white select-none ${cartCount > 0 ? 'main-content-with-cart' : 'pb-3'}`}>
      {/* 1. TOP NAVIGATION BAR (#11151C) */}
      <header className="sticky top-0 z-40 bg-[#11151C] px-4 py-3 md:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <button
            type="button"
            onClick={() => setShowDrawer(true)}
            aria-label="Open Menu"
            className="rounded-lg p-1.5 text-white transition hover:bg-white/10"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFD400] shadow-md">
              <span className="text-xl font-black tracking-tighter text-[#11151C]">V</span>
            </div>
            <span className="text-lg font-black tracking-wide text-[#FFD400]">V RIDE</span>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('support')}
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white transition hover:bg-white/10"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FFD400] ring-2 ring-[#11151C]" />
          </button>
        </div>
      </header>

      {/* 2. DARK HERO BANNER WITH FULL-BLEED BIRYANI BACKGROUND */}
      <section
        className="relative overflow-hidden bg-[#11151C] pt-6 pb-14"
        style={{
          backgroundImage: 'url("/images/biryani-hero.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          minHeight: '205px'
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#11151C]/95 via-[#11151C]/65 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4">
          <div className="max-w-[62%]">
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Food <span className="text-[#FFD400]">Delivery</span>
            </h1>
            <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-gray-200">
              <Utensils className="h-3.5 w-3.5 shrink-0 text-[#FFD400]" />
              <span>From Your Favorite Restaurants</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OVERLAPPING BOTTOM DELIVERY LOCATION BAR - EXACT MATCH TO image copy 43.png */}
      <div className="relative z-20 mx-auto w-full -mt-6 max-w-6xl px-2.5">
        <div className="relative rounded-3xl border border-white/20 bg-[#181E27] px-3.5 py-2.5 shadow-xl">
          <div className="flex items-center justify-between gap-2">
            <div className="relative flex items-center gap-2 min-w-0">
              <MapPin className="h-5 w-5 shrink-0 text-[#FFD400]" />
              <div className="min-w-0">
                <button
                  type="button"
                  onClick={() => setLocationOpen(!locationOpen)}
                  className="flex flex-wrap items-center gap-1 text-left text-xs font-bold text-white"
                >
                  <span>Deliver to</span>
                  <span className="text-[#FFD400] truncate max-w-[130px]">{selectedLocation}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-[#FFD400] shrink-0" />
                </button>
                <p className="mt-0.5 text-[10px] font-medium text-gray-300 truncate">
                  {selectedLocation} • <span className="font-semibold text-white">Live Kitchens</span>
                </p>
              </div>

              {locationOpen && (
                <div className="absolute left-0 top-12 z-50 w-52 rounded-xl border border-gray-700 bg-[#181E27] py-1.5 shadow-2xl">
                  {DELIVERY_LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setSelectedLocation(loc);
                        setLocationOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left text-xs transition hover:bg-white/10 ${
                        selectedLocation === loc ? 'font-bold text-[#FFD400]' : 'text-gray-200'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="shrink-0 rounded-full bg-[#FFD400] px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#11151C] shadow-sm">
              V RIDE FOOD
            </span>
          </div>
        </div>
      </div>

      {/* 4. SEARCH BAR & FILTER PILLS */}
      <div className="px-3 pt-4 space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for 'Biryani', 'Pizza', 'Dosa'..."
              className="w-full pl-9 pr-9 py-2 rounded-2xl border border-gray-200 bg-gray-50 text-xs font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FFD400]"
            />
            <Mic className="w-4 h-4 text-[#D97706] absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" />
          </div>

          <button
            type="button"
            onClick={() => setVegOnly(!vegOnly)}
            className={`px-3 py-2 rounded-2xl text-[10px] font-black flex items-center gap-1.5 border transition ${
              vegOnly ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-800 border-gray-200'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${vegOnly ? 'bg-white' : 'bg-emerald-500'}`} />
            <span>VEG</span>
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          {[':: ALL', '99 STORE', '🏷️ OFFERS', '⚡ BOLT', '❤️ FOR YOU'].map((tab) => {
            const isActive = activeSubFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveSubFilter(tab)}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap text-[11px] font-extrabold transition ${
                  isActive ? 'bg-[#FFD400] text-[#11151C] shadow-xs' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. "WHAT'S ON YOUR MIND?" & "99 STORE" (REAL FOOD PHOTOS) - EXACT MATCH TO image copy 44.png */}
      <div className="mx-auto w-full max-w-6xl space-y-5 bg-white px-3 py-4">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-extrabold tracking-tight text-[#11151C]">
              What&apos;s on your mind?
            </h2>
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-bold text-[#D97706] hover:text-[#B45309]"
            >
              View All &rarr;
            </button>
          </div>

          <div className="grid grid-cols-6 gap-1.5 sm:gap-3">
            {FOOD_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(isActive ? null : cat.id)}
                  className="group flex flex-col items-center text-center focus:outline-none"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-[#FFF9DC] p-1 transition sm:h-16 sm:w-16 ${
                      isActive ? 'ring-2 ring-[#FFD400] scale-105' : 'group-hover:scale-105'
                    }`}
                  >
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="h-full w-full rounded-xl object-cover"
                    />
                  </div>
                  <span className="mt-1 text-[10px] font-semibold text-[#11151C] sm:text-xs">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-[#FDE68A]/60 bg-[#FFFBE6] p-3">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-[#11151C] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                99 STORE
              </span>
              <h3 className="text-xs font-extrabold text-[#11151C] sm:text-sm">
                Meals at ₹99 + Free Delivery
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-bold text-[#D97706] hover:text-[#B45309]"
            >
              View All &rarr;
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {visibleMeals.map((meal) => {
              const count = cartCounts[meal.id] || 0;
              return (
                <div
                  key={meal.id}
                  className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-2 shadow-sm transition hover:shadow-md"
                >
                  <div>
                    <div className="relative overflow-hidden rounded-xl bg-gray-50">
                      <img src={meal.image} alt={meal.name} className="h-20 w-full object-cover" />
                      {meal.isVeg && (
                        <span
                          aria-label="Pure Veg"
                          className="absolute left-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-sm border border-green-700 bg-white"
                        >
                          <span className="h-2 w-2 rounded-full bg-green-700" />
                        </span>
                      )}
                    </div>

                    <h4 className="mt-2 truncate text-[11px] font-bold text-[#11151C]">
                      {meal.name}
                    </h4>

                    <div className="mt-0.5 flex items-baseline gap-1.5">
                      <span className="text-xs font-extrabold text-[#11151C]">₹{meal.price}</span>
                      <span className="text-[10px] font-medium text-gray-400 line-through">
                        ₹{meal.originalPrice}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddMeal(meal)}
                    className="mt-2 w-full rounded-full bg-[#FFD400] py-1.5 text-[10px] font-black uppercase tracking-wide text-[#11151C] shadow-xs transition hover:bg-[#F5C400] active:scale-[0.98]"
                  >
                    {count > 0 ? `+ ADD (${count})` : '+ ADD'}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* 6. TOP RESTAURANTS TO EXPLORE */}
      <div className="px-3 space-y-3 pb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-sm text-gray-900">Top Restaurants to Explore</h3>
          <span className="text-xs font-bold text-gray-500">137 Available</span>
        </div>

        {restaurants
          .filter((r) => !searchQuery || r.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((rest) => (
            <div
              key={rest.id}
              onClick={() => onSelectRestaurant(rest.id)}
              className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden cursor-pointer hover:border-yellow-300 transition"
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

                <button className="rounded-xl bg-[#FFD400] px-3 py-1.5 text-black font-extrabold text-xs flex items-center gap-1 active:scale-95">
                  <span>View Menu</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* FLOATING CART PILL IF ITEMS ADDED - PROPERLY SPACED ABOVE BOTTOM NAV */}
      {cartCount > 0 && (
        <div className="floating-cart max-w-md mx-auto animate-slideUp">
          <div
            onClick={() => onNavigate('track')}
            className="glass-btn-dark px-4 py-3 rounded-2xl flex items-center justify-between cursor-pointer border border-[#FFD400]/40 shadow-2xl"
          >
            <div className="flex items-center gap-2 text-white text-xs">
              <ShoppingBag className="w-4 h-4 text-[#FFD400]" />
              <span className="font-bold">{cartCount} items added</span>
              <span>·</span>
              <span className="font-black text-[#FFD400]">₹{cartSubtotal}</span>
            </div>
            <button className="rounded-xl bg-[#FFD400] px-3.5 py-1.5 text-black font-black text-xs active:scale-95">
              View Cart →
            </button>
          </div>
        </div>
      )}

      <DrawerMenu isOpen={showDrawer} onClose={() => setShowDrawer(false)} onNavigate={onNavigate} />
    </div>
  );
};

export default FoodOrdering;
