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
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900">
            Contract Staff Opportunities
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Database-driven recruitment postings. Manage opening lifecycle, visibility, and requirements.
          </p>
        </div>

        <Link to="/admin/contracts/new">
          <Button variant="primary" icon={Plus}>
            Create Contract Role
          </Button>
        </Link>
      </div>

      <Card className="p-6 overflow-x-auto">
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
                <td className="py-3.5 font-bold text-charcoal-900">{c.title}</td>
                <td className="py-3.5">{c.department}</td>
                <td className="py-3.5 font-semibold text-tory-600">{c.comp}</td>
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
      </Card>
    </div>
  );
}
