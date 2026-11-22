import { v4 as uuidv4 } from 'uuid';
import db from '../config/db.js';

// --- AUTH CONTROLLERS ---
export const authController = {
  sendOtp: (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ success: false, message: 'Phone number is required' });
    // In dev/demo, OTP is fixed or simulated
    const otp = '1234';
    res.json({
      success: true,
      message: `OTP sent successfully to ${phone}`,
      devOtp: otp
    });
  },

  verifyOtp: (req, res) => {
    const { phone, otp, role = 'customer' } = req.body;
    if (!phone) return res.status(400).json({ success: false, message: 'Phone is required' });

    if (role === 'partner') {
      let partner = db.get('partners').find(p => p.phone === phone || p.phone.includes(phone.replace(/\D/g, '').slice(-10)));
      if (!partner) {
        // Auto-register new partner in pending state
        partner = {
          id: `ptn_${Date.now()}`,
          name: 'New Partner',
          phone,
          email: '',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          vehicleType: 'bike',
          vehicleModel: 'Motorcycle',
          vehicleNumber: 'Pending',
          rating: 5.0,
          totalTrips: 0,
          isOnline: false,
          status: 'pending',
          walletBalance: 0,
          cashCollected: 0,
          location: { lat: 17.4920, lng: 78.3610, address: 'Hyderabad' },
          documents: { idProof: 'Pending', drivingLicense: 'Pending' },
          createdAt: new Date().toISOString()
        };
        db.insert('partners', partner);
      }
      return res.json({
        success: true,
        message: 'Partner verified successfully',
        token: `jwt_partner_${partner.id}`,
        partner
      });
    }

    // Default: Customer
    let user = db.get('users').find(u => u.phone === phone || u.phone.includes(phone.replace(/\D/g, '').slice(-10)));
    if (!user) {
      user = {
        id: `usr_${Date.now()}`,
        name: 'Guest User',
        phone,
        email: '',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        role: 'customer',
        walletBalance: 250,
        savedAddresses: [
          { id: 'addr_default', type: 'Home', address: 'Miyapur, Hyderabad', coords: [17.4948, 78.3578] }
        ],
        createdAt: new Date().toISOString()
      };
      db.insert('users', user);
    }

    res.json({
      success: true,
      message: 'Login successful',
      token: `jwt_user_${user.id}`,
      user
    });
  },

  getCurrentUser: (req, res) => {
    const user = db.findById('users', 'usr_srilatha') || db.get('users')[0];
    res.json({ success: true, user });
  },

  updateProfile: (req, res) => {
    const { id, name, email, avatar, savedAddresses } = req.body;
    const updated = db.update('users', id || 'usr_srilatha', { name, email, avatar, savedAddresses });
    res.json({ success: true, user: updated });
  }
};

