import React from 'react';
import { cn } from '../../lib/utils';

export default function Input({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  className = '',
  inputClassName = '',
  ...props
}) {
  const inputId = id || name || Math.random().toString(36).substring(2, 9);

  return (
    <div className={cn('w-full flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-bold text-[#2B2024] flex items-center gap-1"
        >
          {label}
          {required && <span className="text-[#E82C7C] font-bold">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {LeadingIcon && (
          <div className="absolute left-3.5 pointer-events-none text-[#7A6B70]">
            <LeadingIcon className="w-4 h-4" />
          </div>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          className={cn(
            'w-full h-11 px-3.5 bg-white border border-[#F0D9E1] rounded-2xl text-[#2B2024] text-sm placeholder:text-[#7A6B70]/60 transition-all duration-200 focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC] hover:border-[#E82C7C]/60 shadow-2xs',
            LeadingIcon && 'pl-10',
            TrailingIcon && 'pr-10',
            error
              ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#FEE2E2] bg-[#FEF2F2]/30'
              : 'border-[#F0D9E1] hover:border-[#E82C7C]/60 focus:border-[#E82C7C] bg-white',
            disabled && 'opacity-60 cursor-not-allowed bg-stone-50',
            inputClassName
          )}
          {...props}
        />

        {TrailingIcon && (
          <div className="absolute right-3.5 pointer-events-none text-[#7A6B70]">
            <TrailingIcon className="w-4 h-4" />
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs text-[#EF4444] font-medium animate-fadeIn">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#7A6B70]">{helperText}</p>
      ) : null}
    </div>
  );
}
