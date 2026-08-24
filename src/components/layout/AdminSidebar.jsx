import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Cake,
  Layers,
  ShoppingBag,
  CalendarDays,
  Briefcase,
  Users,
  UserCheck,
  BarChart3,
  Settings,
  Heart,
  ArrowLeft,
  X,
} from 'lucide-react';
import { ADMIN_NAV_LINKS, BRAND } from '../../lib/constants';

const ICON_MAP = {
  LayoutDashboard,
  Cake,
  Layers,
  ShoppingBag,
  CalendarDays,
  Briefcase,
  Users,
  UserCheck,
  BarChart3,
  Settings,
};

export default function AdminSidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-charcoal-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-cream-border flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-18 px-6 border-b border-cream-border flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-700 flex items-center justify-center text-white shadow-sm">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-charcoal-900 block leading-tight">
                Tory's <span className="text-brand-700">Admin</span>
              </span>
              <span className="text-[10px] text-charcoal-500 font-semibold uppercase tracking-wider">
                Management Portal
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1 text-charcoal-500 hover:text-charcoal-900 rounded-lg hover:bg-cream-surface"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-charcoal-500">
            Operations & Catalog
          </div>

          {ADMIN_NAV_LINKS.map((link) => {
            const Icon = ICON_MAP[link.icon] || LayoutDashboard;
            return (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === '/admin'}
                onClick={() => onClose && onClose()}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-700 text-white shadow-brand-sm'
                      : 'text-charcoal-700 hover:bg-cream-surface hover:text-brand-700'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Sidebar Footer: Back to Store */}
        <div className="p-4 border-t border-cream-border bg-cream-surface/50">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl border border-cream-border text-xs font-semibold text-charcoal-700 hover:bg-white hover:text-brand-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Store</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
