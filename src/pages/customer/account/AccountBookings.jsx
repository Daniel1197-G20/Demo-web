import React from 'react';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { formatDate } from '../../../lib/formatters';
import { useCachedData } from '../../../hooks/useCachedData';
import { CACHE_TTL } from '../../../lib/cache';
import { SkeletonBookingRow } from '../../../components/ui/Skeleton';
import Tooltip from '../../../components/ui/Tooltip';

export default function AccountBookings() {
  const MOCK_BOOKINGS = [
    {
      id: 'bk-1',
      bookingNumber: 'TT-BK-202608-2041',
      eventType: 'Wedding Reception',
      eventDate: '2026-09-12',
      guestCount: 150,
      venue: 'Civic Centre, Victoria Island',
      status: 'QUOTED',
      statusLabel: 'Quote Ready',
      statusVariant: 'info',
    },
  ];

  const { data: bookings, isLoading } = useCachedData(
    'account:bookings',
    () => MOCK_BOOKINGS,
    { ttl: CACHE_TTL.DEFAULT }
  );

  const bookingList = bookings || MOCK_BOOKINGS;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-display text-charcoal-900">
          Catering & Event Bookings
        </h2>
      </div>

      {isLoading ? (
        <div className="space-y-3" aria-busy="true">
          <SkeletonBookingRow />
        </div>
      ) : (
        <div className="space-y-3">
          {bookingList.map((booking) => (
          <Card key={booking.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-charcoal-900 font-display">
                  {booking.bookingNumber}
                </span>
                <Badge variant={booking.statusVariant} size="sm" dot>
                  {booking.statusLabel}
                </Badge>
              </div>

              <h4 className="text-sm font-bold text-charcoal-900">{booking.eventType}</h4>

              <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(booking.eventDate)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{booking.guestCount} Guests</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{booking.venue}</span>
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm">
              View Quote Details
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
