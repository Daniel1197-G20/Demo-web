import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Filter } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { formatDate } from '../../../lib/formatters';

export default function OrderList() {
  const ORDERS = [
    { id: '1', orderNumber: 'TT-ORD-202608-1088', customer: 'Adaobi Okafor', phone: '08023456789', date: '2026-08-22', type: 'Delivery', items: 2, status: 'PROCESSING', label: 'In Preparation', variant: 'secondary' },
    { id: '2', orderNumber: 'TT-ORD-202608-1087', customer: 'Femi Alabi', phone: '08031234567', date: '2026-08-22', type: 'Pickup', items: 1, status: 'READY', label: 'Ready for Pickup', variant: 'info' },
    { id: '3', orderNumber: 'TT-ORD-202608-1086', customer: 'Kemi Williams', phone: '08059876543', date: '2026-08-21', type: 'Delivery', items: 4, status: 'DELIVERED', label: 'Delivered', variant: 'success' },
    { id: '4', orderNumber: 'TT-ORD-202608-1085', customer: 'Babatunde Adeleke', phone: '08091122334', date: '2026-08-21', type: 'Delivery', items: 2, status: 'PENDING', label: 'Request Received', variant: 'warning' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900">
            Order Requests Queue
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Manage incoming customer treat requests, review delivery schedules, and update fulfillment progress.
          </p>
        </div>
      </div>

      <Card className="p-6 overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-cream-border text-charcoal-500 uppercase tracking-wider text-xs">
              <th className="pb-3 font-semibold">Order Ref</th>
              <th className="pb-3 font-semibold">Date</th>
              <th className="pb-3 font-semibold">Customer</th>
              <th className="pb-3 font-semibold">Method</th>
              <th className="pb-3 font-semibold">Items</th>
              <th className="pb-3 font-semibold">Workflow Status</th>
              <th className="pb-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-border/60 text-charcoal-700">
            {ORDERS.map((ord) => (
              <tr key={ord.id} className="hover:bg-cream-surface/40">
                <td className="py-3.5 font-bold text-charcoal-900">{ord.orderNumber}</td>
                <td className="py-3.5 text-charcoal-500 text-xs">{formatDate(ord.date)}</td>
                <td className="py-3.5">
                  <span className="font-semibold text-charcoal-900 block">{ord.customer}</span>
                  <span className="text-[11px] text-charcoal-500">{ord.phone}</span>
                </td>
                <td className="py-3.5 font-medium">{ord.type}</td>
                <td className="py-3.5">{ord.items} treats</td>
                <td className="py-3.5">
                  <Badge variant={ord.variant} size="sm" dot>
                    {ord.label}
                  </Badge>
                </td>
                <td className="py-3.5 text-right">
                  <Link to={`/admin/orders/${ord.orderNumber}`}>
                    <Button variant="ghost" size="sm" icon={Eye} className="h-8">
                      Manage Request
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
