import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import db from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'vride_jwt_secure_key_2026_hyderabad';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const normalizePhone = (value) => {
  const digits = String(value || '').replace(/\D/g, '');
  return digits.length >= 10 ? digits.slice(-10) : digits;
};

const findAccountByIdentifier = (identifier) => {
  const raw = String(identifier || '').trim();
  const lower = raw.toLowerCase();
  const phone10 = normalizePhone(raw);
  const accounts = db.get('authAccounts');

  return accounts.find((acc) => {
    if (acc.email && acc.email.toLowerCase() === lower) return true;
    if (acc.username && acc.username.toLowerCase() === lower) return true;
    if (Array.isArray(acc.altEmails) && acc.altEmails.some((e) => e.toLowerCase() === lower)) return true;
    if (phone10.length === 10) {
      if (normalizePhone(acc.phone) === phone10) return true;
      if (Array.isArray(acc.altPhones) && acc.altPhones.some((p) => normalizePhone(p) === phone10)) return true;
    }
    return false;
  });
};

const sanitizeAccount = (account) => {
  if (!account) return null;
  const { passwordHash, ...safe } = account;

  if (account.role === 'customer') {
    const profile = db.findById('users', account.profileId);
    return {
      ...safe,
      id: profile?.id || account.profileId,
      accountId: account.id,
      walletBalance: profile?.walletBalance ?? 850,
      savedAddresses: profile?.savedAddresses || [],
      avatar: profile?.avatar || ''
    };
  }

  if (account.role === 'rider') {
    const partner = db.findById('partners', account.profileId);
    return {
      ...safe,
      id: partner?.id || account.profileId,
      accountId: account.id,
      vehicleType: partner?.vehicleType || account.vehicleType || 'bike',
      vehicleModel: partner?.vehicleModel || 'Honda Activa 6G',
      vehicleNumber: partner?.vehicleNumber || 'TS 09 AB 4321',
      walletBalance: partner?.walletBalance ?? 3820
    };
  }

  if (account.role === 'vendor') {
    const rest = db.findById('restaurants', account.restaurantId || account.profileId);
    return {
      ...safe,
      id: rest?.id || account.profileId,
      restaurantId: rest?.id || account.restaurantId || account.profileId,
      accountId: account.id,
      name: rest?.name || account.name
    };
  }

  return {
    ...safe,
    id: account.profileId || account.id,
    accountId: account.id
  };
};

const issueToken = (account) =>
  jwt.sign(
    {
      accountId: account.id,
      profileId: account.profileId,
      role: account.role,
      email: account.email,
      name: account.name
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

const isPortalAllowedForRole = (loginPortal, role) => {
  if (!loginPortal) return true;
  if (loginPortal === 'customer') return role === 'customer';
  if (loginPortal === 'admin') return role === 'admin' || role === 'super_admin';
  if (loginPortal === 'partner') return role === 'rider' || role === 'vendor';
  return false;
};

const logAuthAudit = (user, action, details) => {
  db.insert('auditLogs', {
    id: 'aud_' + uuidv4().slice(0, 8),
    adminName: user?.name || 'System',
    action,
    module: 'Authentication',
    relatedRecord: details || user?.email || user?.phone || user?.id,
    createdAt: new Date().toISOString()
  });
};

// =====================================================================
// AUTHENTICATION MIDDLEWARE
// =====================================================================
export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : null;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required. Please sign in.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const account = db.findById('authAccounts', decoded.accountId);
    if (!account || account.active === false) {
      return res.status(401).json({ success: false, message: 'Session expired or account disabled.' });
    }
    req.authAccount = account;
    req.authUser = sanitizeAccount(account);
    return next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired authentication token.' });
  }
};

export const requireRole = (...allowedRoles) => (req, res, next) => {
  if (!req.authAccount) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }
  if (!allowedRoles.includes(req.authAccount.role)) {
    return res.status(403).json({
      success: false,
      message: `Access denied. Role '${req.authAccount.role}' is not authorized for this resource.`
    });
  }
  return next();
};

