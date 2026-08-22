import React from 'react';
import { Plus, Edit, Layers } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';

export default function CategoryManager() {
  const CATEGORIES = [
    { id: '1', name: 'Artisanal Cakes', slug: 'artisanal-cakes', order: 1, count: 14, active: true },
    { id: '2', name: 'Gourmet Cupcakes', slug: 'gourmet-cupcakes', order: 2, count: 9, active: true },
    { id: '3', name: 'Fresh Pastries', slug: 'fresh-pastries', order: 3, count: 12, active: true },
    { id: '4', name: 'Dessert Cups', slug: 'dessert-cups', order: 4, count: 8, active: true },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-charcoal-900">
            Category Management
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Organize customer menu categories, display hierarchies, and active statuses.
          </p>
        </div>

        <Button variant="primary" icon={Plus}>
          Add Category
        </Button>
      </div>

      <Card className="p-6">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-cream-border text-charcoal-500 uppercase tracking-wider text-xs">
              <th className="pb-3 font-semibold">Category Name</th>
              <th className="pb-3 font-semibold">Slug</th>
              <th className="pb-3 font-semibold">Items</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-border/60 text-charcoal-700">
            {CATEGORIES.map((c) => (
              <tr key={c.id} className="hover:bg-cream-surface/40">
                <td className="py-3.5 font-bold text-charcoal-900">{c.name}</td>
                <td className="py-3.5 text-charcoal-500 font-mono text-xs">{c.slug}</td>
                <td className="py-3.5">{c.count} items</td>
                <td className="py-3.5">
                  <Badge variant="success" size="sm" dot>
                    Active
                  </Badge>
                </td>
                <td className="py-3.5 text-right">
                  <Button variant="ghost" size="sm" icon={Edit} className="h-8">
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
