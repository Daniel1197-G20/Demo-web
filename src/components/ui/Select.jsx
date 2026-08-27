import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Select({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  children,
  error,
  helperText,
  disabled = false,
  required = false,
  placeholder = 'Select an option',
  className = '',
  selectClassName = '',
  ...props
}) {
  const selectId = id || name || Math.random().toString(36).substring(2, 9);

  return (
    <div className={cn('w-full flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-bold text-[#2B2024] flex items-center gap-1"
        >
          {label}
          {required && <span className="text-[#E82C7C] font-bold">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={cn(
            'w-full h-11 px-3.5 pr-10 bg-white border border-[#F0D9E1] rounded-2xl text-[#2B2024] text-sm appearance-none transition-all duration-200 focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC] hover:border-[#E82C7C]/60 cursor-pointer shadow-2xs',
            error
              ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#FEE2E2] bg-[#FEF2F2]/30'
              : 'border-[#F0D9E1] hover:border-[#E82C7C]/60 focus:border-[#E82C7C] bg-white',
            disabled && 'opacity-60 cursor-not-allowed bg-stone-50',
            selectClassName
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.length > 0
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>

        <div className="absolute right-3.5 pointer-events-none text-[#7A6B70]">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error ? (
        <p className="text-xs text-[#EF4444] font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#7A6B70]">{helperText}</p>
      ) : null}
    </div>
  );
}
