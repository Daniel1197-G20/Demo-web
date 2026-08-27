import React from 'react';
import { cn } from '../../lib/utils';

export default function Badge({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  dot = false,
  ...props
}) {
  const variants = {
    primary: 'bg-[#E82C7C] text-white',
    secondary: 'bg-[#FFF5F8] text-[#E82C7C] border border-[#FCE4EC] font-bold',
    pink: 'bg-[#FFF5F8] text-[#E82C7C] border border-[#FCE4EC] font-bold',
    rose: 'bg-[#FFF5F8] text-[#E82C7C] border border-[#FCE4EC]',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200 font-bold',
    error: 'bg-rose-50 text-rose-700 border border-rose-200 font-bold',
    info: 'bg-sky-50 text-sky-700 border border-sky-200 font-bold',
    gold: 'bg-[#FFF5F8] text-[#E82C7C] border border-[#FCE4EC] font-bold',
    neutral: 'bg-stone-100 text-[#7A6B70] border border-stone-200',
    outline: 'bg-transparent text-[#2B2024] border border-[#F0D9E1]',
    'outline-brand': 'bg-transparent text-[#E82C7C] border border-[#E82C7C]',
    'outline-pink': 'bg-transparent text-[#E82C7C] border border-[#E82C7C]',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[11px] font-bold rounded-full',
    md: 'px-2.5 py-1 text-xs font-bold rounded-full',
    lg: 'px-3.5 py-1.5 text-sm font-bold rounded-full',
  };

  const dotColors = {
    primary: 'bg-white',
    secondary: 'bg-[#E82C7C]',
    pink: 'bg-[#E82C7C]',
    rose: 'bg-[#E82C7C]',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-rose-500',
    info: 'bg-sky-500',
    gold: 'bg-[#E82C7C]',
    neutral: 'bg-[#7A6B70]',
    outline: 'bg-[#7A6B70]',
    'outline-brand': 'bg-[#E82C7C]',
    'outline-pink': 'bg-[#E82C7C]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-sans tracking-wide leading-none select-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />}
      {children}
    </span>
  );
}
