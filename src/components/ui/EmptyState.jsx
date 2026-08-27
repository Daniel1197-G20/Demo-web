import React from 'react';
import { Cake, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import Button from './Button';

export default function EmptyState({
  title = 'Nothing here yet',
  description = "We couldn't find any items matching your criteria. Check back soon or try another filter!",
  icon: Icon = Cake,
  actionLabel,
  onAction,
  actionHref,
  className = '',
}) {
  return (
    <div
      className={cn(
        'w-full py-12 px-6 flex flex-col items-center justify-center text-center bg-white border border-dashed border-[#F0D9E1] rounded-3xl my-4 shadow-2xs',
        className
      )}
    >
      <div className="w-16 h-16 rounded-3xl bg-[#FFF5F8] border border-[#FCE4EC] flex items-center justify-center text-[#E82C7C] mb-4 shadow-xs relative">
        <Icon className="w-8 h-8 stroke-[2.2px]" />
        <Sparkles className="w-4 h-4 text-[#E82C7C] absolute -top-1 -right-1" />
      </div>

      <h3 className="text-lg sm:text-xl font-extrabold text-[#2B2024] font-display">
        {title}
      </h3>

      <p className="text-sm text-[#7A6B70] max-w-md mt-1.5 mb-6">
        {description}
      </p>

      {actionLabel && (
        actionHref ? (
          <a href={actionHref}>
            <Button variant="primary">{actionLabel}</Button>
          </a>
        ) : (
          <Button variant="primary" onClick={onAction}>
            {actionLabel}
          </Button>
        )
      )}
    </div>
  );
}
