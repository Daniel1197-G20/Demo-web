import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import {
  Home,
  ShoppingBag,
  Calendar,
  Sparkles,
  LayoutGrid,
  Layers,
  UtensilsCrossed,
  Briefcase,
  Phone,
  X,
  User,
  ChevronRight,
  LogOut,
  Heart,
} from 'lucide-react';
import { BRAND } from '../../lib/constants';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import Button from '../ui/Button';

export default function MobileBottomNav() {
  const [moreSheetOpen, setMoreSheetOpen] = useState(false);
  const location = useLocation();
  const { profile, isAuthenticated, signOut } = useAuth();
  const { itemCount } = useCart();

  // Close More sheet on route change
  useEffect(() => {
    setMoreSheetOpen(false);
  }, [location.pathname]);

  // Handle ESC key and scroll lock when More sheet is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && moreSheetOpen) {
        setMoreSheetOpen(false);
      }
    };

    if (moreSheetOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [moreSheetOpen]);

  const currentPath = location.pathname;

  const isHomeActive = currentPath === '/';
  const isShopActive = currentPath.startsWith('/shop');
  const isEventsActive = currentPath.startsWith('/events');
  const isCateringActive = currentPath.startsWith('/catering');
  const isMoreActive =
    moreSheetOpen ||
    currentPath === '/categories' ||
    currentPath.startsWith('/contracts') ||
    currentPath === '/contact' ||
    currentPath.startsWith('/account');

  const PRIMARY_NAV = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
      isActive: isHomeActive,
      onClick: () => setMoreSheetOpen(false),
    },
    {
      name: 'Shop',
      href: '/shop',
      icon: ShoppingBag,
      isActive: isShopActive,
      onClick: () => setMoreSheetOpen(false),
      badge: itemCount > 0 ? itemCount : null,
    },
    {
      name: 'Events',
      href: '/events',
      icon: Calendar,
      isActive: isEventsActive,
      onClick: () => setMoreSheetOpen(false),
    },
    {
      name: 'Book',
      href: '/catering',
      icon: Sparkles,
      isActive: isCateringActive,
      onClick: () => setMoreSheetOpen(false),
    },
    {
      name: 'More',
      href: '#more',
      icon: LayoutGrid,
      isActive: isMoreActive,
      isButton: true,
      onClick: () => setMoreSheetOpen(!moreSheetOpen),
    },
  ];

  const SECONDARY_DESTINATIONS = [
    {
      title: 'Sweet Categories',
      subtitle: 'Cakes, pastries, cupcakes & platters',
      href: '/categories',
      icon: Layers,
    },
    {
      title: 'Event & Wedding Catering',
      subtitle: 'Bespoke cakes & treat table staging',
      href: '/catering',
      icon: UtensilsCrossed,
    },
    {
      title: 'Masterclasses & Tastings',
      subtitle: 'Culinary experiences & ateliers in VI',
      href: '/events',
      icon: Sparkles,
    },
    {
      title: 'Careers & Staff Contracts',
      subtitle: 'Join our baking & event service team',
      href: '/contracts',
      icon: Briefcase,
    },
    {
      title: 'Contact & Location',
      subtitle: 'Victoria Island boutique, hours & phone',
      href: '/contact',
      icon: Phone,
    },
  ];

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. FIXED MOBILE BOTTOM NAVIGATION BAR
      ───────────────────────────────────────────────────────────── */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#F0D9E1] shadow-[0_-4px_20px_rgba(232,44,124,0.06)] lg:hidden pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      >
        <div className="max-w-md mx-auto px-2 pt-1.5 flex items-center justify-around">
          {PRIMARY_NAV.map((item) => {
            const Icon = item.icon;

            if (item.isButton) {
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={item.onClick}
                  aria-expanded={moreSheetOpen}
                  aria-controls="mobile-more-sheet"
                  className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl min-w-[58px] transition-all duration-200 focus:outline-none select-none ${
                    item.isActive
                      ? 'text-[#E82C7C] font-extrabold'
                      : 'text-[#7A6B70] hover:text-[#E82C7C] font-bold'
                  }`}
                >
                  <div
                    className={`relative p-1 rounded-xl transition-all ${
                      item.isActive ? 'bg-[#FFF5F8] text-[#E82C7C] scale-105 border border-[#FCE4EC]' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5 stroke-[2.2px]" />
                  </div>
                  <span className="text-[10px] tracking-tight mt-0.5 leading-none font-sans font-bold">
                    {item.name}
                  </span>
                </button>
              );
            }

            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={item.onClick}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl min-w-[58px] transition-all duration-200 focus:outline-none select-none relative ${
                    isActive
                      ? 'text-[#E82C7C] font-extrabold'
                      : 'text-[#7A6B70] hover:text-[#E82C7C] font-bold'
                  }`
                }
              >
                <div
                  className={`relative p-1 rounded-xl transition-all ${
                    item.isActive ? 'bg-[#FFF5F8] text-[#E82C7C] scale-105 border border-[#FCE4EC]' : ''
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2.2px]" />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E82C7C] text-white rounded-full text-[9px] font-black flex items-center justify-center shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] tracking-tight mt-0.5 leading-none font-sans font-bold">
                  {item.name}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          2. "MORE" BOTTOM SHEET
      ───────────────────────────────────────────────────────────── */}
      {moreSheetOpen && (
        <div id="mobile-more-sheet" className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-[#2B2024]/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={() => setMoreSheetOpen(false)}
            aria-hidden="true"
          />

          {/* Bottom Sheet Container */}
          <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-3xl shadow-2xl z-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-bottom duration-300 border-t border-[#F0D9E1] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            {/* Sheet Handle & Header */}
            <div>
              <div className="pt-3 pb-1 flex justify-center">
                <div className="w-12 h-1.5 rounded-full bg-[#FCE4EC]" />
              </div>

              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#F0D9E1]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#E82C7C] flex items-center justify-center text-white shadow-xs">
                    <Heart className="w-4 h-4 fill-current" />
                  </div>
                  <span className="font-display font-extrabold text-base text-[#2B2024]">
                    Tory's <span className="text-[#E82C7C]">Treats</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setMoreSheetOpen(false)}
                  className="p-1.5 rounded-full text-[#7A6B70] hover:text-[#2B2024] hover:bg-[#FFF5F8] transition-colors focus:outline-none"
                  aria-label="Close more menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Account Bar in Sheet */}
              {isAuthenticated ? (
                <div className="px-5 py-3.5 bg-[#FFF5F8] border-b border-[#FCE4EC] flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#E82C7C] text-white font-black text-sm flex items-center justify-center shadow-xs shrink-0">
                      {profile?.full_name?.charAt(0) || 'U'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#2B2024] truncate">
                        {profile?.full_name || 'Customer'}
                      </p>
                      <p className="text-[11px] text-[#7A6B70] truncate">{profile?.email}</p>
                    </div>
                  </div>

                  <Link
                    to="/account"
                    onClick={() => setMoreSheetOpen(false)}
                    className="text-[11px] font-bold text-[#E82C7C] hover:underline shrink-0 ml-2"
                  >
                    View Account →
                  </Link>
                </div>
              ) : (
                <div className="p-4 bg-[#FFF5F8]/60 border-b border-[#F0D9E1] flex items-center gap-2">
                  <Link
                    to="/auth/login"
                    onClick={() => setMoreSheetOpen(false)}
                    className="flex-1"
                  >
                    <Button variant="primary" size="sm" className="w-full justify-center text-xs">
                      Sign In
                    </Button>
                  </Link>
                  <Link
                    to="/auth/register"
                    onClick={() => setMoreSheetOpen(false)}
                    className="flex-1"
                  >
                    <Button variant="secondary" size="sm" className="w-full justify-center text-xs">
                      Register
                    </Button>
                  </Link>
                </div>
              )}

              {/* Secondary Navigation List */}
              <div className="p-3 space-y-1">
                <p className="px-3 pt-2 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-[#7A6B70]">
                  Explore Tory’s Treats
                </p>

                {SECONDARY_DESTINATIONS.map((dest) => {
                  const DestIcon = dest.icon;
                  const isActive = currentPath === dest.href || currentPath.startsWith(`${dest.href}/`);

                  return (
                    <Link
                      key={dest.href}
                      to={dest.href}
                      onClick={() => setMoreSheetOpen(false)}
                      className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                        isActive
                          ? 'bg-[#FFF5F8] text-[#E82C7C] font-extrabold border border-[#FCE4EC]'
                          : 'hover:bg-[#FFF5F8] text-[#2B2024]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isActive
                              ? 'bg-[#E82C7C] text-white shadow-xs'
                              : 'bg-[#FFF5F8] text-[#E82C7C] border border-[#FCE4EC]'
                          }`}
                        >
                          <DestIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-[#2B2024] leading-tight">
                            {dest.title}
                          </h4>
                          <p className="text-[11px] text-[#7A6B70] truncate leading-tight mt-0.5">
                            {dest.subtitle}
                          </p>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-[#7A6B70] shrink-0 ml-2" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Sheet Footer */}
            <div className="p-4 border-t border-[#F0D9E1] bg-[#FFF5F8]/30 space-y-2 mt-2">
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    setMoreSheetOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out of Account</span>
                </button>
              )}

              <p className="text-center text-[11px] text-[#7A6B70]">
                {BRAND.address} • {BRAND.phone}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
