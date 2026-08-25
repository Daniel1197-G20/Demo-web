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
  CheckCircle2,
  Phone,
  Clock,
  Heart,
  ChevronRight,
  Star,
  Quote,
} from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ProductCard from '../../components/ui/ProductCard';
import ServiceCard from '../../components/ui/ServiceCard';
import CategoryCard from '../../components/ui/CategoryCard';
import BakeryHeroCollage from '../../components/ui/BakeryHeroCollage';
import FeaturedSpotlight from '../../components/ui/FeaturedSpotlight';
import { BRAND } from '../../lib/constants';
import { MOCK_PRODUCTS } from '../../lib/productsData';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../../hooks/useToast';

export default function Home() {
  const { addItem, items } = useCart();
  const toast = useToast();

  const handleAddToCart = (product) => {
    addItem(product, 1);
    toast.success(`Added ${product.name} to your basket!`, 'Fresh Treat Added');
  };

  // Flagship Hero Product from dataset
  const HERO_TREAT = MOCK_PRODUCTS[0];

  // Companion Spotlight Products from dataset
  const COMPANION_TREATS = [MOCK_PRODUCTS[4], MOCK_PRODUCTS[7], MOCK_PRODUCTS[10]];

  // Category Collections
  const CATEGORIES = [
    {
      title: 'Artisanal Cakes',
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

  // Featured Catering Packages
  const CATERING_PACKAGES = [
    {
      id: 'cat-pkg-1',
      title: 'Grand Wedding Dessert Suite',
      category: 'Weddings & Galas',
      desc: 'Showstopping 3-tier custom centerpiece cake, 120+ dessert parfait cups, mini pastries, and on-site styling.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&auto=format&fit=crop&q=80',
      capacity: '100 - 500 Guests',
      startingPrice: 150000,
      features: [
        'Custom 3-Tier Centerpiece Cake',
        'Assorted Dessert Cup Buffet',
        'Dedicated On-Site Presentation Stylist',
        'Private Tasting Consultation Included',
      ],
      link: '/catering',
    },
    {
      id: 'cat-pkg-2',
      title: 'Corporate Gala & Treat Bar',
      category: 'Corporate Events',
      desc: 'Premium pastry platters, branded cupcakes, and luxury dessert shooters tailored for brand activations.',
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=700&auto=format&fit=crop&q=80',
      capacity: '50 - 300 Guests',
      startingPrice: 95000,
      features: [
        'Custom Brand Color Palette',
        'Individual Hygienic Dessert Portions',
        'Chilled Morning Dispatch Across Lagos',
        'Dietary Menus (Gluten/Nut Friendly)',
      ],
      link: '/catering',
    },
    {
      id: 'cat-pkg-3',
      title: 'Milestone Birthday & Party Table',
      category: 'Private Celebrations',
      desc: 'Bespoke birthday cake, matching cupcake towers, cookie favors, and dessert cup displays.',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=700&auto=format&fit=crop&q=80',
      capacity: '20 - 100 Guests',
      startingPrice: 65000,
      features: [
        'Themed Celebration Cake Design',
        '24 Gourmet Gold-Dusted Cupcakes',
        'Cake Stand & Platter Rentals',
        'Custom Flavor Pairing',
      ],
      link: '/catering',
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Brand Introduction & Visual Entrance)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-cream-base to-cream-base pt-4 pb-12 sm:pt-10 sm:pb-20 md:pt-14 md:pb-24 border-b border-cream-border/60">
        <PageContainer>
          <div className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
            {/* Left Column: Editorial Headline & Actions */}
            <div className="text-left md:col-span-7 space-y-4 sm:space-y-5">
              {/* Top Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-100/90 border border-brand-200/80 px-3.5 py-1.5 text-xs font-bold text-brand-800 tracking-wide shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                <span>Lagos’ Premier Luxury Bakery &amp; Catering</span>
              </div>

              {/* Script Accent Subtitle */}
              <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-brand-600">
                Handcrafted with pure French butter &amp; organic berries
              </p>

              {/* Grand Display Headline */}
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-charcoal-900">
                ARTISANAL BAKES &amp;{' '}
                <span className="text-brand-700 relative inline-block">
                  BESPOKE DESSERTS
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-2.5 text-brand-200 -z-10"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                  >
                    <path d="M0 15 Q50 0 100 15" stroke="currentColor" strokeWidth="5" fill="none" />
                  </svg>
                </span>
              </h1>

              {/* Supporting Editorial Description */}
              <p className="max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-charcoal-700">
                From melt-in-your-mouth celebration cakes and flaky French pastries to showstopping dessert tables for high-profile weddings and corporate galas across Lagos.
              </p>

              {/* Dual Primary/Secondary CTAs */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-1">
                <Link
                  to="/shop"
                  className="flex items-center justify-center gap-2 rounded-full bg-brand-700 hover:bg-brand-800 active:bg-brand-900 px-7 py-3.5 text-sm font-semibold text-white shadow-brand-sm hover:shadow-brand-md transition-all active:scale-98 text-center"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Explore Treats Menu →</span>
                </Link>
                <Link
                  to="/catering"
                  className="flex items-center justify-center gap-2 rounded-full border border-cream-border hover:border-brand-400 bg-white/80 hover:bg-white px-7 py-3.5 text-sm font-semibold text-charcoal-900 hover:text-brand-700 transition-all active:scale-98 text-center shadow-xs"
                >
                  <Calendar className="w-4 h-4 text-brand-700" />
                  <span>Book Event Catering</span>
                </Link>
              </div>

              {/* Boutique Schedule & Phone Pill */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-charcoal-700">
                <a
                  href={`tel:${BRAND.phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center gap-2 rounded-full border border-cream-border bg-white px-3.5 py-1.5 font-semibold text-charcoal-800 hover:border-brand-400 hover:text-brand-700 transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-700" />
                  <span>{BRAND.phone}</span>
                </a>
                <span className="text-charcoal-500 font-medium">
                  Mon–Sat: 8am–7pm • Victoria Island, Lagos
                </span>
              </div>

              {/* Social Proof Statistics Bar */}
              <div className="pt-5 grid grid-cols-3 gap-2 sm:gap-4 border-t border-cream-border/80 max-w-lg">
                <div>
                  <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-charcoal-900 font-display block">
                    10,000+
                  </span>
                  <span className="text-[10px] sm:text-xs text-charcoal-500 font-medium uppercase tracking-wider">
                    Treats Delivered
                  </span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-charcoal-900 font-display block">
                    450+
                  </span>
                  <span className="text-[10px] sm:text-xs text-charcoal-500 font-medium uppercase tracking-wider">
                    Luxury Events
                  </span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-700 font-display block">
                    4.9 ★
                  </span>
                  <span className="text-[10px] sm:text-xs text-charcoal-500 font-medium uppercase tracking-wider">
                    Customer Rating
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Organic Visual Collage */}
            <div className="md:col-span-5 mt-4 md:mt-0">
              <BakeryHeroCollage />
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. BRAND STORY & PHILOSOPHY (Split Editorial Statement)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-cream-base">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Editorial Visual (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-brand-lg border-4 border-white aspect-[4/5] bg-cream-surface group">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&auto=format&fit=crop&q=80"
                  alt="Pastry Chef Finishing Cake with Gold Leaf"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent opacity-60" />

                {/* Floating Craft Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-brand-md border border-cream-border">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-brand-700 block">
                    The Kitchen Standard
                  </span>
                  <p className="text-xs font-semibold text-charcoal-900 mt-0.5">
                    Baked fresh daily with 100% French butter &amp; Bourbon vanilla.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Editorial Story Copy (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-700 bg-brand-100/70 px-3 py-1 rounded-full">
                The Artisanal Philosophy
              </span>

              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 leading-tight">
                We believe life’s grandest celebrations deserve extraordinary baking.
              </h2>

              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
                Tory’s Treats began with a simple, uncompromising promise: no artificial shortcuts, no compromise on ingredients, and every single bake finished with bespoke artistry.
              </p>

              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
                From morning French viennoiserie to 4-tier wedding centerpieces in Victoria Island and Ikoyi, our kitchen balances classical patisserie technique with vibrant, contemporary flavors.
              </p>

              {/* Chef Quote Block */}
              <div className="p-4 sm:p-5 rounded-2xl bg-cream-surface border-l-4 border-brand-700 space-y-2">
                <p className="font-serif italic text-sm sm:text-base text-charcoal-800 leading-relaxed">
                  “A cake shouldn’t just look like a museum centerpiece; the very first bite should stop the room and spark genuine delight.”
                </p>
                <span className="text-xs font-bold text-brand-700 block tracking-wide uppercase">
                  — Tory, Founder &amp; Executive Pastry Chef
                </span>
              </div>

              <div className="pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 font-bold text-sm text-brand-700 hover:text-brand-800 group"
                >
                  <span>Explore our signature bakes</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. FEATURED SPOTLIGHT (Asymmetric Hero Treat + Seasonal Stack)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-cream-surface border-y border-cream-border">
        <PageContainer>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-brand-700">
                Chef's Daily Spotlight
              </p>
              <h2 className="mt-1 font-display text-2xl sm:text-4xl font-extrabold text-charcoal-900">
                Signature Oven-Fresh Bakes
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-charcoal-600 max-w-xl">
                Small-batch daily releases prepared with European creamery butter and peak seasonal fruits.
              </p>
            </div>
            <Link to="/shop" className="shrink-0">
              <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                View Full Catalog
              </Button>
            </Link>
          </div>

          <FeaturedSpotlight
            heroProduct={HERO_TREAT}
            companionProducts={COMPANION_TREATS}
            onAddToCart={handleAddToCart}
            items={items}
          />
        </PageContainer>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. CURATED COLLECTIONS (Interactive Category Experience)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-cream-base">
        <PageContainer>
          <SectionHeading
            tag="Curated Collections"
            title="Explore by Sweet Category"
            subtitle="From individual breakfast viennoiserie to showstopping event centerpieces, explore our specialty baking lines."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {CATEGORIES.map((cat, idx) => (
              <CategoryCard key={idx} category={cat} />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. THE TORY'S PROMISE (Minimalist Trust & Standards)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-cream-surface/70 border-y border-cream-border/70">
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              The Tory’s Standard
            </span>
            <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-extrabold text-charcoal-900">
              Why Lagos Trusts Our Kitchen
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-charcoal-600">
              We pour uncompromising craft, pure ingredients, and genuine passion into every bake.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="rounded-2xl border border-cream-border bg-white p-6 sm:p-7 text-left flex flex-col justify-between shadow-xs hover:border-brand-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-charcoal-900 text-lg mb-1.5">
                  100% Pure European Ingredients
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  Zero artificial preservatives or shortening. We bake with pure French butter, Madagascar Bourbon vanilla, and luxury Belgian chocolates.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-cream-border bg-white p-6 sm:p-7 text-left flex flex-col justify-between shadow-xs hover:border-brand-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-charcoal-900 text-lg mb-1.5">
                  Guarded Chilled Delivery
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  Every delicate cake and pastry is transported in temperature-controlled packaging, arriving in pristine condition anywhere in Lagos.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-cream-border bg-white p-6 sm:p-7 text-left flex flex-col justify-between shadow-xs hover:border-brand-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-charcoal-900 text-lg mb-1.5">
                  Bespoke Event Styling &amp; Tastings
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  Direct chef consultations, custom flavor formulating, tasting sessions, and dedicated coordinators for high-profile celebrations.
                </p>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. BESPOKE CATERING (High-Contrast Dramatic Experience)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-charcoal-900 via-[#3B1F1C] to-charcoal-900 text-white">
        <PageContainer>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-14 gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="px-3 py-1 rounded-full bg-brand-700 text-white text-[11px] font-bold uppercase tracking-wider inline-block">
                Luxury Event Services
              </span>
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Elevate your weddings &amp; galas with a bespoke dessert suite.
              </h2>
              <p className="text-xs sm:text-base text-stone-300 leading-relaxed">
                From showstopping tiered centerpieces to curated dessert cup bars and live treat stations tailored to your celebration theme.
              </p>
            </div>

            <Link to="/catering" className="shrink-0">
              <Button
                variant="primary"
                size="lg"
                icon={Calendar}
                className="bg-brand-600 hover:bg-brand-500 font-semibold text-sm sm:text-base min-h-[48px]"
              >
                Request Catering Consultation
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CATERING_PACKAGES.map((pkg) => (
              <ServiceCard key={pkg.id} service={pkg} />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. CLIENT PRAISE & CELEBRATION STORIES (Editorial Social Proof)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-cream-base">
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              Client Praises &amp; Stories
            </span>
            <h2 className="mt-1.5 font-display text-2xl sm:text-4xl font-extrabold text-charcoal-900">
              Loved by Lagos’ Grandest Celebrations
            </h2>
            <p className="mt-2 text-xs sm:text-base text-charcoal-600">
              From intimate Ikoyi dinner parties to high-profile wedding receptions and corporate galas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="rounded-3xl border border-cream-border bg-white p-6 sm:p-8 flex flex-col justify-between shadow-brand-sm hover:shadow-brand-md transition-all">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-charcoal-800 leading-relaxed">
                  “The 4-tier strawberry cloud centerpiece stopped the room at our Civic Centre wedding. Guests are still asking who baked our cake months later!”
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-cream-border/60 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-display font-bold text-charcoal-900">Amina &amp; Tunde B.</h4>
                  <span className="text-[11px] text-charcoal-500">Wedding Reception • Ikoyi</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-100">
                  Verified Order
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-cream-border bg-white p-6 sm:p-8 flex flex-col justify-between shadow-brand-sm hover:shadow-brand-md transition-all">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-charcoal-800 leading-relaxed">
                  “Tory’s Treats handles our executive boardroom pastry platters and VIP product activations in VI. Impeccable packaging and unmatched French butter quality.”
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-cream-border/60 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-display font-bold text-charcoal-900">Ngozi O.</h4>
                  <span className="text-[11px] text-charcoal-500">Brand Director • Victoria Island</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-100">
                  Corporate Client
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-cream-border bg-white p-6 sm:p-8 flex flex-col justify-between shadow-brand-sm hover:shadow-brand-md transition-all">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-charcoal-800 leading-relaxed">
                  “The gold-leaf red velvet cupcakes and pistachio croissants ordered for my birthday arrived in pristine chilled condition. Truly Lagos’ finest patisserie.”
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-cream-border/60 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-display font-bold text-charcoal-900">Kolawole A.</h4>
                  <span className="text-[11px] text-charcoal-500">Milestone Birthday • Banana Island</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-100">
                  Verified Order
                </span>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. FINAL CONVERSION CTA (Warm, Focused Invitation)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-brand-50/90 border-y border-brand-200/80">
        <PageContainer size="sm">
          <div className="text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              Planning Something Unforgettable?
            </span>

            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-charcoal-900 leading-tight">
              Let’s make your next celebration delicious and extraordinary.
            </h2>

            <p className="text-xs sm:text-base text-charcoal-700 leading-relaxed max-w-lg mx-auto">
              Order freshly baked treats for scheduled Lagos delivery, or connect with our pastry team for bespoke wedding and milestone event catering.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
              <Link to="/shop" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  icon={ShoppingBag}
                  className="w-full sm:w-auto justify-center text-sm sm:text-base font-semibold min-h-[48px]"
                >
                  Order Fresh Bakes Now
                </Button>
              </Link>
              <Link to="/catering" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  icon={Calendar}
                  className="w-full sm:w-auto justify-center text-sm sm:text-base font-semibold min-h-[48px] bg-white"
                >
                  Book Event Catering
                </Button>
              </Link>
            </div>

            <div className="pt-3 text-xs text-charcoal-500">
              <span>Have a quick question? </span>
              <a
                href={`tel:${BRAND.phone.replace(/[^0-9+]/g, '')}`}
                className="font-bold text-brand-700 hover:underline"
              >
                Call our Victoria Island boutique directly ({BRAND.phone})
              </a>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
