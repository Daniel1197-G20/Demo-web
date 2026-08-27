export const BRAND = {
  name: "Tory's Treats",
  tagline: "Artisanal Bakes & Luxury Catering",
  phone: "+234 903 835 8985",
  rawPhone: "+2349038358985",
  whatsappNumber: "2349038358985",
  whatsappUrl: "https://wa.me/2349038358985",
  telUrl: "tel:+2349038358985",
  email: "hello@torystreats.com",
  address: "Victoria Island, Lagos, Nigeria",
  openingHours: "Mon - Sat: 8:00 AM - 7:00 PM | Sun: 10:00 AM - 5:00 PM",
  instagram: "@torystreats_ng",
};

export const USER_ROLES = {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
  STAFF: 'STAFF',
};

export const ORDER_STATUSES = {
  PENDING: { label: 'Request Received', variant: 'warning' },
  CONFIRMED: { label: 'Confirmed by Bakery', variant: 'info' },
  PROCESSING: { label: 'In the Oven (Preparation)', variant: 'secondary' },
  READY: { label: 'Ready for Dispatch / Pickup', variant: 'info' },
  DELIVERED: { label: 'Delivered / Picked Up', variant: 'success' },
  CANCELLED: { label: 'Cancelled', variant: 'error' },
};

export const BOOKING_STATUSES = {
  PENDING: { label: 'Inquiry Received', variant: 'warning' },
  REVIEWING: { label: 'Under Review', variant: 'warning' },
  QUOTED: { label: 'Quote Ready', variant: 'info' },
  CONFIRMED: { label: 'Event Confirmed', variant: 'success' },
  IN_PROGRESS: { label: 'In Preparation', variant: 'secondary' },
  COMPLETED: { label: 'Completed', variant: 'success' },
  REJECTED: { label: 'Declined', variant: 'error' },
};

export const CONTRACT_STATUSES = {
  DRAFT: { label: 'Draft', variant: 'secondary' },
  PUBLISHED: { label: 'Open for Applications', variant: 'success' },
  CLOSED: { label: 'Applications Closed', variant: 'error' },
  ARCHIVED: { label: 'Archived', variant: 'secondary' },
};

export const APPLICATION_STATUSES = {
  SUBMITTED: { label: 'Submitted', variant: 'info' },
  UNDER_REVIEW: { label: 'Under Review', variant: 'warning' },
  SHORTLISTED: { label: 'Shortlisted', variant: 'secondary' },
  APPROVED: { label: 'Approved & Hired', variant: 'success' },
  REJECTED: { label: 'Not Selected', variant: 'error' },
  ARCHIVED: { label: 'Archived', variant: 'secondary' },
};

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Shop Treats', href: '/shop' },
  { name: 'Categories', href: '/categories' },
  { name: 'Events & Experiences', href: '/events' },
  { name: 'Event Catering', href: '/catering' },
  { name: 'Careers & Contracts', href: '/contracts' },
  { name: 'Contact', href: '/contact' },
];

export const ADMIN_NAV_LINKS = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: 'LayoutDashboard' },
  { name: 'Products', href: '/admin/products', icon: 'Cake' },
  { name: 'Categories', href: '/admin/categories', icon: 'Layers' },
  { name: 'Order Requests', href: '/admin/orders', icon: 'ShoppingBag' },
  { name: 'Event Bookings', href: '/admin/bookings', icon: 'CalendarDays' },
  { name: 'Contract Staff', href: '/admin/contracts', icon: 'Briefcase' },
  { name: 'Staff Applications', href: '/admin/contracts/applications', icon: 'Users' },
  { name: 'Customers', href: '/admin/customers', icon: 'UserCheck' },
  { name: 'Demand Analytics', href: '/admin/analytics', icon: 'BarChart3' },
  { name: 'Store Settings', href: '/admin/settings', icon: 'Settings' },
];
