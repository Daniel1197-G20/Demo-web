import React from 'react';
import { cn } from '../../lib/utils';

export default function Textarea({
  label,
  id,
  name,
  rows = 4,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  className = '',
  textareaClassName = '',
  ...props
}) {
  const textareaId = id || name || Math.random().toString(36).substring(2, 9);

  return (
    <div className={cn('w-full flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={textareaId}
          className="text-xs font-bold text-[#2B2024] flex items-center gap-1"
        >
          {label}
          {required && <span className="text-[#E82C7C] font-bold">*</span>}
        </label>
      )}

      <textarea
        id={textareaId}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        className={cn(
          'w-full p-3.5 bg-white border border-[#F0D9E1] rounded-2xl text-[#2B2024] text-sm placeholder:text-[#7A6B70]/60 transition-all duration-200 focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC] hover:border-[#E82C7C]/60 shadow-2xs resize-y',
          error
            ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#FEE2E2] bg-[#FEF2F2]/30'
            : 'border-[#F0D9E1] hover:border-[#E82C7C]/60 focus:border-[#E82C7C] bg-white',
          disabled && 'opacity-60 cursor-not-allowed bg-stone-50',
          textareaClassName
        )}
        {...props}
      />

      {error ? (
        <p className="text-xs text-[#EF4444] font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#7A6B70]">{helperText}</p>
      ) : null}
    </div>
  );
}
