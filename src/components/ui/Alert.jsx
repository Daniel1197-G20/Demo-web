import React from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Alert({
  children,
  title,
  type = 'info',
  onClose,
  className = '',
}) {
  const icons = {
    info: Info,
    success: CheckCircle2,
    warning: AlertTriangle,
    error: AlertCircle,
  };

  const Icon = icons[type] || Info;

  const styles = {
    info: 'bg-info-50 border-info-100 text-charcoal-900',
    success: 'bg-success-50 border-success-100 text-charcoal-900',
    warning: 'bg-warning-50 border-warning-100 text-charcoal-900',
    error: 'bg-error-50 border-error-100 text-charcoal-900',
  };

  const iconColors = {
    info: 'text-info-500',
    success: 'text-success-500',
    warning: 'text-warning-500',
    error: 'text-error-500',
  };

  return (
    <div
      role="alert"
      className={cn(
        'w-full p-4 rounded-xl border flex items-start gap-3 transition-all duration-200',
        styles[type],
        className
      )}
    >
      <Icon className={cn('w-5 h-5 shrink-0 mt-0.5', iconColors[type])} />

      <div className="flex-1 text-sm">
        {title && <h5 className="font-bold mb-1 leading-snug">{title}</h5>}
        <div className="text-xs sm:text-sm leading-relaxed">{children}</div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-1 -mr-1 rounded-full opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
