import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Briefcase, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';

export default function ContractList() {
  const CONTRACTS = [
    { id: '1', title: 'Weekend Event Pastry Chef', department: 'Bakery Operations', openings: 2, comp: '₦45,000 / shift', status: 'PUBLISHED', is_public_visible: true },
    { id: '2', title: 'Lead Catering Service Specialist', department: 'Event Catering Services', openings: 4, comp: '₦35,000 / shift', status: 'PUBLISHED', is_public_visible: true },
    { id: '3', title: 'Chilled Treats Delivery Specialist', department: 'Logistics', openings: 2, comp: '₦120,000 / mo', status: 'DRAFT', is_public_visible: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-charcoal-900">Careers & Bakery Contracts</h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Publish open baking, pastry chef, and logistics roles on the recruitment portal.
          </p>
        </div>
        <Link to="/admin/contracts/new" className="w-full sm:w-auto">
          <Button variant="primary" icon={Plus} className="w-full sm:w-auto justify-center">
            Post Open Role
          </Button>
        </Link>
      </div>

      <Card className="p-4 sm:p-6">
        {/* Mobile Cards List (< md) */}
        <div className="md:hidden space-y-3.5">
          {CONTRACTS.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-xl bg-cream-surface/50 border border-cream-border space-y-2.5 text-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-charcoal-900 font-display text-sm">
                    {c.title}
                  </h4>
                  <p className="text-charcoal-500 mt-0.5">{c.department}</p>
                </div>
                <Badge variant={c.status === 'PUBLISHED' ? 'success' : 'secondary'} size="sm" dot>
                  {c.status}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-charcoal-700 pt-1">
                <div>
                  <span className="text-[11px] text-charcoal-500 block">Compensation</span>
                  <span className="font-bold text-brand-700 text-sm">{c.comp}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-charcoal-500 block">Openings</span>
                  <span className="font-medium text-charcoal-900">{c.openings} positions</span>
                </div>
              </div>

              <div className="pt-2 border-t border-cream-border/60">
                <Link to={`/admin/contracts/${c.id}/edit`} className="block">
                  <Button variant="outline" size="sm" icon={Edit} className="w-full justify-center">
                    Edit Role
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table (>= md) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-cream-border text-charcoal-500 uppercase tracking-wider text-xs">
                <th className="pb-3 font-semibold">Job Title</th>
                <th className="pb-3 font-semibold">Department</th>
                <th className="pb-3 font-semibold">Compensation</th>
                <th className="pb-3 font-semibold">Openings</th>
                <th className="pb-3 font-semibold">Lifecycle</th>
                <th className="pb-3 font-semibold">Public Visibility</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-border/60 text-charcoal-700">
              {CONTRACTS.map((c) => (
                <tr key={c.id} className="hover:bg-cream-surface/40">
                  <td className="py-3.5 font-bold text-charcoal-900 font-display">{c.title}</td>
                  <td className="py-3.5">{c.department}</td>
                  <td className="py-3.5 font-semibold text-brand-700">{c.comp}</td>
                  <td className="py-3.5">{c.openings}</td>
                  <td className="py-3.5">
                    <Badge variant={c.status === 'PUBLISHED' ? 'success' : 'secondary'} size="sm" dot>
                      {c.status}
                    </Badge>
                  </td>
                  <td className="py-3.5">
                    <Badge variant={c.is_public_visible ? 'success' : 'neutral'} size="sm">
                      {c.is_public_visible ? 'Visible on Site' : 'Hidden'}
                    </Badge>
                  </td>
                  <td className="py-3.5 text-right">
                    <Link to={`/admin/contracts/${c.id}/edit`}>
                      <Button variant="ghost" size="sm" icon={Edit} className="h-8">
                        Edit Role
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
  );
}
