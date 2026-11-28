import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'vride_jwt_secure_key_2026_hyderabad';

const logAudit = (adminName, action, moduleName, relatedRecord) => {
  db.insert('auditLogs', {
    id: 'aud_' + uuidv4().slice(0, 8),
    adminName: adminName || 'Super Admin',
    action,
    module: moduleName,
    relatedRecord,
    createdAt: new Date().toISOString()
  });
};

// =====================================================================
// 1. UNIFIED PARTNER / ADMIN / SUPPORT AUTHENTICATION
// =====================================================================
export const unifiedAuthController = {
  portalLogin: (req, res) => {
    const { role, identifier, password } = req.body;
    const idClean = (identifier || '').trim().toLowerCase();

    const accounts = {
      admin: {
        ids: ['admin@vride.in', 'admin'],
        pass: 'VRideAdmin@2026',
        user: { id: 'adm_super', name: 'Operations Lead', email: 'admin@vride.in', role: 'admin', city: 'All Cities' }
      },
      support: {
        ids: ['support@vride.in', 'anand.admin@vride.com'],
        pass: 'Support@2026',
        user: { id: 'adm_support', name: 'Anand Kumar', email: 'support@vride.in', role: 'support', city: 'All Cities' }
      },
      rider: {
        ids: ['partner@vride.in', 'rider@vride.in', '+91 98480 12345', '+91 97034 56789', '9703456789', '9848012345'],
        pass: 'Partner@2026',
        user: { id: 'ptn_ramesh', name: 'Raju Kumar', phone: '+91 97034 56789', email: 'rider@vride.in', role: 'rider', vehicleType: 'bike' }
      },
      vendor: {
        ids: ['vendor@vride.in', 'paradise@vride.in', '+91 90001 11222', '9000111222'],
        pass: 'Vendor@2026',
        user: { id: 'rest_paradise', name: 'Paradise Biryani', email: 'vendor@vride.in', role: 'vendor', restaurantId: 'rest_paradise' }
      }
    };

    const target = accounts[role];
    if (!target || !target.ids.includes(idClean) || password !== target.pass) {
      return res.status(401).json({ success: false, message: 'Invalid role credentials' });
    }

    const token = jwt.sign({ id: target.user.id, role: target.user.role }, JWT_SECRET, { expiresIn: '7d' });
    if (role === 'admin' || role === 'support') {
      logAudit(target.user.name, 'Portal Login', 'Auth', target.user.email);
    }

    return res.json({ success: true, token, user: target.user });
  }
};

