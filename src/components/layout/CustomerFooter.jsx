import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Phone, Mail, Clock, Instagram, Send } from 'lucide-react';
import { BRAND } from '../../lib/constants';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function CustomerFooter() {
  return (
    <footer className="bg-white border-t border-cream-border mt-16 sm:mt-24">
      {/* Newsletter / Sweet Perks Banner */}
      <div className="bg-cream-surface border-b border-cream-border py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-100 px-3 py-1 rounded-full">
                Sweet Perks Club
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-charcoal-900 font-display mt-2">
                Get 10% off your first treat order
              </h3>
              <p className="text-sm text-charcoal-700 mt-1">
                Subscribe to receive secret weekend bakery drops, catering discounts, and seasonal menu previews.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to Tory’s Treats Club!');
              }}
              className="flex flex-col sm:flex-row w-full max-w-md gap-2.5"
            >
              <Input
                placeholder="Enter your email address"
                type="email"
                required
                className="flex-1"
                inputClassName="bg-white h-11"
              />
              <Button type="submit" variant="primary" icon={Send} className="w-full sm:w-auto shrink-0">
                Join Club
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-brand-700 flex items-center justify-center text-white shadow-brand-sm">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <span className="font-display font-extrabold text-2xl text-charcoal-900">
                Tory's <span className="text-brand-700">Treats</span>
              </span>
            </Link>

            <p className="text-sm text-charcoal-700 leading-relaxed max-w-sm">
              Artisanal baked goods, handcrafted desserts, and bespoke luxury catering for weddings, corporate galas, and private celebrations across Lagos.
            </p>

            <div className="space-y-2 pt-2 text-xs text-charcoal-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-700 shrink-0" />
                <span>{BRAND.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-700 shrink-0" />
                <a href={`tel:${BRAND.rawPhone}`} className="hover:text-brand-700 transition-colors">
                  {BRAND.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-700 shrink-0" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-brand-700 transition-colors">
                  {BRAND.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-700 shrink-0" />
                <span>{BRAND.openingHours}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Shop Treats */}
          <div>
            <h4 className="font-display font-bold text-charcoal-900 text-sm uppercase tracking-wider mb-4">
              Our Treats
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal-700">
              <li>
                <Link to="/shop" className="hover:text-brand-700 transition-colors">
                  Artisanal Cakes
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-brand-700 transition-colors">
                  Gourmet Cupcakes
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-brand-700 transition-colors">
                  Fresh Pastries
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-brand-700 transition-colors">
                  Dessert Cups & Parfaits
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-brand-700 transition-colors">
                  Celebration Platters
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Careers */}
          <div>
            <h4 className="font-display font-bold text-charcoal-900 text-sm uppercase tracking-wider mb-4">
              Experiences
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal-700">
              <li>
                <Link to="/events" className="hover:text-brand-700 transition-colors font-medium text-brand-700">
                  ★ Masterclasses &amp; Tastings
                </Link>
              </li>
              <li>
                <Link to="/catering" className="hover:text-brand-700 transition-colors">
                  Event &amp; Wedding Catering
                </Link>
              </li>
              <li>
                <Link to="/contracts" className="hover:text-brand-700 transition-colors">
                  Contract Staff Roles
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-700 transition-colors">
                  Custom Orders & Tastings
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-brand-700 transition-colors">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links & Admin */}
          <div>
            <h4 className="font-display font-bold text-charcoal-900 text-sm uppercase tracking-wider mb-4">
              Information
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal-700">
              <li>
                <Link to="/contact" className="hover:text-brand-700 transition-colors">
                  Contact & Location
                </Link>
              </li>
              <li>
                <Link to="/auth/login" className="hover:text-brand-700 transition-colors">
                  Account Sign In
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-brand-700 transition-colors text-charcoal-500">
                  Staff / Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="border-t border-cream-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved. Made with love in Lagos, Nigeria.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Food Safety</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
