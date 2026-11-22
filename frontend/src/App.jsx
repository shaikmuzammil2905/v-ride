import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import CustomerApp from './components/customer/CustomerApp';
import PartnerApp from './components/partner/PartnerApp';
import AdminDashboard from './components/admin/AdminDashboard';
import WebsiteHome from './components/website/WebsiteHome';
import { ArrowLeft } from 'lucide-react';

export const App = () => {
  const { currentPortal, setCurrentPortal } = useApp();

  // Check URL query param e.g. ?portal=partner or ?portal=admin on initial load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const portal = params.get('portal');
    if (portal && ['customer', 'partner', 'admin', 'website'].includes(portal)) {
      setCurrentPortal(portal);
    }
  }, [setCurrentPortal]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans select-none overflow-x-hidden">
      {/* If viewing Partner, Admin, or Website, provide a clean return bar */}
      {currentPortal !== 'customer' && (
        <div className="bg-black text-white px-4 py-2 flex items-center justify-between text-xs border-b border-neutral-800 z-50">
          <button
            onClick={() => setCurrentPortal('customer')}
            className="flex items-center gap-1.5 font-bold text-vride-yellow hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Customer Mobile App</span>
          </button>
          <span className="text-gray-400 font-semibold uppercase text-[10px]">
            {currentPortal === 'partner' ? '🛵 Partner App' : currentPortal === 'admin' ? '💼 Admin Panel' : '🌐 Website'}
          </span>
        </div>
      )}

      {/* Main App Container */}
      <div className="flex-1 flex flex-col justify-start">
        {currentPortal === 'customer' && <CustomerApp />}
        {currentPortal === 'partner' && <PartnerApp />}
        {currentPortal === 'admin' && <AdminDashboard />}
        {currentPortal === 'website' && <WebsiteHome />}
      </div>
    </div>
  );
};
export default App;
