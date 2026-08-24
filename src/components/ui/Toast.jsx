import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function ToastItem({ toast, onDismiss }) {
  const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const Icon = icons[toast.type] || Info;

  const typeStyles = {
    success: 'bg-white border-success-100 text-charcoal-900 shadow-brand-md',
    error: 'bg-white border-error-100 text-charcoal-900 shadow-brand-md',
    warning: 'bg-white border-warning-100 text-charcoal-900 shadow-brand-md',
    info: 'bg-white border-info-100 text-charcoal-900 shadow-brand-md',
  };

  const iconColors = {
    success: 'text-success-500',
    error: 'text-error-500',
    warning: 'text-warning-500',
    info: 'text-info-500',
  };

  return (
    <div
      role="alert"
      className={cn(
        'w-full max-w-sm p-4 rounded-xl border flex items-start gap-3 transition-all duration-300 pointer-events-auto shadow-brand-md',
        typeStyles[toast.type]
      )}
    >
      <Icon className={cn('w-5 h-5 shrink-0 mt-0.5', iconColors[toast.type])} />

      <div className="flex-1 min-w-0">
        {toast.title && (
          <h4 className="text-sm font-semibold text-charcoal-900 leading-tight">
            {toast.title}
          </h4>
        )}
        <p className="text-xs text-charcoal-700 mt-0.5 leading-relaxed">
          {toast.message}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="text-charcoal-500 hover:text-charcoal-900 p-0.5 rounded-full hover:bg-cream-surface transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
