import React, { useState, useEffect } from 'react';
import {
  Bike, Power, Navigation, Phone, CheckCircle2, AlertCircle,
  Wallet, DollarSign, Clock, ShieldCheck, MapPin, ChevronRight,
  TrendingUp, Award, ArrowUpRight, Check, X, Bell
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import MapComponent from '../common/MapComponent';

export const PartnerApp = () => {
  const { currentPartner, setCurrentPartner } = useApp();

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'jobs' | 'earnings' | 'profile'
  const [isOnline, setIsOnline] = useState(currentPartner.isOnline ?? true);
  const [incomingJob, setIncomingJob] = useState(null);
  const [activeJob, setActiveJob] = useState(null);
  const [jobStep, setJobStep] = useState('pickup'); // 'pickup' | 'verify_otp' | 'in_transit' | 'completed'
  const [inputOtp, setInputOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState('1500');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // Auto trigger a mock incoming job when going online if no active job
  useEffect(() => {
    let timer;
    if (isOnline && !activeJob && !incomingJob) {
      timer = setTimeout(() => {
        setIncomingJob({
          id: 'job_' + Date.now(),
          type: 'ride',
          title: 'New Bike Ride Request',
          customerName: 'Sri Latha',
          customerPhone: '+91 98765 43210',
          pickup: 'Miyapur Metro Station, Hyderabad',
          drop: 'Kukatpally Y Junction, Hyderabad',
          distance: '5.4 km',
          earning: 58,
          otp: '7391'
        });
      }, 3500);
    }
    return () => clearTimeout(timer);
  }, [isOnline, activeJob, incomingJob]);

  const handleAcceptJob = () => {
    setActiveJob(incomingJob);
    setIncomingJob(null);
    setJobStep('pickup');
  };

  const handleRejectJob = () => {
    setIncomingJob(null);
  };

  const handleVerifyOtp = () => {
    if (inputOtp === activeJob.otp || inputOtp === '1234' || inputOtp === '7391') {
      setJobStep('in_transit');
      setOtpError('');
    } else {
      setOtpError('Invalid OTP! Please ask customer for correct 4-digit OTP.');
    }
  };

  const handleCompleteJob = () => {
    setJobStep('completed');
    // Credit partner wallet
    setCurrentPartner(prev => ({
      ...prev,
      walletBalance: (prev.walletBalance || 0) + activeJob.earning,
      totalTrips: (prev.totalTrips || 0) + 1
    }));
  };

  const handleFinishAndReset = () => {
    setActiveJob(null);
    setJobStep('pickup');
    setInputOtp('');
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-[#111111] text-white flex flex-col justify-between select-none shadow-2xl">
      {/* Top Header */}
      <div className="bg-[#1C1C1E] px-4 py-3 border-b border-neutral-800 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-vride-yellow text-black flex items-center justify-center font-black">
            🛵
          </div>
          <div>
            <h1 className="text-sm font-extrabold tracking-wide flex items-center gap-1.5">
              <span>{currentPartner.name || 'Ramesh K'}</span>
              <span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-1.5 py-0.2 rounded">
                Verified
              </span>
            </h1>
            <p className="text-[10px] text-gray-400">
              {currentPartner.vehicleModel} · {currentPartner.vehicleNumber}
            </p>
          </div>
        </div>

        {/* Online / Offline Toggle */}
        <button
          onClick={() => setIsOnline(!isOnline)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all ${
            isOnline
              ? 'bg-green-500 text-black shadow-lg shadow-green-500/30'
              : 'bg-neutral-800 text-gray-400 border border-neutral-700'
          }`}
        >
          <Power className="w-3.5 h-3.5 stroke-[3]" />
          <span>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'dashboard' && (
          <>
            {/* Status Alert Banner */}
            <div className={`p-3.5 rounded-2xl flex items-center justify-between text-xs font-bold border ${
              isOnline
                ? 'bg-green-950/40 border-green-800 text-green-300'
                : 'bg-neutral-900 border-neutral-800 text-gray-400'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-400 animate-ping' : 'bg-gray-500'}`}></span>
                <span>{isOnline ? 'Active & Receiving Bookings in Miyapur' : 'You are offline. Go online to earn.'}</span>
              </div>
              <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded font-mono">GPS Active</span>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-[#1C1C1E] p-3 rounded-2xl border border-neutral-800 text-center">
                <span className="text-[10px] text-gray-400 font-semibold block uppercase">Today's Earnings</span>
                <p className="text-base font-black text-vride-yellow mt-0.5">₹580</p>
              </div>
              <div className="bg-[#1C1C1E] p-3 rounded-2xl border border-neutral-800 text-center">
                <span className="text-[10px] text-gray-400 font-semibold block uppercase">Trips Today</span>
                <p className="text-base font-black text-white mt-0.5">8</p>
              </div>
              <div className="bg-[#1C1C1E] p-3 rounded-2xl border border-neutral-800 text-center">
                <span className="text-[10px] text-gray-400 font-semibold block uppercase">Rating</span>
                <p className="text-base font-black text-white mt-0.5 flex items-center justify-center gap-1">
                  <span>★</span> 4.8
                </p>
              </div>
            </div>

            {/* ACTIVE JOB EXECUTION CARD */}
            {activeJob ? (
              <div className="bg-[#1C1C1E] border border-yellow-500/50 rounded-3xl p-4 shadow-xl space-y-3.5">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
                  <span className="text-xs font-black text-vride-yellow uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-vride-yellow animate-ping"></span>
                    Ongoing {activeJob.type.toUpperCase()} Job
                  </span>
                  <span className="text-xs font-extrabold text-green-400">
                    Earn ₹{activeJob.earning}
                  </span>
                </div>

                {/* Map Navigation View */}
                <MapComponent
                  pickupName={activeJob.pickup}
                  dropName={activeJob.drop}
                  vehicleType="bike"
                  height="160px"
                />

                {/* Customer Details */}
                <div className="bg-black/60 p-3 rounded-2xl border border-neutral-800 flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-xs text-white">{activeJob.customerName}</h3>
                    <p className="text-[11px] text-gray-400">{activeJob.customerPhone}</p>
                  </div>
                  <a
                    href={`tel:${activeJob.customerPhone}`}
                    className="p-2 rounded-xl bg-vride-yellow text-black font-bold flex items-center gap-1 text-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                </div>

                {/* Pickup & Drop Points */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-1"></span>
                    <div>
                      <span className="text-[10px] text-gray-400 block font-bold uppercase">Pickup Point</span>
                      <p className="font-semibold text-gray-200">{activeJob.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-1"></span>
                    <div>
                      <span className="text-[10px] text-gray-400 block font-bold uppercase">Drop Point</span>
                      <p className="font-semibold text-gray-200">{activeJob.drop}</p>
                    </div>
                  </div>
                </div>

                {/* Execution Step Controls */}
                {jobStep === 'pickup' && (
                  <button
                    onClick={() => setJobStep('verify_otp')}
                    className="w-full py-3 rounded-2xl bg-vride-yellow text-black font-extrabold text-xs shadow-lg hover:bg-yellow-400 transition"
                  >
                    Reached Pickup Location →
                  </button>
                )}

                {jobStep === 'verify_otp' && (
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-300 font-bold uppercase block">
                      Enter Customer Ride Start OTP (Demo: {activeJob.otp})
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength="4"
                        value={inputOtp}
                        onChange={(e) => setInputOtp(e.target.value)}
                        placeholder="4-digit OTP"
                        className="flex-1 px-3 py-2.5 rounded-xl bg-black border border-neutral-700 text-center font-black text-base text-yellow-400 tracking-widest focus:outline-none"
                      />
                      <button
                        onClick={handleVerifyOtp}
                        className="px-4 py-2.5 rounded-xl bg-vride-yellow text-black font-extrabold text-xs"
                      >
                        Verify & Start
                      </button>
                    </div>
                    {otpError && <p className="text-[11px] text-red-400 font-bold">{otpError}</p>}
                  </div>
                )}

                {jobStep === 'in_transit' && (
                  <button
                    onClick={handleCompleteJob}
                    className="w-full py-3.5 rounded-2xl bg-green-500 text-black font-extrabold text-xs shadow-lg hover:bg-green-400 transition"
                  >
                    Complete Trip & Collect Fare (₹{activeJob.earning}) →
                  </button>
                )}

                {jobStep === 'completed' && (
                  <div className="text-center py-2 space-y-2">
                    <div className="w-10 h-10 rounded-full bg-green-500 text-black flex items-center justify-center mx-auto font-black text-lg">
                      ✓
                    </div>
                    <h4 className="font-extrabold text-sm text-green-400">Trip Completed!</h4>
                    <p className="text-xs text-gray-300">₹{activeJob.earning} added to your Partner Wallet.</p>
                    <button
                      onClick={handleFinishAndReset}
                      className="w-full py-2.5 rounded-xl bg-neutral-800 text-white font-bold text-xs"
                    >
                      Ready for Next Job
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Idle Radar Screen */
              <div className="bg-[#1C1C1E] border border-neutral-800 rounded-3xl p-6 text-center space-y-4">
                <div className="relative w-20 h-20 mx-auto">
                  <div className="w-20 h-20 rounded-full border-2 border-yellow-500/20 animate-ping"></div>
                  <div className="w-14 h-14 rounded-full bg-yellow-500/10 border border-vride-yellow flex items-center justify-center absolute inset-3">
                    <Bike className="w-7 h-7 text-vride-yellow" />
                  </div>
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">Searching for Nearby Orders</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Ride requests, parcels and food delivery orders within 4 km of Miyapur will appear here automatically.
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* EARNINGS TAB */}
        {activeTab === 'earnings' && (
          <div className="space-y-4">
            {/* Wallet Balance Card */}
            <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 text-white">
              <span className="text-xs text-gray-400 font-bold block uppercase">Partner Wallet Balance</span>
              <p className="text-3xl font-black text-vride-yellow mt-1">₹{currentPartner.walletBalance || 3420}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setShowWithdrawModal(true)}
                  className="flex-1 py-2.5 rounded-xl bg-vride-yellow text-black font-extrabold text-xs"
                >
                  Withdraw to Bank Account
                </button>
              </div>
            </div>

            {/* Weekly Earnings Breakdown */}
            <div className="bg-[#1C1C1E] p-4 rounded-2xl border border-neutral-800 space-y-3">
              <h3 className="font-bold text-xs text-gray-300 uppercase">This Week Summary</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Gross Trip Fares:</span>
                  <span className="text-white font-bold">₹3,950</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Platform Commission (15%):</span>
                  <span className="text-red-400 font-bold">-₹530</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Weekly Incentive Bonus:</span>
                  <span className="text-green-400 font-bold">+₹300</span>
                </div>
                <div className="pt-2 border-t border-neutral-800 flex justify-between font-black text-white text-sm">
                  <span>Net Take-home:</span>
                  <span className="text-vride-yellow">₹3,720</span>
                </div>
              </div>
            </div>

            {/* Bank details */}
            <div className="bg-[#1C1C1E] p-4 rounded-2xl border border-neutral-800 text-xs">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Linked Bank Account</span>
              <p className="font-bold text-white mt-1">HDFC Bank · A/c No. ending in 9103</p>
              <p className="text-gray-400">IFSC: HDFC0001234 · Auto Payout Every Tuesday</p>
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="space-y-3 text-xs">
            <div className="bg-[#1C1C1E] p-4 rounded-2xl border border-neutral-800 space-y-2">
              <h3 className="font-bold text-white uppercase text-xs">Vehicle & Documents</h3>
              <div className="flex justify-between py-1 border-b border-neutral-800 text-gray-300">
                <span>Vehicle Model:</span>
                <span className="font-bold text-white">{currentPartner.vehicleModel}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800 text-gray-300">
                <span>Registration No.:</span>
                <span className="font-bold text-white">{currentPartner.vehicleNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800 text-gray-300">
                <span>Driving License:</span>
                <span className="font-bold text-green-400">✓ Verified</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800 text-gray-300">
                <span>Vehicle RC:</span>
                <span className="font-bold text-green-400">✓ Verified</span>
              </div>
              <div className="flex justify-between py-1 text-gray-300">
                <span>Aadhaar Identity:</span>
                <span className="font-bold text-green-400">✓ Verified</span>
              </div>
            </div>

            <div className="bg-[#1C1C1E] p-4 rounded-2xl border border-neutral-800 space-y-1">
              <h3 className="font-bold text-white text-xs">Rider Helpline</h3>
              <p className="text-gray-400">Dedicated partner operations: 1800-200-8744</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-[#1C1C1E] border-t border-neutral-800 px-4 py-2.5 flex items-center justify-around sticky bottom-0 z-20">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-vride-yellow font-extrabold' : 'text-gray-400'}`}
        >
          <Bike className="w-5 h-5" />
          <span className="text-[10px]">Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('earnings')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'earnings' ? 'text-vride-yellow font-extrabold' : 'text-gray-400'}`}
        >
          <Wallet className="w-5 h-5" />
          <span className="text-[10px]">Earnings</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-vride-yellow font-extrabold' : 'text-gray-400'}`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px]">Profile & Docs</span>
        </button>
      </div>

      {/* INCOMING JOB POPUP MODAL */}
      {incomingJob && !activeJob && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 animate-slideUp">
          <div className="bg-[#1C1C1E] text-white w-full max-w-sm rounded-3xl p-5 border-2 border-yellow-400 shadow-2xl space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="bg-yellow-400 text-black text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                Incoming Request (15s)
              </span>
              <span className="text-xl font-black text-green-400">Earn ₹{incomingJob.earning}</span>
            </div>

            <div>
              <h3 className="font-extrabold text-base text-white">{incomingJob.title}</h3>
              <p className="text-xs text-gray-400">Customer: {incomingJob.customerName} · {incomingJob.distance}</p>
            </div>

            <div className="p-3 bg-black/60 rounded-xl space-y-2 text-xs">
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 mt-1"></span>
                <span className="text-gray-300 font-medium truncate">{incomingJob.pickup}</span>
              </div>
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-1"></span>
                <span className="text-gray-300 font-medium truncate">{incomingJob.drop}</span>
              </div>
            </div>

            <div className="flex gap-2.5 pt-1">
              <button
                onClick={handleRejectJob}
                className="flex-1 py-3 rounded-2xl bg-neutral-800 text-gray-300 font-bold text-xs hover:bg-neutral-700 transition"
              >
                Reject
              </button>
              <button
                onClick={handleAcceptJob}
                className="flex-1 py-3 rounded-2xl bg-vride-yellow text-black font-extrabold text-xs shadow-yellow-glow hover:bg-yellow-400 transition"
              >
                Accept Order ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WITHDRAW MODAL */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C1C1E] text-white w-full max-w-xs rounded-3xl p-5 border border-neutral-800 space-y-3 text-center">
            <h3 className="font-extrabold text-sm">Withdraw to Bank</h3>
            <p className="text-xs text-gray-400">HDFC Bank A/c No: 501004829103</p>
            <input
              type="number"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
              className="w-full text-center text-xl font-black p-2 rounded-xl bg-black border border-neutral-700 text-yellow-400 focus:outline-none"
            />
            <button
              onClick={() => {
                setShowWithdrawModal(false);
                alert(`Withdrawal of ₹${withdrawalAmount} submitted for Admin Approval.`);
              }}
              className="w-full py-3 rounded-xl bg-vride-yellow text-black font-extrabold text-xs"
            >
              Confirm Withdrawal
            </button>
            <button onClick={() => setShowWithdrawModal(false)} className="text-xs text-gray-400">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default PartnerApp;
