import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Calendar,
  Users,
  MapPin,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { useAdminStore } from '../../../lib/adminStore';
import { formatCurrency, formatDate, createWhatsAppUrl } from '../../../lib/formatters';
import { useToast } from '../../../hooks/useToast';
import AdminBadge from '../../../components/admin/AdminBadge';

export default function BookingDetails() {
  const { bookingNumber } = useParams();
  const navigate = useNavigate();
  const store = useAdminStore();
  const toast = useToast();

  const booking = store.getBookingByNumber(bookingNumber);

  const [quoteAmount, setQuoteAmount] = useState('450000');
  const [status, setStatus] = useState('QUOTED');
  const [adminNotes, setAdminNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (booking) {
      setQuoteAmount(String(booking.quoteAmount || ''));
      setStatus(booking.status || 'PENDING');
      setAdminNotes(booking.adminNotes || '');
    }
  }, [booking]);

  if (!booking) {
    return (
      <div className="space-y-4 text-center py-16">
        <h2 className="text-xl font-bold font-display text-[#2B2024]">Booking Not Found</h2>
        <p className="text-xs text-[#7A6B70]">The requested booking inquiry could not be located.</p>
        <Link to="/admin/bookings" className="inline-block mt-3 text-xs font-bold text-[#E82C7C] hover:underline">
          &larr; Back to all bookings
        </Link>
      </div>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      store.updateBooking(booking.bookingNumber, {
        quoteAmount: Number(quoteAmount) || 0,
        status,
        adminNotes,
      });
      toast.success('Catering quote and booking stage updated successfully!', 'Proposal Saved');
    }, 600);
  };

  const whatsappUrl = createWhatsAppUrl(
    booking.phone || '2349038358985',
    `Hello ${booking.customer}! This is Victoria from Tory's Treats regarding your event catering inquiry ${booking.bookingNumber}. We have formulated your tailored dessert quote!`
  );

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & STATUS CONTEXT
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/bookings"
            className="p-2.5 rounded-2xl bg-white border border-[#F7DCE5] text-[#2B2024] hover:text-[#E82C7C] hover:border-[#E82C7C] transition-all shadow-xs"
            aria-label="Back to bookings"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-extrabold uppercase text-[#E82C7C]">
                {booking.bookingNumber}
              </span>
              <AdminBadge
                variant={
                  status === 'CONFIRMED'
                    ? 'success'
                    : status === 'QUOTED'
                    ? 'info'
                    : status === 'PENDING'
                    ? 'warning'
                    : 'neutral'
                }
                size="sm"
                dot
              >
                {status}
              </AdminBadge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#2B2024]">
              {booking.customer}’s Event
            </h1>
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-xs transition-all active:scale-95"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp Client</span>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* ─────────────────────────────────────────────────────────────
            2. CLIENT & EVENT SPECIFICATIONS (7 cols)
        ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-7 space-y-6">
          {/* Specifications Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#F7DCE5] shadow-[0_4px_20px_rgba(232,44,124,0.04)] space-y-5">
            <div className="border-b border-[#F7DCE5] pb-3 flex items-center justify-between">
              <h3 className="font-display font-extrabold text-base text-[#2B2024]">
                Event Specifications
              </h3>
              <span className="text-[11px] text-[#7A6B70]">
                Logged {formatDate(booking.createdAt || '2026-08-25')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-[#7A6B70] block text-[11px] font-bold uppercase">Client Name</span>
                <span className="font-extrabold text-[#2B2024]">{booking.customer}</span>
              </div>
              <div>
                <span className="text-[#7A6B70] block text-[11px] font-bold uppercase">Phone / WhatsApp</span>
                <span className="font-bold text-[#2B2024]">{booking.phone}</span>
              </div>
              <div>
                <span className="text-[#7A6B70] block text-[11px] font-bold uppercase">Event Type</span>
                <span className="font-extrabold text-[#E82C7C]">{booking.eventType}</span>
              </div>
              <div>
                <span className="text-[#7A6B70] block text-[11px] font-bold uppercase">Date &amp; Guests</span>
                <span className="font-bold text-[#2B2024]">
                  {formatDate(booking.eventDate)} • {booking.guests} Guests
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-[#7A6B70] block text-[11px] font-bold uppercase">Venue &amp; Location</span>
                <span className="font-bold text-[#2B2024]">{booking.venueLocation}</span>
              </div>
            </div>

            {/* Treat Requirements */}
            <div className="pt-2">
              <span className="text-[#7A6B70] block text-[11px] font-bold uppercase mb-1.5">
                Requested Treats &amp; Dessert Styling:
              </span>
              <p className="text-xs sm:text-sm text-[#2B2024] bg-[#FFF5F8] p-4 rounded-2xl border border-[#FCE4EC] leading-relaxed">
                {booking.foodRequirements || 'Custom wedding cake and dessert table arrangement.'}
              </p>
            </div>

            {/* Special Notes */}
            {booking.specialRequests && (
              <div>
                <span className="text-[#7A6B70] block text-[11px] font-bold uppercase mb-1.5">
                  Dietary / Theme Preferences:
                </span>
                <p className="text-xs text-[#2B2024] bg-stone-50 p-3.5 rounded-2xl border border-stone-200 leading-relaxed">
                  {booking.specialRequests}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. QUOTE & STAGE CONTROLS (5 cols)
        ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-5 space-y-6">
          <form
            onSubmit={handleSave}
            className="p-6 sm:p-7 rounded-3xl bg-white border border-[#F7DCE5] shadow-[0_4px_20px_rgba(232,44,124,0.04)] space-y-5"
          >
            <div className="border-b border-[#F7DCE5] pb-3">
              <h3 className="font-display font-extrabold text-base text-[#2B2024]">
                Quote Formulation &amp; Stage
              </h3>
              <p className="text-xs text-[#7A6B70] mt-0.5">
                Set estimated catering fee and current workflow stage.
              </p>
            </div>

            {/* Quote Amount */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2B2024]">
                Estimated Quote Amount (NGN ₦)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 font-bold text-[#E82C7C] text-sm">
                  ₦
                </span>
                <input
                  type="number"
                  step="1000"
                  value={quoteAmount}
                  onChange={(e) => setQuoteAmount(e.target.value)}
                  className="w-full h-11 pl-8 pr-4 bg-white border border-[#F7DCE5] rounded-2xl text-sm font-bold text-[#2B2024] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC] transition-all"
                  placeholder="450000"
                />
              </div>
              <p className="text-[11px] text-[#7A6B70]">Shared with the client in their proposal PDF.</p>
            </div>

            {/* Booking Stage Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2B2024]">
                Booking Stage
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-11 px-4 bg-white border border-[#F7DCE5] rounded-2xl text-xs sm:text-sm font-bold text-[#2B2024] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC] transition-all cursor-pointer"
              >
                <option value="PENDING">1. New Inquiry Received (Pending)</option>
                <option value="REVIEWING">2. Under Kitchen Review</option>
                <option value="QUOTED">3. Quote Formulated &amp; Sent</option>
                <option value="CONFIRMED">4. Event Confirmed &amp; Booked</option>
                <option value="COMPLETED">5. Event Completed</option>
                <option value="CANCELLED">6. Declined / Cancelled</option>
              </select>
            </div>

            {/* Admin Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2B2024]">
                Admin Internal Notes
              </label>
              <textarea
                rows={3}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="e.g. Discussed setup time with planner. 50% deposit received."
                className="w-full p-3 bg-white border border-[#F7DCE5] rounded-2xl text-xs text-[#2B2024] placeholder:text-[#7A6B70] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC] transition-all leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-3.5 rounded-full bg-[#E82C7C] hover:bg-[#D31665] text-white text-xs sm:text-sm font-bold shadow-[0_4px_14px_rgba(232,44,124,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Updating...' : 'Save Proposal & Stage'}</span>
            </button>
          </form>

          {/* Quick Client Consultation Box */}
          <div className="p-5 rounded-3xl bg-[#FFF5F8] border border-[#FCE4EC] space-y-3 text-xs">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#2B2024]">
              Direct Client Contacts
            </h4>
            <div className="space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#F7DCE5] hover:border-[#25D366] text-[#2B2024] font-bold transition-all shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
                  <span>WhatsApp: {booking.phone}</span>
                </div>
                <span className="text-[#25D366] text-xs">&rarr;</span>
              </a>

              <a
                href={`tel:${booking.phone}`}
                className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#F7DCE5] hover:border-[#E82C7C] text-[#2B2024] font-bold transition-all shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#E82C7C]" />
                  <span>Call: {booking.phone}</span>
                </div>
                <span className="text-[#E82C7C] text-xs">Call</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
