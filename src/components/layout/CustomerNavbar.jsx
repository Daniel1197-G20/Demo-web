import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  User,
  Heart,
  Calendar,
  Briefcase,
  ShieldCheck,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { NAV_LINKS } from '../../lib/constants';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';

export default function CustomerNavbar() {
  const { profile, isAuthenticated, isAdmin, signOut, toggleRole } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-cream-border transition-all duration-200">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-20">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group shrink-0"
            aria-label="Tory's Treats Home"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-brand-700 flex items-center justify-center text-white shadow-brand-sm group-hover:scale-105 transition-transform">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg sm:text-2xl text-charcoal-900 leading-tight tracking-tight">
                Tory's <span className="text-brand-700">Treats</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-charcoal-500 tracking-wider font-semibold uppercase hidden md:block">
                Artisanal Bakery &amp; Catering
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Visible only on lg+ screens) */}
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

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Quick Test Switcher (Admin/Customer role toggle for reviewers) */}
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

            {/* Shopping Cart Button */}
            <Link to="/cart" className="relative" aria-label={`Shopping cart with ${itemCount} items`}>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-charcoal-700 hover:text-brand-700 hover:bg-brand-50 w-9 h-9 sm:w-10 sm:h-10"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-700 text-white rounded-full text-[11px] font-bold flex items-center justify-center shadow-sm animate-scale-in">
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

            {/* Mobile Profile Icon (Clean and minimal on small screens) */}
            <Link
              to={isAuthenticated ? '/account' : '/auth/login'}
              className="sm:hidden p-1.5 rounded-xl text-charcoal-700 hover:bg-cream-surface hover:text-brand-700 transition-colors"
              aria-label={isAuthenticated ? 'My Account' : 'Sign In'}
            >
              {isAuthenticated ? (
                <div className="w-7 h-7 rounded-full bg-brand-700 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {profile?.full_name?.charAt(0) || 'U'}
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full border border-cream-border flex items-center justify-center text-charcoal-700">
                  <User className="w-4 h-4" />
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
