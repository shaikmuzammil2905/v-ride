import React, { useState } from 'react';
import {
  Plus, Trash2, Star, MessageSquare, Flag, CheckCircle2,
  Clock, FileText, Download, ShieldCheck, Send, Users, Tag
} from 'lucide-react';
import { apiRequest } from '../../services/api';

export const VendorStaffView = ({ restaurantId, staffList, setStaffList, showToast }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Kitchen Staff');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    const res = await apiRequest(`/vendor/${restaurantId}/staff`, {
      method: 'POST',
      body: JSON.stringify({ name: name.trim(), role, phone: phone.trim() })
    });
    setSaving(false);
    const created = res?.data || { id: 'stf_' + Date.now(), name: name.trim(), role, phone: phone.trim(), active: true };
    setStaffList((p) => [created, ...p]);
    setName('');
    setPhone('');
    showToast(`${created.name} added as ${role}`);
  };

  const handleToggle = async (staff) => {
    const active = !staff.active;
    await apiRequest(`/vendor/${restaurantId}/staff/${staff.id}`, {
      method: 'PUT',
      body: JSON.stringify({ active })
    });
    setStaffList((p) => p.map((s) => (s.id === staff.id ? { ...s, active } : s)));
    showToast(`${staff.name} ${active ? 'activated' : 'deactivated'}`);
  };

  const handleRemove = async (staffId) => {
    await apiRequest(`/vendor/${restaurantId}/staff/${staffId}`, { method: 'DELETE' });
    setStaffList((p) => p.filter((x) => x.id !== staffId));
    showToast('Staff member removed');
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#10151F]" />
          <h3 className="font-black text-sm">Add Staff Member</h3>
        </div>
        <form onSubmit={handleAdd} className="space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Staff full name *"
              required
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFD000]"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Mobile number"
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFD000]"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-bold bg-white"
            >
              <option value="Owner/Admin">Owner/Admin (Full Access)</option>
              <option value="Order Staff">Order Staff (Orders Only)</option>
              <option value="Kitchen Staff">Kitchen Staff (Preparing Workflow)</option>
              <option value="Menu Staff">Menu Staff (Menu Management)</option>
            </select>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2.5 rounded-xl bg-[#FFD000] text-black font-black text-xs flex items-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{saving ? 'Adding...' : 'Add'}</span>
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-2.5">
        <h3 className="font-black text-sm">Active Team ({staffList.length})</h3>
        {staffList.length === 0 ? (
          <p className="text-xs text-gray-500 py-4 text-center">No staff members added yet.</p>
        ) : (
          staffList.map((s) => (
            <div key={s.id} className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between gap-2 text-xs">
              <div className="min-w-0">
                <span className="font-black text-gray-900 block truncate">{s.name}</span>
                <span className="text-[11px] text-gray-500 font-semibold">{s.role}{s.phone ? ` · ${s.phone}` : ''}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggle(s)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                    s.active !== false ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {s.active !== false ? 'Active' : 'Inactive'}
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(s.id)}
                  className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                  aria-label="Remove staff"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export const VendorOffersView = ({ restaurantId, offersList, setOffersList, showToast }) => {
  const [title, setTitle] = useState('');
  const [offerType, setOfferType] = useState('Restaurant Offer');
  const [discountPercent, setDiscountPercent] = useState('20');
  const [minOrder, setMinOrder] = useState('199');
  const [validUntil, setValidUntil] = useState('2026-12-31');
  const [saving, setSaving] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    const res = await apiRequest(`/vendor/${restaurantId}/offers`, {
      method: 'POST',
      body: JSON.stringify({
        title: title.trim(),
        type: offerType,
        discountPercent: Number(discountPercent),
        minOrder: Number(minOrder),
        validUntil
      })
    });
    setSaving(false);
    const created = res?.data || {
      id: 'off_' + Date.now(),
      title: title.trim(),
      type: offerType,
      discountPercent: Number(discountPercent),
      minOrder: Number(minOrder),
      validUntil,
      status: 'pending_approval',
      active: false
    };
    setOffersList((p) => [created, ...p]);
    setTitle('');
    showToast('Offer submitted — Pending Admin Approval');
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-[#10151F]" />
          <h3 className="font-black text-sm">Create Promotion / Offer</h3>
        </div>
        <form onSubmit={handleCreate} className="space-y-2.5 text-xs">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Offer title (e.g. Flat 20% OFF on Biryani) *"
            required
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFD000]"
          />
          <div className="grid grid-cols-2 gap-2.5">
            <select
              value={offerType}
              onChange={(e) => setOfferType(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-gray-200 font-bold bg-white"
            >
              <option value="Restaurant Offer">Restaurant Offer</option>
              <option value="Product Discount">Product Discount</option>
              <option value="Combo">Combo Deal</option>
            </select>
            <input
              type="number"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              placeholder="Discount %"
              min="5"
              max="80"
              className="px-3 py-2.5 rounded-xl border border-gray-200 font-semibold"
            />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <input
              type="number"
              value={minOrder}
              onChange={(e) => setMinOrder(e.target.value)}
              placeholder="Min order ₹"
              className="px-3 py-2.5 rounded-xl border border-gray-200 font-semibold"
            />
            <input
              type="date"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-gray-200 font-semibold"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full py-2.5 rounded-xl bg-[#FFD000] text-black font-black text-xs shadow-xs"
          >
            {saving ? 'Submitting...' : 'Submit Offer for Approval'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-2.5">
        <h3 className="font-black text-sm">Your Offers ({offersList.length})</h3>
        {offersList.map((o) => (
          <div key={o.id} className="p-3 rounded-xl bg-yellow-50/70 border border-yellow-200 flex items-center justify-between gap-2 text-xs">
            <div className="min-w-0">
              <span className="font-black text-gray-900 block truncate">{o.title}</span>
              <span className="text-[11px] text-gray-600">
                {o.type || 'Restaurant Offer'} · Min ₹{o.minOrder || 199}
              </span>
            </div>
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-black shrink-0 ${
                o.status === 'pending_approval'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {o.status === 'pending_approval' ? 'Pending Admin Approval' : 'Active'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const VendorReviewsView = ({ restaurantId, reviewsList, setReviewsList, showToast }) => {
  const [replyDrafts, setReplyDrafts] = useState({});

  const handleReply = async (reviewId) => {
    const reply = (replyDrafts[reviewId] || '').trim();
    if (!reply) return;
    await apiRequest(`/vendor/${restaurantId}/reviews/${reviewId}/reply`, {
      method: 'POST',
      body: JSON.stringify({ reply })
    });
    setReviewsList((p) => p.map((r) => (r.id === reviewId ? { ...r, reply } : r)));
    setReplyDrafts((p) => ({ ...p, [reviewId]: '' }));
    showToast('Reply posted');
  };

  const handleReport = async (reviewId) => {
    await apiRequest(`/vendor/${restaurantId}/reviews/${reviewId}/report`, {
      method: 'POST',
      body: JSON.stringify({ reason: 'Flagged by restaurant' })
    });
    setReviewsList((p) => p.map((r) => (r.id === reviewId ? { ...r, reported: true } : r)));
    showToast('Review reported to moderation');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-black text-sm">Customer Ratings & Reviews</h3>
        <span className="text-xs font-black bg-yellow-100 text-yellow-900 px-2.5 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" /> 4.6 Overall
        </span>
      </div>

      {reviewsList.map((r) => (
        <div key={r.id} className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-2">
          <div className="flex justify-between items-center font-black">
            <span>{r.customer}</span>
            <span className="text-amber-600">★ {r.rating}</span>
          </div>
          <p className="text-gray-700">{r.comment}</p>
          {r.reply && (
            <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 font-semibold">
              Your Reply: {r.reply}
            </div>
          )}
          <div className="flex gap-2 pt-1">
            <input
              type="text"
              value={replyDrafts[r.id] || ''}
              onChange={(e) => setReplyDrafts((p) => ({ ...p, [r.id]: e.target.value }))}
              placeholder="Write a reply..."
              className="flex-1 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-[11px]"
            />
            <button
              type="button"
              onClick={() => handleReply(r.id)}
              className="px-3 py-1.5 rounded-lg bg-[#FFD000] text-black font-black text-[11px]"
            >
              Reply
            </button>
            <button
              type="button"
              onClick={() => handleReport(r.id)}
              disabled={r.reported}
              className="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 font-bold text-[11px] flex items-center gap-1 disabled:opacity-50"
            >
              <Flag className="w-3 h-3" />
              <span>{r.reported ? 'Reported' : 'Report'}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export const VendorSupportView = ({ restaurant, showToast }) => {
  const [category, setCategory] = useState('Order Complaint');
  const [orderId, setOrderId] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [tickets, setTickets] = useState([
    { id: 'TKT-401', category: 'Settlement Issue', subject: 'Weekly payout confirmation', status: 'Resolved', date: '25 Nov 2026' }
  ]);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    setSubmitting(true);
    await apiRequest('/support/ticket', {
      method: 'POST',
      body: JSON.stringify({
        userName: restaurant.name,
        category,
        orderId,
        subject: subject.trim(),
        message: message.trim()
      })
    });
    setSubmitting(false);
    setTickets((p) => [
      {
        id: 'TKT-' + Math.floor(500 + Math.random() * 400),
        category,
        subject: subject.trim(),
        status: 'Open',
        date: 'Just now'
      },
      ...p
    ]);
    setSubject('');
    setMessage('');
    setOrderId('');
    showToast('Support ticket submitted');
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
        <h3 className="font-black text-sm">Raise Vendor Support Ticket</h3>
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-gray-200 font-bold bg-white"
            >
              <option value="Order Complaint">Order Complaint</option>
              <option value="Payment Issue">Payment Issue</option>
              <option value="Settlement Issue">Settlement Issue</option>
              <option value="Rider Issue">Rider Issue</option>
              <option value="Technical Issue">Technical Issue</option>
            </select>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Order ID (optional)"
              className="px-3 py-2.5 rounded-xl border border-gray-200 font-semibold"
            />
          </div>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Ticket Subject *"
            required
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 font-semibold"
          />
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your issue..."
            required
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 font-semibold"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-[#FFD000] text-black font-black flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{submitting ? 'Submitting...' : 'Submit Support Ticket'}</span>
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-2.5">
        <h3 className="font-black text-sm">Recent Tickets</h3>
        {tickets.map((t) => (
          <div key={t.id} className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex justify-between items-center">
            <div>
              <span className="font-black block">{t.subject}</span>
              <span className="text-[11px] text-gray-500">{t.id} · {t.category} · {t.date}</span>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
              t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {t.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
