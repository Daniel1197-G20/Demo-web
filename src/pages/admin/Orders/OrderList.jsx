import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Filter, ArrowRight } from 'lucide-react';
import { formatDate } from '../../../lib/formatters';
import AdminBadge from '../../../components/admin/AdminBadge';
import AdminSearchBar from '../../../components/admin/AdminSearchBar';
import AdminFilterPill from '../../../components/admin/AdminFilterPill';

export default function OrderList() {
  const ORDERS = [
    { id: '1', orderNumber: 'TT-ORD-202608-1088', customer: 'Adaobi Okafor', phone: '08023456789', date: '2026-08-22', type: 'Delivery', items: 2, status: 'PROCESSING', label: 'In Preparation' },
    { id: '2', orderNumber: 'TT-ORD-202608-1087', customer: 'Femi Alabi', phone: '08031234567', date: '2026-08-22', type: 'Pickup', items: 1, status: 'READY', label: 'Ready for Pickup' },
    { id: '3', orderNumber: 'TT-ORD-202608-1086', customer: 'Kemi Williams', phone: '08059876543', date: '2026-08-21', type: 'Delivery', items: 4, status: 'DELIVERED', label: 'Delivered' },
    { id: '4', orderNumber: 'TT-ORD-202608-1085', customer: 'Babatunde Adeleke', phone: '08091122334', date: '2026-08-21', type: 'Delivery', items: 2, status: 'PENDING', label: 'Request Received' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const filteredOrders = useMemo(() => {
    return ORDERS.filter((o) => {
      const matchesSearch =
        o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedFilter === 'ALL' || o.status === selectedFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, selectedFilter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DELIVERED':
        return <AdminBadge variant="success" dot>Delivered</AdminBadge>;
      case 'READY':
        return <AdminBadge variant="info" dot>Ready for Dispatch</AdminBadge>;
      case 'PROCESSING':
        return <AdminBadge variant="pink" dot>In Preparation</AdminBadge>;
      case 'PENDING':
        return <AdminBadge variant="warning" dot>New Request</AdminBadge>;
      default:
        return <AdminBadge variant="neutral">{status}</AdminBadge>;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#2B2024]">
            Order Requests Queue
          </h1>
          <span className="px-2.5 py-0.5 rounded-full bg-[#FFF5F8] text-[#E82C7C] border border-[#FCE4EC] text-xs font-bold">
            {ORDERS.length} Active
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#7A6B70] mt-1">
          Track incoming customer bakery orders, dispatch preparation, and delivery confirmations.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl border border-[#F7DCE5] p-5 sm:p-6 shadow-[0_4px_20px_rgba(232,44,124,0.03)] space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-8">
            <AdminSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by customer name or order number..."
            />
          </div>
          <div className="sm:col-span-4 flex items-center gap-2 overflow-x-auto">
            <AdminFilterPill
              label="All"
              isActive={selectedFilter === 'ALL'}
              onClick={() => setSelectedFilter('ALL')}
            />
            <AdminFilterPill
              label="Pending"
              isActive={selectedFilter === 'PENDING'}
              onClick={() => setSelectedFilter('PENDING')}
            />
            <AdminFilterPill
              label="Processing"
              isActive={selectedFilter === 'PROCESSING'}
              onClick={() => setSelectedFilter('PROCESSING')}
            />
          </div>
        </div>
      </div>

      {/* Orders Table & Cards */}
      <div className="bg-white rounded-3xl border border-[#F7DCE5] p-5 sm:p-7 shadow-[0_4px_20px_rgba(232,44,124,0.04)]">
        {/* Mobile View */}
        <div className="lg:hidden space-y-3.5">
          {filteredOrders.map((ord) => (
            <div
              key={ord.id}
              className="p-4 rounded-2xl bg-[#FFF5F8]/50 border border-[#FCE4EC] space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-extrabold text-sm text-[#2B2024]">
                  {ord.orderNumber}
                </span>
                {getStatusBadge(ord.status)}
              </div>
              <div className="text-xs space-y-1">
                <p className="font-bold text-[#2B2024]">{ord.customer} ({ord.phone})</p>
                <p className="text-[#7A6B70]">{ord.type} • {ord.items} treats • Placed {formatDate(ord.date)}</p>
              </div>
              <div className="pt-2 border-t border-[#F7DCE5]">
                <Link
                  to={`/admin/orders/${ord.orderNumber}`}
                  className="w-full flex items-center justify-center gap-1 py-2 rounded-full bg-white border border-[#F7DCE5] text-xs font-bold text-[#E82C7C] hover:border-[#E82C7C]"
                >
                  <span>Manage Request</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#F7DCE5] text-[#7A6B70] uppercase tracking-wider text-[10px] font-extrabold">
                <th className="pb-3.5 font-bold">Order Ref</th>
                <th className="pb-3.5 font-bold">Date</th>
                <th className="pb-3.5 font-bold">Customer</th>
                <th className="pb-3.5 font-bold">Method</th>
                <th className="pb-3.5 font-bold">Items</th>
                <th className="pb-3.5 font-bold">Status</th>
                <th className="pb-3.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F7DCE5]/60 text-[#2B2024]">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#FFF5F8]/40 transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#E82C7C] text-xs">
                    {ord.orderNumber}
                  </td>
                  <td className="py-3.5 text-xs text-[#7A6B70]">{formatDate(ord.date)}</td>
                  <td className="py-3.5">
                    <span className="font-extrabold text-[#2B2024] block">{ord.customer}</span>
                    <span className="text-[11px] text-[#7A6B70]">{ord.phone}</span>
                  </td>
                  <td className="py-3.5 font-semibold text-[#2B2024]">{ord.type}</td>
                  <td className="py-3.5 font-bold text-[#E82C7C]">{ord.items} treats</td>
                  <td className="py-3.5">{getStatusBadge(ord.status)}</td>
                  <td className="py-3.5 text-right">
                    <Link
                      to={`/admin/orders/${ord.orderNumber}`}
                      className="px-3.5 py-1.5 rounded-full bg-[#FFF5F8] text-[#E82C7C] border border-[#FCE4EC] hover:bg-[#E82C7C] hover:text-white font-bold text-xs transition-colors inline-flex items-center gap-1"
                    >
                      <span>Manage</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
