import React from 'react';
import { Search, X } from 'lucide-react';

export default function AdminSearchBar({
  value,
  onChange,
  placeholder = 'Search treats, clients, or bookings...',
  className = '',
}) {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <div className="absolute left-3.5 pointer-events-none text-[#7A6B70]">
        <Search className="w-4 h-4" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 pl-10 pr-10 bg-white border border-[#F7DCE5] rounded-full text-xs sm:text-sm text-[#2B2024] placeholder:text-[#7A6B70] transition-all duration-200 focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC] shadow-xs"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3.5 p-1 rounded-full text-[#7A6B70] hover:text-[#2B2024] hover:bg-[#FFF5F8] transition-colors"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
