import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'vride_db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class Database {
  constructor() {
    this.data = {
      users: [],
      partners: [],
      rides: [],
      parcels: [],
      pickdrops: [],
      restaurants: [],
      menuItems: [],
      foodOrders: [],
      transactions: [],
      coupons: [],
      supportTickets: [],
      pricingRules: [],
      payouts: [],
      banners: [],
      notifications: [],
      authAccounts: [],
      otpRecords: [],
      passwordResets: [],
      auditLogs: [],
      vendorCategories: [],
      vendorOffers: [],
      vendorReviews: [],
      vendorStaff: [],
      sosEvents: [],
      onboardingApplications: [],
      settings: {}
    };
    this.init();
  }

  init() {
    if (fs.existsSync(DB_FILE)) {
      try {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(fileContent);
      } catch (err) {
        console.error('Error reading DB file, reinitializing:', err.message);
        this.save();
      }
    } else {
      this.save();
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving DB file:', err.message);
    }
  }

  get(table) {
    if (!this.data[table]) {
      this.data[table] = [];
    }
    return this.data[table];
  }

  findById(table, id) {
    const list = this.get(table);
    return list.find(item => String(item.id) === String(id));
  }

  filter(table, predicate) {
    return this.get(table).filter(predicate);
  }

  insert(table, item) {
    const list = this.get(table);
    list.unshift(item);
    this.save();
    return item;
  }

  update(table, id, updates) {
    const list = this.get(table);
    const index = list.findIndex(item => String(item.id) === String(id));
    if (index !== -1) {
      list[index] = { ...list[index], ...updates, updatedAt: new Date().toISOString() };
      this.save();
      return list[index];
    }
    return null;
  }

  delete(table, id) {
    const list = this.get(table);
    const index = list.findIndex(item => String(item.id) === String(id));
    if (index !== -1) {
      const removed = list.splice(index, 1);
      this.save();
      return removed[0];
    }
    return null;
  }

  reset(newData) {
    this.data = newData;
    this.save();
  }
}

export const db = new Database();
export default db;
