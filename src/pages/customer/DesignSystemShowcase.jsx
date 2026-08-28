import React, { useState } from 'react';
import PageContainer from '../../components/common/PageContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Dropdown from '../../components/ui/Dropdown';
import Alert from '../../components/ui/Alert';
import Skeleton, {
  ProductCardSkeleton,
  SkeletonCircle,
  SkeletonText,
  SkeletonButton,
  SkeletonProductCard,
  SkeletonCategoryCard,
  SkeletonEventCard,
  SkeletonStatCard,
  SkeletonBookingRow,
} from '../../components/ui/Skeleton';
import EmptyState from '../../components/ui/EmptyState';
import ProductCard from '../../components/ui/ProductCard';
import Tooltip, { TooltipInfo } from '../../components/ui/Tooltip';
import { frontendCache } from '../../lib/cache';
import { useToast } from '../../hooks/useToast';
import { Sparkles, Mail, Lock, Search, Heart, Cake, Check, AlertCircle } from 'lucide-react';

export default function DesignSystemShowcase() {
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');

  const sampleProduct = {
    id: 'demo-cake',
    slug: 'demo-cake',
    name: 'Belgian Truffle Chocolate Cake',
    price: 16000,
    images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80'],
    category: 'Artisanal Cakes',
    is_available: true,
    is_featured: true,
    min_order_quantity: 1,
  };

  return (
    <PageContainer>
      <SectionHeading
        tag="Design Tokens & Component Lab"
        title="Tory's Treats UI Design System"
        subtitle="Live interactive catalog of atomic UI components, color swatches, typography scales, form controls, and feedback states."
      />

      <div className="space-y-12">
        {/* 1. COLOR PALETTE SWATCHES */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold font-display text-charcoal-900 border-b pb-2">
            1. Core Color Swatches
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            <div className="p-3 rounded-xl bg-brand-700 text-white shadow-sm text-center">
              <span className="block text-xs font-bold">Brand Cocoa 700</span>
              <span className="text-[10px] opacity-80">#6B3A32</span>
            </div>
            <div className="p-3 rounded-xl bg-brand-400 text-white text-center">
              <span className="block text-xs font-bold">Warm Berry 400</span>
              <span className="text-[10px] opacity-80">#BC8177</span>
            </div>
            <div className="p-3 rounded-xl bg-brand-100 text-brand-800 text-center border border-brand-200">
              <span className="block text-xs font-bold">Warm Cream 100</span>
              <span className="text-[10px] opacity-80">#F5E9E6</span>
            </div>
            <div className="p-3 rounded-xl bg-cream-base text-charcoal-900 text-center border border-cream-border">
              <span className="block text-xs font-bold">Cream Base</span>
              <span className="text-[10px] text-charcoal-500">#FFFDF9</span>
            </div>
            <div className="p-3 rounded-xl bg-cream-surface text-charcoal-900 text-center border border-cream-border">
              <span className="block text-xs font-bold">Cream Surface</span>
              <span className="text-[10px] text-charcoal-500">#FAF6EE</span>
            </div>
            <div className="p-3 rounded-xl bg-charcoal-900 text-white text-center">
              <span className="block text-xs font-bold">Charcoal 900</span>
              <span className="text-[10px] opacity-80">#1C1917</span>
            </div>
            <div className="p-3 rounded-xl bg-gold-500 text-charcoal-900 text-center">
              <span className="block text-xs font-bold">Gold Accent</span>
              <span className="text-[10px] opacity-80">#F59E0B</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500 text-white text-center">
              <span className="block text-xs font-bold">Success Green</span>
              <span className="text-[10px] opacity-80">#10B981</span>
            </div>
          </div>
        </section>

        {/* 2. BUTTONS */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold font-display text-charcoal-900 border-b pb-2">
            2. Button Variants & States
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary Brand Cocoa</Button>
            <Button variant="secondary">Secondary Brand</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="gold">Gold Luxury</Button>
            <Button variant="danger">Danger Red</Button>
            <Button variant="primary" isLoading>
              Loading State
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
            <Button variant="primary" icon={Sparkles} iconPosition="left">
              With Icon
            </Button>
          </div>
        </section>

        {/* 3. FORM CONTROLS */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold font-display text-charcoal-900 border-b pb-2">
            3. Form Inputs & Validation States
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Standard Text Input"
              placeholder="e.g. Strawberry Velvet"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              helperText="Helper description text below input"
              leadingIcon={Cake}
            />

            <Input
              label="Email with Validation Error"
              type="email"
              value="invalid-email"
              error="Please provide a valid email address."
              leadingIcon={Mail}
            />

            <Select
              label="Bespoke Category"
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              options={[
                { value: 'cakes', label: 'Celebration Cakes' },
                { value: 'cupcakes', label: 'Box of Cupcakes' },
                { value: 'pastries', label: 'French Pastries' },
              ]}
            />

            <div className="md:col-span-3">
              <Textarea
                label="Special Dietary or Cake Inscription Requirements"
                placeholder="Include custom names, colors, or nut allergies here..."
                rows={3}
              />
            </div>
          </div>
        </section>

        {/* 4. BADGES */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold font-display text-charcoal-900 border-b pb-2">
            4. Badges & Status Chips
          </h3>
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="primary">Brand Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success" dot>
              Delivered / Approved
            </Badge>
            <Badge variant="warning" dot>
              Pending / In Review
            </Badge>
            <Badge variant="error" dot>
              Sold Out / Cancelled
            </Badge>
            <Badge variant="info" dot>
              In Preparation
            </Badge>
            <Badge variant="gold">★ Chef Choice</Badge>
            <Badge variant="outline">Neutral Outline</Badge>
          </div>
        </section>

        {/* 5. TOASTS & MODALS */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold font-display text-charcoal-900 border-b pb-2">
            5. Interactive Feedback, Toasts & Modals
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              onClick={() => toast.success('Your freshly baked treat has been added!', 'Sweet Success')}
            >
              Trigger Success Toast
            </Button>
            <Button
              variant="danger"
              onClick={() => toast.error('Server request timed out. Please try again.', 'Request Error')}
            >
              Trigger Error Toast
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.warning('Only 2 items left in stock for today.', 'Low Stock Alert')}
            >
              Trigger Warning Toast
            </Button>
            <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
              Open Demo Modal
            </Button>
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Tory's Treats Sample Dialog"
            description="Testing modal dialog backdrop blur and escape key closure."
            footer={
              <>
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsModalOpen(false);
                    toast.success('Modal action confirmed!');
                  }}
                >
                  Confirm Action
                </Button>
              </>
            }
          >
            <p className="text-sm text-charcoal-700 leading-relaxed">
              This modal component handles outside-click detection, keyboard navigation (Escape to close), body scroll lock, and mobile viewport adaptability.
            </p>
          </Modal>
        </section>

        {/* 6. ALERTS */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold font-display text-charcoal-900 border-b pb-2">
            6. Alert Banners
          </h3>
          <div className="space-y-3">
            <Alert type="success" title="Booking Confirmed!">
              Your event date has been locked in. Our head chef will contact you via WhatsApp shortly.
            </Alert>
            <Alert type="warning" title="Minimum Notice Required">
              Custom tiered celebration cakes require at least 48 hours notice for preparation.
            </Alert>
            <Alert type="error" title="Delivery Unavailable">
              We currently do not offer same-day delivery outside Lagos state.
            </Alert>
          </div>
        </section>

        {/* 7. SKELETON LOADING SYSTEM SHOWCASE */}
        <section className="space-y-6 pt-4">
          <div className="border-b pb-2">
            <h3 className="text-xl font-bold font-display text-charcoal-900">
              7. Skeleton Loading System (Brand Palette Shimmer)
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
              Subtle, non-distracting loading placeholders tailored for Tory's Treats brand palette (#FFF5F8, #FCE4EC, #FFFFFF).
            </p>
          </div>

          <div className="space-y-6">
            {/* Primitives */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
                Base Primitives (Text, Circles, Buttons)
              </h4>
              <div className="p-5 rounded-2xl bg-white border border-cream-border space-y-4">
                <div className="flex items-center gap-4">
                  <SkeletonCircle size="lg" />
                  <div className="space-y-2 flex-1 max-w-sm">
                    <Skeleton className="h-4 w-3/4 rounded-full" />
                    <Skeleton className="h-3 w-1/2 rounded-full" />
                  </div>
                  <SkeletonButton size="sm" />
                </div>
                <SkeletonText lines={3} />
              </div>
            </div>

            {/* Product & Category Cards Skeletons */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
                Product, Category & Event Placeholder Cards
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <SkeletonProductCard />
                <SkeletonCategoryCard />
                <SkeletonEventCard />
              </div>
            </div>

            {/* Admin Skeletons */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
                Admin Stat Card, Booking Card & Form Placeholders
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <SkeletonStatCard />
                <SkeletonBookingRow />
              </div>
            </div>
          </div>
        </section>

        {/* 8. FRONTEND QUERY CACHING SYSTEM */}
        <section className="space-y-4 pt-4">
          <div className="border-b pb-2">
            <h3 className="text-xl font-bold font-display text-charcoal-900">
              8. Frontend Query Cache Layer (Live Inspector)
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
              Memory caching with configurable TTLs, background revalidation (SWR), and reactive invalidation subscriptions.
            </p>
          </div>

          <CacheInspector />
        </section>

        {/* 9. OPTIMISTIC UPDATES & ERROR ROLLBACK DEMO */}
        <section className="space-y-4 pt-4">
          <div className="border-b pb-2">
            <h3 className="text-xl font-bold font-display text-charcoal-900">
              9. Optimistic Rendering & Error Rollback Simulation
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
              Immediate UI feedback on user action. If an operation fails, the state automatically rolls back to its exact snapshot with a notification.
            </p>
          </div>

          <OptimisticRollbackDemo />
        </section>

        {/* 10. ACCESSIBLE TOOLTIP SYSTEM */}
        <section className="space-y-4 pt-4">
          <div className="border-b pb-2">
            <h3 className="text-xl font-bold font-display text-charcoal-900">
              10. Accessible Tooltip System
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
              Tooltips with viewport boundary clamping, hover/focus support, touch-toggle mobile behavior, and ARIA attributes.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-cream-border space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
                Directional Placement & Trigger Variations
              </h4>
              <div className="flex flex-wrap items-center gap-4">
                <Tooltip content="Tooltip positioned on top" position="top">
                  <Button variant="outline" size="sm">Top Tooltip</Button>
                </Tooltip>

                <Tooltip content="Tooltip positioned at bottom" position="bottom">
                  <Button variant="outline" size="sm">Bottom Tooltip</Button>
                </Tooltip>

                <Tooltip content="Tooltip positioned on left" position="left">
                  <Button variant="outline" size="sm">Left Tooltip</Button>
                </Tooltip>

                <Tooltip content="Tooltip positioned on right" position="right">
                  <Button variant="outline" size="sm">Right Tooltip</Button>
                </Tooltip>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
                Inline Helper Tooltips &amp; Icon Actions
              </h4>
              <div className="flex flex-wrap items-center gap-6 text-sm text-charcoal-800">
                <div className="flex items-center gap-1.5 bg-cream-surface px-4 py-2 rounded-2xl border border-cream-border">
                  <span className="font-bold">Lagos Delivery Rate:</span>
                  <span>₦2,500</span>
                  <TooltipInfo content="Calculated for mainland and island logistics based on standard weight limits." />
                </div>

                <div className="flex items-center gap-2">
                  <Tooltip content="Quick treat view" position="top">
                    <button className="p-2.5 rounded-xl bg-brand-50 border border-brand-200 text-brand-700 hover:bg-brand-100 transition-colors focus-ring">
                      <Search className="w-4 h-4" />
                    </button>
                  </Tooltip>

                  <Tooltip content="Add treat to favorites" position="top">
                    <button className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 transition-colors focus-ring">
                      <Heart className="w-4 h-4" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. EMPTY STATES */}
        <section className="space-y-4 pt-4">
          <h3 className="text-xl font-bold font-display text-charcoal-900 border-b pb-2">
            11. Empty State Component
          </h3>
          <EmptyState
            title="Your Treat Basket is Empty"
            description="Explore our oven-fresh celebration cakes, pastries, and parfaits to fill it up!"
            actionLabel="Explore Menu"
            actionHref="/shop"
          />
        </section>

        {/* 12. PRODUCT CARD */}
        <section className="space-y-4 pt-4">
          <h3 className="text-xl font-bold font-display text-charcoal-900 border-b pb-2">
            12. Product Card Component
          </h3>
          <div className="max-w-sm">
            <ProductCard
              product={sampleProduct}
              onAddToCart={() => toast.success('Added to basket!')}
            />
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

/**
 * CacheInspector Component: Live dashboard for frontendCache
 */
function CacheInspector() {
  const toast = useToast();
  const [entries, setEntries] = useState(() => frontendCache.getEntries());

  const handleRefresh = () => {
    setEntries(frontendCache.getEntries());
    toast.success('Cache registry refreshed.');
  };

  const handleClear = () => {
    frontendCache.clear();
    setEntries(frontendCache.getEntries());
    toast.success('All cache entries cleared.');
  };

  const handleInvalidateProducts = () => {
    frontendCache.invalidate('products');
    setEntries(frontendCache.getEntries());
    toast.success('Invalidated all "products" cache keys.');
  };

  return (
    <div className="p-6 rounded-3xl bg-white border border-cream-border space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-charcoal-900">Active Cache Keys:</span>
          <Badge variant="pink">{entries.length} entries stored</Badge>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleInvalidateProducts}>
            Invalidate 'products*'
          </Button>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            Refresh Inspector
          </Button>
          <Button variant="danger" size="sm" onClick={handleClear}>
            Clear All
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-cream-border text-charcoal-500 font-bold uppercase text-[10px]">
              <th className="pb-2">Cache Key</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Time to Live</th>
              <th className="pb-2">Age</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-border/60">
            {entries.length > 0 ? (
              entries.map((entry) => (
                <tr key={entry.key} className="hover:bg-cream-surface/60">
                  <td className="py-2.5 font-mono font-bold text-brand-700">{entry.key}</td>
                  <td className="py-2.5">
                    <Badge variant={entry.isFresh ? 'success' : 'warning'} size="sm">
                      {entry.isFresh ? 'Fresh' : 'Stale (SWR)'}
                    </Badge>
                  </td>
                  <td className="py-2.5 text-charcoal-600">{(entry.ttl / 1000).toFixed(0)}s</td>
                  <td className="py-2.5 text-charcoal-600">{(entry.age / 1000).toFixed(1)}s ago</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center text-charcoal-400">
                  No query cache keys stored yet. Navigate around the app to populate!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * OptimisticRollbackDemo: Interactive demo illustrating snapshot -> update -> rollback
 */
function OptimisticRollbackDemo() {
  const toast = useToast();
  const [isAvailable, setIsAvailable] = useState(true);
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleToggle = () => {
    const previousState = isAvailable;
    const nextState = !isAvailable;

    // Step 1: Optimistic Update immediately in UI
    setIsAvailable(nextState);
    setIsProcessing(true);

    // Step 2: Simulate Operation
    if (simulateFailure) {
      setTimeout(() => {
        // Step 3: Rollback on error
        setIsAvailable(previousState);
        setIsProcessing(false);
        toast.error('Network failure simulated! State safely rolled back.', 'Rollback Triggered');
      }, 500);
    } else {
      setTimeout(() => {
        setIsProcessing(false);
        toast.success(`Treat marked as ${nextState ? 'In Stock' : 'Sold Out'}.`, 'Optimistic Success');
      }, 300);
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-white border border-cream-border space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-cream-surface border border-cream-border">
        <div className="flex items-center gap-3">
          <div className={`w-3.5 h-3.5 rounded-full ${isAvailable ? 'bg-emerald-500' : 'bg-stone-400'}`} />
          <div>
            <span className="font-bold text-sm text-charcoal-900 block">
              Strawberry Choux Bun Availability
            </span>
            <span className="text-xs text-charcoal-600">
              Current state: <strong className={isAvailable ? 'text-emerald-700' : 'text-stone-600'}>{isAvailable ? 'In Stock (Available)' : 'Sold Out'}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant={isAvailable ? 'secondary' : 'primary'}
            onClick={handleToggle}
            isLoading={isProcessing}
          >
            {isAvailable ? 'Mark Sold Out' : 'Mark In Stock'}
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1 text-xs text-charcoal-700">
        <input
          type="checkbox"
          id="sim-fail"
          checked={simulateFailure}
          onChange={(e) => setSimulateFailure(e.target.checked)}
          className="rounded border-cream-border text-brand-700 focus:ring-brand-500"
        />
        <label htmlFor="sim-fail" className="font-bold cursor-pointer select-none">
          Simulate Network/Server Error (Tests instant optimistic UI flip + automatic rollback on failure)
        </label>
      </div>
    </div>
  );
}

