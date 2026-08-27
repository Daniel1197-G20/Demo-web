import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowRight, Sparkles } from 'lucide-react';
import { formatCurrency } from '../../lib/formatters';
import { cn } from '../../lib/utils';
import Badge from './Badge';

// Consistent Victoria Pink + White category styling
const CATEGORY_STYLES = {
  'Masterclasses & Workshops': {
    pill: 'bg-white/95 text-[#E82C7C] border-[#FCE4EC]',
    dot: 'bg-[#E82C7C]',
    headerBg: 'bg-[#E82C7C] text-white',
  },
  'Tastings & Pairings': {
    pill: 'bg-white/95 text-[#E82C7C] border-[#FCE4EC]',
    dot: 'bg-[#E82C7C]',
    headerBg: 'bg-[#E82C7C] text-white',
  },
  'Pop-Ups & Socials': {
    pill: 'bg-white/95 text-[#E82C7C] border-[#FCE4EC]',
    dot: 'bg-[#E82C7C]',
    headerBg: 'bg-[#E82C7C] text-white',
  },
  'Private Celebrations': {
    pill: 'bg-white/95 text-[#E82C7C] border-[#FCE4EC]',
    dot: 'bg-[#E82C7C]',
    headerBg: 'bg-[#E82C7C] text-white',
  },
};

export default function EventCard({
  event,
  className = '',
}) {
  const {
    id,
    slug = id,
    title,
    category = 'Masterclasses & Workshops',
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

  const catStyle = CATEGORY_STYLES[category] || CATEGORY_STYLES['Masterclasses & Workshops'];

  return (
    <div
      className={cn(
        'group flex flex-col overflow-hidden rounded-3xl border border-[#F0D9E1] bg-white transition-all duration-300 hover:shadow-[0_10px_30px_rgba(232,44,124,0.1)] hover:border-[#E82C7C] hover:-translate-y-1',
        isPast && 'opacity-75 grayscale-[20%]',
        className
      )}
    >
      {/* Event Image Container */}
      <Link
        to={`/events/${slug}`}
        className="relative block aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#FFF5F8] focus:outline-none"
      >
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B2024]/80 via-[#2B2024]/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

        {/* Top-Left Category Pill with Colored Indicator Dot */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full backdrop-blur-md px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-xs border',
              catStyle.pill
            )}
          >
            <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', catStyle.dot)} />
            <span>{category}</span>
          </span>
        </div>

        {/* Top-Right Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          {isSoldOut ? (
            <Badge variant="error" size="sm" className="shadow-xs font-bold">
              Sold Out
            </Badge>
          ) : isAlmostFull ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF5F8] border border-[#FCE4EC] px-2.5 py-0.5 text-[10px] font-bold text-[#E82C7C] shadow-xs">
              <Sparkles className="w-3 h-3 text-[#E82C7C]" />
              <span>Only {spotsLeft} Left</span>
            </span>
          ) : isPast ? (
            <Badge variant="neutral" size="sm">
              Past Event
            </Badge>
          ) : null}
        </div>

        {/* Prominent Visual Date Block (Bottom-Left) */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2.5 z-10">
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white/95 backdrop-blur-md shadow-md border border-[#FCE4EC] overflow-hidden shrink-0 min-w-[52px]">
            <div
              className={cn(
                'w-full py-0.5 px-2 text-center text-[9px] font-bold uppercase tracking-wider',
                catStyle.headerBg
              )}
            >
              {month || 'SEP'}
            </div>
            <div className="px-2 py-1 text-center">
              <span className="font-display font-black text-base sm:text-lg leading-none text-[#2B2024] block">
                {day || '14'}
              </span>
            </div>
          </div>

          <div className="text-white drop-shadow-md">
            <span className="text-[11px] font-bold block leading-tight text-white">
              {dayOfWeek}
            </span>
            <span className="text-[10px] text-white/90 flex items-center gap-1 leading-tight font-medium">
              <Clock className="w-3 h-3 text-[#FCE4EC]" />
              <span>{time}</span>
            </span>
          </div>
        </div>
      </Link>

      {/* Event Details */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 gap-3.5">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#7A6B70] mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#E82C7C] shrink-0" />
            <span className="truncate">{location}</span>
          </div>

          <Link to={`/events/${slug}`} className="focus:outline-none">
            <h3 className="font-display font-extrabold text-base sm:text-lg text-[#2B2024] group-hover:text-[#E82C7C] transition-colors line-clamp-2 leading-snug">
              {title}
            </h3>
          </Link>

          {description && (
            <p className="mt-1.5 text-xs sm:text-sm text-[#7A6B70] line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#F0D9E1] mt-auto">
          <div className="min-w-0">
            <span className="text-[10px] text-[#7A6B70] uppercase tracking-wider block font-bold leading-none mb-1">
              {typeof price === 'number' && price > 0 ? 'Experience Fee' : 'Access'}
            </span>
            <span className="font-display font-black text-sm sm:text-base md:text-lg text-[#E82C7C] truncate block">
              {typeof price === 'number' && price > 0 ? formatCurrency(price) : 'Free RSVP'}
            </span>
          </div>

          <Link
            to={`/events/${slug}`}
            className={cn(
              'inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs font-bold transition-all duration-200 shadow-xs active:scale-95 shrink-0 focus:outline-none focus:ring-2 focus:ring-[#FCE4EC]',
              isSoldOut
                ? 'bg-stone-100 text-[#7A6B70] cursor-not-allowed'
                : 'bg-[#E82C7C] text-white hover:bg-[#D31665] shadow-brand-sm'
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
