import express from 'express';
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

const router = express.Router();

// --- Auth Routes ---
router.post('/auth/send-otp', authController.sendOtp);
router.post('/auth/verify-otp', authController.verifyOtp);
router.get('/auth/me', authController.getCurrentUser);
router.put('/auth/profile', authController.updateProfile);

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

// --- Admin Panel Routes ---
router.get('/admin/stats', adminController.getDashboardStats);
router.get('/admin/all-data', adminController.getAllData);
router.put('/admin/partners/:id/verify', adminController.verifyPartner);
router.put('/admin/pricing', adminController.updatePricing);
router.put('/admin/payouts/:id', adminController.updatePayout);
router.post('/admin/broadcast', adminController.broadcastNotification);

// --- Wallet Routes ---
router.get('/wallet', walletController.getBalance);
router.post('/wallet/add', walletController.addMoney);

// --- CMS & Common Routes ---
router.get('/cms/banners', cmsController.getBanners);
router.get('/cms/coupons', cmsController.getCoupons);
router.post('/support/ticket', cmsController.submitTicket);

export default router;
