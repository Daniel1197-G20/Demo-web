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
        'w-full py-12 px-6 flex flex-col items-center justify-center text-center bg-cream-surface/50 border border-dashed border-cream-border rounded-2xl my-4',
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 mb-4 shadow-sm relative">
        <Icon className="w-8 h-8" />
        <Sparkles className="w-4 h-4 text-gold-500 absolute -top-1 -right-1" />
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-charcoal-900 font-display">
        {title}
      </h3>

      <p className="text-sm text-charcoal-500 max-w-md mt-1.5 mb-6">
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
