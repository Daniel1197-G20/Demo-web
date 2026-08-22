import React from 'react';
import { User, Mail, Phone, ShoppingBag } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { formatCurrency } from '../../../lib/formatters';

export default function CustomerList() {
  const CUSTOMERS = [
    { id: '1', name: 'Adaobi Okafor', email: 'adaobi@gmail.com', phone: '08023456789', ordersCount: 3, totalSpent: 88500 },
    { id: '2', name: 'Dr. Bimbo Alabi', email: 'bimbo@example.com', phone: '08034567890', ordersCount: 1, totalSpent: 450000 },
    { id: '3', name: 'Femi Alabi', email: 'femi@alabi.com', phone: '08031234567', ordersCount: 2, totalSpent: 37000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900">
          Customer Directory
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
          Registered customers, purchase frequency, and lifetime spend history.
        </p>
      </div>

      <Card className="p-6 overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-cream-border text-charcoal-500 uppercase tracking-wider text-xs">
              <th className="pb-3 font-semibold">Customer</th>
              <th className="pb-3 font-semibold">Contact Info</th>
              <th className="pb-3 font-semibold">Orders / Bookings</th>
              <th className="pb-3 font-semibold">Total Spend</th>
              <th className="pb-3 font-semibold">Tier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-border/60 text-charcoal-700">
            {CUSTOMERS.map((c) => (
              <tr key={c.id} className="hover:bg-cream-surface/40">
                <td className="py-3.5 font-bold text-charcoal-900">{c.name}</td>
                <td className="py-3.5 text-xs text-charcoal-500">{c.email} • {c.phone}</td>
                <td className="py-3.5">{c.ordersCount} activities</td>
                <td className="py-3.5 font-bold text-tory-600">{formatCurrency(c.totalSpent)}</td>
                <td className="py-3.5">
                  <Badge variant="gold" size="sm">
                    VIP Treat Club
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
