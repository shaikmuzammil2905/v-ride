// Initial seed data for frontend local state fallback
export const DEFAULT_HYDERABAD_DATA = {
  user: {
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
    ]
  },
  partner: {
    id: 'ptn_ramesh',
    name: 'Ramesh K',
    phone: '+91 98480 12345',
    email: 'ramesh.k@vride.in',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    vehicleType: 'bike',
    vehicleModel: 'Bajaj Pulsar 150',
    vehicleNumber: 'TS 08 EA 4521',
    rating: 4.8,
    totalTrips: 2341,
    isOnline: true,
    status: 'approved',
    walletBalance: 3420,
    cashCollected: 450,
    location: { lat: 17.4920, lng: 78.3610, address: 'Miyapur Metro Station, Hyderabad' },
    documents: {
      idProof: 'Aadhaar Verified',
      drivingLicense: 'DL-TS-2021008742',
      vehicleRC: 'RC-TS08EA4521',
      selfie: 'Verified',
      bankAccount: 'HDFC Bank - 501004829103'
    }
  },
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
      categories: ['Recommended', 'Sub Sandwiches', 'Salads', 'Drinks']
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
      isAvailable: true
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
      isAvailable: true
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
      isAvailable: true
    }
  ],
  activeFoodOrder: {
    id: 'ord_98412',
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
    partnerName: 'Ramesh K',
    partnerPhone: '+91 98480 12345',
    partnerRating: 4.8,
    partnerTrips: '2,341 trips',
    partnerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'arriving', // placed, preparing, picked_up, arriving, delivered
    currentStep: 4,
    etaText: 'Arriving in 8 min',
    otp: '4829',
    createdAt: new Date().toISOString()
  }
};

const API_BASE_URL = 'http://localhost:5000/api';

// Helper to make API calls with graceful fallback
export async function apiRequest(endpoint, options = {}) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    // Graceful fallback to null so caller uses local state
    return null;
  }
}
