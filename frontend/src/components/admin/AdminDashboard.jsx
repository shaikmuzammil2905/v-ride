import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Radio, Users, Utensils, Bike, ShoppingBag, Package, Car,
  Wallet, FileBarChart, MessageSquare, ShieldCheck, Settings, History,
  Search, Bell, Menu, X, Plus, Edit3, Trash2,
  CheckCircle2, Download, Phone, RefreshCw, LogOut
} from 'lucide-react';
import MapComponent from '../common/MapComponent';
import { apiRequest } from '../../services/api';

export const AdminDashboard = ({ onLogout }) => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityFilter, setCityFilter] = useState('Hyderabad');
  const [globalSearch, setGlobalSearch] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // --- DATA STATES ---
  const [customers, setCustomers] = useState([
    { id: 'CUS101', name: 'Sri Latha', phone: '+91 98765 43210', email: 'srilatha@example.com', city: 'Hyderabad', orders: 43, rides: 128, spent: 18450, status: 'active' },
    { id: 'CUS102', name: 'Anil Kumar', phone: '+91 99887 65432', email: 'anil.k@example.com', city: 'Hyderabad', orders: 19, rides: 34, spent: 6920, status: 'active' },
    { id: 'CUS103', name: 'Kavya R.', phone: '+91 97654 32109', email: 'kavya@example.com', city: 'Hyderabad', orders: 12, rides: 18, spent: 4210, status: 'active' }
  ]);

  const [restaurants, setRestaurants] = useState([
    { id: 'RST101', name: 'Spicy Hub', owner: 'Raghavendra', area: 'Kukatpally', city: 'Hyderabad', cuisine: 'Multi Cuisine', appliedOn: '27 Nov 2026', status: 'pending', docs: ['Food Licence', 'FSSAI', 'GST', 'Bank'] },
    { id: 'RST102', name: 'Green Leaf Kitchen', owner: 'Meena S', area: 'Miyapur', city: 'Hyderabad', cuisine: 'South Indian', appliedOn: '27 Nov 2026', status: 'pending', docs: ['Food Licence', 'FSSAI', 'Bank'] },
    { id: 'RST103', name: 'Paradise Biryani', owner: 'Ali Khan', area: 'Miyapur', city: 'Hyderabad', cuisine: 'Biryani', appliedOn: '20 Nov 2026', status: 'approved', docs: ['Food Licence', 'FSSAI', 'GST', 'Bank'] }
  ]);
  const [restTab, setRestTab] = useState('pending');
  const [selectedRest, setSelectedRest] = useState(null);

  const [riders, setRiders] = useState([
    { id: 'RDR1024', name: 'Raju Kumar', city: 'Hyderabad', phone: '+91 97034 56789', vehicle: 'Bike', vehicleNo: 'TS 09 AB 4321', appliedOn: '27 Nov 2026', services: ['Food', 'Parcel', 'Rides'], status: 'pending', online: true },
    { id: 'RDR1036', name: 'Ramesh K', city: 'Miyapur', phone: '+91 98480 12345', vehicle: 'Bike', vehicleNo: 'TS 08 EA 4521', appliedOn: '27 Nov 2026', services: ['Food', 'Parcel', 'Rides'], status: 'approved', online: true },
    { id: 'RDR1048', name: 'Suresh Reddy', city: 'Kukatpally', phone: '+91 97000 54321', vehicle: 'Auto', vehicleNo: 'TS 07 UA 8899', appliedOn: '26 Nov 2026', services: ['Parcel', 'Rides'], status: 'approved', online: false }
  ]);
  const [riderTab, setRiderTab] = useState('pending');
  const [selectedRider, setSelectedRider] = useState(riders[0]);

  const [foodOrders, setFoodOrders] = useState([
    { id: 'FOD8921', restaurant: 'Paradise Biryani', customer: 'Kavin R.', pickup: 'Madhapur', drop: 'Kukatpally', rider: 'RDR1036', fare: 328, payment: 'Online', status: 'In Progress' },
    { id: 'FOD8920', restaurant: 'Spice Kitchen', customer: 'Anil K.', pickup: 'Miyapur', drop: 'Hitech City', rider: 'RDR1024', fare: 276, payment: 'UPI', status: 'Picked Up' },
    { id: 'FOD8917', restaurant: 'Biryani Stop', customer: 'Sneha M.', pickup: 'Hitech City', drop: 'Gachibowli', rider: '-', fare: 356, payment: 'Online', status: 'Unassigned' }
  ]);
  const [selectedFoodOrder, setSelectedFoodOrder] = useState(foodOrders[0]);

  const [parcels, setParcels] = useState([
    { id: 'PRC7736', sender: 'Sri Latha', receiver: 'Anil Kumar', pickup: 'Miyapur', drop: 'Gachibowli', rider: 'RDR1036', type: 'Documents', amount: 85, payment: 'UPI', status: 'In Transit' },
    { id: 'PRC7720', sender: 'Priya S', receiver: 'Rohit V', pickup: 'Kukatpally', drop: 'Madhapur', rider: '-', type: 'Box (2kg)', amount: 120, payment: 'COD', status: 'Pending' }
  ]);

  const [rides, setRides] = useState([
    { id: 'RDE6642', customer: 'Sri Latha', pickup: 'Miyapur Metro', drop: 'Kukatpally', rider: 'RDR1036', vehicle: 'Bike', fare: 156, payment: 'UPI', status: 'Active' },
    { id: 'RDE6639', customer: 'Kavya R.', pickup: 'Hitech City', drop: 'Jubilee Hills', rider: 'RDR1048', vehicle: 'Auto', fare: 195, payment: 'Cash', status: 'Completed' }
  ]);

  const [financeTab, setFinanceTab] = useState('overview');
  const [payouts, setPayouts] = useState([
    { id: 'WDR101', riderId: 'RDR1036', rider: 'Ramesh K', amount: 1500, method: 'Bank (HDFC)', date: '27 Nov 2026', status: 'Pending' },
    { id: 'WDR102', riderId: 'RDR1048', rider: 'Suresh Reddy', amount: 1200, method: 'UPI', date: '26 Nov 2026', status: 'Approved' }
  ]);
  const [settlements, setSettlements] = useState([
    { id: 'SET901', restaurant: 'Paradise Biryani', period: '20-27 Nov', orders: 142, gross: 68400, commission: 10260, net: 58140, status: 'Pending' }
  ]);
  const [refunds, setRefunds] = useState([
    { id: 'REF401', orderId: 'FOD8914', customer: 'South Food User', amount: 210, reason: 'Restaurant cancelled', method: 'Razorpay UPI', status: 'Pending' }
  ]);

  const [tickets, setTickets] = useState([
    { id: 'ST7482', userType: 'Customer', userName: 'Sri Latha', category: 'Food Orders', subject: 'Order not delivered', priority: 'High', status: 'Open', adminReply: '' },
    { id: 'ST7481', userType: 'Rider', userName: 'Raju Kumar', category: 'Payment', subject: 'Payment not received', priority: 'Medium', status: 'Open', adminReply: '' }
  ]);

  const [adminAccounts, setAdminAccounts] = useState([
    { id: 'ADM1', name: 'Operations Lead', email: 'admin@vride.in', role: 'Super Admin', city: 'All Cities', active: true },
    { id: 'ADM2', name: 'Anand Kumar', email: 'anand.admin@vride.com', role: 'Support Admin', city: 'All Cities', active: true }
  ]);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: 'Support Admin', city: 'All Cities' });

  const [auditLogs, setAuditLogs] = useState([
    { id: 'AUD1', admin: 'Operations Lead', action: 'Approved Restaurant', module: 'Restaurants', record: 'RST103', time: '27 Nov, 11:20 AM' }
  ]);

  const [settings, setSettings] = useState({
    platformName: 'V RIDE',
    supportPhone: '1800-200-8743',
    restaurantCommission: 15,
    riderCommission: 15,
    baseFareBike: 25,
    perKmBike: 8,
    cities: 'Hyderabad, Vijayawada, Guntur'
  });

  // Generic Add/Edit Modal
  const [modal, setModal] = useState({ open: false, type: '', data: {} });

  const syncAll = async () => {
    const [ticketsRes, adminsRes, auditRes, onboardRes] = await Promise.all([
      apiRequest('/support/tickets'),
      apiRequest('/admin/accounts'),
      apiRequest('/admin/audit-logs'),
      apiRequest('/admin/onboarding')
    ]);
    if (ticketsRes?.success && ticketsRes.data?.length) setTickets(ticketsRes.data);
    if (adminsRes?.success && adminsRes.data?.length) setAdminAccounts(adminsRes.data);
    if (auditRes?.success && auditRes.data?.length) setAuditLogs(auditRes.data);

    try {
      const localRest = JSON.parse(localStorage.getItem('vride_onboarding_restaurants') || '[]');
      const apiRest = onboardRes?.success ? (onboardRes.data?.restaurants || []) : [];
      const mergedRest = [...apiRest, ...localRest];
      if (mergedRest.length > 0) {
        setRestaurants((prev) => {
          const seen = new Set(prev.map((x) => x.id));
          const additions = mergedRest.filter((x) => !seen.has(x.id));
          return [...additions, ...prev];
        });
      }

      const localRiders = JSON.parse(localStorage.getItem('vride_onboarding_riders') || '[]');
      const apiRiders = onboardRes?.success ? (onboardRes.data?.riders || []) : [];
      const mergedRiders = [...apiRiders, ...localRiders];
      if (mergedRiders.length > 0) {
        setRiders((prev) => {
          const seen = new Set(prev.map((x) => x.id));
          const additions = mergedRiders.filter((x) => !seen.has(x.id));
          return [...additions, ...prev];
        });
      }
    } catch {
      // ignore localStorage parse errors
    }
  };

  const handleOnboardingDecision = async (type, item, decision) => {
    const targetId = item.targetId || item.id;
    await apiRequest(`/admin/onboarding/${type}/${targetId}/decision`, {
      method: 'PUT',
      body: JSON.stringify({ decision })
    });

    try {
      const key = type === 'restaurant' ? 'vride_onboarding_restaurants' : 'vride_onboarding_riders';
      const list = JSON.parse(localStorage.getItem(key) || '[]');
      const updatedList = list.map((x) => (x.id === item.id || x.targetId === targetId ? { ...x, status: decision } : x));
      localStorage.setItem(key, JSON.stringify(updatedList));

      if (decision === 'approved' && item.rawApplication) {
        const raw = item.rawApplication;
        const customAccs = JSON.parse(localStorage.getItem('vride_local_accounts') || '[]');
        const emailLower = String(raw.email || '').trim().toLowerCase();
        if (emailLower && !customAccs.some((a) => a.email?.toLowerCase() === emailLower)) {
          customAccs.unshift({
            id: targetId,
            accountId: 'auth_' + targetId,
            restaurantId: type === 'restaurant' ? targetId : undefined,
            name: type === 'restaurant' ? raw.restaurantName : raw.fullName,
            username: emailLower.split('@')[0],
            email: emailLower,
            phone: raw.mobile,
            role: type === 'restaurant' ? 'vendor' : 'rider',
            vehicleType: raw.vehicleType ? String(raw.vehicleType).toLowerCase() : undefined,
            pass: raw.password || (type === 'restaurant' ? 'Vendor@2026' : 'Partner@2026')
          });
          localStorage.setItem('vride_local_accounts', JSON.stringify(customAccs));
        }
      }
    } catch {
      // ignore localStorage errors
    }

    if (type === 'restaurant') {
      setRestaurants((p) => p.map((x) => (x.id === item.id ? { ...x, status: decision } : x)));
      setSelectedRest((p) => (p ? { ...p, status: decision } : p));
      addAudit(`${decision === 'approved' ? 'Approved' : 'Rejected'} Restaurant`, 'Restaurants', item.id);
    } else {
      setRiders((p) => p.map((x) => (x.id === item.id ? { ...x, status: decision } : x)));
      setSelectedRider((p) => (p ? { ...p, status: decision } : p));
      addAudit(`${decision === 'approved' ? 'Approved' : 'Rejected'} Rider`, 'Riders', item.id);
    }
    showToast(`${item.name} ${decision}!`);
  };

  useEffect(() => {
    syncAll();
  }, []);

  const addAudit = (action, moduleName, record) => {
    setAuditLogs((p) => [
      { id: 'AUD_' + Date.now(), admin: 'Operations Lead', action, module: moduleName, record, time: 'Just now' },
      ...p
    ]);
  };

  const handleDownloadCsv = (name, rows) => {
    const csv = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.csv`;
    a.click();
    showToast(`Exported ${name}.csv`);
  };

  const sidebarMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live', label: 'Live Operations', icon: Radio },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'restaurants', label: 'Restaurants', icon: Utensils },
    { id: 'riders', label: 'Riders', icon: Bike },
    { id: 'food_orders', label: 'Food Orders', icon: ShoppingBag },
    { id: 'parcels', label: 'Parcels', icon: Package },
    { id: 'passenger_rides', label: 'Passenger Rides', icon: Car },
    { id: 'finance', label: 'Finance', icon: Wallet },
    { id: 'reports', label: 'Reports', icon: FileBarChart },
    { id: 'support', label: 'Support', icon: MessageSquare },
    { id: 'admin_roles', label: 'Admin & Roles', icon: ShieldCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'audit', label: 'Audit Logs', icon: History }
  ];

  const currentNavLabel = sidebarMenu.find((m) => m.id === activeNav)?.label || 'Dashboard';

  return (
    <div className="min-h-screen bg-[#F5F6F8] text-gray-900 flex flex-col md:flex-row select-none">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#10151F] text-[#FFD000] px-4 py-2.5 rounded-2xl shadow-xl text-xs font-black border border-[#FFD000]/40">
          {toast}
        </div>
      )}

      {/* MOBILE SIDEBAR BACKDROP */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* FIXED DARK SIDEBAR (#10151F) */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-[#10151F] text-white flex flex-col transition-transform duration-200 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="px-4 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFD000] text-[#10151F] flex items-center justify-center font-black text-base">
              V
            </div>
            <div>
              <span className="font-black text-sm tracking-wider block leading-none">V RIDE</span>
              <span className="text-[10px] text-gray-400 font-bold">Admin Panel</span>
            </div>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {sidebarMenu.map((item) => {
            const Icon = item.icon;
            const active = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition ${
                  active ? 'bg-[#FFD000] text-black font-black shadow-xs' : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT SHELL */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* CONSISTENT COMMON HEADER */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 h-16 flex items-center justify-between sticky top-0 z-30 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 rounded-xl bg-gray-100">
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <h1 className="font-black text-sm md:text-base text-gray-900 truncate">{currentNavLabel}</h1>
              <p className="text-[10px] text-gray-500 font-semibold hidden sm:block">
                V RIDE Admin / {currentNavLabel}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden lg:flex relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Global search..."
                className="pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 bg-gray-50 text-xs w-52"
              />
            </div>

            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-bold"
            >
              <option>Hyderabad</option>
              <option>Vijayawada</option>
              <option>Guntur</option>
              <option>All Cities</option>
            </select>

            <button
              onClick={() => { syncAll(); showToast('Refreshed live operations data'); }}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200"
              title="Sync"
            >
              <RefreshCw className="w-4 h-4 text-gray-700" />
            </button>

            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-xl bg-[#10151F] text-white text-xs font-bold">
              <span className="w-5 h-5 rounded-full bg-[#FFD000] text-black flex items-center justify-center font-black text-[10px]">A</span>
              <span>Admin</span>
            </div>

            {onLogout && (
              <button onClick={onLogout} className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100" title="Logout">
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </header>

        {/* PAGE BODY */}
        <main className="flex-1 p-4 md:p-6 space-y-5 overflow-x-hidden">
          {/* 1. DASHBOARD */}
          {activeNav === 'dashboard' && (
            <div className="space-y-5">
              {/* 6 Top KPI Cards matching image copy 36.png */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: 'Total Users', val: '2,48,732', diff: '+5.8%', nav: 'customers' },
                  { label: 'Total Restaurants', val: '1,862', diff: '+4.2%', nav: 'restaurants' },
                  { label: 'Total Riders', val: '9,460', diff: '+6.1%', nav: 'riders' },
                  { label: 'Orders & Bookings', val: '56,328', diff: '+7.3%', nav: 'food_orders' },
                  { label: 'Total Revenue', val: '₹42,63,410', diff: '+8.9%', nav: 'finance' },
                  { label: 'Pending Approvals', val: String(restaurants.filter((r) => r.status === 'pending').length + riders.filter((r) => r.status === 'pending').length), diff: 'View →', nav: 'restaurants' }
                ].map((c) => (
                  <div
                    key={c.label}
                    onClick={() => setActiveNav(c.nav)}
                    className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs cursor-pointer hover:border-[#FFD000] transition"
                  >
                    <span className="text-[11px] font-bold text-gray-500 block">{c.label}</span>
                    <span className="text-lg font-black text-gray-900 mt-1 block">{c.val}</span>
                    <span className="text-[10px] font-bold text-emerald-600">{c.diff}</span>
                  </div>
                ))}
              </div>

              {/* Services Overview + Revenue Trend */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3">
                  <h3 className="font-black text-sm text-gray-900">Services Overview (Today)</h3>
                  {[
                    { label: 'Food Orders', count: '24,862', rev: '₹18,76,540', nav: 'food_orders' },
                    { label: 'Parcel Deliveries', count: '8,436', rev: '₹6,49,210', nav: 'parcels' },
                    { label: 'Passenger Rides', count: '23,030', rev: '₹17,37,660', nav: 'passenger_rides' }
                  ].map((s) => (
                    <div
                      key={s.label}
                      onClick={() => setActiveNav(s.nav)}
                      className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between cursor-pointer hover:border-[#FFD000]"
                    >
                      <span className="font-bold text-xs">{s.label}</span>
                      <div className="text-right">
                        <span className="font-black text-xs mr-3">{s.count}</span>
                        <span className="font-black text-xs text-emerald-700">{s.rev}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-black text-sm">Revenue Trend (Last 7 Days)</h3>
                    <span className="text-xs font-black text-emerald-600">+8.9%</span>
                  </div>
                  <svg viewBox="0 0 320 90" className="w-full h-28">
                    <polyline fill="none" stroke="#FFD000" strokeWidth="4" points="10,75 60,68 110,55 160,48 210,36 260,28 310,15" />
                    {[[10, 75], [60, 68], [110, 55], [160, 48], [210, 36], [260, 28], [310, 15]].map(([x, y], i) => (
                      <circle key={i} cx={x} cy={y} r="4.5" fill="#10151F" stroke="#FFD000" strokeWidth="2" />
                    ))}
                  </svg>
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                    <span>21 Nov</span><span>22 Nov</span><span>23 Nov</span><span>24 Nov</span><span>25 Nov</span><span>26 Nov</span><span>27 Nov</span>
                  </div>
                </div>
              </div>

              {/* Live Operations Map + Unassigned Jobs + Live Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-black text-xs">Live Operations – {cityFilter}</h3>
                    <button onClick={() => setActiveNav('live')} className="text-[11px] font-bold text-blue-600">Full Map →</button>
                  </div>
                  <MapComponent height="180px" />
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-2.5">
                  <h3 className="font-black text-xs">Unassigned Jobs</h3>
                  {[
                    { id: 'FOD8917', type: 'FOOD', area: 'Hitech City → Gachibowli' },
                    { id: 'PRC7720', type: 'PARCEL', area: 'Kukatpally → Madhapur' },
                    { id: 'RDE6645', type: 'RIDE', area: 'Miyapur → Ameerpet' }
                  ].map((j) => (
                    <div key={j.id} className="p-2.5 rounded-xl bg-gray-50 border flex items-center justify-between text-xs">
                      <div>
                        <span className="font-black block">{j.type} #{j.id}</span>
                        <span className="text-[10px] text-gray-500">{j.area}</span>
                      </div>
                      <button
                        onClick={() => { showToast(`Assigned ${j.id} to nearest online rider`); addAudit('Assigned Rider', 'Live Ops', j.id); }}
                        className="px-3 py-1 rounded-lg bg-[#FFD000] text-black font-black text-[11px]"
                      >
                        Assign
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-2">
                  <h3 className="font-black text-xs">Live Activity</h3>
                  {auditLogs.slice(0, 4).map((a) => (
                    <div key={a.id} className="text-[11px] py-1.5 border-b border-gray-100 last:border-0">
                      <span className="font-bold text-gray-900">{a.action}</span> · <span className="text-gray-500">{a.record}</span>
                      <span className="block text-[10px] text-gray-400">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. LIVE OPERATIONS */}
          {activeNav === 'live' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3">
                <h2 className="font-black text-sm">Real-Time Fleet & Delivery Map ({cityFilter})</h2>
                <MapComponent height="360px" />
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3">
                <h3 className="font-black text-sm">Online Riders</h3>
                {riders.map((r) => (
                  <div key={r.id} className="p-3 rounded-xl bg-gray-50 border flex items-center justify-between text-xs">
                    <div>
                      <span className="font-black block">{r.name} ({r.id})</span>
                      <span className="text-[10px] text-gray-500">{r.vehicle} · {r.city}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${r.online ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-600'}`}>
                      {r.online ? 'ONLINE' : 'OFFLINE'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. CUSTOMERS */}
          {activeNav === 'customers' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
              <div className="p-4 border-b flex flex-wrap justify-between items-center gap-2">
                <h2 className="font-black text-sm">Customer Management ({customers.length})</h2>
                <button
                  onClick={() => handleDownloadCsv('customers', [['ID', 'Name', 'Phone', 'City', 'Spent'], ...customers.map((c) => [c.id, c.name, c.phone, c.city, c.spent])])}
                  className="px-3 py-1.5 rounded-xl bg-[#FFD000] text-black font-black text-xs flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Export CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-[10px]">
                    <tr>
                      <th className="p-3">ID</th><th className="p-3">Name</th><th className="p-3">Phone</th>
                      <th className="p-3">Orders / Rides</th><th className="p-3">Spent</th><th className="p-3">Status</th><th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {customers.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50">
                        <td className="p-3 font-bold">{c.id}</td>
                        <td className="p-3 font-black">{c.name}</td>
                        <td className="p-3">{c.phone}</td>
                        <td className="p-3">{c.orders} / {c.rides}</td>
                        <td className="p-3 font-bold">₹{c.spent}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${c.status === 'blocked' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="p-3 flex gap-1.5">
                          <button
                            onClick={() => setCustomers((p) => p.map((x) => (x.id === c.id ? { ...x, status: x.status === 'blocked' ? 'active' : 'blocked' } : x)))}
                            className="px-2 py-1 rounded bg-gray-100 font-bold text-[10px]"
                          >
                            {c.status === 'blocked' ? 'Unblock' : 'Block'}
                          </button>
                          <button
                            onClick={() => setCustomers((p) => p.filter((x) => x.id !== c.id))}
                            className="p-1 rounded bg-red-50 text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. RESTAURANTS */}
          {activeNav === 'restaurants' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="p-4 border-b flex flex-wrap justify-between items-center gap-2">
                  <div className="flex gap-1.5">
                    {['all', 'pending', 'approved', 'rejected'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setRestTab(t)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black capitalize ${restTab === t ? 'bg-[#FFD000] text-black' : 'bg-gray-100 text-gray-600'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setModal({ open: true, type: 'restaurant', data: { name: '', owner: '', area: '', city: 'Hyderabad', cuisine: '' } })}
                    className="px-3 py-1.5 rounded-xl bg-[#FFD000] text-black font-black text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Restaurant
                  </button>
                </div>

                <div className="divide-y divide-gray-100">
                  {restaurants
                    .filter((r) => restTab === 'all' || r.status === restTab)
                    .map((r) => (
                      <div key={r.id} className="p-4 flex items-center justify-between gap-3">
                        <div>
                          <span className="font-black text-xs text-gray-900">{r.name}</span>
                          <p className="text-[11px] text-gray-500">{r.area}, {r.city} · {r.cuisine} · Applied: {r.appliedOn}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${r.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : r.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800'}`}>
                            {r.status}
                          </span>
                          <button onClick={() => setSelectedRest(r)} className="px-3 py-1 rounded-lg bg-[#FFD000] text-black font-black text-xs">
                            Review
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Verification Panel */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3">
                <h3 className="font-black text-sm">Restaurant Verification</h3>
                {selectedRest ? (
                  <div className="space-y-3 text-xs">
                    <p><strong>Name:</strong> {selectedRest.name} ({selectedRest.id})</p>
                    <p><strong>Owner:</strong> {selectedRest.owner}</p>
                    {selectedRest.phone && <p><strong>Phone:</strong> {selectedRest.phone}</p>}
                    {selectedRest.email && <p><strong>Email:</strong> {selectedRest.email}</p>}
                    {selectedRest.bankDetails?.bankName && (
                      <p><strong>Bank:</strong> {selectedRest.bankDetails.bankName} ({selectedRest.bankDetails.ifscCode})</p>
                    )}
                    <div className="space-y-1">
                      <span className="font-bold block">Documents:</span>
                      {(selectedRest.docs || ['FSSAI', 'GST', 'Bank']).map((d) => (
                        <div key={d} className="flex justify-between p-2 rounded-lg bg-gray-50">
                          <span>{d}</span><span className="text-emerald-600 font-bold">✓ Submitted</span>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleOnboardingDecision('restaurant', selectedRest, 'approved')}
                        className="py-2 rounded-xl bg-emerald-600 text-white font-black"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleOnboardingDecision('restaurant', selectedRest, 'rejected')}
                        className="py-2 rounded-xl bg-red-600 text-white font-black"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">Click Review on any restaurant to inspect documents and approve/reject.</p>
                )}
              </div>
            </div>
          )}

          {/* 5. RIDERS */}
          {activeNav === 'riders' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="p-4 border-b flex flex-wrap justify-between items-center gap-2">
                  <div className="flex gap-1.5">
                    {['all', 'pending', 'approved', 'rejected'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setRiderTab(t)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black capitalize ${riderTab === t ? 'bg-[#FFD000] text-black' : 'bg-gray-100 text-gray-600'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setModal({ open: true, type: 'rider', data: { name: '', city: 'Hyderabad', phone: '', vehicle: 'Bike', vehicleNo: '' } })}
                    className="px-3 py-1.5 rounded-xl bg-[#FFD000] text-black font-black text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Rider
                  </button>
                </div>

                <div className="divide-y divide-gray-100">
                  {riders
                    .filter((r) => riderTab === 'all' || r.status === riderTab)
                    .map((r) => (
                      <div key={r.id} className="p-4 flex items-center justify-between gap-3">
                        <div>
                          <span className="font-black text-xs text-gray-900">{r.name} ({r.id})</span>
                          <p className="text-[11px] text-gray-500">{r.city} · {r.vehicle} ({r.vehicleNo}) · {r.services.join(', ')}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${r.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : r.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800'}`}>
                            {r.status}
                          </span>
                          <button onClick={() => setSelectedRider(r)} className="px-3 py-1 rounded-lg bg-[#FFD000] text-black font-black text-xs">
                            Review
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Right-side Verification Panel matching image copy 36.png */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3">
                <h3 className="font-black text-sm">Verification – {selectedRider?.id}</h3>
                {selectedRider && (
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50">
                      <div className="w-10 h-10 rounded-full bg-[#FFD000] text-black flex items-center justify-center font-black">R</div>
                      <div>
                        <span className="font-black block">{selectedRider.name}</span>
                        <span className="text-[11px] text-gray-500">Applied: {selectedRider.appliedOn}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="font-bold block">Documents & Details</span>
                      {selectedRider.phone && <p><strong>Phone:</strong> {selectedRider.phone}</p>}
                      {selectedRider.email && <p><strong>Email:</strong> {selectedRider.email}</p>}
                      {(selectedRider.docs || ['Driving Licence', 'Vehicle RC', 'Insurance', 'ID Proof']).map((doc) => (
                        <div key={doc} className="flex justify-between p-2 rounded-lg bg-gray-50">
                          <span>{doc}</span><span className="text-emerald-600 font-bold">✓</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleOnboardingDecision('rider', selectedRider, 'approved')}
                        className="py-2 rounded-xl bg-emerald-600 text-white font-black"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleOnboardingDecision('rider', selectedRider, 'rejected')}
                        className="py-2 rounded-xl bg-red-600 text-white font-black"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 6. FOOD ORDERS */}
          {activeNav === 'food_orders' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="font-black text-sm">Food Delivery Orders</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase">
                      <tr>
                        <th className="p-3">Order ID</th><th className="p-3">Restaurant</th><th className="p-3">Route</th>
                        <th className="p-3">Rider</th><th className="p-3">Fare</th><th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {foodOrders.map((o) => (
                        <tr key={o.id} onClick={() => setSelectedFoodOrder(o)} className="hover:bg-yellow-50/50 cursor-pointer">
                          <td className="p-3 font-black">{o.id}</td>
                          <td className="p-3">{o.restaurant}</td>
                          <td className="p-3">{o.pickup} → {o.drop}</td>
                          <td className="p-3 font-bold">{o.rider}</td>
                          <td className="p-3 font-bold">₹{o.fare}</td>
                          <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-black text-[10px]">{o.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right-side Order Timeline & Reassign Panel */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-black text-sm">Order #{selectedFoodOrder?.id}</h3>
                  <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{selectedFoodOrder?.status}</span>
                </div>
                <div className="space-y-2 text-xs">
                  {['Order Placed', 'Accepted by Rider', 'Reached Restaurant', 'Order Picked Up', 'On the Way to Customer'].map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${i < 4 ? 'bg-emerald-500' : 'bg-amber-400'}`}></span>
                      <span className="font-semibold">{step}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    const nextRider = window.prompt('Assign Rider ID:', 'RDR1036');
                    if (!nextRider) return;
                    setFoodOrders((p) => p.map((x) => (x.id === selectedFoodOrder.id ? { ...x, rider: nextRider, status: 'In Progress' } : x)));
                    setSelectedFoodOrder((p) => ({ ...p, rider: nextRider, status: 'In Progress' }));
                    showToast(`Dispatched ${nextRider} to #${selectedFoodOrder.id}`);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#FFD000] text-black font-black text-xs"
                >
                  🛵 Reassign / Dispatch Rider
                </button>
              </div>
            </div>
          )}

          {/* 7. PARCELS */}
          {activeNav === 'parcels' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
              <div className="p-4 border-b"><h2 className="font-black text-sm">Parcel Deliveries</h2></div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase">
                    <tr><th className="p-3">ID</th><th className="p-3">Sender → Receiver</th><th className="p-3">Route</th><th className="p-3">Type</th><th className="p-3">Amount</th><th className="p-3">Status</th><th className="p-3">Action</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {parcels.map((p) => (
                      <tr key={p.id}>
                        <td className="p-3 font-black">{p.id}</td>
                        <td className="p-3">{p.sender} → {p.receiver}</td>
                        <td className="p-3">{p.pickup} → {p.drop}</td>
                        <td className="p-3">{p.type}</td>
                        <td className="p-3 font-bold">₹{p.amount}</td>
                        <td className="p-3 font-bold">{p.status}</td>
                        <td className="p-3">
                          <button
                            onClick={() => {
                              setParcels((prev) => prev.map((x) => (x.id === p.id ? { ...x, rider: 'RDR1036', status: 'In Transit' } : x)));
                              showToast(`Rider assigned to ${p.id}`);
                            }}
                            className="px-2.5 py-1 rounded bg-[#FFD000] text-black font-black text-[10px]"
                          >
                            Assign Rider
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 8. PASSENGER RIDES */}
          {activeNav === 'passenger_rides' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
              <div className="p-4 border-b"><h2 className="font-black text-sm">Passenger Rides</h2></div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase">
                    <tr><th className="p-3">Ride ID</th><th className="p-3">Customer</th><th className="p-3">Route</th><th className="p-3">Rider</th><th className="p-3">Vehicle</th><th className="p-3">Fare</th><th className="p-3">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {rides.map((r) => (
                      <tr key={r.id}>
                        <td className="p-3 font-black">{r.id}</td>
                        <td className="p-3">{r.customer}</td>
                        <td className="p-3">{r.pickup} → {r.drop}</td>
                        <td className="p-3 font-bold">{r.rider}</td>
                        <td className="p-3">{r.vehicle}</td>
                        <td className="p-3 font-bold">₹{r.fare}</td>
                        <td className="p-3 font-bold text-emerald-700">{r.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 9. FINANCE */}
          {activeNav === 'finance' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  { label: 'Platform Revenue', val: '₹42,63,410' },
                  { label: 'Commission Earnings', val: '₹7,86,520' },
                  { label: 'Rider Payouts', val: '₹28,40,950' },
                  { label: 'Restaurant Settlements', val: '₹5,96,240' },
                  { label: 'Refunds', val: '₹86,700' }
                ].map((k) => (
                  <div key={k.label} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
                    <span className="text-[10px] font-bold text-gray-500 uppercase block">{k.label}</span>
                    <span className="text-lg font-black text-gray-900 mt-1 block">{k.val}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {['overview', 'settlements', 'withdrawals', 'refunds'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFinanceTab(t)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black capitalize transition ${financeTab === t ? 'bg-[#FFD000] text-black shadow-xs' : 'bg-white border border-gray-200 text-gray-700'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {financeTab === 'settlements' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-2">
                  <h3 className="font-black text-sm">Restaurant Settlements</h3>
                  {settlements.map((s) => (
                    <div key={s.id} className="p-3 rounded-xl bg-gray-50 border flex justify-between items-center text-xs">
                      <div>
                        <span className="font-black block">{s.restaurant} ({s.period})</span>
                        <span className="text-gray-500">Gross: ₹{s.gross} · Comm: ₹{s.commission} · Net: ₹{s.net}</span>
                      </div>
                      <button
                        onClick={() => {
                          setSettlements((p) => p.map((x) => (x.id === s.id ? { ...x, status: 'Paid' } : x)));
                          showToast(`Settlement ${s.id} marked Paid`);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-xs"
                      >
                        {s.status === 'Paid' ? 'Paid ✓' : 'Process Settlement'}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {(financeTab === 'overview' || financeTab === 'withdrawals') && (
                <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-2.5">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <h3 className="font-black text-sm">Rider Withdrawals</h3>
                    <span className="text-[11px] font-bold text-gray-500">
                      {payouts.filter((w) => w.status === 'Pending').length} Pending
                    </span>
                  </div>
                  {payouts.map((w) => (
                    <div key={w.id} className="p-3 rounded-xl bg-gray-50 border flex justify-between items-center text-xs">
                      <div>
                        <span className="font-black block">{w.rider} · ₹{w.amount}</span>
                        <span className="text-gray-500">{w.method} · {w.date}</span>
                      </div>
                      {w.status === 'Pending' ? (
                        <button
                          onClick={() => {
                            setPayouts((p) => p.map((x) => (x.id === w.id ? { ...x, status: 'Approved' } : x)));
                            showToast(`Withdrawal ${w.id} approved`);
                          }}
                          className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-black text-xs"
                        >
                          Approve
                        </button>
                      ) : (
                        <span className="font-black text-emerald-700">{w.status}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {financeTab === 'refunds' && (
                <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-2">
                  <h3 className="font-black text-sm">Refund Management</h3>
                  {refunds.map((rf) => (
                    <div key={rf.id} className="p-3 rounded-xl bg-gray-50 border flex justify-between items-center text-xs">
                      <div>
                        <span className="font-black block">{rf.id} · Order #{rf.orderId} · ₹{rf.amount}</span>
                        <span className="text-gray-500">{rf.reason} · {rf.method}</span>
                      </div>
                      <button
                        onClick={() => {
                          setRefunds((p) => p.map((x) => (x.id === rf.id ? { ...x, status: 'Processed' } : x)));
                          showToast(`Refund ${rf.id} processed`);
                        }}
                        className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-black text-xs"
                      >
                        {rf.status === 'Processed' ? 'Processed ✓' : 'Process Refund'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 10. REPORTS */}
          {activeNav === 'reports' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
              <h2 className="font-black text-sm">Generate & Download Reports</h2>
              {[
                'Orders & Bookings Report',
                'Revenue & Commission Report',
                'Rider Earnings & Payouts Report',
                'Restaurant Settlements Report',
                'Customer Growth Report'
              ].map((rep) => (
                <div key={rep} className="p-3 rounded-xl bg-gray-50 border flex flex-wrap justify-between items-center gap-2 text-xs">
                  <span className="font-bold">{rep}</span>
                  <div className="flex gap-1.5">
                    <button onClick={() => handleDownloadCsv(rep, [['Metric', 'Value'], [rep, 'Exported']])} className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-black">CSV</button>
                    <button onClick={() => handleDownloadCsv(rep, [['Metric', 'Value'], [rep, 'Exported']])} className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 font-black">Excel</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 11. SUPPORT */}
          {activeNav === 'support' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
              <h2 className="font-black text-sm">Support Ticket Management ({tickets.length})</h2>
              {tickets.map((t) => (
                <div key={t.id} className="p-3.5 rounded-xl bg-gray-50 border space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-black">#{t.id} · {t.subject}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${t.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-800'}`}>
                      {t.status}
                    </span>
                  </div>
                  <p className="text-gray-600">{t.message || `${t.userName} (${t.category})`}</p>
                  <button
                    onClick={async () => {
                      const reply = window.prompt('Enter Admin Support Reply:', t.adminReply || 'Resolved by Support');
                      if (reply === null) return;
                      await apiRequest(`/support/tickets/${t.id}`, { method: 'PUT', body: JSON.stringify({ status: 'resolved', adminReply: reply }) });
                      setTickets((p) => p.map((x) => (x.id === t.id ? { ...x, status: 'resolved', adminReply: reply } : x)));
                      showToast(`Ticket #${t.id} resolved`);
                    }}
                    className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-black text-[11px]"
                  >
                    Reply & Resolve
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 12. ADMIN & ROLES */}
          {activeNav === 'admin_roles' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const res = await apiRequest('/admin/accounts', { method: 'POST', body: JSON.stringify(newAdmin) });
                  const created = res?.data || { id: 'ADM_' + Date.now(), ...newAdmin, active: true };
                  setAdminAccounts((p) => [created, ...p]);
                  setNewAdmin({ name: '', email: '', role: 'Support Admin', city: 'All Cities' });
                  addAudit('Created Admin Account', 'Admin & Roles', created.email);
                  showToast('Admin account created!');
                }}
                className="bg-white p-5 rounded-2xl border border-gray-200 space-y-3"
              >
                <h2 className="font-black text-sm">Create Support / Operations Admin</h2>
                <input required placeholder="Full Name" value={newAdmin.name} onChange={(e) => setNewAdmin((p) => ({ ...p, name: e.target.value }))} className="w-full p-2.5 rounded-xl border text-xs" />
                <input required type="email" placeholder="Email" value={newAdmin.email} onChange={(e) => setNewAdmin((p) => ({ ...p, email: e.target.value }))} className="w-full p-2.5 rounded-xl border text-xs" />
                <select value={newAdmin.role} onChange={(e) => setNewAdmin((p) => ({ ...p, role: e.target.value }))} className="w-full p-2.5 rounded-xl border text-xs font-bold">
                  <option>Support Admin</option><option>Operations Admin</option><option>Finance Admin</option><option>Restaurant Admin</option><option>Rider Admin</option>
                </select>
                <select value={newAdmin.city} onChange={(e) => setNewAdmin((p) => ({ ...p, city: e.target.value }))} className="w-full p-2.5 rounded-xl border text-xs font-bold">
                  <option>All Cities</option><option>Hyderabad</option><option>Vijayawada</option><option>Guntur</option>
                </select>
                <button type="submit" className="w-full py-2.5 rounded-xl bg-[#FFD000] text-black font-black text-xs">+ Create Admin</button>
              </form>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2.5">
                <h3 className="font-black text-sm">Authorized Admin Accounts</h3>
                {adminAccounts.map((a) => (
                  <div key={a.id} className="p-3 rounded-xl bg-gray-50 border flex justify-between items-center text-xs">
                    <div>
                      <span className="font-black block">{a.name} ({a.role})</span>
                      <span className="text-gray-500">{a.email} · {a.city}</span>
                    </div>
                    {a.role !== 'Super Admin' && (
                      <button onClick={() => setAdminAccounts((p) => p.filter((x) => x.id !== a.id))} className="text-red-600 font-bold">Revoke</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 13. SETTINGS */}
          {activeNav === 'settings' && (
            <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-3 max-w-xl">
              <h2 className="font-black text-sm">Platform Settings</h2>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-gray-500 block mb-1">Restaurant Commission (%)</label>
                  <input type="number" value={settings.restaurantCommission} onChange={(e) => setSettings((p) => ({ ...p, restaurantCommission: Number(e.target.value) }))} className="w-full p-2.5 rounded-xl border font-bold" />
                </div>
                <div>
                  <label className="font-bold text-gray-500 block mb-1">Rider Commission (%)</label>
                  <input type="number" value={settings.riderCommission} onChange={(e) => setSettings((p) => ({ ...p, riderCommission: Number(e.target.value) }))} className="w-full p-2.5 rounded-xl border font-bold" />
                </div>
                <div>
                  <label className="font-bold text-gray-500 block mb-1">Bike Base Fare (₹)</label>
                  <input type="number" value={settings.baseFareBike} onChange={(e) => setSettings((p) => ({ ...p, baseFareBike: Number(e.target.value) }))} className="w-full p-2.5 rounded-xl border font-bold" />
                </div>
                <div>
                  <label className="font-bold text-gray-500 block mb-1">Active Cities</label>
                  <input value={settings.cities} onChange={(e) => setSettings((p) => ({ ...p, cities: e.target.value }))} className="w-full p-2.5 rounded-xl border font-bold" />
                </div>
              </div>
              <button
                onClick={async () => {
                  await apiRequest('/admin/settings', { method: 'PUT', body: JSON.stringify(settings) });
                  addAudit('Updated Platform Settings', 'Settings', 'Global');
                  showToast('Settings saved to backend!');
                }}
                className="px-4 py-2.5 rounded-xl bg-[#FFD000] text-black font-black text-xs"
              >
                Save Platform Settings
              </button>
            </div>
          )}

          {/* 14. AUDIT LOGS */}
          {activeNav === 'audit' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-2.5">
              <h2 className="font-black text-sm">System Audit Logs (Immutable)</h2>
              {auditLogs.map((l) => (
                <div key={l.id} className="p-3 rounded-xl bg-gray-50 border flex justify-between text-xs">
                  <div>
                    <span className="font-black">{l.action}</span> · <span className="text-gray-600">{l.module} ({l.record})</span>
                    <span className="block text-[10px] text-gray-400">By {l.admin}</span>
                  </div>
                  <span className="text-[11px] text-gray-500">{l.time}</span>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>

      {/* ADD MODAL FOR RESTAURANT / RIDER */}
      {modal.open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (modal.type === 'restaurant') {
                setRestaurants((p) => [{ id: 'RST_' + Date.now(), ...modal.data, appliedOn: 'Today', status: 'pending', docs: ['FSSAI', 'GST'] }, ...p]);
              } else if (modal.type === 'rider') {
                setRiders((p) => [{ id: 'RDR_' + Date.now(), ...modal.data, appliedOn: 'Today', services: ['Food', 'Parcel', 'Rides'], status: 'pending', online: false }, ...p]);
              }
              setModal({ open: false, type: '', data: {} });
              showToast('Added successfully!');
            }}
            className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-3"
          >
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="font-black text-sm uppercase">Add {modal.type}</h3>
              <button type="button" onClick={() => setModal({ open: false, type: '', data: {} })}><X className="w-4 h-4" /></button>
            </div>
            {Object.keys(modal.data).map((k) => (
              <input
                key={k}
                required
                placeholder={k}
                value={modal.data[k]}
                onChange={(e) => setModal((p) => ({ ...p, data: { ...p.data, [k]: e.target.value } }))}
                className="w-full p-2.5 rounded-xl border text-xs font-semibold"
              />
            ))}
            <button type="submit" className="w-full py-3 rounded-xl bg-[#FFD000] text-black font-black text-xs">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