// --- RIDE CONTROLLERS ---
export const rideController = {
  estimateFare: (req, res) => {
    const { vehicleType = 'bike', distanceKm = 5.4 } = req.body;
    const pricing = db.get('pricingRules').find(p => p.service === vehicleType) || { baseFare: 25, perKmRate: 8, surgeMultiplier: 1.0 };
    const calculatedFare = Math.round(pricing.baseFare + (distanceKm * pricing.perKmRate) * pricing.surgeMultiplier);
    const minFare = Math.max(30, calculatedFare - 8);
    const maxFare = calculatedFare + 8;

    res.json({
      success: true,
      vehicleType,
      distanceKm,
      fare: calculatedFare,
      fareRange: `₹${minFare} - ₹${maxFare}`,
      durationMins: Math.round(distanceKm * 3.5),
      pricingRule: pricing
    });
  },

  bookRide: (req, res) => {
    const {
      userId = 'usr_srilatha',
      userName = 'Sri Latha',
      userPhone = '+91 98765 43210',
      vehicleType = 'bike',
      pickupLocation = 'Miyapur, Hyderabad',
      dropLocation = 'Kukatpally, Hyderabad',
      distanceKm = 5.4,
      paymentMethod = 'UPI'
    } = req.body;

    // Calculate fare
    const pricing = db.get('pricingRules').find(p => p.service === vehicleType) || { baseFare: 25, perKmRate: 8, surgeMultiplier: 1.0 };
    const fare = Math.round(pricing.baseFare + (distanceKm * pricing.perKmRate) * (pricing.surgeMultiplier || 1.0));

    // Find available active partner matching vehicle or fallback to first online partner
    const availablePartner = db.get('partners').find(p => p.isOnline && p.status === 'approved' && (p.vehicleType === vehicleType || vehicleType === 'bike')) 
      || db.findById('partners', 'ptn_ramesh');

    const otp = String(Math.floor(1000 + Math.random() * 9000));

    const newRide = {
      id: `ride_${Date.now()}`,
      userId,
      userName,
      userPhone,
      partnerId: availablePartner?.id || 'ptn_ramesh',
      partnerName: availablePartner?.name || 'Ramesh K',
      partnerPhone: availablePartner?.phone || '+91 98480 12345',
      partnerAvatar: availablePartner?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      partnerRating: availablePartner?.rating || 4.8,
      vehicleType,
      vehicleModel: availablePartner?.vehicleModel || 'Bajaj Pulsar 150',
      vehicleNumber: availablePartner?.vehicleNumber || 'TS 08 EA 4521',
      pickupLocation,
      dropLocation,
      distanceKm,
      fare,
      otp,
      status: 'assigned', // requested -> assigned -> arrived -> started -> completed -> cancelled
      paymentMethod,
      paymentStatus: 'pending',
      etaMinutes: 4,
      createdAt: new Date().toISOString()
    };

    db.insert('rides', newRide);
    res.json({ success: true, message: 'Ride booked successfully', ride: newRide });
  },

  getRides: (req, res) => {
    const { userId } = req.query;
    const rides = userId ? db.filter('rides', r => r.userId === userId) : db.get('rides');
    res.json({ success: true, rides });
  },

  getRideById: (req, res) => {
    const ride = db.findById('rides', req.params.id);
    if (!ride) return res.status(404).json({ success: false, message: 'Ride not found' });
    res.json({ success: true, ride });
  },

  updateRideStatus: (req, res) => {
    const { status, otp } = req.body;
    const ride = db.findById('rides', req.params.id);
    if (!ride) return res.status(404).json({ success: false, message: 'Ride not found' });

    if (status === 'started' && otp && otp !== ride.otp) {
      return res.status(400).json({ success: false, message: 'Invalid Ride OTP. Please check with customer.' });
    }

    const updates = { status };
    if (status === 'completed') {
      updates.paymentStatus = 'paid';
      // Record transaction
      db.insert('transactions', {
        id: `txn_${Date.now()}`,
        entityType: 'user',
        entityId: ride.userId,
        type: 'debit',
        amount: ride.fare,
        title: `Ride to ${ride.dropLocation}`,
        status: 'success',
        date: new Date().toISOString().split('T')[0]
      });
      // Partner earnings
      const partner = db.findById('partners', ride.partnerId);
      if (partner) {
        const commission = Math.round(ride.fare * 0.15);
        const partnerEarning = ride.fare - commission;
        db.update('partners', partner.id, {
          walletBalance: (partner.walletBalance || 0) + partnerEarning,
          totalTrips: (partner.totalTrips || 0) + 1
        });
      }
    }

    const updated = db.update('rides', req.params.id, updates);
    res.json({ success: true, message: `Ride status updated to ${status}`, ride: updated });
  },

  rateRide: (req, res) => {
    const { rating, review } = req.body;
    const updated = db.update('rides', req.params.id, { rating, review });
    res.json({ success: true, message: 'Thank you for rating!', ride: updated });
  }
};

