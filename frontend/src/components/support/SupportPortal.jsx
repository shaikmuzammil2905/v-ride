import React, { useState, useEffect } from 'react';
import { MessageSquare, CheckCircle2, Trash2, RefreshCw, Search, Phone } from 'lucide-react';
import { apiRequest } from '../../services/api';

export const SupportPortal = () => {
  const [tickets, setTickets] = useState([
    {
      id: 'tkt_1',
      userName: 'Sri Latha',
      category: 'Food Order',
      subject: 'Extra raita request',
      message: 'Please confirm order note for Paradise Biryani.',
      status: 'open',
      adminReply: ''
    },
    {
      id: 'tkt_2',
      userName: 'Anil Kumar',
      category: 'Wallet & Payment',
      subject: 'Razorpay top-up confirmation',
      message: 'Checking ₹500 wallet credit status.',
      status: 'resolved',
      adminReply: 'Verified and credited to wallet.'
    }
  ]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const loadTickets = async () => {
    const res = await apiRequest('/support/tickets');
    if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
      setTickets(res.data);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleResolve = async (id, currentReply) => {
    const reply = window.prompt('Enter agent reply to customer:', currentReply || 'Issue resolved by V RIDE Support.');
    if (reply === null) return;
    await apiRequest(`/support/tickets/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: 'resolved', adminReply: reply })
    });
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status: 'resolved', adminReply: reply } : t)));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this support ticket?')) return;
    await apiRequest(`/support/tickets/${id}`, { method: 'DELETE' });
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  const visibleTickets = tickets.filter((t) => {
    if (filter !== 'all' && t.status !== filter) return false;
    if (search && !`${t.subject} ${t.userName} ${t.category}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-gray-900 flex flex-col select-none">
      <div className="bg-[#0b0e14] text-white px-6 py-3.5 flex items-center justify-between border-b-2 border-[#FFD600] sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FFD600] text-black flex items-center justify-center font-black">
            💬
          </div>
          <div>
            <h1 className="text-sm font-black tracking-wider">V RIDE SUPPORT AGENT PANEL</h1>
            <p className="text-[11px] text-gray-400">24/7 Customer & Partner Ticket Desk</p>
          </div>
        </div>
        <button
          onClick={loadTickets}
          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#FFD600]" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="max-w-4xl w-full mx-auto p-4 md:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tickets by customer, subject, category..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs font-medium"
            />
          </div>
          <div className="flex gap-1.5">
            {['all', 'open', 'resolved'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase ${
                  filter === f ? 'bg-[#FFD600] text-black' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {visibleTickets.map((t) => (
            <div key={t.id} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="font-black text-sm text-gray-900">{t.subject}</span>
                  <span className="text-xs text-gray-500 ml-2">· {t.userName || 'Customer'} ({t.category})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${
                    t.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {t.status}
                  </span>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                    title="Delete ticket"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-700">{t.message}</p>

              {t.attachmentUrl && (
                <a href={t.attachmentUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 underline block">
                  View S3 Attachment ↗
                </a>
              )}

              {t.adminReply && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold">
                  Agent Reply: {t.adminReply}
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => handleResolve(t.id, t.adminReply)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.status === 'resolved' ? 'Update Reply' : 'Reply & Resolve'}</span>
                </button>
                <a
                  href="tel:+9118002008743"
                  className="px-3.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Helpline</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportPortal;
