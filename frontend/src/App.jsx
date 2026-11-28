import React, { useEffect, useState } from 'react';
import { useApp } from './context/AppContext';
import CustomerApp from './components/customer/CustomerApp';
import RiderPanel from './components/rider/RiderPanel';
import VendorPanel from './components/vendor/VendorPanel';
import AdminDashboard from './components/admin/AdminDashboard';
import WebsiteHome from './components/website/WebsiteHome';
import SupportPortal from './components/support/SupportPortal';
import UnifiedPartnerLogin from './components/common/UnifiedPartnerLogin';
import { ArrowLeft } from 'lucide-react';

export const App = () => {
  const { currentPortal, setCurrentPortal } = useApp();
  const [partnerSession, setPartnerSession] = useState(() => {
    try {
      const saved = localStorage.getItem('vride_partner_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Sync URL query param (?portal=...) or path (/partner/rider, /partner/vendor, /admin)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const portal = params.get('portal');
    const path = window.location.pathname.toLowerCase();

    if (portal && ['customer', 'partner', 'rider', 'vendor', 'admin', 'support', 'website'].includes(portal)) {
      setCurrentPortal(portal);
    } else if (path.startsWith('/partner/rider')) {
      setCurrentPortal('rider');
    } else if (path.startsWith('/partner/vendor')) {
      setCurrentPortal('vendor');
    } else if (path.startsWith('/partner')) {
      setCurrentPortal('partner');
    } else if (path.startsWith('/admin')) {
      setCurrentPortal('admin');
    }
  }, [setCurrentPortal]);

  const handleLogout = (roleKey) => {
    localStorage.removeItem(`vride_auth_${roleKey}`);
    localStorage.removeItem('vride_partner_session');
    setPartnerSession(null);
  };

  const handleAuthenticated = (role, user) => {
    setPartnerSession({ role, user });
    setCurrentPortal(role);
  };

  const isRoleAuthorized = (expectedRole) => {
    if (localStorage.getItem(`vride_auth_${expectedRole}`) === 'true') return true;
    return partnerSession?.role === expectedRole;
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans select-none overflow-x-hidden">
      {/* Return bar when viewing Partner/Vendor/Rider/Admin/Support */}
      {currentPortal !== 'customer' && (
        <div className="bg-black text-white px-4 py-2 flex items-center justify-between text-xs border-b border-neutral-800 z-50">
          <button
            onClick={() => {
              window.history.replaceState({}, '', '/');
              setCurrentPortal('customer');
            }}
            className="flex items-center gap-1.5 font-bold text-vride-yellow hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Customer Mobile App</span>
          </button>
          <span className="text-gray-400 font-semibold uppercase text-[10px]">
            {currentPortal === 'vendor'
              ? '🍽️ Vendor Panel'
              : currentPortal === 'rider' || currentPortal === 'partner'
              ? '🛵 Rider Partner Panel'
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

        {/* Unified Partner Login (?portal=partner or /partner/login) */}
        {currentPortal === 'partner' && (
          isRoleAuthorized('rider') ? (
            <RiderPanel onLogout={() => handleLogout('rider')} />
          ) : isRoleAuthorized('vendor') ? (
            <VendorPanel onLogout={() => handleLogout('vendor')} />
          ) : isRoleAuthorized('admin') ? (
            <AdminDashboard onLogout={() => handleLogout('admin')} />
          ) : (
            <UnifiedPartnerLogin initialRole="rider" onAuthenticated={handleAuthenticated} />
          )
        )}

        {/* Rider Panel (?portal=rider or /partner/rider) */}
        {currentPortal === 'rider' && (
          isRoleAuthorized('rider') ? (
            <RiderPanel onLogout={() => handleLogout('rider')} />
          ) : (
            <UnifiedPartnerLogin initialRole="rider" onAuthenticated={handleAuthenticated} />
          )
        )}

        {/* Restaurant Vendor Panel (?portal=vendor or /partner/vendor) */}
        {currentPortal === 'vendor' && (
          isRoleAuthorized('vendor') ? (
            <VendorPanel onLogout={() => handleLogout('vendor')} />
          ) : (
            <UnifiedPartnerLogin initialRole="vendor" onAuthenticated={handleAuthenticated} />
          )
        )}

        {/* Admin Panel (?portal=admin or /admin) */}
        {currentPortal === 'admin' && (
          isRoleAuthorized('admin') ? (
            <AdminDashboard onLogout={() => handleLogout('admin')} />
          ) : (
            <UnifiedPartnerLogin initialRole="admin" onAuthenticated={handleAuthenticated} />
          )
        )}

        {/* Support Panel (?portal=support) */}
        {currentPortal === 'support' && (
          isRoleAuthorized('support') ? (
            <SupportPortal />
          ) : (
            <UnifiedPartnerLogin initialRole="support" onAuthenticated={handleAuthenticated} />
          )
        )}

        {currentPortal === 'website' && <WebsiteHome />}
      </div>
    </div>
  );
};

export default App;
