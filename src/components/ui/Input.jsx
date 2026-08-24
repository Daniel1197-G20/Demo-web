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
          className="text-xs font-semibold text-charcoal-700 flex items-center gap-1"
        >
          {label}
          {required && <span className="text-brand-700 font-bold">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {LeadingIcon && (
          <div className="absolute left-3.5 pointer-events-none text-charcoal-500">
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
            'w-full h-11 px-3.5 bg-cream-base border rounded-md text-charcoal-900 text-sm placeholder:text-charcoal-500 transition-all duration-200 focus-ring',
            LeadingIcon && 'pl-10',
            TrailingIcon && 'pr-10',
            error
              ? 'border-error-500 focus-visible:ring-error-500 bg-error-50/20'
              : 'border-cream-border hover:border-charcoal-300 focus:border-brand-700 bg-cream-base',
            disabled && 'opacity-60 cursor-not-allowed bg-charcoal-100',
            inputClassName
          )}
          {...props}
        />

        {TrailingIcon && (
          <div className="absolute right-3.5 pointer-events-none text-charcoal-500">
            <TrailingIcon className="w-4 h-4" />
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs text-error-500 font-medium animate-fadeIn">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-charcoal-500">{helperText}</p>
      ) : null}
    </div>
  );
}
