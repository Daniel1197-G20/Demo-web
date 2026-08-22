import React from 'react';
import { cn } from '../../lib/utils';

export function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={cn('animate-pulse bg-cream-border/70 rounded-md', className)}
      {...props}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-cream-border p-4 flex flex-col gap-3 shadow-tory-sm">
      <Skeleton className="w-full aspect-[4/3] rounded-lg" />
      <div className="flex justify-between items-center">
        <Skeleton className="w-20 h-4 rounded-full" />
        <Skeleton className="w-12 h-4 rounded-full" />
      </div>
      <Skeleton className="w-3/4 h-5 rounded" />
      <Skeleton className="w-full h-8 rounded mt-2" />
    </div>
  );
}

export default Skeleton;
