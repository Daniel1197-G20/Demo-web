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
          className="text-xs font-semibold text-charcoal-700 flex items-center gap-1"
        >
          {label}
          {required && <span className="text-tory-500 font-bold">*</span>}
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
          'w-full p-3.5 bg-cream-base border rounded-md text-charcoal-900 text-sm placeholder:text-charcoal-500 transition-all duration-200 focus-ring resize-y',
          error
            ? 'border-red-400 focus-visible:ring-red-400 bg-red-50/20'
            : 'border-cream-border hover:border-charcoal-300 focus:border-tory-500 bg-cream-base',
          disabled && 'opacity-60 cursor-not-allowed bg-charcoal-100',
          textareaClassName
        )}
        {...props}
      />

      {error ? (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-charcoal-500">{helperText}</p>
      ) : null}
    </div>
  );
}
