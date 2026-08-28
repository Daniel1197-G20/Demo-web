import React from 'react';
import PageContainer from '../../components/common/PageContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import CategoryCard from '../../components/ui/CategoryCard';
import { SkeletonCategoryCard } from '../../components/ui/Skeleton';
import { adminStore } from '../../lib/adminStore';
import { CACHE_TTL } from '../../lib/cache';
import { useCachedData } from '../../hooks/useCachedData';

const DEFAULT_CATEGORY_METAS = [
  {
    title: 'Artisanal Cakes',
    slug: 'artisanal-cakes',
    desc: 'Layered celebration cakes, naked cakes, and bespoke wedding centerpieces.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600&auto=format&fit=crop&q=80',
    itemsCount: 14,
  },
  {
    title: 'Gourmet Cupcakes',
    slug: 'gourmet-cupcakes',
    desc: 'Individual sweet bites with velvety Swiss buttercream and golden sprinkles.',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&auto=format&fit=crop&q=80',
    itemsCount: 9,
  },
  {
    title: 'French Pastries',
    slug: 'french-pastries',
    desc: 'Flaky golden croissants, fruit danishes, and rich chocolate éclairs.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    itemsCount: 12,
  },
  {
    title: 'Dessert Cups & Parfaits',
    slug: 'dessert-cups',
    desc: 'Individual glass cups layered with fruit purées, mousses, and biscuit crumbles.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80',
    itemsCount: 8,
  },
  {
    title: 'Celebration Platters',
    slug: 'celebration-platters',
    desc: 'Curated dessert boxes for parties, office lunches, hampers & gifting.',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80',
    itemsCount: 6,
  },
  {
    title: 'Seasonal Drops',
    slug: 'seasonal-drops',
    desc: 'Limited-edition weekend chef specials and holiday festive bakes.',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop&q=80',
    itemsCount: 5,
  },
];

export default function Categories() {
  const { data: categories, isLoading } = useCachedData(
    'categories:all',
    () => adminStore.getCategories(),
    { ttl: CACHE_TTL.CATEGORIES }
  );

  const displayCategories = (categories && categories.length > 0)
    ? categories.map((c, i) => {
        const meta = DEFAULT_CATEGORY_METAS[i] || DEFAULT_CATEGORY_METAS[0];
        return {
          title: c.name,
          slug: c.slug,
          desc: c.description || meta.desc,
          image: meta.image,
          itemsCount: meta.itemsCount,
        };
      })
    : DEFAULT_CATEGORY_METAS;

  return (
    <PageContainer>
      <SectionHeading
        tag="Sweet Collections"
        title="Browse by Category"
        subtitle="Explore our curated baking styles, artisanal pastry lines, and specialty dessert collections."
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCategoryCard key={idx} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCategories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}

