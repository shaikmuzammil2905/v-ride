import express from 'express';
import multer from 'multer';
import {
  authController,
  rideController,
  parcelController,
  foodController,
  partnerController,
  adminController,
  walletController,
  cmsController
} from '../controllers/apiControllers.js';
import {
  mediaController,
  paymentController,
  usersCrud,
  partnersCrud,
  restaurantsCrud,
  menuItemsCrud,
  bannersCrud,
  couponsCrud,
  pricingCrud,
  payoutsCrud,
  ticketsCrud,
  ordersManagementController
} from '../controllers/awsPaymentAdminController.js';
import {
  unifiedAuthController,
  riderPanelController,
  vendorPanelController,
  adminGovernanceController
} from '../controllers/unifiedPartnerController.js';
import {
  authSystemController,
  requireAuth,
  requireRole
} from '../controllers/authSystemController.js';

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB max upload
});

// --- Auth Routes ---
router.post('/auth/login', authSystemController.login);
router.post('/auth/register', authSystemController.register);
router.post('/auth/send-otp', authSystemController.sendOtp);
router.post('/auth/verify-otp', authSystemController.verifyOtp);
router.post('/auth/forgot-password', authSystemController.forgotPassword);
router.post('/auth/reset-password', authSystemController.resetPassword);
router.get('/auth/me', requireAuth, authSystemController.me);
router.post('/auth/logout', authSystemController.logout);
router.put('/auth/profile', requireAuth, authController.updateProfile);

// --- AWS S3 Media Management Routes ---
router.post('/media/upload', upload.single('file'), mediaController.upload);
router.get('/media/list', mediaController.list);
router.delete('/media', mediaController.remove);
router.post('/media/presign', mediaController.presign);

// --- Razorpay Payment Gateway Routes ---
router.get('/payments/config', paymentController.getConfig);
router.post('/payments/create-order', paymentController.createOrder);
router.post('/payments/verify', paymentController.verifyPayment);
router.get('/payments/transactions', paymentController.listTransactions);

// --- Ride Booking Routes ---
router.post('/rides/estimate', rideController.estimateFare);
router.post('/rides/book', rideController.bookRide);
router.get('/rides', rideController.getRides);
router.get('/rides/:id', rideController.getRideById);
router.put('/rides/:id/status', rideController.updateRideStatus);
router.post('/rides/:id/rate', rideController.rateRide);

// --- Parcel & Pick-Drop Routes ---
router.post('/parcels/estimate', parcelController.estimateFare);
router.post('/parcels/book', parcelController.bookParcel);
router.get('/parcels', parcelController.getParcels);
router.post('/pickdrop/book', parcelController.bookPickDrop);
router.get('/pickdrop', parcelController.getPickDrops);

// --- Food Ordering Routes ---
router.get('/food/restaurants', foodController.getRestaurants);
router.get('/food/restaurants/:id', foodController.getRestaurantById);
router.post('/food/orders', foodController.createFoodOrder);
router.get('/food/orders', foodController.getOrders);
router.get('/food/orders/:id', foodController.getOrderById);
router.put('/food/orders/:id/status', foodController.updateOrderStatus);

// --- Delivery Partner Routes ---
router.get('/partner/:id/profile', partnerController.getProfile);
router.put('/partner/:id/toggle-online', partnerController.toggleOnline);
router.get('/partner/:id/jobs', partnerController.getJobs);
router.post('/partner/withdrawal', partnerController.requestWithdrawal);

// --- Admin & Management Full CRUD Routes ---
router.get('/admin/stats', adminController.getDashboardStats);
router.get('/admin/all-data', adminController.getAllData);
router.put('/admin/partners/:id/verify', adminController.verifyPartner);
router.put('/admin/pricing', adminController.updatePricing);
router.put('/admin/payouts/:id', adminController.updatePayout);
router.post('/admin/broadcast', adminController.broadcastNotification);

// Users CRUD
router.get('/admin/users', usersCrud.list);
router.post('/admin/users', usersCrud.create);
router.put('/admin/users/:id', usersCrud.update);
router.delete('/admin/users/:id', usersCrud.remove);

// Partners CRUD
router.get('/admin/partners', partnersCrud.list);
router.post('/admin/partners', partnersCrud.create);
router.put('/admin/partners/:id', partnersCrud.update);
router.delete('/admin/partners/:id', partnersCrud.remove);

// Restaurants & Menu Items CRUD
router.get('/admin/restaurants', restaurantsCrud.list);
router.post('/admin/restaurants', restaurantsCrud.create);
router.put('/admin/restaurants/:id', restaurantsCrud.update);
router.delete('/admin/restaurants/:id', restaurantsCrud.remove);

router.get('/admin/menu-items', menuItemsCrud.list);
router.post('/admin/menu-items', menuItemsCrud.create);
router.put('/admin/menu-items/:id', menuItemsCrud.update);
router.delete('/admin/menu-items/:id', menuItemsCrud.remove);

// Banners CRUD
router.get('/admin/banners', bannersCrud.list);
router.post('/admin/banners', bannersCrud.create);
router.put('/admin/banners/:id', bannersCrud.update);
router.delete('/admin/banners/:id', bannersCrud.remove);

