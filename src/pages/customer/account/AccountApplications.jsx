import React from 'react';
import { Briefcase, Calendar, CheckCircle2, Clock } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { formatDate } from '../../../lib/formatters';

export default function AccountApplications() {
  const MOCK_APPLICATIONS = [
    {
      id: 'app-1',
      contractTitle: 'Weekend Event Pastry Chef',
      department: 'Bakery Operations',
      appliedDate: '2026-08-22',
      status: 'UNDER_REVIEW',
      statusLabel: 'Under Review',
      statusVariant: 'warning',
      feedback: 'Your CV has been reviewed by the head chef. Interview shortlisting scheduled for Monday.',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-display text-charcoal-900">
          My Contract Applications
        </h2>
      </div>

      <div className="space-y-3">
        {MOCK_APPLICATIONS.map((app) => (
          <Card key={app.id} className="p-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs text-charcoal-500 font-medium block">
                  {app.department}
                </span>
                <h3 className="text-base font-bold text-charcoal-900 font-display">
                  {app.contractTitle}
                </h3>
              </div>
              <Badge variant={app.statusVariant} dot>
                {app.statusLabel}
              </Badge>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-charcoal-500">
              <Clock className="w-3.5 h-3.5" />
              <span>Applied on {formatDate(app.appliedDate)}</span>
            </div>

            {app.feedback && (
              <div className="p-3.5 bg-cream-surface rounded-xl border border-cream-border text-xs text-charcoal-700">
                <span className="font-bold text-charcoal-900 block mb-0.5">Admin Note:</span>
                {app.feedback}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
