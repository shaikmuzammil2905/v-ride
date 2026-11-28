import React, { useState, useEffect } from 'react';
import {
  MapPin, Phone, MessageSquare, CheckCircle2, X, Check,
  ChevronRight, Package, Bike, AlertCircle, Navigation
} from 'lucide-react';
import MapComponent from '../common/MapComponent';
import { apiRequest } from '../../services/api';

/**
 * 4 Rider Workflow Screens matching image copy 34.png:
 * 1. Incoming Ride Request (with countdown timer)
 * 2. Ride in Progress (Mapbox + OTP verification)
 * 3. Food Delivery (Order #FD28491 4-step timeline)
 * 4. Trip Completed (Fare Summary + Done)
 */
export const IncomingRequestScreen = ({ job, onAccept, onReject }) => {
  const [secondsLeft, setSecondsLeft] = useState(28);

  useEffect(() => {
    setSecondsLeft(28);
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onReject('timeout');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [job?.id]);

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden max-w-md mx-auto">
      <div className="bg-[#10151F] text-white p-4 text-center space-y-1">
        <span className="text-[#FFD000] text-xs font-black tracking-widest uppercase block">((•)) Live Alert</span>
        <h2 className="text-lg font-black">
          {job.jobType === 'food' ? 'Incoming Food Order' : 'Incoming Ride Request'}
        </h2>
      </div>

      <div className="p-5 space-y-4">
        {/* Pickup & Drop */}
        <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-200 space-y-3">
          <div className="flex items-start gap-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-emerald-200 mt-1 shrink-0"></span>
            <div>
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Pickup</span>
              <p className="text-xs font-black text-gray-900">{job.pickupTitle}</p>
              <p className="text-[11px] text-gray-500">{job.pickupAddress}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 pt-2 border-t border-gray-200">
            <span className="w-3 h-3 rounded-full bg-red-500 ring-2 ring-red-200 mt-1 shrink-0"></span>
            <div>
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Drop</span>
              <p className="text-xs font-black text-gray-900">{job.dropTitle}</p>
              <p className="text-[11px] text-gray-500">{job.dropAddress}</p>
            </div>
          </div>
        </div>

        {/* Fare / Distance / Time */}
        <div className="grid grid-cols-3 gap-2 text-center bg-gray-50 p-3 rounded-2xl border border-gray-100">
          <div>
            <span className="text-[10px] text-gray-500 font-bold block">Estimated Fare</span>
            <span className="text-lg font-black text-gray-900">₹{job.fare}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-bold block">Distance</span>
            <span className="text-sm font-black text-gray-900">{job.distance}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-bold block">Est. Time</span>
            <span className="text-sm font-black text-gray-900">{job.estTime}</span>
          </div>
        </div>

        {/* Countdown Ring */}
        <div className="flex flex-col items-center py-2">
          <div className="w-16 h-16 rounded-full border-4 border-[#FFD000] flex items-center justify-center shadow-sm">
            <span className="text-base font-black text-gray-900">{secondsLeft} s</span>
          </div>
          <span className="text-xs font-bold text-gray-600 mt-2">
            Accept this {job.jobType === 'food' ? 'delivery' : 'ride'}?
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onReject('rejected')}
            className="py-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 font-black text-xs flex items-center justify-center gap-1.5 hover:bg-red-100 active:scale-95 transition"
          >
            <X className="w-4 h-4" />
            <span>Reject</span>
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="py-3 rounded-2xl bg-[#FFD000] text-black font-black text-xs flex items-center justify-center gap-1.5 shadow-md hover:bg-yellow-400 active:scale-95 transition"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Accept</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const RideInProgressScreen = ({ job, onComplete, onCancel }) => {
  const [stage, setStage] = useState('to_pickup'); // 'to_pickup' | 'at_pickup' | 'on_trip'
  const [otpDigits, setOtpDigits] = useState(['7', '4', '9', '2']);
  const [otpError, setOtpError] = useState('');

  const handleDigitChange = (idx, val) => {
    const clean = val.replace(/[^0-9]/g, '').slice(-1);
    const next = [...otpDigits];
    next[idx] = clean;
    setOtpDigits(next);
    setOtpError('');
  };

  const handleVerifyAndStart = async () => {
    const entered = otpDigits.join('');
    const res = await apiRequest(`/rider/jobs/${job.id}/verify-otp`, {
      method: 'POST',
      body: JSON.stringify({ otp: entered, expectedOtp: job.otp || '7492' })
    });
    if (res && !res.success) {
      setOtpError(res.message || 'Invalid OTP');
      return;
    }
    if (!res && entered !== (job.otp || '7492')) {
      setOtpError('Invalid OTP! Ask customer for 7492.');
      return;
    }
    setStage('on_trip');
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden max-w-md mx-auto">
      <div className="bg-[#10151F] text-white px-4 py-3 flex items-center justify-between">
        <h2 className="text-sm font-black">Ride in Progress</h2>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-black">
          {stage === 'on_trip' ? 'On Trip' : stage === 'at_pickup' ? 'At Pickup' : 'Heading to Pickup'}
        </span>
      </div>

      <div className="p-4 space-y-4">
        <MapComponent
          pickupName={job.pickupTitle}
          dropName={job.dropTitle}
          vehicleType="bike"
          height="210px"
        />

        {stage !== 'on_trip' && (
          <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 space-y-2.5 text-center">
            <span className="text-xs font-bold text-gray-600 block">Ride OTP (to start)</span>
            <div className="flex justify-center gap-2.5">
              {otpDigits.map((d, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleDigitChange(i, e.target.value)}
                  className="w-11 h-11 text-center text-lg font-black bg-white border-2 border-gray-300 rounded-xl focus:border-[#FFD000] focus:outline-none"
                />
              ))}
            </div>
            {otpError && <p className="text-[11px] text-red-600 font-bold">{otpError}</p>}
          </div>
        )}

        {/* Customer Info */}
        <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFD000] text-black flex items-center justify-center font-black text-xs">
              SL
            </div>
            <div>
              <h4 className="font-black text-xs text-gray-900">{job.customerName || 'Sri Latha'}</h4>
              <p className="text-[11px] text-gray-500 font-semibold">★ 4.9 (328 rides)</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a href="tel:+919876543210" className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-800">
              <Phone className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => alert('Masked chat opened with customer.')}
              className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-800"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Action Button */}
        {stage === 'to_pickup' && (
          <button
            type="button"
            onClick={() => setStage('at_pickup')}
            className="w-full py-3.5 rounded-2xl bg-[#FFD000] text-black font-black text-xs shadow-md"
          >
            Reached Pickup Location →
          </button>
        )}

        {stage === 'at_pickup' && (
          <button
            type="button"
            onClick={handleVerifyAndStart}
            className="w-full py-3.5 rounded-2xl bg-[#FFD000] text-black font-black text-xs shadow-md"
          >
            » Start Ride (Verify OTP & Begin Trip)
          </button>
        )}

        {stage === 'on_trip' && (
          <button
            type="button"
            onClick={onComplete}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 text-white font-black text-xs shadow-md"
          >
            Complete Ride & Generate Fare ✓
          </button>
        )}

        <button
          type="button"
          onClick={onCancel}
          className="w-full py-2 text-[11px] font-bold text-red-600 hover:underline"
        >
          Cancel Trip (With Reason)
        </button>
      </div>
    </div>
  );
};

