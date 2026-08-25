import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { formatCurrency } from '../../../lib/formatters';

export default function ProductList() {
  const PRODUCTS = [
    { id: '1', name: 'Signature Strawberry Cloud Cake', category: 'Artisanal Cakes', price: 18500, stock: 12, is_available: true, is_featured: true },
    { id: '2', name: 'Red Velvet Gold Cupcakes (Box of 6)', category: 'Gourmet Cupcakes', price: 9500, stock: 24, is_available: true, is_featured: true },
    { id: '3', name: 'Pistachio Butter Croissants (4 pcs)', category: 'Fresh Pastries', price: 8000, stock: 8, is_available: true, is_featured: true },
    { id: '4', name: 'Mango & Passionfruit Parfait Cups (6 pcs)', category: 'Dessert Cups', price: 12000, stock: 0, is_available: false, is_featured: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-charcoal-900">Treats & Bakery Catalog</h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Manage your artisanal recipes, daily prices, stock availability, and featured pastry tags.
          </p>
        </div>
        <Link to="/admin/products/new" className="w-full sm:w-auto">
          <Button variant="primary" icon={Plus} className="w-full sm:w-auto justify-center">
            Add New Treat
          </Button>
        </Link>
      </div>

      <Card className="p-4 sm:p-6">
        {/* Mobile Cards List (< md) */}
        <div className="md:hidden space-y-3.5">
          {MOCK_PRODUCTS.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-xl bg-cream-surface/50 border border-cream-border space-y-2.5 text-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-charcoal-900 font-display text-sm">
                    {p.name}
                  </h4>
                  <p className="text-charcoal-500 mt-0.5">{p.category}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <Badge variant={p.is_available ? 'success' : 'error'} size="sm" dot>
                    {p.is_available ? 'Available' : 'Sold Out'}
                  </Badge>
                  {p.is_featured && <Badge variant="gold" size="sm">Featured</Badge>}
                </div>
              </div>

              <div className="flex items-center justify-between text-charcoal-700 pt-1">
                <div>
                  <span className="text-[11px] text-charcoal-500 block">Unit Price</span>
                  <span className="font-bold text-brand-700 text-sm">{formatCurrency(p.price)}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-charcoal-500 block">Daily Stock</span>
                  <span className="font-medium text-charcoal-900">{p.stock} units</span>
                </div>
              </div>

              <div className="pt-2 border-t border-cream-border/60">
                <Link to={`/admin/products/${p.id}/edit`} className="block">
                  <Button variant="outline" size="sm" icon={Edit} className="w-full justify-center">
                    Edit Treat Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table (>= md) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-cream-border text-charcoal-500 uppercase tracking-wider text-xs">
                <th className="pb-3 font-semibold">Treat Name</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Price</th>
                <th className="pb-3 font-semibold">Stock</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-border/60 text-charcoal-700">
              {MOCK_PRODUCTS.map((p) => (
                <tr key={p.id} className="hover:bg-cream-surface/40">
                  <td className="py-3.5 font-bold text-charcoal-900 font-display">
                    {p.name} {p.is_featured && <Badge variant="gold" size="sm" className="ml-1.5">Featured</Badge>}
                  </td>
                  <td className="py-3.5">{p.category}</td>
                  <td className="py-3.5 font-bold text-brand-700">{formatCurrency(p.price)}</td>
                  <td className="py-3.5">{p.stock} units</td>
                  <td className="py-3.5">
                    <Badge variant={p.is_available ? 'success' : 'error'} size="sm" dot>
                      {p.is_available ? 'Active & Available' : 'Sold Out'}
                    </Badge>
                  </td>
                  <td className="py-3.5 text-right">
                    <Link to={`/admin/products/${p.id}/edit`}>
                      <Button variant="ghost" size="sm" icon={Edit} className="h-8">
                        Edit
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
