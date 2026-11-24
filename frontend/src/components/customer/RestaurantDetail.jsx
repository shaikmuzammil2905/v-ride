import React, { useState } from 'react';
import {
  ArrowLeft, Heart, Search, Star, Clock, ShieldCheck,
  Plus, Minus, ArrowRight, Tag, X, CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RestaurantDetail = ({ onBack, onNavigateToTrack }) => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    cartCount,
    cartSubtotal,
    clearCart,
    setActiveFoodOrder,
    currentUser,
    selectedLocation
  } = useApp();

  const [activeTab, setActiveTab] = useState('Recommended');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [couponCode, setCouponCode] = useState('VRIDE20');
  const [couponApplied, setCouponApplied] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const menuItems = [
    {
      id: 'menu_cb_paradise',
      name: 'Chicken Biryani',
      description: 'Fragrant basmati rice cooked with succulent chicken pieces in royal Hyderabadi spices.',
      price: 299,
      originalPrice: 349,
      isVeg: false,
      category: 'Recommended',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'menu_mb_paradise',
      name: 'Mutton Biryani',
      description: 'Tender mutton cooked on dum with aged basmati rice, saffron, and aromatic spices.',
      price: 399,
      originalPrice: 449,
      isVeg: false,
      category: 'Recommended',
      image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'menu_vb_paradise',
      name: 'Veg Biryani',
      description: 'Loaded with freshly picked garden vegetables, paneer cubes, and minted basmati rice.',
      price: 249,
      originalPrice: 299,
      isVeg: true,
      category: 'Recommended',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'menu_chicken_65',
      name: 'Chicken 65 (Boneless)',
      description: 'Deep-fried chicken chunks tossed in spicy red yoghurt curry leaf masala.',
      price: 279,
      originalPrice: 310,
      isVeg: false,
      category: 'Starters',
      image: 'https://images.unsplash.com/photo-1527477378377-f27329d4d29e?w=300&auto=format&fit=crop&q=80'
    }
  ];

  // Bill computations
  const deliveryFee = 40;
  const tax = Math.round(cartSubtotal * 0.05);
  const discount = couponApplied && couponCode === 'VRIDE20' ? Math.min(100, Math.round(cartSubtotal * 0.20)) : 0;
  const total = Math.max(0, cartSubtotal + deliveryFee + tax - discount);

  const handlePlaceOrder = () => {
    const newOrder = {
      id: 'ord_' + Math.floor(10000 + Math.random() * 90000),
      restaurantName: 'Paradise Biryani',
      items: cartItems,
      subtotal: cartSubtotal,
      deliveryFee,
      tax,
      discount,
      total,
      deliveryAddress: `Flat 402, Lotus Residency, ${selectedLocation}`,
      partnerName: 'Ramesh K',
      partnerPhone: '+91 98480 12345',
      partnerRating: 4.8,
      partnerTrips: '2,341 trips',
      partnerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'arriving',
      currentStep: 4,
      etaText: 'Arriving in 8 min',
      otp: '4829',
      paymentMethod: paymentMethod.toUpperCase(),
      createdAt: new Date().toISOString()
    };
    setActiveFoodOrder(newOrder);
    setShowCartModal(false);
    onNavigateToTrack();
  };

  return (
    <div className="flex flex-col bg-white pb-2 select-none">
      {/* Banner & Header matching Screen 7 in image.png */}
      <div className="relative h-48 bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80"
          alt="Paradise Biryani Banner"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40"></div>

        {/* Top Floating Controls */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-900 shadow active:scale-95"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow active:scale-95"
              aria-label="Favorite"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-800'}`} />
            </button>
            <button
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-800 shadow active:scale-95"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Restaurant Info Card matching screenshot */}
      <div className="px-5 pt-3 pb-2 bg-white">
        <h1 className="text-lg font-black text-gray-900">Paradise Biryani</h1>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
          <span className="flex items-center gap-0.5 font-bold text-gray-900">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            4.4
          </span>
          <span className="text-gray-400">(12.5k+ reviews)</span>
        </div>
        <p className="text-xs text-gray-500 font-medium mt-0.5">Biryani · Indian · Hyderabadi</p>

        {/* Stats Row matching screenshot: 30-40 min Delivery | ₹40 Delivery Fee | ₹200 Min Order */}
        <div className="grid grid-cols-3 gap-2 py-3 mt-2 border-y border-gray-100 text-center">
          <div>
            <span className="text-xs font-bold text-gray-900 block">30–40 min</span>
            <span className="text-[10px] text-gray-400">Delivery</span>
          </div>
          <div className="border-x border-gray-100">
            <span className="text-xs font-bold text-gray-900 block">₹40</span>
            <span className="text-[10px] text-gray-400">Delivery Fee</span>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-900 block">₹200</span>
            <span className="text-[10px] text-gray-400">Min Order</span>
          </div>
        </div>
      </div>

      {/* Category Tabs matching screenshot (Recommended, Biryani, Combos, Starters) */}
      <div className="px-5 pt-2 pb-1 flex gap-2 border-b border-gray-100 overflow-x-auto no-scrollbar">
        {['Recommended', 'Biryani', 'Combos', 'Starters'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
              activeTab === tab
                ? 'bg-vride-yellow text-black shadow-xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Menu Item Cards matching screenshot */}
      <div className="px-5 pt-3 space-y-3">
        {menuItems.map(item => {
          const inCart = cartItems.find(i => i.id === item.id);
          return (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-between gap-3 hover:border-yellow-200 transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover shadow-xs"
                />
                <div>
                  {/* Veg / Non-veg tag icon */}
                  <div className="flex items-center gap-1.5">
                    <span className={`w-3 h-3 rounded-sm border flex items-center justify-center ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></span>
                    </span>
                    <h3 className="font-extrabold text-xs text-gray-900 leading-snug">{item.name}</h3>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-black text-xs text-gray-900">₹{item.price}</span>
                    <span className="text-[11px] text-gray-400 line-through">₹{item.originalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Add / Quantity Button matching screenshot */}
              <div>
                {inCart ? (
                  <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-300 rounded-xl px-2 py-1">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-6 h-6 rounded-lg bg-white text-black font-black flex items-center justify-center text-xs shadow-xs"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-black text-black px-1">{inCart.quantity}</span>
                    <button
                      onClick={() => addToCart(item, 'rest_paradise')}
                      className="w-6 h-6 rounded-lg bg-vride-yellow text-black font-black flex items-center justify-center text-xs shadow-xs"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(item, 'rest_paradise')}
                    className="w-8 h-8 rounded-xl bg-vride-yellow text-black font-black flex items-center justify-center text-sm shadow-sm hover:bg-yellow-400 transition active:scale-95"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Grand & Bright Floating Cart Bar (Above Bottom Navigation Bar) */}
      {cartCount > 0 && (
        <div className="fixed bottom-[78px] inset-x-0 max-w-md mx-auto px-4 z-40 pointer-events-auto">
          <div
            onClick={() => setShowCartModal(true)}
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
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </div>
          </div>
        </div>
      )}

      {/* CART & CHECKOUT MODAL */}
      {showCartModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-base text-gray-900">Your Cart</h3>
              <button
                onClick={() => setShowCartModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs"
              >
                ✕
              </button>
            </div>

            {/* Items in cart */}
            <div className="py-3 space-y-2.5">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{item.name}</span>
                    <span className="text-gray-400">x{item.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-gray-900">₹{item.price * item.quantity}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 font-bold hover:underline"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Code Banner */}
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl my-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-red-600" />
                <span className="text-xs font-extrabold text-red-700">VRIDE20 (20% OFF)</span>
              </div>
              <span className="text-xs font-bold text-green-700">Applied ✓</span>
            </div>

            {/* Bill Details */}
            <div className="py-3 border-t border-gray-100 text-xs space-y-1.5">
              <div className="flex justify-between text-gray-600">
                <span>Item Total</span>
                <span>₹{cartSubtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes & Charges (5%)</span>
                <span>₹{tax}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-bold">
                  <span>Coupon Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-gray-900 text-sm pt-2 border-t border-gray-200">
                <span>To Pay</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="p-3 bg-gray-50 rounded-xl my-2 text-xs">
              <span className="text-[10px] text-gray-400 block font-bold uppercase">Deliver To</span>
              <p className="font-bold text-gray-800">Flat 402, Lotus Residency, {selectedLocation}</p>
            </div>

            {/* Payment Method Selector */}
            <div className="my-3 space-y-1.5">
              <label className="text-[10px] text-gray-500 font-bold block uppercase">Select Payment Method</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2 rounded-xl border text-center font-bold ${paymentMethod === 'upi' ? 'bg-black text-white border-black' : 'bg-white border-gray-200'}`}
                >
                  UPI / GPay
                </button>
                <button
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-2 rounded-xl border text-center font-bold ${paymentMethod === 'wallet' ? 'bg-black text-white border-black' : 'bg-white border-gray-200'}`}
                >
                  Wallet (₹{currentUser.walletBalance || 850})
                </button>
                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-2 rounded-xl border text-center font-bold ${paymentMethod === 'cod' ? 'bg-black text-white border-black' : 'bg-white border-gray-200'}`}
                >
                  Cash
                </button>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full py-3.5 rounded-2xl bg-vride-yellow text-black font-extrabold text-sm shadow-yellow-glow hover:bg-yellow-400 transition active:scale-98"
            >
              Pay ₹{total} & Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default RestaurantDetail;
