import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Truck, CheckCircle2, MessageCircle } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { formatCurrency } from '../../../lib/formatters';

export default function AccountOrderDetails() {
  const { orderNumber = 'TT-ORD-202608-1088' } = useParams();

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/account/orders"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal-500 hover:text-tory-500 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold font-display text-charcoal-900">
            Order Request {orderNumber}
          </h2>
          <Badge variant="warning" dot>
            In Preparation
          </Badge>
        </div>
      </div>

      <Card className="p-6 space-y-4">
        <h3 className="text-sm font-bold text-charcoal-900 uppercase tracking-wider border-b border-cream-border pb-2">
          Requested Treats
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center py-2 border-b border-cream-border/60">
            <div>
              <span className="font-bold text-charcoal-900 block">1x Signature Strawberry Cloud Cake</span>
              <span className="text-xs text-charcoal-500">Artisanal Cakes</span>
            </div>
            <span className="font-bold text-charcoal-900">{formatCurrency(18500)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-cream-border/60">
            <div>
              <span className="font-bold text-charcoal-900 block">1x Red Velvet Gold Cupcakes (Box of 6)</span>
              <span className="text-xs text-charcoal-500">Gourmet Cupcakes</span>
            </div>
            <span className="font-bold text-charcoal-900">{formatCurrency(9500)}</span>
          </div>
        </div>

        <div className="pt-2 text-xs sm:text-sm space-y-1 text-charcoal-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(28000)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>{formatCurrency(2000)}</span>
          </div>
          <div className="flex justify-between text-base font-extrabold text-charcoal-900 pt-2 border-t border-cream-border">
            <span>Estimated Total</span>
            <span className="text-tory-600 font-display">{formatCurrency(30000)}</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-3">
        <h3 className="text-sm font-bold text-charcoal-900 uppercase tracking-wider">
          Fulfillment & Delivery Details
        </h3>
        <p className="text-xs sm:text-sm text-charcoal-700">
          <strong>Method:</strong> Lagos Courier Delivery<br />
          <strong>Address:</strong> 14 Admiralty Way, Lekki Phase 1, Lagos, Nigeria<br />
          <strong>Timing:</strong> 22 Aug 2026 (Afternoon: 1:00 PM - 5:00 PM)
        </p>
      </Card>
    </div>
  );
}
