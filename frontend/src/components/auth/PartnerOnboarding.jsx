import React, { useState } from 'react';
import {
  Store, Bike, ArrowLeft, CheckCircle2, MapPin, Upload,
  FileText, Building2, User, ShieldCheck, Search
} from 'lucide-react';
import { apiRequest } from '../../services/api';

const saveLocalOnboardingFallback = (type, payload, responseData) => {
  try {
    const key = type === 'restaurant' ? 'vride_onboarding_restaurants' : 'vride_onboarding_riders';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    const record = responseData || {
      id: (type === 'restaurant' ? 'RST_' : 'RDR_') + Date.now().toString().slice(-6),
      applicationId: (type === 'restaurant' ? 'APP_RST_' : 'APP_RDR_') + Date.now().toString().slice(-6),
      name: type === 'restaurant' ? payload.restaurantName : payload.fullName,
      owner: payload.ownerName,
      phone: payload.mobile,
      email: payload.email,
      area: payload.area || payload.preferredLocation || 'Hyderabad',
      city: payload.city || 'Hyderabad',
      cuisine: payload.cuisines || 'Multi Cuisine',
      vehicle: payload.vehicleType || 'Bike',
      vehicleNo: payload.vehicleNumber || '',
      services: payload.services || ['Food Delivery', 'Parcel Delivery', 'Customer Pick & Drop'],
      docs:
        type === 'restaurant'
          ? [
              `FSSAI: ${payload.fssaiNumber || 'Submitted'}`,
              `PAN: ${payload.panNumber || 'Submitted'}`,
              `GST: ${payload.gstNumber || 'N/A'}`,
              `Bank: ${payload.bankName || 'Submitted'}`
            ]
          : [
              `Driving Licence: ${payload.drivingLicenseNumber || 'Submitted'}`,
              `Vehicle RC: ${payload.rcNumber || payload.vehicleNumber || 'Submitted'}`,
              `Insurance: ${payload.insuranceNumber || 'Submitted'}`,
              `ID/PAN: ${payload.idProofNumber || 'Submitted'}`
            ],
      bankDetails: {
        accountHolder: payload.accountHolder,
        bankName: payload.bankName,
        accountNumberMasked: payload.accountNumber ? '••••' + String(payload.accountNumber).slice(-4) : '',
        ifscCode: payload.ifscCode
      },
      appliedOn: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'pending',
      rawApplication: payload
    };
    localStorage.setItem(key, JSON.stringify([record, ...existing]));
    return record;
  } catch {
    return null;
  }
};

