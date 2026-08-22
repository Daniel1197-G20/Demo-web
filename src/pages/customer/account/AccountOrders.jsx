import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { formatCurrency, formatDate } from '../../../lib/formatters';

export default function AccountOrders() {
  const MOCK_ORDERS = [
    {
      id: 'ord-1',
      orderNumber: 'TT-ORD-202608-1088',
      date: '2026-08-22',
      itemsCount: 2,
      total: 28000,
      status: 'PROCESSING',
      statusLabel: 'In Preparation',
      statusVariant: 'warning',
    },
    {
      id: 'ord-2',
      orderNumber: 'TT-ORD-202608-1042',
      date: '2026-08-15',
      itemsCount: 1,
      total: 18500,
      status: 'DELIVERED',
      statusLabel: 'Delivered',
      statusVariant: 'success',
    },
    {
      id: 'ord-3',
      orderNumber: 'TT-ORD-202607-0980',
      date: '2026-07-28',
      itemsCount: 4,
      total: 42000,
      status: 'DELIVERED',
      statusLabel: 'Delivered',
      statusVariant: 'success',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-display text-charcoal-900">
          Order History & Tracking
        </h2>
      </div>

      <div className="space-y-3">
        {MOCK_ORDERS.map((order) => (
          <Card key={order.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-charcoal-900 font-display">
                  {order.orderNumber}
                </span>
                <Badge variant={order.statusVariant} size="sm" dot>
                  {order.statusLabel}
                </Badge>
              </div>
              <p className="text-xs text-charcoal-500">
                Placed on {formatDate(order.date)} • {order.itemsCount} {order.itemsCount === 1 ? 'item' : 'items'}
              </p>
              <div className="text-sm font-bold text-tory-600 pt-1">
                {formatCurrency(order.total)}
              </div>
            </div>

            <Link to={`/account/orders/${order.orderNumber}`}>
              <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right" className="w-full sm:w-auto">
                View Receipt
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
