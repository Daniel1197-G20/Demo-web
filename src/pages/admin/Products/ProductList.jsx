import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShoppingBag,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { useAdminStore } from '../../../lib/adminStore';
import { formatCurrency } from '../../../lib/formatters';
import { useToast } from '../../../hooks/useToast';
import { useCachedData } from '../../../hooks/useCachedData';
import { CACHE_TTL } from '../../../lib/cache';
import AdminSearchBar from '../../../components/admin/AdminSearchBar';
import AdminFilterPill from '../../../components/admin/AdminFilterPill';
import AdminBadge from '../../../components/admin/AdminBadge';
import AdminModal from '../../../components/admin/AdminModal';
import { SkeletonProductCard, SkeletonTableRow, Skeleton } from '../../../components/ui/Skeleton';
import Tooltip from '../../../components/ui/Tooltip';

export default function ProductList() {
  const store = useAdminStore();
  const toast = useToast();

  // Cached Products query with background revalidation
  const { data: cachedProducts, isLoading: isProductsLoading, setData: setProductsCache } = useCachedData(
    'products:all',
    () => store.getProducts(),
    { ttl: CACHE_TTL.PRODUCTS }
  );

  // Cached Categories query
  const { data: cachedCategories, isLoading: isCategoriesLoading } = useCachedData(
    'categories:all',
    () => store.getCategories(),
    { ttl: CACHE_TTL.CATEGORIES }
  );

  const products = cachedProducts || [];
  const categories = cachedCategories || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('all'); // 'all' | 'available' | 'soldout'
  const [deleteModalProduct, setDeleteModalProduct] = useState(null);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 8;

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat =
        selectedCategory === 'All' ||
        p.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesAvailability =
        availabilityFilter === 'all' ||
        (availabilityFilter === 'available' && p.is_available) ||
        (availabilityFilter === 'soldout' && !p.is_available);

      return matchesSearch && matchesCat && matchesAvailability;
    });
  }, [products, searchQuery, selectedCategory, availabilityFilter]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleAvailabilityChange = (filter) => {
    setAvailabilityFilter(filter);
    setCurrentPage(1);
  };

  // Optimistic Availability Toggle with Rollback Snapshot
  const handleToggleAvailability = (productId, currentStatus, productName) => {
    const previousProducts = [...products];
    const nextStatus = !currentStatus;

    // 1. Apply optimistic update immediately to local cache
    setProductsCache((prev) =>
      (prev || []).map((p) => (p.id === productId ? { ...p, is_available: nextStatus } : p))
    );

    toast.success(
      `${productName} is now marked as ${nextStatus ? 'Available (In Stock)' : 'Sold Out'}.`,
      'Status Updated'
    );

    // 2. Persist in background store
    try {
      store.toggleProductAvailability(productId);
    } catch (err) {
      console.error('Failed to update product availability:', err);
      // Rollback on error
      setProductsCache(previousProducts);
      toast.error('Failed to update product availability. Reverted.', 'Error');
    }
  };

  // Handle Delete Confirmation
  const handleConfirmDelete = () => {
    if (!deleteModalProduct) return;
    const previousProducts = [...products];
    const prodToDelete = deleteModalProduct;

    // Optimistically remove from cache
    setProductsCache((prev) => (prev || []).filter((p) => p.id !== prodToDelete.id));
    toast.success(`${prodToDelete.name} was removed from your catalog.`, 'Product Deleted');
    setDeleteModalProduct(null);

    try {
      store.deleteProduct(prodToDelete.id);
    } catch (err) {
      console.error('Failed to delete product:', err);
      setProductsCache(previousProducts);
      toast.error('Failed to delete product. Restored.', 'Error');
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & PRIMARY CTA
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#2B2024]">
              Products
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFF5F8] text-[#E82C7C] border border-[#FCE4EC] text-xs font-bold">
              {products.length} Treats
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#7A6B70] mt-1">
            Manage your artisanal bakes, pricing, daily stock, and online shop availability.
          </p>
        </div>

        <Link to="/admin/products/new">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#E82C7C] hover:bg-[#D31665] text-white text-xs sm:text-sm font-bold shadow-[0_4px_14px_rgba(232,44,124,0.3)] transition-all active:scale-95 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 stroke-[2.5px]" />
            <span>+ Add Product</span>
          </button>
        </Link>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. SEARCH & FILTER CONTROLS BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-[#F7DCE5] p-5 sm:p-6 shadow-[0_4px_20px_rgba(232,44,124,0.03)] space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
          {/* Search Input (8 cols) */}
          <div className="sm:col-span-8">
            <AdminSearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by treat name, category or flavor..."
            />
          </div>

          {/* Quick Availability Segmented Control (4 cols) */}
          <div className="sm:col-span-4 flex items-center p-1 bg-[#FFF5F8] rounded-full border border-[#FCE4EC]">
            <button
              type="button"
              onClick={() => handleAvailabilityChange('all')}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold transition-all ${
                availabilityFilter === 'all'
                  ? 'bg-white text-[#2B2024] shadow-xs'
                  : 'text-[#7A6B70] hover:text-[#2B2024]'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => handleAvailabilityChange('available')}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold transition-all ${
                availabilityFilter === 'available'
                  ? 'bg-[#E82C7C] text-white shadow-xs'
                  : 'text-[#7A6B70] hover:text-[#2B2024]'
              }`}
            >
              Available
            </button>
            <button
              type="button"
              onClick={() => handleAvailabilityChange('soldout')}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold transition-all ${
                availabilityFilter === 'soldout'
                  ? 'bg-stone-800 text-white shadow-xs'
                  : 'text-[#7A6B70] hover:text-[#2B2024]'
              }`}
            >
              Sold Out
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 custom-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0">
          <AdminFilterPill
            label="All Categories"
            count={products.length}
            isActive={selectedCategory === 'All'}
            onClick={() => handleCategoryChange('All')}
          />
          {categories.map((cat) => {
            const count = products.filter((p) => p.category.toLowerCase() === cat.name.toLowerCase()).length;
            return (
              <AdminFilterPill
                key={cat.id}
                label={cat.name}
                count={count}
                isActive={selectedCategory.toLowerCase() === cat.name.toLowerCase()}
                onClick={() => handleCategoryChange(cat.name)}
              />
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. PRODUCT CATALOG DATA DISPLAY (Table + Mobile Cards)
      ───────────────────────────────────────────────────────────── */}
        {/* Top summary counter */}
        <div className="flex items-center justify-between border-b border-[#F7DCE5] pb-4 mb-4">
          <span className="text-xs font-bold text-[#7A6B70]">
            Showing <strong className="text-[#2B2024]">{filteredProducts.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}</strong> -{' '}
            <strong className="text-[#2B2024]">{Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}</strong> of{' '}
            <strong className="text-[#2B2024]">{filteredProducts.length}</strong> treats
          </span>

          {(searchQuery || selectedCategory !== 'All' || availabilityFilter !== 'all') && (
            <Tooltip content="Reset search term and category filters" position="left">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setAvailabilityFilter('all');
                  setCurrentPage(1);
                }}
                className="text-xs font-bold text-[#E82C7C] hover:underline flex items-center gap-1 focus-ring rounded-lg px-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </Tooltip>
          )}
        </div>

        {isProductsLoading ? (
          <div className="space-y-4" aria-busy="true" aria-live="polite">
            {/* Mobile Skeletons */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SkeletonProductCard />
              <SkeletonProductCard />
            </div>

            {/* Desktop Table Skeletons */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#F7DCE5] text-[#7A6B70] uppercase tracking-wider text-[10px] font-extrabold">
                    <th className="pb-3.5 font-bold">Product</th>
                    <th className="pb-3.5 font-bold">Category</th>
                    <th className="pb-3.5 font-bold">Price</th>
                    <th className="pb-3.5 font-bold">Daily Stock</th>
                    <th className="pb-3.5 font-bold">Availability</th>
                    <th className="pb-3.5 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F7DCE5]/60">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonTableRow key={i} cols={6} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            {/* Mobile Cards List (< lg) */}
            <div className="lg:hidden space-y-4">
              {paginatedProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 rounded-2xl bg-[#FFF5F8]/50 border border-[#FCE4EC] space-y-3.5"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={prod.images?.[0] || 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&auto=format&fit=crop&q=80'}
                      alt={prod.name}
                      loading="lazy"
                      decoding="async"
                      className="w-16 h-16 rounded-2xl object-cover border border-[#F7DCE5] shrink-0 shadow-xs"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-display font-extrabold text-sm text-[#2B2024] leading-snug">
                          {prod.name}
                        </h4>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        <span className="text-[11px] text-[#7A6B70] font-semibold">{prod.category}</span>
                        {prod.is_featured && (
                          <AdminBadge variant="gold" size="sm">★ Featured</AdminBadge>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="font-display font-black text-sm text-[#E82C7C]">
                          {formatCurrency(prod.price)}
                        </span>
                        <span className="text-[11px] text-[#7A6B70]">
                          • Stock: {prod.stock || 10}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Availability Switch and Actions */}
                  <div className="pt-3 border-t border-[#F7DCE5] flex flex-wrap items-center justify-between gap-2">
                    <Tooltip content={`Toggle availability for ${prod.name}`} position="top">
                      <button
                        type="button"
                        onClick={() => handleToggleAvailability(prod.id, prod.is_available, prod.name)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 focus-ring ${
                          prod.is_available
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-stone-100 text-stone-600 border border-stone-200'
                        }`}
                        aria-label={`Mark ${prod.name} as ${prod.is_available ? 'Sold Out' : 'Available'}`}
                      >
                        <span className={`w-2 h-2 rounded-full ${prod.is_available ? 'bg-emerald-500' : 'bg-stone-400'}`} />
                        <span>{prod.is_available ? 'In Stock' : 'Sold Out'}</span>
                      </button>
                    </Tooltip>

                    <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                      <Tooltip content="Quick Preview" position="top">
                        <button
                          type="button"
                          onClick={() => setPreviewProduct(prod)}
                          className="p-2 rounded-xl text-[#7A6B70] hover:text-[#2B2024] hover:bg-white border border-[#F7DCE5] transition-colors focus-ring"
                          aria-label="Quick View Treat"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </Tooltip>

                      <Tooltip content="Edit treat specifications" position="top">
                        <Link
                          to={`/admin/products/${prod.id}/edit`}
                          className="px-3.5 py-1.5 rounded-full bg-[#E82C7C] text-white text-xs font-bold hover:bg-[#D31665] transition-colors flex items-center gap-1 focus-ring"
                          aria-label={`Edit ${prod.name}`}
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </Link>
                      </Tooltip>

                      <Tooltip content="Delete treat" position="top">
                        <button
                          type="button"
                          onClick={() => setDeleteModalProduct(prod)}
                          className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors focus-ring"
                          aria-label={`Delete ${prod.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View (>= lg) */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#F7DCE5] text-[#7A6B70] uppercase tracking-wider text-[10px] font-extrabold">
                    <th className="pb-3.5 font-bold">Product</th>
                    <th className="pb-3.5 font-bold">Category</th>
                    <th className="pb-3.5 font-bold">Price</th>
                    <th className="pb-3.5 font-bold">Daily Stock</th>
                    <th className="pb-3.5 font-bold">Availability</th>
                    <th className="pb-3.5 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F7DCE5]/60 text-[#2B2024]">
                  {paginatedProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FFF5F8]/40 transition-colors">
                      {/* Product Name & Photo */}
                      <td className="py-3.5 flex items-center gap-3">
                        <img
                          src={p.images?.[0] || 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&auto=format&fit=crop&q=80'}
                          alt={p.name}
                          loading="lazy"
                          decoding="async"
                          className="w-11 h-11 rounded-2xl object-cover border border-[#F7DCE5] shrink-0 shadow-xs"
                        />
                        <div className="min-w-0 max-w-xs">
                          <span className="font-display font-extrabold text-[#2B2024] block truncate">
                            {p.name}
                          </span>
                          {p.is_featured && (
                            <AdminBadge variant="gold" size="sm" className="mt-0.5">
                              ★ Featured
                            </AdminBadge>
                          )}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 font-medium text-[#7A6B70]">
                        {p.category}
                      </td>

                      {/* Price */}
                      <td className="py-3.5 font-display font-black text-[#E82C7C] text-sm">
                        {formatCurrency(p.price)}
                      </td>

                      {/* Stock */}
                      <td className="py-3.5 font-bold text-[#2B2024]">
                        {p.stock || 10} units
                      </td>

                      {/* Instant Toggle Availability Switch */}
                      <td className="py-3.5">
                        <Tooltip content={`Click to mark as ${p.is_available ? 'Sold Out' : 'Available'}`} position="top">
                          <button
                            type="button"
                            onClick={() => handleToggleAvailability(p.id, p.is_available, p.name)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs focus-ring ${
                              p.is_available
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                : 'bg-stone-100 text-stone-600 border border-stone-200 hover:bg-stone-200'
                            }`}
                            aria-label={`Toggle availability for ${p.name}`}
                          >
                            <span className={`w-2 h-2 rounded-full ${p.is_available ? 'bg-emerald-500' : 'bg-stone-400'}`} />
                            <span>{p.is_available ? 'Available' : 'Sold Out'}</span>
                          </button>
                        </Tooltip>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Tooltip content="Quick Preview" position="top">
                            <button
                              type="button"
                              onClick={() => setPreviewProduct(p)}
                              className="p-1.5 rounded-xl text-[#7A6B70] hover:text-[#2B2024] hover:bg-[#FFF5F8] border border-[#F7DCE5] transition-colors focus-ring"
                              aria-label={`Quick view ${p.name}`}
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </Tooltip>

                          <Tooltip content="Edit treat details" position="top">
                            <Link
                              to={`/admin/products/${p.id}/edit`}
                              className="px-3 py-1.5 rounded-full bg-[#FFF5F8] text-[#E82C7C] border border-[#FCE4EC] hover:bg-[#E82C7C] hover:text-white font-bold text-xs transition-colors flex items-center gap-1 focus-ring"
                              aria-label={`Edit ${p.name}`}
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </Link>
                          </Tooltip>

                          <Tooltip content="Delete treat" position="top">
                            <button
                              type="button"
                              onClick={() => setDeleteModalProduct(p)}
                              className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 border border-rose-200 transition-colors focus-ring"
                              aria-label={`Delete ${p.name}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-6 pt-4 border-t border-[#F7DCE5] flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-[#7A6B70]">
                  Page <strong className="text-[#2B2024]">{currentPage}</strong> of <strong className="text-[#2B2024]">{totalPages}</strong>
                </span>

                <div className="flex items-center gap-1.5">
                  <Tooltip content="Previous page" position="top">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="p-2 rounded-xl border border-[#F7DCE5] bg-white text-[#2B2024] hover:bg-[#FFF5F8] disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-ring"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </Tooltip>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all focus-ring ${
                          currentPage === page
                            ? 'bg-[#E82C7C] text-white shadow-xs'
                            : 'bg-white border border-[#F7DCE5] text-[#7A6B70] hover:border-[#E82C7C] hover:text-[#E82C7C]'
                        }`}
                        aria-label={`Go to page ${page}`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <Tooltip content="Next page" position="top">
                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="p-2 rounded-xl border border-[#F7DCE5] bg-white text-[#2B2024] hover:bg-[#FFF5F8] disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-ring"
                      aria-label="Next page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF5F8] border border-[#FCE4EC] text-[#E82C7C] mx-auto flex items-center justify-center shadow-xs">
              <ShoppingBag className="w-7 h-7" />
            </div>

            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#2B2024]">
                No treats found matching "{searchQuery || selectedCategory}"
              </h3>
              <p className="text-xs text-[#7A6B70] mt-1 max-w-sm mx-auto">
                Try searching for another keyword, adjusting your category filter, or create a new treat.
              </p>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setAvailabilityFilter('all');
                }}
                className="px-4 py-2 rounded-full border border-[#F7DCE5] bg-white text-xs font-bold text-[#7A6B70] hover:text-[#2B2024]"
              >
                Clear Filters
              </button>
              <Link to="/admin/products/new">
                <button
                  type="button"
                  className="px-5 py-2 rounded-full bg-[#E82C7C] text-white text-xs font-bold shadow-xs hover:bg-[#D31665]"
                >
                  + Add Product
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. DELETE CONFIRMATION MODAL
      ───────────────────────────────────────────────────────────── */}
      <AdminModal
        isOpen={Boolean(deleteModalProduct)}
        onClose={() => setDeleteModalProduct(null)}
        title="Delete Product?"
        subtitle="This treat will be removed from your catalog and online store."
        confirmText="Yes, Delete Product"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
        icon={Trash2}
      >
        <div className="p-4 rounded-2xl bg-[#FFF5F8] border border-[#FCE4EC] flex items-center gap-3">
          <img
            src={deleteModalProduct?.images?.[0] || 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&auto=format&fit=crop&q=80'}
            alt=""
            className="w-12 h-12 rounded-xl object-cover border border-[#F7DCE5]"
          />
          <div>
            <h4 className="font-display font-bold text-sm text-[#2B2024]">
              {deleteModalProduct?.name}
            </h4>
            <p className="text-xs text-[#E82C7C] font-bold">
              {formatCurrency(deleteModalProduct?.price || 0)} • {deleteModalProduct?.category}
            </p>
          </div>
        </div>
      </AdminModal>

      {/* ─────────────────────────────────────────────────────────────
          5. QUICK PREVIEW MODAL
      ───────────────────────────────────────────────────────────── */}
      <AdminModal
        isOpen={Boolean(previewProduct)}
        onClose={() => setPreviewProduct(null)}
        title="Product Preview"
        subtitle="How this treat appears in your online store"
        cancelText="Close Preview"
        confirmText="Edit This Product"
        onConfirm={() => {
          const id = previewProduct?.id;
          setPreviewProduct(null);
          navigate(`/admin/products/${id}/edit`);
        }}
      >
        {previewProduct && (
          <div className="space-y-4">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100 border border-[#F7DCE5]">
              <img
                src={previewProduct.images?.[0]}
                alt={previewProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#E82C7C] uppercase tracking-wider">
                  {previewProduct.category}
                </span>
                <AdminBadge variant={previewProduct.is_available ? 'success' : 'neutral'} size="sm" dot>
                  {previewProduct.is_available ? 'Available' : 'Sold Out'}
                </AdminBadge>
              </div>

              <h3 className="font-display font-extrabold text-xl text-[#2B2024] mt-1">
                {previewProduct.name}
              </h3>
              <p className="font-display font-black text-xl text-[#E82C7C] mt-1">
                {formatCurrency(previewProduct.price)}
              </p>
            </div>

            <p className="text-xs text-[#7A6B70] leading-relaxed">
              {previewProduct.description || 'No description provided.'}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-2xl bg-[#FFF5F8] border border-[#FCE4EC]">
              <div>
                <span className="text-[#7A6B70] block text-[10px]">Daily Stock</span>
                <span className="font-bold text-[#2B2024]">{previewProduct.stock || 10} units</span>
              </div>
              <div>
                <span className="text-[#7A6B70] block text-[10px]">Portion / Servings</span>
                <span className="font-bold text-[#2B2024]">{previewProduct.servings || 'Standard'}</span>
              </div>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
