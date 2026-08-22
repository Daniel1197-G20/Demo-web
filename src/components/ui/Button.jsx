import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  type = 'button',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus-ring select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';

  const variants = {
    primary:
      'bg-tory-500 text-white hover:bg-tory-600 active:bg-tory-700 shadow-tory-sm hover:shadow-tory-md',
    secondary:
      'bg-tory-100 text-tory-800 hover:bg-tory-200 active:bg-tory-300 font-semibold',
    outline:
      'border-2 border-tory-500 text-tory-500 hover:bg-tory-50 active:bg-tory-100',
    ghost:
      'text-charcoal-700 hover:bg-cream-surface hover:text-tory-500',
    danger:
      'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
    gold:
      'bg-gold-500 text-charcoal-900 font-semibold hover:bg-gold-400 active:bg-gold-600 shadow-sm',
    white:
      'bg-white text-charcoal-900 hover:bg-cream-surface border border-cream-border shadow-sm',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs rounded-full gap-1.5',
    md: 'h-11 px-5 text-sm rounded-full gap-2',
    lg: 'h-13 px-7 text-base rounded-full gap-2.5 font-semibold',
    icon: 'h-10 w-10 p-0 rounded-full flex items-center justify-center',
    'icon-sm': 'h-8 w-8 p-0 rounded-full flex items-center justify-center text-xs',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
}