// =====================================================================
// 2. RIDER PANEL CONTROLLER
// =====================================================================
export const riderPanelController = {
  getDashboard: (req, res) => {
    const riderId = req.params.id || 'ptn_ramesh';
    const rider = db.findById('partners', riderId) || db.get('partners')[0] || {
      id: riderId,
      name: 'Raju Kumar',
      phone: '+91 97034 56789',
      vehicleType: 'bike',
      vehicleModel: 'Honda Activa 6G',
      vehicleNumber: 'TS 09 AB 4321',
      status: 'approved',
      isOnline: true,
      walletBalance: 3820,
      rating: 4.8,
      totalTrips: 1246
    };

    const rides = db.get('rides');
    const foodOrders = db.get('foodOrders');
    const availableJobs = [
      ...rides.filter((r) => r.status === 'searching' || r.status === 'pending').map((r) => ({ ...r, jobType: 'ride' })),
      ...foodOrders.filter((f) => f.status === 'ready_for_pickup' || f.status === 'placed').map((f) => ({ ...f, jobType: 'food' }))
    ];

    return res.json({
      success: true,
      data: {
        rider,
        todayEarnings: 1248,
        yesterdayCompare: '+12%',
        completedTripsToday: 16,
        onlineTime: '6h 20m',
        incentive: { current: 400, target: 600, percent: 67 },
        highDemandAreas: [
          { name: 'Miyapur', demand: 'High' },
          { name: 'Kukatpally', demand: 'High' },
          { name: 'Hitech City', demand: 'Medium' }
        ],
        availableJobs
      }
    });
  },

  toggleDuty: (req, res) => {
    const riderId = req.params.id || 'ptn_ramesh';
    const rider = db.findById('partners', riderId);
    if (rider && rider.status !== 'approved') {
      return res.status(403).json({ success: false, message: 'Only approved riders can go ON DUTY' });
    }
    const isOnline = Boolean(req.body.isOnline);
    if (rider) db.update('partners', riderId, { isOnline });
    return res.json({ success: true, isOnline });
  },

  acceptJob: (req, res) => {
    const { jobId } = req.params;
    const { jobType = 'ride', riderId = 'ptn_ramesh' } = req.body;
    const table = jobType === 'food' ? 'foodOrders' : 'rides';
    const existing = db.findById(table, jobId);

    if (existing && existing.assignedRiderId && existing.assignedRiderId !== riderId) {
      return res.status(409).json({ success: false, message: 'Job already accepted by another rider' });
    }

    if (existing) {
      db.update(table, jobId, {
        assignedRiderId: riderId,
        status: jobType === 'food' ? 'accepted_by_rider' : 'accepted'
      });
    }

    return res.json({ success: true, jobId, status: 'accepted' });
  },

  verifyJobOtp: (req, res) => {
    const { jobId } = req.params;
    const { otp, expectedOtp = '7492' } = req.body;
    if (!otp || String(otp).trim() !== String(expectedOtp).trim()) {
      return res.status(400).json({ success: false, message: 'Invalid OTP. Please ask customer for the 4-digit OTP.' });
    }
    return res.json({ success: true, verified: true, jobId });
  },

  completeJob: (req, res) => {
    const { jobId } = req.params;
    const {
      jobType = 'ride',
      riderId = 'ptn_ramesh',
      fare = 156,
      platformFee = 15,
      tips = 0,
      paymentMode = 'UPI',
      pickup = 'Miyapur Metro Station',
      drop = 'Kukatpally Bus Stop'
    } = req.body;

    // Prevent duplicate completion transaction
    const existingTx = db.get('transactions').find((t) => t.jobId === jobId && t.type === 'credit');
    if (existingTx) {
      return res.json({ success: true, duplicate: true, transaction: existingTx });
    }

    const netEarnings = Number(fare) - Number(platformFee) + Number(tips);
    const rider = db.findById('partners', riderId);
    const newBalance = (rider?.walletBalance || 3820) + netEarnings;
    if (rider) {
      db.update('partners', riderId, {
        walletBalance: newBalance,
        totalTrips: (rider.totalTrips || 1246) + 1
      });
    }

    const table = jobType === 'food' ? 'foodOrders' : 'rides';
    if (db.findById(table, jobId)) {
      db.update(table, jobId, { status: 'completed' });
    } else {
      db.insert(table, {
        id: jobId,
        pickup,
        drop,
        fare: Number(fare),
        earnings: netEarnings,
        paymentMode,
        status: 'completed',
        createdAt: new Date().toISOString()
      });
    }

    const tx = {
      id: 'tx_' + uuidv4().slice(0, 8),
      jobId,
      userId: riderId,
      type: 'credit',
      category: jobType === 'food' ? 'Food Delivery Earnings' : 'Trip Earnings',
      title: `${jobType === 'food' ? 'Food Delivery' : 'Trip'} (${pickup} → ${drop})`,
      amount: netEarnings,
      status: 'paid',
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      createdAt: new Date().toISOString()
    };
    db.insert('transactions', tx);

    return res.json({ success: true, netEarnings, walletBalance: newBalance, transaction: tx });
  },

  recordSos: (req, res) => {
    const { riderId = 'ptn_ramesh', lat = 17.4948, lng = 78.3578, note = 'Emergency SOS triggered' } = req.body;
    const event = {
      id: 'sos_' + uuidv4().slice(0, 8),
      riderId,
      lat,
      lng,
      note,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    db.insert('sosEvents', event);
    db.insert('supportTickets', {
      id: 'tkt_' + uuidv4().slice(0, 8),
      userName: 'Rider SOS Alert',
      category: 'Emergency SOS',
      subject: `SOS from ${riderId} (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
      message: note,
      priority: 'High',
      status: 'open',
      createdAt: new Date().toISOString()
    });
    return res.json({ success: true, data: event });
  }
};

// =====================================================================
// 3. RESTAURANT VENDOR PANEL CONTROLLER
// =====================================================================
export const vendorPanelController = {
  getDashboard: (req, res) => {
    const restId = req.params.id || 'rest_paradise';
    const restaurant = db.findById('restaurants', restId) || {
      id: restId,
      name: 'Paradise Biryani',
      address: 'Miyapur, Hyderabad',
      rating: 4.6,
      isOpen: true,
      pauseOrders: false,
      prepTime: '20 Minutes',
      operatingHours: '10:00 AM - 11:00 PM',
      walletBalance: 12480
    };
    const menuItems = db.get('menuItems').filter((m) => m.restaurantId === restId);
    const orders = db.get('foodOrders');

    return res.json({
      success: true,
      data: {
        restaurant,
        stats: {
          todayOrders: 56,
          todayRevenue: 18760,
          rating: restaurant.rating || 4.6,
          walletBalance: restaurant.walletBalance || 12480,
          totalProducts: menuItems.length || 12
        },
        orders,
        menuItems
      }
    });
  },

  updateSettings: (req, res) => {
    const restId = req.params.id || 'rest_paradise';
    const existing = db.findById('restaurants', restId);
    if (existing) {
      const updated = db.update('restaurants', restId, req.body);
      return res.json({ success: true, data: updated });
    }
    return res.json({ success: true, data: { id: restId, ...req.body } });
  },

  transitionOrder: (req, res) => {
    const { orderId } = req.params;
    const { status, reason } = req.body;
    const allowed = ['accepted', 'preparing', 'ready', 'picked_up', 'delivered', 'rejected'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid order transition status' });
    }
    const existing = db.findById('foodOrders', orderId);
    if (existing) {
      const updated = db.update('foodOrders', orderId, { status, ...(reason ? { rejectionReason: reason } : {}) });
      return res.json({ success: true, data: updated });
    }
    return res.json({ success: true, data: { id: orderId, status } });
  },

  withdrawWallet: (req, res) => {
    const restId = req.params.id || 'rest_paradise';
    const amount = Number(req.body.amount || 0);
    if (amount <= 0) return res.status(400).json({ success: false, message: 'Invalid amount' });

    const rest = db.findById('restaurants', restId);
    const currentBal = rest?.walletBalance ?? 12480;
    if (amount > currentBal) {
      return res.status(400).json({ success: false, message: 'Insufficient vendor wallet balance' });
    }

    if (rest) db.update('restaurants', restId, { walletBalance: currentBal - amount });
    const payout = {
      id: 'pay_' + uuidv4().slice(0, 8),
      partner: rest?.name || 'Paradise Biryani',
      type: 'vendor',
      amount,
      bank: req.body.method || 'HDFC Bank / UPI',
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    db.insert('payouts', payout);
    return res.json({ success: true, walletBalance: currentBal - amount, payout });
  },

  staffCrud: {
    list: (req, res) => res.json({ success: true, data: db.get('vendorStaff') }),
    create: (req, res) => {
      const item = { id: 'stf_' + uuidv4().slice(0, 8), ...req.body, active: true, createdAt: new Date().toISOString() };
      db.insert('vendorStaff', item);
      return res.json({ success: true, data: item });
    },
    update: (req, res) => {
      const updated = db.update('vendorStaff', req.params.staffId, req.body);
      return res.json({ success: true, data: updated });
    },
    remove: (req, res) => {
      const deleted = db.delete('vendorStaff', req.params.staffId);
      return res.json({ success: true, data: deleted });
    }
  }
};

// =====================================================================
// 4. ADMIN ROLES, AUDIT LOGS & SETTINGS CONTROLLER
// =====================================================================
export const adminGovernanceController = {
  listAdmins: (req, res) => res.json({ success: true, data: db.get('adminAccounts') }),
  createAdmin: (req, res) => {
    const item = {
      id: 'adm_' + uuidv4().slice(0, 8),
      ...req.body,
      active: true,
      createdAt: new Date().toISOString()
    };
    db.insert('adminAccounts', item);
    logAudit('Super Admin', `Created ${item.role} account`, 'Admin & Roles', item.email);
    return res.json({ success: true, data: item });
  },
  deleteAdmin: (req, res) => {
    const deleted = db.delete('adminAccounts', req.params.id);
    logAudit('Super Admin', 'Removed admin account', 'Admin & Roles', req.params.id);
    return res.json({ success: true, data: deleted });
  },
  listAuditLogs: (req, res) => res.json({ success: true, data: db.get('auditLogs') }),
  getSettings: (req, res) => res.json({ success: true, data: db.data.settings || {} }),
  updateSettings: (req, res) => {
    db.data.settings = { ...(db.data.settings || {}), ...req.body, updatedAt: new Date().toISOString() };
    db.save();
    logAudit('Super Admin', 'Updated Platform Settings', 'Settings', 'Global');
    return res.json({ success: true, data: db.data.settings });
  }
};
