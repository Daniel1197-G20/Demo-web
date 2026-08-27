import React, { useState } from 'react';
import { User, Mail, Phone, ShoppingBag, Sparkles } from 'lucide-react';
import { formatCurrency } from '../../../lib/formatters';
import AdminBadge from '../../../components/admin/AdminBadge';
import AdminSearchBar from '../../../components/admin/AdminSearchBar';

export default function CustomerList() {
  const CUSTOMERS = [
    { id: '1', name: 'Adaobi Okafor', email: 'adaobi@gmail.com', phone: '08023456789', ordersCount: 3, totalSpent: 88500, tier: 'VIP Treat Club' },
    { id: '2', name: 'Dr. Bimbo Alabi', email: 'bimbo@example.com', phone: '08034567890', ordersCount: 1, totalSpent: 450000, tier: 'Luxury Client' },
    { id: '3', name: 'Femi Alabi', email: 'femi@alabi.com', phone: '08031234567', ordersCount: 2, totalSpent: 37000, tier: 'Loyal Customer' },
    { id: '4', name: 'Zainab Dangote', email: 'zainab.d@lifestyle.com', phone: '08134567890', ordersCount: 2, totalSpent: 620000, tier: 'Luxury Client' },
  ];

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#2B2024]">
            Customer Directory
          </h1>
          <span className="px-2.5 py-0.5 rounded-full bg-[#FFF5F8] text-[#E82C7C] border border-[#FCE4EC] text-xs font-bold">
            {CUSTOMERS.length} Clients
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#7A6B70] mt-1">
          Registered patrons, purchase frequency, and lifetime spend history.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#F7DCE5] p-5 sm:p-6 shadow-[0_4px_20px_rgba(232,44,124,0.03)]">
        <AdminSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by client name, email or phone..."
        />
      </div>

      <div className="bg-white rounded-3xl border border-[#F7DCE5] p-5 sm:p-7 shadow-[0_4px_20px_rgba(232,44,124,0.04)]">
        {/* Mobile View */}
        <div className="lg:hidden space-y-3.5">
          {filteredCustomers.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-2xl bg-[#FFF5F8]/50 border border-[#FCE4EC] space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-display font-extrabold text-sm text-[#2B2024]">{c.name}</h4>
                <AdminBadge variant="gold" size="sm">★ {c.tier}</AdminBadge>
              </div>
              <div className="text-xs text-[#7A6B70] space-y-1">
                <p>{c.email} • {c.phone}</p>
                <p>Activity: {c.ordersCount} orders/bookings</p>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#F7DCE5] text-xs font-bold">
                <span className="text-[#7A6B70]">Total Spend:</span>
                <span className="text-[#E82C7C] font-black text-sm">{formatCurrency(c.totalSpent)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#F7DCE5] text-[#7A6B70] uppercase tracking-wider text-[10px] font-extrabold">
                <th className="pb-3.5 font-bold">Customer Name</th>
                <th className="pb-3.5 font-bold">Contact Details</th>
                <th className="pb-3.5 font-bold">Orders / Bookings</th>
                <th className="pb-3.5 font-bold">Total Lifetime Spend</th>
                <th className="pb-3.5 font-bold text-right">Loyalty Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F7DCE5]/60 text-[#2B2024]">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-[#FFF5F8]/40 transition-colors">
                  <td className="py-3.5 font-display font-extrabold text-[#2B2024]">{c.name}</td>
                  <td className="py-3.5 text-xs text-[#7A6B70]">{c.email} • {c.phone}</td>
                  <td className="py-3.5 font-semibold text-[#2B2024]">{c.ordersCount} activities</td>
                  <td className="py-3.5 font-black text-[#E82C7C] font-display">{formatCurrency(c.totalSpent)}</td>
                  <td className="py-3.5 text-right">
                    <AdminBadge variant="gold" size="sm">★ {c.tier}</AdminBadge>
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
