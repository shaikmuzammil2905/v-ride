import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import db from '../config/db.js';

export const onboardingController = {
  // POST /api/onboarding/restaurant
  submitRestaurant: (req, res) => {
    const body = req.body || {};
    if (!body.ownerName || !body.mobile || !body.email || !body.restaurantName || !body.address) {
      return res.status(400).json({
        success: false,
        message: 'Owner name, mobile, email, restaurant name, and address are required.'
      });
    }
    if (!body.termsAccepted) {
      return res.status(400).json({
        success: false,
        message: 'Please accept the Terms & Conditions and commission agreement.'
      });
    }

    const restId = 'RST_' + uuidv4().slice(0, 6).toUpperCase();
    const appId = 'APP_RST_' + uuidv4().slice(0, 6).toUpperCase();
    const cleanEmail = String(body.email).trim().toLowerCase();

    const restaurantRecord = {
      id: restId,
      applicationId: appId,
      name: body.restaurantName,
      owner: body.ownerName,
      phone: body.mobile,
      email: cleanEmail,
      ownerPhoto: body.ownerPhoto || '',
      logo: body.restaurantLogo || '',
      restaurantType: body.restaurantType || 'Both',
      cuisine: Array.isArray(body.cuisines) ? body.cuisines.join(', ') : (body.cuisines || 'Multi Cuisine'),
      cuisines: Array.isArray(body.cuisines)
        ? body.cuisines
        : String(body.cuisines || 'Multi Cuisine').split(',').map((s) => s.trim()).filter(Boolean),
      address: body.address,
      area: body.area || body.address.split(',')[0] || 'Hyderabad',
      city: body.city || 'Hyderabad',
      gps: body.gps || { lat: 17.4948, lng: 78.3578 },
      operatingHours: `${body.openTime || '10:00 AM'} - ${body.closeTime || '11:00 PM'}`,
      prepTime: `${body.prepTime || '20'} Minutes`,
      documents: {
        fssai: body.fssaiNumber || 'Pending',
        pan: body.panNumber || 'Pending',
        gst: body.gstNumber || 'N/A',
        ownerIdProof: body.ownerIdProof || 'Submitted',
        bankProof: body.bankProofName || 'Cancelled Cheque Uploaded'
      },
      docs: [
        `FSSAI: ${body.fssaiNumber || 'Submitted'}`,
        `PAN: ${body.panNumber || 'Submitted'}`,
        body.gstNumber ? `GST: ${body.gstNumber}` : 'GST: N/A',
        `Bank: ${body.bankName || 'Submitted'} (${body.ifscCode || ''})`
      ],
      bankDetails: {
        accountHolder: body.accountHolder || body.ownerName,
        bankName: body.bankName || '',
        accountNumberMasked: body.accountNumber ? '••••' + String(body.accountNumber).slice(-4) : '',
        ifscCode: body.ifscCode || ''
      },
      isOpen: false,
      rating: 4.5,
      appliedOn: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'pending',
      remarks: '',
      createdAt: new Date().toISOString()
    };

    db.insert('restaurants', restaurantRecord);
    db.insert('onboardingApplications', {
      id: appId,
      targetId: restId,
      type: 'restaurant',
      ...restaurantRecord
    });

    // Create vendor auth account in pending state until admin approves
    const existingAuth = db.get('authAccounts').find((a) => a.email?.toLowerCase() === cleanEmail);
    if (!existingAuth) {
      db.insert('authAccounts', {
        id: 'auth_' + uuidv4().slice(0, 8),
        profileId: restId,
        restaurantId: restId,
        name: body.restaurantName,
        username: cleanEmail.split('@')[0],
        email: cleanEmail,
        phone: body.mobile,
        role: 'vendor',
        passwordHash: bcrypt.hashSync(String(body.password || 'Vendor@2026'), 10),
        active: false,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Restaurant onboarding application submitted for Admin approval.',
      applicationId: appId,
      data: restaurantRecord
    });
  },

  // POST /api/onboarding/rider
  submitRider: (req, res) => {
    const body = req.body || {};
    if (!body.fullName || !body.mobile || !body.email || !body.vehicleNumber) {
      return res.status(400).json({
        success: false,
        message: 'Full name, mobile, email, and vehicle registration number are required.'
      });
    }
    if (!body.termsAccepted) {
      return res.status(400).json({
        success: false,
        message: 'Please accept the Terms & Conditions to submit your rider application.'
      });
    }

    const riderId = 'RDR_' + uuidv4().slice(0, 6).toUpperCase();
    const appId = 'APP_RDR_' + uuidv4().slice(0, 6).toUpperCase();
    const cleanEmail = String(body.email).trim().toLowerCase();

    const riderRecord = {
      id: riderId,
      applicationId: appId,
      name: body.fullName,
      phone: body.mobile,
      email: cleanEmail,
      dob: body.dob || '',
      address: body.address || '',
      emergencyContact: body.emergencyContact || '',
      city: body.city || 'Hyderabad',
      vehicle: body.vehicleType || 'Bike',
      vehicleType: String(body.vehicleType || 'bike').toLowerCase(),
      vehicleModel: body.vehicleModel || '',
      vehicleNo: body.vehicleNumber,
      vehicleNumber: body.vehicleNumber,
      services: Array.isArray(body.services) && body.services.length > 0
        ? body.services
        : ['Food Delivery', 'Parcel Delivery', 'Customer Pick & Drop'],
      preferredLocation: body.preferredLocation || 'Miyapur, Hyderabad',
      availability: body.availability || 'Full-time',
      gps: body.gps || { lat: 17.4948, lng: 78.3578 },
      documents: {
        idProof: body.idProofNumber || 'Submitted',
        pan: body.panNumber || 'Submitted',
        drivingLicense: body.drivingLicenseNumber || 'Submitted',
        vehicleRC: body.rcNumber || body.vehicleNumber,
        insurance: body.insuranceNumber || 'Submitted',
        bankProof: body.bankProofName || 'Uploaded'
      },
      bankDetails: {
        accountHolder: body.accountHolder || body.fullName,
        bankName: body.bankName || '',
        accountNumberMasked: body.accountNumber ? '••••' + String(body.accountNumber).slice(-4) : '',
        ifscCode: body.ifscCode || ''
      },
      isOnline: false,
      online: false,
      rating: 5.0,
      totalTrips: 0,
      walletBalance: 0,
      appliedOn: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'pending',
      remarks: '',
      createdAt: new Date().toISOString()
    };

    db.insert('partners', riderRecord);
    db.insert('onboardingApplications', {
      id: appId,
      targetId: riderId,
      type: 'rider',
      ...riderRecord
    });

    const existingAuth = db.get('authAccounts').find((a) => a.email?.toLowerCase() === cleanEmail);
    if (!existingAuth) {
      db.insert('authAccounts', {
        id: 'auth_' + uuidv4().slice(0, 8),
        profileId: riderId,
        name: body.fullName,
        username: cleanEmail.split('@')[0],
        email: cleanEmail,
        phone: body.mobile,
        role: 'rider',
        vehicleType: riderRecord.vehicleType,
        passwordHash: bcrypt.hashSync(String(body.password || 'Partner@2026'), 10),
        active: false,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Rider onboarding application submitted for Admin verification.',
      applicationId: appId,
      data: riderRecord
    });
  },

  // GET /api/onboarding/status?identifier=...
  trackStatus: (req, res) => {
    const q = String(req.query.identifier || '').trim().toLowerCase();
    if (!q) return res.status(400).json({ success: false, message: 'Application ID, email, or mobile is required.' });

    const match = db.get('onboardingApplications').find(
      (a) =>
        a.id?.toLowerCase() === q ||
        a.targetId?.toLowerCase() === q ||
        a.email?.toLowerCase() === q ||
        String(a.phone || '').replace(/\D/g, '').endsWith(q.replace(/\D/g, ''))
    );

    if (!match) {
      return res.status(404).json({ success: false, message: 'No onboarding application found.' });
    }
    return res.json({ success: true, data: match });
  },

  // GET /api/admin/onboarding
  listAllForAdmin: (req, res) => {
    const apps = db.get('onboardingApplications');
    return res.json({
      success: true,
      data: {
        restaurants: apps.filter((a) => a.type === 'restaurant'),
        riders: apps.filter((a) => a.type === 'rider')
      }
    });
  },

  // PUT /api/admin/onboarding/:type/:id/decision
  decideApplication: (req, res) => {
    const { type, id } = req.params;
    const { decision, remarks = '' } = req.body;
    if (!['approved', 'rejected'].includes(decision)) {
      return res.status(400).json({ success: false, message: 'Invalid decision' });
    }

    const table = type === 'restaurant' ? 'restaurants' : 'partners';
    db.update(table, id, { status: decision, remarks });

    const apps = db.get('onboardingApplications');
    const app = apps.find((a) => a.targetId === id || a.id === id);
    if (app) {
      db.update('onboardingApplications', app.id, { status: decision, remarks });
    }

    // Activate or suspend linked auth account
    const auth = db.get('authAccounts').find((a) => a.profileId === id);
    if (auth) {
      db.update('authAccounts', auth.id, {
        active: decision === 'approved',
        status: decision
      });
    }

    db.insert('auditLogs', {
      id: 'aud_' + uuidv4().slice(0, 8),
      adminName: req.authUser?.name || 'Admin',
      action: `${decision === 'approved' ? 'Approved' : 'Rejected'} ${type} onboarding`,
      module: type === 'restaurant' ? 'Restaurants' : 'Riders',
      relatedRecord: id,
      createdAt: new Date().toISOString()
    });

    return res.json({ success: true, id, status: decision, remarks });
  }
};
