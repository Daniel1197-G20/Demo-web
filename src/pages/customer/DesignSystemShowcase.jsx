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
import Skeleton, { ProductCardSkeleton } from '../../components/ui/Skeleton';
import EmptyState from '../../components/ui/EmptyState';
import ProductCard from '../../components/ui/ProductCard';
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
            <div className="p-3 rounded-xl bg-tory-500 text-white shadow-sm text-center">
              <span className="block text-xs font-bold">Tory Pink</span>
              <span className="text-[10px] opacity-80">#E82C7C</span>
            </div>
            <div className="p-3 rounded-xl bg-tory-100 text-tory-800 text-center border border-tory-200">
              <span className="block text-xs font-bold">Soft Pink 100</span>
              <span className="text-[10px] opacity-80">#FFE4EC</span>
            </div>
            <div className="p-3 rounded-xl bg-tory-50 text-tory-700 text-center border border-tory-100">
              <span className="block text-xs font-bold">Light Pink 50</span>
              <span className="text-[10px] opacity-80">#FFF1F5</span>
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
            <Button variant="primary">Primary Pink</Button>
            <Button variant="secondary">Secondary Soft Pink</Button>
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
            <Badge variant="primary">Primary Tory</Badge>
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

        {/* 7. SKELETON LOADERS */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold font-display text-charcoal-900 border-b pb-2">
            7. Skeleton Loading Primitives
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>
        </section>

        {/* 8. EMPTY STATES */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold font-display text-charcoal-900 border-b pb-2">
            8. Empty State Component
          </h3>
          <EmptyState
            title="Your Treat Basket is Empty"
            description="Explore our oven-fresh celebration cakes, pastries, and parfaits to fill it up!"
            actionLabel="Explore Menu"
            actionHref="/shop"
          />
        </section>

        {/* 9. PRODUCT CARD */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold font-display text-charcoal-900 border-b pb-2">
            9. Product Card Component
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
