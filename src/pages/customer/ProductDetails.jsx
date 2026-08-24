import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Plus, Minus, Check, Star, Sparkles, ShieldCheck } from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import { formatCurrency } from '../../lib/formatters';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../../hooks/useToast';

export default function ProductDetails() {
  const { slug } = useParams();
  const { addItem } = useCart();
  const toast = useToast();
  const [quantity, setQuantity] = useState(1);

  // Mock product detail for Phase 1 shell
  const product = {
    id: 'treat-1',
    slug: slug || 'signature-strawberry-cloud-cake',
    name: 'Signature Strawberry Cloud Cake',
    price: 18500,
    category: 'Artisanal Cakes',
    images: [
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=900&auto=format&fit=crop&q=80',
    ],
    description:
      'Our crowning signature celebration cake: three airy layers of Madagascar vanilla sponge soaked in light strawberry reduction, layered with freshly whipped mascarpone buttercream, and topped with mountain strawberries and edible 24k gold leaf.',
    ingredients: 'Flour, Farm Fresh Eggs, Creamery Butter, Organic Strawberries, Mascarpone, Madagascar Vanilla.',
    servings: '10 - 12 generous slices',
    is_available: true,
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity}x ${product.name} to your basket!`, 'Sweet Delight Added');
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal-500 hover:text-brand-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Treats Menu</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-cream-surface border border-cream-border shadow-brand-md">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Product Details */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.category}</Badge>
              <Badge variant="gold">★ Chef Special</Badge>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-charcoal-900 font-display">
              {product.name}
            </h1>

            <div className="text-2xl sm:text-3xl font-extrabold text-brand-700 font-display mt-3">
              {formatCurrency(product.price)}
            </div>
          </div>

          <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
            {product.description}
          </p>

          {/* Servings & Ingredients Card */}
          <Card className="p-4 bg-cream-surface/60 space-y-2 text-xs">
            <div>
              <span className="font-bold text-charcoal-900">Portion / Servings: </span>
              <span className="text-charcoal-700">{product.servings}</span>
            </div>
            <div>
              <span className="font-bold text-charcoal-900">Key Ingredients: </span>
              <span className="text-charcoal-700">{product.ingredients}</span>
            </div>
          </Card>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4 pt-4 border-t border-cream-border">
            {/* Quantity Selector */}
            <div className="flex items-center border border-cream-border bg-white rounded-full p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-cream-surface text-charcoal-700"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center text-sm font-bold text-charcoal-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-cream-surface text-charcoal-700"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <Button
              variant="primary"
              size="lg"
              icon={ShoppingBag}
              onClick={handleAddToCart}
              className="flex-1"
            >
              Add {quantity > 1 ? `${quantity} Treats` : 'to Basket'} • {formatCurrency(product.price * quantity)}
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