// --- PARCEL & PICK-DROP CONTROLLERS ---
export const parcelController = {
  estimateFare: (req, res) => {
    const { category = 'Small (≤ 1 kg)', distanceKm = 8.2 } = req.body;
    let base = 40;
    let perKm = 9;
    if (category.includes('Medium')) { base = 70; perKm = 12; }
    if (category.includes('Large')) { base = 110; perKm = 15; }

    const fare = Math.round(base + (distanceKm * perKm));
    res.json({ success: true, fare, distanceKm });
  },

  bookParcel: (req, res) => {
    const {
      userId = 'usr_srilatha',
      userName = 'Sri Latha',
      pickupAddress = 'Miyapur, Hyderabad',
      deliveryAddress = 'Gachibowli, Hyderabad',
      senderName = 'Sri Latha',
      senderPhone = '+91 98765 43210',
      receiverName = 'Anil Kumar',
      receiverPhone = '+91 99887 65432',
      category = 'Small (≤ 1 kg)',
      itemType = 'Documents',
      instructions = 'Handle with care'
    } = req.body;

    const partner = db.get('partners').find(p => p.isOnline && p.status === 'approved') || db.findById('partners', 'ptn_suresh');

    const newParcel = {
      id: `pcl_${Date.now()}`,
      userId,
      userName,
      pickupAddress,
      deliveryAddress,
      senderName,
      senderPhone,
      receiverName,
      receiverPhone,
      category,
      itemType,
      instructions,
      fare: category.includes('Large') ? 160 : category.includes('Medium') ? 115 : 85,
      pickupOtp: String(Math.floor(1000 + Math.random() * 9000)),
      deliveryOtp: String(Math.floor(1000 + Math.random() * 9000)),
      partnerId: partner?.id || 'ptn_suresh',
      partnerName: partner?.name || 'Suresh Reddy',
      status: 'assigned', // booked -> assigned -> picked_up -> in_transit -> delivered -> cancelled
      createdAt: new Date().toISOString()
    };

    db.insert('parcels', newParcel);
    res.json({ success: true, message: 'Parcel delivery scheduled successfully', parcel: newParcel });
  },

  getParcels: (req, res) => {
    const { userId } = req.query;
    const parcels = userId ? db.filter('parcels', p => p.userId === userId) : db.get('parcels');
    res.json({ success: true, parcels });
  },

  bookPickDrop: (req, res) => {
    const {
      userId = 'usr_srilatha',
      userName = 'Sri Latha',
      pickupAddress = 'Jubilee Hills, Hyderabad',
      dropAddress = 'Banjara Hills, Hyderabad',
      senderName = 'Sri Latha',
      senderPhone = '+91 98765 43210',
      receiverName = 'Priya Sharma',
      receiverPhone = '+91 97654 32109',
      itemType = 'Documents',
      notes = 'Handle with care'
    } = req.body;

    const partner = db.findById('partners', 'ptn_ramesh') || db.get('partners')[0];

    const pickdrop = {
      id: `pkd_${Date.now()}`,
      userId,
      userName,
      pickupAddress,
      dropAddress,
      senderName,
      senderPhone,
      receiverName,
      receiverPhone,
      itemType,
      notes,
      fare: 75,
      partnerId: partner?.id || 'ptn_ramesh',
      partnerName: partner?.name || 'Ramesh K',
      status: 'assigned',
      createdAt: new Date().toISOString()
    };

    db.insert('pickdrops', pickdrop);
    res.json({ success: true, message: 'Pick & Drop order confirmed', pickdrop });
  },

  getPickDrops: (req, res) => {
    const pickdrops = db.get('pickdrops');
    res.json({ success: true, pickdrops });
  }
};

// --- FOOD & RESTAURANT CONTROLLERS ---
export const foodController = {
  getRestaurants: (req, res) => {
    const { search, category } = req.query;
    let list = db.get('restaurants');
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(r => r.name.toLowerCase().includes(q) || r.cuisines.some(c => c.toLowerCase().includes(q)));
    }
    if (category && category !== 'All') {
      list = list.filter(r => r.cuisines.some(c => c.toLowerCase() === category.toLowerCase()) || r.name.toLowerCase().includes(category.toLowerCase()));
    }
    res.json({ success: true, restaurants: list });
  },

  getRestaurantById: (req, res) => {
    const restaurant = db.findById('restaurants', req.params.id);
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });
    const menuItems = db.filter('menuItems', item => item.restaurantId === restaurant.id);
    res.json({ success: true, restaurant, menuItems });
  },

  createFoodOrder: (req, res) => {
    const {
      userId = 'usr_srilatha',
      userName = 'Sri Latha',
      restaurantId = 'rest_paradise',
      restaurantName = 'Paradise Biryani',
      items = [],
      subtotal = 598,
      deliveryFee = 40,
      couponCode = '',
      deliveryAddress = 'Flat 402, Lotus Residency, Miyapur, Hyderabad',
      paymentMethod = 'UPI'
    } = req.body;

    let discount = 0;
    if (couponCode === 'VRIDE20') {
      discount = Math.min(100, Math.round(subtotal * 0.20));
    }

    const tax = Math.round(subtotal * 0.05);
    const total = Math.max(0, subtotal + deliveryFee + tax - discount);
    const partner = db.findById('partners', 'ptn_ramesh') || db.get('partners')[0];

    const newOrder = {
      id: `ord_${Math.floor(10000 + Math.random() * 90000)}`,
      userId,
      userName,
      userPhone: '+91 98765 43210',
      restaurantId,
      restaurantName,
      items: items.length ? items : [
        { name: 'Chicken Biryani', quantity: 1, price: 299 },
        { name: 'Mutton Biryani', quantity: 1, price: 299 }
      ],
      subtotal,
      deliveryFee,
      tax,
      discount,
      total,
      deliveryAddress,
      partnerId: partner?.id || 'ptn_ramesh',
      partnerName: partner?.name || 'Ramesh K',
      partnerPhone: partner?.phone || '+91 98480 12345',
      partnerRating: 4.8,
      partnerTrips: '2,341 trips',
      partnerAvatar: partner?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      status: 'placed', // placed -> preparing -> picked_up -> arriving -> delivered
      currentStep: 1,
      etaText: 'Arriving in 25 min',
      otp: String(Math.floor(1000 + Math.random() * 9000)),
      paymentMethod,
      paymentStatus: 'paid',
      createdAt: new Date().toISOString()
    };

    db.insert('foodOrders', newOrder);
    res.json({ success: true, message: 'Food order placed successfully!', order: newOrder });
  },

  getOrders: (req, res) => {
    const { userId } = req.query;
    const orders = userId ? db.filter('foodOrders', o => o.userId === userId) : db.get('foodOrders');
    res.json({ success: true, orders });
  },

  getOrderById: (req, res) => {
    const order = db.findById('foodOrders', req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  },

  updateOrderStatus: (req, res) => {
    const { status, currentStep, etaText } = req.body;
    const updates = { status };
    if (currentStep) updates.currentStep = currentStep;
    if (etaText) updates.etaText = etaText;
    const updated = db.update('foodOrders', req.params.id, updates);
    res.json({ success: true, order: updated });
  }
};

