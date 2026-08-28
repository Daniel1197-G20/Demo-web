import { useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from './productsData';
import frontendCache from './cache';

const PRODUCTS_STORAGE_KEY = 'torys_treats_admin_products_v1';
const CATEGORIES_STORAGE_KEY = 'torys_treats_admin_categories_v1';
const BOOKINGS_STORAGE_KEY = 'torys_treats_admin_bookings_v1';
const SETTINGS_STORAGE_KEY = 'torys_treats_admin_settings_v1';

// Initial Mock Categories
const DEFAULT_CATEGORIES = [
  { id: 'cat-1', name: 'Artisanal Cakes', slug: 'artisanal-cakes', description: 'Showstopper celebration & wedding cakes', active: true },
  { id: 'cat-2', name: 'Gourmet Cupcakes', slug: 'gourmet-cupcakes', description: 'Handcrafted frosted cupcake boxes', active: true },
  { id: 'cat-3', name: 'Fresh Pastries', slug: 'fresh-pastries', description: '72-hour laminated French viennoiserie', active: true },
  { id: 'cat-4', name: 'Dessert Cups', slug: 'dessert-cups', description: 'Individual parfaits & tiramisu shooters', active: true },
  { id: 'cat-5', name: 'Celebration Platters', slug: 'celebration-platters', description: 'Curated luxury dessert hampers & platters', active: true },
  { id: 'cat-6', name: 'Event Catering', slug: 'event-catering', description: 'Bespoke event dessert table setups', active: true },
];

// Initial Mock Bookings
const DEFAULT_BOOKINGS = [
  {
    id: 'bk-1',
    bookingNumber: 'TT-BK-202608-2041',
    customer: 'Dr. Bimbo Alabi',
    phone: '09038358985',
    email: 'bimbo@example.com',
    eventType: 'Wedding Reception',
    eventDate: '2026-09-12',
    guests: 150,
    venueLocation: 'Civic Centre, Victoria Island, Lagos',
    foodRequirements: '3-tier custom centerpiece cake, 120 dessert cups, and live chef flambé station.',
    specialRequests: 'Color palette is Rose Gold & Emerald; 15 nut-free dessert portions required.',
    status: 'QUOTED',
    quoteAmount: 450000,
    adminNotes: 'Client confirmed 3 tiers. Proposal PDF sent via WhatsApp.',
    createdAt: '2026-08-25T10:30:00Z',
  },
  {
    id: 'bk-2',
    bookingNumber: 'TT-BK-202608-2040',
    customer: 'Oluwaseun Bakare',
    phone: '08023456789',
    email: 'seun.bakare@fintechcorp.ng',
    eventType: 'Corporate Gala / Product Launch',
    eventDate: '2026-08-30',
    guests: 80,
    venueLocation: 'Eko Hotel & Suites, Victoria Island',
    foodRequirements: 'Corporate branded cupcakes with logo toppers, 80 mini éclair platters, and coffee table setup.',
    specialRequests: 'Brand color is Royal Blue & White.',
    status: 'PENDING',
    quoteAmount: 280000,
    adminNotes: 'Awaiting logo artwork for custom fondant toppers.',
    createdAt: '2026-08-26T08:15:00Z',
  },
  {
    id: 'bk-3',
    bookingNumber: 'TT-BK-202608-2039',
    customer: 'Zainab Dangote',
    phone: '08134567890',
    email: 'zainab.d@lifestyle.com',
    eventType: 'Milestone Birthday Party',
    eventDate: '2026-09-05',
    guests: 200,
    venueLocation: 'The Penthouse Lounge, Ikoyi, Lagos',
    foodRequirements: '4-tier gold-leaf luxury cake, 200 dessert shooters (red velvet & passionfruit), macaron tower.',
    specialRequests: 'Theme is Champagne & Velvet.',
    status: 'CONFIRMED',
    quoteAmount: 620000,
    adminNotes: '50% deposit received. Kitchen scheduled for Sept 4 preparation.',
    createdAt: '2026-08-24T14:20:00Z',
  },
  {
    id: 'bk-4',
    bookingNumber: 'TT-BK-202608-2038',
    customer: 'Kemi Adeleke',
    phone: '08098765432',
    email: 'kemi.adeleke@gmail.com',
    eventType: 'Bridal / Baby Shower',
    eventDate: '2026-09-18',
    guests: 45,
    venueLocation: 'Private Residence, Lekki Phase 1',
    foodRequirements: 'Pastel pink cupcake platter, mini croissant sandwiches, and strawberry mousse cups.',
    specialRequests: 'All eggless or vegetarian-friendly desserts where possible.',
    status: 'CONFIRMED',
    quoteAmount: 175000,
    adminNotes: 'Setup confirmed for 11:00 AM on date of event.',
    createdAt: '2026-08-23T11:00:00Z',
  },
  {
    id: 'bk-5',
    bookingNumber: 'TT-BK-202608-2037',
    customer: 'Femi & Ngozi',
    phone: '07012345678',
    email: 'femi.ngozi@yahoo.com',
    eventType: 'Private Dinner / Tasting',
    eventDate: '2026-09-25',
    guests: 20,
    venueLocation: 'The Atelier Dining Room, VI',
    foodRequirements: '5-course plated dessert tasting with paired sweet wines.',
    specialRequests: 'Anniversary celebration for close family.',
    status: 'PENDING',
    quoteAmount: 120000,
    adminNotes: 'Chef consultation pending.',
    createdAt: '2026-08-26T09:45:00Z',
  },
];

// Initial Store Settings
const DEFAULT_SETTINGS = {
  businessName: "Tory's Treats",
  tagline: 'Artisanal Bakes & Luxury Catering',
  phone: '+234 903 835 8985',
  whatsappNumber: '2349038358985',
  email: 'hello@torystreats.com',
  address: 'Victoria Island, Lagos, Nigeria',
  openingHours: 'Mon - Sat: 8:00 AM - 7:00 PM | Sun: 10:00 AM - 5:00 PM',
  deliveryFee: 2500,
  freeDeliveryThreshold: 50000,
  currencySymbol: '₦',
  currencyCode: 'NGN',
  instagram: '@torystreats_ng',
  ownerName: 'Victoria Elijah',
  ownerEmail: 'victoria@torystreats.com',
  ownerRole: 'Business Owner & Head Pastry Chef',
  notifications: {
    emailOnNewOrder: true,
    whatsappOnBooking: true,
    lowStockAlerts: true,
    dailySummary: true,
  },
};

// Storage Helpers
function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Failed to load ${key} from storage:`, err);
    return fallback;
  }
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new Event('torys_admin_store_updated'));

    // Synchronize frontend query cache
    if (key === PRODUCTS_STORAGE_KEY) {
      frontendCache.invalidate('products');
    } else if (key === CATEGORIES_STORAGE_KEY) {
      frontendCache.invalidate('categories');
    } else if (key === SETTINGS_STORAGE_KEY) {
      frontendCache.invalidate('store:settings');
    } else if (key === BOOKINGS_STORAGE_KEY) {
      frontendCache.invalidate('bookings');
    }
  } catch (err) {
    console.error(`Failed to save ${key} to storage:`, err);
  }
}

// Global Store API
export const adminStore = {
  // Products
  getProducts() {
    return loadFromStorage(PRODUCTS_STORAGE_KEY, MOCK_PRODUCTS);
  },

  getProductById(id) {
    const list = this.getProducts();
    return list.find((p) => String(p.id) === String(id) || p.slug === id);
  },

  addProduct(newProduct) {
    const list = this.getProducts();
    const id = 'treat-' + Date.now();
    const slug = (newProduct.name || 'new-treat')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const product = {
      id,
      slug,
      name: newProduct.name || 'Untitled Treat',
      category: newProduct.category || 'Artisanal Cakes',
      price: Number(newProduct.price) || 0,
      stock: Number(newProduct.stock ?? newProduct.stockQuantity ?? 10),
      images: Array.isArray(newProduct.images) && newProduct.images.length > 0
        ? newProduct.images
        : [newProduct.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80'],
      description: newProduct.description || '',
      servings: newProduct.servings || 'Serves 6 - 8',
      ingredients: newProduct.ingredients || 'European butter, flour, sugar, farm eggs.',
      is_available: Boolean(newProduct.is_available ?? newProduct.isAvailable ?? true),
      is_featured: Boolean(newProduct.is_featured ?? newProduct.isFeatured ?? false),
      badge: newProduct.badge || (newProduct.is_featured ? "Chef's Special" : null),
      rating: 5.0,
      reviewsCount: 1,
      createdAt: new Date().toISOString(),
    };

    const updated = [product, ...list];
    saveToStorage(PRODUCTS_STORAGE_KEY, updated);
    return product;
  },

  updateProduct(id, updates) {
    const list = this.getProducts();
    const index = list.findIndex((p) => String(p.id) === String(id) || p.slug === id);
    if (index === -1) return null;

    const existing = list[index];
    const updatedProduct = {
      ...existing,
      ...updates,
      price: updates.price !== undefined ? Number(updates.price) : existing.price,
      stock: updates.stock !== undefined ? Number(updates.stock) : (updates.stockQuantity !== undefined ? Number(updates.stockQuantity) : existing.stock),
      is_available: updates.is_available !== undefined ? Boolean(updates.is_available) : (updates.isAvailable !== undefined ? Boolean(updates.isAvailable) : existing.is_available),
      is_featured: updates.is_featured !== undefined ? Boolean(updates.is_featured) : (updates.isFeatured !== undefined ? Boolean(updates.isFeatured) : existing.is_featured),
      images: updates.images || (updates.image ? [updates.image] : existing.images),
      updatedAt: new Date().toISOString(),
    };

    list[index] = updatedProduct;
    saveToStorage(PRODUCTS_STORAGE_KEY, list);
    return updatedProduct;
  },

  deleteProduct(id) {
    const list = this.getProducts();
    const filtered = list.filter((p) => String(p.id) !== String(id) && p.slug !== id);
    saveToStorage(PRODUCTS_STORAGE_KEY, filtered);
    return true;
  },

  toggleProductAvailability(id) {
    const p = this.getProductById(id);
    if (!p) return null;
    return this.updateProduct(id, { is_available: !p.is_available });
  },

  // Categories
  getCategories() {
    return loadFromStorage(CATEGORIES_STORAGE_KEY, DEFAULT_CATEGORIES);
  },

  addCategory(categoryData) {
    const list = this.getCategories();
    const slug = (categoryData.slug || categoryData.name || 'category')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newCat = {
      id: 'cat-' + Date.now(),
      name: categoryData.name,
      slug,
      description: categoryData.description || '',
      active: Boolean(categoryData.active ?? true),
    };

    const updated = [...list, newCat];
    saveToStorage(CATEGORIES_STORAGE_KEY, updated);
    return newCat;
  },

  updateCategory(id, updates) {
    const list = this.getCategories();
    const index = list.findIndex((c) => String(c.id) === String(id));
    if (index === -1) return null;

    list[index] = { ...list[index], ...updates };
    saveToStorage(CATEGORIES_STORAGE_KEY, list);
    return list[index];
  },

  deleteCategory(id) {
    const list = this.getCategories();
    const filtered = list.filter((c) => String(c.id) !== String(id));
    saveToStorage(CATEGORIES_STORAGE_KEY, filtered);
    return true;
  },

  // Bookings
  getBookings() {
    return loadFromStorage(BOOKINGS_STORAGE_KEY, DEFAULT_BOOKINGS);
  },

  getBookingByNumber(num) {
    const list = this.getBookings();
    return list.find((b) => b.bookingNumber === num || String(b.id) === String(num));
  },

  updateBooking(idOrNumber, updates) {
    const list = this.getBookings();
    const index = list.findIndex((b) => b.bookingNumber === idOrNumber || String(b.id) === String(idOrNumber));
    if (index === -1) return null;

    list[index] = { ...list[index], ...updates, updatedAt: new Date().toISOString() };
    saveToStorage(BOOKINGS_STORAGE_KEY, list);
    return list[index];
  },

  // Settings
  getSettings() {
    return loadFromStorage(SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS);
  },

  updateSettings(updates) {
    const current = this.getSettings();
    const updated = { ...current, ...updates };
    saveToStorage(SETTINGS_STORAGE_KEY, updated);
    return updated;
  },

  // Dashboard Overview Stats
  getStats() {
    const products = this.getProducts();
    const bookings = this.getBookings();
    const activeProducts = products.filter((p) => p.is_available).length;
    const pendingBookings = bookings.filter((b) => b.status === 'PENDING' || b.status === 'REVIEWING').length;
    const confirmedBookings = bookings.filter((b) => b.status === 'CONFIRMED' || b.status === 'QUOTED').length;

    return {
      totalProducts: products.length,
      activeProducts,
      soldOutProducts: products.length - activeProducts,
      totalBookings: bookings.length,
      pendingBookings,
      confirmedBookings,
      recentProducts: products.slice(0, 5),
      recentBookings: bookings.slice(0, 5),
    };
  },
};

// React Hook to subscribe to admin store updates
export function useAdminStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const handleUpdate = () => setTick((t) => t + 1);
    window.addEventListener('torys_admin_store_updated', handleUpdate);
    return () => window.removeEventListener('torys_admin_store_updated', handleUpdate);
  }, []);

  return adminStore;
}
