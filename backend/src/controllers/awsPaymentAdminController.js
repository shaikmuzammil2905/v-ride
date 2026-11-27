import crypto from 'crypto';
import Razorpay from 'razorpay';
import { v4 as uuidv4 } from 'uuid';
import db from '../config/db.js';
import {
  uploadBufferToS3,
  listS3Media,
  deleteS3Object,
  createPresignedPutUrl
} from '../config/aws.js';

const getRazorpayClient = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
};

// =====================================================================
// 1. AWS S3 MEDIA MANAGEMENT CONTROLLER
// =====================================================================
export const mediaController = {
  upload: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }
      const folder = req.body.folder || 'vride-media';
      const result = await uploadBufferToS3({
        buffer: req.file.buffer,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        folder
      });

      const record = {
        id: 'med_' + uuidv4().slice(0, 8),
        ...result,
        uploadedBy: req.body.uploadedBy || 'admin',
        createdAt: new Date().toISOString()
      };
      db.insert('mediaAssets', record);

      return res.json({ success: true, data: record });
    } catch (err) {
      console.error('S3 upload error:', err);
      return res.status(500).json({ success: false, message: err.message || 'S3 upload failed' });
    }
  },

  list: async (req, res) => {
    try {
      const prefix = req.query.prefix || '';
      const result = await listS3Media(prefix);
      return res.json({ success: true, data: result });
    } catch (err) {
      console.error('S3 list error:', err);
      return res.status(500).json({ success: false, message: err.message || 'Failed to list S3 media' });
    }
  },

  remove: async (req, res) => {
    try {
      const key = req.query.key || req.body?.key;
      if (!key) {
        return res.status(400).json({ success: false, message: 'S3 object key is required' });
      }
      await deleteS3Object(key);
      const existing = db.get('mediaAssets').find((m) => m.key === key);
      if (existing) db.delete('mediaAssets', existing.id);
      return res.json({ success: true, message: 'Deleted from S3', key });
    } catch (err) {
      console.error('S3 delete error:', err);
      return res.status(500).json({ success: false, message: err.message || 'Failed to delete from S3' });
    }
  },

  presign: async (req, res) => {
    try {
      const { fileName, contentType, folder } = req.body;
      const safeName = (fileName || 'upload.jpg').replace(/[^a-zA-Z0-9._-]/g, '_');
      const key = `${folder || 'vride-media'}/${Date.now()}-${safeName}`;
      const result = await createPresignedPutUrl(key, contentType || 'image/jpeg');
      return res.json({ success: true, data: result });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
};

// =====================================================================
// 2. RAZORPAY PAYMENT CONTROLLER
// =====================================================================
export const paymentController = {
  getConfig: (req, res) => {
    return res.json({
      success: true,
      keyId: process.env.RAZORPAY_KEY_ID || '',
      currency: 'INR',
      mode: (process.env.RAZORPAY_KEY_ID || '').startsWith('rzp_test_') ? 'test' : 'live'
    });
  },

  createOrder: async (req, res) => {
    try {
      const { amount, purpose = 'service_payment', userId = 'usr_srilatha', meta = {} } = req.body;
      const numericAmount = Number(amount);
      if (!numericAmount || numericAmount <= 0) {
        return res.status(400).json({ success: false, message: 'Valid amount (> 0) is required' });
      }

      const client = getRazorpayClient();
      if (!client) {
        return res.status(500).json({ success: false, message: 'Razorpay keys not configured on server' });
      }

      const order = await client.orders.create({
        amount: Math.round(numericAmount * 100), // paise
        currency: 'INR',
        receipt: `vride_${Date.now()}`,
        notes: { purpose, userId, ...meta }
      });

      const tx = {
        id: 'tx_' + uuidv4().slice(0, 8),
        userId,
        type: purpose === 'wallet_topup' ? 'credit' : 'debit',
        title: meta.title || (purpose === 'wallet_topup' ? 'Wallet Top-up via Razorpay' : 'V RIDE Order Payment'),
        amount: numericAmount,
        razorpayOrderId: order.id,
        status: 'created',
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        createdAt: new Date().toISOString()
      };
      db.insert('transactions', tx);

      return res.json({
        success: true,
        keyId: process.env.RAZORPAY_KEY_ID,
        order,
        transaction: tx
      });
    } catch (err) {
      console.error('Razorpay createOrder error:', err);
      return res.status(500).json({ success: false, message: err.message || 'Razorpay order creation failed' });
    }
  },

  verifyPayment: (req, res) => {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        userId = 'usr_srilatha',
        purpose = 'service_payment',
        amount = 0
      } = req.body;

      const secret = process.env.RAZORPAY_KEY_SECRET;
      if (!secret) {
        return res.status(500).json({ success: false, message: 'Razorpay secret not configured' });
      }

      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      const isValid = expectedSignature === razorpay_signature;
      if (!isValid) {
        return res.status(400).json({ success: false, message: 'Invalid Razorpay payment signature' });
      }

      // Update transaction status
      const allTx = db.get('transactions');
      const existingTx = allTx.find((t) => t.razorpayOrderId === razorpay_order_id);
      if (existingTx) {
        db.update('transactions', existingTx.id, {
          status: 'paid',
          razorpayPaymentId: razorpay_payment_id
        });
      }

      // Credit user wallet if wallet top-up
      let updatedBalance = null;
      if (purpose === 'wallet_topup') {
        const user = db.findById('users', userId);
        const creditAmt = Number(amount || existingTx?.amount || 0);
        if (user && creditAmt > 0) {
          updatedBalance = (user.walletBalance || 0) + creditAmt;
          db.update('users', userId, { walletBalance: updatedBalance });
        }
      }

      return res.json({
        success: true,
        verified: true,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        walletBalance: updatedBalance
      });
    } catch (err) {
      console.error('Razorpay verify error:', err);
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  listTransactions: (req, res) => {
    return res.json({ success: true, data: db.get('transactions') });
  }
};

// =====================================================================
// 3. FULL CRUD MANAGEMENT CONTROLLERS (ADMIN, PARTNER, SUPPORT)
// =====================================================================
const makeCrud = (tableName, idPrefix) => ({
  list: (req, res) => res.json({ success: true, data: db.get(tableName) }),
  create: (req, res) => {
    const item = {
      id: `${idPrefix}_${uuidv4().slice(0, 8)}`,
      ...req.body,
      createdAt: new Date().toISOString()
    };
    db.insert(tableName, item);
    return res.json({ success: true, data: item });
  },
  update: (req, res) => {
    const updated = db.update(tableName, req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: `${tableName} item not found` });
    return res.json({ success: true, data: updated });
  },
  remove: (req, res) => {
    const deleted = db.delete(tableName, req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: `${tableName} item not found` });
    return res.json({ success: true, data: deleted });
  }
});

