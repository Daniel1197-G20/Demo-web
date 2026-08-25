import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Sparkles,
  Award,
  Wine,
  Gift,
  Phone,
  Plus,
  Minus,
  Check,
  ShieldCheck,
} from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import EventCard from '../../components/ui/EventCard';
import { formatCurrency } from '../../lib/formatters';
import { BRAND } from '../../lib/constants';
import { useToast } from '../../hooks/useToast';

export default function EventDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [seats, setSeats] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dietaryNotes: '',
  });

  // Mock Event Database
  const EVENTS_DATA = {
    'macaron-masterclass-sep-14': {
      id: 'macaron-masterclass-sep-14',
      slug: 'macaron-masterclass-sep-14',
      title: 'Artisanal French Macaron & Choux Masterclass',
      category: 'Masterclasses & Workshops',
      date: '2026-09-14',
      displayDate: 'Sept 14',
      dayOfWeek: 'Saturday',
      time: '2:00 PM - 6:00 PM (4 Hours)',
      location: "The Tory's Kitchen Atelier, Victoria Island, Lagos",
      price: 35000,
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1000&auto=format&fit=crop&q=80',
      status: 'ALMOST_FULL',
      spotsLeft: 3,
      capacityNote: '12 Seats Total',
      description:
        'Immerse yourself in classical French patisserie technique. Master delicate almond macaron shells with Italian meringue, velvety chocolate ganache fillings, and crisp choux au craquelin under direct hands-on guidance from our executive pastry chefs.',
      about:
        'Whether you are an aspiring baker or looking for a delightful, elevated weekend experience in Lagos, this 4-hour workshop takes you behind the counter at Tory’s Treats. You will work in a fully equipped artisanal kitchen with individual workstation stations, European creamery butter, and genuine Madagascar Bourbon vanilla beans.',
      inclusions: [
        'Individual fully-equipped pastry workstation & chef apron',
        'Hands-on preparation of 24 macarons and 8 choux pastries',
        'Complimentary sparkling wine bar, iced herbal teas & single-origin coffee',
        'Printed recipe portfolio with temperature and lamination guides',
        'Luxury presentation gift box to take home all your freshly baked treats',
      ],
      timeline: [
        { time: '2:00 PM', title: 'Welcome & Apron Fitting', desc: 'Champagne toast, kitchen tour, and ingredient introduction.' },
        { time: '2:30 PM', title: 'Italian Meringue & Macaronage', desc: 'Whipping the meringue, folding technique, and color tinting.' },
        { time: '3:30 PM', title: 'Choux Paste & Craquelin', desc: 'Piping choux buns and baking to golden hollow perfection.' },
        { time: '4:30 PM', title: 'Ganache Infusions & Assembling', desc: 'Preparing passionfruit, dark chocolate, and salted caramel fillings.' },
        { time: '5:30 PM', title: 'Tasting & Luxury Packaging', desc: 'Plating your bakes and packaging them in Tory’s Treats gift boxes.' },
      ],
      instructor: {
        name: 'Chef Tory & Guest Master Patissier',
        role: 'Executive Pastry Director',
        bio: 'Trained in French and European pastry arts, bringing over a decade of artisanal baking excellence and luxury wedding catering to Lagos.',
      },
    },
    'champagne-dessert-pairing-sep-26': {
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
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1000&auto=format&fit=crop&q=80',
      status: 'AVAILABLE',
      spotsLeft: 8,
      capacityNote: '24 Guests Total',
      description:
        'A 5-course plated dessert tasting menu paired with vintage champagnes and artisanal dessert wines curated by our head chef and guest sommelier.',
      about:
        'An exclusive evening celebrating the harmony between fine wines and decadent pastry arts. Each course features an original dessert formulation paired thoughtfully with rare champagnes and sparkling wines.',
      inclusions: [
        '5-Course plated artisanal dessert tasting menu',
        'Sommelier champagne and sparkling wine pairings for each course',
        'Live acoustic background performance',
        'Exclusive VIP sweet hamper containing limited-run petit fours',
      ],
      timeline: [
        { time: '6:30 PM', title: 'Sunset Reception & Canapés', desc: 'Welcome glass of vintage Prosecco and savoury gougères.' },
        { time: '7:15 PM', title: 'First 3 Plated Courses', desc: 'Citrus tartlet, strawberry cloud reduction, and pistachio puff.' },
        { time: '8:15 PM', title: 'Grand Finale & Chocolate Suite', desc: 'Belgian dark chocolate truffle sphere with warm berry coulis.' },
        { time: '9:00 PM', title: 'Gift Hamper Presentation', desc: 'Take-home luxury dessert box and sommelier tasting notes.' },
      ],
      instructor: {
        name: 'Chef Tory & Guest Sommelier',
        role: 'Curated Tasting Hosts',
        bio: 'Dedicated to presenting world-class culinary evenings celebrating fine dessert craftsmanship in Nigeria.',
      },
    },
  };

  // Fallback to first event if slug not found in mock
  const event = EVENTS_DATA[slug] || EVENTS_DATA['macaron-masterclass-sep-14'];

  const totalPrice = event.price * seats;

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setBookingSuccess(true);
      toast.success(`Reserved ${seats} seat(s) for ${event.title}!`, 'Spot Confirmed');
    }, 1200);
  };

  return (
    <div className="overflow-x-hidden py-6 sm:py-10">
      <PageContainer>
        {/* Navigation Breadcrumb / Back Link */}
        <div className="mb-6">
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal-500 hover:text-brand-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Events Calendar</span>
          </Link>
        </div>

        {/* Main Grid: Left Event Information (7 cols) + Right Booking Card (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Details, Inclusions, Schedule */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-10">
            {/* Hero Image */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden bg-cream-surface shadow-brand-md border border-cream-border">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent" />

              {/* Status and Category Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                <span className="px-3 py-1 rounded-full bg-white/95 text-brand-700 text-xs font-bold uppercase tracking-wider shadow-xs">
                  {event.category}
                </span>
                {event.spotsLeft <= 4 && (
                  <span className="px-3 py-1 rounded-full bg-warning-500 text-white text-xs font-bold shadow-xs animate-pulse">
                    Only {event.spotsLeft} Seats Left
                  </span>
                )}
              </div>
            </div>

            {/* Title & Core Metadata */}
            <div className="space-y-4">
              <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 leading-tight">
                {event.title}
              </h1>

              {/* Date, Time, Location Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-cream-surface border border-cream-border">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-charcoal-500 block">Date</span>
                    <span className="text-xs font-bold text-charcoal-900">{event.displayDate} ({event.dayOfWeek})</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-cream-surface border border-cream-border">
                  <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-charcoal-500 block">Time</span>
                    <span className="text-xs font-bold text-charcoal-900">{event.time.split(' ')[0]} {event.time.split(' ')[1]}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-cream-surface border border-cream-border">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-charcoal-500 block">Capacity</span>
                    <span className="text-xs font-bold text-charcoal-900">{event.capacityNote}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-charcoal-600 pt-1">
                <MapPin className="w-4 h-4 text-brand-700 shrink-0" />
                <span>{event.location}</span>
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-3 border-t border-cream-border pt-6">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-charcoal-900">
                About This Experience
              </h2>
              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
                {event.about || event.description}
              </p>
            </div>

            {/* Inclusions Checklist */}
            <div className="space-y-3 border-t border-cream-border pt-6">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-charcoal-900">
                What’s Included &amp; What You’ll Take Home
              </h2>
              <div className="space-y-2.5 pt-1">
                {event.inclusions.map((inc, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-cream-border shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-charcoal-800 font-medium leading-relaxed">{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Timeline */}
            {event.timeline && (
              <div className="space-y-4 border-t border-cream-border pt-6">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-charcoal-900">
                  Session Schedule &amp; Flow
                </h2>
                <div className="space-y-3">
                  {event.timeline.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-cream-surface/60 border border-cream-border">
                      <span className="px-2.5 py-1 rounded-lg bg-brand-700 text-white text-xs font-bold font-display shrink-0">
                        {item.time}
                      </span>
                      <div>
                        <h4 className="font-display font-bold text-charcoal-900 text-sm sm:text-base">
                          {item.title}
                        </h4>
                        <p className="text-xs text-charcoal-600 mt-0.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chef Host Profile */}
            <div className="border-t border-cream-border pt-6">
              <div className="p-6 rounded-3xl bg-brand-50 border border-brand-200/80 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                <div className="w-16 h-16 rounded-2xl bg-brand-700 text-white font-display font-bold text-2xl flex items-center justify-center shadow-brand-sm shrink-0">
                  TT
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-brand-700">
                    Lead Chef &amp; Instructor
                  </span>
                  <h4 className="font-display text-lg font-bold text-charcoal-900">
                    {event.instructor.name}
                  </h4>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    {event.instructor.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking & Reservation Card (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <Card className="p-6 sm:p-8 shadow-brand-lg border-2 border-brand-200 bg-white space-y-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-brand-700">
                  Seat Reservation
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-charcoal-900">
                    {formatCurrency(event.price)}
                  </h3>
                  <span className="text-xs text-charcoal-500 font-medium">/ seat</span>
                </div>
                <p className="text-xs text-charcoal-500 mt-1">
                  Limited to 12 guests to maintain intimate hands-on quality.
                </p>
              </div>

              {bookingSuccess ? (
                <div className="p-5 rounded-2xl bg-success-50 border border-success-100 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-success-500 text-white flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-charcoal-900">
                    Seat Reserved Successfully!
                  </h4>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    We have sent your confirmation folio to <strong>{formData.email || 'your email'}</strong>. Our team will message you on WhatsApp before the session.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/events')}
                    className="w-full justify-center text-xs"
                  >
                    Return to Events Calendar
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleReservationSubmit} className="space-y-4">
                  {/* Seat Counter */}
                  <div>
                    <label className="text-xs font-bold text-charcoal-900 block mb-1.5">
                      Number of Seats / Attendees
                    </label>
                    <div className="flex items-center justify-between border border-cream-border bg-cream-surface/50 rounded-2xl p-1.5">
                      <button
                        type="button"
                        onClick={() => setSeats(Math.max(1, seats - 1))}
                        className="w-9 h-9 rounded-xl bg-white border border-cream-border flex items-center justify-center text-charcoal-700 hover:bg-cream-surface active:bg-brand-50"
                        aria-label="Decrease seats"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-display text-base font-bold text-charcoal-900">
                        {seats} {seats === 1 ? 'Seat' : 'Seats'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSeats(Math.min(event.spotsLeft || 4, seats + 1))}
                        className="w-9 h-9 rounded-xl bg-white border border-cream-border flex items-center justify-center text-charcoal-700 hover:bg-cream-surface active:bg-brand-50"
                        aria-label="Increase seats"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Attendee Details */}
                  <Input
                    label="Lead Attendee Name"
                    required
                    placeholder="e.g. Folake Adeyemi"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />

                  <Input
                    label="Email for Confirmation"
                    type="email"
                    required
                    placeholder="folake@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />

                  <Input
                    label="WhatsApp / Phone Number"
                    type="tel"
                    required
                    placeholder="09038358985"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />

                  <Input
                    label="Dietary Preferences (Optional)"
                    placeholder="e.g. Nut allergy, non-alcoholic pairing"
                    value={formData.dietaryNotes}
                    onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                  />

                  {/* Price Summary */}
                  <div className="pt-3 border-t border-cream-border space-y-1.5 text-xs">
                    <div className="flex justify-between text-charcoal-600">
                      <span>{seats}x Seat Tickets ({formatCurrency(event.price)})</span>
                      <span>{formatCurrency(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-charcoal-600">
                      <span>Ingredient &amp; Pairing Fee</span>
                      <span className="text-success-600 font-bold">Included</span>
                    </div>
                    <div className="flex justify-between font-display text-base font-extrabold text-charcoal-900 pt-2 border-t border-cream-border/80">
                      <span>Total Due</span>
                      <span className="text-brand-700">{formatCurrency(totalPrice)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full justify-center text-sm sm:text-base font-semibold min-h-[48px]"
                  >
                    Confirm &amp; Reserve {seats > 1 ? `${seats} Seats` : 'Seat'}
                  </Button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-charcoal-500 text-center pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-success-600" />
                    <span>Instant confirmation &amp; 100% satisfaction guarantee</span>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
