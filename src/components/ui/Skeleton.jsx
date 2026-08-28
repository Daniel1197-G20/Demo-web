import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Base Skeleton component with subtle brand shimmer/pulse effect.
 * Brand palette: White, Soft Pink (#FFF5F8), Light Pink (#FCE4EC), Tory Pink (#E82C7C / #F0D9E1 border).
 */
export function Skeleton({
  as: Component = 'div',
  variant = 'shimmer', // 'shimmer' | 'pulse' | 'soft'
  className = '',
  style,
  ...props
}) {
  const variantClass =
    variant === 'pulse'
      ? 'skeleton-pulse bg-pink-100/70 border border-pink-200/50'
      : variant === 'soft'
      ? 'bg-pink-50 border border-pink-100'
      : 'skeleton-shimmer border border-pink-200/60';

  return (
    <Component
      aria-hidden="true"
      className={cn('rounded-md transition-opacity', variantClass, className)}
      style={style}
      {...props}
    />
  );
}

/**
 * SkeletonText: Typography placeholder lines
 */
export function SkeletonText({
  lines = 3,
  className = '',
  lineClassName = 'h-3.5',
  gap = 'space-y-2',
  lastLineWidth = 'w-3/5',
  ...props
}) {
  return (
    <div className={cn(gap, className)} aria-hidden="true" {...props}>
      {Array.from({ length: lines }).map((_, index) => {
        const isLast = index === lines - 1;
        const widthClass = isLast && lines > 1 ? lastLineWidth : 'w-full';
        return (
          <Skeleton
            key={index}
            className={cn('rounded-full', lineClassName, widthClass)}
          />
        );
      })}
    </div>
  );
}

/**
 * SkeletonCircle: Circular avatar/icon placeholder
 */
export function SkeletonCircle({
  size = 'md', // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className = '',
  ...props
}) {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20',
  };

  return (
    <Skeleton
      className={cn('rounded-full shrink-0', sizeMap[size] || size, className)}
      {...props}
    />
  );
}

/**
 * SkeletonButton: Button placeholder
 */
export function SkeletonButton({
  size = 'md', // 'sm' | 'md' | 'lg'
  variant = 'pill', // 'pill' | 'rounded'
  className = '',
  ...props
}) {
  const sizeMap = {
    sm: 'h-8 px-4 w-24',
    md: 'h-10 px-6 w-32',
    lg: 'h-12 px-8 w-40',
  };

  return (
    <Skeleton
      className={cn(
        variant === 'pill' ? 'rounded-full' : 'rounded-2xl',
        sizeMap[size] || 'h-10 w-28',
        className
      )}
      {...props}
    />
  );
}

/**
 * SkeletonCard: Generic editorial card skeleton
 */
export function SkeletonCard({
  hasImage = true,
  imageAspect = 'aspect-[4/3]',
  lines = 2,
  hasFooter = true,
  className = '',
  ...props
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'rounded-3xl border border-[#F0D9E1] bg-white p-4 sm:p-5 flex flex-col gap-3 shadow-brand-sm overflow-hidden',
        className
      )}
      {...props}
    >
      {hasImage && (
        <Skeleton className={cn('w-full rounded-2xl', imageAspect)} />
      )}
      <div className="space-y-2 mt-1">
        <Skeleton className="w-3/4 h-5 rounded-full" />
        <SkeletonText lines={lines} lineClassName="h-3" />
      </div>
      {hasFooter && (
        <div className="pt-3 border-t border-[#F0D9E1] flex items-center justify-between mt-auto">
          <Skeleton className="w-20 h-5 rounded-full" />
          <SkeletonButton size="sm" />
        </div>
      )}
    </div>
  );
}

/**
 * SkeletonProductCard: Precision match for Tory's Treats ProductCard.jsx
 */
