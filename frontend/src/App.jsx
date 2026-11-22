import React from 'react';
import { useApp } from './context/AppContext';
import AppSwitcher from './components/common/AppSwitcher';
import CustomerApp from './components/customer/CustomerApp';
import PartnerApp from './components/partner/PartnerApp';
import AdminDashboard from './components/admin/AdminDashboard';
import WebsiteHome from './components/website/WebsiteHome';

export const App = () => {
  const { currentPortal } = useApp();

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col font-sans">
      {/* Top Switcher Bar allowing immediate evaluation of all 4 modules */}
      <AppSwitcher />

      {/* Portal Container */}
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
