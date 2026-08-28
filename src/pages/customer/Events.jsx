import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  CheckCircle2,
  Search,
  Award,
  Wine,
  Gift,
  HeartHandshake,
  Coffee,
  Quote,
  MessageCircle,
} from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import EventCard from '../../components/ui/EventCard';
import { formatCurrency, createWhatsAppUrl } from '../../lib/formatters';
import { BRAND } from '../../lib/constants';
import { useCachedData } from '../../hooks/useCachedData';
import { CACHE_TTL } from '../../lib/cache';
import { SkeletonEventCard } from '../../components/ui/Skeleton';
import Tooltip from '../../components/ui/Tooltip';

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const CATEGORIES = [
    'All',
    'Masterclasses & Workshops',
    'Tastings & Pairings',
    'Pop-Ups & Socials',
    'Private Celebrations',
  ];

  // Category Filter Pill Style Mapper
  const getFilterStyle = (cat, isActive) => {
    if (!isActive) {
      return 'bg-white border-cream-border text-charcoal-700 hover:bg-cream-surface hover:border-brand-200';
    }
    switch (cat) {
      case 'Masterclasses & Workshops':
        return 'bg-brand-700 text-white shadow-brand-sm border-brand-700';
      case 'Tastings & Pairings':
        return 'bg-amber-700 text-white shadow-sm border-amber-700';
      case 'Pop-Ups & Socials':
        return 'bg-emerald-700 text-white shadow-sm border-emerald-700';
      case 'Private Celebrations':
        return 'bg-rose-700 text-white shadow-sm border-rose-700';
      default:
        return 'bg-brand-700 text-white shadow-brand-sm border-brand-700';
    }
  };

  // Featured Main Event Spotlight
  const FEATURED_EVENT = {
    id: 'macaron-masterclass-sep-14',
    slug: 'macaron-masterclass-sep-14',
    title: 'Artisanal French Macaron & Choux Masterclass',
    category: 'Masterclasses & Workshops',
    date: '2026-09-14',
    displayDate: 'Sept 14',
    dayOfWeek: 'Saturday',
    time: '2:00 PM - 6:00 PM',
    location: "The Tory's Kitchen Atelier, Victoria Island, Lagos",
    price: 35000,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=900&auto=format&fit=crop&q=80',
    status: 'ALMOST_FULL',
    spotsLeft: 3,
    capacityNote: '12 Seats Total (Intimate Group)',
    description:
      'Immerse yourself in classical French patisserie technique. Master delicate almond macaron shells with Italian meringue, velvety chocolate ganache fillings, and crisp choux au craquelin under hands-on chef guidance.',
    inclusions: [
      'Hands-on preparation of 24 macarons and 8 choux au craquelin',
      'Complimentary sommelier-selected Prosecco & cold-brew coffee bar',
      'Custom laminated recipe folio & flavor pairing guide',
      'Luxury branded presentation box with your bakes to take home',
    ],
  };

  // Upcoming Events List
  const UPCOMING_EVENTS = [
    {
      id: 'champagne-dessert-pairing-sep-26',
      slug: 'champagne-dessert-pairing-sep-26',
      title: 'Champagne & High-End Dessert Pairing Soirée',
      category: 'Tastings & Pairings',
      date: '2026-09-26',
      displayDate: 'Sept 26',
      dayOfWeek: 'Friday',
      time: '6:30 PM - 9:30 PM',
      location: 'The Penthouse Terrace, Ikoyi, Lagos',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=80',
      status: 'AVAILABLE',
      spotsLeft: 8,
      description:
        'A 5-course plated dessert tasting menu paired with vintage champagnes and artisanal dessert wines curated by our head chef and guest sommelier.',
    },
    {
      id: 'secret-weekend-popup-oct-03',
      slug: 'secret-weekend-popup-oct-03',
      title: 'Secret Weekend Dessert Drop & Pop-Up Bakery',
      category: 'Pop-Ups & Socials',
      date: '2026-10-03',
      displayDate: 'Oct 03',
      dayOfWeek: 'Saturday',
      time: '10:00 AM - 3:00 PM',
      location: "Tory's Treats Flagship Lounge, VI, Lagos",
      price: 0,
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&auto=format&fit=crop&q=80',
      status: 'AVAILABLE',
      spotsLeft: 50,
      description:
        'Exclusive limited-run weekend flavors, fresh morning croissants, live mini éclair glazing station, and complimentary strawberry iced teas.',
    },
    {
      id: 'tiered-wedding-cake-seminar-oct-17',
      slug: 'tiered-wedding-cake-seminar-oct-17',
      title: 'Luxury Tiered Wedding Cake Design Seminar',
      category: 'Masterclasses & Workshops',
      date: '2026-10-17',
      displayDate: 'Oct 17',
      dayOfWeek: 'Saturday',
      time: '11:00 AM - 4:00 PM',
      location: "The Tory's Studio, Lekki Phase 1, Lagos",
      price: 50000,
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&auto=format&fit=crop&q=80',
      status: 'AVAILABLE',
      spotsLeft: 6,
      description:
        'Learn internal cake structuring, flawless sharp-edge ganaching, sugar flower placement, and 24k gold leaf application for luxury wedding celebrations.',
    },
    {
      id: 'velvet-cupcake-gold-nov-07',
      slug: 'velvet-cupcake-gold-nov-07',
      title: 'Velvet Cupcake & Gold Leaf Decorating Workshop',
      category: 'Masterclasses & Workshops',
      date: '2026-11-07',
      displayDate: 'Nov 07',
      dayOfWeek: 'Saturday',
      time: '1:00 PM - 4:30 PM',
      location: "Tory's Treats Boutique, Victoria Island, Lagos",
      price: 28000,
      image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&auto=format&fit=crop&q=80',
      status: 'SOLD_OUT',
      spotsLeft: 0,
      description:
        'An interactive afternoon of whipping Swiss buttercream, Russian piping tips, and edible metallic accents. Perfect for beginners and baking enthusiasts.',
    },
  ];

  // Past Events (Memory Wall / Social Proof Archive)
  const PAST_EVENTS = [
    {
      title: 'Summer Sunset Macaron Tasting Gala',
      date: 'July 2026',
      location: 'Ikoyi Rooftop Lounge',
      attendees: '40 Guests',
      quote: '“The passionfruit and dark chocolate pairings were simply out of this world.”',
      author: 'Kemi O.',
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80',
      tag: 'Tasting Soirée',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-200',
    },
    {
      title: 'Private Bridal Cake Tasting Showcase',
      date: 'June 2026',
      location: 'VI Tasting Suite',
      attendees: '25 Brides & Planners',
      quote: '“The attention to detail and flavor combinations made planning our wedding cake unforgettable.”',
      author: 'Ngozi & Tunde',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&auto=format&fit=crop&q=80',
      tag: 'Bridal Showcase',
      tagColor: 'bg-rose-100 text-rose-900 border-rose-200',
    },
    {
      title: '72-Hour Croissant Lamination Masterclass',
      date: 'May 2026',
      location: 'Tory’s Kitchen Atelier',
      attendees: '12 Students (Sold Out)',
      quote: '“The best baking workshop in Lagos. I finally mastered true honeycomb layers!”',
      author: 'David A.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
      tag: 'Chef Workshop',
      tagColor: 'bg-brand-100 text-brand-900 border-brand-200',
    },
  ];

  // Cached upcoming events query with stale-while-revalidate
  const { data: cachedEvents, isLoading } = useCachedData(
    'events:upcoming',
    () => UPCOMING_EVENTS,
    { ttl: CACHE_TTL.LONG }
  );

  const eventsList = cachedEvents || UPCOMING_EVENTS;

  // Filtered upcoming events
  const filteredEvents = eventsList.filter((ev) => {
    const matchesCat =
      selectedCategory === 'All' ||
      ev.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const whatsappInquiryUrl = createWhatsAppUrl(
    BRAND.whatsappNumber,
    "Hello Tory's Treats! I'd like to inquire about hosting a private group masterclass or event tasting."
  );

  return (
    <div className="overflow-x-hidden">
      {/* ─────────────────────────────────────────────────────────────
          1. EVENTS HERO (Grand Celebratory Atmosphere)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-100/80 via-cream-surface to-cream-base pt-8 pb-16 sm:pt-14 sm:pb-24 md:pt-18 md:pb-28 border-b border-cream-border/70">
        {/* Ambient Warm Color Mesh Highlights */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-200/40 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />

        <PageContainer>
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6 relative z-10">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-brand-200 px-4 py-1.5 text-xs font-bold text-brand-800 tracking-wide shadow-xs">
              <Sparkles className="w-4 h-4 text-gold-500 shrink-0" />
              <span>Tory’s Treats Culinary Experiences</span>
            </div>

            {/* Script Accent Subtitle */}
            <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-brand-700">
              Curated Masterclasses, Sommelier Tastings &amp; Secret Pop-Ups
            </p>

            {/* Grand Display Title */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal-900 leading-[1.12] tracking-tight">
              MOMENTS WORTH{' '}
              <span className="text-brand-700 relative inline-block">
                CELEBRATING
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-3 text-gold-400/70 -z-10"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path d="M0 15 Q50 0 100 15" stroke="currentColor" strokeWidth="5" fill="none" />
                </svg>
              </span>
            </h1>

            {/* Subtitle Copy */}
            <p className="text-sm sm:text-base md:text-lg text-charcoal-700 leading-relaxed max-w-2xl mx-auto font-normal">
              Step inside our Victoria Island baking atelier. Experience hands-on pastry masterclasses, private weekend dessert tastings, and intimate culinary gatherings crafted for lovers of exceptional patisserie.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
              <a
                href="#upcoming-events"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-brand-700 hover:bg-brand-800 active:bg-brand-900 px-7 py-3.5 text-sm font-bold text-white shadow-brand-sm hover:shadow-brand-md transition-all active:scale-98 text-center"
              >
                <Calendar className="w-4 h-4" />
                <span>Explore Upcoming Events ↓</span>
              </a>
              <Link
                to="/catering"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-cream-border hover:border-brand-400 bg-white hover:bg-cream-surface px-7 py-3.5 text-sm font-bold text-charcoal-900 hover:text-brand-700 transition-all active:scale-98 text-center shadow-xs"
              >
                <HeartHandshake className="w-4 h-4 text-brand-700" />
                <span>Host Private Group Session</span>
              </Link>
            </div>

            {/* Quick Live Schedule Pill */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs text-charcoal-600 pt-2 font-medium">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100/90 text-amber-900 font-bold text-[11px]">
                ★ 4 Sessions Open
              </span>
              <span>•</span>
              <span>Intimate groups (10–16 seats max)</span>
              <span>•</span>
              <span>All premium ingredients &amp; gift box included</span>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. FEATURED EVENT SPOTLIGHT (The Visual Anchor)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-cream-base">
        <PageContainer>
          <div className="mb-6 sm:mb-8 flex items-baseline justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-700">
                Chef’s Spotlight Experience
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal-900 mt-1">
                Featured Upcoming Masterclass
              </h2>
            </div>
            <span className="hidden sm:inline-block text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Limited Seats Available
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 rounded-3xl border-2 border-brand-200/80 bg-gradient-to-br from-white via-brand-50/25 to-cream-surface p-5 sm:p-8 lg:p-10 shadow-brand-md items-center">
            {/* Left Image (6 cols) */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-cream-surface group shadow-sm">
                <img
                  src={FEATURED_EVENT.image}
                  alt={FEATURED_EVENT.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/10 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2 z-10">
                  <span className="px-3 py-1 rounded-full bg-gold-500 text-charcoal-900 text-xs font-extrabold shadow-sm">
                    ★ Next Session
                  </span>
                  <span className="px-3 py-1 rounded-full bg-brand-700 text-white text-xs font-bold uppercase tracking-wider shadow-xs">
                    {FEATURED_EVENT.category}
                  </span>
                </div>

                {/* Date & Spots Pill (Bottom) */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white z-10">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gold-400" />
                    <span className="text-xs font-bold">{FEATURED_EVENT.displayDate} ({FEATURED_EVENT.dayOfWeek})</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[11px] font-extrabold animate-pulse shadow-sm">
                    Only {FEATURED_EVENT.spotsLeft} Spots Remaining
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content (6 cols) */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs text-charcoal-600 mb-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                  <span>{FEATURED_EVENT.location}</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal-900 leading-snug">
                  {FEATURED_EVENT.title}
                </h3>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-charcoal-600 mt-2 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-700" />
                    <span>{FEATURED_EVENT.time}</span>
                  </span>
                  <span>•</span>
                  <span>{FEATURED_EVENT.capacityNote}</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
                {FEATURED_EVENT.description}
              </p>

              {/* Inclusions Checklist with Soft Brand Icons */}
              <div className="space-y-2 pt-2 border-t border-cream-border text-xs sm:text-sm text-charcoal-800 font-medium">
                {FEATURED_EVENT.inclusions.map((inc, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>

              {/* Price & Booking Button */}
              <div className="pt-4 border-t border-cream-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-charcoal-500 uppercase tracking-wider font-semibold block">
                    Session Experience Fee
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-black text-brand-700">
                    {formatCurrency(FEATURED_EVENT.price)}{' '}
                    <span className="text-xs font-normal text-charcoal-500">/ seat</span>
                  </span>
                </div>

                <Link to={`/events/${FEATURED_EVENT.slug}`}>
                  <Button
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                    iconPosition="right"
                    className="w-full sm:w-auto justify-center text-sm font-bold min-h-[48px] bg-brand-700 hover:bg-brand-800 shadow-brand-sm hover:shadow-brand-md"
                  >
                    Reserve Your Seat
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. UPCOMING EVENTS CATALOG & HARMONIC FILTERING
      ───────────────────────────────────────────────────────────── */}
      <section id="upcoming-events" className="py-14 sm:py-20 bg-cream-surface/90 border-y border-cream-border">
        <PageContainer>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest font-extrabold text-brand-700">
                Seasonal Schedule &amp; Calendar
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal-900 mt-1">
                Upcoming Experiences in Lagos
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                Tickets are strictly capped per session to guarantee personalized chef guidance.
              </p>
            </div>

            {/* Quick Search */}
            <div className="w-full md:w-72 shrink-0">
              <Input
                placeholder="Search events, venue, or style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leadingIcon={Search}
                inputClassName="bg-white"
              />
            </div>
          </div>

          {/* Category Filter Tabs with Distinct Accent States */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 custom-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 border focus-ring ${getFilterStyle(
                    cat,
                    isActive
                  )}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Events Grid or Skeletons or Empty State */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true">
              <SkeletonEventCard />
              <SkeletonEventCard />
              <SkeletonEventCard />
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((ev) => (
                <EventCard key={ev.id} event={ev} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-cream-border p-8 max-w-lg mx-auto shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-lg text-charcoal-900">
                No upcoming events found for "{searchQuery || selectedCategory}"
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1.5 mb-5 leading-relaxed">
                We release new weekend tastings and masterclasses every month. Check back shortly or reset your filters.
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Reset Event Filters
              </Button>
            </div>
          )}
        </PageContainer>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. WHAT TO EXPECT (Visual Step Sequence)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-cream-base">
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-700">
              The Tory’s Standard
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-charcoal-900 mt-1.5">
              What to Expect at Our Sessions
            </h2>
            <p className="text-xs sm:text-base text-charcoal-600 mt-2">
              Every detail is artfully curated to provide an immersive, luxurious, and memorable culinary gathering.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 01 */}
            <div className="rounded-2xl border border-brand-200/90 bg-gradient-to-b from-brand-50/40 to-white p-6 flex flex-col justify-between shadow-xs hover:shadow-brand-sm transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-black text-2xl text-brand-700">01</span>
                  <div className="w-9 h-9 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-charcoal-900 text-lg mb-1.5">
                  Hands-On Instruction
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  Direct guidance from experienced pastry chefs. Learn French lamination, macaron piping, and mirror glazing.
                </p>
              </div>
            </div>

            {/* Step 02 */}
            <div className="rounded-2xl border border-amber-200/90 bg-gradient-to-b from-amber-50/40 to-white p-6 flex flex-col justify-between shadow-xs hover:shadow-brand-sm transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-black text-2xl text-amber-700">02</span>
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-charcoal-900 text-lg mb-1.5">
                  Pure Ingredients
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  Bake exclusively with European creamery butter, single-origin Belgian chocolate, and real organic berry reductions.
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div className="rounded-2xl border border-emerald-200/90 bg-gradient-to-b from-emerald-50/40 to-white p-6 flex flex-col justify-between shadow-xs hover:shadow-brand-sm transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-black text-2xl text-emerald-700">03</span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Wine className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-charcoal-900 text-lg mb-1.5">
                  Curated Pairings
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  Enjoy sommelier-selected sparkling wines, artisanal single-origin coffees, and floral infused teas during your session.
                </p>
              </div>
            </div>

            {/* Step 04 */}
            <div className="rounded-2xl border border-rose-200/90 bg-gradient-to-b from-rose-50/40 to-white p-6 flex flex-col justify-between shadow-xs hover:shadow-brand-sm transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-black text-2xl text-rose-700">04</span>
                  <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center">
                    <Gift className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-charcoal-900 text-lg mb-1.5">
                  Gourmet Takeaway Box
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  Take home everything you create in luxury branded presentation boxes, along with custom printed recipe portfolios.
                </p>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. ATMOSPHERE & MOMENTS (Visual Photo Gallery)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-cream-surface border-y border-cream-border">
        <PageContainer>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <p className="text-xs uppercase tracking-widest font-extrabold text-brand-700">
                Atelier Gallery
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal-900 mt-1">
                Atmosphere &amp; Moments
              </h2>
            </div>
            <span className="text-xs font-semibold text-charcoal-500">
              Captured live at Tory’s Treats Atelier, Lagos
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-2xl overflow-hidden aspect-square group shadow-sm bg-cream-base relative">
              <img
                src="https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&auto=format&fit=crop&q=80"
                alt="Cupcake Gold Leaf Decorating"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-white text-xs font-bold">
                Gold Leaf Decorating
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-square group shadow-sm bg-cream-base relative">
              <img
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&auto=format&fit=crop&q=80"
                alt="Champagne Tasting Evening"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-white text-xs font-bold">
                Champagne Tasting
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-square group shadow-sm bg-cream-base relative">
              <img
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80"
                alt="Pastry Lamination Workshop"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-white text-xs font-bold">
                Macaron Piping
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-square group shadow-sm bg-cream-base relative">
              <img
                src="https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80"
                alt="Dessert Box Assembly"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-white text-xs font-bold">
                Presentation Hampers
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. PAST EVENTS — MEMORY WALL (Social Proof Archive)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-cream-base">
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-700">
              Memories &amp; Testimonials
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal-900 mt-1">
              Moments We’ve Shared
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-1.5">
              Take a look back at our sold-out masterclasses and private tasting evenings across Lagos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PAST_EVENTS.map((pe, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-cream-border bg-white overflow-hidden shadow-xs hover:shadow-brand-md transition-all flex flex-col justify-between group"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-cream-surface relative">
                  <img
                    src={pe.image}
                    alt={pe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-xs ${pe.tagColor}`}>
                      {pe.tag}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-charcoal-500 mb-1 font-semibold">
                      <span className="text-brand-700">{pe.date}</span>
                      <span>{pe.attendees}</span>
                    </div>

                    <h3 className="font-display font-bold text-charcoal-900 text-base mb-2">
                      {pe.title}
                    </h3>

                    {/* Pull-quote */}
                    <div className="p-3 rounded-xl bg-cream-surface/70 border border-cream-border/60 text-xs italic text-charcoal-700 leading-relaxed relative">
                      <Quote className="w-3.5 h-3.5 text-brand-300 inline mr-1 -mt-1" />
                      <span>{pe.quote}</span>
                      <span className="block font-bold text-charcoal-900 not-italic text-[10px] mt-1 text-right">
                        — {pe.author}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. PRIVATE GROUP & CORPORATE INQUIRY (Rich Cocoa & Berry Band)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-22 bg-gradient-to-br from-charcoal-900 via-[#3B1F1C] to-charcoal-900 text-white relative overflow-hidden">
        {/* Subtle Ambient Radial Highlight */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-brand-700/20 blur-3xl pointer-events-none" />

        <PageContainer size="md">
          <div className="text-center space-y-4 sm:space-y-6 relative z-10">
            <span className="px-4 py-1.5 rounded-full bg-brand-700/90 border border-brand-500/50 text-white text-xs font-extrabold uppercase tracking-widest inline-block shadow-sm">
              Private Group Experiences &amp; Corporate Retreats
            </span>

            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Have something special to celebrate?
            </h2>

            <p className="text-xs sm:text-base text-stone-300 leading-relaxed max-w-xl mx-auto font-normal">
              We host bespoke corporate team masterclasses, bridal dessert tastings, and milestone celebration sessions tailored to your preferred date, guests, and custom pastry menu.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
              <Link to="/catering">
                <Button
                  variant="primary"
                  size="lg"
                  icon={Calendar}
                  className="w-full sm:w-auto bg-brand-600 hover:bg-brand-500 font-bold text-sm sm:text-base min-h-[48px] shadow-brand-md"
                >
                  Inquire for Private Group Booking
                </Button>
              </Link>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  icon={MessageCircle}
                  className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 font-bold text-sm sm:text-base min-h-[48px]"
                >
                  WhatsApp Event Concierge
                </Button>
              </a>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
