import React from 'react';

export default function AdminFilterPill({
  label,
  count,
  isActive,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 focus:outline-none select-none ${
        isActive
          ? 'bg-[#E82C7C] text-white shadow-[0_2px_8px_rgba(232,44,124,0.35)]'
          : 'bg-white text-[#7A6B70] border border-[#F7DCE5] hover:border-[#E82C7C] hover:text-[#E82C7C] hover:bg-[#FFF5F8]'
      }`}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
            isActive ? 'bg-white/20 text-white' : 'bg-[#FFF5F8] text-[#7A6B70]'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
