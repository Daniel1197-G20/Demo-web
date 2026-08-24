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
    primary: 'bg-brand-700 text-white',
    secondary: 'bg-brand-100 text-brand-900 border border-brand-200',
    rose: 'bg-rose-100 text-rose-600 border border-rose-200',
    success: 'bg-success-50 text-success-500 border border-success-100',
    warning: 'bg-warning-50 text-warning-500 border border-warning-100',
    error: 'bg-error-50 text-error-500 border border-error-100',
    info: 'bg-info-50 text-info-500 border border-info-100',
    gold: 'bg-gold-50 text-gold-600 border border-gold-400 font-semibold',
    neutral: 'bg-charcoal-100 text-charcoal-700 border border-charcoal-300',
    outline: 'bg-transparent text-charcoal-700 border border-charcoal-300',
    'outline-brand': 'bg-transparent text-brand-700 border border-brand-300',
    'outline-pink': 'bg-transparent text-brand-700 border border-brand-300',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[11px] font-medium rounded-full',
    md: 'px-2.5 py-1 text-xs font-semibold rounded-full',
    lg: 'px-3.5 py-1.5 text-sm font-semibold rounded-full',
  };

  const dotColors = {
    primary: 'bg-white',
    secondary: 'bg-brand-700',
    rose: 'bg-rose-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
    info: 'bg-info-500',
    gold: 'bg-gold-500',
    neutral: 'bg-charcoal-500',
    outline: 'bg-charcoal-500',
    'outline-brand': 'bg-brand-700',
    'outline-pink': 'bg-brand-700',
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