// --- PARTNER APP CONTROLLERS ---
export const partnerController = {
  getProfile: (req, res) => {
    const partner = db.findById('partners', req.params.id || 'ptn_ramesh');
    if (!partner) return res.status(404).json({ success: false, message: 'Partner not found' });
    res.json({ success: true, partner });
  },

  toggleOnline: (req, res) => {
    const { isOnline } = req.body;
    const partner = db.update('partners', req.params.id || 'ptn_ramesh', { isOnline });
    res.json({ success: true, isOnline: partner?.isOnline });
  },

  getJobs: (req, res) => {
    const partnerId = req.params.id || 'ptn_ramesh';
    const rides = db.filter('rides', r => r.partnerId === partnerId);
    const parcels = db.filter('parcels', p => p.partnerId === partnerId);
    const foodOrders = db.filter('foodOrders', f => f.partnerId === partnerId);
    res.json({
      success: true,
      activeJobs: {
        rides: rides.filter(r => ['assigned', 'arrived', 'started'].includes(r.status)),
        parcels: parcels.filter(p => ['assigned', 'picked_up', 'in_transit'].includes(p.status)),
        foodOrders: foodOrders.filter(f => ['placed', 'preparing', 'picked_up', 'arriving'].includes(f.status))
      },
      completedJobs: {
        rides: rides.filter(r => r.status === 'completed'),
        parcels: parcels.filter(p => p.status === 'delivered'),
        foodOrders: foodOrders.filter(f => f.status === 'delivered')
      }
    });
  },

  requestWithdrawal: (req, res) => {
    const { partnerId = 'ptn_ramesh', amount = 1000, bankAccount, ifsc } = req.body;
    const partner = db.findById('partners', partnerId);
    if (!partner || (partner.walletBalance || 0) < amount) {
      return res.status(400).json({ success: false, message: 'Insufficient partner wallet balance' });
    }

    const payout = {
      id: `pay_${Date.now()}`,
      partnerId,
      partnerName: partner.name,
      amount,
      bankAccount: bankAccount || partner.documents?.bankAccount || 'HDFC Bank',
      ifsc: ifsc || 'HDFC0001234',
      status: 'pending',
      requestedAt: new Date().toISOString()
    };

    db.insert('payouts', payout);
    db.update('partners', partnerId, { walletBalance: partner.walletBalance - amount });
    res.json({ success: true, message: 'Withdrawal request submitted successfully', payout });
  }
};

