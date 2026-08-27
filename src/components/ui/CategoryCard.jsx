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
        'group flex flex-col overflow-hidden rounded-3xl border border-[#F0D9E1] bg-white transition-all duration-300 hover:shadow-[0_10px_30px_rgba(232,44,124,0.1)] hover:border-[#E82C7C] hover:-translate-y-1 active:scale-[0.99]',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FFF5F8]">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B2024]/60 via-[#2B2024]/10 to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />
        
        {/* Count Badge Overlay */}
        <span className="absolute top-3 left-3 rounded-full bg-white/95 border border-[#FCE4EC] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#E82C7C] backdrop-blur-md shadow-xs">
          {displayCount}
        </span>
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <h3 className="font-display text-base sm:text-lg font-extrabold text-[#2B2024] group-hover:text-[#E82C7C] transition-colors">
            {title}
          </h3>
          {desc && (
            <p className="mt-1.5 text-xs sm:text-sm text-[#7A6B70] line-clamp-2 leading-relaxed">
              {desc}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#E82C7C] group-hover:translate-x-1 transition-transform">
          <span>Explore treats</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}
