import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Sparkles,
  Cake,
  Eye,
  CheckCircle2,
  AlertCircle,
  Clock,
  Trash2,
} from 'lucide-react';
import { useAdminStore } from '../../../lib/adminStore';
import { formatCurrency } from '../../../lib/formatters';
import { useToast } from '../../../hooks/useToast';
import AdminImageUploader from '../../../components/admin/AdminImageUploader';
import AdminToggle from '../../../components/admin/AdminToggle';
import AdminBadge from '../../../components/admin/AdminBadge';
import AdminModal from '../../../components/admin/AdminModal';

export default function ProductForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const toast = useToast();
  const store = useAdminStore();
  const categories = store.getCategories();

  const [formData, setFormData] = useState({
    name: '',
    category: categories[0]?.name || 'Artisanal Cakes',
    price: '',
    stock: '12',
    servings: 'Serves 8 - 10 guests',
    description: '',
    image: '',
    is_available: true,
    is_featured: false,
    ingredients: 'European butter, flour, organic cane sugar, farm eggs, Madagascar vanilla.',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // If editing, load product from store
  useEffect(() => {
    if (isEditing) {
      const existing = store.getProductById(id);
      if (existing) {
        setFormData({
          name: existing.name || '',
          category: existing.category || categories[0]?.name || 'Artisanal Cakes',
          price: String(existing.price || ''),
          stock: String(existing.stock || '10'),
          servings: existing.servings || 'Serves 8 - 10 guests',
          description: existing.description || '',
          image: existing.images?.[0] || '',
          is_available: existing.is_available !== undefined ? existing.is_available : true,
          is_featured: existing.is_featured || false,
          ingredients: existing.ingredients || '',
        });
      } else {
        toast.error('Product not found.', 'Error');
        navigate('/admin/products');
      }
    }
  }, [id, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Please enter a product name.', 'Required Field');
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      toast.error('Please enter a valid price.', 'Required Field');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (isEditing) {
        store.updateProduct(id, {
          name: formData.name,
          category: formData.category,
          price: Number(formData.price),
          stock: Number(formData.stock),
          servings: formData.servings,
          description: formData.description,
          image: formData.image || 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1000&auto=format&fit=crop&q=80',
          is_available: formData.is_available,
          is_featured: formData.is_featured,
          ingredients: formData.ingredients,
        });

        toast.success(`${formData.name} updated successfully!`, 'Changes Saved');
      } else {
        store.addProduct({
          name: formData.name,
          category: formData.category,
          price: Number(formData.price),
          stock: Number(formData.stock),
          servings: formData.servings,
          description: formData.description,
          image: formData.image || 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1000&auto=format&fit=crop&q=80',
          is_available: formData.is_available,
          is_featured: formData.is_featured,
          ingredients: formData.ingredients,
        });

        toast.success(`${formData.name} added to your online catalog!`, 'Product Created');
      }

      navigate('/admin/products');
    }, 600);
  };

  const handleDelete = () => {
    store.deleteProduct(id);
    toast.success('Product removed from catalog.', 'Deleted');
    navigate('/admin/products');
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER WITH BREADCRUMB & CONTEXT
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="p-2.5 rounded-2xl bg-white border border-[#F7DCE5] text-[#2B2024] hover:text-[#E82C7C] hover:border-[#E82C7C] transition-all shadow-xs"
            aria-label="Back to products list"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E82C7C]">
                {isEditing ? 'Edit Mode' : 'Catalog Management'}
              </span>
              {isEditing && (
                <AdminBadge variant={formData.is_available ? 'success' : 'neutral'} size="sm" dot>
                  {formData.is_available ? 'Live on Store' : 'Sold Out'}
                </AdminBadge>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#2B2024]">
              {isEditing ? `Edit “${formData.name || 'Product'}”` : 'Add New Bakery Product'}
            </h1>
          </div>
        </div>

        {isEditing && (
          <button
            type="button"
            onClick={() => setDeleteModalOpen(true)}
            className="self-start sm:self-auto px-4 py-2 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Treat</span>
          </button>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. THE EDITORIAL PRODUCT FORM
      ───────────────────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Image & Media */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#F7DCE5] shadow-[0_4px_20px_rgba(232,44,124,0.04)] space-y-4">
          <div className="border-b border-[#F7DCE5] pb-3">
            <h3 className="font-display font-extrabold text-base text-[#2B2024]">
              1. Product Photography
            </h3>
            <p className="text-xs text-[#7A6B70] mt-0.5">
              Upload a clear, tempting photo of your freshly baked treat.
            </p>
          </div>

          <AdminImageUploader
            image={formData.image}
            onChange={(img) => setFormData({ ...formData, image: img })}
            label="Product Photo"
            helperText="Drag a photo from your computer or pick one of our preset bakery samples above."
          />
        </div>

        {/* Section 2: Basic Product Details */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#F7DCE5] shadow-[0_4px_20px_rgba(232,44,124,0.04)] space-y-5">
          <div className="border-b border-[#F7DCE5] pb-3">
            <h3 className="font-display font-extrabold text-base text-[#2B2024]">
              2. Basic Information
            </h3>
            <p className="text-xs text-[#7A6B70] mt-0.5">
              Treat name, collection category, pricing and portion size.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Product Name */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-[#2B2024] flex items-center gap-1">
                <span>Treat / Product Name</span>
                <span className="text-[#E82C7C]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Signature Strawberry Cloud Cake"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-11 px-4 bg-white border border-[#F7DCE5] rounded-2xl text-sm text-[#2B2024] placeholder:text-[#7A6B70] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC] transition-all"
              />
            </div>

            {/* Category Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2B2024]">
                Category Collection
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-11 px-4 bg-white border border-[#F7DCE5] rounded-2xl text-sm text-[#2B2024] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC] transition-all cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price in Naira */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2B2024] flex items-center gap-1">
                <span>Price (NGN ₦)</span>
                <span className="text-[#E82C7C]">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 font-bold text-[#E82C7C] text-sm">
                  ₦
                </span>
                <input
                  type="number"
                  required
                  min="0"
                  step="500"
                  placeholder="18500"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full h-11 pl-8 pr-4 bg-white border border-[#F7DCE5] rounded-2xl text-sm font-bold text-[#2B2024] placeholder:text-[#7A6B70] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC] transition-all"
                />
              </div>
            </div>

            {/* Daily Stock Quantity */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2B2024]">
                Daily Batch Quantity (Stock)
              </label>
              <input
                type="number"
                min="0"
                placeholder="10"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full h-11 px-4 bg-white border border-[#F7DCE5] rounded-2xl text-sm text-[#2B2024] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC] transition-all"
              />
            </div>

            {/* Portion / Servings */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2B2024]">
                Portion Size / Servings Guide
              </label>
              <input
                type="text"
                placeholder="e.g. Serves 10 - 12 guests (8-inch)"
                value={formData.servings}
                onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                className="w-full h-11 px-4 bg-white border border-[#F7DCE5] rounded-2xl text-sm text-[#2B2024] placeholder:text-[#7A6B70] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC] transition-all"
              />
            </div>

            {/* Description Textarea */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-[#2B2024]">
                Detailed Description &amp; Flavor Story
              </label>
              <textarea
                rows={3}
                placeholder="Describe sponge layers, buttercream frosting, fillings, and textures..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-4 bg-white border border-[#F7DCE5] rounded-2xl text-sm text-[#2B2024] placeholder:text-[#7A6B70] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC] transition-all leading-relaxed"
              />
            </div>

            {/* Ingredients Textarea */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-[#2B2024]">
                Key Ingredients &amp; Allergens Note
              </label>
              <input
                type="text"
                placeholder="e.g. European butter, Belgian chocolate, flour, farm eggs, organic cane sugar."
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                className="w-full h-11 px-4 bg-white border border-[#F7DCE5] rounded-2xl text-sm text-[#2B2024] placeholder:text-[#7A6B70] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Availability & Visibility Toggles */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#F7DCE5] shadow-[0_4px_20px_rgba(232,44,124,0.04)] space-y-4">
          <div className="border-b border-[#F7DCE5] pb-3">
            <h3 className="font-display font-extrabold text-base text-[#2B2024]">
              3. Store Availability &amp; Badges
            </h3>
            <p className="text-xs text-[#7A6B70] mt-0.5">
              Control whether clients can currently order this item in your bakery store.
            </p>
          </div>

          <div className="divide-y divide-[#F7DCE5]">
            <AdminToggle
              label="Available in Online Store"
              description="When turned on, clients can add this treat to their basket and place order requests."
              checked={formData.is_available}
              onChange={(val) => setFormData({ ...formData, is_available: val })}
            />

            <AdminToggle
              label="Highlight as Chef Special / Featured"
              description="Displays a golden highlight badge on the menu and features this item on the homepage spotlight."
              checked={formData.is_featured}
              onChange={(val) => setFormData({ ...formData, is_featured: val })}
            />
          </div>
        </div>

        {/* Bottom Submission Action Bar */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-2">
          <Link to="/admin/products" className="w-full sm:w-auto">
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#F7DCE5] bg-white text-xs font-bold text-[#7A6B70] hover:text-[#2B2024] hover:bg-stone-50 transition-colors"
            >
              Cancel
            </button>
          </Link>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#E82C7C] hover:bg-[#D31665] text-white text-sm font-bold shadow-[0_4px_16px_rgba(232,44,124,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>Saving Changes...</span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEditing ? 'Save Changes' : 'Save & Publish Treat'}</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      <AdminModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Product?"
        subtitle="Are you sure you want to delete this treat from your catalog?"
        confirmText="Yes, Delete Treat"
        confirmVariant="danger"
        onConfirm={handleDelete}
        icon={Trash2}
      >
        <p className="text-xs text-[#7A6B70]">
          This action will immediately remove <strong className="text-[#2B2024]">{formData.name}</strong> from your online catalog and admin dashboard.
        </p>
      </AdminModal>
    </div>
  );
}
