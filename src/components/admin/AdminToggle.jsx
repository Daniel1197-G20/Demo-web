import React from 'react';

export default function AdminToggle({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  id,
}) {
  const toggleId = id || `toggle-${Math.random().toString(36).substring(2, 8)}`;

  return (
    <div className="flex items-start justify-between gap-4 py-2">
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <label
              htmlFor={toggleId}
              className="text-xs sm:text-sm font-bold text-[#2B2024] cursor-pointer select-none block"
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-[#7A6B70] mt-0.5 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      <button
        id={toggleId}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#E82C7C] focus:ring-offset-2 ${
          checked ? 'bg-[#E82C7C]' : 'bg-stone-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