export const usersCrud = makeCrud('users', 'usr');
export const partnersCrud = makeCrud('partners', 'ptn');
export const restaurantsCrud = makeCrud('restaurants', 'rest');
export const menuItemsCrud = makeCrud('menuItems', 'menu');
export const bannersCrud = makeCrud('banners', 'bnr');
export const couponsCrud = makeCrud('coupons', 'cpn');
export const pricingCrud = makeCrud('pricingRules', 'prc');
export const payoutsCrud = makeCrud('payouts', 'pay');
export const ticketsCrud = makeCrud('supportTickets', 'tkt');

export const ordersManagementController = {
  listAll: (req, res) => {
    return res.json({
      success: true,
      data: {
        rides: db.get('rides'),
        foodOrders: db.get('foodOrders'),
        parcels: db.get('parcels')
      }
    });
  },
  updateOrder: (req, res) => {
    const { type, id } = req.params;
    const tableMap = { ride: 'rides', food: 'foodOrders', parcel: 'parcels' };
    const table = tableMap[type];
    if (!table) return res.status(400).json({ success: false, message: 'Invalid order type' });
    const updated = db.update(table, id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Order not found' });
    return res.json({ success: true, data: updated });
  },
  deleteOrder: (req, res) => {
    const { type, id } = req.params;
    const tableMap = { ride: 'rides', food: 'foodOrders', parcel: 'parcels' };
    const table = tableMap[type];
    if (!table) return res.status(400).json({ success: false, message: 'Invalid order type' });
    const deleted = db.delete(table, id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Order not found' });
    return res.json({ success: true, data: deleted });
  }
};
