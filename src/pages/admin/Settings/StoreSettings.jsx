import React, { useState, useEffect } from 'react';
import {
  Save,
  Store,
  Palette,
  User,
  Bell,
  CheckCircle2,
  Heart,
  Phone,
  Mail,
  MapPin,
  Truck,
  Sparkles,
  Info,
} from 'lucide-react';
import { useAdminStore } from '../../../lib/adminStore';
import { useToast } from '../../../hooks/useToast';
import { useCachedData } from '../../../hooks/useCachedData';
import { CACHE_TTL } from '../../../lib/cache';
import AdminToggle from '../../../components/admin/AdminToggle';
import { SkeletonForm, Skeleton } from '../../../components/ui/Skeleton';
import Tooltip, { TooltipInfo } from '../../../components/ui/Tooltip';

export default function StoreSettings() {
  const store = useAdminStore();
  const toast = useToast();

  const { data: cachedSettings, isLoading, setData: setSettingsCache } = useCachedData(
    'store:settings',
    () => store.getSettings(),
    { ttl: CACHE_TTL.SETTINGS }
  );

  const currentSettings = cachedSettings || store.getSettings();

  const [formData, setFormData] = useState({
    businessName: currentSettings.businessName || "Tory's Treats",
    phone: currentSettings.phone || '+234 903 835 8985',
    whatsappNumber: currentSettings.whatsappNumber || '2349038358985',
    email: currentSettings.email || 'hello@torystreats.com',
    address: currentSettings.address || 'Victoria Island, Lagos, Nigeria',
    openingHours: currentSettings.openingHours || 'Mon - Sat: 8:00 AM - 7:00 PM',
    deliveryFee: String(currentSettings.deliveryFee || 2500),
    freeDeliveryThreshold: String(currentSettings.freeDeliveryThreshold || 50000),
    ownerName: currentSettings.ownerName || 'Victoria Elijah',
    ownerEmail: currentSettings.ownerEmail || 'victoria@torystreats.com',
    ownerRole: currentSettings.ownerRole || 'Business Owner & Head Pastry Chef',
    notifications: {
      emailOnNewOrder: currentSettings.notifications?.emailOnNewOrder ?? true,
      whatsappOnBooking: currentSettings.notifications?.whatsappOnBooking ?? true,
      lowStockAlerts: currentSettings.notifications?.lowStockAlerts ?? true,
      dailySummary: currentSettings.notifications?.dailySummary ?? true,
    },
  });

  useEffect(() => {
    if (cachedSettings) {
      setFormData({
        businessName: cachedSettings.businessName || "Tory's Treats",
        phone: cachedSettings.phone || '+234 903 835 8985',
        whatsappNumber: cachedSettings.whatsappNumber || '2349038358985',
        email: cachedSettings.email || 'hello@torystreats.com',
        address: cachedSettings.address || 'Victoria Island, Lagos, Nigeria',
        openingHours: cachedSettings.openingHours || 'Mon - Sat: 8:00 AM - 7:00 PM',
        deliveryFee: String(cachedSettings.deliveryFee || 2500),
        freeDeliveryThreshold: String(cachedSettings.freeDeliveryThreshold || 50000),
        ownerName: cachedSettings.ownerName || 'Victoria Elijah',
        ownerEmail: cachedSettings.ownerEmail || 'victoria@torystreats.com',
        ownerRole: cachedSettings.ownerRole || 'Business Owner & Head Pastry Chef',
        notifications: {
          emailOnNewOrder: cachedSettings.notifications?.emailOnNewOrder ?? true,
          whatsappOnBooking: cachedSettings.notifications?.whatsappOnBooking ?? true,
          lowStockAlerts: cachedSettings.notifications?.lowStockAlerts ?? true,
          dailySummary: cachedSettings.notifications?.dailySummary ?? true,
        },
      });
    }
  }, [cachedSettings]);

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);

    const updated = {
      ...formData,
      deliveryFee: Number(formData.deliveryFee) || 0,
      freeDeliveryThreshold: Number(formData.freeDeliveryThreshold) || 0,
    };

    // Optimistic cache update
    setSettingsCache(updated);

    try {
      store.updateSettings(updated);
      toast.success('Business parameters & profile updated successfully!', 'Settings Saved');
    } catch (err) {
      console.error('Failed to update settings:', err);
      toast.error('Failed to save settings. Please retry.', 'Error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl pb-12">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#2B2024]">
              Store &amp; Business Settings
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFF5F8] text-[#E82C7C] border border-[#FCE4EC] text-xs font-bold">
              Business Preferences
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#7A6B70] mt-1">
            Manage your store information, Lagos delivery charges, owner profile, and notifications.
          </p>
        </div>

        <div className="self-start sm:self-auto px-3.5 py-1.5 rounded-2xl bg-[#FFF5F8] border border-[#FCE4EC] text-[11px] font-bold text-[#E82C7C] flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Local Store Mode (Frontend Testing)</span>
        </div>
      </div>

      {isLoading ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#F7DCE5] shadow-[0_4px_20px_rgba(232,44,124,0.04)] space-y-6" aria-busy="true">
          <SkeletonForm fields={6} />
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* ─────────────────────────────────────────────────────────────
              2. BUSINESS INFORMATION
          ───────────────────────────────────────────────────────────── */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#F7DCE5] shadow-[0_4px_20px_rgba(232,44,124,0.04)] space-y-5">
            <div className="border-b border-[#F7DCE5] pb-3 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FFF5F8] border border-[#FCE4EC] flex items-center justify-center text-[#E82C7C]">
                <Store className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-base text-[#2B2024]">
                  Business Details &amp; Contact
                </h3>
                <p className="text-xs text-[#7A6B70]">
                  Public brand identity shown across checkout and receipts
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2B2024]">Store Brand Name</label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full h-11 px-4 bg-white border border-[#F7DCE5] rounded-2xl text-sm text-[#2B2024] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2B2024]">Official Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-11 px-4 bg-white border border-[#F7DCE5] rounded-2xl text-sm text-[#2B2024] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-bold text-[#2B2024]">WhatsApp Business Phone</label>
                  <TooltipInfo content="Used for direct customer orders and automated WhatsApp links" />
                </div>
                <input
                  type="text"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  placeholder="2349038358985"
                  className="w-full h-11 px-4 bg-white border border-[#F7DCE5] rounded-2xl text-sm font-mono text-[#2B2024] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2B2024]">Direct Call Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-11 px-4 bg-white border border-[#F7DCE5] rounded-2xl text-sm text-[#2B2024] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-[#2B2024]">Bakery &amp; Atelier Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full h-11 px-4 bg-white border border-[#F7DCE5] rounded-2xl text-sm text-[#2B2024] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC]"
                />
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              3. LAGOS DELIVERY & RATES
          ───────────────────────────────────────────────────────────── */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#F7DCE5] shadow-[0_4px_20px_rgba(232,44,124,0.04)] space-y-5">
            <div className="border-b border-[#F7DCE5] pb-3 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FFF5F8] border border-[#FCE4EC] flex items-center justify-center text-[#E82C7C]">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-base text-[#2B2024]">
                  Lagos Delivery Logistics &amp; Fees
                </h3>
                <p className="text-xs text-[#7A6B70]">
                  Configure standard dispatch charges across Lagos State
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-bold text-[#2B2024]">Standard Delivery Rate (₦)</label>
                  <TooltipInfo content="Flat delivery fee applied at checkout for standard Lagos addresses" />
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-4 font-bold text-[#E82C7C] text-sm">₦</span>
                  <input
                    type="number"
                    step="500"
                    value={formData.deliveryFee}
                    onChange={(e) => setFormData({ ...formData, deliveryFee: e.target.value })}
                    className="w-full h-11 pl-8 pr-4 bg-white border border-[#F7DCE5] rounded-2xl text-sm font-bold text-[#2B2024] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-bold text-[#2B2024]">Free Delivery Threshold (₦)</label>
                  <TooltipInfo content="Cart totals above this amount automatically qualify for free shipping" />
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-4 font-bold text-[#E82C7C] text-sm">₦</span>
                  <input
                    type="number"
                    step="1000"
                    value={formData.freeDeliveryThreshold}
                    onChange={(e) => setFormData({ ...formData, freeDeliveryThreshold: e.target.value })}
                    className="w-full h-11 pl-8 pr-4 bg-white border border-[#F7DCE5] rounded-2xl text-sm font-bold text-[#2B2024] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC]"
                  />
                </div>
              </div>
            </div>
          </div>

        {/* ─────────────────────────────────────────────────────────────
            4. BRAND COLORS PREVIEW (PINK + WHITE)
        ───────────────────────────────────────────────────────────── */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#F7DCE5] shadow-[0_4px_20px_rgba(232,44,124,0.04)] space-y-4">
          <div className="border-b border-[#F7DCE5] pb-3 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FFF5F8] border border-[#FCE4EC] flex items-center justify-center text-[#E82C7C]">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base text-[#2B2024]">
                Brand Colors &amp; Visual Identity
              </h3>
              <p className="text-xs text-[#7A6B70]">
                Active dashboard branding palette (Pink + White)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl border border-[#F7DCE5] bg-white space-y-2">
              <div className="w-full h-10 rounded-xl bg-[#E82C7C] shadow-xs" />
              <div>
                <span className="font-bold text-xs text-[#2B2024] block">Primary Pink</span>
                <span className="font-mono text-[11px] text-[#7A6B70]">#E82C7C</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl border border-[#F7DCE5] bg-white space-y-2">
              <div className="w-full h-10 rounded-xl bg-[#FCE4EC] border border-[#F7DCE5]" />
              <div>
                <span className="font-bold text-xs text-[#2B2024] block">Light Pink</span>
                <span className="font-mono text-[11px] text-[#7A6B70]">#FCE4EC</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl border border-[#F7DCE5] bg-white space-y-2">
              <div className="w-full h-10 rounded-xl bg-[#FFF5F8] border border-[#FCE4EC]" />
              <div>
                <span className="font-bold text-xs text-[#2B2024] block">Soft Pink</span>
                <span className="font-mono text-[11px] text-[#7A6B70]">#FFF5F8</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl border border-[#F7DCE5] bg-white space-y-2">
              <div className="w-full h-10 rounded-xl bg-white border border-stone-300" />
              <div>
                <span className="font-bold text-xs text-[#2B2024] block">Pure White</span>
                <span className="font-mono text-[11px] text-[#7A6B70]">#FFFFFF</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            5. OWNER PROFILE (VICTORIA)
        ───────────────────────────────────────────────────────────── */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#F7DCE5] shadow-[0_4px_20px_rgba(232,44,124,0.04)] space-y-5">
          <div className="border-b border-[#F7DCE5] pb-3 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FFF5F8] border border-[#FCE4EC] flex items-center justify-center text-[#E82C7C]">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base text-[#2B2024]">
                Administrator &amp; Owner Profile
              </h3>
              <p className="text-xs text-[#7A6B70]">
                Logged-in owner profile details
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FFF5F8] border border-[#FCE4EC]">
            <div className="w-14 h-14 rounded-2xl bg-[#E82C7C] text-white font-black text-xl flex items-center justify-center shadow-[0_4px_12px_rgba(232,44,124,0.3)] shrink-0">
              V
            </div>
            <div>
              <h4 className="font-display font-extrabold text-base text-[#2B2024]">
                {formData.ownerName}
              </h4>
              <p className="text-xs text-[#E82C7C] font-bold mt-0.5">{formData.ownerRole}</p>
              <p className="text-[11px] text-[#7A6B70] mt-0.5">{formData.ownerEmail}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2B2024]">Full Name</label>
              <input
                type="text"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                className="w-full h-11 px-4 bg-white border border-[#F7DCE5] rounded-2xl text-sm text-[#2B2024] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2B2024]">Owner Email</label>
              <input
                type="email"
                value={formData.ownerEmail}
                onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                className="w-full h-11 px-4 bg-white border border-[#F7DCE5] rounded-2xl text-sm text-[#2B2024] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC]"
              />
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            6. NOTIFICATION TOGGLES
        ───────────────────────────────────────────────────────────── */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#F7DCE5] shadow-[0_4px_20px_rgba(232,44,124,0.04)] space-y-4">
          <div className="border-b border-[#F7DCE5] pb-3 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FFF5F8] border border-[#FCE4EC] flex items-center justify-center text-[#E82C7C]">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base text-[#2B2024]">
                Notification Preferences
              </h3>
              <p className="text-xs text-[#7A6B70]">
                Choose how you wish to receive incoming customer updates
              </p>
            </div>
          </div>

          <div className="divide-y divide-[#F7DCE5]">
            <AdminToggle
              label="Instant WhatsApp Event Alerts"
              description="Receive immediate WhatsApp messages when customers submit a catering or wedding quote inquiry."
              checked={formData.notifications.whatsappOnBooking}
              onChange={(val) =>
                setFormData({
                  ...formData,
                  notifications: { ...formData.notifications, whatsappOnBooking: val },
                })
              }
            />

            <AdminToggle
              label="Email Order Notifications"
              description="Receive an email copy when a customer submits a treat order request."
              checked={formData.notifications.emailOnNewOrder}
              onChange={(val) =>
                setFormData({
                  ...formData,
                  notifications: { ...formData.notifications, emailOnNewOrder: val },
                })
              }
            />

            <AdminToggle
              label="Daily Morning Kitchen Summary"
              description="Receive a morning recap of scheduled pickups, deliveries and pending quotes at 7:30 AM."
              checked={formData.notifications.dailySummary}
              onChange={(val) =>
                setFormData({
                  ...formData,
                  notifications: { ...formData.notifications, dailySummary: val },
                })
              }
            />
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            7. SAVE ACTION BUTTON
        ───────────────────────────────────────────────────────────── */}
        <div className="flex justify-end pt-2">
          <Tooltip content="Save all store configurations & delivery preferences" position="top">
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3.5 rounded-full bg-[#E82C7C] hover:bg-[#D31665] text-white text-sm font-bold shadow-[0_4px_16px_rgba(232,44,124,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto focus-ring"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving Settings...' : 'Save Settings'}</span>
            </button>
          </Tooltip>
        </div>
      </form>
      )}
    </div>
  );
}
