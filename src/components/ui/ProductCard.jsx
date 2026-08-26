import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check, ShoppingBag, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { formatCurrency } from '../../lib/formatters';
import Badge from './Badge';

export default function ProductCard({
  product,
  onAddToCart,
  isInCart = false,
  cartQuantity = 0,
  className = '',
}) {
  const {
    id,
    name,
    slug = id,
    price = 0,
    images = [],
    category,
    is_available = true,
    is_featured = false,
    min_order_quantity = 1,
    description = '',
  } = product || {};

  const [justAdded, setJustAdded] = useState(false);

  const primaryImage =
    images && images.length > 0
      ? images[0]
      : 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80';

  const categoryName = typeof category === 'object' && category !== null ? category.name : category;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!is_available) return;

    if (onAddToCart) {
      onAddToCart(product);
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-cream-border bg-white transition-all duration-300 hover:shadow-brand-md hover:border-brand-200 hover:-translate-y-1',
        className
      )}
    >
      {/* Image Container */}
      <Link
        to={`/shop/${slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-cream-surface focus:outline-none"
      >
        <img
          src={primaryImage}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

        {/* Top Overlay Badges */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-wrap gap-1.5 z-10">
          {!is_available ? (
            <Badge variant="error" size="sm" className="shadow-xs font-bold">
              Sold Out
            </Badge>
          ) : product?.badge ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-gold-500 px-2.5 py-0.5 text-[10px] font-bold text-charcoal-900 shadow-xs">
              <Sparkles className="w-3 h-3" />
              <span>{product.badge}</span>
            </span>
          ) : is_featured ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-gold-500 px-2.5 py-0.5 text-[10px] font-bold text-charcoal-900 shadow-xs">
              <Sparkles className="w-3 h-3" />
              <span>Chef's Choice</span>
            </span>
          ) : null}
        </div>

        {/* Category Pill Tag */}
        {categoryName && (
          <span className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-brand-700 backdrop-blur-md shadow-xs z-10">
            {categoryName}
          </span>
        )}
      </Link>

      {/* Product Information */}
      <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-5 gap-3">
        <div>
          <Link to={`/shop/${slug}`} className="focus:outline-none block">
            <h4 className="font-display font-bold text-sm sm:text-base text-charcoal-900 group-hover:text-brand-700 transition-colors line-clamp-2 leading-snug">
              {name}
            </h4>
          </Link>
          {description && (
            <p className="mt-1 text-xs text-charcoal-600 line-clamp-2 leading-relaxed hidden sm:block">
              {description}
            </p>
          )}
          {product?.servings && (
            <p className="mt-1 text-[10px] sm:text-[11px] font-medium text-charcoal-500 line-clamp-1">
              ✨ {product.servings.split('(')[0]}
            </p>
          )}
        </div>

        {/* Price & Add Action */}
        <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-cream-border/80 mt-auto">
          <div className="min-w-0">
            <span className="text-[10px] text-charcoal-500 uppercase tracking-wider block font-semibold leading-none mb-1">
              Price
            </span>
            <span className="font-display font-extrabold text-sm sm:text-base md:text-lg text-charcoal-900 truncate block">
              {formatCurrency(price)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!is_available}
            aria-label={`Add ${name} to basket`}
            className={cn(
              'inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 text-xs font-bold transition-all duration-200 shadow-xs active:scale-95 shrink-0 focus-ring',
              !is_available
                ? 'bg-charcoal-100 text-charcoal-400 cursor-not-allowed shadow-none'
                : justAdded || isInCart
                ? 'bg-brand-100 text-brand-800 border border-brand-200 hover:bg-brand-200'
                : 'bg-brand-700 text-white hover:bg-brand-800 hover:shadow-brand-sm'
            )}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added ✓</span>
              </>
            ) : isInCart ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{cartQuantity > 0 ? `In Basket (${cartQuantity})` : 'In Basket'}</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
