/**
 * Format a numeric amount to Nigerian Naira currency (₦)
 * @param {number} amount
 * @returns {string} e.g. "₦4,500"
 */
export function formatCurrency(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '₦0';
  }
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a date string into human readable form
 * @param {string|Date} date
 * @returns {string} e.g. "24 Aug 2026"
 */
export function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(d);
}

/**
 * Generate a WhatsApp chat URL with prefilled text
 * @param {string} phone - e.g. "2348001234567"
 * @param {string} text - message
 * @returns {string}
 */
export function createWhatsAppUrl(phone, text) {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
