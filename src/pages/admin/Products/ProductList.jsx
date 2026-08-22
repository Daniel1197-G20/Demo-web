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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900">
            Product Catalog Management
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Manage bakery menu items, pricing, inventory availability, and featured highlights.
          </p>
        </div>

        <Link to="/admin/products/new">
          <Button variant="primary" icon={Plus}>
            Add New Product
          </Button>
        </Link>
      </div>

      <Card className="p-6 overflow-x-auto">
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
            {PRODUCTS.map((p) => (
              <tr key={p.id} className="hover:bg-cream-surface/40">
                <td className="py-3.5 font-bold text-charcoal-900">
                  {p.name} {p.is_featured && <Badge variant="gold" size="sm">Featured</Badge>}
                </td>
                <td className="py-3.5">{p.category}</td>
                <td className="py-3.5 font-bold text-tory-600">{formatCurrency(p.price)}</td>
                <td className="py-3.5">{p.stock} units</td>
                <td className="py-3.5">
                  <Badge variant={p.is_available ? 'success' : 'error'} size="sm" dot>
                    {p.is_available ? 'Active & Available' : 'Sold Out'}
                  </Badge>
                </td>
                <td className="py-3.5 text-right space-x-2">
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
      </Card>
    </div>
  );
}
