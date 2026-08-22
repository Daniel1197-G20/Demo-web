import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Calendar,
  Award,
  Truck,
  HeartHandshake,
  Star,
  CheckCircle2,
} from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import Card, { CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProductCard from '../../components/ui/ProductCard';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../../hooks/useToast';

export default function Home() {
  const { addItem, items } = useCart();
  const toast = useToast();

  const handleAddToCart = (product) => {
    addItem(product, 1);
    toast.success(`Added ${product.name} to your basket!`, 'Fresh Treat Added');
  };

  // Sample Featured Treats matching Tory's Treats aesthetic
  const FEATURED_TREATS = [
    {
      id: 'treat-1',
      slug: 'signature-strawberry-cloud-cake',
      name: 'Signature Strawberry Cloud Cake',
      price: 18500,
      images: [
        'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=700&auto=format&fit=crop&q=80',
      ],
      category: 'Artisanal Cakes',
      is_available: true,
      is_featured: true,
      min_order_quantity: 1,
    },
    {
      id: 'treat-2',
      slug: 'red-velvet-gold-cupcakes-box-of-6',
      name: 'Red Velvet Gold Cupcakes (Box of 6)',
      price: 9500,
      images: [
        'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=700&auto=format&fit=crop&q=80',
      ],
      category: 'Gourmet Cupcakes',
      is_available: true,
      is_featured: true,
      min_order_quantity: 1,
    },
    {
      id: 'treat-3',
      slug: 'pistachio-butter-croissants-box-of-4',
      name: 'Pistachio Butter Croissants (4 pcs)',
      price: 8000,
      images: [
        'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=700&auto=format&fit=crop&q=80',
      ],
      category: 'Fresh Pastries',
      is_available: true,
      is_featured: true,
      min_order_quantity: 1,
    },
    {
      id: 'treat-4',
      slug: 'mango-passionfruit-parfait-cups',
      name: 'Mango & Passionfruit Parfait Cups (6 pcs)',
      price: 12000,
      images: [
        'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700&auto=format&fit=crop&q=80',
      ],
      category: 'Dessert Cups',
      is_available: true,
      is_featured: false,
      min_order_quantity: 1,
    },
  ];

  const CATEGORIES = [
    {
      title: 'Artisan Cakes',
      desc: 'Bespoke tiered cakes for milestone birthdays, weddings, & anniversaries.',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600&auto=format&fit=crop&q=80',
      count: '14 Flavors',
    },
    {
      title: 'Gourmet Cupcakes',
      desc: 'Fluffy sponge with rich velvety buttercream frosting & gold dust.',
      image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&auto=format&fit=crop&q=80',
      count: '9 Varieties',
    },
    {
      title: 'French Pastries',
      desc: 'Flaky pain au chocolat, butter croissants, & cinnamon swirls.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
      count: '12 Items',
    },
    {
      title: 'Dessert Platters',
      desc: 'Curated dessert boxes for parties, office lunches, & gifts.',
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80',
      count: '6 Sets',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-tory-50/70 via-cream-base to-cream-base pt-6 pb-12 sm:pt-12 sm:pb-20">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tory-100/80 border border-tory-200 text-tory-700 text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-tory-500" />
                <span>Lagos’ Premier Luxury Bakery & Catering</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal-900 font-display leading-[1.1] tracking-tight">
                Sweet treats crafted to make every moment{' '}
                <span className="text-tory-500 relative">
                  unforgettable.
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-tory-300 -z-10"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                  >
                    <path d="M0 15 Q50 0 100 15" stroke="currentColor" strokeWidth="6" fill="none" />
                  </svg>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-charcoal-700 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                From melt-in-your-mouth celebration cakes to bespoke dessert tables for high-profile weddings and corporate galas, Tory’s Treats brings artisanal bakery perfection right to your table.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link to="/shop" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" icon={ShoppingBag} className="w-full sm:w-auto">
                    Explore Treats Menu
                  </Button>
                </Link>
                <Link to="/catering" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" icon={Calendar} className="w-full sm:w-auto">
                    Book Event Catering
                  </Button>
                </Link>
              </div>

              {/* Social Proof Stats */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-cream-border/80 max-w-md mx-auto lg:mx-0">
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display block">
                    10,000+
                  </span>
                  <span className="text-xs text-charcoal-500 font-medium">Treats Delivered</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 font-display block">
                    450+
                  </span>
                  <span className="text-xs text-charcoal-500 font-medium">Events Catered</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-tory-500 font-display block">
                    4.9 ★
                  </span>
                  <span className="text-xs text-charcoal-500 font-medium">Customer Rating</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Cards */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-tory-lg border-4 border-white aspect-[4/5] bg-cream-surface">
                  <img
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&auto=format&fit=crop&q=80"
                    alt="Luxury Strawberry Bakery Cake"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="px-3 py-1 rounded-full bg-tory-500 text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                      Chef Special
                    </span>
                    <h3 className="text-xl font-bold font-display leading-tight">
                      Strawberry Velvet Royale
                    </h3>
                    <p className="text-xs text-white/80 mt-1">Baked fresh with Belgian chocolate and real organic berries.</p>
                  </div>
                </div>

                {/* Floating Micro Badge 1 */}
                <div className="absolute -top-4 -left-4 bg-white p-3.5 rounded-2xl shadow-tory-md border border-cream-border flex items-center gap-3 animate-float hidden sm:flex">
                  <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center font-bold">
                    ★
                  </div>
                  <div>
                    <span className="text-xs font-bold text-charcoal-900 block">100% Artisanal</span>
                    <span className="text-[10px] text-charcoal-500">Baked fresh every morning</span>
                  </div>
                </div>

                {/* Floating Micro Badge 2 */}
                <div className="absolute -bottom-4 -right-4 bg-white p-3.5 rounded-2xl shadow-tory-md border border-cream-border flex items-center gap-3 animate-float hidden sm:flex">
                  <div className="w-10 h-10 rounded-xl bg-tory-100 text-tory-600 flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-charcoal-900 block">Lagos Delivery</span>
                    <span className="text-[10px] text-charcoal-500">Fast & temperature-guarded</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* 2. FEATURED TREATS SECTION */}
      <section>
        <PageContainer>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
            <SectionHeading
              align="left"
              tag="Fresh From The Oven"
              title="Our Most Loved Bakes"
              subtitle="Handcrafted daily with premium ingredients, pure butter, and unforgettable flavor profiles."
              className="mb-0"
            />
            <Link to="/shop" className="mt-4 md:mt-0">
              <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                View Full Catalog
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_TREATS.map((treat) => (
              <ProductCard
                key={treat.id}
                product={treat}
                onAddToCart={handleAddToCart}
                isInCart={items.some((i) => i.id === treat.id)}
                cartQuantity={items.find((i) => i.id === treat.id)?.quantity || 0}
              />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* 3. CATEGORIES HIGHLIGHT */}
      <section className="bg-cream-surface py-16 sm:py-20 border-y border-cream-border">
        <PageContainer>
          <SectionHeading
            tag="Curated Collections"
            title="Explore by Sweet Category"
            subtitle="Whether you crave a single pastry or a showstopping celebration centerpiece, we have you covered."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat, idx) => (
              <Link to="/shop" key={idx} className="group">
                <Card hover className="h-full bg-white flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden bg-cream-base">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="font-bold text-charcoal-900 text-lg font-display group-hover:text-tory-500 transition-colors">
                          {cat.title}
                        </h4>
                        <span className="text-[11px] font-bold text-tory-600 bg-tory-50 px-2 py-0.5 rounded-full">
                          {cat.count}
                        </span>
                      </div>
                      <p className="text-xs text-charcoal-500 leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>
                    <div className="pt-4 flex items-center text-xs font-bold text-tory-500 group-hover:translate-x-1 transition-transform">
                      <span>Browse category</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* 4. BESPOKE CATERING PROMO BLOCK */}
      <section>
        <PageContainer>
          <div className="bg-gradient-to-br from-charcoal-900 to-charcoal-800 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-tory-lg relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-6">
                <span className="px-3.5 py-1.5 rounded-full bg-tory-500 text-white text-xs font-bold uppercase tracking-wider inline-block">
                  Luxury Event Services
                </span>

                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight">
                  Elevate your weddings & galas with a bespoke dessert experience.
                </h2>

                <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-xl">
                  We design showstopping dessert tables, custom tiered cakes, dessert cup bars, and live treat stations tailored precisely to your event's theme and guest count.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-tory-400 shrink-0" />
                    <span>Custom Flavors & Dietary Menus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-tory-400 shrink-0" />
                    <span>On-Site Presentation & Styling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-tory-400 shrink-0" />
                    <span>Dedicated Event Coordinator</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-tory-400 shrink-0" />
                    <span>Tasting Consultations Available</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link to="/catering">
                    <Button variant="primary" size="lg" icon={Calendar}>
                      Request a Custom Catering Quote
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border-2 border-white/20 aspect-[4/3] shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=80"
                    alt="Luxury Wedding Catering Display"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* 5. WHY CHOOSE US PILLARS */}
      <section className="py-12">
        <PageContainer>
          <SectionHeading
            tag="The Tory's Promise"
            title="Why Lagos Chooses Tory's Treats"
            subtitle="We pour uncompromising craft, premium ingredients, and authentic warmth into every single bake."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-tory-100 text-tory-600 flex items-center justify-center mb-4">
                <Award className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-charcoal-900 text-lg font-display mb-2">
                100% Pure & Premium
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed">
                Zero artificial preservatives or shortcuts. We use genuine creamery butter, organic vanilla, and luxury Belgian chocolates.
              </p>
            </Card>

            <Card className="p-6 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-gold-50 text-gold-600 flex items-center justify-center mb-4">
                <Truck className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-charcoal-900 text-lg font-display mb-2">
                Reliable Temperature Delivery
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed">
                Your cakes and delicate pastries arrive in pristine, chilled condition directly to your venue or doorstep in Lagos.
              </p>
            </Card>

            <Card className="p-6 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-charcoal-900 text-lg font-display mb-2">
                Personalized Care
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed">
                Direct WhatsApp assistance, custom flavor requests, and flexible contract opportunities for aspiring culinary talents.
              </p>
            </Card>
          </div>
        </PageContainer>
      </section>

      {/* 6. DESIGN SYSTEM LAB PREVIEW SHORTCUT */}
      <section className="bg-cream-surface py-8 border-t border-cream-border">
        <PageContainer>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-cream-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-tory-500 text-white flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-charcoal-900 font-display">
                  Phase 1 Design System & Component Test Lab
                </h4>
                <p className="text-xs text-charcoal-500">
                  Inspect all centralized tokens, button states, modals, forms, and alerts in one view.
                </p>
              </div>
            </div>

            <Link to="/design-system">
              <Button variant="secondary" size="sm">
                Open Design System Lab &rarr;
              </Button>
            </Link>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
