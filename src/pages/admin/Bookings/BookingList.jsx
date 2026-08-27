import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Eye,
  MessageCircle,
  Clock,
  CheckCircle2,
  Users,
  MapPin,
  Sparkles,
  ArrowRight,
  Filter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAdminStore } from '../../../lib/adminStore';
import { formatDate, formatCurrency, createWhatsAppUrl } from '../../../lib/formatters';
import { useToast } from '../../../hooks/useToast';
import AdminSearchBar from '../../../components/admin/AdminSearchBar';
import AdminFilterPill from '../../../components/admin/AdminFilterPill';
import AdminBadge from '../../../components/admin/AdminBadge';
import AdminModal from '../../../components/admin/AdminModal';

export default function BookingList() {
  const store = useAdminStore();
  const toast = useToast();
  const bookings = store.getBookings();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [quickViewBooking, setQuickViewBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;

  const STATUS_FILTERS = [
    { label: 'All Inquiries', value: 'ALL' },
    { label: 'Pending', value: 'PENDING' },
    { label: 'Quoted', value: 'QUOTED' },
    { label: 'Confirmed', value: 'CONFIRMED' },
    { label: 'Completed', value: 'COMPLETED' },
  ];

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesSearch =
        b.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.venueLocation && b.venueLocation.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        selectedStatus === 'ALL' || b.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchQuery, selectedStatus]);

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE) || 1;
  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBookings.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBookings, currentPage]);

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  // Fast status updater
  const handleQuickStatusChange = (bookingNumber, newStatus) => {
    store.updateBooking(bookingNumber, { status: newStatus });
    toast.success(`Booking ${bookingNumber} status updated to ${newStatus}.`, 'Stage Updated');
    if (quickViewBooking && quickViewBooking.bookingNumber === bookingNumber) {
      setQuickViewBooking({ ...quickViewBooking, status: newStatus });
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return <AdminBadge variant="success" dot>Event Confirmed</AdminBadge>;
      case 'QUOTED':
        return <AdminBadge variant="info" dot>Quote Ready</AdminBadge>;
      case 'PENDING':
        return <AdminBadge variant="warning" dot>New Request</AdminBadge>;
      case 'COMPLETED':
        return <AdminBadge variant="success">Completed</AdminBadge>;
      case 'CANCELLED':
        return <AdminBadge variant="neutral">Cancelled</AdminBadge>;
      default:
        return <AdminBadge variant="pink">{status}</AdminBadge>;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & OVERVIEW
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#2B2024]">
              Event Bookings
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFF5F8] text-[#E82C7C] border border-[#FCE4EC] text-xs font-bold">
              {bookings.length} Inquiries
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#7A6B70] mt-1">
            Review bespoke cake inquiries, formulate catering quotes, and manage client consultations.
          </p>
        </div>

        <a
          href="https://wa.me/2349038358985"
          target="_blank"
          rel="noopener noreferrer"
          className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-xs transition-all active:scale-95"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Open WhatsApp Concierge</span>
        </a>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. SEARCH & STATUS FILTERS
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-[#F7DCE5] p-5 sm:p-6 shadow-[0_4px_20px_rgba(232,44,124,0.03)] space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
          <div className="sm:col-span-8">
            <AdminSearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by client name, reference code, venue, or event type..."
            />
          </div>

          <div className="sm:col-span-4 text-xs text-[#7A6B70] flex items-center justify-start sm:justify-end gap-2">
            <Filter className="w-3.5 h-3.5 text-[#E82C7C]" />
            <span>Filter by status below</span>
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 custom-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0">
          {STATUS_FILTERS.map((s) => {
            const count =
              s.value === 'ALL'
                ? bookings.length
                : bookings.filter((b) => b.status === s.value).length;

            return (
              <AdminFilterPill
                key={s.value}
                label={s.label}
                count={count}
                isActive={selectedStatus === s.value}
                onClick={() => handleStatusChange(s.value)}
              />
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. BOOKINGS LIST / TABLE
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-[#F7DCE5] p-5 sm:p-7 shadow-[0_4px_20px_rgba(232,44,124,0.04)]">
        <div className="flex items-center justify-between border-b border-[#F7DCE5] pb-4 mb-4">
          <span className="text-xs font-bold text-[#7A6B70]">
            Showing <strong className="text-[#2B2024]">{filteredBookings.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}</strong> -{' '}
            <strong className="text-[#2B2024]">{Math.min(currentPage * ITEMS_PER_PAGE, filteredBookings.length)}</strong> of{' '}
            <strong className="text-[#2B2024]">{filteredBookings.length}</strong> booking requests
          </span>

          {(searchQuery || selectedStatus !== 'ALL') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus('ALL');
                setCurrentPage(1);
              }}
              className="text-xs font-bold text-[#E82C7C] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredBookings.length > 0 ? (
          <>
            {/* Mobile Cards List (< lg) */}
            <div className="lg:hidden space-y-4">
              {paginatedBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl bg-[#FFF5F8]/50 border border-[#FCE4EC] space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-[#7A6B70] uppercase block">
                        {b.bookingNumber}
                      </span>
                      <h4 className="font-display font-extrabold text-base text-[#2B2024]">
                        {b.customer}
                      </h4>
                    </div>
                    {getStatusBadge(b.status)}
                  </div>

                  <div className="space-y-1.5 text-xs text-[#7A6B70] bg-white p-3 rounded-xl border border-[#F7DCE5]/80">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#2B2024]">{b.eventType}</span>
                      <span className="font-bold text-[#E82C7C]">{b.guests} Guests</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-[#E82C7C]" />
                      <span>{formatDate(b.eventDate)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#7A6B70]" />
                      <span className="truncate">{b.venueLocation}</span>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-[#F7DCE5] flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setQuickViewBooking(b)}
                      className="px-3.5 py-1.5 rounded-full bg-white border border-[#F7DCE5] text-xs font-bold text-[#2B2024] hover:border-[#E82C7C] hover:text-[#E82C7C] transition-colors"
                    >
                      Quick Details
                    </button>

                    <Link
                      to={`/admin/bookings/${b.bookingNumber}`}
                      className="px-4 py-1.5 rounded-full bg-[#E82C7C] text-white text-xs font-bold hover:bg-[#D31665] transition-colors flex items-center gap-1 shrink-0 ml-auto"
                    >
                      <span>Review &amp; Quote</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table (>= lg) */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#F7DCE5] text-[#7A6B70] uppercase tracking-wider text-[10px] font-extrabold">
                    <th className="pb-3.5 font-bold">Booking Ref</th>
                    <th className="pb-3.5 font-bold">Client Name</th>
                    <th className="pb-3.5 font-bold">Event Type</th>
                    <th className="pb-3.5 font-bold">Event Date</th>
                    <th className="pb-3.5 font-bold">Guests</th>
                    <th className="pb-3.5 font-bold">Booking Stage</th>
                    <th className="pb-3.5 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F7DCE5]/60 text-[#2B2024]">
                  {paginatedBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#FFF5F8]/40 transition-colors">
                      <td className="py-3.5 font-mono font-bold text-[#E82C7C] text-xs">
                        {b.bookingNumber}
                      </td>
                      <td className="py-3.5">
                        <span className="font-extrabold text-[#2B2024] block">{b.customer}</span>
                        <span className="text-[11px] text-[#7A6B70]">{b.phone}</span>
                      </td>
                      <td className="py-3.5 font-medium text-[#7A6B70]">
                        {b.eventType}
                      </td>
                      <td className="py-3.5 text-xs text-[#2B2024] font-semibold">
                        {formatDate(b.eventDate)}
                      </td>
                      <td className="py-3.5 font-bold text-[#2B2024]">
                        {b.guests} guests
                      </td>
                      <td className="py-3.5">
                        {getStatusBadge(b.status)}
                      </td>
                      <td className="py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setQuickViewBooking(b)}
                            className="p-1.5 rounded-xl text-[#7A6B70] hover:text-[#2B2024] hover:bg-[#FFF5F8] border border-[#F7DCE5] transition-colors"
                            title="Quick View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <Link
                            to={`/admin/bookings/${b.bookingNumber}`}
                            className="px-3.5 py-1.5 rounded-full bg-[#FFF5F8] text-[#E82C7C] border border-[#FCE4EC] hover:bg-[#E82C7C] hover:text-white font-bold text-xs transition-colors flex items-center gap-1"
                          >
                            <span>Review</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-6 pt-4 border-t border-[#F7DCE5] flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-[#7A6B70]">
                  Page <strong className="text-[#2B2024]">{currentPage}</strong> of <strong className="text-[#2B2024]">{totalPages}</strong>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="p-2 rounded-xl border border-[#F7DCE5] bg-white text-[#2B2024] hover:bg-[#FFF5F8] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                          currentPage === page
                            ? 'bg-[#E82C7C] text-white shadow-xs'
                            : 'bg-white border border-[#F7DCE5] text-[#7A6B70] hover:border-[#E82C7C] hover:text-[#E82C7C]'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="p-2 rounded-xl border border-[#F7DCE5] bg-white text-[#2B2024] hover:bg-[#FFF5F8] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 px-4 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF5F8] border border-[#FCE4EC] text-[#E82C7C] mx-auto flex items-center justify-center shadow-xs">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg text-[#2B2024]">
              No booking requests found
            </h3>
            <p className="text-xs text-[#7A6B70] max-w-sm mx-auto">
              Try adjusting your status filter or search term.
            </p>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. QUICK VIEW MODAL
      ───────────────────────────────────────────────────────────── */}
      <AdminModal
        isOpen={Boolean(quickViewBooking)}
        onClose={() => setQuickViewBooking(null)}
        title="Event Inquiry Summary"
        subtitle={`Reference: ${quickViewBooking?.bookingNumber}`}
        cancelText="Close"
        confirmText="Open Full Quote Proposal"
        onConfirm={() => {
          const num = quickViewBooking?.bookingNumber;
          setQuickViewBooking(null);
          navigate(`/admin/bookings/${num}`);
        }}
      >
        {quickViewBooking && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FFF5F8] border border-[#FCE4EC]">
              <div>
                <span className="text-[10px] text-[#7A6B70] uppercase font-bold block">Client</span>
                <span className="font-bold text-sm text-[#2B2024]">{quickViewBooking.customer}</span>
              </div>
              {getStatusBadge(quickViewBooking.status)}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#7A6B70] block text-[10px]">Event Type</span>
                <span className="font-bold text-[#2B2024]">{quickViewBooking.eventType}</span>
              </div>
              <div>
                <span className="text-[#7A6B70] block text-[10px]">Date &amp; Guests</span>
                <span className="font-bold text-[#2B2024]">
                  {formatDate(quickViewBooking.eventDate)} • {quickViewBooking.guests} pax
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-[#7A6B70] block text-[10px]">Venue Location</span>
                <span className="font-bold text-[#2B2024]">{quickViewBooking.venueLocation}</span>
              </div>
            </div>

            <div>
              <span className="text-[#7A6B70] block text-[10px] uppercase font-bold mb-1">
                Treat &amp; Dessert Requirements
              </span>
              <p className="text-xs text-[#2B2024] p-3 rounded-2xl bg-stone-50 border border-stone-200 leading-relaxed">
                {quickViewBooking.foodRequirements || 'Standard event cake and dessert table.'}
              </p>
            </div>

            {quickViewBooking.quoteAmount && (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs font-bold text-emerald-900">Current Quote Estimate:</span>
                <span className="font-display font-black text-sm text-emerald-800">
                  {formatCurrency(quickViewBooking.quoteAmount)}
                </span>
              </div>
            )}
          </div>
        )}
      </AdminModal>
    </div>
  );
}
