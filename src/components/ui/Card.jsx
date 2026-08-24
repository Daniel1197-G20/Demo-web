import React from 'react';
import { cn } from '../../lib/utils';

export function Card({
  children,
  className = '',
  variant = 'default',
  hover = false,
  ...props
}) {
  const variants = {
    default: 'bg-white border border-cream-border shadow-brand-sm',
    cream: 'bg-cream-surface border border-cream-border shadow-brand-sm',
    flat: 'bg-white border border-cream-border',
    brand: 'bg-brand-50 border border-brand-100 shadow-brand-sm',
    rose: 'bg-rose-50 border border-rose-100 shadow-brand-sm',
    pink: 'bg-brand-50 border border-brand-100 shadow-brand-sm',
    outlined: 'bg-transparent border-2 border-cream-border',
  };

  return (
    <div
      className={cn(
        'rounded-xl transition-all duration-300 overflow-hidden',
        variants[variant],
        hover && 'hover:-translate-y-1 hover:shadow-brand-md cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={cn('p-5 sm:p-6 border-b border-cream-border/60', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', ...props }) {
  return (
    <h3
      className={cn('text-lg sm:text-xl font-bold text-charcoal-900 font-display', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '', ...props }) {
  return (
    <p className={cn('text-xs sm:text-sm text-charcoal-500 mt-1', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={cn('p-5 sm:p-6', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div
      className={cn('p-5 sm:p-6 pt-0 sm:pt-0 flex items-center justify-between', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
