import { db } from '../config/db.js';

export const initialSeed = {
  users: [
    {
      id: 'usr_srilatha',
      name: 'Sri Latha',
      phone: '+91 98765 43210',
      email: 'srilatha@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      role: 'customer',
      walletBalance: 850,
      savedAddresses: [
        { id: 'addr_1', type: 'Home', address: 'Flat 402, Lotus Residency, Miyapur, Hyderabad', coords: [17.4948, 78.3578] },
        { id: 'addr_2', type: 'Work', address: 'Cyber Towers, Hitec City, Hyderabad', coords: [17.4504, 78.3809] },
        { id: 'addr_3', type: 'Other', address: 'Road No. 36, Jubilee Hills, Hyderabad', coords: [17.4319, 78.4073] }
      ],
      createdAt: '2026-01-10T10:00:00.000Z'
    }
  ],
  partners: [
    {
      id: 'ptn_ramesh',
      name: 'Ramesh K',
      phone: '+91 98480 12345',
      email: 'ramesh.k@vride.in',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      vehicleType: 'bike',
      vehicleModel: 'Bajaj Pulsar 150 (Yellow)',
      vehicleNumber: 'TS 08 EA 4521',
      rating: 4.8,
      totalTrips: 2341,
      isOnline: true,
      status: 'approved',
      walletBalance: 3420,
      cashCollected: 450,
      location: {
        lat: 17.4920,
        lng: 78.3610,
        address: 'Miyapur Metro Station, Hyderabad'
      },
      documents: {
        idProof: 'Aadhaar verified',
        drivingLicense: 'DL-TS-2021008742',
        vehicleRC: 'RC-TS08EA4521',
        selfie: 'Verified',
        bankAccount: 'HDFC Bank - 501004829103'
      },
      createdAt: '2025-11-15T09:30:00.000Z'
    },
    {
      id: 'ptn_suresh',
      name: 'Suresh Reddy',
      phone: '+91 97000 54321',
      email: 'suresh.r@vride.in',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      vehicleType: 'auto',
      vehicleModel: 'Bajaj RE Auto Rickshaw',
      vehicleNumber: 'TS 07 UA 8899',
      rating: 4.7,
      totalTrips: 1820,
      isOnline: true,
      status: 'approved',
      walletBalance: 2150,
      cashCollected: 620,
      location: {
        lat: 17.4975,
        lng: 78.3540,
        address: 'Miyapur X Roads, Hyderabad'
      },
      documents: {
        idProof: 'Aadhaar verified',
        drivingLicense: 'DL-TS-2019001928',
        vehicleRC: 'RC-TS07UA8899',
        selfie: 'Verified',
        bankAccount: 'SBI - 20391827461'
      },
      createdAt: '2025-10-01T11:00:00.000Z'
    },
    {
      id: 'ptn_vikram',
      name: 'Vikram Singh',
      phone: '+91 99887 76655',
      email: 'vikram.s@vride.in',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      vehicleType: 'car',
      vehicleModel: 'Maruti Suzuki Dzire (White)',
      vehicleNumber: 'TS 09 AB 1234',
      rating: 4.9,
      totalTrips: 3100,
      isOnline: true,
      status: 'approved',
      walletBalance: 4890,
      cashCollected: 1200,
      location: {
        lat: 17.4880,
        lng: 78.3680,
        address: 'Kukatpally Y Junction, Hyderabad'
      },
      documents: {
        idProof: 'Aadhaar verified',
        drivingLicense: 'DL-TS-2018005432',
        vehicleRC: 'RC-TS09AB1234',
        selfie: 'Verified',
        bankAccount: 'ICICI Bank - 002105018291'
      },
      createdAt: '2025-08-12T14:20:00.000Z'
    },
    {
      id: 'ptn_praveen',
      name: 'Praveen Kumar',
      phone: '+91 91234 56789',
      email: 'praveen.k@vride.in',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      vehicleType: 'bike',
      vehicleModel: 'Hero Splendor Plus',
      vehicleNumber: 'TS 08 FC 3321',
      rating: 4.6,
      totalTrips: 940,
      isOnline: false,
      status: 'pending',
      walletBalance: 800,
      cashCollected: 0,
      location: {
        lat: 17.4480,
        lng: 78.3750,
        address: 'Madhapur, Hyderabad'
      },
      documents: {
        idProof: 'Aadhaar uploaded (Under Review)',
        drivingLicense: 'DL-TS-2023004819',
        vehicleRC: 'RC-TS08FC3321',
        selfie: 'Uploaded',
        bankAccount: 'Axis Bank - 912010048291'
      },
      createdAt: '2026-02-01T16:00:00.000Z'
    }
  ],
  pricingRules: [
    { id: 'price_bike', service: 'bike', name: 'Bike Ride', baseFare: 25, perKmRate: 8, waitingRatePerMin: 1, minFare: 35, surgeMultiplier: 1.0, commissionPercent: 15 },
    { id: 'price_auto', service: 'auto', name: 'Auto Rickshaw', baseFare: 35, perKmRate: 12, waitingRatePerMin: 1.5, minFare: 50, surgeMultiplier: 1.0, commissionPercent: 15 },
    { id: 'price_car', service: 'car', name: 'Cab / Car', baseFare: 60, perKmRate: 16, waitingRatePerMin: 2, minFare: 100, surgeMultiplier: 1.0, commissionPercent: 18 },
    { id: 'price_parcel_small', service: 'parcel_small', name: 'Parcel Small (≤ 1 kg)', baseFare: 40, perKmRate: 9, minFare: 50, commissionPercent: 15 },
    { id: 'price_parcel_medium', service: 'parcel_medium', name: 'Parcel Medium (1 - 5 kg)', baseFare: 70, perKmRate: 12, minFare: 80, commissionPercent: 15 },
    { id: 'price_parcel_large', service: 'parcel_large', name: 'Parcel Large (> 5 kg)', baseFare: 110, perKmRate: 15, minFare: 120, commissionPercent: 15 },
    { id: 'price_pickdrop', service: 'pickdrop', name: 'Pick & Drop Service', baseFare: 45, perKmRate: 10, minFare: 55, commissionPercent: 15 },
    { id: 'price_food_delivery', service: 'food_delivery', name: 'Food Delivery Fee', baseFare: 30, perKmRate: 6, minFare: 40, commissionPercent: 20 }
  ],
  restaurants: [
    {
      id: 'rest_paradise',
      name: 'Paradise Biryani',
      rating: 4.4,
      reviewsCount: '12.5k+',
      cuisines: ['Biryani', 'Indian', 'Hyderabadi'],
      deliveryTime: '30–40 min',
      deliveryFee: 40,
      minOrder: 200,
      address: 'Miyapur Main Road, Near Metro Pillar 1120, Hyderabad',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80',
      bannerImage: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=80',
      isOpen: true,
      isFeatured: true,
      categories: ['Recommended', 'Biryani', 'Combos', 'Starters']
    },
    {
      id: 'rest_dominos',
      name: "Domino's Pizza",
      rating: 4.3,
      reviewsCount: '18.2k+',
      cuisines: ['Pizza', 'Italian', 'Fast Food'],
      deliveryTime: '25–35 min',
      deliveryFee: 35,
      minOrder: 150,
      address: 'Manjeera Mall, Kukatpally, Hyderabad',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80',
      bannerImage: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800&auto=format&fit=crop&q=80',
      isOpen: true,
      isFeatured: true,
      categories: ['Recommended', 'Pizzas', 'Sides', 'Beverages']
    },
    {
      id: 'rest_subway',
      name: 'Subway',
      rating: 4.2,
      reviewsCount: '9.4k+',
      cuisines: ['Sandwich', 'Salads', 'Healthy'],
      deliveryTime: '20–30 min',
      deliveryFee: 30,
      minOrder: 150,
      address: 'Forum Sujana Mall, KPHB Colony, Hyderabad',
      image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&auto=format&fit=crop&q=80',
      bannerImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80',
      isOpen: true,
      isFeatured: false,
      categories: ['Recommended', 'Sub Sandwiches', 'Salads', 'Drinks']
    },
    {
      id: 'rest_bawarchi',
      name: 'Bawarchi Restaurant',
      rating: 4.5,
      reviewsCount: '22k+',
      cuisines: ['Biryani', 'Mughlai', 'North Indian'],
      deliveryTime: '35–45 min',
      deliveryFee: 45,
      minOrder: 250,
      address: 'RTC X Roads, Hyderabad',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=80',
      isOpen: true,
      isFeatured: true,
      categories: ['Recommended', 'Biryani', 'Curries', 'Breads']
    },
    {
      id: 'rest_burgerking',
      name: 'Burger King',
      rating: 4.2,
      reviewsCount: '14k+',
      cuisines: ['Burgers', 'American', 'Beverages'],
      deliveryTime: '25–30 min',
      deliveryFee: 35,
      minOrder: 120,
      address: 'Nexus Hyderabad Mall, Kukatpally',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
      isOpen: true,
      isFeatured: true,
      categories: ['Burgers', 'Whoppers', 'Sides', 'Shakes']
    }
  ],
  menuItems: [
    {
      id: 'menu_cb_paradise',
      restaurantId: 'rest_paradise',
      name: 'Chicken Biryani',
      description: 'Fragrant long grain basmati rice cooked with succulent chicken pieces in authentic Hyderabadi spices.',
      price: 299,
      originalPrice: 349,
      isVeg: false,
      category: 'Recommended',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80',
      isAvailable: true,
      addOns: [
        { id: 'addon_egg', name: 'Extra Boiled Egg', price: 20 },
        { id: 'addon_raita', name: 'Extra Mirchi Ka Salan & Raita', price: 35 },
        { id: 'addon_coke', name: 'Thums Up (500ml)', price: 40 }
      ]
    },
    {
      id: 'menu_mb_paradise',
      restaurantId: 'rest_paradise',
      name: 'Mutton Biryani',
      description: 'Tender mutton cooked on dum with aged basmati rice, saffron, and aromatic secret royal spices.',
      price: 399,
      originalPrice: 449,
      isVeg: false,
      category: 'Recommended',
      image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=300&auto=format&fit=crop&q=80',
      isAvailable: true,
      addOns: [
        { id: 'addon_raita2', name: 'Double Raita', price: 30 },
        { id: 'addon_gulab', name: 'Gulab Jamun (2 pcs)', price: 60 }
      ]
    },
    {
      id: 'menu_vb_paradise',
      restaurantId: 'rest_paradise',
      name: 'Veg Biryani',
      description: 'Loaded with freshly picked garden vegetables, paneer cubes, saffron, and minted basmati rice.',
      price: 249,
      originalPrice: 299,
      isVeg: true,
      category: 'Recommended',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300&auto=format&fit=crop&q=80',
      isAvailable: true,
      addOns: [
        { id: 'addon_paneer', name: 'Extra Roasted Paneer', price: 50 },
        { id: 'addon_salan', name: 'Mirchi Ka Salan', price: 25 }
      ]
    },
    {
      id: 'menu_chilli_chicken',
      restaurantId: 'rest_paradise',
      name: 'Hyderabadi Chilli Chicken',
      description: 'Crispy fried chicken tossed in fresh green chillies, curry leaves, and spicy sauce.',
      price: 269,
      originalPrice: 299,
      isVeg: false,
      category: 'Starters',
      image: 'https://images.unsplash.com/photo-1527477378377-f27329d4d29e?w=300&auto=format&fit=crop&q=80',
      isAvailable: true,
      addOns: []
    },
    {
      id: 'menu_dom_farmhouse',
      restaurantId: 'rest_dominos',
      name: 'Farmhouse Pizza',
      description: 'Delightful combination of onion, capsicum, tomato & grilled mushroom with cheesy crust.',
      price: 389,
      originalPrice: 429,
      isVeg: true,
      category: 'Recommended',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&auto=format&fit=crop&q=80',
      isAvailable: true,
      addOns: [
        { id: 'addon_cheese_burst', name: 'Cheese Burst Crust', price: 75 },
        { id: 'addon_jalapeno', name: 'Extra Jalapenos', price: 30 }
      ]
    },
    {
      id: 'menu_dom_pepperoni',
      restaurantId: 'rest_dominos',
      name: 'Chicken Pepperoni & Sausage',
      description: 'Loaded with spicy chicken pepperoni and savory Italian chicken sausage.',
      price: 499,
      originalPrice: 549,
      isVeg: false,
      category: 'Pizzas',
      image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=300&auto=format&fit=crop&q=80',
      isAvailable: true,
      addOns: []
    },
    {
      id: 'menu_sub_paneer',
      restaurantId: 'rest_subway',
      name: 'Paneer Tikka Sub (6 inch)',
      description: 'Spiced cottage cheese cubes with your choice of freshly baked bread, crisp veggies, and signature sauces.',
      price: 220,
      originalPrice: 250,
      isVeg: true,
      category: 'Recommended',
      image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=300&auto=format&fit=crop&q=80',
      isAvailable: true,
      addOns: [
        { id: 'addon_cookie', name: 'Chocolate Chip Cookie', price: 50 },
        { id: 'addon_coke2', name: 'Coca Cola Can', price: 40 }
      ]
    }
  ],
  foodOrders: [
    {
      id: 'ord_98412',
      userId: 'usr_srilatha',
      userName: 'Sri Latha',
      userPhone: '+91 98765 43210',
      restaurantId: 'rest_paradise',
      restaurantName: 'Paradise Biryani',
      items: [
        { name: 'Chicken Biryani', quantity: 1, price: 299 },
        { name: 'Mutton Biryani', quantity: 1, price: 299 }
      ],
      subtotal: 598,
      deliveryFee: 40,
      tax: 30,
      discount: 70,
      total: 598,
      deliveryAddress: 'Flat 402, Lotus Residency, Miyapur, Hyderabad',
      partnerId: 'ptn_ramesh',
      partnerName: 'Ramesh K',
      partnerPhone: '+91 98480 12345',
      partnerRating: 4.8,
      partnerTrips: '2,341 trips',
      partnerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'arriving', // placed -> preparing -> picked_up -> arriving -> delivered
      currentStep: 4,
      etaText: 'Arriving in 8 min',
      otp: '4829',
      paymentMethod: 'UPI (PhonePe)',
      paymentStatus: 'paid',
      createdAt: '2026-11-22T21:00:00.000Z'
    }
  ],
  rides: [
    {
      id: 'ride_101',
      userId: 'usr_srilatha',
      userName: 'Sri Latha',
      userPhone: '+91 98765 43210',
      partnerId: 'ptn_ramesh',
      partnerName: 'Ramesh K',
      partnerPhone: '+91 98480 12345',
      vehicleType: 'bike',
      vehicleModel: 'Bajaj Pulsar 150',
      vehicleNumber: 'TS 08 EA 4521',
      pickupLocation: 'Miyapur, Hyderabad',
      dropLocation: 'Kukatpally, Hyderabad',
      distanceKm: 5.4,
      fare: 68,
      otp: '7391',
      status: 'completed',
      paymentMethod: 'Wallet',
      paymentStatus: 'paid',
      rating: 5,
      createdAt: '2026-11-21T14:30:00.000Z'
    }
  ],
  parcels: [
    {
      id: 'pcl_201',
      userId: 'usr_srilatha',
      userName: 'Sri Latha',
      pickupAddress: 'Miyapur, Hyderabad',
      deliveryAddress: 'Gachibowli, Hyderabad',
      senderName: 'Sri Latha',
      senderPhone: '+91 98765 43210',
      receiverName: 'Anil Kumar',
      receiverPhone: '+91 99887 65432',
      category: 'Small (≤ 1 kg)',
      itemType: 'Documents',
      instructions: 'Hand over directly to reception, 3rd floor',
      fare: 85,
      pickupOtp: '6192',
      deliveryOtp: '4018',
      partnerId: 'ptn_suresh',
      partnerName: 'Suresh Reddy',
      status: 'delivered',
      createdAt: '2026-11-20T11:15:00.000Z'
    }
  ],
  pickdrops: [
    {
      id: 'pkd_301',
      userId: 'usr_srilatha',
      userName: 'Sri Latha',
      pickupAddress: 'Jubilee Hills, Hyderabad',
      dropAddress: 'Banjara Hills, Hyderabad',
      senderName: 'Sri Latha',
      senderPhone: '+91 98765 43210',
      receiverName: 'Priya Sharma',
      receiverPhone: '+91 97654 32109',
      itemType: 'Documents',
      notes: 'Handle with care - urgent legal documents',
      fare: 75,
      partnerId: 'ptn_ramesh',
      partnerName: 'Ramesh K',
      status: 'completed',
      createdAt: '2026-11-19T16:45:00.000Z'
    }
  ],
  transactions: [
    { id: 'txn_1', entityType: 'user', entityId: 'usr_srilatha', type: 'credit', amount: 1000, title: 'Wallet Top Up via UPI', status: 'success', date: '2026-11-18' },
    { id: 'txn_2', entityType: 'user', entityId: 'usr_srilatha', type: 'debit', amount: 68, title: 'Ride to Kukatpally', status: 'success', date: '2026-11-21' },
    { id: 'txn_3', entityType: 'user', entityId: 'usr_srilatha', type: 'debit', amount: 82, title: 'Parcel to Gachibowli', status: 'success', date: '2026-11-20' },
    { id: 'txn_ptn_1', entityType: 'partner', entityId: 'ptn_ramesh', type: 'credit', amount: 580, title: 'Daily Ride Earnings', status: 'success', date: '2026-11-22' },
    { id: 'txn_ptn_2', entityType: 'partner', entityId: 'ptn_ramesh', type: 'debit', amount: 1500, title: 'Bank Withdrawal to HDFC', status: 'success', date: '2026-11-20' }
  ],
  coupons: [
    { id: 'cpn_1', code: 'VRIDE20', discountPercent: 20, maxDiscount: 100, minOrder: 199, description: 'Flat 20% OFF on Food Orders', active: true },
    { id: 'cpn_2', code: 'FIRST50', discountPercent: 50, maxDiscount: 80, minOrder: 150, description: '50% off on your first ride or order', active: true },
    { id: 'cpn_3', code: 'FREEPARCEL', discountPercent: 25, maxDiscount: 50, minOrder: 100, description: '25% off on Parcel delivery', active: true }
  ],
  supportTickets: [
    {
      id: 'tkt_101',
      userId: 'usr_srilatha',
      userName: 'Sri Latha',
      subject: 'Delay in Food Delivery',
      category: 'Food Delivery',
      message: 'Order took 10 mins more than estimated due to traffic. Overall food was warm.',
      status: 'resolved',
      response: 'We apologized and credited ₹50 to your V RIDE wallet for the minor delay.',
      createdAt: '2026-11-15T18:20:00.000Z'
    }
  ],
  payouts: [
    {
      id: 'pay_901',
      partnerId: 'ptn_ramesh',
      partnerName: 'Ramesh K',
      amount: 1500,
      bankAccount: 'HDFC Bank - 501004829103',
      ifsc: 'HDFC0001234',
      status: 'approved',
      requestedAt: '2026-11-20T08:00:00.000Z',
      processedAt: '2026-11-20T12:30:00.000Z'
    },
    {
      id: 'pay_902',
      partnerId: 'ptn_suresh',
      partnerName: 'Suresh Reddy',
      amount: 1200,
      bankAccount: 'SBI - 20391827461',
      ifsc: 'SBIN0004567',
      status: 'pending',
      requestedAt: '2026-11-22T10:15:00.000Z'
    }
  ],
  banners: [
    {
      id: 'ban_1',
      title: 'Send Parcels Fast & Safe',
      subtitle: 'Doorstep pickup & delivery',
      buttonText: 'Send Now →',
      service: 'parcels',
      image: 'parcel-courier',
      active: true
    },
    {
      id: 'ban_2',
      title: 'Flat 20% OFF',
      subtitle: 'on Food Orders',
      code: 'VRIDE20',
      service: 'food',
      image: 'burger',
      active: true
    },
    {
      id: 'ban_3',
      title: 'Delicious Food at Your Doorstep',
      subtitle: 'Up to 50% OFF',
      code: 'FIRST50',
      service: 'food',
      image: 'biryani',
      active: true
    }
  ],
  settings: {
    appName: 'V RIDE',
    tagline: 'Rides · Parcels · Pick & Drop · Food',
    brandYellow: '#FFCC00',
    brandBlack: '#111111',
    supportPhone: '+91 1800 200 8743',
    supportEmail: 'support@vride.in',
    emergencySosNumber: '112',
    appVersion: '2.4.0',
    maintenanceMode: false
  }
};

export function seedDatabase() {
  const currentUsers = db.get('users');
  if (!currentUsers || currentUsers.length === 0) {
    console.log('Seeding initial V RIDE database...');
    db.reset(initialSeed);
    console.log('Database seeded successfully!');
  } else {
    console.log('Database already contains records. Preserving data.');
  }
}

// Run immediately when called directly
seedDatabase();
