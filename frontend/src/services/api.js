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

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const RAZORPAY_PUBLIC_TEST_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_U3xoeEyAqeaQ9Y';

// Helper to make API calls with graceful fallback
export async function apiRequest(endpoint, options = {}) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeout || 5000);
    const isFormData = options.body instanceof FormData;
    const token = typeof window !== 'undefined' ? localStorage.getItem('vride_auth_token') : null;
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: isFormData
        ? { ...authHeader, ...options.headers }
        : { 'Content-Type': 'application/json', ...authHeader, ...options.headers }
    });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    return null;
  }
}

// Local fallback auth store for static deployments (e.g. Vercel without separate backend)
const SEEDED_LOCAL_ACCOUNTS = [
  {
    id: 'usr_srilatha',
    accountId: 'auth_customer_srilatha',
    name: 'Sri Latha',
    username: 'srilatha',
    email: 'srilatha@example.com',
    phone: '+91 98765 43210',
    role: 'customer',
    pass: 'Customer@2026',
    walletBalance: 850
  },
  {
    id: 'adm_super',
    accountId: 'auth_admin_super',
    name: 'Operations Lead',
    username: 'admin',
    email: 'admin@vride.in',
    phone: '+91 90000 00001',
    role: 'admin',
    pass: 'VRideAdmin@2026'
  },
  {
    id: 'ptn_ramesh',
    accountId: 'auth_rider_raju',
    name: 'Raju Kumar',
    username: 'rider',
    email: 'rider@vride.in',
    altEmails: ['partner@vride.in', 'ramesh.k@vride.in'],
    phone: '+91 97034 56789',
    altPhones: ['+91 98480 12345'],
    role: 'rider',
    vehicleType: 'bike',
    pass: 'Partner@2026'
  },
  {
    id: 'rest_paradise',
    accountId: 'auth_vendor_paradise',
    restaurantId: 'rest_paradise',
    name: 'Paradise Biryani',
    username: 'paradise',
    email: 'vendor@vride.in',
    altEmails: ['paradise@vride.in'],
    phone: '+91 90001 11222',
    role: 'vendor',
    pass: 'Vendor@2026'
  }
];

const getLocalAccounts = () => {
  try {
    const custom = JSON.parse(localStorage.getItem('vride_local_accounts') || '[]');
    return [...custom, ...SEEDED_LOCAL_ACCOUNTS];
  } catch {
    return SEEDED_LOCAL_ACCOUNTS;
  }
};

const normPhone = (v) => {
  const d = String(v || '').replace(/\D/g, '');
  return d.length >= 10 ? d.slice(-10) : d;
};

const findLocalAccount = (identifier) => {
  const raw = String(identifier || '').trim().toLowerCase();
  const p10 = normPhone(identifier);
  return getLocalAccounts().find((acc) => {
    if (acc.email?.toLowerCase() === raw) return true;
    if (acc.username?.toLowerCase() === raw) return true;
    if (acc.altEmails?.some((e) => e.toLowerCase() === raw)) return true;
    if (p10.length === 10) {
      if (normPhone(acc.phone) === p10) return true;
      if (acc.altPhones?.some((p) => normPhone(p) === p10)) return true;
    }
    return false;
  });
};

const isLocalPortalAllowed = (portal, role) => {
  if (!portal) return true;
  if (portal === 'customer') return role === 'customer';
  if (portal === 'admin') return role === 'admin' || role === 'super_admin';
  if (portal === 'partner') return role === 'rider' || role === 'vendor';
  return false;
};

const handleLocalAuthFallback = (endpoint, options = {}) => {
  const body = options.body ? JSON.parse(options.body) : {};

  if (endpoint === '/auth/login') {
    const acc = findLocalAccount(body.identifier);
    if (!acc) return { success: false, message: 'No account found with this email, username, or mobile number.' };
    if (body.password !== acc.pass) return { success: false, message: 'Incorrect password. Please try again.' };
    if (body.loginPortal && !isLocalPortalAllowed(body.loginPortal, acc.role)) {
      return { success: false, message: `This account (${acc.role}) cannot sign in through this portal.` };
    }
    const { pass, ...safeUser } = acc;
    return { success: true, token: `local_jwt_${acc.role}_${acc.id}`, user: safeUser };
  }

  if (endpoint === '/auth/register') {
    if (!body.name || (!body.phone && !body.email) || !body.password) {
      return { success: false, message: 'Name, mobile/email, and password are required.' };
    }
    if (findLocalAccount(body.email || body.phone)) {
      return { success: false, message: 'An account with this email or mobile already exists.' };
    }
    const newAcc = {
      id: 'usr_' + Date.now(),
      accountId: 'auth_' + Date.now(),
      name: body.name.trim(),
      username: (body.email || body.phone).trim(),
      email: (body.email || '').trim().toLowerCase(),
      phone: (body.phone || '').trim(),
      role: 'customer',
      pass: body.password,
      walletBalance: 250
    };
    const custom = JSON.parse(localStorage.getItem('vride_local_accounts') || '[]');
    localStorage.setItem('vride_local_accounts', JSON.stringify([newAcc, ...custom]));
    const { pass, ...safeUser } = newAcc;
    return { success: true, token: `local_jwt_customer_${newAcc.id}`, user: safeUser };
  }

  if (endpoint === '/auth/send-otp') {
    return { success: true, message: `OTP sent to ${body.phone}`, devOtp: '1234' };
  }

  if (endpoint === '/auth/verify-otp') {
    if (String(body.otp).trim() !== '1234') return { success: false, message: 'Invalid OTP. Use 1234 for demo.' };
    let acc = findLocalAccount(body.phone);
    if (!acc && body.loginPortal === 'customer') {
      acc = { id: 'usr_' + Date.now(), name: 'V RIDE User', phone: body.phone, role: 'customer', walletBalance: 250 };
    }
    if (!acc || !isLocalPortalAllowed(body.loginPortal, acc.role)) {
      return { success: false, message: 'No authorized account found for this mobile number.' };
    }
    const { pass, ...safeUser } = acc;
    return { success: true, token: `local_jwt_${acc.role}_${acc.id}`, user: safeUser };
  }

  if (endpoint === '/auth/forgot-password') {
    const acc = findLocalAccount(body.identifier);
    if (!acc) return { success: false, message: 'No account found matching that identifier.' };
    return { success: true, message: 'Reset code generated.', devResetCode: '123456' };
  }

  if (endpoint === '/auth/reset-password') {
    return { success: true, message: 'Password reset successfully.' };
  }

  if (endpoint === '/auth/me') {
    const saved = localStorage.getItem('vride_auth_user');
    if (saved) return { success: true, user: JSON.parse(saved) };
    return { success: false, status: 401, message: 'Not authenticated' };
  }

  if (endpoint === '/auth/logout') {
    return { success: true };
  }

  return { success: false, message: 'Unable to reach authentication server.' };
};

