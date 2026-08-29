import React from 'react';
import { cn } from '../../lib/utils';

/**
 * ==============================================================================
 * TORY'S TREATS — COMPREHENSIVE SKELETON LOADING SYSTEM
 * ==============================================================================
 * Designed to mirror actual production page layouts, eliminate layout shifts,
 * support dark & light modes, and strictly honor prefers-reduced-motion.
 */

// 1. BASE SKELETON PRIMITIVE
export function Skeleton({
  as: Component = 'div',
  variant = 'shimmer', // 'shimmer' | 'pulse' | 'soft' | 'dark'
  className = '',
  style,
  ...props
}) {
  const variantClass =
    variant === 'dark'
      ? 'skeleton-shimmer-dark border border-[#30363d] bg-[#161b22]'
      : variant === 'pulse'
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

// 2. SKELETON TEXT
export function SkeletonText({
  lines = 3,
  className = '',
  lineClassName = 'h-3.5',
  gap = 'space-y-2',
  lastLineWidth = 'w-3/5',
  variant = 'shimmer',
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
            variant={variant}
            className={cn('rounded-full', lineClassName, widthClass)}
          />
        );
      })}
    </div>
  );
}

// 3. SKELETON CIRCLE (Avatars, icons)
export function SkeletonCircle({
  size = 'md', // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  variant = 'shimmer',
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
      variant={variant}
      className={cn('rounded-full shrink-0', sizeMap[size] || size, className)}
      {...props}
    />
  );
}

// 4. SKELETON BUTTON
export function SkeletonButton({
  size = 'md', // 'sm' | 'md' | 'lg'
  variant = 'pill', // 'pill' | 'rounded'
  theme = 'shimmer',
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
      variant={theme}
      className={cn(
        variant === 'pill' ? 'rounded-full' : 'rounded-2xl',
        sizeMap[size] || 'h-10 w-28',
        className
      )}
      {...props}
    />
  );
}

// 5. SKELETON BADGE
export function SkeletonBadge({ className = '', variant = 'shimmer' }) {
  return (
    <Skeleton
      variant={variant}
      className={cn('h-5 w-20 rounded-full', className)}
    />
  );
}

// 6. SKELETON PRODUCT CARD (Precision match for ProductCard.jsx)
export function SkeletonProductCard({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'flex flex-col overflow-hidden rounded-3xl border border-[#F0D9E1] bg-white shadow-brand-sm',
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FFF5F8]">
        <Skeleton className="h-full w-full rounded-none" />
        <div className="absolute top-3 left-3">
          <Skeleton className="h-5 w-16 rounded-full bg-white/80" />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 gap-3">
        <div className="space-y-2">
          <Skeleton className="h-5 w-4/5 rounded-full" />
          <Skeleton className="h-3.5 w-full rounded-full" />
          <Skeleton className="h-3 w-1/2 rounded-full" />
        </div>

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
export const ProductCardSkeleton = SkeletonProductCard;

// 7. SKELETON CATEGORY CARD
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

// 8. SKELETON EVENT CARD
export function SkeletonEventCard({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'rounded-3xl border border-[#F0D9E1] bg-white p-4 sm:p-5 flex flex-col gap-3 shadow-brand-sm overflow-hidden',
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
      <div className="pt-3 border-t border-[#F0D9E1] flex justify-between items-center mt-auto">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-9 w-28 rounded-full" />
      </div>
    </div>
  );
}

// 9. SKELETON SERVICE / CATERING PACKAGE CARD
export function SkeletonServiceCard({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'rounded-3xl border border-white/20 bg-white/10 p-5 sm:p-6 flex flex-col justify-between space-y-4 text-white',
        className
      )}
    >
      <Skeleton className="w-full aspect-[16/10] rounded-2xl bg-white/20" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-24 rounded-full bg-white/30" />
        <Skeleton className="h-6 w-3/4 rounded-full bg-white/40" />
        <SkeletonText lines={2} lineClassName="h-3 bg-white/20" />
      </div>
      <div className="space-y-2 pt-2 border-t border-white/10">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-3.5 w-full rounded-full bg-white/20" />
        ))}
      </div>
      <Skeleton className="h-11 w-full rounded-full bg-white/40 mt-auto" />
    </div>
  );
}

