# V RIDE – Complete All-in-One Mobility & Delivery Ecosystem

![V RIDE Brand](https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&auto=format&fit=crop&q=80)

**V RIDE** is a unified, production-ready on-demand mobility, logistics, and delivery platform that integrates four core services into a single ecosystem:

1. 🛵 **Bike, Auto and Cab Booking** (Daily commute with GPS routing, fare estimation, OTP start, live tracking)
2. 📦 **Parcel Pickup and Drop** (Doorstep courier delivery across city with weight categorization & double OTP)
3. 📄 **Pick & Drop Services** (Rapid point-to-point document & item dispatch)
4. 🍲 **Online Food Ordering and Delivery** (Curated restaurants like Paradise Biryani, live menus, cart, discounts, real-time rider dispatch)

---

## 📱 Ecosystem Architecture

The V RIDE ecosystem consists of four interconnected applications powered by a single centralized backend and persistent database:

| Component | Platform | Primary Purpose |
| :--- | :--- | :--- |
| **Customer App** | Web / Mobile (Android & iOS) | Service selection, ride booking, parcel dispatch, food ordering, live tracking, wallet & payment |
| **Delivery Partner App** | Android Mobile / Web | Online/Offline toggle, incoming job alerts, GPS navigation, OTP validation, earnings & withdrawal |
| **Super Admin Dashboard**| Responsive Web | Executive KPIs, driver KYC verification, live order dispatch, pricing rules, payouts & broadcasts |
| **Official Website** | Responsive Web | Public brand portal, service showcases, partner onboarding form, app downloads, safety guidelines |
| **Centralized Backend** | Node.js + Express + REST | Authentication, pricing engine, booking transactions, wallet, partner assignment, and real-time state |

---

## 🎨 Brand Identity & Design System

- **Primary Brand Color**: Bright V RIDE Yellow (`#FFCC00`)
- **Secondary Brand Color**: Pitch Black (`#111111`)
- **Backgrounds**: Pure White (`#FFFFFF`) and Soft Slate (`#F8F9FA` / `#1C1C1E`)
- **Typography**: Inter (Google Fonts)
- **Design Tokens**: Rounded cards (`rounded-2xl`, `rounded-3xl`), glowing action buttons, interactive GPS road network maps, and bottom navigation.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 1. Installation
Clone repository and install dependencies:
```bash
git clone https://github.com/shaikmuzammil2905/v-ride.git
cd v-ride

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Start the Backend Server (Port 5000)
```bash
cd backend
npm run dev
```
The centralized REST API will be accessible at `http://localhost:5000/api`.
The SQLite/JSON database will automatically initialize and seed with Hyderabad test data (Miyapur, Kukatpally, Gachibowli, Jubilee Hills, Paradise Biryani, rider Ramesh K).

### 3. Start the Frontend Application (Port 5173)
```bash
cd frontend
npm run dev
```
Open `http://localhost:5173` in your browser.

Use the **Top App Switcher Bar** to jump between:
- 📱 **Customer Mobile App** (toggle between Phone Frame and Full Screen)
- 🛵 **Delivery Partner App**
- 💼 **Super Admin Dashboard**
- 🌐 **Official Website**

---

## 📋 Comprehensive Feature Checklist

### 1. Customer Application
- [x] **Splash & Onboarding**: Animated logo, service introduction, OTP authentication.
- [x] **Home Dashboard**: Matches reference UI pixel-for-pixel (Hi Sri Latha 👋, Miyapur location selector, 4 service cards, "Send Parcels Fast & Safe" promo banner, "Flat 20% OFF" food offer, bottom navigation).
- [x] **Ride Booking**: Bike / Auto / Car selector, fare range calculation (₹56 - ₹72), interactive SVG road map with animated bike polyline, driver assignment ("Ramesh K"), OTP start ("7391"), SOS emergency button, trip completion.
- [x] **Parcel Delivery**: Miyapur to Gachibowli, parcel sizes (Small ≤ 1kg, Medium 1-5kg, Large > 5kg), Item category dropdown, Pickup OTP ("6192") & Delivery OTP ("4018").
- [x] **Pick & Drop**: Jubilee Hills to Banjara Hills, Documents/Item/Other categorization, special delivery notes.
- [x] **Food Ordering**: Search restaurants, cuisine filters (Biryani, Pizza, Burgers, Meals), Paradise Biryani, Domino's, Subway, Bawarchi.
- [x] **Restaurant Details & Cart**: Veg / Non-veg badges, item add-ons, quantity adjustment, coupon `VRIDE20` auto-applied, tax & delivery fee breakup.
- [x] **Live Order Tracking**: Exact replica of reference screen 8 (Arriving in 8 min, Order Placed -> Preparing -> Picked Up -> Arriving stepper, rider card with phone/chat, delivery OTP "4829").
- [x] **Wallet & Transactions**: Balance display, instant top-up via UPI / Cards, transaction ledger.
- [x] **Support & Profile**: Support ticket raising, FAQ accordion, emergency hotline, saved addresses manager.

### 2. Delivery Partner Application
- [x] **Partner Registration & KYC**: Vehicle model (Bajaj Pulsar 150), license number, document verification checklist.
- [x] **Online / Offline Toggle**: Real-time state change with radar scanning animation.
- [x] **Incoming Job Modal**: 15-second audio/visual alert with upfront earnings (₹58), distance, pickup and drop locations.
- [x] **Job Workflow**: Step-by-step navigation -> Reached Pickup -> OTP validation -> Trip Start -> Trip Completion.
- [x] **Earnings & Payouts**: Daily earnings (₹580), weekly earnings (₹3,720), bank withdrawal requests to HDFC Bank.

### 3. Super Admin Dashboard
- [x] **Executive KPIs**: Total revenue (₹14.82 Lakhs), total trips (16,470), active drivers (128 online), pending KYC.
- [x] **Driver KYC Review**: Instant Approve / Reject buttons for driver documents.
- [x] **Customer Accounts**: Block / Unblock customer access.
- [x] **Dynamic Pricing Rules**: Configure base fare, per-km charge, and commission % for Bike, Auto, Cab, and Parcels.
- [x] **Payout Approvals**: Approve or reject partner bank withdrawal requests.
- [x] **Push Notification Broadcaster**: Send city-wide push notifications to customers or partners.

### 4. Official Website
- [x] **Hero Section**: High-converting messaging, app store buttons, mobile mockup preview.
- [x] **Interactive Services**: Live tab switcher for Rides, Parcels, Pick & Drop, and Food.
- [x] **Partner Application Portal**: Interactive weekly earnings calculator based on daily hours worked.
- [x] **Safety & Trust**: Verified fleet background checks, 24/7 SOS helpline, and OTP security.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React Icons, Leaflet / SVG Vector Mapping
- **Backend**: Node.js, Express, CORS, Morgan, Dotenv, UUID
- **Database**: ACID JSON / SQLite storage engine with automated seed migrations
- **APIs**: RESTful endpoints with mock fallback adapter for offline reliability

---

## 🔐 Security & Production Notes

- **Secrets Management**: Keep JWT secrets and gateway API keys in `.env`.
- **Role-Based Authorization**: Distinct access controls for Customers, Delivery Partners, and Admin personnel.
- **Two-Factor OTP**: Rides and parcels require cryptographic 4-digit verification before starting and ending.
- **Data Persistence**: All bookings, wallet top-ups, orders, and KYC approvals persist across sessions.

---

## 📄 License & Attribution
Prepared for **CODTECH IT SOLUTIONS PRIVATE LIMITED** under the V RIDE Master Development Project.
All rights reserved © 2026.
