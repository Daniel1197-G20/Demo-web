import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Eye, Download, CheckCircle2 } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { formatDate } from '../../../lib/formatters';

export default function ApplicationList() {
  const APPLICATIONS = [
    { id: '1', applicant: 'Tobi Adeleke', role: 'Weekend Event Pastry Chef', email: 'tobi@example.com', phone: '08034567890', date: '2026-08-22', status: 'UNDER_REVIEW', label: 'Under Review', variant: 'warning' },
    { id: '2', applicant: 'Ngozi Eze', role: 'Lead Catering Service Specialist', email: 'ngozi@example.com', phone: '08021122334', date: '2026-08-21', status: 'APPROVED', label: 'Approved & Hired', variant: 'success' },
    { id: '3', applicant: 'Emmanuel Udo', role: 'Chilled Treats Delivery Specialist', email: 'emmanuel@example.com', phone: '08098877665', date: '2026-08-20', status: 'SHORTLISTED', label: 'Shortlisted', variant: 'info' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900">
          Staff Recruitment Applications
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
          Review candidate portfolios, CV documents, and manage hiring decisions.
        </p>
      </div>

      <Card className="p-4 sm:p-6">
        {/* Mobile Cards List (< md) */}
        <div className="md:hidden space-y-3.5">
          {APPLICATIONS.map((app) => (
            <div
              key={app.id}
              className="p-4 rounded-xl bg-cream-surface/50 border border-cream-border space-y-2.5 text-xs"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-charcoal-900 font-display text-sm">
                    {app.applicant}
                  </h4>
                  <span className="text-charcoal-500">{app.email}</span>
                </div>
                <Badge variant={app.variant} size="sm" dot>
                  {app.label}
                </Badge>
              </div>

              <div className="space-y-1 text-charcoal-700">
                <div className="flex justify-between">
                  <span className="text-charcoal-500">Applied Role:</span>
                  <span className="font-semibold text-charcoal-900">{app.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-500">Submitted:</span>
                  <span>{formatDate(app.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-500">Phone:</span>
                  <span>{app.phone}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-cream-border/60">
                <Link to={`/admin/contracts/applications/${app.id}`} className="block">
                  <Button variant="outline" size="sm" icon={Eye} className="w-full justify-center">
                    Review Candidate
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
                <th className="pb-3 font-semibold">Candidate</th>
                <th className="pb-3 font-semibold">Applied Role</th>
                <th className="pb-3 font-semibold">Applied Date</th>
                <th className="pb-3 font-semibold">Review Status</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-border/60 text-charcoal-700">
              {APPLICATIONS.map((app) => (
                <tr key={app.id} className="hover:bg-cream-surface/40">
                  <td className="py-3.5">
                    <span className="font-bold text-charcoal-900 block">{app.applicant}</span>
                    <span className="text-xs text-charcoal-500">{app.email} • {app.phone}</span>
                  </td>
                  <td className="py-3.5 font-medium">{app.role}</td>
                  <td className="py-3.5 text-xs text-charcoal-500">{formatDate(app.date)}</td>
                  <td className="py-3.5">
                    <Badge variant={app.variant} size="sm" dot>
                      {app.label}
                    </Badge>
                  </td>
                  <td className="py-3.5 text-right">
                    <Link to={`/admin/contracts/applications/${app.id}`}>
                      <Button variant="ghost" size="sm" icon={Eye} className="h-8">
                        Review Candidate
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
