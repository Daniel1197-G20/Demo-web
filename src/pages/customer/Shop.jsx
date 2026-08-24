import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import ProductCard from '../../components/ui/ProductCard';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../../hooks/useToast';

export default function Shop() {
  const { addItem, items } = useCart();
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const CATEGORIES = ['All', 'Artisanal Cakes', 'Gourmet Cupcakes', 'Fresh Pastries', 'Dessert Cups'];

  const MOCK_PRODUCTS = [
    {
      id: 'treat-1',
      slug: 'signature-strawberry-cloud-cake',
      name: 'Signature Strawberry Cloud Cake',
      price: 18500,
      images: ['https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=700&auto=format&fit=crop&q=80'],
      category: 'Artisanal Cakes',
      is_available: true,
      is_featured: true,
    },
    {
      id: 'treat-2',
      slug: 'red-velvet-gold-cupcakes-box-of-6',
      name: 'Red Velvet Gold Cupcakes (Box of 6)',
      price: 9500,
      images: ['https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=700&auto=format&fit=crop&q=80'],
      category: 'Gourmet Cupcakes',
      is_available: true,
      is_featured: true,
    },
    {
      id: 'treat-3',
      slug: 'pistachio-butter-croissants-box-of-4',
      name: 'Pistachio Butter Croissants (4 pcs)',
      price: 8000,
      images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=700&auto=format&fit=crop&q=80'],
      category: 'Fresh Pastries',
      is_available: true,
      is_featured: true,
    },
    {
      id: 'treat-4',
      slug: 'mango-passionfruit-parfait-cups',
      name: 'Mango & Passionfruit Parfait Cups (6 pcs)',
      price: 12000,
      images: ['https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700&auto=format&fit=crop&q=80'],
      category: 'Dessert Cups',
      is_available: true,
      is_featured: false,
    },
    {
      id: 'treat-5',
      slug: 'dark-chocolate-hazelnut-fudge-cake',
      name: 'Dark Chocolate Hazelnut Fudge Cake',
      price: 22000,
      images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700&auto=format&fit=crop&q=80'],
      category: 'Artisanal Cakes',
      is_available: true,
      is_featured: true,
    },
    {
      id: 'treat-6',
      slug: 'salted-caramel-eclair-box',
      name: 'Salted Caramel Éclair Box (4 pcs)',
      price: 7500,
      images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&auto=format&fit=crop&q=80'],
      category: 'Fresh Pastries',
      is_available: true,
      is_featured: false,
    },
  ];

  const filtered = MOCK_PRODUCTS.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <PageContainer>
      <SectionHeading
        tag="Oven Fresh"
        title="Explore Tory's Treats Catalog"
        subtitle="Handcrafted daily with premium butter, Belgian chocolate, and pure passion."
      />

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto custom-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-brand-700 text-white shadow-brand-sm'
                  : 'bg-white border border-cream-border text-charcoal-700 hover:bg-cream-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search treats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leadingIcon={Search}
            inputClassName="bg-white"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            onAddToCart={(p) => {
              addItem(p, 1);
              toast.success(`Added ${p.name} to your basket!`);
            }}
            isInCart={items.some((i) => i.id === prod.id)}
            cartQuantity={items.find((i) => i.id === prod.id)?.quantity || 0}
          />
        ))}
      </div>
    </PageContainer>
  );
}
