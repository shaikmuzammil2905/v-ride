import React from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert, LogOut, ArrowRight } from 'lucide-react';
import { useApp } from './context/AppContext';
import CustomerApp from './components/customer/CustomerApp';
import RiderPanel from './components/rider/RiderPanel';
import VendorPanel from './components/vendor/VendorPanel';
import AdminDashboard from './components/admin/AdminDashboard';
import CustomerLoginPage from './components/auth/CustomerLoginPage';
import AdminLoginPage from './components/auth/AdminLoginPage';
import PartnerLoginPage from './components/auth/PartnerLoginPage';
import { AuthLayoutShell, getDashboardPathForRole } from './components/auth/AuthShared';

const AuthLoadingScreen = () => (
  <div className="min-h-screen bg-[#10151F] flex flex-col items-center justify-center p-4 text-white">
    <div className="w-12 h-12 rounded-2xl bg-[#FFD000] text-black font-black text-2xl flex items-center justify-center animate-pulse shadow-lg">
      V
    </div>
    <p className="mt-3 text-xs font-bold text-gray-300 tracking-wider uppercase">
      Verifying V RIDE Session...
    </p>
  </div>
);

const ProtectedRoute = ({ allowedRoles, loginPath, children }) => {
  const { authToken, authUser, authLoading } = useApp();

  if (authLoading) return <AuthLoadingScreen />;

  if (!authToken || !authUser) {
    return <Navigate to={loginPath} replace />;
  }

  if (!allowedRoles.includes(authUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

const UnauthorizedScreen = () => {
  const navigate = useNavigate();
  const { authUser, logoutSession } = useApp();

  const handleSwitchAccount = async () => {
    await logoutSession();
    navigate('/', { replace: true });
  };

  return (
    <AuthLayoutShell
      title="ACCESS RESTRICTED"
      subtitle="Role-Based Protection Active"
      badge="403"
      showBack={false}
    >
      <div className="text-center space-y-4 py-2">
        <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h2 className="font-black text-base text-gray-900">Unauthorized Dashboard Access</h2>
          <p className="text-xs text-gray-600">
            {authUser
              ? `You are currently signed in as "${authUser.role}". You do not have permission to view that dashboard.`
              : 'Please sign in with an authorized account to access this dashboard.'}
          </p>
        </div>

        <div className="space-y-2 pt-1">
          {authUser && (
            <button
              type="button"
              onClick={() => navigate(getDashboardPathForRole(authUser.role), { replace: true })}
              className="w-full py-3 rounded-2xl bg-[#FFD000] hover:bg-yellow-400 text-black font-black text-xs flex items-center justify-center gap-2 shadow-sm transition"
            >
              <span>Go to My Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={handleSwitchAccount}
            className="w-full py-2.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out & Switch Account</span>
          </button>
        </div>
      </div>
    </AuthLayoutShell>
  );
};

const RootEntry = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const portal = params.get('portal');
  if (portal === 'partner') return <Navigate to="/partner" replace />;
  if (portal === 'rider') return <Navigate to="/rider" replace />;
  if (portal === 'vendor' || portal === 'restaurant') return <Navigate to="/vendor" replace />;
  if (portal === 'admin') return <Navigate to="/admin" replace />;
  return <CustomerApp />;
};

const GuestOrRedirect = ({ expectedRoles, children }) => {
  const { authToken, authUser, authLoading } = useApp();
  if (authLoading) return <AuthLoadingScreen />;
  if (authToken && authUser && expectedRoles.includes(authUser.role)) {
    return <Navigate to={getDashboardPathForRole(authUser.role)} replace />;
  }
  return children;
};

export const App = () => {
  const navigate = useNavigate();
  const { logoutSession } = useApp();

  const handleLogout = async (redirectPath = '/') => {
    await logoutSession();
    navigate(redirectPath, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans select-none overflow-x-hidden">
      <Routes>
        {/* Main Website / Customer App directly at / */}
        <Route path="/" element={<RootEntry />} />
        <Route path="/customer/*" element={<CustomerApp />} />

        {/* Customer Login */}
        <Route
          path="/login/customer"
          element={
            <GuestOrRedirect expectedRoles={['customer']}>
              <CustomerLoginPage />
            </GuestOrRedirect>
          }
        />
        <Route path="/login" element={<Navigate to="/login/customer" replace />} />

        {/* Partner Portal (Rider & Restaurant) at /partner and /login/partner */}
        <Route
          path="/partner"
          element={
            <GuestOrRedirect expectedRoles={['rider', 'vendor']}>
              <PartnerLoginPage />
            </GuestOrRedirect>
          }
        />
        <Route
          path="/login/partner"
          element={
            <GuestOrRedirect expectedRoles={['rider', 'vendor']}>
              <PartnerLoginPage />
            </GuestOrRedirect>
          }
        />
        <Route path="/partner/login" element={<Navigate to="/partner" replace />} />
        <Route path="/partner/rider" element={<Navigate to="/rider" replace />} />
        <Route path="/partner/vendor" element={<Navigate to="/vendor" replace />} />

        {/* Admin Portal at /admin (shows AdminLoginPage if not signed in) & /login/admin */}
        <Route
          path="/login/admin"
          element={
            <GuestOrRedirect expectedRoles={['admin', 'super_admin']}>
              <AdminLoginPage />
            </GuestOrRedirect>
          }
        />

        {/* Role-Protected Dashboards */}
        <Route
          path="/rider/*"
          element={
            <ProtectedRoute allowedRoles={['rider']} loginPath="/partner">
              <RiderPanel onLogout={() => handleLogout('/partner')} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/*"
          element={
            <ProtectedRoute allowedRoles={['vendor']} loginPath="/partner">
              <VendorPanel onLogout={() => handleLogout('/partner')} />
            </ProtectedRoute>
          }
        />
        <Route path="/restaurant/*" element={<Navigate to="/vendor" replace />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['admin', 'super_admin']} loginPath="/login/admin">
              <AdminDashboard onLogout={() => handleLogout('/login/admin')} />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<UnauthorizedScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
