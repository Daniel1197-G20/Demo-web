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
    'inline-flex items-center justify-center font-bold transition-all duration-200 focus-ring select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';

  const variants = {
    primary:
      'bg-[#E82C7C] text-white hover:bg-[#D31665] active:bg-[#B10C51] shadow-brand-sm hover:shadow-brand-md',
    secondary:
      'bg-white text-[#E82C7C] border border-[#E82C7C] hover:bg-[#FFF5F8] active:bg-[#FCE4EC]',
    outline:
      'border-2 border-[#E82C7C] text-[#E82C7C] hover:bg-[#FFF5F8] active:bg-[#FCE4EC]',
    tertiary:
      'bg-transparent text-[#2B2024] hover:bg-[#FFF5F8] hover:text-[#E82C7C]',
    ghost:
      'bg-transparent text-[#2B2024] hover:bg-[#FFF5F8] hover:text-[#E82C7C]',
    danger:
      'bg-[#EF4444] text-white hover:bg-[#DC2626] active:bg-[#B91C1C] shadow-xs',
    gold:
      'bg-[#FFF5F8] text-[#E82C7C] border border-[#FCE4EC] hover:bg-[#FCE4EC] shadow-xs',
    white:
      'bg-white text-[#2B2024] hover:bg-[#FFF5F8] hover:text-[#E82C7C] border border-[#F0D9E1] shadow-xs',
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
