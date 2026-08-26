import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  Cake,
  Briefcase,
  Users,
  Sparkles,
  Wine,
  Calendar,
  MapPin,
  Mail,
  Phone,
  User,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Clock,
  ShieldCheck,
  Award,
  Truck,
  Send,
  Star,
} from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Card from '../../components/ui/Card';
import { useToast } from '../../hooks/useToast';
import { BRAND } from '../../lib/constants';
import { createWhatsAppUrl } from '../../lib/formatters';

export default function Catering() {
  const toast = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventType: 'Wedding Reception',
    eventDate: '',
    guestCount: '100',
    venueLocation: 'Ikoyi, Lagos',
    foodRequirements: '',
    specialRequests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Event Type Options with individual muted background colors and distinct branding
  const EVENT_TYPES = [
    {
      id: 'wedding',
      name: 'Wedding',
      value: 'Wedding Reception',
      tagline: 'Make your special day extra sweet.',
      icon: Heart,
      colorBg: 'bg-[#FFF0F3]',
      colorBgHover: 'hover:bg-[#FFE6EC]',
      colorBorder: 'border-[#FCD2DC]',
      colorText: 'text-[#7B1E30]',
      colorIconBg: 'bg-[#FFE2E9] text-[#7B1E30]',
      badge: 'Most Popular',
    },
    {
      id: 'birthday',
      name: 'Birthday',
      value: 'Milestone Birthday Party',
      tagline: 'Celebrate another year with iconic bakes.',
      icon: Cake,
      colorBg: 'bg-[#FFF5ED]',
      colorBgHover: 'hover:bg-[#FFEBDC]',
      colorBorder: 'border-[#FCDAC2]',
      colorText: 'text-[#8C4A1E]',
      colorIconBg: 'bg-[#FFE8D6] text-[#8C4A1E]',
    },
    {
      id: 'corporate',
      name: 'Corporate',
      value: 'Corporate Gala / Product Launch',
      tagline: 'Elevate galas, brand launches & meetings.',
      icon: Briefcase,
      colorBg: 'bg-[#FAF6EE]',
      colorBgHover: 'hover:bg-[#F5EDE0]',
      colorBorder: 'border-[#E8DDD0]',
      colorText: 'text-[#6B3A32]',
      colorIconBg: 'bg-[#EFE5D5] text-[#6B3A32]',
    },
    {
      id: 'anniversary',
      name: 'Anniversary',
      value: 'Anniversary Celebration',
      tagline: 'Toast to milestones in timeless style.',
      icon: Wine,
      colorBg: 'bg-[#F0F7F2]',
      colorBgHover: 'hover:bg-[#E4F2E8]',
      colorBorder: 'border-[#D1E8D9]',
      colorText: 'text-[#284634]',
      colorIconBg: 'bg-[#DCEEE2] text-[#284634]',
    },
    {
      id: 'private-party',
      name: 'Private Party',
      value: 'Private Dinner / Tasting',
      tagline: 'Intimate dinners, bridal showers & soirées.',
      icon: Users,
      colorBg: 'bg-[#F6F2FC]',
      colorBgHover: 'hover:bg-[#EEE7F7]',
      colorBorder: 'border-[#E1D4F2]',
      colorText: 'text-[#553C7B]',
      colorIconBg: 'bg-[#EADBFA] text-[#553C7B]',
    },
    {
      id: 'other',
      name: 'Other',
      value: 'Other Bespoke Experience',
      tagline: 'Bespoke culinary concepts & custom menus.',
      icon: Sparkles,
      colorBg: 'bg-[#F0F6FA]',
      colorBgHover: 'hover:bg-[#E3EFF7]',
      colorBorder: 'border-[#D0E4F2]',
      colorText: 'text-[#335870]',
      colorIconBg: 'bg-[#D9EAF5] text-[#335870]',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const mockBookingNumber = 'TT-BK-202608-2041';
      toast.success(
        'Your event catering inquiry has been received. Our team will formulate your tailored proposal.',
        'Inquiry Submitted'
      );
      navigate(`/catering/confirmation/${mockBookingNumber}`);
    }, 1200);
  };

  const whatsappInquiryUrl = createWhatsAppUrl(
    BRAND.whatsappNumber,
    `Hello Tory's Treats! I would like to inquire about event catering & dessert styling for a ${formData.eventType || 'celebration'}.`
  );

  // Compute form completion stages for dynamic progress feedback
  const isSection1Complete = Boolean(formData.eventType);
  const isSection2Complete = Boolean(
    formData.eventDate && formData.guestCount && formData.venueLocation && formData.foodRequirements
  );
  const isSection3Complete = Boolean(formData.fullName && formData.phone && formData.email);

  return (
    <div className="min-h-screen bg-cream-base overflow-x-hidden">
      {/* ─────────────────────────────────────────────────────────────
          1. EDITORIAL HERO SECTION (Warm, Celebratory & Editorial)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/80 via-cream-surface/90 to-cream-base pt-8 pb-12 sm:pt-14 sm:pb-20 md:pt-16 md:pb-24 border-b border-cream-border/70">
        {/* Soft Ambient Radial Background Lights */}
        <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-brand-200/35 blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-amber-200/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-80 h-80 rounded-full bg-rose-200/20 blur-3xl pointer-events-none" />

        {/* Delicate Decorative SVG Flourishes */}
        <svg
          className="absolute top-8 right-12 w-28 h-28 text-brand-300/30 pointer-events-none hidden lg:block"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M50 20 L50 80 M20 50 L80 50" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        </svg>

        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Hero Content (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
              {/* Small Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-brand-200/90 px-3.5 py-1.5 text-xs font-bold text-brand-800 tracking-wider uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                <span>Plan Your Event</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal-900 leading-[1.12] tracking-tight">
                Let's make your event{' '}
                <span className="relative inline-block text-brand-700 font-serif italic font-normal">
                  something to remember.
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full h-3 text-gold-400/80 -z-10"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                  >
                    <path d="M0 15 Q50 0 100 15" stroke="currentColor" strokeWidth="4.5" fill="none" />
                  </svg>
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-charcoal-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                From showstopper multi-tiered wedding cakes and lavish dessert tables to corporate gala platters and intimate private tasting experiences across Lagos. Every celebration deserves artisanal excellence.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <a
                  href="#booking-progress"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-brand-700 hover:bg-brand-800 active:bg-brand-900 px-7 py-3.5 text-sm font-bold text-white shadow-brand-sm hover:shadow-brand-md transition-all active:scale-98 text-center"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Start Planning ↓</span>
                </a>

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-cream-border hover:border-brand-400 bg-white hover:bg-cream-surface px-6 py-3.5 text-sm font-bold text-charcoal-900 hover:text-brand-700 transition-all active:scale-98 text-center shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Consultation</span>
                </a>
              </div>

              {/* Social Proof & Guarantee Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs text-charcoal-600 pt-3 font-medium">
                <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-cream-border shadow-xs">
                  <Star className="w-3.5 h-3.5 text-gold-500 fill-current" />
                  <span className="font-bold text-charcoal-900">250+</span> Events Catered in Lagos
                </div>
                <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-cream-border shadow-xs">
                  <Award className="w-3.5 h-3.5 text-brand-700" />
                  <span>European Butter &amp; Belgian Chocolate</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card (5 cols on lg) */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-brand-lg border-2 border-white/80 bg-cream-surface group">
                <img
                  src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=1000&auto=format&fit=crop&q=80"
                  alt="Tory's Treats Bespoke Wedding Cake and Event Dessert Table"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                {/* Subtle Warm Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/15 to-transparent" />

                {/* Top Floating Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-charcoal-900 text-xs font-bold shadow-brand-sm border border-cream-border">
                    <Sparkles className="w-3.5 h-3.5 text-brand-700" />
                    <span>Bespoke Event Styling</span>
                  </span>
                </div>

                {/* Bottom Testimonial / Lead Quote Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-10 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-white/60 shadow-md">
                  <p className="text-xs sm:text-sm text-charcoal-800 italic font-serif leading-snug">
                    “Tory’s Treats created a dessert table that was truly the centerpiece of our celebration.”
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-cream-border/60 text-[11px] text-charcoal-600 font-semibold">
                    <span className="text-brand-700 font-bold">Kemi &amp; Femi O.</span>
                    <span>Wedding Reception, Victoria Island</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. BOOKING PROGRESS BAR (Visual Multi-Section Indicators)
      ───────────────────────────────────────────────────────────── */}
      <section id="booking-progress" className="bg-cream-surface/90 border-b border-cream-border py-6 sm:py-8 sticky top-14 sm:top-20 z-20 backdrop-blur-md">
        <PageContainer>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {/* Step 1 */}
              <div
                className={`flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl transition-all border ${
                  isSection1Complete
                    ? 'bg-white border-brand-300 shadow-xs'
                    : 'bg-cream-base/60 border-cream-border'
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                    isSection1Complete
                      ? 'bg-brand-700 text-white shadow-xs'
                      : 'bg-cream-surface text-charcoal-500 border border-cream-border'
                  }`}
                >
                  {isSection1Complete ? <CheckCircle2 className="w-4 h-4" /> : '01'}
                </div>
                <div className="truncate">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-700 block">
                    Step 01
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-charcoal-900 truncate block">
                    Your Event
                  </span>
                </div>
              </div>

              {/* Step 2 */}
              <div
                className={`flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl transition-all border ${
                  isSection2Complete
                    ? 'bg-white border-brand-300 shadow-xs'
                    : 'bg-cream-base/60 border-cream-border'
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                    isSection2Complete
                      ? 'bg-brand-700 text-white shadow-xs'
                      : 'bg-cream-surface text-charcoal-500 border border-cream-border'
                  }`}
                >
                  {isSection2Complete ? <CheckCircle2 className="w-4 h-4" /> : '02'}
                </div>
                <div className="truncate">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-700 block">
                    Step 02
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-charcoal-900 truncate block">
                    Event Details
                  </span>
                </div>
              </div>

              {/* Step 3 */}
              <div
                className={`flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl transition-all border ${
                  isSection3Complete
                    ? 'bg-white border-brand-300 shadow-xs'
                    : 'bg-cream-base/60 border-cream-border'
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                    isSection3Complete
                      ? 'bg-brand-700 text-white shadow-xs'
                      : 'bg-cream-surface text-charcoal-500 border border-cream-border'
                  }`}
                >
                  {isSection3Complete ? <CheckCircle2 className="w-4 h-4" /> : '03'}
                </div>
                <div className="truncate">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-700 block">
                    Step 03
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-charcoal-900 truncate block">
                    Your Details
                  </span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl transition-all border bg-cream-base/60 border-cream-border">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 bg-cream-surface text-charcoal-500 border border-cream-border">
                  04
                </div>
                <div className="truncate">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-charcoal-500 block">
                    Step 04
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-charcoal-800 truncate block">
                    Review &amp; Submit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN BOOKING WORKSPACE (Form & Sidebar Layout)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-16 bg-cream-base">
        <PageContainer>
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* ──────────────────────────────────────────────────
                  LEFT COLUMN: THE BOOKING FORM (8 cols)
              ────────────────────────────────────────────────── */}
              <div className="lg:col-span-8 space-y-8 sm:space-y-10">
                {/* ──────────────────────────────────────────────
                    SECTION 01: YOUR EVENT
                ────────────────────────────────────────────── */}
                <div className="bg-white rounded-3xl border border-cream-border p-5 sm:p-8 md:p-10 shadow-brand-sm space-y-6">
                  <div className="border-b border-cream-border pb-5">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-700 mb-1">
                      <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center text-xs">
                        01
                      </span>
                      <span>Your Event</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal-900 mt-1">
                      What are we celebrating?
                    </h2>
                    <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                      Choose the type of event you're planning. We will tailor the menu architecture to suit your format.
                    </p>
                  </div>

                  {/* Event Type Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
                    {EVENT_TYPES.map((type) => {
                      const isSelected = formData.eventType === type.value;
                      const IconComponent = type.icon;

                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, eventType: type.value })}
                          className={`relative p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 flex flex-col justify-between min-h-[140px] sm:min-h-[150px] border focus:outline-none ${
                            isSelected
                              ? 'ring-2 ring-brand-700 border-brand-700 shadow-brand-md transform scale-[1.02] bg-white'
                              : `${type.colorBg} ${type.colorBorder} ${type.colorBgHover} hover:shadow-brand-sm`
                          }`}
                        >
                          {/* Top Row: Icon & Selection Indicator */}
                          <div className="flex items-start justify-between w-full mb-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xs transition-colors ${
                                isSelected ? 'bg-brand-700 text-white' : type.colorIconBg
                              }`}
                            >
                              <IconComponent className="w-5 h-5" />
                            </div>

                            {isSelected ? (
                              <span className="w-6 h-6 rounded-full bg-brand-700 text-white flex items-center justify-center text-xs font-bold shadow-xs animate-scale-in">
                                ✓
                              </span>
                            ) : type.badge ? (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 border border-brand-200">
                                {type.badge}
                              </span>
                            ) : null}
                          </div>

                          {/* Text Info */}
                          <div>
                            <h3 className="font-display font-bold text-charcoal-900 text-base sm:text-lg mb-1 leading-snug">
                              {type.name}
                            </h3>
                            <p className="text-xs text-charcoal-600 leading-relaxed">
                              {type.tagline}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ──────────────────────────────────────────────
                    SECTION 02: EVENT DETAILS
                ────────────────────────────────────────────── */}
                <div className="bg-white rounded-3xl border border-cream-border p-5 sm:p-8 md:p-10 shadow-brand-sm space-y-6">
                  <div className="border-b border-cream-border pb-5">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-700 mb-1">
                      <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center text-xs">
                        02
                      </span>
                      <span>Event Details</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal-900 mt-1">
                      Tell us a little more about your event.
                    </h2>
                    <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                      Specify the date, estimated guest count, venue in Lagos, and your preferred treat styling.
                    </p>
                  </div>

                  <div className="space-y-4 sm:space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Event Date"
                        type="date"
                        required
                        leadingIcon={Calendar}
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        helperText="Please select your celebration date."
                      />

                      <Input
                        label="Estimated Guest Count"
                        type="number"
                        min="10"
                        required
                        leadingIcon={Users}
                        placeholder="e.g. 150"
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                        helperText="Minimum 10 guests for catered setups."
                      />
                    </div>

                    <Input
                      label="Venue & City (Location in Lagos)"
                      required
                      leadingIcon={MapPin}
                      placeholder="e.g. Civic Centre, Victoria Island, Lagos"
                      value={formData.venueLocation}
                      onChange={(e) => setFormData({ ...formData, venueLocation: e.target.value })}
                      helperText="We deliver and style events across Lagos (Island, Mainland & Lekki Axis)."
                    />

                    <Textarea
                      label="Desired Treats & Desserts"
                      required
                      placeholder="e.g. 3-tier custom red velvet & vanilla bean wedding cake, 120 dessert parfait cups (tiramisu & salted caramel), mini croissant platters, full dessert table setup with floral styling..."
                      rows={3}
                      value={formData.foodRequirements}
                      onChange={(e) => setFormData({ ...formData, foodRequirements: e.target.value })}
                      helperText="List cake flavors, dessert cups, pastries, or themed dessert table requirements."
                    />

                    <Textarea
                      label="Special Dietary or Theme Notes (Optional)"
                      placeholder="e.g. Color palette is Champagne Rose & Gold; 15 nut-free portions required; venue has elevator access."
                      rows={2}
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      helperText="Include color palettes, allergies, setup timelines, or custom toppers."
                    />
                  </div>
                </div>

                {/* ──────────────────────────────────────────────
                    SECTION 03: YOUR DETAILS
                ────────────────────────────────────────────── */}
                <div className="bg-white rounded-3xl border border-cream-border p-5 sm:p-8 md:p-10 shadow-brand-sm space-y-6">
                  <div className="border-b border-cream-border pb-5">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-700 mb-1">
                      <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center text-xs">
                        03
                      </span>
                      <span>Your Details</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal-900 mt-1">
                      How can we reach you?
                    </h2>
                    <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                      We will formulate your tailored dessert quote and contact you for consultation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      required
                      leadingIcon={User}
                      placeholder="e.g. Dr. Bimbo Alabi"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />

                    <Input
                      label="Phone / WhatsApp Number"
                      type="tel"
                      required
                      leadingIcon={Phone}
                      placeholder="09038358985"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      helperText="Used for quick menu confirmation via WhatsApp."
                    />

                    <div className="sm:col-span-2">
                      <Input
                        label="Email Address"
                        type="email"
                        required
                        leadingIcon={Mail}
                        placeholder="bimbo@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        helperText="Your official PDF proposal & quote breakdown will be emailed here."
                      />
                    </div>
                  </div>
                </div>

                {/* ──────────────────────────────────────────────
                    SECTION 04: SUBMISSION & CONFIRMATION ACTION
                ────────────────────────────────────────────── */}
                <div className="bg-gradient-to-br from-cream-surface via-white to-brand-50/40 rounded-3xl border-2 border-brand-200/90 p-6 sm:p-8 shadow-brand-md space-y-6">
                  {/* Live Inquiry Summary Review */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-brand-700">
                        Inquiry Summary
                      </span>
                      <span className="text-xs font-bold text-charcoal-500">
                        No Payment Required Upfront
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white/90 border border-cream-border text-xs">
                      <div>
                        <span className="text-charcoal-500 block text-[11px]">Selected Event</span>
                        <span className="font-bold text-charcoal-900">{formData.eventType}</span>
                      </div>
                      <div>
                        <span className="text-charcoal-500 block text-[11px]">Target Guests</span>
                        <span className="font-bold text-charcoal-900">{formData.guestCount || '—'} Guests</span>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-charcoal-500 block text-[11px]">Date</span>
                        <span className="font-bold text-brand-700">{formData.eventDate || 'Date pending'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Primary CTA Submit Button */}
                  <div>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={isSubmitting}
                      icon={Send}
                      iconPosition="right"
                      className="w-full justify-center text-base font-bold min-h-[52px] bg-brand-700 hover:bg-brand-800 shadow-brand-md transition-all active:scale-98"
                    >
                      Send Event Request →
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-center text-xs text-charcoal-500 mt-3.5">
                      <ShieldCheck className="w-4 h-4 text-brand-700 shrink-0" />
                      <span>
                        Our event team will review your specifications and send a tailored proposal within 24 hours.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ──────────────────────────────────────────────────
                  RIGHT COLUMN: EVENT SIDEBAR (4 cols - Sticky Desktop)
              ────────────────────────────────────────────────── */}
              <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
                {/* Sidebar Card 1: Beautiful Image Feature */}
                <div className="rounded-3xl overflow-hidden border border-cream-border bg-white shadow-brand-sm relative group">
                  <div className="aspect-[16/11] relative overflow-hidden bg-cream-surface">
                    <img
                      src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=80"
                      alt="Tory's Treats Champagne and Dessert Banquet"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-gold-400 block mb-1">
                        Your Event
                      </span>
                      <h4 className="font-display font-bold text-lg leading-snug">
                        The perfect blend of taste and celebration.
                      </h4>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 text-xs text-charcoal-700 leading-relaxed bg-cream-surface/40">
                    Every cake, petit four, and dessert cup is baked fresh using pure European butter, Belgian chocolate, and fresh ingredients.
                  </div>
                </div>

                {/* Sidebar Card 2: Tory's Treats Event Benefits */}
                <div className="bg-white rounded-3xl border border-cream-border p-5 sm:p-6 shadow-brand-sm space-y-4">
                  <h4 className="font-display font-bold text-charcoal-900 text-base flex items-center gap-2 border-b border-cream-border pb-3">
                    <Sparkles className="w-4 h-4 text-brand-700" />
                    <span>The Tory's Event Promise</span>
                  </h4>

                  <ul className="space-y-3 text-xs sm:text-sm text-charcoal-700">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-charcoal-900 font-semibold">Custom Cakes &amp; Desserts:</strong>{' '}
                        Tailored flavor profiles &amp; bespoke color palettes.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-charcoal-900 font-semibold">Professional Event Setup:</strong>{' '}
                        Full table styling, stands &amp; signage coordination.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-charcoal-900 font-semibold">On-Time Delivery:</strong>{' '}
                        Temperature-controlled transport across Lagos.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-700 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-charcoal-900 font-semibold">Dedicated Concierge:</strong>{' '}
                        Direct WhatsApp support before and during your event.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Sidebar Card 3: WhatsApp & Phone Quick Consultation Card */}
                <div className="bg-gradient-to-br from-[#1C1917] via-[#2E1815] to-[#1C1917] text-white rounded-3xl p-5 sm:p-6 shadow-brand-md space-y-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-gold-400 block mb-1">
                      Need Quick Assistance?
                    </span>
                    <h4 className="font-display font-bold text-lg text-white">
                      Chat with Our Event Concierge
                    </h4>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      Need an urgent quote or bespoke cake consultation? Speak directly with our head pastry stylist.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all active:scale-98"
                    >
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 fill-current" />
                        <span>WhatsApp +234 903 835 8985</span>
                      </div>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <a
                      href={`tel:${BRAND.rawPhone}`}
                      className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/15 text-stone-200 border border-white/20 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all text-center"
                    >
                      <Phone className="w-3.5 h-3.5 text-gold-400" />
                      <span>Call {BRAND.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </PageContainer>
      </section>
    </div>
  );
}
