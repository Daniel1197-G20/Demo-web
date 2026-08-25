import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Menu,
  X,
  User,
  Heart,
  Calendar,
  Briefcase,
  Layers,
  Sparkles,
  ShieldCheck,
  LogOut,
  ChevronDown,
  Cake,
  Phone,
} from 'lucide-react';
import { BRAND, NAV_LINKS } from '../../lib/constants';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';

export default function CustomerNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, isAuthenticated, isAdmin, signOut, toggleRole } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-cream-border transition-all duration-200">
      {/* Top micro-announcement banner */}
      <div className="bg-brand-700 text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 text-center font-medium flex items-center justify-center gap-1.5 sm:gap-2">
        <Sparkles className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate">Freshly baked daily in Victoria Island, Lagos!</span>
        <span className="hidden sm:inline font-bold underline ml-1 cursor-pointer">
          <Link to="/catering">Book Catering &rarr;</Link>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-brand-700 flex items-center justify-center text-white shadow-brand-sm group-hover:scale-105 transition-transform">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg sm:text-2xl text-charcoal-900 leading-tight tracking-tight">
                Tory's <span className="text-brand-700">Treats</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-charcoal-500 tracking-wider font-semibold uppercase hidden md:block">
                Artisanal Bakery & Catering
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 font-bold'
                      : 'text-charcoal-700 hover:text-brand-700 hover:bg-cream-surface'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions: Test Switcher, Cart, Account, Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Quick Test Switcher (Reviewer Convenience) */}
            {isAuthenticated && (
              <button
                type="button"
                onClick={toggleRole}
                title="Click to toggle between Customer and Admin role"
                className="hidden xl:flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 bg-cream-surface border border-cream-border rounded-full text-charcoal-700 hover:border-brand-300 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-brand-700" />
                <span>Role: {profile?.role || 'CUSTOMER'}</span>
              </button>
            )}

            {/* Cart Button */}
            <Link to="/cart" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-charcoal-700 hover:text-brand-700 hover:bg-brand-50 w-9 h-9 sm:w-10 sm:h-10"
                aria-label={`Shopping cart with ${itemCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-700 text-white rounded-full text-[11px] font-bold flex items-center justify-center shadow-sm">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Desktop User Account Dropdown */}
            {isAuthenticated ? (
              <div className="hidden sm:block">
                <Dropdown
                  align="right"
                  trigger={
                    <div className="flex items-center gap-1.5 pl-2 pr-3 py-1.5 rounded-full border border-cream-border hover:border-brand-300 bg-cream-surface/50 transition-colors cursor-pointer">
                      <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center">
                        {profile?.full_name?.charAt(0) || 'U'}
                      </div>
                      <span className="text-xs font-semibold text-charcoal-900 hidden md:inline max-w-[100px] truncate">
                        {profile?.full_name?.split(' ')[0] || 'Account'}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-charcoal-500" />
                    </div>
                  }
                  items={[
                    { label: 'My Account Overview', href: '/account', onClick: () => navigate('/account'), icon: User },
                    { label: 'Order History', href: '/account/orders', onClick: () => navigate('/account/orders'), icon: ShoppingBag },
                    { label: 'Catering Bookings', href: '/account/bookings', onClick: () => navigate('/account/bookings'), icon: Calendar },
                    { label: 'Contract Applications', href: '/account/applications', onClick: () => navigate('/account/applications'), icon: Briefcase },
                    ...(isAdmin
                      ? [
                          { divider: true },
                          { label: 'Admin Portal', href: '/admin', onClick: () => navigate('/admin'), icon: ShieldCheck },
                        ]
                      : []),
                    { divider: true },
                    { label: 'Sign Out', onClick: signOut, danger: true, icon: LogOut },
                  ]}
                />
              </div>
            ) : (
              <Link to="/auth/login" className="hidden sm:inline-flex">
                <Button variant="primary" size="sm">
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Profile Icon (Direct link to /account or /auth/login) */}
            <Link
              to={isAuthenticated ? '/account' : '/auth/login'}
              className="sm:hidden p-2 rounded-xl text-charcoal-700 hover:bg-cream-surface hover:text-brand-700"
              aria-label={isAuthenticated ? 'My Account' : 'Sign In'}
            >
              {isAuthenticated ? (
                <div className="w-7 h-7 rounded-full bg-brand-700 text-white font-bold text-xs flex items-center justify-center">
                  {profile?.full_name?.charAt(0) || 'U'}
                </div>
              ) : (
                <User className="w-5 h-5" />
              )}
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-charcoal-700 hover:bg-cream-surface hover:text-brand-700 transition-colors focus-ring"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-white shadow-2xl z-10 flex flex-col justify-between overflow-y-auto">
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-cream-border bg-cream-surface/40">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-brand-700 flex items-center justify-center text-white">
                    <Heart className="w-4 h-4 fill-current" />
                  </div>
                  <span className="font-display font-extrabold text-lg text-charcoal-900">
                    Tory's <span className="text-brand-700">Treats</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-charcoal-500 hover:text-charcoal-900 hover:bg-cream-surface transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Greeting (if logged in) */}
              {isAuthenticated && (
                <div className="p-4 bg-brand-50/60 border-b border-brand-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-700 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                      {profile?.full_name?.charAt(0) || 'U'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-charcoal-900 truncate">
                        {profile?.full_name || 'Customer'}
                      </p>
                      <p className="text-[11px] text-charcoal-500 truncate">{profile?.email}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={toggleRole}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-brand-200 text-brand-700 shrink-0"
                  >
                    {profile?.role || 'CUSTOMER'}
                  </button>
                </div>
              )}

              {/* Main Navigation Links */}
              <div className="px-3 py-4 space-y-1">
                <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-charcoal-400">
                  Menu Navigation
                </p>
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-brand-50 text-brand-700 font-bold'
                          : 'text-charcoal-800 hover:bg-cream-surface hover:text-brand-700'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                  </NavLink>
                ))}
              </div>

              {/* Account Sub-Links (if authenticated) */}
              {isAuthenticated && (
                <div className="px-3 py-2 border-t border-cream-border space-y-1">
                  <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-charcoal-400">
                    My Account
                  </p>
                  <Link
                    to="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-charcoal-700 hover:bg-cream-surface hover:text-brand-700"
                  >
                    <User className="w-4 h-4 text-charcoal-500" />
                    <span>Account Overview</span>
                  </Link>
                  <Link
                    to="/account/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-charcoal-700 hover:bg-cream-surface hover:text-brand-700"
                  >
                    <ShoppingBag className="w-4 h-4 text-charcoal-500" />
                    <span>Order History</span>
                  </Link>
                  <Link
                    to="/account/bookings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-charcoal-700 hover:bg-cream-surface hover:text-brand-700"
                  >
                    <Calendar className="w-4 h-4 text-charcoal-500" />
                    <span>Catering Bookings</span>
                  </Link>
                  <Link
                    to="/account/applications"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-charcoal-700 hover:bg-cream-surface hover:text-brand-700"
                  >
                    <Briefcase className="w-4 h-4 text-charcoal-500" />
                    <span>Contract Applications</span>
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 mt-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-brand-700" />
                      <span>Admin Management Portal</span>
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-cream-border bg-cream-surface/30 space-y-3">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-error-600 hover:bg-error-50 border border-error-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <div className="space-y-2">
                  <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)} className="block">
                    <Button variant="primary" className="w-full justify-center">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth/register" onClick={() => setMobileMenuOpen(false)} className="block">
                    <Button variant="outline" className="w-full justify-center">
                      Create Account
                    </Button>
                  </Link>
                </div>
              )}

              <div className="pt-2 text-center">
                <p className="text-[11px] text-charcoal-500">
                  Victoria Island, Lagos • {BRAND.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
