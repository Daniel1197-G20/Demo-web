import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import { formatCurrency } from '../../lib/formatters';
import { useCart } from '../../hooks/useCart';

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal, deliveryFee, total } = useCart();

  if (items.length === 0) {
    return (
      <PageContainer>
        <EmptyState
          title="Your Treat Basket is Empty"
          description="Looks like you haven't added any delicious cakes or pastries yet!"
          actionLabel="Browse Fresh Treats"
          actionHref="/shop"
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SectionHeading
        tag="Your Selection"
        title="Review Your Treat Basket"
        subtitle="Review your artisanal treat items before submitting your fulfillment request."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="p-4 sm:p-5 flex items-center gap-4 sm:gap-6">
              <img
                src={item.images?.[0] || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300'}
                alt={item.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-cream-surface shrink-0"
              />

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-charcoal-900 text-sm sm:text-base truncate font-display">
                  {item.name}
                </h4>
                <p className="text-xs text-charcoal-500 mt-0.5">{item.category}</p>
                <div className="text-sm font-bold text-brand-700 mt-1">
                  {formatCurrency(item.price)} each
                </div>
              </div>

              {/* Quantity Modifier */}
              <div className="flex items-center border border-cream-border bg-white rounded-full p-1 shadow-sm shrink-0">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-cream-surface text-charcoal-700"
                  aria-label="Reduce quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-8 text-center text-xs font-bold text-charcoal-900">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-cream-surface text-charcoal-700"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="p-2 text-charcoal-500 hover:text-error-500 transition-colors"
                aria-label="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </Card>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <Card className="p-6 space-y-4 sticky top-28 bg-cream-surface/70">
            <h3 className="text-lg font-bold font-display text-charcoal-900 border-b border-cream-border pb-3">
              Order Summary
            </h3>

            <div className="space-y-2 text-sm text-charcoal-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-charcoal-900">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span className="font-semibold text-charcoal-900">{formatCurrency(deliveryFee)}</span>
              </div>
            </div>

            <div className="border-t border-cream-border pt-4 flex justify-between items-center text-base font-extrabold text-charcoal-900">
              <span>Estimated Total</span>
              <span className="text-xl font-display text-brand-700">{formatCurrency(total)}</span>
            </div>

            <Link to="/checkout" className="block pt-2">
              <Button variant="primary" size="lg" className="w-full justify-center" icon={ArrowRight} iconPosition="right">
                Proceed to Order Request
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
