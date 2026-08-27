import React from 'react';

export default function AdminStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendType = 'neutral', // 'positive' | 'neutral' | 'attention'
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`p-5 sm:p-6 rounded-3xl bg-white border border-[#F7DCE5] shadow-[0_4px_20px_rgba(232,44,124,0.04)] transition-all duration-300 ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5 hover:border-[#E82C7C] hover:shadow-[0_8px_25px_rgba(232,44,124,0.08)]' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#7A6B70] tracking-wide uppercase">
          {title}
        </span>
        {Icon && (
          <div className="w-10 h-10 rounded-2xl bg-[#FFF5F8] border border-[#FCE4EC] flex items-center justify-center text-[#E82C7C] shadow-xs">
            <Icon className="w-5 h-5 stroke-[2.2px]" />
          </div>
        )}
      </div>

      <div className="mt-3">
        <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#2B2024] tracking-tight">
          {value}
        </span>
      </div>

      {(subtitle || trend) && (
        <div className="mt-2 flex items-center justify-between text-xs">
          {subtitle && <span className="text-[#7A6B70]">{subtitle}</span>}
          {trend && (
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                trendType === 'positive'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : trendType === 'attention'
                  ? 'bg-[#FFF5F8] text-[#E82C7C] border border-[#FCE4EC]'
                  : 'bg-[#FFF5F8] text-[#7A6B70] border border-[#F7DCE5]'
              }`}
            >
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
