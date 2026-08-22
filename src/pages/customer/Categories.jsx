import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import Card, { CardContent } from '../../components/ui/Card';

export default function Categories() {
  const CATEGORIES = [
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
      desc: 'Flaky golden croissants, fruit danishes, and rich éclairs.',
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
  ];

  return (
    <PageContainer>
      <SectionHeading
        tag="Sweet Collections"
        title="Browse by Category"
        subtitle="Explore our curated baking styles and specialty menu lines."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {CATEGORIES.map((cat) => (
          <Link to={`/shop`} key={cat.slug} className="group">
            <Card hover className="h-full bg-white flex flex-col md:flex-row overflow-hidden">
              <div className="md:w-1/2 aspect-[4/3] md:aspect-auto overflow-hidden bg-cream-base">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardContent className="md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-tory-600 uppercase tracking-wider">
                    {cat.itemsCount} Bakes
                  </span>
                  <h3 className="text-xl font-bold text-charcoal-900 font-display mt-1 mb-2 group-hover:text-tory-500 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-4 flex items-center text-xs font-bold text-tory-500 group-hover:translate-x-1 transition-transform">
                  <span>Explore items</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