// 10. SKELETON STAT CARD
export function SkeletonStatCard({ className = '', variant = 'shimmer' }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'p-5 sm:p-6 rounded-3xl bg-white border border-[#F7DCE5] shadow-[0_4px_20px_rgba(232,44,124,0.04)] space-y-3',
        variant === 'dark' && 'bg-[#0d1117] border-[#30363d] shadow-sm',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <Skeleton variant={variant} className="h-3.5 w-24 rounded-full" />
        <SkeletonCircle variant={variant} size="md" />
      </div>
      <Skeleton variant={variant} className="h-8 w-24 rounded-xl" />
      <div className="flex items-center justify-between pt-1">
        <Skeleton variant={variant} className="h-3 w-28 rounded-full" />
        <Skeleton variant={variant} className="h-5 w-20 rounded-full" />
      </div>
    </div>
  );
}

// 11. SKELETON TABLE ROW
export function SkeletonTableRow({
  cols = 5,
  colWidths = [],
  variant = 'shimmer',
  className = '',
}) {
  return (
    <tr className={cn('border-b border-[#F7DCE5]/60', variant === 'dark' && 'border-[#21262d]', className)} aria-hidden="true">
      {Array.from({ length: cols }).map((_, idx) => {
        const width = colWidths[idx] || (idx === 0 ? 'w-40' : 'w-24');
        return (
          <td key={idx} className="py-3.5 px-3">
            <div className="flex items-center gap-2">
              {idx === 0 && (
                <Skeleton variant={variant} className="w-9 h-9 rounded-xl shrink-0" />
              )}
              <div className="space-y-1 flex-1">
                <Skeleton variant={variant} className={cn('h-3.5 rounded-full', width)} />
                {idx === 0 && (
                  <Skeleton variant={variant} className="h-2.5 w-20 rounded-full" />
                )}
              </div>
            </div>
          </td>
        );
      })}
    </tr>
  );
}

// 12. SKELETON FORM
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

// 13. SKELETON CARD (Editorial Container)
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

// 14. SKELETON BOOKING ROW
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

// 15. SKELETON ORDER ITEM
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

// 16. SKELETON CUSTOMER ROW
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

// 13. SKELETON NAVBAR (Customer Layout Top Bar)
export function SkeletonNavbar() {
  return (
    <header className="h-20 bg-white border-b border-[#F0D9E1] px-4 sm:px-8 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        <SkeletonCircle size="lg" />
        <div className="space-y-1 hidden sm:block">
          <Skeleton className="h-5 w-28 rounded-full" />
          <Skeleton className="h-3 w-36 rounded-full" />
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-20 rounded-full" />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <SkeletonCircle size="md" />
        <SkeletonButton size="sm" className="hidden sm:inline-flex" />
      </div>
    </header>
  );
}

// ==============================================================================
// PAGE-SPECIFIC COMPOSITE SKELETONS
// ==============================================================================

