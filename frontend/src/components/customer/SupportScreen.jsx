import React, { useState, useEffect } from 'react';
import {
  HelpCircle, MessageSquare, Phone, ChevronDown, CheckCircle2,
  Upload, Trash2, ArrowLeft
} from 'lucide-react';
import { apiRequest, uploadMediaToS3 } from '../../services/api';
import { useApp } from '../../context/AppContext';

export const SupportScreen = ({ onBack }) => {
  const { currentUser } = useApp();
  const [openFaq, setOpenFaq] = useState(null);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Ride Booking');
  const [message, setMessage] = useState('');
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [ticketSent, setTicketSent] = useState(false);
  const [tickets, setTickets] = useState([
    {
      id: 'tkt_demo_1',
      subject: 'Coupon VRIDE20 inquiry',
      category: 'Food Order',
      message: 'Applied coupon on Paradise Biryani order.',
      status: 'resolved',
      adminReply: 'Discount credited to your V RIDE Wallet.',
      createdAt: new Date().toISOString()
    }
  ]);

  useEffect(() => {
    apiRequest('/support/tickets').then((res) => {
      if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
        setTickets(res.data);
      }
    });
  }, []);

  const faqs = [
    {
      q: 'How is the ride fare calculated?',
      a: 'Fares are calculated using transparent base rates plus distance (per-km) set by city rules, with zero hidden charges.'
    },
    {
      q: 'Can I track my parcel delivery live?',
      a: 'Yes! V RIDE provides real-time GPS tracking from doorstep pickup to delivery, along with two-factor OTP verification.'
    },
    {
      q: 'How do Razorpay payments & refunds work?',
      a: 'All UPI, Card, and Wallet top-ups are processed via Razorpay. Refunds are credited within 15 minutes to your V RIDE Wallet.'
    },
    {
      q: 'How do I use promo coupons?',
      a: 'Enter promo code VRIDE20 during checkout in Food or FIRST50 on your first ride to get instant discounts.'
    }
  ];

  const handleFileAttach = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const res = await uploadMediaToS3(file, 'support-attachments');
    setUploading(false);
    if (res?.success && res.data?.url) {
      setAttachmentUrl(res.data.url);
    } else {
      setAttachmentUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setTicketSent(true);

    const payload = {
      userId: currentUser?.id || 'usr_srilatha',
      userName: currentUser?.name || 'Sri Latha',
      category,
      subject: subject || `${category} Support Request`,
      message,
      attachmentUrl
    };

    const res = await apiRequest('/support/ticket', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    const newTicket = res?.data || {
      id: `tkt_${Date.now()}`,
      ...payload,
      status: 'open',
      createdAt: new Date().toISOString()
    };

    setTickets((prev) => [newTicket, ...prev]);
    setSubject('');
    setMessage('');
    setAttachmentUrl('');
    setTimeout(() => setTicketSent(false), 1800);
  };

  const handleDeleteTicket = async (id) => {
    await apiRequest(`/support/tickets/${id}`, { method: 'DELETE' });
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="flex flex-col bg-[#f8f9fa] pb-2 select-none">
      {/* Dark Header */}
      <div className="relative bg-[#0b0e14] text-white px-4 py-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {onBack && (
              <button
                onClick={onBack}
                className="p-1.5 rounded-full glass-btn-dark text-white active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <h1 className="text-base font-black text-white">24/7 Help & Support Panel</h1>
              <p className="text-[10px] text-gray-300">AWS S3 Evidence Upload · Live Ticket Tracking</p>
            </div>
          </div>
          <span className="text-[10px] font-black bg-[#FFD600] text-black px-2 py-0.5 rounded-full">
            LIVE HELP
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFD600]"></div>
      </div>

      <div className="p-4 space-y-4">
        {/* Quick Contact Card */}
        <div className="rounded-2xl bg-yellow-50 border border-yellow-200 p-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-xs text-gray-900">Need Immediate Help?</h3>
            <p className="text-[11px] text-gray-600">Call our Hyderabad 24/7 helpline</p>
          </div>
          <a
            href="tel:+9118002008743"
            className="glass-btn-dark px-3 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#FFD600]" />
            <span>1800-200-8743</span>
          </a>
        </div>

        {/* Raise a Support Ticket Form */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <h3 className="font-black text-xs text-gray-900 uppercase tracking-wide">Raise a Support Ticket</h3>
          <form onSubmit={handleSubmitTicket} className="space-y-2.5">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Issue Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none"
              >
                <option value="Ride Booking">Ride Booking Issue</option>
                <option value="Parcel Delivery">Parcel Delivery</option>
                <option value="Food Order">Food Order & Quality</option>
                <option value="Wallet & Payment">Wallet & Razorpay Refund</option>
                <option value="Partner Feedback">Driver / Partner Behaviour</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of your issue"
                required
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Describe Details</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Explain your issue..."
                required
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none"
              />
            </div>

            {/* S3 Attachment Upload */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
                Attach Screenshot (AWS S3)
              </label>
              <label className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed border-gray-300 bg-gray-50 text-xs font-bold text-gray-700 cursor-pointer hover:border-yellow-400">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploading ? 'Uploading to S3...' : attachmentUrl ? 'Screenshot Attached ✓' : 'Upload Screenshot'}</span>
                <input type="file" accept="image/*" onChange={handleFileAttach} className="hidden" />
              </label>
            </div>

            <button
              type="submit"
              disabled={ticketSent || uploading}
              className="glass-btn-yellow w-full py-3 rounded-xl text-black font-black text-xs flex items-center justify-center gap-1.5"
            >
              {ticketSent ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Ticket Submitted!</span>
                </>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4" />
                  <span>Submit Support Ticket</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* My Tickets */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">My Support Tickets</h2>
          {tickets.map((t) => (
            <div key={t.id} className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-black text-xs text-gray-900">{t.subject}</span>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${
                    t.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {t.status || 'open'}
                  </span>
                  <button
                    onClick={() => handleDeleteTicket(t.id)}
                    className="p-1 rounded-lg text-gray-400 hover:text-red-600"
                    title="Delete ticket"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-gray-600">{t.message}</p>
              {t.adminReply && (
                <div className="p-2 rounded-xl bg-emerald-50 text-[10px] text-emerald-800 font-semibold">
                  Support Reply: {t.adminReply}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-3.5 flex items-center justify-between text-left text-xs font-bold text-gray-800"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-3.5 pt-0 text-xs text-gray-600 leading-relaxed border-t border-gray-50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportScreen;
