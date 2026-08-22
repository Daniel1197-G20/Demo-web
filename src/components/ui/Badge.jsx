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
    primary: 'bg-tory-500 text-white',
    secondary: 'bg-tory-100 text-tory-800 border border-tory-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    error: 'bg-rose-50 text-rose-700 border border-rose-200',
    info: 'bg-sky-50 text-sky-700 border border-sky-200',
    gold: 'bg-gold-50 text-gold-600 border border-gold-400 font-semibold',
    neutral: 'bg-charcoal-100 text-charcoal-700 border border-charcoal-300',
    outline: 'bg-transparent text-charcoal-700 border border-charcoal-300',
    'outline-pink': 'bg-transparent text-tory-500 border border-tory-300',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[11px] font-medium rounded-full',
    md: 'px-2.5 py-1 text-xs font-semibold rounded-full',
    lg: 'px-3.5 py-1.5 text-sm font-semibold rounded-full',
  };

  const dotColors = {
    primary: 'bg-white',
    secondary: 'bg-tory-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-rose-500',
    info: 'bg-sky-500',
    gold: 'bg-gold-500',
    neutral: 'bg-charcoal-500',
    outline: 'bg-charcoal-500',
    'outline-pink': 'bg-tory-500',
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