// --- SUPER ADMIN CONTROLLERS ---
export const adminController = {
  getDashboardStats: (req, res) => {
    const users = db.get('users');
    const partners = db.get('partners');
    const rides = db.get('rides');
    const parcels = db.get('parcels');
    const foodOrders = db.get('foodOrders');

    const totalRidesRevenue = rides.reduce((acc, r) => acc + (r.fare || 0), 0);
    const totalParcelRevenue = parcels.reduce((acc, p) => acc + (p.fare || 0), 0);
    const totalFoodRevenue = foodOrders.reduce((acc, f) => acc + (f.total || 0), 0);
    const totalRevenue = totalRidesRevenue + totalParcelRevenue + totalFoodRevenue;

    res.json({
      success: true,
      stats: {
        totalUsers: users.length,
        totalPartners: partners.length,
        activePartners: partners.filter(p => p.isOnline).length,
        totalRides: rides.length,
        totalParcels: parcels.length,
        totalFoodOrders: foodOrders.length,
        totalRevenue,
        pendingApprovals: partners.filter(p => p.status === 'pending').length,
        recentActivity: [
          ...rides.slice(0, 3).map(r => ({ type: 'Ride', desc: `${r.userName} booked ${r.vehicleType} ride`, time: r.createdAt })),
          ...foodOrders.slice(0, 3).map(f => ({ type: 'Food', desc: `${f.userName} ordered from ${f.restaurantName}`, time: f.createdAt }))
        ]
      }
    });
  },

  verifyPartner: (req, res) => {
    const { status } = req.body; // approved or rejected
    const updated = db.update('partners', req.params.id, { status });
    res.json({ success: true, message: `Partner ${status}`, partner: updated });
  },

  getAllData: (req, res) => {
    res.json({
      success: true,
      users: db.get('users'),
      partners: db.get('partners'),
      rides: db.get('rides'),
      parcels: db.get('parcels'),
      pickdrops: db.get('pickdrops'),
      restaurants: db.get('restaurants'),
      menuItems: db.get('menuItems'),
      foodOrders: db.get('foodOrders'),
      pricingRules: db.get('pricingRules'),
      coupons: db.get('coupons'),
      payouts: db.get('payouts'),
      supportTickets: db.get('supportTickets'),
      banners: db.get('banners'),
      settings: db.data.settings
    });
  },

  updatePricing: (req, res) => {
    const { id, baseFare, perKmRate, surgeMultiplier, commissionPercent } = req.body;
    const updated = db.update('pricingRules', id, { baseFare, perKmRate, surgeMultiplier, commissionPercent });
    res.json({ success: true, pricingRule: updated });
  },

  updatePayout: (req, res) => {
    const { status } = req.body; // approved, rejected
    const updated = db.update('payouts', req.params.id, {
      status,
      processedAt: new Date().toISOString()
    });
    res.json({ success: true, payout: updated });
  },

  broadcastNotification: (req, res) => {
    const { title, message, target = 'all' } = req.body;
    const notification = {
      id: `notif_${Date.now()}`,
      title,
      message,
      target,
      sentAt: new Date().toISOString()
    };
    db.insert('notifications', notification);
    res.json({ success: true, message: `Broadcast sent to ${target}`, notification });
  }
};

// --- WALLET CONTROLLERS ---
export const walletController = {
  getBalance: (req, res) => {
    const user = db.findById('users', 'usr_srilatha');
    const transactions = db.filter('transactions', t => t.entityId === 'usr_srilatha');
    res.json({
      success: true,
      balance: user?.walletBalance || 850,
      transactions
    });
  },

  addMoney: (req, res) => {
    const { amount = 500, paymentMethod = 'UPI' } = req.body;
    const user = db.findById('users', 'usr_srilatha');
    const newBalance = (user?.walletBalance || 0) + Number(amount);
    db.update('users', 'usr_srilatha', { walletBalance: newBalance });

    const txn = {
      id: `txn_${Date.now()}`,
      entityType: 'user',
      entityId: 'usr_srilatha',
      type: 'credit',
      amount: Number(amount),
      title: `Top-up via ${paymentMethod}`,
      status: 'success',
      date: new Date().toISOString().split('T')[0]
    };
    db.insert('transactions', txn);

    res.json({ success: true, balance: newBalance, transaction: txn });
  }
};

// --- CMS & COMMON CONTROLLERS ---
export const cmsController = {
  getBanners: (req, res) => {
    res.json({ success: true, banners: db.get('banners') });
  },

  getCoupons: (req, res) => {
    res.json({ success: true, coupons: db.get('coupons').filter(c => c.active) });
  },

  submitTicket: (req, res) => {
    const { subject, category, message, userId = 'usr_srilatha', userName = 'Sri Latha' } = req.body;
    const ticket = {
      id: `tkt_${Date.now()}`,
      userId,
      userName,
      subject,
      category,
      message,
      status: 'open',
      createdAt: new Date().toISOString()
    };
    db.insert('supportTickets', ticket);
    res.json({ success: true, message: 'Ticket raised successfully. Our support team will respond shortly.', ticket });
  }
};
