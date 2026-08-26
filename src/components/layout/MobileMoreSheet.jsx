import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  X,
  Heart,
  Grid,
  ShoppingBag,
  Sparkles,
  CalendarDays,
  Briefcase,
  MapPin,
  Phone,
  User,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { BRAND } from '../../lib/constants';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import Button from '../ui/Button';

export default function MobileMoreSheet({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const { profile, isAuthenticated, isAdmin, signOut, toggleRole } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close sheet on route changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  // Body scroll locking and smooth transition control
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setAnimating(true), 10);
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      return () => clearTimeout(timer);
    } else {
      setAnimating(false);
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'unset';
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="More Navigation and Bakery Services"
      className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end"
    >
      {/* 1. Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          animating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 2. Slide-up Sheet Panel */}
      <div
        className={`relative w-full max-h-[85vh] bg-white rounded-t-3xl shadow-2xl z-10 flex flex-col overflow-hidden transform transition-transform duration-300 ease-out pb-safe ${
          animating ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Sheet Top Grab Handle & Header */}
        <div className="pt-3 pb-3 px-5 border-b border-cream-border bg-cream-surface/60 shrink-0">
          <div className="w-12 h-1 bg-charcoal-300 rounded-full mx-auto mb-3" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-brand-700 flex items-center justify-center text-white shadow-brand-sm">
                <Heart className="w-3.5 h-3.5 fill-current" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-base text-charcoal-900 leading-tight">
                  Tory's <span className="text-brand-700">Treats</span>
                </h3>
                <p className="text-[10px] text-charcoal-500 font-semibold uppercase tracking-wider">
                  Menu &amp; Services
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-charcoal-500 hover:text-charcoal-900 hover:bg-cream-border/50 active:bg-cream-border transition-colors focus-ring"
              aria-label="Close sheet"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sheet Scrollable Body */}
        <div className="overflow-y-auto px-4 py-4 space-y-5 flex-1">
          {/* Logged in User Bar */}
          {isAuthenticated && (
            <div className="p-3.5 rounded-2xl bg-brand-50/80 border border-brand-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full bg-brand-700 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                  {profile?.full_name?.charAt(0) || 'U'}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-charcoal-900 truncate">
                    {profile?.full_name || 'Customer Account'}
                  </p>
                  <p className="text-[11px] text-charcoal-500 truncate">{profile?.email}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleRole}
                title="Toggle role for testing"
                className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white border border-brand-200 text-brand-700 shrink-0 ml-2 shadow-xs"
              >
                {profile?.role || 'CUSTOMER'}
              </button>
            </div>
          )}

          {/* Section 1: Explore & Menu */}
          <div>
            <p className="px-1 pb-2 text-[10px] font-bold uppercase tracking-wider text-charcoal-400">
              Explore &amp; Discover
            </p>
            <div className="grid grid-cols-1 gap-1.5">
              <NavLink
                to="/categories"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between p-3 rounded-2xl border transition-colors ${
                    isActive
                      ? 'bg-brand-50 border-brand-200 text-brand-700 font-bold'
                      : 'bg-cream-surface/40 border-cream-border/80 text-charcoal-800 hover:bg-cream-surface'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-100/70 text-brand-700 flex items-center justify-center shrink-0">
                    <Grid className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block">Treat Categories</span>
                    <span className="text-[10px] text-charcoal-500 block font-normal">
                      Cakes, cupcakes, pastries, savories &amp; bread
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-charcoal-400" />
              </NavLink>

              <NavLink
                to="/catering"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between p-3 rounded-2xl border transition-colors ${
                    isActive
                      ? 'bg-brand-50 border-brand-200 text-brand-700 font-bold'
                      : 'bg-cream-surface/40 border-cream-border/80 text-charcoal-800 hover:bg-cream-surface'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100/70 text-amber-800 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block">Luxury Event Catering</span>
                    <span className="text-[10px] text-charcoal-500 block font-normal">
                      Bespoke dessert tables &amp; celebration setups
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-charcoal-400" />
              </NavLink>

              <NavLink
                to="/events"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between p-3 rounded-2xl border transition-colors ${
                    isActive
                      ? 'bg-brand-50 border-brand-200 text-brand-700 font-bold'
                      : 'bg-cream-surface/40 border-cream-border/80 text-charcoal-800 hover:bg-cream-surface'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-100/70 text-rose-700 flex items-center justify-center shrink-0">
                    <CalendarDays className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block">Events &amp; Masterclasses</span>
                    <span className="text-[10px] text-charcoal-500 block font-normal">
                      Baking masterclasses, seasonal tastings &amp; pop-ups
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-charcoal-400" />
              </NavLink>
            </div>
          </div>

          {/* Section 2: Company & Opportunities */}
          <div>
            <p className="px-1 pb-2 text-[10px] font-bold uppercase tracking-wider text-charcoal-400">
              Company &amp; Support
            </p>
            <div className="grid grid-cols-1 gap-1.5">
              <NavLink
                to="/contracts"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between p-3 rounded-2xl border transition-colors ${
                    isActive
                      ? 'bg-brand-50 border-brand-200 text-brand-700 font-bold'
                      : 'bg-cream-surface/40 border-cream-border/80 text-charcoal-800 hover:bg-cream-surface'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block">Careers &amp; Contracts</span>
                    <span className="text-[10px] text-charcoal-500 block font-normal">
                      Join our team of artisanal bakers &amp; baristas
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-charcoal-400" />
              </NavLink>

              <NavLink
                to="/contact"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between p-3 rounded-2xl border transition-colors ${
                    isActive
                      ? 'bg-brand-50 border-brand-200 text-brand-700 font-bold'
                      : 'bg-cream-surface/40 border-cream-border/80 text-charcoal-800 hover:bg-cream-surface'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block">Contact &amp; Custom Orders</span>
                    <span className="text-[10px] text-charcoal-500 block font-normal">
                      Bakery location, hours &amp; direct assistance
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-charcoal-400" />
              </NavLink>

              <NavLink
                to="/cart"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between p-3 rounded-2xl border transition-colors ${
                    isActive
                      ? 'bg-brand-50 border-brand-200 text-brand-700 font-bold'
                      : 'bg-cream-surface/40 border-cream-border/80 text-charcoal-800 hover:bg-cream-surface'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-100/70 text-brand-700 flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block">Shopping Basket</span>
                    <span className="text-[10px] text-charcoal-500 block font-normal">
                      {itemCount > 0 ? `${itemCount} items waiting in basket` : 'Review your treat order'}
                    </span>
                  </div>
                </div>
                {itemCount > 0 ? (
                  <span className="px-2 py-0.5 rounded-full bg-brand-700 text-white text-[11px] font-bold">
                    {itemCount}
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 text-charcoal-400" />
                )}
              </NavLink>
            </div>
          </div>

          {/* Section 3: Customer Account Sub-Navigation */}
          {isAuthenticated ? (
            <div>
              <p className="px-1 pb-2 text-[10px] font-bold uppercase tracking-wider text-charcoal-400">
                Customer Account
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/account"
                  onClick={onClose}
                  className="p-2.5 rounded-xl border border-cream-border bg-cream-surface/30 hover:bg-cream-surface text-charcoal-800 text-xs font-semibold flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-brand-700" />
                  <span>Overview</span>
                </Link>
                <Link
                  to="/account/orders"
                  onClick={onClose}
                  className="p-2.5 rounded-xl border border-cream-border bg-cream-surface/30 hover:bg-cream-surface text-charcoal-800 text-xs font-semibold flex items-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-brand-700" />
                  <span>Orders</span>
                </Link>
                <Link
                  to="/account/bookings"
                  onClick={onClose}
                  className="p-2.5 rounded-xl border border-cream-border bg-cream-surface/30 hover:bg-cream-surface text-charcoal-800 text-xs font-semibold flex items-center gap-2"
                >
                  <CalendarDays className="w-3.5 h-3.5 text-brand-700" />
                  <span>Bookings</span>
                </Link>
                <Link
                  to="/account/applications"
                  onClick={onClose}
                  className="p-2.5 rounded-xl border border-cream-border bg-cream-surface/30 hover:bg-cream-surface text-charcoal-800 text-xs font-semibold flex items-center gap-2"
                >
                  <Briefcase className="w-3.5 h-3.5 text-brand-700" />
                  <span>Applications</span>
                </Link>
              </div>

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={onClose}
                  className="mt-2 flex items-center justify-between p-3 rounded-2xl bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-brand-700" />
                    <span>Admin Management Portal</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ) : null}

          {/* Direct Bakery Call & Details */}
          <div className="p-3.5 rounded-2xl border border-cream-border bg-cream-surface/60 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-charcoal-900">
                <Phone className="w-3.5 h-3.5 text-brand-700" />
                <span>Direct Bakery Line</span>
              </div>
              <a
                href={`tel:${BRAND.rawPhone}`}
                className="text-xs font-bold text-brand-700 bg-white px-3 py-1 rounded-full border border-brand-200 shadow-2xs hover:bg-brand-50 transition-colors"
              >
                {BRAND.phone}
              </a>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-charcoal-600 pt-1 border-t border-cream-border/60">
              <Clock className="w-3 h-3 text-charcoal-400 shrink-0" />
              <span>{BRAND.openingHours}</span>
            </div>
          </div>
        </div>

        {/* Sheet Footer Account Controls */}
        <div className="p-4 border-t border-cream-border bg-white shrink-0 space-y-2.5">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => {
                signOut();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-error-600 hover:bg-error-50 border border-error-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out of Account</span>
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              <Link to="/auth/login" onClick={onClose} className="block">
                <Button variant="primary" className="w-full justify-center text-xs h-10">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth/register" onClick={onClose} className="block">
                <Button variant="outline" className="w-full justify-center text-xs h-10">
                  Create Account
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
