import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShoppingBag, Plus, Check, Star, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../../lib/formatters';
import { cn } from '../../lib/utils';
import Button from './Button';

export default function FeaturedSpotlight({
  heroProduct,
  companionProducts = [],
  onAddToCart,
  items = [],
  className = '',
}) {
  const [justAdded, setJustAdded] = useState(false);

  if (!heroProduct) return null;

  const isHeroInCart = items.some((i) => i.id === heroProduct.id);
  const heroCartQty = items.find((i) => i.id === heroProduct.id)?.quantity || 0;

  const handleHeroAdd = () => {
    if (onAddToCart) {
      onAddToCart(heroProduct);
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch', className)}>
      {/* Left Column: Hero Spotlight Treat (7 cols) */}
      <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-cream-border bg-white overflow-hidden shadow-brand-md hover:shadow-brand-lg transition-all duration-300 group">
        {/* Large Immersive Photo */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-cream-surface">
          <img
            src={heroProduct.images[0]}
            alt={heroProduct.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />

          {/* Top Floating Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-charcoal-900 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chef's Signature Spotlight</span>
            </span>
            <span className="rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700 shadow-sm">
              {heroProduct.category}
            </span>
          </div>

          {/* Bottom Photo Caption */}
          <div className="absolute bottom-4 left-4 right-4 text-white z-10">
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight drop-shadow-md">
              {heroProduct.name}
            </h3>
          </div>
        </div>

        {/* Hero Details & Direct Action */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
          <div className="space-y-3">
            <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
              {heroProduct.description}
            </p>

            {/* Tasting Notes / Ingredients Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-cream-surface border border-cream-border text-xs font-medium text-charcoal-700">
                🍓 Fresh Organic Berries
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-cream-surface border border-cream-border text-xs font-medium text-charcoal-700">
                🧈 French Butter Cream
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-cream-surface border border-cream-border text-xs font-medium text-charcoal-700">
                ✨ 10 - 12 Slices
              </span>
            </div>
          </div>

          {/* Price & Action Row */}
          <div className="pt-4 border-t border-cream-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-charcoal-500 uppercase tracking-wider font-semibold block">
                Artisanal Price
              </span>
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-brand-700">
                {formatCurrency(heroProduct.price)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link to={`/shop/${heroProduct.slug}`}>
                <Button variant="outline" size="md">
                  View Details
                </Button>
              </Link>

              <button
                type="button"
                onClick={handleHeroAdd}
                className={cn(
                  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 shadow-brand-sm active:scale-95 focus-ring',
                  justAdded || isHeroInCart
                    ? 'bg-brand-100 text-brand-800 border border-brand-200'
                    : 'bg-brand-700 text-white hover:bg-brand-800 hover:shadow-brand-md'
                )}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Basket ✓</span>
                  </>
                ) : isHeroInCart ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>In Basket ({heroCartQty})</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Basket</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Stacked Companion Bakes (5 cols) */}
      <div className="lg:col-span-5 flex flex-col justify-between gap-4">
        {companionProducts.map((prod) => {
          const inCart = items.some((i) => i.id === prod.id);
          const qty = items.find((i) => i.id === prod.id)?.quantity || 0;

          return (
            <div
              key={prod.id}
              className="flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl border border-cream-border bg-white hover:border-brand-200 hover:shadow-brand-sm transition-all duration-300 group"
            >
              {/* Product Thumbnail */}
              <Link
                to={`/shop/${prod.slug}`}
                className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-xl overflow-hidden bg-cream-surface"
              >
                <img
                  src={prod.images[0]}
                  alt={prod.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </Link>

              {/* Info & Price */}
              <div className="flex-1 min-w-0 pr-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700">
                  {prod.category}
                </span>
                <Link to={`/shop/${prod.slug}`}>
                  <h4 className="font-display text-sm sm:text-base font-bold text-charcoal-900 group-hover:text-brand-700 transition-colors truncate">
                    {prod.name}
                  </h4>
                </Link>
                <span className="font-display font-extrabold text-sm sm:text-base text-charcoal-900 block mt-0.5">
                  {formatCurrency(prod.price)}
                </span>
              </div>

              {/* Quick Add Button */}
              <button
                type="button"
                onClick={() => onAddToCart && onAddToCart(prod)}
                aria-label={`Add ${prod.name} to basket`}
                className={cn(
                  'h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 focus-ring shadow-xs active:scale-90',
                  inCart
                    ? 'bg-brand-100 text-brand-800 border border-brand-200'
                    : 'bg-brand-700 text-white hover:bg-brand-800'
                )}
              >
                {inCart ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
            </div>
          );
        })}

        {/* View Catalog Banner Link */}
        <Link
          to="/shop"
          className="flex items-center justify-between p-4 rounded-2xl border border-dashed border-brand-300 bg-brand-50/50 hover:bg-brand-50 hover:border-brand-400 transition-colors text-brand-800 font-semibold text-xs sm:text-sm group mt-auto"
        >
          <span>Explore all 20+ oven-fresh treats</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