export const FoodDeliveryScreen = ({ job, onComplete }) => {
  const steps = ['Accepted', 'Pickup', 'On the Way', 'Delivered'];
  const [stepIdx, setStepIdx] = useState(1); // 1 = Pickup
  const [codCollected, setCodCollected] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden max-w-md mx-auto">
      <div className="bg-[#10151F] text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#FFD000] text-black flex items-center justify-center text-xs font-black">🍴</span>
          <span className="text-sm font-black">Food Delivery</span>
        </div>
        <span className="text-[11px] font-bold text-gray-300 bg-white/10 px-2.5 py-0.5 rounded-full">
          Order #{job.orderCode || 'FD28491'}
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* 4-Step Timeline */}
        <div className="grid grid-cols-4 gap-1 text-center pt-1">
          {steps.map((s, idx) => {
            const done = idx < stepIdx;
            const current = idx === stepIdx;
            return (
              <div key={s} className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${
                  done ? 'bg-emerald-500 text-white' : current ? 'bg-[#FFD000] text-black ring-2 ring-yellow-200' : 'bg-gray-200 text-gray-500'
                }`}>
                  {done ? '✓' : idx + 1}
                </div>
                <span className={`text-[10px] mt-1 font-bold ${current ? 'text-black' : 'text-gray-500'}`}>{s}</span>
              </div>
            );
          })}
        </div>

        {/* Pickup Restaurant */}
        <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/food-biryani.jpg" alt="Restaurant" className="w-11 h-11 rounded-xl object-cover" />
            <div>
              <span className="text-[10px] font-bold text-gray-400 block">Pickup from</span>
              <h4 className="font-black text-xs text-gray-900">{job.pickupTitle || 'Paradise Biryani'}</h4>
              <p className="text-[10px] text-gray-500">{job.pickupAddress || 'Miyapur, Hyderabad'}</p>
            </div>
          </div>
          <a href="tel:+919000111222" className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center">
            <Phone className="w-4 h-4 text-gray-700" />
          </a>
        </div>

        {/* Deliver To Customer */}
        <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 block">Deliver to</span>
              <h4 className="font-black text-xs text-gray-900">{job.customerName || 'Anil Kumar'}</h4>
              <p className="text-[10px] text-gray-500">{job.dropAddress || 'Kukatpally, Hyderabad'}</p>
            </div>
          </div>
          <a href="tel:+919988765432" className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center">
            <Phone className="w-4 h-4 text-gray-700" />
          </a>
        </div>

        {/* Delivery Code OTP */}
        <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200 text-center space-y-2">
          <span className="text-xs font-bold text-gray-600 block">Delivery Code (OTP)</span>
          <div className="flex justify-center gap-2">
            {['8', '3', '7', '5'].map((d, i) => (
              <span key={i} className="w-10 h-10 rounded-xl bg-white border border-gray-300 flex items-center justify-center font-black text-base">
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* COD Tracking */}
        {job.codAmount > 0 && (
          <label className="flex items-center justify-between p-3 rounded-2xl bg-yellow-50 border border-yellow-200 text-xs font-bold cursor-pointer">
            <span>Collect COD Cash: ₹{job.codAmount}</span>
            <input type="checkbox" checked={codCollected} onChange={(e) => setCodCollected(e.target.checked)} className="w-4 h-4 accent-black" />
          </label>
        )}

        {stepIdx === 1 && (
          <button
            type="button"
            onClick={() => setStepIdx(2)}
            className="w-full py-3.5 rounded-2xl bg-[#FFD000] text-black font-black text-xs shadow-md"
          >
            📦 Mark as Picked (I have collected the order)
          </button>
        )}

        {stepIdx === 2 && (
          <button
            type="button"
            onClick={() => setStepIdx(3)}
            className="w-full py-3.5 rounded-2xl bg-[#FFD000] text-black font-black text-xs shadow-md"
          >
            Reached Customer & Verify OTP →
          </button>
        )}

        {stepIdx === 3 && (
          <button
            type="button"
            onClick={onComplete}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 text-white font-black text-xs shadow-md"
          >
            Confirm Order Delivered ✓
          </button>
        )}
      </div>
    </div>
  );
};

export const TripCompletedScreen = ({ summary, onDone }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden max-w-md mx-auto">
      <div className="bg-[#10151F] text-white p-6 text-center space-y-2">
        <div className="w-14 h-14 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center shadow-lg">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-black">Trip Completed</h2>
        <p className="text-xs text-gray-300">
          {summary.jobType === 'food' ? 'Food order delivered successfully' : 'Ride successfully completed'}
        </p>
      </div>

      <div className="p-5 space-y-4">
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4 space-y-2.5 text-xs">
          <h3 className="font-black text-gray-900 pb-2 border-b border-gray-200">Fare Summary</h3>
          <div className="flex justify-between">
            <span className="text-gray-600">Trip Fare</span>
            <span className="font-bold text-gray-900">₹{summary.fare}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Platform Fee</span>
            <span className="font-bold text-red-600">- ₹{summary.platformFee}</span>
          </div>
          {summary.tips > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Customer Tip</span>
              <span className="font-bold text-emerald-600">+ ₹{summary.tips}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-gray-200 bg-yellow-50 -mx-4 -mb-4 p-4 rounded-b-2xl">
            <span className="font-black text-gray-900 text-sm">Your Earnings</span>
            <span className="font-black text-gray-900 text-base">₹{summary.netEarnings}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-black text-gray-900 block">Payment Status</span>
              <span className="text-[11px] text-emerald-800 font-semibold">
                Paid by Customer ({summary.paymentMode || 'UPI'})
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-emerald-700" />
        </div>

        <button
          type="button"
          onClick={onDone}
          className="w-full py-3.5 rounded-2xl bg-[#FFD000] hover:bg-yellow-400 text-black font-black text-xs shadow-md active:scale-98 transition"
        >
          Done
        </button>
      </div>
    </div>
  );
};