// A. HOMEPAGE SKELETON
export function SkeletonHomepage() {
  return (
    <div className="space-y-12 sm:space-y-16 animate-fadeIn" role="status" aria-busy="true" aria-label="Loading Tory's Treats Homepage">
      <span className="sr-only">Loading Tory's Treats...</span>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#FFF5F8]/60 via-white to-white pt-6 pb-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <Skeleton className="h-7 w-64 rounded-full" />
            <Skeleton className="h-12 w-full sm:w-4/5 rounded-2xl" />
            <Skeleton className="h-12 w-3/4 rounded-2xl" />
            <SkeletonText lines={3} lineClassName="h-4" className="max-w-lg pt-1" />
            <div className="flex gap-3 pt-2">
              <SkeletonButton size="lg" className="w-44" />
              <SkeletonButton size="lg" className="w-44" />
            </div>
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-[#F0D9E1] max-w-md">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-3 w-16 rounded-full" />
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-3xl border border-[#F0D9E1] bg-[#FFF5F8] p-4 aspect-[4/3] sm:aspect-square flex items-center justify-center">
              <Skeleton className="w-full h-full rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Curated Collection Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <Skeleton className="h-4 w-32 rounded-full mx-auto" />
          <Skeleton className="h-8 w-64 rounded-full mx-auto" />
          <Skeleton className="h-3.5 w-full rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCategoryCard key={i} />
          ))}
        </div>
      </section>

      {/* Featured Treats Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <Skeleton className="h-4 w-28 rounded-full" />
            <Skeleton className="h-7 w-48 rounded-full" />
          </div>
          <SkeletonButton size="sm" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonProductCard key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

// B. SHOP PAGE SKELETON
export function SkeletonShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8 animate-fadeIn" role="status" aria-busy="true" aria-label="Loading Shop Catalog">
      <span className="sr-only">Loading treats catalog...</span>

      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Skeleton className="h-6 w-48 rounded-full mx-auto" />
        <Skeleton className="h-10 w-80 rounded-2xl mx-auto" />
        <SkeletonText lines={2} lineClassName="h-3.5" className="max-w-md mx-auto" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 bg-[#FFF5F8] p-4 rounded-2xl border border-[#F0D9E1]">
        <Skeleton className="h-11 flex-1 rounded-2xl" />
        <Skeleton className="h-11 w-44 rounded-2xl" />
      </div>

      <div className="flex gap-2 overflow-x-hidden pb-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-28 rounded-full shrink-0" />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonProductCard key={i} />
        ))}
      </div>
    </div>
  );
}

// C. PRODUCT DETAILS SKELETON
export function SkeletonProductDetails() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-fadeIn" role="status" aria-busy="true" aria-label="Loading Product Details">
      <span className="sr-only">Loading product details...</span>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 space-y-4">
          <Skeleton className="w-full aspect-square rounded-3xl" />
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-2xl" />
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 space-y-5">
          <Skeleton className="h-5 w-28 rounded-full" />
          <Skeleton className="h-9 w-4/5 rounded-2xl" />
          <Skeleton className="h-7 w-32 rounded-full" />
          <SkeletonText lines={4} lineClassName="h-3.5" />
          <div className="p-4 rounded-2xl border border-[#F0D9E1] bg-[#FFF5F8] space-y-2">
            <Skeleton className="h-4 w-36 rounded-full" />
            <Skeleton className="h-3.5 w-full rounded-full" />
          </div>
          <div className="flex gap-4 pt-3">
            <Skeleton className="h-12 w-32 rounded-full" />
            <SkeletonButton size="lg" className="flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

// D. CATERING & BOOKING SKELETON
export function SkeletonCateringPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10 animate-fadeIn" role="status" aria-busy="true" aria-label="Loading Catering Inquiry Form">
      <span className="sr-only">Loading event catering...</span>

      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Skeleton className="h-6 w-36 rounded-full mx-auto" />
        <Skeleton className="h-10 w-72 rounded-2xl mx-auto" />
        <SkeletonText lines={2} lineClassName="h-3.5" className="max-w-md mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCategoryCard key={i} />
        ))}
      </div>

      <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-[#F0D9E1] shadow-brand-sm space-y-6">
        <Skeleton className="h-6 w-48 rounded-full" />
        <SkeletonForm fields={6} />
      </div>
    </div>
  );
}

// E. ADMIN DASHBOARD SKELETON
export function SkeletonAdminDashboard() {
  return (
    <div className="space-y-6 animate-fadeIn" role="status" aria-busy="true" aria-label="Loading Admin Dashboard">
      <span className="sr-only">Loading Admin Dashboard...</span>

      <div className="flex justify-between items-center border-b border-[#F7DCE5] pb-4">
        <div className="space-y-1">
          <Skeleton className="h-7 w-48 rounded-2xl" />
          <Skeleton className="h-3.5 w-64 rounded-full" />
        </div>
        <SkeletonButton size="sm" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonStatCard key={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-3xl bg-white border border-[#F7DCE5] space-y-4">
          <Skeleton className="h-5 w-36 rounded-full" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-2xl" />
            ))}
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#F7DCE5] space-y-4">
          <Skeleton className="h-5 w-36 rounded-full" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// F. DEVELOPER CONSOLE SKELETON (Dark Infrastructure Theme)
export function SkeletonDeveloperConsole() {
  return (
    <div className="space-y-6 animate-fadeIn font-mono text-xs" role="status" aria-busy="true" aria-label="Loading Developer Operations Console">
      <span className="sr-only">Loading developer telemetry...</span>

      <div className="flex justify-between items-center border-b border-[#30363d] pb-4">
        <div className="space-y-1.5">
          <Skeleton variant="dark" className="h-6 w-56 rounded-lg" />
          <Skeleton variant="dark" className="h-3 w-80 rounded-full" />
        </div>
        <Skeleton variant="dark" className="h-8 w-32 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonStatCard key={i} variant="dark" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-3">
          <Skeleton variant="dark" className="h-4 w-44 rounded-full" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton variant="dark" key={i} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-3">
          <Skeleton variant="dark" className="h-4 w-44 rounded-full" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton variant="dark" key={i} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// G. ACCOUNT / AUTH SKELETON
export function SkeletonAccountPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-6 animate-fadeIn" role="status" aria-busy="true" aria-label="Loading Customer Account">
      <span className="sr-only">Loading account...</span>

      <div className="flex items-center gap-4 border-b border-[#F0D9E1] pb-5">
        <SkeletonCircle size="xl" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-48 rounded-full" />
          <Skeleton className="h-3.5 w-36 rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-11 w-full rounded-2xl" />
          ))}
        </div>
        <div className="lg:col-span-3 p-6 rounded-3xl bg-white border border-[#F0D9E1] shadow-brand-sm space-y-4">
          <Skeleton className="h-6 w-40 rounded-full" />
          <SkeletonText lines={3} lineClassName="h-3.5" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

// H. AUTH (LOGIN / REGISTER) SKELETON
export function SkeletonAuthPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4" role="status" aria-busy="true" aria-label="Loading Authentication">
      <span className="sr-only">Loading sign in...</span>
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#F7DCE5] p-6 sm:p-8 space-y-6 shadow-brand-sm">
        <div className="text-center space-y-2">
          <SkeletonCircle size="lg" className="mx-auto" />
          <Skeleton className="h-6 w-36 rounded-full mx-auto" />
          <Skeleton className="h-3.5 w-48 rounded-full mx-auto" />
        </div>
        <SkeletonForm fields={2} />
      </div>
    </div>
  );
}

// ==============================================================================
// DYNAMIC CONTEXT-AWARE ROUTE LOADING SKELETON
// ==============================================================================
export function RouteSkeletonFallback() {
  if (typeof window === 'undefined') {
    return <SkeletonHomepage />;
  }

  const pathname = window.location.pathname.toLowerCase();

  if (pathname.startsWith('/developer')) {
    return <SkeletonDeveloperConsole />;
  }
  if (pathname.startsWith('/admin')) {
    return <SkeletonAdminDashboard />;
  }
  if (pathname.startsWith('/shop') || pathname.startsWith('/categories')) {
    return <SkeletonShopPage />;
  }
  if (pathname.startsWith('/catering') || pathname.startsWith('/contracts') || pathname.startsWith('/checkout') || pathname.startsWith('/events')) {
    return <SkeletonCateringPage />;
  }
  if (pathname.startsWith('/account')) {
    return <SkeletonAccountPage />;
  }
  if (pathname.startsWith('/auth')) {
    return <SkeletonAuthPage />;
  }

  return <SkeletonHomepage />;
}

export default Skeleton;
