import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Cake,
  Calendar,
  Sparkles,
  Plus,
  ArrowRight,
  Eye,
  CheckCircle2,
  Clock,
  Layers,
  Settings,
  TrendingUp,
  Store,
  ExternalLink,
} from 'lucide-react';
import { useAdminStore } from '../../lib/adminStore';
import { formatCurrency, formatDate } from '../../lib/formatters';
import AdminStatCard from '../../components/admin/AdminStatCard';
import AdminBadge from '../../components/admin/AdminBadge';

export default function Dashboard() {
  const navigate = useNavigate();
  const store = useAdminStore();
  const stats = store.getStats();

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP WELCOME & QUICK ACTIONS BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-7 rounded-3xl border border-[#F7DCE5] shadow-[0_4px_20px_rgba(232,44,124,0.04)]">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E82C7C] bg-[#FFF5F8] px-3 py-1 rounded-full border border-[#FCE4EC]">
            Owner Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#2B2024] mt-2">
            Welcome back, Victoria! ✨
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6B70] mt-1 max-w-xl leading-relaxed">
            Here is what's happening at Tory's Treats today. You have{' '}
            <strong className="text-[#E82C7C] font-bold">{stats.pendingBookings} new event inquiries</strong> awaiting your review.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link to="/admin/products/new">
            <button
              type="button"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#E82C7C] hover:bg-[#D31665] text-white text-xs font-bold shadow-[0_4px_14px_rgba(232,44,124,0.3)] transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[2.5px]" />
              <span>Add New Product</span>
            </button>
          </Link>

          <Link to="/admin/bookings">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-3 rounded-full border border-[#F7DCE5] bg-[#FFF5F8] text-[#E82C7C] hover:bg-[#FCE4EC] text-xs font-bold transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>View Bookings ({stats.pendingBookings})</span>
            </button>
          </Link>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CORE BUSINESS STATS (4-Column Grid)
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
        <AdminStatCard
          title="Total Products"
          value={stats.totalProducts}
          subtitle="In bakery catalog"
          icon={Cake}
          trend="+2 added this week"
          trendType="neutral"
          onClick={() => navigate('/admin/products')}
        />

        <AdminStatCard
          title="Available Now"
          value={stats.activeProducts}
          subtitle={`${stats.soldOutProducts} marked sold out`}
          icon={CheckCircle2}
          trend="In stock for orders"
          trendType="positive"
          onClick={() => navigate('/admin/products')}
        />

        <AdminStatCard
          title="Pending Bookings"
          value={stats.pendingBookings}
          subtitle="Needs quote proposal"
          icon={Clock}
          trend={stats.pendingBookings > 0 ? 'Requires attention' : 'All caught up'}
          trendType={stats.pendingBookings > 0 ? 'attention' : 'positive'}
          onClick={() => navigate('/admin/bookings')}
        />

        <AdminStatCard
          title="Confirmed Events"
          value={stats.confirmedBookings}
          subtitle="Scheduled in calendar"
          icon={Calendar}
          trend="Upcoming celebrations"
          trendType="positive"
          onClick={() => navigate('/admin/bookings')}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. RECENT TREATS & RECENT BOOKINGS ROW
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Recent Products (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#F7DCE5] p-5 sm:p-7 shadow-[0_4px_20px_rgba(232,44,124,0.04)] space-y-4">
          <div className="flex items-center justify-between border-b border-[#F7DCE5] pb-4">
            <div>
              <h3 className="font-display font-extrabold text-base sm:text-lg text-[#2B2024]">
                Bakery Catalog Summary
              </h3>
              <p className="text-xs text-[#7A6B70] mt-0.5">
                Recently updated treats in your online shop
              </p>
            </div>

            <Link
              to="/admin/products"
              className="text-xs font-bold text-[#E82C7C] hover:underline flex items-center gap-1"
            >
              <span>Manage All ({stats.totalProducts})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Product Cards */}
          <div className="sm:hidden space-y-3">
            {stats.recentProducts.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-2xl bg-[#FFF5F8]/60 border border-[#FCE4EC] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={p.images?.[0] || 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&auto=format&fit=crop&q=80'}
                    alt={p.name}
                    className="w-12 h-12 rounded-xl object-cover border border-[#F7DCE5] shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-display font-bold text-xs text-[#2B2024] truncate">
                      {p.name}
                    </h4>
                    <p className="text-[11px] text-[#E82C7C] font-bold mt-0.5">
                      {formatCurrency(p.price)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <AdminBadge variant={p.is_available ? 'success' : 'neutral'} size="sm" dot>
                    {p.is_available ? 'Available' : 'Sold Out'}
                  </AdminBadge>
                  <Link
                    to={`/admin/products/${p.id}/edit`}
                    className="text-[11px] font-bold text-[#E82C7C] hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#F7DCE5] text-[#7A6B70] uppercase tracking-wider text-[10px] font-extrabold">
                  <th className="pb-3 font-bold">Product</th>
                  <th className="pb-3 font-bold">Category</th>
                  <th className="pb-3 font-bold">Price</th>
                  <th className="pb-3 font-bold">Status</th>
                  <th className="pb-3 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F7DCE5]/60 text-[#2B2024]">
                {stats.recentProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FFF5F8]/40 transition-colors">
                    <td className="py-3 flex items-center gap-3">
                      <img
                        src={p.images?.[0] || 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&auto=format&fit=crop&q=80'}
                        alt={p.name}
                        className="w-9 h-9 rounded-xl object-cover border border-[#F7DCE5] shrink-0"
                      />
                      <span className="font-bold text-[#2B2024] truncate max-w-[180px]">
                        {p.name}
                      </span>
                    </td>
                    <td className="py-3 text-[#7A6B70]">{p.category}</td>
                    <td className="py-3 font-bold text-[#E82C7C]">{formatCurrency(p.price)}</td>
                    <td className="py-3">
                      <AdminBadge variant={p.is_available ? 'success' : 'neutral'} size="sm" dot>
                        {p.is_available ? 'Available' : 'Sold Out'}
                      </AdminBadge>
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        to={`/admin/products/${p.id}/edit`}
                        className="px-3 py-1 rounded-full text-xs font-bold text-[#E82C7C] bg-[#FFF5F8] border border-[#FCE4EC] hover:bg-[#FCE4EC] transition-colors"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Event Inquiries (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#F7DCE5] p-5 sm:p-7 shadow-[0_4px_20px_rgba(232,44,124,0.04)] space-y-4">
          <div className="flex items-center justify-between border-b border-[#F7DCE5] pb-4">
            <div>
              <h3 className="font-display font-extrabold text-base sm:text-lg text-[#2B2024]">
                Event Booking Requests
              </h3>
              <p className="text-xs text-[#7A6B70] mt-0.5">
                Client catering &amp; dessert inquiries
              </p>
            </div>

            <Link
              to="/admin/bookings"
              className="text-xs font-bold text-[#E82C7C] hover:underline flex items-center gap-1"
            >
              <span>All Bookings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {stats.recentBookings.map((b) => (
              <div
                key={b.id}
                className="p-3.5 sm:p-4 rounded-2xl bg-[#FFF5F8]/50 border border-[#FCE4EC] space-y-2 hover:border-[#E82C7C] transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#2B2024]">
                      {b.customer}
                    </h4>
                    <p className="text-[11px] text-[#7A6B70] mt-0.5">
                      {b.eventType} • <strong className="text-[#2B2024]">{b.guests} guests</strong>
                    </p>
                  </div>

                  <AdminBadge
                    variant={
                      b.status === 'CONFIRMED'
                        ? 'success'
                        : b.status === 'QUOTED'
                        ? 'info'
                        : b.status === 'PENDING'
                        ? 'warning'
                        : 'neutral'
                    }
                    size="sm"
                    dot
                  >
                    {b.status === 'PENDING' ? 'New Request' : b.status}
                  </AdminBadge>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#F7DCE5]/60">
                  <span className="text-[#7A6B70]">
                    Date: <strong className="text-[#2B2024]">{formatDate(b.eventDate)}</strong>
                  </span>

                  <Link
                    to={`/admin/bookings/${b.bookingNumber}`}
                    className="text-[#E82C7C] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Manage Quote</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. QUICK BUSINESS NAVIGATION SHORTCUTS
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/admin/products/new"
          className="p-5 rounded-3xl bg-white border border-[#F7DCE5] hover:border-[#E82C7C] hover:shadow-[0_8px_25px_rgba(232,44,124,0.08)] transition-all flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#FFF5F8] border border-[#FCE4EC] flex items-center justify-center text-[#E82C7C] group-hover:bg-[#E82C7C] group-hover:text-white transition-colors shrink-0">
            <Plus className="w-6 h-6 stroke-[2.2px]" />
          </div>
          <div>
            <h4 className="font-display font-bold text-sm text-[#2B2024]">
              Add a New Treat
            </h4>
            <p className="text-xs text-[#7A6B70] mt-0.5">
              Upload photo, set price, description &amp; category
            </p>
          </div>
        </Link>

        <Link
          to="/admin/categories"
          className="p-5 rounded-3xl bg-white border border-[#F7DCE5] hover:border-[#E82C7C] hover:shadow-[0_8px_25px_rgba(232,44,124,0.08)] transition-all flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#FFF5F8] border border-[#FCE4EC] flex items-center justify-center text-[#E82C7C] group-hover:bg-[#E82C7C] group-hover:text-white transition-colors shrink-0">
            <Layers className="w-6 h-6 stroke-[2.2px]" />
          </div>
          <div>
            <h4 className="font-display font-bold text-sm text-[#2B2024]">
              Manage Categories
            </h4>
            <p className="text-xs text-[#7A6B70] mt-0.5">
              Organize cakes, pastries, cupcakes &amp; platters
            </p>
          </div>
        </Link>

        <Link
          to="/admin/settings"
          className="p-5 rounded-3xl bg-white border border-[#F7DCE5] hover:border-[#E82C7C] hover:shadow-[0_8px_25px_rgba(232,44,124,0.08)] transition-all flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#FFF5F8] border border-[#FCE4EC] flex items-center justify-center text-[#E82C7C] group-hover:bg-[#E82C7C] group-hover:text-white transition-colors shrink-0">
            <Settings className="w-6 h-6 stroke-[2.2px]" />
          </div>
          <div>
            <h4 className="font-display font-bold text-sm text-[#2B2024]">
              Store &amp; Delivery Settings
            </h4>
            <p className="text-xs text-[#7A6B70] mt-0.5">
              Phone numbers, address &amp; Lagos delivery rates
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