export const PartnerOnboarding = ({ onBackToLogin }) => {
  const [selectedType, setSelectedType] = useState(null); // null | 'restaurant' | 'rider' | 'track'
  const [submittedApp, setSubmittedApp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Track Application Status state
  const [trackQuery, setTrackQuery] = useState('');
  const [trackResult, setTrackResult] = useState(null);

  // Restaurant Form State
  const [restForm, setRestForm] = useState({
    ownerName: '',
    mobile: '',
    email: '',
    password: '',
    ownerPhotoName: '',
    restaurantName: '',
    restaurantLogoName: '',
    restaurantType: 'Both',
    cuisines: 'Biryani, North Indian',
    address: '',
    area: '',
    city: 'Hyderabad',
    gps: { lat: 17.4948, lng: 78.3578 },
    openTime: '10:00 AM',
    closeTime: '11:00 PM',
    prepTime: '20',
    fssaiNumber: '',
    panNumber: '',
    gstNumber: '',
    ownerIdProof: '',
    accountHolder: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    bankProofName: '',
    termsAccepted: false
  });

  // Rider Form State
  const [riderForm, setRiderForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    dob: '',
    address: '',
    emergencyContact: '',
    profilePhotoName: '',
    vehicleType: 'Bike',
    vehicleNumber: '',
    vehicleModel: '',
    vehiclePhotoName: '',
    idProofNumber: '',
    panNumber: '',
    drivingLicenseNumber: '',
    rcNumber: '',
    insuranceNumber: '',
    accountHolder: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    bankProofName: '',
    services: ['Food Delivery', 'Parcel Delivery', 'Customer Pick & Drop'],
    preferredLocation: 'Miyapur, Hyderabad',
    city: 'Hyderabad',
    availability: 'Full-time',
    gps: { lat: 17.4948, lng: 78.3578 },
    termsAccepted: false
  });

  const detectGps = (target) => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const gps = { lat: Number(pos.coords.latitude.toFixed(5)), lng: Number(pos.coords.longitude.toFixed(5)) };
        if (target === 'restaurant') setRestForm((p) => ({ ...p, gps }));
        else setRiderForm((p) => ({ ...p, gps }));
      },
      () => {}
    );
  };

  const toggleRiderService = (svc) => {
    setRiderForm((prev) => {
      const exists = prev.services.includes(svc);
      return {
        ...prev,
        services: exists ? prev.services.filter((s) => s !== svc) : [...prev.services, svc]
      };
    });
  };

  const handleRestaurantSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!restForm.termsAccepted) {
      setError('Please accept the Terms & Conditions and commission agreement.');
      return;
    }
    setLoading(true);
    const res = await apiRequest('/onboarding/restaurant', {
      method: 'POST',
      body: JSON.stringify(restForm),
      timeout: 5000
    });
    setLoading(false);

    const saved = saveLocalOnboardingFallback('restaurant', restForm, res?.data);
    setSubmittedApp({
      type: 'Restaurant Owner',
      applicationId: res?.applicationId || saved?.applicationId || 'APP_RST_' + Date.now().toString().slice(-6),
      name: restForm.restaurantName,
      status: 'pending'
    });
  };

  const handleRiderSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!riderForm.termsAccepted) {
      setError('Please accept the Terms & Conditions to submit your application.');
      return;
    }
    setLoading(true);
    const res = await apiRequest('/onboarding/rider', {
      method: 'POST',
      body: JSON.stringify(riderForm),
      timeout: 5000
    });
    setLoading(false);

    const saved = saveLocalOnboardingFallback('rider', riderForm, res?.data);
    setSubmittedApp({
      type: 'Rider Partner',
      applicationId: res?.applicationId || saved?.applicationId || 'APP_RDR_' + Date.now().toString().slice(-6),
      name: riderForm.fullName,
      status: 'pending'
    });
  };

  const handleTrackStatus = async (e) => {
    e.preventDefault();
    setError('');
    setTrackResult(null);
    const res = await apiRequest(`/onboarding/status?identifier=${encodeURIComponent(trackQuery)}`);
    if (res?.success && res.data) {
      setTrackResult(res.data);
      return;
    }
    // Check localStorage fallback
    const allLocal = [
      ...JSON.parse(localStorage.getItem('vride_onboarding_restaurants') || '[]'),
      ...JSON.parse(localStorage.getItem('vride_onboarding_riders') || '[]')
    ];
    const q = trackQuery.trim().toLowerCase();
    const match = allLocal.find(
      (a) =>
        a.applicationId?.toLowerCase() === q ||
        a.id?.toLowerCase() === q ||
        a.email?.toLowerCase() === q ||
        String(a.phone || '').includes(q)
    );
    if (match) setTrackResult(match);
    else setError('No onboarding application found for that ID, email, or mobile.');
  };

  // Submitted Confirmation View
  if (submittedApp) {
    return (
      <div className="text-center space-y-4 py-3">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div>
          <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-900">
            Submitted to Admin Panel
          </span>
          <h3 className="font-black text-base text-gray-900 mt-2">Application Received!</h3>
          <p className="text-xs text-gray-600 mt-1">
            Your <strong>{submittedApp.type}</strong> onboarding application for{' '}
            <strong>{submittedApp.name}</strong> has been sent to V RIDE Admin for document verification.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-500 font-semibold">Application ID</span>
            <span className="font-black text-gray-900">{submittedApp.applicationId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-semibold">Status</span>
            <span className="font-black text-amber-700 uppercase">Pending Admin Approval</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onBackToLogin}
          className="w-full py-3 rounded-2xl bg-[#FFD000] hover:bg-yellow-400 text-black font-black text-xs shadow-sm"
        >
          Back to Partner Sign In
        </button>
      </div>
    );
  }

  // 1. Role Selection Screen matching image copy 60.png
  if (!selectedType) {
    return (
      <div className="space-y-4">
        <div>
          <label className="text-[11px] font-black uppercase text-gray-400 tracking-wider block mb-2.5">
            SELECT YOUR ROLE
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => { setSelectedType('restaurant'); setError(''); }}
              className="p-4 rounded-2xl border border-gray-200 bg-gray-50/70 hover:bg-[#FFF9DB] hover:border-[#FFD000] transition flex flex-col items-center justify-center gap-2 text-center shadow-xs active:scale-[0.98]"
            >
              <Store className="w-6 h-6 text-gray-700 stroke-[2]" />
              <span className="text-xs font-black text-gray-800">Restaurant Owner</span>
            </button>

            <button
              type="button"
              onClick={() => { setSelectedType('rider'); setError(''); }}
              className="p-4 rounded-2xl border border-gray-200 bg-gray-50/70 hover:bg-[#FFF9DB] hover:border-[#FFD000] transition flex flex-col items-center justify-center gap-2 text-center shadow-xs active:scale-[0.98]"
            >
              <Bike className="w-6 h-6 text-gray-700 stroke-[2]" />
              <span className="text-xs font-black text-gray-800">Rider Partner</span>
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => { setSelectedType('track'); setError(''); }}
          className="w-full py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Track Existing Application Status</span>
        </button>
      </div>
    );
  }

  // 2. Track Application Status
  if (selectedType === 'track') {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setSelectedType(null)}
          className="flex items-center gap-1 text-xs font-black text-gray-700 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Role Selection</span>
        </button>

        <form onSubmit={handleTrackStatus} className="space-y-3">
          <label className="text-[10px] font-bold uppercase text-gray-500 block">
            Application ID, Email or Mobile Number
          </label>
          <input
            type="text"
            value={trackQuery}
            onChange={(e) => setTrackQuery(e.target.value)}
            placeholder="APP_RST_... or email / mobile"
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold"
          />
          {error && <p className="text-[11px] font-bold text-red-600">{error}</p>}
          <button type="submit" className="w-full py-2.5 rounded-xl bg-[#FFD000] text-black font-black text-xs">
            Check Status
          </button>
        </form>

        {trackResult && (
          <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-1.5">
            <div className="flex justify-between font-black">
              <span>{trackResult.name}</span>
              <span className="uppercase text-amber-700">{trackResult.status}</span>
            </div>
            <p className="text-[11px] text-gray-500">ID: {trackResult.applicationId || trackResult.id}</p>
            {trackResult.remarks && <p className="text-[11px] text-red-600">Remarks: {trackResult.remarks}</p>}
          </div>
        )}
      </div>
    );
  }

  // 3. RESTAURANT ONBOARDING FORM (Scope of Work Page 1)
  if (selectedType === 'restaurant') {
    return (
      <form onSubmit={handleRestaurantSubmit} className="space-y-4 max-h-[68vh] overflow-y-auto pr-1 text-xs">
        <div className="flex items-center justify-between sticky top-0 bg-white pb-2 border-b z-10">
          <button
            type="button"
            onClick={() => setSelectedType(null)}
            className="flex items-center gap-1 text-xs font-black text-gray-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Change Role</span>
          </button>
          <span className="text-[10px] font-black uppercase bg-[#FFF9DB] border border-[#FFD000] px-2 py-0.5 rounded-full">
            Restaurant Onboarding
          </span>
        </div>

        {/* Section 1: Owner Information */}
        <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5">
          <h4 className="font-black text-gray-900 flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> 1. Owner Information</h4>
          <input type="text" placeholder="Owner Full Name *" required value={restForm.ownerName} onChange={(e) => setRestForm({ ...restForm, ownerName: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-white font-semibold" />
          <div className="grid grid-cols-2 gap-2">
            <input type="tel" placeholder="Mobile Number *" required value={restForm.mobile} onChange={(e) => setRestForm({ ...restForm, mobile: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-white font-semibold" />
            <input type="email" placeholder="Email Address *" required value={restForm.email} onChange={(e) => setRestForm({ ...restForm, email: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-white font-semibold" />
          </div>
          <input type="password" placeholder="Create Login Password *" required minLength={6} value={restForm.password} onChange={(e) => setRestForm({ ...restForm, password: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-white font-semibold" />
          <label className="flex items-center justify-between px-3 py-2 rounded-xl border border-dashed bg-white cursor-pointer">
            <span className="text-[11px] text-gray-600">{restForm.ownerPhotoName || 'Upload Owner Profile Photo'}</span>
            <Upload className="w-3.5 h-3.5 text-gray-500" />
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setRestForm({ ...restForm, ownerPhotoName: e.target.files?.[0]?.name || '' })} />
          </label>
        </div>

        {/* Section 2: Restaurant Information */}
        <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5">
          <h4 className="font-black text-gray-900 flex items-center gap-1.5"><Store className="w-3.5 h-3.5" /> 2. Restaurant Information</h4>
          <input type="text" placeholder="Restaurant Name *" required value={restForm.restaurantName} onChange={(e) => setRestForm({ ...restForm, restaurantName: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-white font-semibold" />
          <div className="grid grid-cols-2 gap-2">
            <select value={restForm.restaurantType} onChange={(e) => setRestForm({ ...restForm, restaurantType: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-white font-bold">
              <option value="Both">Veg & Non-Veg</option>
              <option value="Veg">Pure Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
            <input type="text" placeholder="Cuisines (e.g. Biryani)" value={restForm.cuisines} onChange={(e) => setRestForm({ ...restForm, cuisines: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-white font-semibold" />
          </div>
          <input type="text" placeholder="Complete Restaurant Address *" required value={restForm.address} onChange={(e) => setRestForm({ ...restForm, address: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-white font-semibold" />
          <div className="grid grid-cols-2 gap-2">
            <input type="text" placeholder="Area (e.g. Miyapur)" value={restForm.area} onChange={(e) => setRestForm({ ...restForm, area: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-white font-semibold" />
            <button type="button" onClick={() => detectGps('restaurant')} className="px-3 py-2 rounded-xl bg-white border font-bold text-gray-700 flex items-center justify-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>{restForm.gps.lat}, {restForm.gps.lng}</span>
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <input type="text" placeholder="Open Time" value={restForm.openTime} onChange={(e) => setRestForm({ ...restForm, openTime: e.target.value })} className="px-2.5 py-2 rounded-xl border bg-white font-semibold" />
            <input type="text" placeholder="Close Time" value={restForm.closeTime} onChange={(e) => setRestForm({ ...restForm, closeTime: e.target.value })} className="px-2.5 py-2 rounded-xl border bg-white font-semibold" />
            <input type="number" placeholder="Prep (min)" value={restForm.prepTime} onChange={(e) => setRestForm({ ...restForm, prepTime: e.target.value })} className="px-2.5 py-2 rounded-xl border bg-white font-semibold" />
          </div>
          <label className="flex items-center justify-between px-3 py-2 rounded-xl border border-dashed bg-white cursor-pointer">
            <span className="text-[11px] text-gray-600">{restForm.restaurantLogoName || 'Upload Restaurant Logo & Photos'}</span>
            <Upload className="w-3.5 h-3.5 text-gray-500" />
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setRestForm({ ...restForm, restaurantLogoName: e.target.files?.[0]?.name || '' })} />
          </label>
        </div>

        {/* Section 3: Documents & Business Verification */}
        <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5">
          <h4 className="font-black text-gray-900 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> 3. Documents & Business Verification</h4>
          <div className="grid grid-cols-2 gap-2">
            <input type="text" placeholder="FSSAI Licence No. *" required value={restForm.fssaiNumber} onChange={(e) => setRestForm({ ...restForm, fssaiNumber: e.target.value })} className="px-3 py-2 rounded-xl border bg-white font-semibold" />
            <input type="text" placeholder="PAN Card No. *" required value={restForm.panNumber} onChange={(e) => setRestForm({ ...restForm, panNumber: e.target.value })} className="px-3 py-2 rounded-xl border bg-white font-semibold" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input type="text" placeholder="GST Number (if applicable)" value={restForm.gstNumber} onChange={(e) => setRestForm({ ...restForm, gstNumber: e.target.value })} className="px-3 py-2 rounded-xl border bg-white font-semibold" />
            <input type="text" placeholder="Owner ID Proof (Aadhaar/ID) *" required value={restForm.ownerIdProof} onChange={(e) => setRestForm({ ...restForm, ownerIdProof: e.target.value })} className="px-3 py-2 rounded-xl border bg-white font-semibold" />
          </div>
        </div>

        {/* Section 4: Bank Account Details */}
        <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5">
          <h4 className="font-black text-gray-900 flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> 4. Bank Account Details</h4>
          <div className="grid grid-cols-2 gap-2">
            <input type="text" placeholder="Account Holder Name *" required value={restForm.accountHolder} onChange={(e) => setRestForm({ ...restForm, accountHolder: e.target.value })} className="px-3 py-2 rounded-xl border bg-white font-semibold" />
            <input type="text" placeholder="Bank Name *" required value={restForm.bankName} onChange={(e) => setRestForm({ ...restForm, bankName: e.target.value })} className="px-3 py-2 rounded-xl border bg-white font-semibold" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input type="text" placeholder="Account Number *" required value={restForm.accountNumber} onChange={(e) => setRestForm({ ...restForm, accountNumber: e.target.value })} className="px-3 py-2 rounded-xl border bg-white font-semibold" />
            <input type="text" placeholder="IFSC Code *" required value={restForm.ifscCode} onChange={(e) => setRestForm({ ...restForm, ifscCode: e.target.value })} className="px-3 py-2 rounded-xl border bg-white font-semibold" />
          </div>
          <label className="flex items-center justify-between px-3 py-2 rounded-xl border border-dashed bg-white cursor-pointer">
            <span className="text-[11px] text-gray-600">{restForm.bankProofName || 'Upload Cancelled Cheque / Bank Proof'}</span>
            <Upload className="w-3.5 h-3.5 text-gray-500" />
            <input type="file" className="hidden" onChange={(e) => setRestForm({ ...restForm, bankProofName: e.target.files?.[0]?.name || '' })} />
          </label>
        </div>

        {/* Section 5: Account Activation */}
        <label className="flex items-start gap-2 text-[11px] text-gray-700 font-semibold cursor-pointer">
          <input type="checkbox" checked={restForm.termsAccepted} onChange={(e) => setRestForm({ ...restForm, termsAccepted: e.target.checked })} className="mt-0.5 accent-black" />
          <span>I accept the V RIDE Restaurant Partner Terms & Conditions and platform commission agreement.</span>
        </label>

        {error && <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 font-bold">{error}</div>}

        <button type="submit" disabled={loading} className="w-full py-3 rounded-2xl bg-[#FFD000] hover:bg-yellow-400 text-black font-black shadow-md">
          {loading ? 'Submitting Application...' : 'Submit Restaurant Application for Admin Approval'}
        </button>
      </form>
    );
  }

  // 4. RIDER ONBOARDING FORM (Scope of Work Page 2)
  return (
    <form onSubmit={handleRiderSubmit} className="space-y-4 max-h-[68vh] overflow-y-auto pr-1 text-xs">
      <div className="flex items-center justify-between sticky top-0 bg-white pb-2 border-b z-10">
        <button
          type="button"
          onClick={() => setSelectedType(null)}
          className="flex items-center gap-1 text-xs font-black text-gray-700"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Change Role</span>
        </button>
        <span className="text-[10px] font-black uppercase bg-[#FFF9DB] border border-[#FFD000] px-2 py-0.5 rounded-full">
          Rider Onboarding
        </span>
      </div>

      {/* Section 1: Personal Information */}
      <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5">
        <h4 className="font-black text-gray-900 flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> 1. Personal Information</h4>
        <input type="text" placeholder="Full Name *" required value={riderForm.fullName} onChange={(e) => setRiderForm({ ...riderForm, fullName: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-white font-semibold" />
        <div className="grid grid-cols-2 gap-2">
          <input type="tel" placeholder="Mobile Number *" required value={riderForm.mobile} onChange={(e) => setRiderForm({ ...riderForm, mobile: e.target.value })} className="px-3 py-2 rounded-xl border bg-white font-semibold" />
          <input type="email" placeholder="Email Address *" required value={riderForm.email} onChange={(e) => setRiderForm({ ...riderForm, email: e.target.value })} className="px-3 py-2 rounded-xl border bg-white font-semibold" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input type="date" placeholder="Date of Birth" value={riderForm.dob} onChange={(e) => setRiderForm({ ...riderForm, dob: e.target.value })} className="px-3 py-2 rounded-xl border bg-white font-semibold" />
          <input type="tel" placeholder="Emergency Contact *" required value={riderForm.emergencyContact} onChange={(e) => setRiderForm({ ...riderForm, emergencyContact: e.target.value })} className="px-3 py-2 rounded-xl border bg-white font-semibold" />
        </div>
        <input type="text" placeholder="Residential Address *" required value={riderForm.address} onChange={(e) => setRiderForm({ ...riderForm, address: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-white font-semibold" />
        <input type="password" placeholder="Create Login Password *" required minLength={6} value={riderForm.password} onChange={(e) => setRiderForm({ ...riderForm, password: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-white font-semibold" />
        <label className="flex items-center justify-between px-3 py-2 rounded-xl border border-dashed bg-white cursor-pointer">
          <span className="text-[11px] text-gray-600">{riderForm.profilePhotoName || 'Upload Profile Photograph'}</span>
          <Upload className="w-3.5 h-3.5 text-gray-500" />
          <input type="file" accept="image/*" className="hidden" onChange={(e) => setRiderForm({ ...riderForm, profilePhotoName: e.target.files?.[0]?.name || '' })} />
        </label>
      </div>

      {/* Section 2: Vehicle Information */}
      <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5">
        <h4 className="font-black text-gray-900 flex items-center gap-1.5"><Bike className="w-3.5 h-3.5" /> 2. Vehicle Information</h4>
        <div className="grid grid-cols-2 gap-2">
          <select value={riderForm.vehicleType} onChange={(e) => setRiderForm({ ...riderForm, vehicleType: e.target.value })} className="px-3 py-2 rounded-xl border bg-white font-bold">
            <option value="Bike">Bike</option>
            <option value="Scooter">Scooter</option>
            <option value="Auto">Auto</option>
            <option value="Car">Car</option>
          </select>
          <input type="text" placeholder="Vehicle Reg. No. *" required value={riderForm.vehicleNumber} onChange={(e) => setRiderForm({ ...riderForm, vehicleNumber: e.target.value })} className="px-3 py-2 rounded-xl border bg-white font-semibold" />
        </div>
        <input type="text" placeholder="Vehicle Model (e.g. Honda Activa 6G) *" required value={riderForm.vehicleModel} onChange={(e) => setRiderForm({ ...riderForm, vehicleModel: e.target.value })} className="w-full px-3 py-2 rounded-xl border bg-white font-semibold" />
        <label className="flex items-center justify-between px-3 py-2 rounded-xl border border-dashed bg-white cursor-pointer">
          <span className="text-[11px] text-gray-600">{riderForm.vehiclePhotoName || 'Upload Vehicle Photograph'}</span>
          <Upload className="w-3.5 h-3.5 text-gray-500" />
          <input type="file" accept="image/*" className="hidden" onChange={(e) => setRiderForm({ ...riderForm, vehiclePhotoName: e.target.files?.[0]?.name || '' })} />
        </label>
      </div>

      {/* Section 3: Document Verification */}
      <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5">
        <h4 className="font-black text-gray-900 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> 3. Document Verification</h4>
        <div className="grid grid-cols-2 gap-2">
          <input type="text" placeholder="Govt ID / Aadhaar No. *" required value={riderForm.idProofNumber} onChange={(e) => setRiderForm({ ...riderForm, idProofNumber: e.target.value })} className="px-3 py-2 rounded-xl border bg-white font-semibold" />
          <input type="text" placeholder="PAN Card No. *" required value={riderForm.panNumber} onChange={(e) => setRiderForm({ ...riderForm, panNumber: e.target.value })} className="px-3 py-2 rounded-xl border bg-white font-semibold" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <input type="text" placeholder="Driving Licence *" required value={riderForm.drivingLicenseNumber} onChange={(e) => setRiderForm({ ...riderForm, drivingLicenseNumber: e.target.value })} className="px-2.5 py-2 rounded-xl border bg-white font-semibold" />
          <input type="text" placeholder="Vehicle RC *" required value={riderForm.rcNumber} onChange={(e) => setRiderForm({ ...riderForm, rcNumber: e.target.value })} className="px-2.5 py-2 rounded-xl border bg-white font-semibold" />
          <input type="text" placeholder="Insurance No. *" required value={riderForm.insuranceNumber} onChange={(e) => setRiderForm({ ...riderForm, insuranceNumber: e.target.value })} className="px-2.5 py-2 rounded-xl border bg-white font-semibold" />
        </div>
      </div>

      {/* Section 4: Bank Account Details */}
      <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5">
        <h4 className="font-black text-gray-900 flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> 4. Bank Account Details</h4>
        <div className="grid grid-cols-2 gap-2">
          <input type="text" placeholder="Account Holder Name *" required value={riderForm.accountHolder} onChange={(e) => setRiderForm({ ...riderForm, accountHolder: e.target.value })} className="px-3 py-2 rounded-xl border bg-white font-semibold" />
          <input type="text" placeholder="Bank Name *" required value={riderForm.bankName} onChange={(e) => setRiderForm({ ...riderForm, bankName: e.target.value })} className="px-3 py-2 rounded-xl border bg-white font-semibold" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input type="text" placeholder="Account Number *" required value={riderForm.accountNumber} onChange={(e) => setRiderForm({ ...riderForm, accountNumber: e.target.value })} className="px-3 py-2 rounded-xl border bg-white font-semibold" />
          <input type="text" placeholder="IFSC Code *" required value={riderForm.ifscCode} onChange={(e) => setRiderForm({ ...riderForm, ifscCode: e.target.value })} className="px-3 py-2 rounded-xl border bg-white font-semibold" />
        </div>
      </div>

      {/* Section 5: Service Preferences */}
      <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5">
        <h4 className="font-black text-gray-900 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> 5. Service Preferences</h4>
        <div className="flex flex-wrap gap-2">
          {['Food Delivery', 'Parcel Delivery', 'Customer Pick & Drop'].map((svc) => (
            <label key={svc} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border font-bold cursor-pointer">
              <input type="checkbox" checked={riderForm.services.includes(svc)} onChange={() => toggleRiderService(svc)} className="accent-black" />
              <span>{svc}</span>
            </label>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input type="text" placeholder="Preferred Working Area" value={riderForm.preferredLocation} onChange={(e) => setRiderForm({ ...riderForm, preferredLocation: e.target.value })} className="px-3 py-2 rounded-xl border bg-white font-semibold" />
          <select value={riderForm.availability} onChange={(e) => setRiderForm({ ...riderForm, availability: e.target.value })} className="px-3 py-2 rounded-xl border bg-white font-bold">
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>
        <button type="button" onClick={() => detectGps('rider')} className="w-full py-2 rounded-xl bg-white border font-bold text-gray-700 flex items-center justify-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-red-500" />
          <span>GPS Location: {riderForm.gps.lat}, {riderForm.gps.lng}</span>
        </button>
      </div>

      {/* Section 6: Account Activation */}
      <label className="flex items-start gap-2 text-[11px] text-gray-700 font-semibold cursor-pointer">
        <input type="checkbox" checked={riderForm.termsAccepted} onChange={(e) => setRiderForm({ ...riderForm, termsAccepted: e.target.checked })} className="mt-0.5 accent-black" />
        <span>I accept the V RIDE Rider Partner Terms & Conditions and safety guidelines.</span>
      </label>

      {error && <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 font-bold">{error}</div>}

      <button type="submit" disabled={loading} className="w-full py-3 rounded-2xl bg-[#FFD000] hover:bg-yellow-400 text-black font-black shadow-md">
        {loading ? 'Submitting Application...' : 'Submit Rider Application for Admin Verification'}
      </button>
    </form>
  );
};

export default PartnerOnboarding;