export function SkeletonProductCard({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'flex flex-col overflow-hidden rounded-3xl border border-[#F0D9E1] bg-white shadow-brand-sm',
        className
      )}
    >
      {/* Image box placeholder */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FFF5F8]">
        <Skeleton className="h-full w-full rounded-none" />
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex gap-1.5">
          <Skeleton className="h-5 w-16 rounded-full bg-white/80" />
        </div>
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3">
          <Skeleton className="h-5 w-24 rounded-full bg-white/90" />
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 gap-3">
        <div className="space-y-2">
          <Skeleton className="h-5 w-4/5 rounded-full" />
          <Skeleton className="h-3.5 w-full rounded-full hidden sm:block" />
          <Skeleton className="h-3 w-1/2 rounded-full" />
        </div>

        {/* Price & Add button footer */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#F0D9E1] mt-auto">
          <div className="space-y-1">
            <Skeleton className="h-2.5 w-10 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-9 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * Backward compatibility export
 */
export const ProductCardSkeleton = SkeletonProductCard;

/**
 * SkeletonTableRow: Table row skeleton for admin/orders/bookings tables
 */
export function SkeletonTableRow({
  cols = 5,
  colWidths = [],
  className = '',
}) {
  return (
    <tr className={cn('border-b border-[#F7DCE5]/60', className)} aria-hidden="true">
      {Array.from({ length: cols }).map((_, idx) => {
        const width = colWidths[idx] || (idx === 0 ? 'w-40' : 'w-24');
        return (
          <td key={idx} className="py-3.5 px-3">
            <div className="flex items-center gap-2">
              {idx === 0 && (
                <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
              )}
              <div className="space-y-1 flex-1">
                <Skeleton className={cn('h-3.5 rounded-full', width)} />
                {idx === 0 && (
                  <Skeleton className="h-2.5 w-20 rounded-full" />
                )}
              </div>
            </div>
          </td>
        );
      })}
    </tr>
  );
}

/**
 * SkeletonStatCard: Admin dashboard metric stat card skeleton
 */
export function SkeletonStatCard({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'p-5 sm:p-6 rounded-3xl bg-white border border-[#F7DCE5] shadow-[0_4px_20px_rgba(232,44,124,0.04)] space-y-3',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-3.5 w-24 rounded-full" />
        <SkeletonCircle size="md" />
      </div>

      <Skeleton className="h-8 w-20 rounded-xl" />

      <div className="flex items-center justify-between pt-1">
        <Skeleton className="h-3 w-28 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
    </div>
  );
}

/**
 * SkeletonBookingRow: Admin booking card or list item skeleton
 */
export function SkeletonBookingRow({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'p-4 rounded-2xl bg-[#FFF5F8]/50 border border-[#FCE4EC] space-y-3',
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <Skeleton className="h-2.5 w-20 rounded-full" />
          <Skeleton className="h-4 w-36 rounded-full" />
        </div>
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>

      <div className="bg-white p-3 rounded-xl border border-[#F7DCE5]/80 space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-3 w-24 rounded-full" />
          <Skeleton className="h-3 w-16 rounded-full" />
        </div>
        <Skeleton className="h-3 w-32 rounded-full" />
        <Skeleton className="h-3 w-48 rounded-full" />
      </div>

      <div className="pt-2 border-t border-[#F7DCE5] flex items-center justify-between">
        <Skeleton className="h-7 w-24 rounded-full" />
        <Skeleton className="h-7 w-28 rounded-full" />
      </div>
    </div>
  );
}

/**
 * SkeletonForm: Form input placeholder skeleton
 */
export function SkeletonForm({ fields = 4, hasButton = true, className = '' }) {
  return (
    <div aria-hidden="true" className={cn('space-y-5', className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {Array.from({ length: fields }).map((_, idx) => (
          <div key={idx} className="space-y-1.5">
            <Skeleton className="h-3.5 w-24 rounded-full" />
            <Skeleton className="h-11 w-full rounded-2xl" />
          </div>
        ))}
      </div>
      {hasButton && (
        <div className="flex justify-end pt-2">
          <Skeleton className="h-11 w-36 rounded-full" />
        </div>
      )}
    </div>
  );
}

/**
 * SkeletonCategoryCard: Category card skeleton for Collections/Categories
 */
export function SkeletonCategoryCard({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'rounded-3xl border border-[#F0D9E1] bg-white p-5 flex flex-col justify-between shadow-brand-sm space-y-4 overflow-hidden',
        className
      )}
    >
      <Skeleton className="w-full aspect-[4/3] rounded-2xl" />
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-32 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <SkeletonText lines={2} lineClassName="h-3" />
      </div>
    </div>
  );
}

/**
 * SkeletonEventCard: Masterclass and tasting event card skeleton
 */
export function SkeletonEventCard({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'rounded-3xl border border-cream-border bg-white p-4 sm:p-5 flex flex-col gap-3 shadow-brand-sm overflow-hidden',
        className
      )}
    >
      <Skeleton className="w-full aspect-[16/10] rounded-2xl" />
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-28 rounded-full" />
          <Skeleton className="h-4 w-20 rounded-full" />
        </div>
        <Skeleton className="h-6 w-4/5 rounded-full" />
        <SkeletonText lines={2} lineClassName="h-3" />
      </div>
      <div className="pt-3 border-t border-cream-border flex justify-between items-center mt-auto">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-9 w-28 rounded-full" />
      </div>
    </div>
  );
}

/**
 * SkeletonOrderItem: Order queue item placeholder
 */
export function SkeletonOrderItem({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'p-4 rounded-2xl bg-[#FFF5F8]/50 border border-[#FCE4EC] space-y-2.5',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-36 rounded-full" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>
      <div className="space-y-1.5">
        <Skeleton className="h-3.5 w-44 rounded-full" />
        <Skeleton className="h-3 w-56 rounded-full" />
      </div>
      <div className="pt-2 border-t border-[#F7DCE5] flex justify-end">
        <Skeleton className="h-8 w-28 rounded-full" />
      </div>
    </div>
  );
}

/**
 * SkeletonCustomerRow: Customer directory row skeleton
 */
export function SkeletonCustomerRow({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'p-4 rounded-2xl bg-[#FFF5F8]/50 border border-[#FCE4EC] space-y-2.5',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <Skeleton className="h-3 w-48 rounded-full" />
      <div className="flex justify-between items-center pt-2 border-t border-[#F7DCE5]">
        <Skeleton className="h-3 w-20 rounded-full" />
        <Skeleton className="h-4 w-24 rounded-full" />
      </div>
    </div>
  );
}

export default Skeleton;

