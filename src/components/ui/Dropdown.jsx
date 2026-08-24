import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

export default function Dropdown({
  trigger,
  items = [],
  children,
  align = 'right',
  className = '',
  menuClassName = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const alignments = {
    right: 'right-0 origin-top-right',
    left: 'left-0 origin-top-left',
    center: 'left-1/2 -translate-x-1/2 origin-top',
  };

  return (
    <div className={cn('relative inline-block text-left', className)} ref={dropdownRef}>
      <div onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            'absolute z-40 mt-2 w-56 rounded-xl bg-white border border-cream-border shadow-brand-md py-1.5 focus:outline-none transition-all duration-200',
            alignments[align],
            menuClassName
          )}
        >
          {items.length > 0
            ? items.map((item, index) => {
                if (item.divider) {
                  return <div key={index} className="my-1 border-t border-cream-border" />;
                }
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    type="button"
                    disabled={item.disabled}
                    onClick={() => {
                      if (item.onClick) item.onClick();
                      setIsOpen(false);
                    }}
                    className={cn(
                      'w-full px-4 py-2.5 text-xs sm:text-sm text-left flex items-center gap-2.5 transition-colors',
                      item.danger
                        ? 'text-error-500 hover:bg-error-50'
                        : 'text-charcoal-700 hover:bg-cream-surface hover:text-brand-700',
                      item.disabled && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    {Icon && <Icon className="w-4 h-4 shrink-0" />}
                    <span>{item.label}</span>
                  </button>
                );
              })
            : typeof children === 'function'
            ? children({ close: () => setIsOpen(false) })
            : children}
        </div>
      )}
    </div>
  );
}
