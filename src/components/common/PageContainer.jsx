import React from 'react';
import { cn } from '../../lib/utils';

export default function PageContainer({
  children,
  className = '',
  size = 'default',
}) {
  const sizes = {
    sm: 'max-w-4xl',
    default: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn(
        'w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10',
        sizes[size],
        className
      )}
    >
      {children}
    </div>
  );
}
