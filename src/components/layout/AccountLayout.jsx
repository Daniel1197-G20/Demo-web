import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  User,
  ShoppingBag,
  Calendar,
  Briefcase,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import PageContainer from '../common/PageContainer';
import Card from '../ui/Card';

export default function AccountLayout() {
  const { profile, signOut } = useAuth();

  const navItems = [
    { label: 'Overview', href: '/account', end: true, icon: User },
    { label: 'Order History', href: '/account/orders', icon: ShoppingBag },
    { label: 'Catering Bookings', href: '/account/bookings', icon: Calendar },
    { label: 'Job Applications', href: '/account/applications', icon: Briefcase },
    { label: 'Profile & Address', href: '/account/profile', icon: ShieldCheck },
  ];

  return (
    <PageContainer>
      {/* Mobile Top Profile & Horizontal Scroll Navigation */}
      <div className="md:hidden space-y-3 mb-6">
        {/* Mobile Profile Bar */}
        <div className="flex items-center justify-between p-3.5 sm:p-4 bg-white rounded-2xl border border-cream-border shadow-brand-sm">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-700 text-white font-bold text-sm sm:text-base flex items-center justify-center shrink-0 shadow-sm">
              {profile?.full_name?.charAt(0) || 'U'}
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-charcoal-900 truncate font-display">
                {profile?.full_name || 'Customer'}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-charcoal-500 truncate">{profile?.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={signOut}
            className="p-2 rounded-xl text-error-500 hover:bg-error-50 active:bg-error-100 transition-colors shrink-0"
            aria-label="Sign Out"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Horizontal Scrollable Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 custom-scrollbar no-scrollbar -mx-4 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors shrink-0 focus-ring ${
                    isActive
                      ? 'bg-brand-700 text-white shadow-brand-sm font-bold'
                      : 'bg-white border border-cream-border text-charcoal-700 hover:bg-cream-surface'
                  }`
                }
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Desktop & Main Content Structure */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Desktop Account Sidebar (Hidden on mobile) */}
        <div className="hidden md:block w-64 shrink-0 space-y-4 sticky top-28">
          <Card className="p-5">
            <div className="flex items-center gap-3.5 pb-4 border-b border-cream-border">
              <div className="w-12 h-12 rounded-full bg-brand-700 text-white font-bold text-lg flex items-center justify-center shadow-sm">
                {profile?.full_name?.charAt(0) || 'U'}
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-charcoal-900 truncate font-display">
                  {profile?.full_name || 'Customer'}
                </h3>
                <p className="text-xs text-charcoal-500 truncate">{profile?.email}</p>
              </div>
            </div>

            <nav className="pt-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-brand-50 text-brand-700 font-bold'
                          : 'text-charcoal-700 hover:bg-cream-surface hover:text-brand-700'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}

              <button
                type="button"
                onClick={signOut}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-error-500 hover:bg-error-50 transition-colors text-left mt-2"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Sign Out</span>
              </button>
            </nav>
          </Card>
        </div>

        {/* Sub-route Content Outlet */}
        <div className="flex-1 min-w-0 w-full">
          <Outlet />
        </div>
      </div>
    </PageContainer>
  );
}
