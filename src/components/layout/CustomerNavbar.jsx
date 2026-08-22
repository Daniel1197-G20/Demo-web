import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
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
} from 'lucide-react';
import { BRAND, NAV_LINKS } from '../../lib/constants';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Dropdown from '../ui/Dropdown';

export default function CustomerNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, isAuthenticated, isAdmin, signOut, toggleRole } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-cream-border transition-all duration-200">
      {/* Top micro-announcement banner */}
      <div className="bg-tory-500 text-white text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Freshly baked daily in Victoria Island, Lagos! Same-day delivery on selected treats.</span>
        <span className="hidden md:inline font-bold underline ml-1 cursor-pointer">
          <Link to="/catering">Book Event Catering &rarr;</Link>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-tory-500 flex items-center justify-center text-white shadow-tory-sm group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl sm:text-2xl text-charcoal-900 leading-tight tracking-tight">
                Tory's <span className="text-tory-500">Treats</span>
              </span>
              <span className="text-[10px] text-charcoal-500 tracking-wider font-semibold uppercase hidden sm:block">
                Artisanal Bakery & Catering
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                    isActive
                      ? 'bg-tory-50 text-tory-600 font-bold'
                      : 'text-charcoal-700 hover:text-tory-500 hover:bg-cream-surface'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick Test Switcher (Convenient for Reviewers in Phase 1) */}
            {isAuthenticated && (
              <button
                type="button"
                onClick={toggleRole}
                title="Click to toggle between Customer and Admin role for UI verification"
                className="hidden sm:flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 bg-cream-surface border border-cream-border rounded-full text-charcoal-700 hover:border-tory-300"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-tory-500" />
                <span>Role: {profile?.role || 'CUSTOMER'}</span>
              </button>
            )}

            {/* Cart Button */}
            <Link to="/cart" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-charcoal-700 hover:text-tory-500 hover:bg-tory-50"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-tory-500 text-white rounded-full text-[11px] font-bold flex items-center justify-center shadow-sm animate-scaleUp">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Account / Auth Dropdown */}
            {isAuthenticated ? (
              <Dropdown
                align="right"
                trigger={
                  <div className="flex items-center gap-1.5 pl-2 pr-3 py-1.5 rounded-full border border-cream-border hover:border-tory-300 bg-cream-surface/50 transition-colors">
                    <div className="w-7 h-7 rounded-full bg-tory-100 text-tory-700 font-bold text-xs flex items-center justify-center">
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
            ) : (
              <Link to="/auth/login">
                <Button variant="primary" size="sm" className="hidden sm:inline-flex">
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-charcoal-700 hover:bg-cream-surface hover:text-tory-500"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-cream-border bg-white px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-charcoal-700 hover:bg-tory-50 hover:text-tory-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {!isAuthenticated && (
            <div className="pt-3 border-t border-cream-border flex flex-col gap-2">
              <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full justify-center">
                  Sign In / Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
