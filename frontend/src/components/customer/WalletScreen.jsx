import React, { useState } from 'react';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WalletScreen = () => {
  const { currentUser, addMoneyToWallet } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [topupAmount, setTopupAmount] = useState('500');

  const transactions = [
    { id: 'tx_1', type: 'credit', title: 'Wallet Top Up via UPI', date: '18 Nov 2026', amount: 1000 },
    { id: 'tx_2', type: 'debit', title: 'Bike Ride to Kukatpally', date: '21 Nov 2026', amount: 68 },
    { id: 'tx_3', type: 'debit', title: 'Parcel to Gachibowli', date: '20 Nov 2026', amount: 85 },
    { id: 'tx_4', type: 'debit', title: 'Pick & Drop to Banjara Hills', date: '19 Nov 2026', amount: 75 }
  ];

  const handleAdd = () => {
    addMoneyToWallet(Number(topupAmount));
    setShowAddModal(false);
    alert(`₹${topupAmount} added to your V RIDE Wallet successfully!`);
  };

  return (
    <div className="flex flex-col bg-[#f8f9fa] pb-2 select-none">
      <div className="px-5 py-4 bg-white border-b border-gray-100">
        <h1 className="text-base font-bold text-gray-900">V RIDE Wallet</h1>
      </div>

      <div className="p-5 space-y-4">
        {/* Balance Card */}
        <div className="rounded-3xl bg-black text-white p-5 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <span className="text-xs text-gray-400 font-semibold block">Available Balance</span>
              <p className="text-3xl font-black mt-1 text-vride-yellow">
                ₹{currentUser.walletBalance || 850}
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-vride-yellow text-black flex items-center justify-center font-black">
              V
            </div>
          </div>

          <div className="mt-5 flex gap-2 relative z-10">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex-1 py-2.5 rounded-xl bg-vride-yellow text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow hover:bg-yellow-400 transition"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Money</span>
            </button>
            <button
              onClick={() => alert('V RIDE Cash Auto-Pay enabled for Instant 1-click booking.')}
              className="px-4 py-2.5 rounded-xl bg-neutral-800 text-gray-200 font-bold text-xs hover:bg-neutral-700 transition"
            >
              Auto-Pay
            </button>
          </div>

          {/* Background decoration */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl pointer-events-none"></div>
        </div>

        {/* Transactions Section */}
        <div className="space-y-2.5">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Recent Transactions</h2>
          <div className="space-y-2">
            {transactions.map(tx => (
              <div
                key={tx.id}
                className="p-3.5 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tx.type === 'credit' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {tx.type === 'credit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-900">{tx.title}</h4>
                    <span className="text-[10px] text-gray-400">{tx.date}</span>
                  </div>
                </div>
                <span className={`text-xs font-black ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                  {tx.type === 'credit' ? `+₹${tx.amount}` : `-₹${tx.amount}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Money Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="font-extrabold text-sm text-gray-900">Add Money to Wallet</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 font-bold">✕</button>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-500 font-medium">Enter Amount (₹)</label>
              <input
                type="number"
                value={topupAmount}
                onChange={(e) => setTopupAmount(e.target.value)}
                className="w-full text-2xl font-black text-gray-900 px-3 py-2 border border-gray-200 rounded-xl focus:outline-none"
              />
              <div className="flex gap-2">
                {['100', '250', '500', '1000'].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setTopupAmount(amt)}
                    className="flex-1 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700"
                  >
                    +₹{amt}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="w-full py-3.5 rounded-2xl bg-vride-yellow text-black font-extrabold text-xs shadow-yellow-glow"
            >
              Proceed to Pay ₹{topupAmount} (UPI / Cards)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default WalletScreen;
