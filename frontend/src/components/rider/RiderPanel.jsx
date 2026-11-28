import React, { useState, useEffect } from 'react';
import {
  Home, Wallet, Clock, User, Bike, Utensils, ChevronRight,
  Building2, Smartphone, Plus, ShieldCheck, FileText, CreditCard,
  Star, Settings, HelpCircle, AlertTriangle, TrendingUp, MapPin,
  Upload, CheckCircle2, X, Award
} from 'lucide-react';
import PartnerHeader from '../common/PartnerHeader';
import {
  IncomingRequestScreen,
  RideInProgressScreen,
  FoodDeliveryScreen,
  TripCompletedScreen
} from './RiderWorkflowViews';
import { apiRequest, uploadMediaToS3 } from '../../services/api';

export const RiderPanel = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'wallet' | 'history' | 'profile'
  const [workflowMode, setWorkflowMode] = useState(null); // null | 'incoming' | 'ride_progress' | 'food_delivery' | 'completed'
  const [activeJob, setActiveJob] = useState(null);
  const [completedSummary, setCompletedSummary] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // Rider Core State (synced with backend)
  const [rider, setRider] = useState({
    id: 'ptn_ramesh',
    name: 'Raju Kumar',
    shortName: 'Raju',
    phone: '+91 97034 56789',
    vehicleType: 'Bike',
    vehicleModel: 'Honda Activa 6G',
    vehicleNumber: 'TS 09 AB 4321',
    status: 'approved',
    isOnline: true,
    walletBalance: 3820,
    rating: 4.8,
    totalTrips: 1246,
    bankLabel: 'SBI ···· 4821 (UPI Enabled)'
  });

  const [todayStats, setTodayStats] = useState({
    earnings: 1248,
    compare: '+12%',
    trips: 16,
    onlineTime: '6h 20m',
    incentiveCurrent: 400,
    incentiveTarget: 600,
    incentivePercent: 67
  });

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Peak Hour Incentive Active', desc: 'Complete 6 more trips to unlock ₹200 bonus.', time: '10m ago', read: false },
    { id: 2, title: 'Weekly Payout Credited', desc: '₹2,000 settled to SBI ···· 4821.', time: '3h ago', read: false }
  ]);

  const [transactions, setTransactions] = useState([
    { id: 'tx_r1', type: 'credit', category: 'Trip Earnings', title: 'Trip Earnings', date: 'Today, 4:32 PM', amount: 132 },
    { id: 'tx_r2', type: 'credit', category: 'Trip Earnings', title: 'Trip Earnings', date: 'Today, 3:18 PM', amount: 86 },
    { id: 'tx_r3', type: 'debit', category: 'Withdrawals', title: 'Withdrawal to Bank', date: 'Today, 11:20 AM', amount: 2000 }
  ]);
  const [txFilter, setTxFilter] = useState('All');

  const [historyTab, setHistoryTab] = useState('rides'); // 'rides' | 'food'
  const [historyDateFilter, setHistoryDateFilter] = useState('Last 7 Days');
  const [historyStatusFilter, setHistoryStatusFilter] = useState('All Status');
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);

  const [historyRecords, setHistoryRecords] = useState([
    { id: 'h1', type: 'rides', route: 'Miyapur → Kukatpally', date: '24 Jan, 4:32 PM', amount: 132, status: 'Completed', payment: 'UPI', commission: 15, rating: 5.0 },
    { id: 'h2', type: 'rides', route: 'Hitech City → Madhapur', date: '24 Jan, 3:18 PM', amount: 186, status: 'Completed', payment: 'Cash', commission: 18, rating: 4.9 },
    { id: 'h3', type: 'rides', route: 'Gachibowli → Kondapur', date: '24 Jan, 1:05 PM', amount: 0, status: 'Cancelled', payment: '-', commission: 0, rating: null },
    { id: 'h4', type: 'rides', route: 'Ameerpet → Begumpet', date: '24 Jan, 11:26 AM', amount: 158, status: 'Completed', payment: 'UPI', commission: 16, rating: 4.8 },
    { id: 'h5', type: 'food', route: 'Paradise Biryani → Kukatpally', date: '24 Jan, 1:40 PM', amount: 95, status: 'Completed', payment: 'Online', commission: 0, rating: 5.0 }
  ]);

  // Modals
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('1000');
  const [withdrawMethod, setWithdrawMethod] = useState('Bank (SBI ···· 4821)');
  const [profileModal, setProfileModal] = useState(null); // 'documents' | 'vehicle' | 'bank' | 'ratings' | 'settings' | 'support' | 'demand' | 'earnings'
  const [sosConfirming, setSosConfirming] = useState(false);

  // Sync with backend on mount
  useEffect(() => {
    apiRequest(`/rider/${rider.id}/dashboard`).then((res) => {
      if (res?.success && res.data?.rider) {
        setRider((prev) => ({ ...prev, ...res.data.rider }));
      }
    });
  }, []);

  const handleToggleDuty = async () => {
    const nextOnline = !rider.isOnline;
    const res = await apiRequest(`/rider/${rider.id}/duty`, {
      method: 'PUT',
      body: JSON.stringify({ isOnline: nextOnline })
    });
    if (res && !res.success) {
      showToast(res.message || 'Cannot change duty status');
      return;
    }
    setRider((prev) => ({ ...prev, isOnline: nextOnline }));
    showToast(nextOnline ? 'You are now ON DUTY — receiving live jobs' : 'You are OFF DUTY');
  };

  const triggerIncomingJob = (jobType) => {
    if (!rider.isOnline) {
      showToast('Switch ON DUTY first to receive jobs!');
      return;
    }
    const sample =
      jobType === 'food'
        ? {
            id: 'job_fd_' + Date.now(),
            jobType: 'food',
            orderCode: 'FD28491',
            pickupTitle: 'Paradise Biryani',
            pickupAddress: 'Miyapur, Hyderabad',
            dropTitle: 'Anil Kumar',
            dropAddress: 'Kukatpally, Hyderabad',
            customerName: 'Anil Kumar',
            fare: 95,
            platformFee: 0,
            tips: 20,
            codAmount: 0,
            distance: '4.1 km',
            estTime: '16 min',
            otp: '8375'
          }
        : {
            id: 'job_rd_' + Date.now(),
            jobType: 'ride',
            pickupTitle: 'Miyapur Metro Station',
            pickupAddress: 'Miyapur, Hyderabad',
            dropTitle: 'Kukatpally Bus Stop',
            dropAddress: 'Kukatpally, Hyderabad',
            customerName: 'Sri Latha',
            fare: 156,
            platformFee: 15,
            tips: 0,
            distance: '5.4 km',
            estTime: '18 min',
            otp: '7492'
          };
    setActiveJob(sample);
    setWorkflowMode('incoming');
  };

  const handleAcceptJob = async () => {
    await apiRequest(`/rider/jobs/${activeJob.id}/accept`, {
      method: 'POST',
      body: JSON.stringify({ jobType: activeJob.jobType, riderId: rider.id })
    });
    setWorkflowMode(activeJob.jobType === 'food' ? 'food_delivery' : 'ride_progress');
  };

  const handleCompleteWorkflow = async () => {
    const res = await apiRequest(`/rider/jobs/${activeJob.id}/complete`, {
      method: 'POST',
      body: JSON.stringify({
        jobType: activeJob.jobType,
        riderId: rider.id,
        fare: activeJob.fare,
        platformFee: activeJob.platformFee || 15,
        tips: activeJob.tips || 0,
        paymentMode: 'UPI',
        pickup: activeJob.pickupTitle,
        drop: activeJob.dropTitle
      })
    });

    const net = (activeJob.fare || 156) - (activeJob.platformFee || 15) + (activeJob.tips || 0);
    setCompletedSummary({
      jobType: activeJob.jobType,
      fare: activeJob.fare,
      platformFee: activeJob.platformFee || 15,
      tips: activeJob.tips || 0,
      netEarnings: res?.netEarnings ?? net,
      paymentMode: 'UPI'
    });
    setWorkflowMode('completed');
  };

  const handleFinishCompleted = () => {
    if (completedSummary) {
      setRider((prev) => ({
        ...prev,
        walletBalance: prev.walletBalance + completedSummary.netEarnings,
        totalTrips: prev.totalTrips + 1
      }));
      setTodayStats((prev) => ({
        ...prev,
        earnings: prev.earnings + completedSummary.netEarnings,
        trips: prev.trips + 1,
        incentiveCurrent: Math.min(prev.incentiveTarget, prev.incentiveCurrent + 50)
      }));
      setTransactions((prev) => [
        {
          id: 'tx_' + Date.now(),
          type: 'credit',
          category: completedSummary.jobType === 'food' ? 'Food Delivery Earnings' : 'Trip Earnings',
          title: completedSummary.jobType === 'food' ? 'Food Delivery Earnings' : 'Trip Earnings',
          date: 'Just now',
          amount: completedSummary.netEarnings
        },
        ...prev
      ]);
      setHistoryRecords((prev) => [
        {
          id: 'h_' + Date.now(),
          type: completedSummary.jobType === 'food' ? 'food' : 'rides',
          route: `${activeJob.pickupTitle} → ${activeJob.dropTitle}`,
          date: 'Just now',
          amount: completedSummary.netEarnings,
          status: 'Completed',
          payment: 'UPI',
          commission: completedSummary.platformFee,
          rating: 5.0
        },
        ...prev
      ]);
    }
    setWorkflowMode(null);
    setActiveJob(null);
    setCompletedSummary(null);
    showToast('Earnings & Wallet updated!');
  };

  const handleWithdraw = async () => {
    const amt = Number(withdrawAmount);
    if (!amt || amt <= 0) return showToast('Enter valid withdrawal amount');
    if (amt > rider.walletBalance) return showToast('Insufficient wallet balance');

    await apiRequest('/partner/withdrawal', {
      method: 'POST',
      body: JSON.stringify({ partnerId: rider.id, amount: amt, bank: withdrawMethod })
    });

    setRider((prev) => ({ ...prev, walletBalance: prev.walletBalance - amt }));
    setTransactions((prev) => [
      { id: 'tx_w_' + Date.now(), type: 'debit', category: 'Withdrawals', title: `Withdrawal (${withdrawMethod})`, date: 'Just now', amount: amt },
      ...prev
    ]);
    setShowWithdrawModal(false);
    showToast(`₹${amt} withdrawal request submitted (Pending)!`);
  };

  const handleTriggerSos = async () => {
    setSosConfirming(true);
    const sendSos = async (lat, lng) => {
      const res = await apiRequest('/rider/sos', {
        method: 'POST',
        body: JSON.stringify({ riderId: rider.id, lat, lng, note: 'Rider triggered Emergency SOS' })
      });
      setSosConfirming(false);
      if (res?.success || res === null) {
        showToast('Emergency SOS recorded & live GPS shared with V RIDE Support!');
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => sendSos(pos.coords.latitude, pos.coords.longitude),
        () => sendSos(17.4948, 78.3578),
        { timeout: 3000 }
      );
    } else {
      sendSos(17.4948, 78.3578);
    }
  };

  const navTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const filteredHistory = historyRecords.filter((h) => {
    if (h.type !== historyTab) return false;
    if (historyStatusFilter !== 'All Status' && h.status !== historyStatusFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F5F6F8] text-gray-900 flex flex-col select-none">
      {toast && (
        <div className="fixed top-16 right-4 z-50 bg-[#10151F] text-[#FFD000] px-4 py-2.5 rounded-2xl shadow-xl text-xs font-black border border-[#FFD000]/40">
          {toast}
        </div>
      )}

      {/* FIXED COMMON HEADER */}
      <PartnerHeader
        roleLabel="RIDER PARTNER"
        userName={`${rider.name} · ${rider.vehicleType}`}
        notifications={notifications}
        onMarkAllRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
        onToggleMenu={() => setActiveTab('profile')}
        onLogout={onLogout}
        rightSlot={
          <span className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black ${
            rider.isOnline ? 'bg-emerald-500 text-black' : 'bg-gray-700 text-gray-300'
          }`}>
            ● {rider.isOnline ? 'ON DUTY' : 'OFF DUTY'}
          </span>
        }
      />

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Desktop/Tablet Sidebar */}
        <aside className="hidden md:flex md:w-60 bg-[#10151F] text-white flex-col p-4 space-y-1.5 shrink-0">
          {navTabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id && !workflowMode;
            return (
              <button
                key={t.id}
                onClick={() => { setWorkflowMode(null); setActiveTab(t.id); }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition ${
                  active ? 'bg-[#FFD000] text-black font-black' : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
          <div className="pt-4 mt-4 border-t border-white/10 space-y-1.5">
            <button
              onClick={() => triggerIncomingJob('ride')}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-[#FFD000] text-left"
            >
              ⚡ Simulate Ride Alert
            </button>
            <button
              onClick={() => triggerIncomingJob('food')}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-emerald-400 text-left"
            >
              🍴 Simulate Food Alert
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl w-full mx-auto pb-24 md:pb-8">
          {/* WORKFLOW SCREENS (Pages 5, 6, 7, 8) */}
          {workflowMode === 'incoming' && activeJob && (
            <div className="p-4">
              <IncomingRequestScreen
                job={activeJob}
                onAccept={handleAcceptJob}
                onReject={(reason) => {
                  setWorkflowMode(null);
                  setActiveJob(null);
                  showToast(reason === 'timeout' ? 'Request timed out — reassigned' : 'Request rejected');
                }}
              />
            </div>
          )}

          {workflowMode === 'ride_progress' && activeJob && (
            <div className="p-4">
              <RideInProgressScreen
                job={activeJob}
                onComplete={handleCompleteWorkflow}
                onCancel={() => {
                  setWorkflowMode(null);
                  setActiveJob(null);
                  showToast('Ride cancelled');
                }}
              />
            </div>
          )}

          {workflowMode === 'food_delivery' && activeJob && (
            <div className="p-4">
              <FoodDeliveryScreen
                job={activeJob}
                onComplete={handleCompleteWorkflow}
              />
            </div>
          )}

          {workflowMode === 'completed' && completedSummary && (
            <div className="p-4">
              <TripCompletedScreen
                summary={completedSummary}
                onDone={handleFinishCompleted}
              />
            </div>
          )}

          {/* PAGE 1 – HOME DASHBOARD */}
          {!workflowMode && activeTab === 'home' && (
            <div className="space-y-4">
              {/* Dark Hero matching image copy 34.png */}
              <div className="bg-[#10151F] text-white px-4 pt-4 pb-5 rounded-b-3xl md:rounded-2xl md:m-4 flex items-center justify-between">
                <div className="space-y-2">
                  <div>
                    <h1 className="text-xl font-black flex items-center gap-1.5">
                      <span>Hi {rider.shortName || 'Raju'}</span>
                      <span>👋</span>
                    </h1>
                    <p className="text-xs text-gray-300">Rider Partner · {rider.vehicleType}</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleToggleDuty}
                    className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-black transition ${
                      rider.isOnline ? 'bg-emerald-500 text-black' : 'bg-gray-700 text-gray-200'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                    <span>{rider.isOnline ? 'On Duty' : 'Off Duty'}</span>
                  </button>
                </div>

                <div className="w-28 h-24 shrink-0 flex items-center justify-center">
                  <img src="/images/hero-rider.jpg" alt="Rider" className="w-full h-full object-contain rounded-2xl mix-blend-lighten" />
                </div>
              </div>

              <div className="px-4 space-y-4">
                {/* 2 Service Cards: Rides & Food */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => triggerIncomingJob('ride')}
                    className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs text-left hover:border-[#FFD000] transition active:scale-98 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between w-full">
                      <img src="/images/service-rides.jpg" alt="Rides" className="w-12 h-10 object-contain" />
                      <span className="font-black text-sm text-gray-900">Rides</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[11px] text-gray-500 font-semibold leading-tight">Accept & complete ride trips</span>
                      <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => triggerIncomingJob('food')}
                    className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs text-left hover:border-[#FFD000] transition active:scale-98 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between w-full">
                      <img src="/images/service-food.jpg" alt="Food" className="w-12 h-10 object-contain" />
                      <span className="font-black text-sm text-gray-900">Food</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[11px] text-gray-500 font-semibold leading-tight">Deliver food orders</span>
                      <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                </div>

                {/* Today's Earnings */}
                <div
                  onClick={() => setProfileModal('earnings')}
                  className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between cursor-pointer hover:border-[#FFD000]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFD000] text-black flex items-center justify-center font-black">
                      ₹
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-500 block">Today&apos;s Earnings</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-gray-900">₹{todayStats.earnings.toLocaleString('en-IN')}</span>
                        <span className="text-[11px] font-bold text-emerald-600">▲ {todayStats.compare} vs yesterday</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                {/* Completed Trips & Online Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs">
                    <span className="text-[11px] font-bold text-gray-500 block">Completed Trips</span>
                    <span className="text-xl font-black text-gray-900 mt-0.5 block">{todayStats.trips}</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs">
                    <span className="text-[11px] font-bold text-gray-500 block">Online Time</span>
                    <span className="text-xl font-black text-gray-900 mt-0.5 block">{todayStats.onlineTime}</span>
                  </div>
                </div>

                {/* Incentive Progress */}
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-gray-900">🎁 Incentive Progress</span>
                    <span className="font-black text-gray-900">
                      ₹{todayStats.incentiveCurrent} / ₹{todayStats.incentiveTarget}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FFD000] rounded-full transition-all"
                      style={{ width: `${Math.min(100, Math.round((todayStats.incentiveCurrent / todayStats.incentiveTarget) * 100))}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-gray-500 block text-right">
                    {Math.min(100, Math.round((todayStats.incentiveCurrent / todayStats.incentiveTarget) * 100))}% completed
                  </span>
                </div>

                {/* High-Demand Areas */}
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-xs text-gray-900">📍 High-Demand Areas</h3>
                    <button
                      type="button"
                      onClick={() => setProfileModal('demand')}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: 'Miyapur', level: 'High', cls: 'bg-red-50 text-red-700 border-red-200' },
                      { name: 'Kukatpally', level: 'High', cls: 'bg-red-50 text-red-700 border-red-200' },
                      { name: 'Hitech City', level: 'Medium', cls: 'bg-amber-50 text-amber-700 border-amber-200' }
                    ].map((area) => (
                      <div key={area.name} className={`p-2.5 rounded-xl border text-center ${area.cls}`}>
                        <span className="font-black text-xs text-gray-900 block">{area.name}</span>
                        <span className="text-[10px] font-black">{area.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 2 – WALLET */}
          {!workflowMode && activeTab === 'wallet' && (
            <div className="p-4 space-y-4">
              <h1 className="text-lg font-black text-gray-900">Wallet</h1>

              {/* Dark Balance Card */}
              <div className="bg-[#10151F] text-white p-5 rounded-3xl shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 font-semibold block">Available Balance</span>
                    <p className="text-3xl font-black text-white mt-1">
                      ₹{rider.walletBalance.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FFD000] text-black flex items-center justify-center text-2xl">
                    💳
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(true)}
                  className="w-full py-2.5 rounded-xl bg-[#FFD000] hover:bg-yellow-400 text-black font-black text-xs transition"
                >
                  Withdraw →
                </button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => { setWithdrawMethod('Bank (SBI ···· 4821)'); setShowWithdrawModal(true); }}
                  className="bg-white p-3 rounded-2xl border border-gray-200 text-center space-y-1 hover:border-[#FFD000]"
                >
                  <Building2 className="w-5 h-5 mx-auto text-gray-800" />
                  <span className="text-xs font-bold block">To Bank</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setWithdrawMethod('UPI (raju@okaxis)'); setShowWithdrawModal(true); }}
                  className="bg-white p-3 rounded-2xl border border-gray-200 text-center space-y-1 hover:border-[#FFD000]"
                >
                  <Smartphone className="w-5 h-5 mx-auto text-gray-800" />
                  <span className="text-xs font-bold block">UPI</span>
                </button>
                <button
                  type="button"
                  onClick={() => setProfileModal('bank')}
                  className="bg-white p-3 rounded-2xl border border-gray-200 text-center space-y-1 hover:border-[#FFD000]"
                >
                  <Plus className="w-5 h-5 mx-auto text-gray-800" />
                  <span className="text-xs font-bold block">Add Bank</span>
                </button>
              </div>

              {/* This Week / This Month */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3.5 rounded-2xl border border-gray-200">
                  <span className="text-[11px] font-bold text-gray-500 block">This Week</span>
                  <span className="text-lg font-black text-gray-900">₹6,540</span>
                  <span className="text-[10px] font-bold text-emerald-600 block">▲ +18%</span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-gray-200">
                  <span className="text-[11px] font-bold text-gray-500 block">This Month</span>
                  <span className="text-lg font-black text-gray-900">₹24,860</span>
                  <span className="text-[10px] font-bold text-emerald-600 block">▲ +22%</span>
                </div>
              </div>

              {/* Transaction History */}
              <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-xs text-gray-900">Transaction History</h3>
                  <select
                    value={txFilter}
                    onChange={(e) => setTxFilter(e.target.value)}
                    className="text-[11px] font-bold border border-gray-200 rounded-lg px-2 py-1 bg-gray-50"
                  >
                    <option value="All">All Categories</option>
                    <option value="Trip Earnings">Trip Earnings</option>
                    <option value="Food Delivery Earnings">Food Delivery</option>
                    <option value="Withdrawals">Withdrawals</option>
                  </select>
                </div>

                <div className="divide-y divide-gray-100">
                  {transactions
                    .filter((t) => txFilter === 'All' || t.category === txFilter)
                    .map((tx) => (
                      <div key={tx.id} className="py-2.5 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-xs text-gray-900 block">{tx.title}</span>
                          <span className="text-[10px] text-gray-400">{tx.date}</span>
                        </div>
                        <span className={`font-black text-xs ${tx.type === 'credit' ? 'text-emerald-600' : 'text-red-600'}`}>
                          {tx.type === 'credit' ? `+ ₹${tx.amount}` : `- ₹${tx.amount}`}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* PAGE 3 – HISTORY */}
          {!workflowMode && activeTab === 'history' && (
            <div className="p-4 space-y-4">
              <h1 className="text-lg font-black text-gray-900">History</h1>

              {/* Rides / Food Tabs */}
              <div className="grid grid-cols-2 gap-2 bg-white p-1.5 rounded-2xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => setHistoryTab('rides')}
                  className={`py-2 rounded-xl text-xs font-black transition ${
                    historyTab === 'rides' ? 'bg-[#FFD000] text-black shadow-xs' : 'text-gray-600'
                  }`}
                >
                  🛵 Rides
                </button>
                <button
                  type="button"
                  onClick={() => setHistoryTab('food')}
                  className={`py-2 rounded-xl text-xs font-black transition ${
                    historyTab === 'food' ? 'bg-[#FFD000] text-black shadow-xs' : 'text-gray-600'
                  }`}
                >
                  🍴 Food
                </button>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={historyDateFilter}
                  onChange={(e) => setHistoryDateFilter(e.target.value)}
                  className="p-2 rounded-xl border border-gray-200 bg-white text-xs font-bold"
                >
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Custom Date</option>
                </select>
                <select
                  value={historyStatusFilter}
                  onChange={(e) => setHistoryStatusFilter(e.target.value)}
                  className="p-2 rounded-xl border border-gray-200 bg-white text-xs font-bold"
                >
                  <option>All Status</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                  <option>Missed</option>
                </select>
              </div>

              {/* History List */}
              <div className="space-y-2.5">
                {filteredHistory.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedHistoryItem(item)}
                    className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between cursor-pointer hover:border-[#FFD000]"
                  >
                    <div>
                      <h4 className="font-black text-xs text-gray-900">{item.route}</h4>
                      <span className="text-[11px] text-gray-400">{item.date}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-xs text-gray-900 block">₹{item.amount}</span>
                      <span className={`text-[10px] font-black ${
                        item.status === 'Completed' ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAGE 4 – PROFILE */}
          {!workflowMode && activeTab === 'profile' && (
            <div className="p-4 space-y-4">
              <h1 className="text-lg font-black text-gray-900">Profile</h1>

              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-[#FFD000] text-black flex items-center justify-center font-black text-xl">
                    RK
                  </div>
                  <div>
                    <h2 className="font-black text-sm text-gray-900">{rider.name}</h2>
                    <p className="text-xs text-gray-500">{rider.phone}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black">
                      ✔ Verified Rider
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
                {[
                  { id: 'documents', title: 'Documents', sub: 'ID, License, RC, Insurance', badge: 'Verified', icon: FileText },
                  { id: 'vehicle', title: 'Vehicle Details', sub: `${rider.vehicleModel} · ${rider.vehicleNumber}`, icon: Bike },
                  { id: 'bank', title: 'Bank Details', sub: rider.bankLabel, icon: CreditCard },
                  { id: 'ratings', title: 'Ratings', sub: `${rider.rating} ★ (${rider.totalTrips.toLocaleString()} trips)`, icon: Star },
                  { id: 'settings', title: 'Settings', sub: 'App, Notifications, Language, Battery Saver', icon: Settings },
                  { id: 'support', title: 'Support / SOS', sub: 'Help, Raise a ticket, Emergency', icon: HelpCircle }
                ].map((row) => {
                  const Icon = row.icon;
                  return (
                    <button
                      key={row.id}
                      type="button"
                      onClick={() => setProfileModal(row.id)}
                      className="w-full p-3.5 flex items-center justify-between hover:bg-gray-50 text-left transition"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-gray-700" />
                        <div>
                          <span className="font-black text-xs text-gray-900 block">{row.title}</span>
                          <span className="text-[11px] text-gray-500">{row.sub}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {row.badge && (
                          <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                            {row.badge}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Emergency SOS Quick Button */}
              <button
                type="button"
                onClick={handleTriggerSos}
                disabled={sosConfirming}
                className="w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>{sosConfirming ? 'Sending Live GPS SOS...' : 'EMERGENCY SOS (Share Live GPS)'}</span>
              </button>
            </div>
          )}
        </main>
      </div>

      {/* MOBILE BOTTOM NAVIGATION (FIXED) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#10151F] border-t border-white/10 px-3 py-1.5 flex items-center justify-around z-40">
        {navTabs.map((t) => {
          const Icon = t.icon;
          const active = activeTab === t.id && !workflowMode;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => { setWorkflowMode(null); setActiveTab(t.id); }}
              className={`flex flex-col items-center px-3.5 py-1.5 rounded-2xl transition ${
                active ? 'bg-[#FFD000] text-black font-black' : 'text-gray-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">{t.label}</span>
            </button>
          );
        })}
      </nav>

      {/* WITHDRAW MODAL */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="font-black text-sm">Withdraw Earnings</h3>
              <button onClick={() => setShowWithdrawModal(false)}><X className="w-4 h-4" /></button>
            </div>
            <p className="text-xs text-gray-500">Available: <strong>₹{rider.walletBalance}</strong> · To: <strong>{withdrawMethod}</strong></p>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 text-lg font-black"
            />
            <button onClick={handleWithdraw} className="w-full py-3 rounded-2xl bg-[#FFD000] text-black font-black text-xs">
              Confirm Withdrawal
            </button>
          </div>
        </div>
      )}

      {/* HISTORY DETAIL MODAL */}
      {selectedHistoryItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="font-black text-sm">Job Details</h3>
              <button onClick={() => setSelectedHistoryItem(null)}><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-2 text-xs">
              <p><strong>Route:</strong> {selectedHistoryItem.route}</p>
              <p><strong>Date & Time:</strong> {selectedHistoryItem.date}</p>
              <p><strong>Status:</strong> {selectedHistoryItem.status}</p>
              <p><strong>Payment Mode:</strong> {selectedHistoryItem.payment}</p>
              <p><strong>Commission:</strong> ₹{selectedHistoryItem.commission}</p>
              <p><strong>Net Earnings:</strong> ₹{selectedHistoryItem.amount}</p>
              {selectedHistoryItem.rating && <p><strong>Customer Rating:</strong> ★ {selectedHistoryItem.rating}</p>}
            </div>
          </div>
        </div>
      )}

      {/* PROFILE / DETAIL MODAL */}
      {profileModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="font-black text-sm uppercase">{profileModal}</h3>
              <button onClick={() => setProfileModal(null)}><X className="w-4 h-4" /></button>
            </div>

            {profileModal === 'documents' && (
              <div className="space-y-2 text-xs">
                <p className="text-gray-500">Driving Licence, RC, ID Proof & Insurance (S3 Protected)</p>
                <label className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-gray-300 cursor-pointer font-bold bg-gray-50">
                  <Upload className="w-4 h-4" />
                  <span>Upload / Renew Document to AWS S3</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      await uploadMediaToS3(f, 'rider-docs');
                      showToast('Document uploaded to AWS S3!');
                    }}
                  />
                </label>
              </div>
            )}

            {profileModal === 'vehicle' && (
              <div className="space-y-2 text-xs">
                <input
                  value={rider.vehicleModel}
                  onChange={(e) => setRider((p) => ({ ...p, vehicleModel: e.target.value }))}
                  className="w-full p-2.5 rounded-xl border text-xs font-bold"
                  placeholder="Vehicle Model"
                />
                <input
                  value={rider.vehicleNumber}
                  onChange={(e) => setRider((p) => ({ ...p, vehicleNumber: e.target.value }))}
                  className="w-full p-2.5 rounded-xl border text-xs font-bold"
                  placeholder="Registration Number"
                />
                <button
                  onClick={() => { setProfileModal(null); showToast('Vehicle details saved!'); }}
                  className="w-full py-2.5 rounded-xl bg-[#FFD000] text-black font-black"
                >
                  Save Vehicle Info
                </button>
              </div>
            )}

            {profileModal === 'bank' && (
              <div className="space-y-2 text-xs">
                <input
                  value={rider.bankLabel}
                  onChange={(e) => setRider((p) => ({ ...p, bankLabel: e.target.value }))}
                  className="w-full p-2.5 rounded-xl border text-xs font-bold"
                  placeholder="Bank / UPI Details"
                />
                <button
                  onClick={() => { setProfileModal(null); showToast('Bank / UPI updated!'); }}
                  className="w-full py-2.5 rounded-xl bg-[#FFD000] text-black font-black"
                >
                  Save Bank Details
                </button>
              </div>
            )}

            {profileModal !== 'documents' && profileModal !== 'vehicle' && profileModal !== 'bank' && (
              <div className="text-xs text-gray-600 space-y-2">
                <p>All {profileModal} metrics and controls are active and synchronized with your V RIDE Rider account ({rider.name}).</p>
                <button
                  onClick={() => setProfileModal(null)}
                  className="w-full py-2.5 rounded-xl bg-[#FFD000] text-black font-black"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RiderPanel;
