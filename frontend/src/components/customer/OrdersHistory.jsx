import React, { useState } from 'react';
import { Package, Bike, Utensils, MapPin, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OrdersHistory = ({ onTrackFood, onNavigate }) => {
  const [filter, setFilter] = useState('all');

  const orders = [
    {
      id: 'ord_98412',
      service: 'food',
      title: 'Paradise Biryani',
      items: 'Chicken Biryani x1, Mutton Biryani x1',
      date: 'Today, 09:00 PM',
      total: 598,
      status: 'In Transit',
      active: true
    },
    {
      id: 'ride_101',
      service: 'ride',
      title: 'Bike Ride to Kukatpally',
      items: '5.4 km · Bajaj Pulsar 150',
      date: '21 Nov 2026, 02:30 PM',
      total: 68,
      status: 'Completed',
      active: false
    },
    {
      id: 'pcl_201',
      service: 'parcel',
      title: 'Parcel to Gachibowli',
      items: 'Documents · Small (≤ 1 kg)',
      date: '20 Nov 2026, 11:15 AM',
      total: 85,
      status: 'Delivered',
      active: false
    },
    {
      id: 'pkd_301',
      service: 'pickdrop',
      title: 'Pick & Drop to Banjara Hills',
      items: 'Urgent Legal Documents',
      date: '19 Nov 2026, 04:45 PM',
      total: 75,
      status: 'Completed',
      active: false
    }
  ];

  const filtered = filter === 'all' ? orders : orders.filter(o => o.service === filter);

  return (
    <div className="flex flex-col bg-[#f8f9fa] pb-2 select-none">
      {/* Dark Hero Header with Yellow Wave */}
      <div className="relative bg-[#0b0e14] text-white pt-4 pb-5 px-4 overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#FFD600]/15 rounded-full blur-3xl pointer-events-none"></div>
        <h1 className="text-base font-black text-white relative z-10">Orders & Rides History</h1>
        {/* Glassy Filter Pills */}
        <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar relative z-10">
          {['all', 'food', 'ride', 'parcel', 'pickdrop'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold capitalize transition whitespace-nowrap active:scale-95 ${
                filter === tab ? 'glass-btn-yellow text-black' : 'glass-pill-dark text-gray-200 hover:text-white'
              }`}
            >
              {tab === 'all' ? 'All Orders' : tab}
            </button>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#FFD600]"></div>
      </div>

      <div className="p-4 space-y-2.5">
        {filtered.map(order => (
          <div
            key={order.id}
            className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-yellow-50 text-yellow-800 text-sm">
                  {order.service === 'food' ? '🍲' : order.service === 'ride' ? '🛵' : '📦'}
                </span>
                <div>
                  <h3 className="font-extrabold text-xs text-gray-900">{order.title}</h3>
                  <span className="text-[10px] text-gray-400 font-medium">{order.date}</span>
                </div>
              </div>
              <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                order.active ? 'bg-yellow-100 text-yellow-900 animate-pulse' : 'bg-green-100 text-green-800'
              }`}>
                {order.status}
              </span>
            </div>

            <p className="text-xs text-gray-600 font-medium">{order.items}</p>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
              <span className="font-black text-gray-900">Total: ₹{order.total}</span>
              {order.active ? (
                <button
                  onClick={onTrackFood}
                  className="px-3 py-1.5 rounded-xl bg-vride-yellow text-black font-extrabold text-xs shadow-xs hover:bg-yellow-400 transition"
                >
                  Track Live →
                </button>
              ) : (
                <button
                  onClick={() => alert(`Invoice #${order.id} generated! Sent to registered email.`)}
                  className="text-xs font-bold text-gray-600 hover:text-black"
                >
                  Download Invoice
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OrdersHistory;
