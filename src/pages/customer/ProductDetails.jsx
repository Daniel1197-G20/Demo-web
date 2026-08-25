import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  Star,
  Sparkles,
  ShieldCheck,
  Truck,
  Award,
  Clock,
  MessageCircle,
  ChevronRight,
  Heart,
  Share2,
} from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import ProductCard from '../../components/ui/ProductCard';
import { formatCurrency, createWhatsAppUrl } from '../../lib/formatters';
import { BRAND } from '../../lib/constants';
import { getProductBySlug, getRelatedProducts } from '../../lib/productsData';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../../hooks/useToast';

export default function ProductDetails() {
  const { slug } = useParams();
  const { addItem, items } = useCart();
  const toast = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const product = getProductBySlug(slug);
  const relatedProducts = getRelatedProducts(slug, 3);

  const isInCart = items.some((i) => i.id === product.id);
  const currentCartQty = items.find((i) => i.id === product.id)?.quantity || 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setJustAdded(true);
    toast.success(`Added ${quantity}x ${product.name} to your basket!`, 'Sweet Treat Added');
    setTimeout(() => setJustAdded(false), 1500);
  };

  const whatsappInquiryUrl = createWhatsAppUrl(
    BRAND.whatsappNumber,
    `Hello Tory's Treats! I would like to inquire about ordering ${product.name} (custom sizing, delivery date, or inscription).`
  );

  return (
    <div className="overflow-x-hidden py-4 sm:py-8">
      <PageContainer>
        {/* Editorial Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-charcoal-500 mb-6 overflow-x-auto pb-1" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-brand-700 transition-colors shrink-0">Home</Link>
          <ChevronRight className="w-3 h-3 shrink-0 text-charcoal-400" />
          <Link to="/shop" className="hover:text-brand-700 transition-colors shrink-0">Shop Treats</Link>
          <ChevronRight className="w-3 h-3 shrink-0 text-charcoal-400" />
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-brand-700 transition-colors shrink-0">
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3 shrink-0 text-charcoal-400" />
          <span className="text-charcoal-900 font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Main 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Image Gallery (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Featured Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-cream-surface border border-cream-border shadow-brand-md group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/40 via-transparent to-transparent opacity-40 pointer-events-none" />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                {product.badge ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-charcoal-900 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{product.badge}</span>
                  </span>
                ) : product.is_featured ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-charcoal-900 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Chef's Choice</span>
                  </span>
                ) : null}
                <span className="rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700 shadow-sm">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip (if multiple images) */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-18 w-24 sm:h-20 sm:w-28 rounded-2xl overflow-hidden border-2 transition-all shrink-0 focus-ring ${
                      activeImageIndex === idx
                        ? 'border-brand-700 ring-2 ring-brand-200'
                        : 'border-cream-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Kitchen Assurance Icons */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-cream-surface/60 border border-cream-border text-center space-y-1">
                <Truck className="w-4 h-4 text-brand-700 mx-auto" />
                <span className="text-[11px] font-bold text-charcoal-900 block leading-tight">Chilled Lagos Delivery</span>
                <span className="text-[9px] text-charcoal-500 block">Temperature Controlled</span>
              </div>
              <div className="p-3 rounded-2xl bg-cream-surface/60 border border-cream-border text-center space-y-1">
                <Award className="w-4 h-4 text-gold-600 mx-auto" />
                <span className="text-[11px] font-bold text-charcoal-900 block leading-tight">100% French Butter</span>
                <span className="text-[9px] text-charcoal-500 block">Pure European Patisserie</span>
              </div>
              <div className="p-3 rounded-2xl bg-cream-surface/60 border border-cream-border text-center space-y-1">
                <Clock className="w-4 h-4 text-emerald-600 mx-auto" />
                <span className="text-[11px] font-bold text-charcoal-900 block leading-tight">Baked Fresh Daily</span>
                <span className="text-[9px] text-charcoal-500 block">Never frozen or held</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Narrative & Commerce Flow (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
                  {product.category}
                </span>

                {product.rating && (
                  <div className="flex items-center gap-1.5 text-xs text-charcoal-600 font-semibold">
                    <div className="flex items-center text-gold-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span>{product.rating}</span>
                    <span className="text-charcoal-400">({product.reviewsCount || 24} reviews)</span>
                  </div>
                )}
              </div>

              <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 leading-tight mt-1.5">
                {product.name}
              </h1>

              {/* Price Display */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-700">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-xs text-charcoal-500 font-medium">
                  • Including bespoke gift presentation
                </span>
              </div>
            </div>

            {/* Editorial Description */}
            <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
              {product.description}
            </p>

            {/* Chef Tasting Notes Block */}
            {product.tastingNotes && (
              <div className="p-4 rounded-2xl bg-brand-50/70 border-l-4 border-brand-700 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 block">
                  Chef’s Tasting Profile
                </span>
                <p className="font-serif italic text-xs sm:text-sm text-charcoal-800 leading-relaxed">
                  "{product.tastingNotes}"
                </p>
              </div>
            )}

            {/* Portion, Storage & Ingredients Details Card */}
            <div className="space-y-3 rounded-2xl bg-cream-surface/70 border border-cream-border p-4 sm:p-5 text-xs">
              {product.servings && (
                <div className="flex items-start gap-2">
                  <span className="font-bold text-charcoal-900 w-28 shrink-0">Portion / Servings:</span>
                  <span className="text-charcoal-700">{product.servings}</span>
                </div>
              )}
              {product.ingredients && (
                <div className="flex items-start gap-2 pt-2 border-t border-cream-border/60">
                  <span className="font-bold text-charcoal-900 w-28 shrink-0">Key Ingredients:</span>
                  <span className="text-charcoal-700 leading-relaxed">{product.ingredients}</span>
                </div>
              )}
              {product.storage && (
                <div className="flex items-start gap-2 pt-2 border-t border-cream-border/60">
                  <span className="font-bold text-charcoal-900 w-28 shrink-0">Storage &amp; Care:</span>
                  <span className="text-charcoal-700">{product.storage}</span>
                </div>
              )}
              {product.allergens && (
                <div className="flex items-start gap-2 pt-2 border-t border-cream-border/60">
                  <span className="font-bold text-charcoal-900 w-28 shrink-0">Allergen Notice:</span>
                  <span className="text-charcoal-600 italic">{product.allergens}</span>
                </div>
              )}
            </div>

            {/* Quantity Selector & Add to Basket Flow */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                {/* Quantity Pill */}
                <div className="flex items-center justify-between sm:justify-start border border-cream-border bg-white rounded-full p-1 shadow-xs shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-cream-surface text-charcoal-700 active:bg-brand-50 focus-ring"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-charcoal-900 font-display">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-cream-surface text-charcoal-700 active:bg-brand-50 focus-ring"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Add to Basket Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 rounded-full bg-brand-700 hover:bg-brand-800 active:bg-brand-900 text-white px-6 py-3.5 text-sm sm:text-base font-semibold shadow-brand-sm hover:shadow-brand-md transition-all active:scale-98 focus-ring min-h-[48px]"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Basket ✓</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>
                        Add {quantity > 1 ? `${quantity} Items` : 'to Basket'} • {formatCurrency(product.price * quantity)}
                      </span>
                    </>
                  )}
                </button>
              </div>

              {isInCart && (
                <p className="text-xs text-brand-700 font-semibold flex items-center gap-1.5 pl-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Currently {currentCartQty} in your shopping basket</span>
                </p>
              )}
            </div>

            {/* Direct WhatsApp Consultation Button */}
            <div className="pt-2">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 py-3 px-4 text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-current" />
                <span>Need custom sizing, date scheduling or inscriptions? Chat on WhatsApp →</span>
              </a>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            Related Bakes ("Pairs Wonderfully With")
        ───────────────────────────────────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24 pt-12 border-t border-cream-border">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
                  Curated Pairings
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal-900 mt-1">
                  Pairs Wonderfully With
                </h2>
              </div>
              <Link to="/shop" className="text-xs font-bold text-brand-700 hover:underline">
                View full menu →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={(item) => {
                    addItem(item, 1);
                    toast.success(`Added ${item.name} to your basket!`, 'Sweet Delight Added');
                  }}
                  isInCart={items.some((i) => i.id === p.id)}
                  cartQuantity={items.find((i) => i.id === p.id)?.quantity || 0}
                />
              ))}
            </div>
          </div>
        )}
      </PageContainer>
    </div>
  );
}