// Coupons CRUD
router.get('/admin/coupons', couponsCrud.list);
router.post('/admin/coupons', couponsCrud.create);
router.put('/admin/coupons/:id', couponsCrud.update);
router.delete('/admin/coupons/:id', couponsCrud.remove);

// Pricing CRUD
router.get('/admin/pricing-rules', pricingCrud.list);
router.post('/admin/pricing-rules', pricingCrud.create);
router.put('/admin/pricing-rules/:id', pricingCrud.update);
router.delete('/admin/pricing-rules/:id', pricingCrud.remove);

// Payouts CRUD
router.get('/admin/payouts', payoutsCrud.list);
router.post('/admin/payouts', payoutsCrud.create);
router.delete('/admin/payouts/:id', payoutsCrud.remove);

// Orders Management CRUD
router.get('/admin/orders', ordersManagementController.listAll);
router.put('/admin/orders/:type/:id', ordersManagementController.updateOrder);
router.delete('/admin/orders/:type/:id', ordersManagementController.deleteOrder);

// --- Wallet Routes ---
router.get('/wallet', walletController.getBalance);
router.post('/wallet/add', walletController.addMoney);

// --- Unified Role Authentication ---
router.post('/auth/portal-login', unifiedAuthController.portalLogin);

// --- Rider Panel Routes ---
router.get('/rider/:id/dashboard', riderPanelController.getDashboard);
router.put('/rider/:id/duty', riderPanelController.toggleDuty);
router.put('/rider/:id/profile', riderPanelController.updateProfile);
router.post('/rider/:id/withdraw', riderPanelController.withdrawWallet);
router.post('/rider/:id/settle-cash', riderPanelController.settleCash);
router.post('/rider/jobs/:jobId/accept', riderPanelController.acceptJob);
router.post('/rider/jobs/:jobId/reject', riderPanelController.rejectJob);
router.put('/rider/jobs/:jobId/stage', riderPanelController.updateJobStage);
router.post('/rider/jobs/:jobId/verify-otp', riderPanelController.verifyJobOtp);
router.post('/rider/jobs/:jobId/complete', riderPanelController.completeJob);
router.post('/rider/sos', riderPanelController.recordSos);

// --- Restaurant Vendor Panel Routes ---
router.get('/vendor/:id/dashboard', vendorPanelController.getDashboard);
router.put('/vendor/:id/settings', vendorPanelController.updateSettings);
router.put('/vendor/:id/profile', vendorPanelController.updateProfile);
router.put('/vendor/orders/:orderId/transition', vendorPanelController.transitionOrder);
router.post('/vendor/:id/withdraw', vendorPanelController.withdrawWallet);
router.get('/vendor/:id/categories', vendorPanelController.categoriesCrud.list);
router.post('/vendor/:id/categories', vendorPanelController.categoriesCrud.create);
router.put('/vendor/:id/categories/:catId', vendorPanelController.categoriesCrud.update);
router.delete('/vendor/:id/categories/:catId', vendorPanelController.categoriesCrud.remove);
router.get('/vendor/:id/offers', vendorPanelController.offersCrud.list);
router.post('/vendor/:id/offers', vendorPanelController.offersCrud.create);
router.put('/vendor/:id/offers/:offerId', vendorPanelController.offersCrud.update);
router.get('/vendor/:id/reviews', vendorPanelController.reviewsCrud.list);
router.post('/vendor/:id/reviews/:reviewId/reply', vendorPanelController.reviewsCrud.reply);
router.post('/vendor/:id/reviews/:reviewId/report', vendorPanelController.reviewsCrud.report);
router.get('/vendor/:id/staff', vendorPanelController.staffCrud.list);
router.post('/vendor/:id/staff', vendorPanelController.staffCrud.create);
router.put('/vendor/:id/staff/:staffId', vendorPanelController.staffCrud.update);
router.delete('/vendor/:id/staff/:staffId', vendorPanelController.staffCrud.remove);

// --- Admin Governance, Roles, Settings & Audit Logs ---
router.get('/admin/accounts', requireAuth, requireRole('admin', 'super_admin'), adminGovernanceController.listAdmins);
router.post('/admin/accounts', requireAuth, requireRole('admin', 'super_admin'), adminGovernanceController.createAdmin);
router.delete('/admin/accounts/:id', requireAuth, requireRole('admin', 'super_admin'), adminGovernanceController.deleteAdmin);
router.get('/admin/audit-logs', requireAuth, requireRole('admin', 'super_admin'), adminGovernanceController.listAuditLogs);
router.get('/admin/settings', requireAuth, requireRole('admin', 'super_admin'), adminGovernanceController.getSettings);
router.put('/admin/settings', requireAuth, requireRole('admin', 'super_admin'), adminGovernanceController.updateSettings);

// --- CMS & Support Panel Routes ---
router.get('/cms/banners', cmsController.getBanners);
router.get('/cms/coupons', cmsController.getCoupons);
router.post('/support/ticket', cmsController.submitTicket);
router.get('/support/tickets', ticketsCrud.list);
router.put('/support/tickets/:id', ticketsCrud.update);
router.delete('/support/tickets/:id', ticketsCrud.remove);

export default router;
