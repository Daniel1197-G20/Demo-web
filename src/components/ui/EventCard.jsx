import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowRight, Sparkles } from 'lucide-react';
import { formatCurrency } from '../../lib/formatters';
import { cn } from '../../lib/utils';
import Badge from './Badge';

export default function EventCard({
  event,
  className = '',
}) {
  const {
    id,
    slug = id,
    title,
    category = 'Workshop',
    date = '2026-09-14',
    displayDate = 'Sept 14',
    dayOfWeek = 'Saturday',
    time = '2:00 PM - 6:00 PM',
    location = 'Victoria Island, Lagos',
    price = 35000,
    priceNote = 'per seat',
    description = '',
    image = 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=700&auto=format&fit=crop&q=80',
    status = 'AVAILABLE', // AVAILABLE, ALMOST_FULL, SOLD_OUT, PAST
    capacityNote = '12 Seats Total',
    spotsLeft = 4,
  } = event || {};

  // Extract month and day for the visual date badge
  const [month, day] = displayDate.split(' ');

  const isSoldOut = status === 'SOLD_OUT';
  const isAlmostFull = status === 'ALMOST_FULL' || (spotsLeft > 0 && spotsLeft <= 4);
  const isPast = status === 'PAST';

  return (
    <div
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-cream-border bg-white transition-all duration-300 hover:shadow-brand-md hover:border-brand-200 hover:-translate-y-1',
        isPast && 'opacity-75 grayscale-[20%]',
        className
      )}
    >
      {/* Event Image Container */}
      <Link
        to={`/events/${slug}`}
        className="relative block aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-cream-surface focus:outline-none"
      >
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-charcoal-900/15 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

        {/* Top-Left Category Badge */}
        <span className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-brand-700 shadow-xs z-10">
          {category}
        </span>

        {/* Top-Right Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          {isSoldOut ? (
            <Badge variant="error" size="sm" className="shadow-xs font-bold">
              Sold Out
            </Badge>
          ) : isAlmostFull ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-warning-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs animate-pulse">
              Only {spotsLeft} Left
            </span>
          ) : isPast ? (
            <Badge variant="neutral" size="sm">
              Past Event
            </Badge>
          ) : null}
        </div>

        {/* Prominent Visual Date Block (Bottom-Left) */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2.5 z-10">
          <div className="flex flex-col items-center justify-center rounded-xl bg-white/95 backdrop-blur-md px-2.5 py-1 text-charcoal-900 shadow-sm border border-white/40">
            <span className="font-display font-extrabold text-base sm:text-lg leading-none text-brand-700">
              {day || '14'}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-charcoal-600 leading-tight">
              {month || 'SEP'}
            </span>
          </div>

          <div className="text-white drop-shadow-md">
            <span className="text-[11px] font-semibold block leading-tight">
              {dayOfWeek}
            </span>
            <span className="text-[10px] text-white/80 flex items-center gap-1 leading-tight">
              <Clock className="w-3 h-3 text-gold-400" />
              <span>{time}</span>
            </span>
          </div>
        </div>
      </Link>

      {/* Event Details */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 gap-3.5">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-charcoal-500 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-700 shrink-0" />
            <span className="truncate">{location}</span>
          </div>

          <Link to={`/events/${slug}`} className="focus:outline-none">
            <h3 className="font-display font-bold text-base sm:text-lg text-charcoal-900 group-hover:text-brand-700 transition-colors line-clamp-2 leading-snug">
              {title}
            </h3>
          </Link>

          {description && (
            <p className="mt-1.5 text-xs sm:text-sm text-charcoal-600 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-cream-border/80 mt-auto">
          <div className="min-w-0">
            <span className="text-[10px] text-charcoal-500 uppercase tracking-wider block font-semibold leading-none mb-1">
              {typeof price === 'number' && price > 0 ? 'Experience Fee' : 'Access'}
            </span>
            <span className="font-display font-extrabold text-sm sm:text-base md:text-lg text-charcoal-900 truncate block">
              {typeof price === 'number' && price > 0 ? formatCurrency(price) : 'Free RSVP'}
            </span>
          </div>

          <Link
            to={`/events/${slug}`}
            className={cn(
              'inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs font-bold transition-all duration-200 shadow-xs active:scale-95 shrink-0 focus-ring',
              isSoldOut
                ? 'bg-charcoal-100 text-charcoal-400 cursor-not-allowed'
                : 'bg-brand-700 text-white hover:bg-brand-800 hover:shadow-brand-sm'
            )}
          >
            <span>{isSoldOut ? 'Sold Out' : 'Reserve Spot'}</span>
            {!isSoldOut && <ArrowRight className="w-3.5 h-3.5" />}
          </Link>
        </div>
      </div>
    </div>
  );
}
