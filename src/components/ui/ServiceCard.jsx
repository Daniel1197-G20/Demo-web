import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock, Check, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { formatCurrency } from '../../lib/formatters';

export default function ServiceCard({
  service,
  className = '',
}) {
  const {
    id,
    title,
    category = 'Event Catering',
    desc,
    image = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&auto=format&fit=crop&q=80',
    capacity = '50 - 300 Guests',
    startingPrice = 75000,
    features = [],
    ctaLabel = 'Request Catering Quote',
    link = '/catering',
  } = service || {};

  return (
    <div
      className={cn(
        'group flex flex-col overflow-hidden rounded-3xl border border-[#F0D9E1] bg-white transition-all duration-300 hover:shadow-[0_10px_30px_rgba(232,44,124,0.1)] hover:border-[#E82C7C] hover:-translate-y-1',
        className
      )}
    >
      {/* Visual Header */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#FFF5F8]">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B2024]/70 via-[#2B2024]/15 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category Pill */}
        <span className="absolute top-3 left-3 rounded-full bg-white/95 border border-[#FCE4EC] px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#E82C7C] backdrop-blur-md shadow-xs">
          {category}
        </span>

        {/* Capacity / Guests Tag */}
        {capacity && (
          <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-[#2B2024]/80 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md">
            <Users className="w-3 h-3 text-[#FCE4EC]" />
            <span>{capacity}</span>
          </span>
        )}
      </div>

      {/* Body Content */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 gap-4">
        <div>
          <h3 className="font-display text-lg sm:text-xl font-extrabold text-[#2B2024] group-hover:text-[#E82C7C] transition-colors">
            {title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#7A6B70] line-clamp-2 leading-relaxed">
            {desc}
          </p>

          {/* Features Checklist */}
          {features && features.length > 0 && (
            <ul className="mt-3.5 space-y-1.5 text-xs text-[#2B2024]">
              {features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#E82C7C] shrink-0" />
                  <span className="line-clamp-1">{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pricing & CTA Action */}
        <div className="pt-3 border-t border-[#F0D9E1]">
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-[11px] font-bold text-[#7A6B70] uppercase tracking-wider">
              Packages From
            </span>
            <span className="font-display text-base sm:text-lg font-black text-[#E82C7C]">
              {typeof startingPrice === 'number' ? formatCurrency(startingPrice) : startingPrice}
            </span>
          </div>

          <Link
            to={link}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#E82C7C] hover:bg-[#D31665] active:bg-[#B10C51] text-white px-4 py-3 text-xs sm:text-sm font-bold transition-all duration-200 shadow-brand-sm hover:shadow-brand-md active:scale-98 text-center"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
