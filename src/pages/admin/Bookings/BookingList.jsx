import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Eye } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { formatDate } from '../../../lib/formatters';

export default function BookingList() {
  const BOOKINGS = [
    { id: '1', bookingNumber: 'TT-BK-202608-2041', customer: 'Dr. Bimbo Alabi', eventType: 'Wedding Reception', date: '2026-09-12', guests: 150, status: 'QUOTED', label: 'Quote Formulated', variant: 'info' },
    { id: '2', bookingNumber: 'TT-BK-202608-2040', customer: 'Oluwaseun Bakare', eventType: 'Corporate Product Launch', date: '2026-08-30', guests: 80, status: 'REVIEWING', label: 'Under Review', variant: 'warning' },
    { id: '3', bookingNumber: 'TT-BK-202608-2039', customer: 'Zainab Dangote', eventType: 'Milestone Birthday Party', date: '2026-09-05', guests: 200, status: 'CONFIRMED', label: 'Confirmed', variant: 'success' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900">
          Catering & Event Inquiries
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
          Review event inquiries, generate customized menu proposals, and manage event schedules.
        </p>
      </div>

      <Card className="p-6 overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-cream-border text-charcoal-500 uppercase tracking-wider text-xs">
              <th className="pb-3 font-semibold">Booking Ref</th>
              <th className="pb-3 font-semibold">Client</th>
              <th className="pb-3 font-semibold">Event Type</th>
              <th className="pb-3 font-semibold">Event Date</th>
              <th className="pb-3 font-semibold">Guests</th>
              <th className="pb-3 font-semibold">Booking Stage</th>
              <th className="pb-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-border/60 text-charcoal-700">
            {BOOKINGS.map((b) => (
              <tr key={b.id} className="hover:bg-cream-surface/40">
                <td className="py-3.5 font-bold text-charcoal-900">{b.bookingNumber}</td>
                <td className="py-3.5 font-semibold">{b.customer}</td>
                <td className="py-3.5">{b.eventType}</td>
                <td className="py-3.5 text-xs text-charcoal-500">{formatDate(b.date)}</td>
                <td className="py-3.5">{b.guests}</td>
                <td className="py-3.5">
                  <Badge variant={b.variant} size="sm" dot>
                    {b.label}
                  </Badge>
                </td>
                <td className="py-3.5 text-right">
                  <Link to={`/admin/bookings/${b.bookingNumber}`}>
                    <Button variant="ghost" size="sm" icon={Eye} className="h-8">
                      Review & Quote
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
