import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, ShoppingBag, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { formatCurrency } from '../../lib/formatters';
import Badge from './Badge';
import Button from './Button';

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
  } = product || {};

  const primaryImage =
    images && images.length > 0
      ? images[0]
      : 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80';

  return (
    <div
      className={cn(
        'group bg-white rounded-xl border border-cream-border overflow-hidden transition-all duration-300 hover:shadow-tory-md hover:-translate-y-1 flex flex-col',
        className
      )}
    >
      {/* Image Container */}
      <Link
        to={`/shop/${slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-cream-surface"
      >
        <img
          src={primaryImage}
          alt={name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {!is_available ? (
            <Badge variant="error" size="sm">
              Sold Out
            </Badge>
          ) : is_featured ? (
            <Badge variant="gold" size="sm">
              ★ Chef's Pick
            </Badge>
          ) : null}
        </div>

        {category && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-semibold text-charcoal-700 shadow-sm">
              {category.name || category}
            </span>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
        <div>
          <Link to={`/shop/${slug}`}>
            <h4 className="font-bold text-charcoal-900 text-base line-clamp-1 group-hover:text-tory-500 transition-colors font-display">
              {name}
            </h4>
          </Link>
          {min_order_quantity > 1 && (
            <p className="text-[11px] text-charcoal-500 mt-0.5">
              Min. order: {min_order_quantity} pcs
            </p>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between pt-2 border-t border-cream-border/60 mt-auto">
          <div>
            <span className="text-xs text-charcoal-500 block leading-tight">Price</span>
            <span className="text-base sm:text-lg font-bold text-tory-600 font-display">
              {formatCurrency(price)}
            </span>
          </div>

          <div>
            {is_available ? (
              <Button
                size="sm"
                variant={isInCart ? 'secondary' : 'primary'}
                onClick={() => onAddToCart && onAddToCart(product)}
                className="gap-1 px-3.5"
                aria-label={`Add ${name} to cart`}
              >
                {isInCart ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{cartQuantity > 0 ? `(${cartQuantity})` : 'Added'}</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </>
                )}
              </Button>
            ) : (
              <Button size="sm" variant="ghost" disabled className="text-xs">
                Unavailable
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
