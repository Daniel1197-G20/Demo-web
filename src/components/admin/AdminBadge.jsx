import React from 'react';

export default function AdminBadge({
  children,
  variant = 'pink',
  size = 'md',
  dot = false,
  className = '',
}) {
  const variants = {
    pink: 'bg-[#FFF5F8] text-[#E82C7C] border border-[#FCE4EC]',
    primary: 'bg-[#E82C7C] text-white',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200',
    info: 'bg-sky-50 text-sky-700 border border-sky-200',
    gold: 'bg-amber-50 text-amber-800 border border-amber-300 font-bold',
    neutral: 'bg-stone-100 text-stone-700 border border-stone-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px] font-bold',
    md: 'px-2.5 py-1 text-xs font-bold',
    lg: 'px-3 py-1.5 text-xs font-bold',
  };

  const dotColors = {
    pink: 'bg-[#E82C7C]',
    primary: 'bg-white',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    info: 'bg-sky-500',
    gold: 'bg-amber-500',
    neutral: 'bg-stone-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full leading-none tracking-wide select-none ${variants[variant] || variants.pink} ${sizes[size]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant] || 'bg-[#E82C7C]'}`} />}
      {children}
    </span>
  );
}
