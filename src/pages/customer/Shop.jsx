import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  Sparkles,
  ShoppingBag,
  MessageCircle,
  Check,
} from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import ProductCard from '../../components/ui/ProductCard';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { MOCK_PRODUCTS, CATEGORIES_LIST } from '../../lib/productsData';
import { BRAND } from '../../lib/constants';
import { createWhatsAppUrl } from '../../lib/formatters';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../../hooks/useToast';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const { addItem, items } = useCart();
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('featured'); // featured, price-low, price-high, name-asc

  // Sync state if URL param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = MOCK_PRODUCTS.filter((p) => {
      const matchesCat =
        selectedCategory === 'All' ||
        p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(search.toLowerCase())) ||
        (p.tastingNotes && p.tastingNotes.toLowerCase().includes(search.toLowerCase()));
      return matchesCat && matchesSearch;
    });

    // Apply sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // featured
      result.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, search, sortBy]);

  const whatsappInquiryUrl = createWhatsAppUrl(
    BRAND.whatsappNumber,
    "Hello Tory's Treats! I would like to inquire about a custom order or bespoke treats."
  );

  return (
    <div className="overflow-x-hidden py-4 sm:py-8">
      <PageContainer>
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-100/90 border border-brand-200/80 px-3.5 py-1 text-xs font-bold text-brand-800 tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-brand-700" />
            <span>Oven-Fresh Artisanal Collection</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-charcoal-900 leading-tight">
            Handcrafted Treats &amp; Patisserie
          </h1>
          <p className="text-xs sm:text-base text-charcoal-600 leading-relaxed max-w-2xl mx-auto">
            Small-batch daily creations prepared with European creamery butter, pure Madagascar vanilla, and Belgian chocolate. Chilled dispatch anywhere in Lagos.
          </p>
        </div>

        {/* Search, Filter & Sort Bar */}
        <div className="space-y-4 mb-8">
          {/* Top Controls: Search and Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-cream-surface p-3 sm:p-4 rounded-2xl border border-cream-border shadow-xs">
            {/* Search Input */}
            <div className="relative flex-1 min-w-0">
              <Input
                placeholder="Search by flavor, pastry, or cake..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                leadingIcon={Search}
                inputClassName="bg-white text-xs sm:text-sm"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700 p-1"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-charcoal-500 hidden md:inline">Sort:</span>
              <div className="relative w-full sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto text-xs font-bold bg-white border border-cream-border rounded-xl px-3.5 py-2.5 text-charcoal-800 hover:border-brand-300 focus-ring cursor-pointer"
                  aria-label="Sort products"
                >
                  <option value="featured">★ Chef's Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES_LIST.map((cat) => {
              const count =
                cat === 'All'
                  ? MOCK_PRODUCTS.length
                  : MOCK_PRODUCTS.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;

              const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 focus-ring ${
                    isSelected
                      ? 'bg-brand-700 text-white shadow-brand-sm scale-102 font-bold'
                      : 'bg-white border border-cream-border text-charcoal-700 hover:bg-cream-surface'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-cream-surface text-charcoal-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Filter Chips & Result Counter */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-charcoal-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'treat' : 'artisan treats'}
              </span>
              {(selectedCategory !== 'All' || search) && (
                <span className="text-charcoal-400">• Active filters applied</span>
              )}
            </div>

            {(selectedCategory !== 'All' || search) && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  handleCategorySelect('All');
                }}
                className="text-xs font-bold text-brand-700 hover:underline flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onAddToCart={(p) => {
                  addItem(p, 1);
                  toast.success(`Added ${p.name} to your basket!`, 'Sweet Delight Added');
                }}
                isInCart={items.some((i) => i.id === prod.id)}
                cartQuantity={items.find((i) => i.id === prod.id)?.quantity || 0}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 bg-white rounded-3xl border border-cream-border p-8 max-w-lg mx-auto shadow-xs space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center mx-auto shadow-xs">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-charcoal-900">
                No treats match "{search || selectedCategory}"
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1.5 max-w-sm mx-auto leading-relaxed">
                Try searching for another favorite bake like "croissants", "cupcakes", or clear your filter.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  handleCategorySelect('Artisanal Cakes');
                }}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-cream-surface hover:bg-brand-50 text-charcoal-800 border border-cream-border"
              >
                Cakes
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  handleCategorySelect('Gourmet Cupcakes');
                }}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-cream-surface hover:bg-brand-50 text-charcoal-800 border border-cream-border"
              >
                Cupcakes
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  handleCategorySelect('Fresh Pastries');
                }}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-cream-surface hover:bg-brand-50 text-charcoal-800 border border-cream-border"
              >
                Pastries
              </button>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSearch('');
                handleCategorySelect('All');
              }}
              className="mt-2"
            >
              Show All Treats
            </Button>
          </div>
        )}

        {/* Custom Order & Bespoke Catering Banner */}
        <div className="mt-14 sm:mt-20 rounded-3xl bg-gradient-to-r from-brand-50 via-cream-surface to-brand-50 border border-brand-200/80 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-white px-3 py-1 rounded-full border border-brand-200 shadow-xs">
              Custom &amp; Bulk Orders
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-charcoal-900">
              Need custom inscriptions, specific flavor pairings, or corporate treat hampers?
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 max-w-xl">
              Connect directly with Chef Tory's pastry team to curate bespoke celebration bakes for your event.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-5 py-3 text-xs sm:text-sm font-semibold transition-all shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Chef Inquiry</span>
            </a>
            <Link
              to="/catering"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-cream-border bg-white hover:bg-cream-surface px-5 py-3 text-xs sm:text-sm font-semibold text-charcoal-900 hover:text-brand-700 transition-all shadow-xs"
            >
              <span>Event Catering Info</span>
            </Link>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
