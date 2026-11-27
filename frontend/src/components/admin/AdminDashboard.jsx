import React, { useState, useEffect } from 'react';
import {
  Users, Bike, TrendingUp, Package, Utensils, ShieldCheck,
  Sliders, Tag, Bell, Plus, Edit3, Trash2, Upload, Image as ImageIcon,
  MessageSquare, CreditCard, Check, X, RefreshCw, Copy, ExternalLink
} from 'lucide-react';
import {
  apiRequest,
  uploadMediaToS3,
  listS3Media,
  deleteS3Media,
  openRazorpayCheckout
} from '../../services/api';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // --- STATE FOR ALL SECTIONS ---
  const [partnersList, setPartnersList] = useState([
    { id: 'ptn_ramesh', name: 'Ramesh K', phone: '+91 98480 12345', vehicle: 'Bike (TS 08 EA 4521)', status: 'approved', trips: 2341, rating: 4.8, docs: 'Aadhaar, DL, RC, Bank' },
    { id: 'ptn_suresh', name: 'Suresh Reddy', phone: '+91 97000 54321', vehicle: 'Auto (TS 07 UA 8899)', status: 'approved', trips: 1820, rating: 4.7, docs: 'Aadhaar, DL, RC, Bank' },
    { id: 'ptn_praveen', name: 'Praveen Kumar', phone: '+91 91234 56789', vehicle: 'Bike (TS 08 FC 3321)', status: 'pending', trips: 940, rating: 4.6, docs: 'Aadhaar (Review), DL' }
  ]);

  const [usersList, setUsersList] = useState([
    { id: 'usr_srilatha', name: 'Sri Latha', phone: '+91 98765 43210', email: 'srilatha@example.com', rides: 42, walletBalance: 850, status: 'active' },
    { id: 'usr_anil', name: 'Anil Kumar', phone: '+91 99887 65432', email: 'anil.k@example.com', rides: 18, walletBalance: 320, status: 'active' }
  ]);

  const [restaurantsList, setRestaurantsList] = useState([
    { id: 'rest_paradise', name: 'Paradise Biryani', cuisines: 'Biryani, Hyderabadi', rating: 4.5, deliveryTime: '30-40 min', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop&q=80', isOpen: true },
    { id: 'rest_dominos', name: "Domino's Pizza", cuisines: 'Pizza, Italian', rating: 4.3, deliveryTime: '25-35 min', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80', isOpen: true }
  ]);

  const [ordersList, setOrdersList] = useState([
    { id: 'ord_98412', type: 'food', customer: 'Sri Latha', title: 'Paradise Biryani (2 items)', amount: 598, status: 'arriving' },
    { id: 'ride_77101', type: 'ride', customer: 'Anil Kumar', title: 'Miyapur → Hitec City (Bike)', amount: 68, status: 'completed' },
    { id: 'pcl_55410', type: 'parcel', customer: 'Priya Sharma', title: 'Gachibowli → Madhapur (2kg)', amount: 85, status: 'in_transit' }
  ]);

  const [pricingRules, setPricingRules] = useState([
    { id: 'bike', name: 'Bike Ride', baseFare: 25, perKm: 8, surge: 1.0, commission: 15 },
    { id: 'auto', name: 'Auto Rickshaw', baseFare: 35, perKm: 12, surge: 1.0, commission: 15 },
    { id: 'cab', name: 'Cab / Sedan', baseFare: 60, perKm: 16, surge: 1.0, commission: 18 },
    { id: 'parcel', name: 'Parcel Small (≤ 1kg)', baseFare: 40, perKm: 9, surge: 1.0, commission: 15 }
  ]);

  const [couponsList, setCouponsList] = useState([
    { id: 'cpn_1', code: 'VRIDE20', discount: '20% OFF', category: 'Food', active: true },
    { id: 'cpn_2', code: 'FIRST50', discount: 'Flat ₹50 OFF', category: 'Rides', active: true }
  ]);

  const [bannersList, setBannersList] = useState([
    { id: 'bnr_1', title: 'Flat 20% OFF on Food', code: 'VRIDE20', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80', active: true }
  ]);

  const [ticketsList, setTicketsList] = useState([
    { id: 'tkt_1', userName: 'Sri Latha', category: 'Food Order', subject: 'Extra raita request', message: 'Please confirm order note.', status: 'open', adminReply: '' }
  ]);

  const [payoutsList, setPayoutsList] = useState([
    { id: 'pay_1', partner: 'Ramesh K', amount: 1500, bank: 'HDFC - 501004829103', date: '26 Nov 2026', status: 'approved' },
    { id: 'pay_2', partner: 'Suresh Reddy', amount: 1200, bank: 'SBI - 20391827461', date: '27 Nov 2026', status: 'pending' }
  ]);

  const [transactionsList, setTransactionsList] = useState([
    { id: 'tx_1', title: 'Wallet Top Up via Razorpay', amount: 1000, status: 'paid', date: '27 Nov 2026' }
  ]);

  // AWS S3 Media State
  const [s3Media, setS3Media] = useState([]);
  const [s3Loading, setS3Loading] = useState(false);
  const [s3Folder, setS3Folder] = useState('vride-media');

  // Broadcast
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastTarget, setBroadcastTarget] = useState('all');

  // Generic Modal for Add / Edit
  const [modalState, setModalState] = useState({ open: false, section: '', mode: 'add', data: {} });
  const [uploadingModalImg, setUploadingModalImg] = useState(false);

  // Sync with backend on mount
  const fetchBackendData = async () => {
    const [allRes, ordersRes, ticketsRes, txRes] = await Promise.all([
      apiRequest('/admin/all-data'),
      apiRequest('/admin/orders'),
      apiRequest('/support/tickets'),
      apiRequest('/payments/transactions')
    ]);
    if (allRes?.success && allRes.data) {
      if (allRes.data.partners?.length) setPartnersList(allRes.data.partners);
      if (allRes.data.users?.length) setUsersList(allRes.data.users);
      if (allRes.data.restaurants?.length) setRestaurantsList(allRes.data.restaurants);
      if (allRes.data.pricingRules?.length) setPricingRules(allRes.data.pricingRules);
      if (allRes.data.coupons?.length) setCouponsList(allRes.data.coupons);
      if (allRes.data.banners?.length) setBannersList(allRes.data.banners);
      if (allRes.data.payouts?.length) setPayoutsList(allRes.data.payouts);
    }
    if (ordersRes?.success && ordersRes.data) {
      const combined = [
        ...(ordersRes.data.rides || []).map((r) => ({ id: r.id, type: 'ride', customer: 'Customer', title: `${r.pickup} → ${r.drop}`, amount: r.fare || 68, status: r.status || 'completed' })),
        ...(ordersRes.data.foodOrders || []).map((f) => ({ id: f.id, type: 'food', customer: 'Customer', title: f.restaurantName || 'Food Order', amount: f.total || 299, status: f.status || 'placed' })),
        ...(ordersRes.data.parcels || []).map((p) => ({ id: p.id, type: 'parcel', customer: 'Customer', title: `${p.pickup} → ${p.drop}`, amount: p.fare || 85, status: p.status || 'booked' }))
      ];
      if (combined.length) setOrdersList(combined);
    }
    if (ticketsRes?.success && ticketsRes.data?.length) setTicketsList(ticketsRes.data);
    if (txRes?.success && txRes.data?.length) setTransactionsList(txRes.data);
  };

  const fetchS3Media = async () => {
    setS3Loading(true);
    const res = await listS3Media();
    setS3Loading(false);
    if (res?.success && res.data?.items) {
      setS3Media(res.data.items);
    }
  };

  useEffect(() => {
    fetchBackendData();
    fetchS3Media();
  }, []);

  // --- AWS S3 DIRECT UPLOAD HANDLER ---
  const handleS3FileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setS3Loading(true);
    const res = await uploadMediaToS3(file, s3Folder);
    setS3Loading(false);
    if (res?.success && res.data) {
      setS3Media((prev) => [res.data, ...prev]);
      showToast(`Uploaded "${file.name}" to AWS S3 (aitacademy)!`);
    } else {
      showToast('Start backend (port 5000) for live AWS S3 upload.');
    }
  };

  const handleS3Delete = async (key) => {
    const res = await deleteS3Media(key);
    if (res?.success) {
      setS3Media((prev) => prev.filter((item) => item.key !== key));
      showToast(`Deleted "${key}" from AWS S3`);
    } else {
      showToast('Failed to delete from S3 (ensure backend is running).');
    }
  };

  // --- MODAL IMAGE UPLOAD TO S3 ---
  const handleModalImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingModalImg(true);
    const res = await uploadMediaToS3(file, `admin-${modalState.section}`);
    setUploadingModalImg(false);
    const url = res?.success ? res.data.url : URL.createObjectURL(file);
    setModalState((prev) => ({
      ...prev,
      data: { ...prev.data, image: url }
    }));
    showToast(res?.success ? 'Image uploaded to AWS S3!' : 'Preview image attached');
  };

  // --- SAVE ADD/EDIT MODAL ---
  const handleSaveModal = async (e) => {
    e.preventDefault();
    const { section, mode, data } = modalState;

    const endpointMap = {
      partners: '/admin/partners',
      users: '/admin/users',
      restaurants: '/admin/restaurants',
      pricing: '/admin/pricing-rules',
      coupons: '/admin/coupons',
      banners: '/admin/banners'
    };

    const ep = endpointMap[section];
    let savedItem = { ...data, id: data.id || `${section.slice(0, 3)}_${Date.now()}` };

    if (ep) {
      const res = await apiRequest(mode === 'add' ? ep : `${ep}/${data.id}`, {
        method: mode === 'add' ? 'POST' : 'PUT',
        body: JSON.stringify(savedItem)
      });
      if (res?.success && res.data) savedItem = res.data;
    }

    const updateStateList = (setter) => {
      if (mode === 'add') setter((prev) => [savedItem, ...prev]);
      else setter((prev) => prev.map((item) => (item.id === savedItem.id ? savedItem : item)));
    };

    if (section === 'partners') updateStateList(setPartnersList);
    if (section === 'users') updateStateList(setUsersList);
    if (section === 'restaurants') updateStateList(setRestaurantsList);
    if (section === 'pricing') updateStateList(setPricingRules);
    if (section === 'coupons') updateStateList(setCouponsList);
    if (section === 'banners') updateStateList(setBannersList);

    setModalState({ open: false, section: '', mode: 'add', data: {} });
    showToast(`${mode === 'add' ? 'Added' : 'Updated'} successfully!`);
  };

  // --- DELETE HANDLER FOR ANY SECTION ---
  const handleDelete = async (section, id, setter, endpoint) => {
    if (!window.confirm('Delete this item?')) return;
    await apiRequest(`${endpoint}/${id}`, { method: 'DELETE' });
    setter((prev) => prev.filter((item) => item.id !== id));
    showToast('Deleted successfully');
  };

  // --- SUPPORT TICKET REPLY / STATUS ---
  const handleUpdateTicket = async (id, status, adminReply) => {
    await apiRequest(`/support/tickets/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status, adminReply })
    });
    setTicketsList((prev) => prev.map((t) => (t.id === id ? { ...t, status, adminReply } : t)));
    showToast(`Ticket marked ${status}`);
  };

  const navItems = [
    { id: 'overview', label: 'Overview & Management', icon: TrendingUp },
    { id: 'media', label: 'AWS S3 Media Manager', icon: ImageIcon },
    { id: 'partners', label: 'Partners & KYC', icon: Bike },
    { id: 'users', label: 'Customer Users', icon: Users },
    { id: 'restaurants', label: 'Restaurants & Menu', icon: Utensils },
    { id: 'orders', label: 'Orders Management', icon: Package },
    { id: 'pricing', label: 'Pricing & Surge', icon: Sliders },
    { id: 'cms', label: 'Coupons & Banners', icon: Tag },
    { id: 'support', label: 'Support Panel', icon: MessageSquare },
    { id: 'payouts', label: 'Payouts & Razorpay', icon: CreditCard },
    { id: 'broadcast', label: 'Broadcast Push', icon: Bell }
  ];

  return (
    <div className="w-full min-h-screen bg-[#f3f4f6] text-gray-900 flex flex-col select-none">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-black text-[#FFD600] px-4 py-2.5 rounded-2xl shadow-xl text-xs font-black border border-[#FFD600]/40 animate-fadeIn">
          {toast}
        </div>
      )}

      {/* Top Navbar */}
      <div className="bg-[#0b0e14] text-white px-5 py-3 flex items-center justify-between border-b-2 border-[#FFD600] sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FFD600] text-black flex items-center justify-center font-black">
            V
          </div>
          <div>
            <h1 className="text-sm font-black tracking-wider flex items-center gap-2">
              <span>SUPER ADMIN & MANAGEMENT PANEL</span>
              <span className="text-[10px] bg-[#FFD600] text-black px-1.5 py-0.5 rounded font-black">
                AWS S3 + RAZORPAY
              </span>
            </h1>
            <p className="text-[11px] text-gray-400">Bucket: aitacademy (ap-south-2) · Full CRUD Operations</p>
          </div>
        </div>

        <button
          onClick={() => { fetchBackendData(); fetchS3Media(); showToast('Synced with backend & AWS S3'); }}
          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#FFD600]" />
          <span className="hidden sm:inline">Sync All</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition ${
                  active ? 'bg-[#FFD600] text-black shadow-xs' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 space-y-5 overflow-y-auto">
          {/* 1. OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Total Orders</span>
                  <p className="text-2xl font-black mt-1">{ordersList.length + 240}</p>
                  <span className="text-[10px] text-emerald-600 font-bold">Rides · Food · Parcel</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Active Partners</span>
                  <p className="text-2xl font-black mt-1">{partnersList.length}</p>
                  <span className="text-[10px] text-blue-600 font-bold">Verified Fleet</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">S3 Media Files</span>
                  <p className="text-2xl font-black mt-1">{s3Media.length}</p>
                  <span className="text-[10px] text-amber-600 font-bold">aitacademy (ap-south-2)</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Open Tickets</span>
                  <p className="text-2xl font-black mt-1">{ticketsList.filter((t) => t.status !== 'resolved').length}</p>
                  <span className="text-[10px] text-purple-600 font-bold">Support Panel</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-black text-sm text-gray-900">Quick Actions</h3>
                  <p className="text-xs text-gray-500">Upload media to AWS S3 or test Razorpay checkout directly.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('media')}
                    className="px-3.5 py-2 rounded-xl bg-black text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#FFD600]" />
                    <span>Upload to S3</span>
                  </button>
                  <button
                    onClick={() => openRazorpayCheckout({
                      amount: 100,
                      name: 'V RIDE Admin Test',
                      description: 'Razorpay Gateway Verification',
                      onSuccess: (r) => showToast(`Razorpay Verified: ${r.paymentId}`),
                      onFailure: (err) => showToast(err)
                    })}
                    className="px-3.5 py-2 rounded-xl bg-[#FFD600] text-black text-xs font-black flex items-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Test Razorpay (₹100)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. AWS S3 MEDIA MANAGER */}
          {activeTab === 'media' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-black text-sm text-gray-900">AWS S3 Media Manager (`aitacademy`)</h2>
                  <p className="text-xs text-gray-500">Upload, preview, copy public URLs, or delete files directly in S3.</p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={s3Folder}
                    onChange={(e) => setS3Folder(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold bg-gray-50"
                  >
                    <option value="vride-media">vride-media/</option>
                    <option value="restaurants">restaurants/</option>
                    <option value="banners">banners/</option>
                    <option value="partner-kyc">partner-kyc/</option>
                  </select>

                  <label className="px-4 py-2 rounded-xl bg-[#FFD600] text-black font-black text-xs cursor-pointer flex items-center gap-1.5 hover:bg-yellow-400">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{s3Loading ? 'Uploading...' : 'Upload New Media'}</span>
                    <input type="file" onChange={handleS3FileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {s3Media.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-dashed border-gray-300 text-center space-y-2">
                  <ImageIcon className="w-8 h-8 text-gray-400 mx-auto" />
                  <p className="text-xs font-bold text-gray-700">No files loaded from S3 yet</p>
                  <p className="text-[11px] text-gray-400">Make sure the backend (`npm start` in `backend/`) is running and upload your first image above.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {s3Media.map((file) => (
                    <div key={file.key} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs flex flex-col">
                      <div className="h-36 bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img src={file.url} alt={file.key} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                      </div>
                      <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-xs font-bold text-gray-900 truncate">{file.key}</p>
                          <p className="text-[10px] text-gray-400">{file.size ? `${Math.round(file.size / 1024)} KB` : 'S3 Object'}</p>
                        </div>
                        <div className="flex items-center gap-1.5 pt-1">
                          <button
                            onClick={() => { navigator.clipboard?.writeText(file.url); showToast('Copied S3 URL!'); }}
                            className="flex-1 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-[11px] font-bold flex items-center justify-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copy URL</span>
                          </button>
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleS3Delete(file.key)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. PARTNERS & KYC (ADD / EDIT / APPROVE / DELETE) */}
          {activeTab === 'partners' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-black text-sm">Driver Partners & KYC Management</h2>
                <button
                  onClick={() => setModalState({ open: true, section: 'partners', mode: 'add', data: { name: '', phone: '', vehicle: '', status: 'approved', docs: 'Aadhaar, DL' } })}
                  className="px-3 py-1.5 rounded-xl bg-[#FFD600] text-black font-black text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Partner</span>
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {partnersList.map((p) => (
                  <div key={p.id} className="p-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-xs text-gray-900">{p.name}</span>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${p.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-800'}`}>
                          {p.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500">{p.phone} · {p.vehicle} · Docs: {p.docs}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {p.status !== 'approved' && (
                        <button
                          onClick={async () => {
                            await apiRequest(`/admin/partners/${p.id}`, { method: 'PUT', body: JSON.stringify({ status: 'approved' }) });
                            setPartnersList((prev) => prev.map((x) => (x.id === p.id ? { ...x, status: 'approved' } : x)));
                            showToast(`${p.name} approved`);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => setModalState({ open: true, section: 'partners', mode: 'edit', data: p })}
                        className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete('partners', p.id, setPartnersList, '/admin/partners')}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. CUSTOMER USERS (ADD / EDIT / BLOCK / DELETE) */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-black text-sm">Customer Users Management</h2>
                <button
                  onClick={() => setModalState({ open: true, section: 'users', mode: 'add', data: { name: '', phone: '', email: '', walletBalance: 0, status: 'active' } })}
                  className="px-3 py-1.5 rounded-xl bg-[#FFD600] text-black font-black text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add User</span>
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {usersList.map((u) => (
                  <div key={u.id} className="p-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-xs">{u.name}</span>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${u.status === 'blocked' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {u.status || 'active'}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500">{u.phone} · {u.email} · Wallet: ₹{u.walletBalance || 0}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={async () => {
                          const next = u.status === 'blocked' ? 'active' : 'blocked';
                          await apiRequest(`/admin/users/${u.id}`, { method: 'PUT', body: JSON.stringify({ status: next }) });
                          setUsersList((prev) => prev.map((x) => (x.id === u.id ? { ...x, status: next } : x)));
                        }}
                        className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-[11px] font-bold"
                      >
                        {u.status === 'blocked' ? 'Unblock' : 'Block'}
                      </button>
                      <button
                        onClick={() => setModalState({ open: true, section: 'users', mode: 'edit', data: u })}
                        className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete('users', u.id, setUsersList, '/admin/users')}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. RESTAURANTS & MENU (ADD / EDIT / UPLOAD S3 IMAGE / DELETE) */}
          {activeTab === 'restaurants' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-black text-sm">Restaurants & Menu Management</h2>
                <button
                  onClick={() => setModalState({ open: true, section: 'restaurants', mode: 'add', data: { name: '', cuisines: '', rating: 4.5, deliveryTime: '30 min', image: '', isOpen: true } })}
                  className="px-3 py-1.5 rounded-xl bg-[#FFD600] text-black font-black text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Restaurant</span>
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {restaurantsList.map((r) => (
                  <div key={r.id} className="p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={r.image || '/images/food-biryani.jpg'} alt={r.name} className="w-12 h-12 rounded-xl object-cover bg-gray-100" />
                      <div>
                        <h4 className="font-black text-xs text-gray-900">{r.name}</h4>
                        <p className="text-[11px] text-gray-500">{Array.isArray(r.cuisines) ? r.cuisines.join(', ') : r.cuisines} · ★ {r.rating} · {r.deliveryTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setModalState({ open: true, section: 'restaurants', mode: 'edit', data: { ...r, cuisines: Array.isArray(r.cuisines) ? r.cuisines.join(', ') : r.cuisines } })}
                        className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete('restaurants', r.id, setRestaurantsList, '/admin/restaurants')}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. ORDERS MANAGEMENT (UPDATE STATUS / DELETE) */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-black text-sm">All Rides, Food & Parcel Orders</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {ordersList.map((o) => (
                  <div key={o.id} className="p-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-yellow-100 text-yellow-900 mr-2">{o.type}</span>
                      <span className="font-black text-xs text-gray-900">{o.title}</span>
                      <p className="text-[11px] text-gray-500 mt-0.5">ID: {o.id} · ₹{o.amount}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={o.status}
                        onChange={async (e) => {
                          const status = e.target.value;
                          await apiRequest(`/admin/orders/${o.type}/${o.id}`, { method: 'PUT', body: JSON.stringify({ status }) });
                          setOrdersList((prev) => prev.map((x) => (x.id === o.id ? { ...x, status } : x)));
                          showToast('Order status updated');
                        }}
                        className="px-2.5 py-1 rounded-lg border border-gray-200 text-xs font-bold bg-gray-50"
                      >
                        <option value="placed">Placed</option>
                        <option value="arriving">Arriving</option>
                        <option value="in_transit">In Transit</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button
                        onClick={async () => {
                          await apiRequest(`/admin/orders/${o.type}/${o.id}`, { method: 'DELETE' });
                          setOrdersList((prev) => prev.filter((x) => x.id !== o.id));
                          showToast('Order deleted');
                        }}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. PRICING & SURGE (ADD / EDIT / DELETE) */}
          {activeTab === 'pricing' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-black text-sm">Pricing & Surge Rules</h2>
                <button
                  onClick={() => setModalState({ open: true, section: 'pricing', mode: 'add', data: { name: '', baseFare: 30, perKm: 10, surge: 1.0, commission: 15 } })}
                  className="px-3 py-1.5 rounded-xl bg-[#FFD600] text-black font-black text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Rule</span>
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {pricingRules.map((rule) => (
                  <div key={rule.id} className="p-4 flex items-center justify-between gap-3">
                    <div>
                      <h4 className="font-black text-xs text-gray-900">{rule.name}</h4>
                      <p className="text-[11px] text-gray-500">Base: ₹{rule.baseFare} · Per Km: ₹{rule.perKm} · Surge: {rule.surge}x · Comm: {rule.commission}%</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setModalState({ open: true, section: 'pricing', mode: 'edit', data: rule })}
                        className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete('pricing', rule.id, setPricingRules, '/admin/pricing-rules')}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. COUPONS & BANNERS (ADD / EDIT / S3 BANNER UPLOAD / DELETE) */}
          {activeTab === 'cms' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-black text-sm">Promo Coupons</h2>
                  <button
                    onClick={() => setModalState({ open: true, section: 'coupons', mode: 'add', data: { code: '', discount: '20% OFF', category: 'All', active: true } })}
                    className="px-3 py-1.5 rounded-xl bg-[#FFD600] text-black font-black text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Coupon</span>
                  </button>
                </div>
                <div className="divide-y divide-gray-100">
                  {couponsList.map((c) => (
                    <div key={c.id} className="p-4 flex items-center justify-between">
                      <div>
                        <span className="font-black text-xs text-black bg-yellow-100 px-2 py-0.5 rounded">{c.code}</span>
                        <span className="text-xs font-bold text-gray-700 ml-2">{c.discount} ({c.category})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => setModalState({ open: true, section: 'coupons', mode: 'edit', data: c })} className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDelete('coupons', c.id, setCouponsList, '/admin/coupons')} className="p-1.5 rounded-lg bg-red-50 text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-black text-sm">Promo Banners (S3 Hosted)</h2>
                  <button
                    onClick={() => setModalState({ open: true, section: 'banners', mode: 'add', data: { title: '', code: '', image: '', active: true } })}
                    className="px-3 py-1.5 rounded-xl bg-[#FFD600] text-black font-black text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload Banner</span>
                  </button>
                </div>
                <div className="divide-y divide-gray-100">
                  {bannersList.map((b) => (
                    <div key={b.id} className="p-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={b.image || '/images/service-food.jpg'} alt={b.title} className="w-16 h-10 rounded-lg object-cover bg-gray-100" />
                        <div>
                          <h4 className="font-black text-xs">{b.title}</h4>
                          <p className="text-[11px] text-gray-500">Code: {b.code}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => setModalState({ open: true, section: 'banners', mode: 'edit', data: b })} className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDelete('banners', b.id, setBannersList, '/admin/banners')} className="p-1.5 rounded-lg bg-red-50 text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 9. SUPPORT PANEL (REPLY / RESOLVE / DELETE) */}
          {activeTab === 'support' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-black text-sm">Support Panel — Live Customer & Partner Tickets</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {ticketsList.map((t) => (
                  <div key={t.id} className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-black text-xs text-gray-900">{t.subject}</span>
                        <span className="text-[10px] text-gray-500 ml-2">by {t.userName || 'Customer'} ({t.category})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${t.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-800'}`}>
                          {t.status}
                        </span>
                        <button
                          onClick={() => handleDelete('tickets', t.id, setTicketsList, '/support/tickets')}
                          className="p-1 rounded-lg bg-red-50 text-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">{t.message}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const reply = window.prompt('Enter support reply:', t.adminReply || 'Issue resolved, wallet credited.');
                          if (reply !== null) handleUpdateTicket(t.id, 'resolved', reply);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-bold"
                      >
                        Reply & Resolve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. PAYOUTS & RAZORPAY TRANSACTIONS */}
          {activeTab === 'payouts' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-black text-sm">Partner Payout Requests</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {payoutsList.map((p) => (
                    <div key={p.id} className="p-4 flex items-center justify-between">
                      <div>
                        <span className="font-black text-xs">{p.partner} · ₹{p.amount}</span>
                        <p className="text-[11px] text-gray-500">{p.bank} · {p.date}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {p.status === 'pending' && (
                          <button
                            onClick={async () => {
                              await apiRequest(`/admin/payouts/${p.id}`, { method: 'PUT', body: JSON.stringify({ status: 'approved' }) });
                              setPayoutsList((prev) => prev.map((x) => (x.id === p.id ? { ...x, status: 'approved' } : x)));
                              showToast('Payout approved');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold"
                          >
                            Approve
                          </button>
                        )}
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${p.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-800'}`}>
                          {p.status}
                        </span>
                        <button onClick={() => handleDelete('payouts', p.id, setPayoutsList, '/admin/payouts')} className="p-1.5 rounded-lg bg-red-50 text-red-600">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="font-black text-sm">Razorpay Payment Transactions</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {transactionsList.map((tx) => (
                    <div key={tx.id} className="p-4 flex items-center justify-between">
                      <div>
                        <span className="font-black text-xs">{tx.title}</span>
                        <p className="text-[11px] text-gray-500">{tx.date} · {tx.razorpayPaymentId || tx.id}</p>
                      </div>
                      <span className="font-black text-xs text-emerald-700">₹{tx.amount} ({tx.status || 'paid'})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 11. BROADCAST PUSH */}
          {activeTab === 'broadcast' && (
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-3 max-w-lg">
              <h2 className="font-black text-sm">Send System Broadcast</h2>
              <select
                value={broadcastTarget}
                onChange={(e) => setBroadcastTarget(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-bold"
              >
                <option value="all">All Customers & Partners</option>
                <option value="customers">Customers Only</option>
                <option value="partners">Partners Only</option>
              </select>
              <textarea
                rows={3}
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="Write announcement..."
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs"
              />
              <button
                onClick={async () => {
                  if (!broadcastMessage.trim()) return;
                  await apiRequest('/admin/broadcast', {
                    method: 'POST',
                    body: JSON.stringify({ target: broadcastTarget, message: broadcastMessage })
                  });
                  setBroadcastMessage('');
                  showToast('Broadcast sent!');
                }}
                className="px-4 py-2.5 rounded-xl bg-[#FFD600] text-black font-black text-xs"
              >
                Send Broadcast Notification
              </button>
            </div>
          )}
        </main>
      </div>

      {/* GENERIC ADD / EDIT MODAL */}
      {modalState.open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveModal} className="bg-white rounded-3xl max-w-md w-full p-5 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-black text-sm uppercase">
                {modalState.mode === 'add' ? 'Add New' : 'Edit'} {modalState.section}
              </h3>
              <button type="button" onClick={() => setModalState({ open: false, section: '', mode: 'add', data: {} })} className="p-1 rounded-full bg-gray-100">
                <X className="w-4 h-4" />
              </button>
            </div>

            {Object.keys(modalState.data).map((field) => {
              if (field === 'id' || field === 'createdAt' || field === 'updatedAt' || field === 'isOpen' || field === 'active') return null;
              if (field === 'image') {
                return (
                  <div key={field} className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-gray-500 block">Image (AWS S3 or URL)</label>
                    <input
                      type="text"
                      value={modalState.data[field] || ''}
                      onChange={(e) => setModalState((prev) => ({ ...prev, data: { ...prev.data, image: e.target.value } }))}
                      placeholder="https://aitacademy.s3.ap-south-2.amazonaws.com/..."
                      className="w-full p-2 rounded-xl border border-gray-200 text-xs"
                    />
                    <label className="flex items-center justify-center gap-1.5 p-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 text-xs font-bold cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingModalImg ? 'Uploading to S3...' : 'Upload Image to AWS S3'}</span>
                      <input type="file" accept="image/*" onChange={handleModalImageUpload} className="hidden" />
                    </label>
                  </div>
                );
              }
              return (
                <div key={field}>
                  <label className="text-[10px] font-bold uppercase text-gray-500 block mb-0.5">{field}</label>
                  <input
                    type={typeof modalState.data[field] === 'number' ? 'number' : 'text'}
                    step="any"
                    value={modalState.data[field] ?? ''}
                    onChange={(e) => setModalState((prev) => ({
                      ...prev,
                      data: {
                        ...prev.data,
                        [field]: typeof modalState.data[field] === 'number' ? Number(e.target.value) : e.target.value
                      }
                    }))}
                    required
                    className="w-full p-2 rounded-xl border border-gray-200 text-xs font-medium"
                  />
                </div>
              );
            })}

            <button type="submit" className="w-full py-3 rounded-2xl bg-[#FFD600] text-black font-black text-xs">
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
