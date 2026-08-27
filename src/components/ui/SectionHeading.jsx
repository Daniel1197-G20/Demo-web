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
        'flex flex-col mb-6 sm:mb-10 max-w-2xl',
        aligns[align],
        className
      )}
    >
      {tag && (
        <span className="inline-block px-3 py-1 mb-2.5 text-xs font-bold tracking-wider uppercase text-[#E82C7C] bg-[#FFF5F8] border border-[#FCE4EC] rounded-full shadow-2xs">
          {tag}
        </span>
      )}

      {title && (
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#2B2024] font-display tracking-tight leading-tight">
          {title}
        </h2>
      )}

      {subtitle && (
        <p className="text-xs sm:text-base text-[#7A6B70] mt-2 sm:mt-3 leading-relaxed">
          {subtitle}
        </p>
      )}

      {action && <div className="mt-3 sm:mt-4">{action}</div>}
    </div>
  );
}