// =====================================================================
// AUTH SYSTEM CONTROLLER
// =====================================================================
export const authSystemController = {
  // POST /api/auth/login
  login: (req, res) => {
    const { identifier, password, loginPortal } = req.body;

    if (!identifier || !String(identifier).trim()) {
      return res.status(400).json({ success: false, message: 'Email, username, or mobile number is required.' });
    }
    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required.' });
    }

    const account = findAccountByIdentifier(identifier);
    if (!account) {
      return res.status(401).json({ success: false, message: 'No account found with this email, username, or mobile number.' });
    }

    if (account.active === false) {
      return res.status(403).json({ success: false, message: 'Your account is currently suspended. Contact V RIDE support.' });
    }

    const passwordValid = bcrypt.compareSync(String(password), account.passwordHash || '');
    if (!passwordValid) {
      return res.status(401).json({ success: false, message: 'Incorrect password. Please try again or reset your password.' });
    }

    if (loginPortal && !isPortalAllowedForRole(loginPortal, account.role)) {
      const portalLabel =
        loginPortal === 'customer'
          ? 'Customer Login'
          : loginPortal === 'admin'
          ? 'Admin Login'
          : 'V RIDE Partner Login';
      return res.status(403).json({
        success: false,
        message: `This account (${account.role}) cannot sign in through ${portalLabel}. Please use the correct login portal.`
      });
    }

    const token = issueToken(account);
    const user = sanitizeAccount(account);

    logAuthAudit(user, 'User Login', `${account.role} via ${loginPortal || 'direct'}`);

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user
    });
  },

  // POST /api/auth/register (Customer registration)
  register: (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !String(name).trim()) {
      return res.status(400).json({ success: false, message: 'Full name is required.' });
    }
    if (!phone && !email) {
      return res.status(400).json({ success: false, message: 'Mobile number or email is required.' });
    }
    if (!password || String(password).length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    }

    if (email && findAccountByIdentifier(email)) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }
    if (phone && findAccountByIdentifier(phone)) {
      return res.status(409).json({ success: false, message: 'An account with this mobile number already exists.' });
    }

    const userId = `usr_${uuidv4().slice(0, 8)}`;
    const authId = `auth_${uuidv4().slice(0, 8)}`;
    const cleanEmail = email ? String(email).trim().toLowerCase() : '';
    const cleanPhone = phone ? String(phone).trim() : '';

    const newCustomer = {
      id: userId,
      name: String(name).trim(),
      phone: cleanPhone,
      email: cleanEmail,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      role: 'customer',
      walletBalance: 250,
      savedAddresses: [
        { id: 'addr_default', type: 'Home', address: 'Miyapur, Hyderabad', coords: [17.4948, 78.3578] }
      ],
      createdAt: new Date().toISOString()
    };
    db.insert('users', newCustomer);

    const newAuth = {
      id: authId,
      profileId: userId,
      name: String(name).trim(),
      username: cleanEmail ? cleanEmail.split('@')[0] : normalizePhone(cleanPhone),
      email: cleanEmail,
      phone: cleanPhone,
      role: 'customer',
      passwordHash: bcrypt.hashSync(String(password), 10),
      active: true,
      createdAt: new Date().toISOString()
    };
    db.insert('authAccounts', newAuth);

    const token = issueToken(newAuth);
    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: sanitizeAccount(newAuth)
    });
  },

  // POST /api/auth/send-otp
  sendOtp: (req, res) => {
    const { phone, loginPortal = 'customer' } = req.body;
    const phone10 = normalizePhone(phone);
    if (phone10.length !== 10) {
      return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit mobile number.' });
    }

    if (loginPortal === 'partner' || loginPortal === 'admin') {
      const account = findAccountByIdentifier(phone10);
      if (!account || !isPortalAllowedForRole(loginPortal, account.role)) {
        return res.status(404).json({
          success: false,
          message: `No registered ${loginPortal} account found for this mobile number.`
        });
      }
    }

    const otp = '1234';
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    db.data.otpRecords = (db.get('otpRecords') || []).filter((r) => r.phone10 !== phone10);
    db.insert('otpRecords', {
      id: 'otp_' + uuidv4().slice(0, 8),
      phone10,
      phone: String(phone).trim(),
      otp,
      loginPortal,
      expiresAt,
      createdAt: new Date().toISOString()
    });

    return res.json({
      success: true,
      message: `OTP sent successfully to ${phone}`,
      devOtp: otp
    });
  },

  // POST /api/auth/verify-otp
  verifyOtp: (req, res) => {
    const { phone, otp, loginPortal = 'customer' } = req.body;
    const phone10 = normalizePhone(phone);
    if (phone10.length !== 10) {
      return res.status(400).json({ success: false, message: 'Valid 10-digit mobile number is required.' });
    }
    if (!otp || String(otp).trim().length < 4) {
      return res.status(400).json({ success: false, message: 'Please enter the 4-digit OTP.' });
    }

    const record = (db.get('otpRecords') || []).find((r) => r.phone10 === phone10);
    if (!record) {
      return res.status(400).json({ success: false, message: 'No OTP requested for this number. Please request a new OTP.' });
    }
    if (new Date(record.expiresAt).getTime() < Date.now()) {
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one.' });
    }
    if (String(record.otp) !== String(otp).trim()) {
      return res.status(401).json({ success: false, message: 'Invalid OTP. Please check and try again.' });
    }

    // Consume OTP
    db.data.otpRecords = (db.get('otpRecords') || []).filter((r) => r.phone10 !== phone10);
    db.save();

    let account = findAccountByIdentifier(phone10);

    if (!account) {
      if (loginPortal !== 'customer') {
        return res.status(404).json({
          success: false,
          message: 'No registered partner or admin account matches this mobile number.'
        });
      }

      // Auto-register new customer via OTP
      const userId = `usr_${uuidv4().slice(0, 8)}`;
      const authId = `auth_${uuidv4().slice(0, 8)}`;
      const formattedPhone = `+91 ${phone10.slice(0, 5)} ${phone10.slice(5)}`;

      db.insert('users', {
        id: userId,
        name: 'V RIDE User',
        phone: formattedPhone,
        email: '',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        role: 'customer',
        walletBalance: 250,
        savedAddresses: [
          { id: 'addr_default', type: 'Home', address: 'Miyapur, Hyderabad', coords: [17.4948, 78.3578] }
        ],
        createdAt: new Date().toISOString()
      });

      account = db.insert('authAccounts', {
        id: authId,
        profileId: userId,
        name: 'V RIDE User',
        username: phone10,
        email: '',
        phone: formattedPhone,
        role: 'customer',
        passwordHash: bcrypt.hashSync(uuidv4(), 10),
        active: true,
        createdAt: new Date().toISOString()
      });
    }

    if (!isPortalAllowedForRole(loginPortal, account.role)) {
      return res.status(403).json({
        success: false,
        message: `Account role '${account.role}' is not authorized for ${loginPortal} login.`
      });
    }

    const token = issueToken(account);
    const user = sanitizeAccount(account);
    logAuthAudit(user, 'OTP Login', `${account.role} via ${loginPortal}`);

    return res.json({
      success: true,
      message: 'OTP verified successfully',
      token,
      user
    });
  },

  // POST /api/auth/forgot-password
  forgotPassword: (req, res) => {
    const { identifier } = req.body;
    if (!identifier || !String(identifier).trim()) {
      return res.status(400).json({ success: false, message: 'Please enter your registered email, username, or mobile number.' });
    }

    const account = findAccountByIdentifier(identifier);
    if (!account) {
      return res.status(404).json({ success: false, message: 'No account found matching that email, username, or mobile number.' });
    }

    const resetCode = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    db.data.passwordResets = (db.get('passwordResets') || []).filter((r) => r.accountId !== account.id);
    db.insert('passwordResets', {
      id: 'rst_' + uuidv4().slice(0, 8),
      accountId: account.id,
      resetCode,
      expiresAt,
      createdAt: new Date().toISOString()
    });

    return res.json({
      success: true,
      message: 'Password reset code generated. Enter the 6-digit code to set a new password.',
      devResetCode: resetCode
    });
  },

  // POST /api/auth/reset-password
  resetPassword: (req, res) => {
    const { identifier, resetCode, newPassword } = req.body;
    if (!identifier || !resetCode || !newPassword) {
      return res.status(400).json({ success: false, message: 'Identifier, reset code, and new password are required.' });
    }
    if (String(newPassword).length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters.' });
    }

    const account = findAccountByIdentifier(identifier);
    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found.' });
    }

    const resetRecord = (db.get('passwordResets') || []).find(
      (r) => r.accountId === account.id && String(r.resetCode) === String(resetCode).trim()
    );
    if (!resetRecord) {
      return res.status(400).json({ success: false, message: 'Invalid password reset code.' });
    }
    if (new Date(resetRecord.expiresAt).getTime() < Date.now()) {
      return res.status(400).json({ success: false, message: 'Password reset code has expired.' });
    }

    db.update('authAccounts', account.id, {
      passwordHash: bcrypt.hashSync(String(newPassword), 10)
    });

    db.data.passwordResets = (db.get('passwordResets') || []).filter((r) => r.accountId !== account.id);
    db.save();

    logAuthAudit(account, 'Password Reset', account.email || account.phone);

    return res.json({
      success: true,
      message: 'Password reset successfully. You can now sign in with your new password.'
    });
  },

  // GET /api/auth/me
  me: (req, res) => {
    return res.json({
      success: true,
      user: req.authUser
    });
  },

  // POST /api/auth/logout
  logout: (req, res) => {
    if (req.authUser) {
      logAuthAudit(req.authUser, 'User Logout', req.authUser.role);
    }
    return res.json({ success: true, message: 'Signed out successfully.' });
  }
};
