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
    default: 'bg-white border border-[#F0D9E1] shadow-[0_4px_20px_rgba(232,44,124,0.04)]',
    cream: 'bg-[#FFF5F8] border border-[#FCE4EC] shadow-[0_4px_20px_rgba(232,44,124,0.04)]',
    flat: 'bg-white border border-[#F0D9E1]',
    brand: 'bg-[#FFF5F8] border border-[#FCE4EC] shadow-[0_4px_20px_rgba(232,44,124,0.04)]',
    rose: 'bg-[#FFF5F8] border border-[#FCE4EC] shadow-[0_4px_20px_rgba(232,44,124,0.04)]',
    pink: 'bg-[#FFF5F8] border border-[#FCE4EC] shadow-[0_4px_20px_rgba(232,44,124,0.04)]',
    outlined: 'bg-transparent border-2 border-[#F0D9E1]',
  };

  return (
    <div
      className={cn(
        'rounded-3xl transition-all duration-300 overflow-hidden',
        variants[variant],
        hover && 'hover:-translate-y-1 hover:border-[#E82C7C] hover:shadow-[0_10px_30px_rgba(232,44,124,0.08)] cursor-pointer',
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
    <div className={cn('p-5 sm:p-6 border-b border-[#F0D9E1]', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', ...props }) {
  return (
    <h3
      className={cn('text-lg sm:text-xl font-extrabold text-[#2B2024] font-display', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '', ...props }) {
  return (
    <p className={cn('text-xs sm:text-sm text-[#7A6B70] mt-1', className)} {...props}>
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
