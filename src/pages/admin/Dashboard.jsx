import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Calendar,
  Briefcase,
  Users,
  TrendingUp,
  Plus,
  Eye,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { formatCurrency } from '../../lib/formatters';

export default function Dashboard() {
  const KPIS = [
    {
      title: 'Total Order Requests',
      value: '142',
      trend: '+12 new today',
      icon: ShoppingBag,
      color: 'bg-tory-100 text-tory-600',
    },
    {
      title: 'Pending Order Review',
      value: '6',
      trend: 'Requires bakery contact',
      icon: Clock,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Catering Inquiries',
      value: '8',
      trend: '4 require quote formulation',
      icon: Calendar,
      color: 'bg-gold-50 text-gold-600',
    },
    {
      title: 'Candidate Applications',
      value: '14',
      trend: 'Across 3 open roles',
      icon: Users,
      color: 'bg-sky-50 text-sky-600',
    },
  ];

  const RECENT_ORDERS = [
    { id: '1', orderNumber: 'TT-ORD-202608-1088', customer: 'Adaobi Okafor', type: 'Delivery', items: 2, status: 'PROCESSING', label: 'In Preparation', variant: 'secondary' },
    { id: '2', orderNumber: 'TT-ORD-202608-1087', customer: 'Femi Alabi', type: 'Pickup', items: 1, status: 'READY', label: 'Ready for Pickup', variant: 'info' },
    { id: '3', orderNumber: 'TT-ORD-202608-1086', customer: 'Kemi Williams', type: 'Delivery', items: 4, status: 'DELIVERED', label: 'Delivered', variant: 'success' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900">
            Bakery Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Real-time order request workflow, catering inquiries, and recruitment queues.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/admin/products/new">
            <Button variant="primary" size="sm" icon={Plus}>
              New Treat Product
            </Button>
          </Link>
          <Link to="/admin/contracts/new">
            <Button variant="secondary" size="sm" icon={Plus}>
              Post Contract Role
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {KPIS.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card key={idx} className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-charcoal-500">{kpi.title}</span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${kpi.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-charcoal-900 font-display mt-3">
                {kpi.value}
              </div>
              <p className="text-[11px] text-charcoal-500 font-medium mt-1">
                {kpi.trend}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-8">
          <Card className="p-6">
            <div className="flex items-center justify-between border-b border-cream-border pb-4 mb-4">
              <h3 className="text-base font-bold font-display text-charcoal-900">
                Recent Order Requests
              </h3>
              <Link to="/admin/orders" className="text-xs font-bold text-tory-500 hover:underline">
                View All Queue &rarr;
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-cream-border text-charcoal-500 uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Order No.</th>
                    <th className="pb-3 font-semibold">Customer</th>
                    <th className="pb-3 font-semibold">Method</th>
                    <th className="pb-3 font-semibold">Items</th>
                    <th className="pb-3 font-semibold">Workflow Status</th>
                    <th className="pb-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-border/60 text-charcoal-700">
                  {RECENT_ORDERS.map((ord) => (
                    <tr key={ord.id} className="hover:bg-cream-surface/40">
                      <td className="py-3 font-bold text-charcoal-900">{ord.orderNumber}</td>
                      <td className="py-3">{ord.customer}</td>
                      <td className="py-3 font-medium">{ord.type}</td>
                      <td className="py-3">{ord.items} treats</td>
                      <td className="py-3">
                        <Badge variant={ord.variant} size="sm" dot>
                          {ord.label}
                        </Badge>
                      </td>
                      <td className="py-3 text-right">
                        <Link to={`/admin/orders/${ord.orderNumber}`}>
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            Manage
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Quick Operations Shortcuts */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-6 space-y-4 bg-cream-surface/50">
            <h3 className="text-base font-bold font-display text-charcoal-900 border-b border-cream-border pb-3">
              Recruitment Pipeline
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-charcoal-900">Weekend Pastry Chef</span>
                <Badge variant="success" size="sm">
                  8 Candidates
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-charcoal-900">Catering Specialist</span>
                <Badge variant="warning" size="sm">
                  4 Pending Review
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-charcoal-900">Chilled Treats Courier</span>
                <Badge variant="info" size="sm">
                  2 Shortlisted
                </Badge>
              </div>
            </div>

            <Link to="/admin/contracts/applications" className="block pt-2">
              <Button variant="outline" size="sm" className="w-full justify-center">
                Review Staff Applications
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
