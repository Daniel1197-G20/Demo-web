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
          className="text-xs font-semibold text-charcoal-700 flex items-center gap-1"
        >
          {label}
          {required && <span className="text-brand-700 font-bold">*</span>}
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
            'w-full h-11 px-3.5 pr-10 bg-cream-base border rounded-md text-charcoal-900 text-sm appearance-none transition-all duration-200 focus-ring cursor-pointer',
            error
              ? 'border-error-500 focus-visible:ring-error-500 bg-error-50/20'
              : 'border-cream-border hover:border-charcoal-300 focus:border-brand-700 bg-cream-base',
            disabled && 'opacity-60 cursor-not-allowed bg-charcoal-100',
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

        <div className="absolute right-3.5 pointer-events-none text-charcoal-500">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error ? (
        <p className="text-xs text-error-500 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-charcoal-500">{helperText}</p>
      ) : null}
    </div>
  );
}
