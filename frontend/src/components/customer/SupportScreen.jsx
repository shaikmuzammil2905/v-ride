import React, { useState } from 'react';
import { HelpCircle, MessageSquare, Phone, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react';

export const SupportScreen = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Ride Booking');
  const [message, setMessage] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  const faqs = [
    {
      q: 'How is the ride fare calculated?',
      a: 'Fares are calculated using transparent base rates plus distance (per-km) set by government & city rules, with zero hidden charges.'
    },
    {
      q: 'Can I track my parcel delivery live?',
      a: 'Yes! V RIDE provides real-time GPS tracking from doorstep pickup to delivery, along with two-factor OTP verification.'
    },
    {
      q: 'What if my food order is delayed?',
      a: 'Our 24x7 customer support actively monitors kitchen prep and rider routes. We credit instant wallet compensation for unexpected delays.'
    },
    {
      q: 'How do I use promo coupons?',
      a: 'Enter promo code VRIDE20 during checkout in Food or FIRST50 on your first ride to get instant percentage discounts.'
    }
  ];

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setTicketSent(true);
    setTimeout(() => {
      setSubject('');
      setMessage('');
      setTicketSent(false);
      alert('Support ticket #VR-9821 submitted. Our agent will respond via SMS & in-app within 15 minutes.');
    }, 1200);
  };

  return (
    <div className="flex flex-col bg-[#f8f9fa] pb-2 select-none">
      <div className="px-5 py-4 bg-white border-b border-gray-100">
        <h1 className="text-base font-bold text-gray-900">24/7 Help & Support</h1>
      </div>

      <div className="p-5 space-y-5">
        {/* Quick Contact Card */}
        <div className="rounded-2xl bg-yellow-50 border border-yellow-200 p-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-xs text-gray-900">Need Immediate Help?</h3>
            <p className="text-[11px] text-gray-600">Call our Hyderabad 24/7 helpline</p>
          </div>
          <a
            href="tel:+9118002008743"
            className="px-3 py-2 rounded-xl bg-black text-white font-bold text-xs flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>1800-200-8743</span>
          </a>
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

        {/* Raise a Support Ticket Form */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <h3 className="font-bold text-xs text-gray-900">Raise a Support Ticket</h3>
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
                <option value="Wallet & Payment">Wallet & Payment Refund</option>
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please describe what happened..."
                rows="3"
                required
                className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={ticketSent}
              className="w-full py-3 rounded-xl bg-vride-yellow text-black font-extrabold text-xs shadow-xs hover:bg-yellow-400 transition"
            >
              {ticketSent ? 'Submitting Ticket...' : 'Submit Support Ticket'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SupportScreen;
