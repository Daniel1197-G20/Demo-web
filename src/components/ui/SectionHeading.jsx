import React from 'react';
import { cn } from '../../lib/utils';

export default function SectionHeading({
  tag,
  title,
  subtitle,
  align = 'center',
  action,
  className = '',
}) {
  const aligns = {
    center: 'text-center items-center mx-auto',
    left: 'text-left items-start',
    right: 'text-right items-end',
  };

  return (
    <div
      className={cn(
        'flex flex-col mb-8 sm:mb-12 max-w-2xl',
        aligns[align],
        className
      )}
    >
      {tag && (
        <span className="inline-block px-3 py-1 mb-2.5 text-xs font-bold tracking-wider uppercase text-brand-700 bg-brand-100 rounded-full">
          {tag}
        </span>
      )}

      {title && (
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-charcoal-900 font-display tracking-tight leading-tight">
          {title}
        </h2>
      )}

      {subtitle && (
        <p className="text-sm sm:text-base text-charcoal-700 mt-3 leading-relaxed">
          {subtitle}
        </p>
      )}

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
