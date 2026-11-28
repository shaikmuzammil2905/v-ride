import React, { useState, useEffect } from 'react';
import {
  Home, ClipboardList, UtensilsCrossed, Wallet, User,
  ChevronRight, Plus, Search, Phone, MessageSquare, ArrowLeft,
  Camera, Edit3, Trash2, BarChart3, Settings, Users, Tag, Star,
  HelpCircle, Download, Clock, PauseCircle, CheckCircle2, X
} from 'lucide-react';
import PartnerHeader from '../common/PartnerHeader';
import { apiRequest, uploadMediaToS3 } from '../../services/api';

export const VendorPanel = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'orders' | 'menu' | 'wallet' | 'profile'
  const [subPage, setSubPage] = useState(null); // null | 'order_detail' | 'item_form' | 'reports' | 'settings' | 'staff' | 'offers' | 'reviews' | 'support'
  const [period, setPeriod] = useState('Today');
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const [restaurant, setRestaurant] = useState({
    id: 'rest_paradise',
    name: 'Paradise Biryani',
    address: 'Miyapur, Hyderabad',
    code: 'RST1024',
    isOpen: true,
    pauseOrders: false,
    operatingHours: '10:00 AM – 11:00 PM',
    prepTime: '20 Minutes',
    rating: 4.6,
    reviewsCount: 1248,
    walletBalance: 12480
  });

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Order #FOD9821', desc: '2 Items · ₹328 from Kavya R. (5.4 km)', time: '2m ago', read: false },
    { id: 2, title: 'Settlement Processed', desc: '₹18,760 settled to HDFC Bank.', time: '5h ago', read: false }
  ]);

  // Orders matching image copy 35.png
  const [orderTab, setOrderTab] = useState('new'); // 'new' | 'preparing' | 'ready' | 'completed'
  const [orderSearch, setOrderSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([
    {
      id: 'FOD9821',
      status: 'new',
      timeAgo: '2 mins ago',
      placedAt: '10:24 AM, 27 Nov 2026',
      customerName: 'Kavya R.',
      address: 'Miyapur, Hyderabad - 500049',
      distance: '5.4 km',
      items: [
        { name: 'Chicken Biryani', qty: 1, price: 249 },
        { name: 'Paneer 65', qty: 1, price: 79 }
      ],
      packaging: 10,
      commissionRate: 0.15
    },
    {
      id: 'FOD9820',
      status: 'new',
      timeAgo: '3 mins ago',
      placedAt: '10:21 AM, 27 Nov 2026',
      customerName: 'Rohit S.',
      address: 'Kukatpally, Hyderabad (4.1 km)',
      distance: '4.1 km',
      items: [{ name: 'Mutton Biryani', qty: 1, price: 349 }, { name: 'Veg Fried Rice', qty: 1, price: 179 }],
      packaging: 15,
      commissionRate: 0.15
    },
    {
      id: 'FOD9819',
      status: 'preparing',
      timeAgo: '6 mins ago',
      placedAt: '10:15 AM, 27 Nov 2026',
      customerName: 'Sneha M.',
      address: 'Hitech City, Hyderabad (6.2 km)',
      distance: '6.2 km',
      items: [{ name: 'Chicken 65', qty: 1, price: 199 }],
      packaging: 10,
      commissionRate: 0.15
    }
  ]);

  // Menu Management matching image copy 35.png
  const [menuTab, setMenuTab] = useState('items'); // 'items' | 'categories'
  const [menuSearch, setMenuSearch] = useState('');
  const [menuItems, setMenuItems] = useState([
    { id: 'm1', name: 'Chicken Biryani', category: 'Biryani', price: 249, offerPrice: 229, isVeg: false, available: true, description: 'Aromatic basmati rice with tender chicken and Hyderabadi spices.', image: '/images/food-biryani.jpg' },
    { id: 'm2', name: 'Mutton Biryani', category: 'Biryani', price: 349, offerPrice: 319, isVeg: false, available: true, description: 'Slow-cooked mutton dum biryani.', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=300&auto=format&fit=crop&q=80' },
    { id: 'm3', name: 'Paneer Biryani', category: 'Biryani', price: 229, offerPrice: 199, isVeg: true, available: true, description: 'Soft paneer cubes layered with saffron rice.', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300&auto=format&fit=crop&q=80' },
    { id: 'm4', name: 'Veg Fried Rice', category: 'Chinese', price: 179, offerPrice: 159, isVeg: true, available: true, description: 'Wok-tossed basmati rice with crisp veggies.', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&auto=format&fit=crop&q=80' },
    { id: 'm5', name: 'Chicken 65', category: 'Starters', price: 199, offerPrice: 179, isVeg: false, available: true, description: 'Crispy spicy South Indian fried chicken.', image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=300&auto=format&fit=crop&q=80' }
  ]);
  const [categories, setCategories] = useState([
    { id: 'c1', name: 'Biryani', enabled: true },
    { id: 'c2', name: 'Starters', enabled: true },
    { id: 'c3', name: 'Chinese', enabled: true }
  ]);
  const [editingItem, setEditingItem] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Staff, Offers, Reviews
  const [staffList, setStaffList] = useState([
    { id: 'st1', name: 'Vikram Rao', role: 'Kitchen Manager', active: true },
    { id: 'st2', name: 'Sandeep K', role: 'Order Dispatcher', active: true }
  ]);
  const [offersList, setOffersList] = useState([
    { id: 'of1', title: '20% OFF on Biryani Combos', minOrder: 299, active: true }
  ]);
  const [reviewsList] = useState([
    { id: 'rv1', customer: 'Kavya R.', rating: 5, comment: 'Hot dum biryani delivered quickly!', reply: 'Thank you for ordering!' }
  ]);

  // Wallet Withdraw
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('2500');

  useEffect(() => {
    apiRequest(`/vendor/${restaurant.id}/dashboard`).then((res) => {
      if (res?.success && res.data?.restaurant) {
        setRestaurant((prev) => ({ ...prev, ...res.data.restaurant }));
      }
    });
  }, []);

  const handleToggleOpen = async () => {
    const nextOpen = !restaurant.isOpen;
    await apiRequest(`/vendor/${restaurant.id}/settings`, {
      method: 'PUT',
      body: JSON.stringify({ isOpen: nextOpen })
    });
    setRestaurant((prev) => ({ ...prev, isOpen: nextOpen }));
    showToast(nextOpen ? 'Restaurant is now OPEN' : 'Restaurant set to OFFLINE');
  };

  const handleOrderTransition = async (orderId, nextStatus) => {
    let reason = '';
    if (nextStatus === 'rejected') {
      reason = window.prompt('Enter rejection reason:', 'Item out of stock') || 'Unavailable';
    }
    await apiRequest(`/vendor/orders/${orderId}/transition`, {
      method: 'PUT',
      body: JSON.stringify({ status: nextStatus, reason })
    });
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o)));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, status: nextStatus }));
    }
    showToast(`Order #${orderId} marked ${nextStatus.toUpperCase()}`);
  };

  const handleSaveMenuItem = async (e) => {
    e.preventDefault();
    const isNew = !editingItem.id;
    const saved = {
      ...editingItem,
      id: editingItem.id || 'm_' + Date.now(),
      price: Number(editingItem.price),
      offerPrice: Number(editingItem.offerPrice || editingItem.price)
    };
    if (isNew) {
      await apiRequest('/admin/menu-items', { method: 'POST', body: JSON.stringify({ ...saved, restaurantId: restaurant.id }) });
      setMenuItems((prev) => [saved, ...prev]);
    } else {
      await apiRequest(`/admin/menu-items/${saved.id}`, { method: 'PUT', body: JSON.stringify(saved) });
      setMenuItems((prev) => prev.map((m) => (m.id === saved.id ? saved : m)));
    }
    setSubPage(null);
    setEditingItem(null);
    showToast(isNew ? 'Menu item added!' : 'Menu item updated!');
  };

  const handleExportCsv = (reportName) => {
    const rows = [
      ['Order ID', 'Customer', 'Status', 'Total'],
      ...orders.map((o) => [o.id, o.customerName, o.status, o.items.reduce((s, i) => s + i.price * i.qty, 0)])
    ];
    const csv = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportName.toLowerCase().replace(/\s+/g, '_')}.csv`;
    a.click();
    showToast(`Downloaded ${reportName} CSV`);
  };

  const navTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'orders', label: 'Orders', icon: ClipboardList },
    { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const orderTotals = (ord) => {
    const itemTotal = ord.items.reduce((s, i) => s + i.price * i.qty, 0);
    const commission = Math.round(itemTotal * (ord.commissionRate || 0.15));
    const net = itemTotal + (ord.packaging || 0) - commission;
    return { itemTotal, commission, net };
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] text-gray-900 flex flex-col select-none">
      {toast && (
        <div className="fixed top-16 right-4 z-50 bg-[#10151F] text-[#FFD000] px-4 py-2.5 rounded-2xl shadow-xl text-xs font-black border border-[#FFD000]/40">
          {toast}
        </div>
      )}

      <PartnerHeader
        roleLabel="RESTAURANT PARTNER"
        userName={`${restaurant.name} · ${restaurant.address}`}
        notifications={notifications}
        onMarkAllRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
        onToggleMenu={() => { setSubPage('settings'); setActiveTab('profile'); }}
        onLogout={onLogout}
        rightSlot={
          <button
            type="button"
            onClick={handleToggleOpen}
            className={`px-2.5 py-1 rounded-full text-[10px] font-black transition ${
              restaurant.isOpen ? 'bg-emerald-500 text-black' : 'bg-red-500 text-white'
            }`}
          >
            {restaurant.isOpen ? 'OPEN' : 'CLOSED'}
          </button>
        }
      />

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:w-60 bg-[#10151F] text-white flex-col p-4 space-y-1.5 shrink-0">
          {navTabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id && !subPage;
            return (
              <button
                key={t.id}
                onClick={() => { setSubPage(null); setActiveTab(t.id); }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition ${
                  active ? 'bg-[#FFD000] text-black font-black' : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
          <div className="pt-3 mt-3 border-t border-white/10 space-y-1">
            <button onClick={() => setSubPage('reports')} className="w-full px-3.5 py-2 rounded-xl text-xs font-bold text-gray-300 hover:bg-white/10 flex items-center gap-2.5">
              <BarChart3 className="w-4 h-4 text-[#FFD000]" />
              <span>Reports & Analytics</span>
            </button>
            <button onClick={() => setSubPage('settings')} className="w-full px-3.5 py-2 rounded-xl text-xs font-bold text-gray-300 hover:bg-white/10 flex items-center gap-2.5">
              <Settings className="w-4 h-4 text-[#FFD000]" />
              <span>Restaurant Settings</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl w-full mx-auto pb-24 md:pb-8">
          {/* SUBPAGE: ORDER DETAILS */}
          {subPage === 'order_detail' && selectedOrder && (() => {
            const { itemTotal, commission, net } = orderTotals(selectedOrder);
            return (
              <div className="p-4 space-y-4">
                <button type="button" onClick={() => setSubPage(null)} className="flex items-center gap-1.5 text-xs font-black text-gray-700">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Orders</span>
                </button>

                <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-4 shadow-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-black text-base text-gray-900">#{selectedOrder.id}</h2>
                      <p className="text-[11px] text-gray-500">Placed at {selectedOrder.placedAt}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-[10px] font-black uppercase">
                      {selectedOrder.status}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                    <div>
                      <span className="font-black text-xs block">{selectedOrder.customerName}</span>
                      <span className="text-[11px] text-gray-500">{selectedOrder.address} · {selectedOrder.distance}</span>
                    </div>
                    <div className="flex gap-2">
                      <a href="tel:+919876543210" className="p-2 rounded-full bg-white border"><Phone className="w-3.5 h-3.5" /></a>
                      <button onClick={() => showToast('Customer chat opened')} className="p-2 rounded-full bg-white border"><MessageSquare className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <h4 className="font-black text-gray-900">Order Items ({selectedOrder.items.length})</h4>
                    {selectedOrder.items.map((it, i) => (
                      <div key={i} className="flex justify-between py-1 border-b border-gray-100">
                        <span className="font-semibold">{it.name} × {it.qty}</span>
                        <span className="font-bold">₹{it.price * it.qty}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-gray-600 pt-1">
                      <span>Item Total</span><span>₹{itemTotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Packaging</span><span>₹{selectedOrder.packaging}</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Platform Commission (15%)</span><span>- ₹{commission}</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-xl bg-yellow-50 font-black text-sm text-gray-900">
                      <span>You Will Receive</span><span>₹{net}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    {selectedOrder.status === 'new' && (
                      <>
                        <button onClick={() => handleOrderTransition(selectedOrder.id, 'rejected')} className="py-3 rounded-xl bg-red-50 text-red-700 font-black text-xs">
                          Reject
                        </button>
                        <button onClick={() => handleOrderTransition(selectedOrder.id, 'preparing')} className="py-3 rounded-xl bg-[#FFD000] text-black font-black text-xs">
                          Accept Order
                        </button>
                      </>
                    )}
                    {selectedOrder.status === 'preparing' && (
                      <button onClick={() => handleOrderTransition(selectedOrder.id, 'ready')} className="col-span-2 py-3 rounded-xl bg-[#FFD000] text-black font-black text-xs">
                        Mark Ready for Pickup →
                      </button>
                    )}
                    {selectedOrder.status === 'ready' && (
                      <button onClick={() => handleOrderTransition(selectedOrder.id, 'completed')} className="col-span-2 py-3 rounded-xl bg-emerald-600 text-white font-black text-xs">
                        Verify Rider Pickup & Complete ✓
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* SUBPAGE: ADD / EDIT MENU ITEM */}
          {subPage === 'item_form' && editingItem && (
            <div className="p-4 space-y-4">
              <button type="button" onClick={() => { setSubPage(null); setEditingItem(null); }} className="flex items-center gap-1.5 text-xs font-black text-gray-700">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Menu Management</span>
              </button>

              <form onSubmit={handleSaveMenuItem} className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3.5 shadow-xs">
                <h2 className="font-black text-base">{editingItem.id ? 'Edit Item' : 'Add New Item'}</h2>

                <div className="flex items-center gap-4">
                  <img src={editingItem.image || '/images/food-biryani.jpg'} alt="Item" className="w-24 h-20 rounded-xl object-cover bg-gray-100 border" />
                  <label className="px-3.5 py-2 rounded-xl border border-gray-300 bg-gray-50 text-xs font-bold cursor-pointer flex items-center gap-1.5">
                    <Camera className="w-4 h-4" />
                    <span>{uploadingPhoto ? 'Uploading...' : 'Change Photo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        setUploadingPhoto(true);
                        const res = await uploadMediaToS3(f, 'menu-items');
                        setUploadingPhoto(false);
                        setEditingItem((p) => ({ ...p, image: res?.success ? res.data.url : URL.createObjectURL(f) }));
                      }}
                    />
                  </label>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Item Name *</label>
                  <input
                    required
                    value={editingItem.name}
                    onChange={(e) => setEditingItem((p) => ({ ...p, name: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Category *</label>
                    <select
                      value={editingItem.category}
                      onChange={(e) => setEditingItem((p) => ({ ...p, category: e.target.value }))}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold"
                    >
                      {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Dietary</label>
                    <select
                      value={editingItem.isVeg ? 'veg' : 'nonveg'}
                      onChange={(e) => setEditingItem((p) => ({ ...p, isVeg: e.target.value === 'veg' }))}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold"
                    >
                      <option value="veg">Veg</option>
                      <option value="nonveg">Non-Veg</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={editingItem.price}
                      onChange={(e) => setEditingItem((p) => ({ ...p, price: e.target.value }))}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Offer Price (₹)</label>
                    <input
                      type="number"
                      value={editingItem.offerPrice}
                      onChange={(e) => setEditingItem((p) => ({ ...p, offerPrice: e.target.value }))}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={editingItem.description}
                    onChange={(e) => setEditingItem((p) => ({ ...p, description: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold"
                  />
                </div>

                <label className="flex items-center justify-between py-2 text-xs font-bold">
                  <span>Availability</span>
                  <input
                    type="checkbox"
                    checked={editingItem.available}
                    onChange={(e) => setEditingItem((p) => ({ ...p, available: e.target.checked }))}
                    className="w-4 h-4 accent-emerald-600"
                  />
                </label>

                <button type="submit" className="w-full py-3 rounded-2xl bg-[#FFD000] text-black font-black text-xs shadow-md">
                  Save Item
                </button>
              </form>
            </div>
          )}

          {/* SUBPAGE: REPORTS */}
          {subPage === 'reports' && (
            <div className="p-4 space-y-4">
              <button type="button" onClick={() => setSubPage(null)} className="flex items-center gap-1.5 text-xs font-black text-gray-700">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-500 block">Sales Overview</span>
                    <p className="text-2xl font-black text-gray-900">₹18,760</p>
                    <span className="text-[11px] font-bold text-emerald-600">▲ +14% vs Yesterday</span>
                  </div>
                  <div className="text-right text-xs">
                    <span className="font-black block">56 Total Orders</span>
                    <span className="text-gray-500">₹335 Avg. Order Value</span>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2 items-end h-28 pt-2">
                  {[35, 50, 42, 65, 80, 92, 98].map((h, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1 h-full justify-end">
                      <div className="w-full bg-emerald-500 rounded-t-md" style={{ height: `${h}%` }} />
                      <span className="text-[9px] text-gray-400 font-bold">{8 + idx * 2}</span>
                    </div>
                  ))}
                </div>

                <div className="divide-y divide-gray-100">
                  {['Sales Report', 'Item Wise Report', 'Order Report'].map((rep) => (
                    <button
                      key={rep}
                      type="button"
                      onClick={() => handleExportCsv(rep)}
                      className="w-full py-3 flex items-center justify-between text-xs font-bold hover:text-black"
                    >
                      <span>{rep}</span>
                      <span className="flex items-center gap-1 text-blue-600">
                        <Download className="w-3.5 h-3.5" /> CSV
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUBPAGE: SETTINGS / STAFF / OFFERS / REVIEWS / SUPPORT */}
          {subPage && !['order_detail', 'item_form', 'reports'].includes(subPage) && (
            <div className="p-4 space-y-4">
              <button type="button" onClick={() => setSubPage(null)} className="flex items-center gap-1.5 text-xs font-black text-gray-700">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Profile</span>
              </button>

              {subPage === 'settings' && (
                <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <span className="font-black text-xs block">Restaurant Status</span>
                      <span className="text-[11px] text-emerald-600 font-bold">{restaurant.isOpen ? 'Open – Receiving Orders' : 'Closed'}</span>
                    </div>
                    <input type="checkbox" checked={restaurant.isOpen} onChange={handleToggleOpen} className="w-5 h-5 accent-emerald-600" />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <span className="font-black text-xs block">Operating Hours</span>
                      <span className="text-[11px] text-gray-500">{restaurant.operatingHours}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <span className="font-black text-xs block">Preparation Time</span>
                      <span className="text-[11px] text-gray-500">{restaurant.prepTime}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <span className="font-black text-xs block">Pause Orders</span>
                      <span className="text-[11px] text-gray-500">Temporarily stop receiving orders</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={restaurant.pauseOrders}
                      onChange={async (e) => {
                        const pauseOrders = e.target.checked;
                        await apiRequest(`/vendor/${restaurant.id}/settings`, { method: 'PUT', body: JSON.stringify({ pauseOrders }) });
                        setRestaurant((p) => ({ ...p, pauseOrders }));
                        showToast(pauseOrders ? 'Orders paused' : 'Orders resumed');
                      }}
                      className="w-5 h-5 accent-amber-500"
                    />
                  </div>
                </div>
              )}

              {subPage === 'staff' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-black text-sm">Staff Management</h3>
                    <button
                      onClick={() => {
                        const name = window.prompt('Staff Member Name:');
                        if (name) setStaffList((p) => [...p, { id: 'st_' + Date.now(), name, role: 'Kitchen Staff', active: true }]);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#FFD000] text-black font-black text-xs"
                    >
                      + Add Staff
                    </button>
                  </div>
                  {staffList.map((s) => (
                    <div key={s.id} className="p-3 rounded-xl bg-gray-50 border flex justify-between items-center text-xs">
                      <div>
                        <span className="font-black block">{s.name}</span>
                        <span className="text-gray-500">{s.role}</span>
                      </div>
                      <button onClick={() => setStaffList((p) => p.filter((x) => x.id !== s.id))} className="text-red-600 font-bold">Remove</button>
                    </div>
                  ))}
                </div>
              )}

              {subPage === 'offers' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-black text-sm">Offers & Promotions</h3>
                    <button
                      onClick={() => {
                        const title = window.prompt('Offer Title:');
                        if (title) setOffersList((p) => [...p, { id: 'of_' + Date.now(), title, minOrder: 199, active: true }]);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#FFD000] text-black font-black text-xs"
                    >
                      + Create Offer
                    </button>
                  </div>
                  {offersList.map((o) => (
                    <div key={o.id} className="p-3 rounded-xl bg-yellow-50 border border-yellow-200 flex justify-between items-center text-xs">
                      <span className="font-black">{o.title}</span>
                      <span className="text-emerald-700 font-bold">Active</span>
                    </div>
                  ))}
                </div>
              )}

              {subPage === 'reviews' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
                  <h3 className="font-black text-sm">Customer Ratings & Reviews</h3>
                  {reviewsList.map((r) => (
                    <div key={r.id} className="p-3 rounded-xl bg-gray-50 border text-xs space-y-1">
                      <div className="flex justify-between font-black">
                        <span>{r.customer}</span><span>★ {r.rating}</span>
                      </div>
                      <p className="text-gray-600">{r.comment}</p>
                      <p className="text-emerald-700 font-semibold">Reply: {r.reply}</p>
                    </div>
                  ))}
                </div>
              )}

              {subPage === 'support' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3 text-xs">
                  <h3 className="font-black text-sm">Vendor Support & Help</h3>
                  <p className="text-gray-600">Need help with settlements, rider pickup, or FSSAI verification? Raise a ticket directly to V RIDE Admin Support.</p>
                  <button
                    onClick={async () => {
                      const subject = window.prompt('Ticket Subject:');
                      if (!subject) return;
                      await apiRequest('/support/ticket', {
                        method: 'POST',
                        body: JSON.stringify({ userName: restaurant.name, category: 'Vendor Support', subject, message: 'Vendor portal inquiry' })
                      });
                      showToast('Vendor support ticket submitted!');
                    }}
                    className="w-full py-3 rounded-xl bg-[#FFD000] text-black font-black"
                  >
                    Raise Support Ticket
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 1: HOME DASHBOARD */}
          {!subPage && activeTab === 'home' && (
            <div className="p-4 space-y-4">
              {/* Restaurant Banner Card */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/images/food-biryani.jpg" alt="Restaurant" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h2 className="font-black text-sm text-gray-900">{restaurant.name}</h2>
                    <p className="text-[11px] text-gray-500">📍 {restaurant.address}</p>
                  </div>
                </div>
                <button
                  onClick={handleToggleOpen}
                  className={`px-3 py-1 rounded-full text-xs font-black ${
                    restaurant.isOpen ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                  }`}
                >
                  {restaurant.isOpen ? 'Open' : 'Offline'}
                </button>
              </div>

              {/* Period Tabs */}
              <div className="grid grid-cols-3 gap-2 bg-white p-1.5 rounded-2xl border border-gray-200">
                {['Today', 'This Week', 'This Month'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`py-2 rounded-xl text-xs font-black transition ${
                      period === p ? 'bg-[#FFD000] text-black shadow-xs' : 'text-gray-600'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* 4 KPI Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div onClick={() => setActiveTab('orders')} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs cursor-pointer hover:border-[#FFD000]">
                  <span className="text-xs font-bold text-gray-500 block">🛒 Orders</span>
                  <span className="text-2xl font-black text-gray-900 mt-1 block">{period === 'Today' ? 56 : period === 'This Week' ? 342 : 1420}</span>
                  <span className="text-[11px] font-bold text-emerald-600">▲ +12%</span>
                </div>
                <div onClick={() => setSubPage('reports')} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs cursor-pointer hover:border-[#FFD000]">
                  <span className="text-xs font-bold text-gray-500 block">💰 Revenue</span>
                  <span className="text-2xl font-black text-gray-900 mt-1 block">₹{period === 'Today' ? '18,760' : period === 'This Week' ? '1,12,400' : '4,82,900'}</span>
                  <span className="text-[11px] font-bold text-emerald-600">▲ +14%</span>
                </div>
                <div onClick={() => setSubPage('reviews')} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs cursor-pointer hover:border-[#FFD000]">
                  <span className="text-xs font-bold text-gray-500 block">⭐ Rating</span>
                  <span className="text-2xl font-black text-gray-900 mt-1 block">{restaurant.rating} ★</span>
                  <span className="text-[11px] text-gray-500">({restaurant.reviewsCount})</span>
                </div>
                <div onClick={() => setActiveTab('wallet')} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs cursor-pointer hover:border-[#FFD000]">
                  <span className="text-xs font-bold text-gray-500 block">💳 Wallet</span>
                  <span className="text-2xl font-black text-gray-900 mt-1 block">₹{restaurant.walletBalance.toLocaleString('en-IN')}</span>
                  <span className="text-[11px] text-emerald-600 font-bold">Available</span>
                </div>
              </div>

              {/* Today's Sales Line Chart */}
              <div onClick={() => setSubPage('reports')} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-500 block">Today&apos;s Sales</span>
                    <span className="text-xl font-black text-gray-900">₹18,760</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                <svg viewBox="0 0 300 80" className="w-full h-24">
                  <polyline
                    fill="none"
                    stroke="#16A34A"
                    strokeWidth="3"
                    points="10,65 55,58 100,45 150,48 200,35 245,32 290,15"
                  />
                  {[
                    [10, 65], [55, 58], [100, 45], [150, 48], [200, 35], [245, 32], [290, 15]
                  ].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="4" fill="#16A34A" />
                  ))}
                </svg>
                <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                  <span>8 AM</span><span>10 AM</span><span>12 PM</span><span>2 PM</span><span>4 PM</span><span>6 PM</span><span>8 PM</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS */}
          {!subPage && activeTab === 'orders' && (
            <div className="p-4 space-y-3.5">
              <div className="flex items-center justify-between gap-2">
                <h1 className="text-lg font-black">Orders</h1>
                <div className="relative flex-1 max-w-xs">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search #FOD..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 bg-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-1.5 bg-white p-1 rounded-2xl border border-gray-200">
                {[
                  { id: 'new', label: `New (${orders.filter((o) => o.status === 'new').length})` },
                  { id: 'preparing', label: `Preparing (${orders.filter((o) => o.status === 'preparing').length})` },
                  { id: 'ready', label: `Ready (${orders.filter((o) => o.status === 'ready').length})` },
                  { id: 'completed', label: 'Completed' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setOrderTab(t.id)}
                    className={`py-2 rounded-xl text-[11px] font-black transition ${
                      orderTab === t.id ? 'bg-[#FFD000] text-black' : 'text-gray-600'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {orders
                  .filter((o) => o.status === orderTab && (!orderSearch || o.id.toLowerCase().includes(orderSearch.toLowerCase())))
                  .map((ord) => {
                    const { itemTotal } = orderTotals(ord);
                    return (
                      <div
                        key={ord.id}
                        onClick={() => { setSelectedOrder(ord); setSubPage('order_detail'); }}
                        className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3 cursor-pointer hover:border-[#FFD000]"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-sm">#{ord.id}</span>
                            <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[9px] font-black uppercase">{ord.status}</span>
                          </div>
                          <span className="text-[11px] text-gray-400">{ord.timeAgo}</span>
                        </div>
                        <div className="text-xs">
                          <span className="font-bold text-gray-900">{ord.items.length} Items · ₹{itemTotal}</span>
                          <p className="text-gray-500 text-[11px]">{ord.customerName} · {ord.address}</p>
                        </div>
                        {ord.status === 'new' && (
                          <div className="grid grid-cols-2 gap-2" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => handleOrderTransition(ord.id, 'rejected')} className="py-2 rounded-xl bg-red-50 text-red-700 font-black text-xs">
                              Reject
                            </button>
                            <button onClick={() => handleOrderTransition(ord.id, 'preparing')} className="py-2 rounded-xl bg-[#FFD000] text-black font-black text-xs">
                              Accept
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* TAB 3: MENU MANAGEMENT */}
          {!subPage && activeTab === 'menu' && (
            <div className="p-4 space-y-3.5">
              <h1 className="text-lg font-black">Menu Management</h1>

              <div className="grid grid-cols-2 gap-2 bg-white p-1.5 rounded-2xl border border-gray-200">
                <button
                  onClick={() => setMenuTab('items')}
                  className={`py-2 rounded-xl text-xs font-black ${menuTab === 'items' ? 'bg-[#FFD000] text-black' : 'text-gray-600'}`}
                >
                  Items
                </button>
                <button
                  onClick={() => setMenuTab('categories')}
                  className={`py-2 rounded-xl text-xs font-black ${menuTab === 'categories' ? 'bg-[#FFD000] text-black' : 'text-gray-600'}`}
                >
                  Categories
                </button>
              </div>

              {menuTab === 'items' ? (
                <>
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      value={menuSearch}
                      onChange={(e) => setMenuSearch(e.target.value)}
                      placeholder="Search food item..."
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-medium"
                    />
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
                    {menuItems
                      .filter((m) => !menuSearch || m.name.toLowerCase().includes(menuSearch.toLowerCase()))
                      .map((item) => (
                        <div key={item.id} className="p-3.5 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover bg-gray-100" />
                            <div>
                              <h4 className="font-black text-xs text-gray-900">{item.name}</h4>
                              <span className="text-xs font-bold text-gray-600">₹{item.price}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={item.available}
                              onChange={() => setMenuItems((p) => p.map((x) => (x.id === item.id ? { ...x, available: !x.available } : x)))}
                              className="w-4 h-4 accent-emerald-600"
                            />
                            <button
                              onClick={() => { setEditingItem(item); setSubPage('item_form'); }}
                              className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setMenuItems((p) => p.filter((x) => x.id !== item.id));
                                showToast('Item deleted');
                              }}
                              className="p-1.5 rounded-lg bg-red-50 text-red-600"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>

                  <button
                    onClick={() => {
                      setEditingItem({ name: '', category: 'Biryani', price: 199, offerPrice: 179, isVeg: false, available: true, description: '', image: '' });
                      setSubPage('item_form');
                    }}
                    className="w-full py-3.5 rounded-2xl bg-[#FFD000] text-black font-black text-xs shadow-md"
                  >
                    + Add New Item
                  </button>
                </>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-black text-xs">Food Categories</h3>
                    <button
                      onClick={() => {
                        const name = window.prompt('Category Name:');
                        if (name) setCategories((p) => [...p, { id: 'c_' + Date.now(), name, enabled: true }]);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#FFD000] text-black font-black text-xs"
                    >
                      + Add Category
                    </button>
                  </div>
                  {categories.map((c) => (
                    <div key={c.id} className="p-3 rounded-xl bg-gray-50 border flex justify-between items-center text-xs font-bold">
                      <span>{c.name}</span>
                      <button onClick={() => setCategories((p) => p.filter((x) => x.id !== c.id))} className="text-red-600">Delete</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: WALLET */}
          {!subPage && activeTab === 'wallet' && (
            <div className="p-4 space-y-4">
              <h1 className="text-lg font-black">Wallet</h1>

              <div className="bg-yellow-50 border-2 border-[#FFD000] p-5 rounded-3xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-600 block">Available Balance</span>
                  <p className="text-3xl font-black text-gray-900 mt-1">₹{restaurant.walletBalance.toLocaleString('en-IN')}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFD000] text-black flex items-center justify-center text-2xl">
                  💳
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowWithdraw(true)}
                  className="py-3 rounded-2xl bg-white border border-gray-200 font-black text-xs hover:border-[#FFD000]"
                >
                  🏦 Withdraw
                </button>
                <button
                  onClick={() => setSubPage('reports')}
                  className="py-3 rounded-2xl bg-white border border-gray-200 font-black text-xs hover:border-[#FFD000]"
                >
                  🕒 Transaction History
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-2.5 text-xs">
                <h3 className="font-black text-gray-900">Earnings Summary</h3>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Today&apos;s Earnings</span><span className="font-black">₹4,320</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">This Week</span><span className="font-black">₹28,450</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-500">This Month</span><span className="font-black">₹1,24,760</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PROFILE */}
          {!subPage && activeTab === 'profile' && (
            <div className="p-4 space-y-4">
              <h1 className="text-lg font-black">Profile</h1>

              <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center gap-3">
                <img src="/images/food-biryani.jpg" alt="Paradise" className="w-14 h-14 rounded-2xl object-cover" />
                <div>
                  <h2 className="font-black text-sm text-gray-900 flex items-center gap-1.5">
                    <span>{restaurant.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </h2>
                  <p className="text-xs text-gray-500">Restaurant ID: {restaurant.code}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
                {[
                  { label: 'Restaurant Details & Settings', action: () => setSubPage('settings') },
                  { label: 'Business Documents (FSSAI / GST)', badge: '✓ Verified', action: () => showToast('FSSAI & GST Verified') },
                  { label: 'Bank & Payout Details', action: () => setShowWithdraw(true) },
                  { label: 'Reports & Analytics', action: () => setSubPage('reports') },
                  { label: 'Staff Management', action: () => setSubPage('staff') },
                  { label: 'Offers & Promotions', action: () => setSubPage('offers') },
                  { label: 'Customer Ratings & Reviews', action: () => setSubPage('reviews') },
                  { label: 'Help & Support', action: () => setSubPage('support') }
                ].map((row) => (
                  <button
                    key={row.label}
                    onClick={row.action}
                    className="w-full p-3.5 flex items-center justify-between text-xs font-bold hover:bg-gray-50"
                  >
                    <span>{row.label}</span>
                    <div className="flex items-center gap-2">
                      {row.badge && <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{row.badge}</span>}
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#10151F] border-t border-white/10 px-2 py-1.5 flex items-center justify-around z-40">
        {navTabs.map((t) => {
          const Icon = t.icon;
          const active = activeTab === t.id && !subPage;
          return (
            <button
              key={t.id}
              onClick={() => { setSubPage(null); setActiveTab(t.id); }}
              className={`flex flex-col items-center px-3 py-1.5 rounded-2xl transition ${
                active ? 'bg-[#FFD000] text-black font-black' : 'text-gray-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">{t.label}</span>
            </button>
          );
        })}
      </nav>

      {/* WITHDRAW MODAL */}
      {showWithdraw && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="font-black text-sm">Vendor Wallet Withdrawal</h3>
              <button onClick={() => setShowWithdraw(false)}><X className="w-4 h-4" /></button>
            </div>
            <p className="text-xs text-gray-500">Available: <strong>₹{restaurant.walletBalance}</strong></p>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full p-3 rounded-xl border text-lg font-black"
            />
            <button
              onClick={async () => {
                const amt = Number(withdrawAmount);
                if (!amt || amt > restaurant.walletBalance) return showToast('Invalid or insufficient balance');
                await apiRequest(`/vendor/${restaurant.id}/withdraw`, {
                  method: 'POST',
                  body: JSON.stringify({ amount: amt, method: 'HDFC Bank' })
                });
                setRestaurant((p) => ({ ...p, walletBalance: p.walletBalance - amt }));
                setShowWithdraw(false);
                showToast(`₹${amt} withdrawal requested!`);
              }}
              className="w-full py-3 rounded-2xl bg-[#FFD000] text-black font-black text-xs"
            >
              Confirm Withdrawal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorPanel;
