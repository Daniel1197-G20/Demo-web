import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Upload, Sparkles } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Textarea from '../../../components/ui/Textarea';
import Button from '../../../components/ui/Button';
import { useToast } from '../../../hooks/useToast';

export default function ProductForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: isEditing ? 'Signature Strawberry Cloud Cake' : '',
    category: 'Artisanal Cakes',
    price: isEditing ? '18500' : '',
    stockQuantity: isEditing ? '12' : '10',
    minOrderQuantity: '1',
    isAvailable: true,
    isFeatured: isEditing ? true : false,
    description: isEditing
      ? 'Airy vanilla sponge soaked in light strawberry reduction with mascarpone buttercream.'
      : '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(
        isEditing ? 'Product updated successfully!' : 'New product created successfully!',
        'Product Saved'
      );
      navigate('/admin/products');
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link
          to="/admin/products"
          className="p-2 rounded-xl bg-white border border-cream-border text-charcoal-700 hover:text-tory-600"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-display text-charcoal-900">
            {isEditing ? 'Edit Bakery Product' : 'Add New Treat Product'}
          </h1>
          <p className="text-xs text-charcoal-500">
            Configure menu details, pricing, and availability.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold font-display text-charcoal-900 border-b border-cream-border pb-2">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Product Name"
              required
              placeholder="e.g. Belgian Truffle Chocolate Cake"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={[
                { value: 'Artisanal Cakes', label: 'Artisanal Cakes' },
                { value: 'Gourmet Cupcakes', label: 'Gourmet Cupcakes' },
                { value: 'Fresh Pastries', label: 'Fresh Pastries' },
                { value: 'Dessert Cups', label: 'Dessert Cups' },
                { value: 'Platters', label: 'Platters & Gift Boxes' },
              ]}
            />

            <Input
              label="Price (NGN ₦)"
              type="number"
              required
              placeholder="18500"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />

            <Input
              label="Stock Quantity"
              type="number"
              placeholder="10"
              value={formData.stockQuantity}
              onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
            />
          </div>

          <Textarea
            label="Product Description"
            rows={3}
            placeholder="Describe the layers, ingredients, and flavor profile..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </Card>

        {/* Toggles */}
        <Card className="p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold font-display text-charcoal-900 border-b border-cream-border pb-2">
            Catalog Flags
          </h3>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-xs font-semibold text-charcoal-900 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isAvailable}
                onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                className="w-4 h-4 rounded text-tory-500 focus:ring-tory-400"
              />
              <span>Available for Instant Order</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-charcoal-900 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 rounded text-tory-500 focus:ring-tory-400"
              />
              <span>Highlight as Chef Special / Featured</span>
            </label>
          </div>
        </Card>

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/products')}
            className="w-full sm:w-auto justify-center"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            icon={Save}
            isLoading={isLoading}
            className="w-full sm:w-auto justify-center"
          >
            {isEditing ? 'Save Changes' : 'Create Treat Item'}
          </Button>
        </div>
      </form>
    </div>
  );
}
