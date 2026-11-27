import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import CustomerApp from './components/customer/CustomerApp';
import PartnerApp from './components/partner/PartnerApp';
import AdminDashboard from './components/admin/AdminDashboard';
import WebsiteHome from './components/website/WebsiteHome';
import SupportPortal from './components/support/SupportPortal';
import PortalLoginGate from './components/common/PortalLoginGate';
import { ArrowLeft } from 'lucide-react';

export const App = () => {
  const { currentPortal, setCurrentPortal } = useApp();

  // Check URL query param e.g. ?portal=partner, ?portal=admin, or ?portal=support on initial load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const portal = params.get('portal');
    if (portal && ['customer', 'partner', 'admin', 'support', 'website'].includes(portal)) {
      setCurrentPortal(portal);
    }
  }, [setCurrentPortal]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans select-none overflow-x-hidden">
      {/* Return bar when viewing Partner, Admin, Support, or Website */}
      {currentPortal !== 'customer' && (
        <div className="bg-black text-white px-4 py-2 flex items-center justify-between text-xs border-b border-neutral-800 z-50">
          <button
            onClick={() => {
              window.history.replaceState({}, '', window.location.pathname);
              setCurrentPortal('customer');
            }}
            className="flex items-center gap-1.5 font-bold text-vride-yellow hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Customer Mobile App</span>
          </button>
          <span className="text-gray-400 font-semibold uppercase text-[10px]">
            {currentPortal === 'partner'
              ? '🛵 Partner Panel'
              : currentPortal === 'admin'
              ? '💼 Admin Panel'
              : currentPortal === 'support'
              ? '💬 Support Panel'
              : '🌐 Website'}
          </span>
        </div>
      )}

      {/* Main App Container */}
      <div className="flex-1 flex flex-col justify-start">
        {currentPortal === 'customer' && <CustomerApp />}
        {currentPortal === 'partner' && (
          <PortalLoginGate
            portalKey="partner"
            title="Partner Panel"
            subtitle="V RIDE Driver & Delivery Fleet"
            badgeText="Partner Auth"
            validId="partner@vride.in"
            validAltId="+91 98480 12345"
            validPassword="Partner@2026"
          >
            <PartnerApp />
          </PortalLoginGate>
        )}
        {currentPortal === 'admin' && (
          <PortalLoginGate
            portalKey="admin"
            title="Admin Panel"
            subtitle="V RIDE Super Admin & AWS S3 Management"
            badgeText="Admin Auth"
            validId="admin@vride.in"
            validPassword="VRideAdmin@2026"
          >
            <AdminDashboard />
          </PortalLoginGate>
        )}
        {currentPortal === 'support' && (
          <PortalLoginGate
            portalKey="support"
            title="Support Panel"
            subtitle="V RIDE 24/7 Operations Desk"
            badgeText="Support Auth"
            validId="support@vride.in"
            validPassword="Support@2026"
          >
            <SupportPortal />
          </PortalLoginGate>
        )}
        {currentPortal === 'website' && <WebsiteHome />}
      </div>
    </div>
  );
};

export default App;
