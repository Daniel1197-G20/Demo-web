import React, { useState } from 'react';
import { Plus, Edit, Trash2, Layers, Sparkles, Check, X } from 'lucide-react';
import { useAdminStore } from '../../../lib/adminStore';
import { useToast } from '../../../hooks/useToast';
import AdminBadge from '../../../components/admin/AdminBadge';
import AdminModal from '../../../components/admin/AdminModal';

export default function CategoryManager() {
  const store = useAdminStore();
  const toast = useToast();
  const categories = store.getCategories();
  const products = store.getProducts();

  const [modalMode, setModalMode] = useState(null); // null | 'add' | 'edit' | 'delete'
  const [activeCategory, setActiveCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '', active: true });

  const openAddModal = () => {
    setCategoryForm({ name: '', description: '', active: true });
    setModalMode('add');
  };

  const openEditModal = (cat) => {
    setActiveCategory(cat);
    setCategoryForm({
      name: cat.name,
      description: cat.description || '',
      active: cat.active !== undefined ? cat.active : true,
    });
    setModalMode('edit');
  };

  const openDeleteModal = (cat) => {
    setActiveCategory(cat);
    setModalMode('delete');
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) {
      toast.error('Please provide a category name.', 'Validation Error');
      return;
    }

    if (modalMode === 'add') {
      store.addCategory(categoryForm);
      toast.success(`Category "${categoryForm.name}" created!`, 'Category Added');
    } else if (modalMode === 'edit' && activeCategory) {
      store.updateCategory(activeCategory.id, categoryForm);
      toast.success(`Category "${categoryForm.name}" updated!`, 'Category Updated');
    }

    setModalMode(null);
  };

  const handleDeleteCategory = () => {
    if (!activeCategory) return;
    store.deleteCategory(activeCategory.id);
    toast.success(`Category "${activeCategory.name}" removed.`, 'Category Deleted');
    setModalMode(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-5xl">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & ACTION
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#2B2024]">
              Product Categories
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFF5F8] text-[#E82C7C] border border-[#FCE4EC] text-xs font-bold">
              {categories.length} Collections
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#7A6B70] mt-1">
            Organize bakery treats into collections to power filters and shop menus.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#E82C7C] hover:bg-[#D31665] text-white text-xs sm:text-sm font-bold shadow-[0_4px_14px_rgba(232,44,124,0.3)] transition-all active:scale-95 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5px]" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CATEGORIES TABLE & MOBILE CARDS
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-[#F7DCE5] p-5 sm:p-7 shadow-[0_4px_20px_rgba(232,44,124,0.04)]">
        {/* Mobile Cards View (< lg) */}
        <div className="lg:hidden space-y-3.5">
          {categories.map((c) => {
            const count = products.filter((p) => p.category.toLowerCase() === c.name.toLowerCase()).length;
            return (
              <div
                key={c.id}
                className="p-4 rounded-2xl bg-[#FFF5F8]/50 border border-[#FCE4EC] space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#FCE4EC] flex items-center justify-center text-[#E82C7C] shadow-xs">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-sm text-[#2B2024]">
                        {c.name}
                      </h4>
                      <span className="font-mono text-[10px] text-[#7A6B70]">/{c.slug}</span>
                    </div>
                  </div>
                  <AdminBadge variant={c.active ? 'success' : 'neutral'} size="sm" dot>
                    {c.active ? 'Active' : 'Hidden'}
                  </AdminBadge>
                </div>

                {c.description && (
                  <p className="text-xs text-[#7A6B70] leading-snug">{c.description}</p>
                )}

                <div className="flex flex-wrap items-center justify-between text-xs pt-2.5 border-t border-[#F7DCE5] gap-2">
                  <span className="text-[#7A6B70]">
                    Assigned: <strong className="text-[#2B2024]">{count} treats</strong>
                  </span>

                  <div className="flex items-center gap-2 shrink-0 ml-auto">
                    <button
                      type="button"
                      onClick={() => openEditModal(c)}
                      className="px-3.5 py-1 rounded-full bg-white border border-[#F7DCE5] text-[#E82C7C] text-xs font-bold hover:border-[#E82C7C] hover:bg-[#FFF5F8] transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => openDeleteModal(c)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                      title="Delete category"
                      aria-label="Delete category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Table View (>= lg) */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#F7DCE5] text-[#7A6B70] uppercase tracking-wider text-[10px] font-extrabold">
                <th className="pb-3.5 font-bold">Category Collection</th>
                <th className="pb-3.5 font-bold">URL Slug</th>
                <th className="pb-3.5 font-bold">Description</th>
                <th className="pb-3.5 font-bold">Live Treats</th>
                <th className="pb-3.5 font-bold">Status</th>
                <th className="pb-3.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F7DCE5]/60 text-[#2B2024]">
              {categories.map((c) => {
                const count = products.filter((p) => p.category.toLowerCase() === c.name.toLowerCase()).length;
                return (
                  <tr key={c.id} className="hover:bg-[#FFF5F8]/40 transition-colors">
                    <td className="py-3.5 font-display font-extrabold text-[#2B2024] flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#FFF5F8] border border-[#FCE4EC] flex items-center justify-center text-[#E82C7C] shadow-xs shrink-0">
                        <Layers className="w-4 h-4" />
                      </div>
                      <span>{c.name}</span>
                    </td>
                    <td className="py-3.5 font-mono text-xs text-[#7A6B70]">/{c.slug}</td>
                    <td className="py-3.5 text-xs text-[#7A6B70] max-w-xs truncate">
                      {c.description || '—'}
                    </td>
                    <td className="py-3.5 font-bold text-[#E82C7C]">{count} items</td>
                    <td className="py-3.5">
                      <AdminBadge variant={c.active ? 'success' : 'neutral'} size="sm" dot>
                        {c.active ? 'Active' : 'Hidden'}
                      </AdminBadge>
                    </td>
                    <td className="py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(c)}
                          className="px-3 py-1.5 rounded-full bg-[#FFF5F8] text-[#E82C7C] border border-[#FCE4EC] hover:bg-[#E82C7C] hover:text-white font-bold text-xs transition-colors flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => openDeleteModal(c)}
                          className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 border border-rose-200 transition-colors"
                          title="Delete category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. ADD / EDIT CATEGORY MODAL
      ───────────────────────────────────────────────────────────── */}
      <AdminModal
        isOpen={modalMode === 'add' || modalMode === 'edit'}
        onClose={() => setModalMode(null)}
        title={modalMode === 'add' ? 'Create New Category' : `Edit Category: ${activeCategory?.name}`}
        subtitle="Manage this collection name, description and visibility in the store."
        confirmText={modalMode === 'add' ? 'Create Category' : 'Save Changes'}
        onConfirm={handleSaveCategory}
        icon={Layers}
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#2B2024]">Category Name</label>
            <input
              type="text"
              required
              value={categoryForm.name}
              onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
              placeholder="e.g. Artisanal Breads & Loaves"
              className="w-full h-11 px-4 bg-white border border-[#F7DCE5] rounded-2xl text-sm text-[#2B2024] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#2B2024]">Collection Description</label>
            <textarea
              rows={2}
              value={categoryForm.description}
              onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
              placeholder="Brief description displayed on the category browsing page..."
              className="w-full p-3 bg-white border border-[#F7DCE5] rounded-2xl text-xs text-[#2B2024] focus:outline-none focus:border-[#E82C7C] focus:ring-2 focus:ring-[#FCE4EC]"
            />
          </div>
        </div>
      </AdminModal>

      {/* ─────────────────────────────────────────────────────────────
          4. DELETE CATEGORY CONFIRMATION MODAL
      ───────────────────────────────────────────────────────────── */}
      <AdminModal
        isOpen={modalMode === 'delete'}
        onClose={() => setModalMode(null)}
        title="Delete Category?"
        subtitle={`Are you sure you want to remove "${activeCategory?.name}"?`}
        confirmText="Yes, Delete Category"
        confirmVariant="danger"
        onConfirm={handleDeleteCategory}
        icon={Trash2}
      >
        <p className="text-xs text-[#7A6B70] leading-relaxed">
          Removing this category will not delete the associated treats, but will remove this filter collection from your store navigation.
        </p>
      </AdminModal>
    </div>
  );
}
