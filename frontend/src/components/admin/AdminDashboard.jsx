import React, { useState } from 'react';
import {
  Users, Bike, TrendingUp, DollarSign, Package, Utensils,
  ShieldCheck, AlertCircle, CheckCircle2, XCircle, Search,
  Sliders, Tag, Bell, Settings, Eye, Check, X, RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'users' | 'partners' | 'orders' | 'restaurants' | 'pricing' | 'coupons' | 'payouts' | 'broadcast'

  // Admin state
  const [partnersList, setPartnersList] = useState([
    { id: 'ptn_ramesh', name: 'Ramesh K', phone: '+91 98480 12345', vehicle: 'Bike (TS 08 EA 4521)', status: 'approved', trips: 2341, rating: 4.8, docs: 'Aadhaar, DL, RC, Bank' },
    { id: 'ptn_suresh', name: 'Suresh Reddy', phone: '+91 97000 54321', vehicle: 'Auto (TS 07 UA 8899)', status: 'approved', trips: 1820, rating: 4.7, docs: 'Aadhaar, DL, RC, Bank' },
    { id: 'ptn_vikram', name: 'Vikram Singh', phone: '+91 99887 76655', vehicle: 'Cab (TS 09 AB 1234)', status: 'approved', trips: 3100, rating: 4.9, docs: 'Aadhaar, DL, RC, Bank' },
    { id: 'ptn_praveen', name: 'Praveen Kumar', phone: '+91 91234 56789', vehicle: 'Bike (TS 08 FC 3321)', status: 'pending', trips: 940, rating: 4.6, docs: 'Aadhaar (Review), DL' }
  ]);

  const [usersList, setUsersList] = useState([
    { id: 'usr_srilatha', name: 'Sri Latha', phone: '+91 98765 43210', email: 'srilatha@example.com', rides: 42, wallet: 850, status: 'active' },
    { id: 'usr_anil', name: 'Anil Kumar', phone: '+91 99887 65432', email: 'anil.k@example.com', rides: 18, wallet: 320, status: 'active' },
    { id: 'usr_priya', name: 'Priya Sharma', phone: '+91 97654 32109', email: 'priya@example.com', rides: 29, wallet: 1150, status: 'active' }
  ]);

  const [pricingRules, setPricingRules] = useState([
    { id: 'bike', name: 'Bike Ride', baseFare: 25, perKm: 8, surge: 1.0, commission: 15 },
    { id: 'auto', name: 'Auto Rickshaw', baseFare: 35, perKm: 12, surge: 1.0, commission: 15 },
    { id: 'cab', name: 'Cab / Sedan', baseFare: 60, perKm: 16, surge: 1.0, commission: 18 },
    { id: 'parcel', name: 'Parcel Small (≤ 1kg)', baseFare: 40, perKm: 9, surge: 1.0, commission: 15 }
  ]);

  const [payouts, setPayouts] = useState([
    { id: 'pay_1', partner: 'Ramesh K', amount: 1500, bank: 'HDFC Bank - 501004829103', date: '20 Nov 2026', status: 'approved' },
    { id: 'pay_2', partner: 'Suresh Reddy', amount: 1200, bank: 'SBI - 20391827461', date: '22 Nov 2026', status: 'pending' }
  ]);

  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastTarget, setBroadcastTarget] = useState('all');

  const handlePartnerStatus = (id, newStatus) => {
    setPartnersList(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const handleUserStatus = (id) => {
    setUsersList(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'blocked' : 'active' } : u));
  };

  const handlePayoutStatus = (id, newStatus) => {
    setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    alert(`Broadcast push notification sent to ${broadcastTarget.toUpperCase()} recipients!`);
    setBroadcastMessage('');
  };

  return (
    <div className="w-full min-h-screen bg-[#f3f4f6] text-gray-900 flex flex-col select-none">
      {/* Top Navbar */}
      <div className="bg-black text-white px-6 py-3 flex items-center justify-between border-b border-neutral-800 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-vride-yellow text-black flex items-center justify-center font-black">
            V
          </div>
          <div>
            <h1 className="text-sm font-black tracking-wider flex items-center gap-2">
              <span>SUPER ADMIN PORTAL</span>
              <span className="text-[10px] bg-yellow-400 text-black px-1.5 py-0.5 rounded font-bold">
                ROOT PRIVILEGES
              </span>
            </h1>
            <p className="text-[11px] text-gray-400">Hyderabad Metro Area Operational Command</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
          <span>Admin: Operations Lead</span>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-4 space-y-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition ${
              activeTab === 'overview' ? 'bg-vride-yellow text-black shadow-xs' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('partners')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition ${
              activeTab === 'partners' ? 'bg-vride-yellow text-black shadow-xs' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Bike className="w-4 h-4" />
            <span>Driver Partners & KYC</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition ${
              activeTab === 'users' ? 'bg-vride-yellow text-black shadow-xs' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Customer Management</span>
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition ${
              activeTab === 'pricing' ? 'bg-vride-yellow text-black shadow-xs' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Pricing & Commissions</span>
          </button>

          <button
            onClick={() => setActiveTab('payouts')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition ${
              activeTab === 'payouts' ? 'bg-vride-yellow text-black shadow-xs' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Partner Payouts</span>
          </button>

          <button
            onClick={() => setActiveTab('broadcast')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition ${
              activeTab === 'broadcast' ? 'bg-vride-yellow text-black shadow-xs' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Push Broadcast</span>
          </button>
        </aside>

        {/* Content View */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Metric Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Total Revenue</span>
                  <p className="text-2xl font-black text-gray-900 mt-1">₹14.82 Lakhs</p>
                  <span className="text-[10px] text-green-600 font-bold">↑ 18.4% this month</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Total Trips & Deliveries</span>
                  <p className="text-2xl font-black text-gray-900 mt-1">16,470</p>
                  <span className="text-[10px] text-green-600 font-bold">Rides + Parcels + Food</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Active Driver Partners</span>
                  <p className="text-2xl font-black text-gray-900 mt-1">128 Online</p>
                  <span className="text-[10px] text-gray-500 font-medium">480 Registered</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Pending KYC Reviews</span>
                  <p className="text-2xl font-black text-amber-600 mt-1">1 Pending</p>
                  <button onClick={() => setActiveTab('partners')} className="text-[10px] text-blue-600 font-bold hover:underline">
                    Review KYC Docs →
                  </button>
                </div>
              </div>

              {/* Live Service Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-2">
                  <h3 className="font-extrabold text-xs text-gray-900 uppercase">🛵 Rides Division</h3>
                  <p className="text-xl font-bold">8,410 Bookings</p>
                  <p className="text-xs text-gray-500">Bike (65%), Auto (25%), Cab (10%)</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-2">
                  <h3 className="font-extrabold text-xs text-gray-900 uppercase">📦 Parcels & Pick-Drop</h3>
                  <p className="text-xl font-bold">2,940 Shipments</p>
                  <p className="text-xs text-gray-500">Same-day transit across Hyderabad</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-2">
                  <h3 className="font-extrabold text-xs text-gray-900 uppercase">🍲 Food Delivery</h3>
                  <p className="text-xl font-bold">5,120 Orders</p>
                  <p className="text-xs text-gray-500">Paradise Biryani, Domino's, Subway</p>
                </div>
              </div>
            </div>
          )}

          {/* 2. PARTNERS MANAGEMENT */}
          {activeTab === 'partners' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-sm font-extrabold text-gray-900">Delivery Partner KYC Verification</h2>
                  <p className="text-xs text-gray-500">Approve or reject partner registration documents</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 border-y border-gray-200 text-gray-500 font-bold uppercase">
                    <tr>
                      <th className="py-2.5 px-3">Partner</th>
                      <th className="py-2.5 px-3">Vehicle Details</th>
                      <th className="py-2.5 px-3">Submitted Documents</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {partnersList.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="py-3 px-3">
                          <p className="font-bold text-gray-900">{p.name}</p>
                          <span className="text-[11px] text-gray-400">{p.phone}</span>
                        </td>
                        <td className="py-3 px-3">{p.vehicle}</td>
                        <td className="py-3 px-3 text-gray-600">{p.docs}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            p.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right space-x-2">
                          {p.status === 'pending' ? (
                            <>
                              <button
                                onClick={() => handlePartnerStatus(p.id, 'approved')}
                                className="px-2.5 py-1 rounded-lg bg-green-600 text-white font-bold text-[11px] hover:bg-green-700"
                              >
                                Approve KYC
                              </button>
                              <button
                                onClick={() => handlePartnerStatus(p.id, 'rejected')}
                                className="px-2.5 py-1 rounded-lg bg-red-100 text-red-600 font-bold text-[11px] hover:bg-red-200"
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <span className="text-gray-400 text-xs font-bold">Verified ✓</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. USERS MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4 shadow-sm">
              <h2 className="text-sm font-extrabold text-gray-900">Customer Accounts</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 border-y border-gray-200 text-gray-500 font-bold uppercase">
                    <tr>
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">Total Orders</th>
                      <th className="py-2.5 px-3">Wallet Balance</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {usersList.map(u => (
                      <tr key={u.id} className="hover:bg-gray-50">
                        <td className="py-3 px-3">
                          <p className="font-bold text-gray-900">{u.name}</p>
                          <span className="text-[11px] text-gray-400">{u.phone}</span>
                        </td>
                        <td className="py-3 px-3">{u.rides} Trips & Orders</td>
                        <td className="py-3 px-3 font-bold">₹{u.wallet}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            u.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => handleUserStatus(u.id)}
                            className={`px-3 py-1 rounded-lg text-[11px] font-bold ${
                              u.status === 'active' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'
                            }`}
                          >
                            {u.status === 'active' ? 'Block User' : 'Unblock User'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. PRICING RULES */}
          {activeTab === 'pricing' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4 shadow-sm">
              <h2 className="text-sm font-extrabold text-gray-900">Configurable Service Pricing & Platform Commission</h2>
              <div className="space-y-3">
                {pricingRules.map(rule => (
                  <div key={rule.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <h3 className="font-bold text-sm text-gray-900">{rule.name}</h3>
                      <p className="text-gray-500">Service key: {rule.id}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-bold block">Base Fare</span>
                        <input
                          type="number"
                          value={rule.baseFare}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setPricingRules(prev => prev.map(r => r.id === rule.id ? { ...r, baseFare: val } : r));
                          }}
                          className="w-16 p-1 border rounded font-bold text-center"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-bold block">Per KM (₹)</span>
                        <input
                          type="number"
                          value={rule.perKm}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setPricingRules(prev => prev.map(r => r.id === rule.id ? { ...r, perKm: val } : r));
                          }}
                          className="w-16 p-1 border rounded font-bold text-center"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-bold block">Commission %</span>
                        <input
                          type="number"
                          value={rule.commission}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setPricingRules(prev => prev.map(r => r.id === rule.id ? { ...r, commission: val } : r));
                          }}
                          className="w-16 p-1 border rounded font-bold text-center"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => alert('Pricing rules successfully synchronized across customer & partner apps!')}
                className="px-4 py-2.5 rounded-xl bg-black text-white font-bold text-xs"
              >
                Save All Pricing Rules
              </button>
            </div>
          )}

          {/* 5. PAYOUTS */}
          {activeTab === 'payouts' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4 shadow-sm">
              <h2 className="text-sm font-extrabold text-gray-900">Partner Withdrawal Requests</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 border-y border-gray-200 text-gray-500 font-bold uppercase">
                    <tr>
                      <th className="py-2.5 px-3">Partner</th>
                      <th className="py-2.5 px-3">Amount</th>
                      <th className="py-2.5 px-3">Bank Details</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {payouts.map(pay => (
                      <tr key={pay.id} className="hover:bg-gray-50">
                        <td className="py-3 px-3 font-bold">{pay.partner}</td>
                        <td className="py-3 px-3 font-black text-green-700">₹{pay.amount}</td>
                        <td className="py-3 px-3 text-gray-600">{pay.bank}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            pay.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {pay.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          {pay.status === 'pending' ? (
                            <button
                              onClick={() => handlePayoutStatus(pay.id, 'approved')}
                              className="px-3 py-1 rounded-lg bg-green-600 text-white font-bold text-[11px]"
                            >
                              Approve Payout
                            </button>
                          ) : (
                            <span className="text-gray-400 font-bold">Processed ✓</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. BROADCAST NOTIFICATIONS */}
          {activeTab === 'broadcast' && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5 max-w-lg space-y-4 shadow-sm">
              <h2 className="text-sm font-extrabold text-gray-900">Broadcast Push Notification</h2>
              <form onSubmit={handleSendBroadcast} className="space-y-3 text-xs">
                <div>
                  <label className="text-[10px] text-gray-500 font-bold uppercase block mb-1">Target Audience</label>
                  <select
                    value={broadcastTarget}
                    onChange={(e) => setBroadcastTarget(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 font-bold"
                  >
                    <option value="all">All Users & Partners (City-wide)</option>
                    <option value="customers">Customers Only</option>
                    <option value="partners">Delivery Partners Only</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 font-bold uppercase block mb-1">Notification Message</label>
                  <textarea
                    rows="3"
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    placeholder="e.g. Surge pricing 1.2x active due to rain in Miyapur-Kukatpally corridor."
                    className="w-full p-2.5 rounded-xl border border-gray-200 font-medium"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-vride-yellow text-black font-extrabold shadow-sm hover:bg-yellow-400 transition"
                >
                  Send Push Broadcast
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
export default AdminDashboard;
