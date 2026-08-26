import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  ShoppingBag,
  CalendarDays,
  Sparkles,
  LayoutGrid,
} from 'lucide-react';
import MobileMoreSheet from './MobileMoreSheet';

export default function MobileBottomNav() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const location = useLocation();

  // Determine if the current route is one of the secondary routes housed in the More sheet
  const isMoreActive = [
    '/categories',
    '/contracts',
    '/contact',
    '/account',
    '/design-system',
  ].some((path) => location.pathname.startsWith(path)) || isMoreOpen;

  return (
    <>
      <nav
        aria-label="Mobile Primary Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-cream-border shadow-[0_-4px_20px_rgba(107,58,50,0.06)] lg:hidden pb-safe"
      >
        <div className="flex items-center justify-around px-2 py-1.5 h-16">
          {/* 1. Home */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all duration-200 min-h-[44px] ${
                isActive
                  ? 'text-brand-700 font-bold'
                  : 'text-charcoal-500 hover:text-charcoal-800 font-medium'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`w-9 h-6 flex items-center justify-center rounded-full transition-colors ${
                    isActive ? 'bg-brand-50 text-brand-700' : ''
                  }`}
                >
                  <Home className={`w-5 h-5 ${isActive ? 'stroke-[2.4px]' : 'stroke-[1.8px]'}`} />
                </div>
                <span className="text-[10px] tracking-tight mt-0.5">Home</span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-brand-700 mt-0.5 animate-scale-in" />
                )}
              </>
            )}
          </NavLink>

          {/* 2. Shop */}
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all duration-200 min-h-[44px] ${
                isActive
                  ? 'text-brand-700 font-bold'
                  : 'text-charcoal-500 hover:text-charcoal-800 font-medium'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`w-9 h-6 flex items-center justify-center rounded-full transition-colors ${
                    isActive ? 'bg-brand-50 text-brand-700' : ''
                  }`}
                >
                  <ShoppingBag className={`w-5 h-5 ${isActive ? 'stroke-[2.4px]' : 'stroke-[1.8px]'}`} />
                </div>
                <span className="text-[10px] tracking-tight mt-0.5">Shop</span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-brand-700 mt-0.5 animate-scale-in" />
                )}
              </>
            )}
          </NavLink>

          {/* 3. Events */}
          <NavLink
            to="/events"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all duration-200 min-h-[44px] ${
                isActive
                  ? 'text-brand-700 font-bold'
                  : 'text-charcoal-500 hover:text-charcoal-800 font-medium'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`w-9 h-6 flex items-center justify-center rounded-full transition-colors ${
                    isActive ? 'bg-brand-50 text-brand-700' : ''
                  }`}
                >
                  <CalendarDays className={`w-5 h-5 ${isActive ? 'stroke-[2.4px]' : 'stroke-[1.8px]'}`} />
                </div>
                <span className="text-[10px] tracking-tight mt-0.5">Events</span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-brand-700 mt-0.5 animate-scale-in" />
                )}
              </>
            )}
          </NavLink>

          {/* 4. Book (Luxury Catering Booking) */}
          <NavLink
            to="/catering"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all duration-200 min-h-[44px] ${
                isActive
                  ? 'text-brand-700 font-bold'
                  : 'text-charcoal-500 hover:text-charcoal-800 font-medium'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`w-9 h-6 flex items-center justify-center rounded-full transition-colors ${
                    isActive ? 'bg-brand-50 text-brand-700' : ''
                  }`}
                >
                  <Sparkles className={`w-5 h-5 ${isActive ? 'stroke-[2.4px]' : 'stroke-[1.8px]'}`} />
                </div>
                <span className="text-[10px] tracking-tight mt-0.5">Book</span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-brand-700 mt-0.5 animate-scale-in" />
                )}
              </>
            )}
          </NavLink>

          {/* 5. More (Sheet Opener) */}
          <button
            type="button"
            onClick={() => setIsMoreOpen(true)}
            aria-label="Open more menu options"
            aria-expanded={isMoreOpen}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all duration-200 min-h-[44px] focus:outline-none ${
              isMoreActive
                ? 'text-brand-700 font-bold'
                : 'text-charcoal-500 hover:text-charcoal-800 font-medium'
            }`}
          >
            <div
              className={`w-9 h-6 flex items-center justify-center rounded-full transition-colors ${
                isMoreActive ? 'bg-brand-50 text-brand-700' : ''
              }`}
            >
              <LayoutGrid className={`w-5 h-5 ${isMoreActive ? 'stroke-[2.4px]' : 'stroke-[1.8px]'}`} />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">More</span>
            {isMoreActive && (
              <span className="w-1 h-1 rounded-full bg-brand-700 mt-0.5 animate-scale-in" />
            )}
          </button>
        </div>
      </nav>

      {/* Slide-Up Mobile More Sheet */}
      <MobileMoreSheet isOpen={isMoreOpen} onClose={() => setIsMoreOpen(false)} />
    </>
  );
}
