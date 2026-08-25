import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function CategoryCard({
  category,
  className = '',
}) {
  const {
    title,
    slug = '',
    desc,
    image,
    itemsCount,
    count,
  } = category || {};

  const displayCount = itemsCount ? `${itemsCount} Bakes` : count || 'Explore Menu';
  const targetLink = slug ? `/shop?category=${encodeURIComponent(title)}` : '/shop';

  return (
    <Link
      to={targetLink}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-cream-border bg-white transition-all duration-300 hover:shadow-brand-md hover:border-brand-200 hover:-translate-y-1 active:scale-[0.99]',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-surface">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-charcoal-900/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Count Badge Overlay */}
        <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-700 backdrop-blur-md shadow-xs">
          {displayCount}
        </span>
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <h3 className="font-display text-base sm:text-lg font-bold text-charcoal-900 group-hover:text-brand-700 transition-colors">
            {title}
          </h3>
          {desc && (
            <p className="mt-1.5 text-xs sm:text-sm text-charcoal-600 line-clamp-2 leading-relaxed">
              {desc}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center gap-1 text-xs font-bold text-brand-700 group-hover:translate-x-1 transition-transform">
          <span>Explore treats</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}
