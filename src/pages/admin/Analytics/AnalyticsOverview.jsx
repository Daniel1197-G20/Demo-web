import React from 'react';
import { BarChart3, TrendingUp, Cake, Calendar, ShoppingBag } from 'lucide-react';
import Card from '../../../components/ui/Card';

export default function AnalyticsOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900">
          Bakery Demand & Category Analytics
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
          Order request volumes, popular treat categories, and catering seasonal trends.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold font-display text-charcoal-900 border-b border-cream-border pb-2">
            Top Requested Treats (August 2026)
          </h3>
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between items-center">
              <span>1. Signature Strawberry Cloud Cake</span>
              <span className="font-bold text-charcoal-900">68 requests</span>
            </div>
            <div className="flex justify-between items-center">
              <span>2. Red Velvet Gold Cupcakes (Box of 6)</span>
              <span className="font-bold text-charcoal-900">54 requests</span>
            </div>
            <div className="flex justify-between items-center">
              <span>3. Pistachio Butter Croissants</span>
              <span className="font-bold text-charcoal-900">42 requests</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold font-display text-charcoal-900 border-b border-cream-border pb-2">
            Order Fulfillment Breakdown
          </h3>
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between items-center">
              <span>Lagos Doorstep Delivery</span>
              <span className="font-bold text-tory-600">74% of requests</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Victoria Island Kitchen Pickup</span>
              <span className="font-bold text-charcoal-900">26% of requests</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