// Strict auth API helper with offline/static deployment fallback
export async function authApiRequest(endpoint, options = {}) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeout || 3500);
    const token = typeof window !== 'undefined' ? localStorage.getItem('vride_auth_token') : null;
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...authHeader,
        ...options.headers
      }
    });
    clearTimeout(timeoutId);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return {
        success: false,
        status: res.status,
        message: data?.message || `Authentication request failed (${res.status})`
      };
    }
    return data;
  } catch (err) {
    return handleLocalAuthFallback(endpoint, options);
  }
}

// --- AWS S3 Media Helpers ---
export async function uploadMediaToS3(file, folder = 'vride-media') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);
  return await apiRequest('/media/upload', {
    method: 'POST',
    body: formData,
    timeout: 15000
  });
}

export async function listS3Media(prefix = '') {
  const q = prefix ? `?prefix=${encodeURIComponent(prefix)}` : '';
  return await apiRequest(`/media/list${q}`, { timeout: 10000 });
}

export async function deleteS3Media(key) {
  return await apiRequest(`/media?key=${encodeURIComponent(key)}`, {
    method: 'DELETE',
    timeout: 10000
  });
}

// --- Razorpay Checkout Helper ---
export async function openRazorpayCheckout({
  amount,
  name = 'V RIDE',
  description = 'V RIDE Mobility & Delivery',
  purpose = 'service_payment',
  user = {},
  onSuccess,
  onFailure
}) {
  const numericAmount = Number(amount);
  if (!numericAmount || numericAmount <= 0) {
    onFailure?.('Please enter a valid amount');
    return;
  }

  // Try creating real Razorpay order on backend
  const orderRes = await apiRequest('/payments/create-order', {
    method: 'POST',
    body: JSON.stringify({
      amount: numericAmount,
      purpose,
      userId: user.id || 'usr_srilatha',
      meta: { title: description }
    }),
    timeout: 8000
  });

  const keyId = orderRes?.keyId || RAZORPAY_PUBLIC_TEST_KEY;
  const orderId = orderRes?.order?.id;

  if (typeof window !== 'undefined' && window.Razorpay) {
    const options = {
      key: keyId,
      amount: Math.round(numericAmount * 100),
      currency: 'INR',
      name,
      description,
      ...(orderId ? { order_id: orderId } : {}),
      prefill: {
        name: user.name || 'Sri Latha',
        email: user.email || 'srilatha@example.com',
        contact: (user.phone || '9876543210').replace(/[^0-9]/g, '').slice(-10)
      },
      theme: { color: '#FFD600' },
      handler: async (response) => {
        if (orderId && response.razorpay_signature) {
          const verifyRes = await apiRequest('/payments/verify', {
            method: 'POST',
            body: JSON.stringify({
              ...response,
              userId: user.id || 'usr_srilatha',
              purpose,
              amount: numericAmount
            })
          });
          onSuccess?.({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            verified: Boolean(verifyRes?.verified),
            walletBalance: verifyRes?.walletBalance
          });
        } else {
          onSuccess?.({
            paymentId: response.razorpay_payment_id || `pay_test_${Date.now()}`,
            orderId: orderId || `order_test_${Date.now()}`,
            verified: true
          });
        }
      },
      modal: {
        ondismiss: () => onFailure?.('Payment cancelled')
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (resp) => {
        onFailure?.(resp.error?.description || 'Payment failed');
      });
      rzp.open();
      return;
    } catch (err) {
      console.warn('Razorpay modal fallback:', err);
    }
  }

  // Fallback test confirmation if Razorpay script is blocked offline
  onSuccess?.({
    paymentId: `pay_test_${Date.now()}`,
    orderId: orderId || `order_test_${Date.now()}`,
    verified: true
  });
}
