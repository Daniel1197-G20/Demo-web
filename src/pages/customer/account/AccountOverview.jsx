import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Calendar, Briefcase, ArrowRight, Clock } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../hooks/useAuth';
import { formatCurrency } from '../../../lib/formatters';

export default function AccountOverview() {
  const { profile } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-cream-surface p-6 rounded-2xl border border-cream-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-display text-charcoal-900">
            Welcome back, {profile?.full_name || 'Friend'}!
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Manage your freshly baked treat deliveries, catering requests, and contract job applications.
          </p>
        </div>
        <Link to="/shop">
          <Button variant="primary" size="sm">
            Order Treats
          </Button>
        </Link>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold font-display text-charcoal-900 block">3</span>
            <span className="text-xs text-charcoal-500 font-medium">Total Orders</span>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold font-display text-charcoal-900 block">1</span>
            <span className="text-xs text-charcoal-500 font-medium">Active Catering</span>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold font-display text-charcoal-900 block">1</span>
            <span className="text-xs text-charcoal-500 font-medium">Job Application</span>
          </div>
        </Card>
      </div>

      {/* Recent Orders List */}
      <Card className="p-6">
        <div className="flex items-center justify-between border-b border-cream-border pb-4 mb-4">
          <h3 className="text-base font-bold font-display text-charcoal-900">
            Recent Orders
          </h3>
          <Link to="/account/orders" className="text-xs font-bold text-brand-700 hover:underline flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-cream-surface/60 text-xs sm:text-sm">
            <div>
              <span className="font-bold text-charcoal-900 block">TT-ORD-202608-1088</span>
              <span className="text-xs text-charcoal-500">2 items • {formatCurrency(28000)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="warning" dot size="sm">
                In Preparation
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
